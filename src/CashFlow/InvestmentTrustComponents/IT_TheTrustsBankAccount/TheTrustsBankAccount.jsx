import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./businessTextStructure.css"
import plus from "./images/plus.svg"
import notebook from "./images/notebook.svg"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TheTrustBankAccount = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let initialValues = {
    OpeningCashBank:"",
    InvestmentReturns:"",
    AccountingAuditing:"",
    Indexation:"",
  }

  let validationSchema = Yup.object({
    OpeningCashBank:Yup.number().required("Required").test(
      "Is positive?",
      "Must be a positive number",

      (value) => value > 0
    ),
    InvestmentReturns:Yup.string().required("Required"),
    AccountingAuditing:Yup.number().required("Required").test(
      "Is positive?",
      "Must be a positive number",
      
      (value) => value > 0
      ),
      Indexation:Yup.string().required("Required"),
  })
  let onSubmit = (values) => {

    let clientObj = {
     
    }

    let partnerObj = {
    
    }

    console.log("client", clientObj);
    console.log("partner", partnerObj);

    handleClose();

  }
  return (
    <>


    <label className="form-label">The Trust’s Bank Account</label>
    <br />
      
      <button
        type="button"
        className=" btn btn-outline-success "
        onClick={handleShow}
      >
        <div className="iconContainer mx-1">
          <img className="img-fluid" src={plus} alt="" />
        </div>
        Enter Details
      </button>


      {/* --------------------------------------------------------------- */}
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
            The Trust’s Bank Account
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
                <div>
                  {/* First Row */}
                  <div className="row">

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="OpeningCashBank"
                          className="form-label"
                        >
                          Opening Cash at Bank
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="OpeningCashBank"
                          name='OpeningCashBank'
                          placeholder="Opening Cash at Bank"
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='OpeningCashBank' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="InvestmentReturns" className="form-label">
                          Investment Returns
                        </label>
                        <Field
                          type='select'
                          id="InvestmentReturns"
                          name='InvestmentReturns'
                          className="form-select shadow  inputDesign"
                          as='select'
                      
                        >
                          <option value="">Select</option>
                          <option value="System">System</option>
                          <option value="Input Override">Input Override</option>
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
                          placeholder="Income Yield"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='IncomeYield' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="AccountingAuditing"
                          className="form-label"
                        >
                          Accounting & Auditing
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="AccountingAuditing"
                          name='AccountingAuditing'
                          placeholder="Accounting & Auditing"
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='AccountingAuditing' />
                      </div>
                    </div>



                  </div>

                  <div className="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="Indexation" className="form-label">
                        Indexation of Fund Fees
                        </label>
                        <Field
                          id="Indexation"
                          name='Indexation'
                          className="form-select shadow  inputDesign"
                          as='select'
                        >
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
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="Indexation" />
                      </div>
                    </div>
                  </div>


                </div>

                {/* ClientForm */}








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

      {/* --------------------------------------------------------------- */}


    </>
  )
}

export default TheTrustBankAccount;

