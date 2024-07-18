import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./businessTextStructure.css"
import plus from "./images/plus.svg"
import notebook from "./images/notebook.svg"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SP_RegularSuperContribution = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let initialValues = {
    ClientEdit: "No",
    ClientLumpsumNCCYear: "",
    ClientContributionsFund: "",
    ClientRegularContributions: "",
    ClientYearCommence: "",
    ClientYearsInclude: "",
    ClientContributionsFund2: "",
    ClientGovernment: "",
    ClientEmployerContributions: "",
    ClientConcessionalContributionsFund: "",
    ClientPersonalSacrifice: "",
    ClientOtherAmount: "",
    ClientIndexation: "",
    ClientConcessionalContributionsFund2: "",
    ClientConcessionalYearCommence: "",
    ClientConcessionalYearsInclude: "",
    ClientContributionSplitting: "No",
    ClientAmount: "",
    ClientContributionYearCommence: "",
    ClientContributionYearsInclude: "",
    ClientSplittingContributionsFund: "",
    ClientSpouseContribution: "No",
    ClientSpouseContributionCommence: "",
    ClientSpouseYearsInclude: "",
    ClientWithdrawsSplitting: "No",
    ClientAmount2: "",

    PartnerEdit: "No",
    PartnerLumpsumNCCYear: "",
    PartnerContributionsFund: "",
    PartnerRegularContributions: "",
    PartnerYearCommence: "",
    PartnerYearsInclude: "",
    PartnerContributionsFund2: "",
    PartnerGovernment: "",
    PartnerEmployerContributions: "",
    PartnerConcessionalContributionsFund: "",
    PartnerPersonalSacrifice: "",
    PartnerOtherAmount: "",
    PartnerIndexation: "",
    PartnerConcessionalContributionsFund2: "",
    PartnerConcessionalYearCommence: "",
    PartnerConcessionalYearsInclude: "",
    PartnerContributionSplitting: "No",
    PartnerAmount: "",
    PartnerContributionYearCommence: "",
    PartnerContributionYearsInclude: "",
    PartnerSplittingContributionsFund: "",
    PartnerSpouseContribution: "No",
    PartnerSpouseContributionCommence: "",
    PartnerSpouseYearsInclude: "",
    PartnerWithdrawsSplitting: "No",
    PartnerAmount2: "",
  }
  let validationSchema = Yup.object({
    ClientLumpsumNCCYear: Yup.number().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",

        (value) => value > 0
      ),
    }),
    ClientContributionsFund: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ClientRegularContributions: Yup.number().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",

        (value) => value > 0
      ),
    }),
    ClientYearCommence: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
//     ClientYearsInclude: Yup.string().when('ClientEdit', {
//       is: (val) => val && val.length == 3,
//       then: Yup.string().required("Required").test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
//           const fromYear = parseInt(this.resolve(Yup.ref('ClientYearCommence')));
//           const toYear = parseInt(value);
//           return toYear >= fromYear;
//         }),
//     }),

    ClientYearsInclude: Yup.string().when("ClientEdit", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required").test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('ClientYearCommence')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise: Yup.string().test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
        const fromYear = this.parent.ClientYearCommence;
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),

    ClientContributionsFund2: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ClientGovernment: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ClientEmployerContributions: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ClientConcessionalContributionsFund: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ClientPersonalSacrifice: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ClientOtherAmount: Yup.number().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",

        (value) => value > 0
      ),
    }),
    ClientIndexation: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ClientConcessionalContributionsFund2: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ClientConcessionalYearCommence: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
