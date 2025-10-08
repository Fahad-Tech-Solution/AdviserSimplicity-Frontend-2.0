import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import single from "../Svgs/single-2.svg";
import couple from "../Svgs/couple-2.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { ClientName, PartnerName, defaultUrl } from "../../Store/Store";

import axios from "axios";
import { Card } from "react-bootstrap";
import CustomDropDown from "../Assets/CustomDropDown/CustomDropDown";
import { useNavigate } from "react-router-dom";

const EstatePlanning = () => {

  let Nev = useNavigate();

  let DefaultUrl = useRecoilValue(defaultUrl)

  let [ClientNameGet] = useRecoilState(ClientName);
  let [PartnerNameGet] = useRecoilState(PartnerName);

  let [tRState, setTRState] = useState(false);
  let [flagState, setFlagState] = useState(false);

  let [estatePlaning, setEstatePlaning] = useState([]);
  let [partnerEstatePlaning, setPartnerEstatePlaning] = useState([]);

  useEffect(() => {

    let email = localStorage.getItem("Email");
    if (email) {
      GetApiFunction(email);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let GetApiFunction = async (email) => {
    try {

      let clientEP = await axios.get(`${DefaultUrl}/api/Client-EstatePlanning`);
      clientEP = clientEP.data;
      clientEP = clientEP.filter((item) => item.Email === email);

      console.log(clientEP);
      setEstatePlaning({ ...clientEP[0] })

      if (clientEP.length !== 0) {

        if (clientEP[0].clientEPOwner === "Partner") {
          let partnerCL = await axios.get(`${DefaultUrl}/api/Partner-EstatePlanning`);
          partnerCL = partnerCL.data;
          partnerCL = partnerCL.filter((item) => item.Email === email);
          console.log(partnerCL);
          setPartnerEstatePlaning({ ...partnerCL[0] })
        }

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
    clientEPOwner: "",
    clientEPYear: "",
    clientEPCurrentWill: "No",
    clientEPExecutor: "",
    clientEPGuardianship: "No",
    clientEPTrust: "No",
    clientEPFuneralPlan: "No",
    clientEPExpense: "No",
    clientEPNeeds: "",
    clientEPPOA: "No",
    clientEPPOAType: "",
    clientEPPOANumber: "",
    clientEPPOAName1: "",
    clientEPPOAName2: "",
    clientEPPOAName3: "",
    clientEPPOAName4: "",
    clientEPPOAName5: "",

    partnerEPOwner: "",
    partnerEPYear: "",
    partnerEPCurrentWill: "No",
    partnerEPExecutor: "",
    partnerEPGuardianship: "No",
    partnerEPTrust: "No",
    partnerEPFuneralPlan: "No",
    partnerEPExpense: "No",
    partnerEPNeeds: "",
    partnerEPPOA: "No",
    partnerEPPOAType: "",
    partnerEPPOANumber: "",
    partnerEPPOAName1: "",
    partnerEPPOAName2: "",
    partnerEPPOAName3: "",
    partnerEPPOAName4: "",
    partnerEPPOAName5: "",
  };

  let onSubmit = (values, { restForm }) => {
    console.log(values);
    let ClientObj = {
      Email: localStorage.getItem("Email"),
      clientEPOwner: values.clientEPOwner,
      clientEPYear: values.clientEPYear,
      clientEPCurrentWill: values.clientEPCurrentWill,
      clientEPExecutor: values.clientEPExecutor,
      clientEPGuardianship: values.clientEPGuardianship,
      clientEPTrust: values.clientEPTrust,
      clientEPFuneralPlan: values.clientEPFuneralPlan,
      clientEPExpense: values.clientEPExpense,
      clientEPNeeds: values.clientEPNeeds,
      clientEPPOA: values.clientEPPOA,
      clientEPPOAType: values.clientEPPOAType || "",
      clientEPPOANumber: values.clientEPPOANumber || "",
      clientEPPOAName1: values.clientEPPOAName1 || "",
      clientEPPOAName2: values.clientEPPOAName2 || "",
      clientEPPOAName3: values.clientEPPOAName3 || "",
      clientEPPOAName4: values.clientEPPOAName4 || "",
      clientEPPOAName5: values.clientEPPOAName5 || "",
    }
    let partnerObj = {
      Email: localStorage.getItem("Email"),
      partnerEPYear: values.partnerEPYear,
      partnerEPCurrentWill: values.partnerEPCurrentWill,
      partnerEPExecutor: values.partnerEPExecutor,
      partnerEPGuardianship: values.partnerEPGuardianship,
      partnerEPTrust: values.partnerEPTrust,
      partnerEPFuneralPlan: values.partnerEPFuneralPlan,
      partnerEPExpense: values.partnerEPExpense,
      partnerEPNeeds: values.partnerEPNeeds,
      partnerEPPOA: values.partnerEPPOA,
      partnerEPPOAType: values.partnerEPPOAType || "",
      partnerEPPOANumber: values.partnerEPPOANumber || "",
      partnerEPPOAName1: values.partnerEPPOAName1 || "",
      partnerEPPOAName2: values.partnerEPPOAName2 || "",
      partnerEPPOAName3: values.partnerEPPOAName3 || "",
      partnerEPPOAName4: values.partnerEPPOAName4 || "",
      partnerEPPOAName5: values.partnerEPPOAName5 || "",
    }


    if (flagState === true) {
      axios
        .patch(
          `${DefaultUrl}/api/Client-EstatePlanning/Update/${ClientObj.Email}`,
          ClientObj
        )
        .then((res) => {
          console.log("Client Estate Planning Has Successfully Been updated");

        });
    } else {
      //POST
      axios
        .post(
          `${DefaultUrl}/api/Client-EstatePlanning/Add`,
          ClientObj
        )
        .then((res) => {
          console.log("Client Estate Planning Has Successfully Been Added");
        });
    }


    if (ClientObj.clientEPOwner === "Partner") {

      if (flagState === true) {
        axios
          .patch(
            `${DefaultUrl}/api/Partner-EstatePlanning/Update/${partnerObj.Email}`,
            partnerObj
          )
          .then((res) => {
            console.log(
              "Partner Estate Planning Has Successfully Been updated"
            );

          });
      } else {
        //POST
        axios
          .post(
            `${DefaultUrl}/api/Partner-EstatePlanning/Add`,
            partnerObj
          )
          .then((res) => {
            console.log(
              "Partner Estate Planning  Has Successfully Been Added"
            );
          });
      }

    }


    setTimeout(() => {
      GetApiFunction(ClientObj.Email);
    }, 800);
  };


  let EPOperations = (Option, elem, deleteData) => {
    if (Option === 1) { setTRState(false); setFlagState(true); } else if (Option === 2) { deleteApiFunc(elem, deleteData); }
  };

  let deleteApiFunc = (elem, deleteData) => {
    console.log(elem, deleteData);

    if (deleteData === "client") {

      axios.delete(`${DefaultUrl}/api/Client-EstatePlanning/Delete/${elem.Email}`)
        .then((res) => { console.log("client Estate Planning has been deleted"); GetApiFunction(elem.Email); });

    }
    else {


      axios.delete(`${DefaultUrl}/api/Partner-EstatePlanning/Delete/${elem.Email}`)
        .then((res) => { console.log("client Estate Planning has been deleted"); GetApiFunction(elem.Email); });

    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row m-0 px-0">
        <div className="col-md-2"></div>
        <div className="col-md-12">
          <div className="row mb-2 mt-1">
            <div className="col-md-12">
              <Card className="shadow px-4 py-4">
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  enableReinitialize
                >
                  {({ values, handleChange, setFieldValue, handleBlur, setValues }) => (
                    <Form>
                      <div>
                        <h3 className="heading text-center">Estate Planning</h3>
                      </div>
                      {tRState === false && <div>
                        <div className="row">
                          <div className="col-4"></div>
                          <div className="col-4 text-center">
                            <label htmlFor="" className="form-label ">
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
                          <div className="col-4 text-center">
                            {values.clientEPOwner === "Partner" && (
                              <label htmlFor="" className="form-label ">
                                Partner
                                <div className="iconContainerLg">
                                  <img
                                    src={couple}
                                    alt="partner svg"
                                    className="w-50 "
                                  />
                                </div>
                              </label>
                            )}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-4 mb-3">
                            <label htmlFor="clientEPOwner" className="form-label">
                              Individual/Owner
                            </label>
                          </div>
                          <div className="col-4 mb-3">
                            <Field
                              as="select"
                              className="form-control inputDesign shadow form-select"
                              id="clientEPOwner"
                              name="clientEPOwner"
                            >
                              <option value="">Select</option>
                              <option value="Client">Client</option>
                              <option value="Partner">Partner </option>
                            </Field>
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="clientEPOwner"
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-4 mb-3">
                            <label htmlFor="clientEPYear" className="form-label">
                              Year set up
                            </label>
                          </div>
                          <div className="col-4 mb-3">
                            <Field
                              type="number"
                              className="form-control shadow inputDesign"
                              id="clientEPYear"
                              name="clientEPYear"
                              placeholder="Year"
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="clientEPYear"
                            />
                          </div>
                          {values.clientEPOwner === "Partner" && (
                            <div className="col-4 mb-3">
                              <Field
                                type="number"
                                className="form-control shadow inputDesign"
                                id="partnerEPYear"
                                name="partnerEPYear"
                                placeholder="Year"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="partnerEPYear"
                              />
                            </div>
                          )}
                        </div>

                        <div className="row">
                          <div className="col-4 mb-3">
                            <label
                              htmlFor="clientEPCurrentWill"
                              className="form-label"
                            >
                              Are Your Wills Current
                            </label>
                          </div>
                          <div className="col-4 mb-3">
                            <div className="form-check form-switch m-0 p-0 ">
                              <div className="radiobutton">
                                <input
                                  type="radio"
                                  name="clientEPCurrentWill"
                                  id="clientEPCurrentWill1"
                                  value="Yes"
                                  onChange={handleChange}
                                  checked={values.clientEPCurrentWill === "Yes"}
                                />
                                <label
                                  htmlFor="clientEPCurrentWill1"
                                  className="label1"
                                >
                                  <span>YES</span>
                                </label>
                                <input
                                  type="radio"
                                  name="clientEPCurrentWill"
                                  id="clientEPCurrentWill2"
                                  value="No"
                                  onChange={handleChange}
                                  checked={values.clientEPCurrentWill === "No"}
                                />
                                <label
                                  htmlFor="clientEPCurrentWill2"
                                  className="label2"
                                >
                                  <span>NO</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          {values.clientEPOwner === "Partner" && (
                            <div className="col-4 mb-3">
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="partnerEPCurrentWill"
                                    id="partnerEPCurrentWill1"
                                    value="Yes"
                                    onChange={handleChange}
                                    checked={
                                      values.partnerEPCurrentWill === "Yes"
                                    }
                                  />
                                  <label
                                    htmlFor="partnerEPCurrentWill1"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="partnerEPCurrentWill"
                                    id="partnerEPCurrentWill2"
                                    value="No"
                                    onChange={handleChange}
                                    checked={values.partnerEPCurrentWill === "No"}
                                  />
                                  <label
                                    htmlFor="partnerEPCurrentWill2"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="row">
                          <div className="col-4 mb-3">
                            <label
                              htmlFor="clientEPExecutor"
                              className="form-label"
                            >
                              Executor/s
                            </label>
                          </div>
                          <div className="col-4 mb-3">
                            <Field
                              type="text"
                              className="form-control shadow inputDesign"
                              id="clientEPExecutor"
                              name="clientEPExecutor"
                              placeholder="Executor"
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="clientEPExecutor"
                            />
                          </div>
                          {values.clientEPOwner === "Partner" && (
                            <div className="col-4 mb-3">
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="partnerEPExecutor"
                                name="partnerEPExecutor"
                                placeholder="Executor"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="partnerEPExecutor"
                              />
                            </div>
                          )}
                        </div>

                        <div className="row">
                          <div className="col-4 mb-3">
                            <label
                              htmlFor="clientEPGuardianship"
                              className="form-label"
                            >
                              Enduring Guardianship
                            </label>
                          </div>
                          <div className="col-4 mb-3">
                            <div className="form-check form-switch m-0 p-0 ">
                              <div className="radiobutton">
                                <input
                                  type="radio"
                                  name="clientEPGuardianship"
                                  id="clientEPGuardianship1"
                                  value="Yes"
                                  onChange={handleChange}
                                  checked={values.clientEPGuardianship === "Yes"}
                                />
                                <label
                                  htmlFor="clientEPGuardianship1"
                                  className="label1"
                                >
                                  <span>YES</span>
                                </label>
                                <input
                                  type="radio"
                                  name="clientEPGuardianship"
                                  id="clientEPGuardianship2"
                                  value="No"
                                  onChange={handleChange}
                                  checked={values.clientEPGuardianship === "No"}
                                />
                                <label
                                  htmlFor="clientEPGuardianship2"
                                  className="label2"
                                >
                                  <span>NO</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          {values.clientEPOwner === "Partner" && (
                            <div className="col-4 mb-3">
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="partnerEPGuardianship"
                                    id="partnerEPGuardianship1"
                                    value="Yes"
                                    onChange={handleChange}
                                    checked={
                                      values.partnerEPGuardianship === "Yes"
                                    }
                                  />
                                  <label
                                    htmlFor="partnerEPGuardianship1"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="partnerEPGuardianship"
                                    id="partnerEPGuardianship2"
                                    value="No"
                                    onChange={handleChange}
                                    checked={
                                      values.partnerEPGuardianship === "No"
                                    }
                                  />
                                  <label
                                    htmlFor="partnerEPGuardianship2"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="row">
                          <div className="col-4 mb-3">
                            <label
                              htmlFor="clientEPTrust"
                              className="form-label"
                            >
                              Testamentary Trust
                            </label>
                          </div>
                          <div className="col-4 mb-3">
                            <div className="form-check form-switch m-0 p-0 ">
                              <div className="radiobutton">
                                <input
                                  type="radio"
                                  name="clientEPTrust"
                                  id="clientEPTrust1"
                                  value="Yes"
                                  onChange={handleChange}
                                  checked={values.clientEPTrust === "Yes"}
                                />
                                <label
                                  htmlFor="clientEPTrust1"
                                  className="label1"
                                >
                                  <span>YES</span>
                                </label>
                                <input
                                  type="radio"
                                  name="clientEPTrust"
                                  id="clientEPTrust2"
                                  value="No"
                                  onChange={handleChange}
                                  checked={values.clientEPTrust === "No"}
                                />
                                <label
                                  htmlFor="clientEPTrust2"
                                  className="label2"
                                >
                                  <span>NO</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          {values.clientEPOwner === "Partner" && (
                            <div className="col-4 mb-3">
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="partnerEPTrust"
                                    id="partnerEPTrust1"
                                    value="Yes"
                                    onChange={handleChange}
                                    checked={values.partnerEPTrust === "Yes"}
                                  />
                                  <label
                                    htmlFor="partnerEPTrust1"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="partnerEPTrust"
                                    id="partnerEPTrust2"
                                    value="No"
                                    onChange={handleChange}
                                    checked={values.partnerEPTrust === "No"}
                                  />
                                  <label
                                    htmlFor="partnerEPTrust2"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="row">
                          <div className="col-4 mb-3">
                            <label
                              htmlFor="clientEPFuneralPlan"
                              className="form-label"
                            >
                              Do you have a funeral plan in place?
                            </label>
                          </div>
                          <div className="col-4 mb-3">
                            <div className="form-check form-switch m-0 p-0 ">
                              <div className="radiobutton">
                                <input
                                  type="radio"
                                  name="clientEPFuneralPlan"
                                  id="clientEPFuneralPlan1"
                                  value="Yes"
                                  onChange={handleChange}
                                  checked={values.clientEPFuneralPlan === "Yes"}
                                />
                                <label
                                  htmlFor="clientEPFuneralPlan1"
                                  className="label1"
                                >
                                  <span>YES</span>
                                </label>
                                <input
                                  type="radio"
                                  name="clientEPFuneralPlan"
                                  id="clientEPFuneralPlan2"
                                  value="No"
                                  onChange={handleChange}
                                  checked={values.clientEPFuneralPlan === "No"}
                                />
                                <label
                                  htmlFor="clientEPFuneralPlan2"
                                  className="label2"
                                >
                                  <span>NO</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          {values.clientEPOwner === "Partner" && (
                            <div className="col-4 mb-3">
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="partnerEPFuneralPlan"
                                    id="partnerEPFuneralPlan1"
                                    value="Yes"
                                    onChange={handleChange}
                                    checked={values.partnerEPFuneralPlan === "Yes"}
                                  />
                                  <label
                                    htmlFor="partnerEPFuneralPlan1"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="partnerEPFuneralPlan"
                                    id="partnerEPFuneralPlan2"
                                    value="No"
                                    onChange={handleChange}
                                    checked={values.partnerEPFuneralPlan === "No"}
                                  />
                                  <label
                                    htmlFor="partnerEPFuneralPlan2"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="row">
                          <div className="col-4 mb-3">
                            <label
                              htmlFor="clientEPExpense"
                              className="form-label"
                            >
                              Are their  sufficient liquidity to cover debts and expenses?
                            </label>
                          </div>
                          <div className="col-4 mb-3">
                            <div className="form-check form-switch m-0 p-0 ">
                              <div className="radiobutton">
                                <input
                                  type="radio"
                                  name="clientEPExpense"
                                  id="clientEPExpense1"
                                  value="Yes"
                                  onChange={handleChange}
                                  checked={values.clientEPExpense === "Yes"}
                                />
                                <label
                                  htmlFor="clientEPExpense1"
                                  className="label1"
                                >
                                  <span>YES</span>
                                </label>
                                <input
                                  type="radio"
                                  name="clientEPExpense"
                                  id="clientEPExpense2"
                                  value="No"
                                  onChange={handleChange}
                                  checked={values.clientEPExpense === "No"}
                                />
                                <label
                                  htmlFor="clientEPExpense2"
                                  className="label2"
                                >
                                  <span>NO</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          {values.clientEPOwner === "Partner" && (
                            <div className="col-4 mb-3">
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="partnerEPExpense"
                                    id="partnerEPExpense1"
                                    value="Yes"
                                    onChange={handleChange}
                                    checked={values.partnerEPExpense === "Yes"}
                                  />
                                  <label
                                    htmlFor="partnerEPExpense1"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="partnerEPExpense"
                                    id="partnerEPExpense2"
                                    value="No"
                                    onChange={handleChange}
                                    checked={values.partnerEPExpense === "No"}
                                  />
                                  <label
                                    htmlFor="partnerEPExpense2"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="row">
                          <div className="col-4 mb-3">
                            <label
                              htmlFor="clientEPNeeds"
                              className="form-label"
                            >
                              Do you have any specific estate planning requirements/needs?
                            </label>
                          </div>
                          <div className="col-4 mb-3">
                            <Field
                              type="text"
                              className="form-control shadow inputDesign"
                              id="clientEPNeeds"
                              name="clientEPNeeds"
                              placeholder="Executor"
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="clientEPNeeds"
                            />
                          </div>
                          {values.clientEPOwner === "Partner" && (
                            <div className="col-4 mb-3">
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="partnerEPNeeds"
                                name="partnerEPNeeds"
                                placeholder="Executor"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="partnerEPNeeds"
                              />
                            </div>
                          )}
                        </div>

                        <div className="row">
                          <div className="col-4 mb-3">
                            <label
                              htmlFor="clientEPPOA"
                              className="form-label"
                            >
                              Power of Attorney (POA)
                            </label>
                          </div>
                          <div className="col-4 mb-3">
                            <div className="form-check form-switch m-0 p-0 ">
                              <div className="radiobutton">
                                <input
                                  type="radio"
                                  name="clientEPPOA"
                                  id="clientEPPOA1"
                                  value="Yes"
                                  onChange={handleChange}
                                  checked={values.clientEPPOA === "Yes"}
                                />
                                <label
                                  htmlFor="clientEPPOA1"
                                  className="label1"
                                >
                                  <span>YES</span>
                                </label>
                                <Field type="radio" name="clientEPPOA" id="clientEPPOA2"
                                  // onChange={handleChange}
                                  value="No"
                                  checked={values.clientEPPOA === "No"}
                                  onChange={() => {
                                    setFieldValue('clientEPPOA', "No");
                                    setFieldValue('clientEPPOANumber', '');
                                  }}
                                />
                                <label
                                  htmlFor="clientEPPOA2"
                                  className="label2"
                                >
                                  <span>NO</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          {values.clientEPOwner === "Partner" && (
                            <div className="col-4 mb-3">
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="partnerEPPOA"
                                    id="partnerEPPOA1"
                                    value="Yes"
                                    onChange={handleChange}
                                    checked={values.partnerEPPOA === "Yes"}
                                  />
                                  <label
                                    htmlFor="partnerEPPOA1"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <Field type="radio" name="partnerEPPOA" id="partnerEPPOA2"
                                    // onChange={handleChange}
                                    value="No"
                                    checked={values.partnerEPPOA === "No"}
                                    onChange={() => {
                                      setFieldValue('partnerEPPOA', "No");
                                      setFieldValue('partnerEPPOANumber', '');
                                    }}
                                  />
                                  <label
                                    htmlFor="partnerEPPOA2"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="row">
                          {((values.clientEPPOA === "Yes") || (values.partnerEPPOA === "Yes")) &&
                            <div className="col-4 mb-3">
                              <label htmlFor="clientEPPOAType" className="form-label">
                                Type of Power of Attorney
                              </label>
                            </div>
                          }
                          {values.clientEPPOA === "Yes" ?
                            <div className="col-4 mb-3">
                              <Field
                                as="select"
                                className="form-control inputDesign shadow form-select"
                                id="clientEPPOAType"
                                name="clientEPPOAType"
                              >
                                <option value="">Select</option>
                                <option value="Enduring">Enduring </option>
                                <option value="Medical">Medical </option>
                                <option value="Financial">Financial </option>
                                <option value="Limited">Limited </option>
                                <option value="Other">Other </option>
                              </Field>
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientEPPOAType"
                              />
                            </div> : <div className="col-4 mb-3"></div>
                          }

                          {values.partnerEPPOA === "Yes" &&
                            <div className="col-4 mb-3">
                              <Field
                                as="select"
                                className="form-control inputDesign shadow form-select"
                                id="partnerEPPOAType"
                                name="partnerEPPOAType"
                              >
                                <option value="">Select</option>
                                <option value="Enduring">Enduring </option>
                                <option value="Medical">Medical </option>
                                <option value="Financial">Financial </option>
                                <option value="Limited">Limited </option>
                                <option value="Other">Other </option>
                              </Field>
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="partnerEPPOAType"
                              />
                            </div>
                          }

                        </div>

                        <div className="row">
                          {((values.clientEPPOA === "Yes") || (values.partnerEPPOA === "Yes")) &&
                            <div className="col-4 mb-3">
                              <label htmlFor="clientEPPOANumber" className="form-label">
                                Type of Power of Attorney
                              </label>
                            </div>
                          }
                          {values.clientEPPOA === "Yes" ?
                            <div className="col-4 mb-3">
                              <Field
                                as="select"
                                className="form-control inputDesign shadow form-select"
                                id="clientEPPOANumber"
                                name="clientEPPOANumber"
                              >
                                <option value="">Select</option>
                                <option value={1}>1 </option>
                                <option value={2}>2 </option>
                                <option value={3}>3 </option>
                                <option value={4}>4 </option>
                                <option value={5}>5 </option>
                              </Field>
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientEPPOANumber"
                              />
                            </div> : <div className="col-4 mb-3"></div>
                          }

                          {values.partnerEPPOA === "Yes" &&
                            <div className="col-4 mb-3">
                              <Field
                                as="select"
                                className="form-control inputDesign shadow form-select"
                                id="partnerEPPOANumber"
                                name="partnerEPPOANumber"
                              >
                                <option value="">Select</option>
                                <option value="1">1 </option>
                                <option value="2">2 </option>
                                <option value="3">3 </option>
                                <option value="4">4 </option>
                                <option value="5">5 </option>
                              </Field>
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="partnerEPPOANumber"
                              />
                            </div>
                          }

                        </div>

                        <div className="row">
                          {((values.clientEPPOANumber >= 1) || (values.partnerEPPOANumber >= 1)) &&
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientEPPOAName1"
                                className="form-label"
                              >
                                Name of POA 1
                              </label>
                            </div>
                          }
                          {(values.clientEPPOANumber >= 1) ?
                            <div className="col-4 mb-3">
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="clientEPPOAName1"
                                name="clientEPPOAName1"
                                placeholder="POA Name"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientEPPOAName1"
                              />
                            </div> : <div className="col-4 mb-3"></div>}

                          {(values.partnerEPPOANumber >= 1) &&
                            <div className="col-4 mb-3">
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="partnerEPPOAName1"
                                name="partnerEPPOAName1"
                                placeholder="POA Name"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="partnerEPPOAName1"
                              />
                            </div>
                          }
                        </div>

                        <div className="row">
                          {((values.clientEPPOANumber >= 2) || (values.partnerEPPOANumber >= 2)) &&
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientEPPOAName2"
                                className="form-label"
                              >
                                Name of POA 2
                              </label>
                            </div>
                          }
                          {(values.clientEPPOANumber >= 2) ?
                            <div className="col-4 mb-3">
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="clientEPPOAName2"
                                name="clientEPPOAName2"
                                placeholder="POA Name"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientEPPOAName2"
                              />
                            </div> : <div className="col-4 mb-3"></div>}

                          {(values.partnerEPPOANumber >= 2) &&
                            <div className="col-4 mb-3">
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="partnerEPPOAName2"
                                name="partnerEPPOAName2"
                                placeholder="POA Name"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="partnerEPPOAName2"
                              />
                            </div>
                          }
                        </div>

                        <div className="row">
                          {((values.clientEPPOANumber >= 3) || (values.partnerEPPOANumber >= 3)) &&
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientEPPOAName3"
                                className="form-label"
                              >
                                Name of POA 3
                              </label>
                            </div>
                          }
                          {(values.clientEPPOANumber >= 3) ?
                            <div className="col-4 mb-3">
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="clientEPPOAName3"
                                name="clientEPPOAName3"
                                placeholder="POA Name"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientEPPOAName3"
                              />
                            </div> : <div className="col-4 mb-3"></div>}

                          {(values.partnerEPPOANumber >= 3) &&
                            <div className="col-4 mb-3">
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="partnerEPPOAName3"
                                name="partnerEPPOAName3"
                                placeholder="POA Name"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="partnerEPPOAName3"
                              />
                            </div>
                          }
                        </div>

                        <div className="row">
                          {((values.clientEPPOANumber >= 4) || (values.partnerEPPOANumber >= 4)) &&
                            <div className="col-4 mb-4">
                              <label
                                htmlFor="clientEPPOAName4"
                                className="form-label"
                              >
                                Name of POA 4
                              </label>
                            </div>
                          }
                          {(values.clientEPPOANumber >= 4) ?
                            <div className="col-4 mb-4">
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="clientEPPOAName4"
                                name="clientEPPOAName4"
                                placeholder="POA Name"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientEPPOAName4"
                              />
                            </div> : <div className="col-4 mb-4"></div>}

                          {(values.partnerEPPOANumber >= 4) &&
                            <div className="col-4 mb-4">
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="partnerEPPOAName4"
                                name="partnerEPPOAName4"
                                placeholder="POA Name"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="partnerEPPOAName4"
                              />
                            </div>
                          }
                        </div>

                        <div className="row">
                          {((values.clientEPPOANumber >= 5) || (values.partnerEPPOANumber >= 5)) &&
                            <div className="col-4 mb-5">
                              <label
                                htmlFor="clientEPPOAName5"
                                className="form-label"
                              >
                                Name of POA 5
                              </label>
                            </div>
                          }
                          {(values.clientEPPOANumber >= 5) ?
                            <div className="col-4 mb-5">
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="clientEPPOAName5"
                                name="clientEPPOAName5"
                                placeholder="POA Name"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientEPPOAName5"
                              />
                            </div> : <div className="col-4 mb-5"></div>}

                          {(values.partnerEPPOANumber >= 5) &&
                            <div className="col-4 mb-5">
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="partnerEPPOAName5"
                                name="partnerEPPOAName5"
                                placeholder="POA Name"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="partnerEPPOAName5"
                              />
                            </div>
                          }
                        </div>

                        <div className="row mt-2">
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
                      </div>}
                      {tRState === true && <div>
                        <div className="table-responsive my-3">
                          <table className="table table-bordered table-hover text-center">
                            <thead className="text-light" id="tableHead">
                              <tr>
                                <th>Name </th>
                                <th>Will </th>
                                <th>Executor </th>
                                <th>Testamentary Trust </th>
                                <th>Funeral Bonds </th>
                                <th>POA </th>
                                <th>Number of POA’s </th>
                                <th>Operations</th>
                              </tr>
                            </thead>
                            <tbody>
                              {((estatePlaning.clientEPCurrentWill !== undefined) && (estatePlaning.clientEPCurrentWill !== " ")) && (
                                <tr>
                                  <td>{ClientNameGet}</td>
                                  <td>{estatePlaning.clientEPCurrentWill}</td>
                                  <td>{estatePlaning.clientEPExecutor}</td>
                                  <td>{estatePlaning.clientEPTrust}</td>
                                  <td>{estatePlaning.clientEPFuneralPlan}</td>
                                  <td>{estatePlaning.clientEPPOA}</td>
                                  <td>{estatePlaning.clientEPPOANumber}</td>
                                  <td>
                                    <CustomDropDown
                                      Operations={EPOperations}
                                      Delete={"client"}
                                      Data={estatePlaning.clientEPOwner === "Partner" ? { ...estatePlaning, ...partnerEstatePlaning } : estatePlaning}
                                      FormikFun={setValues}
                                    />
                                  </td>
                                </tr>
                              )}
                              {((partnerEstatePlaning.partnerEPCurrentWill !== undefined) && (partnerEstatePlaning.partnerEPCurrentWill !== " ")) && (
                                <tr>
                                  <td>{PartnerNameGet}</td>
                                  <td>{partnerEstatePlaning.partnerEPCurrentWill}</td>
                                  <td>{partnerEstatePlaning.partnerEPExecutor}</td>
                                  <td>{partnerEstatePlaning.partnerEPTrust}</td>
                                  <td>{partnerEstatePlaning.partnerEPFuneralPlan}</td>
                                  <td>{partnerEstatePlaning.partnerEPPOA}</td>
                                  <td>{partnerEstatePlaning.partnerEPPOANumber}</td>
                                  <td>
                                    <CustomDropDown
                                      Operations={EPOperations}
                                      Delete={"partner"}
                                      Data={{ ...estatePlaning, ...partnerEstatePlaning }}
                                      FormikFun={setValues}
                                    />
                                  </td>
                                </tr>
                              )}

                              {/* ClientPOAList  */}
                            </tbody>
                          </table>
                        </div>
                      </div>}

                    </Form>
                  )}
                </Formik>
              </Card>
              {(localStorage.getItem("role") === "dev" || localStorage.getItem("role") === "test") &&

                <div className="row my-3">
                  <div className="col-md-12">
                    <Card className="shadow px-4 py-4">
                      <div className="row mt-5">
                        <div className="col-md-12">
                          <button
                            type="button"
                            className="float-end btn w-25  bgColor modalBtn"
                            onClick={() => Nev('/Super-And-Retirment')}
                          >
                            Next
                          </button>
                          <button
                            type="button"
                            className="float-end btn btn-outline w-25 mx-3 backBtn modalBtn"
                            onClick={() => Nev(-1)}>
                            Back
                          </button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstatePlanning;
