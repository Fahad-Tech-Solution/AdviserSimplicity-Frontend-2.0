import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./businessTextStructure.css"
import plus from "./images/plus.svg"
import notebook from "./images/notebook.svg"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AccumulationDetails = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let initialValues = {

    ClientEdit:"No",
    ClientFundMember:"",
    ClientTaxFreeComponent:"",
    ClientInsuranceAmount:"",
    ClientYearsInclude:"",
    ClientIndexation:"",
    PartnerEdit:"No",
    PartnerTaxFreeComponent:"",
    PartnerInsuranceAmount:"",
    PartnerYearsInclude:"",
    PartnerIndexation:"",
  
  }

  let validationSchema = Yup.object({
    ClientFundMember: Yup.number().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        )}),
        ClientTaxFreeComponent: Yup.number().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        )}),
        ClientInsuranceAmount: Yup.number().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        )}),
        ClientYearsInclude: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")}),
      ClientIndexation: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")}),
        PartnerTaxFreeComponent: Yup.number().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        )}),
        PartnerInsuranceAmount: Yup.number().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        )}),
        PartnerYearsInclude: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")}),
      PartnerIndexation: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")}),

  })



  let onSubmit = (values) => {
    console.log(values);

  }
  return (
    <>
      <div>
        
      <label className="form-label">  Accumulation Details </label>
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
                  Accumulation Details
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
                        <div classname="row">
                          <div className="col-md-3">
                            <div className="mb-3">
                              <label className="form-label">
                                Client
                              </label>

                              {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input type="radio" name="ClientEdit" id="ClientEditopt1"
                                    onChange={handleChange} value="Yes"
                                    checked={values.ClientEdit == "Yes"} />
                                  <label htmlFor="ClientEditopt1" className="label1">
                                    <span>YES</span>
                                  </label>
                                  <input type="radio" name="ClientEdit" id="ClientEditopt2"
                                    onChange={handleChange} value="No"

                                    checked={values.ClientEdit == "No"} />
                                  <label htmlFor="ClientEditopt2" className="label2">
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                              {/* switch button style */}


                            </div>
                          </div>
                        </div>

                        {/* First Row Client*/}
                        <div className="row">

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="ClientFundMember"
                                className="form-label">
                               % of Fund for Member
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="ClientFundMember"
                                name='ClientFundMember'
                                placeholder="% of Fund for Member"
                                disabled={values.ClientEdit === "Yes" ? false : true}
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='ClientFundMember' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="ClientActualValueMember"
                                className="form-label">
                                Actual Value to Member
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="ClientActualValueMember"
                                name='ClientActualValueMember'
                                placeholder="Actual Value to Member"
                                disabled
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='ClientActualValueMember' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="ClientTaxFreeComponent"
                                className="form-label">
                                Tax-Free Component
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="ClientTaxFreeComponent"
                                name='ClientTaxFreeComponent'
                                placeholder="Tax-Free Component"
                                disabled = {values.ClientEdit === "Yes" ? false : true}
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='ClientTaxFreeComponent' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="ClientTaxableComponent"
                                className="form-label"
                              >
                               Taxable Component
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="ClientTaxableComponent"
                                name='ClientTaxableComponent'
                                placeholder="Taxable Component"
                                disabled
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='ClientTaxableComponent' />
                            </div>
                          </div>



                        </div>

                        {/* Second Row Client*/}

                        <div className="row"> 

                        <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="ClientInsuranceAmount"
                                className="form-label">
                                Insurance Premiums Amount
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="ClientInsuranceAmount"
                                name='ClientInsuranceAmount'
                                placeholder="Insurance Premiums Amount"
                                disabled={values.ClientEdit === "Yes" ? false : true}
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='ClientInsuranceAmount' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="ClientYearsInclude" className="form-label">
                              Years to Include
                              </label>
                              <Field
                                id="ClientYearsInclude"
                                name='ClientYearsInclude'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.ClientEdit === "Yes" ? false : true}

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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="ClientYearsInclude" />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="ClientIndexation" className="form-label">
                              Indexation of Premiums
                              </label>
                              <Field
                                id="ClientIndexation"
                                name='ClientIndexation'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.ClientEdit === "Yes" ? false : true}

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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="ClientIndexation" />
                            </div>
                          </div>


                        </div>

                        </div>
                        {/* ClientForm */}

                        <hr />
                        {/* partnerForm */}
                        <div>
                        <div classname="row">
                          <div className="col-md-3">
                            <div className="mb-3">
                              <label className="form-label">
                                Partner
                              </label>

                              {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input type="radio" name="PartnerEdit" id="PartnerEditopt1"
                                    onChange={handleChange} value="Yes"
                                    checked={values.PartnerEdit == "Yes"} />
                                  <label htmlFor="PartnerEditopt1" className="label1">
                                    <span>YES</span>
                                  </label>
                                  <input type="radio" name="PartnerEdit" id="PartnerEditopt2"
                                    onChange={handleChange} value="No"

                                    checked={values.PartnerEdit == "No"} />
                                  <label htmlFor="PartnerEditopt2" className="label2">
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                              {/* switch button style */}


                            </div>
                          </div>
                        </div>

                        {/* First Row Partner*/}
                        <div className="row">

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="PartnerFundMember"
                                className="form-label">
                               % of Fund for Member
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="PartnerFundMember"
                                name='PartnerFundMember'
                                placeholder="% of Fund for Member"
                                disabled
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerFundMember' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="PartnerActualValueMember"
                                className="form-label">
                                Actual Value to Member
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="PartnerActualValueMember"
                                name='PartnerActualValueMember'
                                placeholder="Actual Value to Member"
                                disabled
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerActualValueMember' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="PartnerTaxFreeComponent"
                                className="form-label">
                                Tax-Free Component
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="PartnerTaxFreeComponent"
                                name='PartnerTaxFreeComponent'
                                placeholder="Tax-Free Component"
                                disabled = {values.PartnerEdit === "Yes" ? false : true}
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerTaxFreeComponent' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="PartnerTaxableComponent"
                                className="form-label"
                              >
                               Taxable Component
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="PartnerTaxableComponent"
                                name='PartnerTaxableComponent'
                                placeholder="Taxable Component"
                                disabled
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerTaxableComponent' />
                            </div>
                          </div>



                        </div>

                        {/* Second Row Partner*/}

                        <div className="row"> 

                        <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="PartnerInsuranceAmount"
                                className="form-label">
                                Insurance Premiums Amount
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="PartnerInsuranceAmount"
                                name='PartnerInsuranceAmount'
                                placeholder="Insurance Premiums Amount"
                                disabled={values.PartnerEdit === "Yes" ? false : true}
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerInsuranceAmount' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="PartnerYearsInclude" className="form-label">
                              Years to Include
                              </label>
                              <Field
                                id="PartnerYearsInclude"
                                name='PartnerYearsInclude'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.PartnerEdit === "Yes" ? false : true}

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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerYearsInclude" />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="PartnerIndexation" className="form-label">
                              Indexation of Premiums
                              </label>
                              <Field
                                id="PartnerIndexation"
                                name='PartnerIndexation'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.PartnerEdit === "Yes" ? false : true}

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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerIndexation" />
                            </div>
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

    </>
  )
}

export default AccumulationDetails;
