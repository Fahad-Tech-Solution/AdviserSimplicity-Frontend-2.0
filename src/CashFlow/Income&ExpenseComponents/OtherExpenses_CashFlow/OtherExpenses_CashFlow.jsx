import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { differenceInYears, getDate } from "date-fns";
import Modal from "react-bootstrap/Modal";

import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "yup-phone";

//Images 
import plus from "./images/plus.svg";
import male from "./images/male.svg";
import female from "./images/female.svg";

const OtherExpenses_CashFlow = () => {
    let [OtherExpensesModal, setOtherExpensesModal] = useState(false); 
   
  let initialValues = {
    Holidays:"No",
    HolidaysAmount:"",
    HolidaysStatingYear:"",
    HolidaysEndingYear:"",
    HolidaysIndexation:"",

    Other:"No",
    OtherAmount:"",
    OtherStatingYear:"",
    OtherEndingYear:"",
    OtherIndexation:"",

    personalInsurance:"No",
    personalInsuranceAmount:"",
    personalInsuranceStatingYear:"",
    personalInsuranceEndingYear:"",
    personalInsuranceIndexation:"",
    

  };

  let validationSchema = Yup.object().shape({

    HolidaysAmount:Yup.string().when("Holidays", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
    }),
    
    HolidaysStatingYear:Yup.string().when("Holidays", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required('Required'),
      otherwise: Yup.string().notRequired(""),
    }),
    
//     HolidaysEndingYear:Yup.string().when("Holidays", {
//       is: (val) => val && val.length == 3,
//       then: Yup.string().required('Required').test('is-greater', 'To Year must be greater than From Year', function(value) {
//         const fromYear = parseInt(this.resolve(Yup.ref('HolidaysStatingYear')));
//         const toYear = parseInt(value);
//         return toYear >= fromYear;
//         }),
//       otherwise: Yup.string().notRequired(""),
//     }),

    HolidaysEndingYear: Yup.string().when("Holidays", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required").test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('HolidaysStatingYear')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = this.parent.HolidaysStatingYear;
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),



    HolidaysIndexation:Yup.string().when("Holidays", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required('Required'),
      otherwise: Yup.string().notRequired(""),
    }),

    OtherAmount:Yup.string().when("Other", {
      is: (val) => val && val.length == 3,
      then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
      otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
    }),
    OtherStatingYear:Yup.string().when("Other", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required('Required'),
      otherwise: Yup.string().notRequired(""),
    }),
//     OtherEndingYear:Yup.string().when("Other", {
//       is: (val) => val && val.length == 3,
//       then: Yup.string().required('Required').test('is-greater', 'To Year must be greater than From Year', function(value) {
//         const fromYear = parseInt(this.resolve(Yup.ref('OtherStatingYear')));
//         const toYear = parseInt(value);
//         return toYear >= fromYear;
//         }),
//       otherwise: Yup.string().notRequired(""),
//     }),

    OtherEndingYear: Yup.string().when("Other", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required").test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('OtherStatingYear')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = this.parent.OtherStatingYear;
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),



    OtherIndexation:Yup.string().when("Other", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required('Required'),
      otherwise: Yup.string().notRequired(""),
    }),

    personalInsuranceAmount:Yup.string().when("personalInsurance", {
      is: (val) => val && val.length == 3,
      then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
      otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
    }),
    personalInsuranceStatingYear:Yup.string().when("personalInsurance", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required('Required'),
      otherwise: Yup.string().notRequired(""),
    }),
