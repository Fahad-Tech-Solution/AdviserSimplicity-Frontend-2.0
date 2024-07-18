import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./businessTextStructure.css"
import plus from "./images/plus.svg";
import notebook from "./images/notebook.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InvestmentLoan = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let initialValues = {
    ClientEdit: "No",
    ClientYearLoan: "",
    ClientCurrentLoanBalance: "",
    ClientLoanType: "",
    ClientLoanTerm: "",
    ClientInterestPeriod: "",
    ClientInitialInterest: "",
    ClientDeductibleInterest: "",
    ClientMinimumRepayments: "", //read only
    ClientApplyMinimumRepayments: "",
    ClientAnnualRepayments: "",
    ClientRepayLoan: "",

    PartnerEdit: "No",
    PartnerYearLoan: "",
    PartnerCurrentLoanBalance: "",
    PartnerLoanType: "",
    PartnerLoanTerm: "",
    PartnerInterestPeriod: "",
    PartnerInitialInterest: "",
    PartnerDeductibleInterest: "",
    PartnerMinimumRepayments: "", //read only
    PartnerApplyMinimumRepayments: "",
    PartnerAnnualRepayments: "", //read only
    PartnerRepayLoan: "",

    JointEdit: "No",
    JointYearLoan: "",
    JointCurrentLoanBalance: "",
    JointLoanType: "",
    JointLoanTerm: "",
    JointInterestPeriod: "",
    JointInitialInterest: "",
    JointDeductibleInterest: "",
    JointMinimumRepayments: "", //read only
    JointApplyMinimumRepayments: "",
    JointAnnualRepayments: "", //read only
    JointRepayLoan: "",
  };

  let validationSchema = Yup.object({
    ClientYearLoan: Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ClientCurrentLoanBalance: Yup.string().when("ClientEdit", {
      is: (val) => val && val === "Yes",
      then: Yup.string()
        .matches(/^(1|[1-9][0-9]*)$/, "Must be a positive number")
        .required("Required"),
      otherwise: Yup.string()
        .matches(/^(1|[1-9][0-9]*)$/, "Must be a positive number")
        .notRequired(""),
    }),
    ClientLoanType: Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ClientLoanTerm: Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ClientInterestPeriod: Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ClientInitialInterest: Yup.string().when("ClientEdit", {
      is: (val) => val && val === "Yes",
      then: Yup.string()
        .matches(/^(1|[1-9][0-9]*)$/, "Must be a positive number")
        .required("Required"),
      otherwise: Yup.string()
        .matches(/^(1|[1-9][0-9]*)$/, "Must be a positive number")
        .notRequired(""),
    }),
    ClientDeductibleInterest: Yup.string().when("ClientEdit", {
      is: (val) => val && val === "Yes",
      then: Yup.string()
        .matches(/^(1|[1-9][0-9]*)$/, "Must be a positive number")
        .required("Required"),
      otherwise: Yup.string()
        .matches(/^(1|[1-9][0-9]*)$/, "Must be a positive number")
        .notRequired(""),
    }),
    ClientApplyMinimumRepayments: Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ClientAnnualRepayments: Yup.string().when("ClientEdit", {
      is: (val) => val && val === "Yes",
      then: Yup.string()
        .matches(/^(1|[1-9][0-9]*)$/, "Must be a positive number")
        .required("Required"),
      otherwise: Yup.string()
        .matches(/^(1|[1-9][0-9]*)$/, "Must be a positive number")
        .notRequired(""),
    }),
    ClientRepayLoan: Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),

    // partner validation
    PartnerYearLoan: Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    PartnerCurrentLoanBalance: Yup.string().when("PartnerEdit", {
      is: (val) => val && val === "Yes",
      then: Yup.string()
        .matches(/^(1|[1-9][0-9]*)$/, "Must be a positive number")
        .required("Required"),
      otherwise: Yup.string()
        .matches(/^(1|[1-9][0-9]*)$/, "Must be a positive number")
        .notRequired(""),
    }),
    PartnerLoanType: Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    PartnerLoanTerm: Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    PartnerInterestPeriod: Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    PartnerInitialInterest: Yup.string().when("PartnerEdit", {
      is: (val) => val && val === "Yes",
      then: Yup.string()
        .matches(/^(1|[1-9][0-9]*)$/, "Must be a positive number")
        .required("Required"),
      otherwise: Yup.string()
        .matches(/^(1|[1-9][0-9]*)$/, "Must be a positive number")
        .notRequired(""),
    }),
    PartnerDeductibleInterest: Yup.string().when("PartnerEdit", {
      is: (val) => val && val === "Yes",
      then: Yup.string()
        .matches(/^(1|[1-9][0-9]*)$/, "Must be a positive number")
        .required("Required"),
      otherwise: Yup.string()
        .matches(/^(1|[1-9][0-9]*)$/, "Must be a positive number")
        .notRequired(""),
    }),
    PartnerApplyMinimumRepayments: Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),

    PartnerRepayLoan: Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),

    // Joint validation
    JointYearLoan: Yup.string().when("JointEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    JointCurrentLoanBalance: Yup.string().when("JointEdit", {
      is: (val) => val && val === "Yes",
      then: Yup.string()
        .matches(/^(1|[1-9][0-9]*)$/, "Must be a positive number")
        .required("Required"),
      otherwise: Yup.string()
        .matches(/^(1|[1-9][0-9]*)$/, "Must be a positive number")
        .notRequired(""),
    }),
    JointLoanType: Yup.string().when("JointEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    JointLoanTerm: Yup.string().when("JointEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    JointInterestPeriod: Yup.string().when("JointEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    JointInitialInterest: Yup.string().when("JointEdit", {
      is: (val) => val && val === "Yes",
      then: Yup.string()
        .matches(/^(1|[1-9][0-9]*)$/, "Must be a positive number")
        .required("Required"),
      otherwise: Yup.string()
        .matches(/^(1|[1-9][0-9]*)$/, "Must be a positive number")
        .notRequired(""),
    }),
    JointDeductibleInterest: Yup.string().when("JointEdit", {
      is: (val) => val && val === "Yes",
      then: Yup.string()
        .matches(/^(1|[1-9][0-9]*)$/, "Must be a positive number")
        .required("Required"),
      otherwise: Yup.string()
        .matches(/^(1|[1-9][0-9]*)$/, "Must be a positive number")
        .notRequired(""),
    }),
    JointApplyMinimumRepayments: Yup.string().when("JointEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),

    JointRepayLoan: Yup.string().when("JointEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
  });

  let onSubmit = (values) => {
    console.log(values);
  };
  return (
    <>
      <label htmlFor="" className="form-label">
        Investment Loan
      </label>
      <div>
        <button
          type="button"
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
          <Modal.Header className="text-light modalBG " closeButton>
            <Modal.Title className="fontStyle">
              Investment Loan
              <div className="iconContainerLg">
                <img className="img-fluid" src={notebook} alt="" />
              </div>
            </Modal.Title>
          </Modal.Header>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ values, handleChange, setFieldValue, handleBlur }) => (
              <Form>
                <Modal.Body>
                  {/* ClientForm */}
                  <div>
                    <div classname="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">Client</label>

                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input
                                type="radio"
                                name="ClientEdit"
                                id="ClientEditopt1"
                                onChange={handleChange}
                                value="Yes"
                                checked={values.ClientEdit == "Yes"}
                              />
                              <label
                                htmlFor="ClientEditopt1"
                                className="label1"
                              >
                                <span>YES</span>
                              </label>
                              <input
                                type="radio"
                                name="ClientEdit"
                                id="ClientEditopt2"
                                onChange={handleChange}
                                value="No"
                                checked={values.ClientEdit == "No"}
                              />
                              <label
                                htmlFor="ClientEditopt2"
                                className="label2"
                              >
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
                            htmlFor="ClientYearLoan"
                            className="form-label"
                          >
                            Year of Loan
                          </label>
                          <Field
                            id="ClientYearLoan"
                            name="ClientYearLoan"
                            className="form-select shadow  inputDesign"
                            as="select"
                            disabled={
                              values.ClientEdit === "Yes" ? false : true
                            }
                          >
                            <option value="">Select</option>
                            <option value="Existing">Existing</option>
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
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="ClientYearLoan"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientCurrentLoanBalance"
                            className="form-label"
                          >
                            Current Loan Balance
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientCurrentLoanBalance"
                            name="ClientCurrentLoanBalance"
                            placeholder="Client Current Loan Balance"
                            disabled={
                              values.ClientEdit === "Yes" ? false : true
                            }
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="ClientCurrentLoanBalance"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientLoanType"
                            className="form-label"
                          >
                            Loan Type
                          </label>
                          <Field
                            id="ClientLoanType"
                            name="ClientLoanType"
                            className="form-select shadow  inputDesign"
                            as="select"
                            disabled={
                              values.ClientEdit === "Yes" ? false : true
                            }
                          >
                            <option value="">Select</option>
                            <option value="System">I/Only </option>
                            <option value="InputOveride">P&I</option>
                          </Field>
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="ClientLoanType"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientLoanTerm"
                            className="form-label"
                          >
                            Loan Term
                          </label>
                          <Field
                            id="ClientLoanTerm"
                            name="ClientLoanTerm"
                            className="form-select shadow  inputDesign"
                            as="select"
                            disabled={
                              values.ClientEdit === "Yes" ? false : true
                            }
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
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="ClientLoanTerm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Second Row Client*/}

                    <div className="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientInterestPeriod"
                            className="form-label"
                          >
                            Interest Only Period
                          </label>
                          <Field
                            id="ClientInterestPeriod"
                            name="ClientInterestPeriod"
                            className="form-select shadow  inputDesign"
                            as="select"
                            disabled={
                              values.ClientEdit === "Yes" ? false : true
                            }
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
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="ClientInterestPeriod"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientInitialInterest"
                            className="form-label"
                          >
                            Initial Interest Rate(p.a)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientInitialInterest"
                            name="ClientInitialInterest"
                            placeholder="Client Initial Interest Rate(p.a)"
                            disabled={
                              values.ClientEdit === "Yes" ? false : true
                            }
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="ClientInitialInterest"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientDeductibleInterest"
                            className="form-label"
                          >
                            Deductible Interest (%)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientDeductibleInterest"
                            name="ClientDeductibleInterest"
                            placeholder="Client Deductible Interest (%)"
                            disabled={
                              values.ClientEdit === "Yes" ? false : true
                            }
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="ClientDeductibleInterest"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientMinimumRepayments"
                            className="form-label"
                          >
                            Minimum Repayments(p.a)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientMinimumRepayments"
                            name="ClientMinimumRepayments"
                            placeholder="Minimum Repayments(p.a)"
                            disabled
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="ClientMinimumRepayments"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Third Row Client*/}
                    <div className="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientApplyMinimumRepayments"
                            className="form-label"
                          >
                            Apply Minimum Repayments
                          </label>
                          <Field
                            id="ClientApplyMinimumRepayments"
                            name="ClientApplyMinimumRepayments"
                            className="form-select shadow  inputDesign"
                            as="select"
                            disabled={
                              values.ClientEdit === "Yes" ? false : true
                            }
                          >
                            <option value="">select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </Field>
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="ClientApplyMinimumRepayments"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientAnnualRepayments"
                            className="form-label"
                          >
                            Actual Annual Repayments
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientAnnualRepayments"
                            name="ClientAnnualRepayments"
                            placeholder="Client Actual Annual Repayments"
                            disabled={
                              values.ClientEdit === "Yes" ? false : true
                            }
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="ClientAnnualRepayments"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientRepayLoan"
                            className="form-label"
                          >
                            Repay Loan In Year
                          </label>
                          <Field
                            id="ClientRepayLoan"
                            name="ClientRepayLoan"
                            className="form-select shadow  inputDesign"
                            as="select"
                            disabled={
                              values.ClientEdit === "Yes" ? false : true
                            }
                          >
                            <option value="">Select</option>
                            <option value="NO">NO</option>
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
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="ClientRepayLoan"
                          />
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
                          <label className="form-label">Partner</label>

                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input
                                type="radio"
                                name="PartnerEdit"
                                id="PartnerEditopt1"
                                onChange={handleChange}
                                value="Yes"
                                checked={values.PartnerEdit == "Yes"}
                              />
                              <label
                                htmlFor="PartnerEditopt1"
                                className="label1"
                              >
                                <span>YES</span>
                              </label>
                              <input
                                type="radio"
                                name="PartnerEdit"
                                id="PartnerEditopt2"
                                onChange={handleChange}
                                value="No"
                                checked={values.PartnerEdit == "No"}
                              />
                              <label
                                htmlFor="PartnerEditopt2"
                                className="label2"
                              >
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}
                        </div>
                      </div>
                    </div>

                    {/* First Row partner*/}
                    <div className="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerYearLoan"
                            className="form-label"
                          >
                            Year of Loan
                          </label>
                          <Field
                            id="PartnerYearLoan"
                            name="PartnerYearLoan"
                            className="form-select shadow  inputDesign"
                            as="select"
                            disabled={
                              values.PartnerEdit === "Yes" ? false : true
                            }
                          >
                            <option value="">Select</option>
                            <option value="Existing">Existing</option>
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
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="PartnerYearLoan"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerCurrentLoanBalance"
                            className="form-label"
                          >
                            Current Loan Balance
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerCurrentLoanBalance"
                            name="PartnerCurrentLoanBalance"
                            placeholder="Partner Current Loan Balance"
                            disabled={
                              values.PartnerEdit === "Yes" ? false : true
                            }
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="PartnerCurrentLoanBalance"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerLoanType"
                            className="form-label"
                          >
                            Loan Type
                          </label>
                          <Field
                            id="PartnerLoanType"
                            name="PartnerLoanType"
                            className="form-select shadow  inputDesign"
                            as="select"
                            disabled={
                              values.PartnerEdit === "Yes" ? false : true
                            }
                          >
                            <option value="">Select</option>
                            <option value="System">I/Only </option>
                            <option value="InputOveride">P&I</option>
                          </Field>
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="PartnerLoanType"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerLoanTerm"
                            className="form-label"
                          >
                            Loan Term
                          </label>
                          <Field
                            id="PartnerLoanTerm"
                            name="PartnerLoanTerm"
                            className="form-select shadow  inputDesign"
                            as="select"
                            disabled={
                              values.PartnerEdit === "Yes" ? false : true
                            }
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
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="PartnerLoanTerm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Second Row partner*/}
                    <div className="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerInterestPeriod"
                            className="form-label"
                          >
                            Interest Only Period
                          </label>
                          <Field
                            id="PartnerInterestPeriod"
                            name="PartnerInterestPeriod"
                            className="form-select shadow  inputDesign"
                            as="select"
                            disabled={
                              values.PartnerEdit === "Yes" ? false : true
                            }
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
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="PartnerInterestPeriod"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerInitialInterest"
                            className="form-label"
                          >
                            Initial Interest Rate(p.a)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerInitialInterest"
                            name="PartnerInitialInterest"
                            placeholder="Partner Initial Interest Rate(p.a)"
                            disabled={
                              values.PartnerEdit === "Yes" ? false : true
                            }
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="PartnerInitialInterest"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerDeductibleInterest"
                            className="form-label"
                          >
                            Deductible Interest (%)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerDeductibleInterest"
                            name="PartnerDeductibleInterest"
                            placeholder="Partner Deductible Interest (%)"
                            disabled={
                              values.PartnerEdit === "Yes" ? false : true
                            }
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="PartnerDeductibleInterest"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerMinimumRepayments"
                            className="form-label"
                          >
                            Minimum Repayments(p.a)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerMinimumRepayments"
                            name="PartnerMinimumRepayments"
                            placeholder="Partner Minimum Repayments(p.a)"
                            disabled
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="PartnerMinimumRepayments"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Third Row partner*/}
                    <div className="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerApplyMinimumRepayments"
                            className="form-label"
                          >
                            Apply Minimum Repayments
                          </label>
                          <Field
                            id="PartnerApplyMinimumRepayments"
                            name="PartnerApplyMinimumRepayments"
                            className="form-select shadow  inputDesign"
                            as="select"
                            disabled={
                              values.PartnerEdit === "Yes" ? false : true
                            }
                          >
                            <option value="">select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </Field>
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="PartnerApplyMinimumRepayments"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerAnnualRepayments"
                            className="form-label"
                          >
                            Actual Annual Repayments
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerAnnualRepayments"
                            name="PartnerAnnualRepayments"
                            placeholder="Partner Actual Annual Repayments"
                            disabled
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="PartnerAnnualRepayments"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerRepayLoan"
                            className="form-label"
                          >
                            Repay Loan In Year
                          </label>
                          <Field
                            id="PartnerRepayLoan"
                            name="PartnerRepayLoan"
                            className="form-select shadow  inputDesign"
                            as="select"
                            disabled={
                              values.PartnerEdit === "Yes" ? false : true
                            }
                          >
                            <option value="">Select</option>
                            <option value="NO">NO</option>
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
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="PartnerRepayLoan"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PartnerForm */}

                  <hr />
                  {/* JointForm */}
                  <div>
                    <div classname="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">Joint</label>

                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input
                                type="radio"
                                name="JointEdit"
                                id="JointEditopt1"
                                onChange={handleChange}
                                value="Yes"
                                checked={values.JointEdit == "Yes"}
                              />
                              <label htmlFor="JointEditopt1" className="label1">
                                <span>YES</span>
                              </label>
                              <input
                                type="radio"
                                name="JointEdit"
                                id="JointEditopt2"
                                onChange={handleChange}
                                value="No"
                                checked={values.JointEdit == "No"}
                              />
                              <label htmlFor="JointEditopt2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}
                        </div>
                      </div>
                    </div>

                    {/* First Row Joint*/}
                    <div className="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="JointYearLoan" className="form-label">
                            Year of Loan
                          </label>
                          <Field
                            id="JointYearLoan"
                            name="JointYearLoan"
                            className="form-select shadow  inputDesign"
                            as="select"
                            disabled={values.JointEdit === "Yes" ? false : true}
                          >
                            <option value="">Select</option>
                            <option value="Existing">Existing</option>
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
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="JointYearLoan"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="JointCurrentLoanBalance"
                            className="form-label"
                          >
                            Current Loan Balance
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="JointCurrentLoanBalance"
                            name="JointCurrentLoanBalance"
                            placeholder="Joint Current Loan Balance"
                            disabled={values.JointEdit === "Yes" ? false : true}
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="JointCurrentLoanBalance"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="JointLoanType" className="form-label">
                            Loan Type
                          </label>
                          <Field
                            id="JointLoanType"
                            name="JointLoanType"
                            className="form-select shadow  inputDesign"
                            as="select"
                            disabled={values.JointEdit === "Yes" ? false : true}
                          >
                            <option value="">Select</option>
                            <option value="System">I/Only </option>
                            <option value="InputOveride">P&I</option>
                          </Field>
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="JointLoanType"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="JointLoanTerm" className="form-label">
                            Loan Term
                          </label>
                          <Field
                            id="JointLoanTerm"
                            name="JointLoanTerm"
                            className="form-select shadow  inputDesign"
                            as="select"
                            disabled={values.JointEdit === "Yes" ? false : true}
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
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="JointLoanTerm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Second Row Joint*/}

                    <div className="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="JointInterestPeriod"
                            className="form-label"
                          >
                            Interest Only Period
                          </label>
                          <Field
                            id="JointInterestPeriod"
                            name="JointInterestPeriod"
                            className="form-select shadow  inputDesign"
                            as="select"
                            disabled={values.JointEdit === "Yes" ? false : true}
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
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="JointInterestPeriod"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="JointInitialInterest"
                            className="form-label"
                          >
                            Initial Interest Rate(p.a)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="JointInitialInterest"
                            name="JointInitialInterest"
                            placeholder="Joint Initial Interest Rate(p.a)"
                            disabled={values.JointEdit === "Yes" ? false : true}
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="JointInitialInterest"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="JointDeductibleInterest"
                            className="form-label"
                          >
                            Deductible Interest (%)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="JointDeductibleInterest"
                            name="JointDeductibleInterest"
                            placeholder="Joint Deductible Interest (%)"
                            disabled={values.JointEdit === "Yes" ? false : true}
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="JointDeductibleInterest"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="JointMinimumRepayments"
                            className="form-label"
                          >
                            Minimum Repayments(p.a)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="JointMinimumRepayments"
                            name="JointMinimumRepayments"
                            placeholder="Joint Minimum Repayments(p.a)"
                            disabled
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="JointMinimumRepayments"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Third Row Joint*/}
                    <div className="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="JointApplyMinimumRepayments"
                            className="form-label"
                          >
                            Apply Minimum Repayments
                          </label>
                          <Field
                            id="JointApplyMinimumRepayments"
                            name="JointApplyMinimumRepayments"
                            className="form-select shadow  inputDesign"
                            as="select"
                            disabled={values.JointEdit === "Yes" ? false : true}
                          >
                            <option value="">select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </Field>
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="JointApplyMinimumRepayments"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="JointAnnualRepayments"
                            className="form-label"
                          >
                            Actual Annual Repayments
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="JointAnnualRepayments"
                            name="JointAnnualRepayments"
                            placeholder="Joint Actual Annual Repayments"
                            disabled
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="JointAnnualRepayments"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="JointRepayLoan"
                            className="form-label"
                          >
                            Repay Loan In Year
                          </label>
                          <Field
                            id="JointRepayLoan"
                            name="JointRepayLoan"
                            className="form-select shadow  inputDesign"
                            as="select"
                            disabled={values.JointEdit === "Yes" ? false : true}
                          >
                            <option value="">Select</option>
                            <option value="NO">NO</option>
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
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="JointRepayLoan"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* JointForm */}
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
                      type="button"
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
  );
};

export default InvestmentLoan;
