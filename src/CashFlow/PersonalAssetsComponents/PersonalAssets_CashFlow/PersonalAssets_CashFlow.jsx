import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import { differenceInYears, getDate } from "date-fns";
import Modal from "react-bootstrap/Modal";

import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "yup-phone";

//Images 
import plus from "./images/plus.svg";

const PersonalAssets_CashFlow = () => {
  let [LumpsumPurchasesModal, setLumpsumPurchasesModal] = useState(false);
  let [LumpsumPurchases, setLumpsumPurchases] = useState([]);


  let initialValues = {
    Contents: "Yes",
    currentValueContents: "",
    sellInYearContents: "",
    newPurchaseContents: "",
    purchaseInYearContents: "",
    IndexationContents: "",

    MotorVehicle1: "No",
    currentValueMotorVehicle1: "",
    sellInYearMotorVehicle1: "",
    newPurchaseMotorVehicle1: "",
    purchaseInYearMotorVehicle1: "",
    IndexationMotorVehicle1: "",

    MotorVehicle2: "No",
    currentValueMotorVehicle2: "",
    sellInYearMotorVehicle2: "",
    newPurchaseMotorVehicle2: "",
    purchaseInYearMotorVehicle2: "",
    IndexationMotorVehicle2: "",
    
    Boat: "No",
    currentValueBoat: "",
    sellInYearBoat: "",
    newPurchaseBoat: "",
    purchaseInYearBoat: "",
    IndexationBoat: "",
    Caravan: "No",
    currentValueCaravan: "",
    sellInYearCaravan: "",
    newPurchaseCaravan: "",
    purchaseInYearCaravan: "",
    IndexationCaravan: "",
    Other: "No",
    currentValueOther: "",
    sellInYearOther: "",
    newPurchaseOther: "",
    purchaseInYearOther: "",
    IndexationOther: "",
    OtherLifestyleAssets: "No"
  };

  let validationSchema = Yup.object().shape({
    // Contents
    currentValueContents: Yup.number().when("Contents", {
            is: (val) => val && val.length === 3,
            then: Yup.number()
              .required("Required")
              .min(0, "Must be a positive number"),
            otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
          }),
    sellInYearContents: Yup.string().when("Contents", {
      is: (val) => val && val.length === 3,
      then: Yup.string().when("sellInYearContents", {
        is: (val) => val && val == "NO",
        then: Yup.string().notRequired(""),
        otherwise: Yup.string()
        .required('Sell Year is required')
        .test('is-greater', 'Sell Year must be greater than Purchase Year', function(value) {
          const fromYear = parseInt(this.resolve(Yup.ref('purchaseInYearContents')));
          const toYear = parseInt(value);
          return toYear >= fromYear;
            }),
      }),
      otherwise: Yup.string().test('is-greater', 'Sell Year must be greater than Purchase Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('purchaseInYearContents')));
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true), 
    }), 
    newPurchaseContents: Yup.number().when("Contents", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),
    purchaseInYearContents: Yup.string().when("Contents", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }),
    IndexationContents: Yup.string().when("Contents", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }),

    // MotorVehicle1
    currentValueMotorVehicle1: Yup.number().when("MotorVehicle1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),
    newPurchaseMotorVehicle1: Yup.number().when("MotorVehicle1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),
    sellInYearMotorVehicle1: Yup.string().when("MotorVehicle1", {
      is: (val) => val && val.length === 3,
      then: Yup.string().when("sellInYearMotorVehicle1", {
        is: (val) => val && val == "NO",
        then: Yup.string().notRequired(""),
        otherwise: Yup.string()
        .required('Sell Year is required')
        .test('is-greater', 'Sell Year must be greater than Purchase Year', function(value) {
          const fromYear = parseInt(this.resolve(Yup.ref('purchaseInYearMotorVehicle1')));
          const toYear = parseInt(value);
          return toYear >= fromYear;
            }),
      }),
      otherwise: Yup.string().test('is-greater', 'Sell Year must be greater than Purchase Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('purchaseInYearMotorVehicle1')));
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true), 
    }), 
    purchaseInYearMotorVehicle1: Yup.string().when("MotorVehicle1", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }),
    IndexationMotorVehicle1:Yup.string().when("MotorVehicle1", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }), 

    // MotorVehicle2
    currentValueMotorVehicle2: Yup.number().when("MotorVehicle2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),
    newPurchaseMotorVehicle2: Yup.number().when("MotorVehicle2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),
    purchaseInYearMotorVehicle2:Yup.string().when("MotorVehicle2", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }), 
    IndexationMotorVehicle2:Yup.string().when("MotorVehicle2", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }), 
    sellInYearMotorVehicle2:Yup.string().when("MotorVehicle2", {
      is: (val) => val && val.length === 3,
      then: Yup.string().when("sellInYearMotorVehicle2", {
        is: (val) => val && val == "NO",
        then: Yup.string().notRequired(""),
        otherwise: Yup.string()
        .required('Sell Year is required')
        .test('is-greater', 'Sell Year must be greater than Purchase Year', function(value) {
          const fromYear = parseInt(this.resolve(Yup.ref('purchaseInYearMotorVehicle2')));
          const toYear = parseInt(value);
          return toYear >= fromYear;
            }),
      }),
      otherwise: Yup.string().test('is-greater', 'Sell Year must be greater than Purchase Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('purchaseInYearMotorVehicle2')));
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }), 

    // Boat
    currentValueBoat: Yup.number().when("Boat", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),
    newPurchaseBoat: Yup.number().when("Boat", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),
    sellInYearBoat:Yup.string().when("Boat", {
      is: (val) => val && val.length === 3,
      then: Yup.string().when("sellInYearBoat", {
        is: (val) => val && val == "NO",
        then: Yup.string().notRequired(""),
        otherwise: Yup.string()
        .required('Sell Year is required')
        .test('is-greater', 'Sell Year must be greater than Purchase Year', function(value) {
          const fromYear = parseInt(this.resolve(Yup.ref('purchaseInYearBoat')));
          const toYear = parseInt(value);
          return toYear >= fromYear;
            }),
      }),
      otherwise: Yup.string().test('is-greater', 'Sell Year must be greater than Purchase Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('purchaseInYearBoat')));
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }), 
    purchaseInYearBoat:Yup.string().when("Boat", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }), 
    IndexationBoat:Yup.string().when("Boat", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }), 

    // Caravan
    currentValueCaravan: Yup.number().when("Caravan", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),
    newPurchaseCaravan: Yup.number().when("Caravan", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),
    sellInYearCaravan:Yup.string().when("Caravan", {
      is: (val) => val && val.length === 3,
      then: Yup.string().when("sellInYearCaravan", {
        is: (val) => val && val == "NO",
        then: Yup.string().notRequired(""),
        otherwise: Yup.string()
        .required('Sell Year is required')
        .test('is-greater', 'Sell Year must be greater than Purchase Year', function(value) {
          const fromYear = parseInt(this.resolve(Yup.ref('purchaseInYearCaravan')));
          const toYear = parseInt(value);
          return toYear >= fromYear;
            }),
      }),
      otherwise: Yup.string().test('is-greater', 'Sell Year must be greater than Purchase Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('purchaseInYearCaravan')));
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }), 
    purchaseInYearCaravan:Yup.string().when("Caravan", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }), 
    IndexationCaravan:Yup.string().when("Caravan", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }), 

    //other
    currentValueOther:Yup.number().when("Other", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),
    newPurchaseOther:Yup.number().when("Other", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),
    sellInYearOther:Yup.string().when("Other", {
      is: (val) => val && val.length === 3,
      then: Yup.string().when("sellInYearOther", {
        is: (val) => val && val == "NO",
        then: Yup.string().notRequired(""),
        otherwise: Yup.string()
        .required('Sell Year is required')
        .test('is-greater', 'Sell Year must be greater than Purchase Year', function(value) {
          const fromYear = parseInt(this.resolve(Yup.ref('purchaseInYearOther')));
          const toYear = parseInt(value);
          return toYear >= fromYear;
            }),
      }),
      otherwise: Yup.string().test('is-greater', 'Sell Year must be greater than Purchase Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('purchaseInYearOther')));
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }), 
    purchaseInYearOther:Yup.string().when("Other", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }), 
    IndexationOther:Yup.string().when("Other", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(""),
    }), 

  });

  function onSubmit(values, { resetForm }) {
    console.log(values);
    let data = {
      Boat: "Yes",
    };

    setLumpsumPurchases([...LumpsumPurchases, data]);
    resetForm();
  }


  const isLoggedIn = false;
  return (
    <div>
      <label className="form-label">Personal Assets</label>
      <br />
      <button type="button" className=" btn w-50 btn-outline-success "
        onClick={() => { setLumpsumPurchasesModal(true); }}
      >
        <div className="iconContainer mx-1">
          <img className="img-fluid" src={plus} alt="" />
        </div>
        Enter Details
      </button>


      <Modal
        show={LumpsumPurchasesModal}
        onHide={() => { setLumpsumPurchasesModal(false) }}
        backdrop="static"
        className="modal-xl"
        keyboard={false}
      >
        <Modal.Header
          className="text-light modalBG "
          closeButton
        >
          <Modal.Title className="fontStyle">
            Personal Assets
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
                {/* Personal Assets cash flow */}
                <div className="row">
                  <div className="col-md-12">
                    <h3>Contents</h3>
                    <div className="form-check form-switch m-0 p-0 ">
                      <div className="radiobutton">
                        <input type="radio" name="Contents" id="Contents1"
                          value="Yes" onChange={handleChange} checked={values.Contents == "Yes"}
                        />
                        <label htmlFor="Contents1" className="label1">
                          <span>YES</span>
                        </label>
                        <input type="radio" name="Contents" id="Contents2"
                          value="No" onChange={handleChange} checked={values.Contents == "No"} />
                        <label htmlFor="Contents2" className="label2">
                          <span>NO</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-3">
                    <label htmlFor="currentValueContents" className="form-label">  Current Value </label>
                    <Field type="number" className="form-control shadow inputDesign" id="currentValueContents"
                      name="currentValueContents" placeholder="$00.00" disabled={values.Contents == "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="currentValueContents" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="sellInYearContents" className="form-label"> Sell in Year</label>
                    <Field as="select" className="form-select shadow inputDesign" id="sellInYearContents"
                      name="sellInYearContents" placeholder="sellInYearContents" disabled={values.Contents == "Yes" ? false : true} >
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="sellInYearContents" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="newPurchaseContents" className="form-label">  New Purchase  </label>
                    <Field type="number" className="form-control shadow inputDesign" id="newPurchaseContents"
                      name="newPurchaseContents" placeholder="$00.00" disabled={values.Contents === "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="newPurchaseContents" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="purchaseInYearContents" className="form-label"> Purchase in Year</label>
                    <Field as="select" className="form-select shadow inputDesign" id="purchaseInYearContents"
                      name="purchaseInYearContents" placeholder="purchaseInYearContents" disabled={values.Contents === "Yes" ? false : true}>
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="purchaseInYearContents" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <label htmlFor="IndexationContents" className="form-label"> Indexation</label>
                    <Field as="select" className="form-select shadow inputDesign" id="IndexationContents"
                      name="IndexationContents" placeholder="IndexationContents" disabled={values.Contents === "Yes" ? false : true} >
                      <option value="">Select</option>
                      <option value="-0.00%">-0.00%</option>
                      <option value="-0.50%">-0.50%</option>
                      <option value="-1.00%">-1.00%</option>
                      <option value="-1.50%">-1.50%</option>
                      <option value="-2.00%">-2.00%</option>
                      <option value="-2.50%">-2.50%</option>
                      <option value="-3.00%">-3.00%</option>
                      <option value="-3.50%">-3.50%</option>
                      <option value="-4.00%">-4.00%</option>
                      <option value="-4.50%">-4.50%</option>
                      <option value="-5.00%">-5.00%</option>
                      <option value="0.00%">0.00%</option>
                      <option value="0.50%">0.50%</option>
                      <option value="1.00%">1.00%</option>
                      <option value="1.50%">1.50%</option>
                      <option value="2.00%">2.00%</option>
                      <option value="2.50%">2.50%</option>
                      <option value="3.00%">3.00%</option>
                      <option value="3.50%">3.50%</option>
                      <option value="4.00%">4.00%</option>
                      <option value="4.50% ">4.50% </option>
                      <option value="5.00%">5.00%</option>
                    </Field>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="IndexationContents" />
                  </div>
                </div>
                <hr />
                {/* Motor Vehicle 1 */}
                <div className="row">
                  <div className="col-md-12">
                    <h3>Motor Vehicle 1</h3>
                    <div className="form-check form-switch m-0 p-0 ">
                      <div className="radiobutton">
                        <input type="radio" name="MotorVehicle1" id="MotorVehicle11"
                          value="Yes" onChange={handleChange} checked={values.MotorVehicle1 == "Yes"}
                        />
                        <label htmlFor="MotorVehicle11" className="label1">
                          <span>YES</span>
                        </label>
                        <input type="radio" name="MotorVehicle1" id="MotorVehicle12"
                          value="No" onChange={handleChange} checked={values.MotorVehicle1 == "No"} />
                        <label htmlFor="MotorVehicle12" className="label2">
                          <span>NO</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-3">
                    <label htmlFor="currentValueMotorVehicle1" className="form-label">  Current Value </label>
                    <Field type="number" className="form-control shadow inputDesign" id="currentValueMotorVehicle1"
                      name="currentValueMotorVehicle1" placeholder="$00.00" disabled={values.MotorVehicle1 == "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="currentValueMotorVehicle1" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="sellInYearMotorVehicle1" className="form-label"> Sell in Year</label>
                    <Field as="select" className="form-select shadow inputDesign" id="sellInYearMotorVehicle1"
                      name="sellInYearMotorVehicle1" placeholder="sellInYearMotorVehicle1" disabled={values.MotorVehicle1 == "Yes" ? false : true} >
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="sellInYearMotorVehicle1" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="newPurchaseMotorVehicle1" className="form-label">  New Purchase  </label>
                    <Field type="number" className="form-control shadow inputDesign" id="newPurchaseMotorVehicle1"
                      name="newPurchaseMotorVehicle1" placeholder="$00.00" disabled={values.MotorVehicle1 === "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="newPurchaseMotorVehicle1" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="purchaseInYearMotorVehicle1" className="form-label"> Purchase in Year</label>
                    <Field as="select" className="form-select shadow inputDesign" id="purchaseInYearMotorVehicle1"
                      name="purchaseInYearMotorVehicle1" placeholder="purchaseInYearMotorVehicle1" disabled={values.MotorVehicle1 === "Yes" ? false : true}>
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="purchaseInYearMotorVehicle1" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <label htmlFor="IndexationMotorVehicle1" className="form-label"> Indexation</label>
                    <Field as="select" className="form-select shadow inputDesign" id="IndexationMotorVehicle1"
                      name="IndexationMotorVehicle1" placeholder="IndexationMotorVehicle1" disabled={values.MotorVehicle1 === "Yes" ? false : true} >
                      <option value="">Select</option>
                      <option value="-0.00%">-0.00%</option>
                      <option value="-0.50%">-0.50%</option>
                      <option value="-1.00%">-1.00%</option>
                      <option value="-1.50%">-1.50%</option>
                      <option value="-2.00%">-2.00%</option>
                      <option value="-2.50%">-2.50%</option>
                      <option value="-3.00%">-3.00%</option>
                      <option value="-3.50%">-3.50%</option>
                      <option value="-4.00%">-4.00%</option>
                      <option value="-4.50%">-4.50%</option>
                      <option value="-5.00%">-5.00%</option>
                      <option value="0.00%">0.00%</option>
                      <option value="0.50%">0.50%</option>
                      <option value="1.00%">1.00%</option>
                      <option value="1.50%">1.50%</option>
                      <option value="2.00%">2.00%</option>
                      <option value="2.50%">2.50%</option>
                      <option value="3.00%">3.00%</option>
                      <option value="3.50%">3.50%</option>
                      <option value="4.00%">4.00%</option>
                      <option value="4.50% ">4.50% </option>
                      <option value="5.00%">5.00%</option>
                    </Field>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="IndexationMotorVehicle1" />
                  </div>
                </div>
                <hr />
                {/* motor vehicle 2 */}
                <div className="row">
                  <div className="col-md-12">
                    <h3>Motor Vehicle 2</h3>
                    <div className="form-check form-switch m-0 p-0 ">
                      <div className="radiobutton">
                        <input type="radio" name="MotorVehicle2" id="MotorVehicle21"
                          value="Yes" onChange={handleChange} checked={values.MotorVehicle2 == "Yes"}
                        />
                        <label htmlFor="MotorVehicle21" className="label1">
                          <span>YES</span>
                        </label>
                        <input type="radio" name="MotorVehicle2" id="MotorVehicle22"
                          value="No" onChange={handleChange} checked={values.MotorVehicle2 == "No"} />
                        <label htmlFor="MotorVehicle22" className="label2">
                          <span>NO</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-3">
                    <label htmlFor="currentValueMotorVehicle2" className="form-label">  Current Value </label>
                    <Field type="number" className="form-control shadow inputDesign" id="currentValueMotorVehicle2"
                      name="currentValueMotorVehicle2" placeholder="$00.00" disabled={values.MotorVehicle2 == "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="currentValueMotorVehicle2" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="sellInYearMotorVehicle2" className="form-label"> Sell in Year</label>
                    <Field as="select" className="form-select shadow inputDesign" id="sellInYearMotorVehicle2"
                      name="sellInYearMotorVehicle2" placeholder="sellInYearMotorVehicle2" disabled={values.MotorVehicle2 == "Yes" ? false : true} >
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="sellInYearMotorVehicle2" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="newPurchaseMotorVehicle2" className="form-label">  New Purchase  </label>
                    <Field type="number" className="form-control shadow inputDesign" id="newPurchaseMotorVehicle2"
                      name="newPurchaseMotorVehicle2" placeholder="$00.00" disabled={values.MotorVehicle2 === "Yes" ? false : true} />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="newPurchaseMotorVehicle2" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="purchaseInYearMotorVehicle2" className="form-label"> Purchase in Year</label>
                    <Field as="select" className="form-select shadow inputDesign" id="purchaseInYearMotorVehicle2"
                      name="purchaseInYearMotorVehicle2" placeholder="purchaseInYearMotorVehicle2" disabled={values.MotorVehicle2 === "Yes" ? false : true}>
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="purchaseInYearMotorVehicle2" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <label htmlFor="IndexationMotorVehicle2" className="form-label"> Indexation</label>
                    <Field as="select" className="form-select shadow inputDesign" id="IndexationMotorVehicle2"
                      name="IndexationMotorVehicle2" placeholder="IndexationMotorVehicle2" disabled={values.MotorVehicle2 === "Yes" ? false : true} >
                      <option value="">Select</option>
                      <option value="-0.00%">-0.00%</option>
                      <option value="-0.50%">-0.50%</option>
                      <option value="-1.00%">-1.00%</option>
                      <option value="-1.50%">-1.50%</option>
                      <option value="-2.00%">-2.00%</option>
                      <option value="-2.50%">-2.50%</option>
                      <option value="-3.00%">-3.00%</option>
                      <option value="-3.50%">-3.50%</option>
                      <option value="-4.00%">-4.00%</option>
                      <option value="-4.50%">-4.50%</option>
                      <option value="-5.00%">-5.00%</option>
                      <option value="0.00%">0.00%</option>
                      <option value="0.50%">0.50%</option>
                      <option value="1.00%">1.00%</option>
                      <option value="1.50%">1.50%</option>
                      <option value="2.00%">2.00%</option>
                      <option value="2.50%">2.50%</option>
                      <option value="3.00%">3.00%</option>
                      <option value="3.50%">3.50%</option>
                      <option value="4.00%">4.00%</option>
                      <option value="4.50% ">4.50% </option>
                      <option value="5.00%">5.00%</option>
                    </Field>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="IndexationMotorVehicle2" />
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-md-12">
                    <h3>Other Lifestyle Assets</h3>
                    <div className="form-check form-switch m-0 p-0 ">
                      <div className="radiobutton">
                        <input type="radio" name="OtherLifestyleAssets" id="OtherLifestyleAssets1"
                          value="Yes" onChange={handleChange} checked={values.OtherLifestyleAssets == "Yes"}
                        />
                        <label htmlFor="OtherLifestyleAssets1" className="label1">
                          <span>YES</span>
                        </label>
                        <input type="radio" name="OtherLifestyleAssets" id="OtherLifestyleAssets2"
                          value="No" onChange={handleChange} checked={values.OtherLifestyleAssets == "No"} />
                        <label htmlFor="OtherLifestyleAssets2" className="label2">
                          <span>NO</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {values.OtherLifestyleAssets == "Yes" &&
                  <div>
                    {/* Boat */}
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <h3>Boat</h3>
                        <div className="form-check form-switch m-0 p-0 ">
                          <div className="radiobutton">
                            <input type="radio" name="Boat" id="Boat1"
                              value="Yes" onChange={handleChange} checked={values.Boat == "Yes"}
                            />
                            <label htmlFor="Boat1" className="label1">
                              <span>YES</span>
                            </label>
                            <input type="radio" name="Boat" id="Boat2"
                              value="No" onChange={handleChange} checked={values.Boat == "No"} />
                            <label htmlFor="Boat2" className="label2">
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-3">
                        <label htmlFor="currentValueBoat" className="form-label">  Current Value </label>
                        <Field type="number" className="form-control shadow inputDesign" id="currentValueBoat"
                          name="currentValueBoat" placeholder="$00.00" disabled={values.Boat == "Yes" ? false : true} />
                        <ErrorMessage component="div" className="text-danger fw-bold" name="currentValueBoat" />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="sellInYearBoat" className="form-label"> Sell in Year</label>
                        <Field as="select" className="form-select shadow inputDesign" id="sellInYearBoat"
                          name="sellInYearBoat" placeholder="sellInYearBoat" disabled={values.Boat == "Yes" ? false : true} >
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
                        <ErrorMessage component="div" className="text-danger fw-bold" name="sellInYearBoat" />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="newPurchaseBoat" className="form-label">  New Purchase  </label>
                        <Field type="number" className="form-control shadow inputDesign" id="newPurchaseBoat"
                          name="newPurchaseBoat" placeholder="$00.00" disabled={values.Boat === "Yes" ? false : true} />
                        <ErrorMessage component="div" className="text-danger fw-bold" name="newPurchaseBoat" />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="purchaseInYearBoat" className="form-label"> Purchase in Year</label>
                        <Field as="select" className="form-select shadow inputDesign" id="purchaseInYearBoat"
                          name="purchaseInYearBoat" placeholder="purchaseInYearBoat" disabled={values.Boat === "Yes" ? false : true}>
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
                        <ErrorMessage component="div" className="text-danger fw-bold" name="purchaseInYearBoat" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <label htmlFor="IndexationBoat" className="form-label"> Indexation</label>
                        <Field as="select" className="form-select shadow inputDesign" id="IndexationBoat"
                          name="IndexationBoat" placeholder="IndexationBoat" disabled={values.Boat === "Yes" ? false : true} >
                          <option value="">Select</option>
                          <option value="-0.00%">-0.00%</option>
                          <option value="-0.50%">-0.50%</option>
                          <option value="-1.00%">-1.00%</option>
                          <option value="-1.50%">-1.50%</option>
                          <option value="-2.00%">-2.00%</option>
                          <option value="-2.50%">-2.50%</option>
                          <option value="-3.00%">-3.00%</option>
                          <option value="-3.50%">-3.50%</option>
                          <option value="-4.00%">-4.00%</option>
                          <option value="-4.50%">-4.50%</option>
                          <option value="-5.00%">-5.00%</option>
                          <option value="0.00%">0.00%</option>
                          <option value="0.50%">0.50%</option>
                          <option value="1.00%">1.00%</option>
                          <option value="1.50%">1.50%</option>
                          <option value="2.00%">2.00%</option>
                          <option value="2.50%">2.50%</option>
                          <option value="3.00%">3.00%</option>
                          <option value="3.50%">3.50%</option>
                          <option value="4.00%">4.00%</option>
                          <option value="4.50% ">4.50% </option>
                          <option value="5.00%">5.00%</option>
                        </Field>
                        <ErrorMessage component="div" className="text-danger fw-bold" name="IndexationBoat" />
                      </div>
                    </div>
                    <hr />
                    {/* caravan */}
                    <div className="row">
                      <div className="col-md-12">
                        <h3>Caravan</h3>
                        <div className="form-check form-switch m-0 p-0 ">
                          <div className="radiobutton">
                            <input type="radio" name="Caravan" id="Caravan1"
                              value="Yes" onChange={handleChange} checked={values.Caravan == "Yes"}
                            />
                            <label htmlFor="Caravan1" className="label1">
                              <span>YES</span>
                            </label>
                            <input type="radio" name="Caravan" id="Caravan2"
                              value="No" onChange={handleChange} checked={values.Caravan == "No"} />
                            <label htmlFor="Caravan2" className="label2">
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-3">
                        <label htmlFor="currentValueCaravan" className="form-label">  Current Value </label>
                        <Field type="number" className="form-control shadow inputDesign" id="currentValueCaravan"
                          name="currentValueCaravan" placeholder="$00.00" disabled={values.Caravan == "Yes" ? false : true} />
                        <ErrorMessage component="div" className="text-danger fw-bold" name="currentValueCaravan" />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="sellInYearCaravan" className="form-label"> Sell in Year</label>
                        <Field as="select" className="form-select shadow inputDesign" id="sellInYearCaravan"
                          name="sellInYearCaravan" placeholder="sellInYearCaravan" disabled={values.Caravan == "Yes" ? false : true} >
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
                        <ErrorMessage component="div" className="text-danger fw-bold" name="sellInYearCaravan" />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="newPurchaseCaravan" className="form-label">  New Purchase  </label>
                        <Field type="number" className="form-control shadow inputDesign" id="newPurchaseCaravan"
                          name="newPurchaseCaravan" placeholder="$00.00" disabled={values.Caravan === "Yes" ? false : true} />
                        <ErrorMessage component="div" className="text-danger fw-bold" name="newPurchaseCaravan" />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="purchaseInYearCaravan" className="form-label"> Purchase in Year</label>
                        <Field as="select" className="form-select shadow inputDesign" id="purchaseInYearCaravan"
                          name="purchaseInYearCaravan" placeholder="purchaseInYearCaravan" disabled={values.Caravan === "Yes" ? false : true}>
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
                        <ErrorMessage component="div" className="text-danger fw-bold" name="purchaseInYearCaravan" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <label htmlFor="IndexationCaravan" className="form-label"> Indexation</label>
                        <Field as="select" className="form-select shadow inputDesign" id="IndexationCaravan"
                          name="IndexationCaravan" placeholder="IndexationCaravan" disabled={values.Caravan === "Yes" ? false : true} >
                          <option value="">Select</option>
                          <option value="-0.00%">-0.00%</option>
                          <option value="-0.50%">-0.50%</option>
                          <option value="-1.00%">-1.00%</option>
                          <option value="-1.50%">-1.50%</option>
                          <option value="-2.00%">-2.00%</option>
                          <option value="-2.50%">-2.50%</option>
                          <option value="-3.00%">-3.00%</option>
                          <option value="-3.50%">-3.50%</option>
                          <option value="-4.00%">-4.00%</option>
                          <option value="-4.50%">-4.50%</option>
                          <option value="-5.00%">-5.00%</option>
                          <option value="0.00%">0.00%</option>
                          <option value="0.50%">0.50%</option>
                          <option value="1.00%">1.00%</option>
                          <option value="1.50%">1.50%</option>
                          <option value="2.00%">2.00%</option>
                          <option value="2.50%">2.50%</option>
                          <option value="3.00%">3.00%</option>
                          <option value="3.50%">3.50%</option>
                          <option value="4.00%">4.00%</option>
                          <option value="4.50% ">4.50% </option>
                          <option value="5.00%">5.00%</option>
                        </Field>
                        <ErrorMessage component="div" className="text-danger fw-bold" name="IndexationCaravan" />
                      </div>
                    </div>
                    <hr />
                    {/* Other */}
                    <div className="row">
                      <div className="col-md-12">
                        <h3>Other</h3>
                        <div className="form-check form-switch m-0 p-0 ">
                          <div className="radiobutton">
                            <input type="radio" name="Other" id="Other1"
                              value="Yes" onChange={handleChange} checked={values.Other == "Yes"}
                            />
                            <label htmlFor="Other1" className="label1">
                              <span>YES</span>
                            </label>
                            <input type="radio" name="Other" id="Other2"
                              value="No" onChange={handleChange} checked={values.Other == "No"} />
                            <label htmlFor="Other2" className="label2">
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-3">
                        <label htmlFor="currentValueOther" className="form-label">  Current Value </label>
                        <Field type="number" className="form-control shadow inputDesign" id="currentValueOther"
                          name="currentValueOther" placeholder="$00.00" disabled={values.Other == "Yes" ? false : true} />
                        <ErrorMessage component="div" className="text-danger fw-bold" name="currentValueOther" />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="sellInYearOther" className="form-label"> Sell in Year</label>
                        <Field as="select" className="form-select shadow inputDesign" id="sellInYearOther"
                          name="sellInYearOther" placeholder="sellInYearOther" disabled={values.Other == "Yes" ? false : true} >
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
                        <ErrorMessage component="div" className="text-danger fw-bold" name="sellInYearOther" />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="newPurchaseOther" className="form-label">  New Purchase  </label>
                        <Field type="number" className="form-control shadow inputDesign" id="newPurchaseOther"
                          name="newPurchaseOther" placeholder="$00.00" disabled={values.Other === "Yes" ? false : true} />
                        <ErrorMessage component="div" className="text-danger fw-bold" name="newPurchaseOther" />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="purchaseInYearOther" className="form-label"> Purchase in Year</label>
                        <Field as="select" className="form-select shadow inputDesign" id="purchaseInYearOther"
                          name="purchaseInYearOther" placeholder="purchaseInYearOther" disabled={values.Other === "Yes" ? false : true}>
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
                        <ErrorMessage component="div" className="text-danger fw-bold" name="purchaseInYearOther" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <label htmlFor="IndexationOther" className="form-label"> Indexation</label>
                        <Field as="select" className="form-select shadow inputDesign" id="IndexationOther"
                          name="IndexationOther" placeholder="IndexationOther" disabled={values.Other === "Yes" ? false : true} >
                          <option value="">Select</option>
                          <option value="-0.00%">-0.00%</option>
                          <option value="-0.50%">-0.50%</option>
                          <option value="-1.00%">-1.00%</option>
                          <option value="-1.50%">-1.50%</option>
                          <option value="-2.00%">-2.00%</option>
                          <option value="-2.50%">-2.50%</option>
                          <option value="-3.00%">-3.00%</option>
                          <option value="-3.50%">-3.50%</option>
                          <option value="-4.00%">-4.00%</option>
                          <option value="-4.50%">-4.50%</option>
                          <option value="-5.00%">-5.00%</option>
                          <option value="0.00%">0.00%</option>
                          <option value="0.50%">0.50%</option>
                          <option value="1.00%">1.00%</option>
                          <option value="1.50%">1.50%</option>
                          <option value="2.00%">2.00%</option>
                          <option value="2.50%">2.50%</option>
                          <option value="3.00%">3.00%</option>
                          <option value="3.50%">3.50%</option>
                          <option value="4.00%">4.00%</option>
                          <option value="4.50% ">4.50% </option>
                          <option value="5.00%">5.00%</option>
                        </Field>
                        <ErrorMessage component="div" className="text-danger fw-bold" name="IndexationOther" />
                      </div>
                    </div>
                  </div>}


                {/* Personal Assets Cash Flow */}
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
                    onClick={() => { setLumpsumPurchasesModal(false) }}
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

export default PersonalAssets_CashFlow
