import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { differenceInYears, getDate } from "date-fns";
import Modal from "react-bootstrap/Modal";

import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "yup-phone";

//Images 
import plus from "./images/plus.svg";
import male from "./images/male.svg";
import female from "./images/female.svg";

const PersonalDetails_cashFlow = (Props) => {

  let [PersonalDetailModal, setPersonalDetailModal] = useState(false);

  let initialValues = {
    // matched attributes in add client personal details
    ClientEdit: "No",
    clientPreferredName: "",
    clientDOB: "",
    clientAge: "",
    clientHealth: "Yes",
    clientPlannedRetirementAge: "",
    clientGender: false,
    
    // unmatched attributes in add client personal details
    clientRetirement: "",
    clientPreservation: "60",
    
    partnerEdit: "No",
    partnerPreferredName: "",
    partnerDOB: "",
    partnerAge: "",
    partnerHealth: "Yes",
    partnerPlannedRetirementAge: "",
    partnerGender: false,
    
    // unmatched attributes in add partner personal details
    partnerRetirement: "",
    partnerPreservation: "60",

  };

  let validationSchema = Yup.object().shape({
    clientPreferredName: Yup.string().when("ClientEdit", {
      is: (val) => val && val == "Yes",
      then: Yup.string().matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, 'Invalid Name').required("Required"),
      otherwise: Yup.string().matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, 'Invalid Name').notRequired(),
    }),

    // clientPreferredName: Yup.string().matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,'Invalid Name').required('Required'),
    // clientDOB: Yup.date().required('Date of Birth is required'),
    clientDOB: Yup.date().when("ClientEdit", {
      is: (val) => val && val == "Yes",
      then: Yup.date().required("Required"),
      otherwise: Yup.date().notRequired(),
    }),




    clientRetirement: Yup.string().when("ClientEdit", {
      is: (val) => val && val == "Yes",
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    // Add validation rules for other fields if needed
    partnerPreferredName: Yup.string().when("partnerEdit", {
      is: (val) => val && val == "Yes",
      then: Yup.string().matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, 'Invalid Name').required("Required"),
      otherwise: Yup.string().matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, 'Invalid Name').notRequired(),
    }),
    partnerDOB: Yup.date().when("partnerEdit", {
      is: (val) => val && val == "Yes",
      then: Yup.date().required("Required"),
      otherwise: Yup.date().notRequired(),
    }),
    PartnerRetirement: Yup.string().when("partnerEdit", {
      is: (val) => val && val == "Yes",
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
  });

  function onSubmit(values) {
    console.log(values);
  }



  return (
    <div>



      <div className="">
        <div className="">
          <label className="form-label">Personal Details</label>
          <br />
          <button type="button" className=" btn btn-outline-success "
            onClick={() => { setPersonalDetailModal(true); }}
          >
            <div className="iconContainer mx-1">
              <img className="img-fluid" src={plus} alt="" />
            </div>
            Enter Details
          </button>
        </div>
      </div>




      <Modal
        show={PersonalDetailModal}
        onHide={() => { setPersonalDetailModal(false) }}
        backdrop="static"
        className="modal-xl"
        keyboard={false}
      >
        <Modal.Header
          className="text-light modalBG "
          closeButton
        >
          <Modal.Title className="fontStyle">
            Personal Detail
            <div className="iconContainerLg">
            </div>
          </Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue, setValues, handleChange, handleBlur }) => (
            <Form>
              <Modal.Body>
                {/* Professional Advisor Detail Form */}
                <div className="row">
                  <div className="col-md-12">
                    <h3>Client</h3>
                    <div className="form-check form-switch m-0 p-0 ">
                      <div className="radiobutton">
                        <input type="radio" name="ClientEdit" id="ClientEdit1"
                          value="Yes" onChange={handleChange} checked={values.ClientEdit == "Yes"}
                        />
                        <label htmlFor="ClientEdit1" className="label1">
                          <span>YES</span>
                        </label>
                        <input type="radio" name="ClientEdit" id="ClientEdit2"
                          value="No" onChange={handleChange} checked={values.ClientEdit == "No"} />
                        <label htmlFor="ClientEdit2" className="label2">
                          <span>NO</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-3">
                    <label htmlFor="clientPreferredName" className="form-label">  Name  </label>
                    <Field type="text" className="form-control shadow inputDesign" id="clientPreferredName"
                      name="clientPreferredName" placeholder="Name" disabled={values.ClientEdit === "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="clientPreferredName" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="clientDOB" className="form-label">
                      Date of Birth client
                    </label>
                    <div>
                      <DatePicker
                        id="clientDOB"
                        className="form-control inputDesign shadow"
                        selected={values.clientDOB}
                        onChange={(date) => {
                          setFieldValue("clientDOB", date);
                          const age = differenceInYears(new Date(), date) || 0;
                          setFieldValue("clientAge", age);
                        }}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        onBlur={handleBlur}
                        name="clientDOB"
                        maxDate={new Date()}
                        showMonthDropdown
                        dropdownMode="select"
                        disabled={values.ClientEdit === "Yes" ? false : true}
                      />
                    </div>
                    <ErrorMessage
                      component="div"
                      className="text-danger fw-bold"
                      name="clientDOB"
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="clientAge" className="form-label">
                      Age
                    </label>
                    <Field
                      type="text"
                      className="form-control inputDesign shadow"
                      id="clientAge"
                      name="clientAge"
                      placeholder="Age"
                      readOnly
                      disabled={values.ClientEdit === "Yes" ? false : true}
                    />
                    <ErrorMessage
                      component="div"
                      className="text-danger fw-bold"
                      name="clientAge"
                    />
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Gender
                      </label>
                      <div className=" d-flex justify-content-start align-items-center w-100">

                        <Field type="checkbox" name="clientGender" className="d-none" />

                        <div
                          id="female1"
                          className="femaleSmoking "
                          onClick={() => { setFieldValue('clientGender', true) }}
                        >
                          <img
                            className="img-fluid imgPerson w-100"
                            htmlFor="female"
                            src={female}
                            alt=""
                          />
                        </div>

                        <div
                          id="male1"
                          className=" mx-2 maleNonSmoking"
                          onClick={() => setFieldValue('clientGender', false)}
                        >
                          <img
                            className=" img-fluid imgPerson w-100"
                            htmlFor="male"
                            src={male}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-3">
                    <label htmlFor="clientHealth" className="form-label"> Private Health Cover</label>
                    <div className="form-check form-switch m-0 p-0 ">
                      <div className="radiobutton">
                        <input type="radio" name="clientHealth" id="ClientHealth1"
                          value="Yes" onChange={handleChange} checked={values.clientHealth == "Yes"}
                          disabled={values.ClientEdit === "Yes" ? false : true}
                        />
                        <label htmlFor="ClientHealth1" className="label1">
                          <span>YES</span>
                        </label>
                        <input type="radio" name="clientHealth" id="ClientHealth2"
                          value="No" onChange={handleChange} checked={values.clientHealth == "No"}
                          disabled={values.ClientEdit === "Yes" ? false : true} />
                        <label htmlFor="ClientHealth2" className="label2">
                          <span>NO</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="clientRetirement" className="form-label"> Retirement Year</label>
                    <Field as="select" className="form-select shadow inputDesign" id="clientRetirement"
                      name="clientRetirement" placeholder="clientRetirement" disabled={values.ClientEdit === "Yes" ? false : true} >
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="clientRetirement" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="clientPlannedRetirementAge" className="form-label"> Planned Retirement Age  </label>
                    <Field type="text" className="form-control shadow inputDesign" id="clientPlannedRetirementAge"
                      name="clientPlannedRetirementAge" placeholder="Planned Retirement Age" readOnly
                      disabled={values.ClientEdit === "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="clientPlannedRetirementAge" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="clientPreservation" className="form-label"> Preservation Age  </label>
                    <Field type="text" className="form-control shadow inputDesign" id="clientPreservation"
                      name="clientPreservation" placeholder="Preservation Age" readOnly
                      disabled={values.ClientEdit === "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="clientPreservation" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-12">
                    <h3>Partner </h3>
                    <div className="form-check form-switch m-0 p-0 ">
                      <div className="radiobutton">
                        <input type="radio" name="partnerEdit" id="PartnerEdit1"
                          value="Yes" onChange={handleChange} checked={values.partnerEdit == "Yes"}
                        />
                        <label htmlFor="PartnerEdit1" className="label1">
                          <span>YES</span>
                        </label>
                        <input type="radio" name="partnerEdit" id="PartnerEdit2"
                          value="No" onChange={handleChange} checked={values.partnerEdit == "No"} />
                        <label htmlFor="PartnerEdit2" className="label2">
                          <span>NO</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-3">
                    <label htmlFor="partnerPreferredName" className="form-label">  Name  </label>
                    <Field type="text" className="form-control shadow inputDesign" id="partnerPreferredName"
                      name="partnerPreferredName" placeholder="Name" disabled={values.partnerEdit === "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="partnerPreferredName" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="partnerDOB" className="form-label">
                      Date of Birth Partner
                    </label>
                    <div>
                      <DatePicker
                        id="partnerDOB"
                        className="form-control inputDesign shadow"
                        selected={values.partnerDOB}
                        onChange={(date) => {
                          setFieldValue("partnerDOB", date);
                          const age = differenceInYears(new Date(), date) || 0;
                          setFieldValue("partnerAge", age);
                        }}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        onBlur={handleBlur}
                        name="partnerDOB"
                        maxDate={new Date()}
                        showMonthDropdown
                        dropdownMode="select"
                        disabled={values.partnerEdit === "Yes" ? false : true}
                      />
                    </div>
                    <ErrorMessage
                      component="div"
                      className="text-danger fw-bold"
                      name="partnerDOB"
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="partnerAge" className="form-label">
                      Age
                    </label>
                    <Field
                      type="text"
                      className="form-control inputDesign shadow"
                      id="partnerAge"
                      name="partnerAge"
                      placeholder="Age"
                      readOnly
                      disabled={values.partnerEdit === "Yes" ? false : true}
                    />
                    <ErrorMessage
                      component="div"
                      className="text-danger fw-bold"
                      name="partnerAge"
                    />
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Gender
                      </label>
                      <div className=" d-flex justify-content-start align-items-center w-100">

                        <Field type="checkbox" name="partnerGender" className="d-none" />

                        <div
                          id="female1"
                          className="femaleSmoking "
                          onClick={() => { setFieldValue('partnerGender', true) }}
                        >
                          <img
                            className="img-fluid imgPerson w-100"
                            htmlFor="female"
                            src={female}
                            alt=""
                          />
                        </div>

                        <div
                          id="male1"
                          className=" mx-2 maleNonSmoking"
                          onClick={() => setFieldValue('partnerGender', false)}
                        >
                          <img
                            className=" img-fluid imgPerson w-100"
                            htmlFor="male"
                            src={male}
                            alt=""
                          />
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3">
                    <label htmlFor="PartnerHealth" className="form-label"> Private Health Cover</label>
                    <div className="form-check form-switch m-0 p-0 ">
                      <div className="radiobutton">
                        <input type="radio" name="PartnerHealth" id="PartnerHealth1"
                          value="Yes" onChange={handleChange} checked={values.PartnerHealth == "Yes"}
                          disabled={values.partnerEdit === "Yes" ? false : true}
                        />
                        <label htmlFor="PartnerHealth1" className="label1">
                          <span>YES</span>
                        </label>
                        <input type="radio" name="PartnerHealth" id="PartnerHealth2"
                          value="No" onChange={handleChange} checked={values.PartnerHealth == "No"}
                          disabled={values.partnerEdit === "Yes" ? false : true} />
                        <label htmlFor="PartnerHealth2" className="label2">
                          <span>NO</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="PartnerRetirement" className="form-label"> Retirement Year</label>
                    <Field as="select" className="form-select shadow inputDesign" id="PartnerRetirement"
                      name="PartnerRetirement" placeholder="PartnerRetirement" disabled={values.partnerEdit === "Yes" ? false : true} >
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="PartnerRetirement" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="PartnerRetirementAge" className="form-label"> Planned Retirement Age  </label>
                    <Field type="text" className="form-control shadow inputDesign" id="PartnerRetirementAge"
                      name="PartnerRetirementAge" placeholder="Planned Retirement Age" readOnly
                      disabled={values.partnerEdit === "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="PartnerRetirementAge" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="PartnerPreservation" className="form-label"> Preservation Age  </label>
                    <Field type="text" className="form-control shadow inputDesign" id="PartnerPreservation"
                      name="PartnerPreservation" placeholder="Preservation Age" readOnly
                      disabled={values.partnerEdit === "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="PartnerPreservation" />
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
                    onClick={() => { setPersonalDetailModal(false) }}
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

  );
};

export default PersonalDetails_cashFlow;
