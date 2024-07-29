import React, { useState, useEffect } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import { differenceInYears } from "date-fns";


// import * as Yup from "yup"; //? don't Remove it you might need it later
import "yup-phone";
import smoking from "./images/smoking.svg";
import notsmoking from "./images/no-smoking.svg";

import single from "../Svgs/single-2.svg";
import couple from "../Svgs/couple-2.svg";
import male from "./images/male.svg";
import female from "./images/female.svg";
import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { QuestionShift, UserName, ClientName, PartnerName, defaultUrl } from "../../Store/Store";

import { Card } from "react-bootstrap";

import PersonalDetailCards from "./PersonalDetailCards";



const PersonalDetail = () => {
  let Navigate = useNavigate();

  let DefaultUrl = useRecoilValue(defaultUrl)


  let [userName, setUserName] = useRecoilState(UserName);  // eslint-disable-line no-unused-vars

  let [ClientNameGet, setClientNameGet] = useRecoilState(ClientName); // eslint-disable-line no-unused-vars
  let [PartnerNameGet, setPartnerNameGet] = useRecoilState(PartnerName);  // eslint-disable-line no-unused-vars

  let [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);  // eslint-disable-line no-unused-vars

  let [ClientData, setClientData] = useState([]);

  const [isPartnered, setIsPartnered] = useState(false);
  const [buttonFlag, setButtonFlag] = useState("Submit");

  // let letters = /^[a-zA-Z ]*$/;          //? don't Remove it you might need it later
  // let phonePattern = /^[1-9][0-9]{9}$/;  //? don't Remove it you might need it later
  // let postCodePattern = /^\d{4}$/;      //? don't Remove it you might need it later


  const [PartnerData, setPartnerData] = useState([]);
  const [initialState, setInitialState] = useState({});
  const [FoundData, setFoundData] = useState(false);

  const [ClientAndPartnerTable, setClientAndPartnerTable] = useState(true);


  let location = useLocation();
  let hashing = location.hash;

  useEffect(() => {


    // let email = localStorage.getItem("Email");
    let email = hashing.replace("#", "");
    // alert(email);
    if (email) {
      setButtonFlag("Update")
      GetApiFunction(email);
    }
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const GetApiFunction = async (email) => {
    try {
      const clientResponse = await axios.get(`${DefaultUrl}/api/Client/`);
      const clientObj = clientResponse.data;
      const clientFilterObj = clientObj.filter((item) => item.Email === email);

      // console.log("client Data:",clientFilterObj);

      if (clientFilterObj) {
        let date = new Date(clientFilterObj[0].clientDOB);
        clientFilterObj[0].clientDOB = date;

        let status = clientFilterObj[0].clientMaritalStatus;


        localStorage.setItem('UserID', clientFilterObj[0]._id)
        localStorage.setItem('UserName', clientFilterObj[0].clientPreferredName)


        setFoundData(true);
        if (status === "Single" || status === "Widowed") {
          localStorage.setItem('UserStatus', "Single")
          setIsPartnered(false);
          setInitialState({ ...clientFilterObj[0] });
        } else {
          setIsPartnered(true);
          localStorage.setItem('UserStatus', "Married")
          // console.log("Partner True Ho Gaya ");

          // Partner Data Get
          // Process and update client data here

          const partnerResponse = await axios.get(`${DefaultUrl}/api/Partner`);
          const partnerObj = partnerResponse.data;
          const partnerFilterObj = partnerObj.filter((item) => item.Email === email);

          // Process and update partner data here
          if (partnerFilterObj.length) {
            console.log(partnerFilterObj);

            date = new Date(partnerFilterObj[0].partnerDOB);
            partnerFilterObj[0].partnerDOB = date;

            setPartnerData(partnerFilterObj[0]);

            localStorage.setItem('PartnerName', partnerFilterObj[0].partnerPreferredName)

            // console.log("Partner Data:", partnerFilterObj[0]);
            setInitialState({ ...clientFilterObj[0], ...partnerFilterObj[0] });
          }
          else {
            setIsPartnered(false);
            setInitialState({ ...clientFilterObj[0] });
          }
        }

        // setClientAndPartnerTable(false);
        setClientData(clientFilterObj[0]);

      }


      // Update initialState with both client and partner data

    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error here
    }
  };

  let nextbuttonHandler = () => {
    setQuestionChange("FinancialInvestments");
    // Navigate("/Business-Tax-Structure");
    Navigate("/FinancialInvestments");
    // Navigate("/Questions");
  };

  let partnerHandler = (value) => {
    //  alert(value)

    let selectedValue = value;

    switch (selectedValue) {
      case "Married":
        setIsPartnered(true);
        console.log("Married");
        window.localStorage.setItem("partner", true);
        break;
      case "Partnered":
        setIsPartnered(true);
        window.localStorage.setItem("partner", true);
        console.log("Partnered");
        break;
      case "Single":
        setIsPartnered(false);
        window.localStorage.setItem("partner", false);
        console.log("Single");
        break;
      case "DeFacto":
        setIsPartnered(true);
        window.localStorage.setItem("partner", true);
        console.log("DeFacto");
        break;
      case "Widowed":
        setIsPartnered(false);
        window.localStorage.setItem("partner", false);
        console.log("Widowed");
        break;
      case "":
        setIsPartnered(false);
        console.log("empty");
        break;
      default:
        console.log(`Sorry, we are out of ${selectedValue}.`);
    }
  };


  const initialValues = {
    clientTitle: "",
    clientSurname: "",
    clientGivenName: "",
    clientMiddleName: "",
    clientPreferredName: "",
    clientAge: "",
    clientDOB: "",
    clientMaritalStatus: "",
    clientEmploymentStatus: "",
    clientOccupationID: "",
    clientHealth: "",
    clientPlannedRetirementAge: "",
    clientTaxResidentRadio: "No",
    clientPrivateHealthCoverRadio: "No",
    clientHELPSDebtRadio: "No",

    clientHomeAddress: "",
    clientPostcode: "",
    clientSameAsAbove: true,
    clientPostalAddress: "",
    clientPostalPostCode: "",
    clientMobile: "",
    clientHomePhone: "",
    clientWorkPhone: "",
    Email: "",
    clientGender: false,
    clientSmoker: false,

    // partner
    partnerTitle: "",
    partnerSurname: "",
    partnerGivenName: "",
    partnerMiddleName: "",
    partnerPreferredName: "",
    partnerDOB: "",
    partnerAge: "",
    partnerMaritalStatus: "",
    partnerEmploymentStatus: "",
    partnerOccupationID: "",
    partnerHealth: "",
    partnerPlannedRetirementAge: "",
    partnerHomeAddress: "",
    partnerPostcode: "",
    partnerSameAsClient: true,
    partnerPostalAddress: "",
    partnerPostalPostCode: "",
    partnerMobile: "",
    partnerHomePhone: "",
    partnerWorkPhone: "",
    partnerEmail: "",
    partnerTaxResidentRadio: "No",
    partnerPrivateHealthCoverRadio: "No",
    partnerHELPSDebtRadio: "No",
    partnerGender: false,
    partnerSmoker: false,

    ChildrenDependantsRadio: "No",
  };


  const onSubmit = (values, action) => {

    localStorage.setItem("Email", values.Email);
    setClientAndPartnerTable(!ClientAndPartnerTable);
    setButtonFlag("Update")

    console.log(JSON.stringify(values));



    let ClientDetails = {
      clientTitle: values.clientTitle,
      clientSurname: values.clientSurname,
      clientGivenName: values.clientGivenName,
      clientMiddleName: values.clientMiddleName,
      clientPreferredName: values.clientPreferredName,
      clientGender: values.clientGender,
      clientDOB: values.clientDOB,
      clientAge: values.clientAge,
      clientMaritalStatus: values.clientMaritalStatus,
      clientEmploymentStatus: values.clientEmploymentStatus,
      clientOccupationID: values.clientOccupationID,
      clientHealth: values.clientHealth,
      clientSmoker: values.clientSmoker,
      clientPlannedRetirementAge: parseFloat(values.clientPlannedRetirementAge),

      clientTaxResidentRadio: values.clientTaxResidentRadio,
      clientPrivateHealthCoverRadio: values.clientPrivateHealthCoverRadio,
      clientHELPSDebtRadio: values.clientHELPSDebtRadio,

      clientSameAsAbove: values.clientSameAsAbove,

      clientHomeAddress: values.clientHomeAddress,

      clientPostcode: values.clientPostcode,
      clientPostalAddress: values.clientPostalAddress,

      clientPostalPostCode: values.clientPostalPostCode,
      clientMobile: values.clientMobile,
      clientHomePhone: values.clientHomePhone,
      clientWorkPhone: values.clientWorkPhone,

      Email: values.Email,
    };
    setClientData(ClientDetails);
    let PartnerDetails = {
      Email: values.Email,
      partnerTitle: values.partnerTitle,
      partnerSurname: values.partnerSurname,
      partnerGivenName: values.partnerGivenName,
      partnerMiddleName: values.partnerMiddleName,
      partnerPreferredName: values.partnerPreferredName,
      partnerGender: values.partnerGender, //TODO: You must find what is going on in it
      partnerDOB: values.partnerDOB,
      partnerAge: values.partnerAge,
      partnerMaritalStatus: values.partnerMaritalStatus,
      partnerEmploymentStatus: values.partnerEmploymentStatus,
      partnerOccupationID: values.partnerOccupationID,
      partnerHealth: values.partnerHealth,
      partnerSmoker: values.partnerSmoker, //TODO: You must find what is going on in it
      partnerPlannedRetirementAge: parseFloat(
        values.partnerPlannedRetirementAge
      ),

      partnerTaxResidentRadio: values.partnerTaxResidentRadio,
      partnerPrivateHealthCoverRadio: values.partnerPrivateHealthCoverRadio,
      partnerHELPSDebtRadio: values.partnerHELPSDebtRadio,

      partnerHomeAddress: values.partnerHomeAddress,
      partnerPostcode: values.partnerPostcode,
      partnerSameAsClient: values.partnerSameAsClient,

      partnerPostalAddress: values.partnerPostalAddress,
      partnerPostalPostCode: values.partnerPostalPostCode,
      partnerMobile: values.partnerMobile,
      partnerHomePhone: values.partnerHomePhone,
      partnerWorkPhone: values.partnerWorkPhone,
      partnerEmail: values.partnerEmail,
    };

    console.log("partner Ka Kea Mila Humko ", values.clientMaritalStatus !== "Single" && values.clientMaritalStatus !== "Widowed");
    if (FoundData) {

      axios
        .patch(
          `${DefaultUrl}/api/Client/Update-Client/${ClientDetails.Email}`,
          ClientDetails
        )
        .then((res) => {
          console.log("Client Successfully Update!");
        });


      if (values.clientMaritalStatus !== "Single" && values.clientMaritalStatus !== "Widowed") {
        axios
          .patch(
            `${DefaultUrl}/api/Partner/Update-Partner/${ClientDetails.Email}`,
            PartnerDetails
          )
          .then((res) => console.log("Partner Successfully Update!"));
        setPartnerData(PartnerDetails);
      }

    } else {
      axios
        .post(`${DefaultUrl}/api/Client/Add-Client`, ClientDetails)
        .then((res) => {
          res.data
          localStorage.setItem('UserID', res.data._id)
          console.log("Client Successfully Added!", res.data);
        });

      if (values.clientMaritalStatus !== "Single" && values.clientMaritalStatus !== "Widowed") {
        axios
          .post(`${DefaultUrl}/api/Partner/Add-Partner`, PartnerDetails)
          .then((res) => console.log("Partner Successfully Added!"));
        setPartnerData(PartnerDetails);
      }
    }
  };

  let MainTableSubmit = (Option, elem) => {
    console.log(Option);
    console.log(elem);
    if (Option === 1) {
      setClientAndPartnerTable(!ClientAndPartnerTable);
    } else if (Option === 2) {
      alert("DeleteFunctionality");
    }
  };


  return (
    <>
      {/* --------------------------Start client Form-------------------- */}
      <Formik
        initialValues={FoundData ? initialState : initialValues}
        // validationSchema={
        //   isPartnered ? validationSchema : SinglevalidationSchema
        // }
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue, handleChange, errors, handleBlur }) => (
          <Form>
            {ClientAndPartnerTable ? (
              <div className="container-fluid mt-4">
                <div className="row m-0 p-0 ">
                  <div className="col-2 m-0 p-0 "></div>

                  <div className="col-12 ">
                    {/* Client Personal Information */}

                    <div className="row ">
                      <h3 className=" heading" onClick={() => { console.log(isPartnered) }}>Personal Information</h3>

                      <div className="col-4 "></div>
                      <div className="LargeSheet col-4">
                        <label
                          htmlFor="clientTitle"
                          className="form-label clientFS green mb-3 p-0"
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
                      {values.clientMaritalStatus !== "Single" &&
                        values.clientMaritalStatus !== "Widowed" ? (
                        <div className="col-4 LargeSheet">
                          <label
                            htmlFor="clientTitle"
                            className="form-label  clientFS green mb-3 p-0 "
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
                      ) : (
                        <div className="col-4"></div>
                      )}

                      {/*Labels Title */}
                      <div className="col-4">
                        <label
                          htmlFor="clientTitle"
                          className="form-label d-block"
                        >
                          Title
                        </label>
                      </div>

                      {/*Client Title*/}
                      <div className="col-4 ">
                        <Field
                          id="clientTitle"
                          className="form-select shadow  inputDesign"
                          as="select"
                          onChange={(e) =>
                            setFieldValue("clientTitle", e.target.value)
                          }
                          value={values.clientTitle}
                        >
                          <option value="">Select</option>
                          <option value="Dr">Dr</option>
                          <option value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Miss">Miss</option>
                          <option value="MS">MS</option>
                          <option value="Prof">Prof</option>
                          <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientTitle"
                        />
                      </div>

                      {/*Partner Title*/}
                      {values.clientMaritalStatus !== "Single" &&
                        values.clientMaritalStatus !== "Widowed" ? (
                        <div className="col-4">
                          <Field
                            as="select"
                            id="partnerTitle"
                            className="form-select shadow  inputDesign"
                            name="partnerTitle"
                            onChange={(e) =>
                              setFieldValue("partnerTitle", e.target.value)
                            }
                            value={values.partnerTitle}
                          >
                            <option value="">Select</option>
                            <option value="Dr">Dr</option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Miss">Miss</option>
                            <option value="MS">MS</option>
                            <option value="Prof">Prof</option>
                            <option value="Other">Other</option>
                          </Field>
                          <ErrorMessage
                            className="text-danger fw-bold"
                            component="div"
                            name="partnerTitle"
                          />
                        </div>
                      ) : (
                        <div className="col-4"></div>
                      )}

                      {/* Lable Surname */}
                      <div className="col-4 mt-3">
                        <label htmlFor="clientSurname" className="form-label">
                          {" "}
                          Surname{" "}
                        </label>
                      </div>

                      {/*Client */}
                      <div className="col-4 mt-3">
                        <Field
                          type="text"
                          className="form-control inputDesign shadow"
                          id="clientSurname"
                          placeholder="Surname"
                          name="clientSurname"
                          onBlur={() => {
                            let ClientName =
                              values.clientPreferredName +
                              " " +
                              values.clientSurname;
                            let PartnerName =
                              values.partnerPreferredName +
                              " " +
                              values.partnerSurname;

                            if (
                              values.clientMaritalStatus === "Married" ||
                              values.clientMaritalStatus === "Partnered" ||
                              values.clientMaritalStatus === "DeFacto"
                            ) {
                              setUserName(
                                "Welcome " + ClientName + " & " + PartnerName
                              );
                            } else {
                              setUserName("Welcome " + ClientName);
                            }
                          }}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientSurname"
                        />
                      </div>

                      {/*Partner */}
                      {values.clientMaritalStatus !== "Single" &&
                        values.clientMaritalStatus !== "Widowed" ? (
                        <div className="col-4 mt-3">
                          <Field
                            type="text"
                            className="form-control inputDesign shadow"
                            id="partnerSurname"
                            placeholder="Surname"
                            name="partnerSurname"
                            onBlur={() => {
                              let ClientName =
                                values.clientPreferredName +
                                " " +
                                values.clientSurname;
                              let PartnerName =
                                values.partnerPreferredName +
                                " " +
                                values.partnerSurname;

                              if (
                                values.clientMaritalStatus === "Married" ||
                                values.clientMaritalStatus === "Partnered" ||
                                values.clientMaritalStatus === "DeFacto"
                              ) {
                                setUserName(
                                  "Welcome " +
                                  ClientName +
                                  " & " +
                                  PartnerName
                                );
                              } else {
                                setUserName("Welcome " + ClientName);
                              }
                            }}
                          />
                          <ErrorMessage
                            className="text-danger fw-bold"
                            component="div"
                            name="partnerSurname"
                          />
                        </div>
                      ) : (
                        <div className="col-4"></div>
                      )}

                      {/* Given Name */}
                      <div className="col-4 mt-3">
                        <label
                          htmlFor="clientGivenName"
                          className="form-label"
                        >
                          {" "}
                          Given Name{" "}
                        </label>
                      </div>

                      {/*Client */}
                      <div className="col-4 mt-3">
                        <Field
                          type="text"
                          className="form-control inputDesign shadow inputDesign"
                          id="clientGivenName"
                          placeholder="Given Name"
                          name="clientGivenName"
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientGivenName"
                        />
                      </div>

                      {/*Partner */}
                      {values.clientMaritalStatus !== "Single" &&
                        values.clientMaritalStatus !== "Widowed" ? (
                        <div className="col-4 mt-3">
                          <Field
                            type="text"
                            className="form-control inputDesign shadow inputDesign"
                            placeholder="Given Name"
                            id="clientGivenName"
                            name="partnerGivenName"
                          />
                          <ErrorMessage
                            className="text-danger fw-bold"
                            component="div"
                            name="partnerGivenName"
                          />
                        </div>
                      ) : (
                        <div className="col-4"></div>
                      )}

                      {/* Middle Name */}
                      <div className="col-4 mt-3">
                        <label
                          htmlFor="clientMiddleName"
                          className="form-label"
                        >
                          {" "}
                          Middle Name{" "}
                        </label>
                      </div>

                      {/*Client */}
                      <div className="col-4 mt-3">
                        <Field
                          type="text"
                          className="form-control inputDesign shadow inputDesign"
                          id="clientMiddleName"
                          placeholder="Middle Name"
                          name="clientMiddleName"
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientMiddleName"
                        />
                      </div>

                      {/*Partner */}
                      {values.clientMaritalStatus !== "Single" &&
                        values.clientMaritalStatus !== "Widowed" ? (
                        <div className="col-4 mt-3">
                          <Field
                            type="text"
                            className="form-control inputDesign shadow inputDesign"
                            placeholder="Middle Name"
                            id="partnerMiddleName"
                            name="partnerMiddleName"
                          />
                          <ErrorMessage
                            className="text-danger fw-bold"
                            component="div"
                            name="partnerMiddleName"
                          />
                        </div>
                      ) : (
                        <div className="col-4"></div>
                      )}

                      {/* Preferred Name */}
                      <div className="col-4 mt-3">
                        <label
                          htmlFor="clientPreferredName"
                          className="form-label"
                        >
                          {" "}
                          Preferred Name{" "}
                        </label>
                      </div>

                      {/*Client */}
                      <div className="col-4 mt-3">
                        <Field
                          type="text"
                          className="form-control inputDesign shadow"
                          id="clientPreferredName"
                          placeholder="Preferred Name"
                          name="clientPreferredName"
                          onBlur={() => {
                            let ClientName =
                              values.clientPreferredName +
                              " " +
                              values.clientSurname;
                            let PartnerName =
                              values.partnerPreferredName +
                              " " +
                              values.partnerSurname;

                            if (
                              values.clientMaritalStatus === "Married" ||
                              values.clientMaritalStatus === "Partnered" ||
                              values.clientMaritalStatus === "DeFacto"
                            ) {
                              setUserName(
                                "Welcome " + ClientName + " & " + PartnerName
                              );
                            } else {
                              setUserName("Welcome " + ClientName);
                            }
                            setClientNameGet(values.clientPreferredName);
                          }}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientPreferredName"
                        />
                      </div>

                      {/*Partner */}
                      {values.clientMaritalStatus !== "Single" &&
                        values.clientMaritalStatus !== "Widowed" ? (
                        <div className="col-4 mt-3">
                          <Field
                            type="text"
                            className="form-control inputDesign shadow"
                            id="partnerPreferredName"
                            placeholder="Preferred Name"
                            name="partnerPreferredName"
                            onBlur={() => {
                              let ClientName =
                                values.clientPreferredName +
                                " " +
                                values.clientSurname;
                              let PartnerName =
                                values.partnerPreferredName +
                                " " +
                                values.partnerSurname;

                              if (
                                values.clientMaritalStatus === "Married" ||
                                values.clientMaritalStatus === "Partnered" ||
                                values.clientMaritalStatus === "DeFacto"
                              ) {
                                setUserName(
                                  "Welcome " +
                                  ClientName +
                                  " & " +
                                  PartnerName
                                );
                              } else {
                                setUserName("Welcome " + ClientName);
                              }

                              setPartnerNameGet(values.partnerPreferredName);
                            }}
                          />
                          <ErrorMessage
                            className="text-danger fw-bold"
                            component="div"
                            name="partnerPreferredName"
                          />
                        </div>
                      ) : (
                        <div className="col-4"></div>
                      )}

                      {/*label Gender */}
                      <div className="col-4 mt-3">
                        <label htmlFor="" className="form-label">
                          {" "}
                          Gender{" "}
                        </label>
                      </div>

                      {/*Client */}
                      <div className="col-4 mt-3">
                        <div className=" d-flex justify-content-start align-items-center w-100">

                          <Field type="checkbox" name="clientGender" className="d-none" />

                          <div
                            id="female1"
                            className="femaleSmoking "
                            onClick={() => { setFieldValue('clientGender', true) }}
                          >
                            <img
                              className="img-fluid imgPerson w-100"
                              htmlFor="female"
                              src={female}
                              alt=""
                            />
                          </div>

                          <div
                            id="male1"
                            className=" mx-2 maleNonSmoking"
                            onClick={() => setFieldValue('clientGender', false)}
                          >
                            <img
                              className=" img-fluid imgPerson w-100"
                              htmlFor="male"
                              src={male}
                              alt=""
                            />
                          </div>

                        </div>
                      </div>

                      {/*Partner */}
                      {values.clientMaritalStatus !== "Single" &&
                        values.clientMaritalStatus !== "Widowed" ? (
                        <div className="col-4 mt-3">
                          <div className="d-flex justify-content-start align-items-center w-100">

                            <Field type="checkbox" name="partnerGender" className="d-none checkBox" />

                            <div
                              id="female1"
                              className="femaleSmoking "
                              onClick={() => { setFieldValue('partnerGender', true) }}
                            >
                              <img
                                className="img-fluid imgPerson w-100"
                                htmlFor="female"
                                src={female}
                                alt=""
                              />
                            </div>

                            <div
                              id="male1"
                              className=" mx-2 maleNonSmoking "
                              onClick={() => setFieldValue('partnerGender', false)}
                            >
                              <img
                                className=" img-fluid imgPerson w-100"
                                htmlFor="male"
                                src={male}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="col-4"></div>
                      )}

                      {/*label Date of Birth  */}
                      <div className="col-4 mt-3">
                        <label htmlFor="clientDOB" className="form-label">
                          {" "}
                          Date of Birth{" "}
                        </label>
                      </div>

                      {/*Client */}
                      <div className="col-4 mt-3">
                        <div>
                          <DatePicker
                            id="clientDOB"
                            className="form-control inputDesign shadow"
                            selected={values.clientDOB}
                            onChange={(date) => {
                              setFieldValue("clientDOB", date);
                              const age =
                                differenceInYears(new Date(), date) || 0;
                              setFieldValue("clientAge", age);
                            }}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="dd/mm/yyyy"
                            showYearDropdown
                            scrollableYearDropdown
                            onBlur={handleBlur}
                            name="clientDOB"
                            maxDate={new Date()}
                            showMonthDropdown
                            dropdownMode="select"
                            wrapperClassName="w-100"
                          />
                        </div>
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientDOB"
                        />
                      </div>

                      {/*Partner */}
                      {values.clientMaritalStatus !== "Single" &&
                        values.clientMaritalStatus !== "Widowed" ? (
                        <div className="col-4 mt-3">
                          <div>
                            <DatePicker
                              className="form-control inputDesign shadow"
                              selected={values.partnerDOB}
                              onChange={(date) => {
                                setFieldValue("partnerDOB", date);
                                const age =
                                  differenceInYears(new Date(), date) || 0;
                                setFieldValue("partnerAge", age);
                                console.log(values.partnerDOB);
                              }}
                              dateFormat="dd/MM/yyyy"
                              placeholderText="dd/mm/yyyy"
                              showYearDropdown
                              scrollableYearDropdown
                              onBlur={handleBlur}
                              name="partnerDOB"
                              id="partnerDOB"
                              maxDate={new Date()}
                              showMonthDropdown
                              dropdownMode="select"
                              wrapperClassName="w-100"
                            />
                          </div>
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="partnerDOB"
                          />
                        </div>
                      ) : (
                        <div className="col-4"></div>
                      )}

                      {/*label Age */}
                      <div className="col-4 mt-3">
                        <label htmlFor="clientAge" className="form-label">
                          {" "}
                          Age{" "}
                        </label>
                      </div>

                      {/*Client */}
                      <div className="col-4 mt-3">
                        <Field
                          type="text"
                          className="form-control inputDesign shadow"
                          id="clientAge"
                          name="clientAge"
                          placeholder="Age"
                          readOnly
                          disabled
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientAge"
                        />
                      </div>

                      {/*Partner */}
                      {values.clientMaritalStatus !== "Single" &&
                        values.clientMaritalStatus !== "Widowed" ? (
                        <div className="col-4 mt-3">
                          <Field
                            type="text"
                            className="form-control inputDesign shadow"
                            id="partnerAge"
                            name="partnerAge"
                            placeholder="Age"
                            readOnly
                            disabled
                          />{" "}
                          <ErrorMessage
                            className="text-danger fw-bold"
                            component="div"
                            name="partnerAge"
                          />
                        </div>
                      ) : (
                        <div className="col-4"></div>
                      )}

                      {/* label Marital Status */}
                      <div className="col-4 mt-3">
                        <label
                          htmlFor="clientMaritalStatus"
                          className="form-label"
                        >
                          Marital Status
                        </label>
                      </div>

                      {/*Client */}
                      <div className="col-4 mt-3">
                        <Field
                          as="select"
                          id="clientMaritalStatus"
                          className="form-select shadow  inputDesign"
                          onChange={(e) => {
                            setFieldValue(
                              "clientMaritalStatus",
                              e.target.value
                            );
                            partnerHandler(values.clientMaritalStatus);
                          }}
                          value={values.clientMaritalStatus}
                        >
                          <option value="">Select</option>
                          <option value="Married">Married</option>
                          <option value="Partnered">Partnered</option>
                          <option value="Single">Single</option>
                          <option value="DeFacto">De-facto</option>
                          <option value="Widowed">Widowed</option>
                        </Field>
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientMaritalStatus"
                        />
                      </div>

                      {/*Partner */}
                      {values.clientMaritalStatus !== "Single" &&
                        values.clientMaritalStatus !== "Widowed" ? (
                        <div className="col-4 mt-3">
                          <Field
                            as="select"
                            id="partnerMaritalStatus"
                            className="form-select shadow  inputDesign"
                            name="partnerMaritalStatus"
                          >
                            <option value="">Select</option>
                            <option value="Married">Married</option>
                            <option value="Partnered">Partnered</option>
                            <option value="De-facto">De-facto</option>
                          </Field>
                          <ErrorMessage
                            className="text-danger fw-bold"
                            component="div"
                            name="partnerMaritalStatus"
                          />
                        </div>
                      ) : (
                        <div className="col-4"></div>
                      )}

                      {/* Employment Status */}
                      <div className="col-4 mt-3">
                        <label
                          htmlFor="clientEmploymentStatus"
                          className="form-label"
                        >
                          {" "}
                          Employment Status{" "}
                        </label>
                      </div>

                      {/*Client */}
                      <div className="col-4 mt-3">
                        <Field
                          as="select"
                          id="clientEmploymentStatus"
                          className="form-select shadow  inputDesign"
                          value={values.clientEmploymentStatus}
                          onChange={(e) =>
                            setFieldValue(
                              "clientEmploymentStatus",
                              e.target.value
                            )
                          }
                        >
                          <option value="">Select</option>
                          <option value="Employee">Employee</option>
                          <option value="Homemaker">Homemaker</option>
                          <option value="Not Working">Not Working</option>

                          <option value="Self-funded Retiree">
                            {" "}
                            Self-funded Retiree{" "}
                          </option>
                          <option value="Centrelink Retiree">
                            {" "}
                            Centrelink Retiree{" "}
                          </option>
                          <option value="Centrelink Recipient">
                            {" "}
                            Centrelink Recipient{" "}
                          </option>

                          <option value="Self-employed">
                            {" "}
                            Self-employed{" "}
                          </option>
                          <option value="Student">Student</option>
                          <option value="Unemployed">Unemployed</option>
                        </Field>
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientEmploymentStatus"
                        />
                      </div>

                      {/*Partner */}
                      {values.clientMaritalStatus !== "Single" &&
                        values.clientMaritalStatus !== "Widowed" ? (
                        <div className="col-4 mt-3">
                          <Field
                            as="select"
                            id="partnerEmploymentStatus"
                            className="form-select shadow  inputDesign"
                            name="partnerEmploymentStatus"
                          >
                            <option value="">Select</option>
                            <option value="Employee">Employee</option>
                            <option value="Homemaker">Homemaker</option>
                            <option value="Not Working">Not Working</option>

                            <option value="Self-funded Retiree">
                              {" "}
                              Self-funded Retiree{" "}
                            </option>
                            <option value="Centrelink Retiree">
                              {" "}
                              Centrelink Retiree{" "}
                            </option>
                            <option value="Centrelink Recipient">
                              {" "}
                              Centrelink Recipient{" "}
                            </option>

                            <option value="Self-employed">
                              {" "}
                              Self-employed{" "}
                            </option>
                            <option value="Student">Student</option>
                            <option value="Unemployed">Unemployed</option>
                          </Field>
                          <ErrorMessage
                            className="text-danger fw-bold"
                            component="div"
                            name="partnerEmploymentStatus"
                          />
                        </div>
                      ) : (
                        <div className="col-4"></div>
                      )}

                      {/*Lable Occupation*/}
                      <div className="col-4 mt-3">
                        <label
                          htmlFor="clientOccupationID"
                          className="form-label"
                        >
                          Occupation{" "}
                        </label>
                      </div>

                      {/*Client */}
                      <div className="col-4 mt-3">
                        <Field
                          type="text"
                          className="form-control inputDesign shadow"
                          id="clientOccupationID"
                          placeholder="Occupation"
                          name="clientOccupationID"
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientOccupationID"
                        />
                      </div>

                      {/*Partner */}
                      {values.clientMaritalStatus !== "Single" &&
                        values.clientMaritalStatus !== "Widowed" ? (
                        <div className="col-4 mt-3">
                          <Field
                            type="text"
                            className="form-control inputDesign shadow"
                            id="partnerOccupationID"
                            placeholder="Occupation"
                            name="partnerOccupationID"
                          />
                          <ErrorMessage
                            className="text-danger fw-bold"
                            component="div"
                            name="partnerOccupationID"
                          />
                        </div>
                      ) : (
                        <div className="col-4"></div>
                      )}

                      {/* Lable Health */}
                      <div className="col-4 mt-3">
                        <label htmlFor="clientHealth" className="form-label">
                          {" "}
                          Health{" "}
                        </label>
                      </div>

                      {/*Client */}
                      <div className="col-4 mt-3">
                        <Field
                          as="select"
                          id="clientHealth"
                          className="form-select shadow  inputDesign"
                          onChange={(e) =>
                            setFieldValue("clientHealth", e.target.value)
                          }
                          value={values.clientHealth}
                        >
                          <option value="">Select</option>
                          <option value="excellent">Excellent</option>
                          <option value="good">Good</option>
                          <option value="average">Average</option>
                          <option value="poor">Poor</option>
                        </Field>
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientHealth"
                        />
                      </div>

                      {/*Partner */}
                      {values.clientMaritalStatus !== "Single" &&
                        values.clientMaritalStatus !== "Widowed" ? (
                        <div className="col-4 mt-3">
                          <Field
                            as="select"
                            id="partnerHealth"
                            className="form-select shadow  inputDesign"
                            name="partnerHealth"
                          >
                            <option value="">Select</option>
                            <option value="excellent">Excellent</option>
                            <option value="good">Good</option>
                            <option value="average">Average</option>
                            <option value="poor">Poor</option>
                          </Field>
                          <ErrorMessage
                            className="text-danger fw-bold"
                            component="div"
                            name="partnerHealth"
                          />
                        </div>
                      ) : (
                        <div className="col-4"></div>
                      )}

                      {/*Label Smoker */}
                      <div className="col-4 mt-3">
                        <label className="form-label">Smoker</label>
                      </div>

                      {/*Client */}
                      <div className="col-4 mt-3">
                        <div className=" d-flex justify-content-start align-items-center w-100">

                          <Field type="checkbox" name="clientSmoker" className="d-none" />

                          <div
                            id="YesSmokerID"
                            className="femaleSmoking"
                            onClick={() => setFieldValue('clientSmoker', true)}
                          >
                            <img
                              className="img-fluid imgPerson w-100"
                              htmlFor="YesSmokerID"
                              src={smoking}
                              alt="smoking"
                            />
                          </div>

                          <div
                            id="notSmokingID"
                            className=" mx-2 maleNonSmoking"
                            onClick={() => setFieldValue('clientSmoker', false)}
                          >
                            <img
                              className=" img-fluid imgPerson w-100"
                              htmlFor="notSmokingID"
                              src={notsmoking}
                              alt=""
                            />
                          </div>

                        </div>
                      </div>

                      {/*Partner */}
                      {values.clientMaritalStatus !== "Single" &&
                        values.clientMaritalStatus !== "Widowed" ? (
                        <div className="col-4 mt-3">
                          <div className=" d-flex justify-content-start align-items-center w-100">

                            <Field type="checkbox" name="partnerSmoker" className="d-none" />

                            <div
                              id="YesSmokerID"
                              className="femaleSmoking "
                              onClick={() => { setFieldValue('partnerSmoker', true) }}
                            >
                              <img
                                className="img-fluid imgPerson w-100"
                                htmlFor="YesSmokerID"
                                src={smoking}
                                alt="smoking"
                              />
                            </div>

                            <div
                              id="notSmokingID"
                              className=" mx-2 maleNonSmoking"
                              onClick={() => setFieldValue('partnerSmoker', false)}
                            >
                              <img
                                className=" img-fluid imgPerson w-100"
                                htmlFor="notSmokingID"
                                src={notsmoking}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="col-4"></div>
                      )}

                      {/*Label Planned*/}
                      <div className="col-4 mt-3">
                        <label
                          htmlFor="clientPlannedRetirementAge"
                          className="form-label"
                        >
                          {" "}
                          Planned Retirement Age{" "}
                        </label>
                      </div>

                      {/*Client */}
                      <div className="col-4 mt-3">
                        <Field
                          type="number"
                          className="form-control inputDesign shadow"
                          id="clientPlannedRetirementAge"
                          placeholder="Planned Retirement Age"
                          onWheel={(event) => event.currentTarget.blur()}
                          onChange={(e) =>
                            setFieldValue(
                              "clientPlannedRetirementAge",
                              e.target.value
                            )
                          }
                          value={values.clientPlannedRetirementAge}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="clientPlannedRetirementAge"
                        />
                      </div>

                      {/*Partner */}
                      {values.clientMaritalStatus !== "Single" &&
                        values.clientMaritalStatus !== "Widowed" ? (
                        <div className="col-4 mt-3">
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            id="partnerPlannedRetirementAge"
                            placeholder="Planned Retirement Age"
                            onWheel={(event) => event.currentTarget.blur()}
                            name="partnerPlannedRetirementAge"
                          />
                          <ErrorMessage
                            className="text-danger fw-bold"
                            component="div"
                            name="partnerPlannedRetirementAge"
                          />
                        </div>
                      ) : (
                        <div className="col-4"></div>
                      )}

                      {/* Tax Resident */}
                      <div className="col-4 mt-3">
                        <label htmlFor="TaxResident" className="form-label">
                          {" "}
                          Tax Resident{" "}
                        </label>
                      </div>

                      {/*Client */}
                      <div className="col-4 mt-3">
                        <div className="mb-3">
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input
                                type="radio"
                                name="clientTaxResidentRadio"
                                className="form-check-input"
                                id="TaxResident1"
                                value="No"
                                onChange={handleChange}
                                checked={
                                  values.clientTaxResidentRadio === "No"
                                }
                              />
                              <label
                                htmlFor="TaxResident1"
                                className="label1"
                              >
                                <span>No</span>
                              </label>
                              <input
                                type="radio"
                                name="clientTaxResidentRadio"
                                id="TaxResident2"
                                className="form-check-input"
                                value="Yes"
                                onChange={handleChange}
                                checked={
                                  values.clientTaxResidentRadio === "Yes"
                                }
                              />
                              <label
                                htmlFor="TaxResident2"
                                className="label2"
                              >
                                <span>Yes</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}
                        </div>
                      </div>

                      {/*Partner */}
                      {values.clientMaritalStatus !== "Single" &&
                        values.clientMaritalStatus !== "Widowed" ? (
                        <div className="col-4 mt-3">
                          <div className="mb-3">
                            {/* switch button style */}
                            <div className="form-check form-switch m-0 p-0 ">
                              <div className="radiobutton">
                                <input
                                  type="radio"
                                  name="partnerTaxResidentRadio"
                                  className="form-check-input"
                                  id="partnerTaxResident1"
                                  value="No"
                                  onChange={handleChange}
                                  checked={
                                    values.partnerTaxResidentRadio === "No"
                                  }
                                />
                                <label
                                  htmlFor="partnerTaxResident1"
                                  className="label1"
                                >
                                  <span>No</span>
                                </label>
                                <input
                                  type="radio"
                                  name="partnerTaxResidentRadio"
                                  id="partnerTaxResident2"
                                  className="form-check-input"
                                  value="Yes"
                                  onChange={handleChange}
                                  checked={
                                    values.partnerTaxResidentRadio === "Yes"
                                  }
                                />
                                <label
                                  htmlFor="partnerTaxResident2"
                                  className="label2"
                                >
                                  <span>Yes</span>
                                </label>
                              </div>
                            </div>
                            {/* switch button style */}
                          </div>
                        </div>
                      ) : (
                        <div className="col-4"></div>
                      )}

                      {/* Private Health Cover */}
                      <div className="col-4 mt-3">
                        <label
                          htmlFor="PrivateHealthCover"
                          className="form-label"
                        >
                          {" "}
                          Private Health Cover{" "}
                        </label>
                      </div>

                      {/*Client */}
                      <div className="col-4 mt-3">
                        <div className="mb-3">
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input
                                type="radio"
                                name="clientPrivateHealthCoverRadio"
                                className="form-check-input"
                                id="PrivateHealthCoverRadio1"
                                value="No"
                                onChange={handleChange}
                                checked={
                                  values.clientPrivateHealthCoverRadio ===
                                  "No"
                                }
                              />
                              <label
                                htmlFor="PrivateHealthCoverRadio1"
                                className="label1"
                              >
                                <span>No</span>
                              </label>
                              <input
                                type="radio"
                                name="clientPrivateHealthCoverRadio"
                                id="PrivateHealthCoverRadio2"
                                className="form-check-input"
                                value="Yes"
                                onChange={handleChange}
                                checked={
                                  values.clientPrivateHealthCoverRadio ===
                                  "Yes"
                                }
                              />
                              <label
                                htmlFor="PrivateHealthCoverRadio2"
                                className="label2"
                              >
                                <span>Yes</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}
                        </div>
                      </div>

                      {/*Partner */}
                      {values.clientMaritalStatus !== "Single" &&
                        values.clientMaritalStatus !== "Widowed" ? (
                        <div className="col-4 mt-3">
                          <div className="mb-3">
                            {/* switch button style */}
                            <div className="form-check form-switch m-0 p-0 ">
                              <div className="radiobutton">
                                <input
                                  type="radio"
                                  name="partnerPrivateHealthCoverRadio"
                                  className="form-check-input"
                                  id="partnerPrivateHealthCoverRadio1"
                                  value="No"
                                  onChange={handleChange}
                                  checked={
                                    values.partnerPrivateHealthCoverRadio ===
                                    "No"
                                  }
                                />
                                <label
                                  htmlFor="partnerPrivateHealthCoverRadio1"
                                  className="label1"
                                >
                                  <span>No</span>
                                </label>
                                <input
                                  type="radio"
                                  name="partnerPrivateHealthCoverRadio"
                                  id="partnerPrivateHealthCoverRadio2"
                                  className="form-check-input"
                                  value="Yes"
                                  onChange={handleChange}
                                  checked={
                                    values.partnerPrivateHealthCoverRadio ===
                                    "Yes"
                                  }
                                />
                                <label
                                  htmlFor="partnerPrivateHealthCoverRadio2"
                                  className="label2"
                                >
                                  <span>Yes</span>
                                </label>
                              </div>
                            </div>
                            {/* switch button style */}
                          </div>
                        </div>
                      ) : (
                        <div className="col-4"></div>
                      )}

                      {/* HELPS DEBT   */}
                      <div className="col-4 mt-3">
                        <label htmlFor="HELPSDebt" className="form-label">
                          {" "}
                          HELPS Debt{" "}
                        </label>
                      </div>

                      {/*Client */}
                      <div className="col-4 mt-3">
                        <div className="mb-3">
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input
                                type="radio"
                                name="clientHELPSDebtRadio"
                                className="form-check-input"
                                id="HELPSDebtRadio1"
                                value="No"
                                onChange={handleChange}
                                checked={values.clientHELPSDebtRadio === "No"}
                              />
                              <label
                                htmlFor="HELPSDebtRadio1"
                                className="label1"
                              >
                                <span>No</span>
                              </label>
                              <input
                                type="radio"
                                name="clientHELPSDebtRadio"
                                id="HELPSDebtRadio2"
                                className="form-check-input"
                                value="Yes"
                                onChange={handleChange}
                                checked={
                                  values.clientHELPSDebtRadio === "Yes"
                                }
                              />
                              <label
                                htmlFor="HELPSDebtRadio2"
                                className="label2"
                              >
                                <span>Yes</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}
                        </div>
                      </div>

                      {/*Partner */}
                      {values.clientMaritalStatus !== "Single" &&
                        values.clientMaritalStatus !== "Widowed" ? (
                        <div className="col-4 mt-3">
                          <div className="mb-3">
                            {/* switch button style */}
                            <div className="form-check form-switch m-0 p-0 ">
                              <div className="radiobutton">
                                <input
                                  type="radio"
                                  name="partnerHELPSDebtRadio"
                                  className="form-check-input"
                                  id="PartnerHELPSDebtRadio1"
                                  value="No"
                                  onChange={handleChange}
                                  checked={
                                    values.partnerHELPSDebtRadio === "No"
                                  }
                                />
                                <label
                                  htmlFor="PartnerHELPSDebtRadio1"
                                  className="label1"
                                >
                                  <span>No</span>
                                </label>
                                <input
                                  type="radio"
                                  name="partnerHELPSDebtRadio"
                                  id="PartnerHELPSDebtRadio2"
                                  className="form-check-input"
                                  value="Yes"
                                  onChange={handleChange}
                                  checked={
                                    values.partnerHELPSDebtRadio === "Yes"
                                  }
                                />
                                <label
                                  htmlFor="PartnerHELPSDebtRadio2"
                                  className="label2"
                                >
                                  <span>Yes</span>
                                </label>
                              </div>
                            </div>
                            {/* switch button style */}
                          </div>
                        </div>
                      ) : (
                        <div className="col-4"></div>
                      )}
                    </div>


                  </div>
                </div>
              </div>
            ) : (
              <div className="container-fluid mt-4">
                <div className="row m-0 px-0">
                  <div className="col-md-12">
                    {/* client and partner table*/}

                    <PersonalDetailCards setClientAndPartnerTable={setClientAndPartnerTable} ClientData={ClientData} isPartnered={isPartnered} PartnerData={PartnerData} nextbuttonHandler={nextbuttonHandler} MainTableSubmit={MainTableSubmit} values={values}></PersonalDetailCards>

                  </div>
                </div>
              </div>
            )}
            {/* --------------------------End client Form-------------------- */}

            {/* ------------- start contact details form----------------------------- */}
            {
              ClientAndPartnerTable ? (
                <div className="container-fluid mt-4 ">
                  <div className="row m-0 px-0  ">
                    <div className="col-md-2"></div>
                    <div className="col-md-12">
                      {/*  start Client contact details form */}


                      <h4 className="heading ">
                        Contact Details
                        {/* <div className="iconContainerLg">
                          <img className="img-fluid" src={phonebook} alt="" />
                        </div> */}
                      </h4>

                      <div className="row">
                        <div className="col-4"></div>
                        <div className=" col-4 LargeSheet">
                          <label
                            htmlFor="clientTitle"
                            className="form-label  clientFS green mb-3 p-0"
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
                        {values.clientMaritalStatus !== "Single" &&
                          values.clientMaritalStatus !== "Widowed" ? (
                          <div className="col-4 LargeSheet">
                            <label
                              htmlFor="clientTitle"
                              className="form-label  clientFS green mb-3 p-0"
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
                        ) : (
                          <div className="col-4"></div>
                        )}
                        <div className="col-4 mt-3">
                          <label
                            htmlFor="clientHomeAddress"
                            className="form-label"
                          >
                            {" "}
                            Home Address{" "}
                          </label>
                        </div>

                        {/*Client */}
                        <div className="col-4 mt-3">
                          <Field
                            as="textarea"
                            className="form-control inputDesign shadow inputDesign"
                            id="clientHomeAddress"
                            placeholder="Home Address"
                            name="clientHomeAddress"
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="clientHomeAddress"
                          />
                        </div>

                        {/*Partner */}
                        {values.clientMaritalStatus !== "Single" &&
                          values.clientMaritalStatus !== "Widowed" ? (
                          <div className="col-4 mt-3">
                            <Field
                              as="textarea"
                              className="form-control inputDesign shadow inputDesign"
                              id="partnerHomeAddress"
                              placeholder="Home Address"
                              name="partnerHomeAddress"
                              disabled={values.partnerSameAsClient}
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="partnerHomeAddress"
                            />
                          </div>
                        ) : (
                          <div className="col-4"></div>
                        )}

                        <div className="col-4 mt-3">
                          <label
                            htmlFor="clientPostcode"
                            className="form-label"
                          >
                            {" "}
                            Postcode/Suburb{" "}
                          </label>
                        </div>

                        {/*Client */}
                        <div className="col-4 mt-3">
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            id="clientPostcode"
                            placeholder="Postcode/Suburb"
                            name="clientPostcode"
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="clientPostcode"
                          />
                        </div>

                        {/*Partner */}
                        {values.clientMaritalStatus !== "Single" &&
                          values.clientMaritalStatus !== "Widowed" ? (
                          <div className="col-4 mt-3">
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="partnerPostcode"
                              placeholder="Postcode/Suburb"
                              name="partnerPostcode"
                              disabled={values.partnerSameAsClient}
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="partnerPostcode"
                            />
                          </div>
                        ) : (
                          <div className="col-4"></div>
                        )}

                        <div className="col-4 mt-3">
                          <label className="form-label">Postal Address</label>
                        </div>

                        {/*Client */}
                        <div className="col-4 ">
                          <div className="form-check mt-3">
                            <Field
                              className="form-check-input newCheck"
                              type="checkbox"
                              id="clientSameAsAbove"
                              name="clientSameAsAbove"
                              style={{ accentColor: "green" }}

                              checked={values.clientSameAsAbove}
                              onChange={() => {
                                if (!values.clientSameAsAbove) {
                                  // copy values from homeAddress to otherAddress
                                  setFieldValue(
                                    "clientPostalAddress",
                                    values.clientHomeAddress
                                  );
                                  setFieldValue(
                                    "clientPostalPostCode",
                                    values.clientPostcode
                                  );
                                }

                                if (values.clientSameAsAbove) {
                                  setFieldValue("clientPostalAddress", "");
                                  setFieldValue("clientPostalPostCode", "");
                                }

                                if ((!values.clientSameAsAbove) && (!values.partnerSameAsClient)) {
                                  setFieldValue(
                                    "partnerPostalAddress",
                                    values.clientHomeAddress
                                  );
                                  setFieldValue(
                                    "partnerPostalPostCode",
                                    values.clientPostcode
                                  );
                                }
                                else if ((values.clientSameAsAbove === false) || (values.partnerSameAsClient)) {
                                  setFieldValue("partnerPostalAddress", "");
                                  setFieldValue("partnerPostalPostCode", "");
                                }
                                // toggle sameAsHomeAddress checkbox
                                setFieldValue(
                                  "clientSameAsAbove",
                                  !values.clientSameAsAbove
                                );
                              }}

                            />
                            <div className="d-inline-block">
                              <label
                                className=""
                                id="labelID"
                                htmlFor="clientSameAsAbove"
                              >
                                Same as home address
                              </label>
                            </div>
                          </div>
                        </div>

                        {/*Partner */}
                        {values.clientMaritalStatus !== "Single" &&
                          values.clientMaritalStatus !== "Widowed" ? (
                          <div className="col-4 mt-3">
                            <Field
                              className="form-check-input"
                              type="checkbox"
                              id="partnerSameAsClient"
                              name="partnerSameAsClient"
                              checked={values.partnerSameAsClient}
                              onChange={() => {
                                if (!values.partnerSameAsClient) {
                                  // copy values from homeAddress to otherAddress
                                  setFieldValue(
                                    "partnerHomeAddress",
                                    values.clientHomeAddress
                                  );
                                  setFieldValue(
                                    "partnerPostcode",
                                    values.clientPostcode
                                  );
                                }

                                if (values.partnerSameAsClient) {
                                  setFieldValue("partnerHomeAddress", "");
                                  setFieldValue("partnerPostcode", "");
                                }

                                if ((values.clientSameAsAbove === true) && (!values.partnerSameAsClient)) {
                                  setFieldValue(
                                    "partnerPostalAddress",
                                    values.clientHomeAddress
                                  );
                                  setFieldValue(
                                    "partnerPostalPostCode",
                                    values.clientPostcode
                                  );
                                }
                                else if ((values.clientSameAsAbove === false) || (values.partnerSameAsClient)) {
                                  setFieldValue("partnerPostalAddress", "");
                                  setFieldValue("partnerPostalPostCode", "");
                                }

                                // toggle sameAsHomeAddress checkbox
                                setFieldValue(
                                  "partnerSameAsClient",
                                  !values.partnerSameAsClient
                                );
                              }}
                            />
                            <div className="d-inline-block">
                              <label
                                className=""
                                id="labelID"
                                htmlFor="partnerSameAsClient"
                              >
                                &nbsp;&nbsp;Same as Client
                              </label>
                            </div>
                          </div>
                        ) : (
                          <div className="col-4"></div>
                        )}

                        <div className="col-4 mt-3">
                          <label
                            htmlFor="clientPostalAddress"
                            className="form-label"
                          >
                            {" "}
                            Postal Address{" "}
                          </label>
                        </div>

                        {/*Client */}
                        <div className="col-4 mt-3">
                          <Field
                            type="text"
                            className="form-control inputDesign shadow"
                            id="clientPostalAddress"
                            placeholder="Postal Address"
                            name="clientPostalAddress"
                            disabled={values.clientSameAsAbove}
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="clientPostalAddress"
                          />
                        </div>

                        {/*Partner */}
                        {values.clientMaritalStatus !== "Single" &&
                          values.clientMaritalStatus !== "Widowed" ? (
                          <div className="col-4 mt-3">
                            <Field
                              type="text"
                              className="form-control inputDesign shadow"
                              id="partnerPostalAddress"
                              placeholder="Postal Address"
                              name="partnerPostalAddress"
                              disabled={(values.clientSameAsAbove === true) && (values.partnerSameAsClient === true)}
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="partnerPostalAddress"
                            />
                          </div>
                        ) : (
                          <div className="col-4"></div>
                        )}

                        <div className="col-4 mt-3">
                          <label
                            htmlFor="clientPostcode"
                            className="form-label"
                          >
                            {" "}
                            Postcode/Suburb{" "}
                          </label>
                        </div>

                        {/*Client */}
                        <div className="col-4 mt-3">
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            id="clientPostalPostCode"
                            placeholder="Postcode/Suburb"
                            disabled={values.clientSameAsAbove}
                            name="clientPostalPostCode"
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="clientPostalPostCode"
                          />
                        </div>

                        {/*Partner */}
                        {values.clientMaritalStatus !== "Single" &&
                          values.clientMaritalStatus !== "Widowed" ? (
                          <div className="col-4 mt-3">
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="partnerPostalPostCode"
                              placeholder="Postcode/Suburb"
                              disabled={(values.clientSameAsAbove === true) && (values.partnerSameAsClient === true)}
                              name="partnerPostalPostCode"
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="partnerPostalPostCode"
                            />
                          </div>
                        ) : (
                          <div className="col-4"></div>
                        )}

                        <div className="col-4 mt-3">
                          <label htmlFor="clientMobile" className="form-label">
                            {" "}
                            Mobile Number{" "}
                          </label>
                        </div>

                        {/*Client */}
                        <div className="col-4 mt-3">
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            id="clientMobile"
                            placeholder="Mobile"
                            onChange={(e) =>
                              setFieldValue("clientMobile", e.target.value)
                            }
                            value={values.clientMobile}
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="clientMobile"
                          />
                        </div>

                        {/*Partner */}
                        {values.clientMaritalStatus !== "Single" &&
                          values.clientMaritalStatus !== "Widowed" ? (
                          <div className="col-4 mt-3">
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              name="partnerMobile"
                              placeholder="Mobile"
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="partnerMobile"
                            />
                          </div>
                        ) : (
                          <div className="col-4"></div>
                        )}

                        <div className="col-4 mt-3">
                          <label
                            htmlFor="clientHomePhone"
                            className="form-label"
                          >
                            {" "}
                            Home Phone{" "}
                          </label>
                        </div>

                        {/*Client */}
                        <div className="col-4 mt-3">
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            id="clientHomePhone"
                            placeholder="Home Phone"
                            onChange={(e) =>
                              setFieldValue("clientHomePhone", e.target.value)
                            }
                            value={values.clientHomePhone}
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="clientHomePhone"
                          />
                        </div>

                        {/*Partner */}
                        {values.clientMaritalStatus !== "Single" &&
                          values.clientMaritalStatus !== "Widowed" ? (
                          <div className="col-4 mt-3">
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="partnerHomePhone"
                              placeholder="Home Phone"
                              name="partnerHomePhone"
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="partnerHomePhone"
                            />
                          </div>
                        ) : (
                          <div className="col-4"></div>
                        )}

                        <div className="col-4 mt-3">
                          <label
                            htmlFor="clientWorkPhone"
                            className="form-label"
                          >
                            {" "}
                            Work Phone{" "}
                          </label>
                        </div>

                        {/*Client */}
                        <div className="col-4 mt-3">
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            id="clientWorkPhone"
                            name="clientWorkPhone"
                            placeholder="Work Phone"
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="clientWorkPhone"
                          />
                        </div>

                        {/*Partner */}
                        {values.clientMaritalStatus !== "Single" &&
                          values.clientMaritalStatus !== "Widowed" ? (
                          <div className="col-4 mt-3">
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="partnerWorkPhone"
                              name="partnerWorkPhone"
                              placeholder="Work Phone"
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="partnerWorkPhone"
                            />
                          </div>
                        ) : (
                          <div className="col-4"></div>
                        )}

                        <div className="col-4 mt-3">
                          <label htmlFor="Email" className="form-label">
                            {" "}
                            Email{" "}
                          </label>
                        </div>

                        {/*Client */}
                        <div className="col-4 mt-3">
                          <Field
                            type="email"
                            className="form-control inputDesign shadow"
                            id="Email"
                            placeholder="abc@gmail.com"
                            name="Email"
                            onBlur={() =>
                              localStorage.setItem("Email", values.Email)
                            }
                          />
                          <ErrorMessage
                            component="div"
                            className="text-danger fw-bold"
                            name="Email"
                          />
                        </div>

                        {/*Partner */}
                        {values.clientMaritalStatus !== "Single" &&
                          values.clientMaritalStatus !== "Widowed" ? (
                          <div className="col-4 mt-3">
                            <Field
                              type="email"
                              className="form-control inputDesign shadow"
                              name="partnerEmail"
                              placeholder="abc@gmail.com"
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="partnerEmail"
                            />
                          </div>
                        ) : (
                          <div className="col-4"></div>
                        )}
                      </div>
                      <div className="row mt-2 mb-4">
                        <div className="col-md-12">
                          <div className="d-flex flex-row justify-content-center align-items-center mt-4">
                            <button
                              type="submit"
                              className=" btn w-50  bgColor modalBtn"
                            // onClick={nextButtonHandler}
                            >
                              {buttonFlag}
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ) : (
                ""
              )
            }

          </Form>
        )}
      </Formik>
    </>
  );
};

export default PersonalDetail;
