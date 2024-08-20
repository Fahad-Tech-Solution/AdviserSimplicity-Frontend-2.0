import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import { differenceInYears, getDate } from "date-fns";
import Modal from "react-bootstrap/Modal";

import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "yup-phone";

//Images 
import plus from "./images/plus.svg";

const EducationCosts_CashFlow = () => {
    let [EducationCostsModal, setEducationCostsModal] = useState(false); 
    let [EducationCosts, setEducationCosts] = useState([]); 
    
    
      let initialValues = {
        ChildName:"",
        ChildDoBID:"",
        ChildAge:"",
        ChildSupport:"",
        Amount:"",
        PrimaryCost:"",
        SecondaryCost:"",
        EducationUntil:"",
        Indexation:"",
        UniCost:"",
        YearlyCost:"",
        IndexationTwo:""
        };
      
        let validationSchema = Yup.object().shape({
        ChildName: Yup.string().matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,'Invalid Name').required('Required'),
        ChildDoBID: Yup.date().required('Date of Birth is required'),
        ChildSupport: Yup.string().required('Required'),
        Amount: Yup.number().required('Required'),
        PrimaryCost: Yup.number().required('Required'),
        SecondaryCost: Yup.number().required('Required'),
        EducationUntil: Yup.string().required('Required'),
        Indexation: Yup.string().required('Required'),
        UniCost: Yup.number().required('Required'),
        YearlyCost: Yup.number().required('Required'),
        IndexationTwo: Yup.string().required('Required'),
        });
      
        function onSubmit(values, { resetForm }) {
          console.log(values);
          let data = {
            ChildName:values.ChildName,
            ChildDoBID:values.ChildDoBID,
            ChildAge:values.ChildAge,
            ChildSupport:values.ChildSupport,
            Amount:values.Amount,
            PrimaryCost:values.PrimaryCost,
            SecondaryCost:values.SecondaryCost,
            EducationUntil:values.EducationUntil,
            Indexation:values.Indexation,
            UniCost:values.UniCost,
            YearlyCost:values.YearlyCost,
            IndexationTwo:values.IndexationTwo,
          };
  
          setEducationCosts([...EducationCosts, data]);
          resetForm();
        }
  
  
      
    return (
      <div>

                  <label className="form-label">Education Costs</label>
                  <br/>
                  <button type="button" className=" btn btn-outline-success "
                  onClick={()=>{setEducationCostsModal(true);}}
                  >
                  <div className="iconContainer mx-1">
                      <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                  </button>
                     
          <Modal
          show={EducationCostsModal}
          onHide={()=>{setEducationCostsModal(false)}}
          backdrop="static"
          className="modal-xl"
          keyboard={false}
        >
          <Modal.Header
            className="text-light modalBG "
            closeButton
          >
            <Modal.Title className="fontStyle">
            Education Costs 
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
            {({ values, setFieldValue, setValues, handleChange,handleBlur }) => (
              <Form>
                <Modal.Body>
                    {/* Professional Advisor Detail Form */}
                <div className="row">
                    <div className="col-md-3">
                      <label htmlFor="ChildName" className="form-label">  Name  </label>
                      <Field type="text" className="form-control shadow inputDesign" id="ChildName"
                        name="ChildName" placeholder="Child Name" />
                      <ErrorMessage component="div" className="text-danger fw-bold" name="ChildName" />
                    </div>
                    <div className="col-md-3">
                            <label htmlFor="ChildDoBID" className="form-label">
                            Date of Birth Child
                            </label>
                            <div>
                            <DatePicker
                                id="ChildDoBID"
                                className="form-control inputDesign shadow DateInputPadding"
                                selected={values.ChildDoBID}
                                onChange={(date) => {
                                setFieldValue("ChildDoBID", date);
                                const age = differenceInYears(new Date(), date) || 0;
                                setFieldValue("ChildAge", age);
                                }}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="dd/mm/yyyy"
                                showYearDropdown
                                scrollableYearDropdown
                                onBlur={handleBlur}
                                name="ChildDoBID"
                                maxDate={new Date()}
                                showMonthDropdown
                                dropdownMode="select"
                            />
                            </div>
                            <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="ChildDoBID"
                            />
                    </div>
                    <div className="col-md-3">
                            <label htmlFor="ChildAge" className="form-label">
                            Age
                            </label>
                            <Field
                            type="text"
                            className="form-control inputDesign shadow"
                            id="ChildAge"
                            name="ChildAge"
                            placeholder="Age"
                            readOnly
                            />
                            <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="ChildAge"
                            />
                    </div>
                    <div className="col-md-3">
                    <label htmlFor="ChildSupport" className="form-label">Child Support Received</label>
                    <Field as="select" className="form-select shadow inputDesign" id="ChildSupport"
                    name="ChildSupport" placeholder="ChildSupport"  >
                    <option value="">Select</option>
                    <option value="No">No</option>
                    <option value="Paid">Paid</option>
                    <option value="Received">Received</option>
                    </Field>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="ChildSupport" />
                  </div>
                </div>
                
                  <div className="row mt-2">
                    <div className="col-md-3">
                    <label htmlFor="Amount" className="form-label">  Amount Paid/Received  </label>
                    <Field type="number" className="form-control shadow inputDesign" id="Amount"
                        name="Amount" placeholder="$00.00" />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="Amount" />
                    </div>
                    <div className="col-md-3">
                    <label htmlFor="PrimaryCost" className="form-label">  Cost of Primary ($)  </label>
                    <Field type="number" className="form-control shadow inputDesign" id="PrimaryCost"
                        name="PrimaryCost" placeholder="$00.00" />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="PrimaryCost" />
                    </div>
                    <div className="col-md-3">
                    <label htmlFor="SecondaryCost" className="form-label">  Cost of Secondary ($)  </label>
                    <Field type="number" className="form-control shadow inputDesign" id="SecondaryCost"
                        name="SecondaryCost" placeholder="$00.00" />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="SecondaryCost" />
                    </div>
                    <div className="col-md-3">
                    <label htmlFor="EducationUntil" className="form-label"> Education Until</label>
                    <Field as="select" className="form-select shadow inputDesign" id="EducationUntil"
                    name="EducationUntil" placeholder="EducationUntil"  >
                    <option value="">Select</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    </Field>
                    <ErrorMessage component="div" className="text-danger fw-bold" name="EducationUntil" />
                  </div>
                  </div>
                                
                                
                  <div className="row mt-2">
    
                    <div className="col-md-3">
                      <label htmlFor="Indexation" className="form-label"> Indexation</label>
                      <Field as="select" className="form-select shadow inputDesign" id="Indexation"
                      name="Indexation" placeholder="Indexation"  >
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
                      <ErrorMessage component="div" className="text-danger fw-bold" name="Indexation" />
                    </div>
                    
                    <div className="col-md-3">
                    <label htmlFor="UniCost" className="form-label">  Cost of Uni ($) </label>
                    <Field type="number" className="form-control shadow inputDesign" id="UniCost"
                        name="UniCost" placeholder="$00.00" />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="UniCost" />
                    </div>
                    <div className="col-md-3">
                    <label htmlFor="YearlyCost" className="form-label">  Course Year  </label>
                    <Field type="number" className="form-control shadow inputDesign" id="YearlyCost"
                        name="YearlyCost" placeholder="$00.00" />
                    <ErrorMessage component="div" className="text-danger fw-bold" name="YearlyCost" />
                    </div>
                    
                    <div className="col-md-3">
                    <label htmlFor="IndexationTwo" className="form-label"> Indexation</label>
                    <Field as="select" className="form-select shadow inputDesign" id="IndexationTwo"
                    name="IndexationTwo" placeholder="Indexation"  >
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
                    <ErrorMessage component="div" className="text-danger fw-bold" name="IndexationTwo" />
                  </div>
                                    
                  </div>

  
                <div className="row">
                    <div className="col-md-12">
                    <div className="table-responsive my-3">
                    <table className="table table-bordered table-hover text-center">
                      <thead className="text-light" id="tableHead">
                        <tr>
                          <th>Name </th>
                          <th>Date of Birth</th>
                          <th>Primary</th>
                          <th>Secondary</th>
                          <th>Uni</th>
                          <th>Options</th>
                        </tr>
                      </thead>
                      <tbody>
                      {EducationCosts.map((elem, index) => {
                        return (
                          <tr>
                            <td>{elem.ChildName}</td>
                            <td>{elem.ChildDoBID.getDate()}/{elem.ChildDoBID.getMonth()}/{elem.ChildDoBID.getFullYear()}</td>
                            <td>{elem.PrimaryCost}</td>
                            <td>{elem.SecondaryCost}</td>
                            <td>{elem.UniCost}</td>
                            <td>
                            <button  type='button'  className='btn btn-danger btn-sm'>delete</button>
                            <button  type='button' onClick={()=>{setValues(elem)}}  className='btn btn-warning btn-sm mx-2'>update</button> 
                            </td>
                          </tr>
                        )
                      })}
                        
                      </tbody>
                    </table>
                  </div>
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
                      onClick={()=>{setEducationCostsModal(false)}}
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

export default EducationCosts_CashFlow
