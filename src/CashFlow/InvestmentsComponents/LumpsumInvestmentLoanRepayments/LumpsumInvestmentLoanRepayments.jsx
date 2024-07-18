import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import { differenceInYears, getDate } from "date-fns";
import Modal from "react-bootstrap/Modal";

import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "yup-phone";

//Images 
import plus from "./images/plus.svg";

const LumpsumInvestmentLoanRepayments = () => {
  let [InvestmentLoanRepaymentsModal, setInvestmentLoanRepaymentsModal] = useState(false);
  let [InvestmentLoanRepayments, setInvestmentLoanRepayments] = useState([]);


  let initialValues = {
    LoanType:"",
    TransactionType:"",
    FromYear:"",
    ToYear:"",
    Amount:"",
    Indexation:"",
    FundsCredit:"",
    AmountFunds:"",
    
  };

  let validationSchema = Yup.object().shape({
    LoanType: Yup.string().required('Required'),
    TransactionType: Yup.string().required('Required'),

    FromYear: Yup.string().required('Required'),
    ToYear: Yup.string()
        .required('To Year is required')
        .test('is-greater', 'To Year must be greater than From Year', function(value) {
          const fromYear = parseInt(this.resolve(Yup.ref('FromYear')));
          const toYear = parseInt(value);
          return toYear >= fromYear;
        }),
    Amount: Yup.string().required('Required'),
    Indexation: Yup.string().required('Required'),
    FundsCredit: Yup.string().required('Required'),

  });

  function onSubmit(values, { resetForm }) {
    console.log(values);
    let data = {

      LoanType:values.LoanType,
      TransactionType:values.TransactionType,
      FromYear:values.FromYear,
      ToYear:values.ToYear,
      CurrentBalance:values.CurrentBalance,
      Amount:values.Amount,
      Indexation:values.Indexation,
      FundsCredit:values.FundsCredit,
      CurrentBalanceFunds:values.CurrentBalanceFunds,
      AmountFunds: values.AmountFunds,
      
    };

    setInvestmentLoanRepayments([...InvestmentLoanRepayments, data]);
    resetForm();
  }



  return (
    <div>

      <label className="form-label">Lumpsum Investment Loan Repayments</label>
      <br />
      <button type="button" className="btn btn-outline-success"
        onClick={() => { setInvestmentLoanRepaymentsModal(true); }}
      >
        <div className="iconContainer mx-1">
          <img className="img-fluid" src={plus} alt="" />
        </div>
        Enter Details
      </button>

      <Modal
        show={InvestmentLoanRepaymentsModal}
        onHide={() => { setInvestmentLoanRepaymentsModal(false) }}
        backdrop="static"
        className="modal-xl"
        keyboard={false}
      >
        <Modal.Header
          className="text-light modalBG "
          closeButton
        >
          <Modal.Title className="fontStyle">
          Lumpsum Investment Loan Repayments
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
                    <label htmlFor="LoanType" className="form-label">Loan Type</label>
                    <Field as="select" className="form-select shadow inputDesign" id="LoanType"
                      name="LoanType" >
                      <option value="">Select</option>
                      <option value="Client's Investment Loan">Client's Investment Loan</option>
                      <option value="Client's Margin Loan">Client's Margin Loan</option>
                      <option value="Partner's Margin Loan">Partner's Margin Loan</option>
                      <option value="Partner's Investment Loan">Partner's Investment Loan</option>
                      <option value="Joint Investment Loan">Joint Investment Loan</option>
                      <option value="Joint Margin Loan">Joint Margin Loan</option>

                    </Field>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="LoanType" />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="TransactionType" className="form-label">Transaction Type</label>
                    <Field as="select" className="form-select shadow inputDesign" id="TransactionType"
                      name="TransactionType" >
                      <option value="">Select</option>
                      <option value="Repayments">Repayments</option>
                      <option value="Additions">Additions</option>
                    </Field>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="TransactionType" />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="FromYear" className="form-label">From Year</label>
                    <Field as="select" className="form-select shadow inputDesign" id="FromYear"
                      name="FromYear" >
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="FromYear" />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="ToYear" className="form-label">To Year</label>
                    <Field as="select" className="form-select shadow inputDesign" id="ToYear"
                      name="ToYear" >
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="ToYear" />
                  </div>

                </div>

                {/* Second Row */}
                <div className="row">
                  <div className="col-md-3">
                    <label htmlFor="CurrentBalance" className="form-label">  Current Balance  </label>
                    <Field type="number" className="form-control shadow inputDesign" id="CurrentBalance"
                      name="CurrentBalance" placeholder="Current Balance" disabled />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="CurrentBalance" />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="Amount" className="form-label">  Amount  </label>
                    <Field type="number" className="form-control shadow inputDesign" id="Amount"
                      name="Amount" placeholder="Amount" />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="Amount" />
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="Indexation" className="form-label">
                        Indexation
                      </label>
                      <Field
                        id="Indexation"
                        name='Indexation'
                        className="form-select shadow inputDesign"
                        as='select'
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
                      <ErrorMessage component='div' className='text-danger fw-bold' name="Indexation" />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="FundsCredit" className="form-label">Funds Taken From / Credit to</label>
                    <Field as="select" className="form-select shadow inputDesign" id="FundsCredit"
                      name="FundsCredit" >
                      <option value="">Select</option>
                      <option value="Client Share Portfolio">Client Share Portfolio</option>
                      <option value="Client Managed Funds">Client Managed Funds</option>
                      <option value="Client Cash Account">Client Cash Account</option>    
                      <option value="Partner Share Portfolio">Partner Share Portfolio</option>
                      <option value="Partner Managed Funds">Partner Managed Funds</option>
                      <option value="Partner Cash Account">Partner Cash Account</option>     
                      <option value="Joint Share Portfolio">Joint Share Portfolio</option>
                      <option value="Joint Managed Funds">Joint Managed Funds</option>
                      <option value="Joint Cash Account">Joint Cash Account</option>
                      <option value="Joint Investment Bond">Cash flow</option>

                    </Field>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="FundsCredit" />
                  </div>
                </div>

                   {/* Third Row */}
                   <div className="row">
                  <div className="col-md-3">
                    <label htmlFor="CurrentBalanceFunds" className="form-label">  Current Balance  </label>
                    <Field type="number" className="form-control shadow inputDesign" id="CurrentBalanceFunds"
                      name="CurrentBalanceFunds" placeholder="Current Balance Funds" disabled />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="CurrentBalanceFunds" />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="AmountFunds" className="form-label">Amount</label>
                    <Field type="number" className="form-control shadow inputDesign" id="AmountFunds"
                      name="AmountFunds" placeholder="Amount Funds" disabled />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="AmountFunds" />
                  </div>

                </div>



                {/* Table */}

                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive my-3">
                      <table className="table table-bordered table-hover text-center">
                        <thead className="text-light" id="tableHead">
                          <tr>
                            <th>Loan Type</th>
                            <th>Transaction Type</th>
                            <th>Amount</th>
                            <th>From Year</th>
                            <th>To Year</th>
                            <th>Indexation</th>
                            <th>Funds Taken From / Credit to</th>
                            <th>Operations</th>
                          </tr>
                        </thead>
                        <tbody>
                          {InvestmentLoanRepayments.map((elem, index) => {
                            return (
                              <tr>
                                <td>{elem.LoanType}</td>
                                <td>{elem.TransactionType}</td>
                                <td>{elem.FromYear}</td>
                                <td>{elem.ToYear}</td>
                                <td>{elem.Amount}</td>
                                <td>{elem.Indexation}</td>
                                <td>{elem.FundsCredit}</td>
                                <td>
                                  <button type='button' className='btn btn-danger btn-sm'>delete</button>
                                  <button type='button' onClick={() => { setValues(elem) }} className='btn btn-warning btn-sm mx-2'>update</button>
                                </td>
                              </tr>
                            )
                          })}

                        </tbody>
                      </table>
                    </div>
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
                    onClick={() => { setInvestmentLoanRepaymentsModal(false) }}
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

export default LumpsumInvestmentLoanRepayments;
