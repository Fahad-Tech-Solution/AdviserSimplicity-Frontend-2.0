import React, { useState, useEffect } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
// import * as Yup from "yup";                    //? don't Remove it you might need it later
// import { useNavigate } from "react-router-dom";//? don't Remove it you might need it later
import axios from "axios";
import noteBook from "../images/notebook.svg";
import single from "../../Svgs/single-2.svg";
import couple from "../../Svgs/couple-2.svg";
import DatePicker from "react-datepicker";
import { useRecoilState, useRecoilValue } from "recoil";
import { ClientName, PartnerName, defaultUrl } from "../../../Store/Store";
import { Card } from "react-bootstrap";
import CustomDropDown from "../../Assets/CustomDropDown/CustomDropDown";


const EmploymentDetail = () => {


  let DefaultUrl = useRecoilValue(defaultUrl)

  const [showTable, setShowTable] = useState(true);
  const [currentSaleryState, setCurrentSaleryState] = useState(false);
  const [sacrificState, setSacrificState] = useState(false);
  const [contributionState, setContributionState] = useState(false);
  const [sacrificState2, setSacrificState2] = useState(false);
  const [contributionState2, setContributionState2] = useState(false);
  const [currentSaleryState2, setCurrentSaleryState2] = useState(false);
  const [clientFlagState, setclientFlagState] = useState(false);
  const [partnerFlagState, setPartnerFlagState] = useState(false);

  const [ClientNameGet] = useRecoilState(ClientName);
  const [PartnerNameGet] = useRecoilState(PartnerName);

  const [clientData, setClientData] = useState([]);
  const [partnerData, setpartnerData] = useState([]);
  // let partner = localStorage.getItem("partner");
  useEffect(() => {

    let email = localStorage.getItem("Email");
    if (email) {
      GetApiFunction(email);
    }
  }, []);

  let GetApiFunction = async (email) => {
    try {

      let ClientOther = await axios.get(`${DefaultUrl}/api/Client-Income-EmploymentDetails`);
      ClientOther = ClientOther.data;
      ClientOther = ClientOther.filter((item) => item.Email === email);

      console.log(ClientOther);
      if (ClientOther[0].clientEMPOccupation !== undefined) {
        setShowTable(false);
      }

      let time = new Date(ClientOther[0].clientEMPCommencement)
      ClientOther[0].clientEMPCommencement = time;

      setClientData({ ...ClientOther[0] })
      if (ClientOther[0].clientEMPOwner === 'Partner') {
        let PartnerOther = await axios.get(`${DefaultUrl}/api/Partner-Income-EmploymentDetails`);
        PartnerOther = PartnerOther.data;
        PartnerOther = PartnerOther.filter((item) => item.Email === email);
        let timepartner = new Date(PartnerOther[0].partnerEMPCommencement)
        PartnerOther[0].partnerEMPCommencement = timepartner;
        console.log(PartnerOther);

        setpartnerData({ ...PartnerOther[0] })
      }
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  let currentlySalaryPackageHandler2 = (elem) => {
    if (elem === "No") {
      setCurrentSaleryState2(false);
    } else {
      setCurrentSaleryState2(true);
    }
  };

  let currentlySalaryPackageHandler = (elem) => {
    if (elem === "No") {
      setCurrentSaleryState(false);
    } else {
      setCurrentSaleryState(true);
    }
  };

  let sacrificeradioHandler = (elem) => {
    if (elem === "No") {
      setSacrificState(false);
    } else {
      setSacrificState(true);
    }
  };

  let contributionradioHandler = (elem) => {
    if (elem === "No") {
      setContributionState(false);
    } else {
      setContributionState(true);
    }
  };

  let sacrificeradioHandler2 = (elem) => {
    if (elem === "No") {
      setSacrificState2(false);
    } else {
      setSacrificState2(true);
    }
  };

  let contributionradioHandler2 = (elem) => {
    if (elem === "No") {
      setContributionState2(false);
    } else {
      setContributionState2(true);
    }
  };

  let CLOperation = (Option, elem, deleteData) => {
    if (Option === 1) {
      // update
      setShowTable(true);
      setclientFlagState(true);
      setPartnerFlagState(true);
    } else if (Option === 2) {
      // delete
      deleteOption(elem, deleteData)

    }
  };

  let deleteOption = (elem, deleteData) => {
    if (deleteData === 'client') {
      axios.delete(`${DefaultUrl}/api/Client-Income-EmploymentDetails/Delete/${elem.Email}`)
        .then((res) => {
          console.log('Client Has Been Deleted');
          setclientFlagState(false);
          setClientData([]);
        })
    } else if (deleteData === 'partner') {
      axios.delete(`${DefaultUrl}/api/Partner-Income-EmploymentDetails/Delete/${elem.Email}`)
        .then((res) => {
          console.log('Partner Has Been Deleted')
          setPartnerFlagState(false);
          setpartnerData([]);
        }

        )
    }
  }

  const initialValues = {
    //Client employment details
    clientEMPOwner: "",
    clientEMPOccupation: "",
    clientEMPEmployment: "",
    clientEMPName: "",
    clientEMPCommencement: "",
    clientEMPHours: "", //number
    clientEMPExcluding: "", //number
    clientEMPSuperAnnuation: "", //number
    clientEMPChoiceradio: "No",
    clientEMPSacrificeradio: "No",
    clientEMPSalarySacrifice: "", //number
    clientEMPcontributionradio: "No",
    clientEMPTaxContribution: "", //'number
    clientEMPSignificantlyradio: "No",
    clientEMPUnusedSickLeave: "", //number
    clientEMPUnusedSickLeaveType: "",
    clientEMPUnusedAnnual: "", //number
    clientEMPUnusedAnnualType: "",
    clientEMPUnusedlong: "", //number
    clientEMPUnusedlongType: "",
    clientEMPCurrentlyRadio: "No",
    clientEMPFBTStatus: "",
    clientEMPSalaryRadio: "No",
    clientEMPCostCar: "", //number
    clientEMPFBTradio: "No",
    clientEMPCarPackaged: "", //number
    clientEMPSalaryPackageRadio: "No",
    clientEMPAbilitytoSacrifice: "", //number

    partnerEMPOccupation: "",
    partnerEMPEmployment: "",
    partnerEMPName: "",
    partnerEMPCommencement: "",
    partnerEMPHours: "",
    partnerEMPExcluding: "",
    partnerEMPSuperAnnuation: "",
    partnerEMPChoiceradio: "",
    partnerEMPSacrificeradio: "",
    partnerEMPSalarySacrifice: "",
    partnerEMPcontributionradio: "",
    partnerEMPTaxContribution: "",
    partnerEMPSignificantlyradio: "",
    partnerEMPUnusedSickLeave: "",
    partnerEMPUnusedSickLeaveType: "",
    partnerEMPUnusedAnnual: "",
    partnerEMPUnusedAnnualType: "",
    partnerEMPUnusedlong: "",
    partnerEMPUnusedlongType: "",
    partnerEMPCurrentlyRadio: "",
    partnerEMPFBTStatus: "",
    partnerEMPSalaryRadio: "",
    partnerEMPCostCar: "",
    partnerEMPFBTradio: "",
    partnerEMPCarPackaged: "",
    partnerEMPSalaryPackageRadio: "",
    partnerEMPAbilitytoSacrifice: "",
  };

  let onSubmit = (values) => {
    // console.log(values);
    setShowTable(false);
    let clientObj = {
      Email: localStorage.getItem("Email"),
      clientEMPOwner: values.clientEMPOwner || " ",
      clientEMPOccupation: values.clientEMPOccupation || " ",
      clientEMPEmployment: values.clientEMPEmployment || " ",
      clientEMPName: values.clientEMPName || " ",
      clientEMPCommencement: values.clientEMPCommencement || " ",
      clientEMPHours: values.clientEMPHours || 0,
      clientEMPExcluding: values.clientEMPExcluding || 0,
      clientEMPSuperAnnuation: values.clientEMPSuperAnnuation || 0,
      clientEMPChoiceradio: values.clientEMPChoiceradio || " ",
      clientEMPSacrificeradio: values.clientEMPSacrificeradio || " ",
      clientEMPSalarySacrifice: values.clientEMPSalarySacrifice || 0,
      clientEMPcontributionradio: values.clientEMPcontributionradio || " ",
      clientEMPTaxContribution: values.clientEMPTaxContribution || 0,
      clientEMPSignificantlyradio: values.clientEMPSignificantlyradio || " ",
      clientEMPUnusedSickLeave: values.clientEMPUnusedSickLeave || 0,
      clientEMPUnusedSickLeaveType: values.clientEMPUnusedSickLeaveType || " ",
      clientEMPUnusedAnnual: values.clientEMPUnusedAnnual || 0,
      clientEMPUnusedAnnualType: values.clientEMPUnusedAnnualType || " ",
      clientEMPUnusedlong: values.clientEMPUnusedlong || 0,
      clientEMPUnusedlongType: values.clientEMPUnusedlongType || " ",
      clientEMPCurrentlyRadio: values.clientEMPCurrentlyRadio || " ",
      clientEMPFBTStatus: values.clientEMPFBTStatus || " ",
      clientEMPSalaryRadio: values.clientEMPSalaryRadio || " ",
      clientEMPCostCar: values.clientEMPCostCar || 0,
      clientEMPFBTradio: values.clientEMPFBTradio || " ",
      clientEMPCarPackaged: values.clientEMPCarPackaged || 0,
      clientEMPSalaryPackageRadio: values.clientEMPSalaryPackageRadio || " ",
      clientEMPAbilitytoSacrifice: values.clientEMPAbilitytoSacrifice || 0,
    };
    let partnerObj = {
      Email: localStorage.getItem("Email"),
      partnerEMPOccupation: values.partnerEMPOccupation || " ",
      partnerEMPEmployment: values.partnerEMPEmployment || " ",
      partnerEMPName: values.partnerEMPName || " ",
      partnerEMPCommencement: values.partnerEMPCommencement || " ",
      partnerEMPHours: values.partnerEMPHours || 0,
      partnerEMPExcluding: values.partnerEMPExcluding || 0,
      partnerEMPSuperAnnuation: values.partnerEMPSuperAnnuation || 0,
      partnerEMPChoiceradio: values.partnerEMPChoiceradio || " ",
      partnerEMPSacrificeradio: values.partnerEMPSacrificeradio || " ",
      partnerEMPSalarySacrifice: values.partnerEMPSalarySacrifice || 0,
      partnerEMPcontributionradio: values.partnerEMPcontributionradio || " ",
      partnerEMPTaxContribution: values.partnerEMPTaxContribution || 0,
      partnerEMPSignificantlyradio: values.partnerEMPSignificantlyradio || " ",
      partnerEMPUnusedSickLeave: values.partnerEMPUnusedSickLeave || 0,
      partnerEMPUnusedSickLeaveType:
        values.partnerEMPUnusedSickLeaveType || " ",
      partnerEMPUnusedAnnual: values.partnerEMPUnusedAnnual || 0,
      partnerEMPUnusedAnnualType: values.partnerEMPUnusedAnnualType || " ",
      partnerEMPUnusedlong: values.partnerEMPUnusedlong || 0,
      partnerEMPUnusedlongType: values.partnerEMPUnusedlongType || " ",
      partnerEMPCurrentlyRadio: values.partnerEMPCurrentlyRadio || " ",
      partnerEMPFBTStatus: values.partnerEMPFBTStatus || " ",
      partnerEMPSalaryRadio: values.partnerEMPSalaryRadio || " ",
      partnerEMPCostCar: values.partnerEMPCostCar || 0,
      partnerEMPFBTradio: values.partnerEMPFBTradio || " ",
      partnerEMPCarPackaged: values.partnerEMPCarPackaged || 0,
      partnerEMPSalaryPackageRadio: values.partnerEMPSalaryPackageRadio || " ",
      partnerEMPAbilitytoSacrifice: values.partnerEMPAbilitytoSacrifice || 0,
    };

    console.log(clientObj);

    if (clientFlagState === true) {
      axios
        .patch(
          `${DefaultUrl}/api/Client-Income-EmploymentDetails/Update/${clientObj.Email}`,
          clientObj
        )
        .then((res) => {
          console.log("Client Has Been Updated");
          setClientData(clientObj);
        });
    } else {
      // alert('komail')
      axios
        .post(
          `${DefaultUrl}/api/Client-Income-EmploymentDetails/Add`,
          clientObj
        )
        .then((res) => {
          console.log("Client Has Been Added");
          setClientData({ ...clientObj });
        })

    }
    if (values.clientEMPOwner === 'Partner') {
      if (partnerFlagState === true) {
        axios
          .patch(`${DefaultUrl}/api/Partner-Income-EmploymentDetails/Update/${clientObj.Email}`, partnerObj)
          .then((res) => {
            console.log('Partner Has Been Updated');
            setpartnerData(partnerObj);
          })
      }
      else {
        axios.post(`${DefaultUrl}/api/Partner-Income-EmploymentDetails/Add`, partnerObj)
          .then((res) => {
            console.log('Partner Has Been Added');
            setpartnerData(partnerObj);
          })
      }
    }
  };

  return (
    <div className="row my-3">
      <div className="col-md-12">

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
              <div className="row">
                <div className="col-md-12">
                  {showTable ? (
                    <Card className="shadow px-4 py-4 borderOverAll">
                      <h3 className="text-center">Income & Expense</h3>
                      <h3 className="" onClick={() => { localStorage.setItem("role", "dev") }}>
                        Employment Income
                        <div className="iconContainerLg">
                          <img className="img-fluid" src={noteBook} alt="" />
                        </div>
                      </h3>

                      {/* 1 row */}

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
                        {values.clientEMPOwner === "Partner" && (
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
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-4 mb-3">
                          <label
                            htmlFor="clientEMPOwner"
                            className="form-label"
                          >
                            Owner
                          </label>
                        </div>
                        <div className="col-4 mb-3">
                          <Field
                            as="select"
                            className="form-control inputDesign shadow form-select"
                            id="clientEMPOwner"
                            name="clientEMPOwner"
                            placeholder="clientEMPOwner"
                          >
                            <option value="">Select</option>
                            <option value="Client">Client</option>
                            <option value="Partner">Partner </option>
                          </Field>
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="clientEMPOwner"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <label
                            htmlFor="clientEMPOccupation"
                            className="form-label"
                          >
                            Primary Occupation
                          </label>
                        </div>
                        <div className="col-4">
                          <div className="mb-3">
                            <Field
                              type="text"
                              className="form-control shadow inputDesign"
                              id="clientEMPOccupation"
                              name="clientEMPOccupation"
                              placeholder="Primary Occupation"
                            />
                            <ErrorMessage
                              name="clientEMPOccupation"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>

                        {values.clientEMPOwner === "Partner" && (
                          <div className="col-4">
                            <Field
                              type="text"
                              className="form-control shadow inputDesign"
                              id="partnerEMPOccupation"
                              name="partnerEMPOccupation"
                              placeholder="partner Primary Occupation"
                            />
                            <ErrorMessage
                              name="partnerEMPOccupation"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <label
                            htmlFor="clientEMPEmployment"
                            className="form-label"
                          >
                            Employment Status
                          </label>
                        </div>

                        <div className="col-4">
                          <div className="mb-3">
                            <Field
                              as="select"
                              id="clientEMPEmployment"
                              className="form-select shadow  inputDesign"
                              name="clientEMPEmployment"
                            >
                              <option value="">Select</option>
                              <option value="Full Time">Full Time</option>
                              <option value="Part Time">Part Time</option>
                              <option value="Casual">Casual</option>
                              <option value="Conratct">Conratct</option>
                              <option value="OnLeave">On Leave</option>
                            </Field>
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="clientEMPEmployment"
                            />
                          </div>
                        </div>

                        {values.clientEMPOwner === "Partner" && (
                          <div className="col-4">
                            <div className="mb-3">
                              <Field
                                as="select"
                                id="partnerEMPEmployment"
                                className="form-select shadow  inputDesign"
                                name="partnerEMPEmployment"
                              >
                                <option value="">Select</option>
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Casual">Casual</option>
                                <option value="Conratct">Conratct</option>
                                <option value="OnLeave">On Leave</option>
                              </Field>
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="partnerEMPEmployment"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <label
                            htmlFor="clientEMPName"
                            className="form-label"
                          >
                            Name of Company
                          </label>
                        </div>

                        <div className="col-4">
                          <div className="mb-3">
                            <Field
                              type="text"
                              className="form-control inputDesign shadow"
                              name="clientEMPName"
                              id="clientEMPName"
                              placeholder="Name of Company"
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="clientEMPName"
                            />
                          </div>
                        </div>

                        {values.clientEMPOwner === "Partner" && (
                          <div className="col-4">
                            <div className="mb-3">
                              <Field
                                type="text"
                                className="form-control inputDesign shadow"
                                name="partnerEMPName"
                                id="partnerEMPName"
                                placeholder="Name of Company"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="partnerEMPName"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <label
                            htmlFor="clientEMPCommencement"
                            className="form-label"
                          >
                            Commencement Date
                          </label>
                        </div>

                        <div className="col-4">
                          <div className="mb-3">
                            <div>
                              <DatePicker
                                className="form-control inputDesign shadow"
                                showIcon
                                id="clientEMPCommencement"
                                name="clientEMPCommencement"
                                selected={values.clientEMPCommencement}
                                onChange={(date) =>
                                  setFieldValue("clientEMPCommencement", date)
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
                            </div>
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="clientEMPCommencement"
                            />
                          </div>
                        </div>

                        {values.clientEMPOwner === "Partner" && (
                          <div className="col-4">
                            <div className="mb-3">
                              <div>
                                <DatePicker
                                  className="form-control inputDesign shadow"
                                  showIcon
                                  id="partnerEMPCommencement"
                                  name="partnerEMPCommencement"
                                  selected={values.partnerEMPCommencement}
                                  onChange={(date) =>
                                    setFieldValue(
                                      "partnerEMPCommencement",
                                      date
                                    )
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
                              </div>
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="partnerEMPCommencement"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <label
                            htmlFor="clientEMPHours"
                            className="form-label"
                          >
                            Number of hours per week
                          </label>
                        </div>

                        <div className="col-4">
                          <div className="mb-3">
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="clientEMPHours"
                              name="clientEMPHours"
                              placeholder="Number of hours per week"
                            />
                            <ErrorMessage
                              name="clientEMPHours"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>

                        {values.clientEMPOwner === "Partner" && (
                          <div className="col-4">
                            <div className="mb-3">
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="partnerEMPHours"
                                name="partnerEMPHours"
                                placeholder="Number of hours per week"
                              />
                              <ErrorMessage
                                name="partnerEMPHours"
                                component="div"
                                className="text-danger fw-bold"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <label
                            htmlFor="clientEMPExcluding"
                            className="form-label"
                          >
                            Salary (Excluding Super)
                          </label>
                        </div>
                        <div className="col-4">
                          <div className="mb-3">
                            <Field
                              type="number"
                              name="clientEMPExcluding"
                              className="form-control inputDesign shadow"
                              id="clientEMPExcluding"
                              placeholder="Salary (Excluding Super)"
                            />
                            <ErrorMessage
                              name="clientEMPExcluding"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>

                        {values.clientEMPOwner === "Partner" && (
                          <div className="col-4">
                            <div className="mb-3">
                              <Field
                                type="number"
                                name="partnerEMPExcluding"
                                className="form-control inputDesign shadow"
                                id="partnerEMPExcluding"
                                placeholder="Salary (Excluding Super)"
                              />
                              <ErrorMessage
                                name="partnerEMPExcluding"
                                component="div"
                                className="text-danger fw-bold"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <label
                            htmlFor="clientEMPSuperAnnuation"
                            className="form-label"
                          >
                            Superannuation Guarantee
                          </label>
                        </div>
                        <div className="col-4">
                          <div className="mb-3">
                            <div className="row">
                              <div className="col-8">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow"
                                  id="clientEMPSuperAnnuation"
                                  placeholder="Superannuation Guarantee"
                                  name="clientEMPSuperAnnuation"
                                />
                                <ErrorMessage
                                  name="clientEMPSuperAnnuation"
                                  component="div"
                                  className="text-danger fw-bold"
                                />
                              </div>
                              <div className="col-4">
                                <Field
                                  as="select"
                                  name="clientEMPSuperType"
                                  id="clientEMPSuperType"
                                  className="form-select shadow  inputDesign"
                                >
                                  <option value="">Select</option>
                                  <option value="$">$</option>
                                  <option value="percentage">%</option>
                                </Field>
                                <ErrorMessage
                                  name="clientEMPSuperType"
                                  component="div"
                                  className="text-danger fw-bold"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {values.clientEMPOwner === "Partner" && (
                          <div className="col-4">
                            <div className="mb-3">
                              <div className="row">
                                <div className="col-8">
                                  <Field
                                    type="number"
                                    className="form-control inputDesign shadow"
                                    id="partnerEMPSuperAnnuation"
                                    placeholder="Superannuation Guarantee"
                                    name="partnerEMPSuperAnnuation"
                                  />
                                  <ErrorMessage
                                    name="partnerEMPSuperAnnuation"
                                    component="div"
                                    className="text-danger fw-bold"
                                  />
                                </div>
                                <div className="col-4">
                                  <Field
                                    as="select"
                                    name="partnerEMPSuperType"
                                    id="partnerSuperAnnuationGuaranteeType"
                                    className="form-select shadow  inputDesign"
                                  >
                                    <option value="">Select</option>
                                    <option value="$">$</option>
                                    <option value="percentage">%</option>
                                  </Field>
                                  <ErrorMessage
                                    name="partnerSuperAnnuationGuaranteeType"
                                    component="div"
                                    className="text-danger fw-bold"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <label className="form-label">
                            Does your Employer Offer Choice of Fund?
                          </label>
                        </div>
                        <div className="col-4">
                          <div className="mb-3">
                            {/* switch button style */}
                            <div className="form-check form-switch m-0 p-0 ">
                              <div className="radiobutton">
                                <input
                                  type="radio"
                                  name="clientEMPChoiceradio"
                                  id="clientEMPChoiceradio1"
                                  onChange={handleChange}
                                  value="Yes"
                                  checked={
                                    values.clientEMPChoiceradio === "Yes"
                                  }
                                />
                                <label
                                  htmlFor="clientEMPChoiceradio1"
                                  className="label1"
                                >
                                  <span>YES</span>
                                </label>
                                <input
                                  type="radio"
                                  name="clientEMPChoiceradio"
                                  id="clientEMPChoiceradio2"
                                  onChange={handleChange}
                                  value="No"
                                  checked={
                                    values.clientEMPChoiceradio === "No"
                                  }
                                />
                                <label
                                  htmlFor="clientEMPChoiceradio2"
                                  className="label2"
                                >
                                  <span>NO</span>
                                </label>
                              </div>
                            </div>
                            {/* switch button style */}
                          </div>
                        </div>

                        {values.clientEMPOwner === "Partner" && (
                          <div className="col-4">
                            <div className="mb-3">
                              {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="partnerEMPChoiceradio"
                                    id="ChoiceofFundopt12"
                                    onChange={handleChange}
                                    value="Yes"
                                    checked={
                                      values.partnerEMPChoiceradio === "Yes"
                                    }
                                  />
                                  <label
                                    htmlFor="ChoiceofFundopt12"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="partnerEMPChoiceradio"
                                    id="ChoiceofFundopt22"
                                    onChange={handleChange}
                                    value="No"
                                    checked={
                                      values.partnerEMPChoiceradio === "No"
                                    }
                                  />
                                  <label
                                    htmlFor="ChoiceofFundopt22"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                              {/* switch button style */}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <label className="form-label">
                            Do you have the ability to salary sacrifice?
                          </label>
                        </div>
                        <div className="col-4">
                          <div className="mb-3">
                            {/* switch button style */}
                            <div className="form-check form-switch m-0 p-0 ">
                              <div className="radiobutton">
                                <input
                                  type="radio"
                                  name="clientEMPSacrificeradio"
                                  value="Yes"
                                  id="sacrificeopt1"
                                  onClick={() => sacrificeradioHandler("Yes")}
                                  onChange={handleChange}
                                  checked={
                                    values.clientEMPSacrificeradio === "Yes"
                                  }
                                />
                                <label
                                  htmlFor="sacrificeopt1"
                                  className="label1"
                                >
                                  <span>YES</span>
                                </label>
                                <input
                                  type="radio"
                                  name="clientEMPSacrificeradio"
                                  value="No"
                                  id="sacrificeopt2"
                                  onClick={() => sacrificeradioHandler("No")}
                                  onChange={handleChange}
                                  checked={
                                    values.clientEMPSacrificeradio === "No"
                                  }
                                />
                                <label
                                  htmlFor="sacrificeopt2"
                                  className="label2"
                                >
                                  <span>NO</span>
                                </label>
                              </div>
                            </div>
                            {/* switch button style */}
                          </div>
                        </div>

                        {values.clientEMPOwner === "Partner" && (
                          <div className="col-4">
                            <div className="mb-3">
                              {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="partnerEMPSacrificeradio"
                                    value="Yes"
                                    id="sacrificeopt12"
                                    onClick={() =>
                                      sacrificeradioHandler2("Yes")
                                    }
                                    onChange={handleChange}
                                    checked={
                                      values.partnerEMPSacrificeradio ===
                                      "Yes"
                                    }
                                  />
                                  <label
                                    htmlFor="sacrificeopt12"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="partnerEMPSacrificeradio"
                                    value="No"
                                    id="sacrificeopt22"
                                    onClick={() =>
                                      sacrificeradioHandler2("No")
                                    }
                                    onChange={handleChange}
                                    checked={
                                      values.partnerEMPSacrificeradio === "No"
                                    }
                                  />
                                  <label
                                    htmlFor="sacrificeopt22"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                              {/* switch button style */}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <label
                            htmlFor="clientEMPSalarySacrifice"
                            className="form-label"
                          >
                            How Much
                          </label>
                        </div>

                        <div className="col-4">
                          {sacrificState && (
                            <div className="mb-3">
                              <Field
                                type="number"
                                className="form-control
                 inputDesign shadow"
                                id="clientEMPSalarySacrifice"
                                name="clientEMPSalarySacrifice"
                                placeholder="How much you have the ability to salary sacrifice?"
                              />
                              <ErrorMessage
                                name="clientEMPSalarySacrifice"
                                component="div"
                                className="text-danger fw-bold"
                              />
                            </div>
                          )}
                        </div>

                        <div className="col-4">
                          {sacrificState2 && (
                            <div className="mb-3">
                              <Field
                                type="number"
                                className="form-control
                 inputDesign shadow"
                                id="partnerEMPSalarySacrifice"
                                name="partnerEMPSalarySacrifice"
                                placeholder="How much you have the ability to salary sacrifice?"
                              />
                              <ErrorMessage
                                name="partnerEMPSalarySacrifice"
                                component="div"
                                className="text-danger fw-bold"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <label className="form-label">
                            Do you make any after tax-contribution to super?
                          </label>
                        </div>

                        <div className="col-4">
                          <div className="mb-3">
                            {/* switch button style */}
                            <div className="form-check form-switch m-0 p-0 ">
                              <div className="radiobutton">
                                <input
                                  type="radio"
                                  name="clientEMPcontributionradio"
                                  id="contributionopt1"
                                  onClick={() =>
                                    contributionradioHandler("yes")
                                  }
                                  onChange={handleChange}
                                  value="Yes"
                                  checked={
                                    values.clientEMPcontributionradio ===
                                    "Yes"
                                  }
                                />
                                <label
                                  htmlFor="contributionopt1"
                                  className="label1"
                                >
                                  <span>YES</span>
                                </label>
                                <input
                                  type="radio"
                                  name="clientEMPcontributionradio"
                                  id="contributionopt2"
                                  value="No"
                                  onClick={() =>
                                    contributionradioHandler("No")
                                  }
                                  onChange={handleChange}
                                  checked={
                                    values.clientEMPcontributionradio === "No"
                                  }
                                />
                                <label
                                  htmlFor="contributionopt2"
                                  className="label2"
                                >
                                  <span>NO</span>
                                </label>
                              </div>
                            </div>
                            {/* switch button style */}
                          </div>
                        </div>

                        {values.clientEMPOwner === "Partner" && (
                          <div className="col-4">
                            <div className="mb-3">
                              {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="partnerEMPcontributionradio"
                                    id="contributionopt12"
                                    onClick={() =>
                                      contributionradioHandler2("yes")
                                    }
                                    onChange={handleChange}
                                    value="Yes"
                                    checked={
                                      values.partnerEMPcontributionradio ===
                                      "Yes"
                                    }
                                  />
                                  <label
                                    htmlFor="contributionopt12"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="partnerEMPcontributionradio"
                                    id="contributionopt22"
                                    value="No"
                                    onClick={() =>
                                      contributionradioHandler2("No")
                                    }
                                    onChange={handleChange}
                                    checked={
                                      values.partnerEMPcontributionradio ===
                                      "No"
                                    }
                                  />
                                  <label
                                    htmlFor="contributionopt22"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                              {/* switch button style */}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <label
                            htmlFor="clientEMPTaxContribution"
                            className="form-label"
                          >
                            How Much
                          </label>
                        </div>
                        <div className="col-4">
                          {contributionState && (
                            <div className="mb-3">
                              <Field
                                type="number"
                                className="form-control inputDesign
                 shadow"
                                id="clientEMPTaxContribution"
                                name="clientEMPTaxContribution"
                                placeholder="How much you make any after tax-contribution to super?"
                              />
                              <ErrorMessage
                                name="clientEMPTaxContribution"
                                component="div"
                                className="text-danger fw-bold"
                              />
                            </div>
                          )}
                        </div>

                        <div className="col-4">
                          {contributionState2 && (
                            <div className="mb-3">
                              <Field
                                type="number"
                                className="form-control inputDesign
                 shadow"
                                id="partnerEMPTaxContribution"
                                name="partnerEMPTaxContribution"
                                placeholder="How much you make any after tax-contribution to super?"
                              />
                              <ErrorMessage
                                name="partnerEMPTaxContribution"
                                component="div"
                                className="text-danger fw-bold"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <label className="form-label">
                            Can your income vary significantly?
                          </label>
                        </div>

                        <div className="col-4">
                          <div className="mb-3">
                            {/* switch button style */}
                            <div className="form-check form-switch m-0 p-0 ">
                              <div className="radiobutton">
                                <input
                                  type="radio"
                                  name="clientEMPSignificantlyradio"
                                  id="significantlyopt1"
                                  onChange={handleChange}
                                  value="Yes"
                                  checked={
                                    values.clientEMPSignificantlyradio ===
                                    "Yes"
                                  }
                                />
                                <label
                                  htmlFor="significantlyopt1"
                                  className="label1"
                                >
                                  <span>YES</span>
                                </label>
                                <input
                                  type="radio"
                                  name="clientEMPSignificantlyradio"
                                  id="significantlyopt2"
                                  onChange={handleChange}
                                  value="No"
                                  checked={
                                    values.clientEMPSignificantlyradio ===
                                    "No"
                                  }
                                />
                                <label
                                  htmlFor="significantlyopt2"
                                  className="label2"
                                >
                                  <span>NO</span>
                                </label>
                              </div>
                            </div>
                            {/* switch button style */}
                          </div>
                        </div>

                        {values.clientEMPOwner === "Partner" && (
                          <div className="col-4">
                            <div className="mb-3">
                              {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="partnerEMPSignificantlyradio"
                                    id="significantlyopt12"
                                    onChange={handleChange}
                                    value="Yes"
                                    checked={
                                      values.partnerEMPSignificantlyradio ===
                                      "Yes"
                                    }
                                  />
                                  <label
                                    htmlFor="significantlyopt12"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="partnerEMPSignificantlyradio"
                                    id="significantlyopt22"
                                    onChange={handleChange}
                                    value="No"
                                    checked={
                                      values.partnerEMPSignificantlyradio ===
                                      "No"
                                    }
                                  />
                                  <label
                                    htmlFor="significantlyopt22"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                              {/* switch button style */}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <label
                            htmlFor="clientEMPUnusedSickLeave"
                            className="form-label"
                          >
                            Unused sick leave entitlements
                          </label>
                        </div>
                        <div className="col-4">
                          {values.clientEMPSignificantlyradio === "Yes" ? (
                            <div className="mb-3">
                              <div className="row">
                                <div className="col-8">
                                  <Field
                                    type="number"
                                    className="form-control inputDesign shadow"
                                    id="clientEMPUnusedSickLeave"
                                    name="clientEMPUnusedSickLeave"
                                    placeholder="Unused sick leave entitlements"
                                  />

                                  <ErrorMessage
                                    name="clientEMPUnusedSickLeave"
                                    component="div"
                                    className="text-danger fw-bold"
                                  />
                                </div>
                                <div className="col-4">
                                  <Field
                                    as="select"
                                    id="clientEMPUnusedSickLeaveType"
                                    name="clientEMPUnusedSickLeaveType"
                                    className="form-select shadow  inputDesign"
                                  >
                                    <option value="">Select</option>
                                    <option value="days">Days</option>
                                    <option value="hours">Hours</option>
                                    <option value="weeks">Weeks</option>
                                    <option value="months">Months</option>
                                  </Field>
                                  <ErrorMessage
                                    name="clientEMPUnusedSickLeaveType"
                                    component="div"
                                    className="text-danger fw-bold"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>

                        {values.clientEMPOwner === "Partner" && (
                          <div className="col-4">
                            {values.partnerEMPSignificantlyradio === "Yes" ? (
                              <div className="mb-3">
                                <div className="row">
                                  <div className="col-8">
                                    <Field
                                      type="number"
                                      className="form-control inputDesign shadow"
                                      id="partnerEMPUnusedSickLeave"
                                      name="partnerEMPUnusedSickLeave"
                                      placeholder="Unused sick leave entitlements"
                                    />

                                    <ErrorMessage
                                      name="partnerEMPUnusedSickLeave"
                                      component="div"
                                      className="text-danger fw-bold"
                                    />
                                  </div>
                                  <div className="col-4">
                                    <Field
                                      as="select"
                                      id="partnerEMPUnusedSickLeaveType"
                                      name="partnerEMPUnusedSickLeaveType"
                                      className="form-select shadow  inputDesign"
                                    >
                                      <option value="">Select</option>
                                      <option value="days">Days</option>
                                      <option value="hours">Hours</option>
                                      <option value="weeks">Weeks</option>
                                      <option value="months">Months</option>
                                    </Field>
                                    <ErrorMessage
                                      name="partnerEMPUnusedSickLeaveType"
                                      component="div"
                                      className="text-danger fw-bold"
                                    />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <label
                            htmlFor="clientEMPUnusedAnnual"
                            className="form-label"
                          >
                            Unused annual leave entitlements
                          </label>
                        </div>
                        <div className="col-4">
                          {values.clientEMPSignificantlyradio === "Yes" ? (
                            <div className="mb-3">
                              <div className="row">
                                <div className="col-8">
                                  <Field
                                    type="number"
                                    className="form-control inputDesign shadow"
                                    id="clientEMPUnusedAnnual"
                                    name="clientEMPUnusedAnnual"
                                    placeholder="Unused annual leave entitlements"
                                  />
                                  <ErrorMessage
                                    name="clientEMPUnusedAnnual"
                                    component="div"
                                    className="text-danger fw-bold"
                                  />
                                </div>
                                <div className="col-4">
                                  <Field
                                    as="select"
                                    id="clientEMPUnusedAnnualType"
                                    name="clientEMPUnusedAnnualType"
                                    className="form-select shadow  inputDesign"
                                  >
                                    <option value="">Select</option>
                                    <option value="days">Days</option>
                                    <option value="hours">Hours</option>
                                    <option value="weeks">Weeks</option>
                                    <option value="months">Months</option>
                                  </Field>
                                  <ErrorMessage
                                    name="clientEMPUnusedAnnualType"
                                    component="div"
                                    className="text-danger fw-bold"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>

                        {values.clientEMPOwner === "Partner" && (
                          <div className="col-4">
                            {values.partnerEMPSignificantlyradio === "Yes" ? (
                              <div className="mb-3">
                                <div className="row">
                                  <div className="col-8">
                                    <Field
                                      type="number"
                                      className="form-control inputDesign shadow"
                                      id="partnerEMPUnusedAnnual"
                                      name="partnerEMPUnusedAnnual"
                                      placeholder="Unused annual leave entitlements"
                                    />
                                    <ErrorMessage
                                      name="partnerEMPUnusedAnnual"
                                      component="div"
                                      className="text-danger fw-bold"
                                    />
                                  </div>
                                  <div className="col-4">
                                    <Field
                                      as="select"
                                      id="partnerEMPUnusedAnnualType"
                                      className="form-select shadow  inputDesign"
                                      name="partnerEMPUnusedAnnualType"
                                    >
                                      <option value="">Select</option>
                                      <option value="days">Days</option>
                                      <option value="hours">Hours</option>
                                      <option value="weeks">Weeks</option>
                                      <option value="months">Months</option>
                                    </Field>
                                    <ErrorMessage
                                      name="partnerEMPUnusedAnnualType"
                                      component="div"
                                      className="text-danger fw-bold"
                                    />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <label
                            htmlFor="clientEMPUnusedlong"
                            className="form-label"
                          >
                            Unused long service leave entitlements
                          </label>
                        </div>
                        <div className="col-4">
                          {values.clientEMPSignificantlyradio === "Yes" ? (
                            <div className="mb-3">
                              <div className="row">
                                <div className="col-8">
                                  <Field
                                    type="number"
                                    className="form-control inputDesign shadow"
                                    id="clientEMPUnusedlong"
                                    name="clientEMPUnusedlong"
                                    placeholder="Unused long service leave entitlements"
                                  />

                                  <ErrorMessage
                                    name="clientEMPUnusedlong"
                                    component="div"
                                    className="text-danger fw-bold"
                                  />
                                </div>
                                <div className="col-4">
                                  <Field
                                    as="select"
                                    id="clientEMPUnusedlongType"
                                    name="clientEMPUnusedlongType"
                                    className="form-select shadow  inputDesign"
                                  >
                                    <option value="">Select</option>
                                    <option value="days">Days</option>
                                    <option value="hours">Hours</option>
                                    <option value="weeks">Weeks</option>
                                    <option value="months">Months</option>
                                  </Field>
                                  <ErrorMessage
                                    name="clientEMPUnusedlongType"
                                    component="div"
                                    className="text-danger fw-bold"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>

                        {values.clientEMPOwner === "Partner" && (
                          <div className="col-4">
                            {values.partnerEMPSignificantlyradio === "Yes" ? (
                              <div className="mb-3">
                                <div className="row">
                                  <div className="col-8">
                                    <Field
                                      type="number"
                                      className="form-control inputDesign shadow"
                                      id="partnerEMPUnusedlong"
                                      name="partnerEMPUnusedlong"
                                      placeholder="Unused long service leave entitlements"
                                    />

                                    <ErrorMessage
                                      name="partnerEMPUnusedlong"
                                      component="div"
                                      className="text-danger fw-bold"
                                    />
                                  </div>
                                  <div className="col-4">
                                    <Field
                                      as="select"
                                      id="partnerEMPUnusedlongType"
                                      name="partnerEMPUnusedlongType"
                                      className="form-select shadow  inputDesign"
                                    >
                                      <option value="">Select</option>
                                      <option value="days">Days</option>
                                      <option value="hours">Hours</option>
                                      <option value="weeks">Weeks</option>
                                      <option value="months">Months</option>
                                    </Field>
                                    <ErrorMessage
                                      name="partnerEMPUnusedlongType"
                                      component="div"
                                      className="text-danger fw-bold"
                                    />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                      </div>
                      <div className="row mb-3">
                        <div className="col-4">
                          <label className="form-label">
                            Do you currently Salary Package?
                          </label>
                        </div>
                        <div className="col-4">
                          <div className="mb-3">
                            <div className="form-check form-switch m-0 p-0 ">
                              <div className="radiobutton">
                                <input
                                  type="radio"
                                  name="clientEMPCurrentlyRadio"
                                  id="currentlySalaryPackage1"
                                  value="Yes"
                                  onClick={() =>
                                    currentlySalaryPackageHandler("yes")
                                  }
                                  onChange={handleChange}
                                  checked={
                                    values.clientEMPCurrentlyRadio === "Yes"
                                  }
                                />
                                <label
                                  htmlFor="currentlySalaryPackage1"
                                  className="label1"
                                >
                                  <span>YES</span>
                                </label>
                                <input
                                  type="radio"
                                  name="clientEMPCurrentlyRadio"
                                  onClick={() =>
                                    currentlySalaryPackageHandler("No")
                                  }
                                  id="currentlySalaryPackage2"
                                  value="No"
                                  onChange={handleChange}
                                  checked={
                                    values.clientEMPCurrentlyRadio === "No"
                                  }
                                />
                                <label
                                  htmlFor="currentlySalaryPackage2"
                                  className="label2"
                                >
                                  <span>NO</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        {values.clientEMPOwner === "Partner" && (
                          <div className="col-4">
                            <div className="mb-3">
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="partnerEMPCurrentlyRadio"
                                    id="currentlySalaryPackage12"
                                    value="Yes"
                                    onClick={() =>
                                      currentlySalaryPackageHandler2("yes")
                                    }
                                    onChange={handleChange}
                                    checked={
                                      values.partnerEMPCurrentlyRadio ===
                                      "Yes"
                                    }
                                  />
                                  <label
                                    htmlFor="currentlySalaryPackage12"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="partnerEMPCurrentlyRadio"
                                    onClick={() =>
                                      currentlySalaryPackageHandler2("No")
                                    }
                                    id="currentlySalaryPackage22"
                                    value="No"
                                    onChange={handleChange}
                                    checked={
                                      values.partnerEMPCurrentlyRadio === "No"
                                    }
                                  />
                                  <label
                                    htmlFor="currentlySalaryPackage22"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <label
                            htmlFor="clientEmployerFBTStatus"
                            className="form-label"
                          >
                            Employer FBT Status
                          </label>
                        </div>
                        <div className="col-4">
                          {currentSaleryState && (
                            <div className="mb-3">
                              <Field
                                as="select"
                                name="clientEMPFBTStatus"
                                id="clientEMPFBTStatus"
                                className="form-select shadow  inputDesign"
                              >
                                <option value="">Select</option>
                                <option value="Fll FBT">Fll FBT</option>
                                <option value="Rebatable">Rebatable</option>
                                <option value="Exempt ($17K Cap)">
                                  Exempt ($17K Cap)
                                </option>
                                <option value="Exempt ($30K Cap)">
                                  Exempt ($30K Cap)
                                </option>
                              </Field>
                              <ErrorMessage
                                name="clientEMPFBTStatus"
                                component="div"
                                className="text-danger fw-bold"
                              />
                            </div>
                          )}
                        </div>

                        <div className="col-4">
                          {currentSaleryState2 && (
                            <div className="mb-3">
                              <Field
                                as="select"
                                name="partnerEMPFBTStatus"
                                id="partnerEMPFBTStatus"
                                className="form-select shadow  inputDesign"
                              >
                                <option value="">Select</option>
                                <option value="Fll FBT">Fll FBT</option>
                                <option value="Rebatable">Rebatable</option>
                                <option value="Exempt ($17K Cap)">
                                  Exempt ($17K Cap)
                                </option>
                                <option value="Exempt ($30K Cap)">
                                  Exempt ($30K Cap)
                                </option>
                              </Field>
                              <ErrorMessage
                                name="partnerEMPFBTStatus"
                                component="div"
                                className="text-danger fw-bold"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-4">
                          <label className="form-label">
                            Do you salary Package a Car?
                          </label>
                        </div>
                        <div className="col-4">
                          <div className="mb-3">
                            <div className="form-check form-switch m-0 p-0 ">
                              <div className="radiobutton">
                                <input
                                  type="radio"
                                  name="clientEMPSalaryRadio"
                                  id="clientEMPSalaryRadio1"
                                  value="Yes"
                                  onChange={handleChange}
                                  checked={
                                    values.clientEMPSalaryRadio === "Yes"
                                  }
                                />
                                <label
                                  htmlFor="clientEMPSalaryRadio1"
                                  className="label1"
                                >
                                  <span>YES</span>
                                </label>
                                <input
                                  type="radio"
                                  name="clientEMPSalaryRadio"
                                  id="clientEMPSalaryRadio2"
                                  value="No"
                                  onChange={handleChange}
                                  checked={
                                    values.clientEMPSalaryRadio === "No"
                                  }
                                />
                                <label
                                  htmlFor="clientEMPSalaryRadio2"
                                  className="label2"
                                >
                                  <span>NO</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        {values.clientEMPOwner === "Partner" && (
                          <div className="col-4">
                            <div className="mb-3">
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="partnerEMPSalaryRadio"
                                    id="partnerEMPSalaryRadio12"
                                    value="Yes"
                                    onChange={handleChange}
                                    checked={
                                      values.partnerEMPSalaryRadio === "Yes"
                                    }
                                  />
                                  <label
                                    htmlFor="partnerEMPSalaryRadio12"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="partnerEMPSalaryRadio"
                                    id="partnerEMPSalaryRadio22"
                                    value="No"
                                    onChange={handleChange}
                                    checked={
                                      values.partnerEMPSalaryRadio === "No"
                                    }
                                  />
                                  <label
                                    htmlFor="partnerEMPSalaryRadio22"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <label
                            htmlFor="clientEMPCostCar"
                            className="form-label"
                          >
                            Cost Base of Car
                          </label>
                        </div>

                        <div className="col-4">
                          {values.clientEMPSalaryRadio === "Yes" && (
                            <div className="mb-3">
                              <Field
                                type="number"
                                className="form-control shadow inputDesign"
                                id="clientEMPCostCar"
                                name="clientEMPCostCar"
                                placeholder="Cost Base of Car"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientEMPCostCar"
                              />
                            </div>
                          )}
                        </div>

                        {
                          <div className="col-4">
                            {values.partnerEMPSalaryRadio === "Yes" && (
                              <div className="mb-3">
                                <Field
                                  type="number"
                                  className="form-control shadow inputDesign"
                                  id="partnerEMPCostCar"
                                  name="partnerEMPCostCar"
                                  placeholder="Cost Base of Car"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerEMPCostCar"
                                />
                              </div>
                            )}
                          </div>
                        }
                      </div>
                      <div className="row mb-3">
                        <div className="col-4">
                          <label className="form-label">
                            FBT Paid By Employer
                          </label>
                        </div>

                        <div className="col-4">
                          {values.clientEMPSalaryRadio === "Yes" && (
                            <div className="mb-3">
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="clientEMPFBTradio"
                                    id="FBTopt1"
                                    onChange={handleChange}
                                    value="Yes"
                                    checked={
                                      values.clientEMPFBTradio === "Yes"
                                    }
                                  />
                                  <label htmlFor="FBTopt1" className="label1">
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="clientEMPFBTradio"
                                    id="FBTopt2"
                                    onChange={handleChange}
                                    value="No"
                                    checked={
                                      values.clientEMPFBTradio === "No"
                                    }
                                  />
                                  <label htmlFor="FBTopt2" className="label2">
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="col-4">
                          {values.partnerEMPSalaryRadio === "Yes" && (
                            <div className="mb-3">
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="partnerEMPFBTradio"
                                    id="FBTopt12"
                                    onChange={handleChange}
                                    value="Yes"
                                    checked={
                                      values.partnerEMPFBTradio === "Yes"
                                    }
                                  />
                                  <label
                                    htmlFor="FBTopt12"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="partnerEMPFBTradio"
                                    id="FBTopt22"
                                    onChange={handleChange}
                                    value="No"
                                    checked={
                                      values.partnerEMPFBTradio === "No"
                                    }
                                  />
                                  <label
                                    htmlFor="FBTopt22"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <label
                            htmlFor="clientEMPCarPackaged"
                            className="form-label "
                          >
                            Running Costs of Car Packaged?
                          </label>
                        </div>

                        <div className="col-4">
                          {values.clientEMPSalaryRadio === "Yes" && (
                            <div className="mb-3">
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                name="clientEMPCarPackaged"
                                id="clientEMPCarPackaged"
                                placeholder="Running Costs of Car Packaged"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientEMPCarPackaged"
                              />
                            </div>
                          )}
                        </div>

                        <div className="col-4">
                          {values.partnerEMPSalaryRadio === "Yes" && (
                            <div className="mb-3">
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                name="partnerEMPCarPackaged"
                                id="partnerEMPCarPackaged"
                                placeholder="Running Costs of Car Packaged"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="partnerEMPCarPackaged"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-4">
                          <label className="form-label">
                            Do you salary Package a Credit Card,/Mortgage?
                          </label>
                        </div>
                        <div className="col-4">
                          <div className="mb-3">
                            <div className="form-check form-switch m-0 p-0 ">
                              <div className="radiobutton">
                                <input
                                  type="radio"
                                  name="clientEMPSalaryPackageRadio"
                                  id="clientEMPSalaryPackageRadio1"
                                  value="Yes"
                                  onChange={handleChange}
                                  checked={
                                    values.clientEMPSalaryPackageRadio ===
                                    "Yes"
                                  }
                                />
                                <label
                                  htmlFor="clientEMPSalaryPackageRadio1"
                                  className="label1"
                                >
                                  <span>YES</span>
                                </label>
                                <input
                                  type="radio"
                                  name="clientEMPSalaryPackageRadio"
                                  id="clientEMPSalaryPackageRadio2"
                                  value="No"
                                  onChange={handleChange}
                                  checked={
                                    values.clientEMPSalaryPackageRadio ===
                                    "No"
                                  }
                                />
                                <label
                                  htmlFor="clientEMPSalaryPackageRadio2"
                                  className="label2"
                                >
                                  <span>NO</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        {values.clientEMPOwner === "Partner" && (
                          <div className="col-4">
                            <div className="mb-3">
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="partnerEMPSalaryPackageRadio"
                                    id="partnerEMPSalaryPackageRadio12"
                                    value="Yes"
                                    // onClick={() =>
                                    //   currentlySalaryPackageHandler2("yes")
                                    // }
                                    onChange={handleChange}
                                    checked={
                                      values.partnerEMPSalaryPackageRadio ===
                                      "Yes"
                                    }
                                  />
                                  <label
                                    htmlFor="partnerEMPSalaryPackageRadio12"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="partnerEMPSalaryPackageRadio"
                                    // onClick={() =>
                                    //   currentlySalaryPackageHandler2("No")
                                    // }
                                    id="partnerEMPSalaryPackageRadio22"
                                    value="No"
                                    onChange={handleChange}
                                    checked={
                                      values.partnerEMPSalaryPackageRadio ===
                                      "No"
                                    }
                                  />
                                  <label
                                    htmlFor="partnerEMPSalaryPackageRadio22"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <label
                            htmlFor="clientEMPAbilitytoSacrifice"
                            className="form-label"
                          >
                            How Much
                          </label>
                        </div>

                        <div className="col-4">
                          {values.clientEMPSalaryPackageRadio === "Yes" && (
                            <div className="mb-3">
                              <Field
                                type="number"
                                className="form-control
                 inputDesign shadow"
                                id="clientEMPAbilitytoSacrifice"
                                name="clientEMPAbilitytoSacrifice"
                                placeholder="How much you have the ability to salary sacrifice?"
                              />
                              <ErrorMessage
                                name="clientEMPAbilitytoSacrifice"
                                component="div"
                                className="text-danger fw-bold"
                              />
                            </div>
                          )}
                        </div>

                        <div className="col-4">
                          {values.partnerEMPSalaryPackageRadio === "Yes" && (
                            <div className="mb-3">
                              <Field
                                type="number"
                                className="form-control
                 inputDesign shadow"
                                id="partnerEMPAbilitytoSacrifice"
                                name="partnerEMPAbilitytoSacrifice"
                                placeholder="How much you have the ability to salary sacrifice?"
                              />
                              <ErrorMessage
                                name="partnerEMPAbilitytoSacrifice"
                                component="div"
                                className="text-danger fw-bold"
                              />
                            </div>
                          )}
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
                    </Card>
                  ) : (
                    <div className="row">
                      <div className="col-12">
                        <Card className="shadow  px-4 py-4 borderOverAll">
                          <h3 className="heading text-center" onClick={() => { localStorage.setItem("role", "dev") }}>
                            Employement Income
                            <div className="iconContainerLg">
                              <img
                                className="img-fluid"
                                src={noteBook}
                                alt=""
                              />
                            </div>
                          </h3>
                          <div className="row">
                            {/*  table  */}

                            <div
                              className="table-responsive my-3"
                              id="childTable"
                            >
                              <table className="table table-bordered table-hover text-center">
                                <thead className="text-light" id="tableHead">
                                  <tr>
                                    <th>Name</th>
                                    <th>Occupation </th>
                                    <th>Employment Status</th>
                                    <th>Company Name</th>
                                    <th>Salary</th>
                                    <th>Salary Sacrifice</th>
                                    <th>Salary Packaging</th>
                                    <th>Opt</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {((clientData.clientEMPOccupation !== "") && (clientData.clientEMPOccupation !== undefined)) && (
                                    <tr>
                                      <td>{ClientNameGet}</td>
                                      <td>
                                        {clientData.clientEMPOccupation}
                                      </td>
                                      <td>
                                        {clientData.clientEMPEmployment}
                                      </td>
                                      <td>{clientData.clientEMPName}</td>
                                      <td>{clientData.clientEMPExcluding}</td>
                                      <td>
                                        {clientData.clientEMPSacrificeradio}
                                      </td>
                                      <td>
                                        {clientData.clientEMPCurrentlyRadio}
                                      </td>
                                      <td>
                                        <CustomDropDown
                                          Operations={CLOperation}
                                          Delete={"client"}
                                          Data={clientData}
                                          FormikFun={setValues}
                                        />
                                      </td>
                                    </tr>
                                  )}
                                  {((partnerData.partnerEMPOccupation !== "") && (partnerData.partnerEMPOccupation !== undefined)) && (
                                    <tr>
                                      <td>{PartnerNameGet}</td>
                                      <td>
                                        {partnerData.partnerEMPOccupation}
                                      </td>
                                      <td>
                                        {partnerData.partnerEMPEmployment}
                                      </td>
                                      <td>{partnerData.partnerEMPName}</td>
                                      <td>
                                        {partnerData.partnerEMPExcluding}
                                      </td>
                                      <td>
                                        {partnerData.partnerEMPSacrificeradio}
                                      </td>
                                      <td>
                                        {partnerData.partnerEMPCurrentlyRadio}
                                      </td>
                                      <td>
                                        <CustomDropDown
                                          Operations={CLOperation}
                                          Delete={"partner"}
                                          Data={{
                                            ...partnerData,
                                            ...clientData,
                                          }}
                                          FormikFun={setValues}
                                        />
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>

                            {/*  table  */}
                            <div className="row mt-5">
                              <div className="col-md-12">
                                <button
                                  type="button" onClick={() => { setShowTable(true) }}
                                  className="float-end btn w-25  bgColor modalBtn"
                                // onClick={nextbuttonHandler}
                                >
                                  Add New
                                </button>
                              </div>
                            </div>
                          </div>

                        </Card>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EmploymentDetail;
