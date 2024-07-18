import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { differenceInYears, getDate } from "date-fns";
import Modal from "react-bootstrap/Modal";
import Collapse from 'react-bootstrap/Collapse';

import * as Yup from "yup";
import "yup-phone";

//Images 
import plus from "./images/plus.svg";
import noteBook from "./images/notebook.svg"
import moneyBag from "./images/moneyBag.svg"
import down from "./images/down.svg"

const GeneralLivingExpenses = () => {
    let [GeneralLivingExpensesModal, setGeneralLivingExpensesModal] = useState(false); 
    let [InnerModal, setInnerModal] = useState(false); 
   
  
    const [totalExpense, setTotalExpense] = useState(0)
    const [totalHouseHold, setTotalHouseHold] = useState(0)
    const [totalPersonal, setTotalPersonal] = useState(0)
    const [totalTransport, setTotalTransport] = useState(0)
    const [totalInsurance, setTotalInsurance] = useState(0)
  
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
  
    let initialValues = {
      GeneralExpensesAmount:"",
      GeneralExpensesStatingYear:"",
      GeneralExpensesEndingYear:"",
      GeneralExpensesIndexation:"",
      
      reducedExpenses:"No",
      reducedExpensesAmount:"",
      reducedExpensesStatingYear:"",
      reducedExpensesEndingYear:"",
      reducedExpensesIndexation:"",
      
      aFSAExpenses:"No",
      aFSAExpensesAmount:"",
      aFSAExpensesStatingYear:"",
      aFSAExpensesEndingYear:"",
      aFSAExpensesIndexation:"",
      
    };
  
    let validationSchema = Yup.object().shape({

      GeneralExpensesAmount:Yup.number().required('Required'),
      GeneralExpensesStatingYear:Yup.string().required('Required'),
      GeneralExpensesEndingYear:Yup.string().test('is-greater', 'To Year must be greater than From Year',
       function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('GeneralExpensesStatingYear')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
        }).required('Required'),
      GeneralExpensesIndexation:Yup.string().required('Required'),
      

      reducedExpensesAmount:Yup.string().when("reducedExpenses", {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
      }),
      reducedExpensesStatingYear:Yup.string().when("reducedExpenses", {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
      }),
      reducedExpensesEndingYear:Yup.string().when("reducedExpenses", {
        is: (val) => val && val.length == 3,
        then: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
          const fromYear = parseInt(this.resolve(Yup.ref('reducedExpensesStatingYear')));
          const toYear = parseInt(value);
          return toYear >= fromYear;
        }).required("Required"),
      }),
      reducedExpensesIndexation:Yup.string().when("reducedExpenses", {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
      }),
    
      aFSAExpensesAmount:Yup.string().when("aFSAExpenses", {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
      }),
      aFSAExpensesStatingYear:Yup.string().when("aFSAExpenses", {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
      }),
      aFSAExpensesEndingYear:Yup.string().when("aFSAExpenses", {
        is: (val) => val && val.length == 3,
        then: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
          const fromYear = parseInt(this.resolve(Yup.ref('aFSAExpensesStatingYear')));
          const toYear = parseInt(value);
          return toYear >= fromYear;
        }).required("Required"),
      }),
      aFSAExpensesIndexation:Yup.string().when("aFSAExpenses", {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
      }),    

    });
  
    function onSubmit(values) {
      console.log(values);
      setGeneralLivingExpensesModal(false);
    }
  
    const initialValues2={
      houseHoldrent:'',
      houseHoldElectricity:'',
      houseHoldrentType:'',
      houseHoldElectricityType:'',
      houseHoldWaterRates:'',
      houseHoldWaterRateType:'',
  
      houseHoldGas:'',
      houseHoldGasType:'',
      houseHoldPhone:'',
      houseHoldPhoneType:'',
      houseHoldCouncilRates:'',
      houseHoldCouncilRatesType:'',
      houseHoldInternet:'',
      houseHoldInternetType:'',
      houseHoldOther:'',
      houseHoldOtherType:'',
      
      PersonalFood:'',
      PersonalFoodType:'',
      PersonalClothing:'',
      PersonalClothingValueType:'',
      
      PersonalCigarettes:'',
      PersonalCigarettesType:'',
      PersonalAlcohol:'',
      PersonalAlcoholType:'',
      
      PersonalSubscriptionFees:'',
      PersonalSubscriptionFeesType:'',
      PersonalMembershipsClubs:'',
      PersonalMembershipsClubsType:'',
      
      PersonalOther:'',
      PersonalOtherType:'',
      PersonalHolidays:'',
      PersonalHolidaysType:'',
      
      PersonalDiningOut:'',
      PersonalDiningOutType:'',
      PersonalMobilePhone:'',
      PersonalMobilePhoneType:'',
      
      PersonalMedicalExpenses:'',
      PersonalMedicalExpensesType:'',
      
      TransportPetrol:'',
      TransportPetrolType:'',
      TransportCarRepairs:'',
      TransportCarRepairsType:'',
      
      TransportCarRegistration:'',
      TransportCarRegistrationType:'',
      PublicTransport:'',
      PublicTransportType:'',
      TransportOther:'',
      TransportOtherType:'',
      
      PrivateHealth:'',
      PrivateHealthType:'',
      LifeTPDTrauma:'',
      LifeTPDTraumaType:'',
      
      
      InsuranceIncomeProtection:'',
      InsuranceIncomeProtectionType:'',
      InsuranceCar:'',
      InsuranceCarType:'',
      
      InsuranceHomeContents:'',
      InsuranceHomeContentsType:'',
      InsuranceOther:'',
      TransInsuranceType:'',
  
    }
    const validationSchema2=Yup.object({
      houseHoldrent:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      houseHoldElectricity:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      houseHoldrentType:Yup.string().required("Required"),
      houseHoldElectricityType:Yup.string().required("Required"),
      houseHoldWaterRateType:Yup.string().required("Required"),
      houseHoldWaterRates:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      houseHoldGas:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      houseHoldGasType:Yup.string().required("Required"),
      houseHoldPhone:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      houseHoldPhoneType:Yup.string().required("Required"),
      houseHoldCouncilRates:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      houseHoldCouncilRatesType:Yup.string().required("Required"),
  
      houseHoldInternet:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      houseHoldInternetType:Yup.string().required("Required"),
      houseHoldOther:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      houseHoldOtherType:Yup.string().required("Required"),
  
      PersonalFood:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      PersonalFoodType:Yup.string().required("Required"),
      PersonalClothing:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      PersonalClothingValueType:Yup.string().required("Required"),
  
      PersonalCigarettes:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      PersonalCigarettesType:Yup.string().required("Required"),
      PersonalAlcohol:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      PersonalAlcoholType:Yup.string().required("Required"),
  
      PersonalSubscriptionFees:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      PersonalSubscriptionFeesType:Yup.string().required("Required"),
      PersonalMembershipsClubs:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      PersonalMembershipsClubsType:Yup.string().required("Required"),
  
      PersonalOther:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      PersonalOtherType:Yup.string().required("Required"),
      PersonalHolidays:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      PersonalHolidaysType:Yup.string().required("Required"),
  
      PersonalDiningOut:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      PersonalDiningOutType:Yup.string().required("Required"),
      PersonalMobilePhone:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      PersonalMobilePhoneType:Yup.string().required("Required"),
      PersonalMedicalExpenses:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      PersonalMedicalExpensesType:Yup.string().required("Required"),
  
      TransportPetrol:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      TransportPetrolType:Yup.string().required("Required"),
      TransportCarRepairs:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      TransportCarRepairsType:Yup.string().required("Required"),
  
      TransportCarRegistration:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      TransportCarRegistrationType:Yup.string().required("Required"),
      PublicTransport:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      PublicTransportType:Yup.string().required("Required"),
      TransportOther:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      TransportOtherType:Yup.string().required("Required"),
  
      PrivateHealth:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      PrivateHealthType:Yup.string().required("Required"),
      LifeTPDTrauma:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      LifeTPDTraumaType:Yup.string().required("Required"),
  
      InsuranceIncomeProtection:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      InsuranceIncomeProtectionType:Yup.string().required("Required"),
      InsuranceCar:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      InsuranceCarType:Yup.string().required("Required"),
      InsuranceHomeContents:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      InsuranceHomeContentsType:Yup.string().required("Required"),
      InsuranceOther:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      TransInsuranceType:Yup.string().required("Required"),
    })
    function onSubmit2(values) {
      console.log(values);
      setInnerModal(false);
    }
  
  return (
    <div>
        <label className="form-label">General Living Expenses</label>
        <br/>
        <button type="button" className=" btn  btn-outline-success "
        onClick={()=>{setGeneralLivingExpensesModal(true);}}
        >
        <div className="iconContainer mx-1">
            <img className="img-fluid" src={plus} alt="" />
        </div>
        Enter Details
      </button>
      
      <Modal
      show={GeneralLivingExpensesModal}
      onHide={()=>{setGeneralLivingExpensesModal(false)}}
      backdrop="static"
      className="modal-xl"
      keyboard={false}
    >
      <Modal.Header
        className="text-light modalBG "
        closeButton
      >
        <Modal.Title className="fontStyle">
        General Living Expenses
          <div className="iconContainerLg">
          </div>
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, setValues, handleChange,handleBlur }) => (
          <Form>
            <Modal.Body>

            {/**First Row */}
          <div className="row mt-3">
              
              {/**General Living Expenses Amount in Dollars */}
              <div className="col-md-3">
                <label htmlFor="GeneralExpensesAmount" className="form-label">  General Living Expenses  </label>
                <Field type="number" className="form-control shadow inputDesign" id="GeneralExpensesAmount"
                name="GeneralExpensesAmount" placeholder="$00.00"   />
                <ErrorMessage component="div" className="text-danger fw-bold" name="GeneralExpensesAmount" />
              </div>
              
              {/**General Living Expenses Starting Year*/}
              <div className="col-md-3">
                <label htmlFor="GeneralExpensesStatingYear" className="form-label"> Include From Year </label>
                <Field as="select" className="form-select shadow inputDesign" id="GeneralExpensesStatingYear"
                name="GeneralExpensesStatingYear" placeholder="GeneralExpensesStatingYear"   >
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
                <ErrorMessage component="div" className="text-danger fw-bold" name="GeneralExpensesStatingYear" />
              </div>
              
              {/**General Living Expenses Ending Year*/}
              <div className="col-md-3">
                  <label htmlFor="GeneralExpensesEndingYear" className="form-label"> Up Until Year </label>
                  <Field as="select" className="form-select shadow inputDesign" id="GeneralExpensesEndingYear"
                  name="GeneralExpensesEndingYear" placeholder="GeneralExpensesEndingYear"   >
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
                  <ErrorMessage component="div" className="text-danger fw-bold" name="GeneralExpensesEndingYear" />
              </div>
              
              {/**General Living Expenses Percentage of Amount */}          
              <div className="col-md-3">
                  <label htmlFor="GeneralExpensesIndexation" className="form-label"> Indexation</label>
                  <Field as="select" className="form-select shadow inputDesign" id="GeneralExpensesIndexation"
                  name="GeneralExpensesIndexation" placeholder="Indexation" >
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
                  <ErrorMessage component="div" className="text-danger fw-bold" name="GeneralExpensesIndexation" />
              </div>

          </div>
          
          <div className="row mt-2">
           <div className="col-md-12">
              <label className="form-label">Apply Reduced General Living Expenses</label>
            <div className="form-check form-switch m-0 p-0 ">
              <div className="radiobutton">
                <input type="radio" name="reducedExpenses" id="reducedExpenses1"
                  value="Yes" onChange={handleChange} checked={values.reducedExpenses == "Yes"}
                />
                <label htmlFor="reducedExpenses1" className="label1">
                  <span>YES</span>
                </label>
                <input type="radio" name="reducedExpenses" id="reducedExpenses2"
                  value="No" onChange={handleChange} checked={values.reducedExpenses == "No"}/>
                <label htmlFor="reducedExpenses2" className="label2">
                  <span>NO</span>
                </label>
              </div>
              </div>
            </div>
          </div>
          {values.reducedExpenses === "Yes" && 
          <div className="row mt-3">
          <div className="col-md-3">
            <label htmlFor="reducedExpensesAmount" className="form-label">  Amount  </label>
            <Field type="number" className="form-control shadow inputDesign" id="reducedExpensesAmount"
            name="reducedExpensesAmount" placeholder="$00.00"   />
            <ErrorMessage component="div" className="text-danger fw-bold" name="reducedExpensesAmount" />
          </div>
          
          <div className="col-md-3">
            <label htmlFor="reducedExpensesStatingYear" className="form-label"> Include From Year </label>
            <Field as="select" className="form-select shadow inputDesign" id="reducedExpensesStatingYear"
            name="reducedExpensesStatingYear" placeholder="reducedExpensesStatingYear"   >
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
            <ErrorMessage component="div" className="text-danger fw-bold" name="reducedExpensesStatingYear" />
          </div>
          
          <div className="col-md-3">
            <label htmlFor="reducedExpensesEndingYear" className="form-label"> Up Until Year </label>
            <Field as="select" className="form-select shadow inputDesign" id="reducedExpensesEndingYear"
            name="reducedExpensesEndingYear" placeholder="reducedExpensesEndingYear"   >
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
            <ErrorMessage component="div" className="text-danger fw-bold" name="reducedExpensesEndingYear" />
          </div>

          <div className="col-md-3 ">
            <label htmlFor="reducedExpensesIndexation" className="form-label"> Indexation</label>
            <Field as="select" className="form-select shadow inputDesign" id="reducedExpensesIndexation"
            name="reducedExpensesIndexation" placeholder="Indexation" >
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
            <ErrorMessage component="div" className="text-danger fw-bold" name="reducedExpensesIndexation" />
          </div>
          </div>
          }
          
          <div className="row mt-3">
          <div className="col-md-3 ">
          <label className="form-label">Apply AFSA Standards</label>
            <div className="form-check form-switch m-0 p-0 ">
              <div className="radiobutton">
                <input type="radio" name="aFSAExpenses" id="aFSAExpenses1"
                  value="Yes" onChange={handleChange} checked={values.aFSAExpenses == "Yes"}
                />
                <label htmlFor="aFSAExpenses1" className="label1">
                  <span>YES</span>
                </label>
                <input type="radio" name="aFSAExpenses" id="aFSAExpenses2"
                  value="No" onChange={handleChange} checked={values.aFSAExpenses == "No"}/>
                <label htmlFor="aFSAExpenses2" className="label2">
                  <span>NO</span>
                </label>
              </div>
              </div>
          </div>
          </div>
           
          {values.aFSAExpenses === "Yes" && 
            <div className="row mt-3">
            <div className="col-md-3">
              <label htmlFor="aFSAExpensesAmount" className="form-label">  Amount  </label>
              <Field type="number" className="form-control shadow inputDesign" id="aFSAExpensesAmount"
              name="aFSAExpensesAmount" placeholder="$00.00"   />
              <ErrorMessage component="div" className="text-danger fw-bold" name="aFSAExpensesAmount" />
            </div>
            
            <div className="col-md-3">
              <label htmlFor="aFSAExpensesStatingYear" className="form-label"> Include From Year </label>
              <Field as="select" className="form-select shadow inputDesign" id="aFSAExpensesStatingYear"
              name="aFSAExpensesStatingYear" placeholder="aFSAExpensesStatingYear"   >
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
              <ErrorMessage component="div" className="text-danger fw-bold" name="aFSAExpensesStatingYear" />
            </div>
            
            <div className="col-md-3">
              <label htmlFor="aFSAExpensesEndingYear" className="form-label"> Up Until Year </label>
              <Field as="select" className="form-select shadow inputDesign" id="aFSAExpensesEndingYear"
              name="aFSAExpensesEndingYear" placeholder="aFSAExpensesEndingYear"   >
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
              <ErrorMessage component="div" className="text-danger fw-bold" name="aFSAExpensesEndingYear" />
            </div>

            <div className="col-md-3">
              <label htmlFor="aFSAExpensesIndexation" className="form-label"> Indexation</label>
              <Field as="select" className="form-select shadow inputDesign" id="aFSAExpensesIndexation"
              name="aFSAExpensesIndexation" placeholder="Indexation" >
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
              <ErrorMessage component="div" className="text-danger fw-bold" name="aFSAExpensesIndexation" />
            </div>
            </div>
          }

          <div className="row mt-3">
            <div className="col-md-6">
              <label className="form-label">Use Budget Planer to calculate the living cost</label>
              <br/>
              <button type="button" className=" btn  btn-outline-success "
              onClick={()=>{setInnerModal(true);}}
              >
              <div className="iconContainer mx-1">
                  <img className="img-fluid" src={plus} alt="" />
              </div>
              Calculate
            </button>
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
                  onClick={()=>{setGeneralLivingExpensesModal(false)}}
                >
                  Cancel
                </button>
              </div>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal> 
    

      
          <Modal
          show={InnerModal}
          onHide={() => { setInnerModal(false) }}
          backdrop="static"
          className="modal-lg"
          keyboard={false}
        >
          <Modal.Header
            className="text-light modalBG "
            closeButton
          >
            <Modal.Title className="fontStyle">
            Budget Planner 
            <div className="iconContainerLg">
          <img className="img-fluid" src={noteBook} alt="" />
            </div>
            
          </Modal.Title>
          </Modal.Header>
          <Formik 
            initialValues={initialValues2}
            validationSchema={validationSchema2}
            onSubmit={onSubmit2} >
          {({values , setFieldValue ,setValues})=>
              
            <Form>  
              <Modal.Body>
              <div className="row text-light bgColorIncome py-2 my-1">
                <div className="col-md-6">
                  <label className="form-label mb-0">Total Expense</label>
                </div>
                <div className="col-md-6">
                <label id="HouseholdTotalValue" 
                className="float-end form-label mb-0">
                
                  ${totalExpense.toFixed(2)}
                  <div className="iconContainer mx-1">
              <img className="img-fluid" src={moneyBag} alt="" />

                </div>
                  </label>
                </div>
                </div>

                {/* houseHold */}
                <div className="row ">
              <div 
              onClick={() => setOpen(!open)}
              aria-controls=""
              aria-expanded={open}
              className="bgColorIncome   py-2 text-light"
              >
                <div className="row">
                <div className="col-md-6">
                  <label className="form-label mb-0">Household</label>
                </div>
                <div className="col-md-6">
                <label id="HouseholdTotalValue" className="float-end form-label mb-0">
                ${totalHouseHold.toFixed(2)}
                <div className="iconContainer mx-1">
              <img className="img-fluid" src={down} alt="" />

                </div>
                </label>
                </div>
                </div>
                

              </div>
              <div>
                
              </div>
              <Collapse in={open}>

                <div className="row">
                  <div className="col-md-12">

      {/* Total Expense Formula1 */}
      {
      setTotalExpense(totalHouseHold+ totalPersonal + totalTransport + totalInsurance)
      }
                      {/* Sum of HouseHold Formula2 */}
              { setTotalHouseHold(
                parseFloat ((values.houseHoldrent * values.houseHoldrentType).toFixed(2)) +
                parseFloat ((values.houseHoldElectricity * values.houseHoldElectricityType).toFixed(2)) +
                parseFloat((values.houseHoldWaterRates * values.houseHoldWaterRateType).toFixed(2)) +
                parseFloat((values.houseHoldGas * values.houseHoldGasType).toFixed(2) ) +

                parseFloat((values.houseHoldPhone * values.houseHoldPhoneType).toFixed(2)) +
                parseFloat((values.houseHoldCouncilRates * values.houseHoldCouncilRatesType).toFixed(2))+

                parseFloat((values.houseHoldInternet * values.houseHoldInternetType).toFixed(2)) +
                parseFloat((values.houseHoldOther * values.houseHoldOtherType).toFixed(2))



                  )}
              {/* Sum of HouseHold Formula2 */}

                      {/* Sum of Personal Formula3 */}
                      {setTotalPersonal(
                        parseFloat((values.PersonalFood * values.PersonalFoodType).toFixed(2))+
                        parseFloat((values.PersonalClothing * values.PersonalClothingValueType).toFixed(2))+
                        parseFloat((values.PersonalCigarettes * values.PersonalCigarettesType).toFixed(2))+
                        parseFloat((values.PersonalAlcohol * values.PersonalAlcoholType).toFixed(2))+

                        parseFloat((values.PersonalSubscriptionFees * values.PersonalSubscriptionFeesType).toFixed(2))+
                        parseFloat((values.PersonalMembershipsClubs * values.PersonalMembershipsClubsType).toFixed(2))+
                        parseFloat((values.PersonalOther * values.PersonalOtherType).toFixed(2))+
                        parseFloat((values.PersonalHolidays * values.PersonalHolidaysType).toFixed(2))+
                        parseFloat((values.PersonalDiningOut * values.PersonalDiningOutType).toFixed(2))+
                        parseFloat((values.PersonalMobilePhone * values.PersonalMobilePhoneType).toFixed(2))+
                        parseFloat((values.PersonalMedicalExpenses * values.PersonalMedicalExpensesType).toFixed(2))
                      )}

                      {/* Sum of TransportFormula4 */}

                  {   setTotalTransport(

                    parseFloat((values.TransportPetrol * values.TransportPetrolType).toFixed(2))+
                    parseFloat((values.TransportCarRepairs * values.TransportCarRepairsType).toFixed(2))+
                    parseFloat((values.TransportCarRegistration * values.TransportCarRegistrationType).toFixed(2))+
                    parseFloat((values.PublicTransport * values.PublicTransportType).toFixed(2))+
                    parseFloat((values.TransportOther * values.TransportOtherType).toFixed(2))

                      )}

                      {/* Sum of Insurance Formula5 */}

                      {
                      setTotalInsurance(
              parseFloat((values.PrivateHealth * values.PrivateHealthType).toFixed(2))+
              parseFloat((values.LifeTPDTrauma * values.LifeTPDTraumaType).toFixed(2))+
              parseFloat((values.InsuranceIncomeProtection * values.InsuranceIncomeProtectionType).toFixed(2))+
              parseFloat((values.InsuranceCar * values.InsuranceCarType).toFixed(2))+
              parseFloat((values.InsuranceHomeContents * values.InsuranceHomeContentsType).toFixed(2))+
              parseFloat((values.InsuranceOther * values.TransInsuranceType).toFixed(2))
                        )
                      }



                  

                    {/* houseHold row 1 */}
                    <div className="row  my-3">
                  
                  {/* Rent */}
                    <div className="col-md-6">
                    
                  <div className="row">
                    <div className="col-7">
                    <label htmlFor="houseHoldrent" className="form-label">
                    Rent123 
                  </label>
                  <Field type="number" className="form-control inputDesign shadow"
                  id="houseHoldrent" placeholder="Rent" name="houseHoldrent"/>
                
                  < ErrorMessage name="houseHoldrent" component="div"
                className="text-danger fw-bold" />

                    </div>
                    <div className="col-5">
                    <label htmlFor="" className="form-label float-end">
                ${(values.houseHoldrent * values.houseHoldrentType).toFixed(2)}
              
            
                  </label>
                    <Field
                    as="select"
                    id="houseHoldrentType"
                    className="form-select shadow  inputDesign"
                  name="houseHoldrentType"
                  >
                  <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                  </Field>
                  
                  < ErrorMessage name="houseHoldrentType" component="div"
                className="text-danger fw-bold" />
                    </div>
                  </div>
                    </div>
                  {/* Rent */}

                  {/* Electricity */}
                  <div className="col-md-6">
                  <div className="row">
                    <div className="col-7">
                    <label htmlFor="houseHoldElectricity" className="form-label">
                    Electricity
                  </label>
                  <Field type="number" className="form-control inputDesign shadow"
                  id="houseHoldElectricity" placeholder="Electricity"
                  name="houseHoldElectricity"/>
                < ErrorMessage name="houseHoldElectricity" component="div"
                className="text-danger fw-bold" />

                    </div>
                    <div className="col-5">
                    <label htmlFor="" className="form-label float-end">
                
              ${(values.houseHoldElectricity * values.houseHoldElectricityType).toFixed(2)}
                  </label>
                  <Field
                  as="select"
                    id="houseHoldElectricityType"
                    className="form-select shadow  inputDesign"
                    name="houseHoldElectricityType"
                  >
                    <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                    </Field>
                    < ErrorMessage name="houseHoldElectricityType" component="div"
                className="text-danger fw-bold" />
                    </div>
                  </div>
                  </div>
                  {/* Electricity */}

                    </div>
                    {/* houseHold row 1 */}

                    {/* houseHold row 2 */}
                    <div className="row  my-3">
                  
                  {/* Water Rates*/}
                  <div className="col-md-6">
                    <div className="row">
                    <div className="col-7">
                    <label htmlFor="houseHoldWaterRates" className="form-label">
                    Water Rates
                  </label>
                  <Field type="number" className="form-control inputDesign shadow"
                  id="houseHoldWaterRates" placeholder="Water Rates"
                  name="houseHoldWaterRates"/>
                  < ErrorMessage name="houseHoldWaterRates" component="div"
                className="text-danger fw-bold" />
                    </div>
                    <div className="col-5">
                    <label id="houseHoldWaterRateValue" className="form-label float-end">
      ${(values.houseHoldWaterRates * values.houseHoldWaterRateType).toFixed(2)}

                  </label>
                    <Field
                    as="select"
                    id="houseHoldWaterRateType"
                    className="form-select shadow  inputDesign"
                    name="houseHoldWaterRateType"
                  >
                  <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                    
                    </Field>
                    < ErrorMessage name="houseHoldWaterRateType" component="div"
                className="text-danger fw-bold" />
                    </div>
                    </div>
                  </div>
                  {/* Water Rates */}

                  {/* Gas */}
                  <div className="col-md-6">
                  
                  <div className="row">
                    <div className="col-7">
                    <label htmlFor="houseHoldGas" className="form-label">
                    Gas
                  </label>
                  <Field type="number" className="form-control inputDesign shadow"
                  id="houseHoldGas" name="houseHoldGas" placeholder="Gas"/>
                  < ErrorMessage name="houseHoldGas" component="div"
                  className="text-danger fw-bold" />
                    </div>
                    <div className="col-5">
                    <label   id="houseHoldGasValue" className="form-label float-end ">
                    ${(values.houseHoldGas * values.houseHoldGasType).toFixed(2)}

                  </label>
                  <Field
                  as="select"
                    id="houseHoldGasType"
                    className="form-select shadow  inputDesign"
                    name="houseHoldGasType"
                  >
                    <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                    </Field>
                    < ErrorMessage name="houseHoldGasType" component="div"
                className="text-danger fw-bold" />
                      </div>
                  </div>
                  
                  </div>
                  {/* Gas */}
                  </div>
                    {/* houseHold row 2 */}

                      {/* houseHold row 3 */}
                      <div className="row  my-3">
                  
                  {/* Phone*/}
                    <div className="col-md-6">
                    <div className="row">
                    <div className="col-7">
                    <label htmlFor="houseHoldPhone" className="form-label">
                    Phone
                  </label>
                  <Field type="number" className="form-control inputDesign shadow"
                  id="houseHoldPhone" placeholder="Phone"
                  name="houseHoldPhone"/>
                  < ErrorMessage name="houseHoldPhone" component="div"
                className="text-danger fw-bold" />
                    </div>
                    <div className="col-5">
                    <label id="houseHoldPhoneValue" className="form-label float-end">
          ${(values.houseHoldPhone * values.houseHoldPhoneType).toFixed(2)}

                  </label>
                    <Field
                    as="select"
                    id="houseHoldPhoneType"
                    name="houseHoldPhoneType"

                    className="form-select shadow  inputDesign"
                  >
                    <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                    </Field>
                    < ErrorMessage name="houseHoldPhoneType" component="div"
                className="text-danger fw-bold" />
                    </div>
                    </div>
                  </div>
                  {/* Phone */}

                  {/* Council Rates */}
                  <div className="col-md-6">
                  
                  <div className="row">
                    <div className="col-7">
                    <label htmlFor="houseHoldCouncilRates" className="form-label">
                    Council Rates
                  </label>
                  <Field type="number" className="form-control inputDesign shadow"
                  id="houseHoldCouncilRates"
                  name="houseHoldCouncilRates"
                  placeholder="Council Rates"/>
                  < ErrorMessage name="houseHoldCouncilRates" component="div"
                className="text-danger fw-bold" />
                    </div>
                    <div className="col-5">
                    <label   id="houseHoldCouncilRatesValue" className="form-label float-end ">
        ${(values.houseHoldCouncilRates * values.houseHoldCouncilRatesType).toFixed(2)}

                  </label>
                  <Field
                  as="select"
                    id="houseHoldCouncilRatesType"
                    className="form-select shadow  inputDesign"
                    name="houseHoldCouncilRatesType"
                  >
                    <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                    </Field>
                    < ErrorMessage name="houseHoldCouncilRatesType" component="div"
                    className="text-danger fw-bold" />
                      </div>
                  </div>
                  
                  </div>
                  {/* Council Rates */}
                      </div>
                      {/* houseHold row 3 */}


                        {/* houseHold row 4 */}
                        <div className="row  my-3">
                  
                  {/* Internet */}
                  <div className="col-md-6">
                  
                  <div className="row">
                    <div className="col-7">
                    <label htmlFor="houseHoldInternet" className="form-label">
                    Internet
                  </label>
                  <Field type="number" className="form-control inputDesign shadow"
                  id="houseHoldInternet"
                  name="houseHoldInternet"
                  placeholder="Internet"/>
                  
                  < ErrorMessage name="houseHoldInternet" component="div"
                className="text-danger fw-bold" />
                    </div>
                    <div className="col-5">
                    <label   id="houseHoldInternetValue" className="form-label float-end ">
        ${(values.houseHoldInternet * values.houseHoldInternetType).toFixed(2)}

                  </label>
                  <Field
                  as="select"
                    id="houseHoldInternetType"
                    name="houseHoldInternetType"

                    className="form-select shadow  inputDesign"
                  >
                  <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                    </Field>
                    < ErrorMessage name="houseHoldInternetType" component="div"
                className="text-danger fw-bold" />
                      </div>
                  </div>
                  
                  </div>
                  {/* Internet*/}
                    {/* Other */}
                    <div className="col-md-6">
                  
                  <div className="row">
                    <div className="col-7">
                    <label htmlFor="houseHoldOther" className="form-label">
                    Other
                  </label>
                  <Field name="houseHoldOther"
                  type="number" className="form-control inputDesign shadow"
                  id="houseHoldOther" placeholder="Other"/>
                  < ErrorMessage name="houseHoldOther" component="div"
                className="text-danger fw-bold" />

                    </div>
                    <div className="col-5">
                    <label   id="houseHoldOtherValue" className="form-label float-end ">
            ${(values.houseHoldOther * values.houseHoldOtherType).toFixed(2)}

                  </label>
                  <Field
                  as="select"
                    id="houseHoldOtherType"
                    name="houseHoldOtherType"

                    className="form-select shadow  inputDesign"
                  >
                    <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                    </Field>
                    < ErrorMessage name="houseHoldOtherType" component="div"
                    className="text-danger fw-bold" />
                      </div>
                  </div>
                  
                  </div>
                  {/* Internet*/}

                  
                      </div>
                      {/* houseHold row 4 */}
                    
                    
                  </div>
                </div>
              
              
            
              </Collapse>
                </div>
                {/* houseHold*/}

                  {/* Personal   */}
                <div className="row my-1">
              <div 
              onClick={() => setOpen2(!open2)}
              aria-controls=""
              aria-expanded={open2}
              className="bgColorIncome   py-2 text-light"
              >
                <div className="row ">
                <div className="col-md-6">
                  <label className="form-label mb-0">Personal</label>
                </div>
                <div className="col-md-6">
                <label className="float-end mb-0">
                ${totalPersonal.toFixed(2)}
                <div className="iconContainer mx-1">
              <img className="img-fluid" src={down} alt="" />

                </div></label>
                </div>
                </div>
                

              </div>
              <div>
                
              </div>
              <Collapse in={open2}>

                <div className="row">
                  <div className="col-md-12">

                    {/* Personal    row 1 */}
                    <div className="row  my-3">
                  
                  {/* Food */}
                    <div className="col-md-6">
                    
                  <div className="row">
                    <div className="col-7">
                    <label htmlFor="PersonalFood" className="form-label">
                    Food
                  </label>
                  <Field type="number" className="form-control inputDesign shadow"
                  name="PersonalFood" id="PersonalFood" placeholder="Food" />
                  < ErrorMessage name="PersonalFood" component="div"
                className="text-danger fw-bold" />

                    </div>
                    <div className="col-5">
                    <label htmlFor="PersonalFoodValue" className="form-label float-end">
                    ${(values.PersonalFood * values.PersonalFoodType).toFixed(2)}

                  </label>
                    <Field
                    as='select'
                    id="PersonalFoodType"
                    name="PersonalFoodType"

                    className="form-select shadow  inputDesign"
                  >
                    <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                    </Field>
                    < ErrorMessage name="PersonalFoodType" component="div"
                className="text-danger fw-bold" />
                    </div>
                  </div>
                    </div>
                  {/* Food */}

                  {/* Clothing */}
                  <div className="col-md-6">
                  <div className="row">
                    <div className="col-7">
                    <label htmlFor="PersonalClothing" className="form-label">
                    Clothing
                  </label>
                  <Field type="number" className="form-control inputDesign shadow"
                  id="PersonalClothing" name="PersonalClothing" placeholder="Clothing"/>
                  < ErrorMessage name="PersonalClothing" component="div"
                className="text-danger fw-bold" />
                    </div>
                    <div className="col-5">
                    <label id="PersonalClothingValue" className="form-label float-end">
                    ${(values.PersonalClothing * values.PersonalClothingValueType).toFixed(2)}

                  </label>
                  <Field
                  as='select'
                    name="PersonalClothingValueType"
                    id="PersonalClothingValueType"
                    className="form-select shadow  inputDesign"
                  >
                    <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                    </Field>
                    < ErrorMessage name="PersonalClothingValueType" component="div"
                className="text-danger fw-bold" />
                    </div>
                  </div>
                  </div>
                  {/* Clothing */}

                    </div>
                    {/* Personal    row 1 */}

                    {/* Personal row 2 */}
                    <div className="row  my-3">
                  
                  {/* Cigarettes*/}
                    <div className="col-md-6">
                    <div className="row">
                    <div className="col-7">
                    <label htmlFor="PersonalCigarettes" className="form-label">
                    Cigarettes
                  </label>
                  <Field type="number" className="form-control inputDesign shadow"
                  name="PersonalCigarettes" id="PersonalCigarettes" placeholder="Cigarettes"/>
                  < ErrorMessage name="PersonalCigarettes" component="div"
                className="text-danger fw-bold" />
                    </div>
                    <div className="col-5">
                    <label id="PersonalCigarettesValue" className="form-label float-end">
                    ${(values.PersonalCigarettes * values.PersonalCigarettesType).toFixed(2)}

                  </label>
                    <Field
                    as='select'
                    id="PersonalCigarettesType"
                    name="PersonalCigarettesType"

                    className="form-select shadow  inputDesign"
                  >
                  <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                    </Field>
                    < ErrorMessage name="PersonalCigarettesType" component="div"
                className="text-danger fw-bold" />
                    </div>
                    </div>
                  </div>
                  {/* Cigarettes */}

                  {/* Alcohol */}
                  <div className="col-md-6">
                  
                  <div className="row">
                    <div className="col-7">
                    <label htmlFor="PersonalAlcohol" className="form-label">
                    Alcohol
                  </label>
                  <Field type="number" className="form-control inputDesign shadow"
                  name="PersonalAlcohol" id="PersonalAlcohol" placeholder="Alcohol"/>
                  < ErrorMessage name="PersonalAlcohol" component="div" className="text-danger fw-bold" />

                    </div>
                    <div className="col-5">
                    <label   id="PersonalAlcoholValue" className="form-label float-end ">
                    ${(values.PersonalAlcohol * values.PersonalAlcoholType).toFixed(2)}

                  </label>
                  <Field
                  as='select'
                    id="PersonalAlcoholType"
                    name="PersonalAlcoholType"
                    className="form-select shadow  inputDesign"
                  >
                    <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                    </Field>
                    < ErrorMessage name="PersonalAlcoholType" component="div"
                className="text-danger fw-bold" />
                      </div>
                  </div>
                  
                  </div>
                  {/* Alcohol */}
                    </div>
                    {/* Personal row 2 */}

                      {/* Personal row 3 */}
                      <div className="row  my-3">
                  
                  {/* Subscription Fees*/}
                    <div className="col-md-6">
                    <div className="row">
                    <div className="col-7">
                    <label htmlFor="PersonalSubscriptionFees" className="form-label">
                    Subscription Fees
                  </label>
                  <Field
                  name="PersonalSubscriptionFees" type="number" className="form-control inputDesign shadow"
                  id="PersonalSubscriptionFees" placeholder="Subscription Fees"/>
      < ErrorMessage name="PersonalSubscriptionFees" component="div"
                className="text-danger fw-bold" />
                    </div>
                    <div className="col-5">
                    <label id="PersonalSubscriptionFeesValue" className="form-label float-end">
                    ${(values.PersonalSubscriptionFees * values.PersonalSubscriptionFeesType).toFixed(2)}

                  </label>
                    <Field 
                    as='select'
                    id="PersonalSubscriptionFeesType"
                    name="PersonalSubscriptionFeesType"

                    className="form-select shadow  inputDesign"
                  >
                  <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                    </Field>
                    < ErrorMessage name="PersonalSubscriptionFeesType" component="div"
                className="text-danger fw-bold" />

                    </div>
                    </div>
                    </div>
                  {/* Subscription Fees */}

                  {/* Memberships & Clubs */}
                  <div className="col-md-6">
                  
                  <div className="row">
                    <div className="col-7">
                    <label htmlFor="PersonalMembershipsClubs" className="form-label">
                    Memberships & Clubs
                  </label>
                  <Field type="number" className="form-control inputDesign shadow"
                  id="PersonalMembershipsClubs"
                  name="PersonalMembershipsClubs" placeholder="Memberships & Clubs"/>
      < ErrorMessage name="PersonalMembershipsClubs" component="div"
                className="text-danger fw-bold" />

                    </div>
                    <div className="col-5">
                    <label   id="PersonalMembershipsClubsValue" className="form-label float-end ">
                    ${(values.PersonalMembershipsClubs * values.PersonalMembershipsClubsType).toFixed(2)}

                  </label>
                  <Field
                  as='select'
                    id="PersonalMembershipsClubsType"
                    name="PersonalMembershipsClubsType"
                    className="form-select shadow  inputDesign"
                  >
                  <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                    </Field>
                    < ErrorMessage name="PersonalMembershipsClubsType" component="div"
                className="text-danger fw-bold" />

                      </div>
                  </div>
                  
                  </div>
                  {/* Memberships & Clubs */}
                    </div>
                      {/* Personal row 3 */}

                      {/* Personal row 4 */}
                    <div className="row  my-3">
                  
                  {/* Other*/}
                    <div className="col-md-6">
                    <div className="row">
                    <div className="col-7">
                    <label htmlFor="PersonalOther" className="form-label">
                    Other
                  </label>
                  <Field name="PersonalOther" type="number" className="form-control inputDesign shadow"
                  id="PersonalOther" placeholder="Other"/>
      < ErrorMessage name="PersonalOther" component="div"
                className="text-danger fw-bold" />

                    </div>
                    <div className="col-5">
                    <label id="PersonalOtherValue" className="form-label float-end">
                    ${(values.PersonalOther * values.PersonalOtherType).toFixed(2)}

                  </label>
                    <Field
                    as='select'
                    id="PersonalOtherType"
                    name="PersonalOtherType"

                    className="form-select shadow  inputDesign"
                  >
                <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                    </Field>
                    < ErrorMessage name="PersonalOtherType" component="div"
                className="text-danger fw-bold" />

                    </div>
                    </div>
                  </div>
                  {/* Other */}

                  {/* Holidays */}
                  <div className="col-md-6">
                  
                  <div className="row">
                    <div className="col-7">
                    <label htmlFor="PersonalHolidays" className="form-label">
                    Holidays
                  </label>
                  <Field type="number" className="form-control inputDesign shadow"
                  name="PersonalHolidays" id="PersonalHolidays" placeholder="Holidays"/>
      < ErrorMessage name="PersonalHolidays" component="div"
                className="text-danger fw-bold" />

                    </div>
                    <div className="col-5">
                    <label   id="PersonalHolidaysValue" className="form-label float-end ">
                    ${(values.PersonalHolidays * values.PersonalHolidaysType).toFixed(2)}

                  </label>
                  <Field as='select'
                    id="PersonalHolidaysType"
                    name="PersonalHolidaysType"
                    className="form-select shadow  inputDesign"
                  >
                    <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                    </Field>
                    < ErrorMessage name="PersonalHolidaysType" component="div"
                className="text-danger fw-bold" />

                      </div>
                  </div>
                  
                  </div>
                  {/* Alcohol */}
                    </div>
                    {/* Personal row 4 */}

                    
                      {/* Personal row 5 */}
                      <div className="row  my-3">
                  
                  {/* Dining Out*/}
                    <div className="col-md-6">
                    <div className="row">
                    <div className="col-7">
                    <label htmlFor="PersonalDiningOut" className="form-label">
                    Dining Out
                  </label>
                  <Field type="number" className="form-control inputDesign shadow"
                  id="PersonalDiningOut" name="PersonalDiningOut" placeholder="Dining Out"/>
      < ErrorMessage name="PersonalDiningOut" component="div"
                className="text-danger fw-bold" />

                    </div>
                    <div className="col-5">
                    <label id="PersonalDiningOutValue" className="form-label float-end">
                    ${(values.PersonalDiningOut * values.PersonalDiningOutType).toFixed(2)}

                  </label>
                    <Field
                    as='select'
                    id="PersonalDiningOutType"
                    name="PersonalDiningOutType"
                    className="form-select shadow  inputDesign"
                  >
              <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                    
                    </Field>
                    < ErrorMessage name="PersonalDiningOutType" component="div"
                className="text-danger fw-bold" />

                    </div>
                    </div>
                  </div>
                  {/* Dining Out */}

                  {/* Mobile Phone */}
                  <div className="col-md-6">
                  
                  <div className="row">
                    <div className="col-7">
                    <label htmlFor="PersonalMobilePhone" className="form-label">
                    Mobile Phone
                  </label>
                  <Field type="number" className="form-control inputDesign shadow"
                  id="PersonalMobilePhone" name="PersonalMobilePhone" placeholder="Mobile Phone"/>
      < ErrorMessage name="PersonalMobilePhone" component="div"
                className="text-danger fw-bold" />

                    </div>
                    <div className="col-5">
                    <label   id="PersonalMobilePhoneValue" className="form-label float-end ">
                    ${(values.PersonalMobilePhone * values.PersonalMobilePhoneType).toFixed(2)}

                  </label>
                  <Field
                  as='select'
                    id="PersonalMobilePhoneType"
                    name="PersonalMobilePhoneType"

                    className="form-select shadow  inputDesign"
                  >
                    <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                    </Field>
                    < ErrorMessage name="PersonalMobilePhoneType" component="div"
                className="text-danger fw-bold" />

                      </div>
                  </div>
                  
                  </div>
                  {/* Mobile Phone */}
                      </div>
                      {/* Personal row 5 */}


                      {/* Personal row 5 */}
                      <div className="row  my-3">
                  
                  {/* Dining Out*/}
                    <div className="col-md-6">
                    <div className="row">
                    <div className="col-7">
                    <label htmlFor="PersonalMedicalExpenses" className="form-label">
                    Medical Expenses
                  </label>
                  <Field type="number" className="form-control inputDesign shadow"
                  id="PersonalMedicalExpenses"
                  name="PersonalMedicalExpenses" placeholder="Medical Expenses"/>
      < ErrorMessage name="PersonalMedicalExpenses" component="div"
                className="text-danger fw-bold" />

                    </div>
                    <div className="col-5">
                    <label id="PersonalMedicalExpensesValue" className="form-label float-end">
                    ${(values.PersonalMedicalExpenses * values.PersonalMedicalExpensesType).toFixed(2)}

                  </label>
                    <Field
                    as='select'
                    id="PersonalMedicalExpensesType"
                    name="PersonalMedicalExpensesType"
                    className="form-select shadow  inputDesign"
                  >
                  <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                    
                    </Field>
                    < ErrorMessage name="PersonalMedicalExpensesType" component="div"
                className="text-danger fw-bold" />

                    </div>
                    </div>
                  </div>
                  {/* Medical Expenses */}

                
                      </div>
                      {/* Personal row 6 */}
                      
                      
                      </div>
                </div>
              </Collapse>
                </div>
                {/* Personal*/}

                  {/* Transport */}
                <div className="row my-1 ">
              <div 
              onClick={() => setOpen3(!open3)}
              aria-controls=""
              aria-expanded={open3}
              className="bgColorIncome   py-2 text-light"
              >
                <div className="row">
                <div className="col-md-6">
                  <label className="form-label mb-0">Transport</label>
                </div>
                <div className="col-md-6">
                <label id="TransportTotalValue" className="float-end form-label mb-0">
                ${totalTransport.toFixed(2)}
                <div className="iconContainer mx-1">
              <img className="img-fluid" src={down} alt="" />

                </div></label>
                </div>
                </div>
                

              </div>
              <div>
                
              </div>
              <Collapse in={open3}>

                <div className="row">
                  <div className="col-md-12">

                    {/* TransportPetrol   row 1 */}
                    <div className="row  my-3">
                  {/* Petrol */}

                    <div className="col-md-6">
                    
                  <div className="row">
                    
                    <div className="col-7">
                    
                    <label htmlFor="TransportPetrol" className="form-label">
                    Petrol
                  </label>
                  <Field type="number" className="form-control inputDesign shadow"
                  name="TransportPetrol"
                  id="TransportPetrol" placeholder="Petrol"/>
      < ErrorMessage name="TransportPetrol" component="div"
                className="text-danger fw-bold" />

                    </div>
                    <div className="col-5">
                  
                    <label id="TransportPetrolValue" className="form-label float-end">
                    ${(values.TransportPetrol * values.TransportPetrolType).toFixed(2)}

                  </label>
                    <Field
                    as='select'
                    id="TransportPetrolType"
                    name="TransportPetrolType"

                    className="form-select shadow  inputDesign"
                  >
                  <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                  </Field>
                  < ErrorMessage name="TransportPetrolType" component="div"
                className="text-danger fw-bold" />

                    </div>
                  </div>
                    </div>
                  {/* Petrol */}

                  {/* Car Repairs & Maintenance */}
                  <div className="col-md-6">

                  <div className="row">
                      <div className="col-7">
                      <label htmlFor="TransportCarRepairs" className="form-label">
                      Car Maintenance
                    </label>
                    <Field type="number" className="form-control inputDesign shadow"
                    id="TransportCarRepairs"
                    name="TransportCarRepairs" placeholder="Car Repairs & Maintenance"/>
      < ErrorMessage name="TransportCarRepairs" component="div"
                className="text-danger fw-bold" />

                      </div>
                      <div className="col-5">
                      

                      <label id="TransportCarRepairsValue" className="form-label float-end">
                      ${(values.TransportCarRepairs * values.TransportCarRepairsType).toFixed(2)}

                    </label>
                      <Field
                      as='select'
                      id="TransportCarRepairsType"
                      name="TransportCarRepairsType"
                      className="form-select shadow  inputDesign"
                    >
                  <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                        </Field>
                        < ErrorMessage name="TransportCarRepairsType" component="div"
                className="text-danger fw-bold" />
                      </div>
                    </div>
                      </div>
                  {/* Electricity */}

                    </div>
                    {/* Transport   row 1 */}

                      {/* Transport  row 2 */}
                      <div className="row  my-3">
                  {/* Car Registration */}
                    <div className="col-md-6">
                    
                  <div className="row">
                    <div className="col-7">
                    <label htmlFor="TransportCarRegistration" className="form-label">
                    Car Registration
                  </label>
                  <Field type="number" className="form-control inputDesign shadow"
                  id="TransportCarRegistration"
                  name="TransportCarRegistration" placeholder="Car Registration"/>
      < ErrorMessage name="TransportCarRegistration" component="div"
                className="text-danger fw-bold" />

                    </div>
                    <div className="col-5">
                    <label id="TransportCarRegistrationValue" className="form-label float-end">
                    ${(values.TransportCarRegistration * values.TransportCarRegistrationType).toFixed(2)}

                  </label>
                    <Field
                    as='select'
                    id="TransportCarRegistrationType"
                    name="TransportCarRegistrationType"
                    className="form-select shadow  inputDesign"
                  >
                    <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                  </Field>
                  < ErrorMessage name="TransportCarRegistrationType" component="div"
                className="text-danger fw-bold" />
                    </div>
                  </div>
                    </div>
                  {/* Car Registration */}

                  {/* Public Transport */}
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-7">
                      <label htmlFor="PublicTransport" className="form-label">
                      Public Transport
                    </label>
                    <Field type="number" className="form-control inputDesign shadow"
                    id="PublicTransport" name="PublicTransport" placeholder="Public Transport"/>
      < ErrorMessage name="PublicTransport" component="div"
                className="text-danger fw-bold" />
                      </div>
                      <div className="col-5">
                      <label id="PublicTransportValue" className="form-label float-end">
                      ${(values.PublicTransport * values.PublicTransportType).toFixed(2)}

                    </label>
                      <Field
                      as='select'
                      id="PublicTransportType"
                      name="PublicTransportType"
                      className="form-select shadow  inputDesign"
                    >
                      <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                      </Field>
                      < ErrorMessage name="PublicTransportType" component="div"
                className="text-danger fw-bold" />
                      </div>
                    </div>
                  </div>
                  {/* Public Transport */}

                      </div>
                      {/* Transport   row 2 */}

                        {/* Transport  row 3 */}
                        <div className="row  my-3">
                    {/* Other*/}
                    <div className="col-md-6">
                    
                  <div className="row">
                    <div className="col-7">
                    <label htmlFor="TransportOther" className="form-label">
                    Other
                  </label>
                  <Field type="number" className="form-control inputDesign shadow"
                  id="TransportOther" name="TransportOther" placeholder="Other"/>
      < ErrorMessage name="TransportOther" component="div"
                className="text-danger fw-bold" />
                    </div>
                    <div className="col-5">
                    
                    <label id="TransportOtherValue" className="form-label float-end">
                    ${(values.TransportOther * values.TransportOtherType).toFixed(2)}

                  </label>
                    <Field
                    as='select'
                    name="TransportOtherType"
                    id="TransportOtherType"
                    className="form-select shadow  inputDesign"
                  >
              <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                    </Field>
                    < ErrorMessage name="TransportOtherType" component="div"
                className="text-danger fw-bold" />
                    </div>
                  </div>
                    </div>
                  {/* Car Registration */}

                </div>
                      {/* Transport   row 3 */}

                </div>
                </div>
              
              
            
              </Collapse>
                </div>
                {/* Transport   */}

                    {/* Insurance */}
                <div className="row my-1">
              <div 
              onClick={() => setOpen4(!open4)}
              aria-controls=""
              aria-expanded={open4}
              className="bgColorIncome   py-2 text-light"
              >
                <div className="row">
                <div className="col-md-6">
                  <label className="form-label mb-0">Insurance</label>
                </div>
                <div className="col-md-6">
                <label id="InsuranceTotalValue" className="float-end form-label mb-0">${totalInsurance.toFixed(2)}
                
                <div className="iconContainer mx-1">
              <img className="img-fluid" src={down} alt="" />

                </div></label>
                </div>
                </div>
                

              </div>
              <div>
                
              </div>
              <Collapse in={open4}>

                <div className="row">
                  <div className="col-md-12">

                    {/* Insurance   row 1 */}
                    <div className="row  my-3">
                  {/* Private Health */}

                    <div className="col-md-6">
                    
                  <div className="row">
                    
                    <div className="col-7">
                    <label htmlFor="PrivateHealth" className="form-label">
                    Private Health
                  </label>
                  <Field type="number" className="form-control inputDesign shadow"
                  id="PrivateHealth"
                  name="PrivateHealth" placeholder="Private Health"/>
      < ErrorMessage name="PrivateHealth" component="div"
                className="text-danger fw-bold" />
                    </div>
                    <div className="col-5">
                    <label id="PrivateHealthValue" className="form-label float-end">
                ${(values.PrivateHealth * values.PrivateHealthType).toFixed(2)}

                  </label>
                    <Field
                    as='select'
                    id="PrivateHealthType"
                    name="PrivateHealthType"
                    className="form-select shadow  inputDesign"
                  >
                <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                    </Field>
                    < ErrorMessage name="PrivateHealthType" component="div"
                className="text-danger fw-bold" />

                    </div>
                  </div>
                    </div>
                  {/* Private Health */}

                  {/* Life/TPD/Trauma */}
                  <div className="col-md-6">

                  <div className="row">
                      <div className="col-7">
                      <label htmlFor="LifeTPDTrauma" className="form-label">
                      Life/TPD/Trauma
                    </label>
                    <Field type="number" className="form-control inputDesign shadow"
                    id="LifeTPDTrauma" name="LifeTPDTrauma" placeholder="Life/TPD/Trauma"/>
      < ErrorMessage name="LifeTPDTrauma" component="div"
                className="text-danger fw-bold" />

                      </div>
                      <div className="col-5">
                  <label id="LifeTPDTraumaValue" className="form-label float-end">
              ${(values.LifeTPDTrauma * values.LifeTPDTraumaType).toFixed(2)}
                    
                    </label>
                      <Field
                      as="select"
                      id="LifeTPDTraumaType"
                      name="LifeTPDTraumaType"
                      className="form-select shadow  inputDesign"
                    >
                      <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                      </Field>

                      < ErrorMessage name="LifeTPDTraumaType" component="div"
                className="text-danger fw-bold" />

                      </div>
                    </div>
                      </div>
                  {/* Life/TPD/Trauma */}

                    </div>
                    {/* Insurance   row 1 */}

                      {/* Transport  row 2 */}
                      <div className="row  my-3">
                  {/* Income Protection */}
                    <div className="col-md-6">
                    
                  <div className="row">
                    <div className="col-7">
                    <label htmlFor="InsuranceIncomeProtection" className="form-label">
                    Income Protection
                  </label>
                  <Field name="InsuranceIncomeProtection"  type="number" className="form-control inputDesign shadow"
                  id="InsuranceIncomeProtection" placeholder="Income Protection"/>
      < ErrorMessage name="InsuranceIncomeProtection" component="div"
                className="text-danger fw-bold" />

                    </div>
                    <div className="col-5">
                    <label id="InsuranceIncomeProtectionValue" className="form-label float-end">
                  ${(values.InsuranceIncomeProtection * values.InsuranceIncomeProtectionType).toFixed(2)}

                  </label>
                    <Field
                    as="select"
                    id="InsuranceIncomeProtectionType"
                    name="InsuranceIncomeProtectionType"
                    className="form-select shadow  inputDesign"
                  >
          <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                    </Field>
                    < ErrorMessage name="InsuranceIncomeProtectionType" component="div"
                className="text-danger fw-bold" />

                    </div>
                  </div>
                    </div>
                  {/* Income Protection */}

                  {/* Car*/}
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-7">
                      <label htmlFor="InsuranceCar" className="form-label">
                      Car
                    </label>
                    <Field type="number" className="form-control inputDesign shadow"
                    id="InsuranceCar" name="InsuranceCar" placeholder="Car"/>
      < ErrorMessage name="InsuranceCar" component="div"
                className="text-danger fw-bold" />

                      </div>
                      <div className="col-5">
                      <label id="InsuranceCarValue" className="form-label float-end">
                  ${(values.InsuranceCar * values.InsuranceCarType).toFixed(2)}
                    
                    </label>
                      <Field
                      as="select"
                      id="InsuranceCarType"
                      name="InsuranceCarType"
                      className="form-select shadow  inputDesign"
                    >
                  <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                      </Field>
                      < ErrorMessage name="InsuranceCarType" component="div"
                className="text-danger fw-bold" />

                      </div>
                    </div>
                  </div>
                  {/* Car */}

                      </div>
                      {/* Insurance row 2 */}

                        {/* Insurance row 3 */}
                        <div className="row  my-3">
                          {/* Other*/}
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-7">
                        <label htmlFor="InsuranceHomeContents" className="form-label">
                        Home And Contents
                      </label>
                      <Field  type="number" className="form-control inputDesign shadow"
                      id="InsuranceHomeContents"
                      name="InsuranceHomeContents" placeholder="Home And Contents"/>
      < ErrorMessage name="InsuranceHomeContents" component="div"
                className="text-danger fw-bold" />

                        </div>
                        <div className="col-5">
                        <label id="InsuranceHomeContentsValue" className="form-label float-end">
      ${(values.InsuranceHomeContents * values.InsuranceHomeContentsType) .toFixed(2)}

                      </label>
                        <Field
                        as="select"
                        id="InsuranceHomeContentsType"
                        name="InsuranceHomeContentsType"
                        className="form-select shadow  inputDesign"
                      >
                      <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                        </Field>
                        < ErrorMessage name="InsuranceHomeContentsType" component="div"
                className="text-danger fw-bold" />

                        </div>
                      </div>
                    </div>
                  {/* Home And Contents */}
                    {/* Other*/}
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-7">
                        <label htmlFor="InsuranceOther" className="form-label">
                        Other
                      </label>
                      <Field type="number" className="form-control inputDesign shadow"
                      id="InsuranceOther" name="InsuranceOther" placeholder="Other"/>
                < ErrorMessage name="InsuranceOther" component="div"
                className="text-danger fw-bold" />

                        </div>
                        <div className="col-5">
                        <label id="TransInsuranceValue" className="form-label float-end">
            ${(values.InsuranceOther * values.TransInsuranceType).toFixed(2)}

                      </label>
                        <Field
                        as="select"
                        id="TransInsuranceType"
                        name="TransInsuranceType"
                        className="form-select shadow  inputDesign"
                      >
                    <option value="">Select</option>
                    <option value={4}>Weekly</option>
                    <option value={2}>Fortnightly</option>
                    <option value={1}>Monthly</option>
                    <option value={1/3}>Quarterly</option>
                    <option value={1/6}>Six-Monthly</option>
                    <option value={1/12}>Annually</option>
                        </Field>
                        < ErrorMessage name="TransInsuranceType" component="div"
                className="text-danger fw-bold" />

                        </div>
                      </div>
                    </div>
                  {/* Other */}

                </div>
                      {/* Insurance  row 3 */}

                </div>
                </div>
              
              
            
              </Collapse>
                </div>
                {/* Insurance    */}
              
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
                    onClick={() => { setInnerModal(false) }}
                  >
                    Cancel
                  </button>
                </div>
              </Modal.Footer>

            </Form>
            
            }
            
          </Formik>
        </Modal>
      
      
      
      
    </div>
  )
}

export default GeneralLivingExpenses