//     ClientConcessionalYearsInclude: Yup.string().when('ClientEdit', {
//       is: (val) => val && val.length == 3,
//       then: Yup.string().required("Required").test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
//           const fromYear = parseInt(this.resolve(Yup.ref('ClientConcessionalYearCommence')));
//           const toYear = parseInt(value);
//           return toYear >= fromYear;
//         }),
//     }),

    ClientConcessionalYearsInclude: Yup.string().when("ClientEdit", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required").test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('ClientConcessionalYearCommence')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise: Yup.string().test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
        const fromYear = this.parent.ClientConcessionalYearCommence;
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),
    ClientAmount: Yup.number().when('ClientContributionSplitting', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",

        (value) => value > 0
      ),
    }),
    ClientContributionYearCommence: Yup.string().when('ClientContributionSplitting', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
//     ClientContributionYearsInclude: Yup.string().when('ClientContributionSplitting', {
//       is: (val) => val && val.length == 3,
//       then: Yup.string().required("Required").test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
//           const fromYear = parseInt(this.resolve(Yup.ref('ClientContributionYearCommence')));
//           const toYear = parseInt(value);
//           return toYear >= fromYear;
//         }),
//     }),

    ClientContributionYearsInclude: Yup.string().when("ClientContributionSplitting", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required").test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('ClientContributionYearCommence')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise: Yup.string().test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
        const fromYear = this.parent.ClientContributionYearCommence;
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),

    ClientSplittingContributionsFund: Yup.string().when('ClientContributionSplitting', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ClientSpouseContributionCommence: Yup.string().when('ClientSpouseContribution', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
//     ClientSpouseYearsInclude: Yup.string().when('ClientSpouseContribution', {
//       is: (val) => val && val.length == 3,
//       then: Yup.string().required("Required").test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
//           const fromYear = parseInt(this.resolve(Yup.ref('ClientSpouseContributionCommence')));
//           const toYear = parseInt(value);
//           return toYear >= fromYear;
//         }),
//     }),

    ClientSpouseYearsInclude: Yup.string().when("ClientSpouseContribution", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required").test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('ClientSpouseContributionCommence')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise: Yup.string().test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
        const fromYear = this.parent.ClientSpouseContributionCommence;
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),

    ClientAmount2: Yup.number().when('ClientWithdrawsSplitting', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",
  
        (value) => value > 0
      ),
    }),
    PartnerLumpsumNCCYear: Yup.number().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",

        (value) => value > 0
      ),
    }),
    PartnerContributionsFund: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    PartnerRegularContributions: Yup.number().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",

        (value) => value > 0
      ),
    }),
    PartnerYearCommence: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
//     PartnerYearsInclude: Yup.string().when('PartnerEdit', {
//       is: (val) => val && val.length == 3,
//       then: Yup.string().required("Required").test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
//           const fromYear = parseInt(this.resolve(Yup.ref('PartnerYearCommence')));
//           const toYear = parseInt(value);
//           return toYear >= fromYear;
//         }),
//     }),

    PartnerYearsInclude: Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required").test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('PartnerYearCommence')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise: Yup.string().test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
        const fromYear = this.parent.PartnerYearCommence;
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),





    PartnerContributionsFund2: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    PartnerGovernment: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    PartnerEmployerContributions: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    PartnerConcessionalContributionsFund: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    PartnerPersonalSacrifice: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    PartnerOtherAmount: Yup.number().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",

        (value) => value > 0
      ),
    }),
    PartnerIndexation: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    PartnerConcessionalContributionsFund2: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    PartnerConcessionalYearCommence: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
