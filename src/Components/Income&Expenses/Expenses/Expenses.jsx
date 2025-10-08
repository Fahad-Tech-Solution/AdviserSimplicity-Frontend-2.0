import React, { useEffect, useState } from 'react'


import { ErrorMessage, Field, Form, Formik } from "formik";
// import * as Yup from "yup"; //? don't Remove it you might need it later
// import { useNavigate } from "react-router-dom"; //? don't Remove it you might need it later
import axios from "axios";


//images and SVG's

import single from "../../Svgs/single-2.svg";
// import couple from "../../Svgs/couple-2.svg"; //? don't Remove it you might need it later
import dollarBag from "../images/dollarBag.svg";
import UseBudget from '../UseBudget/UseBudget';
import { Card } from 'react-bootstrap';
import CustomDropDown from '../../Assets/CustomDropDown/CustomDropDown';
import { useRecoilValue } from 'recoil';
import { defaultUrl } from '../../../Store/Store';

const Expenses = () => {

  let DefaultUrl = useRecoilValue(defaultUrl)

  let [tRState, setTRState] = useState(false);

  let [flagState, setFlagState] = useState(false);
  let [budgetAmount, setBudgetAmount] = useState(false);

  let [clientExpenseState, setClientExpenseState] = useState({});


  useEffect(() => {

    let email = localStorage.getItem("Email");
    if (email) {
      GetApiFunction(email);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let GetApiFunction = async (email) => {
    try {

      let clientExpenses = await axios.get(`${DefaultUrl}/api/Client-Income-Expenses/`);
      clientExpenses = clientExpenses.data;
      clientExpenses = clientExpenses.filter((item) => item.Email === email);

      console.log(clientExpenses);
      if (clientExpenses[0].clientExpensesItem !== undefined) {
        setTRState(true);
      }
      setClientExpenseState({ ...clientExpenses[0] })
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  let initialValues = {
    clientExpenseType: "",
    clientExpensesItem: "",
    clientExpenseAmount: "",
    clientExpenseYear: "",
  };

  let onSubmit = (values, { resetForm }) => {
    let clientObj = {
      Email: localStorage.getItem("Email"),
      clientExpenseType: values.clientExpenseType,
      clientExpensesItem: values.clientExpensesItem,
      clientExpenseAmount: values.clientExpenseType === "use Budget Planner" ? budgetAmount : values.clientExpenseAmount,
      clientExpenseYear: values.clientExpenseYear,
    }

    if (flagState) {
      axios
        .patch(
          `${DefaultUrl}/api/Client-Income-Expenses/Update/${clientObj.Email}`,
          clientObj
        )
        .then((res) => {
          console.log("Client Expense  Has Successfully Been Update");
          setTRState(true);
          setFlagState(false);
          setClientExpenseState({ ...clientObj });
        });
    }
    else {
      axios
        .post(
          `${DefaultUrl}/api/Client-Income-Expenses/Add`,
          clientObj
        )
        .then((res) => {
          console.log("Client Expense  Has Successfully Been Added");
          setTRState(true);
          setClientExpenseState({ ...clientObj });
        });
    }

    resetForm();
    // setClientExpenseState({ ...clientObj })
    // setTRState(true)
  };

  let ExpanseOperation = (Option, elem, deleteData) => {

    if (Option === 1) {
      // alert("UpdateFunctionality");
      setFlagState(true);
      setTRState(false);
    } else if (Option === 2) {
      // alert("DeleteFunctionality");
      DeleteData(elem, deleteData);
    }
  };
  let DeleteData = (elem, deleteData) => {
    axios.delete(`${DefaultUrl}/api/Client-Income-Expenses/Delete/${elem.Email}`)
      .then((res) => {
        console.log("client Expense has been deleted")
        setClientExpenseState({});
      });
  }

  return (
    <div className="row my-3">
      <div className="col-md-12">
        <Card className="shadow px-4 py-4">
          <Formik
            initialValues={initialValues}
            //  validationSchema={isPartnered ? validationSchema : singleValidationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({
              values,
              setFieldValue,
              setValues,
              handleChange,
              handleBlur,
            }) => <Form>

                <h3 className="heading">
                  Expenses
                  <div className="iconContainerLg">
                    <img className="img-fluid" src={dollarBag} alt="" />
                  </div>
                </h3>
                {(tRState === false) &&
                  <div>
                    <div className="row">
                      <div className="col-4 mb-3"></div>
                      <div className="col-4 mb-3 text-center">
                        <label>
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
                        <label htmlFor="clientExpenseType" className="form-label">
                          Expense Type
                        </label>
                      </div>
                      <div className="col-4 mb-3">
                        <Field
                          id="clientExpenseType"
                          name="clientExpenseType"
                          className="form-select shadow  inputDesign"
                          as="select"
                        >
                          <option value="">Select</option>
                          <option value="Regular Living">Regular Living</option>
                          <option value="Retirement Living Expenses">Retirement Living Expenses</option>
                          <option value="use Budget Planner">use Budget Planner</option>
                          <option value="Lumpsum Expenses">Lumpsum Expenses </option>
                        </Field>
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientExpenseType"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4 mb-3">
                        <label htmlFor="clientExpensesItem" className="form-label">
                          Expenses Item (drop down for Lumpsum Expenses only)
                        </label>
                      </div>
                      <div className="col-4 mb-3">
                        <Field
                          id="clientExpensesItem"
                          name="clientExpensesItem"
                          className="form-select shadow  inputDesign"
                          as="select"
                        >
                          <option value="">Select</option>
                          <option value="Contents">Contents </option>
                          <option value="Motor Vehicle">Motor Vehicle </option>
                          <option value="Boat">Boat </option>
                          <option value="Caravan ">Caravan </option>
                          <option value="Other Lifestyle Assets">Other Lifestyle Assets</option>
                          <option value="Home Renovations">Home Renovations </option>
                          <option value="Holiday">Holiday </option>
                          <option value="Other">Other </option>
                        </Field>
                        <ErrorMessage component="div"
                          className="text-danger fw-bold"
                          name="clientExpensesItem"
                        />
                      </div>
                    </div>

                    {(values.clientExpenseType !== "use Budget Planner") &&
                      <div className="row">
                        <div className="col-4 mb-3">
                          <label htmlFor="clientExpenseAmount" className="form-label">
                            Amount
                          </label>
                        </div>
                        <div className="col-4 mb-3">
                          <Field
                            className="form-control inputDesign shadow"
                            id="clientExpenseAmount"
                            type="number"
                            name="clientExpenseAmount"
                            placeholder="Customer Reference number"
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="clientExpenseAmount"
                          />
                        </div>
                      </div>
                    }

                    {(values.clientExpenseType === "use Budget Planner") &&
                      <div className="row ">
                        <div className="col-4 mb-3">
                          <label htmlFor="" className="form-label">
                            Use Business Expense Schedule
                          </label>
                        </div>
                        <div className="col-4 mb-3">
                          <UseBudget store={setBudgetAmount} />
                        </div>
                      </div>
                    }

                    <div className="row">
                      <div className="col-4 mb-3">
                        <label htmlFor="clientExpensesItem" className="form-label">
                          Year
                        </label>
                      </div>
                      <div className="col-4 mb-3">
                        <Field
                          id="clientExpenseYear"
                          name="clientExpenseYear"
                          className="form-select shadow  inputDesign"
                          as="select"
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
                        </Field>
                        <ErrorMessage component="div"
                          className="text-danger fw-bold"
                          name="clientExpenseYear"
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
                {tRState === true && (
                  <div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="table-responsive my-3" id="childTable">
                          <table className="table table-bordered table-hover text-center">
                            <thead className="text-light" id="tableHead">
                              <tr>
                                <th>Description </th>
                                <th>Expense Type  </th>
                                <th>Year</th>
                                <th>Annual Amount</th>
                                <th onClick={() => { console.log(clientExpenseState) }}>Opt</th>
                              </tr>
                            </thead>
                            <tbody>
                              {((clientExpenseState.clientExpenseType !== "") && (clientExpenseState.clientExpenseType !== undefined)) &&
                                <tr>
                                  <td>{clientExpenseState.clientExpenseType} </td>
                                  <td>{clientExpenseState.clientExpensesItem} </td>
                                  <td>{clientExpenseState.clientExpenseYear} </td>
                                  {(clientExpenseState.clientExpenseType !== "use Budget Planner") &&
                                    <td>{clientExpenseState.clientExpenseAmount} </td>
                                  }
                                  {(clientExpenseState.clientExpenseType === "use Budget Planner") &&
                                    <td>{budgetAmount} </td>
                                  }
                                  <td><CustomDropDown Operations={ExpanseOperation}
                                    Delete={"client"}
                                    Data={clientExpenseState}
                                    FormikFun={setValues} /></td>
                                </tr>
                              }


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
                          onClick={() => setTRState(false)}
                        >
                          Add New
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </Form>}
          </Formik>
        </Card>
      </div>
    </div>
  )
}

export default Expenses
