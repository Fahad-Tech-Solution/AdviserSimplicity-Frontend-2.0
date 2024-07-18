import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./businessTextStructure.css"
import plus from "./images/plus.svg"
import notebook from "./images/notebook.svg"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SuperDetails = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let initialValues = {

    SuperDetail:"Yes",

    //ClientSuper1
    ClientSuper1:"No",
    ClientSuper1FundName:"",
    ClientSuper1CurrentBalance:"",
    ClientSuper1TaxFreeComponent:"",
    ClientSuper1PensionRollbackYear:"",
    ClientSuper1RollbackTaxComponent:"",
    ClientSuper1TaxableComponent:"",
    ClientSuper1RiskProfile:"",
    ClientSuper1Fees:"",
    ClientSuper1AdviserFees:"",
    ClientSuper1Investment:"",
    ClientSuper1IncomeYield:"",
    ClientSuper1Growth:"",
    ClientSuper1Franking:"",
    ClientSuper1Insurance:"",
    ClientSuper1YearsInclude:"",
    ClientSuper1Indexation:"",
    ClientSuper1RolloverBenefits:"",
    ClientSuper1RolloverYear: "",
    //ClientSuper2
    ClientSuper2:"No",
    ClientSuper2FundName:"",
    ClientSuper2CurrentBalance:"",
    ClientSuper2TaxFreeComponent:"",
    ClientSuper2PensionRollbackYear:"",
    ClientSuper2RollbackTaxComponent:"",
    ClientSuper2TaxableComponent:"",
    ClientSuper2RiskProfile:"",
    ClientSuper2Fees:"",
    ClientSuper2AdviserFees:"",
    ClientSuper2Investment:"",
    ClientSuper2IncomeYield:"",
    ClientSuper2Growth:"",
    ClientSuper2Franking:"",
    ClientSuper2Insurance:"",
    ClientSuper2YearsInclude:"",
    ClientSuper2Indexation:"",
    ClientSuper2RolloverBenefits:"",
    ClientSuper2RolloverYear:"",


      //PartnerSuper1
      PartnerSuper1:"No",
      PartnerSuper1FundName:"",
      PartnerSuper1CurrentBalance:"",
      PartnerSuper1TaxFreeComponent:"",
      PartnerSuper1PensionRollbackYear:"",
      PartnerSuper1RollbackTaxComponent:"",
      PartnerSuper1TaxableComponent:"",
      PartnerSuper1RiskProfile:"",
      PartnerSuper1Fees:"",
      PartnerSuper1AdviserFees:"",
      PartnerSuper1Investment:"",
      PartnerSuper1IncomeYield:"",
      PartnerSuper1Growth:"",
      PartnerSuper1Franking:"",
      PartnerSuper1Insurance:"",
      PartnerSuper1YearsInclude:"",
      PartnerSuper1Indexation:"",
      PartnerSuper1RolloverBenefits:"",
      PartnerSuper1RolloverYear: "",
      //PartnerSuper2
      PartnerSuper2:"No",
      PartnerSuper2FundName:"",
      PartnerSuper2CurrentBalance:"",
      PartnerSuper2TaxFreeComponent:"",
      PartnerSuper2PensionRollbackYear:"",
      PartnerSuper2RollbackTaxComponent:"",
      PartnerSuper2TaxableComponent:"",
      PartnerSuper2RiskProfile:"",
      PartnerSuper2Fees:"",
      PartnerSuper2AdviserFees:"",
      PartnerSuper2Investment:"",
      PartnerSuper2IncomeYield:"",
      PartnerSuper2Growth:"",
      PartnerSuper2Franking:"",
      PartnerSuper2Insurance:"",
      PartnerSuper2YearsInclude:"",
      PartnerSuper2Indexation:"",
      PartnerSuper2RolloverBenefits:"",
      PartnerSuper2RolloverYear:"",



  }

  let validationSchema = Yup.object({
    // clientValidation
   
    // Super1
    // ClientSuper1
    ClientSuper1FundName:Yup.string().when("ClientSuper1", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientSuper1CurrentBalance:Yup.number().when("ClientSuper1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientSuper1TaxFreeComponent:Yup.number().when("ClientSuper1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientSuper1PensionRollbackYear:Yup.number().when("ClientSuper1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientSuper1RollbackTaxComponent:Yup.number().when("ClientSuper1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only

    ClientSuper1RiskProfile:Yup.string().when("ClientSuper1", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientSuper1Fees:Yup.number().when("ClientSuper1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientSuper1AdviserFees:Yup.number().when("ClientSuper1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientSuper1Investment:Yup.string().when("ClientSuper1", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required

    ClientSuper1Insurance:Yup.number().when("ClientSuper1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only

    ClientSuper1YearsInclude:Yup.string().when("ClientSuper1", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientSuper1Indexation:Yup.string().when("ClientSuper1", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientSuper1RolloverBenefits:Yup.string().when("ClientSuper1", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientSuper1RolloverYear :Yup.string().when("ClientSuper1", {
      is: (val) => val && val.length == 3,
      then: Yup.string()
      .required('Required')
      .test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('ClientSuper1YearsInclude')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
        }),
      otherwise: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('ClientSuper1YearsInclude')));
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),    
    }),//TO must be Grater then From
    
   // Super2
    // ClientSuper2
    ClientSuper2FundName:Yup.string().when("ClientSuper2", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientSuper2CurrentBalance:Yup.number().when("ClientSuper2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientSuper2TaxFreeComponent:Yup.number().when("ClientSuper2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientSuper2PensionRollbackYear:Yup.number().when("ClientSuper2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientSuper2RollbackTaxComponent:Yup.number().when("ClientSuper2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only

    ClientSuper2RiskProfile:Yup.string().when("ClientSuper2", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientSuper2Fees:Yup.number().when("ClientSuper2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientSuper2AdviserFees:Yup.number().when("ClientSuper2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientSuper2Investment:Yup.string().when("ClientSuper2", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required

    ClientSuper2Insurance:Yup.number().when("ClientSuper2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only

    ClientSuper2YearsInclude:Yup.string().when("ClientSuper2", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientSuper2Indexation:Yup.string().when("ClientSuper2", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientSuper2RolloverBenefits:Yup.string().when("ClientSuper2", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientSuper2RolloverYear :Yup.string().when("ClientSuper2", {
      is: (val) => val && val.length == 3,
      then: Yup.string()
      .required('Required')
      .test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('ClientSuper2YearsInclude')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
        }),
      otherwise: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('ClientSuper2YearsInclude')));
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),    
    }),//TO must be Grater then From
    

    //Partner

    // Super1
    // PartnerSuper1
    PartnerSuper1FundName:Yup.string().when("PartnerSuper1", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    PartnerSuper1CurrentBalance:Yup.number().when("PartnerSuper1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    PartnerSuper1TaxFreeComponent:Yup.number().when("PartnerSuper1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    PartnerSuper1PensionRollbackYear:Yup.number().when("PartnerSuper1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    PartnerSuper1RollbackTaxComponent:Yup.number().when("PartnerSuper1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only

    PartnerSuper1RiskProfile:Yup.string().when("PartnerSuper1", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    PartnerSuper1Fees:Yup.number().when("PartnerSuper1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    PartnerSuper1AdviserFees:Yup.number().when("PartnerSuper1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    PartnerSuper1Investment:Yup.string().when("PartnerSuper1", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required

    PartnerSuper1Insurance:Yup.number().when("PartnerSuper1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only

    PartnerSuper1YearsInclude:Yup.string().when("PartnerSuper1", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    PartnerSuper1Indexation:Yup.string().when("PartnerSuper1", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    PartnerSuper1RolloverBenefits:Yup.string().when("PartnerSuper1", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    PartnerSuper1RolloverYear :Yup.string().when("PartnerSuper1", {
      is: (val) => val && val.length == 3,
      then: Yup.string()
      .required('Required')
      .test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('PartnerSuper1YearsInclude')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
        }),
      otherwise: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('PartnerSuper1YearsInclude')));
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),    
    }),//TO must be Grater then From
    
   // Super2
    // PartnerSuper2
    PartnerSuper2FundName:Yup.string().when("PartnerSuper2", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    PartnerSuper2CurrentBalance:Yup.number().when("PartnerSuper2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    PartnerSuper2TaxFreeComponent:Yup.number().when("PartnerSuper2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    PartnerSuper2PensionRollbackYear:Yup.number().when("PartnerSuper2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    PartnerSuper2RollbackTaxComponent:Yup.number().when("PartnerSuper2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only

    PartnerSuper2RiskProfile:Yup.string().when("PartnerSuper2", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    PartnerSuper2Fees:Yup.number().when("PartnerSuper2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    PartnerSuper2AdviserFees:Yup.number().when("PartnerSuper2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    PartnerSuper2Investment:Yup.string().when("PartnerSuper2", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required

    PartnerSuper2Insurance:Yup.number().when("PartnerSuper2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only

    PartnerSuper2YearsInclude:Yup.string().when("PartnerSuper2", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    PartnerSuper2Indexation:Yup.string().when("PartnerSuper2", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    PartnerSuper2RolloverBenefits:Yup.string().when("PartnerSuper2", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    PartnerSuper2RolloverYear :Yup.string().when("PartnerSuper2", {
      is: (val) => val && val.length == 3,
      then: Yup.string()
      .required('Required')
      .test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('PartnerSuper2YearsInclude')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
        }),
      otherwise: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('PartnerSuper2YearsInclude')));
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),    
    }),//TO must be Grater then From

  })
  let onSubmit = (values) => {

    let clientObj = {
      ClientSuper1:values.ClientSuper1,
      ClientSuper1FundName:values.ClientSuper1FundName,
      ClientSuper1CurrentBalance:values.ClientSuper1CurrentBalance,
      ClientSuper1TaxFreeComponent:values.ClientSuper1TaxFreeComponent,
      ClientSuper1PensionRollbackYear:values.ClientSuper1PensionRollbackYear,
      ClientSuper1RollbackTaxComponent:values.ClientSuper1RollbackTaxComponent,
      ClientSuper1TaxableComponent:values.ClientSuper1TaxableComponent,
      ClientSuper1RiskProfile:values.ClientSuper1RiskProfile,
      ClientSuper1Fees:values.ClientSuper1Fees,
      ClientSuper1AdviserFees:values.ClientSuper1AdviserFees,
      ClientSuper1Investment:values.ClientSuper1Investment,
      ClientSuper1IncomeYield:values.ClientSuper1IncomeYield,
      ClientSuper1Growth:values.ClientSuper1Growth,
      ClientSuper1Franking:values.ClientSuper1Franking,
      ClientSuper1Insurance:values.ClientSuper1Insurance,
      ClientSuper1YearsInclude:values.ClientSuper1YearsInclude,
      ClientSuper1Indexation:values.ClientSuper1Indexation,
      ClientSuper1RolloverBenefits:values.ClientSuper1RolloverBenefits,
      ClientSuper1RolloverYear:values.ClientSuper1RolloverYear,

      ClientSuper2:values.ClientSuper1,
      // ClientSuper1FundName:values.ClientSuper1FundName,
      // ClientSuper1CurrentBalance:values.ClientSuper1CurrentBalance,
      // ClientSuper1TaxFreeComponent:values.ClientSuper1TaxFreeComponent,
      // ClientSuper1PensionRollbackYear:values.ClientSuper1PensionRollbackYear,
      // ClientSuper1RollbackTaxComponent:values.ClientSuper1RollbackTaxComponent,
      // ClientSuper1TaxableComponent:values.ClientSuper1TaxableComponent,
      // ClientSuper1RiskProfile:values.ClientSuper1RiskProfile,
      // ClientSuper1Fees:values.ClientSuper1Fees,
      // ClientSuper1AdviserFees:values.ClientSuper1AdviserFees,
      // ClientSuper1Investment:values.ClientSuper1Investment,
      // ClientSuper1IncomeYield:values.ClientSuper1IncomeYield,
      // ClientSuper1Growth:values.ClientSuper1Growth,
      // ClientSuper1Franking:values.ClientSuper1Franking,
      // ClientSuper1Insurance:values.ClientSuper1Insurance,
      // ClientSuper1YearsInclude:values.ClientSuper1YearsInclude,
      // ClientSuper1Indexation:values.ClientSuper1Indexation,
      // ClientSuper1RolloverBenefits:values.ClientSuper1RolloverBenefits,
      // ClientSuper1RolloverYear:values.ClientSuper1RolloverYear,

    }

    let partnerObj = {
      PartnerSuper1:values.PartnerSuper1,
      PartnerSuper1FundName:values.PartnerSuper1FundName,
      PartnerSuper1CurrentBalance:values.PartnerSuper1CurrentBalance,
      PartnerSuper1TaxFreeComponent:values.PartnerSuper1TaxFreeComponent,
      PartnerSuper1PensionRollbackYear:values.PartnerSuper1PensionRollbackYear,
      PartnerSuper1RollbackTaxComponent:values.PartnerSuper1RollbackTaxComponent,
      PartnerSuper1TaxableComponent:values.PartnerSuper1TaxableComponent,
      PartnerSuper1RiskProfile:values.PartnerSuper1RiskProfile,
      PartnerSuper1Fees:values.PartnerSuper1Fees,
      PartnerSuper1AdviserFees:values.PartnerSuper1AdviserFees,
      PartnerSuper1Investment:values.PartnerSuper1Investment,
      PartnerSuper1IncomeYield:values.PartnerSuper1IncomeYield,
      PartnerSuper1Growth:values.PartnerSuper1Growth,
      PartnerSuper1Franking:values.PartnerSuper1Franking,
      PartnerSuper1Insurance:values.PartnerSuper1Insurance,
      PartnerSuper1YearsInclude:values.PartnerSuper1YearsInclude,
      PartnerSuper1Indexation:values.PartnerSuper1Indexation,
      PartnerSuper1RolloverBenefits:values.PartnerSuper1RolloverBenefits,
      PartnerSuper1RolloverYear:values.PartnerSuper1RolloverYear,

      PartnerSuper2:values.PartnerSuper1,
      // PartnerSuper1FundName:values.PartnerSuper1FundName,
      // PartnerSuper1CurrentBalance:values.PartnerSuper1CurrentBalance,
      // PartnerSuper1TaxFreeComponent:values.PartnerSuper1TaxFreeComponent,
      // PartnerSuper1PensionRollbackYear:values.PartnerSuper1PensionRollbackYear,
      // PartnerSuper1RollbackTaxComponent:values.PartnerSuper1RollbackTaxComponent,
      // PartnerSuper1TaxableComponent:values.PartnerSuper1TaxableComponent,
      // PartnerSuper1RiskProfile:values.PartnerSuper1RiskProfile,
      // PartnerSuper1Fees:values.PartnerSuper1Fees,
      // PartnerSuper1AdviserFees:values.PartnerSuper1AdviserFees,
      // PartnerSuper1Investment:values.PartnerSuper1Investment,
      // PartnerSuper1IncomeYield:values.PartnerSuper1IncomeYield,
      // PartnerSuper1Growth:values.PartnerSuper1Growth,
      // PartnerSuper1Franking:values.PartnerSuper1Franking,
      // PartnerSuper1Insurance:values.PartnerSuper1Insurance,
      // PartnerSuper1YearsInclude:values.PartnerSuper1YearsInclude,
      // PartnerSuper1Indexation:values.PartnerSuper1Indexation,
      // PartnerSuper1RolloverBenefits:values.PartnerSuper1RolloverBenefits,
      // PartnerSuper1RolloverYear:values.PartnerSuper1RolloverYear,

    }

    console.log("client", clientObj);
    console.log("partner", partnerObj);

    handleClose();

  }
  return (
    <>


    <label className="form-label"> Super Details  </label>
      <br />
      
      <button
        type="button"
        className="btn btn-outline-success"
        onClick={handleShow}
      >
        <div className="iconContainer mx-1">
          <img className="img-fluid" src={plus} alt="" />

        </div>
        Enter Details
      </button>





      {/* --------------------------------------------------------------- */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        className="modal-xl"
        keyboard={false}
      >
        <Modal.Header
          className="text-light modalBG "
          closeButton
        >
          <Modal.Title className="fontStyle">
            Super Details
            <div className="iconContainerLg">
              <img className="img-fluid" src={notebook} alt="" />

            </div>
          </Modal.Title>
        </Modal.Header>

        <Formik initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize>
          {({ values, handleChange, setFieldValue, handleBlur }) => (
            <Form>
              <Modal.Body>
                
                <div className="row mb-4">
                  
                  <div className="col-md-3">
                  <label className="form-label">Super Detail Forms</label>
                    <div className="form-check form-switch p-0  ">
                      <div className="radiobutton w-25">
                        <input type="radio" name="SuperDetail" id="SuperDetail1"
                          onChange={handleChange} value="Yes"
                          checked={values.SuperDetail == "Yes"} />
                        <label htmlFor="SuperDetail1" className="label1 w-50">
                          <span>Client</span>
                        </label>
                        <input type="radio" name="SuperDetail" id="SuperDetail2"
                          onChange={handleChange} value="No"

                          checked={values.SuperDetail == "No"} />
                        <label htmlFor="SuperDetail2" className="label2 w-50">
                          <span>Partner</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  
                </div>


                {values.SuperDetail == "Yes" && <>
                    {/* Client Super1 Form */}
                    <div>
                    <div classname="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                          Client  Super 1
                          </label>

                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="ClientSuper1" id="ClientSuper1opt1"
                                onChange={handleChange} value="Yes"
                                checked={values.ClientSuper1 == "Yes"} />
                              <label htmlFor="ClientSuper1opt1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="ClientSuper1" id="ClientSuper1opt2"
                                onChange={handleChange} value="No"

                                checked={values.ClientSuper1 == "No"} />
                              <label htmlFor="ClientSuper1opt2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}


                        </div>
                      </div>
                    </div>

                    {/* First Row */}

                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientSuper1FundName" className="form-label">
                            Super Fund Name
                          </label>
                          <Field
                            id="ClientSuper1FundName"
                            name='ClientSuper1FundName'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientSuper1 === "Yes" ? false : true}
                          >
                            <option value="">Select</option>
                            <option value="AMIST Super">AMIST Super</option>
                            <option value="AMP My North Super -Choice">AMP My North Super -Choice</option>
                            <option value="AMP My North Super -Core">AMP My North Super -Core</option>
                            <option value="AMP My North Super -Select">AMP My North Super -Select</option>
                            <option value="ANZ Smart Choice">ANZ Smart Choice</option>
                            <option value="ANZ Smart Choice Super">ANZ Smart Choice Super</option>
                            <option value="Asgard Elements Super Account">Asgard Elements Super Account</option>
                            <option value="Asgard eWRAP Super Account">Asgard eWRAP Super Account</option>
                            <option value="Asgard Infinity - Core">Asgard Infinity - Core</option>
                            <option value="Asgard Infinity - Core & Shares">Asgard Infinity - Core & Shares</option>
                            <option value="Asgard Infinity - Full">Asgard Infinity - Full</option>
                            <option value="Asgard Infinity - Full & Shares">Asgard Infinity - Full & Shares</option>
                            <option value="Asgard Infinity - Select">Asgard Infinity - Select</option>
                            <option value="Asgard Infinity - Select & Shares">Asgard Infinity - Select & Shares</option>
                            <option value="Australian Catholic Super & Retirement Fund">Australian Catholic Super & Retirement Fund</option>
                            <option value="AustralianSuper">AustralianSuper</option>
                            <option value="BT Panorama Super">BT Panorama Super</option>
                            <option value="BT SuperWrap Personal Super Plan">BT SuperWrap Personal Super Plan</option>
                            <option value="Care Super">Care Super</option>
                            <option value="CBUS Super">CBUS Super</option>
                            <option value="CFS FirstWrap Plus Super">CFS FirstWrap Plus Super</option>
                            <option value="Christian Super">Christian Super</option>
                            <option value="ClearView WealthSolutions Super">ClearView WealthSolutions Super</option>
                            <option value="Club Super">Club Super</option>
                            <option value="Colonial First State - Fristchoice Wholesale Personal Super">Colonial First State - Fristchoice Wholesale Personal Super</option>
                            <option value="Combined Super">Combined Super</option>
                            <option value="Energy Super">Energy Super</option>
                            <option value="Equipsuper (MyFuture)`">Equipsuper (MyFuture)`</option>
                            <option value="First State Super">First State Super</option>
                            <option value="First Super">First Super</option>
                            <option value="HESTA Super">HESTA Super</option>
                            <option value="HOSTPLUS">HOSTPLUS</option>
                            <option value="HUB24 Super">HUB24 Super</option>
                            <option value="ING Direct Living Super">ING Direct Living Super</option>
                            <option value="Intrust Super (Core)">Intrust Super (Core)</option>
                            <option value="IOOF Pursuit Focus Personal Super">IOOF Pursuit Focus Personal Super</option>
                            <option value="IOOF Pursuit Select Personal Super">IOOF Pursuit Select Personal Super</option>
                            <option value="Kinetic Super">Kinetic Super</option>
                            <option value="Legalsuper">Legalsuper</option>
                            <option value="LGIAsuper Accumulation">LGIAsuper Accumulation</option>
                            <option value="Local Govt Super - Accumulation (NSW)">Local Govt Super - Accumulation (NSW)</option>
                            <option value="LUCRF">LUCRF</option>
                            <option value="Macquarie Super Accumulator">Macquarie Super Accumulator</option>
                            <option value="Maritime Super (Acc Advantage)">Maritime Super (Acc Advantage)</option>
                            <option value="Meat Industry Employees Super">Meat Industry Employees Super</option>
                            <option value="Media Super">Media Super</option>
                            <option value="Mercer Portfolio Service Super">Mercer Portfolio Service Super</option>
                            <option value="Mercer SmartSuper - Individual">Mercer SmartSuper - Individual</option>
                            <option value="Mine Wealth + Wellbeing Super">Mine Wealth + Wellbeing Super</option>
                            <option value="MTAA Super">MTAA Super</option>
                            <option value="My Life My Super">My Life My Super</option>
                            <option value="Nationwide Super">Nationwide Super</option>
                            <option value="NESS Super">NESS Super</option>
                            <option value="NGS Super">NGS Super</option>
                            <option value="OnePath OneAnswer Frontier Personal Super">OnePath OneAnswer Frontier Personal Super</option>
                            <option value="Prime Super">Prime Super</option>
                            <option value="QIEC Super">QIEC Super</option>
                            <option value="QSuper Accumulation Account">QSuper Accumulation Account</option>
                            <option value="REI Super">REI Super</option>
                            <option value="REST Super">REST Super</option>
                            <option value="SMSF">SMSF</option>
                            <option value="Statewide Super">Statewide Super</option>
                            <option value="Sunsuper">Sunsuper</option>
                            <option value="Super SA - Triple S">Super SA - Triple S</option>
                            <option value="Tasplan">Tasplan</option>
                            <option value="TelstraSuper Personal Plus">TelstraSuper Personal Plus</option>
                            <option value="Total Super Benefits">Total Super Benefits</option>
                            <option value="TWU Super">TWU Super</option>
                            <option value="UniSuper">UniSuper</option>
                            <option value="VIC Super">VIC Super</option>
                            <option value="Vision Super (Saver)">Vision Super (Saver)</option>
                            <option value="VISSF Super">VISSF Super</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientSuper1FundName" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper1CurrentBalance"
                            className="form-label"
                          >
                            Current Super Balance
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper1CurrentBalance"
                            name='ClientSuper1CurrentBalance'
                            placeholder="Current Super Balance"
                            disabled={values.ClientSuper1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper1CurrentBalance' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper1TaxFreeComponent"
                            className="form-label"
                          >
                            Tax-Free Component
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper1TaxFreeComponent"
                            name='ClientSuper1TaxFreeComponent'
                            placeholder="Tax-Free Component"
                            disabled={values.ClientSuper1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper1TaxFreeComponent' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper1PensionRollbackYear"
                            className="form-label"
                          >
                            Pension Rollback In Year 1
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper1PensionRollbackYear"
                            name='ClientSuper1PensionRollbackYear'
                            placeholder="Pension Rollback In Year 1"
                            disabled={values.ClientSuper1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper1PensionRollbackYear' />
                        </div>
                      </div>


                    </div>

                    {/* Second Row */}

                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper1RollbackTaxComponent"
                            className="form-label"
                          >
                          Rollback Tax-Free Component
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper1RollbackTaxComponent"
                            name='ClientSuper1RollbackTaxComponent'
                            placeholder="Rollback Tax-Free Component"
                            disabled={values.ClientSuper1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper1RollbackTaxComponent' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper1TaxableComponent"
                            className="form-label"
                          >
                            Taxable Component
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper1TaxableComponent"
                            name='ClientSuper1TaxableComponent'
                            placeholder="Taxable Component"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper1TaxableComponent' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientSuper1RiskProfile" className="form-label">
                            Risk Profile
                          </label>
                          <Field
                            id="ClientSuper1RiskProfile"
                            name='ClientSuper1RiskProfile'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientSuper1 === "Yes" ? false : true}>
                            <option value="Select">Select</option>
                            <option value="Cash">Cash</option>
                            <option value="Cautious">Cautious</option>
                            <option value="Conservative">Conservative</option>
                            <option value="Balanced">Balanced</option>
                            <option value="Growth">Growth</option>
                            <option value="High Growth">High Growth</option>
                            <option value="International Shares">International Shares</option>
                            <option value="Property">Property</option>
                            <option value="Australia Fixed Interest">Australia Fixed Interest</option>
                            <option value="International Fixed Interest">International Fixed Interest</option>
                            <option value="Australian Shares">Australian Shares</option>
                            <option value="Other">Other</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientSuper1RiskProfile" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper1Fees"
                            className="form-label"
                          >
                            Fees
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper1Fees"
                            name='ClientSuper1Fees'
                            placeholder="Fees"
                            disabled={values.ClientSuper1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper1Fees' />
                        </div>
                      </div>



                    </div>

                    {/* Third Row */}

                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper1AdviserFees"
                            className="form-label"
                          >
                            Adviser Service Fees
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper1AdviserFees"
                            name='ClientSuper1AdviserFees'
                            placeholder="Adviser Service Fees"
                            disabled={values.ClientSuper1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper1AdviserFees' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientSuper1Investment" className="form-label">
                            Investment Returns
                          </label>
                          <Field
                            id="ClientSuper1Investment"
                            name='ClientSuper1Investment'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientSuper1 === "Yes" ? false : true}
                          >
                            <option value="">Select</option>
                            <option value="System">System</option>
                            <option value="Input Override">Input Override</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientSuper1Investment" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper1IncomeYield"
                            className="form-label"
                          >
                            Income Yield
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper1IncomeYield"
                            name='ClientSuper1IncomeYield'
                            placeholder="Income Yield"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper1IncomeYield' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper1Growth"
                            className="form-label"
                          >
                            Growth
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper1Growth"
                            name='ClientSuper1Growth'
                            placeholder="Growth"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper1Growth' />
                        </div>
                      </div>

                    </div>
                    {/* Fourth Row  */}

                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper1Franking"
                            className="form-label"
                          >
                            Franking
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper1Franking"
                            name='ClientSuper1Franking'
                            placeholder="Franking"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper1Franking' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper1Insurance"
                            className="form-label"
                          >
                            Insurance Premiums
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper1Insurance"
                            name='ClientSuper1Insurance'
                            placeholder="Insurance Premiums"
                            disabled={values.ClientSuper1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper1Insurance' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientSuper1YearsInclude" className="form-label">
                            Years to Include
                          </label>
                          <Field
                            id="ClientSuper1YearsInclude"
                            name='ClientSuper1YearsInclude'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientSuper1 === "Yes" ? false : true}

                          >
                            <option value="">Select</option>
                            <option value="0">0</option>
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientSuper1YearsInclude" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientSuper1Indexation" className="form-label">
                            Indexation Of Premiums
                          </label>
                          <Field
                            id="ClientSuper1Indexation"
                            name='ClientSuper1Indexation'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientSuper1 === "Yes" ? false : true}

                          >
                            <option value="">Select</option>
                            <option value="0.00%">0.00%</option>
                            <option value="0.50%">0.50%</option>
                            <option value="1.00%">1.00%</option>
                            <option value="1.50%">1.50%</option>
                            <option value="2.00%">2.00%</option>
                            <option value="2.50%">2.50%</option>
                            <option value="3.00%">3.00%</option>
                            <option value="3.50%">3.50%</option>
                            <option value="4.00%">4.00%</option>
                            <option value="4.50%">4.50%</option>
                            <option value="5.00%">5.00%</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientSuper1Indexation" />
                        </div>
                      </div>

                    </div>

                    {/* Fifth Row */}
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientSuper1RolloverBenefits" className="form-label">
                            Rollover Benefits To Fund
                          </label>
                          <Field
                            id="ClientSuper1RolloverBenefits"
                            name='ClientSuper1RolloverBenefits'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientSuper1 === "Yes" ? false : true}
                          >
                            <option value="">Select</option>
                            <option value="N/A">N/A</option>
                            <option value="SMSF">SMSF</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientSuper1RolloverBenefits" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientSuper1RolloverYear" className="form-label">
                          Rollover Benefits At End Year
                          </label>
                          <Field
                            id="ClientSuper1RolloverYear"
                            name='ClientSuper1RolloverYear'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientSuper1 === "Yes" ? false : true}

                          >
                            <option value="">Select</option>
                            <option value="0">0</option>
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientSuper1RolloverYear" />
                        </div>
                      </div>

                    </div>

                  </div>
                  {/* Client Super1 Form */}


                  {/* Client Super2 Form */}
                  <div>
                    <div classname="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                          Client  Super 1
                          </label>

                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="ClientSuper2" id="ClientSuper2opt1"
                                onChange={handleChange} value="Yes"
                                checked={values.ClientSuper2 == "Yes"} />
                              <label htmlFor="ClientSuper2opt1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="ClientSuper2" id="ClientSuper2opt2"
                                onChange={handleChange} value="No"

                                checked={values.ClientSuper2 == "No"} />
                              <label htmlFor="ClientSuper2opt2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}


                        </div>
                      </div>
                    </div>

                    {/* First Row */}

                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientSuper2FundName" className="form-label">
                            Super Fund Name
                          </label>
                          <Field
                            id="ClientSuper2FundName"
                            name='ClientSuper2FundName'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientSuper2 === "Yes" ? false : true}
                          >
                            <option value="">Select</option>
                            <option value="AMIST Super">AMIST Super</option>
                            <option value="AMP My North Super -Choice">AMP My North Super -Choice</option>
                            <option value="AMP My North Super -Core">AMP My North Super -Core</option>
                            <option value="AMP My North Super -Select">AMP My North Super -Select</option>
                            <option value="ANZ Smart Choice">ANZ Smart Choice</option>
                            <option value="ANZ Smart Choice Super">ANZ Smart Choice Super</option>
                            <option value="Asgard Elements Super Account">Asgard Elements Super Account</option>
                            <option value="Asgard eWRAP Super Account">Asgard eWRAP Super Account</option>
                            <option value="Asgard Infinity - Core">Asgard Infinity - Core</option>
                            <option value="Asgard Infinity - Core & Shares">Asgard Infinity - Core & Shares</option>
                            <option value="Asgard Infinity - Full">Asgard Infinity - Full</option>
                            <option value="Asgard Infinity - Full & Shares">Asgard Infinity - Full & Shares</option>
                            <option value="Asgard Infinity - Select">Asgard Infinity - Select</option>
                            <option value="Asgard Infinity - Select & Shares">Asgard Infinity - Select & Shares</option>
                            <option value="Australian Catholic Super & Retirement Fund">Australian Catholic Super & Retirement Fund</option>
                            <option value="AustralianSuper">AustralianSuper</option>
                            <option value="BT Panorama Super">BT Panorama Super</option>
                            <option value="BT SuperWrap Personal Super Plan">BT SuperWrap Personal Super Plan</option>
                            <option value="Care Super">Care Super</option>
                            <option value="CBUS Super">CBUS Super</option>
                            <option value="CFS FirstWrap Plus Super">CFS FirstWrap Plus Super</option>
                            <option value="Christian Super">Christian Super</option>
                            <option value="ClearView WealthSolutions Super">ClearView WealthSolutions Super</option>
                            <option value="Club Super">Club Super</option>
                            <option value="Colonial First State - Fristchoice Wholesale Personal Super">Colonial First State - Fristchoice Wholesale Personal Super</option>
                            <option value="Combined Super">Combined Super</option>
                            <option value="Energy Super">Energy Super</option>
                            <option value="Equipsuper (MyFuture)`">Equipsuper (MyFuture)`</option>
                            <option value="First State Super">First State Super</option>
                            <option value="First Super">First Super</option>
                            <option value="HESTA Super">HESTA Super</option>
                            <option value="HOSTPLUS">HOSTPLUS</option>
                            <option value="HUB24 Super">HUB24 Super</option>
                            <option value="ING Direct Living Super">ING Direct Living Super</option>
                            <option value="Intrust Super (Core)">Intrust Super (Core)</option>
                            <option value="IOOF Pursuit Focus Personal Super">IOOF Pursuit Focus Personal Super</option>
                            <option value="IOOF Pursuit Select Personal Super">IOOF Pursuit Select Personal Super</option>
                            <option value="Kinetic Super">Kinetic Super</option>
                            <option value="Legalsuper">Legalsuper</option>
                            <option value="LGIAsuper Accumulation">LGIAsuper Accumulation</option>
                            <option value="Local Govt Super - Accumulation (NSW)">Local Govt Super - Accumulation (NSW)</option>
                            <option value="LUCRF">LUCRF</option>
                            <option value="Macquarie Super Accumulator">Macquarie Super Accumulator</option>
                            <option value="Maritime Super (Acc Advantage)">Maritime Super (Acc Advantage)</option>
                            <option value="Meat Industry Employees Super">Meat Industry Employees Super</option>
                            <option value="Media Super">Media Super</option>
                            <option value="Mercer Portfolio Service Super">Mercer Portfolio Service Super</option>
                            <option value="Mercer SmartSuper - Individual">Mercer SmartSuper - Individual</option>
                            <option value="Mine Wealth + Wellbeing Super">Mine Wealth + Wellbeing Super</option>
                            <option value="MTAA Super">MTAA Super</option>
                            <option value="My Life My Super">My Life My Super</option>
                            <option value="Nationwide Super">Nationwide Super</option>
                            <option value="NESS Super">NESS Super</option>
                            <option value="NGS Super">NGS Super</option>
                            <option value="OnePath OneAnswer Frontier Personal Super">OnePath OneAnswer Frontier Personal Super</option>
                            <option value="Prime Super">Prime Super</option>
                            <option value="QIEC Super">QIEC Super</option>
                            <option value="QSuper Accumulation Account">QSuper Accumulation Account</option>
                            <option value="REI Super">REI Super</option>
                            <option value="REST Super">REST Super</option>
                            <option value="SMSF">SMSF</option>
                            <option value="Statewide Super">Statewide Super</option>
                            <option value="Sunsuper">Sunsuper</option>
                            <option value="Super SA - Triple S">Super SA - Triple S</option>
                            <option value="Tasplan">Tasplan</option>
                            <option value="TelstraSuper Personal Plus">TelstraSuper Personal Plus</option>
                            <option value="Total Super Benefits">Total Super Benefits</option>
                            <option value="TWU Super">TWU Super</option>
                            <option value="UniSuper">UniSuper</option>
                            <option value="VIC Super">VIC Super</option>
                            <option value="Vision Super (Saver)">Vision Super (Saver)</option>
                            <option value="VISSF Super">VISSF Super</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientSuper2FundName" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper2CurrentBalance"
                            className="form-label"
                          >
                            Current Super Balance
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper2CurrentBalance"
                            name='ClientSuper2CurrentBalance'
                            placeholder="Current Super Balance"
                            disabled={values.ClientSuper2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper2CurrentBalance' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper2TaxFreeComponent"
                            className="form-label"
                          >
                            Tax-Free Component
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper2TaxFreeComponent"
                            name='ClientSuper2TaxFreeComponent'
                            placeholder="Tax-Free Component"
                            disabled={values.ClientSuper2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper2TaxFreeComponent' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper2PensionRollbackYear"
                            className="form-label"
                          >
                            Pension Rollback In Year 1
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper2PensionRollbackYear"
                            name='ClientSuper2PensionRollbackYear'
                            placeholder="Pension Rollback In Year 1"
                            disabled={values.ClientSuper2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper2PensionRollbackYear' />
                        </div>
                      </div>


                    </div>

                    {/* Second Row */}

                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper2RollbackTaxComponent"
                            className="form-label"
                          >
                          Rollback Tax-Free Component
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper2RollbackTaxComponent"
                            name='ClientSuper2RollbackTaxComponent'
                            placeholder="Rollback Tax-Free Component"
                            disabled={values.ClientSuper2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper2RollbackTaxComponent' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper2TaxableComponent"
                            className="form-label"
                          >
                            Taxable Component
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper2TaxableComponent"
                            name='ClientSuper2TaxableComponent'
                            placeholder="Taxable Component"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper2TaxableComponent' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientSuper2RiskProfile" className="form-label">
                            Risk Profile
                          </label>
                          <Field
                            id="ClientSuper2RiskProfile"
                            name='ClientSuper2RiskProfile'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientSuper2 === "Yes" ? false : true}>
                            <option value="Select">Select</option>
                            <option value="Cash">Cash</option>
                            <option value="Cautious">Cautious</option>
                            <option value="Conservative">Conservative</option>
                            <option value="Balanced">Balanced</option>
                            <option value="Growth">Growth</option>
                            <option value="High Growth">High Growth</option>
                            <option value="International Shares">International Shares</option>
                            <option value="Property">Property</option>
                            <option value="Australia Fixed Interest">Australia Fixed Interest</option>
                            <option value="International Fixed Interest">International Fixed Interest</option>
                            <option value="Australian Shares">Australian Shares</option>
                            <option value="Other">Other</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientSuper2RiskProfile" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper2Fees"
                            className="form-label"
                          >
                            Fees
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper2Fees"
                            name='ClientSuper2Fees'
                            placeholder="Fees"
                            disabled={values.ClientSuper2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper2Fees' />
                        </div>
                      </div>



                    </div>

                    {/* Third Row */}

                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper2AdviserFees"
                            className="form-label"
                          >
                            Adviser Service Fees
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper2AdviserFees"
                            name='ClientSuper2AdviserFees'
                            placeholder="Adviser Service Fees"
                            disabled={values.ClientSuper2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper2AdviserFees' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientSuper2Investment" className="form-label">
                            Investment Returns
                          </label>
                          <Field
                            id="ClientSuper2Investment"
                            name='ClientSuper2Investment'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientSuper2 === "Yes" ? false : true}
                          >
                            <option value="">Select</option>
                            <option value="System">System</option>
                            <option value="Input Override">Input Override</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientSuper2Investment" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper2IncomeYield"
                            className="form-label"
                          >
                            Income Yield
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper2IncomeYield"
                            name='ClientSuper2IncomeYield'
                            placeholder="Income Yield"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper2IncomeYield' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper2Growth"
                            className="form-label"
                          >
                            Growth
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper2Growth"
                            name='ClientSuper2Growth'
                            placeholder="Growth"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper2Growth' />
                        </div>
                      </div>

                    </div>
                    {/* Fourth Row  */}

                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper2Franking"
                            className="form-label"
                          >
                            Franking
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper2Franking"
                            name='ClientSuper2Franking'
                            placeholder="Franking"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper2Franking' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientSuper2Insurance"
                            className="form-label"
                          >
                            Insurance Premiums
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientSuper2Insurance"
                            name='ClientSuper2Insurance'
                            placeholder="Insurance Premiums"
                            disabled={values.ClientSuper2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientSuper2Insurance' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientSuper2YearsInclude" className="form-label">
                            Years to Include
                          </label>
                          <Field
                            id="ClientSuper2YearsInclude"
                            name='ClientSuper2YearsInclude'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientSuper2 === "Yes" ? false : true}

                          >
                            <option value="">Select</option>
                            <option value="0">0</option>
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientSuper2YearsInclude" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientSuper2Indexation" className="form-label">
                            Indexation Of Premiums
                          </label>
                          <Field
                            id="ClientSuper2Indexation"
                            name='ClientSuper2Indexation'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientSuper2 === "Yes" ? false : true}

                          >
                            <option value="">Select</option>
                            <option value="0.00%">0.00%</option>
                            <option value="0.50%">0.50%</option>
                            <option value="1.00%">1.00%</option>
                            <option value="1.50%">1.50%</option>
                            <option value="2.00%">2.00%</option>
                            <option value="2.50%">2.50%</option>
                            <option value="3.00%">3.00%</option>
                            <option value="3.50%">3.50%</option>
                            <option value="4.00%">4.00%</option>
                            <option value="4.50%">4.50%</option>
                            <option value="5.00%">5.00%</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientSuper2Indexation" />
                        </div>
                      </div>

                    </div>

                    {/* Fifth Row */}
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientSuper2RolloverBenefits" className="form-label">
                            Rollover Benefits To Fund
                          </label>
                          <Field
                            id="ClientSuper2RolloverBenefits"
                            name='ClientSuper2RolloverBenefits'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientSuper2 === "Yes" ? false : true}
                          >
                            <option value="">Select</option>
                            <option value="N/A">N/A</option>
                            <option value="SMSF">SMSF</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientSuper2RolloverBenefits" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientSuper2RolloverYear" className="form-label">
                          Rollover Benefits At End Year
                          </label>
                          <Field
                            id="ClientSuper2RolloverYear"
                            name='ClientSuper2RolloverYear'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientSuper2 === "Yes" ? false : true}

                          >
                            <option value="">Select</option>
                            <option value="0">0</option>
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientSuper2RolloverYear" />
                        </div>
                      </div>

                    </div>

                  </div>
                  {/* Client Super2 Form */}
              
              
                </>}

                {values.SuperDetail == "No" && <>
                    {/* Partner Super1 Form */}
                    <div>
                    <div classname="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                          Partner Super 1
                          </label>

                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="PartnerSuper1" id="PartnerSuper1opt1"
                                onChange={handleChange} value="Yes"
                                checked={values.PartnerSuper1 == "Yes"} />
                              <label htmlFor="PartnerSuper1opt1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="PartnerSuper1" id="PartnerSuper1opt2"
                                onChange={handleChange} value="No"

                                checked={values.PartnerSuper1 == "No"} />
                              <label htmlFor="PartnerSuper1opt2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}


                        </div>
                      </div>
                    </div>

                    {/* First Row */}

                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerSuper1FundName" className="form-label">
                            Super Fund Name
                          </label>
                          <Field
                            id="PartnerSuper1FundName"
                            name='PartnerSuper1FundName'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerSuper1 === "Yes" ? false : true}
                          >
                            <option value="">Select</option>
                            <option value="AMIST Super">AMIST Super</option>
                            <option value="AMP My North Super -Choice">AMP My North Super -Choice</option>
                            <option value="AMP My North Super -Core">AMP My North Super -Core</option>
                            <option value="AMP My North Super -Select">AMP My North Super -Select</option>
                            <option value="ANZ Smart Choice">ANZ Smart Choice</option>
                            <option value="ANZ Smart Choice Super">ANZ Smart Choice Super</option>
                            <option value="Asgard Elements Super Account">Asgard Elements Super Account</option>
                            <option value="Asgard eWRAP Super Account">Asgard eWRAP Super Account</option>
                            <option value="Asgard Infinity - Core">Asgard Infinity - Core</option>
                            <option value="Asgard Infinity - Core & Shares">Asgard Infinity - Core & Shares</option>
                            <option value="Asgard Infinity - Full">Asgard Infinity - Full</option>
                            <option value="Asgard Infinity - Full & Shares">Asgard Infinity - Full & Shares</option>
                            <option value="Asgard Infinity - Select">Asgard Infinity - Select</option>
                            <option value="Asgard Infinity - Select & Shares">Asgard Infinity - Select & Shares</option>
                            <option value="Australian Catholic Super & Retirement Fund">Australian Catholic Super & Retirement Fund</option>
                            <option value="AustralianSuper">AustralianSuper</option>
                            <option value="BT Panorama Super">BT Panorama Super</option>
                            <option value="BT SuperWrap Personal Super Plan">BT SuperWrap Personal Super Plan</option>
                            <option value="Care Super">Care Super</option>
                            <option value="CBUS Super">CBUS Super</option>
                            <option value="CFS FirstWrap Plus Super">CFS FirstWrap Plus Super</option>
                            <option value="Christian Super">Christian Super</option>
                            <option value="ClearView WealthSolutions Super">ClearView WealthSolutions Super</option>
                            <option value="Club Super">Club Super</option>
                            <option value="Colonial First State - Fristchoice Wholesale Personal Super">Colonial First State - Fristchoice Wholesale Personal Super</option>
                            <option value="Combined Super">Combined Super</option>
                            <option value="Energy Super">Energy Super</option>
                            <option value="Equipsuper (MyFuture)`">Equipsuper (MyFuture)`</option>
                            <option value="First State Super">First State Super</option>
                            <option value="First Super">First Super</option>
                            <option value="HESTA Super">HESTA Super</option>
                            <option value="HOSTPLUS">HOSTPLUS</option>
                            <option value="HUB24 Super">HUB24 Super</option>
                            <option value="ING Direct Living Super">ING Direct Living Super</option>
                            <option value="Intrust Super (Core)">Intrust Super (Core)</option>
                            <option value="IOOF Pursuit Focus Personal Super">IOOF Pursuit Focus Personal Super</option>
                            <option value="IOOF Pursuit Select Personal Super">IOOF Pursuit Select Personal Super</option>
                            <option value="Kinetic Super">Kinetic Super</option>
                            <option value="Legalsuper">Legalsuper</option>
                            <option value="LGIAsuper Accumulation">LGIAsuper Accumulation</option>
                            <option value="Local Govt Super - Accumulation (NSW)">Local Govt Super - Accumulation (NSW)</option>
                            <option value="LUCRF">LUCRF</option>
                            <option value="Macquarie Super Accumulator">Macquarie Super Accumulator</option>
                            <option value="Maritime Super (Acc Advantage)">Maritime Super (Acc Advantage)</option>
                            <option value="Meat Industry Employees Super">Meat Industry Employees Super</option>
                            <option value="Media Super">Media Super</option>
                            <option value="Mercer Portfolio Service Super">Mercer Portfolio Service Super</option>
                            <option value="Mercer SmartSuper - Individual">Mercer SmartSuper - Individual</option>
                            <option value="Mine Wealth + Wellbeing Super">Mine Wealth + Wellbeing Super</option>
                            <option value="MTAA Super">MTAA Super</option>
                            <option value="My Life My Super">My Life My Super</option>
                            <option value="Nationwide Super">Nationwide Super</option>
                            <option value="NESS Super">NESS Super</option>
                            <option value="NGS Super">NGS Super</option>
                            <option value="OnePath OneAnswer Frontier Personal Super">OnePath OneAnswer Frontier Personal Super</option>
                            <option value="Prime Super">Prime Super</option>
                            <option value="QIEC Super">QIEC Super</option>
                            <option value="QSuper Accumulation Account">QSuper Accumulation Account</option>
                            <option value="REI Super">REI Super</option>
                            <option value="REST Super">REST Super</option>
                            <option value="SMSF">SMSF</option>
                            <option value="Statewide Super">Statewide Super</option>
                            <option value="Sunsuper">Sunsuper</option>
                            <option value="Super SA - Triple S">Super SA - Triple S</option>
                            <option value="Tasplan">Tasplan</option>
                            <option value="TelstraSuper Personal Plus">TelstraSuper Personal Plus</option>
                            <option value="Total Super Benefits">Total Super Benefits</option>
                            <option value="TWU Super">TWU Super</option>
                            <option value="UniSuper">UniSuper</option>
                            <option value="VIC Super">VIC Super</option>
                            <option value="Vision Super (Saver)">Vision Super (Saver)</option>
                            <option value="VISSF Super">VISSF Super</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerSuper1FundName" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper1CurrentBalance"
                            className="form-label"
                          >
                            Current Super Balance
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper1CurrentBalance"
                            name='PartnerSuper1CurrentBalance'
                            placeholder="Current Super Balance"
                            disabled={values.PartnerSuper1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper1CurrentBalance' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper1TaxFreeComponent"
                            className="form-label"
                          >
                            Tax-Free Component
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper1TaxFreeComponent"
                            name='PartnerSuper1TaxFreeComponent'
                            placeholder="Tax-Free Component"
                            disabled={values.PartnerSuper1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper1TaxFreeComponent' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper1PensionRollbackYear"
                            className="form-label"
                          >
                            Pension Rollback In Year 1
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper1PensionRollbackYear"
                            name='PartnerSuper1PensionRollbackYear'
                            placeholder="Pension Rollback In Year 1"
                            disabled={values.PartnerSuper1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper1PensionRollbackYear' />
                        </div>
                      </div>


                    </div>

                    {/* Second Row */}

                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper1RollbackTaxComponent"
                            className="form-label"
                          >
                          Rollback Tax-Free Component
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper1RollbackTaxComponent"
                            name='PartnerSuper1RollbackTaxComponent'
                            placeholder="Rollback Tax-Free Component"
                            disabled={values.PartnerSuper1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper1RollbackTaxComponent' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper1TaxableComponent"
                            className="form-label"
                          >
                            Taxable Component
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper1TaxableComponent"
                            name='PartnerSuper1TaxableComponent'
                            placeholder="Taxable Component"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper1TaxableComponent' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerSuper1RiskProfile" className="form-label">
                            Risk Profile
                          </label>
                          <Field
                            id="PartnerSuper1RiskProfile"
                            name='PartnerSuper1RiskProfile'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerSuper1 === "Yes" ? false : true}>
                            <option value="Select">Select</option>
                            <option value="Cash">Cash</option>
                            <option value="Cautious">Cautious</option>
                            <option value="Conservative">Conservative</option>
                            <option value="Balanced">Balanced</option>
                            <option value="Growth">Growth</option>
                            <option value="High Growth">High Growth</option>
                            <option value="International Shares">International Shares</option>
                            <option value="Property">Property</option>
                            <option value="Australia Fixed Interest">Australia Fixed Interest</option>
                            <option value="International Fixed Interest">International Fixed Interest</option>
                            <option value="Australian Shares">Australian Shares</option>
                            <option value="Other">Other</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerSuper1RiskProfile" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper1Fees"
                            className="form-label"
                          >
                            Fees
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper1Fees"
                            name='PartnerSuper1Fees'
                            placeholder="Fees"
                            disabled={values.PartnerSuper1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper1Fees' />
                        </div>
                      </div>



                    </div>

                    {/* Third Row */}

                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper1AdviserFees"
                            className="form-label"
                          >
                            Adviser Service Fees
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper1AdviserFees"
                            name='PartnerSuper1AdviserFees'
                            placeholder="Adviser Service Fees"
                            disabled={values.PartnerSuper1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper1AdviserFees' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerSuper1Investment" className="form-label">
                            Investment Returns
                          </label>
                          <Field
                            id="PartnerSuper1Investment"
                            name='PartnerSuper1Investment'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerSuper1 === "Yes" ? false : true}
                          >
                            <option value="">Select</option>
                            <option value="System">System</option>
                            <option value="Input Override">Input Override</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerSuper1Investment" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper1IncomeYield"
                            className="form-label"
                          >
                            Income Yield
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper1IncomeYield"
                            name='PartnerSuper1IncomeYield'
                            placeholder="Income Yield"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper1IncomeYield' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper1Growth"
                            className="form-label"
                          >
                            Growth
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper1Growth"
                            name='PartnerSuper1Growth'
                            placeholder="Growth"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper1Growth' />
                        </div>
                      </div>

                    </div>
                    {/* Fourth Row  */}

                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper1Franking"
                            className="form-label"
                          >
                            Franking
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper1Franking"
                            name='PartnerSuper1Franking'
                            placeholder="Franking"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper1Franking' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper1Insurance"
                            className="form-label"
                          >
                            Insurance Premiums
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper1Insurance"
                            name='PartnerSuper1Insurance'
                            placeholder="Insurance Premiums"
                            disabled={values.PartnerSuper1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper1Insurance' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerSuper1YearsInclude" className="form-label">
                            Years to Include
                          </label>
                          <Field
                            id="PartnerSuper1YearsInclude"
                            name='PartnerSuper1YearsInclude'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerSuper1 === "Yes" ? false : true}

                          >
                            <option value="">Select</option>
                            <option value="0">0</option>
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerSuper1YearsInclude" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerSuper1Indexation" className="form-label">
                            Indexation Of Premiums
                          </label>
                          <Field
                            id="PartnerSuper1Indexation"
                            name='PartnerSuper1Indexation'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerSuper1 === "Yes" ? false : true}

                          >
                            <option value="">Select</option>
                            <option value="0.00%">0.00%</option>
                            <option value="0.50%">0.50%</option>
                            <option value="1.00%">1.00%</option>
                            <option value="1.50%">1.50%</option>
                            <option value="2.00%">2.00%</option>
                            <option value="2.50%">2.50%</option>
                            <option value="3.00%">3.00%</option>
                            <option value="3.50%">3.50%</option>
                            <option value="4.00%">4.00%</option>
                            <option value="4.50%">4.50%</option>
                            <option value="5.00%">5.00%</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerSuper1Indexation" />
                        </div>
                      </div>

                    </div>

                    {/* Fifth Row */}
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerSuper1RolloverBenefits" className="form-label">
                            Rollover Benefits To Fund
                          </label>
                          <Field
                            id="PartnerSuper1RolloverBenefits"
                            name='PartnerSuper1RolloverBenefits'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerSuper1 === "Yes" ? false : true}
                          >
                            <option value="">Select</option>
                            <option value="N/A">N/A</option>
                            <option value="SMSF">SMSF</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerSuper1RolloverBenefits" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerSuper1RolloverYear" className="form-label">
                          Rollover Benefits At End Year
                          </label>
                          <Field
                            id="PartnerSuper1RolloverYear"
                            name='PartnerSuper1RolloverYear'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerSuper1 === "Yes" ? false : true}

                          >
                            <option value="">Select</option>
                            <option value="0">0</option>
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerSuper1RolloverYear" />
                        </div>
                      </div>

                    </div>

                  </div>
                  {/* Partner Super1 Form */}


                  {/* Partner Super2 Form */}
                  <div>
                    <div classname="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                          Partner Super 1
                          </label>

                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="PartnerSuper2" id="PartnerSuper2opt1"
                                onChange={handleChange} value="Yes"
                                checked={values.PartnerSuper2 == "Yes"} />
                              <label htmlFor="PartnerSuper2opt1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="PartnerSuper2" id="PartnerSuper2opt2"
                                onChange={handleChange} value="No"

                                checked={values.PartnerSuper2 == "No"} />
                              <label htmlFor="PartnerSuper2opt2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}


                        </div>
                      </div>
                    </div>

                    {/* First Row */}

                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerSuper2FundName" className="form-label">
                            Super Fund Name
                          </label>
                          <Field
                            id="PartnerSuper2FundName"
                            name='PartnerSuper2FundName'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerSuper2 === "Yes" ? false : true}
                          >
                            <option value="">Select</option>
                            <option value="AMIST Super">AMIST Super</option>
                            <option value="AMP My North Super -Choice">AMP My North Super -Choice</option>
                            <option value="AMP My North Super -Core">AMP My North Super -Core</option>
                            <option value="AMP My North Super -Select">AMP My North Super -Select</option>
                            <option value="ANZ Smart Choice">ANZ Smart Choice</option>
                            <option value="ANZ Smart Choice Super">ANZ Smart Choice Super</option>
                            <option value="Asgard Elements Super Account">Asgard Elements Super Account</option>
                            <option value="Asgard eWRAP Super Account">Asgard eWRAP Super Account</option>
                            <option value="Asgard Infinity - Core">Asgard Infinity - Core</option>
                            <option value="Asgard Infinity - Core & Shares">Asgard Infinity - Core & Shares</option>
                            <option value="Asgard Infinity - Full">Asgard Infinity - Full</option>
                            <option value="Asgard Infinity - Full & Shares">Asgard Infinity - Full & Shares</option>
                            <option value="Asgard Infinity - Select">Asgard Infinity - Select</option>
                            <option value="Asgard Infinity - Select & Shares">Asgard Infinity - Select & Shares</option>
                            <option value="Australian Catholic Super & Retirement Fund">Australian Catholic Super & Retirement Fund</option>
                            <option value="AustralianSuper">AustralianSuper</option>
                            <option value="BT Panorama Super">BT Panorama Super</option>
                            <option value="BT SuperWrap Personal Super Plan">BT SuperWrap Personal Super Plan</option>
                            <option value="Care Super">Care Super</option>
                            <option value="CBUS Super">CBUS Super</option>
                            <option value="CFS FirstWrap Plus Super">CFS FirstWrap Plus Super</option>
                            <option value="Christian Super">Christian Super</option>
                            <option value="ClearView WealthSolutions Super">ClearView WealthSolutions Super</option>
                            <option value="Club Super">Club Super</option>
                            <option value="Colonial First State - Fristchoice Wholesale Personal Super">Colonial First State - Fristchoice Wholesale Personal Super</option>
                            <option value="Combined Super">Combined Super</option>
                            <option value="Energy Super">Energy Super</option>
                            <option value="Equipsuper (MyFuture)`">Equipsuper (MyFuture)`</option>
                            <option value="First State Super">First State Super</option>
                            <option value="First Super">First Super</option>
                            <option value="HESTA Super">HESTA Super</option>
                            <option value="HOSTPLUS">HOSTPLUS</option>
                            <option value="HUB24 Super">HUB24 Super</option>
                            <option value="ING Direct Living Super">ING Direct Living Super</option>
                            <option value="Intrust Super (Core)">Intrust Super (Core)</option>
                            <option value="IOOF Pursuit Focus Personal Super">IOOF Pursuit Focus Personal Super</option>
                            <option value="IOOF Pursuit Select Personal Super">IOOF Pursuit Select Personal Super</option>
                            <option value="Kinetic Super">Kinetic Super</option>
                            <option value="Legalsuper">Legalsuper</option>
                            <option value="LGIAsuper Accumulation">LGIAsuper Accumulation</option>
                            <option value="Local Govt Super - Accumulation (NSW)">Local Govt Super - Accumulation (NSW)</option>
                            <option value="LUCRF">LUCRF</option>
                            <option value="Macquarie Super Accumulator">Macquarie Super Accumulator</option>
                            <option value="Maritime Super (Acc Advantage)">Maritime Super (Acc Advantage)</option>
                            <option value="Meat Industry Employees Super">Meat Industry Employees Super</option>
                            <option value="Media Super">Media Super</option>
                            <option value="Mercer Portfolio Service Super">Mercer Portfolio Service Super</option>
                            <option value="Mercer SmartSuper - Individual">Mercer SmartSuper - Individual</option>
                            <option value="Mine Wealth + Wellbeing Super">Mine Wealth + Wellbeing Super</option>
                            <option value="MTAA Super">MTAA Super</option>
                            <option value="My Life My Super">My Life My Super</option>
                            <option value="Nationwide Super">Nationwide Super</option>
                            <option value="NESS Super">NESS Super</option>
                            <option value="NGS Super">NGS Super</option>
                            <option value="OnePath OneAnswer Frontier Personal Super">OnePath OneAnswer Frontier Personal Super</option>
                            <option value="Prime Super">Prime Super</option>
                            <option value="QIEC Super">QIEC Super</option>
                            <option value="QSuper Accumulation Account">QSuper Accumulation Account</option>
                            <option value="REI Super">REI Super</option>
                            <option value="REST Super">REST Super</option>
                            <option value="SMSF">SMSF</option>
                            <option value="Statewide Super">Statewide Super</option>
                            <option value="Sunsuper">Sunsuper</option>
                            <option value="Super SA - Triple S">Super SA - Triple S</option>
                            <option value="Tasplan">Tasplan</option>
                            <option value="TelstraSuper Personal Plus">TelstraSuper Personal Plus</option>
                            <option value="Total Super Benefits">Total Super Benefits</option>
                            <option value="TWU Super">TWU Super</option>
                            <option value="UniSuper">UniSuper</option>
                            <option value="VIC Super">VIC Super</option>
                            <option value="Vision Super (Saver)">Vision Super (Saver)</option>
                            <option value="VISSF Super">VISSF Super</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerSuper2FundName" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper2CurrentBalance"
                            className="form-label"
                          >
                            Current Super Balance
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper2CurrentBalance"
                            name='PartnerSuper2CurrentBalance'
                            placeholder="Current Super Balance"
                            disabled={values.PartnerSuper2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper2CurrentBalance' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper2TaxFreeComponent"
                            className="form-label"
                          >
                            Tax-Free Component
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper2TaxFreeComponent"
                            name='PartnerSuper2TaxFreeComponent'
                            placeholder="Tax-Free Component"
                            disabled={values.PartnerSuper2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper2TaxFreeComponent' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper2PensionRollbackYear"
                            className="form-label"
                          >
                            Pension Rollback In Year 1
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper2PensionRollbackYear"
                            name='PartnerSuper2PensionRollbackYear'
                            placeholder="Pension Rollback In Year 1"
                            disabled={values.PartnerSuper2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper2PensionRollbackYear' />
                        </div>
                      </div>


                    </div>

                    {/* Second Row */}

                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper2RollbackTaxComponent"
                            className="form-label"
                          >
                          Rollback Tax-Free Component
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper2RollbackTaxComponent"
                            name='PartnerSuper2RollbackTaxComponent'
                            placeholder="Rollback Tax-Free Component"
                            disabled={values.PartnerSuper2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper2RollbackTaxComponent' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper2TaxableComponent"
                            className="form-label"
                          >
                            Taxable Component
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper2TaxableComponent"
                            name='PartnerSuper2TaxableComponent'
                            placeholder="Taxable Component"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper2TaxableComponent' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerSuper2RiskProfile" className="form-label">
                            Risk Profile
                          </label>
                          <Field
                            id="PartnerSuper2RiskProfile"
                            name='PartnerSuper2RiskProfile'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerSuper2 === "Yes" ? false : true}>
                            <option value="Select">Select</option>
                            <option value="Cash">Cash</option>
                            <option value="Cautious">Cautious</option>
                            <option value="Conservative">Conservative</option>
                            <option value="Balanced">Balanced</option>
                            <option value="Growth">Growth</option>
                            <option value="High Growth">High Growth</option>
                            <option value="International Shares">International Shares</option>
                            <option value="Property">Property</option>
                            <option value="Australia Fixed Interest">Australia Fixed Interest</option>
                            <option value="International Fixed Interest">International Fixed Interest</option>
                            <option value="Australian Shares">Australian Shares</option>
                            <option value="Other">Other</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerSuper2RiskProfile" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper2Fees"
                            className="form-label"
                          >
                            Fees
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper2Fees"
                            name='PartnerSuper2Fees'
                            placeholder="Fees"
                            disabled={values.PartnerSuper2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper2Fees' />
                        </div>
                      </div>



                    </div>

                    {/* Third Row */}

                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper2AdviserFees"
                            className="form-label"
                          >
                            Adviser Service Fees
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper2AdviserFees"
                            name='PartnerSuper2AdviserFees'
                            placeholder="Adviser Service Fees"
                            disabled={values.PartnerSuper2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper2AdviserFees' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerSuper2Investment" className="form-label">
                            Investment Returns
                          </label>
                          <Field
                            id="PartnerSuper2Investment"
                            name='PartnerSuper2Investment'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerSuper2 === "Yes" ? false : true}
                          >
                            <option value="">Select</option>
                            <option value="System">System</option>
                            <option value="Input Override">Input Override</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerSuper2Investment" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper2IncomeYield"
                            className="form-label"
                          >
                            Income Yield
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper2IncomeYield"
                            name='PartnerSuper2IncomeYield'
                            placeholder="Income Yield"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper2IncomeYield' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper2Growth"
                            className="form-label"
                          >
                            Growth
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper2Growth"
                            name='PartnerSuper2Growth'
                            placeholder="Growth"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper2Growth' />
                        </div>
                      </div>

                    </div>
                    {/* Fourth Row  */}

                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper2Franking"
                            className="form-label"
                          >
                            Franking
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper2Franking"
                            name='PartnerSuper2Franking'
                            placeholder="Franking"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper2Franking' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerSuper2Insurance"
                            className="form-label"
                          >
                            Insurance Premiums
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerSuper2Insurance"
                            name='PartnerSuper2Insurance'
                            placeholder="Insurance Premiums"
                            disabled={values.PartnerSuper2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerSuper2Insurance' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerSuper2YearsInclude" className="form-label">
                            Years to Include
                          </label>
                          <Field
                            id="PartnerSuper2YearsInclude"
                            name='PartnerSuper2YearsInclude'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerSuper2 === "Yes" ? false : true}

                          >
                            <option value="">Select</option>
                            <option value="0">0</option>
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerSuper2YearsInclude" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerSuper2Indexation" className="form-label">
                            Indexation Of Premiums
                          </label>
                          <Field
                            id="PartnerSuper2Indexation"
                            name='PartnerSuper2Indexation'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerSuper2 === "Yes" ? false : true}

                          >
                            <option value="">Select</option>
                            <option value="0.00%">0.00%</option>
                            <option value="0.50%">0.50%</option>
                            <option value="1.00%">1.00%</option>
                            <option value="1.50%">1.50%</option>
                            <option value="2.00%">2.00%</option>
                            <option value="2.50%">2.50%</option>
                            <option value="3.00%">3.00%</option>
                            <option value="3.50%">3.50%</option>
                            <option value="4.00%">4.00%</option>
                            <option value="4.50%">4.50%</option>
                            <option value="5.00%">5.00%</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerSuper2Indexation" />
                        </div>
                      </div>

                    </div>

                    {/* Fifth Row */}
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerSuper2RolloverBenefits" className="form-label">
                            Rollover Benefits To Fund
                          </label>
                          <Field
                            id="PartnerSuper2RolloverBenefits"
                            name='PartnerSuper2RolloverBenefits'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerSuper2 === "Yes" ? false : true}
                          >
                            <option value="">Select</option>
                            <option value="N/A">N/A</option>
                            <option value="SMSF">SMSF</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerSuper2RolloverBenefits" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerSuper2RolloverYear" className="form-label">
                          Rollover Benefits At End Year
                          </label>
                          <Field
                            id="PartnerSuper2RolloverYear"
                            name='PartnerSuper2RolloverYear'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerSuper2 === "Yes" ? false : true}

                          >
                            <option value="">Select</option>
                            <option value="0">0</option>
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerSuper2RolloverYear" />
                        </div>
                      </div>

                    </div>

                  </div>
                  {/* Partner Super2 Form */}
              
              
                </>}







              </Modal.Body>


              <Modal.Footer>
                <div className="col-md-12">
                  <button
                    type="submit"
                    className="float-end btn w-25  bgColor modalBtn"
                  // onClick={handleClose}
                  >
                    Save
                  </button>
                  <button
                    type='button'
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

      {/* --------------------------------------------------------------- */}


    </>
  )
}

export default SuperDetails;