//     personalInsuranceEndingYear:Yup.string().when("personalInsurance", {
//       is: (val) => val && val.length == 3,
//       then: Yup.string().required('Required').test('is-greater', 'To Year must be greater than From Year', function(value) {
//         const fromYear = parseInt(this.resolve(Yup.ref('personalInsuranceStatingYear')));
//         const toYear = parseInt(value);
//         return toYear >= fromYear;
//         }),
//       otherwise: Yup.string().notRequired(""),
//     }),


    personalInsuranceEndingYear: Yup.string().when("personalInsurance", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required").test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('personalInsuranceStatingYear')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = this.parent.personalInsuranceStatingYear;
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),
    personalInsuranceIndexation:Yup.string().when("personalInsurance", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required('Required'),
      otherwise: Yup.string().notRequired(""),
    }),
  });

  function onSubmit(values) {
    // console.log(values);
    let data = {
      Holidays:values.Holidays,
      HolidaysAmount:values.HolidaysAmount,
      HolidaysStatingYear:values.HolidaysStatingYear,
      HolidaysEndingYear:values.HolidaysEndingYear,
      HolidaysIndexation:values.HolidaysIndexation,
  
      Other:values.Other,
      OtherAmount:values.OtherAmount,
      OtherStatingYear:values.OtherStatingYear,
      OtherEndingYear:values.OtherEndingYear,
      OtherIndexation:values.OtherIndexation,
  
      personalInsurance:values.personalInsurance,
      personalInsuranceAmount:values.personalInsuranceAmount,
      personalInsuranceStatingYear:values.personalInsuranceStatingYear,
      personalInsuranceEndingYear:values.personalInsuranceEndingYear,
      personalInsuranceIndexation:values.personalInsuranceIndexation,
    }
    console.log(data);
  }


    
  return (
        <div>
       
        <label className="form-label">Other Expenses</label>
        <br/>
        <button type="button" className=" btn  btn-outline-success "
          onClick={()=>{setOtherExpensesModal(true);}}
        >
          <div className="iconContainer mx-1">
            <img className="img-fluid" src={plus} alt="" />
          </div>
          Enter Details
        </button>
          
        
          <Modal
          show={OtherExpensesModal}
          onHide={()=>{setOtherExpensesModal(false)}}
          backdrop="static"
          className="modal-xl"
          keyboard={false}
        >
          <Modal.Header
            className="text-light modalBG "
            closeButton
          >
            <Modal.Title className="fontStyle">
                Other Expenses
              <div className="iconContainerLg">
              </div>
            </Modal.Title>
          </Modal.Header>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue, setValues, handleChange,handleBlur }) => (
              <Form>
                <Modal.Body>
                    {/* Professional Advisor Detail Form */}
                    <div className="row">
                      <div className="col-md-12">
                        <h3>Holidays</h3>
                        <div className="form-check form-switch m-0 p-0 ">
                        <div className="radiobutton">
                          <input type="radio" name="Holidays" id="Holidays1"
                            value="Yes" onChange={handleChange} checked={values.Holidays == "Yes"}
                          />
                          <label htmlFor="Holidays1" className="label1">
                            <span>YES</span>
                          </label>
                          <input type="radio" name="Holidays" id="Holidays2"
                            value="No" onChange={handleChange} checked={values.Holidays == "No"}/>
                          <label htmlFor="Holidays2" className="label2">
                            <span>NO</span>
                          </label>
                        </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-3">
                        <label htmlFor="HolidaysAmount" className="form-label">  Amount  </label>
                        <Field type="number" className="form-control shadow inputDesign" id="HolidaysAmount"
                        name="HolidaysAmount" placeholder="$00.00"  disabled={values.Holidays==="Yes"? false :  true} />
                        <ErrorMessage component="div" className="text-danger fw-bold" name="HolidaysAmount" />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="HolidaysStatingYear" className="form-label"> From Year</label>
                        <Field as="select" className="form-select shadow inputDesign" id="HolidaysStatingYear"
                        name="HolidaysStatingYear" placeholder="HolidaysStatingYear"  disabled={values.Holidays==="Yes"? false :  true}  >
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
                        <ErrorMessage component="div" className="text-danger fw-bold" name="HolidaysStatingYear" />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="HolidaysEndingYear" className="form-label"> To Year</label>
                        <Field as="select" className="form-select shadow inputDesign" id="HolidaysEndingYear"
                        name="HolidaysEndingYear" placeholder="EndingYear"   disabled={values.Holidays==="Yes"? false :  true} >
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
                        <ErrorMessage component="div" className="text-danger fw-bold" name="HolidaysEndingYear" />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="HolidaysIndexation" className="form-label"> Indexation</label>
                        <Field as="select" className="form-select shadow inputDesign" id="HolidaysIndexation"
                        name="HolidaysIndexation" placeholder="Indexation"  disabled={values.Holidays==="Yes"? false :  true}  >
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
                        <ErrorMessage component="div" className="text-danger fw-bold" name="HolidaysIndexation" />
                      </div>
                    </div>
                <hr />
              
                    <div className="row">
                        <div className="col-md-12">
                        <h3>Other</h3>
                        <div className="form-check form-switch m-0 p-0 ">
                        <div className="radiobutton">
                            <input type="radio" name="Other" id="Other1"
                            value="Yes" onChange={handleChange} checked={values.Other == "Yes"}
                            />
                            <label htmlFor="Other1" className="label1">
                            <span>YES</span>
                            </label>
                            <input type="radio" name="Other" id="Other2"
                            value="No" onChange={handleChange} checked={values.Other == "No"}/>
                            <label htmlFor="Other2" className="label2">
                            <span>NO</span>
                            </label>
                        </div>
                        </div>
                        </div>
                    </div>
                <div className="row mt-3">
                    <div className="col-md-3">
                    <label htmlFor="OtherAmount" className="form-label">  Amount  </label>
                    <Field type="number" className="form-control shadow inputDesign" id="OtherAmount"
                    name="OtherAmount" placeholder="$00.00"  disabled={values.Other==="Yes"? false :  true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="OtherAmount" />
                    </div>
                    <div className="col-md-3">
                    <label htmlFor="OtherStatingYear" className="form-label"> From Year</label>
                    <Field as="select" className="form-select shadow inputDesign" id="OtherStatingYear"
                    name="OtherStatingYear" placeholder="OtherStatingYear"  disabled={values.Other==="Yes"? false :  true}  >
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="OtherStatingYear" />
                    </div>
                    <div className="col-md-3">
                    <label htmlFor="OtherEndingYear" className="form-label"> To Year</label>
                    <Field as="select" className="form-select shadow inputDesign" id="OtherEndingYear"
                    name="OtherEndingYear" placeholder="EndingYear"   disabled={values.Other==="Yes"? false :  true} >
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="OtherEndingYear" />
                    </div>
                    <div className="col-md-3">
                    <label htmlFor="OtherIndexation" className="form-label"> Indexation</label>
                    <Field as="select" className="form-select shadow inputDesign" id="OtherIndexation"
                    name="OtherIndexation" placeholder="Indexation"  disabled={values.Other==="Yes"? false :  true}  >
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
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-12">
                    <h3>Personal Insurance</h3>
                      <div className="form-check form-switch m-0 p-0 ">
                      <div className="radiobutton">
                          <input type="radio" name="personalInsurance" id="personalInsurance1"
                          value="Yes" onChange={handleChange} checked={values.personalInsurance == "Yes"}
                          />
                          <label htmlFor="personalInsurance1" className="label1">
                          <span>YES</span>
                          </label>
                          <input type="radio" name="personalInsurance" id="personalInsurance2"
                          value="No" onChange={handleChange} checked={values.personalInsurance == "No"}/>
                          <label htmlFor="personalInsurance2" className="label2">
                          <span>NO</span>
                          </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                <div className="col-md-3">
                <label htmlFor="personalInsuranceAmount" className="form-label">  Amount  </label>
                <Field type="number" className="form-control shadow inputDesign" id="personalInsuranceAmount"
                name="personalInsuranceAmount" placeholder="$00.00"  disabled={values.personalInsurance==="Yes"? false :  true} />
                <ErrorMessage component="div" className="text-danger fw-bold" name="personalInsuranceAmount" />
                </div>
                <div className="col-md-3">
                <label htmlFor="personalInsuranceStatingYear" className="form-label"> From Year</label>
                <Field as="select" className="form-select shadow inputDesign" id="personalInsuranceStatingYear"
                name="personalInsuranceStatingYear" placeholder="personalInsuranceStatingYear"  disabled={values.personalInsurance==="Yes"? false :  true}  >
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
                <ErrorMessage component="div" className="text-danger fw-bold" name="personalInsuranceStatingYear" />
                </div>
                <div className="col-md-3">
                <label htmlFor="personalInsuranceEndingYear" className="form-label"> To Year</label>
                <Field as="select" className="form-select shadow inputDesign" id="personalInsuranceEndingYear"
                name="personalInsuranceEndingYear" placeholder="EndingYear"   disabled={values.personalInsurance==="Yes"? false :  true} >
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
                <ErrorMessage component="div" className="text-danger fw-bold" name="personalInsuranceEndingYear" />
                </div>
                <div className="col-md-3">
                <label htmlFor="personalInsuranceIndexation" className="form-label"> Indexation</label>
                <Field as="select" className="form-select shadow inputDesign" id="personalInsuranceIndexation"
                name="personalInsuranceIndexation" placeholder="Indexation"  disabled={values.personalInsurance==="Yes"? false :  true}  >
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
                <ErrorMessage component="div" className="text-danger fw-bold" name="personalInsuranceIndexation" />
                </div>
                </div>
                    
                    
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
                    onClick={()=>{setOtherExpensesModal(false)}}
                  >
                    Insurance Recommendation 
                  </button>
                    <button
                    type='button'
                      className="float-end btn w-25  btn-outline  backBtn mx-3"
                      onClick={()=>{setOtherExpensesModal(false)}}
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

  );
}

export default OtherExpenses_CashFlow
