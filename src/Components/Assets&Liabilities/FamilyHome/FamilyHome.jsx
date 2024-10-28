import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import notebook from "../images/notebook.svg";
import plus from "../images/plus.svg";

// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "react-bootstrap";
import CustomDropDown from "../../Assets/CustomDropDown/CustomDropDown";
import { defaultUrl } from "../../../Store/Store";
import { useRecoilValue } from "recoil";

const FamilyHome = () => {
  
  let DefaultUrl = useRecoilValue(defaultUrl)

  const [ownFamilyEdit, setOwnFamilyEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [ownFamilyList, setOwnFamilyList] = useState([]);
  const [HomeIndex, setHomeIndex] = useState(1);
  let [tRState, setTRState] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  useEffect(() => {

    let email = localStorage.getItem("Email");
    if (email) {
      GetApiFunction(email);
    }
  }, []);

  let GetApiFunction = async(email) => {
    try {
      
      let clientIn = await axios.get(`${DefaultUrl}/api/Client-FamilyHome/`);
      clientIn = clientIn.data;
      clientIn = clientIn.filter((item) => item.Email === email);

      console.log(clientIn[0]);
      setOwnFamilyList(clientIn[0])
      
      if (clientIn.length !== 0) {
        setTRState(true);
      }
      else {
        setTRState(false);
      }
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  let own_initialValues = {
    HomeNO: HomeIndex,
    CurrentValue: "",
    ClientOwnership: 50,
    PartnerOwnership: 50,
    CostBase: "",
    Address: "",
    Postcode: "",
    AmountAssessed: "",

    PropertyLoan: "No",
    ClientBorrowingPercentage: "",
    PartnerBorrowingPercentage: "",
    CurrentBalance: "",
    RepaymentAmounts: "",
    Frequency: "",
    annualRepayments: "",
    InterestRate: "",
    LoanTerm: "",
    LoanType: "",
    YearsRemaining: "",
  };
  let own_onSubmit = (Values) => {
    let Email = localStorage.getItem("Email");

    let ClientFamilyHomeDetails = {
      Email: localStorage.getItem("Email"),
      HomeNO: parseFloat(Values.HomeNO) || 0,
      CurrentValue: Values.CurrentValue,
      ClientOwnership: Values.ClientOwnership,
      PartnerOwnership: Values.PartnerOwnership,
      CostBase: Values.CostBase,
      Address: Values.Address,
      Postcode: Values.Postcode,
      AmountAssessed: Values.AmountAssessed,

      PropertyLoan: Values.PropertyLoan,
      ClientBorrowingPercentage: Values.ClientBorrowingPercentage,
      PartnerBorrowingPercentage: Values.PartnerBorrowingPercentage,
      CurrentBalance: Values.CurrentBalance,
      RepaymentAmounts: Values.RepaymentAmounts,
      Frequency: Values.Frequency,
      AnnualRepayments: Values.RepaymentAmounts * Values.Frequency,
      InterestRate: Values.InterestRate,
      LoanTerm: Values.LoanTerm,
      LoanType: Values.LoanType,
      YearsRemaining: Values.YearsRemaining,
    };
    console.log(ClientFamilyHomeDetails);

    if (ownFamilyEdit == false) {
      axios
        .post(
          `${DefaultUrl}/api/Client-FamilyHome/Add-Client-FamilyHome`,
          ClientFamilyHomeDetails
        )
        .then((res) => console.log("Family Home Added Successfully!"));
    } else {
      // gogo

      axios
        .patch(
          `${DefaultUrl}/api/Client-FamilyHome/Update-Client-FamilyHome/${Email}`,
          ClientFamilyHomeDetails
        )
        .then((res) => console.log("Family Home Updated Successfully!"));
    }
    
    setTimeout(() => {
      GetApiFunction(Email);
    }, 500);

    setOwnFamilyEdit(false);
    handleClose();
  };

  let FHOperations = (Option, elem, deleteData) => {
    if (Option == 1) {
      // alert("UpdateFunctionality");
      // setTRState(false);
      setOwnFamilyEdit(true);
      handleShow(true);
    } else if (Option == 2) {
      // alert("DeleteFunctionality");
      deleteApiFunc(elem, deleteData);
    }
  };
  
  let deleteApiFunc = (elem, deleteData) => {
    console.log(elem, deleteData);

    axios .delete(`${DefaultUrl}/api/Client-FamilyHome/Delete-Client-FamilyHome/${elem.Email}`)
    .then((res) => { console.log("Family HomeNO has been deleted"); GetApiFunction(elem.Email); });
    
  };

  let UpdateData = (elem) => {
    console.log(elem);
  }

  return (
    <div className="row mb-2 mt-1">
      <div className="col-md-12">
        <Card className="shadow px-4 py-4">
          
          <div>
            <h3 className="heading text-center">
            Family Home
            </h3>
          </div>
          
                {(tRState == false) &&
                  <div className="row">
                    <div className="col-md-4"></div>
                      <div className="col-md-4">
                        <button
                          className=" btn btn-outline-success w-100 "
                          onClick={handleShow}
                          type="button"
                        >
                          <div className="iconContainer mx-1">
                            <img className="img-fluid" src={plus} alt="" />
                          </div>
                        Add Family Home
                        </button>
                      </div>
                  </div>
                }
                
                {(tRState == true) &&
                  <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="table-responsive my-3" id="childTable">
                        <table className="table table-bordered table-hover text-center">
                          <thead className="text-light" id="tableHead">
                            <tr>
                            <th>Address</th>
                            <th>Current Value</th>
                            <th>Ownership</th>
                            <th>Home Loan Balance</th>
                            <th>Repayments p.a</th>
                              <th onClick={()=>{console.log(ownFamilyList)}}>Opt</th>
                            </tr>
                          </thead>
                          <tbody>
                         
                            <tr>
                            <td>{ownFamilyList.Address}</td>
                            <td>{ownFamilyList.CurrentValue}</td>
                            <td>Client {ownFamilyList.ClientOwnership}%/
                              Partner {ownFamilyList.PartnerOwnership}%</td>
                            <td>{ownFamilyList.CurrentBalance}</td>
                            <td>{ownFamilyList.AnnualRepayments}</td>
                            <td><CustomDropDown
                            Operations = {FHOperations}
                            Delete = {ownFamilyList._id}
                            Data = {ownFamilyList}
                            FormikFun = {UpdateData}
                                /> </td>
                            </tr> 
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <button
                      type="button"
                      className="float-end btn btn-outline w-25 mx-3 backBtn modalBtn"
                      onClick={()=>setTRState(false)}>
                      Add New
                      </button>
                    </div>
                  </div>
                </div>
                }


                {/* Modal  Family Home Details*/}
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  className="modal-lg"
                  keyboard={false}
                >
                  <Modal.Header className="text-light modalBG " closeButton>
                    <Modal.Title className="fontStyle">
                      Family Home Details
                      <div className="iconContainerLg">
                        <img className="img-fluid" src={notebook} alt="" />
                      </div>
                    </Modal.Title>
                  </Modal.Header>
                  <Formik
                    // ownFamily123
                    initialValues={
                      ownFamilyEdit ? ownFamilyList : own_initialValues
                    }
                    // validationSchema={own_validationSchema}
                    onSubmit={own_onSubmit}
                    enableReinitialize
                  >
                    {({ values, handleChange, setFieldValue, formik }) => (
                      <Form>
                        <Modal.Body>
                          {/* Family Assets Details*/}
                    
                          {/* Row 1*/}
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label htmlFor="HomeNO" className="form-label">
                                Home
                              </label>
                            </div>
                            <div className="col-4 mb-3">
                              <Field
                                type="number"
                                className="form-control shadow inputDesign"
                                id="HomeNO"
                                name="HomeNO"
                                placeholder="Home"
                                readOnly
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="HomeNO"
                              />
                            </div>
                          </div>
                          
                          <div className="row">
                            <div className="col-4 mb-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="CurrentValue"
                                  className="form-label"
                                >
                                  Current Value
                                </label>
                              </div>
                            </div>
                            <div className="col-4 mb-3">
                              <Field
                                type="number"
                                className="form-control shadow inputDesign"
                                id="CurrentValue"
                                name="CurrentValue"
                                placeholder="Current Value"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="CurrentValue"
                              />
                            </div>
                          </div>
                          {/* Row 1*/}

                          {/* Row 2*/}
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="ClientOwnership"
                                className="form-label"
                              >
                                Client % of Ownership
                              </label>
                            </div>
                            <div className="col-4 mb-3">
                              <Field
                                type="number"
                                className="form-control shadow inputDesign"
                                id="ClientOwnership"
                                name="ClientOwnership"
                                onChange={(e) => {
                                  const clientValue = parseInt(e.target.value, 10);
                                  const partnerValue = Math.min(100, Math.max(0, 100 - clientValue));
                                  setFieldValue('ClientOwnership',(clientValue>100?100:clientValue));
                                  setFieldValue('PartnerOwnership', partnerValue);
                              }}
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="ClientOwnership"
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-4 mb-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="PartnerOwnership"
                                  className="form-label"
                                >
                                  Partner % of Ownership
                                </label>
                              </div>
                            </div>
                            <div className="col-4 mb-3">
                              <Field
                                type="number"
                                className="form-control shadow inputDesign"
                                id="PartnerOwnership"
                                name="PartnerOwnership"
                                  onChange={(e) => {
                                  const partnerValue = parseInt(e.target.value, 10);
                                  const clientValue = Math.min(100, Math.max(0, 100 - partnerValue));
                                  setFieldValue('PartnerOwnership', (partnerValue>100?100:partnerValue));
                                  setFieldValue('ClientOwnership', clientValue);
                                  }}
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="PartnerOwnership"
                              />
                            </div>
                          </div>
                          {/* Row 2*/}

                          {/* Row 3*/}
                          <div className="row">
                            <div className="col-4 mb-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="CostBase"
                                  className="form-label"
                                >
                                  Cost base /(Purchase Price)
                                </label>
                              </div>
                            </div>
                            <div className="col-4 mb-3">
                              <Field
                                type="number"
                                className="form-control shadow inputDesign"
                                id="CostBase"
                                name="CostBase"
                                placeholder="Cost base /(Purchase Price)"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="CostBase"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <div className="mb-3">
                                <label htmlFor="Address" className="form-label">
                                  Address
                                </label>
                              </div>
                            </div>
                            <div className="col-4 mb-3">
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="Address"
                                name="Address"
                                placeholder="Address"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="Address"
                              />
                            </div>
                          </div>
                          {/* Row 3*/}

                          {/* Row 4*/}
                          <div className="row">
                            <div className="col-4 mb-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="Postcode"
                                  className="form-label"
                                >
                                  Postcode/Suburb
                                </label>
                              </div>
                            </div>
                            <div className="col-4 mb-3">
                              <Field
                                type="number"
                                className="form-control shadow inputDesign"
                                id="Postcode"
                                name="Postcode"
                                placeholder="Postcode/Suburb"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="Postcode"
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-4 mb-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="AmountAssessed"
                                  className="form-label"
                                >
                                  Amount Assessed For Centrelink Assets Test
                                </label>
                              </div>
                            </div>
                            <div className="col-4 mb-3">
                              <Field
                                type="number"
                                className="form-control shadow inputDesign"
                                id="AmountAssessed"
                                name="AmountAssessed"
                                placeholder="Amount Assessed"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="AmountAssessed"
                              />
                            </div>
                          </div>
                          {/* Row 4*/}

                          {/* radio button*/}
                          <div className="row">
                            <div className="col-4 mb-3">
                              <div className="mb-3">
                                <label className="form-label">
                                  Does this property have a loan attached to it?
                                </label>
                              </div>
                            </div>
                            {/* switch button style */}
                            <div className="col-4 mb-3">
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="PropertyLoan"
                                    id="propertyLoanopt1"
                                    value="Yes"
                                    onChange={handleChange}
                                    checked={values.PropertyLoan === "Yes"}
                                  />
                                  <label
                                    htmlFor="propertyLoanopt1"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="PropertyLoan"
                                    id="propertyLoanopt2"
                                    value="No"
                                    onChange={handleChange}
                                    checked={values.PropertyLoan === "No"}
                                  />
                                  <label
                                    htmlFor="propertyLoanopt2"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* radio button*/}
                          {/* conditional rendering */}
                          {values.PropertyLoan === "Yes" && (
                            <div>
                              {/* Row 1*/}
                              <div className="row">
                                <div className="col-4 mb-3">
                                  <div className="mb-3">
                                    <label
                                      htmlFor="ClientBorrowingPercentage"
                                      className="form-label"
                                    >
                                      Client % of Borrowing
                                    </label>
                                  </div>
                                </div>
                                <div className="col-4 mb-3">
                                  <Field
                                    type="number"
                                    className="form-control shadow inputDesign"
                                    id="ClientBorrowingPercentage"
                                    name="ClientBorrowingPercentage"
                                    onChange={(e) => {
                                      const clientValue = parseInt(e.target.value, 10);
                                      const partnerValue = Math.min(100, Math.max(0, 100 - clientValue));
                                      setFieldValue('ClientBorrowingPercentage',(clientValue>100?100:clientValue));
                                      setFieldValue('PartnerBorrowingPercentage', partnerValue);
                                    }}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="ClientBorrowingPercentage"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-4 mb-3">
                                  <div className="mb-3">
                                    <label
                                      htmlFor="PartnerBorrowingPercentage"
                                      className="form-label"
                                    >
                                      Partner % of Borrowing
                                    </label>
                                  </div>
                                </div>
                                <div className="col-4 mb-3">
                                  <Field
                                    type="number"
                                    className="form-control shadow inputDesign"
                                    id="PartnerBorrowingPercentage"
                                    name="PartnerBorrowingPercentage"
                                    onChange={(e) => {
                                      const partnerValue = parseInt(e.target.value, 10);
                                      const clientValue = Math.min(100, Math.max(0, 100 - partnerValue));
                                      setFieldValue('PartnerBorrowingPercentage', (partnerValue>100?100:partnerValue));
                                      setFieldValue('ClientBorrowingPercentage', clientValue);
                                    }}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="PartnerBorrowingPercentage"
                                  />
                                </div>
                              </div>
                              {/* Row 1*/}

                              {/* Row 2*/}
                              <div className="row">
                                <div className="col-4 mb-3">
                                  <div className="mb-3">
                                    <label
                                      htmlFor="CurrentBalance"
                                      className="form-label"
                                    >
                                      Current Balance
                                    </label>
                                  </div>
                                </div>
                                <div className="col-4 mb-3">
                                  <Field
                                    type="number"
                                    className="form-control shadow inputDesign"
                                    id="CurrentBalance"
                                    name="CurrentBalance"
                                    placeholder="Current Balance"
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="CurrentBalance"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-4 mb-3">
                                  <div className="mb-3">
                                    <label
                                      htmlFor="RepaymentAmounts"
                                      className="form-label"
                                    >
                                      Repayments Amount
                                    </label>
                                  </div>
                                </div>
                                <div className="col-4 mb-3">
                                  <Field
                                    type="number"
                                    className="form-control shadow inputDesign"
                                    id="RepaymentAmounts"
                                    name="RepaymentAmounts"
                                    placeholder="Repayments Amount"
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="RepaymentAmounts"
                                  />
                                </div>
                              </div>
                              {/* Row 2*/}

                              {/* Row 3*/}
                              <div className="row">
                                <div className="col-4 mb-3">
                                  <div className="mb-3">
                                    <label
                                      htmlFor="Frequency"
                                      className="form-label"
                                    >
                                      Frequency
                                    </label>
                                  </div>
                                </div>
                                <div className="col-4 mb-3">
                                  <Field
                                    as="select"
                                    id="Frequency"
                                    name="Frequency"
                                    className="form-select shadow  inputDesign"
                                    onChange={(e) =>
                                      setFieldValue("Frequency", e.target.value)
                                    }
                                    value={values.Frequency}
                                  >
                                    <option value="">Select</option>
                                    <option value={52}>Weekly</option>
                                    <option value={26}>Fortnightly</option>
                                    <option value={12}>Monthly</option>
                                    <option value={1}>Annually</option>
                                  </Field>
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="Frequency"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-4 mb-3">
                                  <div className="mb-3">
                                    <label
                                      htmlFor="annualRepayments"
                                      className="form-label"
                                    >
                                      Annual Repayments
                                    </label>
                                  </div>
                                </div>
                                <div className="col-4 mb-3">
                                  <Field
                                    readOnly={true}
                                    type="number"
                                    className="form-control shadow inputDesign"
                                    id="annualRepayments"
                                    name="annualRepayments"
                                    placeholder="Annual Repayments"
                                    value={
                                      parseFloat(values.Frequency || 0) *
                                      parseFloat(values.RepaymentAmounts || 0)
                                    }
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="annualRepayments"
                                  />
                                </div>
                              </div>
                              {/* Row 3*/}

                              {/* Row 4*/}
                              <div className="row">
                                <div className="col-4 mb-3">
                                  <div className="mb-3">
                                    <label
                                      htmlFor="InterestRate"
                                      className="form-label"
                                    >
                                      Interest Rate (p.a)
                                    </label>
                                  </div>
                                </div>
                                <div className="col-4 mb-3">
                                  <Field
                                    type="number"
                                    className="form-control shadow inputDesign"
                                    id="InterestRate"
                                    name="InterestRate"
                                    placeholder="Interest Rate (p.a)"
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="InterestRate"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-4 mb-3">
                                  <div className="mb-3">
                                    <label
                                      htmlFor="LoanTerm"
                                      className="form-label"
                                    >
                                      Loan Term (1 - 30 Years)
                                    </label>
                                  </div>
                                </div>
                                <div className="col-4 mb-3">
                                  <Field
                                    as="select"
                                    id="LoanTerm"
                                    name="LoanTerm"
                                    className="form-select shadow  inputDesign"
                                    onChange={(e) =>
                                      setFieldValue("LoanTerm", e.target.value)
                                    }
                                    value={values.LoanTerm}
                                  >
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
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="LoanTerm"
                                  />
                                </div>
                              </div>
                              {/* Row 4*/}

                              {/* Row 5*/}
                              <div className="row">
                                <div className="col-4 mb-3">
                                  <div className="mb-3">
                                    <label
                                      htmlFor="LoanType"
                                      className="form-label"
                                    >
                                      Loan Type
                                    </label>
                                  </div>
                                </div>
                                <div className="col-4 mb-3">
                                  <Field
                                    as="select"
                                    id="LoanType"
                                    name="LoanType"
                                    className="form-select shadow  inputDesign"
                                    onChange={(e) =>
                                      setFieldValue("LoanType", e.target.value)
                                    }
                                    value={values.LoanType}
                                  >
                                    <option value="">Select</option>
                                    <option value="I/Only">I/Only</option>
                                    <option value="P&I">P & I</option>
                                  </Field>
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="LoanType"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-4 mb-3">
                                  <div className="mb-3">
                                    <label
                                      htmlFor="YearsRemaining"
                                      className="form-label"
                                    >
                                      Years Remaining (1 - 30 Years)
                                    </label>
                                  </div>
                                </div>
                                <div className="col-4 mb-3">
                                  <Field
                                    as="select"
                                    id="YearsRemaining"
                                    name="YearsRemaining"
                                    className="form-select shadow  inputDesign myselect"
                                    onChange={(e) =>
                                      setFieldValue(
                                        "YearsRemaining",
                                        e.target.value
                                      )
                                    }
                                    value={values.YearsRemaining}
                                  >
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
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="YearsRemaining"
                                  />
                                </div>
                              </div>
                              {/* Row 5*/}
                            </div>
                          )}
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
                
          
        </Card>
      </div>
    </div>
  );
};

export default FamilyHome;
