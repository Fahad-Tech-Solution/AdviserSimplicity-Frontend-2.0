import React, { useState,useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./businessTextStructure.css"
import plus from "./images/plus.svg"
import notebook from "./images/notebook.svg"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CentrelinkIncome = () => {
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let initialValues={

    // ClientInitialValue
    ClientEdit:'No',
    ClientCentrelinkPayment:'',
    ClientIncludeFromYear:'',
    ClientAllowCarer:'No',
    ClientIsClientRenting:'No',
    // ClientInitialValue

    // partnerInitialValue
    PartnerEdit:'No',
    PartnerCentrelinkPayment:'',
    PartnerIncludeFromYear:'',
    PartnerAllowCarer:'No',

    // partnerInitialValue
  }

  let validationSchema=Yup.object({
    // clientValidation
    ClientCentrelinkPayment:Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required('Required'),
      otherwise: Yup.string().notRequired(""),
    }),
    ClientIncludeFromYear:Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required('Required'),
      otherwise: Yup.string().notRequired(""),
    }),

    // partnervalidation
    PartnerCentrelinkPayment:Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required('Required'),
      otherwise: Yup.string().notRequired(""),
    }),
    PartnerIncludeFromYear:Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required('Required'),
      otherwise: Yup.string().notRequired(""),
    }),
   
  })
  let onSubmit=(values)=>{
   

    let clientObj={
      ClientCentrelinkPayment:values.ClientCentrelinkPayment,
      ClientIncludeFromYear:values.ClientIncludeFromYear,
      ClientAllowCarer:values.ClientAllowCarer,
      ClientIsClientRenting:values.ClientIsClientRenting
    }

    let partnerObj={
      PartnerCentrelinkPayment:values.PartnerCentrelinkPayment,
      PartnerIncludeFromYear:values.PartnerIncludeFromYear,
      PartnerAllowCarer:values.PartnerAllowCarer
    }

      console.log("client",clientObj)
      console.log("partner",partnerObj)

      handleClose();

  }
  return (
    <>

     <label htmlFor="" className="form-label">
     Centrelink Income
      </label>
                            <div>
                              <button
                              type="button"
                                className=" btn
                                btn-outline-success "
                                
                                onClick={handleShow}
                              >
                                <div className="iconContainer mx-1">
                                <img className="img-fluid" src={plus} alt="" />

                                </div>
                                Enter Details
                              </button>

                              
                            </div>

                      <div className='row'>
                        <div className="col-md-6">
                          <div className="mb-3">
                           

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
                                  Centrelink Income
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

                                <div classname="row">
                                <div className="col-md-3">
                                    <div className="mb-3">
                                    <label  className="form-label">
                                    Client
                                    </label>
                     
                             {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                              <div className="radiobutton">
                                <input type="radio" name="ClientEdit" id="ClientEditopt1" 
                                onChange={handleChange} value="Yes"
                                checked={values.ClientEdit=="Yes"} />
                                <label htmlFor="ClientEditopt1" className="label1">
                                  <span>YES</span>
                                </label>
                                <input type="radio" name="ClientEdit" id="ClientEditopt2" 
                                onChange={handleChange} value="No"
                                
                                checked={values.ClientEdit=="No"} />
                                <label htmlFor="ClientEditopt2" className="label2">
                                  <span>NO</span>
                                </label>
                              </div>
                              </div>
                              {/* switch button style */}
                      

                    </div>
                                </div>
                                </div>
                                  <div className="row">

                                  <div className="col-md-3">
                                    <div className="mb-3">
                                        <label htmlFor="ClientCentrelinkPayment" className="form-label">
                                        Centrelink Payment
                                        </label>
                                        <Field
                                        id="ClientCentrelinkPayment"
                                        name='ClientCentrelinkPayment'
                                        className="form-select shadow  inputDesign"
                                        as='select'
                                        disabled={values.ClientEdit==="Yes"? false :  true}

                                        >
                                       <option value="">Select</option>
                                          <option value="Not Eligible">Not Eligible</option>
                                          <option value="Newstart Allowance">Newstart Allowance</option>
                                          <option value="Disability Pension">Disability Pension</option>
                                          <option value="Carers Payment">Carers Payment</option>
                                         
                                        
                                        </Field>
                                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientCentrelinkPayment" />
                                    </div>
                                  </div>
                                   
                                    <div className="col-md-3">
                                    <div className="mb-3">
                                        <label htmlFor="ClientIncludeFromYear" className="form-label">
                                        Include From Year
                                        </label>
                                        <Field
                                        id="ClientIncludeFromYear"
                                        name='ClientIncludeFromYear'
                                        className="form-select shadow  inputDesign"
                                        as='select'
                                        disabled={values.ClientEdit==="Yes"? false :  true}
                                        >
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
                                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientIncludeFromYear" />
                                    </div>
                                    </div>

                                    <div className="col-md-4 ">
                                    <div className="mb-3">
                                    <label  className="form-label">
                                    Allow Carer Allowance
                                    </label>
                     
                             {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                              <div className="radiobutton">
                                <input type="radio" name="ClientAllowCarer" id="ClientAllowCareropt1" 
                                onChange={handleChange} value="Yes"
                                checked={values.ClientAllowCarer=="Yes"} />
                                <label htmlFor="ClientAllowCareropt1" className="label1">
                                  <span>YES</span>
                                </label>
                                <input type="radio" name="ClientAllowCarer" id="ClientAllowCareropt2" 
                                onChange={handleChange} value="No"
                                
                                checked={values.ClientAllowCarer=="No"} />
                                <label htmlFor="ClientAllowCareropt2" className="label2">
                                  <span>NO</span>
                                </label>
                              </div>
                              </div>
                              {/* switch button style */}
                      

                    </div>
                                    </div>

                                    <div className="col-md-3">
                                    <div className="mb-3">
                                    <label  className="form-label">
                                    Is Client Renting
                                    </label>
                     
                             {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                              <div className="radiobutton">
                                <input type="radio" name="ClientIsClientRenting" id="ClientIsClientRentingopt1" 
                                onChange={handleChange} value="Yes"
                                checked={values.ClientIsClientRenting=="Yes"} />
                                <label htmlFor="ClientIsClientRentingopt1" className="label1">
                                  <span>YES</span>
                                </label>
                                <input type="radio" name="ClientIsClientRenting" id="ClientIsClientRentingopt2" 
                                onChange={handleChange} value="No"
                                
                                checked={values.ClientIsClientRenting=="No"} />
                                <label htmlFor="ClientIsClientRentingopt2" className="label2">
                                  <span>NO</span>
                                </label>
                              </div>
                              </div>
                              {/* switch button style */}
                      

                    </div>
                                    </div>
                                  
                                  </div>

                            
                                {/* ClientForm */}

                                        <hr/>
                            {/* partnerForm */}
                            <div classname="row">
                                <div className="col-md-3">
                                    <div className="mb-3">
                                    <label  className="form-label">
                                    Partner
                                    </label>
                     
                             {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                              <div className="radiobutton">
                                <input type="radio" name="PartnerEdit" id="PartnerEditopt1" 
                                onChange={handleChange} value="Yes"
                                checked={values.PartnerEdit=="Yes"} />
                                <label htmlFor="PartnerEditopt1" className="label1">
                                  <span>YES</span>
                                </label>
                                <input type="radio" name="PartnerEdit" id="PartnerEditopt2" 
                                onChange={handleChange} value="No"
                                
                                checked={values.PartnerEdit=="No"} />
                                <label htmlFor="PartnerEditopt2" className="label2">
                                  <span>NO</span>
                                </label>
                              </div>
                              </div>
                              {/* switch button style */}
                      

                    </div>
                                </div>
                            </div>
                            <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                            <label htmlFor="PartnerCentrelinkPayment" className="form-label">
                            Centrelink Payment
                            </label>
                            <Field
                            id="PartnerCentrelinkPayment"
                            name='PartnerCentrelinkPayment'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerEdit==="Yes"? false :  true}

                            >
                          <option value="">Select</option>
                              <option value="Not Eligible">Not Eligible</option>
                              <option value="Newstart Allowance">Newstart Allowance</option>
                              <option value="Disability Pension">Disability Pension</option>
                              <option value="Carers Payment">Carers Payment</option>
                            
                            
                            </Field>
                            <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerCentrelinkPayment" />
                        </div>
                      </div>
                      
                        <div className="col-md-3">
                        <div className="mb-3">
                            <label htmlFor="PartnerIncludeFromYear" className="form-label">
                            Include From Year
                            </label>
                            <Field
                            id="PartnerIncludeFromYear"
                            name='PartnerIncludeFromYear'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerEdit==="Yes"? false :  true}
                            >
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
                            <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerIncludeFromYear" />
                        </div>
                        </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                        <label  className="form-label">
                        Allow Carer Allowance
                        </label>

                      {/* switch button style */}
                      <div className="form-check form-switch m-0 p-0 ">
                      <div className="radiobutton">
                      <input type="radio" name="PartnerAllowCarer" id="PartnerAllowCareropt1" 
                      onChange={handleChange} value="Yes"
                      checked={values.PartnerAllowCarer=="Yes"} />
                      <label htmlFor="PartnerAllowCareropt1" className="label1">
                      <span>YES</span>
                      </label>
                      <input type="radio" name="PartnerAllowCarer" id="PartnerAllowCareropt2" 
                      onChange={handleChange} value="No"

                      checked={values.PartnerAllowCarer=="No"} />
                      <label htmlFor="PartnerAllowCareropt2" className="label2">
                      <span>NO</span>
                      </label>
                      </div>
                      </div>
                      {/* switch button style */}


                      </div>
                      </div>
                      </div>

                            {/* PartnerForm */}







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
                          </div>
    </div>

                       </div>

    </>
  )
}

export default CentrelinkIncome
