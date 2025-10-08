import React, { useEffect, useState } from "react";


import { ErrorMessage, Field, Form, Formik } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

//image
// import single from "../../Svgs/single-2.svg";
import plus from "../images/plus.svg";
import noteBook from "../images/notebook.svg";
import Modal from "react-bootstrap/Modal";
import { Card } from "react-bootstrap";
import CustomDropDown from "../../Assets/CustomDropDown/CustomDropDown";
import { defaultUrl } from "../../../Store/Store";
import { useRecoilValue } from "recoil";


const AssetsInheritance = () => {


  let DefaultUrl = useRecoilValue(defaultUrl)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [tRState, setTRState] = useState(false);
  let [flagState, setFlagState] = useState(false);

  let [InState, setInState] = useState([]);


  useEffect(() => {

    let email = localStorage.getItem("Email");
    if (email) {
      GetApiFunction(email);
    }
  }, []);

  let GetApiFunction = async (email) => {
    try {

      let clientIn = await axios.get(`${DefaultUrl}/api/Client-Inheritance/`);
      clientIn = clientIn.data;
      clientIn = clientIn.filter((item) => item.Email === email);

      console.log(clientIn[0]);
      setInState(clientIn[0])

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

  let initialValues = {
    InheritanceDescription: "",
    InheritanceYear: "",
    InheritanceAmount: "",
  };

  let onSubmit = (values, { resetForm }) => {
    console.log(values);

    let Data = {
      Email: localStorage.getItem("Email"),

      InheritanceDescription: values.InheritanceDescription,
      InheritanceYear: values.InheritanceYear,
      InheritanceAmount: values.InheritanceAmount,
    }

    if (flagState) {
      axios
        .patch(
          `${DefaultUrl}/api/Client-Inheritance/Update/${Data.Email}`,
          Data
        )
        .then((res) => {
          console.log("Inheritance Has Successfully Been updated");

        });
    }
    else {
      axios
        .post(`${DefaultUrl}/api/Client-Inheritance/Add`, Data)
        .then((res) => {
          console.log("Inheritance Has Successfully Been Added");

        });
    }

    resetForm();
    handleClose();
    setTimeout(() => {
      GetApiFunction(Data.Email);
    }, 500);
  };

  let InOperations = (Option, elem, deleteData) => {
    if (Option == 1) {
      // alert("UpdateFunctionality");
      // setTRState(false);
      setFlagState(true);
      handleShow(true);
    } else if (Option == 2) {
      // alert("DeleteFunctionality");
      deleteApiFunc(elem, deleteData);
    }
  };

  let deleteApiFunc = (elem, deleteData) => {
    console.log(elem, deleteData);

    axios.delete(`${DefaultUrl}/api/Client-Inheritance/Delete/${elem.Email}`)
      .then((res) => { console.log("client Centre Link has been deleted"); GetApiFunction(elem.Email); });

  };

  let UpdateData = (elem) => {
    console.log(elem);
  }

  return (
    <div className="row my-3">
      <div className="col-md-12">
        <Card className="shadow px-4 py-4">

          <div>
            <h3 className="heading text-center">
              Inheritance
            </h3>
          </div>

          {(tRState == false) &&
            <div className="row mt-3">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <button
                  className="btn w-100 h-100 btn-outline-success "
                  onClick={handleShow}
                  type="button">
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Add Inheritance
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
                          <th>Description</th>
                          <th>Year</th>
                          <th>Annual Amount</th>
                          <th onClick={() => { console.log(InState) }}>Opt</th>
                        </tr>
                      </thead>
                      <tbody>

                        <tr>
                          <td>{InState.InheritanceDescription}</td>
                          <td>{InState.InheritanceYear}</td>
                          <td>{InState.InheritanceAmount}</td>
                          <td><CustomDropDown
                            Operations={InOperations}
                            Delete={InState._id}
                            Data={InState}
                            FormikFun={UpdateData}
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
                    onClick={() => setTRState(false)}>
                    Add New
                  </button>
                </div>
              </div>
            </div>
          }

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            className="modal-lg"
            keyboard={false}
          >
            <Modal.Header className="text-light modalBG " closeButton>
              <Modal.Title className="fontStyle">
                Inheritance
                <div className="iconContainerLg">
                  <img className="img-fluid" src={noteBook} alt="" />
                </div>
              </Modal.Title>
            </Modal.Header>
            <Formik
              initialValues={flagState ? InState : initialValues}
              onSubmit={onSubmit}
              enableReinitialize >
              {({ values, setFieldValue, setValues, handleChange, handleBlur, }) => <Form>

                <Modal.Body>
                  <div className="row">
                    <div className="col-4 mb-3">
                      <label
                        htmlFor="InheritanceDescription"
                        className="form-label"
                      >
                        Description
                      </label>
                    </div>
                    <div className="col-4 mb-3">
                      <Field
                        type="text"
                        className="form-control shadow inputDesign"
                        id="InheritanceDescription"
                        name="InheritanceDescription"
                        placeholder="Description"
                      />
                      <ErrorMessage
                        component="div"
                        className="text-danger fw-bold"
                        name="InheritanceDescription"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-4 mb-3">
                      <label
                        htmlFor="InheritanceYear"
                        className="form-label"
                      >
                        Years
                      </label>
                    </div>
                    <div className="col-4 mb-3">
                      <Field
                        as="select"
                        id="InheritanceYear"
                        name="InheritanceYear"
                        className="form-select shadow  inputDesign myselect"
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
                        name="InheritanceYear"
                      />
                    </div>
                  </div>

                  <div className="row ">
                    <div className="col-4 mb-3">
                      <label
                        htmlFor="InheritanceAmount"
                        className="form-label"
                      >
                        Amount
                      </label>
                    </div>
                    <div className="col-4 mb-3">
                      <Field
                        type="number"
                        className="form-control shadow inputDesign"
                        id="InheritanceAmount"
                        name="InheritanceAmount"
                        placeholder="Amount"
                      />
                      <ErrorMessage
                        component="div"
                        className="text-danger fw-bold"
                        name="InheritanceAmount"
                      />
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div className="col-md-12">
                    <button
                      type="submit"
                      className="float-end btn w-25  bgColor modalBtn"
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

              </Form>}
            </Formik>
          </Modal>


        </Card>
      </div>
    </div>
  );
};

export default AssetsInheritance;
