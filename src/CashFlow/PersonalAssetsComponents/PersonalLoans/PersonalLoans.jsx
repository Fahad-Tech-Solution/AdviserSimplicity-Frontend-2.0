import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { differenceInYears, getDate } from "date-fns";
import Modal from "react-bootstrap/Modal";

import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "yup-phone";

//Images 
import plus from "./images/plus.svg";

const PersonalLoan = () => {
    let [PersonalLoanModal, setPersonalLoanModal] = useState(false); 
   
  let initialValues = {
      personalLoan:"No",
      personalLoanYearly:"",
      personalLoanCurrentBalance:"",
      personalLoanType:"",
      personalLoanTerm:"",
      personalLoanInterestRate:"",
      personalLoanRepayments:"",
      personalLoanApplyRepayments:"",
      personalLoanAnnualRepayments:"",
      personalLoanRepay:"",
      
      personalLoan1:"No",
      personalLoan1Yearly:"",
      personalLoan1CurrentBalance:"",
      personalLoan1Type:"",
      personalLoan1Term:"",
      personalLoan1InterestRate:"",
      personalLoan1Repayments:"",
      personalLoan1ApplyRepayments:"",
      personalLoan1AnnualRepayments:"",
      personalLoan1Repay:"",

      CreditCard:"No",
      CreditCardYearly:"",
      CreditCardCurrentBalance:"",
      CreditCardType:"",
      CreditCardTerm:"",
      CreditCardInterestRate:"",
      CreditCardRepayments:"",
      CreditCardApplyRepayments:"",
      CreditCardAnnualRepayments:"",
      CreditCardRepay:"",
      
      CreditCard2:"No",
      CreditCard2Yearly:"",
      CreditCard2CurrentBalance:"",
      CreditCard2Type:"",
      CreditCard2Term:"",
      CreditCard2InterestRate:"",
      CreditCard2Repayments:"",
      CreditCard2ApplyRepayments:"",
      CreditCard2AnnualRepayments:"",
      CreditCard2Repay:"",

    };
  
  let validationSchema = Yup.object().shape({
      
      personalLoanYearly:Yup.string().when("personalLoan", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      personalLoanCurrentBalance:Yup.string().when("personalLoan", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      personalLoanType: Yup.string().when("personalLoan", {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }),
      personalLoanTerm: Yup.string().when("personalLoan", {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }),
      personalLoanInterestRate:Yup.string().when("personalLoan", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      personalLoanRepayments:Yup.string().when("personalLoan", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      personalLoanApplyRepayments:Yup.string().when("personalLoan", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      personalLoanAnnualRepayments:Yup.string().when("personalLoan", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      personalLoanRepay:Yup.string().when("personalLoan", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),

      personalLoan1Yearly:Yup.string().when("personalLoan1", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      personalLoan1CurrentBalance:Yup.string().when("personalLoan1", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      personalLoan1Type:Yup.string().when("personalLoan1", {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }),
      personalLoan1Term:Yup.string().when("personalLoan1", {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }),
      personalLoan1InterestRate:Yup.string().when("personalLoan1", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      personalLoan1Repayments:Yup.string().when("personalLoan1", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      personalLoan1ApplyRepayments:Yup.string().when("personalLoan1", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      personalLoan1AnnualRepayments:Yup.string().when("personalLoan1", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      personalLoan1Repay:Yup.string().when("personalLoan1", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),

      CreditCardYearly:Yup.string().when("CreditCard", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      CreditCardCurrentBalance:Yup.string().when("CreditCard", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      CreditCardType:Yup.string().when("CreditCard", {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }),
      CreditCardTerm:Yup.string().when("CreditCard", {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }),
      CreditCardInterestRate:Yup.string().when("CreditCard", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      CreditCardRepayments:Yup.string().when("CreditCard", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      CreditCardApplyRepayments:Yup.string().when("CreditCard", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      CreditCardAnnualRepayments:Yup.string().when("CreditCard", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      CreditCardRepay:Yup.string().when("CreditCard", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      
      CreditCard2Yearly:Yup.string().when("CreditCard2", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      CreditCard2CurrentBalance:Yup.string().when("CreditCard2", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      
      CreditCard2Type:Yup.string().when("CreditCard2", {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }),
      CreditCard2Term:Yup.string().when("CreditCard2", {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }),
      
      CreditCard2InterestRate:Yup.string().when("CreditCard2", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      CreditCard2Repayments:Yup.string().when("CreditCard2", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      CreditCard2ApplyRepayments:Yup.string().when("CreditCard2", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      CreditCard2AnnualRepayments:Yup.string().when("CreditCard2", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
      CreditCard2Repay:Yup.string().when("CreditCard2", {
        is: (val) => val && val.length == 3,
        then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
        otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
      }),
        
    });
  
    function onSubmit(values) {
      console.log(values);
    }
  
  
  return (
    <div>
        <label className="form-label">Personal Loans and Credit Cards</label>
        <br/>
        <button type="button" className=" btn  btn-outline-success "
        onClick={()=>{setPersonalLoanModal(true);}}
        >
        <div className="iconContainer mx-1">
            <img className="img-fluid" src={plus} alt="" />
        </div>
        Enter Details
      </button>
      
      <Modal
      show={PersonalLoanModal}
      onHide={()=>{setPersonalLoanModal(false)}}
      backdrop="static"
      className="modal-xl"
      keyboard={false}
    >
      <Modal.Header
        className="text-light modalBG "
        closeButton
      >
        <Modal.Title className="fontStyle">
            Personal Loans and Credit Cards
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

              <div className="row">
              <div className="col-md-12">
                <h3>Personal Loan 1 </h3>
                <div className="form-check form-switch m-0 p-0 ">
                <div className="radiobutton">
                  <input type="radio" name="personalLoan" id="personalLoan1"
                    value="Yes" onChange={handleChange} checked={values.personalLoan == "Yes"}
                  />
                  <label htmlFor="personalLoan1" className="label1">
                    <span>YES</span>
                  </label>
                  <input type="radio" name="personalLoan" id="personalLoan2"
                    value="No" onChange={handleChange} checked={values.personalLoan == "No"}/>
                  <label htmlFor="personalLoan2" className="label2">
                    <span>NO</span>
                  </label>
                </div>
                </div>
              </div>
            </div>
              
            <div className="row mt-3">
            <div className="col-md-3">
              <label htmlFor="personalLoanYearly" className="form-label">  Year of Loan  </label>
              <Field type="number" className="form-control shadow inputDesign" id="personalLoanYearly"
              name="personalLoanYearly" placeholder="$00.00"  disabled={values.personalLoan==="Yes"? false :  true} />
              <ErrorMessage component="div" className="text-danger fw-bold" name="personalLoanYearly" />
            </div>

            <div className="col-md-3">
              <label htmlFor="personalLoanCurrentBalance" className="form-label">  Current Loan Balance  </label>
              <Field type="number" className="form-control shadow inputDesign" id="personalLoanCurrentBalance"
              name="personalLoanCurrentBalance" placeholder="$00.00"  disabled={values.personalLoan==="Yes"? false :  true} />
              <ErrorMessage component="div" className="text-danger fw-bold" name="personalLoanCurrentBalance" />
            </div>
            
            <div className="col-md-3">
            <label htmlFor="personalLoanType" className="form-label">  Loan Type  </label>
            <Field type="text" className="form-control shadow inputDesign" id="personalLoanType"
            name="personalLoanType" placeholder=" Loan Type "  disabled={values.personalLoan==="Yes"? false :  true} />
            <ErrorMessage component="div" className="text-danger fw-bold" name="personalLoanType" />
            </div>
            
            <div className="col-md-3">
            <label htmlFor="personalLoanTerm" className="form-label">  Loan Term  </label>
            <Field type="text" className="form-control shadow inputDesign" id="personalLoanTerm"
            name="personalLoanTerm" placeholder=" Loan Term "  disabled={values.personalLoan==="Yes"? false :  true} />
            <ErrorMessage component="div" className="text-danger fw-bold" name="personalLoanTerm" />
                    </div>
                    
            </div>
            
            <div className="row mt-3">
            
            <div className="col-md-3">
            <label htmlFor="personalLoanInterestRate" className="form-label">  Initial Interest Rate (p.a.)  </label>
            <Field type="number" className="form-control shadow inputDesign" id="personalLoanInterestRate"
            name="personalLoanInterestRate" placeholder="$00.00"  disabled={values.personalLoan==="Yes"? false :  true} />
            <ErrorMessage component="div" className="text-danger fw-bold" name="personalLoanInterestRate" />
            </div>
            
            <div className="col-md-3">
            <label htmlFor="personalLoanRepayments" className="form-label">  Minimum Repayments (p.a.)  </label>
            <Field type="number" className="form-control shadow inputDesign" id="personalLoanRepayments"
            name="personalLoanRepayments" placeholder="$00.00"  disabled={values.personalLoan==="Yes"? false :  true} />
            <ErrorMessage component="div" className="text-danger fw-bold" name="personalLoanRepayments" />
            </div>
            
            <div className="col-md-3">
            <label htmlFor="personalLoanApplyRepayments" className="form-label">  Apply Minimum Repayments </label>
            <Field type="number" className="form-control shadow inputDesign" id="personalLoanApplyRepayments"
            name="personalLoanApplyRepayments" placeholder="$00.00"  disabled={values.personalLoan==="Yes"? false :  true} />
            <ErrorMessage component="div" className="text-danger fw-bold" name="personalLoanApplyRepayments" />
            </div>       
            
                    
            <div className="col-md-3">
            <label htmlFor="personalLoanAnnualRepayments" className="form-label">  Apply Annual Repayments </label>
            <Field type="number" className="form-control shadow inputDesign" id="personalLoanAnnualRepayments"
            name="personalLoanAnnualRepayments" placeholder="$00.00"  disabled={values.personalLoan==="Yes"? false :  true} />
            <ErrorMessage component="div" className="text-danger fw-bold" name="personalLoanAnnualRepayments" />
            </div>  
            
            </div>
                  
            <div className="row">
            <div className="col-md-3">
            <label htmlFor="personalLoanRepay" className="form-label"> Repay Loan in Year </label>
            <Field type="number" className="form-control shadow inputDesign" id="personalLoanRepay"
            name="personalLoanRepay" placeholder="$00.00"  disabled={values.personalLoan==="Yes"? false :  true} />
            <ErrorMessage component="div" className="text-danger fw-bold" name="personalLoanRepay" />
            </div>  
            </div>
          
          <hr/>
          
              <div className="row">
              <div className="col-md-12">
                <h3>Personal Loan 2 </h3>
                <div className="form-check form-switch m-0 p-0 ">
                <div className="radiobutton">
                  <input type="radio" name="personalLoan1" id="personalLoan11"
                    value="Yes" onChange={handleChange} checked={values.personalLoan1 == "Yes"}
                  />
                  <label htmlFor="personalLoan11" className="label1">
                    <span>YES</span>
                  </label>
                  <input type="radio" name="personalLoan1" id="personalLoan12"
                    value="No" onChange={handleChange} checked={values.personalLoan1 == "No"}/>
                  <label htmlFor="personalLoan12" className="label2">
                    <span>NO</span>
                  </label>
                </div>
                </div>
              </div>
            </div>
              
            <div className="row mt-3">
            <div className="col-md-3">
              <label htmlFor="personalLoan1Yearly" className="form-label">  Year of Loan  </label>
              <Field type="number" className="form-control shadow inputDesign" id="personalLoan1Yearly"
              name="personalLoan1Yearly" placeholder="$00.00"  disabled={values.personalLoan1==="Yes"? false :  true} />
              <ErrorMessage component="div" className="text-danger fw-bold" name="personalLoan1Yearly" />
            </div>

            <div className="col-md-3">
              <label htmlFor="personalLoan1CurrentBalance" className="form-label">  Current Loan Balance  </label>
              <Field type="number" className="form-control shadow inputDesign" id="personalLoan1CurrentBalance"
              name="personalLoan1CurrentBalance" placeholder="$00.00"  disabled={values.personalLoan1==="Yes"? false :  true} />
              <ErrorMessage component="div" className="text-danger fw-bold" name="personalLoan1CurrentBalance" />
            </div>
            
            <div className="col-md-3">
            <label htmlFor="personalLoan1Type" className="form-label">  Loan Type  </label>
            <Field type="text" className="form-control shadow inputDesign" id="personalLoan1Type"
            name="personalLoan1Type" placeholder=" Loan Type "  disabled={values.personalLoan1==="Yes"? false :  true} />
            <ErrorMessage component="div" className="text-danger fw-bold" name="personalLoan1Type" />
            </div>
            
            <div className="col-md-3">
            <label htmlFor="personalLoan1Term" className="form-label">  Loan Term  </label>
            <Field type="text" className="form-control shadow inputDesign" id="personalLoan1Term"
            name="personalLoan1Term" placeholder="Loan Term"  disabled={values.personalLoan1==="Yes"? false :  true} />
            <ErrorMessage component="div" className="text-danger fw-bold" name="personalLoan1Term" />
                    </div>
                    
            </div>
            
            <div className="row mt-3">
            
            <div className="col-md-3">
            <label htmlFor="personalLoan1InterestRate" className="form-label">  Initial Interest Rate (p.a.)  </label>
            <Field type="number" className="form-control shadow inputDesign" id="personalLoan1InterestRate"
            name="personalLoan1InterestRate" placeholder="$00.00"  disabled={values.personalLoan1==="Yes"? false :  true} />
            <ErrorMessage component="div" className="text-danger fw-bold" name="personalLoan1InterestRate" />
            </div>
            
            <div className="col-md-3">
            <label htmlFor="personalLoan1Repayments" className="form-label">  Minimum Repayments (p.a.)  </label>
            <Field type="number" className="form-control shadow inputDesign" id="personalLoan1Repayments"
            name="personalLoan1Repayments" placeholder="$00.00"  disabled={values.personalLoan1==="Yes"? false :  true} />
            <ErrorMessage component="div" className="text-danger fw-bold" name="personalLoan1Repayments" />
            </div>
            
            <div className="col-md-3">
            <label htmlFor="personalLoan1ApplyRepayments" className="form-label">  Apply Minimum Repayments </label>
            <Field type="number" className="form-control shadow inputDesign" id="personalLoan1ApplyRepayments"
            name="personalLoan1ApplyRepayments" placeholder="$00.00"  disabled={values.personalLoan1==="Yes"? false :  true} />
            <ErrorMessage component="div" className="text-danger fw-bold" name="personalLoan1ApplyRepayments" />
            </div>       
            
                    
            <div className="col-md-3">
            <label htmlFor="personalLoan1AnnualRepayments" className="form-label">  Apply Annual Repayments </label>
            <Field type="number" className="form-control shadow inputDesign" id="personalLoan1AnnualRepayments"
            name="personalLoan1AnnualRepayments" placeholder="$00.00"  disabled={values.personalLoan1==="Yes"? false :  true} />
            <ErrorMessage component="div" className="text-danger fw-bold" name="personalLoan1AnnualRepayments" />
            </div>  
            
            </div>
                  
            <div className="row">
            <div className="col-md-3">
            <label htmlFor="personalLoan1Repay" className="form-label"> Repay Loan in Year </label>
            <Field type="number" className="form-control shadow inputDesign" id="personalLoan1Repay"
            name="personalLoan1Repay" placeholder="$00.00"  disabled={values.personalLoan1==="Yes"? false :  true} />
            <ErrorMessage component="div" className="text-danger fw-bold" name="personalLoan1Repay" />
            </div>  
            </div>
        
        <hr/>

            <div className="row">
            <div className="col-md-12">
              <h3>Credit Card 1</h3>
              <div className="form-check form-switch m-0 p-0 ">
              <div className="radiobutton">
                <input type="radio" name="CreditCard" id="CreditCard1"
                  value="Yes" onChange={handleChange} checked={values.CreditCard == "Yes"}
                />
                <label htmlFor="CreditCard1" className="label1">
                  <span>YES</span>
                </label>
                <input type="radio" name="CreditCard" id="CreditCard2"
                  value="No" onChange={handleChange} checked={values.CreditCard == "No"}/>
                <label htmlFor="CreditCard2" className="label2">
                  <span>NO</span>
                </label>
              </div>
              </div>
            </div>
          </div>
            
          <div className="row mt-3">
          <div className="col-md-3">
            <label htmlFor="CreditCardYearly" className="form-label">  Year of Loan  </label>
            <Field type="number" className="form-control shadow inputDesign" id="CreditCardYearly"
            name="CreditCardYearly" placeholder="$00.00"  disabled={values.CreditCard==="Yes"? false :  true} />
            <ErrorMessage component="div" className="text-danger fw-bold" name="CreditCardYearly" />
          </div>

          <div className="col-md-3">
            <label htmlFor="CreditCardCurrentBalance" className="form-label">  Current Loan Balance  </label>
            <Field type="number" className="form-control shadow inputDesign" id="CreditCardCurrentBalance"
            name="CreditCardCurrentBalance" placeholder="$00.00"  disabled={values.CreditCard==="Yes"? false :  true} />
            <ErrorMessage component="div" className="text-danger fw-bold" name="CreditCardCurrentBalance" />
          </div>
          
          <div className="col-md-3">
          <label htmlFor="CreditCardType" className="form-label">  Loan Type  </label>
          <Field type="text" className="form-control shadow inputDesign" id="CreditCardType"
          name="CreditCardType" placeholder="Loan Type"  disabled={values.CreditCard==="Yes"? false :  true} />
          <ErrorMessage component="div" className="text-danger fw-bold" name="CreditCardType" />
          </div>
          
          <div className="col-md-3">
          <label htmlFor="CreditCardTerm" className="form-label">  Loan Term  </label>
          <Field type="text" className="form-control shadow inputDesign" id="CreditCardTerm"
          name="CreditCardTerm" placeholder="Loan Term"  disabled={values.CreditCard==="Yes"? false :  true} />
          <ErrorMessage component="div" className="text-danger fw-bold" name="CreditCardTerm" />
                  </div>
                  
          </div>
          
          <div className="row mt-3">
          
          <div className="col-md-3">
          <label htmlFor="CreditCardInterestRate" className="form-label">  Initial Interest Rate (p.a.)  </label>
          <Field type="number" className="form-control shadow inputDesign" id="CreditCardInterestRate"
          name="CreditCardInterestRate" placeholder="$00.00"  disabled={values.CreditCard==="Yes"? false :  true} />
          <ErrorMessage component="div" className="text-danger fw-bold" name="CreditCardInterestRate" />
          </div>
          
          <div className="col-md-3">
          <label htmlFor="CreditCardRepayments" className="form-label">  Minimum Repayments (p.a.)  </label>
          <Field type="number" className="form-control shadow inputDesign" id="CreditCardRepayments"
          name="CreditCardRepayments" placeholder="$00.00"  disabled={values.CreditCard==="Yes"? false :  true} />
          <ErrorMessage component="div" className="text-danger fw-bold" name="CreditCardRepayments" />
          </div>
          
          <div className="col-md-3">
          <label htmlFor="CreditCardApplyRepayments" className="form-label">  Apply Minimum Repayments </label>
          <Field type="number" className="form-control shadow inputDesign" id="CreditCardApplyRepayments"
          name="CreditCardApplyRepayments" placeholder="$00.00"  disabled={values.CreditCard==="Yes"? false :  true} />
          <ErrorMessage component="div" className="text-danger fw-bold" name="CreditCardApplyRepayments" />
          </div>       
          
                  
          <div className="col-md-3">
          <label htmlFor="CreditCardAnnualRepayments" className="form-label">  Apply Annual Repayments </label>
          <Field type="number" className="form-control shadow inputDesign" id="CreditCardAnnualRepayments"
          name="CreditCardAnnualRepayments" placeholder="$00.00"  disabled={values.CreditCard==="Yes"? false :  true} />
          <ErrorMessage component="div" className="text-danger fw-bold" name="CreditCardAnnualRepayments" />
          </div>  
          
          </div>
                
          <div className="row">
          <div className="col-md-3">
          <label htmlFor="CreditCardRepay" className="form-label"> Repay Loan in Year </label>
          <Field type="number" className="form-control shadow inputDesign" id="CreditCardRepay"
          name="CreditCardRepay" placeholder="$00.00"  disabled={values.CreditCard==="Yes"? false :  true} />
          <ErrorMessage component="div" className="text-danger fw-bold" name="CreditCardRepay" />
          </div>  
          </div>
          <hr/>

          <div className="row">
          <div className="col-md-12">
            <h3>Credit Card 2</h3>
            <div className="form-check form-switch m-0 p-0 ">
            <div className="radiobutton">
              <input type="radio" name="CreditCard2" id="CreditCard21"
                value="Yes" onChange={handleChange} checked={values.CreditCard2 == "Yes"}
              />
              <label htmlFor="CreditCard21" className="label1">
                <span>YES</span>
              </label>
              <input type="radio" name="CreditCard2" id="CreditCard22"
                value="No" onChange={handleChange} checked={values.CreditCard2 == "No"}/>
              <label htmlFor="CreditCard22" className="label2">
                <span>NO</span>
              </label>
            </div>
            </div>
          </div>
        </div>
          
        <div className="row mt-3">
        <div className="col-md-3">
          <label htmlFor="CreditCard2Yearly" className="form-label">  Year of Loan  </label>
          <Field type="number" className="form-control shadow inputDesign" id="CreditCard2Yearly"
          name="CreditCard2Yearly" placeholder="$00.00"  disabled={values.CreditCard2==="Yes"? false :  true} />
          <ErrorMessage component="div" className="text-danger fw-bold" name="CreditCard2Yearly" />
        </div>

        <div className="col-md-3">
          <label htmlFor="CreditCard2CurrentBalance" className="form-label">  Current Loan Balance  </label>
          <Field type="number" className="form-control shadow inputDesign" id="CreditCard2CurrentBalance"
          name="CreditCard2CurrentBalance" placeholder="$00.00"  disabled={values.CreditCard2==="Yes"? false :  true} />
          <ErrorMessage component="div" className="text-danger fw-bold" name="CreditCard2CurrentBalance" />
        </div>
        
        <div className="col-md-3">
        <label htmlFor="CreditCard2Type" className="form-label">  Loan Type  </label>
        <Field type="text" className="form-control shadow inputDesign" id="CreditCard2Type"
        name="CreditCard2Type" placeholder="Loan Type"  disabled={values.CreditCard2==="Yes"? false :  true} />
        <ErrorMessage component="div" className="text-danger fw-bold" name="CreditCard2Type" />
        </div>
        
        <div className="col-md-3">
        <label htmlFor="CreditCard2Term" className="form-label">  Loan Term  </label>
        <Field type="text" className="form-control shadow inputDesign" id="CreditCard2Term"
        name="CreditCard2Term" placeholder="Loan Term"  disabled={values.CreditCard2==="Yes"? false :  true} />
        <ErrorMessage component="div" className="text-danger fw-bold" name="CreditCard2Term" />
                </div>
                
        </div>
        
        <div className="row mt-3">
        
        <div className="col-md-3">
        <label htmlFor="CreditCard2InterestRate" className="form-label">  Initial Interest Rate (p.a.)  </label>
        <Field type="number" className="form-control shadow inputDesign" id="CreditCard2InterestRate"
        name="CreditCard2InterestRate" placeholder="$00.00"  disabled={values.CreditCard2==="Yes"? false :  true} />
        <ErrorMessage component="div" className="text-danger fw-bold" name="CreditCard2InterestRate" />
        </div>
        
        <div className="col-md-3">
        <label htmlFor="CreditCard2Repayments" className="form-label">  Minimum Repayments (p.a.)  </label>
        <Field type="number" className="form-control shadow inputDesign" id="CreditCard2Repayments"
        name="CreditCard2Repayments" placeholder="$00.00"  disabled={values.CreditCard2==="Yes"? false :  true} />
        <ErrorMessage component="div" className="text-danger fw-bold" name="CreditCard2Repayments" />
        </div>
        
        <div className="col-md-3">
        <label htmlFor="CreditCard2ApplyRepayments" className="form-label">  Apply Minimum Repayments </label>
        <Field type="number" className="form-control shadow inputDesign" id="CreditCard2ApplyRepayments"
        name="CreditCard2ApplyRepayments" placeholder="$00.00"  disabled={values.CreditCard2==="Yes"? false :  true} />
        <ErrorMessage component="div" className="text-danger fw-bold" name="CreditCard2ApplyRepayments" />
        </div>       
        
                
        <div className="col-md-3">
        <label htmlFor="CreditCard2AnnualRepayments" className="form-label">  Apply Annual Repayments </label>
        <Field type="number" className="form-control shadow inputDesign" id="CreditCard2AnnualRepayments"
        name="CreditCard2AnnualRepayments" placeholder="$00.00"  disabled={values.CreditCard2==="Yes"? false :  true} />
        <ErrorMessage component="div" className="text-danger fw-bold" name="CreditCard2AnnualRepayments" />
        </div>  
        
        </div>
              
        <div className="row">
        <div className="col-md-3">
        <label htmlFor="CreditCard2Repay" className="form-label"> Repay Loan in Year </label>
        <Field type="number" className="form-control shadow inputDesign" id="CreditCard2Repay"
        name="CreditCard2Repay" placeholder="$00.00"  disabled={values.CreditCard2==="Yes"? false :  true} />
        <ErrorMessage component="div" className="text-danger fw-bold" name="CreditCard2Repay" />
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
                  onClick={()=>{setPersonalLoanModal(false)}}
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
  )
}

export default PersonalLoan
