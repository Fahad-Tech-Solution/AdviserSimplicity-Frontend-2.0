import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import { differenceInYears, getDate } from "date-fns";
import Modal from "react-bootstrap/Modal";

import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "yup-phone";

//Images 
import plus from "./images/plus.svg";

const TermDeposit = () => {
  let [LumpsumSuperContributionsModal, setLumpsumSuperContributionsModal] = useState(false);
  let [LumpsumSuperContributions, setLumpsumSuperContributions] = useState([]);

  let initialValues = {
    OpeningBalance: '',
    InvestmentsReturns: '',
    IncomeYield: '',
    ReinvestIncome: 'No',
    ReinvestUpUntil: '',
    RiskProfile: '',
  };

  let validationSchema = Yup.object().shape({
    OpeningBalance: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
    InvestmentsReturns: Yup.string().required("Required"),
    IncomeYield: Yup.string().when('InvestmentsReturns', {
      is: (val) => val && val.length == 13,
      then: Yup.string().required("Required")
    }),
    AccountingAuditing: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
    ReinvestUpUntil: Yup.string().required("Required"),
    RiskProfile: Yup.string().required("Required"),

  });

  function onSubmit(values, { resetForm }) {
    console.log(values);
    let data = {

      InvestmentAsset: values.InvestmentAsset,
      FromYear: values.FromYear,
      ToYear: values.ToYear, 
      Amount: values.Amount,
      Indexation: values.Indexation,

    };

    setLumpsumSuperContributions([...LumpsumSuperContributions, data]);
    resetForm();
  }



  return (
    <>
      <div>
        
      <label className="form-label">  Term Deposit </label>
      <br />
        
        <button type="button" className="btn btn-outline-success"
          onClick={() => { setLumpsumSuperContributionsModal(true); }}
        >

          <div className="iconContainer mx-1">
            <img className="img-fluid" src={plus} alt="" />
          </div>
          Enter Details 

        </button>

      </div>
      <Modal
        show={LumpsumSuperContributionsModal}
        onHide={() => { setLumpsumSuperContributionsModal(false) }}
        backdrop="static"
        className="modal-xl"
        keyboard={false}
      >
        <Modal.Header
          className="text-light modalBG "
          closeButton
        >
          <Modal.Title className="fontStyle">
            Term Deposit
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

                {/* First Row */}
                <div className="row">
                  <div className="col-md-3">
                    <label htmlFor="OpeningBalance" className="form-label">Opening Balance</label>
                    <Field type="number" className="form-control shadow inputDesign" id="OpeningBalance"
                      name="OpeningBalance" placeholder="$00" />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="OpeningBalance" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="InvestmentsReturns" className="form-label">Investments Returns</label>
                    <Field as="select" className="form-select shadow inputDesign" id="InvestmentsReturns"
                      name="InvestmentsReturns">
                      <option value="">Select</option>
                      <option value="System">System</option>
                      <option value="InputOverRide">Input OverRide</option>

                    </Field>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="InvestmentsReturns" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="IncomeYield" className="form-label">Income Yield</label>
                    <Field type="number" className="form-control shadow inputDesign" id="IncomeYield"
                      name="IncomeYield" placeholder="$00" disabled={values.InvestmentsReturns == "InputOverRide" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="IncomeYield" />
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">
                        Reinvest Income
                      </label>

                      {/* switch button style */}
                      <div className="form-check form-switch m-0 p-0 ">
                        <div className="radiobutton">
                          <input type="radio" name="ReinvestIncome" id="ReinvestIncomeopt1"
                            onChange={handleChange} value="Yes"
                            checked={values.ReinvestIncome == "Yes"} />
                          <label htmlFor="ReinvestIncomeopt1" className="label1">
                            <span>YES</span>
                          </label>
                          <input type="radio" name="ReinvestIncome" id="ReinvestIncomeopt2"
                            onChange={handleChange} value="No"

                            checked={values.ReinvestIncome == "No"} />
                          <label htmlFor="ReinvestIncomeopt2" className="label2">
                            <span>NO</span>
                          </label>
                        </div>
                      </div>
                      {/* switch button style */}


                    </div>
                  </div>
                </div>
                {/* Second Row */}
                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="ReinvestUpUntil" className="form-label">
                        Reinvest Up Until
                      </label>
                      <Field
                        id="ReinvestUpUntil"
                        name='ReinvestUpUntil'
                        className="form-select shadow  inputDesign"
                        as='select'
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
                      <ErrorMessage component='div' className='text-danger fw-bold' name="ReinvestUpUntil" />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="RiskProfile" className="form-label">Risk Profile/SAA</label>
                    <Field as="select" className="form-select shadow inputDesign" id="RiskProfile"
                      name="RiskProfile">
                      <option value="">Select</option>
                      <option value="Cash">Cash</option>
                      <option value="AustraliaFixedInterest">Australia Fixed Interest</option>

                    </Field>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="RiskProfile" />
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
                    onClick={() => { setLumpsumSuperContributionsModal(false) }}
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
export default TermDeposit;
