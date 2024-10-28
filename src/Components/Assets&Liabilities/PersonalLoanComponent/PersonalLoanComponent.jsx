import React, { useEffect, useState } from "react";


import { ErrorMessage, Field, Form, Formik } from "formik";
// import * as Yup from "yup";                    //? don't Remove it you might need it later
// import { useNavigate } from "react-router-dom";//? don't Remove it you might need it later
import axios from "axios";

//image
import single from "../../Svgs/single-2.svg";
import { Card } from "react-bootstrap";
import CustomDropDown from "../../Assets/CustomDropDown/CustomDropDown";
import { defaultUrl } from "../../../Store/Store";
import { useRecoilValue } from "recoil";


const PersonalLoanComponent = () => {


  let DefaultUrl = useRecoilValue(defaultUrl)

  let [tRState, setTRState] = useState(false);
  let [flagState, setFlagState] = useState(false);
  let [PLState, setPLState] = useState([]);


  useEffect(() => {

    let email = localStorage.getItem("Email");
    if (email) {
      GetApiFunction(email);
    }
  }, []);

  let GetApiFunction = async (email) => {
    try {

      let clientPL = await axios.get(`${DefaultUrl}/api/Client-PersonalDebts/`);
      clientPL = clientPL.data;
      clientPL = clientPL.filter((item) => item.Email === email);

      console.log(clientPL);
      setPLState(clientPL)

      if (clientPL.length !== 0) {
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


  let initialValues = {
    PLDebtType: "",
    PLCurrentBalance: "",
    PLRepaymentAmount: "",
    PLFrequency: "",
    PLAnnualRepayment: "",
    PLInterestRate: "",
    PLLoanTerm: "",
    PLLoanType: "",
    PLYearRemaining: "",
  };

  let onSubmit = (values, { resetForm }) => {
    console.log(values);

    let Data = {
      Email: localStorage.getItem("Email"),

      PLDebtType: values.PLDebtType,
      PLCurrentBalance: values.PLCurrentBalance,
      PLRepaymentAmount: values.PLRepaymentAmount,
      PLFrequency: values.PLFrequency,
      PLAnnualRepayment: values.PLAnnualRepayment,
      PLInterestRate: values.PLInterestRate,
      PLLoanTerm: values.PLLoanTerm,
      PLLoanType: values.PLLoanType,
      PLYearRemaining: values.PLYearRemaining,
    }

    if (flagState) {
      axios
        .patch(
          `${DefaultUrl}/api/Client-PersonalDebts/Update/${Data.Email}/${values._id}`,
          Data
        )
        .then((res) => {
          console.log("Personal Loan Company Has Successfully Been updated");
          setTRState(true);
          setFlagState(false);
        });
    }
    else {
      axios
        .post(`${DefaultUrl}/api/Client-PersonalDebts/Add`, Data)
        .then((res) => {
          console.log("Personal Loan Company Has Successfully Been Added");
          setTRState(true);
        });
    }

    resetForm();
    setTimeout(() => {
      GetApiFunction(Data.Email);
    }, 500);
  };

  let PLOperations = (Option, elem, deleteData) => {
    if (Option === 1) {
      // alert("UpdateFunctionality");
      setTRState(false);
      setFlagState(true);
    } else if (Option === 2) {
      // alert("DeleteFunctionality");
      deleteApiFunc(elem, deleteData);
    }
  };

  let deleteApiFunc = (elem, deleteData) => {
    console.log(elem, deleteData);

    axios.delete(`${DefaultUrl}/api/Client-PersonalDebts/Delete/${elem.Email}/${deleteData}`)
      .then((res) => { console.log("client Centre Link has been deleted"); GetApiFunction(elem.Email); });

  };

  return (
    <div className="row my-3">
      <div className="col-md-12">
        <Card className="shadow px-4 py-4">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize >
            {({ values, setFieldValue, setValues, handleChange, handleBlur, }) => <Form>

              <div>
                <h3 className="heading text-center">
                  Personal Loans or Credit cards
                </h3>
              </div>

              {(tRState === false) &&
                <div>
                  <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                      <label
                        htmlFor=""
                        className="form-label text-center"
                      >
                        Client
                        <div className="iconContainerLg">
                          <img
                            src={single}
                            alt="single svg"
                            className="w-50 "
                          />
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-4 mb-3">
                      <label htmlFor="PLDebtType" className="form-label">
                        Debt Type
                      </label>
                    </div>
                    <div className="col-4 mb-3">
                      <Field
                        as="select"
                        className="form-control inputDesign shadow form-select"
                        id="PLDebtType"
                        name="PLDebtType"
                        placeholder="PL Debt Type"
                      >
                        <option value="">Select</option>
                        <option value="Credit Card">Credit Card </option>
                        <option value="Personal Loan">Personal Loan  </option>
                      </Field>
                      <ErrorMessage
                        component="div"
                        className="text-danger fw-bold"
                        name="PLDebtType"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-4 mb-3">
                      <label
                        htmlFor="PLCurrentBalance"
                        className="form-label"
                      >
                        Current Balance
                      </label>
                    </div>
                    <div className="col-4 mb-3">
                      <Field
                        type="number"
                        className="form-control shadow inputDesign"
                        id="PLCurrentBalance"
                        name="PLCurrentBalance"
                        placeholder="Current Balance"
                      />
                      <ErrorMessage
                        component="div"
                        className="text-danger fw-bold"
                        name="PLCurrentBalance"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-4 mb-3">
                      <label
                        htmlFor="PLRepaymentAmount"
                        className="form-label"
                      >
                        Repayment Amount
                      </label>
                    </div>
                    <div className="col-4 mb-3">
                      <Field
                        type="number"
                        className="form-control shadow inputDesign"
                        id="PLRepaymentAmount"
                        name="PLRepaymentAmount"
                        placeholder="Repayment Amount"
                      />
                      <ErrorMessage
                        component="div"
                        className="text-danger fw-bold"
                        name="PLRepaymentAmount"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-4 mb-3">
                      <label
                        htmlFor="PLFrequency"
                        className="form-label"
                      >
                        Frequency
                      </label>
                    </div>
                    <div className="col-4 mb-3">
                      <Field
                        as="select"
                        id="PLFrequency"
                        name="PLFrequency"
                        className="form-select shadow  inputDesign"
                        onChange={(e) =>
                          setFieldValue(
                            "PLFrequency",
                            e.target.value
                          )
                        }
                        value={values.PLFrequency}
                      >
                        <option value="">Select</option>
                        <option value={52}>Weekly</option>
                        <option value={26}>Fortnightly</option>
                        <option value={12}>Monthly</option>

                        <option value={2}>Six-Monthly</option>
                        <option value={1}>Annually</option>
                      </Field>
                      <ErrorMessage
                        component="div"
                        className="text-danger fw-bold"
                        name="PLFrequency"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-4 mb-3">
                      <label
                        htmlFor="PLAnnualRepayment"
                        className="form-label"
                      >
                        Annual Repayment
                      </label>
                    </div>
                    <div className="col-4 mb-3">
                      <Field
                        type="number"
                        className="form-control shadow inputDesign"
                        id="PLAnnualRepayment"
                        name="PLAnnualRepayment"
                      // readOnly={true}
                      // disable
                      // value={parseFloat(values.PLRepaymentAmount || 0) * parseFloat(values.PLFrequency || 0)}
                      />

                    </div>
                  </div>

                  <div className="row">
                    <div className="col-4 mb-3">
                      <label
                        htmlFor="PLInterestRate"
                        className="form-label"
                      >
                        Interest Rate
                      </label>
                    </div>
                    <div className="col-4 mb-3">
                      <Field
                        type="number"
                        className="form-control shadow inputDesign"
                        id="PLInterestRate"
                        name="PLInterestRate"
                        placeholder="Interest Rate"
                      />
                      <ErrorMessage
                        component="div"
                        className="text-danger fw-bold"
                        name="PLInterestRate"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-4 mb-3">
                      <label
                        htmlFor="PLLoanTerm"
                        className="form-label"
                      >
                        Loan Terms (1 - 30 Years)
                      </label>
                    </div>
                    <div className="col-4 mb-3">
                      <Field
                        as="select"
                        id="PLLoanTerm"
                        name="PLLoanTerm"
                        className="form-select shadow  inputDesign myselect"
                        onChange={(e) =>
                          setFieldValue(
                            "PLLoanTerm",
                            e.target.value
                          )
                        }
                        value={values.PLLoanTerm}
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
                        name="PLLoanTerm"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-4 mb-3">
                      <label
                        htmlFor="PLLoanType"
                        className="form-label"
                      >
                        Loan Type
                      </label>
                    </div>
                    <div className="col-4 mb-3">
                      <Field
                        as="select"
                        id="PLLoanType"
                        name="PLLoanType"
                        className="form-select shadow  inputDesign"
                        onChange={(e) =>
                          setFieldValue(
                            "PLLoanType",
                            e.target.value
                          )
                        }
                        value={values.PLLoanType}
                      >
                        <option value="">Select</option>
                        <option value="I/Only">
                          I/Only
                        </option>
                        <option value="P&I">P & I</option>
                      </Field>
                      <ErrorMessage
                        component="div"
                        className="text-danger fw-bold"
                        name="PLLoanType"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-4 mb-3">
                      <label
                        htmlFor="PLYearRemaining"
                        className="form-label"
                      >
                        Year Remaining (1 - 30 Years)
                      </label>
                    </div>
                    <div className="col-4 mb-3">
                      <Field
                        as="select"
                        id="PLYearRemaining"
                        name="PLYearRemaining"
                        className="form-select shadow  inputDesign myselect"
                        onChange={(e) =>
                          setFieldValue(
                            "PLYearRemaining",
                            e.target.value
                          )
                        }
                        value={
                          values.PLYearRemaining
                        }
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
                        name="PLYearRemaining"
                      />
                    </div>
                  </div>

                  <div className="row mt-5">
                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="float-end btn w-25  bgColor modalBtn"
                      // onClick={nextbuttonHandler}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              }

              {(tRState === true) &&
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="table-responsive my-3" id="childTable">
                        <table className="table table-bordered table-hover text-center">
                          <thead className="text-light" id="tableHead">
                            <tr>
                              <th>Description</th>
                              <th>Current Belance</th>
                              <th>Annual Repayments</th>
                              <th onClick={() => { console.log(PLState) }}>Opt</th>
                            </tr>
                          </thead>
                          <tbody>
                            {PLState.map((elem, index) => {
                              return (
                                <tr key={index}>
                                  <td>{elem.PLDebtType}</td>
                                  <td>{elem.PLCurrentBalance}</td>
                                  <td>{elem.PLAnnualRepayment}</td>
                                  <td><CustomDropDown
                                    Operations={PLOperations}
                                    Delete={elem._id}
                                    Data={elem}
                                    FormikFun={setValues}
                                  /> </td>
                                </tr>)
                            })}
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
                        onClick={() => setTRState(false)}>
                        Add New
                      </button>
                    </div>
                  </div>
                </div>

              }

            </Form>}
          </Formik>
        </Card>
      </div>
    </div>
  );
};

export default PersonalLoanComponent;
