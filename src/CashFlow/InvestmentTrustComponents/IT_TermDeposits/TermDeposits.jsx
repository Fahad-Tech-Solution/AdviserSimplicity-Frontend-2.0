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
    OpeningBalance:"",
    InvestmentReturns:"",
    EditReinvest:"No",
    ReinvestUpUntil:"",
    RiskProfile:"",
  }

  let validationSchema = Yup.object({
    OpeningBalance:Yup.number().required("Required").test(
      "is positive?",
      "Must be a positive number",

          (value) => value > 0
    ),
    InvestmentReturns:Yup.string().required("Required"),
    ReinvestUpUntil:Yup.string().required("Required"),
    RiskProfile:Yup.string().required("Required"),
  })

  let onSubmit = (values) => {
    // console.log(values);

    let data = {

    }
    console.log(data);
    setTermDeposits([data]);

  }

  return (
    <>

    <label className="form-label">Term Deposits</label>
      <br />
      
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

                        <div>
                      

                        {/* First Row */}
                        <div className="row">

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="OpeningBalance"
                                className="form-label">
                                Opening Balance
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="OpeningBalance"
                                name='OpeningBalance'
                                placeholder="Opening Balance"
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='OpeningBalance' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="InvestmentReturns" className="form-label">
                              Investment Returns
                              </label>
                              <Field
                                id="InvestmentReturns"
                                name='InvestmentReturns'
                                className="form-select shadow  inputDesign"
                                as='select'

                              >
                                <option value="">Select</option>
                                <option value="System">System</option>
                                <option value="InputOveride">Input Overide</option>
                              </Field>
                              <ErrorMessage component='div' className='text-danger fw-bold' name="InvestmentReturns" />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="IncomeYield"
                                className="form-label"
                              >
                                Income Yield
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="IncomeYield"
                                name='IncomeYield'
                                placeholder=" Income Yield"
                                disabled
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='IncomeYield' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label className="form-label">
                                Reinvest Income
                              </label>

                              {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input type="radio" name="EditReinvest" id="EditReinvest1"
                                    onChange={handleChange} value="Yes"
                                    checked={values.EditReinvest == "Yes" } />
                                  <label htmlFor="EditReinvest1" className="label1">
                                    <span>YES</span>
                                  </label>
                                  <input type="radio" name="EditReinvest" id="EditReinvest2"
                                    onChange={handleChange} value="No"
                                    checked={values.EditReinvest == "No"} />
                                  <label htmlFor="EditReinvest2" className="label2">
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
                            <div className="mb-3">
                              <label htmlFor="RiskProfile" className="form-label">
                              Risk Profile/SAA
                              </label>
                              <Field
                                id="RiskProfile"
                                name='RiskProfile'
                                className="form-select shadow  inputDesign"
                                as='select'

                              >
                                <option value="Cash">Cash</option>
                                <option value="Australia Fixed Interest">Australia Fixed Interest</option>
                              </Field>
                              <ErrorMessage component='div' className='text-danger fw-bold' name="RiskProfile" />
                            </div>
                          </div>

                        </div>

                        </div>

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
