import React, { useState,useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./businessTextStructure.css"
import plus from "./images/plus.svg"
import notebook from "./images/notebook.svg"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NonTaxableIncome = () => {
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let initialValues={

// ClientInitialValue
ClientEdit:'No',
ClientOtherNontaxableIncome:'',
ClientIncludeFromYear:'',
ClientupUntilYear:'',
ClientIndexation:'',
// ClientInitialValue


// partnerInitialValue
PartnerEdit:'No',
PartnerOtherNontaxableIncome:'',
PartnerIncludeFromYear:'',
PartnerupUntilYear:'',
PartnerIndexation:'',

// partnerInitialValue



  }

  let validationSchema=Yup.object({
// clientValidation
ClientOtherNontaxableIncome:Yup.string().when("ClientEdit", {
  is: (val) => val && val.length == 3,
  then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
  otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
}),
ClientIncludeFromYear:Yup.string().when("ClientEdit", {
  is: (val) => val && val.length == 3,
  then: Yup.string().required("Required"),
  otherwise: Yup.string().notRequired(),
}),
// ClientupUntilYear:Yup.string().when("ClientEdit", {
//   is: (val) => val && val.length == 3,
//   then: Yup.string().required("Required").test('is-greater', 'To Year must be greater than From Year', function(value) {
//     const fromYear = parseInt(this.resolve(Yup.ref('ClientIncludeFromYear')));
//     const toYear = parseInt(value);
//     return toYear >= fromYear;
//         }),
//   otherwise: Yup.string().notRequired(),
// }),


ClientupUntilYear: Yup.string().when("ClientEdit", {
  is: (val) => val && val.length === 3,
  then: Yup.string().required("Required").test('is-greater', 'To Year must be greater than From Year', function(value) {
    const fromYear = parseInt(this.resolve(Yup.ref('ClientIncludeFromYear')));
    const toYear = parseInt(value);
    return toYear >= fromYear;
  }),
  otherwise: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
    const fromYear = this.parent.ClientIncludeFromYear;
    const toYear = parseInt(value);
    return !toYear || toYear >= fromYear;
  }).nullable(true),
}),
ClientIndexation:Yup.string().when("ClientEdit", {
  is: (val) => val && val.length == 3,
  then: Yup.string().required("Required"),
  otherwise: Yup.string().notRequired(),
}),


    // partnervalidation
    PartnerOtherNontaxableIncome:Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
      otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
    }),
    PartnerIncludeFromYear:Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
//     PartnerupUntilYear:Yup.string().when("PartnerEdit", {
//       is: (val) => val && val.length == 3,
//       then: Yup.string().required("Required").test('is-greater', 'To Year must be greater than From Year', function(value) {
//         const fromYear = parseInt(this.resolve(Yup.ref('PartnerIncludeFromYear')));
//         const toYear = parseInt(value);
//         return toYear >= fromYear;
//         }),
//       otherwise: Yup.string().notRequired(),
//     }),


    PartnerupUntilYear: Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required").test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('PartnerIncludeFromYear')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = this.parent.PartnerIncludeFromYear;
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),

    
    PartnerIndexation:Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    
   
  })
  let onSubmit=(values)=>{
   

    let clientObj={
      ClientOtherNontaxableIncome:values.ClientOtherNontaxableIncome,
      ClientIncludeFromYear:values.ClientIncludeFromYear,
      ClientupUntilYear:values.ClientupUntilYear,
      ClientIndexation:values.ClientIndexation,
    }

    let partnerObj={
      PartnerOtherNontaxableIncome:values.PartnerOtherNontaxableIncome,
      PartnerIncludeFromYear:values.PartnerIncludeFromYear,
      PartnerupUntilYear:values.PartnerupUntilYear,
      PartnerIndexation:values.PartnerIndexation,

          }

          console.log("client",clientObj)
          console.log("partner",partnerObj)

          handleClose();

  }
  return (
    <>

     <label htmlFor="" className="form-label">
     Other Non-taxable Income
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
                                  Other Non-taxable Income
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
                                        <label
                                          htmlFor="ClientOtherNontaxableIncome"
                                          className="form-label"
                                        >
                                         Other Non-taxable Income
                                        </label>
                                        <Field
                                          type="number"
                                          className="form-control inputDesign  shadow"
                                          id="ClientFraClientOtherNontaxableIncomenking"
                                          name='ClientOtherNontaxableIncome'
                                          placeholder="Other Non-taxable Income"
                                          disabled={values.ClientEdit==="Yes"? false : true}
                                        />
                                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientOtherNontaxableIncome'/>
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

                                    <div className="col-md-3">
                                    <div className="mb-3">
                                        <label htmlFor="ClientupUntilYear" className="form-label">
                                        Up Until Year
                                        </label>
                                        <Field
                                        id="ClientupUntilYear"
                                        name='ClientupUntilYear'
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
                                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientupUntilYear" />
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
                                       disabled={values.ClientEdit==="Yes"? false :  true}

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
                                        <label
                                          htmlFor="PartnerOtherNontaxableIncome"
                                          className="form-label"
                                        >
                                         Other Non-taxable Income
                                        </label>
                                        <Field
                                          type="number"
                                          className="form-control inputDesign  shadow"
                                          id="PartnerFraPartnerOtherNontaxableIncomenking"
                                          name='PartnerOtherNontaxableIncome'
                                          placeholder="Other Non-taxable Income"
                                          disabled={values.PartnerEdit==="Yes"? false : true}
                                        />
                                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerOtherNontaxableIncome'/>
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

                                    <div className="col-md-3">
                                    <div className="mb-3">
                                        <label htmlFor="PartnerupUntilYear" className="form-label">
                                        Up Until Year
                                        </label>
                                        <Field
                                        id="PartnerupUntilYear"
                                        name='PartnerupUntilYear'
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
                                        <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerupUntilYear" />
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
                                       disabled={values.PartnerEdit==="Yes"? false :  true}

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

export default NonTaxableIncome
