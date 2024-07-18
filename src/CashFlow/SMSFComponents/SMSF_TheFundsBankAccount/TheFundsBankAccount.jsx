import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import { differenceInYears, getDate } from "date-fns";
import Modal from "react-bootstrap/Modal";

import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "yup-phone";

//Images 
import plus from "./images/plus.svg";

const TheFundsBankAccount = () => {
  let [LumpsumSuperContributionsModal, setLumpsumSuperContributionsModal] = useState(false);
  let [LumpsumSuperContributions, setLumpsumSuperContributions] = useState([]);

  let initialValues = {
    OpeningCashatBank: '',
    InvestmentsReturns: '',
    IncomeYield: '',
    AccountingAuditing: '',
    ATOLEVY: '',
    IndexationofFundFees: '',
  };

  let validationSchema = Yup.object().shape({
    OpeningCashatBank: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
    InvestmentsReturns: Yup.string().required("Required"),
    IncomeYield: Yup.string().when('InvestmentsReturns', {
      is: (val) => val && val.length == 13,
      then: Yup.string().required("Required")
    }),
    AccountingAuditing: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
    ATOLEVY: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
    IndexationofFundFees: Yup.string().required("Required"),

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
        
      <label className="form-label"> The Fund's Bank Account </label>
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
            The Fund's Bank Account
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
                    <label htmlFor="OpeningCashatBank" className="form-label">Opening Cash at Bank</label>
                    <Field type="number" className="form-control shadow inputDesign" id="OpeningCashatBank"
                      name="OpeningCashatBank" placeholder="$00" />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="OpeningCashatBank" />
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
                      name="IncomeYield" placeholder="$00" disabled={values.InvestmentsReturns=="InputOverRide"?false:true}/>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="IncomeYield" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="AccountingAuditing" className="form-label">Accounting & Auditing</label>
                    <Field type="number" className="form-control shadow inputDesign" id="AccountingAuditing"
                      name="AccountingAuditing" placeholder="$00" />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="AccountingAuditing" />
                  </div>
                </div>
                 {/* Second Row */}
                <div className="row">
                  <div className="col-md-3">
                  <label htmlFor="ATOLEVY" className="form-label">ATO LEVY</label>
                    <Field type="number" className="form-control shadow inputDesign" id="ATOLEVY"
                      name="ATOLEVY" placeholder="$00" />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="ATOLEVY" />
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="IndexationofFundFees" className="form-label">
                      Indexation of Fund Fees
                      </label>
                      <Field
                        id="IndexationofFundFees"
                        name='IndexationofFundFees'
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
                      <ErrorMessage component='div' className='text-danger fw-bold' name="IndexationofFundFees" />
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
export default TheFundsBankAccount;
