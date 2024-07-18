import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import { differenceInYears, getDate } from "date-fns";
import Modal from "react-bootstrap/Modal";

import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "yup-phone";

//Images 
import plus from "./images/plus.svg";

const LumpsumPersonalLoans_CashFlow = () => {
  let [LumpsumPurchasesModal, setLumpsumPurchasesModal] = useState(false); 
  let [LumpsumPurchases, setLumpsumPurchases] = useState([]); 
  
  
  let initialValues = {
      LoanType:"",
      Transaction:"",
      startingYear:"",
      EndingYear:"",
      Indexation:"",
      Amount:"",
      Funds_Taken: ""
      };
    
  let validationSchema = Yup.object().shape({
    
    LoanType: Yup.string().required('Required'),
    Transaction: Yup.string().required('Required'),
    startingYear: Yup.string().required('Required'),
    EndingYear:  Yup.string()
    .required('To Year is required')
    .test('is-greater', 'To Year must be greater than From Year', function(value) {
      const fromYear = parseInt(this.resolve(Yup.ref('startingYear')));
      const toYear = parseInt(value);
      return toYear >= fromYear;
        }),
    Indexation: Yup.string().required('Required'),
    Amount: Yup.number().required('Required').test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
      ),
        Funds_Taken: Yup.string().required('Required'),
      });
      
      function onSubmit(values, { resetForm }) {
        console.log(values);
        let data = {
          LoanType:values.LoanType,
          Transaction:values.Transaction,
          startingYear:values.startingYear,
          EndingYear:values.EndingYear,
          Indexation:values.Indexation,
          Amount: values.Amount,
          Funds_Taken:values.Funds_Taken,
        };

        setLumpsumPurchases([...LumpsumPurchases, data]);
        resetForm();
      }


    
  return (
    <div>
      <label className="form-label">Lumpsum Personal Loans and Credit Cards Repayments</label>
                <br/>
                <button type="button" className=" btn w-50 btn-outline-success "
                onClick={()=>{setLumpsumPurchasesModal(true);}}
                >
                <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                </div>
                Enter Details
                </button>
        
                  
        <Modal
        show={LumpsumPurchasesModal}
        onHide={()=>{setLumpsumPurchasesModal(false)}}
        backdrop="static"
        className="modal-xl"
        keyboard={false}
      >
        <Modal.Header
          className="text-light modalBG "
          closeButton
        >
          <Modal.Title className="fontStyle">
          Lumpsum Personal Loans and Credit Cards Repayments
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
          {({ values, setFieldValue, setValues, handleChange,handleBlur }) => (
            <Form>
              <Modal.Body>
                  {/* Professional Advisor Detail Form */}
                <div className="row">
                  <div className="col-md-3">
                    <label htmlFor="LoanType" className="form-label"> Loan Type</label>
                    <Field as="select" className="form-select shadow inputDesign" id="LoanType"
                    name="LoanType" placeholder="LoanType"  >
                    <option value="">Select</option>
                    <option value="CraditCard1">Credit Card 1</option>
                    <option value="CraditCard2">Credit Card 2</option>
                    <option value="PersonalLoan1">Personal Loans 1</option>
                    <option value="PersonalLoan2">Personal Loans 2</option>
                    </Field>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="LoanType" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="Transaction" className="form-label"> Transaction Type</label>
                    <Field as="select" className="form-select shadow inputDesign" id="Transaction"
                    name="Transaction" placeholder="Transaction"  >
                    <option value="">Select</option>
                    <option value="Addition">Addition</option>
                    <option value="Purchase">Purchase</option>
                    </Field>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="Transaction" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="startingYear" className="form-label"> From Year</label>
                    <Field as="select" className="form-select shadow inputDesign" id="startingYear"
                    name="startingYear" placeholder="startingYear"  >
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="startingYear" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="EndingYear" className="form-label"> To Year</label>
                    <Field as="select" className="form-select shadow inputDesign" id="EndingYear"
                    name="EndingYear" placeholder="EndingYear"  >
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="EndingYear" />
                  </div>
                </div>
                <div className="row">

                  <div className="col-md-3">
                    <label htmlFor="Current_Balance" className="form-label"> Current Balance </label>
                    <Field type="number" className="form-control shadow inputDesign" id="Current_Balance"
                      name="Current_Balance" placeholder="$00.00"  readOnly/>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="Current_Balance" />
                  </div>
                  
                  <div className="col-md-3">
                    <label htmlFor="Amount" className="form-label">  Amount  </label>
                    <Field type="number" className="form-control shadow inputDesign" id="Amount"
                      name="Amount" placeholder="$00.00" />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="Amount" />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="Indexation" className="form-label"> Indexation</label>
                    <Field as="select" className="form-select shadow inputDesign" id="Indexation"
                    name="Indexation" placeholder="Indexation"  >
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
                    <label htmlFor="Funds_Taken" className="form-label"> Funds Taken From/Credit </label>
                    <Field as="select" className="form-select shadow inputDesign" id="Funds_Taken"
                    name="Funds_Taken" placeholder="Funds_Taken"  >
                    <option value="">Select</option>
                    <option value="Cash_Flow">Cash Flow</option>
                    <option value="Client’s_Cash_Account">Client’s Cash Account</option>
                    <option value="Partner’s Cash Account">Partner’s Cash Account</option>
                    <option value="Joint Cash Account">Joint Cash Account</option>
                    </Field>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="Funds_Taken" />
                  </div>
                </div>
                
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
                        <th>Taken From/Credit</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                    {LumpsumPurchases.map((elem, index) => {
                      return (
                        <tr>
                          <td>{elem.LoanType}</td>
                          <td>{elem.Transaction}</td>
                          <td>{elem.Amount}</td>
                          <td>{elem.startingYear}</td>
                          <td>{elem.EndingYear}</td>
                          <td>{elem.Indexation}</td>
                          <td>{elem.Funds_Taken}</td>
                          <td>
                          <button  type='button'  className='btn btn-danger btn-sm'>delete</button>
                          <button  type='button' onClick={()=>{setValues(elem)}}  className='btn btn-warning btn-sm mx-2'>update</button> 
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
                    onClick={()=>{setLumpsumPurchasesModal(false)}}
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

export default LumpsumPersonalLoans_CashFlow
