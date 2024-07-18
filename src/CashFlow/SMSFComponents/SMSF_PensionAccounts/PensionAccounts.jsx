import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./businessTextStructure.css"
import plus from "./images/plus.svg"
import notebook from "./images/notebook.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { faCircleInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const PensionAccounts = () => {

  const [TermDeposits, setTermDeposits] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  let initialValues = {
    ClientEdit: "No",
    ClientPensionType: "",
    ClientCommencePensionYear: "",
    ClientEditDeeming:"No",
    ClientRolloverAmount: "",
    ClientPurchasePrice: "",
    ClientTaxFreeComponent: "",
    ClientCentrelinkNumber: "",
    ClientEditReversionary: "Yes",
    ClientNominatedPension: "",
    ClientIndexation2: "",
    ClientOtherAmount: "",
    ClientEditPension: "No",
    ClientCommencePensionYear2: "",
    ClientNominatedRollover: "",
    ClientNominatedPension2: "",
    ClientEditReversionaryPension: "No",

    PartnerEdit: "No",
    PartnerPensionType: "",
    PartnerCommencePensionYear: "",
    PartnerRolloverAmount: "",
    PartnerPurchasePrice: "",
    PartnerTaxFreeComponent: "",
    PartnerCentrelinkNumber: "",
    PartnerEditReversionary: "Yes",
    PartnerNominatedPension: "",
    PartnerIndexation2: "",
    PartnerOtherAmount: "",
    PartnerEditPension: "No",
    PartnerCommencePensionYear2: "",
    PartnerNominatedRollover: "",
    PartnerNominatedPension2: "",
    PartnerEditReversionaryPension: "No",
  }

  let validationSchema = Yup.object({
    ClientPensionType: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ClientCommencePensionYear: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ClientRolloverAmount: Yup.number().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    ClientPurchasePrice: Yup.number().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    ClientTaxFreeComponent: Yup.number().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    ClientCentrelinkNumber: Yup.number().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    ClientNominatedPension: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ClientOtherAmount: Yup.number().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    ClientIndexation2: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ClientCommencePensionYear2: Yup.string().when('ClientEditPension', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ClientNominatedRollover: Yup.number().when('ClientEditPension', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    ClientNominatedPension2: Yup.string().when('ClientEditPension', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    PartnerPensionType: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    PartnerCommencePensionYear: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    PartnerRolloverAmount: Yup.number().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    PartnerPurchasePrice: Yup.number().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    PartnerTaxFreeComponent: Yup.number().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    PartnerCentrelinkNumber: Yup.number().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    PartnerNominatedPension: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    PartnerOtherAmount: Yup.number().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    PartnerIndexation2: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    PartnerCommencePensionYear2: Yup.string().when('PartnerEditPension', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    PartnerNominatedRollover: Yup.number().when('PartnerEditPension', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    PartnerNominatedPension2: Yup.string().when('PartnerEditPension', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
  })

  let onSubmit = (values) => {
    // console.log(values);

    let data = {
      ClientEdit: values.ClientEdit,
      ClientEditPension: values.ClientEditPension,
      ClientOpeningValue: values.ClientOpeningValue,
      ClientInvestmentReturns: values.ClientInvestmentReturns,
      ClientIncomeYield: values.ClientIncomeYield,
      ClientEditDeeming: values.ClientEditDeeming,
      ClientEditReversionary: values.ClientEditReversionary,
      ClientEditRollover: values.ClientEditRollover,
      ClientReinvestUpUntil: values.ClientReinvestUpUntil,
      ClientRegularContributions: values.ClientRegularContributions,
      ClientContributeYear: values.ClientContributeYear,
      ClientContributeUpUntil: values.ClientContributeUpUntil,
      ClientIndexation: values.ClientIndexation,
      ClientRiskProfile: values.ClientRiskProfile,

      PartnerEdit: values.PartnerEdit,
      PartnerOpeningValue: values.PartnerOpeningValue,
      PartnerInvestmentReturns: values.PartnerInvestmentReturns,
      PartnerIncomeYield: values.PartnerIncomeYield,
      PartnerEditReinvest: values.PartnerEditReinvest,
      PartnerReinvestUpUntil: values.PartnerReinvestUpUntil,
      PartnerRegularContributions: values.PartnerRegularContributions,
      PartnerContributeYear: values.PartnerContributeYear,
      PartnerContributeUpUntil: values.PartnerContributeUpUntil,
      PartnerIndexation: values.PartnerIndexation,
      PartnerRiskProfile: values.PartnerRiskProfile,

      JointEdit: values.JointEdit,
      JointOpeningValue: values.JointOpeningValue,
      JointInvestmentReturns: values.JointInvestmentReturns,
      JointIncomeYield: values.JointIncomeYield,
      JointEditReinvest: values.JointEditReinvest,
      JointReinvestUpUntil: values.JointReinvestUpUntil,
      JointRegularContributions: values.JointRegularContributions,
      JointContributeYear: values.JointContributeYear,
      JointContributeUpUntil: values.JointContributeUpUntil,
      JointIndexation: values.JointIndexation,
      JointRiskProfile: values.JointRiskProfile,

    }
    console.log(data);
    setTermDeposits([data]);

  }

  return (
    <>
      <div>
        
      <label className="form-label">  Pension Accounts </label>
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
            Pension Accounts
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
                        <label htmlFor="ClientPensionType" className="form-label">
                          Pension Type
                        </label>
                        <Field
                          id="ClientPensionType"
                          name='ClientPensionType'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.ClientEdit === "Yes" ? false : true}

                        >
                          <option value="">Select</option>
                          <option value="TTR">TTR</option>
                          <option value="Account Based">Account Based</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPensionType" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="ClientCommencePensionYear" className="form-label">
                          Commence Pension in Year
                        </label>
                        <Field
                          id="ClientCommencePensionYear"
                          name='ClientCommencePensionYear'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.ClientEdit === "Yes" ? false : true}

                        >
                          <option value="">Select</option>
                          <option value="Existing">Existing</option>
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
                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientCommencePensionYear" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label className="form-label">
                          Apply Deeming
                        </label>

                        {/* switch button style */}
                        <div className="form-check form-switch m-0 p-0 ">
                          <div className="radiobutton">
                            <input type="radio" name="ClientEditDeeming" id="ClientEditDeeming1"
                              disabled={values.ClientEdit === "Yes" ? false : true}
                              onChange={handleChange} value="Yes"
                              checked={values.ClientEditDeeming == "Yes"} />
                            <label htmlFor="ClientEditDeeming1" className="label1">
                              <span>YES</span>
                            </label>
                            <input type="radio" name="ClientEditDeeming" id="ClientEditDeeming2"
                              disabled={values.ClientEdit === "Yes" ? false : true}
                              onChange={handleChange} value="No"
                              checked={values.ClientEditDeeming == "No"} />
                            <label htmlFor="ClientEditDeeming2" className="label2">
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                        {/* switch button style */}


                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientSuperannuationBenefits"
                          className="form-label"
                        >
                          Total Superannuation Benefits
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientSuperannuationBenefits"
                          name='ClientSuperannuationBenefits'
                          placeholder="Total Superannuation Benefits"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuperannuationBenefits' />
                      </div>
                    </div>

                  </div>

                  {/* Second Row Client*/}

                  <div className="row">

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientRolloverAmount"
                          className="form-label"
                        >
                          Nominated Rollover Amount
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientRolloverAmount"
                          name='ClientRolloverAmount'
                          placeholder="Nominated Rollover Amount"
                          disabled={values.ClientEdit === "Yes" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientRolloverAmount' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientPurchasePrice"
                          className="form-label"
                        >
                          Purchase Price
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientPurchasePrice"
                          name='ClientPurchasePrice'
                          placeholder="Purchase Price"
                          disabled={values.ClientEdit === "Yes" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPurchasePrice' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientTaxFreeComponent"
                          className="form-label"
                        >
                          Tax Free Component
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientTaxFreeComponent"
                          name='ClientTaxFreeComponent'
                          placeholder="Tax Free Component"
                          disabled={values.ClientEdit === "Yes" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientTaxFreeComponent' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientCentrelinkNumber"
                          className="form-label"
                        >
                          Centrelink Relevant Number
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientCentrelinkNumber"
                          name='ClientCentrelinkNumber'
                          placeholder="Centrelink Relevant Number"
                          disabled={values.ClientEdit === "Yes" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientCentrelinkNumber' />
                      </div>
                    </div>

                  </div>

                  {/* Third Row Client*/}
                  <div className="row">

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientPreservationAge"
                          className="form-label"
                        >
                          Preservation Age
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientPreservationAge"
                          name='ClientPreservationAge'
                          placeholder="Preservation Age"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPreservationAge' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientPreservationAgeYear"
                          className="form-label"
                        >
                          Preservation Age in Year
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientPreservationAgeYear"
                          name='ClientPreservationAgeYear'
                          placeholder="Preservation Age in Year"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPreservationAgeYear' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientMinimumPension"
                          className="form-label"
                        >
                          Minimum Pension
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientMinimumPension"
                          name='ClientMinimumPension'
                          placeholder="Minimum Pension"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientMinimumPension' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientMaximumPension"
                          className="form-label"
                        >
                          Maximum TTR Pension
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientMaximumPension"
                          name='ClientMaximumPension'
                          placeholder="Maximum TTR Pension"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientMaximumPension' />
                      </div>
                    </div>

                  </div>

                  {/* Fourth Row Client*/}

                  <div className="row">

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label className="form-label">
                          Reversionary Pension Option
                        </label>

                        {/* switch button style */}
                        <div className="form-check form-switch m-0 p-0 ">
                          <div className="radiobutton">
                            <input type="radio" name="ClientEditReversionary" id="ClientEditReversionary1"
                              disabled={values.ClientEdit === "Yes" ? false : true}
                              onChange={handleChange} value="Yes"
                              checked={values.ClientEditReversionary == "Yes"} />
                            <label htmlFor="ClientEditReversionary1" className="label1">
                              <span>YES</span>
                            </label>
                            <input type="radio" name="ClientEditReversionary" id="ClientEditReversionary2"
                              disabled={values.ClientEdit === "Yes" ? false : true}
                              onChange={handleChange} value="No"
                              checked={values.ClientEditReversionary == "No"} />
                            <label htmlFor="ClientEditReversionary2" className="label2">
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                        {/* switch button style */}



                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="ClientNominatedPension" className="form-label">
                          Nominated Pension Amount
                        </label>
                        <Field
                          id="ClientNominatedPension"
                          name='ClientNominatedPension'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.ClientEdit === "Yes" ? false : true}

                        >
                          <option value="">Select</option>
                          <option value="Minimum">Minimum</option>
                          <option value="Maximum">Maximum</option>
                          <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientNominatedPension" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientOtherAmount"
                          className="form-label"
                        >
                          Other Amount
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientOtherAmount"
                          name='ClientOtherAmount'
                          placeholder="Other Amount"
                          disabled={values.ClientEdit === "Yes" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientOtherAmount' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="ClientIndexation2" className="form-label">
                          Indexation
                        </label>
                        <Field
                          id="ClientIndexation2"
                          name='ClientIndexation2'
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
                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientIndexation2" />
                      </div>
                    </div>

                  </div>

                  {/* Fifth Row Client*/}

                  <div className="row">

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label className="form-label">
                          New Pension Rollover
                        </label>

                        {/* switch button style */}
                        <div className="form-check form-switch m-0 p-0">
                          <div className="radiobutton d-inline-block">
                            <input type="radio" name="ClientEditPension" id="ClientEditPensionopt1"
                              onChange={handleChange} value="Yes"
                              checked={values.ClientEditPension == "Yes"} />
                            <label htmlFor="ClientEditPensionopt1" className="label1">
                              <span>YES</span>
                            </label>
                            <input type="radio" name="ClientEditPension" id="ClientEditPensionopt2"
                              onChange={handleChange} value="No"

                              checked={values.ClientEditPension == "No"} />
                            <label htmlFor="ClientEditPensionopt2" className="label2">
                              <span>NO</span>
                            </label>
                          </div>
                          <div className="d-inline-block float-end me-5 mt-2">
                            <FontAwesomeIcon data-bs-toggle="tooltip" data-bs-placement="top" title="Any new pension rollovers will count as a debit towards the Clients Transfer Pension Cap. Any subsequent investment growth will not count towards the Current Transfer Pension Cap of $1.6 Million." icon={faCircleInfo}></FontAwesomeIcon>
                          </div>
                        </div>
                        {/* switch button style */}


                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="ClientCommencePensionYear2" className="form-label">
                          Commence Pension in Year
                        </label>
                        <Field
                          id="ClientCommencePensionYear2"
                          name='ClientCommencePensionYear2'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.ClientEditPension === "Yes" ? false : true}

                        >
                          <option value="">Select</option>
                          <option value="No">No</option>
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
                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientCommencePensionYear2" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientCurrentPension"
                          className="form-label"
                        >
                          Current Pension Details
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientCurrentPension"
                          name='ClientCurrentPension'
                          placeholder="Current Pension Details"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientCurrentPension' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientTotalSuperannuation"
                          className="form-label"
                        >
                          Total Superannuation Benefits
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientTotalSuperannuation"
                          name='ClientTotalSuperannuation'
                          placeholder="Total Superannuation Benefits"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientTotalSuperannuation' />
                      </div>
                    </div>

                  </div>

                  {/* Sixth Row Client*/}

                  <div className="row">

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientNominatedRollover"
                          className="form-label"
                        >
                          Nominated Rollover Amount
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientNominatedRollover"
                          name='ClientNominatedRollover'
                          placeholder="Nominated Rollover Amount"
                          disabled={values.ClientEditPension === "Yes" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientNominatedRollover' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientMinimumPension2"
                          className="form-label"
                        >
                          Minimum Pension
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientMinimumPension2"
                          name='ClientMinimumPension2'
                          placeholder="Minimum Pension"
                          disabled />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientMinimumPension2' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientMaximumPension2"
                          className="form-label"
                        >
                          Maximum Pension
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientMaximumPension2"
                          name='ClientMaximumPension2'
                          placeholder="Maximum Pension"
                          disabled />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientMaximumPension2' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label className="form-label">
                          Reversionary Pension Option
                        </label>

                        {/* switch button style */}
                        <div className="form-check form-switch m-0 p-0 ">
                          <div className="radiobutton">
                            <input type="radio" name="ClientEditReversionaryPension" id="ClientEditReversionaryPension1"
                              disabled={values.ClientEditPension === "Yes" ? false : true}
                              onChange={handleChange} value="Yes"
                              checked={values.ClientEditReversionaryPension == "Yes"} />
                            <label htmlFor="ClientEditReversionaryPension1" className="label1">
                              <span>YES</span>
                            </label>
                            <input type="radio" name="ClientEditReversionaryPension" id="ClientEditReversionaryPension2"
                              disabled={values.ClientEditPension === "No" ? true : false}
                              onChange={handleChange} value="No"
                              checked={values.ClientEditReversionaryPension == "No"} />
                            <label htmlFor="ClientEditReversionaryPension2" className="label2">
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                        {/* switch button style */}



                      </div>
                    </div>

                  </div>

                  {/* Seventh Row Client */}

                  <div className="row">

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="ClientNominatedPension2" className="form-label">
                          Nominated Pension Amount
                        </label>
                        <Field
                          id="ClientNominatedPension2"
                          name='ClientNominatedPension2'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.ClientEditPension === "Yes" ? false : true}

                        >
                          <option value="">Select</option>
                          <option value="Minimum">Minimum</option>
                          <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientNominatedPension2" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientOtherAmount2"
                          className="form-label"
                        >
                          Other Amount
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientOtherAmount2"
                          name='ClientOtherAmount2'
                          placeholder="Other Amount"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientOtherAmount2' />
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
                          disabled

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
                        <label htmlFor="PartnerPensionType" className="form-label">
                          Pension Type
                        </label>
                        <Field
                          id="PartnerPensionType"
                          name='PartnerPensionType'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.PartnerEdit === "Yes" ? false : true}

                        >
                          <option value="">Select</option>
                          <option value="TTR">TTR</option>
                          <option value="Account Based">Account Based</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPensionType" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="PartnerCommencePensionYear" className="form-label">
                          Commence Pension in Year
                        </label>
                        <Field
                          id="PartnerCommencePensionYear"
                          name='PartnerCommencePensionYear'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.PartnerEdit === "Yes" ? false : true}

                        >
                          <option value="">Select</option>
                          <option value="Existing">Existing</option>
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
                        <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerCommencePensionYear" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label className="form-label">
                          Apply Deeming
                        </label>

                        {/* switch button style */}
                        <div className="form-check form-switch m-0 p-0 ">
                          <div className="radiobutton">
                            <input type="radio" name="PartnerEditDeeming" id="PartnerEditDeeming1"
                              disabled={values.PartnerEdit === "Yes" ? false : true}
                              onChange={handleChange} value="Yes"
                              checked={values.PartnerEditDeeming == "Yes"} />
                            <label htmlFor="PartnerEditDeeming1" className="label1">
                              <span>YES</span>
                            </label>
                            <input type="radio" name="PartnerEditDeeming" id="PartnerEditDeeming2"
                              disabled={values.PartnerEdit === "Yes" ? false : true}
                              onChange={handleChange} value="No"
                              checked={values.PartnerEditDeeming == "No"} />
                            <label htmlFor="PartnerEditDeeming2" className="label2">
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                        {/* switch button style */}


                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerSuperannuationBenefits"
                          className="form-label"
                        >
                          Total Superannuation Benefits
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerSuperannuationBenefits"
                          name='PartnerSuperannuationBenefits'
                          placeholder="Total Superannuation Benefits"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuperannuationBenefits' />
                      </div>
                    </div>

                  </div>

                  {/* Second Row Partner*/}

                  <div className="row">

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerRolloverAmount"
                          className="form-label"
                        >
                          Nominated Rollover Amount
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerRolloverAmount"
                          name='PartnerRolloverAmount'
                          placeholder="Nominated Rollover Amount"
                          disabled={values.PartnerEdit === "Yes" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerRolloverAmount' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerPurchasePrice"
                          className="form-label"
                        >
                          Purchase Price
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerPurchasePrice"
                          name='PartnerPurchasePrice'
                          placeholder="Purchase Price"
                          disabled={values.PartnerEdit === "Yes" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPurchasePrice' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerTaxFreeComponent"
                          className="form-label"
                        >
                          Tax Free Component
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerTaxFreeComponent"
                          name='PartnerTaxFreeComponent'
                          placeholder="Tax Free Component"
                          disabled={values.PartnerEdit === "Yes" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerTaxFreeComponent' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerCentrelinkNumber"
                          className="form-label"
                        >
                          Centrelink Relevant Number
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerCentrelinkNumber"
                          name='PartnerCentrelinkNumber'
                          placeholder="Centrelink Relevant Number"
                          disabled={values.PartnerEdit === "Yes" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerCentrelinkNumber' />
                      </div>
                    </div>

                  </div>

                  {/* Third Row Partner*/}
                  <div className="row">

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerPreservationAge"
                          className="form-label"
                        >
                          Preservation Age
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerPreservationAge"
                          name='PartnerPreservationAge'
                          placeholder="Preservation Age"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPreservationAge' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerPreservationAgeYear"
                          className="form-label"
                        >
                          Preservation Age in Year
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerPreservationAgeYear"
                          name='PartnerPreservationAgeYear'
                          placeholder="Preservation Age in Year"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPreservationAgeYear' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerMinimumPension"
                          className="form-label"
                        >
                          Minimum Pension
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerMinimumPension"
                          name='PartnerMinimumPension'
                          placeholder="Minimum Pension"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerMinimumPension' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerMaximumPension"
                          className="form-label"
                        >
                          Maximum TTR Pension
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerMaximumPension"
                          name='PartnerMaximumPension'
                          placeholder="Maximum TTR Pension"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerMaximumPension' />
                      </div>
                    </div>

                  </div>

                  {/* Fourth Row Partner*/}

                  <div className="row">

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label className="form-label">
                          Reversionary Pension Option
                        </label>

                        {/* switch button style */}
                        <div className="form-check form-switch m-0 p-0 ">
                          <div className="radiobutton">
                            <input type="radio" name="PartnerEditReversionary" id="PartnerEditReversionary1"
                              disabled={values.PartnerEdit === "Yes" ? false : true}
                              onChange={handleChange} value="Yes"
                              checked={values.PartnerEditReversionary == "Yes"} />
                            <label htmlFor="PartnerEditReversionary1" className="label1">
                              <span>YES</span>
                            </label>
                            <input type="radio" name="PartnerEditReversionary" id="PartnerEditReversionary2"
                              disabled={values.PartnerEdit === "Yes" ? false : true}
                              onChange={handleChange} value="No"
                              checked={values.PartnerEditReversionary == "No"} />
                            <label htmlFor="PartnerEditReversionary2" className="label2">
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                        {/* switch button style */}



                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="PartnerNominatedPension" className="form-label">
                          Nominated Pension Amount
                        </label>
                        <Field
                          id="PartnerNominatedPension"
                          name='PartnerNominatedPension'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.PartnerEdit === "Yes" ? false : true}

                        >
                          <option value="">Select</option>
                          <option value="Minimum">Minimum</option>
                          <option value="Maximum">Maximum</option>
                          <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerNominatedPension" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerOtherAmount"
                          className="form-label"
                        >
                          Other Amount
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerOtherAmount"
                          name='PartnerOtherAmount'
                          placeholder="Other Amount"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerOtherAmount' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="PartnerIndexation2" className="form-label">
                          Indexation
                        </label>
                        <Field
                          id="PartnerIndexation2"
                          name='PartnerIndexation2'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled

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
                        <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerIndexation2" />
                      </div>
                    </div>

                  </div>

                  {/* Fifth Row Partner*/}

                  <div className="row">

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label className="form-label">
                          New Pension Rollover
                        </label>

                        {/* switch button style */}
                        <div className="form-check form-switch m-0 p-0">
                          <div className="radiobutton d-inline-block">
                            <input type="radio" name="PartnerEditPension" id="PartnerEditPensionopt1"
                              onChange={handleChange} value="Yes"
                              checked={values.PartnerEditPension == "Yes"} />
                            <label htmlFor="PartnerEditPensionopt1" className="label1">
                              <span>YES</span>
                            </label>
                            <input type="radio" name="PartnerEditPension" id="PartnerEditPensionopt2"
                              onChange={handleChange} value="No"

                              checked={values.PartnerEditPension == "No"} />
                            <label htmlFor="PartnerEditPensionopt2" className="label2">
                              <span>NO</span>
                            </label>
                          </div>
                          <div className="d-inline-block float-end me-5 mt-2">
                            <FontAwesomeIcon data-bs-toggle="tooltip" data-bs-placement="top" title="Any new pension rollovers will count as a debit towards the Partners Transfer Pension Cap. Any subsequent investment growth will not count towards the Current Transfer Pension Cap of $1.6 Million." icon={faCircleInfo}></FontAwesomeIcon>
                          </div>
                        </div>
                        {/* switch button style */}


                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="PartnerCommencePensionYear2" className="form-label">
                          Commence Pension in Year
                        </label>
                        <Field
                          id="PartnerCommencePensionYear2"
                          name='PartnerCommencePensionYear2'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.PartnerEditPension === "Yes" ? false : true}

                        >
                          <option value="">Select</option>
                          <option value="No">No</option>
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
                        <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerCommencePensionYear2" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerCurrentPension"
                          className="form-label"
                        >
                          Current Pension Details
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerCurrentPension"
                          name='PartnerCurrentPension'
                          placeholder="Current Pension Details"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerCurrentPension' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerTotalSuperannuation"
                          className="form-label"
                        >
                          Total Superannuation Benefits
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerTotalSuperannuation"
                          name='PartnerTotalSuperannuation'
                          placeholder="Total Superannuation Benefits"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerTotalSuperannuation' />
                      </div>
                    </div>

                  </div>

                  {/* Sixth Row Partner*/}

                  <div className="row">

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerNominatedRollover"
                          className="form-label"
                        >
                          Nominated Rollover Amount
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerNominatedRollover"
                          name='PartnerNominatedRollover'
                          placeholder="Nominated Rollover Amount"
                          disabled={values.PartnerEditPension === "Yes" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerNominatedRollover' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerMinimumPension2"
                          className="form-label"
                        >
                          Minimum Pension
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerMinimumPension2"
                          name='PartnerMinimumPension2'
                          placeholder="Minimum Pension"
                          disabled />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerMinimumPension2' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerMaximumPension2"
                          className="form-label"
                        >
                          Maximum Pension
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerMaximumPension2"
                          name='PartnerMaximumPension2'
                          placeholder="Maximum Pension"
                          disabled />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerMaximumPension2' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label className="form-label">
                          Reversionary Pension Option
                        </label>

                        {/* switch button style */}
                        <div className="form-check form-switch m-0 p-0 ">
                          <div className="radiobutton">
                            <input type="radio" name="PartnerEditReversionaryPension" id="PartnerEditReversionaryPension1"
                              disabled={values.PartnerEditPension === "Yes" ? false : true}
                              onChange={handleChange} value="Yes"
                              checked={values.PartnerEditReversionaryPension == "Yes"} />
                            <label htmlFor="PartnerEditReversionaryPension1" className="label1">
                              <span>YES</span>
                            </label>
                            <input type="radio" name="PartnerEditReversionaryPension" id="PartnerEditReversionaryPension2"
                              disabled={values.PartnerEditPension === "No" ? true : false}
                              onChange={handleChange} value="No"
                              checked={values.PartnerEditReversionaryPension == "No"} />
                            <label htmlFor="PartnerEditReversionaryPension2" className="label2">
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                        {/* switch button style */}



                      </div>
                    </div>

                  </div>

                  {/* Seventh Row Partner */}

                  <div className="row">

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="PartnerNominatedPension2" className="form-label">
                          Nominated Pension Amount
                        </label>
                        <Field
                          id="PartnerNominatedPension2"
                          name='PartnerNominatedPension2'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.PartnerEditPension === "Yes" ? false : true}

                        >
                          <option value="">Select</option>
                          <option value="Minimum">Minimum</option>
                          <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerNominatedPension2" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerOtherAmount2"
                          className="form-label"
                        >
                          Other Amount
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerOtherAmount2"
                          name='PartnerOtherAmount2'
                          placeholder="Other Amount"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerOtherAmount2' />
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
                          disabled

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

export default PensionAccounts;
