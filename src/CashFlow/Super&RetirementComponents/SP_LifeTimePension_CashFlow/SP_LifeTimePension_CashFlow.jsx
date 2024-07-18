import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import { differenceInYears, getDate } from "date-fns";
import Modal from "react-bootstrap/Modal";

import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "yup-phone";

//Images 
import plus from "./images/plus.svg";

const SP_LifeTimePension_CashFlow = () => {
  let [LifeTimePension_CashFlow, setLifeTimePension_CashFlow] = useState(false);
  let [LifeTimePension, setLifeTimePension] = useState([]);


  let initialValues = {
    Client:"No",
    Partner:"No",
    LifetimePensionIncomeClient: "",
    CentrelinkDeductibleAmountClient:"",
    IncludeFromYearClient:"",
    UpUntilYearClient:"",
    IndexationClient:"",
    LifetimePensionIncomePartner: "",
    CentrelinkDeductibleAmountPartner:"",
    IncludeFromYearPartner:"",
    UpUntilYearPartner:"",
    IndexationPartner:"",
    TaxfreePartner:"No",
    Taxfree:"No",

  };

  let validationSchema = Yup.object().shape({
    LifetimePensionIncomeClient: Yup.number().when('Client', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    CentrelinkDeductibleAmountClient: Yup.number().when('Client', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ).min(0, 'Too Short!')
        .max(100, 'Must be less than or equal to 100'),
    }),
    IncludeFromYearClient: Yup.string().when('Client', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
//     UpUntilYearClient: Yup.string().when('Client', {
//       is: (val) => val && val.length == 3,
//       then: Yup.string().required("Required").test('is-greater', 'To Year must be greater than From Year', function(value) {
//         const fromYear = parseInt(this.resolve(Yup.ref('IncludeFromYearClient')));
//         const toYear = parseInt(value);
//         return toYear >= fromYear;
//         }),
//     }),
    UpUntilYearClient: Yup.string().when("Client", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required").test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('IncludeFromYearClient')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = this.parent.IncludeFromYearClient;
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),



    IndexationClient: Yup.string().when('Client', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    LifetimePensionIncomePartner: Yup.number().when('Partner', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    CentrelinkDeductibleAmountPartner: Yup.number().when('Partner', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ).min(0, 'Too Short!')
        .max(100, 'Must be less than or equal to 100'),
    }),
    IncludeFromYearPartner: Yup.string().when('Partner', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
//     UpUntilYearPartner: Yup.string().when('Partner', {
//       is: (val) => val && val.length == 3,
//       then: Yup.string().required("Required").test('is-greater', 'To Year must be greater than From Year', function(value) {
//         const fromYear = parseInt(this.resolve(Yup.ref('IncludeFromYearPartner')));
//         const toYear = parseInt(value);
//         return toYear >= fromYear;
//         }),
//     }),


    UpUntilYearPartner: Yup.string().when("Partner", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required").test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('IncludeFromYearPartner')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = this.parent.IncludeFromYearPartner;
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),


    IndexationPartner: Yup.string().when('Partner', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
  });

  function onSubmit(values, { resetForm }) {
    // console.log(values);
    let data = {
      Client:values.Client,
      Partner:values.Partner,
      LifetimePensionIncomeClient: values.LifetimePensionIncomeClient,
      CentrelinkDeductibleAmountClient:values.CentrelinkDeductibleAmountClient,
      IncludeFromYearClient:values.IncludeFromYearClient,
      UpUntilYearClient:values.UpUntilYearClient,
      IndexationClient:values.IndexationClient,
      LifetimePensionIncomePartner: values.LifetimePensionIncomePartner,
      CentrelinkDeductibleAmountPartner:values.CentrelinkDeductibleAmountPartner,
      IncludeFromYearPartner:values.IncludeFromYearPartner,
      UpUntilYearPartner:values.UpUntilYearPartner,
      IndexationPartner:values.IndexationPartner,
      TaxfreePartner:values.TaxfreePartner,
      Taxfree:values.Taxfree,

      
    };

    console.log(data);


    setLifeTimePension([...LifeTimePension, data]);
    resetForm();
  }



  return (
    <div>
      <label className="form-label">Lifetime Pension Income</label>
      <br />
      <button type="button" className=" btn btn-outline-success "
        onClick={() => { setLifeTimePension_CashFlow(true); }}
      >
        <div className="iconContainer mx-1">
          <img className="img-fluid" src={plus} alt="" />
        </div>
        Enter Details
      </button>


      <Modal
        show={LifeTimePension_CashFlow}
        onHide={() => { setLifeTimePension_CashFlow(false) }}
        backdrop="static"
        className="modal-xl"
        keyboard={false}
      >
        <Modal.Header
          className="text-light modalBG "
          closeButton
        >
          <Modal.Title className="fontStyle">
            Lifetime Pension Income
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
                {/* Life time pension in come Super and retirement */}

                <div className="row">
                  <div className="col-md-12">
                    <h4 className="mb-0">Client</h4>
                    <div className="form-check form-switch m-0 p-0 ">
                      <div className="radiobutton">
                        <input type="radio" name="Client" id="Client1"
                          value="Yes" onChange={handleChange} checked={values.Client == "Yes"}
                        />
                        <label htmlFor="Client1" className="label1">
                          <span>YES</span>
                        </label>
                        <input type="radio" name="Client" id="Client2"
                          value="No" onChange={handleChange} checked={values.Client == "No"} />
                        <label htmlFor="Client2" className="label2">
                          <span>NO</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-4">
                    <label htmlFor="LifetimePensionIncomeClient" className="form-label">  Lifetime Pension Income </label>
                    <Field type="number" className="form-control shadow inputDesign" id="LifetimePensionIncomeClient"
                      name="LifetimePensionIncomeClient" placeholder="$00" disabled={values.Client == "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="LifetimePensionIncomeClient" />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="IncludeFromYearClient" className="form-label"> Include From Year</label>
                    <Field as="select" className="form-select shadow inputDesign" id="IncludeFromYearClient"
                      name="IncludeFromYearClient" placeholder="IncludeFromYearClient" disabled={values.Client == "Yes" ? false : true} >
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="IncludeFromYearClient" />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="UpUntilYearClient" className="form-label"> Up Until Year</label>
                    <Field as="select" className="form-select shadow inputDesign" id="UpUntilYearClient"
                      name="UpUntilYearClient" placeholder="UpUntilYearClient" disabled={values.Client == "Yes" ? false : true} >
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="UpUntilYearClient" />
                  </div>
                 
                </div>
                <div className="row mt-4">
                <div className="col-md-4">
                    <label htmlFor="IndexationClient" className="form-label"> Indexation</label>
                    <Field as="select" className="form-select shadow inputDesign" id="IndexationClient"
                      name="IndexationClient" placeholder="IndexationClient" disabled={values.Client === "Yes" ? false : true} >
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
                      <option value="4.50% ">4.50% </option>
                      <option value="5.00%">5.00%</option>
                    </Field>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="IndexationClient" />

                  </div>
                  <div className="col-md-4">
                    <label htmlFor="CentrelinkDeductibleAmountClient" className="form-label">  Centrelink Deductible Amount </label>
                    <Field type="number" className="form-control shadow inputDesign" id="CentrelinkDeductibleAmountClient"
                      name="CentrelinkDeductibleAmountClient" placeholder="00%" disabled={values.Client == "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="CentrelinkDeductibleAmountClient" />
                  </div>
                  

                  <div className="col-md-4">
                    <label>Taxfree</label>
                    <div className="form-check form-switch mt-2 p-0 ">
                      <div className="radiobutton">
                        <input type="radio" name="Taxfree" id="Taxfree1"
                          value="Yes" onChange={handleChange} checked={values.Taxfree == "Yes"}
                        />
                        <label htmlFor="Taxfree1" className="label1">
                          <span>YES</span>
                        </label>
                        <input type="radio" name="Taxfree" id="Taxfree2"
                          value="No" onChange={handleChange} checked={values.Taxfree == "No"} />
                        <label htmlFor="Taxfree2" className="label2">
                          <span>NO</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <h4 className="mb-0">Partner</h4>
                    <div className="form-check form-switch m-0 p-0 ">
                      <div className="radiobutton">
                        <input type="radio" name="Partner" id="Partner1"
                          value="Yes" onChange={handleChange} checked={values.Partner == "Yes"}
                        />
                        <label htmlFor="Partner1" className="label1">
                          <span>YES</span>
                        </label>
                        <input type="radio" name="Partner" id="Partner2"
                          value="No" onChange={handleChange} checked={values.Partner == "No"} />
                        <label htmlFor="Partner2" className="label2">
                          <span>NO</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-4">
                    <label htmlFor="LifetimePensionIncomePartner" className="form-label">  Lifetime Pension Income </label>
                    <Field type="number" className="form-control shadow inputDesign" id="LifetimePensionIncomePartner"
                      name="LifetimePensionIncomePartner" placeholder="$00" disabled={values.Partner == "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="LifetimePensionIncomePartner" />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="IncludeFromYearPartner" className="form-label"> Include From Year</label>
                    <Field as="select" className="form-select shadow inputDesign" id="IncludeFromYearPartner"
                      name="IncludeFromYearPartner" placeholder="IncludeFromYearPartner" disabled={values.Partner == "Yes" ? false : true} >
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="IncludeFromYearPartner" />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="UpUntilYearPartner" className="form-label"> Up Until Year</label>
                    <Field as="select" className="form-select shadow inputDesign" id="UpUntilYearPartner"
                      name="UpUntilYearPartner" placeholder="UpUntilYearPartner" disabled={values.Partner == "Yes" ? false : true} >
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="UpUntilYearPartner" />
                  </div>
                 
                </div>
                <div className="row mt-3">
                <div className="col-md-4">
                    <label htmlFor="IndexationPartner" className="form-label"> Indexation</label>
                    <Field as="select" className="form-select shadow inputDesign" id="IndexationPartner"
                      name="IndexationPartner" placeholder="IndexationPartner" disabled={values.Partner === "Yes" ? false : true} >
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
                      <option value="4.50% ">4.50% </option>
                      <option value="5.00%">5.00%</option>
                    </Field>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="IndexationPartner" />

                  </div>
                
                  <div className="col-md-4">
                    <label htmlFor="CentrelinkDeductibleAmountPartner" className="form-label">  Centrelink Deductible Amount </label>
                    <Field type="number" className="form-control shadow inputDesign" id="CentrelinkDeductibleAmountPartner"
                      name="CentrelinkDeductibleAmountPartner" placeholder="00%" disabled={values.Partner == "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="CentrelinkDeductibleAmountPartner" />
                  </div>
                  <div className="col-md-4">
                    <label>Taxfree</label>
                    <div className="form-check form-switch mt-2 p-0 ">
                      <div className="radiobutton">
                        <input type="radio" name="TaxfreePartner" id="TaxfreePartner1"
                          value="Yes" onChange={handleChange} checked={values.TaxfreePartner == "Yes"}
                        />
                        <label htmlFor="TaxfreePartner1" className="label1">
                          <span>YES</span>
                        </label>
                        <input type="radio" name="TaxfreePartner" id="TaxfreePartner2"
                          value="No" onChange={handleChange} checked={values.TaxfreePartner == "No"} />
                        <label htmlFor="TaxfreePartner2" className="label2">
                          <span>NO</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                </div>
                
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
                    onClick={() => { setLifeTimePension_CashFlow(false) }}
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

export default SP_LifeTimePension_CashFlow
