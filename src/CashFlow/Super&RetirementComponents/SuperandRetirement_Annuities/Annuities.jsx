import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import { differenceInYears, getDate } from "date-fns";
import Modal from "react-bootstrap/Modal";

import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "yup-phone";

//Images 
import plus from "./images/plus.svg";

const Annuities = () => {
  let [AnnuitiesModal, setAnnuitiesModal] = useState(false);
  let [Annuities, setAnnuities] = useState([]);


  let initialValues = {
    Annuities: "Yes",
    
    ClientEdit:"No",
    ClientProductProvider:"",
    ClientOriginalAmount:"",
    ClientSourceFunds:"",
    ClientAnnuityType:"",
    ClientReversionaryAnnuity:"No",
    ClientRCVPercent:"",
    ClientRCV:"",
    ClientIncludeYear:"",
    ClientTerm:"",
    ClientYearsMaturity:"",
    ClientOtherTerm:"",
    ClientAnnualInflation:"",
    ClientAnnualPayment:"",
    ClientOtherDeductibleAmount:"",
    ClientDeductibleAmount:"",

    PartnerEdit:"No",
    PartnerProductProvider:"",
    PartnerOriginalAmount:"",
    PartnerSourceFunds:"",
    PartnerAnnuityType:"",
    PartnerReversionaryAnnuity:"No",
    PartnerRCVPercent:"",
    PartnerRCV:"",
    PartnerIncludeYear:"",
    PartnerTerm:"",
    PartnerYearsMaturity:"",
    PartnerOtherTerm:"",
    PartnerAnnualInflation:"",
    PartnerAnnualPayment:"",
    PartnerOtherDeductibleAmount:"",
    PartnerDeductibleAmount:"",

  };

  let validationSchema = Yup.object().shape({
    // ClientEdit:"No",
    ClientProductProvider:Yup.string().when("ClientEdit", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientOriginalAmount:Yup.number().when("ClientEdit", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientSourceFunds:Yup.string().when("ClientEdit", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientAnnuityType:Yup.string().when("ClientEdit", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientRCVPercent:Yup.number().when("ClientEdit", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientIncludeYear:Yup.string().when("ClientEdit", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientTerm:Yup.string().when("ClientEdit", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientYearsMaturity:Yup.string().when("ClientEdit", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientOtherTerm:Yup.string().when("ClientEdit", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientAnnualInflation:Yup.string().when("ClientEdit", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientAnnualPayment:Yup.number().when("ClientEdit", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientOtherDeductibleAmount:Yup.number().when("ClientEdit", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only

    // PartnerEdit:"No",
    PartnerProductProvider:Yup.string().when("PartnerEdit", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    PartnerOriginalAmount:Yup.number().when("PartnerEdit", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    PartnerSourceFunds:Yup.string().when("PartnerEdit", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    PartnerAnnuityType:Yup.string().when("PartnerEdit", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    PartnerRCVPercent:Yup.number().when("PartnerEdit", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    PartnerIncludeYear:Yup.string().when("PartnerEdit", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    PartnerTerm:Yup.string().when("PartnerEdit", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    PartnerYearsMaturity:Yup.string().when("PartnerEdit", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    PartnerOtherTerm:Yup.string().when("PartnerEdit", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    PartnerAnnualInflation:Yup.string().when("PartnerEdit", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    PartnerAnnualPayment:Yup.number().when("PartnerEdit", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    PartnerOtherDeductibleAmount:Yup.number().when("PartnerEdit", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only

  });

  function onSubmit(values, { resetForm }) {
    console.log(values);
    let data = {
        Annuities:values.Annuities,

        ClientEdit:values.ClientEdit,
        ClientProductProvider:values.ClientProductProvider,
        ClientOriginalAmount:values.ClientOriginalAmount,
        ClientSourceFunds:values.ClientSourceFunds,
        ClientAnnuityType:values.ClientAnnuityType,
        ClientReversionaryAnnuity:values.ClientReversionaryAnnuity,
        ClientRCVPercent:values.ClientRCVPercent,
        ClientRCV:values.ClientRCV,
        ClientIncludeYear:values.ClientIncludeYear,
        ClientTerm:values.ClientTerm,
        ClientYearsMaturity:values.ClientYearsMaturity,
        ClientOtherTerm:values.ClientOtherTerm,
        ClientAnnualInflation:values.ClientAnnualInflation,
        ClientAnnualPayment:values.ClientAnnualPayment,
        ClientOtherDeductibleAmount:values.ClientOtherDeductibleAmount,
        ClientDeductibleAmount:values.ClientDeductibleAmount,
        
        PartnerEdit:values.PartnerEdit,
        PartnerProductProvider:values.PartnerProductProvider,
        PartnerOriginalAmount:values.PartnerOriginalAmount,
        PartnerSourceFunds:values.PartnerSourceFunds,
        PartnerAnnuityType:values.PartnerAnnuityType,
        PartnerReversionaryAnnuity:values.PartnerReversionaryAnnuity,
        PartnerRCVPercent:values.PartnerRCVPercent,
        PartnerRCV:values.PartnerRCV,
        PartnerIncludeYear:values.PartnerIncludeYear,
        PartnerTerm:values.PartnerTerm,
        PartnerYearsMaturity:values.PartnerYearsMaturity,
        PartnerOtherTerm:values.PartnerOtherTerm,
        PartnerAnnualInflation:values.PartnerAnnualInflation,
        PartnerAnnualPayment:values.PartnerAnnualPayment,
        PartnerOtherDeductibleAmount:values.PartnerOtherDeductibleAmount,
        PartnerDeductibleAmount:values.PartnerDeductibleAmount,

    };

    setAnnuities([...Annuities, data]);
    resetForm();
  }



  return (
    <div>
    <label className="form-label"> Annuities  </label>
    <br />
    
      
      <button type="button" className="btn btn-outline-success"
        onClick={() => { setAnnuitiesModal(true); }}
      >
        <div className="iconContainer mx-1">
          <img className="img-fluid" src={plus} alt="" />
        </div>
        Enter Details
      </button>

      <Modal
        show={AnnuitiesModal}
        onHide={() => { setAnnuitiesModal(false) }}
        backdrop="static"
        className="modal-xl"
        keyboard={false}
      >
        <Modal.Header
          className="text-light modalBG "
          closeButton
        >
          <Modal.Title className="fontStyle">
            Annuities
            <div className="iconContainerLg">
            </div>
          </Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue, setValues, handleChange, handleBlur }) => (
            <Form>
              <Modal.Body>
                {/* Professional Advisor Detail Form */}


                <div className="row mb-4">
                  <div className="col-md-3">
                  <label className="form-label">Annuities Forms</label>
                    <div className="form-check form-switch p-0  ">
                      <div className="radiobutton w-25">
                        <input type="radio" name="Annuities" id="Annuities1"
                          onChange={handleChange} value="Yes"
                          checked={values.Annuities == "Yes"} />
                        <label htmlFor="Annuities1" className="label1 w-50">
                          <span>Client</span>
                        </label>
                        <input type="radio" name="Annuities" id="Annuities2"
                          onChange={handleChange} value="No"

                          checked={values.Annuities == "No"} />
                        <label htmlFor="Annuities2" className="label2 w-50">
                          <span>Partner</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {values.Annuities == "Yes" &&
                  <>
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


                {/* First Row */}
                <div className="row">

                  <div className="col-md-3">
                    <label htmlFor="ClientProductProvider" className="form-label">Investment Asset</label>
                    <Field as="select" className="form-select shadow inputDesign" id="ClientProductProvider"
                      name="ClientProductProvider" disabled={values.ClientEdit === "Yes" ? false : true}>
                      <option value="">Select</option>
                      <option value="Challenger">Challenger</option>
                      <option value="Commlnsure">Commlnsure</option>
                      <option value="Other">Other</option>
                    </Field>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="ClientProductProvider" />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="ClientOriginalAmount" className="form-label">Original Investment Amount</label>
                    <Field type="number" className="form-control shadow inputDesign" id="ClientOriginalAmount"
                      name="ClientOriginalAmount" placeholder="Original Investment Amount"
                      disabled={values.ClientEdit === "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="ClientOriginalAmount" />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="ClientSourceFunds" className="form-label">Source of Funds</label>
                    <Field as="select" className="form-select shadow inputDesign" id="ClientSourceFunds"
                      disabled={values.ClientEdit === "Yes" ? false : true}
                      name="ClientSourceFunds" >
                      <option value="">Select</option>
                      <option value="Ordinary">Ordinary</option>
                      <option value="Super">Super</option>
                    </Field>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="ClientSourceFunds" />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="ClientAnnuityType" className="form-label">Annuity Type</label>
                    <Field as="select" className="form-select shadow inputDesign" id="ClientAnnuityType"
                      disabled={values.ClientEdit === "Yes" ? false : true}
                      name="ClientAnnuityType" >
                      <option value="">Select</option>
                      <option value="Long-Term">Long-Term</option>
                      <option value="Short-Term">Short-Term</option>
                      <option value="Life-Time">Life-Time</option>
                    </Field>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="ClientAnnuityType" />
                  </div>

                </div>

                {/* Second Row */}
                <div className="row">

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">
                        Is this a Reversionary Annuity
                      </label>

                      {/* switch button style */}
                      <div className="form-check form-switch m-0 p-0 ">
                        <div className="radiobutton">
                          <input type="radio" name="ClientReversionaryAnnuity" id="ClientReversionaryAnnuity1"
                            disabled={values.ClientEdit === "Yes" ? false : true}
                            onChange={handleChange} value="Yes"
                            checked={values.ClientReversionaryAnnuity == "Yes"} />
                          <label htmlFor="ClientReversionaryAnnuity1" className="label1">
                            <span>YES</span>
                          </label>
                          <input type="radio" name="ClientReversionaryAnnuity" id="ClientReversionaryAnnuity2"
                            disabled={values.ClientEdit === "Yes" ? false : true}
                            onChange={handleChange} value="No"
                            checked={values.ClientReversionaryAnnuity == "No"} />
                          <label htmlFor="ClientReversionaryAnnuity2" className="label2">
                            <span>NO</span>
                          </label>
                        </div>
                      </div>
                      {/* switch button style */}


                    </div>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="ClientRCVPercent" className="form-label">RCV %</label>
                    <Field type="number" className="form-control shadow inputDesign" id="ClientRCVPercent"
                      name="ClientRCVPercent" placeholder="RCV %"
                      disabled={values.ClientEdit === "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="ClientRCVPercent" />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="ClientRCV" className="form-label">RCV</label>
                    <Field type="number" className="form-control shadow inputDesign" id="ClientRCV"
                      name="ClientRCV" placeholder="RCV" disabled />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="ClientRCV" />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="ClientIncludeYear" className="form-label">Include From Year</label>
                    <Field as="select" className="form-select shadow inputDesign" id="ClientIncludeYear"
                      name="ClientIncludeYear" disabled ={values.ClientEdit === "Yes" ? false : true}  >
                      <option value="">Select</option>
                      <option value="Existing">Existing</option>
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="ClientIncludeYear" />
                  </div>

                </div>

                {/* Third Row */}
                <div className="row">

                  <div className="col-md-3">
                    <label htmlFor="ClientTerm" className="form-label">Term</label>
                    <Field as="select" className="form-select shadow inputDesign" id="ClientTerm"
                      name="ClientTerm" disabled ={values.ClientEdit === "Yes" ? false : true} >
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="ClientTerm" />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="ClientYearsMaturity" className="form-label">Years Until Maturity</label>
                    <Field as="select" className="form-select shadow inputDesign" id="ClientYearsMaturity"
                      name="ClientYearsMaturity" disabled ={values.ClientEdit === "Yes" ? false : true} >
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="ClientYearsMaturity" />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="ClientOtherTerm" className="form-label">Other commuation End Term</label>
                    <Field type="number" className="form-control shadow inputDesign" id="ClientOtherTerm"
                      name="ClientOtherTerm" placeholder="Other commuation at End of Term"
                      disabled={values.ClientEdit === "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="ClientOtherTerm" />
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="ClientAnnualInflation" className="form-label">
                      Annual Inflation Rate
                      </label>
                      <Field
                        id="ClientAnnualInflation"
                        name='ClientAnnualInflation'
                        className="form-select shadow  inputDesign"
                        as='select'
                        disabled ={values.ClientEdit === "Yes" ? false : true}
                      >
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
                      <ErrorMessage component='div' className='text-danger fw-bold' name="ClientAnnualInflation" />
                    </div>
                  </div>

                </div>

                {/* Fourth Row */}

              <div className="row">

              <div className="col-md-3">
                    <label htmlFor="ClientAnnualPayment" className="form-label">Annual Payment</label>
                    <Field type="number" className="form-control shadow inputDesign" id="ClientAnnualPayment"
                      name="ClientAnnualPayment" placeholder="Annual Payment"
                      disabled={values.ClientEdit === "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="ClientAnnualPayment" />
                </div>

                <div className="col-md-3">
                    <label htmlFor="ClientOtherDeductibleAmount" className="form-label">Other Deductible Amount</label>
                    <Field type="number" className="form-control shadow inputDesign" id="ClientOtherDeductibleAmount"
                      name="ClientOtherDeductibleAmount" placeholder="Other Deductible Amount"
                      disabled={values.ClientEdit === "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="ClientOtherDeductibleAmount" />
                </div>

                <div className="col-md-3">
                    <label htmlFor="ClientDeductibleAmount" className="form-label">Deductible Amount</label>
                    <Field type="number" className="form-control shadow inputDesign" id="ClientDeductibleAmount"
                      name="ClientDeductibleAmount" placeholder="Deductible Amount"
                      disabled />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="ClientDeductibleAmount" />
                </div>

              </div>

                </div>
                {/* ClientForm */}

                {/* Table */}
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive my-3">
                      <table className="table table-bordered table-hover text-center">
                        <thead className="text-light" id="tableHead">
                          <tr>
                            <th>Original Investment</th>
                            <th>RCV</th>
                            <th>Annual Payment</th>
                            <th>Deductible Amount</th>
                            <th>Operation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Annuities.map((elem, index) => {
                            if (elem.ClientEdit == "Yes") {
                              return (
                                <tr>
                                  <td>{elem.ClientOriginalAmount}</td>
                                  <td>{elem.ClientRCVPercent}</td>
                                  <td>{elem.ClientAnnualPayment}</td>
                                  <td>{elem.ClientOtherDeductibleAmount}</td>
                                  <td>
                                    <button type='button' className='btn btn-danger btn-sm'>delete</button>
                                    <button type='button' onClick={() => { setValues(elem) }} className='btn btn-warning btn-sm mx-2'>update</button>
                                  </td>
                                </tr>
                              )
                            }
                          })}

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Table */}
                
                </>
              }
               
              {values.Annuities == "No" &&
              <>
               {/* PartnerForm */}
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


                {/* First Row */}
                <div className="row">

                  <div className="col-md-3">
                    <label htmlFor="PartnerProductProvider" className="form-label">Investment Asset</label>
                    <Field as="select" className="form-select shadow inputDesign" id="PartnerProductProvider"
                      name="PartnerProductProvider" disabled={values.PartnerEdit === "Yes" ? false : true}>
                      <option value="">Select</option>
                      <option value="Challenger">Challenger</option>
                      <option value="Commlnsure">Commlnsure</option>
                      <option value="Other">Other</option>
                    </Field>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="PartnerProductProvider" />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="PartnerOriginalAmount" className="form-label">Original Investment Amount</label>
                    <Field type="number" className="form-control shadow inputDesign" id="PartnerOriginalAmount"
                      name="PartnerOriginalAmount" placeholder="Original Investment Amount"
                      disabled={values.PartnerEdit === "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="PartnerOriginalAmount" />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="PartnerSourceFunds" className="form-label">Source of Funds</label>
                    <Field as="select" className="form-select shadow inputDesign" id="PartnerSourceFunds"
                      disabled={values.PartnerEdit === "Yes" ? false : true}
                      name="PartnerSourceFunds" >
                      <option value="">Select</option>
                      <option value="Ordinary">Ordinary</option>
                      <option value="Super">Super</option>
                    </Field>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="PartnerSourceFunds" />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="PartnerAnnuityType" className="form-label">Annuity Type</label>
                    <Field as="select" className="form-select shadow inputDesign" id="PartnerAnnuityType"
                      disabled={values.PartnerEdit === "Yes" ? false : true}
                      name="PartnerAnnuityType" >
                      <option value="">Select</option>
                      <option value="Long-Term">Long-Term</option>
                      <option value="Short-Term">Short-Term</option>
                      <option value="Life-Time">Life-Time</option>
                    </Field>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="PartnerAnnuityType" />
                  </div>

                </div>

                {/* Second Row */}
                <div className="row">

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">
                        Is this a Reversionary Annuity
                      </label>

                      {/* switch button style */}
                      <div className="form-check form-switch m-0 p-0 ">
                        <div className="radiobutton">
                          <input type="radio" name="PartnerReversionaryAnnuity" id="PartnerReversionaryAnnuity1"
                            disabled={values.PartnerEdit === "Yes" ? false : true}
                            onChange={handleChange} value="Yes"
                            checked={values.PartnerReversionaryAnnuity == "Yes"} />
                          <label htmlFor="PartnerReversionaryAnnuity1" className="label1">
                            <span>YES</span>
                          </label>
                          <input type="radio" name="PartnerReversionaryAnnuity" id="PartnerReversionaryAnnuity2"
                            disabled={values.PartnerEdit === "Yes" ? false : true}
                            onChange={handleChange} value="No"
                            checked={values.PartnerReversionaryAnnuity == "No"} />
                          <label htmlFor="PartnerReversionaryAnnuity2" className="label2">
                            <span>NO</span>
                          </label>
                        </div>
                      </div>
                      {/* switch button style */}


                    </div>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="PartnerRCVPercent" className="form-label">RCV %</label>
                    <Field type="number" className="form-control shadow inputDesign" id="PartnerRCVPercent"
                      name="PartnerRCVPercent" placeholder="RCV %"
                      disabled={values.PartnerEdit === "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="PartnerRCVPercent" />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="PartnerRCV" className="form-label">RCV</label>
                    <Field type="number" className="form-control shadow inputDesign" id="PartnerRCV"
                      name="PartnerRCV" placeholder="RCV" disabled />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="PartnerRCV" />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="PartnerIncludeYear" className="form-label">Include From Year</label>
                    <Field as="select" className="form-select shadow inputDesign" id="PartnerIncludeYear"
                      name="PartnerIncludeYear" disabled ={values.PartnerEdit === "Yes" ? false : true}  >
                      <option value="">Select</option>
                      <option value="Existing">Existing</option>
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="PartnerIncludeYear" />
                  </div>

                </div>

                {/* Third Row */}
                <div className="row">

                  <div className="col-md-3">
                    <label htmlFor="PartnerTerm" className="form-label">Term</label>
                    <Field as="select" className="form-select shadow inputDesign" id="PartnerTerm"
                      name="PartnerTerm" disabled ={values.PartnerEdit === "Yes" ? false : true} >
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="PartnerTerm" />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="PartnerYearsMaturity" className="form-label">Years Until Maturity</label>
                    <Field as="select" className="form-select shadow inputDesign" id="PartnerYearsMaturity"
                      name="PartnerYearsMaturity" disabled ={values.PartnerEdit === "Yes" ? false : true} >
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="PartnerYearsMaturity" />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="PartnerOtherTerm" className="form-label">Other commuation End Term</label>
                    <Field type="number" className="form-control shadow inputDesign" id="PartnerOtherTerm"
                      name="PartnerOtherTerm" placeholder="Other commuation at End of Term"
                      disabled={values.PartnerEdit === "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="PartnerOtherTerm" />
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="PartnerAnnualInflation" className="form-label">
                      Annual Inflation Rate
                      </label>
                      <Field
                        id="PartnerAnnualInflation"
                        name='PartnerAnnualInflation'
                        className="form-select shadow  inputDesign"
                        as='select'
                        disabled ={values.PartnerEdit === "Yes" ? false : true}
                      >
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
                      <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerAnnualInflation" />
                    </div>
                  </div>

                </div>

                {/* Fourth Row */}

                <div className="row">

                <div className="col-md-3">
                      <label htmlFor="PartnerAnnualPayment" className="form-label">Annual Payment</label>
                      <Field type="number" className="form-control shadow inputDesign" id="PartnerAnnualPayment"
                        name="PartnerAnnualPayment" placeholder="Annual Payment"
                        disabled={values.PartnerEdit === "Yes" ? false : true} />
                      <ErrorMessage component="div" className="text-danger fw-bold" name="PartnerAnnualPayment" />
                  </div>

                  <div className="col-md-3">
                      <label htmlFor="PartnerOtherDeductibleAmount" className="form-label">Other Deductible Amount</label>
                      <Field type="number" className="form-control shadow inputDesign" id="PartnerOtherDeductibleAmount"
                        name="PartnerOtherDeductibleAmount" placeholder="Other Deductible Amount"
                        disabled={values.PartnerEdit === "Yes" ? false : true} />
                      <ErrorMessage component="div" className="text-danger fw-bold" name="PartnerOtherDeductibleAmount" />
                  </div>

                  <div className="col-md-3">
                      <label htmlFor="PartnerDeductibleAmount" className="form-label">Deductible Amount</label>
                      <Field type="number" className="form-control shadow inputDesign" id="PartnerDeductibleAmount"
                        name="PartnerDeductibleAmount" placeholder="Deductible Amount"
                        disabled />
                      <ErrorMessage component="div" className="text-danger fw-bold" name="PartnerDeductibleAmount" />
                  </div>

                </div>

                </div>
                {/* PartnerForm */}

                {/* Table */}
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive my-3">
                      <table className="table table-bordered table-hover text-center">
                        <thead className="text-light" id="tableHead">
                          <tr>
                            <th>Original Investment</th>
                            <th>RCV</th>
                            <th>Annual Payment</th>
                            <th>Deductible Amount</th>
                            <th>Operation</th>
                          </tr>
                        </thead>
                        <tbody>
                            {Annuities.map((elem, index) => {
                              if (elem.PartnerEdit=="Yes") {
                                return (
                                  <tr>
                                    <td>{elem.PartnerOriginalAmount}</td>
                                    <td>{elem.PartnerRCVPercent}</td>
                                    <td>{elem.PartnerAnnualPayment}</td>
                                    <td>{elem.PartnerOtherDeductibleAmount}</td>
                                    <td>
                                      <button type='button' className='btn btn-danger btn-sm'>delete</button>
                                      <button type='button' onClick={() => { setValues(elem) }} className='btn btn-warning btn-sm mx-2'>update</button>
                                    </td>
                                  </tr>
                                )
                            }

                          })}

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Table */}
                
                </>
              }
                
                

                {/* Professional Advisor Detail Form */}
              </Modal.Body>
              <Modal.Footer>
                <div className="col-md-12">
                  <button
                    className="float-end btn w-25  bgColor modalBtn"
                    // onClick={handleClose}
                    type="submit"
                  >
                    Save
                  </button>
                  <button
                    type='button'
                    className="float-end btn w-25  btn-outline  backBtn mx-3"
                    onClick={() => { setAnnuitiesModal(false) }}
                  >
                    Cancel
                  </button>
                </div>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>





    </div>
  )
}

export default Annuities;
