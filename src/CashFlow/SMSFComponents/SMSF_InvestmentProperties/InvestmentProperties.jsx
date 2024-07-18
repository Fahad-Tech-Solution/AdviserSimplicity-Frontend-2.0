import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./businessTextStructure.css"
import plus from "./images/plus.svg"
import notebook from "./images/notebook.svg"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InvestmentProperties = () => {
  const [show7, setShow7] = useState(false);
  const handleClose7 = () => setShow7(false);
  const handleShow7 = () => setShow7(true);

  const [show8, setShow8] = useState(false);
  const handleClose8 = () => setShow8(false);
  const handleShow8 = () => setShow8(true);
  const [investmentList, setInvestmentList] = useState([]);




  let Investment_initialValues = {
    ValueOfProperty: "",
    State: "",
    YearPurchase: "",
    OtherCosts: "",
    ExpectedRental: "",
    WeeklyRentalIncome: "",
    Indexation: "",
    AnnualExpense: "",
    IndexationExpense: "",
    OngoingAgentFees: "",
    ExpectedGrowthRate: "",
    SellPropertyYear: "",
    EstimatedFutureCost: "",
    loanAttachedradio: "No",
    CurrentBalance: "",
    LoanType: "",
    LoanTerm: "",
    InterestPeriod: "",
    InitialInterestRate: "",
    DeductibleInterest: "",
    ApplyMinimumRepayments: "",
    ActualAnnualRepayments: "",
    RepayLoan: "",
  };
  let Investment_validationSchema = Yup.object({
    ValueOfProperty: Yup.number().required("Required").test(
      "is positive?",
      "Must  be a positive number",
      (value) => value >= 0
    ),
    State: Yup.string().required("Required"),
    YearPurchase: Yup.string().required("Required"),
    OtherCosts: Yup.number().required("Required").test(
      "is positive?",
      "Must  be a positive number",
      (value) => value >= 0
    ),
    ExpectedRental: Yup.number().required("Required").test(
      "is positive?",
      "Must  be a positive number",
      (value) => value >= 0
    ).max(100, "Must be equal to or less than 100"),
    WeeklyRentalIncome: Yup.number().required("Required").test(
      "is positive?",
      "Must  be a positive number",
      (value) => value >= 0
    ),
    Indexation: Yup.string().required("Required"),
    AnnualExpense: Yup.number().required("Required").test(
      "is positive?",
      "Must  be a positive number",
      (value) => value >= 0
    ),
    IndexationExpense: Yup.string().required("Required"),
    OngoingAgentFees: Yup.string().required("Required"),
    ExpectedGrowthRate: Yup.number().required("Required").test(
      "is positive?",
      "Must  be a positive number",
      (value) => value >= 0
    ).max(100, "Must be equal to or less than 100"),
    SellPropertyYear: Yup.string().required("Required"),
    EstimatedFutureCost: Yup.string().required("Required"),
    CurrentBalance: Yup.number().when('loanAttachedradio', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ),
    }),
    LoanType: Yup.string().when('loanAttachedradio', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    LoanTerm: Yup.string().when('loanAttachedradio', {
      is: (val) => val && val.length == 3,
        then: Yup.string().required("Required")
    }),
    InterestPeriod: Yup.string().when('loanAttachedradio', {
      is: (val) => val && val.length == 3,
        then: Yup.string().required("Required")
    }),
    InitialInterestRate: Yup.number().when('loanAttachedradio', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ).min(0, 'Too Short!')
        .max(100, 'Must be less than or equal to 100'),
    }),
    DeductibleInterest: Yup.number().when('loanAttachedradio', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value > 0
        ).min(0, 'Too Short!')
        .max(100, 'Must be less than or equal to 100'),
    }),
    ApplyMinimumRepayments: Yup.string().when('loanAttachedradio', {
      is: (val) => val && val.length == 3,
        then: Yup.string().required("Required")
    }),
    ActualAnnualRepayments:Yup.number().when("ApplyMinimumRepayments",{
      is: (val) => val && val.length == 2,
      then: Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",

          (value) => value >= 0
        ).min(0, 'Too Short!')
        .max(100, 'Must be less than or equal to 100'),
    }),
    RepayLoan: Yup.string().when('loanAttachedradio', {
      is: (val) => val && val.length == 3,
        then: Yup.string().required("Required")
    }),
      
  });

  let Investment_onSubmit = (values) => {

    setInvestmentList([investmentList])
  };

  let Investment_initialValues_Modal = {
    TotalPropertyExpenses2: "", //readonly
    BodyCorporateFees2: "",
    CouncilRates2: "",
    GardeningAndLawnmowing2: "",
    Insurance2: "",
    LandTax2: "",
    RepairsAndMaintenance2: "",
    WaterCharges2: "",
    Other2: "",
    TelephoneAndInternet2: "",
    ProfessionalFees2: "",
    AllOther2: "",
  };
  let Investment_validationSchema_Modal = Yup.object({
    BodyCorporateFees2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    CouncilRates2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    GardeningAndLawnmowing2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    Insurance2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    LandTax2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    RepairsAndMaintenance2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    WaterCharges2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    Other2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    TelephoneAndInternet2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    ProfessionalFees2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),

    AllOther2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
  });
  let Investment_onSubmit_Modal = (values) => {
    let myData = {
      Email: localStorage.getItem("ClientEmail"),

      TotalPropertyExpenses: 5000, //readonly
      BodyCorporateFees: values.BodyCorporateFees2,
      CouncilRates: values.CouncilRates2,
      GardeningAndLawnMowing: values.GardeningAndLawnmowing2,
      Insurance: values.Insurance2,
      LandTax: values.LandTax2,
      RepairsAndMaintenance: values.RepairsAndMaintenance2,
      WaterCharges: values.WaterCharges2,
      Other: values.Other2,
      TelephoneAndInternet: values.TelephoneAndInternet2,
      ProfessionalFees: values.ProfessionalFees2,
      AllOther: values.AllOther,
    };
    console.log(myData);
    axios
      .post(
        "http://localhost:7000/Client-InvestmentTrust-InvestmentProperties-Modal/Add-Client-InvestmentPropertiesModal",
        myData
      )
      .then((res) => {
        console.log("Data Added Successfully!");
      });
    handleClose8();

    function onSubmit(values, { resetForm }) {
      console.log(values);
      let data = {



      };


      resetForm();
    }

  };
  return (
    <>


      <div>
        
      <label className="form-label">  Investment Properties </label>
      <br />
        
        
        <button
          className=" btn btn-outline-success"
          type="button"
          onClick={handleShow7}
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

              <Modal

                show={show7}
                onHide={handleClose7}

                backdrop="static"
                className="modal-xl"
                keyboard={false}
              >
                <Modal.Header className="text-light modalBG " closeButton>
                  <Modal.Title className="fontStyle">
                    Investment Properties
                    <div className="iconContainerLg">
                      <img className="img-fluid" src={notebook} alt="" />
                    </div>
                  </Modal.Title>
                </Modal.Header>
                <Formik
                  initialValues={Investment_initialValues}
                  validationSchema={Investment_validationSchema}
                  onSubmit={Investment_onSubmit}
                >
                  {({
                    values,
                    setFieldValue,
                    setValues,
                    handleChange,
                    formik,
                  }) => (
                    <Form>
                      <Modal.Body>

                        <div>
                          <h3 className="fw-bold">Property Purchase Details</h3>

                          {/* Outer Modal First Row */}

                          <div className="row">

                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="ValueOfProperty"
                                  className="form-label"
                                >
                                  Value of Property
                                </label>
                                <Field
                                  type="number"
                                  className="form-control shadow inputDesign"
                                  id="ValueOfProperty"
                                  name="ValueOfProperty"
                                  placeholder="Value of Property"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="ValueOfProperty"
                                />
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="State"
                                  className="form-label"
                                >
                                  State
                                </label>
                                <Field
                                  as="select"
                                  id="State"
                                  className="form-select shadow  inputDesign"
                                  name="State"
                                >
                                  <option value="">Select</option>
                                  <option value="ACT">ACT</option>
                                  <option value="NSW">NSW</option>
                                  <option value="NT">NT</option>
                                  <option value="QLD">QLD</option>
                                  <option value="SA">SA</option>
                                  <option value="TAS">TAS</option>
                                  <option value="VIC">VIC</option>
                                  <option value="WA">WA</option>

                                </Field>
                                <ErrorMessage
                                  className="text-danger fw-bold"
                                  component="div"
                                  name="State"
                                />
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="mb-3">
                                <label htmlFor="YearPurchase" className="form-label">
                                  Year of Purchase
                                </label>
                                <Field
                                  id="YearPurchase"
                                  name='YearPurchase'
                                  className="form-select shadow  inputDesign"
                                  as='select'
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
                                <ErrorMessage component='div' className='text-danger fw-bold' name="YearPurchase" />
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="StampDuty"
                                  className="form-label"
                                >
                                  Stamp Duty
                                </label>
                                <Field
                                  type="number"
                                  className="form-control shadow inputDesign"
                                  id="StampDuty"
                                  name="StampDuty"
                                  placeholder="Stamp Duty"
                                  disabled
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="StampDuty"
                                />
                              </div>
                            </div>

                          </div>

                          {/* Outer Modal Second Row */}

                          <div className="row">

                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="OtherCosts"
                                  className="form-label"
                                >
                                  Other Costs
                                </label>
                                <Field
                                  type="number"
                                  className="form-control shadow inputDesign"
                                  id="OtherCosts"
                                  name="OtherCosts"
                                  placeholder="Other Costs"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="OtherCosts"
                                />
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="TotalCostBase"
                                  className="form-label"
                                >
                                  Total Cost Base
                                </label>
                                <Field
                                  type="number"
                                  className="form-control shadow inputDesign"
                                  id="TotalCostBase"
                                  name="TotalCostBase"
                                  placeholder="Total Cost Base"
                                  disabled
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="TotalCostBase"
                                />
                              </div>
                            </div>
                          </div>

                        </div>

                        <div>
                          <h3 className="fw-bold">Investment Property Inputs</h3>

                          {/* Outer Modal Third Row */}

                          <div className="row">

                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="ExpectedRental"
                                  className="form-label"
                                >
                                  Expected Rental Yield (p.a.)
                                </label>
                                <Field
                                  type="number"
                                  className="form-control shadow inputDesign"
                                  id="ExpectedRental"
                                  name="ExpectedRental"
                                  placeholder="Expected Rental Yield (p.a.)"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="ExpectedRental"
                                />
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="WeeklyRentalIncome"
                                  className="form-label"
                                >
                                  Weekly Rental Income
                                </label>
                                <Field
                                  type="number"
                                  className="form-control shadow inputDesign"
                                  id="WeeklyRentalIncome"
                                  name="WeeklyRentalIncome"
                                  placeholder="Weekly Rental Income"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="WeeklyRentalIncome"
                                />
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="mb-3">
                                <label htmlFor="Indexation" className="form-label">
                                  Indexation of Rental Income
                                </label>
                                <Field
                                  id="Indexation"
                                  name='Indexation'
                                  className="form-select shadow  inputDesign"
                                  as='select'
                                >
                                  <option value="">Select</option>
                                  <option value="0.00%">0.00%</option>
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
                                <ErrorMessage component='div' className='text-danger fw-bold' name="Indexation" />
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="AnnualExpense"
                                  className="form-label"
                                >
                                  Annual Expense
                                </label>
                                <Field
                                  type="number"
                                  className="form-control shadow inputDesign"
                                  id="AnnualExpense"
                                  name="AnnualExpense"
                                  placeholder="Annual Expense"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="AnnualExpense"
                                />
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Outer Modal Fourth Row */}
                        <div className="row">


                          {/* Expense Schedule Button and inner Modal in it*/}
                          <div className="col-md-3">
                            <label className="form-label">
                              Expense Schedule
                            </label>
                            <br />

                            <button
                            type="button"
                              className="btn btn-outline-success"
                              onClick={handleShow8}
                            >
                              <div className="iconContainer mx-1">
                                <img
                                  className="img-fluid"
                                  src={plus}
                                  alt=""
                                />
                              </div>
                              Enter Details
                            </button>

                            {/* inner modal Start */}

                            <Modal
                              show={show8}
                              onHide={handleClose8}
                              backdrop="static"
                              className="modal-lg"
                              keyboard={false}
                            >
                              <Modal.Header className="text-light modalBG " closeButton>
                                <Modal.Title className="fontStyle">
                                  Investments Properties Details
                                  <div className="iconContainerLg">
                                    <img className="img-fluid" src={notebook} alt="" />
                                  </div>
                                </Modal.Title>
                              </Modal.Header>
                              <Formik
                                initialValues={Investment_initialValues_Modal}
                                validationSchema={Investment_validationSchema_Modal}
                                onSubmit={Investment_onSubmit_Modal}
                              >
                                {({
                                  values,
                                  setFieldValue,
                                  setValues,
                                  handleChange,
                                  formik,
                                }) => (
                                  <Form>
                                    <Modal.Body>
                                      {/* Deposit accounts */}


                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="mb-3">
                                            <label htmlFor="" className="form-label">
                                              Total Property Expenses
                                            </label>
                                            <Field
                                              type="number"
                                              className="form-control shadow inputDesign"
                                              id="TotalPropertyExpenses2"
                                              name="TotalPropertyExpenses2"
                                              placeholder="Total Property Expenses"
                                              readOnly={true}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="mb-3">
                                            <label
                                              htmlFor="BodyCorporateFees2"
                                              className="form-label"
                                            >
                                              Body Corporate Fees
                                            </label>
                                            <Field
                                              type="number"
                                              className="form-control shadow inputDesign"
                                              id="BodyCorporateFees2"
                                              name="BodyCorporateFees2"
                                              placeholder="Body Corporate Fees"
                                            />
                                            <ErrorMessage
                                              component="div"
                                              className="text-danger fw-bold"
                                              name="BodyCorporateFees2"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="mb-3">
                                            <label
                                              htmlFor="CouncilRates2"
                                              className="form-label"
                                            >
                                              Council Rates
                                            </label>
                                            <Field
                                              type="number"
                                              className="form-control shadow inputDesign"
                                              id="CouncilRates2"
                                              name="CouncilRates2"
                                              placeholder="Council Rates"
                                            />
                                            <ErrorMessage
                                              component="div"
                                              className="text-danger fw-bold"
                                              name="CouncilRates2"
                                            />
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="mb-3">
                                            <label
                                              htmlFor="GardeningAndLawnmowing2"
                                              className="form-label"
                                            >
                                              Gardening and Lawn mowing
                                            </label>
                                            <Field
                                              type="number"
                                              className="form-control shadow inputDesign"
                                              id="GardeningAndLawnmowing2"
                                              name="GardeningAndLawnmowing2"
                                              placeholder="Gardening and Lawn mowing"
                                            />
                                            <ErrorMessage
                                              component="div"
                                              className="text-danger fw-bold"
                                              name="GardeningAndLawnmowing2"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="mb-3">
                                            <label
                                              htmlFor="Insurance2"
                                              className="form-label"
                                            >
                                              Insurance
                                            </label>
                                            <Field
                                              type="number"
                                              className="form-control shadow inputDesign"
                                              id="Insurance2"
                                              name="Insurance2"
                                              placeholder="Insurance"
                                            />
                                            <ErrorMessage
                                              component="div"
                                              className="text-danger fw-bold"
                                              name="Insurance2"
                                            />
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="mb-3">
                                            <label
                                              htmlFor="LandTax2"
                                              className="form-label"
                                            >
                                              Land Tax
                                            </label>
                                            <Field
                                              type="number"
                                              className="form-control shadow inputDesign"
                                              id="LandTax2"
                                              name="LandTax2"
                                              placeholder="Land Tax"
                                            />
                                            <ErrorMessage
                                              component="div"
                                              className="text-danger fw-bold"
                                              name="LandTax2"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="mb-3">
                                            <label
                                              htmlFor="RepairsAndMaintenance2"
                                              className="form-label"
                                            >
                                              Repairs and Maintenance
                                            </label>
                                            <Field
                                              type="number"
                                              className="form-control shadow inputDesign"
                                              id="RepairsAndMaintenance2"
                                              name="RepairsAndMaintenance2"
                                              placeholder="Repairs and Maintenance"
                                            />
                                            <ErrorMessage
                                              component="div"
                                              className="text-danger fw-bold"
                                              name="RepairsAndMaintenance2"
                                            />
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="mb-3">
                                            <label
                                              htmlFor="WaterCharges2"
                                              className="form-label"
                                            >
                                              Water Charges
                                            </label>
                                            <Field
                                              type="number"
                                              className="form-control shadow inputDesign"
                                              id="WaterCharges2"
                                              name="WaterCharges2"
                                              placeholder="Water Charges"
                                            />
                                            <ErrorMessage
                                              component="div"
                                              className="text-danger fw-bold"
                                              name="WaterCharges2"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="mb-3">
                                            <label
                                              htmlFor="Other2"
                                              className="form-label"
                                            >
                                              Other
                                            </label>
                                            <Field
                                              type="number"
                                              className="form-control shadow inputDesign"
                                              id="Other2"
                                              name="Other2"
                                              placeholder="Other"
                                            />
                                            <ErrorMessage
                                              component="div"
                                              className="text-danger fw-bold"
                                              name="Other2"
                                            />
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="mb-3">
                                            <label
                                              htmlFor="TelephoneAndInternet2"
                                              className="form-label"
                                            >
                                              Telephone and Internet
                                            </label>
                                            <Field
                                              type="number"
                                              className="form-control shadow inputDesign"
                                              id="TelephoneAndInternet2"
                                              name="TelephoneAndInternet2"
                                              placeholder="Telephone and Internet"
                                            />
                                            <ErrorMessage
                                              component="div"
                                              className="text-danger fw-bold"
                                              name="TelephoneAndInternet2"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="mb-3">
                                            <label
                                              htmlFor="Other2"
                                              className="form-label"
                                            >
                                              Professional Fees (Accounting or Other)
                                            </label>
                                            <Field
                                              type="number"
                                              className="form-control shadow inputDesign"
                                              id="ProfessionalFees2"
                                              name="ProfessionalFees2"
                                              placeholder="Professional Fees (Accounting or Other)"
                                            />
                                            <ErrorMessage
                                              component="div"
                                              className="text-danger fw-bold"
                                              name="ProfessionalFees2"
                                            />
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="mb-3">
                                            <label
                                              htmlFor="AllOther2"
                                              className="form-label"
                                            >
                                              All Other
                                            </label>
                                            <Field
                                              type="number"
                                              className="form-control shadow inputDesign"
                                              id="AllOther2"
                                              name="AllOther2"
                                              placeholder="All Other"
                                            />
                                            <ErrorMessage
                                              component="div"
                                              className="text-danger fw-bold"
                                              name="AllOther2"
                                            />
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
                                          onClick={handleClose8}
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

                          {/* -------------Deposit modal---------------------------- */}

                          {/* Expense Schedule Button + inner modal End */}

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="IndexationExpense" className="form-label">
                                Indexation of Expense
                              </label>
                              <Field
                                id="IndexationExpense"
                                name='IndexationExpense'
                                className="form-select shadow inputDesign"
                                as='select'
                              >
                                <option value="">Select</option>
                                <option value="0.00%">0.00%</option>
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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="IndexationExpense" />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="OngoingAgentFees" className="form-label">
                                Ongoing Agent Fees
                              </label>
                              <Field
                                id="OngoingAgentFees"
                                name='OngoingAgentFees'
                                className="form-select shadow inputDesign"
                                as='select'
                              >
                                <option value="">Select</option>
                                <option value="0.00%">0.00%</option>
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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="OngoingAgentFees" />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="ExpectedGrowthRate"
                                className="form-label"
                              >
                                Expected Growth Rate
                              </label>
                              <Field
                                type="number"
                                className="form-control shadow inputDesign"
                                id="ExpectedGrowthRate"
                                name="ExpectedGrowthRate"
                                placeholder="Expected Growth Rate"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="ExpectedGrowthRate"
                              />
                            </div>
                          </div>

                        </div>

                        {/* Outer Modal Fifth Row */}
                        <div className="row">
                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="SellPropertyYear" className="form-label">
                                Sell Property in Year
                              </label>
                              <Field
                                id="SellPropertyYear"
                                name='SellPropertyYear'
                                className="form-select shadow  inputDesign"
                                as='select'
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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="SellPropertyYear" />
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="mb-3">
                              <label htmlFor="EstimatedFutureCost" className="form-label">
                                Estimated Future Selling Cost (%)
                              </label>
                              <Field
                                id="EstimatedFutureCost"
                                name='EstimatedFutureCost'
                                className="form-select shadow inputDesign"
                                as='select'
                              >
                                <option value="">Select</option>
                                <option value="0.00%">0.00%</option>
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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="EstimatedFutureCost" />
                            </div>
                          </div>

                        </div>

                        {/* Loan Attached Button Start */}

                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label">
                              Does this property have a loan
                              attached to it?
                            </label>

                            <div className="form-check form-switch m-0 p-0 ">
                              <div className="radiobutton">
                                <input
                                  type="radio"
                                  name="loanAttachedradio"
                                  className="form-check-input"
                                  id="loanAttachedopt1"
                                  value="Yes"
                                  onChange={handleChange}
                                  checked={
                                    values.loanAttachedradio ===
                                    "Yes"
                                  }
                                />
                                <label
                                  htmlFor="loanAttachedopt1"
                                  className="label1"
                                >
                                  <span>YES</span>
                                </label>
                                <input
                                  type="radio"
                                  name="loanAttachedradio"
                                  id="loanAttachedopt2"
                                  className="form-check-input"
                                  value="No"
                                  onChange={handleChange}
                                  checked={
                                    values.loanAttachedradio ===
                                    "No"
                                  }
                                />
                                <label
                                  htmlFor="loanAttachedopt2"
                                  className="label2"
                                >
                                  <span>NO</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        {values.loanAttachedradio === "Yes" && (
                          <div>

                            {/* Loan Attached Button Row 1 */}
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="CurrentBalance"
                                    className="form-label"
                                  >
                                    Current Loan Balance
                                  </label>
                                  <Field
                                    type="number"
                                    className="form-control shadow inputDesign"
                                    id="CurrentBalance"
                                    name="CurrentBalance"
                                    placeholder="Current Loan Balance"
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="CurrentBalance"
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="LoanType"
                                    className="form-label"
                                  >
                                    Loan Type
                                  </label>
                                  <Field
                                    as="select"
                                    id="LoanType"
                                    className="form-select shadow  inputDesign"
                                    name="LoanType"
                                  >
                                    <option value="">Select</option>
                                    <option value="I/Only">
                                      I/Only
                                    </option>
                                    <option value="P&I">
                                      P&I
                                    </option>
                                  </Field>
                                  <ErrorMessage
                                    className="text-danger fw-bold"
                                    component="div"
                                    name="LoanType"
                                  />
                                </div>
                              </div>

                            </div>

                            {/* Loan Attached Button Row 2 */}

                            <div className="row">

                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label htmlFor="LoanTerm" className="form-label">
                                    Loan Term
                                  </label>
                                  <Field
                                    id="LoanTerm"
                                    name='LoanTerm'
                                    className="form-select shadow  inputDesign"
                                    as='select'
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
                                  <ErrorMessage component='div' className='text-danger fw-bold' name="LoanTerm" />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label htmlFor="InterestPeriod" className="form-label">
                                    Interest Only Period
                                  </label>
                                  <Field
                                    id="InterestPeriod"
                                    name='InterestPeriod'
                                    className="form-select shadow  inputDesign"
                                    as='select'
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
                                  <ErrorMessage component='div' className='text-danger fw-bold' name="InterestPeriod" />
                                </div>
                              </div>

                            </div>

                            {/* Loan Attached Button Row 3 */}

                            <div className="row">

                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="InitialInterestRate"
                                    className="form-label"
                                  >
                                    Initial Interest Rate (p.a.)
                                  </label>
                                  <Field
                                    type="number"
                                    className="form-control shadow inputDesign"
                                    id="InitialInterestRate"
                                    name="InitialInterestRate"
                                    placeholder="Initial Interest Rate (p.a.)"
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="InitialInterestRate"
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="DeductibleInterest"
                                    className="form-label"
                                  >
                                    Deductible Interest %
                                  </label>
                                  <Field
                                    type="number"
                                    className="form-control shadow inputDesign"
                                    id="DeductibleInterest"
                                    name="DeductibleInterest"
                                    placeholder="Deductible Interest %"
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="DeductibleInterest"
                                  />
                                </div>
                              </div>

                            </div>

                            {/* Loan Attached Button Row 4 */}

                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="MinimumRepayments"
                                    className="form-label"
                                  >
                                    Minimum Repayments (p.a.)
                                  </label>
                                  <Field
                                    type="number"
                                    className="form-control shadow inputDesign"
                                    id="MinimumRepayments"
                                    name="MinimumRepayments"
                                    placeholder="Minimum Repayments (p.a.)"
                                    disabled
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="MinimumRepayments"
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="ApplyMinimumRepayments"
                                    className="form-label"
                                  >
                                    Apply Minimum Repayments
                                  </label>
                                  <Field
                                    as="select"
                                    id="ApplyMinimumRepayments"
                                    className="form-select shadow  inputDesign"
                                    name="ApplyMinimumRepayments"
                                  >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                  </Field>
                                  <ErrorMessage
                                    className="text-danger fw-bold"
                                    component="div"
                                    name="ApplyMinimumRepayments"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Loan Attached Button Row 5 */}

                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="ActualAnnualRepayments"
                                    className="form-label"
                                  >
                                    Actual Annual Repayments
                                  </label>
                                  <Field
                                    type="number"
                                    className="form-control shadow inputDesign"
                                    id="ActualAnnualRepayments"
                                    name="ActualAnnualRepayments"
                                    placeholder="Actual Annual Repayments"
                                    disabled={values.ApplyMinimumRepayments=="No"?false :true}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="ActualAnnualRepayments"
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label htmlFor="RepayLoan" className="form-label">
                                    Repay Loan in Year
                                  </label>
                                  <Field
                                    id="RepayLoan"
                                    name='RepayLoan'
                                    className="form-select shadow  inputDesign"
                                    as='select'
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
                                  <ErrorMessage component='div' className='text-danger fw-bold' name="RepayLoan" />
                                </div>
                              </div>

                            </div>

                          </div>
                        )}

                        {/* Loan Attached Button End */}

                        {/* Table */}
                        <div className="row">
                          <div className="col-md-12">
                            <div className="table-responsive my-3">
                              <table className="table table-bordered table-hover text-center">
                                <thead className="text-light" id="tableHead">
                                  <tr>
                                    <th>Purchase Year</th>
                                    <th>Value</th>
                                    <th>Rent p.a</th>
                                    <th>Annual Expenses</th>
                                    <th>Loan</th>
                                    <th>Repayments</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {investmentList.map((elem, index) => {
                                    return (
                                      <tr>
                                        <td>{elem.PurchaseYear}</td>
                                        <td>{elem.Value}</td>
                                        <td>{elem.Rent}</td>
                                        <td>{elem.Annual}</td>
                                        <td>{elem.Loan}</td>
                                        <td>{elem.Repayments}</td>
                                        <td>
                                          <button type='button' className='btn btn-danger btn-sm'>delete</button>
                                          <button type='button' onClick={() => { setValues(elem) }} className='btn btn-warning btn-sm mx-2'>update</button>
                                        </td>
                                      </tr>
                                    )
                                  })}

                                </tbody>
                              </table>
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
                            onClick={handleClose7}
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

          </div>
        </div>

      </div>

    </>
  )
}

export default InvestmentProperties
