import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./businessTextStructure.css"
import plus from "./images/plus.svg"
import notebook from "./images/notebook.svg"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TermDeposits = () => {

  const [TermDeposits, setTermDeposits] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  let initialValues = {

    ClientEdit:"No",
    ClientOpeningValue:"",
    ClientInvestmentReturns:"",
    ClientIncomeYield:"",
    ClientEditReinvest:"No",
    ClientReinvestUpUntil:"",
    ClientRegularContributions:"",
    ClientContributeYear:"",
    ClientContributeUpUntil:"",
    ClientIndexation:"",
    ClientRiskProfile:"Cash",
    
    PartnerEdit:"No",
    PartnerOpeningValue:"",
    PartnerInvestmentReturns:"",
    PartnerIncomeYield:"",
    PartnerEditReinvest:"No",
    PartnerReinvestUpUntil:"",
    PartnerRegularContributions:"",
    PartnerContributeYear:"",
    PartnerContributeUpUntil:"",
    PartnerIndexation:"",
    PartnerRiskProfile:"Cash",
    
    JointEdit:"No",
    JointOpeningValue:"",
    JointInvestmentReturns:"",
    JointIncomeYield:"",
    JointEditReinvest:"No",
    JointReinvestUpUntil:"",
    JointRegularContributions:"",
    JointContributeYear:"",
    JointContributeUpUntil:"",
    JointIndexation:"",
    JointRiskProfile:"Cash",

  }

  let validationSchema = Yup.object({
    // ClientEdit:"No",
    ClientOpeningValue:Yup.number().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      otherwise: Yup.number().notRequired(""),
    }),
    ClientInvestmentReturns:Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }),
    ClientReinvestUpUntil:Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }),
    ClientRegularContributions:Yup.number().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      otherwise: Yup.number().notRequired(""),
    }),
    ClientContributeYear:Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }),
    ClientContributeUpUntil:Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string()
      .required('Required')
      .test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('ClientContributeYear')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
        }),
      otherwise:  Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('ClientContributeYear')));
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),
    ClientIndexation:Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }),
    ClientRiskProfile:Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }),


    //Partner Validation

    PartnerOpeningValue:Yup.number().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      otherwise: Yup.number().notRequired(""),
    }),
    PartnerInvestmentReturns:Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }),
    PartnerReinvestUpUntil:Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }),
    PartnerRegularContributions:Yup.number().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      otherwise: Yup.number().notRequired(""),
    }),
    PartnerContributeYear:Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }),
    PartnerContributeUpUntil:Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string()
      .required('Required')
      .test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('PartnerContributeYear')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
        }),
      otherwise:  Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('PartnerContributeYear')));
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),
    PartnerIndexation:Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }),
    PartnerRiskProfile:Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }),


    //Joint Validation 
    JointOpeningValue:Yup.number().when("JointEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      otherwise: Yup.number().notRequired(""),
    }),
    JointInvestmentReturns:Yup.string().when("JointEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }),
    JointReinvestUpUntil:Yup.string().when("JointEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }),
    JointRegularContributions:Yup.number().when("JointEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      otherwise: Yup.number().notRequired(""),
    }),
    JointContributeYear:Yup.string().when("JointEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }),
    JointContributeUpUntil:Yup.string().when("JointEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string()
      .required('Required')
      .test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('JointContributeYear')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
        }),
      otherwise: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('JointContributeYear')));
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),
    JointIndexation:Yup.string().when("JointEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }),
    JointRiskProfile:Yup.string().when("JointEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }),


  })

  let onSubmit = (values) => {
    // console.log(values);

    let data = {
    ClientEdit:values.ClientEdit,
    ClientOpeningValue:values.ClientOpeningValue,
    ClientInvestmentReturns:values.ClientInvestmentReturns,
    ClientIncomeYield:values.ClientIncomeYield,
    ClientEditReinvest:values.ClientEditReinvest,
    ClientReinvestUpUntil:values.ClientReinvestUpUntil,
    ClientRegularContributions:values.ClientRegularContributions,
    ClientContributeYear:values.ClientContributeYear,
    ClientContributeUpUntil:values.ClientContributeUpUntil,
    ClientIndexation:values.ClientIndexation,
    ClientRiskProfile:values.ClientRiskProfile,
   
    PartnerEdit:values.PartnerEdit,
    PartnerOpeningValue:values.PartnerOpeningValue,
    PartnerInvestmentReturns:values.PartnerInvestmentReturns,
    PartnerIncomeYield:values.PartnerIncomeYield,
    PartnerEditReinvest:values.PartnerEditReinvest,
    PartnerReinvestUpUntil:values.PartnerReinvestUpUntil,
    PartnerRegularContributions:values.PartnerRegularContributions,
    PartnerContributeYear:values.PartnerContributeYear,
    PartnerContributeUpUntil:values.PartnerContributeUpUntil,
    PartnerIndexation:values.PartnerIndexation,
    PartnerRiskProfile:values.PartnerRiskProfile,
   
    JointEdit:values.JointEdit,
    JointOpeningValue:values.JointOpeningValue,
    JointInvestmentReturns:values.JointInvestmentReturns,
    JointIncomeYield:values.JointIncomeYield,
    JointEditReinvest:values.JointEditReinvest,
    JointReinvestUpUntil:values.JointReinvestUpUntil,
    JointRegularContributions:values.JointRegularContributions,
    JointContributeYear:values.JointContributeYear,
    JointContributeUpUntil:values.JointContributeUpUntil,
    JointIndexation:values.JointIndexation,
    JointRiskProfile:values.JointRiskProfile,

    }
    console.log(data);
    setTermDeposits([data]);

  }

  return (
    <>

      <label htmlFor="" className="form-label">
      Term Deposits
      </label>
      <div>
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
                    Term Deposits
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
                              <label
                                htmlFor="ClientOpeningValue"
                                className="form-label">
                                Opening Value
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="ClientOpeningValue"
                                name='ClientOpeningValue'
                                placeholder="Opening Value"
                                disabled={values.ClientEdit === "Yes" ? false : true}
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='ClientOpeningValue' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="ClientInvestmentReturns" className="form-label">
                              Investment Returns
                              </label>
                              <Field
                                id="ClientInvestmentReturns"
                                name='ClientInvestmentReturns'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.ClientEdit === "Yes" ? false : true}

                              >
                                <option value="">Select</option>
                                <option value="System">System</option>
                                <option value="InputOveride">Input Overide</option>
                              </Field>
                              <ErrorMessage component='div' className='text-danger fw-bold' name="ClientInvestmentReturns" />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="ClientIncomeYield"
                                className="form-label"
                              >
                                Income Yield
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="ClientIncomeYield"
                                name='ClientIncomeYield'
                                placeholder="Client Income Yield"
                                disabled
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='ClientIncomeYield' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label className="form-label">
                                Reinvestment  Income
                              </label>

                              {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input type="radio" name="ClientEditReinvest" id="ClientEditReinvest1"
                                    disabled={values.ClientEdit === "Yes" ? false : true}
                                    onChange={handleChange} value="Yes"
                                    checked={values.ClientEditReinvest == "Yes" } />
                                  <label htmlFor="ClientEditReinvest1" className="label1">
                                    <span>YES</span>
                                  </label>
                                  <input type="radio" name="ClientEditReinvest" id="ClientEditReinvest2"
                                    disabled={values.ClientEdit === "Yes" ? false : true}
                                    onChange={handleChange} value="No"
                                    checked={values.ClientEditReinvest == "No"} />
                                  <label htmlFor="ClientEditReinvest2" className="label2">
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                              {/* switch button style */}


                            </div>
                          </div>

                        </div>

                        {/* Second Row Client*/}

                        <div className="row"> 

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="ClientReinvestUpUntil" className="form-label">
                                Reinvest Up Until
                              </label>
                              <Field
                                id="ClientReinvestUpUntil"
                                name='ClientReinvestUpUntil'
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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="ClientReinvestUpUntil" />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="ClientRegularContributions"
                                className="form-label"
                              >
                                Regular contributions p.a
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="ClientRegularContributions"
                                name='ClientRegularContributions'
                                placeholder="Client Regular Contributions p.a"
                                disabled={values.ClientEdit === "Yes" ? false : true}
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='ClientRegularContributions' />
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
                              <label htmlFor="ClientRiskProfile" className="form-label">
                              Risk Profile/SAA
                              </label>
                              <Field
                                id="ClientRiskProfile"
                                name='ClientRiskProfile'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.ClientEdit === "Yes" ? false : true}

                              >
                                <option value="Cash">Cash</option>
                                <option value="Australia Fixed Interest">Australia Fixed Interest</option>
                              </Field>
                              <ErrorMessage component='div' className='text-danger fw-bold' name="ClientRiskProfile" />
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
                              <label
                                htmlFor="PartnerOpeningValue"
                                className="form-label">
                                Opening Value
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="PartnerOpeningValue"
                                name='PartnerOpeningValue'
                                placeholder="Opening Value"
                                disabled={values.PartnerEdit === "Yes" ? false : true}
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerOpeningValue' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="PartnerInvestmentReturns" className="form-label">
                              Investment Returns
                              </label>
                              <Field
                                id="PartnerInvestmentReturns"
                                name='PartnerInvestmentReturns'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.PartnerEdit === "Yes" ? false : true}

                              >
                                <option value="">Select</option>
                                <option value="System">System</option>
                                <option value="InputOveride">Input Overide</option>
                              </Field>
                              <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerInvestmentReturns" />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="PartnerIncomeYield"
                                className="form-label"
                              >
                                Income Yield
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="PartnerIncomeYield"
                                name='PartnerIncomeYield'
                                placeholder="Partner Income Yield"
                                disabled
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerIncomeYield' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label className="form-label">
                                Reinvestment  Income
                              </label>

                              {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input type="radio" name="PartnerEditReinvest" id="PartnerEditReinvest1"
                                    disabled={values.PartnerEdit === "Yes" ? false : true}
                                    onChange={handleChange} value="Yes"
                                    checked={values.PartnerEditReinvest == "Yes" } />
                                  <label htmlFor="PartnerEditReinvest1" className="label1">
                                    <span>YES</span>
                                  </label>
                                  <input type="radio" name="PartnerEditReinvest" id="PartnerEditReinvest2"
                                    disabled={values.PartnerEdit === "Yes" ? false : true}
                                    onChange={handleChange} value="No"
                                    checked={values.PartnerEditReinvest == "No"} />
                                  <label htmlFor="PartnerEditReinvest2" className="label2">
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                              {/* switch button style */}


                            </div>
                          </div>

                        </div>

                        {/* Second Row Partner*/}

                        <div className="row"> 

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="PartnerReinvestUpUntil" className="form-label">
                                Reinvest Up Until
                              </label>
                              <Field
                                id="PartnerReinvestUpUntil"
                                name='PartnerReinvestUpUntil'
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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerReinvestUpUntil" />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="PartnerRegularContributions"
                                className="form-label"
                              >
                                Regular contributions p.a
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="PartnerRegularContributions"
                                name='PartnerRegularContributions'
                                placeholder="Partner Regular Contributions p.a"
                                disabled={values.PartnerEdit === "Yes" ? false : true}
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerRegularContributions' />
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
                              <label htmlFor="PartnerRiskProfile" className="form-label">
                              Risk Profile/SAA
                              </label>
                              <Field
                                id="PartnerRiskProfile"
                                name='PartnerRiskProfile'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.PartnerEdit === "Yes" ? false : true}

                              >
                                <option value="Cash">Cash</option>
                                <option value="Australia Fixed Interest">Australia Fixed Interest</option>
                              </Field>
                              <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerRiskProfile" />
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
                              <label
                                htmlFor="JointOpeningValue"
                                className="form-label">
                                Opening Value
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="JointOpeningValue"
                                name='JointOpeningValue'
                                placeholder="Opening Value"
                                disabled={values.JointEdit === "Yes" ? false : true}
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='JointOpeningValue' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="JointInvestmentReturns" className="form-label">
                              Investment Returns
                              </label>
                              <Field
                                id="JointInvestmentReturns"
                                name='JointInvestmentReturns'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.JointEdit === "Yes" ? false : true}

                              >
                                <option value="">Select</option>
                                <option value="System">System</option>
                                <option value="InputOveride">Input Overide</option>
                              </Field>
                              <ErrorMessage component='div' className='text-danger fw-bold' name="JointInvestmentReturns" />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="JointIncomeYield"
                                className="form-label"
                              >
                                Income Yield
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="JointIncomeYield"
                                name='JointIncomeYield'
                                placeholder="Joint Income Yield"
                                disabled
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='JointIncomeYield' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label className="form-label">
                                Reinvestment  Income
                              </label>

                              {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input type="radio" name="JointEditReinvest" id="JointEditReinvest1"
                                    disabled={values.JointEdit === "Yes" ? false : true}
                                    onChange={handleChange} value="Yes"
                                    checked={values.JointEditReinvest == "Yes" } />
                                  <label htmlFor="JointEditReinvest1" className="label1">
                                    <span>YES</span>
                                  </label>
                                  <input type="radio" name="JointEditReinvest" id="JointEditReinvest2"
                                    disabled={values.JointEdit === "Yes" ? false : true}
                                    onChange={handleChange} value="No"
                                    checked={values.JointEditReinvest == "No"} />
                                  <label htmlFor="JointEditReinvest2" className="label2">
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                              {/* switch button style */}


                            </div>
                          </div>

                        </div>

                        {/* Second Row Joint*/}

                        <div className="row"> 

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="JointReinvestUpUntil" className="form-label">
                                Reinvest Up Until
                              </label>
                              <Field
                                id="JointReinvestUpUntil"
                                name='JointReinvestUpUntil'
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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="JointReinvestUpUntil" />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="JointRegularContributions"
                                className="form-label"
                              >
                                Regular contributions p.a
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="JointRegularContributions"
                                name='JointRegularContributions'
                                placeholder="Joint Regular Contributions p.a"
                                disabled={values.JointEdit === "Yes" ? false : true}
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='JointRegularContributions' />
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
                              <label htmlFor="JointRiskProfile" className="form-label">
                              Risk Profile/SAA
                              </label>
                              <Field
                                id="JointRiskProfile"
                                name='JointRiskProfile'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.JointEdit === "Yes" ? false : true}

                              >
                                <option value="Cash">Cash</option>
                                <option value="Australia Fixed Interest">Australia Fixed Interest</option>
                              </Field>
                              <ErrorMessage component='div' className='text-danger fw-bold' name="JointRiskProfile" />
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

    </>
  )
}

export default TermDeposits;
