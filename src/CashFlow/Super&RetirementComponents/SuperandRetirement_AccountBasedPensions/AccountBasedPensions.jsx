import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./businessTextStructure.css"
import plus from "./images/plus.svg"
import notebook from "./images/notebook.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { faCircleInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const AccountBasedPensions = () => {

  const [TermDeposits, setTermDeposits] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  let initialValues = {

    Account:"Yes",

//---------------------------Client---------------------------------//

    //Pension 1
    ClientEdit1:"No",
    ClientPension1Fund:"",
    ClientPension1Pension:"",
    ClientPension1Commence:"",
    ClientPension1EditDeeming:"No",
    ClientPension1Superannuation:"",
    ClientPension1Rollover:"",
    ClientPension1Purchase:"",
    ClientPension1TaxFree:"",
    ClientPension1Centrelink:"",
    ClientPension1Risk:"",
    ClientPension1Investment:"",
    ClientPension1Income:"",
    ClientPension1Growth:"",
    ClientPension1Franking:"",
    ClientPension1Fees:"",
    ClientPension1AdviserFees:"",
    ClientPension1PreservationAge:"",
    ClientPension1PreservationYear:"",
    ClientPension1MinimumPension:"",
    ClientPension1EditReversionary:"No",
    ClientPension1Nominated:"",
    ClientPension1Amount:"",
    ClientPension1Indexation:"",
    ClientPension1EditPension:"No",
    ClientPension1CommencePension:"",
    ClientPension1CurrentPension:"",
    ClientPension1TotalSuperannuation:"",
    ClientPension1NominatedRollover:"",
    ClientPension1MinimumPension2:"",
    ClientPension1MaximumPension2:"",
    ClientPension1EditPension2:"No",
    ClientPension1NominatedPension2:"",
    ClientPension1OtherAmount2:"",
    ClientPension1Indexation2:"",

    //Pension 2
    ClientEdit2:"No",
    ClientPension2Fund:"",
    ClientPension2Pension:"",
    ClientPension2Commence:"",
    ClientPension2EditDeeming:"No",
    ClientPension2Superannuation:"",
    ClientPension2Rollover:"",
    ClientPension2Purchase:"",
    ClientPension2TaxFree:"",
    ClientPension2Centrelink:"",
    ClientPension2Risk:"",
    ClientPension2Investment:"",
    ClientPension2Income:"",
    ClientPension2Growth:"",
    ClientPension2Franking:"",
    ClientPension2Fees:"",
    ClientPension2AdviserFees:"",
    ClientPension2PreservationAge:"",
    ClientPension2PreservationYear:"",
    ClientPension2MinimumPension:"",
    ClientPension2EditReversionary:"No",
    ClientPension2Nominated:"",
    ClientPension2Amount:"",
    ClientPension2Indexation:"",
    ClientPension2EditPension:"No",
    ClientPension2CommencePension:"",
    ClientPension2CurrentPension:"",
    ClientPension2TotalSuperannuation:"",
    ClientPension2NominatedRollover:"",
    ClientPension2MinimumPension2:"",
    ClientPension2MaximumPension2:"",
    ClientPension2EditPension2:"No",
    ClientPension2NominatedPension2:"",
    ClientPension2OtherAmount2:"",
    ClientPension2Indexation2:"",

//---------------------------Partner---------------------------------//
    //Pension 1
    PartnerEdit1:"No",
    PartnerPension1Fund:"",
    PartnerPension1Pension:"",
    PartnerPension1Commence:"",
    PartnerPension1EditDeeming:"No",
    PartnerPension1Superannuation:"",
    PartnerPension1Rollover:"",
    PartnerPension1Purchase:"",
    PartnerPension1TaxFree:"",
    PartnerPension1Centrelink:"",
    PartnerPension1Risk:"",
    PartnerPension1Investment:"",
    PartnerPension1Income:"",
    PartnerPension1Growth:"",
    PartnerPension1Franking:"",
    PartnerPension1Fees:"",
    PartnerPension1AdviserFees:"",
    PartnerPension1PreservationAge:"",
    PartnerPension1PreservationYear:"",
    PartnerPension1MinimumPension:"",
    PartnerPension1EditReversionary:"No",
    PartnerPension1Nominated:"",
    PartnerPension1Amount:"",
    PartnerPension1Indexation:"",
    PartnerPension1EditPension:"No",
    PartnerPension1CommencePension:"",
    PartnerPension1CurrentPension:"",
    PartnerPension1TotalSuperannuation:"",
    PartnerPension1NominatedRollover:"",
    PartnerPension1MinimumPension2:"",
    PartnerPension1MaximumPension2:"",
    PartnerPension1EditPension2:"No",
    PartnerPension1NominatedPension2:"",
    PartnerPension1OtherAmount2:"",
    PartnerPension1Indexation2:"",

    //Pension 2
    PartnerEdit2:"No",
    PartnerPension2Fund:"",
    PartnerPension2Pension:"",
    PartnerPension2Commence:"",
    PartnerPension2EditDeeming:"No",
    PartnerPension2Superannuation:"",
    PartnerPension2Rollover:"",
    PartnerPension2Purchase:"",
    PartnerPension2TaxFree:"",
    PartnerPension2Centrelink:"",
    PartnerPension2Risk:"",
    PartnerPension2Investment:"",
    PartnerPension2Income:"",
    PartnerPension2Growth:"",
    PartnerPension2Franking:"",
    PartnerPension2Fees:"",
    PartnerPension2AdviserFees:"",
    PartnerPension2PreservationAge:"",
    PartnerPension2PreservationYear:"",
    PartnerPension2MinimumPension:"",
    PartnerPension2EditReversionary:"No",
    PartnerPension2Nominated:"",
    PartnerPension2Amount:"",
    PartnerPension2Indexation:"",
    PartnerPension2EditPension:"No",
    PartnerPension2CommencePension:"",
    PartnerPension2CurrentPension:"",
    PartnerPension2TotalSuperannuation:"",
    PartnerPension2NominatedRollover:"",
    PartnerPension2MinimumPension2:"",
    PartnerPension2MaximumPension2:"",
    PartnerPension2EditPension2:"No",
    PartnerPension2NominatedPension2:"",
    PartnerPension2OtherAmount2:"",
    PartnerPension2Indexation2:"",



  }

  let validationSchema = Yup.object({
    //---------------------------Client---------------------------------//
    //Pension 1 
    ClientPension1Fund:Yup.string().when("ClientEdit1", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientPension1Pension:Yup.string().when("ClientEdit1", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientPension1Commence:Yup.string().when("ClientEdit1", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientPension1Rollover:Yup.number().when("ClientEdit1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientPension1Purchase:Yup.number().when("ClientEdit1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientPension1TaxFree:Yup.number().when("ClientEdit1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientPension1Centrelink:Yup.number().when("ClientEdit1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientPension1Risk:Yup.string().when("ClientEdit1", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientPension1Investment:Yup.string().when("ClientEdit1", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientPension1Fees:Yup.number().when("ClientEdit1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientPension1AdviserFees:Yup.number().when("ClientEdit1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientPension1Nominated:Yup.string().when("ClientEdit1", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientPension1Amount:Yup.number().when("ClientEdit1", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientPension1Indexation:Yup.string().when("ClientEdit1", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    // ClientPension1EditPension:"No",
    ClientPension1CommencePension:Yup.string().when("ClientPension1EditPension", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientPension1NominatedRollover:Yup.number().when("ClientPension1EditPension", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientPension1NominatedPension2:Yup.string().when("ClientPension1EditPension", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required


    //Pension 2
    ClientPension2Fund:Yup.string().when("ClientEdit2", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientPension2Pension:Yup.string().when("ClientEdit2", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientPension2Commence:Yup.string().when("ClientEdit2", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientPension2Rollover:Yup.number().when("ClientEdit2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientPension2Purchase:Yup.number().when("ClientEdit2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientPension2TaxFree:Yup.number().when("ClientEdit2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientPension2Centrelink:Yup.number().when("ClientEdit2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientPension2Risk:Yup.string().when("ClientEdit2", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientPension2Investment:Yup.string().when("ClientEdit2", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientPension2Fees:Yup.number().when("ClientEdit2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientPension2AdviserFees:Yup.number().when("ClientEdit2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientPension2Nominated:Yup.string().when("ClientEdit2", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientPension2Amount:Yup.number().when("ClientEdit2", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientPension2Indexation:Yup.string().when("ClientEdit2", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    // ClientPension2EditPension:"No",
    ClientPension2CommencePension:Yup.string().when("ClientPension2EditPension", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required
    ClientPension2NominatedRollover:Yup.number().when("ClientPension2EditPension", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
    }),//Positive Number Only
    ClientPension2NominatedPension2:Yup.string().when("ClientPension2EditPension", {
      is: (val) => val && val == "Yes",
      then:  Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }), //Simple Required


    //---------------------------Partner---------------------------------//

      //Pension 1 
      PartnerPension1Fund:Yup.string().when("PartnerEdit1", {
        is: (val) => val && val == "Yes",
        then:  Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }), //Simple Required
      PartnerPension1Pension:Yup.string().when("PartnerEdit1", {
        is: (val) => val && val == "Yes",
        then:  Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }), //Simple Required
      PartnerPension1Commence:Yup.string().when("PartnerEdit1", {
        is: (val) => val && val == "Yes",
        then:  Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }), //Simple Required
      PartnerPension1Rollover:Yup.number().when("PartnerEdit1", {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .min(0, "Must be a positive number"),
        otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
      }),//Positive Number Only
      PartnerPension1Purchase:Yup.number().when("PartnerEdit1", {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .min(0, "Must be a positive number"),
        otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
      }),//Positive Number Only
      PartnerPension1TaxFree:Yup.number().when("PartnerEdit1", {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .min(0, "Must be a positive number"),
        otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
      }),//Positive Number Only
      PartnerPension1Centrelink:Yup.number().when("PartnerEdit1", {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .min(0, "Must be a positive number"),
        otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
      }),//Positive Number Only
      PartnerPension1Risk:Yup.string().when("PartnerEdit1", {
        is: (val) => val && val == "Yes",
        then:  Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }), //Simple Required
      PartnerPension1Investment:Yup.string().when("PartnerEdit1", {
        is: (val) => val && val == "Yes",
        then:  Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }), //Simple Required
      PartnerPension1Fees:Yup.number().when("PartnerEdit1", {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .min(0, "Must be a positive number"),
        otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
      }),//Positive Number Only
      PartnerPension1AdviserFees:Yup.number().when("PartnerEdit1", {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .min(0, "Must be a positive number"),
        otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
      }),//Positive Number Only
      PartnerPension1Nominated:Yup.string().when("PartnerEdit1", {
        is: (val) => val && val == "Yes",
        then:  Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }), //Simple Required
      PartnerPension1Amount:Yup.number().when("PartnerEdit1", {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .min(0, "Must be a positive number"),
        otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
      }),//Positive Number Only
      PartnerPension1Indexation:Yup.string().when("PartnerEdit1", {
        is: (val) => val && val == "Yes",
        then:  Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }), //Simple Required
      // PartnerPension1EditPension:"No",
      PartnerPension1CommencePension:Yup.string().when("PartnerPension1EditPension", {
        is: (val) => val && val == "Yes",
        then:  Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }), //Simple Required
      PartnerPension1NominatedRollover:Yup.number().when("PartnerPension1EditPension", {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .min(0, "Must be a positive number"),
        otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
      }),//Positive Number Only
      PartnerPension1NominatedPension2:Yup.string().when("PartnerPension1EditPension", {
        is: (val) => val && val == "Yes",
        then:  Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }), //Simple Required


      //Pension 2
      PartnerPension2Fund:Yup.string().when("PartnerEdit2", {
        is: (val) => val && val == "Yes",
        then:  Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }), //Simple Required
      PartnerPension2Pension:Yup.string().when("PartnerEdit2", {
        is: (val) => val && val == "Yes",
        then:  Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }), //Simple Required
      PartnerPension2Commence:Yup.string().when("PartnerEdit2", {
        is: (val) => val && val == "Yes",
        then:  Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }), //Simple Required
      PartnerPension2Rollover:Yup.number().when("PartnerEdit2", {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .min(0, "Must be a positive number"),
        otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
      }),//Positive Number Only
      PartnerPension2Purchase:Yup.number().when("PartnerEdit2", {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .min(0, "Must be a positive number"),
        otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
      }),//Positive Number Only
      PartnerPension2TaxFree:Yup.number().when("PartnerEdit2", {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .min(0, "Must be a positive number"),
        otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
      }),//Positive Number Only
      PartnerPension2Centrelink:Yup.number().when("PartnerEdit2", {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .min(0, "Must be a positive number"),
        otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
      }),//Positive Number Only
      PartnerPension2Risk:Yup.string().when("PartnerEdit2", {
        is: (val) => val && val == "Yes",
        then:  Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }), //Simple Required
      PartnerPension2Investment:Yup.string().when("PartnerEdit2", {
        is: (val) => val && val == "Yes",
        then:  Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }), //Simple Required
      PartnerPension2Fees:Yup.number().when("PartnerEdit2", {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .min(0, "Must be a positive number"),
        otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
      }),//Positive Number Only
      PartnerPension2AdviserFees:Yup.number().when("PartnerEdit2", {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .min(0, "Must be a positive number"),
        otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
      }),//Positive Number Only
      PartnerPension2Nominated:Yup.string().when("PartnerEdit2", {
        is: (val) => val && val == "Yes",
        then:  Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }), //Simple Required
      PartnerPension2Amount:Yup.number().when("PartnerEdit2", {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .min(0, "Must be a positive number"),
        otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
      }),//Positive Number Only
      PartnerPension2Indexation:Yup.string().when("PartnerEdit2", {
        is: (val) => val && val == "Yes",
        then:  Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }), //Simple Required
      // PartnerPension2EditPension:"No",
      PartnerPension2CommencePension:Yup.string().when("PartnerPension2EditPension", {
        is: (val) => val && val == "Yes",
        then:  Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }), //Simple Required
      PartnerPension2NominatedRollover:Yup.number().when("PartnerPension2EditPension", {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .min(0, "Must be a positive number"),
        otherwise: Yup.number().min(0, "Must be a positive number").nullable(true),
      }),//Positive Number Only
      PartnerPension2NominatedPension2:Yup.string().when("PartnerPension2EditPension", {
        is: (val) => val && val == "Yes",
        then:  Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }), //Simple Required


  })

  let onSubmit = (values) => {
    // console.log(values);

    let data = {
        ClientEdit1:values.ClientEdit1,
        ClientPension1Fund:values.ClientPension1Fund,
        ClientPension1Pension:values.ClientPension1Pension,
        ClientPension1Commence:values.ClientPension1Commence,
        ClientPension1EditDeeming:values.ClientPension1EditDeeming,
        ClientPension1Superannuation:values.ClientPension1Superannuation,
        ClientPension1Rollover:values.ClientPension1Rollover,
        ClientPension1Purchase:values.ClientPension1Purchase,
        ClientPension1TaxFree:values.ClientPension1TaxFree,
        ClientPension1Centrelink:values.ClientPension1Centrelink,
        ClientPension1Risk:values.ClientPension1Risk,
        ClientPension1Investment:values.ClientPension1Investment,
        ClientPension1Income:values.ClientPension1Income,
        ClientPension1Growth:values.ClientPension1Growth,
        ClientPension1Franking:values.ClientPension1Franking,
        ClientPension1Fees:values.ClientPension1Fees,
        ClientPension1AdviserFees:values.ClientPension1AdviserFees,
        ClientPension1PreservationAge:values.ClientPension1PreservationAge,
        ClientPension1PreservationYear:values.ClientPension1PreservationYear,
        ClientPension1MinimumPension:values.ClientPension1MinimumPension,
        ClientPension1EditReversionary:values.ClientPension1EditReversionary,
        ClientPension1minated:values.ClientPension1Nominated,
        ClientPension1Amount:values.ClientPension1Amount,
        ClientPension1Indexation:values.ClientPension1Indexation,
        ClientPension1EditPension:values.ClientPension1EditPension,
        ClientPension1CommencePension:values.ClientPension1CommencePension,
        ClientPension1CurrentPension:values.ClientPension1CurrentPension,
        ClientPension1TotalSuperannuation:values.ClientPension1TotalSuperannuation,
        ClientPension1minatedRollover:values.ClientPension1NominatedRollover,
        ClientPension1MinimumPension2:values.ClientPension1MinimumPension2,
        ClientPension1MaximumPension2:values.ClientPension1MaximumPension2,
        ClientPension1EditPension2:values.ClientPension1EditPension2,
        ClientPension1minatedPension2:values.ClientPension1NominatedPension2,
        ClientPension1OtherAmount2:values.ClientPension1OtherAmount2,
        ClientPension1Indexation2:values.ClientPension1Indexation2,
        
        //Pension 2
        ClientEdit2:values.ClientEdit2,
        ClientPension2Fund:values.ClientPension2Fund,
        ClientPension2Pension:values.ClientPension2Pension,
        ClientPension2Commence:values.ClientPension2Commence,
        ClientPension2EditDeeming:values.ClientPension2EditDeeming,
        ClientPension2Superannuation:values.ClientPension2Superannuation,
        ClientPension2Rollover:values.ClientPension2Rollover,
        ClientPension2Purchase:values.ClientPension2Purchase,
        ClientPension2TaxFree:values.ClientPension2TaxFree,
        ClientPension2Centrelink:values.ClientPension2Centrelink,
        ClientPension2Risk:values.ClientPension2Risk,
        ClientPension2Investment:values.ClientPension2Investment,
        ClientPension2Income:values.ClientPension2Income,
        ClientPension2Growth:values.ClientPension2Growth,
        ClientPension2Franking:values.ClientPension2Franking,
        ClientPension2Fees:values.ClientPension2Fees,
        ClientPension2AdviserFees:values.ClientPension2AdviserFees,
        ClientPension2PreservationAge:values.ClientPension2PreservationAge,
        ClientPension2PreservationYear:values.ClientPension2PreservationYear,
        ClientPension2MinimumPension:values.ClientPension2MinimumPension,
        ClientPension2EditReversionary:values.ClientPension2EditReversionary,
        ClientPension2minated:values.ClientPension2Nominated,
        ClientPension2Amount:values.ClientPension2Amount,
        ClientPension2Indexation:values.ClientPension2Indexation,
        ClientPension2EditPension:values.ClientPension2EditPension,
        ClientPension2CommencePension:values.ClientPension2CommencePension,
        ClientPension2CurrentPension:values.ClientPension2CurrentPension,
        ClientPension2TotalSuperannuation:values.ClientPension2TotalSuperannuation,
        ClientPension2minatedRollover:values.ClientPension2NominatedRollover,
        ClientPension2MinimumPension2:values.ClientPension2MinimumPension2,
        ClientPension2MaximumPension2:values.ClientPension2MaximumPension2,
        ClientPension2EditPension2:values.ClientPension2EditPension2,
        ClientPension2minatedPension2:values.ClientPension2NominatedPension2,
        ClientPension2OtherAmount2:values.ClientPension2OtherAmount2,
        ClientPension2Indexation2:values.ClientPension2Indexation2,

    //---------------------------Partner---------------------------------//

        PartnerEdit1:values.PartnerEdit1,
        PartnerPension1Fund:values.PartnerPension1Fund,
        PartnerPension1Pension:values.PartnerPension1Pension,
        PartnerPension1Commence:values.PartnerPension1Commence,
        PartnerPension1EditDeeming:values.PartnerPension1EditDeeming,
        PartnerPension1Superannuation:values.PartnerPension1Superannuation,
        PartnerPension1Rollover:values.PartnerPension1Rollover,
        PartnerPension1Purchase:values.PartnerPension1Purchase,
        PartnerPension1TaxFree:values.PartnerPension1TaxFree,
        PartnerPension1Centrelink:values.PartnerPension1Centrelink,
        PartnerPension1Risk:values.PartnerPension1Risk,
        PartnerPension1Investment:values.PartnerPension1Investment,
        PartnerPension1Income:values.PartnerPension1Income,
        PartnerPension1Growth:values.PartnerPension1Growth,
        PartnerPension1Franking:values.PartnerPension1Franking,
        PartnerPension1Fees:values.PartnerPension1Fees,
        PartnerPension1AdviserFees:values.PartnerPension1AdviserFees,
        PartnerPension1PreservationAge:values.PartnerPension1PreservationAge,
        PartnerPension1PreservationYear:values.PartnerPension1PreservationYear,
        PartnerPension1MinimumPension:values.PartnerPension1MinimumPension,
        PartnerPension1EditReversionary:values.PartnerPension1EditReversionary,
        PartnerPension1minated:values.PartnerPension1Nominated,
        PartnerPension1Amount:values.PartnerPension1Amount,
        PartnerPension1Indexation:values.PartnerPension1Indexation,
        PartnerPension1EditPension:values.PartnerPension1EditPension,
        PartnerPension1CommencePension:values.PartnerPension1CommencePension,
        PartnerPension1CurrentPension:values.PartnerPension1CurrentPension,
        PartnerPension1TotalSuperannuation:values.PartnerPension1TotalSuperannuation,
        PartnerPension1minatedRollover:values.PartnerPension1NominatedRollover,
        PartnerPension1MinimumPension2:values.PartnerPension1MinimumPension2,
        PartnerPension1MaximumPension2:values.PartnerPension1MaximumPension2,
        PartnerPension1EditPension2:values.PartnerPension1EditPension2,
        PartnerPension1minatedPension2:values.PartnerPension1NominatedPension2,
        PartnerPension1OtherAmount2:values.PartnerPension1OtherAmount2,
        PartnerPension1Indexation2:values.PartnerPension1Indexation2,
        
        //Pension 2
        PartnerEdit2:values.PartnerEdit2,
        PartnerPension2Fund:values.PartnerPension2Fund,
        PartnerPension2Pension:values.PartnerPension2Pension,
        PartnerPension2Commence:values.PartnerPension2Commence,
        PartnerPension2EditDeeming:values.PartnerPension2EditDeeming,
        PartnerPension2Superannuation:values.PartnerPension2Superannuation,
        PartnerPension2Rollover:values.PartnerPension2Rollover,
        PartnerPension2Purchase:values.PartnerPension2Purchase,
        PartnerPension2TaxFree:values.PartnerPension2TaxFree,
        PartnerPension2Centrelink:values.PartnerPension2Centrelink,
        PartnerPension2Risk:values.PartnerPension2Risk,
        PartnerPension2Investment:values.PartnerPension2Investment,
        PartnerPension2Income:values.PartnerPension2Income,
        PartnerPension2Growth:values.PartnerPension2Growth,
        PartnerPension2Franking:values.PartnerPension2Franking,
        PartnerPension2Fees:values.PartnerPension2Fees,
        PartnerPension2AdviserFees:values.PartnerPension2AdviserFees,
        PartnerPension2PreservationAge:values.PartnerPension2PreservationAge,
        PartnerPension2PreservationYear:values.PartnerPension2PreservationYear,
        PartnerPension2MinimumPension:values.PartnerPension2MinimumPension,
        PartnerPension2EditReversionary:values.PartnerPension2EditReversionary,
        PartnerPension2minated:values.PartnerPension2Nominated,
        PartnerPension2Amount:values.PartnerPension2Amount,
        PartnerPension2Indexation:values.PartnerPension2Indexation,
        PartnerPension2EditPension:values.PartnerPension2EditPension,
        PartnerPension2CommencePension:values.PartnerPension2CommencePension,
        PartnerPension2CurrentPension:values.PartnerPension2CurrentPension,
        PartnerPension2TotalSuperannuation:values.PartnerPension2TotalSuperannuation,
        PartnerPension2minatedRollover:values.PartnerPension2NominatedRollover,
        PartnerPension2MinimumPension2:values.PartnerPension2MinimumPension2,
        PartnerPension2MaximumPension2:values.PartnerPension2MaximumPension2,
        PartnerPension2EditPension2:values.PartnerPension2EditPension2,
        PartnerPension2minatedPension2:values.PartnerPension2NominatedPension2,
        PartnerPension2OtherAmount2:values.PartnerPension2OtherAmount2,
        PartnerPension2Indexation2:values.PartnerPension2Indexation2,

        

    }
    console.log(data);
    setTermDeposits([data]);

  }

  return (
    <>

      
      
    <label className="form-label">  Account Based Pensions </label>
    <br />
    
      <div>
        <button type="button"
          className="btn btn-outline-success"

          onClick={handleShow}
        >
          <div className="iconContainer mx-1">
            <img className="img-fluid" src={plus} alt="" />

          </div>
         Enter Details
        </button>


      </div>



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
            Account Based Pensions
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
              <label className="form-label">Account Detail Forms</label>
                <div className="form-check form-switch p-0  ">
                  <div className="radiobutton w-25">
                    <input type="radio" name="Account" id="Account1"
                      onChange={handleChange} value="Yes"
                      checked={values.Account == "Yes"} />
                    <label htmlFor="Account1" className="label1 w-50">
                      <span>Client</span>
                    </label>
                    <input type="radio" name="Account" id="Account2"
                      onChange={handleChange} value="No"

                      checked={values.Account == "No"} />
                    <label htmlFor="Account2" className="label2 w-50">
                      <span>Partner</span>
                    </label>
                  </div>
                </div>
              </div>

              
            </div>
                
                {values.Account == "Yes" && <>
                    {/* Client Pension 1*/}
                    <div>
                    <div classname="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            Client Pension 1
                          </label>
  
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="ClientEdit1" id="ClientEdit1opt1"
                                onChange={handleChange} value="Yes"
                                checked={values.ClientEdit1 == "Yes"} />
                              <label htmlFor="ClientEdit1opt1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="ClientEdit1" id="ClientEdit1opt2"
                                onChange={handleChange} value="No"
  
                                checked={values.ClientEdit1 == "No"} />
                              <label htmlFor="ClientEdit1opt2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}
  
  
                        </div>
                      </div>
                    </div>
  
                    {/* First Row Client*/}
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientPension1Fund" className="form-label">
                            Fund Name
                          </label>
                          <Field
                            id="ClientPension1Fund"
                            name='ClientPension1Fund'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientEdit1 === "Yes" ? false : true}
  
                          >
                            <option value="">Select</option>
                            <option value="AMIST Pension">AMIST Pension</option>
                            <option value="AMP My North Pension -Choice">AMP My North Pension -Choice</option>
                            <option value="AMP My North Pension -Core">AMP My North Pension -Core</option>
                            <option value="AMP MY North Pension -Select">AMP MY North Pension -Select</option>
                            <option value="ANZ Smart Choice Pension">ANZ Smart Choice Pension</option>
                            <option value="Australian Catholic Super & Retirement Fund Pension">Australian Catholic Super & Retirement Fund Pension</option>
                            <option value="Australian Super - Choice Income">Australian Super - Choice Income</option>
                            <option value="Care Super Pension">Care Super Pension</option>
                            <option value="CBUS Super Income Stream">CBUS Super Income Stream</option>
                            <option value="Christian Super Pension">Christian Super Pension</option>
                            <option value="Club Super Pension">Club Super Pension</option>
                            <option value="Colonial First State - Fristchoice Wholesale Pension">Colonial First State - Fristchoice Wholesale Pension</option>
                            <option value="Combined Super Pension">Combined Super Pension</option>
                            <option value="Equip MyPension">Equip MyPension</option>
                            <option value="First State Super Income Stream">First State Super Income Stream</option>
                            <option value="First Super Allocated Pensions">First Super Allocated Pensions</option>
                            <option value="HESTA Income Stream">HESTA Income Stream</option>
                            <option value="HOSTPLUS Retirement Income Accounts">HOSTPLUS Retirement Income Accounts</option>
                            <option value="Intrust Superstream Pension">Intrust Superstream Pension</option>
                            <option value="Kinetic Smart Pension">Kinetic Smart Pension</option>
                            <option value="Legalsuper Pension">Legalsuper Pension</option>
                            <option value="LUCRF Pension">LUCRF Pension</option>
                            <option value="Maritime Super Pension">Maritime Super Pension</option>
                            <option value="Meat Industry Employees Super Pension">Meat Industry Employees Super Pension</option>
                            <option value="Media Super Pension">Media Super Pension</option>
                            <option value="Mine Wealth + Wellbeing Super Account-based Pension">Mine Wealth + Wellbeing Super Account-based Pension</option>
                            <option value="MTAA Super Pension">MTAA Super Pension</option>
                            <option value="My Life My Super Pension">My Life My Super Pension</option>
                            <option value="Nationwide Super Pension">Nationwide Super Pension</option>
                            <option value="NESS Super Pension">NESS Super Pension</option>
                            <option value="NGS Super Income Account ">NGS Super Income Account </option>
                            <option value="Prime Super Income Stream">Prime Super Income Stream</option>
                            <option value="QIEC Income Stream">QIEC Income Stream</option>
                            <option value="REI Super Pension">REI Super Pension</option>
                            <option value="REST Pension">REST Pension</option>
                            <option value="SMSF">SMSF</option>
                            <option value="Statewide Pension">Statewide Pension</option>
                            <option value="Sunsuper Income Account ">Sunsuper Income Account </option>
                            <option value="Tasplan Pension">Tasplan Pension</option>
                            <option value="TWU Super Pension">TWU Super Pension</option>
                            <option value="UniSuper Flexi Pension">UniSuper Flexi Pension</option>
                            <option value="VicSuper Retirement Income">VicSuper Retirement Income</option>
                            <option value="Vision Income Stream">Vision Income Stream</option>
                            <option value="VISSF Super Pension">VISSF Super Pension</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPension1Fund" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientPension1Pension" className="form-label">
                            Pension Type
                          </label>
                          <Field
                            id="ClientPension1Pension"
                            name='ClientPension1Pension'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientEdit1 === "Yes" ? false : true}
  
                          >
                            <option value="">Select</option>
                            <option value="TTR">TTR</option>
                            <option value="Account Based">Account Based</option>
  
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPension1Pension" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientPension1Commence" className="form-label">
                            Commence Pension in Year
                          </label>
                          <Field
                            id="ClientPension1Commence"
                            name='ClientPension1Commence'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientEdit1 === "Yes" ? false : true}
  
                          >
                            <option value="">Select</option>
                            <option value="Existing">Existing</option>
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPension1Commence" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            Apply Deeming
                          </label>
  
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="ClientPension1EditDeeming" id="ClientPension1EditDeeming1"
                                disabled={values.ClientEdit1 === "Yes" ? false : true}
                                onChange={handleChange} value="Yes"
                                checked={values.ClientPension1EditDeeming == "Yes"} />
                              <label htmlFor="ClientPension1EditDeeming1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="ClientPension1EditDeeming" id="ClientPension1EditDeeming2"
                                disabled={values.ClientEdit1 === "Yes" ? false : true}
                                onChange={handleChange} value="No"
                                checked={values.ClientPension1EditDeeming == "No"} />
                              <label htmlFor="ClientPension1EditDeeming2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}
  
  
                        </div>
                      </div>
  
                    </div>
  
                    {/* Second Row Client*/}
  
                    <div className="row">
  
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension1Superannuation"
                            className="form-label"
                          >
                            Total Superannuation Benefits
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension1Superannuation"
                            name='ClientPension1Superannuation'
                            placeholder="Total Superannuation Benefits"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension1Superannuation' />
                        </div>
                      </div>
  
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension1Rollover"
                            className="form-label"
                          >
                            Nominated Rollover Amount
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension1Rollover"
                            name='ClientPension1Rollover'
                            placeholder="Nominated Rollover Amount"
                            disabled={values.ClientEdit1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension1Rollover' />
                        </div>
                      </div>
  
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension1Purchase"
                            className="form-label"
                          >
                            Purchase Price (Less Commut)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension1Purchase"
                            name='ClientPension1Purchase'
                            placeholder="Purchase Price"
                            disabled={values.ClientEdit1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension1Purchase' />
                        </div>
                      </div>
  
  
  
                    </div>
  
                    {/* Third Row Client*/}
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension1TaxFree"
                            className="form-label"
                          >
                            Tax-Free Component
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension1TaxFree"
                            name='ClientPension1TaxFree'
                            placeholder="Tax Free Component"
                            disabled={values.ClientEdit1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension1TaxFree' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension1Centrelink"
                            className="form-label"
                          >
                            Centrelink Relevant Number
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension1Centrelink"
                            name='ClientPension1Centrelink'
                            placeholder="Centrelink Relevant Number"
                            disabled={values.ClientEdit1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension1Centrelink' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientPension1Risk" className="form-label">
                            Risk Profile
                          </label>
                          <Field
                            id="ClientPension1Risk"
                            name='ClientPension1Risk'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientEdit1 === "Yes" ? false : true}>
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPension1Risk" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientPension1Investment" className="form-label">
                            Investment Returns
                          </label>
                          <Field
                            id="ClientPension1Investment"
                            name='ClientPension1Investment'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientEdit1 === "Yes" ? false : true}>
                            <option value="Select">Select</option>
                            <option value="System">System</option>
                            <option value="Input Override">Input Override</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPension1Investment" />
                        </div>
                      </div>
  
                    </div>
  
                    {/* Fourth Row Client */}
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension1Income"
                            className="form-label"
                          >
                            Income Yield
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension1Income"
                            name='ClientPension1Income'
                            placeholder="Income Yield"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension1Income' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension1Growth"
                            className="form-label"
                          >
                            Growth
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension1Growth"
                            name='ClientPension1Growth'
                            placeholder="Growth"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension1Growth' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension1Franking"
                            className="form-label"
                          >
                            Franking
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension1Franking"
                            name='ClientPension1Franking'
                            placeholder="Franking"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension1Franking' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension1Fees"
                            className="form-label"
                          >
                            Fees
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension1Fees"
                            name='ClientPension1Fees'
                            placeholder="Fees"
                            disabled={values.ClientEdit1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension1Fees' />
                        </div>
                      </div>
  
                    </div>
  
                    {/* Fifth Row Client*/}
  
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension1AdviserFees"
                            className="form-label"
                          >
                            Adviser Service Fees
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension1AdviserFees"
                            name='ClientPension1AdviserFees'
                            placeholder="Adviser Service Fees"
                            disabled={values.ClientEdit1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension1AdviserFees' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension1PreservationAge"
                            className="form-label"
                          >
                            Preservation Age
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension1PreservationAge"
                            name='ClientPension1PreservationAge'
                            placeholder="Preservation Age"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension1PreservationAge' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension1PreservationYear"
                            className="form-label"
                          >
                            Preservation Age in Year
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension1PreservationYear"
                            name='ClientPension1PreservationYear'
                            placeholder="Preservation Age in Year"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension1PreservationYear' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension1MinimumPension"
                            className="form-label"
                          >
                            Minimum Pension
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension1MinimumPension"
                            name='ClientPension1MinimumPension'
                            placeholder="Minimum Pension"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension1MinimumPension' />
                        </div>
                      </div>
  
                    </div>
  
                    {/* Sixth Row Client*/}
  
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension1MaximumPension"
                            className="form-label"
                          >
                            Maximum TTR Pension
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension1MaximumPension"
                            name='ClientPension1MaximumPension'
                            placeholder="Maximum TTR Pension"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension1MaximumPension' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            Reversionary Pension Option
                          </label>
  
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="ClientPension1EditReversionary" id="ClientPension1EditReversionary1"
                                disabled={values.ClientEdit1 === "Yes" ? false : true}
                                onChange={handleChange} value="Yes"
                                checked={values.ClientPension1EditReversionary == "Yes"} />
                              <label htmlFor="ClientPension1EditReversionary1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="ClientPension1EditReversionary" id="ClientPension1EditReversionary2"
                                disabled={values.ClientEdit1 === "Yes" ? false : true}
                                onChange={handleChange} value="No"
                                checked={values.ClientPension1EditReversionary == "No"} />
                              <label htmlFor="ClientPension1EditReversionary2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}
  
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientPension1Nominated" className="form-label">
                            Nominated Pension Amount
                          </label>
                          <Field
                            id="ClientPension1Nominated"
                            name='ClientPension1Nominated'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientEdit1 === "Yes" ? false : true}
  
                          >
                            <option value="">Select</option>
                            <option value="Minimum">Minimum</option>
                            <option value="Maximum">Maximum</option>
                            <option value="Other">Other</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPension1Nominated" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension1Amount"
                            className="form-label"
                          >
                            Other Amount
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension1Amount"
                            name='ClientPension1Amount'
                            placeholder="Other Amount"
                            disabled={values.ClientPension1Nominated === "Other" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension1Amount' />
                        </div>
                      </div>
  
                    </div>
  
                    {/* Seventh Row Client*/}
  
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientPension1Indexation" className="form-label">
                            Indexation of Pension
                          </label>
                          <Field
                            id="ClientPension1Indexation"
                            name='ClientPension1Indexation'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientPension1Nominated === "Other"  ? false : true}
  
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPension1Indexation" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            New Pension Rollover
                          </label>
  
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0">
                            <div className="radiobutton d-inline-block">
                              <input type="radio" name="ClientPension1EditPension" id="ClientPension1EditPensionopt1"
                                onChange={handleChange} value="Yes"
                                disabled={values.ClientEdit1 === "Yes" ? false : true}
                                checked={values.ClientPension1EditPension == "Yes"} />
                              <label htmlFor="ClientPension1EditPensionopt1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="ClientPension1EditPension" id="ClientPension1EditPensionopt2"
                                onChange={handleChange} value="No"
                                disabled={values.ClientEdit1 === "Yes" ? false : true}
                                checked={values.ClientPension1EditPension == "No"} />
                              <label htmlFor="ClientPension1EditPensionopt2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                            <div className="d-inline-block float-end me-5 mt-2">
                              <FontAwesomeIcon data-bs-toggle="tooltip" data-bs-placement="top" title="Any new pension rollovers will count as a debit towards the Clients Transfer Pension Cap. Any subsequent investment growth will not count towards the Current Transfer Pension Cap of $1.6 Million." icon={faCircleInfo}></FontAwesomeIcon>
                            </div>
                          </div>
                          {/* switch button style */}
  
  
                        </div>
                      </div>
  
                      {values.ClientPension1EditPension == "Yes" &&
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="ClientPension1CommencePension" className="form-label">
                              Commence Pension in Year
                            </label>
                            <Field
                              id="ClientPension1CommencePension"
                              name='ClientPension1CommencePension'
                              className="form-select shadow  inputDesign"
                              as='select'
                              disabled={values.ClientPension1EditPension === "Yes" ? false : true}
  
                            >
                              <option value="">Select</option>
                              <option value="NO">NO</option>
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
                            <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPension1CommencePension" />
                          </div>
                              </div>
                      }
  
  
                      {values.ClientPension1EditPension == "Yes" &&
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension1CurrentPension"
                            className="form-label"
                          >
                            Current Pension Details
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension1CurrentPension"
                            name='ClientPension1CurrentPension'
                            placeholder="Current Pension Details"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension1CurrentPension' />
                        </div>
                      </div>                  
                      }
  
  
                    </div>
  
                    {/* Eighth Row Client */}
                    {values.ClientPension1EditPension == "Yes" &&
                    <div className="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientPension1TotalSuperannuation"
                          className="form-label"
                        >
                          Total Superannuation Benefits
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientPension1TotalSuperannuation"
                          name='ClientPension1TotalSuperannuation'
                          placeholder="Total Superannuation Benefits"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension1TotalSuperannuation' />
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientPension1NominatedRollover"
                          className="form-label"
                        >
                          Nominated Rollover Amount
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientPension1NominatedRollover"
                          name='ClientPension1NominatedRollover'
                          placeholder="Nominated Rollover Amount"
                          disabled={values.ClientPension1EditPension === "Yes" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension1NominatedRollover' />
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientPension1MinimumPension2"
                          className="form-label"
                        >
                          Minimum Pension
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientPension1MinimumPension2"
                          name='ClientPension1MinimumPension2'
                          placeholder="Minimum Pension"
                          disabled />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension1MinimumPension2' />
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientPension1MaximumPension2"
                          className="form-label"
                        >
                          Maximum Pension
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientPension1MaximumPension2"
                          name='ClientPension1MaximumPension2'
                          placeholder="Maximum Pension"
                          disabled />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension1MaximumPension2' />
                      </div>
                    </div>
  
                    </div>
                    }
                    
  
                    {/*Ninth Row Client */}
                    {values.ClientPension1EditPension == "Yes" &&
                      <div className="row">
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label className="form-label">
                          Reversionary Pension Option
                        </label>
  
                        {/* switch button style */}
                        <div className="form-check form-switch m-0 p-0 ">
                          <div className="radiobutton">
                            <input type="radio" name="ClientPension1EditPension2" id="ClientPension1EditPension21"
                              disabled={values.ClientPension1EditPension === "Yes" ? false : true}
                              onChange={handleChange} value="Yes"
                              checked={values.ClientPension1EditPension2 == "Yes"} />
                            <label htmlFor="ClientPension1EditPension21" className="label1">
                              <span>YES</span>
                            </label>
                            <input type="radio" name="ClientPension1EditPension2" id="ClientPension1EditPension22"
                              disabled={values.ClientPension1EditPension === "No" ? true : false}
                              onChange={handleChange} value="No"
                              checked={values.ClientPension1EditPension2 == "No"} />
                            <label htmlFor="ClientPension1EditPension22" className="label2">
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                        {/* switch button style */}
  
  
  
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="ClientPension1NominatedPension2" className="form-label">
                          Nominated Pension Amount
                        </label>
                        <Field
                          id="ClientPension1NominatedPension2"
                          name='ClientPension1NominatedPension2'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.ClientPension1EditPension === "Yes" ? false : true}
  
                        >
                          <option value="">Select</option>
                          <option value="Minimum">Minimum</option>
                          <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPension1NominatedPension2" />
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientPension1OtherAmount2"
                          className="form-label"
                        >
                          Other Amount
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientPension1OtherAmount2"
                          name='ClientPension1OtherAmount2'
                          placeholder="Other Amount"
                          disabled = {values.ClientPension1NominatedPension2=="Other" ? false : true }
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension1OtherAmount2' />
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="ClientPension1Indexation2" className="form-label">
                          Indexation of Pension
                        </label>
                        <Field
                          id="ClientPension1Indexation2"
                          name='ClientPension1Indexation2'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled = {values.ClientPension1NominatedPension2=="Other" ? false : true }
  
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
                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPension1Indexation2" />
                      </div>
                    </div>
  
  
                      </div>
                    }
                    
  
                  </div>
                  {/* Client Pension 1*/}
  
                  {/* Client Pension 1*/}
                  <div>
                    <div classname="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            Client Pension 2
                          </label>
  
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="ClientEdit2" id="ClientEdit2opt1"
                                onChange={handleChange} value="Yes"
                                checked={values.ClientEdit2 == "Yes"} />
                              <label htmlFor="ClientEdit2opt1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="ClientEdit2" id="ClientEdit2opt2"
                                onChange={handleChange} value="No"
  
                                checked={values.ClientEdit2 == "No"} />
                              <label htmlFor="ClientEdit2opt2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}
  
  
                        </div>
                      </div>
                    </div>
  
                    {/* First Row Client*/}
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientPension2Fund" className="form-label">
                            Fund Name
                          </label>
                          <Field
                            id="ClientPension2Fund"
                            name='ClientPension2Fund'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientEdit2 === "Yes" ? false : true}
  
                          >
                            <option value="">Select</option>
                            <option value="AMIST Pension">AMIST Pension</option>
                            <option value="AMP My North Pension -Choice">AMP My North Pension -Choice</option>
                            <option value="AMP My North Pension -Core">AMP My North Pension -Core</option>
                            <option value="AMP MY North Pension -Select">AMP MY North Pension -Select</option>
                            <option value="ANZ Smart Choice Pension">ANZ Smart Choice Pension</option>
                            <option value="Australian Catholic Super & Retirement Fund Pension">Australian Catholic Super & Retirement Fund Pension</option>
                            <option value="Australian Super - Choice Income">Australian Super - Choice Income</option>
                            <option value="Care Super Pension">Care Super Pension</option>
                            <option value="CBUS Super Income Stream">CBUS Super Income Stream</option>
                            <option value="Christian Super Pension">Christian Super Pension</option>
                            <option value="Club Super Pension">Club Super Pension</option>
                            <option value="Colonial First State - Fristchoice Wholesale Pension">Colonial First State - Fristchoice Wholesale Pension</option>
                            <option value="Combined Super Pension">Combined Super Pension</option>
                            <option value="Equip MyPension">Equip MyPension</option>
                            <option value="First State Super Income Stream">First State Super Income Stream</option>
                            <option value="First Super Allocated Pensions">First Super Allocated Pensions</option>
                            <option value="HESTA Income Stream">HESTA Income Stream</option>
                            <option value="HOSTPLUS Retirement Income Accounts">HOSTPLUS Retirement Income Accounts</option>
                            <option value="Intrust Superstream Pension">Intrust Superstream Pension</option>
                            <option value="Kinetic Smart Pension">Kinetic Smart Pension</option>
                            <option value="Legalsuper Pension">Legalsuper Pension</option>
                            <option value="LUCRF Pension">LUCRF Pension</option>
                            <option value="Maritime Super Pension">Maritime Super Pension</option>
                            <option value="Meat Industry Employees Super Pension">Meat Industry Employees Super Pension</option>
                            <option value="Media Super Pension">Media Super Pension</option>
                            <option value="Mine Wealth + Wellbeing Super Account-based Pension">Mine Wealth + Wellbeing Super Account-based Pension</option>
                            <option value="MTAA Super Pension">MTAA Super Pension</option>
                            <option value="My Life My Super Pension">My Life My Super Pension</option>
                            <option value="Nationwide Super Pension">Nationwide Super Pension</option>
                            <option value="NESS Super Pension">NESS Super Pension</option>
                            <option value="NGS Super Income Account ">NGS Super Income Account </option>
                            <option value="Prime Super Income Stream">Prime Super Income Stream</option>
                            <option value="QIEC Income Stream">QIEC Income Stream</option>
                            <option value="REI Super Pension">REI Super Pension</option>
                            <option value="REST Pension">REST Pension</option>
                            <option value="SMSF">SMSF</option>
                            <option value="Statewide Pension">Statewide Pension</option>
                            <option value="Sunsuper Income Account ">Sunsuper Income Account </option>
                            <option value="Tasplan Pension">Tasplan Pension</option>
                            <option value="TWU Super Pension">TWU Super Pension</option>
                            <option value="UniSuper Flexi Pension">UniSuper Flexi Pension</option>
                            <option value="VicSuper Retirement Income">VicSuper Retirement Income</option>
                            <option value="Vision Income Stream">Vision Income Stream</option>
                            <option value="VISSF Super Pension">VISSF Super Pension</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPension2Fund" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientPension2Pension" className="form-label">
                            Pension Type
                          </label>
                          <Field
                            id="ClientPension2Pension"
                            name='ClientPension2Pension'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientEdit2 === "Yes" ? false : true}
  
                          >
                            <option value="">Select</option>
                            <option value="TTR">TTR</option>
                            <option value="Account Based">Account Based</option>
  
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPension2Pension" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientPension2Commence" className="form-label">
                            Commence Pension in Year
                          </label>
                          <Field
                            id="ClientPension2Commence"
                            name='ClientPension2Commence'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientEdit2 === "Yes" ? false : true}
  
                          >
                            <option value="">Select</option>
                            <option value="Existing">Existing</option>
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPension2Commence" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            Apply Deeming
                          </label>
  
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="ClientPension2EditDeeming" id="ClientPension2EditDeeming1"
                                disabled={values.ClientEdit2 === "Yes" ? false : true}
                                onChange={handleChange} value="Yes"
                                checked={values.ClientPension2EditDeeming == "Yes"} />
                              <label htmlFor="ClientPension2EditDeeming1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="ClientPension2EditDeeming" id="ClientPension2EditDeeming2"
                                disabled={values.ClientEdit2 === "Yes" ? false : true}
                                onChange={handleChange} value="No"
                                checked={values.ClientPension2EditDeeming == "No"} />
                              <label htmlFor="ClientPension2EditDeeming2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}
  
  
                        </div>
                      </div>
  
                    </div>
  
                    {/* Second Row Client*/}
  
                    <div className="row">
  
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension2Superannuation"
                            className="form-label"
                          >
                            Total Superannuation Benefits
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension2Superannuation"
                            name='ClientPension2Superannuation'
                            placeholder="Total Superannuation Benefits"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension2Superannuation' />
                        </div>
                      </div>
  
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension2Rollover"
                            className="form-label"
                          >
                            Nominated Rollover Amount
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension2Rollover"
                            name='ClientPension2Rollover'
                            placeholder="Nominated Rollover Amount"
                            disabled={values.ClientEdit2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension2Rollover' />
                        </div>
                      </div>
  
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension2Purchase"
                            className="form-label"
                          >
                            Purchase Price (Less Commut)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension2Purchase"
                            name='ClientPension2Purchase'
                            placeholder="Purchase Price"
                            disabled={values.ClientEdit2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension2Purchase' />
                        </div>
                      </div>
  
  
  
                    </div>
  
                    {/* Third Row Client*/}
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension2TaxFree"
                            className="form-label"
                          >
                            Tax-Free Component
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension2TaxFree"
                            name='ClientPension2TaxFree'
                            placeholder="Tax Free Component"
                            disabled={values.ClientEdit2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension2TaxFree' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension2Centrelink"
                            className="form-label"
                          >
                            Centrelink Relevant Number
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension2Centrelink"
                            name='ClientPension2Centrelink'
                            placeholder="Centrelink Relevant Number"
                            disabled={values.ClientEdit2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension2Centrelink' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientPension2Risk" className="form-label">
                            Risk Profile
                          </label>
                          <Field
                            id="ClientPension2Risk"
                            name='ClientPension2Risk'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientEdit2 === "Yes" ? false : true}>
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPension2Risk" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientPension2Investment" className="form-label">
                            Investment Returns
                          </label>
                          <Field
                            id="ClientPension2Investment"
                            name='ClientPension2Investment'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientEdit2 === "Yes" ? false : true}>
                            <option value="Select">Select</option>
                            <option value="System">System</option>
                            <option value="Input Override">Input Override</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPension2Investment" />
                        </div>
                      </div>
  
                    </div>
  
                    {/* Fourth Row Client */}
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension2Income"
                            className="form-label"
                          >
                            Income Yield
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension2Income"
                            name='ClientPension2Income'
                            placeholder="Income Yield"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension2Income' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension2Growth"
                            className="form-label"
                          >
                            Growth
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension2Growth"
                            name='ClientPension2Growth'
                            placeholder="Growth"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension2Growth' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension2Franking"
                            className="form-label"
                          >
                            Franking
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension2Franking"
                            name='ClientPension2Franking'
                            placeholder="Franking"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension2Franking' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension2Fees"
                            className="form-label"
                          >
                            Fees
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension2Fees"
                            name='ClientPension2Fees'
                            placeholder="Fees"
                            disabled={values.ClientEdit2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension2Fees' />
                        </div>
                      </div>
  
                    </div>
  
                    {/* Fifth Row Client*/}
  
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension2AdviserFees"
                            className="form-label"
                          >
                            Adviser Service Fees
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension2AdviserFees"
                            name='ClientPension2AdviserFees'
                            placeholder="Adviser Service Fees"
                            disabled={values.ClientEdit2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension2AdviserFees' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension2PreservationAge"
                            className="form-label"
                          >
                            Preservation Age
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension2PreservationAge"
                            name='ClientPension2PreservationAge'
                            placeholder="Preservation Age"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension2PreservationAge' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension2PreservationYear"
                            className="form-label"
                          >
                            Preservation Age in Year
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension2PreservationYear"
                            name='ClientPension2PreservationYear'
                            placeholder="Preservation Age in Year"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension2PreservationYear' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension2MinimumPension"
                            className="form-label"
                          >
                            Minimum Pension
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension2MinimumPension"
                            name='ClientPension2MinimumPension'
                            placeholder="Minimum Pension"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension2MinimumPension' />
                        </div>
                      </div>
  
                    </div>
  
                    {/* Sixth Row Client*/}
  
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension2MaximumPension"
                            className="form-label"
                          >
                            Maximum TTR Pension
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension2MaximumPension"
                            name='ClientPension2MaximumPension'
                            placeholder="Maximum TTR Pension"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension2MaximumPension' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            Reversionary Pension Option
                          </label>
  
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="ClientPension2EditReversionary" id="ClientPension2EditReversionary1"
                                disabled={values.ClientEdit2 === "Yes" ? false : true}
                                onChange={handleChange} value="Yes"
                                checked={values.ClientPension2EditReversionary == "Yes"} />
                              <label htmlFor="ClientPension2EditReversionary1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="ClientPension2EditReversionary" id="ClientPension2EditReversionary2"
                                disabled={values.ClientEdit2 === "Yes" ? false : true}
                                onChange={handleChange} value="No"
                                checked={values.ClientPension2EditReversionary == "No"} />
                              <label htmlFor="ClientPension2EditReversionary2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}
  
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientPension2Nominated" className="form-label">
                            Nominated Pension Amount
                          </label>
                          <Field
                            id="ClientPension2Nominated"
                            name='ClientPension2Nominated'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientEdit2 === "Yes" ? false : true}
  
                          >
                            <option value="">Select</option>
                            <option value="Minimum">Minimum</option>
                            <option value="Maximum">Maximum</option>
                            <option value="Other">Other</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPension2Nominated" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension2Amount"
                            className="form-label"
                          >
                            Other Amount
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension2Amount"
                            name='ClientPension2Amount'
                            placeholder="Other Amount"
                            disabled={values.ClientPension2Nominated === "Other" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension2Amount' />
                        </div>
                      </div>
  
                    </div>
  
                    {/* Seventh Row Client*/}
  
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientPension2Indexation" className="form-label">
                            Indexation of Pension
                          </label>
                          <Field
                            id="ClientPension2Indexation"
                            name='ClientPension2Indexation'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientPension2Nominated === "Other" ? false : true}
  
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPension2Indexation" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            New Pension Rollover
                          </label>
  
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0">
                            <div className="radiobutton d-inline-block">
                              <input type="radio" name="ClientPension2EditPension" id="ClientPension2EditPensionopt1"
                                onChange={handleChange} value="Yes"
                                disabled={values.ClientEdit2 === "Yes" ? false : true}
                                checked={values.ClientPension2EditPension == "Yes"} />
                              <label htmlFor="ClientPension2EditPensionopt1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="ClientPension2EditPension" id="ClientPension2EditPensionopt2"
                                onChange={handleChange} value="No"
                                disabled={values.ClientEdit2 === "Yes" ? false : true}
                                checked={values.ClientPension2EditPension == "No"} />
                              <label htmlFor="ClientPension2EditPensionopt2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                            <div className="d-inline-block float-end me-5 mt-2">
                              <FontAwesomeIcon data-bs-toggle="tooltip" data-bs-placement="top" title="Any new pension rollovers will count as a debit towards the Clients Transfer Pension Cap. Any subsequent investment growth will not count towards the Current Transfer Pension Cap of $1.6 Million." icon={faCircleInfo}></FontAwesomeIcon>
                            </div>
                          </div>
                          {/* switch button style */}
  
  
                        </div>
                      </div>
  
                      {values.ClientPension2EditPension == "Yes" &&
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="ClientPension2CommencePension" className="form-label">
                              Commence Pension in Year
                            </label>
                            <Field
                              id="ClientPension2CommencePension"
                              name='ClientPension2CommencePension'
                              className="form-select shadow  inputDesign"
                              as='select'
                              disabled={values.ClientPension2EditPension === "Yes" ? false : true}
  
                            >
                              <option value="">Select</option>
                              <option value="NO">NO</option>
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
                            <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPension2CommencePension" />
                          </div>
                              </div>
                      }
  
  
                      {values.ClientPension2EditPension == "Yes" &&
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientPension2CurrentPension"
                            className="form-label"
                          >
                            Current Pension Details
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientPension2CurrentPension"
                            name='ClientPension2CurrentPension'
                            placeholder="Current Pension Details"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension2CurrentPension' />
                        </div>
                      </div>                  
                      }
  
  
                    </div>
  
                    {/* Eighth Row Client */}
                    {values.ClientPension2EditPension == "Yes" &&
                    <div className="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientPension2TotalSuperannuation"
                          className="form-label"
                        >
                          Total Superannuation Benefits
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientPension2TotalSuperannuation"
                          name='ClientPension2TotalSuperannuation'
                          placeholder="Total Superannuation Benefits"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension2TotalSuperannuation' />
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientPension2NominatedRollover"
                          className="form-label"
                        >
                          Nominated Rollover Amount
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientPension2NominatedRollover"
                          name='ClientPension2NominatedRollover'
                          placeholder="Nominated Rollover Amount"
                          disabled={values.ClientPension2EditPension === "Yes" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension2NominatedRollover' />
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientPension2MinimumPension2"
                          className="form-label"
                        >
                          Minimum Pension
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientPension2MinimumPension2"
                          name='ClientPension2MinimumPension2'
                          placeholder="Minimum Pension"
                          disabled />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension2MinimumPension2' />
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientPension2MaximumPension2"
                          className="form-label"
                        >
                          Maximum Pension
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientPension2MaximumPension2"
                          name='ClientPension2MaximumPension2'
                          placeholder="Maximum Pension"
                          disabled />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension2MaximumPension2' />
                      </div>
                    </div>
  
                    </div>
                    }
                    
  
                    {/*Ninth Row Client */}
                    {values.ClientPension2EditPension == "Yes" &&
                      <div className="row">
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label className="form-label">
                          Reversionary Pension Option
                        </label>
  
                        {/* switch button style */}
                        <div className="form-check form-switch m-0 p-0 ">
                          <div className="radiobutton">
                            <input type="radio" name="ClientPension2EditPension2" id="ClientPension2EditPension21"
                              disabled={values.ClientPension2EditPension === "Yes" ? false : true}
                              onChange={handleChange} value="Yes"
                              checked={values.ClientPension2EditPension2 == "Yes"} />
                            <label htmlFor="ClientPension2EditPension21" className="label1">
                              <span>YES</span>
                            </label>
                            <input type="radio" name="ClientPension2EditPension2" id="ClientPension2EditPension22"
                              disabled={values.ClientPension2EditPension === "No" ? true : false}
                              onChange={handleChange} value="No"
                              checked={values.ClientPension2EditPension2 == "No"} />
                            <label htmlFor="ClientPension2EditPension22" className="label2">
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                        {/* switch button style */}
  
  
  
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="ClientPension2NominatedPension2" className="form-label">
                          Nominated Pension Amount
                        </label>
                        <Field
                          id="ClientPension2NominatedPension2"
                          name='ClientPension2NominatedPension2'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.ClientPension2EditPension === "Yes" ? false : true}
  
                        >
                          <option value="">Select</option>
                          <option value="Minimum">Minimum</option>
                          <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPension2NominatedPension2" />
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientPension2OtherAmount2"
                          className="form-label"
                        >
                          Other Amount
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientPension2OtherAmount2"
                          name='ClientPension2OtherAmount2'
                          placeholder="Other Amount"
                          disabled= {values.ClientPension2NominatedPension2 === "Other" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='ClientPension2OtherAmount2' />
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="ClientPension2Indexation2" className="form-label">
                          Indexation of Pension
                        </label>
                        <Field
                          id="ClientPension2Indexation2"
                          name='ClientPension2Indexation2'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled= {values.ClientPension2NominatedPension2 === "Other" ? false : true}
  
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
                        <ErrorMessage component='div' className='text-danger fw-bold' name="ClientPension2Indexation2" />
                      </div>
                    </div>
  
  
                      </div>
                    }
                    
  
                  </div>
                  {/* Client Pension 1*/}
                </>}
                
                {values.Account == "No" && <>
                    {/* Partner Pension 1*/}
                    <div>
                    <div classname="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            Partner Pension 1
                          </label>
  
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="PartnerEdit1" id="PartnerEdit1opt1"
                                onChange={handleChange} value="Yes"
                                checked={values.PartnerEdit1 == "Yes"} />
                              <label htmlFor="PartnerEdit1opt1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="PartnerEdit1" id="PartnerEdit1opt2"
                                onChange={handleChange} value="No"
  
                                checked={values.PartnerEdit1 == "No"} />
                              <label htmlFor="PartnerEdit1opt2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}
  
  
                        </div>
                      </div>
                    </div>
  
                    {/* First Row Partner*/}
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerPension1Fund" className="form-label">
                            Fund Name
                          </label>
                          <Field
                            id="PartnerPension1Fund"
                            name='PartnerPension1Fund'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerEdit1 === "Yes" ? false : true}
  
                          >
                            <option value="">Select</option>
                            <option value="AMIST Pension">AMIST Pension</option>
                            <option value="AMP My North Pension -Choice">AMP My North Pension -Choice</option>
                            <option value="AMP My North Pension -Core">AMP My North Pension -Core</option>
                            <option value="AMP MY North Pension -Select">AMP MY North Pension -Select</option>
                            <option value="ANZ Smart Choice Pension">ANZ Smart Choice Pension</option>
                            <option value="Australian Catholic Super & Retirement Fund Pension">Australian Catholic Super & Retirement Fund Pension</option>
                            <option value="Australian Super - Choice Income">Australian Super - Choice Income</option>
                            <option value="Care Super Pension">Care Super Pension</option>
                            <option value="CBUS Super Income Stream">CBUS Super Income Stream</option>
                            <option value="Christian Super Pension">Christian Super Pension</option>
                            <option value="Club Super Pension">Club Super Pension</option>
                            <option value="Colonial First State - Fristchoice Wholesale Pension">Colonial First State - Fristchoice Wholesale Pension</option>
                            <option value="Combined Super Pension">Combined Super Pension</option>
                            <option value="Equip MyPension">Equip MyPension</option>
                            <option value="First State Super Income Stream">First State Super Income Stream</option>
                            <option value="First Super Allocated Pensions">First Super Allocated Pensions</option>
                            <option value="HESTA Income Stream">HESTA Income Stream</option>
                            <option value="HOSTPLUS Retirement Income Accounts">HOSTPLUS Retirement Income Accounts</option>
                            <option value="Intrust Superstream Pension">Intrust Superstream Pension</option>
                            <option value="Kinetic Smart Pension">Kinetic Smart Pension</option>
                            <option value="Legalsuper Pension">Legalsuper Pension</option>
                            <option value="LUCRF Pension">LUCRF Pension</option>
                            <option value="Maritime Super Pension">Maritime Super Pension</option>
                            <option value="Meat Industry Employees Super Pension">Meat Industry Employees Super Pension</option>
                            <option value="Media Super Pension">Media Super Pension</option>
                            <option value="Mine Wealth + Wellbeing Super Account-based Pension">Mine Wealth + Wellbeing Super Account-based Pension</option>
                            <option value="MTAA Super Pension">MTAA Super Pension</option>
                            <option value="My Life My Super Pension">My Life My Super Pension</option>
                            <option value="Nationwide Super Pension">Nationwide Super Pension</option>
                            <option value="NESS Super Pension">NESS Super Pension</option>
                            <option value="NGS Super Income Account ">NGS Super Income Account </option>
                            <option value="Prime Super Income Stream">Prime Super Income Stream</option>
                            <option value="QIEC Income Stream">QIEC Income Stream</option>
                            <option value="REI Super Pension">REI Super Pension</option>
                            <option value="REST Pension">REST Pension</option>
                            <option value="SMSF">SMSF</option>
                            <option value="Statewide Pension">Statewide Pension</option>
                            <option value="Sunsuper Income Account ">Sunsuper Income Account </option>
                            <option value="Tasplan Pension">Tasplan Pension</option>
                            <option value="TWU Super Pension">TWU Super Pension</option>
                            <option value="UniSuper Flexi Pension">UniSuper Flexi Pension</option>
                            <option value="VicSuper Retirement Income">VicSuper Retirement Income</option>
                            <option value="Vision Income Stream">Vision Income Stream</option>
                            <option value="VISSF Super Pension">VISSF Super Pension</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPension1Fund" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerPension1Pension" className="form-label">
                            Pension Type
                          </label>
                          <Field
                            id="PartnerPension1Pension"
                            name='PartnerPension1Pension'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerEdit1 === "Yes" ? false : true}
  
                          >
                            <option value="">Select</option>
                            <option value="TTR">TTR</option>
                            <option value="Account Based">Account Based</option>
  
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPension1Pension" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerPension1Commence" className="form-label">
                            Commence Pension in Year
                          </label>
                          <Field
                            id="PartnerPension1Commence"
                            name='PartnerPension1Commence'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerEdit1 === "Yes" ? false : true}
  
                          >
                            <option value="">Select</option>
                            <option value="Existing">Existing</option>
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPension1Commence" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            Apply Deeming
                          </label>
  
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="PartnerPension1EditDeeming" id="PartnerPension1EditDeeming1"
                                disabled={values.PartnerEdit1 === "Yes" ? false : true}
                                onChange={handleChange} value="Yes"
                                checked={values.PartnerPension1EditDeeming == "Yes"} />
                              <label htmlFor="PartnerPension1EditDeeming1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="PartnerPension1EditDeeming" id="PartnerPension1EditDeeming2"
                                disabled={values.PartnerEdit1 === "Yes" ? false : true}
                                onChange={handleChange} value="No"
                                checked={values.PartnerPension1EditDeeming == "No"} />
                              <label htmlFor="PartnerPension1EditDeeming2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}
  
  
                        </div>
                      </div>
  
                    </div>
  
                    {/* Second Row Partner*/}
  
                    <div className="row">
  
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension1Superannuation"
                            className="form-label"
                          >
                            Total Superannuation Benefits
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension1Superannuation"
                            name='PartnerPension1Superannuation'
                            placeholder="Total Superannuation Benefits"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension1Superannuation' />
                        </div>
                      </div>
  
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension1Rollover"
                            className="form-label"
                          >
                            Nominated Rollover Amount
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension1Rollover"
                            name='PartnerPension1Rollover'
                            placeholder="Nominated Rollover Amount"
                            disabled={values.PartnerEdit1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension1Rollover' />
                        </div>
                      </div>
  
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension1Purchase"
                            className="form-label"
                          >
                            Purchase Price (Less Commut)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension1Purchase"
                            name='PartnerPension1Purchase'
                            placeholder="Purchase Price"
                            disabled={values.PartnerEdit1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension1Purchase' />
                        </div>
                      </div>
  
  
  
                    </div>
  
                    {/* Third Row Partner*/}
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension1TaxFree"
                            className="form-label"
                          >
                            Tax-Free Component
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension1TaxFree"
                            name='PartnerPension1TaxFree'
                            placeholder="Tax Free Component"
                            disabled={values.PartnerEdit1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension1TaxFree' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension1Centrelink"
                            className="form-label"
                          >
                            Centrelink Relevant Number
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension1Centrelink"
                            name='PartnerPension1Centrelink'
                            placeholder="Centrelink Relevant Number"
                            disabled={values.PartnerEdit1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension1Centrelink' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerPension1Risk" className="form-label">
                            Risk Profile
                          </label>
                          <Field
                            id="PartnerPension1Risk"
                            name='PartnerPension1Risk'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerEdit1 === "Yes" ? false : true}>
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPension1Risk" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerPension1Investment" className="form-label">
                            Investment Returns
                          </label>
                          <Field
                            id="PartnerPension1Investment"
                            name='PartnerPension1Investment'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerEdit1 === "Yes" ? false : true}>
                            <option value="Select">Select</option>
                            <option value="System">System</option>
                            <option value="Input Override">Input Override</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPension1Investment" />
                        </div>
                      </div>
  
                    </div>
  
                    {/* Fourth Row Partner */}
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension1Income"
                            className="form-label"
                          >
                            Income Yield
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension1Income"
                            name='PartnerPension1Income'
                            placeholder="Income Yield"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension1Income' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension1Growth"
                            className="form-label"
                          >
                            Growth
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension1Growth"
                            name='PartnerPension1Growth'
                            placeholder="Growth"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension1Growth' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension1Franking"
                            className="form-label"
                          >
                            Franking
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension1Franking"
                            name='PartnerPension1Franking'
                            placeholder="Franking"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension1Franking' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension1Fees"
                            className="form-label"
                          >
                            Fees
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension1Fees"
                            name='PartnerPension1Fees'
                            placeholder="Fees"
                            disabled={values.PartnerEdit1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension1Fees' />
                        </div>
                      </div>
  
                    </div>
  
                    {/* Fifth Row Partner*/}
  
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension1AdviserFees"
                            className="form-label"
                          >
                            Adviser Service Fees
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension1AdviserFees"
                            name='PartnerPension1AdviserFees'
                            placeholder="Adviser Service Fees"
                            disabled={values.PartnerEdit1 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension1AdviserFees' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension1PreservationAge"
                            className="form-label"
                          >
                            Preservation Age
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension1PreservationAge"
                            name='PartnerPension1PreservationAge'
                            placeholder="Preservation Age"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension1PreservationAge' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension1PreservationYear"
                            className="form-label"
                          >
                            Preservation Age in Year
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension1PreservationYear"
                            name='PartnerPension1PreservationYear'
                            placeholder="Preservation Age in Year"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension1PreservationYear' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension1MinimumPension"
                            className="form-label"
                          >
                            Minimum Pension
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension1MinimumPension"
                            name='PartnerPension1MinimumPension'
                            placeholder="Minimum Pension"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension1MinimumPension' />
                        </div>
                      </div>
  
                    </div>
  
                    {/* Sixth Row Partner*/}
  
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension1MaximumPension"
                            className="form-label"
                          >
                            Maximum TTR Pension
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension1MaximumPension"
                            name='PartnerPension1MaximumPension'
                            placeholder="Maximum TTR Pension"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension1MaximumPension' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            Reversionary Pension Option
                          </label>
  
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="PartnerPension1EditReversionary" id="PartnerPension1EditReversionary1"
                                disabled={values.PartnerEdit1 === "Yes" ? false : true}
                                onChange={handleChange} value="Yes"
                                checked={values.PartnerPension1EditReversionary == "Yes"} />
                              <label htmlFor="PartnerPension1EditReversionary1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="PartnerPension1EditReversionary" id="PartnerPension1EditReversionary2"
                                disabled={values.PartnerEdit1 === "Yes" ? false : true}
                                onChange={handleChange} value="No"
                                checked={values.PartnerPension1EditReversionary == "No"} />
                              <label htmlFor="PartnerPension1EditReversionary2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}
  
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerPension1Nominated" className="form-label">
                            Nominated Pension Amount
                          </label>
                          <Field
                            id="PartnerPension1Nominated"
                            name='PartnerPension1Nominated'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerEdit1 === "Yes" ? false : true}
  
                          >
                            <option value="">Select</option>
                            <option value="Minimum">Minimum</option>
                            <option value="Maximum">Maximum</option>
                            <option value="Other">Other</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPension1Nominated" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension1Amount"
                            className="form-label"
                          >
                            Other Amount
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension1Amount"
                            name='PartnerPension1Amount'
                            placeholder="Other Amount"
                            disabled={values.PartnerPension1Nominated === "Other" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension1Amount' />
                        </div>
                      </div>
  
                    </div>
  
                    {/* Seventh Row Partner*/}
  
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerPension1Indexation" className="form-label">
                            Indexation of Pension
                          </label>
                          <Field
                            id="PartnerPension1Indexation"
                            name='PartnerPension1Indexation'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerPension1Nominated === "Other" ? false : true}
  
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPension1Indexation" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            New Pension Rollover
                          </label>
  
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0">
                            <div className="radiobutton d-inline-block">
                              <input type="radio" name="PartnerPension1EditPension" id="PartnerPension1EditPensionopt1"
                                onChange={handleChange} value="Yes"
                                disabled={values.PartnerEdit1 === "Yes" ? false : true}
                                checked={values.PartnerPension1EditPension == "Yes"} />
                              <label htmlFor="PartnerPension1EditPensionopt1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="PartnerPension1EditPension" id="PartnerPension1EditPensionopt2"
                                onChange={handleChange} value="No"
                                disabled={values.PartnerEdit1 === "Yes" ? false : true}
                                checked={values.PartnerPension1EditPension == "No"} />
                              <label htmlFor="PartnerPension1EditPensionopt2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                            <div className="d-inline-block float-end me-5 mt-2">
                              <FontAwesomeIcon data-bs-toggle="tooltip" data-bs-placement="top" title="Any new pension rollovers will count as a debit towards the Partners Transfer Pension Cap. Any subsequent investment growth will not count towards the Current Transfer Pension Cap of $1.6 Million." icon={faCircleInfo}></FontAwesomeIcon>
                            </div>
                          </div>
                          {/* switch button style */}
  
  
                        </div>
                      </div>
  
                      {values.PartnerPension1EditPension == "Yes" &&
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="PartnerPension1CommencePension" className="form-label">
                              Commence Pension in Year
                            </label>
                            <Field
                              id="PartnerPension1CommencePension"
                              name='PartnerPension1CommencePension'
                              className="form-select shadow  inputDesign"
                              as='select'
                              disabled={values.PartnerPension1EditPension === "Yes" ? false : true}
  
                            >
                              <option value="">Select</option>
                              <option value="NO">NO</option>
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
                            <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPension1CommencePension" />
                          </div>
                              </div>
                      }
  
  
                      {values.PartnerPension1EditPension == "Yes" &&
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension1CurrentPension"
                            className="form-label"
                          >
                            Current Pension Details
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension1CurrentPension"
                            name='PartnerPension1CurrentPension'
                            placeholder="Current Pension Details"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension1CurrentPension' />
                        </div>
                      </div>                  
                      }
  
  
                    </div>
  
                    {/* Eighth Row Partner */}
                    {values.PartnerPension1EditPension == "Yes" &&
                    <div className="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerPension1TotalSuperannuation"
                          className="form-label"
                        >
                          Total Superannuation Benefits
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerPension1TotalSuperannuation"
                          name='PartnerPension1TotalSuperannuation'
                          placeholder="Total Superannuation Benefits"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension1TotalSuperannuation' />
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerPension1NominatedRollover"
                          className="form-label"
                        >
                          Nominated Rollover Amount
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerPension1NominatedRollover"
                          name='PartnerPension1NominatedRollover'
                          placeholder="Nominated Rollover Amount"
                          disabled={values.PartnerPension1EditPension === "Yes" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension1NominatedRollover' />
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerPension1MinimumPension2"
                          className="form-label"
                        >
                          Minimum Pension
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerPension1MinimumPension2"
                          name='PartnerPension1MinimumPension2'
                          placeholder="Minimum Pension"
                          disabled />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension1MinimumPension2' />
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerPension1MaximumPension2"
                          className="form-label"
                        >
                          Maximum Pension
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerPension1MaximumPension2"
                          name='PartnerPension1MaximumPension2'
                          placeholder="Maximum Pension"
                          disabled />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension1MaximumPension2' />
                      </div>
                    </div>
  
                    </div>
                    }
                    
  
                    {/*Ninth Row Partner */}
                    {values.PartnerPension1EditPension == "Yes" &&
                      <div className="row">
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label className="form-label">
                          Reversionary Pension Option
                        </label>
  
                        {/* switch button style */}
                        <div className="form-check form-switch m-0 p-0 ">
                          <div className="radiobutton">
                            <input type="radio" name="PartnerPension1EditPension2" id="PartnerPension1EditPension21"
                              disabled={values.PartnerPension1EditPension === "Yes" ? false : true}
                              onChange={handleChange} value="Yes"
                              checked={values.PartnerPension1EditPension2 == "Yes"} />
                            <label htmlFor="PartnerPension1EditPension21" className="label1">
                              <span>YES</span>
                            </label>
                            <input type="radio" name="PartnerPension1EditPension2" id="PartnerPension1EditPension22"
                              disabled={values.PartnerPension1EditPension === "No" ? true : false}
                              onChange={handleChange} value="No"
                              checked={values.PartnerPension1EditPension2 == "No"} />
                            <label htmlFor="PartnerPension1EditPension22" className="label2">
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                        {/* switch button style */}
  
  
  
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="PartnerPension1NominatedPension2" className="form-label">
                          Nominated Pension Amount
                        </label>
                        <Field
                          id="PartnerPension1NominatedPension2"
                          name='PartnerPension1NominatedPension2'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.PartnerPension1EditPension === "Yes" ? false : true}
  
                        >
                          <option value="">Select</option>
                          <option value="Minimum">Minimum</option>
                          <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPension1NominatedPension2" />
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerPension1OtherAmount2"
                          className="form-label"
                        >
                          Other Amount
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerPension1OtherAmount2"
                          name='PartnerPension1OtherAmount2'
                          placeholder="Other Amount"
                          disabled={values.PartnerPension1NominatedPension2=="Other"?false:true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension1OtherAmount2' />
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="PartnerPension1Indexation2" className="form-label">
                          Indexation of Pension
                        </label>
                        <Field
                          id="PartnerPension1Indexation2"
                          name='PartnerPension1Indexation2'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.PartnerPension1NominatedPension2=="Other"?false:true}
  
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
                        <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPension1Indexation2" />
                      </div>
                    </div>
  
  
                      </div>
                    }
                    
  
                  </div>
                  {/* Partner Pension 1*/}
  
                  {/* Partner Pension 1*/}
                  <div>
                    <div classname="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            Partner Pension 2
                          </label>
  
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="PartnerEdit2" id="PartnerEdit2opt1"
                                onChange={handleChange} value="Yes"
                                checked={values.PartnerEdit2 == "Yes"} />
                              <label htmlFor="PartnerEdit2opt1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="PartnerEdit2" id="PartnerEdit2opt2"
                                onChange={handleChange} value="No"
  
                                checked={values.PartnerEdit2 == "No"} />
                              <label htmlFor="PartnerEdit2opt2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}
  
  
                        </div>
                      </div>
                    </div>
  
                    {/* First Row Partner*/}
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerPension2Fund" className="form-label">
                            Fund Name
                          </label>
                          <Field
                            id="PartnerPension2Fund"
                            name='PartnerPension2Fund'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerEdit2 === "Yes" ? false : true}
  
                          >
                            <option value="">Select</option>
                            <option value="AMIST Pension">AMIST Pension</option>
                            <option value="AMP My North Pension -Choice">AMP My North Pension -Choice</option>
                            <option value="AMP My North Pension -Core">AMP My North Pension -Core</option>
                            <option value="AMP MY North Pension -Select">AMP MY North Pension -Select</option>
                            <option value="ANZ Smart Choice Pension">ANZ Smart Choice Pension</option>
                            <option value="Australian Catholic Super & Retirement Fund Pension">Australian Catholic Super & Retirement Fund Pension</option>
                            <option value="Australian Super - Choice Income">Australian Super - Choice Income</option>
                            <option value="Care Super Pension">Care Super Pension</option>
                            <option value="CBUS Super Income Stream">CBUS Super Income Stream</option>
                            <option value="Christian Super Pension">Christian Super Pension</option>
                            <option value="Club Super Pension">Club Super Pension</option>
                            <option value="Colonial First State - Fristchoice Wholesale Pension">Colonial First State - Fristchoice Wholesale Pension</option>
                            <option value="Combined Super Pension">Combined Super Pension</option>
                            <option value="Equip MyPension">Equip MyPension</option>
                            <option value="First State Super Income Stream">First State Super Income Stream</option>
                            <option value="First Super Allocated Pensions">First Super Allocated Pensions</option>
                            <option value="HESTA Income Stream">HESTA Income Stream</option>
                            <option value="HOSTPLUS Retirement Income Accounts">HOSTPLUS Retirement Income Accounts</option>
                            <option value="Intrust Superstream Pension">Intrust Superstream Pension</option>
                            <option value="Kinetic Smart Pension">Kinetic Smart Pension</option>
                            <option value="Legalsuper Pension">Legalsuper Pension</option>
                            <option value="LUCRF Pension">LUCRF Pension</option>
                            <option value="Maritime Super Pension">Maritime Super Pension</option>
                            <option value="Meat Industry Employees Super Pension">Meat Industry Employees Super Pension</option>
                            <option value="Media Super Pension">Media Super Pension</option>
                            <option value="Mine Wealth + Wellbeing Super Account-based Pension">Mine Wealth + Wellbeing Super Account-based Pension</option>
                            <option value="MTAA Super Pension">MTAA Super Pension</option>
                            <option value="My Life My Super Pension">My Life My Super Pension</option>
                            <option value="Nationwide Super Pension">Nationwide Super Pension</option>
                            <option value="NESS Super Pension">NESS Super Pension</option>
                            <option value="NGS Super Income Account ">NGS Super Income Account </option>
                            <option value="Prime Super Income Stream">Prime Super Income Stream</option>
                            <option value="QIEC Income Stream">QIEC Income Stream</option>
                            <option value="REI Super Pension">REI Super Pension</option>
                            <option value="REST Pension">REST Pension</option>
                            <option value="SMSF">SMSF</option>
                            <option value="Statewide Pension">Statewide Pension</option>
                            <option value="Sunsuper Income Account ">Sunsuper Income Account </option>
                            <option value="Tasplan Pension">Tasplan Pension</option>
                            <option value="TWU Super Pension">TWU Super Pension</option>
                            <option value="UniSuper Flexi Pension">UniSuper Flexi Pension</option>
                            <option value="VicSuper Retirement Income">VicSuper Retirement Income</option>
                            <option value="Vision Income Stream">Vision Income Stream</option>
                            <option value="VISSF Super Pension">VISSF Super Pension</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPension2Fund" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerPension2Pension" className="form-label">
                            Pension Type
                          </label>
                          <Field
                            id="PartnerPension2Pension"
                            name='PartnerPension2Pension'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerEdit2 === "Yes" ? false : true}
  
                          >
                            <option value="">Select</option>
                            <option value="TTR">TTR</option>
                            <option value="Account Based">Account Based</option>
  
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPension2Pension" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerPension2Commence" className="form-label">
                            Commence Pension in Year
                          </label>
                          <Field
                            id="PartnerPension2Commence"
                            name='PartnerPension2Commence'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerEdit2 === "Yes" ? false : true}
  
                          >
                            <option value="">Select</option>
                            <option value="Existing">Existing</option>
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPension2Commence" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            Apply Deeming
                          </label>
  
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="PartnerPension2EditDeeming" id="PartnerPension2EditDeeming1"
                                disabled={values.PartnerEdit2 === "Yes" ? false : true}
                                onChange={handleChange} value="Yes"
                                checked={values.PartnerPension2EditDeeming == "Yes"} />
                              <label htmlFor="PartnerPension2EditDeeming1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="PartnerPension2EditDeeming" id="PartnerPension2EditDeeming2"
                                disabled={values.PartnerEdit2 === "Yes" ? false : true}
                                onChange={handleChange} value="No"
                                checked={values.PartnerPension2EditDeeming == "No"} />
                              <label htmlFor="PartnerPension2EditDeeming2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}
  
  
                        </div>
                      </div>
  
                    </div>
  
                    {/* Second Row Partner*/}
  
                    <div className="row">
  
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension2Superannuation"
                            className="form-label"
                          >
                            Total Superannuation Benefits
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension2Superannuation"
                            name='PartnerPension2Superannuation'
                            placeholder="Total Superannuation Benefits"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension2Superannuation' />
                        </div>
                      </div>
  
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension2Rollover"
                            className="form-label"
                          >
                            Nominated Rollover Amount
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension2Rollover"
                            name='PartnerPension2Rollover'
                            placeholder="Nominated Rollover Amount"
                            disabled={values.PartnerEdit2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension2Rollover' />
                        </div>
                      </div>
  
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension2Purchase"
                            className="form-label"
                          >
                            Purchase Price (Less Commut)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension2Purchase"
                            name='PartnerPension2Purchase'
                            placeholder="Purchase Price"
                            disabled={values.PartnerEdit2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension2Purchase' />
                        </div>
                      </div>
  
  
  
                    </div>
  
                    {/* Third Row Partner*/}
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension2TaxFree"
                            className="form-label"
                          >
                            Tax-Free Component
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension2TaxFree"
                            name='PartnerPension2TaxFree'
                            placeholder="Tax Free Component"
                            disabled={values.PartnerEdit2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension2TaxFree' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension2Centrelink"
                            className="form-label"
                          >
                            Centrelink Relevant Number
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension2Centrelink"
                            name='PartnerPension2Centrelink'
                            placeholder="Centrelink Relevant Number"
                            disabled={values.PartnerEdit2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension2Centrelink' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerPension2Risk" className="form-label">
                            Risk Profile
                          </label>
                          <Field
                            id="PartnerPension2Risk"
                            name='PartnerPension2Risk'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerEdit2 === "Yes" ? false : true}>
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPension2Risk" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerPension2Investment" className="form-label">
                            Investment Returns
                          </label>
                          <Field
                            id="PartnerPension2Investment"
                            name='PartnerPension2Investment'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerEdit2 === "Yes" ? false : true}>
                            <option value="Select">Select</option>
                            <option value="System">System</option>
                            <option value="Input Override">Input Override</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPension2Investment" />
                        </div>
                      </div>
  
                    </div>
  
                    {/* Fourth Row Partner */}
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension2Income"
                            className="form-label"
                          >
                            Income Yield
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension2Income"
                            name='PartnerPension2Income'
                            placeholder="Income Yield"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension2Income' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension2Growth"
                            className="form-label"
                          >
                            Growth
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension2Growth"
                            name='PartnerPension2Growth'
                            placeholder="Growth"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension2Growth' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension2Franking"
                            className="form-label"
                          >
                            Franking
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension2Franking"
                            name='PartnerPension2Franking'
                            placeholder="Franking"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension2Franking' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension2Fees"
                            className="form-label"
                          >
                            Fees
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension2Fees"
                            name='PartnerPension2Fees'
                            placeholder="Fees"
                            disabled={values.PartnerEdit2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension2Fees' />
                        </div>
                      </div>
  
                    </div>
  
                    {/* Fifth Row Partner*/}
  
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension2AdviserFees"
                            className="form-label"
                          >
                            Adviser Service Fees
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension2AdviserFees"
                            name='PartnerPension2AdviserFees'
                            placeholder="Adviser Service Fees"
                            disabled={values.PartnerEdit2 === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension2AdviserFees' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension2PreservationAge"
                            className="form-label"
                          >
                            Preservation Age
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension2PreservationAge"
                            name='PartnerPension2PreservationAge'
                            placeholder="Preservation Age"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension2PreservationAge' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension2PreservationYear"
                            className="form-label"
                          >
                            Preservation Age in Year
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension2PreservationYear"
                            name='PartnerPension2PreservationYear'
                            placeholder="Preservation Age in Year"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension2PreservationYear' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension2MinimumPension"
                            className="form-label"
                          >
                            Minimum Pension
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension2MinimumPension"
                            name='PartnerPension2MinimumPension'
                            placeholder="Minimum Pension"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension2MinimumPension' />
                        </div>
                      </div>
  
                    </div>
  
                    {/* Sixth Row Partner*/}
  
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension2MaximumPension"
                            className="form-label"
                          >
                            Maximum TTR Pension
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension2MaximumPension"
                            name='PartnerPension2MaximumPension'
                            placeholder="Maximum TTR Pension"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension2MaximumPension' />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            Reversionary Pension Option
                          </label>
  
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="PartnerPension2EditReversionary" id="PartnerPension2EditReversionary1"
                                disabled={values.PartnerEdit2 === "Yes" ? false : true}
                                onChange={handleChange} value="Yes"
                                checked={values.PartnerPension2EditReversionary == "Yes"} />
                              <label htmlFor="PartnerPension2EditReversionary1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="PartnerPension2EditReversionary" id="PartnerPension2EditReversionary2"
                                disabled={values.PartnerEdit2 === "Yes" ? false : true}
                                onChange={handleChange} value="No"
                                checked={values.PartnerPension2EditReversionary == "No"} />
                              <label htmlFor="PartnerPension2EditReversionary2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}
  
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerPension2Nominated" className="form-label">
                            Nominated Pension Amount
                          </label>
                          <Field
                            id="PartnerPension2Nominated"
                            name='PartnerPension2Nominated'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerEdit2 === "Yes" ? false : true}
  
                          >
                            <option value="">Select</option>
                            <option value="Minimum">Minimum</option>
                            <option value="Maximum">Maximum</option>
                            <option value="Other">Other</option>
                          </Field>
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPension2Nominated" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension2Amount"
                            className="form-label"
                          >
                            Other Amount
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension2Amount"
                            name='PartnerPension2Amount'
                            placeholder="Other Amount"
                            disabled={values.PartnerPension2Nominated == "Other" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension2Amount' />
                        </div>
                      </div>
  
                    </div>
  
                    {/* Seventh Row Partner*/}
  
                    <div className="row">
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerPension2Indexation" className="form-label">
                            Indexation of Pension
                          </label>
                          <Field
                            id="PartnerPension2Indexation"
                            name='PartnerPension2Indexation'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerPension2Nominated == "Other" ? false : true}
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPension2Indexation" />
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            New Pension Rollover
                          </label>
  
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0">
                            <div className="radiobutton d-inline-block">
                              <input type="radio" name="PartnerPension2EditPension" id="PartnerPension2EditPensionopt1"
                                onChange={handleChange} value="Yes"
                                disabled={values.PartnerEdit2 === "Yes" ? false : true}
                                checked={values.PartnerPension2EditPension == "Yes"} />
                              <label htmlFor="PartnerPension2EditPensionopt1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="PartnerPension2EditPension" id="PartnerPension2EditPensionopt2"
                                onChange={handleChange} value="No"
                                disabled={values.PartnerEdit2 === "Yes" ? false : true}
                                checked={values.PartnerPension2EditPension == "No"} />
                              <label htmlFor="PartnerPension2EditPensionopt2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                            <div className="d-inline-block float-end me-5 mt-2">
                              <FontAwesomeIcon data-bs-toggle="tooltip" data-bs-placement="top" title="Any new pension rollovers will count as a debit towards the Partners Transfer Pension Cap. Any subsequent investment growth will not count towards the Current Transfer Pension Cap of $1.6 Million." icon={faCircleInfo}></FontAwesomeIcon>
                            </div>
                          </div>
                          {/* switch button style */}
  
  
                        </div>
                      </div>
  
                      {values.PartnerPension2EditPension == "Yes" &&
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="PartnerPension2CommencePension" className="form-label">
                              Commence Pension in Year
                            </label>
                            <Field
                              id="PartnerPension2CommencePension"
                              name='PartnerPension2CommencePension'
                              className="form-select shadow  inputDesign"
                              as='select'
                              disabled={values.PartnerPension2EditPension === "Yes" ? false : true}
  
                            >
                              <option value="">Select</option>
                              <option value="NO">NO</option>
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
                            <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPension2CommencePension" />
                          </div>
                              </div>
                      }
  
  
                      {values.PartnerPension2EditPension == "Yes" &&
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerPension2CurrentPension"
                            className="form-label"
                          >
                            Current Pension Details
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerPension2CurrentPension"
                            name='PartnerPension2CurrentPension'
                            placeholder="Current Pension Details"
                            disabled
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension2CurrentPension' />
                        </div>
                      </div>                  
                      }
  
  
                    </div>
  
                    {/* Eighth Row Partner */}
                    {values.PartnerPension2EditPension == "Yes" &&
                    <div className="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerPension2TotalSuperannuation"
                          className="form-label"
                        >
                          Total Superannuation Benefits
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerPension2TotalSuperannuation"
                          name='PartnerPension2TotalSuperannuation'
                          placeholder="Total Superannuation Benefits"
                          disabled
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension2TotalSuperannuation' />
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerPension2NominatedRollover"
                          className="form-label"
                        >
                          Nominated Rollover Amount
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerPension2NominatedRollover"
                          name='PartnerPension2NominatedRollover'
                          placeholder="Nominated Rollover Amount"
                          disabled={values.PartnerPension2EditPension === "Yes" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension2NominatedRollover' />
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerPension2MinimumPension2"
                          className="form-label"
                        >
                          Minimum Pension
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerPension2MinimumPension2"
                          name='PartnerPension2MinimumPension2'
                          placeholder="Minimum Pension"
                          disabled />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension2MinimumPension2' />
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerPension2MaximumPension2"
                          className="form-label"
                        >
                          Maximum Pension
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerPension2MaximumPension2"
                          name='PartnerPension2MaximumPension2'
                          placeholder="Maximum Pension"
                          disabled />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension2MaximumPension2' />
                      </div>
                    </div>
  
                    </div>
                    }
                    
  
                    {/*Ninth Row Partner */}
                    {values.PartnerPension2EditPension == "Yes" &&
                      <div className="row">
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label className="form-label">
                          Reversionary Pension Option
                        </label>
  
                        {/* switch button style */}
                        <div className="form-check form-switch m-0 p-0 ">
                          <div className="radiobutton">
                            <input type="radio" name="PartnerPension2EditPension2" id="PartnerPension2EditPension21"
                              disabled={values.PartnerPension2EditPension === "Yes" ? false : true}
                              onChange={handleChange} value="Yes"
                              checked={values.PartnerPension2EditPension2 == "Yes"} />
                            <label htmlFor="PartnerPension2EditPension21" className="label1">
                              <span>YES</span>
                            </label>
                            <input type="radio" name="PartnerPension2EditPension2" id="PartnerPension2EditPension22"
                              disabled={values.PartnerPension2EditPension === "No" ? true : false}
                              onChange={handleChange} value="No"
                              checked={values.PartnerPension2EditPension2 == "No"} />
                            <label htmlFor="PartnerPension2EditPension22" className="label2">
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                        {/* switch button style */}
  
  
  
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="PartnerPension2NominatedPension2" className="form-label">
                          Nominated Pension Amount
                        </label>
                        <Field
                          id="PartnerPension2NominatedPension2"
                          name='PartnerPension2NominatedPension2'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.PartnerPension2EditPension === "Yes" ? false : true}
  
                        >
                          <option value="">Select</option>
                          <option value="Minimum">Minimum</option>
                          <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPension2NominatedPension2" />
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerPension2OtherAmount2"
                          className="form-label"
                        >
                          Other Amount
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerPension2OtherAmount2"
                          name='PartnerPension2OtherAmount2'
                          placeholder="Other Amount"
                          disabled={values.PartnerPension2NominatedPension2 == "Other" ? false : true}
                        />
                        <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerPension2OtherAmount2' />
                      </div>
                    </div>
  
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="PartnerPension2Indexation2" className="form-label">
                          Indexation of Pension
                        </label>
                        <Field
                          id="PartnerPension2Indexation2"
                          name='PartnerPension2Indexation2'
                          className="form-select shadow  inputDesign"
                          as='select'
                          disabled={values.PartnerPension2NominatedPension2 == "Other" ? false : true}
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
                        <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerPension2Indexation2" />
                      </div>
                    </div>
  
  
                      </div>
                    }
                    
  
                  </div>
                  {/* Partner Pension 1*/}
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

    </>
  )
}

export default AccountBasedPensions;
