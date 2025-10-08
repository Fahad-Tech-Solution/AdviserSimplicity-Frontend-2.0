import React, { useEffect, useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
// import * as Yup from "yup";                      //? don't Remove it you might need it later
// import { useNavigate } from "react-router-dom";  //? don't Remove it you might need it later
import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useRecoilState, useRecoilValue } from "recoil";
import { ClientName, PartnerName, defaultUrl } from "../../../Store/Store";


//images and SVG's

import single from "../../Svgs/single-2.svg";
import couple from "../../Svgs/couple-2.svg"; //? don't Remove it you might need it later
import dollarBag from "../images/dollarBag.svg";
import { Card } from "react-bootstrap";
import CustomDropDown from "../../Assets/CustomDropDown/CustomDropDown";

const CentreLink = () => {
  
  let DefaultUrl = useRecoilValue(defaultUrl)
  let [tRState, setTRState] = useState(false);

  let [clientCLState, setClientCLState] = useState([]);
  let [partnerCLState, setPartnerCLState] = useState([]);

  const [ClientNameGet] = useRecoilState(ClientName);
  const [PartnerNameGet] = useRecoilState(PartnerName);

  let [flagState, setFlagState] = useState(false);


  useEffect(() => {

    let email = localStorage.getItem("Email");
    if (email) {
      GetApiFunction(email);
    }
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  let GetApiFunction = async (email) => {
    try {

      let clientCL = await axios.get(`${DefaultUrl}/api/Client-Income-CentreLink/`);
      clientCL = clientCL.data;
      clientCL = clientCL.filter((item) => item.Email === email);

      let date = new Date(clientCL[0].clientCLCDate);
      clientCL[0].clientCLCDate = date;

      console.log(clientCL);
      setClientCLState({ ...clientCL[0] })

      if (clientCL[0].clientCLCrn !== undefined) {
        setTRState(true);
      }

      if ((clientCL[0].clientCLOwner === "Partner") && (clientCL[0].clientCLOwner !== undefined)) {
        let partnerCL = await axios.get(`${DefaultUrl}/api/Partner-Income-CentreLink/`);
        partnerCL = partnerCL.data;
        partnerCL = partnerCL.filter((item) => item.Email === email);
        date = new Date(partnerCL[0].partnerCLCDate);
        partnerCL[0].partnerCLCDate = date;
        console.log(partnerCL);
        setPartnerCLState({ ...partnerCL[0] })
      }

    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  let initialValues = {
    clientCLApa: "",
    clientCLCDate: "",
    clientCLCard: "",
    clientCLCarerAllowance: "No",
    clientCLClp: "",
    clientCLCrn: "",
    clientCLFamilyTax: "No",
    clientCLGifts: "No",
    clientCLHowMuch: "",
    clientCLOwner: "",
    clientCLPa: "",
    clientCLYears: "",
    clientCLRent: "No",
    clientCLFtb: "No",

    partnerCLApa: "",
    partnerCLCDate: "",
    partnerCLCard: "",
    partnerCLCarerAllowance: "No",
    partnerCLClp: "",
    partnerCLCrn: "",
    partnerCLFamilyTax: "",
    partnerCLGifts: "No",
    partnerCLHowMuch: "",
    partnerCLPa: "",
    partnerCLYears: "",
    partnerCLRent: "No",
    partnerCLFtb: "No",
  };

  let onSubmit = (values, { resetForm }) => {
    // console.log(values);
    // setTRState(true);
    let clientOBJ = {
      Email: localStorage.getItem("Email"),
      clientCLOwner: values.clientCLOwner,
      clientCLCrn: values.clientCLCrn,
      clientCLClp: values.clientCLClp,
      clientCLPa: values.clientCLPa,
      clientCLApa: values.clientCLApa,
      clientCLCarerAllowance: values.clientCLCarerAllowance,
      clientCLFamilyTax: values.clientCLFamilyTax,
      clientCLCard: values.clientCLCard,
      clientCLGifts: values.clientCLGifts,
      clientCLHowMuch: values.clientCLHowMuch,
      clientCLYears: values.clientCLYears,
      clientCLCDate: values.clientCLCDate,
      clientCLRent: values.clientCLRent,
      clientCLFtb: values.clientCLFtb,
    }
    // setClientCLState({ ...clientOBJ });
    console.log(clientOBJ);

    if (flagState === true) {
      axios
        .patch(
          `${DefaultUrl}/api/Client-Income-CentreLink/Update/${clientOBJ.Email}`,
          clientOBJ
        )
        .then((res) => {
          console.log("Client Centre Link Has Successfully Been updated");
          setClientCLState({ ...clientOBJ });
          setTRState(true);
        });
    } else {
      //POST
      axios
        .post(
          `${DefaultUrl}/api/Client-Income-CentreLink/Add`,
          clientOBJ
        )
        .then((res) => {
          console.log("Client Centre Link  Has Successfully Been Added");
          setTRState(true);
          setClientCLState({ ...clientOBJ });
        });
    }


    if (clientOBJ.clientCLOwner === "Partner") {
      let PartnerOBJ = {
        Email: localStorage.getItem("Email"),
        partnerCLOwner: values.partnerCLOwner,
        partnerCLCrn: values.partnerCLCrn,
        partnerCLClp: values.partnerCLClp,
        partnerCLPa: values.partnerCLPa,
        partnerCLApa: values.partnerCLApa,
        partnerCLCarerAllowance: values.partnerCLCarerAllowance,
        partnerCLFamilyTax: values.partnerCLFamilyTax,
        partnerCLCard: values.partnerCLCard,
        partnerCLGifts: values.partnerCLGifts,
        partnerCLHowMuch: values.partnerCLHowMuch,
        partnerCLYears: values.partnerCLYears,
        partnerCLCDate: values.partnerCLCDate,
        partnerCLRent: values.partnerCLRent,
        partnerCLFtb: values.partnerCLFtb,
      }
      // setPartnerCLState({ ...partnerOBJ });

      if (flagState === true) {
        axios
          .patch(
            `${DefaultUrl}/api/Partner-Income-CentreLink/Update/${PartnerOBJ.Email}`,
            PartnerOBJ
          )
          .then((res) => {
            console.log(
              "Partner Centre Link Has Successfully Been updated"
            );
            setPartnerCLState({ ...PartnerOBJ });

          });
      } else {
        //POST
        axios
          .post(
            `${DefaultUrl}/api/Partner-Income-CentreLink/Add`,
            PartnerOBJ
          )
          .then((res) => {
            console.log(
              "Partner Centre Link  Has Successfully Been Added"
            );
            setPartnerCLState({ ...PartnerOBJ });
          });
      }

    }

    resetForm();

  };

  let CLOperation = (Option, elem, deleteData) => {

    if (Option === 1) {
      // alert("UpdateFunctionality");
      setTRState(false);
      setFlagState(true);
    } else if (Option === 2) {
      // alert("DeleteFunctionality");
      deleteApiFunc(elem, deleteData);
    }
  };

  const deleteApiFunc = (elem, deleteData) => {
    console.log(elem);
    if (deleteData === 'Client') {
      axios.delete(`${DefaultUrl}/api/Partner-Income-CentreLink/Delete/${elem.Email}`)
        .then((res) => {
          console.log("client Centre Link has been deleted")
          setClientCLState({});
        });
    } else {
      axios.delete(`${DefaultUrl}/api/Partner-Income-CentreLink/Delete/${elem.Email}`)
        .then((res) => {
          console.log("partner Centre Link has been deleted");
          setPartnerCLState({});
        });
    }
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
            }) => (
              <Form>
                {/* Centre Link  Component*/}

                <h3 className="heading">
                  Centre Link
                  <div className="iconContainerLg">
                    <img className="img-fluid" src={dollarBag} alt="" />
                  </div>
                </h3>

                {tRState === false && (
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
                      {values.clientCLOwner=="Partner"?
                      <div className="col-4">
                      <label
                        htmlFor=""
                        className="form-label text-center"
                      >
                        Partner
                        <div className="iconContainerLg">
                          <img
                            src={couple}
                            alt="single svg"
                            className="w-50 "
                          />
                        </div>
                      </label>
                    </div>:""}
                    </div>

                    <div className="row">
                      <div className="col-4 mb-3">
                        <label htmlFor="clientCLOwner" className="form-label">
                          Owner
                        </label>
                      </div>
                      <div className="col-4 mb-3">
                        <Field
                          as="select"
                          className="form-control inputDesign shadow form-select"
                          id="clientCLOwner"
                          name="clientCLOwner"
                          placeholder="clientCLOwner"
                        >
                          <option value="">Select</option>
                          <option value="Client">Client</option>
                          <option value="Partner">Partner </option>
                        </Field>
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientCLOwner"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4 mb-3">
                        <label htmlFor="clientCLCrn" className="form-label">
                          Customer Reference number (CRN)
                        </label>
                      </div>

                      <div className="col-4 mb-3">
                        <Field
                          className="form-control inputDesign shadow"
                          id="clientCLCrn"
                          type="text"
                          name="clientCLCrn"
                          placeholder="Customer Reference number"
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientCLCrn"
                        />
                      </div>

                      {values.clientCLOwner === "Partner" && (
                        <div className="col-4 mb-3">
                          <Field
                            className="form-control inputDesign shadow "
                            id="partnerCLCrn"
                            type="text"
                            name="partnerCLCrn"
                            placeholder="Customer Reference number"
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="partnerCLCrn"
                          />
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-4 mb-3">
                        <label htmlFor="clientCLClp" className="form-label">
                          Center Link Payment
                        </label>
                      </div>

                      <div className="col-4 mb-3">
                        <Field
                          id="clientCLClp"
                          name="clientCLClp"
                          className="form-select shadow  inputDesign"
                          as="select"
                        >
                          <option value="">Select</option>
                          <option value="NotEligible">Not Eligible</option>
                          <option value="AgePension">Age Pension</option>
                          <option value="Newstart Allowance">
                            Newstart Allowance
                          </option>
                          <option value="Disability Pension">
                            Disability Pension
                          </option>
                          <option value="CarersPayment">Carers Payment</option>
                          <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientCLClp"
                        />
                      </div>

                      {values.clientCLOwner === "Partner" && (
                        <div className="col-4 mb-3">
                          <Field
                            id="partnerCLClp"
                            name="partnerCLClp"
                            className="form-select shadow  inputDesign"
                            as="select"
                          >
                            <option value="">Select</option>
                            <option value="NotEligible">Not Eligible</option>
                            <option value="AgePension">Age Pension</option>
                            <option value="NewStart Allowance">
                              New start Allowance
                            </option>
                            <option value="Disability Pension">
                              Disability Pension
                            </option>
                            <option value="CarersPayment">
                              Carers Payment
                            </option>
                            <option value="Other">Other</option>
                          </Field>
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="partnerCLClp"
                          />
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-4 mb-3">
                        <label htmlFor="clientCLPa" className="form-label">
                          Payment Amount (Fortnightly)
                        </label>
                      </div>

                      <div className="col-4 mb-3">
                        <Field
                          type="number"
                          className="form-control shadow inputDesign"
                          id="clientCLPa"
                          name="clientCLPa"
                          placeholder="Payment Amount (Fortnightly)"
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientCLPa"
                        />
                      </div>

                      {values.clientCLOwner === "Partner" && (
                        <div className="col-4 mb-3">
                          <Field
                            type="number"
                            className="form-control shadow inputDesign"
                            id="partnerCLPa"
                            name="partnerCLPa"
                            placeholder="Payment Amount (Fortnightly)"
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="partnerCLPa"
                          />
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-4 mb-3">
                        <label htmlFor="clientCLApa" className="form-label">
                          Annual Payment Amount
                        </label>
                      </div>

                      <div className="col-4 mb-3">
                        <Field
                          type="number"
                          className="form-control shadow inputDesign"
                          id="clientCLApa"
                          name="clientCLApa"
                          placeholder="Annual Payment Amount"
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientCLApa"
                        />
                      </div>

                      {values.clientCLOwner === "Partner" && (
                        <div className="col-4 mb-3">
                          <Field
                            type="number"
                            className="form-control shadow inputDesign"
                            id="partnerCLApa"
                            name="partnerCLApa"
                            placeholder="Annual Payment Amount"
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="partnerCLApa"
                          />
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-4 mb-3">
                        <label className="form-label">
                          Are you receiving the Carer Allowance?
                        </label>
                      </div>

                      <div className="col-4 mb-3">
                        <div className="radiobutton">
                          <input
                            type="radio"
                            name="clientCLCarerAllowance"
                            id="clientCLCarerAllowance1"
                            onChange={handleChange}
                            value="Yes"
                            checked={values.clientCLCarerAllowance === "Yes"}
                          />
                          <label
                            htmlFor="clientCLCarerAllowance1"
                            className="label1"
                          >
                            <span>YES</span>
                          </label>
                          <input
                            type="radio"
                            name="clientCLCarerAllowance"
                            id="clientCLCarerAllowance2"
                            onChange={handleChange}
                            value="No"
                            checked={values.clientCLCarerAllowance === "No"}
                          />
                          <label
                            htmlFor="clientCLCarerAllowance2"
                            className="label2"
                          >
                            <span>NO</span>
                          </label>
                        </div>
                      </div>

                      {values.clientCLOwner === "Partner" && (
                        <div className="col-4 mb-3">
                          <div className="radiobutton">
                            <input
                              type="radio"
                              name="partnerCLCarerAllowance"
                              id="partnerCLCarerAllowance1"
                              onChange={handleChange}
                              value="Yes"
                              checked={values.partnerCLCarerAllowance === "Yes"}
                            />
                            <label
                              htmlFor="partnerCLCarerAllowance1"
                              className="label1"
                            >
                              <span>YES</span>
                            </label>
                            <input
                              type="radio"
                              name="partnerCLCarerAllowance"
                              id="partnerCLCarerAllowance2"
                              onChange={handleChange}
                              value="No"
                              checked={values.partnerCLCarerAllowance === "No"}
                            />
                            <label
                              htmlFor="partnerCLCarerAllowance2"
                              className="label2"
                            >
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-4 mb-3">
                        <label
                          htmlFor="clientCLFamilyTax"
                          className="form-label"
                        >
                          Are you claiming the Family Tax Benefit?
                        </label>
                      </div>

                      <div className="col-4 mb-3">
                        <Field
                          id="clientCLFamilyTax"
                          name="clientCLFamilyTax"
                          className="form-select shadow  inputDesign"
                          as="select"
                        >
                          <option value="">Select</option>
                          <option value="Part A">Part A</option>
                          <option value="Part B">Part B</option>
                          <option value="Part A & B">Part A & B</option>
                          <option value="No">No</option>
                        </Field>
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientCLFamilyTax"
                        />
                      </div>

                      {values.clientCLOwner === "Partner" && (
                        <div className="col-4 mb-3">
                          <Field
                            id="partnerCLFamilyTax"
                            name="partnerCLFamilyTax"
                            className="form-select shadow  inputDesign"
                            as="select"
                          >
                            <option value="">Select</option>
                            <option value="Part A">Part A</option>
                            <option value="Part B">Part B</option>
                            <option value="Part A & B">Part A & B</option>
                            <option value="No">No</option>
                          </Field>
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="partnerCLFamilyTax"
                          />
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-4 mb-3">
                        <label htmlFor="clientCLCard" className="form-label">
                          What Centre link Cards do You Hold
                        </label>
                      </div>

                      <div className="col-4 mb-3">
                        <Field
                          id="clientCLCard"
                          name="clientCLCard"
                          className="form-select shadow  inputDesign"
                          as="select"
                        >
                          <option value="">Select</option>
                          <option value="Pensioner Card ">
                            Pensioner Card{" "}
                          </option>
                          <option value="Low Income Card ">
                            Low Income Card{" "}
                          </option>
                          <option value="Commonwealth Seniors Card">
                            Commonwealth Seniors Card
                          </option>
                          <option value="Commonwealth & Low Income Card ">
                            Commonwealth & Low Income Card{" "}
                          </option>
                        </Field>
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientCLCard"
                        />
                      </div>

                      {values.clientCLOwner === "Partner" && (
                        <div className="col-4 mb-3">
                          <Field
                            id="partnerCLCard"
                            name="partnerCLCard"
                            className="form-select shadow  inputDesign"
                            as="select"
                          >
                            <option value="">Select</option>
                            <option value="Pensioner Card ">
                              Pensioner Card{" "}
                            </option>
                            <option value="Low Income Card ">
                              Low Income Card{" "}
                            </option>
                            <option value="Commonwealth Seniors Card">
                              Commonwealth Seniors Card
                            </option>
                            <option value="Commonwealth & Low Income Card ">
                              Commonwealth & Low Income Card{" "}
                            </option>
                          </Field>
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="partnerCLCard"
                          />
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-4 mb-3">
                        <label className="form-label">
                          Have Asset Been Gifted in the last 5 years?
                        </label>
                      </div>

                      <div className="col-4 mb-3">
                        <div className="radiobutton">
                          <input
                            type="radio"
                            name="clientCLGifts"
                            id="clientCLGifts1"
                            onChange={handleChange}
                            value="Yes"
                            checked={values.clientCLGifts === "Yes"}
                          />
                          <label htmlFor="clientCLGifts1" className="label1">
                            <span>YES</span>
                          </label>
                          <input
                            type="radio"
                            name="clientCLGifts"
                            id="clientCLGifts2"
                            onChange={handleChange}
                            value="No"
                            checked={values.clientCLGifts === "No"}
                          />
                          <label htmlFor="clientCLGifts2" className="label2">
                            <span>NO</span>
                          </label>
                        </div>
                      </div>

                      {values.clientCLOwner === "Partner" && (
                        <div className="col-4 mb-3">
                          <div className="radiobutton">
                            <input
                              type="radio"
                              name="partnerCLGifts"
                              id="partnerCLGifts1"
                              onChange={handleChange}
                              value="Yes"
                              checked={values.partnerCLGifts === "Yes"}
                            />
                            <label htmlFor="partnerCLGifts1" className="label1">
                              <span>YES</span>
                            </label>
                            <input
                              type="radio"
                              name="partnerCLGifts"
                              id="partnerCLGifts2"
                              onChange={handleChange}
                              value="No"
                              checked={values.partnerCLGifts === "No"}
                            />
                            <label htmlFor="partnerCLGifts2" className="label2">
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-4 mb-3">
                        <label htmlFor="clientCLHowMuch" className="form-label">
                          How Much?
                        </label>
                      </div>

                      <div className="col-4 mb-3">
                        <Field
                          type="number"
                          className="form-control shadow inputDesign"
                          id="clientCLHowMuch"
                          name="clientCLHowMuch"
                          placeholder="Annual Payment Amount"
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientCLHowMuch"
                        />
                      </div>

                      {values.clientCLOwner === "Partner" && (
                        <div className="col-4 mb-3">
                          <Field
                            type="number"
                            className="form-control shadow inputDesign"
                            id="partnerCLHowMuch"
                            name="partnerCLHowMuch"
                            placeholder="Annual Payment Amount"
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="partnerCLHowMuch"
                          />
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-4 mb-3">
                        <label htmlFor="clientCLYears" className="form-label">
                          How many years back?
                        </label>
                      </div>

                      <div className="col-4 mb-3">
                        <Field
                          id="clientCLYears"
                          name="clientCLYears"
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
                        </Field>
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientCLYears"
                        />
                      </div>

                      {values.clientCLOwner === "Partner" && (
                        <div className="col-4 mb-3">
                          <Field
                            id="partnerCLYears"
                            name="partnerCLYears"
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
                          </Field>
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="partnerCLYears"
                          />
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-4 mb-3">
                        <label htmlFor="clientCLCDate" className="form-label">
                          Commencement Date
                        </label>
                      </div>

                      <div className="col-4 mb-3">
                        <DatePicker
                          className="form-control inputDesign shadow"
                          showIcon
                          id="clientCLCDate"
                          name="clientCLCDate"
                          selected={values.clientCLCDate}
                          onChange={(date) =>
                            setFieldValue("clientCLCDate", date)
                          }
                          dateFormat="dd/MM/yyyy"
                          placeholderText="dd/mm/yyyy"
                          maxDate={new Date()}
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          onBlur={handleBlur}
                          wrapperClassName="w-100"
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientCLCDate"
                        />
                      </div>

                      {values.clientCLOwner === "Partner" && (
                        <div className="col-4 mb-3">
                          <DatePicker
                            wrapperClassName="w-100"
                            className="form-control inputDesign shadow"
                            showIcon
                            id="partnerCLCDate"
                            name="partnerCLCDate"
                            selected={values.partnerCLCDate}
                            onChange={(date) =>
                              setFieldValue("partnerCLCDate", date)
                            }
                            dateFormat="dd/MM/yyyy"
                            placeholderText="dd/mm/yyyy"
                            maxDate={new Date()}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="partnerCLCDate"
                          />
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-4 mb-3">
                        <label className="form-label">
                          Are you receiving the Rent Assistance?
                        </label>
                      </div>

                      <div className="col-4 mb-3">
                        <div className="radiobutton">
                          <input
                            type="radio"
                            name="clientCLRent"
                            id="clientCLRent1"
                            onChange={handleChange}
                            value="Yes"
                            checked={values.clientCLRent === "Yes"}
                          />
                          <label
                            htmlFor="clientCLRent1"
                            className="label1"
                          >
                            <span>YES</span>
                          </label>
                          <input
                            type="radio"
                            name="clientCLRent"
                            id="clientCLRent2"
                            onChange={handleChange}
                            value="No"
                            checked={values.clientCLRent === "No"}
                          />
                          <label
                            htmlFor="clientCLRent2"
                            className="label2"
                          >
                            <span>NO</span>
                          </label>
                        </div>
                      </div>

                      {values.clientCLOwner === "Partner" && (
                        <div className="col-4 mb-3">
                          <div className="radiobutton">
                            <input
                              type="radio"
                              name="partnerCLRent"
                              id="partnerCLRent1"
                              onChange={handleChange}
                              value="Yes"
                              checked={values.partnerCLRent === "Yes"}
                            />
                            <label
                              htmlFor="partnerCLRent1"
                              className="label1"
                            >
                              <span>YES</span>
                            </label>
                            <input
                              type="radio"
                              name="partnerCLRent"
                              id="partnerCLRent2"
                              onChange={handleChange}
                              value="No"
                              checked={values.partnerCLRent === "No"}
                            />
                            <label
                              htmlFor="partnerCLRent2"
                              className="label2"
                            >
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-4 mb-3">
                        <label className="form-label">
                          Are you receiving FTB?
                        </label>
                      </div>

                      <div className="col-4 mb-3">
                        <div className="radiobutton">
                          <input
                            type="radio"
                            name="clientCLFtb"
                            id="clientCLFtb1"
                            onChange={handleChange}
                            value="Yes"
                            checked={values.clientCLFtb === "Yes"}
                          />
                          <label
                            htmlFor="clientCLFtb1"
                            className="label1"
                          >
                            <span>YES</span>
                          </label>
                          <input
                            type="radio"
                            name="clientCLFtb"
                            id="clientCLFtb2"
                            onChange={handleChange}
                            value="No"
                            checked={values.clientCLFtb === "No"}
                          />
                          <label
                            htmlFor="clientCLFtb2"
                            className="label2"
                          >
                            <span>NO</span>
                          </label>
                        </div>
                      </div>

                      {values.clientCLOwner === "Partner" && (
                        <div className="col-4 mb-3">
                          <div className="radiobutton">
                            <input
                              type="radio"
                              name="partnerCLFtb"
                              id="partnerCLFtb1"
                              onChange={handleChange}
                              value="Yes"
                              checked={values.partnerCLFtb === "Yes"}
                            />
                            <label
                              htmlFor="partnerCLFtb1"
                              className="label1"
                            >
                              <span>YES</span>
                            </label>
                            <input
                              type="radio"
                              name="partnerCLFtb"
                              id="partnerCLFtb2"
                              onChange={handleChange}
                              value="No"
                              checked={values.partnerCLFtb === "No"}
                            />
                            <label
                              htmlFor="partnerCLFtb2"
                              className="label2"
                            >
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                      )}
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
                )}

                {tRState === true && (
                  <div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="table-responsive my-3" id="childTable">
                          <table className="table table-bordered table-hover text-center">
                            <thead className="text-light" id="tableHead">
                              <tr>
                                <th>Name</th>
                                <th>CRN </th>
                                <th>Payment Type</th>
                                <th>Fortnightly Payment</th>
                                <th>Concession Card</th>
                                <th>Carer Allowance</th>
                                <th>Rent Assistance</th>
                                <th>FTB</th>
                                <th onClick={() => { console.log(clientCLState.clientCLCrn) }}>Opt</th>
                              </tr>
                            </thead>
                            <tbody>
                              {((clientCLState.clientCLCrn !== "") && (clientCLState.clientCLCrn !== undefined)) &&
                                <tr>
                                  <td>{ClientNameGet}</td>
                                  <td>{clientCLState.clientCLCrn} </td>
                                  <td>{clientCLState.clientCLClp} </td>
                                  <td>{clientCLState.clientCLApa} </td>
                                  <td>{clientCLState.clientCLCard} </td>
                                  <td>{clientCLState.clientCLCarerAllowance} </td>
                                  <td>{clientCLState.clientCLRent} </td>
                                  <td>{clientCLState.clientCLFtb} </td>
                                  <td><CustomDropDown Operations={CLOperation}
                                    Delete={"Client"}
                                    Data={clientCLState.clientCLOwner === "Partner" ? { ...clientCLState, ...partnerCLState } : clientCLState}
                                    FormikFun={setValues} /></td>
                                </tr>
                              }
                              {((partnerCLState.partnerCLCrn !== "") && (partnerCLState.partnerCLCrn !== undefined)) &&
                                <tr>
                                  <td>{PartnerNameGet}</td>
                                  <td>{partnerCLState.partnerCLCrn} </td>
                                  <td>{partnerCLState.partnerCLClp} </td>
                                  <td>{partnerCLState.partnerCLApa} </td>
                                  <td>{partnerCLState.partnerCLCard} </td>
                                  <td>{partnerCLState.partnerCLCarerAllowance} </td>
                                  <td>{partnerCLState.partnerCLRent} </td>
                                  <td>{partnerCLState.partnerCLFtb} </td>
                                  <td><CustomDropDown Operations={CLOperation}
                                    Delete={"Partner"}
                                    Data={{ ...partnerCLState, ...clientCLState }}
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
                          onClick={() => setTRState(false)}>
                          Add New
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
};

export default CentreLink;
