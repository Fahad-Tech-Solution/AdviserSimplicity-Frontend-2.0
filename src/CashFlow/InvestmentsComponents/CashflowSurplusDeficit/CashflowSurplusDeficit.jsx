import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./businessTextStructure.css"
import plus from "./images/plus.svg"
import notebook from "./images/notebook.svg"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CashflowSurplusDeficit = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let initialValues = {

    SurplusHome:"Yes",
    Surplus: "",
    
  }

  let validationSchema = Yup.object({
    Surplus: Yup.string().required('Required'),
  })



  let onSubmit = (values) => {
    console.log(values);
    handleClose();
  }
  
  return (
    <>

      <label htmlFor="" className="form-label">
      Cashflow Surplus/Deficit
      </label>
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
                  Cashflow Surplus/Deficit
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

                        {/* Form */}

                        {/* First Row */}
                        <div className="row">  

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="Surplus" className="form-label">
                              Surplus/Deficit
                              </label>
                              <Field
                                id="Surplus"
                                name='Surplus'
                                className="form-select shadow  inputDesign"
                                as='select'

                              >
                                <option value="">Select</option>
                                <option value="Client">Client</option>
                                <option value="Partner">Partner</option>
                                <option value="Joint">Joint</option>
                                <option value="Spent">Spent</option>

                              </Field>
                              <ErrorMessage component='div' className='text-danger fw-bold' name="Surplus" />
                            </div>
                          </div>

                         

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label className="form-label">
                              Surplus to home loan
                              </label>

                              {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input type="radio" name="SurplusHome" id="SurplusHome1"
                                    onChange={handleChange} value="Yes"
                                    checked={values.SurplusHome == "Yes" } />
                                  <label htmlFor="SurplusHome1" className="label1">
                                    <span>YES</span>
                                  </label>
                                  <input type="radio" name="SurplusHome" id="SurplusHome2"
                                    onChange={handleChange} value = "No"  
                                    checked={values.SurplusHome == "No"} />
                                  <label htmlFor="SurplusHome2" className="label2">
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                              {/* switch button style */}


                            </div>
                          </div>

                          </div>
                          
                          {/* Form */}
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

export default CashflowSurplusDeficit;
