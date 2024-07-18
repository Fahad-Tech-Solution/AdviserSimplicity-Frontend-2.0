import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./businessTextStructure.css"
import plus from "./images/plus.svg"
import notebook from "./images/notebook.svg"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FamilyHome = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let initialValues = {
    ClientOwnership:'',
    PartnerOwnership:'',
    CurrentValue:'',
    State:'',
    YearofPurchase:'',
    Stampduty:'',
    OtherCosts:'',
    TotalCostBase:'',
    ExpectedGrowthRate:'',
    SellPropertyYear:'',
    EstimatedSellingCost:'',
    homeLoan:'No',
    CurrentLoanBalance:'',
    ClientBorrowing:'',
    PartnerBorrowing:'',
    LoanType:'',
    LoanTerm:'',
    InterestPeriod:'',
    InitialInterestRate:'',
    MinimumRepayments:'',
    ApplyRepayments:'',
    ActualAnnualRepayments:'',
    RepayLoanYear:'',
    

  }

  let validationSchema = Yup.object({
    
    ClientOwnership: Yup.number().required("Required").test(
      "Is positive?",
      "Must be a positive number",
      (value) => value >= 0
    ),
    PartnerOwnership: Yup.number().required("Required").test(
      "Is positive?",
      "Must be a positive number",
      (value) => value >= 0
    ),
    CurrentValue: Yup.number().required("Required").test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    State:Yup.string().required("Required"),
    YearofPurchase:Yup.string().required("Required"),
    Stampduty: Yup.number().required("Required").test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    OtherCosts: Yup.number().required("Required").test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    TotalCostBase: Yup.number().required("Required").test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    ExpectedGrowthRate: Yup.number().required("Required").test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    SellPropertyYear:Yup.string()
    .required('Required')
    .test('is-greater', 'To Year must be greater than From Year', function(value) {
      const fromYear = parseInt(this.resolve(Yup.ref('YearofPurchase')));
      const toYear = value;
      return (parseInt(toYear) >= fromYear) || (toYear=="NO")  ;
        }),
    EstimatedSellingCost:Yup.string().required("Required"),
    CurrentLoanBalance: Yup.number().when("homeLoan", {
      is: (val) => val && val === "Yes",
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      otherwise: Yup.number().notRequired(),
    }),

    ClientBorrowing:Yup.number().when("homeLoan", {
      is: (val) => val && val === "Yes",
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",
        (value) => value >= 0
      ),
      otherwise: Yup.number().notRequired(),
    }),
    PartnerBorrowing:Yup.number().when("homeLoan", {
      is: (val) => val && val === "Yes",
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",
        (value) => value >= 0
      ),
      otherwise: Yup.number().notRequired(),
    }),
    LoanType:Yup.string().when("homeLoan", {
      is: (val) => val && val === "Yes",
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    LoanTerm:Yup.string().when("homeLoan", {
      is: (val) => val && val === "Yes",
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    InterestPeriod:Yup.string().when("homeLoan", {
      is: (val) => val && val === "Yes",
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    InitialInterestRate:Yup.number().when("homeLoan", {
      is: (val) => val && val === "Yes",
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      otherwise: Yup.number().notRequired(),
    }),
    MinimumRepayments:Yup.number().when("homeLoan", {
      is: (val) => val && val === "Yes",
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      otherwise: Yup.number().notRequired(),
    }),
    ApplyRepayments:Yup.string().when("homeLoan", {
      is: (val) => val && val === "Yes",
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ActualAnnualRepayments:Yup.number().when("homeLoan", {
      is: (val) => val && val === "Yes",
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      otherwise: Yup.number().notRequired(),
    }),
    RepayLoanYear:Yup.string().when("homeLoan", {
      is: (val) => val && val === "Yes",
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
  
    
  })
  let onSubmit = (values) => {
    console.log(values);

  }
  return (
    <>

      <label htmlFor="" className="form-label">
      Family Home
      </label>
      <div>
        <button
        type="button"
          className=" btn btn-outline-success"
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
                  Family Home
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

             
                        {/* First Row*/}
                        <div className="row">

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="Home"
                                className="form-label"
                              >
                                Home
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="Home"
                                name='Home'
                                placeholder="Home"
                                readOnly={true}
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='Home' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="ClientOwnership"
                                className="form-label"
                              >
                                Client % Of Ownership
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="ClientOwnership"
                                name='ClientOwnership'
                                placeholder="Client % Of Ownership"
                                value={values.ClientOwnership}
                                onChange={(e) => {
                                  const newValue = parseFloat(e.target.value) || 0;
                                  handleChange(e);
                                  if (newValue <= 100) {
                                    handleChange({
                                      target: { name: 'PartnerOwnership', value: 100 - newValue },
                                    });
                                  }
                                  else {
                                    handleChange({
                                      target: { name: 'ClientOwnership', value: 100  },
                                    });
                                    handleChange({
                                      target: { name: 'PartnerOwnership', value: 0 },
                                    });
                                  }
                                }}
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='ClientOwnership' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="PartnerOwnership"
                                className="form-label"
                              >
                                Partner % Of Ownership
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="PartnerOwnership"
                                name='PartnerOwnership'
                                placeholder="Partner % Of Ownership"
                                value={values.PartnerOwnership}
                                onChange={(e) => {
                                  const newValue = parseFloat(e.target.value) || 0;
                                  handleChange(e);
                                  if (newValue <= 100) {
                                    handleChange({
                                      target: { name: 'ClientOwnership', value: 100 - newValue },
                                    });
                                  }
                                  else {
                                    handleChange({
                                      target: { name: 'PartnerOwnership', value: 100  },
                                    });
                                    handleChange({
                                      target: { name: 'ClientOwnership', value: 0 },
                                    });
                                  }
                                }}
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerOwnership' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="CurrentValue "
                                className="form-label"
                              >
                                Current Value / Purchase Price
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="CurrentValue"
                                name='CurrentValue'
                                placeholder="Current Value / Purchase Price"
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='CurrentValue' />
                            </div>
                          </div>

                        </div>

                        {/* Second Row*/}

                        <div className="row">

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="State" className="form-label">
                                State
                              </label>
                              <Field
                                id="State"
                                name='State'
                                className="form-select shadow  inputDesign"
                                as='select'

                              >
                                <option value="">Select</option>
                                <option value="ACT">ACT</option>
                                <option value="NSW">NSW</option>
                                <option value="NT">NT</option>
                                <option value="QLD">QLD</option>
                                <option value="SA">SA</option>
                                <option value="TAC">TAC</option>
                                <option value="VIC">VIC</option>

                              </Field>
                              <ErrorMessage component='div' className='text-danger fw-bold' name="State" />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="YearofPurchase" className="form-label">
                                Year of Purchase
                              </label>
                              <Field
                                id="YearofPurchase"
                                name='YearofPurchase'
                                className="form-select shadow  inputDesign"
                                as='select'
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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="YearofPurchase" />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="Stampduty"
                                className="form-label"
                              >
                                Stamp duty
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="Stampduty"
                                name='Stampduty'
                                placeholder="Stamp duty"
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='Stampduty' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="OtherCosts "
                                className="form-label"
                              >
                                Other Costs
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="OtherCosts"
                                name='OtherCosts'
                                placeholder="Other Costs"
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='OtherCosts' />
                            </div>
                          </div>

                        </div>

                        {/* Third Row*/}
                        <div className="row">

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
                                className="form-control inputDesign  shadow"
                                id="TotalCostBase"
                                name='TotalCostBase'
                                placeholder="Total Cost Base"
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='TotalCostBase' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="ExpectedGrowthRate "
                                className="form-label"
                              >
                                Expected Growth Rate
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="ExpectedGrowthRate"
                                name='ExpectedGrowthRate'
                                placeholder="Expected Growth Rate"
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='ExpectedGrowthRate' />
                            </div>
                          </div>

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

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="EstimatedSellingCost" className="form-label">
                                Estimated Future Selling Cost
                              </label>
                              <Field
                                id="EstimatedSellingCost"
                                name='EstimatedSellingCost'
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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="EstimatedSellingCost" />
                            </div>
                          </div>

                        </div>

                        {/* Fourth Row Radio Button*/}
                        <div className="row">
                          <div className="col-md-3">
                            <div className="mb-3">
                              <label className="form-label">
                              Home Loan Attached
                              </label>

                              {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input type="radio" name="homeLoan" id="homeLoanopt1"
                                    onChange={handleChange} value="Yes"
                                    checked={values.homeLoan == "Yes"} />
                                  <label htmlFor="homeLoanopt1" className="label1">
                                    <span>YES</span>
                                  </label>
                                  <input type="radio" name="homeLoan" id="homeLoanopt2"
                                    onChange={handleChange} value="No"

                                    checked={values.homeLoan == "No"} />
                                  <label htmlFor="homeLoanopt2" className="label2">
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                              {/* switch button style */}


                            </div>
                          </div>
                        </div>


                        {/* Fifth Row*/}
                        
                        {values.homeLoan =="Yes" &&
                        <div className="row">
                        
                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="CurrentLoanBalance"
                                className="form-label"
                              >
                                Current Loan Balance
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="CurrentLoanBalance"
                                name='CurrentLoanBalance'
                                placeholder="Current Loan Balance"
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='CurrentLoanBalance' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="ClientBorrowing"
                                className="form-label"
                              >
                                Client % of Borrowing
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="ClientBorrowing"
                                name='ClientBorrowing'
                                placeholder="Client % of Borrowing"
                                                 
                                value={values.ClientBorrowing}
                                onChange={(e) => {
                                  const newValue = parseFloat(e.target.value) || 0;
                                  handleChange(e);
                                  if (newValue <= 100) {
                                    handleChange({
                                      target: { name: 'PartnerBorrowing', value: 100 - newValue },
                                    });
                                  }
                                  else {
                                    handleChange({
                                      target: { name: 'ClientBorrowing', value: 100  },
                                    });
                                    handleChange({
                                      target: { name: 'PartnerBorrowing', value: 0 },
                                    });
                                  }
                                }}
                                  
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='ClientBorrowing' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="PartnerBorrowing"
                                className="form-label"
                              >
                                Partner % of Borrowing
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="PartnerBorrowing"
                                name='PartnerBorrowing'
                                placeholder="Partner % of Borrowing"
                                value={values.PartnerBorrowing}
                                onChange={(e) => {
                                  const newValue = parseFloat(e.target.value) || 0;
                                  handleChange(e);
                                  if (newValue <= 100) {
                                    handleChange({
                                      target: { name: 'ClientBorrowing', value: 100 - newValue },
                                    });
                                  }
                                  else {
                                    handleChange({
                                      target: { name: 'PartnerBorrowing', value: 100  },
                                    });
                                    handleChange({
                                      target: { name: 'ClientBorrowing', value: 0 },
                                    });
                                  }
                                }}
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerBorrowing' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="LoanType" className="form-label">
                                Loan Type
                              </label>
                              <Field
                                id="LoanType"
                                name='LoanType'
                                className="form-select shadow  inputDesign"
                                as='select'
                              >
                                <option value="">Select</option>
                                <option value="I/Only">I/Only </option>
                                <option value="P&I">P&I</option>
                              </Field>
                              <ErrorMessage component='div' className='text-danger fw-bold' name="LoanType" />
                            </div>
                          </div>

                        </div>}

                        {/* Sixth Row*/}
                        {values.homeLoan == "Yes" &&
                        <div className="row">

                          <div className="col-md-3">
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

                          <div className="col-md-3">
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

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="InitialInterestRate"
                                className="form-label"
                              >
                                Initial Interest Rate
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="InitialInterestRate"
                                name='InitialInterestRate'
                                placeholder=" Initial Interest Rate"
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='InitialInterestRate' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="MinimumRepayments"
                                className="form-label"
                              >
                                Minimum Repayments
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="MinimumRepayments"
                                name='MinimumRepayments'
                                placeholder="Minimum Repayments"
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='MinimumRepayments' />
                            </div>
                          </div>

                        </div>}

                        {/* Seventh Row*/}
                        {values.homeLoan == "Yes" &&
                        <div className="row">

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="ApplyRepayments" className="form-label">
                              Apply Minimum Repayments
                              </label>
                              <Field
                                id="ApplyRepayments"
                                name='ApplyRepayments'
                                className="form-select shadow  inputDesign"
                                as='select'
                              >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </Field>
                              <ErrorMessage component='div' className='text-danger fw-bold' name="ApplyRepayments" />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="ActualAnnualRepayments"
                                className="form-label"
                              >
                                Actual Annual Repayments
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="ActualAnnualRepayments"
                                name='ActualAnnualRepayments'
                                placeholder="Actual Annual Repayments"
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='ActualAnnualRepayments' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="RepayLoanYear" className="form-label">
                              Repay Loan in Year
                              </label>
                              <Field
                                id="RepayLoanYear"
                                name='RepayLoanYear'
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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="RepayLoanYear" />
                            </div>
                          </div>

                        </div>}

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
              {/* Business Expense Schedule */}
            </div>

            {/* --------------------------------------------------------------- */}
          </div>
        </div>

      </div>

    </>
  )
}

export default FamilyHome;
