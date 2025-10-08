import React, { useState, useEffect } from "react";
import single from "../Svgs/single-2.svg";
import couple from "../Svgs/couple-2.svg";

import businessman from "./images/businessman.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup"; //? don't Remove it you might need it later
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useRecoilState, useRecoilValue } from "recoil";
import {  StepState, ClientName, PartnerName, defaultUrl } from "../../Store/Store";
import { Card } from "react-bootstrap";
import CustomDropDown from "../Assets/CustomDropDown/CustomDropDown";

const BusinessTextStucture = () => {
//Recoil Step State For First Route When User Login
  let [Steps, setSteps] = useRecoilState(StepState); // eslint-disable-line no-unused-vars

  
  let DefaultUrl = useRecoilValue(defaultUrl)
  
  const [ClientNameGet] = useRecoilState(ClientName);
  const [PartnerNameGet] = useRecoilState(PartnerName);


  const [clientSTState, setClientSTState] = useState({});
  const [clientPartnerShipState, setClientPartnerShipState] = useState({});
  const [clientTCstate, setClientTCState] = useState({});
  const [clientBTState, setClientBTState] = useState({});
  const [clientBCState, setClientBCState] = useState({});

  const [partnerSTState, setPartnerSTState] = useState({});
  const [partnerPartnerShipState, setPartnerPartnerShipState] = useState({});
  const [partnerTCstate, setPartnerTCState] = useState({});
  const [partnerBTState, setPartnerBTState] = useState({});
  const [partnerBCState, setPartnerBCState] = useState({});

  let [allApiState, setAllApiState] = useState({ ST: false, PartnerShip: false, TC: false, BT: false, BC: false, Email: localStorage.getItem("Email") });

  const [tableRenderState, setTableRenderState] = useState(false);

  useEffect(() => {

    let email = localStorage.getItem("Email");
    if (email) {
      GetApiFunction(email);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let GetApiFunction = async (email) => {
    try {

      let allApis = await axios.get(`${DefaultUrl}/api/Client-formFlags-Business`);
      allApis = allApis.data;
      allApis = allApis.filter((item) => item.Email === email);
      console.log(allApis);
      if (allApis.length !== 0) {
        setAllApiState(allApis[0]);

        if (allApis[0].ST) {
          let ClientST = await axios.get(`${DefaultUrl}/api/Client-SoleTrader-Business`);
          ClientST = ClientST.data;
          ClientST = ClientST.filter((item) => item.Email === email);
          console.log("Client Data ST", ClientST[0]);
          setClientSTState({ ...ClientST[0] });

          if (ClientST[0].clientOwner === "Partner") {
            let PartnerST = await axios.get(`${DefaultUrl}/api/Partner-SoleTrader-Business`);
            PartnerST = PartnerST.data;
            PartnerST = PartnerST.filter((item) => item.Email === email);
            console.log("Partner Data ST", PartnerST[0]);
            setPartnerSTState({ ...PartnerST[0] });
          }
        }
        if (allApis[0].PartnerShip) {
          let ClientPS = await axios.get(`${DefaultUrl}/api/Client-Partnership-Business`);
          ClientPS = ClientPS.data;
          ClientPS = ClientPS.filter((item) => item.Email === email);
          console.log("Client Data PartnerShip", ClientPS[0]);
          setClientPartnerShipState({ ...ClientPS[0] });

          if (ClientPS[0].clientOwner === "Partner") {
            let PartnerPS = await axios.get(`${DefaultUrl}/api/Partner-Partnership-Business`);
            PartnerPS = PartnerPS.data;
            PartnerPS = PartnerPS.filter((item) => item.Email === email);
            console.log("Partner Data ST", PartnerPS[0]);
            setPartnerPartnerShipState({ ...PartnerPS[0] });
          }
        }

        if (allApis[0].TC) {
          let ClientTC = await axios.get(`${DefaultUrl}/api/Client-TradingCompany-Business`);
          ClientTC = ClientTC.data;
          ClientTC = ClientTC.filter((item) => item.Email === email);
          console.log("Client Data Trading Company", ClientTC[0]);
          setClientTCState({ ...ClientTC[0] });

          if (ClientTC[0].clientOwner === "Partner") {
            let PartnerTC = await axios.get(`${DefaultUrl}/api/Partner-TradingCompany-Business`);
            PartnerTC = PartnerTC.data;
            PartnerTC = PartnerTC.filter((item) => item.Email === email);
            console.log("Partner Data Trading Company", PartnerTC[0]);
            setPartnerTCState({ ...PartnerTC[0] });
          }
        }

        if (allApis[0].BT) {
          let ClientBT = await axios.get(`${DefaultUrl}/api/Client-BusinessTrust-Business`);
          ClientBT = ClientBT.data;
          ClientBT = ClientBT.filter((item) => item.Email === email);
          console.log("Client Data Business Tax Structure", ClientBT[0]);
          setClientBTState({ ...ClientBT[0] });

          if (ClientBT[0].clientOwner === "Partner") {
            let PartnerBT = await axios.get(`${DefaultUrl}/api/Partner-BusinessTrust-Business`);
            PartnerBT = PartnerBT.data;
            PartnerBT = PartnerBT.filter((item) => item.Email === email);
            console.log("Partner Data Business Tax Structure", PartnerBT[0]);
            setPartnerBTState({ ...PartnerBT[0] });
          }
        }

        if (allApis[0].BC) {
          let ClientBC = await axios.get(`${DefaultUrl}/api/Client-BucketCompany-Business`);
          ClientBC = ClientBC.data;
          ClientBC = ClientBC.filter((item) => item.Email === email);
          console.log("Client Data Bucket Company", ClientBC[0]);
          setClientBCState({ ...ClientBC[0] });

          if (ClientBC[0].clientOwner === "Partner") {
            let PartnerBC = await axios.get(`${DefaultUrl}/api/Partner-BucketCompany-Business`);
            PartnerBC = PartnerBC.data;
            PartnerBC = PartnerBC.filter((item) => item.Email === email);
            console.log("Partner Data Bucket Company", PartnerBC[0]);
            setPartnerBCState({ ...PartnerBC[0] });
          }
        }

      }
      if ((allApis.ST) || (allApis[0].PartnerShip) || (allApis[0].TC) || (allApis[0].BT) || (allApis[0].BC)) {
        setTableRenderState(true);
      }
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }



  // let letters = /^[a-zA-Z ]*$/; //? don't Remove it you might need it later

  let initialValues = {
    clientStructureType: '',
    clientOwner: '',
    // Sole Trader 
    clientSTBusinessName: '',
    clientSTABN: '',
    clientSTBusinessAddress: '',
    clientSTBusinessIncome: '',
    clientSTGoodwill: '',
    partnerSTBusinessName: '',
    partnerSTABN: '',
    partnerSTBusinessAddress: '',
    partnerSTBusinessIncome: '',
    partnerSTGoodwill: '',
    // Partnershiip
    clientPartnershipName: '',
    clientPartnershipABN: '',
    clientPartnershipAddress: '',
    clientPartnershipIncome: '',
    clientPartnershipPartnership: '',
    clientPartnershipShareIncome: '',
    clientPartnershipGoodwill: '',
    partnerPartnershipName: '',
    partnerPartnershipABN: '',
    partnerPartnershipAddress: '',
    partnerPartnershipIncome: '',
    partnerPartnershipPartnership: '',
    partnerPartnershipShareIncome: '',
    partnerPartnershipGoodwill: '',
    // Trading Company
    clientTCName: '',
    clientTCABN: '',
    clientTCACN: '',
    clientTCAddress: '',
    clientTCDirectors: '',
    clientTCDirectorship: '',
    clientTCShares: '',
    clientTCDividend: '',
    clientTCEquity: '',
    partnerTCName: '',
    partnerTCABN: '',
    partnerTCACN: '',
    partnerTCAddress: '',
    partnerTCDirectors: '',
    partnerTCDirectorship: '',
    partnerTCShares: '',
    partnerTCDividend: '',
    partnerTCEquity: '',
    // Business Trust
    clientBTName: '',
    clientBTABN: '',
    clientBTAddress: '',
    clientBTTrustee: '',
    clientBTTrusteeName: '',
    clientBTDistribution: '',
    clientBTOwnership: '',
    clientBTBusiness: '',
    partnerBTName: '',
    partnerBTABN: '',
    partnerBTAddress: '',
    partnerBTTrustee: '',
    partnerBTTrusteeName: '',
    partnerBTDistribution: '',
    partnerBTOwnership: '',
    partnerBTBusiness: '',
    // Bucket Company
    clientBCCHolding: '',
    clientBCPHolding: '',
    clientBCName: '',
    clientBCACN: '',
    clientBCAddress: '',
    clientBCCDirectorship: '',
    clientBCPDirectorship: '',
    clientBCCDividend: '',
    clientBCPDividend: '',
    clientBCCEquity: '',
    clientBCPEquity: '',
    partnerBCCHolding: '',
    partnerBCPHolding: '',
    partnerBCName: '',
    partnerBCACN: '',
    partnerBCAddress: '',
    partnerBCCDirectorship: '',
    partnerBCPDirectorship: '',
    partnerBCCDividend: '',
    partnerBCPDividend: '',
    partnerBCCEquity: '',
    partnerBCPEquity: '',

  };

  // let validationSchema = Yup.object({
  //   soleBusinessName: Yup.string()
  //     .matches(letters, "Only letters")
  //     .required("Required"),
  //   soleBusinessType: Yup.string()
  //     .matches(letters, "Only letters")
  //     .required("Required"),
  //   soleIncomeGenerated: Yup.number()
  //     .required("Required")
  //     .test("Is positive?", "Must be a positive number", (value) => value > 0),
  //   soleBusinessExpenses: Yup.number()
  //     .required("Required")
  //     .test("Is positive?", "Must be a positive number", (value) => value > 0),
  //   // soleNetBusinessIncome: Yup.number(),

  //   solePartnerBusinessName: Yup.string()
  //     .matches(letters, "Only letters")
  //     .required("Required"),
  //   solePartnerBusinessType: Yup.string()
  //     .matches(letters, "Only letters")
  //     .required("Required"),
  //   solePartnerIncomeGenerated: Yup.number()
  //     .required("Required")
  //     .test("Is positive?", "Must be a positive number", (value) => value > 0),
  //   solePartnerBusinessExpenses: Yup.number()
  //     .required("Required")
  //     .test("Is positive?", "Must be a positive number", (value) => value > 0),

  //   clientsShareofPartnership: Yup.number()
  //     .required("Required")
  //     .test("Is positive?", "Must be a positive number", (value) => value > 0),
  //   partnersShareofPartnership: Yup.number()
  //     .required("Required")
  //     .test("Is positive?", "Must be a positive number", (value) => value > 0),
  //   partnershipName: Yup.string()
  //     .matches(letters, "Only letters")
  //     .required("Required"),
  //   businessType: Yup.string()
  //     .matches(letters, "Only letters")
  //     .required("Required"),
  //   incomeGenerated: Yup.number()
  //     .required("Required")
  //     .test("Is positive?", "Must be a positive number", (value) => value > 0),
  //   businessExpenses: Yup.number()
  //     .required("Required")
  //     .test("Is positive?", "Must be a positive number", (value) => value > 0),

  //   privateNameOfCompany: Yup.string()
  //     .matches(letters, "Only letters")
  //     .required("Required"),
  //   privateNetAssetValueofCompany: Yup.number()
  //     .required("Required")
  //     .test("Is positive?", "Must be a positive number", (value) => value > 0),
  //   privateTradingName: Yup.string()
  //     .matches(letters, "Only letters")
  //     .required("Required"),
  //   privateTotalRevenue: Yup.number()
  //     .required("Required")
  //     .test("Is positive?", "Must be a positive number", (value) => value > 0),
  //   privateBusinessType: Yup.string()
  //     .matches(letters, "Only letters")
  //     .required("Required"),
  //   PrivatebusinessExpenses: Yup.number()
  //     .required("Required")
  //     .test("Is positive?", "Must be a positive number", (value) => value > 0),
  //   privateDirectorsDetail: Yup.string().required("Required"),
  //   privateClientsshareholding: Yup.number()
  //     .required("Required")
  //     .test("Is positive?", "Must be a positive number", (value) => value > 0),
  //   privatePartnersShareholding: Yup.number()
  //     .required("Required")
  //     .test("Is positive?", "Must be a positive number", (value) => value > 0),
  //   privateClient: Yup.number().when("dividendsTakenradio", {
  //     is: (val) => val && val.length === 3,
  //     then: Yup.number()
  //       .required("Required")
  //       .test(
  //         "Is positive?",
  //         "Must be a positive number",
  //         (value) => value > 0
  //       ),
  //     otherwise: Yup.number().notRequired(),
  //   }),
  //   privatePartner: Yup.number().when("dividendsTakenradio", {
  //     is: (val) => val && val.length === 3,
  //     then: Yup.number()
  //       .required("Required")
  //       .test(
  //         "Is positive?",
  //         "Must be a positive number",
  //         (value) => value > 0
  //       ),
  //     otherwise: Yup.number().notRequired(),
  //   }),

  //   NameofTrust: Yup.string()
  //     .matches(letters, "Only letters")
  //     .required("Required"),
  //   netAssetValueofBusinessTrust: Yup.number()
  //     .required("Required")
  //     .test("Is positive?", "Must be a positive number", (value) => value > 0),
  //   trustTradingName: Yup.string()
  //     .matches(letters, "Only letters")
  //     .required("Required"),
  //   trustTotalRevenue: Yup.number()
  //     .required("Required")
  //     .test("Is positive?", "Must be a positive number", (value) => value > 0),
  //   trustBusinessType: Yup.string()
  //     .matches(letters, "Only letters")
  //     .required("Required"),
  //   trustBusinessExpenses: Yup.number()
  //     .required("Required")
  //     .test("Is positive?", "Must be a positive number", (value) => value > 0),
  //   trustClientShareofDistribution: Yup.number()
  //     .required("Required")
  //     .test(
  //       "Is positive?",
  //       "Age must be a positive number",
  //       (value) => value > 0
  //     ),
  //   trustPartnerShareofDistribution: Yup.number()
  //     .required("Required")
  //     .test("Is positive?", "Must be a positive number", (value) => value > 0),
  //   trustClient: Yup.number().when("DistributionsTakenradio", {
  //     is: (val) => val && val.length === 3,
  //     then: Yup.number()
  //       .required("Required")
  //       .test(
  //         "Is positive?",
  //         "Must be a positive number",
  //         (value) => value > 0
  //       ),
  //     otherwise: Yup.number().notRequired(),
  //   }),
  //   trustPartner: Yup.number().when("DistributionsTakenradio", {
  //     is: (val) => val && val.length === 3,
  //     then: Yup.number()
  //       .required("Required")
  //       .test(
  //         "Is positive?",
  //         "Must be a positive number",
  //         (value) => value > 0
  //       ),
  //     otherwise: Yup.number().notRequired(),
  //   }),
  // });

  let Navigate = useNavigate();

  // function BackFunction() {
  //   Navigate("/");
  //   setSteps(0);
  //   localStorage.setItem("Steps", 0);
  // }


  let nextbuttonHandler = () => {
    // setQuestionChange("income");
    Navigate("/Income-And-Expenses");
  };

  let onSubmit = (values, { resetForm }) => {

    setTableRenderState(true);

    // eslint-disable-next-line default-case
    switch (values.clientStructureType) {
      case "SoleTrader":
        // **** Sole Trader Object****
        let clientSTBusinessDetailsObj = {
          clientStructureType: values.clientStructureType || " ",
          clientOwner: values.clientOwner || " ",
          Email: localStorage.getItem("Email"),
          // **** Sole Trader ****
          clientSTBusinessName: values.clientSTBusinessName || " ",
          clientSTABN: values.clientSTABN || " ",
          clientSTBusinessAddress: values.clientSTBusinessAddress || " ",
          clientSTBusinessIncome: values.clientSTBusinessIncome || 0,
          clientSTGoodwill: values.clientSTGoodwill || 0,
        };

        console.log(clientSTBusinessDetailsObj);

        if (allApiState.ST === true) {
          //patch
          // console.log(clientSTBusinessDetailsObj);
          axios
            .patch(
              `${DefaultUrl}/api/Client-SoleTrader-Business/Update-Client-SoleTrader/${clientSTBusinessDetailsObj.Email}`,
              clientSTBusinessDetailsObj
            )
            .then((res) => {
              console.log(
                "Client Sole Patch Trader Business Has Successfully Been updated"
              );
              setClientSTState({ ...clientSTBusinessDetailsObj });
            });
        } else {
          //POST
          axios
            .post(
              `${DefaultUrl}/api/Client-SoleTrader-Business/Add-Client-SoleTrader`,
              clientSTBusinessDetailsObj
            )
            .then((res) => {
              console.log(
                "Client Sole Post Trader Business Has Successfully Been Added"
              );
              setClientSTState({ ...clientSTBusinessDetailsObj });
              allApi("ST", true);
            });
        }

        if (values.clientOwner === "Partner") {
          let partnerSTBusinessDetailsObj = {
            clientStructureType: values.clientStructureType || " ",
            clientOwner: values.clientOwner || " ",
            Email: localStorage.getItem("Email"),
            // **** Sole Trader ****
            partnerSTBusinessName: values.partnerSTBusinessName || " ",
            partnerSTABN: values.partnerSTABN || " ",
            partnerSTBusinessAddress: values.partnerSTBusinessAddress || " ",
            partnerSTBusinessIncome: values.partnerSTBusinessIncome || 0,
            partnerSTGoodwill: values.partnerSTGoodwill || 0,
          };
          // setPartnerSTState({ ...partnerSTBusinessDetailsObj });
          if (allApiState.ST === true) {
            //patch
            // console.log(clientSTBusinessDetailsObj);
            axios
              .patch(
                `${DefaultUrl}/api/Partner-SoleTrader-Business/Update-Partner-SoleTrader/${partnerSTBusinessDetailsObj.Email}`,
                partnerSTBusinessDetailsObj
              )
              .then((res) => {
                console.log(
                  "Partner Sole Patch Trader Business Has Successfully Been updated"
                );
                setPartnerSTState({ ...partnerSTBusinessDetailsObj });
              });
          } else {
            //POST
            axios
              .post(
                `${DefaultUrl}/api/Partner-SoleTrader-Business/Add-Partner-SoleTrader`,
                partnerSTBusinessDetailsObj
              )
              .then((res) => {
                console.log(
                  "Partner Sole Post Trader Business Has Successfully Been Added"
                );
                setPartnerSTState({ ...partnerSTBusinessDetailsObj });
                // allApi('ST');
              });
          }
        }

        //? ****** Sole Trader End ******
        break;
      case "Partnership":
        // **** PartnerShip Object****
        let clientPartnershipBusinessDetailsObj = {
          clientStructureType: values.clientStructureType || " ",
          clientOwner: values.clientOwner || " ",
          Email: localStorage.getItem("Email"),

          clientPartnershipName: values.clientPartnershipName || " ",
          clientPartnershipABN: values.clientPartnershipABN || " ",
          clientPartnershipAddress: values.clientPartnershipAddress || " ",
          clientPartnershipIncome: values.clientPartnershipIncome || 0,
          clientPartnershipPartnership:
            values.clientPartnershipPartnership || 0,
          clientPartnershipShareIncome:
            values.clientPartnershipShareIncome || 0,
          clientPartnershipGoodwill: values.clientPartnershipGoodwill || 0,
        };
        if (allApiState.PartnerShip === true) {
          // Patch
          axios
            .patch(
              `${DefaultUrl}/api/Client-Partnership-Business/Update-Client-Partnership/${clientPartnershipBusinessDetailsObj.Email}`,
              clientPartnershipBusinessDetailsObj
            )
            .then((res) => {
              console.log(
                "Client PartnerShip Patch Business Has Successfully Been updated"
              );
              setClientPartnerShipState({
                ...clientPartnershipBusinessDetailsObj,
              });
            });
        } else {
          // Post
          axios
            .post(
              `${DefaultUrl}/api/Client-Partnership-Business/Add-Client-Partnership`,
              clientPartnershipBusinessDetailsObj
            )
            .then((res) => {
              console.log(
                "Client Partnership Business Has Successfully Been Added"
              );
              setClientPartnerShipState({
                ...clientPartnershipBusinessDetailsObj,
              });
              allApi("PartnerShip", true);
            });
        }

        // partner
        if (values.clientOwner === "Partner") {
          let partnerPartnershipBusinessDetailsObj = {
            clientStructureType: values.clientStructureType || " ",
            clientOwner: values.clientOwner || " ",
            Email: localStorage.getItem("Email"),

            partnerPartnershipName: values.partnerPartnershipName || " ",
            partnerPartnershipABN: values.partnerPartnershipABN || " ",
            partnerPartnershipAddress: values.partnerPartnershipAddress || " ",
            partnerPartnershipIncome: values.partnerPartnershipIncome || 0,
            partnerPartnershipPartnership:
              values.partnerPartnershipPartnership || 0,
            partnerPartnershipShareIncome:
              values.partnerPartnershipShareIncome || 0,
            partnerPartnershipGoodwill: values.partnerPartnershipGoodwill || 0,
          };
          // setPartnerPartnerShipState({...partnerPartnershipBusinessDetailsObj});
          // console.log(partnerPartnershipBusinessDetailsObj);
          if (allApiState.PartnerShip === true) {
            // Patch
            axios
              .patch(
                `${DefaultUrl}/api/Partner-Partnership-Business/Update-Partner-Partnership/${partnerPartnershipBusinessDetailsObj.Email}`,
                partnerPartnershipBusinessDetailsObj
              )
              .then((res) => {
                console.log(
                  "Partner PartnerShip Patch Business Has Successfully Been updated"
                );
                setPartnerPartnerShipState({
                  ...partnerPartnershipBusinessDetailsObj,
                });
              });
          } else {
            // Post
            axios
              .post(
                `${DefaultUrl}/api/Partner-Partnership-Business/Add-Partner-Partnership`,
                partnerPartnershipBusinessDetailsObj
              )
              .then((res) => {
                console.log(
                  "Partner Partnership Business Has Successfully Been Added"
                );
                setPartnerPartnerShipState({
                  ...partnerPartnershipBusinessDetailsObj,
                })
              });
          }


        }
        //? ****** PartnerShip End ******
        break;
      case "TradingCompany":
        // **** Trading Company Object****

        let clientTCBusinessDetailsObj = {
          clientStructureType: values.clientStructureType || " ",
          clientOwner: values.clientOwner || " ",
          Email: localStorage.getItem("Email"),

          clientTCName: values.clientTCName || " ",
          clientTCABN: values.clientTCABN || " ",
          clientTCACN: values.clientTCACN || 0,
          clientTCAddress: values.clientTCAddress || " ",
          clientTCDirectors: values.clientTCDirectors || 0,
          clientTCDirectorship: values.clientTCDirectorship || " ",
          clientTCShares: values.clientTCShares || 0,
          clientTCDividend: values.clientTCDividend || 0,
          clientTCEquity: values.clientTCEquity || 0,
        };
        if (allApiState.TC === true) {
          // Patch
          axios
            .patch(
              `${DefaultUrl}/api/Client-TradingCompany-Business/Update-Client-TradingCompany/${clientTCBusinessDetailsObj.Email}`,
              clientTCBusinessDetailsObj
            )
            .then((res) => {
              console.log(
                "Client Trading Company Patch Business Has Successfully Been updated"
              );
              setClientTCState({ ...clientTCBusinessDetailsObj });
            });
        } else {
          // Post
          axios
            .post(
              `${DefaultUrl}/api/Client-TradingCompany-Business/Add-Client-TradingCompany`,
              clientTCBusinessDetailsObj
            )
            .then((res) => {
              console.log(
                "Client Trading Company Business Has Successfully Been Added"
              );
              setClientTCState({ ...clientTCBusinessDetailsObj });
              allApi("TC", true);
            });
        }

        if (values.clientOwner === "Partner") {
          let partnerTCBusinessDetailsObj = {
            clientStructureType: values.clientStructureType || " ",
            clientOwner: values.clientOwner || " ",
            Email: localStorage.getItem("Email"),
            // ** Trading Company ***

            partnerTCName: values.partnerTCName || " ",
            partnerTCABN: values.partnerTCABN || " ",
            partnerTCACN: values.partnerTCACN || 0,
            partnerTCAddress: values.partnerTCAddress || " ",
            partnerTCDirectors: values.partnerTCDirectors || 0,
            partnerTCDirectorship: values.partnerTCDirectorship || " ",
            partnerTCShares: values.partnerTCShares || 0,
            partnerTCDividend: values.partnerTCDividend || 0,
            partnerTCEquity: values.partnerTCEquity || 0,
          };
          // setPartnerTCState({ ...partnerTCBusinessDetailsObj });

          if (allApiState.TC === true) {
            // Patch
            axios
              .patch(
                `${DefaultUrl}/api/Partner-TradingCompany-Business/Update-Partner-TradingCompany/${partnerTCBusinessDetailsObj.Email}`,
                partnerTCBusinessDetailsObj
              )
              .then((res) => {
                console.log(
                  "Partner Trading Company Patch Business Has Successfully Been updated"
                );
                setPartnerTCState({ ...partnerTCBusinessDetailsObj });
              });
          } else {
            // Post
            axios
              .post(
                `${DefaultUrl}/api/Partner-TradingCompany-Business/Add-Partner-TradingCompany`,
                partnerTCBusinessDetailsObj
              )
              .then((res) => {
                console.log(
                  "Partner Trading Company Business Has Successfully Been Added"
                );
                setPartnerTCState({ ...partnerTCBusinessDetailsObj })
              });
          }



        }
        //? ****** Trading Company End ******
        break;
      case "BusinessTrust":
        // **** BUSINESS TRUST Object****

        let clientBTBusinessDetailsObj = {
          clientStructureType: values.clientStructureType || " ",
          clientOwner: values.clientOwner || " ",
          Email: localStorage.getItem("Email"),
          // **** BUSINESS TRUST ***

          clientBTName: values.clientBTName || " ",
          clientBTABN: values.clientBTABN || " ",
          clientBTAddress: values.clientBTAddress || " ",
          clientBTTrustee: values.clientBTTrustee || " ",
          clientBTTrusteeName: values.clientBTTrusteeName || " ",
          clientBTDistribution: values.clientBTDistribution || 0,
          clientBTOwnership: values.clientBTOwnership || 0,
          clientBTBusiness: values.clientBTBusiness || 0,
        };
        if (allApiState.BT === true) {
          // Patch
          axios
            .patch(
              `${DefaultUrl}/api/Client-BusinessTrust-Business/Update-Client-BusinessTrust/${clientBTBusinessDetailsObj.Email}`,
              clientBTBusinessDetailsObj
            )
            .then((res) => {
              console.log(
                "Client Business trust Patch Business Has Successfully Been updated"
              );
              console.log(clientBTBusinessDetailsObj);
              setClientBTState({ ...clientBTBusinessDetailsObj });
            });
        } else {
          // Post
          axios
            .post(
              `${DefaultUrl}/api/Client-BusinessTrust-Business/Add-Client-BusinessTrust`,
              clientBTBusinessDetailsObj
            )
            .then((res) => {
              console.log(
                "Client Business Trust Business Has Successfully Been Added"
              );
              setClientBTState({ ...clientBTBusinessDetailsObj });
              allApi("BT", true);
            });
        }

        if (values.clientOwner === "Partner") {
          //Partner
          let partnerBTBusinessDetailsObj = {
            clientStructureType: values.clientStructureType || " ",
            clientOwner: values.clientOwner || " ",
            Email: localStorage.getItem("Email"),
            // **** BUSINESS TRUST ***

            partnerBTName: values.partnerBTName || " ",
            partnerBTABN: values.partnerBTABN || " ",
            partnerBTAddress: values.partnerBTAddress || " ",
            partnerBTTrustee: values.partnerBTTrustee || " ",
            partnerBTTrusteeName: values.partnerBTTrusteeName || " ",
            partnerBTDistribution: values.partnerBTDistribution || 0,
            partnerBTOwnership: values.partnerBTOwnership || 0,
            partnerBTBusiness: values.partnerBTBusiness || 0,
          };
          // setPartnerBTState({ ...partnerBTBusinessDetailsObj });

          if (allApiState.BT === true) {
            // Patch
            axios
              .patch(
                `${DefaultUrl}/api/Partner-BusinessTrust-Business/Update-Partner-BusinessTrust/${partnerBTBusinessDetailsObj.Email}`,
                partnerBTBusinessDetailsObj
              )
              .then((res) => {
                console.log(
                  "Partner Business trust Patch Business Has Successfully Been updated"
                );
                console.log(partnerBTBusinessDetailsObj);
                setPartnerBTState({ ...partnerBTBusinessDetailsObj });
              });
          } else {
            // Post
            axios
              .post(
                `${DefaultUrl}/api/Partner-BusinessTrust-Business/Add-Partner-BusinessTrust`,
                partnerBTBusinessDetailsObj
              )
              .then((res) => {
                console.log(
                  "Partner Business Trust Business Has Successfully Been Added"
                );
                setPartnerBTState({ ...partnerBTBusinessDetailsObj });
              });
          }



        }

        //? ******BUSINESS TRUST End ******
        break;
      case "BucketCompany":
        // **** Bucket Company Object****

        let clientBCBusinessDetailsObj = {
          clientStructureType: values.clientStructureType || " ",
          clientOwner: values.clientOwner || " ",
          Email: localStorage.getItem("Email"),

          clientBCCHolding: values.clientBCCHolding || 0,
          clientBCPHolding: values.clientBCPHolding || 0,
          clientBCName: values.clientBCName || " ",
          clientBCACN: values.clientBCACN || " ",
          clientBCAddress: values.clientBCAddress || " ",
          clientBCCDirectorship: values.clientBCCDirectorship || 0,
          clientBCPDirectorship: values.clientBCPDirectorship || " ",
          clientBCCDividend: values.clientBCCDividend || 0,
          clientBCPDividend: values.clientBCPDividend || 0,
          clientBCCEquity: values.clientBCCEquity || 0,
          clientBCPEquity: values.clientBCPEquity || 0,
        };
        if (allApiState.BC === true) {
          // Patch
          // alert('goku san');
          axios
            .patch(
              `${DefaultUrl}/api/Client-BucketCompany-Business/Update-Client-BucketCompany/${clientBCBusinessDetailsObj.Email}`,
              clientBCBusinessDetailsObj
            )
            .then((res) => {
              console.log(
                "Client Bucket Company Patch Business Has Successfully Been updated"
              );
              setClientBCState({ ...clientBCBusinessDetailsObj });
            });
        } else {
          // Post
          axios
            .post(
              `${DefaultUrl}/api/Client-BucketCompany-Business/Add-Client-BucketCompany`,
              clientBCBusinessDetailsObj
            )
            .then((res) => {
              console.log(
                "Client bucket company Business Has Successfully Been Added"
              );
              setClientBCState({ ...clientBCBusinessDetailsObj });
              allApi("BC", true);
            });
        }

        if (values.clientOwner === "Partner") {

          let partnerBCBusinessDetailsObj = {
            clientStructureType: values.clientStructureType || " ",
            clientOwner: values.clientOwner || " ",
            Email: localStorage.getItem("Email"),

            partnerBCCHolding: values.partnerBCCHolding || 0,
            partnerBCPHolding: values.partnerBCPHolding || 0,
            partnerBCName: values.partnerBCName || " ",
            partnerBCACN: values.partnerBCACN || " ",
            partnerBCAddress: values.partnerBCAddress || " ",
            partnerBCCDirectorship: values.partnerBCCDirectorship || 0,
            partnerBCPDirectorship: values.partnerBCPDirectorship || " ",
            partnerBCCDividend: values.partnerBCCDividend || 0,
            partnerBCPDividend: values.partnerBCPDividend || 0,
            partnerBCCEquity: values.partnerBCCEquity || 0,
            partnerBCPEquity: values.partnerBCPEquity || 0,
          };
          if (allApiState.BC === true) {
            // Patch
            // alert('goku san');
            axios
              .patch(
                `${DefaultUrl}/api/Partner-BucketCompany-Business/Update-Partner-BucketCompany/${partnerBCBusinessDetailsObj.Email}`,
                partnerBCBusinessDetailsObj
              )
              .then((res) => {
                console.log(
                  "Partner Bucket Company Patch Business Has Successfully Been updated"
                );
                setPartnerBCState({ ...partnerBCBusinessDetailsObj });
              });
          } else {
            // Post
            axios
              .post(
                `${DefaultUrl}/api/Partner-BucketCompany-Business/Add-Partner-BucketCompany`,
                partnerBCBusinessDetailsObj)
              .then((res) => {
                console.log(
                  "Partner bucket company Business Has Successfully Been Added"
                );
                setPartnerBCState({ ...partnerBCBusinessDetailsObj });
              });
          }
        }
        //? ******Bucket Company End ******
        break;
    }

    resetForm();
  };

  let allApi = (form, isAllApi) => {

    let UpdatedObject = { ...allApiState, [form]: isAllApi };

    if ((allApiState.ST !== false) || (allApiState.PartnerShip !== false) || (allApiState.TC !== false) || (allApiState.BT !== false) || (allApiState.BC !== false) || (allApiState._id)) {
      // alert("Not All False Patch="+form);
      axios
        .patch(`${DefaultUrl}/api/Client-formFlags-Business/Update-Client-formFlags/${localStorage.getItem("Email")}`, UpdatedObject)
        .then((res) => { console.log("Updated"); setAllApiState(UpdatedObject); });
      // Patch
    }
    else {

      // alert("All False Post"+form);
      axios
        .post(`${DefaultUrl}/api/Client-formFlags-Business/Add-Client-formFlags`, UpdatedObject)
        .then((res) => { console.log("Added"); setAllApiState(UpdatedObject); });
    }


    // /api/Client-formFlags-Business/Add-Client-formFlags
  }

  let BusinessFunc = (Option, elem, deleteData) => {

    if (Option === 1) {
      setTableRenderState(false);
      // setClientAndPartnerTable(!ClientAndPartnerTable);
      // alert("UpdateFunctionality");
    } else if (Option === 2) {
      // alert("DeleteFunctionality");
      deleteApiFunc(elem, deleteData);
    }
  };
  const deleteApiFunc = (elem, deleteData) => {
    // console.log(elem);
    // eslint-disable-next-line default-case
    switch (elem.clientStructureType) {
      case "SoleTrader":
        // alert("SoleTrader");
        if (deleteData === 'Client') {
          axios.delete(`${DefaultUrl}/api/Client-SoleTrader-Business/Delete-Client-SoleTrader/${elem.Email}`)
            .then((res) => {
              console.log("client Sole Trader has been deleted");
              setClientSTState({});
              allApi('ST', false);
            });
        } else {
          axios.delete(`${DefaultUrl}/api/Partner-SoleTrader-Business/Delete-Partner-SoleTrader/${elem.Email}`)
            .then((res) => {
              console.log("partner Sole Trader has been deleted");
              setPartnerSTState({});
            });

        }
        break;
      case "Partnership":
        // alert("Partnership");
        if (deleteData === 'Client') {
          axios.delete(`${DefaultUrl}/api/Client-Partnership-Business/Delete-Client-Partnership/${elem.Email}`)
            .then((res) => {
              console.log("client PartnerShip has been deleted")
              setClientPartnerShipState({});
              allApi('PartnerShip', false);
            });
        } else {
          axios.delete(`${DefaultUrl}/api/Partner-Partnership-Business/Delete-Partner-Partnership/${elem.Email}`)
            .then((res) => {
              console.log("partner PartnerShip has been deleted");
              setPartnerPartnerShipState({});
            });
        }
        break;
      case "TradingCompany":
        // alert("TradingCompany");
        if (deleteData === 'Client') {
          axios.delete(`${DefaultUrl}/api/Client-TradingCompany-Business/Delete-Client-TradingCompany/${elem.Email}`)
            .then((res) => {
              console.log("client TradingCompany has been deleted")
              setClientTCState({});
              allApi('TC', false);
            });
        } else {
          axios.delete(`${DefaultUrl}/api/Partner-TradingCompany-Business/Delete-Partner-TradingCompany/${elem.Email}`)
            .then((res) => {
              console.log("partner TradingCompany has been deleted");
              setPartnerTCState({});
            });
        }
        break;
      case "BusinessTrust":
        // alert("BusinessTrust");
        if (deleteData === 'Client') {
          axios.delete(`${DefaultUrl}/api/Client-BusinessTrust-Business/Delete-Client-BusinessTrust/${elem.Email}`)
            .then((res) => {
              console.log("client BusinessTrust has been deleted")
              setClientBTState({});
              allApi('BT', false);
            });
        } else {
          axios.delete(`${DefaultUrl}/api/Partner-BusinessTrust-Business/Delete-Partner-BusinessTrust/${elem.Email}`)
            .then((res) => {
              console.log("partner BusinessTrust has been deleted");
              setPartnerBTState({});
            });
        }
        break;
      case "BucketCompany":
        // alert("BucketCompany");
        if (deleteData === 'Client') {
          axios.delete(`${DefaultUrl}/api/Client-BucketCompany-Business/Delete-Client-BucketCompany/${elem.Email}`)
            .then((res) => {
              console.log("client BucketCompany has been deleted")
              setClientBCState({});
              allApi('BC', false);
            });
        } else {
          axios.delete(`${DefaultUrl}/api/Partner-BucketCompany-Business/Delete-Partner-BucketCompany/${elem.Email}`)
            .then((res) => {
              console.log("partner Bucket Company has been deleted");
              setPartnerBCState({});
            });
        }
        break;
    }
  }

  const replicateOption = (option, setValues, setFieldValue) => {
    setFieldValue('clientStructureType', option);
    
    // eslint-disable-next-line default-case
    switch (option) {
      case "SoleTrader":
        if ((allApiState.ST === true) && (clientSTState.clientSTBusinessName !== " ") && (clientSTState.clientSTBusinessName)) {
          if (clientSTState.clientOwner === "Partner") {
            setValues({ ...clientSTState, ...partnerSTState });
          }
          else {
            setValues({ ...clientSTState });
          }
        }
        break;
      case "Partnership":
        if ((allApiState.PartnerShip === true) && (clientPartnerShipState.clientPartnershipName !== " ") && (clientPartnerShipState.clientPartnershipName)) {
          if (clientPartnerShipState.clientOwner === "Partner") {
            setValues({ ...clientPartnerShipState, ...partnerPartnerShipState });
          }
          else {
            setValues({ ...clientPartnerShipState });
          }
        }
        break;
      case "TradingCompany":
        if ((allApiState.TC === true) && (clientTCstate.clientTCName !== " ") && (clientTCstate.clientTCName)) {
          if (clientTCstate.clientOwner === "Partner") {
            setValues({ ...clientTCstate, ...partnerTCstate });
          }
          else {
            setValues({ ...clientTCstate });
          }
        }
        break;
      case "BusinessTrust":
        if ((allApiState.BT === true) && (clientBTState.clientBTName !== " ") && (clientBTState.clientBTName)) {
          if (clientBTState.clientOwner === "Partner") {
            setValues({ ...clientBTState, ...partnerBTState });
          }
          else {
            setValues({ ...clientBTState });
          }
        }
        break;
      case "BucketCompany":
        if ((allApiState.BC === true) && (clientBCState.clientBCName !== " ") && (clientBCState.clientBCName)) {
          if (clientBCState.clientOwner === "Partner") {
            setValues({ ...clientBCState, ...partnerBCState });
          }
          else {
            setValues({ ...clientBCState });
          }
        }
        break;
    }
  }

  return (
    <>
      <div className="container-fluid mt-4 ">
        <div className="row m-0 px-0">
          <div className="col-md-2"></div>
          <div className="col-md-12">
            <Formik
              initialValues={initialValues}
              // validationSchema={
              //   isPartnered ? validationSchema 
              // }
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({ values, setFieldValue, setValues, handleChange, formik }) => (
                <Form>
                  {/*------------------------------------Sole Trader - Client------------------------------------*/}
                  <div className="row">
                    <div className="col-12">
                      {(tableRenderState === false) &&
                        <Card className="shadow  px-4 py-4 borderOverAll">
                          <h3 className="heading">
                            Business Entities
                            <div className="iconContainerLg">
                              <img
                                className="img-fluid"
                                src={businessman}
                                alt=""
                              />
                            </div>
                          </h3>
                          <div className="row">
                            <div className="col-4 mb-3"></div>
                            <div className='col-4 mb-3 text-center'><label>
                              Client
                              <div className="iconContainerLg">
                                <img src={single} alt="single svg" className="w-50 " />
                              </div>
                            </label>
                            </div>


                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientStructureType"
                                className="form-label"
                              >
                                Structure Type
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                as="select"
                                className="form-control shadow inputDesign form-select"
                                id="clientStructureType"
                                name="clientStructureType"
                                placeholder="client Structure Type"
                                onChange={(e) => {
                                  replicateOption(e.target.value, setValues, setFieldValue);
                                }}
                              >
                                <option value="">Select</option>
                                <option value="SoleTrader">Sole Trader</option>
                                <option value="Partnership">Partnership</option>
                                <option value="TradingCompany">Trading Company</option>
                                <option value="BusinessTrust">Business Trust</option>
                                <option value="BucketCompany">Bucket Company</option>
                              </Field>
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientStructureType"
                              />
                            </div>

                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientOwner"
                                className="form-label"
                              >
                                Owner
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                as='select'
                                className="form-control inputDesign shadow form-select"
                                id="clientOwner"
                                name="clientOwner"
                                placeholder="clientOwner"
                              >
                                <option value="">Select</option>
                                <option value="Client">Client</option>
                                <option value="Partner">Partner </option>
                              </Field>
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientOwner"
                              />
                            </div>

                          </div>




                        </Card>
                      }

                    </div>
                  </div>
                  {/*Start Sole Trader */}
                  {values.clientStructureType === "SoleTrader" &&
                    <div className="row my-3">
                      <div className="col-12">
                        <Card className="shadow  px-4 py-4 borderOverAll">

                          <h3 className="heading">
                            Sole Trader
                            <div className="iconContainerLg">
                              <img
                                className="img-fluid"
                                src={businessman}
                                alt=""
                              />
                            </div>
                          </h3>
                          <div className="row">
                            <div className="col-4 mb-3"></div>
                            <div className='col-4 mb-3 text-center'><label>
                              Client
                              <div className="iconContainerLg">
                                <img src={single} alt="single svg" className="w-50 " />
                              </div>
                            </label>
                            </div>
                            {values.clientOwner === "Partner" &&
                              <div className="col-4 mb-3 text-center"><label>
                                Partner
                                <div className="iconContainerLg">
                                  <img src={couple} alt="single svg" className="w-50 " />
                                </div>
                              </label>
                              </div>
                            }

                          </div>

                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientSTBusinessName"
                                className="form-label"
                              >
                                Business Name
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="clientSTBusinessName"
                                name="clientSTBusinessName"
                                placeholder="Business Name"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientSTBusinessName"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="text"
                                  className="form-control inputDesign shadow inputDesign"
                                  id="partnerSTBusinessName"
                                  name="partnerSTBusinessName"
                                  placeholder="Business Name"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerSTBusinessName"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientSTABN"
                                className="form-label"
                              >
                                ABN
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="text"
                                className="form-control inputDesign shadow"
                                id="clientSTABN"
                                name="clientSTABN"
                                placeholder="ABN"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientSTABN"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="text"
                                  className="form-control inputDesign shadow"
                                  id="partnerSTABN"
                                  name="partnerSTABN"
                                  placeholder="ABN"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerSTABN"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientSTBusinessAddress"
                                className="form-label"
                              >
                                Business Address
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="text"
                                className="form-control inputDesign shadow"
                                id="clientSTBusinessAddress"
                                name="clientSTBusinessAddress"
                                placeholder="Business Address"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientSTBusinessAddress"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="text"
                                  className="form-control inputDesign shadow"
                                  id="partnerSTBusinessAddress"
                                  name="partnerSTBusinessAddress"
                                  placeholder="Business Address"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerSTBusinessAddress"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientSTBusinessIncome"
                                className="form-label"
                              >
                                Net Business Income
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="clientSTBusinessIncome"
                                name="clientSTBusinessIncome"
                                placeholder="Net Business Income"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientSTBusinessIncome"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow"
                                  id="partnerSTBusinessIncome"
                                  name="partnerSTBusinessIncome"
                                  placeholder="Net Business Income"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerSTBusinessIncome"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientSTGoodwill"
                                className="form-label"
                              >
                                Goodwill/Business Valuation
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="clientSTGoodwill"
                                name="clientSTGoodwill"
                                placeholder="Business Valuation"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientSTGoodwill"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow"
                                  id="partnerSTGoodwill"
                                  name="partnerSTGoodwill"
                                  placeholder="Business Valuation"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerSTGoodwill"
                                />
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
                              {((allApiState.ST) || (allApiState.PartnerShip) || (allApiState.TC) || (allApiState.BT) || (allApiState.BC)) &&
                                <button
                                  type="button"
                                  className="float-end btn btn-outline w-25 mx-3 backBtn modalBtn"
                                  onClick={() => { setTableRenderState(true); setFieldValue('clientStructureType', ""); }}>
                                  Cancel
                                </button>}
                            </div>
                          </div>


                        </Card>
                      </div>
                    </div>}
                  {/*End Sole Trader */}
                  {/*Start Partnership */}
                  {values.clientStructureType === "Partnership" &&
                    <div className="row my-3">
                      <div className="col-12">
                        <Card className="shadow  px-4 py-4 borderOverAll">
                          <h3 className="heading">
                            Partnership
                            <div className="iconContainerLg">
                              <img
                                className="img-fluid"
                                src={businessman}
                                alt=""
                              />
                            </div>
                          </h3>
                          <div className="row">
                            <div className="col-4 mb-3"></div>
                            <div className='col-4 mb-3'><label>
                              Client
                              <div className="iconContainerLg">
                                <img src={single} alt="single svg" className="w-50 " />
                              </div>
                            </label>
                            </div>
                            {values.clientOwner === "Partner" &&
                              <div className="col-4 mb-3"><label>
                                Partner
                                <div className="iconContainerLg">
                                  <img src={couple} alt="single svg" className="w-50 " />
                                </div>
                              </label>
                              </div>
                            }

                          </div>

                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientPartnershipName"
                                className="form-label"
                              >
                                Business Name
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="clientPartnershipName"
                                name="clientPartnershipName"
                                placeholder="Business Name"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientPartnershipName"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="text"
                                  className="form-control inputDesign shadow inputDesign"
                                  id="partnerPartnershipName"
                                  name="partnerPartnershipName"
                                  placeholder="Business Name"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerPartnershipName"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientPartnershipABN"
                                className="form-label"
                              >
                                ABN
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="text"
                                className="form-control inputDesign shadow"
                                id="clientPartnershipABN"
                                name="clientPartnershipABN"
                                placeholder="ABN"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientPartnershipABN"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="text"
                                  className="form-control inputDesign shadow"
                                  id="partnerPartnershipABN"
                                  name="partnerPartnershipABN"
                                  placeholder="ABN"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerPartnershipABN"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientPartnershipAddress"
                                className="form-label"
                              >
                                Bussiness Address
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="text"
                                className="form-control inputDesign shadow"
                                id="clientPartnershipAddress"
                                name="clientPartnershipAddress"
                                placeholder="Business Address"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientPartnershipAddress"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="text"
                                  className="form-control inputDesign shadow"
                                  id="partnerPartnershipAddress"
                                  name="partnerPartnershipAddress"
                                  placeholder="Business Address"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerPartnershipAddress"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientPartnershipIncome"
                                className="form-label"
                              >
                                Net Business Income
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="clientPartnershipIncome"
                                name="clientPartnershipIncome"
                                placeholder="Net Business Income"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientPartnershipIncome"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow"
                                  id="partnerPartnershipIncome"
                                  name="partnerPartnershipIncome"
                                  placeholder="Net Business Income"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerPartnershipIncome"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientPartnershipPartnership"
                                className="form-label"
                              >
                                Partnership %
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="clientPartnershipPartnership"
                                name="clientPartnershipPartnership"
                                placeholder="Partnership %"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientPartnershipPartnership"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow"
                                  id="partnerPartnershipPartnership"
                                  name="partnerPartnershipPartnership"
                                  placeholder="Partnership %"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerPartnershipPartnership"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientPartnershipShareIncome"
                                className="form-label"
                              >
                                Share of Net Business income
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="clientPartnershipShareIncome"
                                name="clientPartnershipShareIncome"
                                placeholder=" Share of income"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientPartnershipShareIncome"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow"
                                  id="partnerPartnershipShareIncome"
                                  name="partnerPartnershipShareIncome"
                                  placeholder="Share of income"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerPartnershipShareIncome"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientPartnershipGoodwill"
                                className="form-label"
                              >
                                Goodwill/Business Valuation
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="clientPartnershipGoodwill"
                                name="clientPartnershipGoodwill"
                                placeholder="Business Valuation"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientPartnershipGoodwill"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow"
                                  id="partnerPartnershipGoodwill"
                                  name="partnerPartnershipGoodwill"
                                  placeholder="Business Valuation"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerPartnershipGoodwill"
                                />
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
                              {((allApiState.ST) || (allApiState.PartnerShip) || (allApiState.TC) || (allApiState.BT) || (allApiState.BC)) &&
                                <button
                                  type="button"
                                  className="float-end btn btn-outline w-25 mx-3 backBtn modalBtn"
                                  onClick={() => { setTableRenderState(true); setFieldValue('clientStructureType', ""); }}>
                                  Cancel
                                </button>}
                            </div>
                          </div>


                        </Card>
                      </div>
                    </div>}
                  {/*End Partnership */}
                  {/*Start Trading Company */}
                  {values.clientStructureType === "TradingCompany" &&

                    <div className="row my-3">
                      <div className="col-12">
                        <Card className="shadow  px-4 py-4 borderOverAll">
                          <h3 className="heading">
                            Trading Company
                            <div className="iconContainerLg">
                              <img
                                className="img-fluid"
                                src={businessman}
                                alt=""
                              />
                            </div>
                          </h3>
                          <div className="row">
                            <div className="col-4 mb-3"></div>
                            <div className='col-4 mb-3'><label>
                              Client
                              <div className="iconContainerLg">
                                <img src={single} alt="single svg" className="w-50 " />
                              </div>
                            </label>
                            </div>
                            {values.clientOwner === "Partner" &&
                              <div className="col-4 mb-3"><label>
                                Partner
                                <div className="iconContainerLg">
                                  <img src={couple} alt="single svg" className="w-50 " />
                                </div>
                              </label>
                              </div>
                            }

                          </div>

                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientTCName"
                                className="form-label"
                              >
                                Business Name
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="clientTCName"
                                name="clientTCName"
                                placeholder="Business Name"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientTCName"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="text"
                                  className="form-control inputDesign shadow inputDesign"
                                  id="partnerTCName"
                                  name="partnerTCName"
                                  placeholder="Business Name"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerTCName"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientTCABN"
                                className="form-label"
                              >
                                ABN
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="text"
                                className="form-control inputDesign shadow"
                                id="clientTCABN"
                                name="clientTCABN"
                                placeholder="ABN"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientTCABN"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="text"
                                  className="form-control inputDesign shadow"
                                  id="partnerTCABN"
                                  name="partnerTCABN"
                                  placeholder="ABN"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerTCABN"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientTCACN"
                                className="form-label"
                              >
                                ACN
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="clientTCACN"
                                name="clientTCACN"
                                placeholder="ACN"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientTCACN"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow"
                                  id="partnerTCACN"
                                  name="partnerTCACN"
                                  placeholder="ACN"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerTCACN"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientTCAddress"
                                className="form-label"
                              >
                                Business Address
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="text"
                                className="form-control inputDesign shadow"
                                id="clientTCAddress"
                                name="clientTCAddress"
                                placeholder="Business Address"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientTCAddress"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="text"
                                  className="form-control inputDesign shadow"
                                  id="partnerTCAddress"
                                  name="partnerTCAddress"
                                  placeholder="Business Address"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerTCAddress"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientTCDirectors"
                                className="form-label"
                              >
                                Number of Directors
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="clientTCDirectors"
                                name="clientTCDirectors"
                                placeholder="Business Directors"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientTCDirectors"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow"
                                  id="partnerTCDirectors"
                                  name="partnerTCDirectors"
                                  placeholder="Business Directors"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerTCDirectors"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientTCDirectorship"
                                className="form-label"
                              >
                                Directorship
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="text"
                                className="form-control inputDesign shadow"
                                id="clientTCDirectorship"
                                name="clientTCDirectorship"
                                placeholder="Business Directorship"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientTCDirectorship"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="text"
                                  className="form-control inputDesign shadow"
                                  id="partnerTCDirectorship"
                                  name="partnerTCDirectorship"
                                  placeholder="Business Directorship"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerTCDirectorship"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientTCShares"
                                className="form-label"
                              >
                                Share Holding %
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="clientTCShares"
                                name="clientTCShares"
                                placeholder="Business Shares"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientTCShares"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow"
                                  id="partnerTCShares"
                                  name="partnerTCShares"
                                  placeholder="Business Shares"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerTCShares"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientTCDividend"
                                className="form-label"
                              >
                                Dividend Received each year $
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="clientTCDividend"
                                name="clientTCDividend"
                                placeholder="Dividend Received"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientTCDividend"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow"
                                  id="partnerTCDividend"
                                  name="partnerTCDividend"
                                  placeholder="Dividend Received"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerTCDividend"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientTCEquity"
                                className="form-label"
                              >
                                Equity Position *
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="clientTCEquity"
                                name="clientTCEquity"
                                placeholder="Equity Position"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientTCEquity"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow"
                                  id="partnerTCEquity"
                                  name="partnerTCEquity"
                                  placeholder="Equity Position"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerTCEquity"
                                />
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
                              {((allApiState.ST) || (allApiState.PartnerShip) || (allApiState.TC) || (allApiState.BT) || (allApiState.BC)) &&
                                <button
                                  type="button"
                                  className="float-end btn btn-outline w-25 mx-3 backBtn modalBtn"
                                  onClick={() => { setTableRenderState(true); setFieldValue('clientStructureType', ""); }}>
                                  Cancel
                                </button>}
                            </div>
                          </div>


                        </Card>
                      </div>
                    </div>}
                  {/*End Trading Company */}

                  {/*Start Business Trust */}
                  {values.clientStructureType === "BusinessTrust" &&
                    <div className="row my-3">
                      <div className="col-12">
                        <Card className="shadow  px-4 py-4 borderOverAll">
                          <h3 className="heading">
                            Business Trust
                            <div className="iconContainerLg">
                              <img
                                className="img-fluid"
                                src={businessman}
                                alt=""
                              />
                            </div>
                          </h3>
                          <div className="row">
                            <div className="col-4 mb-3"></div>
                            <div className='col-4 mb-3'><label>
                              Client
                              <div className="iconContainerLg">
                                <img src={single} alt="single svg" className="w-50 " />
                              </div>
                            </label>
                            </div>
                            {values.clientOwner === "Partner" &&
                              <div className="col-4 mb-3"><label>
                                Partner
                                <div className="iconContainerLg">
                                  <img src={couple} alt="single svg" className="w-50 " />
                                </div>
                              </label>
                              </div>
                            }

                          </div>

                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientBTName"
                                className="form-label"
                              >
                                Business Name
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="clientBTName"
                                name="clientBTName"
                                placeholder="Business Name"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientBTName"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="text"
                                  className="form-control inputDesign shadow inputDesign"
                                  id="partnerBTName"
                                  name="partnerBTName"
                                  placeholder="Business Name"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerBTName"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientBTABN"
                                className="form-label"
                              >
                                ABN
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="text"
                                className="form-control inputDesign shadow"
                                id="clientBTABN"
                                name="clientBTABN"
                                placeholder="ABN"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientBTABN"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="text"
                                  className="form-control inputDesign shadow"
                                  id="partnerBTABN"
                                  name="partnerBTABN"
                                  placeholder="ABN"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerBTABN"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientBTAddress"
                                className="form-label"
                              >
                                Business Address
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="text"
                                className="form-control inputDesign shadow"
                                id="clientBTAddress"
                                name="clientBTAddress"
                                placeholder="Business Address"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientBTAddress"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="text"
                                  className="form-control inputDesign shadow"
                                  id="partnerBTAddress"
                                  name="partnerBTAddress"
                                  placeholder="Business Address"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerBTAddress"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientBTTrustee"
                                className="form-label"
                              >
                                Trustee Type
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                as='select'
                                className="form-control inputDesign shadow form-select"
                                id="clientBTTrustee"
                                name="clientBTTrustee"
                                placeholder="Trustee Type "
                              >
                                <option value="">Select</option>
                                <option value="Corporate">Corporate</option>
                                <option value="individual">individual</option>
                              </Field>
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientBTTrustee"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  as='select'
                                  className="form-control inputDesign shadow form-select"
                                  id="partnerBTTrustee"
                                  name="partnerBTTrustee"
                                  placeholder="Trustee Type "
                                >
                                  <option value="">Select</option>
                                  <option value="Corporate">Corporate</option>
                                  <option value="individual">individual</option>
                                </Field>
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerBTTrustee"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientBTTrusteeName"
                                className="form-label"
                              >
                                Trustee Name
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="text"
                                className="form-control inputDesign shadow"
                                id="clientBTTrusteeName"
                                name="clientBTTrusteeName"
                                placeholder="Trustee Name"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientBTTrusteeName"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="text"
                                  className="form-control inputDesign shadow"
                                  id="partnerBTTrusteeName"
                                  name="partnerBTTrusteeName"
                                  placeholder="Trustee Name"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerBTTrusteeName"
                                />
                              </div>
                            )}
                          </div>
                          {/* undefined field */}
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientBTDistribution"
                                className="form-label"
                              >
                                Distribution Received
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="clientBTDistribution"
                                name="clientBTDistribution"
                                placeholder="Distribution Received"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientBTDistribution"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow"
                                  id="partnerBTDistribution"
                                  name="partnerBTDistribution"
                                  placeholder="Distribution Received"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerBTDistribution"
                                />
                              </div>
                            )}
                          </div>
                          {/* undefined field */}
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientBTOwnership"
                                className="form-label"
                              >
                                Business Ownership
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="clientBTOwnership"
                                name="clientBTOwnership"
                                placeholder="Business Ownership"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientBTOwnership"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow"
                                  id="partnerBTOwnership"
                                  name="partnerBTOwnership"
                                  placeholder="Business Ownership"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerBTOwnership"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientBTBusiness"
                                className="form-label"
                              >
                                Business Valuation
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="clientBTBusiness"
                                name="clientBTBusiness"
                                placeholder="Business Valuation"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientBTBusiness"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow"
                                  id="partnerBTBusiness"
                                  name="partnerBTBusiness"
                                  placeholder="Business Valuation"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerBTBusiness"
                                />
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

                              {((allApiState.ST) || (allApiState.PartnerShip) || (allApiState.TC) || (allApiState.BT) || (allApiState.BC)) &&
                                <button
                                  type="button"
                                  className="float-end btn btn-outline w-25 mx-3 backBtn modalBtn"
                                  onClick={() => { setTableRenderState(true); setFieldValue('clientStructureType', ""); }}>
                                  Cancel
                                </button>}
                            </div>
                          </div>


                        </Card>
                      </div>
                    </div>}
                  {/*End Business Trust */}

                  {/*Start Bucket Company */}
                  {values.clientStructureType === "BucketCompany" &&
                    <div className="row my-3">
                      <div className="col-12">
                        <Card className="shadow  px-4 py-4 borderOverAll">
                          <h3 className="heading">
                            Bucket Company
                            <div className="iconContainerLg">
                              <img
                                className="img-fluid"
                                src={businessman}
                                alt=""
                              />
                            </div>
                          </h3>
                          <div className="row">
                            <div className="col-4 mb-3"></div>
                            <div className='col-4 mb-3'><label>
                              Client
                              <div className="iconContainerLg">
                                <img src={single} alt="single svg" className="w-50 " />
                              </div>
                            </label>
                            </div>
                            {values.clientOwner === "Partner" &&
                              <div className="col-4 mb-3"><label>
                                Partner
                                <div className="iconContainerLg">
                                  <img src={couple} alt="single svg" className="w-50 " />
                                </div>
                              </label>
                              </div>
                            }

                          </div>

                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientBCCHolding"
                                className="form-label"
                              >
                                Client Share Holding %
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="number"
                                className="form-control shadow inputDesign"
                                id="clientBCCHolding"
                                name="clientBCCHolding"
                                placeholder="Share Holding "
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientBCCHolding"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow inputDesign"
                                  id="partnerBCCHolding"
                                  name="partnerBCCHolding"
                                  placeholder="Share Holding "
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerBCCHolding"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientBCPHolding"
                                className="form-label"
                              >
                                Partner Share Holding %
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="clientBCPHolding"
                                name="clientBCPHolding"
                                placeholder="Share Holding"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientBCPHolding"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow"
                                  id="partnerBCPHolding"
                                  name="partnerBCPHolding"
                                  placeholder="Share Holding"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerBCPHolding"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientBCName"
                                className="form-label"
                              >
                                Company Name
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="text"
                                className="form-control inputDesign shadow"
                                id="clientBCName"
                                name="clientBCName"
                                placeholder="Company Name"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientBCName"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="text"
                                  className="form-control inputDesign shadow"
                                  id="partnerBCName"
                                  name="partnerBCName"
                                  placeholder="Company Name"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerBCName"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientBCACN"
                                className="form-label"
                              >
                                ACN
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="text"
                                className="form-control inputDesign shadow"
                                id="clientBCACN"
                                name="clientBCACN"
                                placeholder="ACN"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientBCACN"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="text"
                                  className="form-control inputDesign shadow"
                                  id="partnerBCACN"
                                  name="partnerBCACN"
                                  placeholder="ACN"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerBCACN"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientBCAddress"
                                className="form-label"
                              >
                                Business Address
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="text"
                                className="form-control inputDesign shadow"
                                id="clientBCAddress"
                                name="clientBCAddress"
                                placeholder="Business Address"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientBCAddress"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="text"
                                  className="form-control inputDesign shadow"
                                  id="partnerBCAddress"
                                  name="partnerBCAddress"
                                  placeholder="Business Address"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerBCAddress"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientBCCDirectorship"
                                className="form-label"
                              >
                                Client Directorship
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="clientBCCDirectorship"
                                name="clientBCCDirectorship"
                                placeholder="Client Directorship"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientBCCDirectorship"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow"
                                  id="partnerBCCDirectorship"
                                  name="partnerBCCDirectorship"
                                  placeholder="Client Directorship "
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerBCCDirectorship"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientBCPDirectorship"
                                className="form-label"
                              >
                                Partnership Directorship
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="text"
                                className="form-control inputDesign shadow"
                                id="clientBCPDirectorship"
                                name="clientBCPDirectorship"
                                placeholder=" Partnership Directorship"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientBCPDirectorship"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="text"
                                  className="form-control inputDesign shadow"
                                  id="partnerBCPDirectorship"
                                  name="partnerBCPDirectorship"
                                  placeholder=" Partnership Directorship"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerBCPDirectorship"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientBCCDividend"
                                className="form-label"
                              >
                                Client Dividend Received each year
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="clientBCCDividend"
                                name="clientBCCDividend"
                                placeholder="Dividend Received each year"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientBCCDividend"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow"
                                  id="partnerBCCDividend"
                                  name="partnerBCCDividend"
                                  placeholder="Dividend Received each year"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerBCCDividend"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientBCPDividend"
                                className="form-label"
                              >
                                Partner Dividend Received each year
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="clientBCPDividend"
                                name="clientBCPDividend"
                                placeholder=" Dividend Received each year"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientBCPDividend"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow"
                                  id="partnerBCPDividend"
                                  name="partnerBCPDividend"
                                  placeholder=" Dividend Received each year"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerBCPDividend"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientBCCEquity"
                                className="form-label"
                              >
                                Client Equity Position
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="clientBCCEquity"
                                name="clientBCCEquity"
                                placeholder=" Client Equity Position"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientBCCEquity"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow"
                                  id="partnerBCCEquity"
                                  name="partnerBCCEquity"
                                  placeholder=" Client Equity Position"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerBCCEquity"
                                />
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-4 mb-3">
                              <label
                                htmlFor="clientBCPEquity"
                                className="form-label"
                              >
                                Partner Equity Position
                              </label>
                            </div>
                            <div className='col-4 mb-3'>
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="clientBCPEquity"
                                name="clientBCPEquity"
                                placeholder=" Partner Equity Position"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="clientBCPEquity"
                              />
                            </div>
                            {values.clientOwner === "Partner" && (
                              <div className="col-4 mb-3">
                                <Field
                                  type="number"
                                  className="form-control inputDesign shadow"
                                  id="partnerBCPEquity"
                                  name="partnerBCPEquity"
                                  placeholder=" Partner Equity Position"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="partnerBCPEquity"
                                />
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

                              {((allApiState.ST) || (allApiState.PartnerShip) || (allApiState.TC) || (allApiState.BT) || (allApiState.BC)) &&
                                <button
                                  type="button"
                                  className="float-end btn btn-outline w-25 mx-3 backBtn modalBtn"
                                  onClick={() => { setTableRenderState(true); setFieldValue('clientStructureType', ""); }}>
                                  Cancel
                                </button>}

                            </div>
                          </div>


                        </Card>
                      </div>
                    </div>}
                  {/*End Bucket Company */}



                  {/* table client and partner */}
                  <div className="row">
                    <div className="col-12">
                      {(tableRenderState === true) &&
                        <Card className="shadow  px-4 py-4 borderOverAll">
                          <h3 className="heading text-center">
                            Business Entities
                            <div className="iconContainerLg">
                              <img
                                className="img-fluid"
                                src={businessman}
                                alt=""
                              />
                            </div>
                          </h3>
                          <div className="row">
                            {/*  table  */}

                            <div className="table-responsive my-3" id="childTable">
                              <table className="table table-bordered table-hover text-center">
                                <thead className="text-light" id="tableHead">
                                  <tr>
                                    <th>Name</th>
                                    <th>Business Name</th>
                                    <th>Structure</th>
                                    <th>Income Received</th>
                                    <th>Income Type</th>
                                    <th>Business Valuation/Equity</th>
                                    <th>Business Ownership</th>
                                    <th onClick={(e) => { console.log(allApiState) }}>Opt</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {((clientSTState.clientSTBusinessName !== " ") && (clientSTState.clientSTBusinessName)) && <tr>
                                    <td>{ClientNameGet}</td>
                                    <td>{clientSTState.clientSTBusinessName}</td>
                                    <td>{clientSTState.clientStructureType}</td>
                                    <td>{clientSTState.clientSTBusinessIncome}</td>
                                    <td>Net Profit</td>
                                    <td>{clientSTState.clientSTBusinessIncome}</td>
                                    <td>100%</td>
                                    <td><CustomDropDown Operations={BusinessFunc}
                                      Delete={"Client"}
                                      Data={clientSTState.clientOwner === "Partner" ? { ...clientSTState, ...partnerSTState } : clientSTState}
                                      FormikFun={setValues} />
                                    </td>
                                  </tr>}


                                  {((clientPartnerShipState.clientPartnershipName !== " ") && (clientPartnerShipState.clientPartnershipName)) && <tr>
                                    <td>{ClientNameGet}</td>
                                    <td>{clientPartnerShipState.clientPartnershipName}</td>
                                    <td>{clientPartnerShipState.clientStructureType}</td>
                                    <td>{clientPartnerShipState.clientPartnershipIncome}</td>
                                    <td>Share of Net Profit</td>
                                    <td>{clientPartnerShipState.clientPartnershipShareIncome}</td>
                                    <td>{clientPartnerShipState.clientPartnershipPartnership}%</td>
                                    <td><CustomDropDown Operations={BusinessFunc}
                                      Delete={"Client"}
                                      Data={clientPartnerShipState.clientOwner === "Partner" ? { ...clientPartnerShipState, ...partnerPartnerShipState } : clientPartnerShipState}
                                      FormikFun={setValues} />
                                    </td>
                                  </tr>}


                                  {((clientTCstate.clientTCName !== " ") && (clientTCstate.clientTCName)) && <tr>
                                    <td>{ClientNameGet}</td>
                                    <td>{clientTCstate.clientTCName}</td>
                                    <td>{clientTCstate.clientStructureType}</td>
                                    <td>{clientTCstate.clientTCDividend}</td>
                                    <td>Dividend </td>
                                    <td>{clientTCstate.clientTCEquity}</td>
                                    <td>{clientTCstate.clientTCShares}</td>
                                    <td><CustomDropDown Operations={BusinessFunc}
                                      Delete={"Client"}
                                      Data={clientTCstate.clientOwner === "Partner" ? { ...clientTCstate, ...partnerTCstate } : clientTCstate}
                                      FormikFun={setValues} />
                                    </td>
                                  </tr>}

                                  {((clientBTState.clientBTName !== " ") && (clientBTState.clientBTName)) && <tr>
                                    <td>{ClientNameGet}</td>
                                    <td>{clientBTState.clientBTName}</td>
                                    <td>{clientBTState.clientStructureType}</td>
                                    <td>{clientBTState.clientBTDistribution}</td>
                                    <td>Distribution  </td>
                                    <td>{clientBTState.clientBTDistribution}</td>
                                    <td>{clientBTState.clientBTOwnership}</td>
                                    <td><CustomDropDown Operations={BusinessFunc}
                                      Delete={"Client"}
                                      Data={clientBTState.clientOwner === "Partner" ? { ...clientBTState, ...partnerBTState } : clientBTState}
                                      FormikFun={setValues} />
                                    </td>
                                  </tr>}

                                  {((clientBCState.clientBCName !== " ") && (clientBCState.clientBCName)) && <tr>
                                    <td>{ClientNameGet}</td>
                                    <td>{clientBCState.clientBCName}</td>
                                    <td>{clientBCState.clientStructureType}</td>
                                    <td>{clientBCState.clientBCCDividend}</td>
                                    <td>Dividend</td>
                                    <td>{clientBCState.clientBCCEquity}</td>
                                    <td>{clientBCState.clientBCCEquity}</td>
                                    <td><CustomDropDown Operations={BusinessFunc}
                                      Delete={"Client"}
                                      Data={clientBCState.clientOwner === "Partner" ? { ...clientBCState, ...partnerBCState } : clientBCState}
                                      FormikFun={setValues} />
                                    </td>
                                  </tr>}


                                  {/* Partner */}

                                  {((partnerSTState.partnerSTBusinessName !== " ") && (partnerSTState.partnerSTBusinessName)) && <tr>
                                    <td>{PartnerNameGet}</td>
                                    <td>{partnerSTState.partnerSTBusinessName}</td>
                                    <td>{partnerSTState.clientStructureType}</td>
                                    <td>{partnerSTState.partnerSTBusinessIncome}</td>
                                    <td>Net Profit</td>
                                    <td>{partnerSTState.partnerSTBusinessIncome}</td>
                                    <td>100%</td>
                                    <td><CustomDropDown Operations={BusinessFunc}
                                      Delete={"Partner"}
                                      Data={{ ...clientSTState, ...partnerSTState }}
                                      FormikFun={setValues} />
                                    </td>
                                  </tr>}

                                  {((partnerPartnerShipState.partnerPartnershipName !== " ") && (partnerPartnerShipState.partnerPartnershipName)) && <tr>
                                    <td>{PartnerNameGet}</td>
                                    <td>{partnerPartnerShipState.partnerPartnershipName}</td>
                                    <td>{partnerPartnerShipState.clientStructureType}</td>
                                    <td>{partnerPartnerShipState.partnerPartnershipIncome}</td>
                                    <td>Share of Net Profit</td>
                                    <td>{partnerPartnerShipState.partnerPartnershipShareIncome}</td>
                                    <td>{partnerPartnerShipState.partnerPartnershipPartnership}%</td>
                                    <td><CustomDropDown Operations={BusinessFunc}
                                      Delete={"Partner"}
                                      Data={{ ...clientPartnerShipState, ...partnerPartnerShipState }}
                                      FormikFun={setValues} />
                                    </td>
                                  </tr>}

                                  {((partnerTCstate.partnerTCName !== " ") && (partnerTCstate.partnerTCName)) && <tr>
                                    <td>{PartnerNameGet}</td>
                                    <td>{partnerTCstate.partnerTCName}</td>
                                    <td>{partnerTCstate.clientStructureType}</td>
                                    <td>{partnerTCstate.partnerTCDividend}</td>
                                    <td>Dividend </td>
                                    <td>{partnerTCstate.partnerTCEquity}</td>
                                    <td>{partnerTCstate.partnerTCShares}</td>
                                    <td><CustomDropDown Operations={BusinessFunc}
                                      Delete={"Partner"}
                                      Data={{ ...clientTCstate, ...partnerTCstate }}
                                      FormikFun={setValues} />
                                    </td>
                                  </tr>}

                                  {((partnerBTState.partnerBTName !== " ") && (partnerBTState.partnerBTName)) &&
                                    <tr>
                                      <td>{PartnerNameGet}</td>
                                      <td>{partnerBTState.partnerBTName}</td>
                                      <td>{partnerBTState.clientStructureType}</td>
                                      <td>{partnerBTState.partnerBTDistribution}</td>
                                      <td>Distribution </td>
                                      <td>{partnerBTState.partnerBTDistribution}</td>
                                      <td>{partnerBTState.partnerBTOwnership}</td>
                                      <td><CustomDropDown Operations={BusinessFunc}
                                        Delete={"Partner"}
                                        Data={{ ...clientBTState, ...partnerBTState }}
                                        FormikFun={setValues} />
                                      </td>
                                    </tr>}

                                  {((partnerBCState.partnerBCName !== " ") && (partnerBCState.partnerBCName)) && <tr>
                                    <td>{ClientNameGet}</td>
                                    <td>{partnerBCState.partnerBCName}</td>
                                    <td>{partnerBCState.clientStructureType}</td>
                                    <td>{partnerBCState.partnerBCCDividend}</td>
                                    <td>Dividend</td>
                                    <td>{partnerBCState.partnerBCPEquity}</td>
                                    <td>{partnerBCState.partnerBCPEquity}</td>
                                    <td><CustomDropDown Operations={BusinessFunc}
                                      Delete={"Partner"}
                                      Data={{ ...clientBCState, ...partnerBCState }}
                                      FormikFun={setValues} />
                                    </td>
                                  </tr>}

                                </tbody>
                              </table>
                            </div>

                            {/*  table  */}
                          </div>
                          <div className="row mt-5">
                            <div className="col-md-12">
                              <button
                                type="button"
                                className="float-end btn w-25  bgColor modalBtn"
                                onClick={nextbuttonHandler}
                              >
                                Next
                              </button>
                              <button
                                type="button"
                                className="float-end btn btn-outline w-25 mx-3 backBtn modalBtn"
                                onClick={() => setTableRenderState(false)}>
                                Add New
                              </button>
                            </div>
                          </div>
                        </Card>}
                    </div>
                  </div>
                  {/* table client and partner */}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessTextStucture;
