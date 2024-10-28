import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import single from "../Svgs/single-2.svg";
import couple from "../Svgs/couple-2.svg";
import plus from "./images/plus.svg";
import doctor from "./images/doctor.svg";
import lawyer from "./images/lawyer.svg";
import accounting from "./images/accounting.svg";
import businessman from "./images/businessman.svg";
import notebook from "./images/notebook.svg";

// import * as Yup from "yup"; //? dont Remove it you might need it later
// import "yup-phone";         //? dont Remove it you might need it later

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { CRState, StepState, defaultUrl } from "../../Store/Store";
import { Card } from "react-bootstrap";
import CustomDropDown from "../Assets/CustomDropDown/CustomDropDown";

const ProfessionalAdvisors = () => {
  
  let DefaultUrl = useRecoilValue(defaultUrl)

  let [CRObject, setCRObject] = useRecoilState(CRState); // eslint-disable-line no-unused-vars
  let [Steps, setSteps] = useRecoilState(StepState); // eslint-disable-line no-unused-vars

  const [Pro_AdvisersData, setPro_AdvisersData] = useState([]);

  const [isClientTable, setIsClientTable] = useState(false);

  let partner = window.localStorage.getItem("partner");
  const [isPartnered, setIsPartnered] = useState(); // eslint-disable-line no-unused-vars

  useEffect(() => {
    if (partner === "true") {
      setIsPartnered(true);
    } else {
      setIsPartnered(false);
    }

    let email = localStorage.getItem("Email");
    if (email) {
      GetApiFunction(email);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let GetApiFunction = async (email) => {
    try {

      let clientIn = await axios.get(`${DefaultUrl}/api/Client-ProfessionalAdvisor-Modal/`);
      clientIn = clientIn.data;
      clientIn = clientIn.filter((item) => item.Email === email);

      // console.log(clientIn[0]);
      // setPro_AdvisersData([clientIn[0]]);


      let partnerIn = await axios.get(`${DefaultUrl}/api/Partner-ProfessionalAdvisor-Modal/`);
      partnerIn = partnerIn.data;
      partnerIn = partnerIn.filter((item) => item.Email === email);

      let combo = { ...clientIn[0], ...partnerIn[0] };

      console.log(combo);
      setPro_AdvisersData([combo]);

      if ((clientIn.length !== 0) || (partnerIn.length !== 0)) {
        setIsClientTable(true);
      }
      else {
        setIsClientTable(false);
      }

    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // let letters = /^[a-zA-Z ]*$/;         //? dont Remove it you might need it later
  // let phonePattern = /^[1-9][0-9]{9}$/; //? dont Remove it you might need it later

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let Client_initialValues = {
    clientSolicitor_Name: "",
    clientSolicitor_Company: "",
    clientSolicitor_Phone: "",
    clientSolicitor_Email: "",

    clientAccountant_Name: "",
    clientAccountant_Company: "",
    clientAccountant_Phone: "",
    clientAccountant_Email: "",

    clientInsuranceAdvisor_Name: "",
    clientInsuranceAdvisor_Company: "",
    clientInsuranceAdvisor_Phone: "",
    clientInsuranceAdvisor_Email: "",

    clientDoctor_Name: "",
    clientDoctor_Company: "",
    clientDoctor_Phone: "",
    clientDoctor_Email: "",

    clientOther_Name: "",
    clientOther_Company: "",
    clientOther_Phone: "",
    clientOther_Email: "",


    //? Partner Data fields

    partnerSolicitor_Name: "",
    partnerSolicitor_Company: "",
    partnerSolicitor_Phone: "",
    partnerSolicitor_Email: "",

    partnerAccountant_Name: "",
    partnerAccountant_Company: "",
    partnerAccountant_Phone: "",
    partnerAccountant_Email: "",

    partnerInsuranceAdvisor_Name: "",
    partnerInsuranceAdvisor_Company: "",
    partnerInsuranceAdvisor_Phone: "",
    partnerInsuranceAdvisor_Email: "",

    partnerDoctor_Name: "",
    partnerDoctor_Company: "",
    partnerDoctor_Phone: "",
    partnerDoctor_Email: "",

    partnerOther_Name: "",
    partnerOther_Company: "",
    partnerOther_Phone: "",
    partnerOther_Email: "",
  };

  //? dont Remove it you might need it later
  // let Client_validationSchema = Yup.object({ 
  //   Solicitor_Name: Yup.string().matches(letters, "Only letters"),
  //   Solicitor_Company: Yup.string().matches(letters, "Only letters"),
  //   Solicitor_Phone: Yup.string().matches(phonePattern, "invalid phone number"),
  //   Solicitor_Email: Yup.string().email("Invalid email format"),
  //   Accountant_Name: Yup.string().matches(letters, "Only letters"),
  //   Accountant_Company: Yup.string().matches(letters, "Only letters"),
  //   Accountant_Phone: Yup.string().matches(
  //     phonePattern,
  //     "invalid phone number"
  //   ),
  //   Accountant_Email: Yup.string().email("Invalid email format"),
  //   InsuranceAdvisor_Name: Yup.string().matches(letters, "Only letters"),
  //   InsuranceAdvisor_Company: Yup.string().matches(letters, "Only letters"),
  //   InsuranceAdvisor_Phone: Yup.string().matches(
  //     phonePattern,
  //     "invalid phone number"
  //   ),
  //   InsuranceAdvisor_Email: Yup.string().email("Invalid email format"),
  //   Doctor_Name: Yup.string().matches(letters, "Only letters"),
  //   Doctor_Company: Yup.string().matches(letters, "Only letters"),
  //   Doctor_Phone: Yup.string().matches(phonePattern, "invalid phone number"),
  //   Doctor_Email: Yup.string().email("Invalid email format"),
  //   Other_Name: Yup.string().matches(letters, "Only letters"),
  //   Other_Company: Yup.string().matches(letters, "Only letters"),
  //   Other_Phone: Yup.string().matches(phonePattern, "invalid phone number"),
  //   Other_Email: Yup.string()
  //     .email("Invalid email format")
  //     .required("Required"),
  // });

  let Client_onSubmit = (values) => {
    let ClientModalDetails = {
      Email: localStorage.getItem("Email"),
      clientSolicitor_Name: values.clientSolicitor_Name,
      clientSolicitor_Company: values.clientSolicitor_Company,
      clientSolicitor_Phone: values.clientSolicitor_Phone,
      clientSolicitor_Email: values.clientSolicitor_Email,

      clientAccountant_Name: values.clientAccountant_Name,
      clientAccountant_Company: values.clientAccountant_Company,
      clientAccountant_Phone: values.clientAccountant_Phone,
      clientAccountant_Email: values.clientAccountant_Email,

      clientInsuranceAdvisor_Name: values.clientInsuranceAdvisor_Name,
      clientInsuranceAdvisor_Company: values.clientInsuranceAdvisor_Company,
      clientInsuranceAdvisor_Phone: values.clientInsuranceAdvisor_Phone,
      clientInsuranceAdvisor_Email: values.clientInsuranceAdvisor_Email,

      clientDoctor_Name: values.clientDoctor_Name,
      clientDoctor_Company: values.clientDoctor_Company,
      clientDoctor_Phone: values.clientDoctor_Phone,
      clientDoctor_Email: values.clientDoctor_Email,

      clientOther_Name: values.clientOther_Name,
      clientOther_Company: values.clientOther_Company,
      clientOther_Phone: values.clientOther_Phone,
      clientOther_Email: values.clientOther_Email,
    };

    let PartnerModalDetails = {
      Email: localStorage.getItem("Email"),
      partnerSolicitor_Name: values.partnerSolicitor_Name,
      partnerSolicitor_Company: values.partnerSolicitor_Company,
      partnerSolicitor_Phone: values.partnerSolicitor_Phone,
      partnerSolicitor_Email: values.partnerSolicitor_Email,

      partnerAccountant_Name: values.partnerAccountant_Name,
      partnerAccountant_Company: values.partnerAccountant_Company,
      partnerAccountant_Phone: values.partnerAccountant_Phone,
      partnerAccountant_Email: values.partnerAccountant_Email,

      partnerInsuranceAdvisor_Name: values.partnerInsuranceAdvisor_Name,
      partnerInsuranceAdvisor_Company: values.partnerInsuranceAdvisor_Company,
      partnerInsuranceAdvisor_Phone: values.partnerInsuranceAdvisor_Phone,
      partnerInsuranceAdvisor_Email: values.partnerInsuranceAdvisor_Email,

      partnerDoctor_Name: values.partnerDoctor_Name,
      partnerDoctor_Company: values.partnerDoctor_Company,
      partnerDoctor_Phone: values.partnerDoctor_Phone,
      partnerDoctor_Email: values.partnerDoctor_Email,

      partnerOther_Name: values.partnerOther_Name,
      partnerOther_Company: values.partnerOther_Company,
      partnerOther_Phone: values.partnerOther_Phone,
      partnerOther_Email: values.partnerOther_Email,
    };

    // let combo = { ...ClientModalDetails, ...PartnerModalDetails }

    // setPro_AdvisersData([combo]);

    if (isClientTable) {
      //patch

      axios.patch(`${DefaultUrl}/api/Client-ProfessionalAdvisor-Modal/Update-Client-AdvisorModal/${ClientModalDetails.Email}`, ClientModalDetails)
        .then((res) => console.log("Client Advisor Modal Update Successfully!"));

      axios.patch(`${DefaultUrl}/api/Partner-ProfessionalAdvisor-Modal/Update-Partner-AdvisorModal/${ClientModalDetails.Email}`, PartnerModalDetails)
        .then((res) => console.log("Partner Advisor Modal Update Successfully!"));
    }
    else {
      //post
      axios.post(`${DefaultUrl}/api/Client-ProfessionalAdvisor-Modal/Add-Client-AdvisorModal`, ClientModalDetails)
        .then((res) => console.log("Client Advisor Modal Added Successfully!"));

      axios.post(`${DefaultUrl}/api/Partner-ProfessionalAdvisor-Modal/Add-Partner-AdvisorModal`, PartnerModalDetails)
        .then((res) => console.log("Partner Advisor Modal Added Successfully!"));


    }

    setTimeout(() => {
      GetApiFunction(ClientModalDetails.Email);
    }, 500);

    // setIsClientTable(true);
    handleClose();

  };

  let initialValues = {
    ProfessionalAdvisors1radio: "No",
    ProfessionalAdvisors2radio: "No",
  };

  let Navigate = useNavigate();

  function BackFunction() {
    setSteps(3);
    localStorage.setItem("Steps", 3);
    Navigate("/Income-And-Expenses");
  }

  let onSubmit = (values) => {
    setSteps(5);
    localStorage.setItem("Steps", 5);
    Navigate("/Assets-And-Liabilities");
  };


  let PAOperations = (Option, elem, deleteData) => {
    if (Option === 1) {
      setShow(true);
    } else if (Option === 2) {
      deleteApiFunc(elem, deleteData);
    }
  };

  let deleteApiFunc = (elem, deleteData) => {
    console.log(elem, deleteData);
    let deleteDataOF;
    switch (deleteData) {
      case "clientSolicitor":

        // alert("Deleting Solicitor");
        deleteDataOF = "Solicitor";
        axios.delete(`${DefaultUrl}/api/Client-ProfessionalAdvisor-Modal/Delete-Client-AdvisorModal/${elem.Email}/${deleteDataOF}`)
          .then((res) => { console.log("Client Solicitor has been deleted"); });

        // GetApiFunction(elem.Email);
        break;
      case "clientInsurance":
        deleteDataOF = "InsuranceAdvisor";
        axios.delete(`${DefaultUrl}/api/Client-ProfessionalAdvisor-Modal/Delete-Client-AdvisorModal/${elem.Email}/${deleteDataOF}`)
          .then((res) => { console.log("Client Insurance has been deleted"); });
        break;
      case "clientDoctor":
        deleteDataOF = "Doctor";
        axios.delete(`${DefaultUrl}/api/Client-ProfessionalAdvisor-Modal/Delete-Client-AdvisorModal/${elem.Email}/${deleteDataOF}`)
          .then((res) => { console.log("Client Doctor has been deleted"); });
        break;
      case "clientAccountant":
        deleteDataOF = "Accountant";
        axios.delete(`${DefaultUrl}/api/Client-ProfessionalAdvisor-Modal/Delete-Client-AdvisorModal/${elem.Email}/${deleteDataOF}`)
          .then((res) => { console.log("Client Accountant has been deleted"); });
        break;
      case "clientOther":
        deleteDataOF = "Other";
        axios.delete(`${DefaultUrl}/api/Client-ProfessionalAdvisor-Modal/Delete-Client-AdvisorModal/${elem.Email}/${deleteDataOF}`)
          .then((res) => { console.log("Client Other has been deleted"); });
        break;

      //Partner

      case "partnerSolicitor":
        deleteDataOF = "Solicitor";
        axios.delete(`${DefaultUrl}/api/Partner-ProfessionalAdvisor-Modal/Delete-Partner-AdvisorModal/${elem.Email}/${deleteDataOF}`)
          .then((res) => { console.log("Partner Solicitor has been deleted"); });
        break;
      case "partnerInsurance":
        deleteDataOF = "InsuranceAdvisor";
        axios.delete(`${DefaultUrl}/api/Partner-ProfessionalAdvisor-Modal/Delete-Partner-AdvisorModal/${elem.Email}/${deleteDataOF}`)
          .then((res) => { console.log("Partner Insurance has been deleted"); });
        break;
      case "partnerDoctor":
        deleteDataOF = "Doctor";
        axios.delete(`${DefaultUrl}/api/Partner-ProfessionalAdvisor-Modal/Delete-Partner-AdvisorModal/${elem.Email}/${deleteDataOF}`)
          .then((res) => { console.log("Partner Doctor has been deleted"); });
        break;
      case "partnerAccountant":
        deleteDataOF = "Accountant";
        axios.delete(`${DefaultUrl}/api/Partner-ProfessionalAdvisor-Modal/Delete-Partner-AdvisorModal/${elem.Email}/${deleteDataOF}`)
          .then((res) => { console.log("Partner Accountant has been deleted"); });
        break;
      case "partnerOther":
        deleteDataOF = "Other";
        axios.delete(`${DefaultUrl}/api/Partner-ProfessionalAdvisor-Modal/Delete-Partner-AdvisorModal/${elem.Email}/${deleteDataOF}`)
          .then((res) => { console.log("Partner Other has been deleted"); });
        break;
      default:
        console.log("Error in Delete Data props");
        break;
    }

    setTimeout(() => {
      GetApiFunction(elem.Email);
    }, 500);

  };

  let UpdateData = (elem) => {
    console.log(elem);
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row m-0 px-0">
          <div className="col-md-2"></div>
          <div className="col-md-12">
            {/*Expenses */}
            <div className="row my-3">
              <div className="col-md-12">
                <Card className="shadow px-4 py-4">
                  <h3 className="text-center">Professional Advisors</h3>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    enableReinitialize
                  >
                    {({ values, handleChange }) => (
                      <Form>
                        {CRObject.ProfessionalAdvisersIssuesradio === "Yes" && (
                          <div>
                            {/* Client Professional Advisors */}
                            <div>
                              {/* 1 row */}
                              {!isClientTable && (
                                <div className="row">
                                  <div className="col-md-12 text-center mt-3">
                                    <button
                                      type="button"
                                      className="btn w-25 btn-outline-success "
                                      onClick={handleShow}
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
                                  </div>

                                </div>
                              )}
                              {/* 1 row */}
                              {/* -------------bank accounts modal---------------------------- */}
                              <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                className="modal-lg"
                                keyboard={false}
                              >
                                <Modal.Header
                                  className="text-light modalBG "
                                  closeButton
                                >
                                  <Modal.Title className="fontStyle">
                                    Professional Advisor Detail
                                    <div className="iconContainerLg">
                                      <img
                                        className="img-fluid"
                                        src={notebook}
                                        alt=""
                                      />
                                    </div>
                                  </Modal.Title>
                                </Modal.Header>
                                <Formik
                                  initialValues={Pro_AdvisersData.length ? Pro_AdvisersData[0] : Client_initialValues}
                                  // validationSchema={Client_validationSchema}
                                  onSubmit={Client_onSubmit}
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
                                        {/* Professional Advisor Detail Form */}

                                        <div className="">
                                          {/* Solicitor */}
                                          <div className=" ">
                                            <h3 className="">
                                              <div className="iconContainerLg mx-1">
                                                <img
                                                  className="img-fluid"
                                                  src={lawyer}
                                                  alt=""
                                                />
                                              </div>
                                              Solicitor
                                            </h3>

                                            <div className="row">
                                              <div className="col-4">

                                              </div>
                                              <div className="col-4 text-center">
                                                <label

                                                  className="form-label  form-label  clientFS green mb-3 p-0 "
                                                >
                                                  Client
                                                  <div className="iconContainerLg m-0 p-0">
                                                    <img
                                                      src={single}
                                                      alt="single svg"
                                                      className="w-50 "
                                                    />
                                                  </div>
                                                </label>
                                              </div>
                                              <div className="col-4 text-center">
                                                <label

                                                  className="form-label form-label  clientFS green mb-3 p-0 "
                                                >
                                                  Partner
                                                  <div className="iconContainerLg m-0 p-0">
                                                    <img
                                                      src={couple}
                                                      alt="single svg"
                                                      className="w-50 "
                                                    />
                                                  </div>
                                                </label>
                                              </div>
                                            </div>


                                            <div className="row">
                                              <div className="col-4">
                                                <label
                                                  htmlFor="clientSolicitor_Name"
                                                  className="form-label"
                                                >
                                                  Name
                                                </label>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    id="clientSolicitor_Name"
                                                    name="clientSolicitor_Name"
                                                    placeholder="Name"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="clientSolicitor_Name"
                                                  />
                                                </div>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    id="partnerSolicitor_Name"
                                                    name="partnerSolicitor_Name"
                                                    placeholder="Name"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="partnerSolicitor_Name"
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div className="col-4">
                                                <label
                                                  htmlFor="clientSolicitor_Company"
                                                  className="form-label"
                                                >
                                                  Company
                                                </label>
                                              </div>
                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    id="clientSolicitor_Company"
                                                    name="clientSolicitor_Company"
                                                    placeholder="Company"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="clientSolicitor_Company"
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    id="partnerSolicitor_Company"
                                                    name="partnerSolicitor_Company"
                                                    placeholder="Company"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="partnerSolicitor_Company"
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div className="col-4">
                                                <label
                                                  htmlFor="clientSolicitor_Phone"
                                                  className="form-label"
                                                >
                                                  Phone
                                                </label>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="number"
                                                    className="form-control shadow inputDesign"
                                                    id="clientSolicitor_Phone"
                                                    name="clientSolicitor_Phone"
                                                    placeholder="Phone"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="clientSolicitor_Phone"
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="number"
                                                    className="form-control shadow inputDesign"
                                                    id="partnerSolicitor_Phone"
                                                    name="partnerSolicitor_Phone"
                                                    placeholder="Phone"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="partnerSolicitor_Phone"
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div className="col-4">
                                                <label
                                                  htmlFor="clientSolicitor_Email"
                                                  className="form-label"
                                                >
                                                  Email
                                                </label>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="email"
                                                    className="form-control shadow inputDesign"
                                                    id="clientSolicitor_Email"
                                                    name="clientSolicitor_Email"
                                                    placeholder="Email"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="clientSolicitor_Email"
                                                  />
                                                </div>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="email"
                                                    className="form-control shadow inputDesign"
                                                    id="partnerSolicitor_Email"
                                                    name="partnerSolicitor_Email"
                                                    placeholder="Email"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="partnerSolicitor_Email"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          {/* Solicitor */}

                                          {/* Accountant */}
                                          <div className="my-2 ">
                                            <h3 className="mt-1">
                                              <div className="iconContainerLg mx-1">
                                                <img
                                                  className="img-fluid"
                                                  src={accounting}
                                                  alt=""
                                                />
                                              </div>
                                              Accountant
                                            </h3>

                                            <div className="row">
                                              <div className="col-4">
                                                <label
                                                  htmlFor="clientAccountant_Name"
                                                  className="form-label"
                                                >
                                                  Name
                                                </label>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    id="clientAccountant_Name"
                                                    name="clientAccountant_Name"
                                                    placeholder="Name"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="clientAccountant_Name"
                                                  />
                                                </div>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    id="partnerAccountant_Name"
                                                    name="partnerAccountant_Name"
                                                    placeholder="Name"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="partnerAccountant_Name"
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div className="col-4">
                                                <label
                                                  htmlFor="clientAccountant_Company"
                                                  className="form-label"
                                                >
                                                  Company
                                                </label>
                                              </div>
                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    id="clientAccountant_Company"
                                                    name="clientAccountant_Company"
                                                    placeholder="Company"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="clientAccountant_Company"
                                                  />
                                                </div>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    id="partnerAccountant_Company"
                                                    name="partnerAccountant_Company"
                                                    placeholder="Company"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="partnerAccountant_Company"
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div className="col-4">
                                                <label
                                                  htmlFor="clientAccountant_Phone"
                                                  className="form-label"
                                                >
                                                  Phone
                                                </label>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="number"
                                                    className="form-control shadow inputDesign"
                                                    id="clientAccountant_Phone"
                                                    name="clientAccountant_Phone"
                                                    placeholder="Phone"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="clientAccountant_Phone"
                                                  />
                                                </div>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="number"
                                                    className="form-control shadow inputDesign"
                                                    id="partnerAccountant_Phone"
                                                    name="partnerAccountant_Phone"
                                                    placeholder="Phone"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="partnerAccountant_Phone"
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div className="col-4">
                                                <label
                                                  htmlFor="clientAccountant_Email"
                                                  className="form-label"
                                                >
                                                  Email
                                                </label>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="email"
                                                    className="form-control shadow inputDesign"
                                                    id="clientAccountant_Email"
                                                    name="clientAccountant_Email"
                                                    placeholder="Email"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="clientAccountant_Email"
                                                  />
                                                </div>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="email"
                                                    className="form-control shadow inputDesign"
                                                    id="partnerAccountant_Email"
                                                    name="partnerAccountant_Email"
                                                    placeholder="Email"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="partnerAccountant_Email"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          {/* Accountant */}

                                          {/* InsuranceAdvisor */}
                                          <div className="my-2">
                                            <h3 className="mt-1">
                                              <div className="iconContainerLg mx-1">
                                                <img
                                                  className="img-fluid"
                                                  src={businessman}
                                                  alt=""
                                                />
                                              </div>
                                              Insurance Advisor
                                            </h3>

                                            <div className="row">
                                              <div className="col-4">
                                                <label
                                                  htmlFor="clientInsuranceAdvisor_Name"
                                                  className="form-label"
                                                >
                                                  Name
                                                </label>
                                              </div>
                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    id="clientInsuranceAdvisor_Name"
                                                    name="clientInsuranceAdvisor_Name"
                                                    placeholder="Name"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="clientInsuranceAdvisor_Name"
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    id="partnerInsuranceAdvisor_Name"
                                                    name="partnerInsuranceAdvisor_Name"
                                                    placeholder="Name"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="partnerInsuranceAdvisor_Name"
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div className="col-4">
                                                <label
                                                  htmlFor="clientInsuranceAdvisor_Company"
                                                  className="form-label"
                                                >
                                                  Company
                                                </label>
                                              </div>
                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    id="clientInsuranceAdvisor_Company"
                                                    name="clientInsuranceAdvisor_Company"
                                                    placeholder="Company"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="clientInsuranceAdvisor_Company"
                                                  />
                                                </div>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    id="partnerInsuranceAdvisor_Company"
                                                    name="partnerInsuranceAdvisor_Company"
                                                    placeholder="Company"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="partnerInsuranceAdvisor_Company"
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div className="col-4">
                                                <label
                                                  htmlFor="clientInsuranceAdvisor_Phone"
                                                  className="form-label"
                                                >
                                                  Phone
                                                </label>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="number"
                                                    className="form-control shadow inputDesign"
                                                    id="clientInsuranceAdvisor_Phone"
                                                    name="clientInsuranceAdvisor_Phone"
                                                    placeholder="Phone"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="clientInsuranceAdvisor_Phone"
                                                  />
                                                </div>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="number"
                                                    className="form-control shadow inputDesign"
                                                    id="partnerInsuranceAdvisor_Phone"
                                                    name="partnerInsuranceAdvisor_Phone"
                                                    placeholder="Phone"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="partnerInsuranceAdvisor_Phone"
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div className="col-4">
                                                <label
                                                  htmlFor="clientInsuranceAdvisor_Email"
                                                  className="form-label"
                                                >
                                                  Email
                                                </label>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="email"
                                                    className="form-control shadow inputDesign"
                                                    id="clientInsuranceAdvisor_Email"
                                                    name="clientInsuranceAdvisor_Email"
                                                    placeholder="Email"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="clientInsuranceAdvisor_Email"
                                                  />
                                                </div>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="email"
                                                    className="form-control shadow inputDesign"
                                                    id="partnerInsuranceAdvisor_Email"
                                                    name="partnerInsuranceAdvisor_Email"
                                                    placeholder="Email"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="partnerInsuranceAdvisor_Email"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          {/* Insurance Advisor */}

                                          {/* Doctor */}
                                          <div className="my-2">
                                            <h3 className="mt-1">
                                              <div className="iconContainerLg mx-1">
                                                <img
                                                  className="img-fluid"
                                                  src={doctor}
                                                  alt=""
                                                />
                                              </div>
                                              Doctor
                                            </h3>

                                            <div className="row">
                                              <div className="col-4">
                                                <label
                                                  htmlFor="clientDoctor_Name"
                                                  className="form-label"
                                                >
                                                  Name
                                                </label>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    id="clientDoctor_Name"
                                                    name="clientDoctor_Name"
                                                    placeholder="Name"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="clientDoctor_Name"
                                                  />
                                                </div>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    id="partnerDoctor_Name"
                                                    name="partnerDoctor_Name"
                                                    placeholder="Name"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="partnerDoctor_Name"
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div className="col-4">
                                                <label
                                                  htmlFor="clientDoctor_Company"
                                                  className="form-label"
                                                >
                                                  Company
                                                </label>
                                              </div>
                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    id="clientDoctor_Company"
                                                    name="clientDoctor_Company"
                                                    placeholder="Company"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="clientDoctor_Company"
                                                  />
                                                </div>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    id="partnerDoctor_Company"
                                                    name="partnerDoctor_Company"
                                                    placeholder="Company"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="partnerDoctor_Company"
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div className="col-4">
                                                <label
                                                  htmlFor="clientDoctor_Phone"
                                                  className="form-label"
                                                >
                                                  Phone
                                                </label>
                                              </div>
                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="number"
                                                    className="form-control shadow inputDesign"
                                                    id="clientDoctor_Phone"
                                                    name="clientDoctor_Phone"
                                                    placeholder="Phone"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="clientDoctor_Phone"
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="number"
                                                    className="form-control shadow inputDesign"
                                                    id="partnerDoctor_Phone"
                                                    name="partnerDoctor_Phone"
                                                    placeholder="Phone"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="partnerDoctor_Phone"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-4">
                                                <label
                                                  htmlFor="clientDoctor_Email"
                                                  className="form-label"
                                                >
                                                  Email
                                                </label>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="email"
                                                    className="form-control shadow inputDesign"
                                                    id="clientDoctor_Email"
                                                    name="clientDoctor_Email"
                                                    placeholder="Email"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="clientDoctor_Email"
                                                  />
                                                </div>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="email"
                                                    className="form-control shadow inputDesign"
                                                    id="partnerDoctor_Email"
                                                    name="partnerDoctor_Email"
                                                    placeholder="Email"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="partnerDoctor_Email"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          {/* Doctor */}

                                          {/* Other */}
                                          <div className="my-2">
                                            <h3 className="mt-1">
                                              <div className="iconContainerLg mx-1">
                                                <img
                                                  className="img-fluid"
                                                  src={businessman}
                                                  alt=""
                                                />
                                              </div>
                                              Other
                                            </h3>
                                            <div className="row">
                                              <div className="col-4">
                                                <label
                                                  htmlFor="clientOther_Name"
                                                  className="form-label"
                                                >
                                                  Name
                                                </label>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    id="clientOther_Name"
                                                    name="clientOther_Name"
                                                    placeholder="Name"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="clientOther_Name"
                                                  />
                                                </div>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    id="partnerOther_Name"
                                                    name="partnerOther_Name"
                                                    placeholder="Name"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="partnerOther_Name"
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div className="col-4">
                                                <label
                                                  htmlFor="clientOther_Company"
                                                  className="form-label"
                                                >
                                                  Company
                                                </label>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    id="clientOther_Company"
                                                    name="clientOther_Company"
                                                    placeholder="Company"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="clientOther_Company"
                                                  />
                                                </div>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    id="partnerOther_Company"
                                                    name="partnerOther_Company"
                                                    placeholder="Company"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="partnerOther_Company"
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div className="col-4">
                                                <label
                                                  htmlFor="clientOther_Phone"
                                                  className="form-label"
                                                >
                                                  Phone
                                                </label>
                                              </div>
                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="number"
                                                    className="form-control shadow inputDesign"
                                                    id="clientOther_Phone"
                                                    name="clientOther_Phone"
                                                    placeholder="Phone"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="clientOther_Phone"
                                                  />
                                                </div>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="number"
                                                    className="form-control shadow inputDesign"
                                                    id="partnerOther_Phone"
                                                    name="partnerOther_Phone"
                                                    placeholder="Phone"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="partnerOther_Phone"
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div className="col-4">
                                                <label
                                                  htmlFor="clientOther_Email"
                                                  className="form-label"
                                                >
                                                  Email
                                                </label>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="email"
                                                    className="form-control shadow inputDesign"
                                                    id="clientOther_Email"
                                                    name="clientOther_Email"
                                                    placeholder="Email"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="clientOther_Email"
                                                  />
                                                </div>
                                              </div>

                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <Field
                                                    type="email"
                                                    className="form-control shadow inputDesign"
                                                    id="partnerOther_Email"
                                                    name="partnerOther_Email"
                                                    placeholder="Email"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="partnerOther_Email"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          {/* Other */}
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
                              {/* -------------Client Professional Advisors modal---------------------------- */}
                            </div>
                            {/* Client Professional Advisors */}

                            {/* Table Client Professional Advisors */}
                            {isClientTable && (
                              <div className="table-responsive my-3">
                                <table className="table table-bordered table-hover text-center">
                                  <thead className="text-light" id="tableHead">
                                    <tr>
                                      <th>Advisor</th>
                                      <th>Name</th>
                                      <th>Company</th>
                                      <th>Phone</th>
                                      <th>Email</th>
                                      <th>Operations</th>
                                    </tr>
                                  </thead>
                                  <tbody>

                                    {Pro_AdvisersData.map((elem, index) => {
                                      let { clientSolicitor_Name, clientSolicitor_Company, clientSolicitor_Phone, clientSolicitor_Email } = elem;
                                      if ((clientSolicitor_Name) && (clientSolicitor_Company)) {
                                        return (
                                          <tr key={index}>
                                            <td className="fw-bold">
                                              Solicitor
                                            </td>
                                            <td>{clientSolicitor_Name}</td>
                                            <td>{clientSolicitor_Company}</td>
                                            <td>{clientSolicitor_Phone}</td>
                                            <td>{clientSolicitor_Email}</td>
                                            <td>
                                              <CustomDropDown
                                                Operations={PAOperations}
                                                Delete={"clientSolicitor"}
                                                Data={Pro_AdvisersData[0]}
                                                FormikFun={UpdateData} />
                                            </td>
                                          </tr>
                                        );
                                      }
                                      else {
                                        return("")
                                      }
                                    })}

                                    {Pro_AdvisersData.map((elem, index) => {
                                      let { clientAccountant_Name, clientAccountant_Company, clientAccountant_Phone, clientAccountant_Email } = elem;
                                      if ((clientAccountant_Name) && (clientAccountant_Company)) {
                                        return (
                                          <tr key={index}>
                                            <td className="fw-bold">
                                              Accountant
                                            </td>
                                            <td>{clientAccountant_Name}</td>
                                            <td>{clientAccountant_Company}</td>
                                            <td>{clientAccountant_Phone}</td>
                                            <td>{clientAccountant_Email}</td>
                                            <td>
                                              <CustomDropDown
                                                Operations={PAOperations}
                                                Delete={"clientAccountant"}
                                                Data={Pro_AdvisersData[0]}
                                                FormikFun={UpdateData}
                                              />
                                            </td>
                                          </tr>
                                        );
                                      }
                                      else {
                                        return("")
                                      }
                                    })}

                                    {Pro_AdvisersData.map((elem, index) => {
                                      let { clientInsuranceAdvisor_Name, clientInsuranceAdvisor_Company, clientInsuranceAdvisor_Phone, clientInsuranceAdvisor_Email } = elem;
                                      if ((clientInsuranceAdvisor_Name) && (clientInsuranceAdvisor_Company)) {
                                        return (
                                          <tr key={index}>
                                            <td className="fw-bold">
                                              Insurance
                                            </td>
                                            <td>{clientInsuranceAdvisor_Name}</td>
                                            <td>{clientInsuranceAdvisor_Company}</td>
                                            <td>{clientInsuranceAdvisor_Phone}</td>
                                            <td>{clientInsuranceAdvisor_Email}</td>
                                            <td>
                                              <CustomDropDown
                                                Operations={PAOperations}
                                                Delete={"clientInsurance"}
                                                Data={Pro_AdvisersData[0]}
                                                FormikFun={UpdateData} />
                                            </td>
                                          </tr>
                                        );
                                      }
                                      else {
                                        return("")
                                      }
                                    })}

                                    {Pro_AdvisersData.map((elem, index) => {
                                      let { clientDoctor_Name, clientDoctor_Company, clientDoctor_Phone, clientDoctor_Email } = elem;
                                      if ((clientDoctor_Name) && (clientDoctor_Company)) {
                                        return (
                                          <tr key={index}>
                                            <td className="fw-bold">
                                              Doctor
                                            </td>
                                            <td>{clientDoctor_Name}</td>
                                            <td>{clientDoctor_Company}</td>
                                            <td>{clientDoctor_Phone}</td>
                                            <td>{clientDoctor_Email}</td>
                                            <td>
                                              <CustomDropDown
                                                Operations={PAOperations}
                                                Delete={"clientDoctor"}
                                                Data={Pro_AdvisersData[0]}
                                                FormikFun={UpdateData} />
                                            </td>
                                          </tr>
                                        );
                                      }
                                      else {
                                        return("")
                                      }

                                    })}

                                    {Pro_AdvisersData.map((elem, index) => {
                                      let { clientOther_Name, clientOther_Company, clientOther_Phone, clientOther_Email } = elem;
                                      if ((clientOther_Name) && (clientOther_Company)) {
                                        return (
                                          <tr key={index}>
                                            <td className="fw-bold">
                                              Other
                                            </td>
                                            <td>{clientOther_Name}</td>
                                            <td>{clientOther_Company}</td>
                                            <td>{clientOther_Phone}</td>
                                            <td>{clientOther_Email}</td>
                                            <td>
                                              <CustomDropDown Operations={PAOperations}
                                                Delete={"clientOther"}
                                                Data={Pro_AdvisersData[0]}
                                                FormikFun={UpdateData} />
                                            </td>
                                          </tr>
                                        );
                                      }
                                      else {
                                        return("")
                                      }
                                    })}

                                    {/* Partner */}

                                    {Pro_AdvisersData.map((elem, index) => {
                                      let { partnerSolicitor_Name, partnerSolicitor_Company, partnerSolicitor_Phone, partnerSolicitor_Email } = elem;
                                      if ((partnerSolicitor_Name) && (partnerSolicitor_Company)) {
                                        return (
                                          <tr key={index}>
                                            <td className="fw-bold">
                                              Solicitor
                                            </td>
                                            <td>{partnerSolicitor_Name}</td>
                                            <td>{partnerSolicitor_Company}</td>
                                            <td>{partnerSolicitor_Phone}</td>
                                            <td>{partnerSolicitor_Email}</td>
                                            <td>
                                              <CustomDropDown Operations={PAOperations}
                                                Delete={"partnerSolicitor"}
                                                Data={Pro_AdvisersData[0]}
                                                FormikFun={UpdateData} />
                                            </td>
                                          </tr>
                                        );
                                      }
                                      else {
                                        return("")
                                      }
                                    })}

                                    {Pro_AdvisersData.map((elem, index) => {
                                      let { partnerAccountant_Name, partnerAccountant_Company, partnerAccountant_Phone, partnerAccountant_Email } = elem;
                                      if ((partnerAccountant_Name) && (partnerAccountant_Company)) {
                                        return (
                                          <tr key={index}>
                                            <td className="fw-bold">
                                              Accountant
                                            </td>
                                            <td>{partnerAccountant_Name}</td>
                                            <td>{partnerAccountant_Company}</td>
                                            <td>{partnerAccountant_Phone}</td>
                                            <td>{partnerAccountant_Email}</td>
                                            <td>
                                              <CustomDropDown
                                                Operations={PAOperations}
                                                Delete={"partnerAccountant"}
                                                Data={Pro_AdvisersData[0]}
                                                FormikFun={UpdateData} />
                                            </td>
                                          </tr>
                                        );
                                      }
                                      else {
                                        return("")
                                      }
                                    })}

                                    {Pro_AdvisersData.map((elem, index) => {
                                      let { partnerInsuranceAdvisor_Name, partnerInsuranceAdvisor_Company, partnerInsuranceAdvisor_Phone, partnerInsuranceAdvisor_Email } = elem;
                                      if ((partnerInsuranceAdvisor_Name) && (partnerInsuranceAdvisor_Company)) {
                                        return (
                                          <tr key={index}>
                                            <td className="fw-bold">
                                              Insurance
                                            </td>
                                            <td>{partnerInsuranceAdvisor_Name}</td>
                                            <td>{partnerInsuranceAdvisor_Company}</td>
                                            <td>{partnerInsuranceAdvisor_Phone}</td>
                                            <td>{partnerInsuranceAdvisor_Email}</td>
                                            <td>
                                              <CustomDropDown Operations={PAOperations}
                                                Delete={"partnerInsurance"}
                                                Data={Pro_AdvisersData[0]}
                                                FormikFun={UpdateData} />
                                            </td>
                                          </tr>
                                        );
                                      }
                                      else {
                                        return("")
                                      }
                                    })}

                                    {Pro_AdvisersData.map((elem, index) => {
                                      let { partnerDoctor_Name, partnerDoctor_Company, partnerDoctor_Phone, partnerDoctor_Email } = elem;
                                      if ((partnerDoctor_Name) && (partnerDoctor_Company)) {
                                        return (
                                          <tr key={index}>
                                            <td className="fw-bold">
                                              Doctor
                                            </td>
                                            <td>{partnerDoctor_Name}</td>
                                            <td>{partnerDoctor_Company}</td>
                                            <td>{partnerDoctor_Phone}</td>
                                            <td>{partnerDoctor_Email}</td>
                                            <td>
                                              <CustomDropDown Operations={PAOperations}
                                                Delete={"partnerDoctor"}
                                                Data={Pro_AdvisersData[0]}
                                                FormikFun={UpdateData} />
                                            </td>
                                          </tr>
                                        );
                                      }
                                      else {
                                        return("")
                                      }
                                    })}

                                    {Pro_AdvisersData.map((elem, index) => {
                                      let { partnerOther_Name, partnerOther_Company, partnerOther_Phone, partnerOther_Email } = elem;
                                      if ((partnerOther_Name) && (partnerOther_Company)) {
                                        return (
                                          <tr key={index}>
                                            <td className="fw-bold">
                                              Other
                                            </td>
                                            <td>{partnerOther_Name}</td>
                                            <td>{partnerOther_Company}</td>
                                            <td>{partnerOther_Phone}</td>
                                            <td>{partnerOther_Email}</td>
                                            <td>
                                              <CustomDropDown Operations={PAOperations}
                                                Delete={"partnerOther"}
                                                Data={Pro_AdvisersData[0]}
                                                FormikFun={UpdateData} />
                                            </td>
                                          </tr>
                                        );
                                      }
                                      else {
                                        return("")
                                      }
                                    })}

                                  </tbody>
                                </table>
                              </div>
                            )}


                          </div>
                        )}
                        {CRObject.ProfessionalAdvisersIssuesradio === "No" && (
                          <div className="row">
                            <div className="col-md-12 text-center">
                              <p>
                                Nothing to add here you can press{" "}
                                <NavLink
                                  to="/Assets-And-Liabilities"
                                  style={{ color: "#36B446" }}
                                >
                                  <b>next button</b>
                                </NavLink>
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Table Partner Professional Advisors */}
                        <div className="row mt-5 mb-3">
                          <div className="col-md-12">
                            <button
                              type="submit"
                              className="float-end btn w-25  bgColor modalBtn"
                            >
                              Next
                            </button>
                            <button
                              className="float-end btn w-25  btn-outline  backBtn mx-3"
                              onClick={BackFunction}
                            >
                              Back
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Card>
              </div>
            </div>
            {/*Expenses */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalAdvisors;
