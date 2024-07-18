import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./businessTextStructure.css"
import plus from "./images/plus.svg"
import notebook from "./images/notebook.svg"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InvestmentLoan = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let initialValues = {
    YearLoan:"",
    CurrentBalance:"",
    LoanType:"",
    LoanTerm:"",
    InterestPeriod:"",
    InitialInterest:"",
    DeductibleInterest:"",
    ApplyMinimumRepayments:"",
    AnnualRepayments:"",
    RepayLoan:"",
  }

  let validationSchema = Yup.object({
    YearLoan:Yup.string().required("Required"),
    CurrentBalance:Yup.number().required("Required").test(
      "is positive?",
      "Must be a positive Number",
      
      (value) => value >= 0
      ),
      LoanType:Yup.string().required("Required"),
      LoanTerm:Yup.string().required("Required"),
      InterestPeriod:Yup.string().required("Required"),
      InitialInterest:Yup.number().required("Required").test(
        "is positive?",
        "Must be a positive Number",
        
        (value) => value >= 0
        ).max(100,"Must be equal to or less than 100"),
        DeductibleInterest:Yup.number().required("Required").test(
          "is positive?",
          "Must be a positive Number",
          
          (value) => value >= 0
          ).max(100,"Must be equal to or less than 100"),
          ApplyMinimumRepayments:Yup.string().required("Required"),
        AnnualRepayments:Yup.string().when('ApplyMinimumRepayments',{
          is: (val) => val && val.length == 2,
          then:Yup.string().required("Required"),
        }),
        RepayLoan:Yup.string().required("Required"),
        
    })



  let onSubmit = (values) => {
    console.log(values);

  }
  return (
    <> 
      <div>
        
      <label className="form-label">  Investment Loan </label>
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
              Investment Loan
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

                  {/*Form */}
                  <div>

                    {/* First Row */}
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="YearLoan" className="form-label">
                            Year of Loan
                          </label>
                          <Field
                            id="YearLoan"
                            name='YearLoan'
                            className="form-select shadow  inputDesign"
                            as='select'
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="YearLoan" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="CurrentBalance"
                            className="form-label"
                          >
                            Current Balance
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="CurrentBalance"
                            name='CurrentBalance'
                            placeholder=" Current Balance"
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='CurrentBalance' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="LoanType" className="form-label">
                            Loan Type
                          </label>
                          <Field
                            id="LoanType"
                            name='LoanType'
                            className="form-select shadow  inputDesign"
                            as='select'
                          >
                            <option value="">Select</option>
                            <option value="System">I/Only </option>
                            <option value="InputOveride">P&I</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="LoanType" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="LoanTerm" className="form-label">
                            Loan Term
                          </label>
                          <Field
                            id="LoanTerm"
                            name='LoanTerm'
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="LoanTerm" />
                        </div>
                      </div>

                    </div>

                    {/* Second Row */}

                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="InterestPeriod" className="form-label">
                            Interest Only Period
                          </label>
                          <Field
                            id="InterestPeriod"
                            name='InterestPeriod'
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="InterestPeriod" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="InitialInterest"
                            className="form-label"
                          >
                            Initial Interest Rate(p.a)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="InitialInterest"
                            name='InitialInterest'
                            placeholder=" Initial Interest Rate(p.a)"
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='InitialInterest' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="DeductibleInterest"
                            className="form-label"
                          >
                            Deductible Interest (%)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="DeductibleInterest"
                            name='DeductibleInterest'
                            placeholder=" Deductible Interest (%)"
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='DeductibleInterest' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="MinimumRepayments"
                            className="form-label"
                          >
                            Minimum Repayments(p.a)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="MinimumRepayments"
                            name='MinimumRepayments'
                            placeholder="Minimum Repayments(p.a)"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='MinimumRepayments' />
                        </div>
                      </div>


                    </div>


                    {/* Third Row */}
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ApplyMinimumRepayments" className="form-label">
                            Apply Minimum Repayments
                          </label>
                          <Field
                            id="ApplyMinimumRepayments"
                            name='ApplyMinimumRepayments'
                            className="form-select shadow  inputDesign"
                            as='select'
                          >
                            <option value="">select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>

                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ApplyMinimumRepayments" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="AnnualRepayments"
                            className="form-label"
                          >
                            Actual Annual Repayments
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="AnnualRepayments"
                            name='AnnualRepayments'
                            placeholder=" Actual Annual Repayments"
                            disabled={values.ApplyMinimumRepayments == "No" ?false:true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='AnnualRepayments' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="RepayLoan" className="form-label">
                            Repay Loan In Year
                          </label>
                          <Field
                            id="RepayLoan"
                            name='RepayLoan'
                            className="form-select shadow  inputDesign"
                            as='select'
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="RepayLoan" />
                        </div>
                      </div>

                    </div>

                  </div>
                  {/*Form */}

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

export default InvestmentLoan;