//     PartnerConcessionalYearsInclude: Yup.string().when('PartnerEdit', {
//       is: (val) => val && val.length == 3,
//       then: Yup.string().required("Required").test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
//           const fromYear = parseInt(this.resolve(Yup.ref('PartnerConcessionalYearCommence')));
//           const toYear = parseInt(value);
//           return toYear >= fromYear;
//         }),
//     }),

    PartnerConcessionalYearsInclude: Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required").test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('PartnerConcessionalYearCommence')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise: Yup.string().test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
        const fromYear = this.parent.PartnerConcessionalYearCommence;
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),


    PartnerAmount: Yup.number().when('PartnerContributionSplitting', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",

        (value) => value > 0
      ),
    }),
    PartnerContributionYearCommence: Yup.string().when('PartnerContributionSplitting', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
//     PartnerContributionYearsInclude: Yup.string().when('PartnerContributionSplitting', {
//       is: (val) => val && val.length == 3,
//       then: Yup.string().required("Required").test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
//           const fromYear = parseInt(this.resolve(Yup.ref('PartnerContributionYearCommence')));
//           const toYear = parseInt(value);
//           return toYear >= fromYear;
//         }),
//     }),

    PartnerContributionYearsInclude: Yup.string().when("PartnerContributionSplitting", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required").test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('PartnerContributionYearCommence')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise: Yup.string().test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
        const fromYear = this.parent.PartnerContributionYearCommence;
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),




    PartnerSplittingContributionsFund: Yup.string().when('PartnerContributionSplitting', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    PartnerSpouseContributionCommence: Yup.string().when('PartnerSpouseContribution', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
//     PartnerSpouseYearsInclude: Yup.string().when('PartnerSpouseContribution', {
//       is: (val) => val && val.length == 3,
//       then: Yup.string().required("Required").test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
//           const fromYear = parseInt(this.resolve(Yup.ref('PartnerSpouseContributionCommence')));
//           const toYear = parseInt(value);
//           return toYear >= fromYear;
//         }),
//     }),


    PartnerSpouseYearsInclude: Yup.string().when("PartnerSpouseContribution", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required").test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('PartnerSpouseContributionCommence')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise: Yup.string().test('is-greater', 'Years to Include must be greater than From Year to Commence', function(value) {
        const fromYear = this.parent.PartnerSpouseContributionCommence;
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),


    PartnerAmount2: Yup.number().when('PartnerWithdrawsSplitting', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",
  
        (value) => value > 0
      ),
    }),
    
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
      
    <label className="form-label"> Regular Super Contribution’s </label>
    <br />
      
      
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
            Regular Super Contribution’s
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
                        <h4 className="fw-bold" >
                          Client
                        </h4>

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

                  <h5 className="fw-bold mt-4">Non Concessional contributions</h5>

                  {/* First Row */}

                  <div className="row">

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientLumpsumNCCYear"
                          className="form-label"
                        >
                          Lumpsum NCC Year 1
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientLumpsumNCCYear"
                          name='ClientLumpsumNCCYear'
                          placeholder="Lumpsum NCC Year 1"
                          disabled={values.ClientEdit === "Yes" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientLumpsumNCCYear' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="ClientContributionsFund" className="form-label">
                          Contributions to Fund
                        </label>
                        <Field
                          id="ClientContributionsFund"
                          name='ClientContributionsFund'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.ClientEdit === "Yes" ? false : true}
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="SMSF">SMSF</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientContributionsFund" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientRegularContributions"
                          className="form-label"
                        >
                          Regular NC Contributions
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientRegularContributions"
                          name='ClientRegularContributions'
                          placeholder="Regular NC Contributions"
                          disabled={values.ClientEdit === "Yes" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientRegularContributions' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="ClientYearCommence" className="form-label">
                          Year to Commence
                        </label>
                        <Field
                          id="ClientYearCommence"
                          name='ClientYearCommence'
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
                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientYearCommence" />
                      </div>
                    </div>


                  </div>

                  {/* Second Row */}

                  <div className="row">


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
                        <label htmlFor="ClientContributionsFund2" className="form-label">
                          Contributions to Fund
                        </label>
                        <Field
                          id="ClientContributionsFund2"
                          name='ClientContributionsFund2'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.ClientEdit === "Yes" ? false : true}
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="SMSF">SMSF</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientContributionsFund2" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="ClientGovernment" className="form-label">
                          Government Co-contribution to
                        </label>
                        <Field
                          id="ClientGovernment"
                          name='ClientGovernment'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.ClientEdit === "Yes" ? false : true}
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="SMSF">SMSF</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientGovernment" />
                      </div>
                    </div>

                  </div>

                  <h5 className="fw-bold mt-3">Concessional contributions</h5>

                  {/* Third Row */}

                  <div className="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="ClientEmployerContributions" className="form-label">
                          Employer SG Contributions
                        </label>
                        <Field
                          id="ClientEmployerContributions"
                          name='ClientEmployerContributions'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.ClientEdit === "Yes" ? false : true}
                        >
                          <option value="">Select</option>
                          <option value="1">SGC</option>
                          <option value="Capped at Max.">Capped at Max.</option>
                          <option value="Other">Other</option>
                          <option value="Self-Employed">Self-Employed</option>

                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientEmployerContributions" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientPercentageAmount"
                          className="form-label"
                        >
                          Other Percentage Amount
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientPercentageAmount"
                          name='ClientPercentageAmount'
                          placeholder="Other Percentage Amount"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPercentageAmount' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="ClientConcessionalContributionsFund" className="form-label">
                          Contributions to Fund
                        </label>
                        <Field
                          id="ClientConcessionalContributionsFund"
                          name='ClientConcessionalContributionsFund'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.ClientEdit === "Yes" ? false : true}
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="SMSF">SMSF</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientConcessionalContributionsFund" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="ClientPersonalSacrifice" className="form-label">
                          Personal/Salary Sacrifice
                        </label>
                        <Field
                          id="ClientPersonalSacrifice"
                          name='ClientPersonalSacrifice'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.ClientEdit === "Yes" ? false : true}
                        >
                          <option value="">Select</option>
                          <option value="Up Until CC Cap">Up Until CC Cap</option>
                          <option value="Other">Other</option>
                          <option value="Match Net Income">Match Net Income</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPersonalSacrifice" />
                      </div>
                    </div>

                  </div>

                  {/* Fourth Row */}
                  <div className="row">

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
                        <label htmlFor="ClientIndexation" className="form-label">
                          Indexation of Other Amount
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

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="ClientConcessionalContributionsFund2" className="form-label">
                          Contributions to Fund
                        </label>
                        <Field
                          id="ClientConcessionalContributionsFund2"
                          name='ClientConcessionalContributionsFund2'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.ClientEdit === "Yes" ? false : true}
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="SMSF">SMSF</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientConcessionalContributionsFund2" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="ClientConcessionalYearCommence" className="form-label">
                          Year to Commence
                        </label>
                        <Field
                          id="ClientConcessionalYearCommence"
                          name='ClientConcessionalYearCommence'
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
                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientConcessionalYearCommence" />
                      </div>
                    </div>




                  </div>

                  {/* Fifth Row */}
                  <div className="row">

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="ClientConcessionalYearsInclude" className="form-label">
                          Years to Include
                        </label>
                        <Field
                          id="ClientConcessionalYearsInclude"
                          name='ClientConcessionalYearsInclude'
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
                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientConcessionalYearsInclude" />
                      </div>
                    </div>

                  </div>


                  {/* Attached Buttons  */}
                  <div className="col-md-3 my-4">
                    <div className="mb-3">
                      <label className="form-label">
                        <h5 className="fw-bold mb-0">Contribution Splitting </h5>
                      </label>

                      {/* switch button style */}
                      <div className="form-check form-switch m-0 p-0 ">
                        <div className="radiobutton">
                          <input type="radio" name="ClientContributionSplitting" id="ClientContributionSplittingopt1"
                            onChange={handleChange} value="Yes"
                            checked={values.ClientContributionSplitting === "Yes"}
                            disabled={values.ClientEdit === "Yes" ? false : true}

                          />
                          <label htmlFor="ClientContributionSplittingopt1" className="label1">
                            <span>YES</span>
                          </label>
                          <Field type="radio" name="ClientContributionSplitting" id="ClientContributionSplittingopt2"
                            // onChange={handleChange}
                            value="No"
                            checked={values.ClientContributionSplitting === "No"}
                            disabled={values.ClientEdit === "Yes" ? false : true}
                            onChange={() => {
                              setFieldValue('ClientContributionSplitting', "No");
                              setFieldValue('ClientCostBaseofCar', '');
                              setFieldValue('ClientemployerFBTStatus', '');

                            }}
                          />
                          <label htmlFor="ClientContributionSplittingopt2" className="label2">
                            <span>NO</span>
                          </label>
                        </div>
                      </div>
                      {/* switch button style */}


                    </div>
                  </div>

                  {/* Sixth Row */}

                  {values.ClientContributionSplitting == "Yes" &&
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientAmount"
                            className="form-label"
                          >
                            Amount
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientAmount"
                            name='ClientAmount'
                            placeholder="Amount"
                            disabled={values.ClientEdit === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientAmount' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientContributionYearCommence" className="form-label">
                            Year to Commence
                          </label>
                          <Field
                            id="ClientContributionYearCommence"
                            name='ClientContributionYearCommence'
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientContributionYearCommence" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientContributionYearsInclude" className="form-label">
                            Years to Include
                          </label>
                          <Field
                            id="ClientContributionYearsInclude"
                            name='ClientContributionYearsInclude'
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientContributionYearsInclude" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientSplittingContributionsFund" className="form-label">
                            Contributions to Fund
                          </label>
                          <Field
                            id="ClientSplittingContributionsFund"
                            name='ClientSplittingContributionsFund'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientEdit === "Yes" ? false : true}
                          >
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="SMSF">SMSF</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientSplittingContributionsFund" />
                        </div>
                      </div>

                    </div>
                  }

                  {/* Attached Buttons  */}
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">
                        <h5 className="fw-bold mb-0 mt-1"> Spouse Contribution </h5>
                      </label>

                      {/* switch button style */}
                      <div className="form-check form-switch m-0 p-0 ">
                        <div className="radiobutton">
                          <input type="radio" name="ClientSpouseContribution" id="ClientSpouseContributionopt1"
                            onChange={handleChange} value="Yes"
                            checked={values.ClientSpouseContribution === "Yes"}
                            disabled={values.ClientEdit === "Yes" ? false : true}

                          />
                          <label htmlFor="ClientSpouseContributionopt1" className="label1">
                            <span>YES</span>
                          </label>
                          <Field type="radio" name="ClientSpouseContribution" id="ClientSpouseContributionopt2"
                            // onChange={handleChange}
                            value="No"
                            checked={values.ClientSpouseContribution === "No"}
                            disabled={values.ClientEdit === "Yes" ? false : true}
                            onChange={() => {
                              setFieldValue('ClientSpouseContribution', "No");
                              setFieldValue('ClientCostBaseofCar', '');
                              setFieldValue('ClientemployerFBTStatus', '');

                            }}
                          />
                          <label htmlFor="ClientSpouseContributionopt2" className="label2">
                            <span>NO</span>
                          </label>
                        </div>
                      </div>
                      {/* switch button style */}


                    </div>
                  </div>

                  {/* Seventh Row */}

                  {values.ClientSpouseContribution == "Yes" &&
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientSpouseContributionCommence" className="form-label">
                            Year to Commence
                          </label>
                          <Field
                            id="ClientSpouseContributionCommence"
                            name='ClientSpouseContributionCommence'
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientSpouseContributionCommence" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientSpouseYearsInclude" className="form-label">
                            Years to Include
                          </label>
                          <Field
                            id="ClientSpouseYearsInclude"
                            name='ClientSpouseYearsInclude'
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientSpouseYearsInclude" />
                        </div>
                      </div>

                    </div>
                  }

                  {/* Attached Buttons  */}
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        <h5 className="fw-bold mb-0 mt-1">  Previous Lumpsum Withdraws Splitting </h5>
                      </label>

                      {/* switch button style */}
                      <div className="form-check form-switch m-0 p-0 ">
                        <div className="radiobutton">
                          <input type="radio" name="ClientWithdrawsSplitting" id="ClientWithdrawsSplittingopt1"
                            onChange={handleChange} value="Yes"
                            checked={values.ClientWithdrawsSplitting === "Yes"}
                            disabled={values.ClientEdit === "Yes" ? false : true}

                          />
                          <label htmlFor="ClientWithdrawsSplittingopt1" className="label1">
                            <span>YES</span>
                          </label>
                          <Field type="radio" name="ClientWithdrawsSplitting" id="ClientWithdrawsSplittingopt2"
                            // onChange={handleChange}
                            value="No"
                            checked={values.ClientWithdrawsSplitting === "No"}
                            disabled={values.ClientEdit === "Yes" ? false : true}
                            onChange={() => {
                              setFieldValue('ClientWithdrawsSplitting', "No");
                              setFieldValue('ClientCostBaseofCar', '');
                              setFieldValue('ClientemployerFBTStatus', '');

                            }}
                          />
                          <label htmlFor="ClientWithdrawsSplittingopt2" className="label2">
                            <span>NO</span>
                          </label>
                        </div>
                      </div>
                      {/* switch button style */}


                    </div>
                  </div>

                  {/* Eight Row */}

                  {values.ClientWithdrawsSplitting == "Yes" &&
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientAmount2"
                            className="form-label"
                          >
                            Amount
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientAmount2"
                            name='ClientAmount2'
                            placeholder="Amount"
                            disabled={values.ClientEdit === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientAmount2' />
                        </div>
                      </div>

                    </div>
                  }

                </div>

                {/* ClientForm */}

                <hr />
                {/* partnerForm */}
                <div>
                  <div classname="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <h5 className="fw-bold">
                          Partner
                        </h5>

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

                  <h5 className="fw-bold mt-4">Non Concessional contributions</h5>

                  {/* First Row */}

                  <div className="row">

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerLumpsumNCCYear"
                          className="form-label"
                        >
                          Lumpsum NCC Year 1
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerLumpsumNCCYear"
                          name='PartnerLumpsumNCCYear'
                          placeholder="Lumpsum NCC Year 1"
                          disabled={values.PartnerEdit === "Yes" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerLumpsumNCCYear' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="PartnerContributionsFund" className="form-label">
                          Contributions to Fund
                        </label>
                        <Field
                          id="PartnerContributionsFund"
                          name='PartnerContributionsFund'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.PartnerEdit === "Yes" ? false : true}
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="SMSF">SMSF</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerContributionsFund" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerRegularContributions"
                          className="form-label"
                        >
                          Regular NC Contributions
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerRegularContributions"
                          name='PartnerRegularContributions'
                          placeholder="Regular NC Contributions"
                          disabled={values.PartnerEdit === "Yes" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerRegularContributions' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="PartnerYearCommence" className="form-label">
                          Year to Commence
                        </label>
                        <Field
                          id="PartnerYearCommence"
                          name='PartnerYearCommence'
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
                        <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerYearCommence" />
                      </div>
                    </div>


                  </div>

                  {/* Second Row */}

                  <div className="row">


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
                        <label htmlFor="PartnerContributionsFund2" className="form-label">
                          Contributions to Fund
                        </label>
                        <Field
                          id="PartnerContributionsFund2"
                          name='PartnerContributionsFund2'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.PartnerEdit === "Yes" ? false : true}
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="SMSF">SMSF</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerContributionsFund2" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="PartnerGovernment" className="form-label">
                          Government Co-contribution to
                        </label>
                        <Field
                          id="PartnerGovernment"
                          name='PartnerGovernment'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.PartnerEdit === "Yes" ? false : true}
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="SMSF">SMSF</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerGovernment" />
                      </div>
                    </div>

                  </div>

                  <h5 className="fw-bold mt-3">Concessional contributions</h5>

                  {/* Third Row */}

                  <div className="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="PartnerEmployerContributions" className="form-label">
                          Employer SG Contributions
                        </label>
                        <Field
                          id="PartnerEmployerContributions"
                          name='PartnerEmployerContributions'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.PartnerEdit === "Yes" ? false : true}
                        >
                          <option value="">Select</option>
                          <option value="1">SGC</option>
                          <option value="Capped at Max.">Capped at Max.</option>
                          <option value="Other">Other</option>
                          <option value="Self-Employed">Self-Employed</option>

                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerEmployerContributions" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerPercentageAmount"
                          className="form-label"
                        >
                          Other Percentage Amount
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerPercentageAmount"
                          name='PartnerPercentageAmount'
                          placeholder="Other Percentage Amount"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPercentageAmount' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="PartnerConcessionalContributionsFund" className="form-label">
                          Contributions to Fund
                        </label>
                        <Field
                          id="PartnerConcessionalContributionsFund"
                          name='PartnerConcessionalContributionsFund'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.PartnerEdit === "Yes" ? false : true}
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="SMSF">SMSF</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerConcessionalContributionsFund" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="PartnerPersonalSacrifice" className="form-label">
                          Personal/Salary Sacrifice
                        </label>
                        <Field
                          id="PartnerPersonalSacrifice"
                          name='PartnerPersonalSacrifice'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.PartnerEdit === "Yes" ? false : true}
                        >
                          <option value="">Select</option>
                          <option value="Up Until CC Cap">Up Until CC Cap</option>
                          <option value="Other">Other</option>
                          <option value="Match Net Income">Match Net Income</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPersonalSacrifice" />
                      </div>
                    </div>

                  </div>

                  {/* Fourth Row */}
                  <div className="row">

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
                          disabled={values.PartnerEdit === "Yes" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerOtherAmount' />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="PartnerIndexation" className="form-label">
                          Indexation of Other Amount
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

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="PartnerConcessionalContributionsFund2" className="form-label">
                          Contributions to Fund
                        </label>
                        <Field
                          id="PartnerConcessionalContributionsFund2"
                          name='PartnerConcessionalContributionsFund2'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.PartnerEdit === "Yes" ? false : true}
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="SMSF">SMSF</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerConcessionalContributionsFund2" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="PartnerConcessionalYearCommence" className="form-label">
                          Year to Commence
                        </label>
                        <Field
                          id="PartnerConcessionalYearCommence"
                          name='PartnerConcessionalYearCommence'
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
                        <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerConcessionalYearCommence" />
                      </div>
                    </div>




                  </div>

                  {/* Fifth Row */}
                  <div className="row">

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="PartnerConcessionalYearsInclude" className="form-label">
                          Years to Include
                        </label>
                        <Field
                          id="PartnerConcessionalYearsInclude"
                          name='PartnerConcessionalYearsInclude'
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
                        <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerConcessionalYearsInclude" />
                      </div>
                    </div>

                  </div>


                  {/* Attached Buttons  */}
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">
                        <h5 className="fw-bold mb-0">Contribution Splitting </h5>
                      </label>

                      {/* switch button style */}
                      <div className="form-check form-switch m-0 p-0 ">
                        <div className="radiobutton">
                          <input type="radio" name="PartnerContributionSplitting" id="PartnerContributionSplittingopt1"
                            onChange={handleChange} value="Yes"
                            checked={values.PartnerContributionSplitting === "Yes"}
                            disabled={values.PartnerEdit === "Yes" ? false : true}

                          />
                          <label htmlFor="PartnerContributionSplittingopt1" className="label1">
                            <span>YES</span>
                          </label>
                          <Field type="radio" name="PartnerContributionSplitting" id="PartnerContributionSplittingopt2"
                            // onChange={handleChange}
                            value="No"
                            checked={values.PartnerContributionSplitting === "No"}
                            disabled={values.PartnerEdit === "Yes" ? false : true}
                            onChange={() => {
                              setFieldValue('PartnerContributionSplitting', "No");
                              setFieldValue('PartnerCostBaseofCar', '');
                              setFieldValue('PartneremployerFBTStatus', '');

                            }}
                          />
                          <label htmlFor="PartnerContributionSplittingopt2" className="label2">
                            <span>NO</span>
                          </label>
                        </div>
                      </div>
                      {/* switch button style */}


                    </div>
                  </div>

                  {/* Sixth Row */}

                  {values.PartnerContributionSplitting == "Yes" &&
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerAmount"
                            className="form-label"
                          >
                            Amount
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerAmount"
                            name='PartnerAmount'
                            placeholder="Amount"
                            disabled={values.PartnerEdit === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerAmount' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerContributionYearCommence" className="form-label">
                            Year to Commence
                          </label>
                          <Field
                            id="PartnerContributionYearCommence"
                            name='PartnerContributionYearCommence'
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerContributionYearCommence" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerContributionYearsInclude" className="form-label">
                            Years to Include
                          </label>
                          <Field
                            id="PartnerContributionYearsInclude"
                            name='PartnerContributionYearsInclude'
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerContributionYearsInclude" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerSplittingContributionsFund" className="form-label">
                            Contributions to Fund
                          </label>
                          <Field
                            id="PartnerSplittingContributionsFund"
                            name='PartnerSplittingContributionsFund'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerEdit === "Yes" ? false : true}
                          >
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="SMSF">SMSF</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerSplittingContributionsFund" />
                        </div>
                      </div>

                    </div>
                  }

                  {/* Attached Buttons  */}
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">
                        <h5 className="fw-bold mb-0 mt-1"> Spouse Contribution </h5>
                      </label>

                      {/* switch button style */}
                      <div className="form-check form-switch m-0 p-0 ">
                        <div className="radiobutton">
                          <input type="radio" name="PartnerSpouseContribution" id="PartnerSpouseContributionopt1"
                            onChange={handleChange} value="Yes"
                            checked={values.PartnerSpouseContribution === "Yes"}
                            disabled={values.PartnerEdit === "Yes" ? false : true}

                          />
                          <label htmlFor="PartnerSpouseContributionopt1" className="label1">
                            <span>YES</span>
                          </label>
                          <Field type="radio" name="PartnerSpouseContribution" id="PartnerSpouseContributionopt2"
                            // onChange={handleChange}
                            value="No"
                            checked={values.PartnerSpouseContribution === "No"}
                            disabled={values.PartnerEdit === "Yes" ? false : true}
                            onChange={() => {
                              setFieldValue('PartnerSpouseContribution', "No");
                              setFieldValue('PartnerCostBaseofCar', '');
                              setFieldValue('PartneremployerFBTStatus', '');

                            }}
                          />
                          <label htmlFor="PartnerSpouseContributionopt2" className="label2">
                            <span>NO</span>
                          </label>
                        </div>
                      </div>
                      {/* switch button style */}


                    </div>
                  </div>

                  {/* Seventh Row */}

                  {values.PartnerSpouseContribution == "Yes" &&
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerSpouseContributionCommence" className="form-label">
                            Year to Commence
                          </label>
                          <Field
                            id="PartnerSpouseContributionCommence"
                            name='PartnerSpouseContributionCommence'
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerSpouseContributionCommence" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerSpouseYearsInclude" className="form-label">
                            Years to Include
                          </label>
                          <Field
                            id="PartnerSpouseYearsInclude"
                            name='PartnerSpouseYearsInclude'
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerSpouseYearsInclude" />
                        </div>
                      </div>

                    </div>
                  }

                  {/* Attached Buttons  */}
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">  
                        <h5 className="fw-bold mb-0 mt-1">  Previous Lumpsum Withdraws Splitting </h5>
                      </label>

                      {/* switch button style */}
                      <div className="form-check form-switch m-0 p-0 ">
                        <div className="radiobutton">
                          <input type="radio" name="PartnerWithdrawsSplitting" id="PartnerWithdrawsSplittingopt1"
                            onChange={handleChange} value="Yes"
                            checked={values.PartnerWithdrawsSplitting === "Yes"}
                            disabled={values.PartnerEdit === "Yes" ? false : true}

                          />
                          <label htmlFor="PartnerWithdrawsSplittingopt1" className="label1">
                            <span>YES</span>
                          </label>
                          <Field type="radio" name="PartnerWithdrawsSplitting" id="PartnerWithdrawsSplittingopt2"
                            // onChange={handleChange}
                            value="No"
                            checked={values.PartnerWithdrawsSplitting === "No"}
                            disabled={values.PartnerEdit === "Yes" ? false : true}
                            onChange={() => {
                              setFieldValue('PartnerWithdrawsSplitting', "No");
                              setFieldValue('PartnerCostBaseofCar', '');
                              setFieldValue('PartneremployerFBTStatus', '');

                            }}
                          />
                          <label htmlFor="PartnerWithdrawsSplittingopt2" className="label2">
                            <span>NO</span>
                          </label>
                        </div>
                      </div>
                      {/* switch button style */}


                    </div>
                  </div>

                  {/* Eight Row */}

                  {values.PartnerWithdrawsSplitting == "Yes" &&
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerAmount2"
                            className="form-label"
                          >
                            Amount
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerAmount2"
                            name='PartnerAmount2'
                            placeholder="Amount"
                            disabled={values.PartnerEdit === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerAmount2' />
                        </div>
                      </div>

                    </div>
                  }

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

      {/* --------------------------------------------------------------- */}


    </>
  )
}

export default SP_RegularSuperContribution;

