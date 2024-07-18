import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./businessTextStructure.css"
import plus from "./images/plus.svg"
import notebook from "./images/notebook.svg"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InvestmentsSharesManagedFunds = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let initialValues = {
    directShares:"No",
    DirectOpeningValue:"",
    DirectCostBase:"",
    DirectRegularContributions:"",
    DirectContributeYear:"",
    DirectContributeUntil:"",
    DirectEditReinvest:"No",
    Indexation:"",
    DirectReinvestUntil:"",
    DirectInvestmentReturns:"",
    DirectIncomeYieId:"",
    DirectGrowth:"",
    DirectFranking:"",
    DirectRiskProfile:"",
    DirectOngoingFees:"",
    ManagedShares:"No",
    ManagedOpeningValue:"",
    ManagedCostBase:"",
    ManagedRegularContributions:"",
    ManagedContributeYear:"",
    ManagedContributeUntil:"",
    ManagedEditReinvest:"No",
    ManagedIndexation:"",
    ManagedReinvestUntil:"",
    ManagedInvestmentReturns:"",
    ManagedIncomeYieId:"",
    ManagedGrowth:"",
    ManagedFranking:"",
    ManagedRiskProfile:"",
    ManagedOngoingFees:"",
    otherShares:"No",
    OtherOpeningValue:"",
    OtherCostBase:"",
    OtherRegularContributions:"",
    OtherContributeYear:"",
    OtherContributeUntil:"",
    OtherEditReinvest:"No",
    OtherIndexation:"",
    OtherReinvestUntil:"",
    OtherInvestmentReturns:"",
    OtherIncomeYieId:"",
    OtherGrowth:"",
    OtherFranking:"",
    OtherRiskProfile:"",
    OtherOngoingFees:"",

  }

  let validationSchema = Yup.object({
    DirectOpeningValue: Yup.number().when('directShares', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    DirectCostBase: Yup.number().when('directShares', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    DirectRegularContributions: Yup.number().when('directShares', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    DirectContributeYear: Yup.string().when('directShares', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
//     DirectContributeUntil: Yup.string().when('directShares', {
//       is: (val) => val && val.length == 3,
//       then: Yup.string().required("Required") .test('is-greater', 'To Year must be greater than From Year', function(value) {
//         const fromYear = parseInt(this.resolve(Yup.ref('DirectContributeYear')));
//         const toYear = parseInt(value);
//         return toYear >= fromYear;
//         }),
//     }),

    DirectContributeUntil: Yup.string().when("directShares", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required").test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('DirectContributeYear')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = this.parent.DirectContributeYear;
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),

    Indexation: Yup.string().when('directShares', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    DirectReinvestUntil: Yup.string().when('directShares', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    DirectInvestmentReturns: Yup.string().when('directShares', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    DirectIncomeYieId: Yup.string().when('DirectInvestmentReturns', {
      is: (val) => val && val.length == 13,
      then: Yup.string().required("Required")
    }),
    DirectGrowth: Yup.string().when('DirectInvestmentReturns', {
      is: (val) => val && val.length == 13,
      then: Yup.string().required("Required")
    }),
    DirectFranking: Yup.string().when('DirectInvestmentReturns', {
      is: (val) => val && val.length == 13,
      then: Yup.string().required("Required")
    }),
    DirectRiskProfile: Yup.string().when('directShares', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    DirectOngoingFees: Yup.number().when('directShares', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ).min(0, 'Too Short!')
        .max(100, 'Must be less than or equal to 100'),
    }),
    ManagedOpeningValue: Yup.number().when('ManagedShares', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    ManagedCostBase: Yup.number().when('ManagedShares', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    ManagedRegularContributions: Yup.number().when('ManagedShares', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    ManagedContributeYear: Yup.string().when('ManagedShares', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
//     ManagedContributeUntil: Yup.string().when('ManagedShares', {
//       is: (val) => val && val.length == 3,
//       then: Yup.string().required("Required") .test('is-greater', 'To Year must be greater than From Year', function(value) {
//         const fromYear = parseInt(this.resolve(Yup.ref('ManagedContributeYear')));
//         const toYear = parseInt(value);
//         return toYear >= fromYear;
//         }),
//     }),

    ManagedContributeUntil: Yup.string().when("ManagedShares", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required").test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('ManagedContributeYear')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = this.parent.ManagedContributeYear;
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),
    ManagedIndexation: Yup.string().when('ManagedShares', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ManagedReinvestUntil: Yup.string().when('ManagedShares', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ManagedInvestmentReturns: Yup.string().when('ManagedShares', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ManagedIncomeYieId: Yup.string().when('ManagedInvestmentReturns', {
      is: (val) => val && val.length == 13,
      then: Yup.string().required("Required")
    }),
    ManagedGrowth: Yup.string().when('ManagedInvestmentReturns', {
      is: (val) => val && val.length == 13,
      then: Yup.string().required("Required")
    }),
    ManagedFranking: Yup.string().when('ManagedInvestmentReturns', {
      is: (val) => val && val.length == 13,
      then: Yup.string().required("Required")
    }),
    ManagedRiskProfile: Yup.string().when('ManagedShares', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ManagedOngoingFees: Yup.number().when('ManagedShares', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ).min(0, 'Too Short!')
        .max(100, 'Must be less than or equal to 100'),
    }),
    OtherOpeningValue: Yup.number().when('otherShares', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    OtherCostBase: Yup.number().when('otherShares', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    OtherRegularContributions: Yup.number().when('otherShares', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    OtherContributeYear: Yup.string().when('otherShares', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
//     OtherContributeUntil: Yup.string().when('otherShares', {
//       is: (val) => val && val.length == 3,
//       then: Yup.string().required("Required") .test('is-greater', 'To Year must be greater than From Year', function(value) {
//         const fromYear = parseInt(this.resolve(Yup.ref('OtherContributeYear')));
//         const toYear = parseInt(value);
//         return toYear >= fromYear;
//         }),
//     }),

    OtherContributeUntil: Yup.string().when("otherShares", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required").test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('OtherContributeYear')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = this.parent.OtherContributeYear;
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),
    OtherIndexation: Yup.string().when('otherShares', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    OtherReinvestUntil: Yup.string().when('otherShares', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    OtherInvestmentReturns: Yup.string().when('otherShares', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    OtherIncomeYieId: Yup.string().when('OtherInvestmentReturns', {
      is: (val) => val && val.length == 13,
      then: Yup.string().required("Required")
    }),
    OtherGrowth: Yup.string().when('OtherInvestmentReturns', {
      is: (val) => val && val.length == 13,
      then: Yup.string().required("Required")
    }),
    OtherFranking: Yup.string().when('OtherInvestmentReturns', {
      is: (val) => val && val.length == 13,
      then: Yup.string().required("Required")
    }),
    OtherRiskProfile: Yup.string().when('otherShares', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    OtherOngoingFees: Yup.number().when('otherShares', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ).min(0, 'Too Short!')
        .max(100, 'Must be less than or equal to 100'),
    }),
  })



  let onSubmit = (values) => {
    console.log(values);

  }
  return (
    <>


      <div>
        
      <label className="form-label">  Investments (Shares, Managed Funds and Other) </label>
      <br />

        
        <button type="button"
          className="btn btn-outline-success"

          onClick={handleShow}
        >
          <div className="iconContainer mx-1">
            <img className="img-fluid" src={plus} alt="" />

          </div>
          Enter Details
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
              Investments (Shares, Managed Funds and Other)
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

                  {/* DirectForm */}
                  <div>
                    <div classname="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            Direct Shares
                          </label>

                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="directShares" id="directSharesopt1"
                                onChange={handleChange} value="Yes"
                                checked={values.directShares == "Yes"} />
                              <label htmlFor="directSharesopt1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="directShares" id="directSharesopt2"
                                onChange={handleChange} value="No"

                                checked={values.directShares == "No"} />
                              <label htmlFor="directSharesopt2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}


                        </div>
                      </div>
                    </div>

                    {/* First Row Direct*/}
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="DirectOpeningValue"
                            className="form-label"
                          >
                            Opening Value
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="DirectOpeningValue"
                            name='DirectOpeningValue'
                            placeholder="Opening Value"
                            disabled={values.directShares === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='DirectOpeningValue' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="DirectCostBase"
                            className="form-label"
                          >
                            Cost Base
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="DirectCostBase"
                            name='DirectCostBase'
                            placeholder="Cost Base"
                            disabled={values.directShares === "Yes" ? false : true}

                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='DirectCostBase' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="DirectRegularContributions"
                            className="form-label"
                          >
                            Regular Contributions p.a
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="DirectRegularContributions"
                            name='DirectRegularContributions'
                            placeholder="Regular Contributions p.a"
                            disabled={values.directShares === "Yes" ? false : true}

                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='DirectRegularContributions' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="DirectContributeYear" className="form-label">
                            Contribute From Year
                          </label>
                          <Field
                            id="DirectContributeYear"
                            name='DirectContributeYear'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.directShares === "Yes" ? false : true}

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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="DirectContributeYear" />
                        </div>
                      </div>


                    </div>

                    {/* Second Row Direct*/}


                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="DirectContributeUntil" className="form-label">
                            Contribute Up Until
                          </label>
                          <Field
                            id="DirectContributeUntil"
                            name='DirectContributeUntil'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.directShares === "Yes" ? false : true}

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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="DirectContributeUntil" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label htmlFor="Indexation" className="form-label"> Indexation</label>
                        <Field as="select" className="form-select shadow inputDesign" id="Indexation"
                          name="Indexation" placeholder="Indexation"
                          disabled={values.directShares === "Yes" ? false : true}>
                          <option value="">Select</option>
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
                        <ErrorMessage component="div" className="text-danger fw-bold" name="Indexation" />
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            Reinvest Income
                          </label>

                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="DirectEditReinvest" id="DirectEditReinvest1"
                                onChange={handleChange} value="Yes"
                                checked={values.DirectEditReinvest == "No" ? false : true}
                                disabled={values.directShares === "Yes" ? false : true} />
                              <label htmlFor="DirectEditReinvest1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="DirectEditReinvest" id="DirectEditReinvest2"
                                onChange={handleChange} value="No"
                                checked={values.DirectEditReinvest == "No" ? true : false}
                                disabled={values.directShares === "Yes" ? false : true} />
                              <label htmlFor="DirectEditReinvest2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}


                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="DirectReinvestUntil" className="form-label">
                            Reinvest Up Until
                          </label>
                          <Field
                            id="DirectReinvestUntil"
                            name='DirectReinvestUntil'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.directShares === "Yes" ? false : true}

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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="DirectReinvestUntil" />
                        </div>
                      </div>

                    </div>


                    {/* Third Row Direct*/}
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="DirectInvestmentReturns" className="form-label">
                            Investment Returns
                          </label>
                          <Field
                            id="DirectInvestmentReturns"
                            name='DirectInvestmentReturns'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.directShares === "Yes" ? false : true}

                          >
                            <option value="">Select</option>
                            <option value="System">System</option>
                            <option value="InputOverride">Input Override</option>

                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="DirectInvestmentReturns" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="DirectIncomeYieId"
                            className="form-label"
                          >
                            Income YieId
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="DirectIncomeYieId"
                            name='DirectIncomeYieId'
                            placeholder="Income YieId"
                            disabled ={values.DirectInvestmentReturns=="InputOverride"?false:true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='DirectIncomeYieId' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="DirectGrowth"
                            className="form-label"
                          >
                            Growth
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="DirectGrowth"
                            name='DirectGrowth'
                            placeholder="Growth"
                            disabled ={values.DirectInvestmentReturns=="InputOverride"?false:true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='DirectGrowth' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="DirectFranking"
                            className="form-label"
                          >
                            Franking
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="DirectFranking"
                            name='DirectFranking'
                            placeholder="Franking"
                            disabled ={values.DirectInvestmentReturns=="InputOverride"?false:true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='DirectFranking' />
                        </div>
                      </div>

                    </div>



                    {/* Fourth Row Direct*/}
                    <div className="row">

                      <div className="col-md-3">
                        {/* Check options of Risk Profile in Direct CheckBox*/}
                        <div className="mb-3">
                          <label htmlFor="DirectRiskProfile" className="form-label">
                            Risk Profile/SAA
                          </label>
                          <Field
                            id="DirectRiskProfile"
                            name='DirectRiskProfile'
                            className="form-select shadow inputDesign"
                            as='select'
                            disabled={values.directShares === "Yes" ? false : true}

                          >
                            <option value="">Select</option>
                            <option value="Cash">Cash</option>
                            <option value="Cautious">Cautious</option>
                            <option value="Conservative">Conservative</option>
                            <option value="Balanced">Balanced</option>
                            <option value="Growth">Growth</option>
                            <option value="High Growth">High Growth</option>
                            <option value="International Shares">International Shares</option>
                            <option value="Property">Property</option>
                            <option value="Australia Fixed Interest">Australia Fixed Interest</option>
                            <option value="International Fixed Interest">International Fixed Interest</option>
                            <option value="Australian Shares">Australian Shares</option>
                            <option value="Other">Other</option>



                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="DirectRiskProfile" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="DirectOngoingFees"
                            className="form-label"
                          >
                            Ongoing Fees
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="DirectOngoingFees"
                            name='DirectOngoingFees'
                            placeholder="Ongoing Fees"
                            disabled={values.directShares === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='DirectOngoingFees' />
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* DirectForm */}

                  <hr />
                  {/* Managed Funds */}
                  <div>
                    <div classname="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            Managed Shares
                          </label>

                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="ManagedShares" id="ManagedSharesopt1"
                                onChange={handleChange} value="Yes"
                                checked={values.ManagedShares == "Yes"} />
                              <label htmlFor="ManagedSharesopt1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="ManagedShares" id="ManagedSharesopt2"
                                onChange={handleChange} value="No"

                                checked={values.ManagedShares == "No"} />
                              <label htmlFor="ManagedSharesopt2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}


                        </div>
                      </div>
                    </div>

                    {/* First Row Managed*/}
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ManagedOpeningValue"
                            className="form-label"
                          >
                            Opening Value
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ManagedOpeningValue"
                            name='ManagedOpeningValue'
                            placeholder="Opening Value"
                            disabled={values.ManagedShares === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ManagedOpeningValue' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ManagedCostBase"
                            className="form-label"
                          >
                            Cost Base
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ManagedCostBase"
                            name='ManagedCostBase'
                            placeholder="Cost Base"
                            disabled={values.ManagedShares === "Yes" ? false : true}

                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ManagedCostBase' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ManagedRegularContributions"
                            className="form-label"
                          >
                            Regular Contributions p.a
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ManagedRegularContributions"
                            name='ManagedRegularContributions'
                            placeholder="Regular Contributions p.a"
                            disabled={values.ManagedShares === "Yes" ? false : true}

                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ManagedRegularContributions' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ManagedContributeYear" className="form-label">
                            Contribute From Year
                          </label>
                          <Field
                            id="ManagedContributeYear"
                            name='ManagedContributeYear'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ManagedShares === "Yes" ? false : true}

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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ManagedContributeYear" />
                        </div>
                      </div>


                    </div>

                    {/* Second Row Managed*/}


                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ManagedContributeUntil" className="form-label">
                            Contribute Up Until
                          </label>
                          <Field
                            id="ManagedContributeUntil"
                            name='ManagedContributeUntil'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ManagedShares === "Yes" ? false : true}

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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ManagedContributeUntil" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label htmlFor="ManagedIndexation" className="form-label"> Indexation</label>
                        <Field as="select" className="form-select shadow inputDesign" id="ManagedIndexation"
                          name="ManagedIndexation" placeholder="ManagedIndexation"
                          disabled={values.ManagedShares === "Yes" ? false : true}>
                          <option value="">Select</option>
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
                        <ErrorMessage component="div" className="text-danger fw-bold" name="ManagedIndexation" />
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            Reinvest Income
                          </label>

                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="ManagedEditReinvest" id="ManagedEditReinvest1"
                                onChange={handleChange} value="Yes"
                                checked={values.ManagedEditReinvest == "No" ? false : true}
                                disabled={values.ManagedShares === "Yes" ? false : true} />
                              <label htmlFor="ManagedEditReinvest1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="ManagedEditReinvest" id="ManagedEditReinvest2"
                                onChange={handleChange} value="No"
                                checked={values.ManagedEditReinvest == "No" ? true : false}
                                disabled={values.ManagedShares === "Yes" ? false : true} />
                              <label htmlFor="ManagedEditReinvest2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}


                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ManagedReinvestUntil" className="form-label">
                            Reinvest Up Until
                          </label>
                          <Field
                            id="ManagedReinvestUntil"
                            name='ManagedReinvestUntil'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ManagedShares === "Yes" ? false : true}

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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ManagedReinvestUntil" />
                        </div>
                      </div>

                    </div>


                    {/* Third Row Managed*/}
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ManagedInvestmentReturns" className="form-label">
                            Investment Returns
                          </label>
                          <Field
                            id="ManagedInvestmentReturns"
                            name='ManagedInvestmentReturns'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ManagedShares === "Yes" ? false : true}

                          >
                            <option value="">Select</option>
                            <option value="System">System</option>
                            <option value="InputOverride">Input Override</option>

                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ManagedInvestmentReturns" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ManagedIncomeYieId"
                            className="form-label"
                          >
                            Income YieId
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ManagedIncomeYieId"
                            name='ManagedIncomeYieId'
                            placeholder="Income YieId"
                            disabled ={values.ManagedInvestmentReturns=="InputOverride"?false:true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ManagedIncomeYieId' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ManagedGrowth"
                            className="form-label"
                          >
                            Growth
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ManagedGrowth"
                            name='ManagedGrowth'
                            placeholder="Growth"
                            disabled ={values.ManagedInvestmentReturns=="InputOverride"?false:true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ManagedGrowth' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ManagedFranking"
                            className="form-label"
                          >
                            Franking
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ManagedFranking"
                            name='ManagedFranking'
                            placeholder="Franking"
                            disabled ={values.ManagedInvestmentReturns=="InputOverride"?false:true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ManagedFranking' />
                        </div>
                      </div>

                    </div>



                    {/* Fourth Row Managed*/}
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ManagedRiskProfile" className="form-label">
                            Risk Profile/SAA
                          </label>
                          <Field
                            id="ManagedRiskProfile"
                            name='ManagedRiskProfile'
                            className="form-select shadow inputDesign"
                            as='select'
                            disabled={values.ManagedShares === "Yes" ? false : true}

                          >
                            <option value="">Select</option>
                            <option value="Cash">Cash</option>
                            <option value="Cautious">Cautious</option>
                            <option value="Conservative">Conservative</option>
                            <option value="Balanced">Balanced</option>
                            <option value="Growth">Growth</option>
                            <option value="High Growth">High Growth</option>
                            <option value="International Shares">International Shares</option>
                            <option value="Property">Property</option>
                            <option value="Australia Fixed Interest">Australia Fixed Interest</option>
                            <option value="International Fixed Interest">International Fixed Interest</option>
                            <option value="Australian Shares">Australian Shares</option>
                            <option value="Other">Other</option>



                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ManagedRiskProfile" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ManagedOngoingFees"
                            className="form-label"
                          >
                            Ongoing Fees
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ManagedOngoingFees"
                            name='ManagedOngoingFees'
                            placeholder="Ongoing Fees"
                            disabled={values.ManagedShares === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ManagedOngoingFees' />
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Managed Funds */}



                  <hr />
                  {/* OtherForm */}
                  <div>
                    <div classname="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            Other Shares
                          </label>

                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="otherShares" id="otherSharesopt1"
                                onChange={handleChange} value="Yes"
                                checked={values.otherShares == "Yes"} />
                              <label htmlFor="otherSharesopt1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="otherShares" id="otherSharesopt2"
                                onChange={handleChange} value="No"

                                checked={values.otherShares == "No"} />
                              <label htmlFor="otherSharesopt2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}


                        </div>
                      </div>
                    </div>

                    {/* First Row Other*/}
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="OtherOpeningValue"
                            className="form-label"
                          >
                            Opening Value
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="OtherOpeningValue"
                            name='OtherOpeningValue'
                            placeholder="Opening Value"
                            disabled={values.otherShares === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='OtherOpeningValue' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="OtherCostBase"
                            className="form-label"
                          >
                            Cost Base
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="OtherCostBase"
                            name='OtherCostBase'
                            placeholder="Cost Base"
                            disabled={values.otherShares === "Yes" ? false : true}

                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='OtherCostBase' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="OtherRegularContributions"
                            className="form-label"
                          >
                            Regular Contributions p.a
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="OtherRegularContributions"
                            name='OtherRegularContributions'
                            placeholder="Regular Contributions p.a"
                            disabled={values.otherShares === "Yes" ? false : true}

                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='OtherRegularContributions' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="OtherContributeYear" className="form-label">
                            Contribute From Year
                          </label>
                          <Field
                            id="OtherContributeYear"
                            name='OtherContributeYear'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.otherShares === "Yes" ? false : true}

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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="OtherContributeYear" />
                        </div>
                      </div>


                    </div>

                    {/* Second Row Other*/}


                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="OtherContributeUntil" className="form-label">
                            Contribute Up Until
                          </label>
                          <Field
                            id="OtherContributeUntil"
                            name='OtherContributeUntil'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.otherShares === "Yes" ? false : true}

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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="OtherContributeUntil" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label htmlFor="OtherIndexation" className="form-label"> Indexation</label>
                        <Field as="select" className="form-select shadow inputDesign" id="OtherIndexation"
                          name="OtherIndexation" placeholder="OtherIndexation"
                          disabled={values.otherShares === "Yes" ? false : true}>
                          <option value="">Select</option>
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
                        <ErrorMessage component="div" className="text-danger fw-bold" name="OtherIndexation" />
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            Reinvest Income
                          </label>

                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="OtherEditReinvest" id="OtherEditReinvest1"
                                onChange={handleChange} value="Yes"
                                checked={values.OtherEditReinvest == "No" ? false : true}
                                disabled={values.otherShares === "Yes" ? false : true} />
                              <label htmlFor="OtherEditReinvest1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="OtherEditReinvest" id="OtherEditReinvest2"
                                onChange={handleChange} value="No"
                                checked={values.OtherEditReinvest == "No" ? true : false}
                                disabled={values.otherShares === "Yes" ? false : true} />
                              <label htmlFor="OtherEditReinvest2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}


                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="OtherReinvestUntil" className="form-label">
                            Reinvest Up Until
                          </label>
                          <Field
                            id="OtherReinvestUntil"
                            name='OtherReinvestUntil'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.otherShares === "Yes" ? false : true}

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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="OtherReinvestUntil" />
                        </div>
                      </div>

                    </div>


                    {/* Third Row Other*/}
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="OtherInvestmentReturns" className="form-label">
                            Investment Returns
                          </label>
                          <Field
                            id="OtherInvestmentReturns"
                            name='OtherInvestmentReturns'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.otherShares === "Yes" ? false : true}

                          >
                            <option value="">Select</option>
                            <option value="System">System</option>
                            <option value="InputOverride">Input Override</option>

                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="OtherInvestmentReturns" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="OtherIncomeYieId"
                            className="form-label"
                          >
                            Income YieId
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="OtherIncomeYieId"
                            name='OtherIncomeYieId'
                            placeholder="Income YieId"
                            disabled ={values.OtherInvestmentReturns=="InputOverride"?false:true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='OtherIncomeYieId' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="OtherGrowth"
                            className="form-label"
                          >
                            Growth
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="OtherGrowth"
                            name='OtherGrowth'
                            placeholder="Growth"
                            disabled ={values.OtherInvestmentReturns=="InputOverride"?false:true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='OtherGrowth' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="OtherFranking"
                            className="form-label"
                          >
                            Franking
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="OtherFranking"
                            name='OtherFranking'
                            placeholder="Franking"
                            disabled ={values.OtherInvestmentReturns=="InputOverride"?false:true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='OtherFranking' />
                        </div>
                      </div>

                    </div>



                    {/* Fourth Row Other*/}
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="OtherRiskProfile" className="form-label">
                            Risk Profile/SAA
                          </label>
                          <Field
                            id="OtherRiskProfile"
                            name='OtherRiskProfile'
                            className="form-select shadow inputDesign"
                            as='select'
                            disabled={values.otherShares === "Yes" ? false : true}

                          >
                            <option value="">Select</option>
                            <option value="Cash">Cash</option>
                            <option value="Cautious">Cautious</option>
                            <option value="Conservative">Conservative</option>
                            <option value="Balanced">Balanced</option>
                            <option value="Growth">Growth</option>
                            <option value="High Growth">High Growth</option>
                            <option value="International Shares">International Shares</option>
                            <option value="Property">Property</option>
                            <option value="Australia Fixed Interest">Australia Fixed Interest</option>
                            <option value="International Fixed Interest">International Fixed Interest</option>
                            <option value="Australian Shares">Australian Shares</option>
                            <option value="Other">Other</option>



                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="OtherRiskProfile" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="OtherOngoingFees"
                            className="form-label"
                          >
                            Ongoing Fees
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="OtherOngoingFees"
                            name='OtherOngoingFees'
                            placeholder="Ongoing Fees"
                            disabled={values.otherShares === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='OtherOngoingFees' />
                        </div>
                      </div>

                    </div>

                  </div>
                  {/* OtherForm */}







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

export default InvestmentsSharesManagedFunds;
