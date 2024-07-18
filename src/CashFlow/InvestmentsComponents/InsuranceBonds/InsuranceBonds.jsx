import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./businessTextStructure.css"
import plus from "./images/plus.svg"
import notebook from "./images/notebook.svg"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InsuranceBonds = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let initialValues = {

    ClientEdit:"No",
    ClientOpeningValue:"",
    ClientCostBase:"",
    ClientInvestmentReturns:"",
    ClientEarningsRate:"",
    ClientRegularContributions:"",
    ClientContributeYear:"",
    ClientContributeUpUntil:"",
    ClientIndexation:"",
    ClientRiskProfile:"",
    ClientOngoingFees: "",
    
    PartnerEdit:"No",
    PartnerOpeningValue:"",
    PartnerCostBase:"",
    PartnerInvestmentReturns:"",
    PartnerEarningsRate:"",
    PartnerRegularContributions:"",
    PartnerContributeYear:"",
    PartnerContributeUpUntil:"",
    PartnerIndexation:"",
    PartnerRiskProfile:"",
    PartnerOngoingFees: "",
    
    JointEdit:"No",
    JointOpeningValue:"",
    JointCostBase:"",
    JointInvestmentReturns:"",
    JointEarningsRate:"",
    JointRegularContributions:"",
    JointContributeYear:"",
    JointContributeUpUntil:"",
    JointIndexation:"",
    JointRiskProfile:"",
    JointOngoingFees:"",
  }

  let validationSchema = Yup.object({
    
    ClientOpeningValue:Yup.string().when("ClientEdit", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
    ClientCostBase:Yup.string().when("ClientEdit", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
    ClientRegularContributions:Yup.string().when("ClientEdit", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
    ClientOngoingFees:Yup.string().when("ClientEdit", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
    ClientInvestmentReturns:Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
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
    

    //Partner
    PartnerOpeningValue:Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
      otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
    PartnerCostBase:Yup.string().when("PartnerEdit", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
    PartnerRegularContributions:Yup.string().when("PartnerEdit", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
    PartnerOngoingFees:Yup.string().when("PartnerEdit", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
    PartnerInvestmentReturns:Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
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
    

    //Joint
    JointOpeningValue:Yup.string().when("JointEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
      otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
    }),
    JointCostBase:Yup.string().when("JointEdit", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
    JointRegularContributions:Yup.string().when("JointEdit", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
    JointOngoingFees:Yup.string().when("JointEdit", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
    JointInvestmentReturns:Yup.string().when("JointEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
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
    console.log(values);
    handleClose();
  }

  return (
    <>
      <label htmlFor="" className="form-label">
      Insurance Bonds
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
        keyboard={false} >
        <Modal.Header
          className="text-light modalBG "
          closeButton
        >
          <Modal.Title className="fontStyle">
          Insurance Bonds
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
                      <label
                        htmlFor="ClientCostBase"
                        className="form-label">
                        Cost Base
                      </label>
                      <Field
                        type="number"
                        className="form-control inputDesign  shadow"
                        id="ClientCostBase"
                        name='ClientCostBase'
                        placeholder="Client Cost Base"
                        disabled={values.ClientEdit === "Yes" ? false : true}
                      />
                      <ErrorMessage component='div' className="text-danger fw-bold" name='ClientCostBase' />
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
                        htmlFor="ClientEarningsRate"
                        className="form-label"
                      >
                        Earnings Rate
                      </label>
                      <Field
                        type="number"
                        className="form-control inputDesign  shadow"
                        id="ClientEarningsRate"
                        name='ClientEarningsRate'
                        placeholder="Client Earnings Rate"
                        disabled
                      />
                      <ErrorMessage component='div' className="text-danger fw-bold" name='ClientEarningsRate' />
                    </div>
                  </div>



                </div>

                {/* Second Row Client*/}

                <div className="row"> 

                <div className="col-md-3">
                    <div className="mb-3">
                      <label
                        htmlFor="ClientRegularContributions"
                        className="form-label">
                        Regular contributions p.a
                      </label>
                      <Field
                        type="number"
                        className="form-control inputDesign  shadow"
                        id="ClientRegularContributions"
                        name='ClientRegularContributions'
                        placeholder="Client Regular Contributions"
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


                {/* Third Row Client*/}
                <div className="row">

                 
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
                      <ErrorMessage component='div' className='text-danger fw-bold' name="ClientRiskProfile" />
                    </div>
                  </div> 

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label
                        htmlFor="ClientOngoingFees"
                        className="form-label">
                        Ongoing fees
                      </label>
                      <Field
                        type="number"
                        className="form-control inputDesign  shadow"
                        id="ClientOngoingFees"
                        name='ClientOngoingFees'
                        placeholder="Client Ongoing Fees"
                        disabled={values.ClientEdit === "Yes" ? false : true}
                      />
                      <ErrorMessage component='div' className="text-danger fw-bold" name='ClientOngoingFees' />
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
                      <label
                        htmlFor="PartnerCostBase"
                        className="form-label">
                        Cost Base
                      </label>
                      <Field
                        type="number"
                        className="form-control inputDesign  shadow"
                        id="PartnerCostBase"
                        name='PartnerCostBase'
                        placeholder="Partner Cost Base"
                        disabled={values.PartnerEdit === "Yes" ? false : true}
                      />
                      <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerCostBase' />
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
                        htmlFor="PartnerEarningsRate"
                        className="form-label"
                      >
                        Earnings Rate
                      </label>
                      <Field
                        type="number"
                        className="form-control inputDesign  shadow"
                        id="PartnerEarningsRate"
                        name='PartnerEarningsRate'
                        placeholder="Partner Earnings Rate"
                        disabled
                      />
                      <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerEarningsRate' />
                    </div>
                  </div>



                </div>

                {/* Second Row Partner*/}

                <div className="row"> 

                <div className="col-md-3">
                    <div className="mb-3">
                      <label
                        htmlFor="PartnerRegularContributions"
                        className="form-label">
                        Regular contributions p.a
                      </label>
                      <Field
                        type="number"
                        className="form-control inputDesign  shadow"
                        id="PartnerRegularContributions"
                        name='PartnerRegularContributions'
                        placeholder="Partner Regular Contributions"
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


                {/* Third Row Partner*/}
                <div className="row">

                 
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
                      <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerRiskProfile" />
                    </div>
                  </div> 

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label
                        htmlFor="PartnerOngoingFees"
                        className="form-label">
                        Ongoing fees
                      </label>
                      <Field
                        type="number"
                        className="form-control inputDesign  shadow"
                        id="PartnerOngoingFees"
                        name='PartnerOngoingFees'
                        placeholder="Partner Ongoing Fees"
                        disabled={values.PartnerEdit === "Yes" ? false : true}
                      />
                      <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerOngoingFees' />
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
                      <label
                        htmlFor="JointCostBase"
                        className="form-label">
                        Cost Base
                      </label>
                      <Field
                        type="number"
                        className="form-control inputDesign  shadow"
                        id="JointCostBase"
                        name='JointCostBase'
                        placeholder="Joint Cost Base"
                        disabled={values.JointEdit === "Yes" ? false : true}
                      />
                      <ErrorMessage component='div' className="text-danger fw-bold" name='JointCostBase' />
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
                        htmlFor="JointEarningsRate"
                        className="form-label"
                      >
                       Earnings Rate
                      </label>
                      <Field
                        type="number"
                        className="form-control inputDesign  shadow"
                        id="JointEarningsRate"
                        name='JointEarningsRate'
                        placeholder="Joint Earnings Rate"
                        disabled
                      />
                      <ErrorMessage component='div' className="text-danger fw-bold" name='JointEarningsRate' />
                    </div>
                  </div>



                </div>

                {/* Second Row Joint*/}

                <div className="row"> 

                <div className="col-md-3">
                    <div className="mb-3">
                      <label
                        htmlFor="JointRegularContributions"
                        className="form-label">
                        Regular contributions p.a
                      </label>
                      <Field
                        type="number"
                        className="form-control inputDesign  shadow"
                        id="JointRegularContributions"
                        name='JointRegularContributions'
                        placeholder="Joint Regular Contributions"
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


                </div>


                {/* Third Row Joint*/}
                <div className="row">

                 
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
                      <ErrorMessage component='div' className='text-danger fw-bold' name="JointRiskProfile" />
                    </div>
                  </div> 

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label
                        htmlFor="JointOngoingFees"
                        className="form-label">
                        Ongoing fees
                      </label>
                      <Field
                        type="number"
                        className="form-control inputDesign  shadow"
                        id="JointOngoingFees"
                        name='JointOngoingFees'
                        placeholder="Joint Ongoing Fees"
                        disabled={values.JointEdit === "Yes" ? false : true}
                      />
                      <ErrorMessage component='div' className="text-danger fw-bold" name='JointOngoingFees' />
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

export default InsuranceBonds;
