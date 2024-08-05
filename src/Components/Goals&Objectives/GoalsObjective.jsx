import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import plus from "./images/plus.svg";
import * as Yup from "yup";
import "yup-phone";

import { ErrorMessage, Field, Form, Formik } from "formik";
// import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Card } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl } from "../../Store/Store";

const GoalsObjective = () => {

  // Setup Modal Opt1
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [Initial_Value, setInitial_Value] = useState([]);
  const [AllData7, setAllData7] = useState([]);
  const [AllData26, setAllData26] = useState([]);

  const [ModalName, setModalName] = useState("");

  const [DefaultUrl] = useRecoilState(defaultUrl);
  const ClientIDFromUsers = "65d48da08074416078a979b6";

  useEffect(() => {
    let Email = localStorage.getItem("Email");
    axios
      .get(`${DefaultUrl}/api/goals_combined7_tables/${ClientIDFromUsers}`)
      .then((res) => {
        console.log(res.data);
        const data7 = res.data;
        setAllData7(data7);
       
      })
      .catch((err) => {
        console.log(" error ", err.message);
      });
    axios
      .get(`${DefaultUrl}/api/goals_combined26_tables/${ClientIDFromUsers}`)
      .then((res) => {
        console.log(res.data);
        const data26 = res.data;
        setAllData26(data26);
      })
      .catch((err) => {
        console.log("error", err.message);
      });

    // eslint-disable-line
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let initialValues = () => {
    let setup_initialValues;

    // eslint-disable-next-line default-case
    switch (ModalName) {
      case "Budget":
      
        setup_initialValues = {
          AreaOfAdvice: AllData7[0] ? AllData7[0].AreaOfAdvice : "",
          When: AllData7[0] ? AllData7[0].When : "",
          EstimatedAmount: AllData7[0] ? AllData7[0].EstimatedAmount : "",
          Description: AllData7[0] ? AllData7[0].Description : "",
        };

        setInitial_Value([setup_initialValues]);

        // setTimeout(() => {
        //   // console.log(Initial_Value);
        // }, 500);

        break;
      case "Holiday":
        setup_initialValues = {
          AreaOfAdvice: AllData7[1] ? AllData7[1].AreaOfAdvice : "",
          When: AllData7[1] ? AllData7[1].When : "",
          EstimatedAmount: AllData7[1] ? AllData7[1].EstimatedAmount : "",
          Description: AllData7[1] ? AllData7[1].Description : "",
        };

        setInitial_Value([setup_initialValues]);

        break;
      case "Car":
        setup_initialValues = {
          AreaOfAdvice: AllData7[2] ? AllData7[2].AreaOfAdvice : "",
          When: AllData7[2] ? AllData7[2].When : "",
          EstimatedAmount: AllData7[2] ? AllData7[2].EstimatedAmount : "",
          Description: AllData7[2] ? AllData7[2].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;
      case "CreditCard":
        setup_initialValues = {
          AreaOfAdvice: AllData7[3] ? AllData7[3].AreaOfAdvice : "",
          When: AllData7[3] ? AllData7[3].When : "",
          EstimatedAmount: AllData7[3] ? AllData7[3].EstimatedAmount : "",
          Description: AllData7[3] ? AllData7[3].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;
      case "EmergencyFund":
        setup_initialValues = {
          AreaOfAdvice: AllData7[4] ? AllData7[4].AreaOfAdvice : "",
          When: AllData7[4] ? AllData7[4].When : "",
          EstimatedAmount: AllData7[4] ? AllData7[4].EstimatedAmount : "",
          Description: AllData7[4] ? AllData7[4].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;
      case "SavingsPlan":
        setup_initialValues = {
          AreaOfAdvice: AllData7[5] ? AllData7[5].AreaOfAdvice : "",
          When: AllData7[5] ? AllData7[5].When : "",
          EstimatedAmount: AllData7[5] ? AllData7[5].EstimatedAmount : "",
          Description: AllData7[5] ? AllData7[5].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;
      case "Lifestyle":
        setup_initialValues = {
          AreaOfAdvice: AllData7[6] ? AllData7[6].AreaOfAdvice : "",
          When: AllData7[6] ? AllData7[6].When : "",
          EstimatedAmount: AllData7[6] ? AllData7[6].EstimatedAmount : "",
          Description: AllData7[6] ? AllData7[6].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;
      case "Buy a House":
        setup_initialValues = {
          AreaOfAdvice: AllData26[0] ? AllData26[0].AreaOfAdvice : "",
          When: AllData26[0] ? AllData26[0].When : "",
          EstimatedAmount: AllData26[0] ? AllData26[0].EstimatedAmount : "",
          Description: AllData26[0] ? AllData26[0].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;
      case "Retirment":
        setup_initialValues = {
          AreaOfAdvice: AllData26[1] ? AllData26[1].AreaOfAdvice : "",
          When: AllData26[1] ? AllData26[1].When : "",
          EstimatedAmount: AllData26[1] ? AllData26[1].EstimatedAmount : "",
          Description: AllData26[1] ? AllData26[1].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;
      case "Education":
        setup_initialValues = {
          AreaOfAdvice: AllData26[2] ? AllData26[2].AreaOfAdvice : "",
          When: AllData26[2] ? AllData26[2].When : "",
          EstimatedAmount: AllData26[2] ? AllData26[2].EstimatedAmount : "",
          Description: AllData26[2] ? AllData26[2].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;
      case "Boat":
        setup_initialValues = {
          AreaOfAdvice: AllData26[3] ? AllData26[3].AreaOfAdvice : "",
          When: AllData26[3] ? AllData26[3].When : "",
          EstimatedAmount: AllData26[3] ? AllData26[3].EstimatedAmount : "",
          Description: AllData26[3] ? AllData26[3].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;
      case "Business":
        setup_initialValues = {
          AreaOfAdvice: AllData26[4] ? AllData26[4].AreaOfAdvice : "",
          When: AllData26[4] ? AllData26[4].When : "",
          EstimatedAmount: AllData26[4] ? AllData26[4].EstimatedAmount : "",
          Description: AllData26[4] ? AllData26[4].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;
      case "HomeLoan":
        setup_initialValues = {
          AreaOfAdvice: AllData26[5] ? AllData26[5].AreaOfAdvice : "",
          When: AllData26[5] ? AllData26[5].When : "",
          EstimatedAmount: AllData26[5] ? AllData26[5].EstimatedAmount : "",
          Description: AllData26[5] ? AllData26[5].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;
      case "Upgrade Family Home":
        setup_initialValues = {
          AreaOfAdvice: AllData26[6] ? AllData26[6].AreaOfAdvice : "",
          When: AllData26[6] ? AllData26[6].When : "",
          EstimatedAmount: AllData26[6] ? AllData26[6].EstimatedAmount : "",
          Description: AllData26[6] ? AllData26[6].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;
      case "Down Size Family Home":
        setup_initialValues = {
          AreaOfAdvice: AllData26[7] ? AllData26[7].AreaOfAdvice : "",
          When: AllData26[7] ? AllData26[7].When : "",
          EstimatedAmount: AllData26[7] ? AllData26[7].EstimatedAmount : "",
          Description: AllData26[7] ? AllData26[7].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;
      case "Investment Property":
        setup_initialValues = {
          AreaOfAdvice: AllData26[8] ? AllData26[8].AreaOfAdvice : "",
          When: AllData26[8] ? AllData26[8].When : "",
          EstimatedAmount: AllData26[8] ? AllData26[8].EstimatedAmount : "",
          Description: AllData26[8] ? AllData26[8].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;

      case "Renovate Family Home":
        setup_initialValues = {
          AreaOfAdvice: AllData26[9] ? AllData26[9].AreaOfAdvice : "",
          When: AllData26[9] ? AllData26[9].When : "",
          EstimatedAmount: AllData26[9] ? AllData26[9].EstimatedAmount : "",
          Description: AllData26[9] ? AllData26[9].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;

      case "Investment Portfolio":
        setup_initialValues = {
          AreaOfAdvice: AllData26[10] ? AllData26[10].AreaOfAdvice : "",
          When: AllData26[10] ? AllData26[10].When : "",
          EstimatedAmount: AllData26[10] ? AllData26[10].EstimatedAmount : "",
          Description: AllData26[10] ? AllData26[10].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;

      case "Start a Family":
        setup_initialValues = {
          AreaOfAdvice: AllData26[11] ? AllData26[11].AreaOfAdvice : "",
          When: AllData26[11] ? AllData26[11].When : "",
          EstimatedAmount: AllData26[11] ? AllData26[11].EstimatedAmount : "",
          Description: AllData26[11] ? AllData26[11].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;

      case "Leave an Inheritance":
        setup_initialValues = {
          AreaOfAdvice: AllData26[12] ? AllData26[12].AreaOfAdvice : "",
          When: AllData26[12] ? AllData26[12].When : "",
          EstimatedAmount: AllData26[12] ? AllData26[12].EstimatedAmount : "",
          Description: AllData26[12] ? AllData26[12].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;
      case "Care Aging":
        setup_initialValues = {
          AreaOfAdvice: AllData26[13] ? AllData26[13].AreaOfAdvice : "",
          When: AllData26[13] ? AllData26[13].When : "",
          EstimatedAmount: AllData26[13] ? AllData26[13].EstimatedAmount : "",
          Description: AllData26[13] ? AllData26[13].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;

      case "CentreLink":
        setup_initialValues = {
          AreaOfAdvice: AllData26[14] ? AllData26[14].AreaOfAdvice : "",
          When: AllData26[14] ? AllData26[14].When : "",
          EstimatedAmount: AllData26[14] ? AllData26[14].EstimatedAmount : "",
          Description: AllData26[14] ? AllData26[14].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;

      case "FamilyTrust":
        setup_initialValues = {
          AreaOfAdvice: AllData26[15] ? AllData26[15].AreaOfAdvice : "",
          When: AllData26[15] ? AllData26[15].When : "",
          EstimatedAmount: AllData26[15] ? AllData26[15].EstimatedAmount : "",
          Description: AllData26[15] ? AllData26[15].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;

      case "SMSF":
        setup_initialValues = {
          AreaOfAdvice: AllData26[16] ? AllData26[16].AreaOfAdvice : "",
          When: AllData26[16] ? AllData26[16].When : "",
          EstimatedAmount: AllData26[16] ? AllData26[16].EstimatedAmount : "",
          Description: AllData26[16] ? AllData26[16].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;

      case "Wedding":
        setup_initialValues = {
          AreaOfAdvice: AllData26[17] ? AllData26[17].AreaOfAdvice : "",
          When: AllData26[17] ? AllData26[17].When : "",
          EstimatedAmount: AllData26[17] ? AllData26[17].EstimatedAmount : "",
          Description: AllData26[17] ? AllData26[17].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;

      case "EstatePlanning":
        setup_initialValues = {
          AreaOfAdvice: AllData26[18] ? AllData26[18].AreaOfAdvice : "",
          When: AllData26[18] ? AllData26[18].When : "",
          EstimatedAmount: AllData26[18] ? AllData26[18].EstimatedAmount : "",
          Description: AllData26[18] ? AllData26[18].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;

      case "Superannuation":
        setup_initialValues = {
          AreaOfAdvice: AllData26[19] ? AllData26[19].AreaOfAdvice : "",
          When: AllData26[19] ? AllData26[19].When : "",
          EstimatedAmount: AllData26[19] ? AllData26[19].EstimatedAmount : "",
          Description: AllData26[19] ? AllData26[19].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;

      case "PayLessTax":
        setup_initialValues = {
          AreaOfAdvice: AllData26[20] ? AllData26[20].AreaOfAdvice : "",
          When: AllData26[20] ? AllData26[20].When : "",
          EstimatedAmount: AllData26[20] ? AllData26[20].EstimatedAmount : "",
          Description: AllData26[20] ? AllData26[20].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;

      case "CommenceIncome":
        setup_initialValues = {
          AreaOfAdvice: AllData26[21] ? AllData26[21].AreaOfAdvice : "",
          When: AllData26[21] ? AllData26[21].When : "",
          EstimatedAmount: AllData26[21] ? AllData26[21].EstimatedAmount : "",
          Description: AllData26[21] ? AllData26[21].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;

      case "CombineSuperannuation":
        setup_initialValues = {
          AreaOfAdvice: AllData26[22] ? AllData26[22].AreaOfAdvice : "",
          When: AllData26[22] ? AllData26[22].When : "",
          EstimatedAmount: AllData26[22] ? AllData26[22].EstimatedAmount : "",
          Description: AllData26[22] ? AllData26[22].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;

      case "ContributeMoney":
        setup_initialValues = {
          AreaOfAdvice: AllData26[23] ? AllData26[23].AreaOfAdvice : "",
          When: AllData26[23] ? AllData26[23].When : "",
          EstimatedAmount: AllData26[23] ? AllData26[23].EstimatedAmount : "",
          Description: AllData26[23] ? AllData26[23].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;

      case "InvestmentPortfolio":
        setup_initialValues = {
          AreaOfAdvice: AllData26[24] ? AllData26[24].AreaOfAdvice : "",
          When: AllData26[24] ? AllData26[24].When : "",
          EstimatedAmount: AllData26[24] ? AllData26[24].EstimatedAmount : "",
          Description: AllData26[24] ? AllData26[24].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;

      case "Financial Advice":
        setup_initialValues = {
          AreaOfAdvice: AllData26[25] ? AllData26[25].AreaOfAdvice : "",
          When: AllData26[25] ? AllData26[25].When : "",
          EstimatedAmount: AllData26[25] ? AllData26[25].EstimatedAmount : "",
          Description: AllData26[25] ? AllData26[25].Description : "",
        };

        setInitial_Value([setup_initialValues]);
        break;

      // uzairinitialvalue

      default:
        setup_initialValues = {
          AreaOfAdvice: "",
          When: "",
          EstimatedAmount: "",
          Description: "",
        };

        setInitial_Value([setup_initialValues]);
        // return (setup_initialValues);
        break;
    }
  };

  const updatedArrayHandler = (index, obj) => {
              const newArray = [...AllData7];
              newArray[index] = obj; 
              setAllData7(newArray); 
}

const updatedArrayHandler26 =(index,obj)=>{
  const newArray = [...AllData26];
  newArray[index] = obj; 
  setAllData26(newArray); 
}

const APIHandler =(apiFun,api,obj,index)=>{
  if(apiFun==="patch"){
    axios.patch(`${DefaultUrl}/api/${api}`, obj)
    .then((res) => {
      console.log(res.status,res.data);
      updatedArrayHandler(index,res.data); 
      handleClose1();
    }) .catch(error => {
      console.error('Error updating data:', error.response ? error.response.data : error.message);
      // You can handle the error here, e.g., display an error message to the user
    });
  }
  else{
    axios.post(`${DefaultUrl}/api/${api}`, obj)
    .then((res) => {
      console.log(res.status,res.data);
      updatedArrayHandler(index,res.data); 
      handleClose1();
    })
    .catch(error => {
      console.error('Error updating data:', error.response ? error.response.data : error.message);
      // You can handle the error here, e.g., display an error message to the user
    });
    ;
  }
 
}

const APIHandler26 =(apiFun,api,obj,index)=>{
  if(apiFun==="patch"){
    axios.patch(`${DefaultUrl}/api/${api}`, obj)
    .then((res) => {
      console.log(res.status,res.data);
      updatedArrayHandler26(index,obj); 
      handleClose1();
    })
    .catch(error => {
      console.error('Error updating data:', error.response ? error.response.data : error.message);
      // You can handle the error here, e.g., display an error message to the user
    });
  
  }
  else{
    axios.post(`${DefaultUrl}/api/${api}`, obj)
    .then((res) => {
      console.log(res.status,res.data);
      updatedArrayHandler26(index,res.data); 
      handleClose1();
    })
    .catch(error => {
      console.error('Error updating data:', error.response ? error.response.data : error.message);
      // You can handle the error here, e.g., display an error message to the user
    });
    ;
  }
 
}

  const setup_validationSchema = Yup.object({
    AreaOfAdvice: Yup.string().required("Required"),
    When: Yup.string().required("Required"),
    EstimatedAmount: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    Description: Yup.string().required("Required"),
  });

  let setup_onSubmit = (values) => {

    let data = {
      client_id: ClientIDFromUsers,
      AreaOfAdvice: values.AreaOfAdvice,
      When: values.When,
      EstimatedAmount: values.EstimatedAmount,
      Description: values.Description,
    };
    console.log("data", data);

    // eslint-disable-next-line default-case
    switch (ModalName) {
      case "Budget":
        if (AllData7[0]) {
          data._id = AllData7[0]._id;
          console.log("data after",data)
          APIHandler("patch","Client-BudgetGoal/Update/",data,0)
          } else {
            APIHandler("post","Client-BudgetGoal/Add/",data,0)
        }

        break;
      case "Holiday":
        if (AllData7[1]) {
          data._id = AllData7[1]._id;
          APIHandler("patch","Client-HolidayGoal/Update/",data,1)
          } else {
            APIHandler("post","Client-HolidayGoal/Add/",data,1)
        }

        break;
      case "Car":
      if (AllData7[2]) {
        data._id = AllData7[2]._id;
        APIHandler("patch","Client-CarGoal/Update/",data,2)
        } else {
          APIHandler("post","Client-CarGoal/Add/",data,2)
      }
        break;
      case "CreditCard":
        if (AllData7[3]) {
          data._id = AllData7[3]._id;
          APIHandler("patch","Client-CreditCardGoal/Update/",data,3)
          } else {
            APIHandler("post","Client-CreditCardGoal/Add/",data,3)
        }

        break;
      case "EmergencyFund":
        if (AllData7[4]) {
          data._id = AllData7[4]._id;
          APIHandler("patch","Client-EmergencyFundGoal/Update/",data,4)
          } else {
            APIHandler("post","Client-EmergencyFundGoal/Add/",data,4)
        }
        break;
      case "SavingsPlan":
      if (AllData7[5]) {
        data._id = AllData7[5]._id;
        APIHandler("patch","Client-RegularSavingsGoal/Update/",data,5)
        } else {
          APIHandler("post","Client-RegularSavingsGoal/Add/",data,5)
      }
        break;
      case "Lifestyle":
        if (AllData7[6]) {
          data._id = AllData7[6]._id;
          APIHandler("patch","Client-FamilyLifeStyleGoal/Update/",data,6)
          } else {
            APIHandler("post","Client-FamilyLifeStyleGoal/Add/",data,6)
        }
        break;
      case "Buy a House":
      if (AllData26[0]) {
        data._id = AllData26[0]._id;
        APIHandler26("patch","Client-HouseGoal/Update/",data,0)
        } else {
          APIHandler26("post","Client-HouseGoal/Add/",data,0)
      }
        break;
      case "Boat":

      if (AllData26[3]) {
        data._id = AllData26[3]._id;
        APIHandler26("patch","Client-BoatGoal/Update/",data,3)
        } else {
          APIHandler26("post","Client-BoatGoal/Add/",data,3)
      }
      
        break;
      case "Retirment":
       if (AllData26[1]) {
        data._id = AllData26[1]._id;
        APIHandler26("patch","Client-RetirementGoal/Update/",data,1)
        } else {
          APIHandler26("post","Client-RetirementGoal/Add/",data,1)
      }
        break;
      case "Education":
        if (AllData26[2]) {
        data._id = AllData26[2]._id;
        
        APIHandler26("patch","Client-ChildrenEducationGoal/Update/",data,2)
        } 
        else {
          APIHandler26("post","Client-ChildrenEducationGoal/Add/",data,2)
        }
        break;
      case "Business":
        if (AllData26[4]) {
        data._id = AllData26[4]._id;
        APIHandler26("patch","Client-BusinessGoal/Update/",data,4)
        } 
        else {
          APIHandler26("post","Client-BusinessGoal/Add/",data,4)
        }
      
        break;
      case "HomeLoan":
        if (AllData26[5]) {
        data._id = AllData26[5]._id;
        APIHandler26("patch","Client-HomeLoanGoal/Update/",data,5)
        } 
        else {
          APIHandler26("post","Client-HomeLoanGoal/Add/",data,5)
        }
       
        break;
      case "Upgrade Family Home":
        if (AllData26[6]) {
        data._id = AllData26[6]._id;
        APIHandler26("patch","Client-UpgradeFamilyHomeGoal/Update/",data,6)
        } 
        else {
          APIHandler26("post","Client-UpgradeFamilyHomeGoal/Add/",data,6)
        }
      
        break;
      case "Down Size Family Home":
        if (AllData26[7]) {
        data._id = AllData26[7]._id;
        APIHandler26("patch","Client-DownSizeFamilyHomeGoal/Update/",data,7)
        } 
        else {
          APIHandler26("post","Client-DownSizeFamilyHomeGoal/Add/",data,7)
        }
        break;
      case "Investment Property":
        if (AllData26[8]) {
        data._id = AllData26[8]._id;
        APIHandler26("patch","Client-InvestmentPropertyGoal/Update/",data,8)
        } 
        else {
          APIHandler26("post","Client-InvestmentPropertyGoal/Add/",data,8)
        }
        break;
      case "Renovate Family Home":
        if (AllData26[9]) {
        data._id = AllData26[9]._id;
        APIHandler26("patch","Client-RenovateFamilyHomeGoal/Update/",data,9)
        } 
        else {
          APIHandler26("post","Client-RenovateFamilyHomeGoal/Add/",data,9)
        }
    
        break;
      case "Investment Portfolio":
      if (AllData26[10]) {
        data._id = AllData26[10]._id;
        APIHandler26("patch","Client-InvestmentPortfolioGoal/Update/",data,10)
        } 
        else {
          APIHandler26("post","Client-InvestmentPortfolioGoal/Add/",data,10)
        }
        break;

      case "Start a Family":
            if (AllData26[11]) {
        data._id = AllData26[11]._id;
        APIHandler26("patch","Client-StartFamilyGoal/Update/",data,11)
        } 
        else {
          APIHandler26("post","Client-StartFamilyGoal/Add/",data,11)
        }
       
        break;

      case "Leave an Inheritance":
            if (AllData26[12]) {
        data._id = AllData26[12]._id;
        APIHandler26("patch","Client-InheritanceGoal/Update/",data,12)
        } 
        else {
          APIHandler26("post","Client-InheritanceGoal/Add/",data,12)
        }
      
        break;

      case "Care Aging":
        if (AllData26[13]) {
        data._id = AllData26[13]._id;
        APIHandler26("patch","Client-CareGoal/Update/",data,13)
        } 
        else {
          APIHandler26("post","Client-CareGoal/Add/",data,13)
        }
      
        break;

      case "CentreLink":
            if (AllData26[14]) {
        data._id = AllData26[14]._id;
        APIHandler26("patch","Client-CentreLinkEligibilityGoal/Update/",data,14)
        } 
        else {
          APIHandler26("post","Client-CentreLinkEligibilityGoal/Add/",data,14)
        }
       
        break;

      case "FamilyTrust":
            if (AllData26[15]) {
        data._id = AllData26[15]._id;
        APIHandler26("patch","Client-FamilyTrustGoal/Update/",data,15)
        } 
        else {
          APIHandler26("post","Client-FamilyTrustGoal/Add/",data,15)
        }
        
        break;

      case "SMSF":
            if (AllData26[16]) {
        data._id = AllData26[16]._id;
        APIHandler26("patch","Client-SMSFGoal/Update/",data,16)
        } 
        else {
          APIHandler26("post","Client-SMSFGoal/Add/",data,16)
        }
       
        break;

      case "Wedding":
            if (AllData26[17]) {
        data._id = AllData26[17]._id;
        APIHandler26("patch","Client-WeddingGoal/Update/",data,17)
        } 
        else {
          APIHandler26("post","Client-WeddingGoal/Add/",data,17)
        }
       
        break;

      case "EstatePlanning":
            if (AllData26[18]) {
        data._id = AllData26[18]._id;
        APIHandler26("patch","Client-EstatePlanningGoal/Update/",data,18)
        } 
        else {
          APIHandler26("post","Client-EstatePlanningGoal/Add/",data,18)
        }
        break;

      case "Superannuation":
            if (AllData26[19]) {
        data._id = AllData26[19]._id;
        APIHandler26("patch","Client-SuperannuationGoal/Update/",data,19)
        } 
        else {
          APIHandler26("post","Client-SuperannuationGoal/Add/",data,19)
        }
      
        break;

      case "PayLessTax":
            if (AllData26[20]) {
        data._id = AllData26[20]._id;
        APIHandler26("patch","Client-PayLessTaxGoal/Update/",data,20)
        } 
        else {
          APIHandler26("post","Client-PayLessTaxGoal/Add/",data,20)
        }
        break;

      case "CommenceIncome":
        if (AllData26[21]) {
        data._id = AllData26[21]._id;
        APIHandler26("patch","Client-IncomeStreamGoal/Update/",data,21)
        } 
        else {
          APIHandler26("post","Client-IncomeStreamGoal/Add/",data,21)
        }
        break;

      case "CombineSuperannuation":
        if (AllData26[22]) {
        data._id = AllData26[22]._id;
        APIHandler26("patch","Client-AllSuperAnnuationGoal/Update/",data,22)
        } 
        else {
          APIHandler26("post","Client-AllSuperAnnuationGoal/Add/",data,22)
        }
       break;

      case "ContributeMoney":
        if (AllData26[23]) {
        data._id = AllData26[23]._id;
        APIHandler26("patch","Client-ContributeSuperAnnuationGoal/Update/",data,23)
        } 
        else {
          APIHandler26("post","Client-ContributeSuperAnnuationGoal/Add/",data,23)
        }
      break;

      case "InvestmentPortfolio":
        if (AllData26[24]) {
        data._id = AllData26[24]._id;
        APIHandler26("patch","Client-ReviewInvestmentPortfolioGoal/Update/",data,24)
        } 
        else {
          APIHandler26("post","Client-ReviewInvestmentPortfolioGoal/Add/",data,24)
        }
       
        break;

      case "Financial Advice":
        if (AllData26[25]) {
        data._id = AllData26[25]._id;
        APIHandler26("patch","Client-FinancialAdviceGoal/Update/",data,25)
        } 
        else {
          APIHandler26("post","Client-FinancialAdviceGoal/Add/",data,25)
        }
        break;
    }
  };
  // setup Opt1

  useEffect(() => {
    initialValues();
  }, [ModalName, AllData7, AllData26]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container-fluid">
      <div className="row px-0 m-0">
        <div className="col-md-12">
          <div className=" pb-4 px-4 mb-5">
            <h3 className="text-center GreenColor">
              <b>Goals & Objectives</b>
            </h3>

            {/* Modal Button Row 1 */}
            <div className="row my-3 ">
              {/* setup Modal Opt1 button   */}
              <div className="col-md-4 my-2 ">
                <label className="form-label LabelSize">Set up a Budget</label>
                <br />
                <button
                  className=" btn
                                  btn-outline-success "
                  onClick={() => {
                    setModalName("Budget");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>

              {/* Holiday Modal Opt2 button   */}
              <div className="col-md-4 my-2">
                <label className="form-label LabelSize">Take a Holiday</label>
                <br />

                <button
                  className=" btn
                                  btn-outline-success "
                  onClick={() => {
                    setModalName("Holiday");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>

              {/* Buy a Car Modal Opt3 button   */}
              <div className="col-md-4 my-2">
                <label className="form-label LabelSize">Buy a Car</label>
                <br />

                <button
                  className=" btn
                                  btn-outline-success "
                  onClick={() => {
                    setModalName("Car");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>
            </div>
            {/* Modal Button Row 1 */}

            {/* Modal Button Row 2 */}
            <div className="row my-3 ">
              {/* Pay off Credit Card/Debt Modal Opt4 button   */}
              <div className="col-md-4 my-2 ">
                <label className="form-label LabelSize">
                  Pay off Credit Card/Debt
                </label>
                <br />

                <button
                  className=" btn
                                  btn-outline-success "
                  onClick={() => {
                    setModalName("CreditCard");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>

              {/* Accumulate an Emergency Fund Modal Opt5 Btn   */}
              <div className="col-md-4 my-2">
                <label className="form-label LabelSize">
                  Accumulate Emergency Fund
                </label>
                <br />

                <button
                  className=" btn
                                  btn-outline-success "
                  onClick={() => {
                    setModalName("EmergencyFund");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>

              {/* Regular Savings Plan Modal Opt6 button   */}
              <div className="col-md-4 my-2">
                <label className="form-label LabelSize">
                  Regular Savings Plan
                </label>
                <br />

                <button
                  className=" btn
                                  btn-outline-success "
                  onClick={() => {
                    setModalName("SavingsPlan");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>
            </div>
            {/* Modal Button Row 2 */}

            {/* Modal Button Row 3 */}
            <div className="row my-3 ">
              {/* Protect my Lifestyle & Family Opt7 button   */}
              <div className="col-md-6 my-2 ">
                <label className="form-label LabelSize">
                  Protect my Lifestyle & Family
                </label>
                <br />

                <button
                  className=" btn
                                  btn-outline-success "
                  onClick={() => {
                    setModalName("Lifestyle");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>
            </div>
            {/* Modal Button Row 3 */}

            <h3 className="GreenColor mt-5">
              <b>Other Goals</b>
            </h3>

            {/* Modal Button Row 4 */}
            <div className="row my-3 ">
              {/* House Modal Opt8 button   */}
              <div className="col-md-4 my-2 ">
                <label className="form-label LabelSize">Buy a House</label>
                <br />

                <button
                  className=" btn
                                  btn-outline-success "
                  onClick={() => {
                    setModalName("Buy a House");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>

              {/* Retirement Modal Opt9 Btn   */}
              <div className="col-md-4 my-2">
                <label className="form-label LabelSize">
                  Plan for Retirment
                </label>
                <br />

                <button
                  className=" btn
                                  btn-outline-success "
                  onClick={() => {
                    setModalName("Retirment");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>

              {/* Children Education Modal Opt10 button   */}
              <div className="col-md-4 my-2">
                <label className="form-label LabelSize">
                  Save for Children's Education
                </label>
                <br />

                <button
                  className=" btn
                                  btn-outline-success "
                  onClick={() => {
                    setModalName("Education");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>
            </div>
            {/* Modal Button Row 4 */}

            {/* Modal Button Row 5 */}
            <div className="row my-3 ">
              {/* House Modal Opt11 button   */}
              <div className="col-md-4 my-2 ">
                <label className="form-label LabelSize">Boat or Carvan</label>
                <br />

                <button
                  className=" btn
                                btn-outline-success "
                  onClick={() => {
                    setModalName("Boat");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>

              {/* Retirement Modal Opt12 Btn   */}
              <div className="col-md-4 my-2">
                <label className="form-label LabelSize">Start a Business</label>
                <br />

                <button
                  className=" btn
                                btn-outline-success "
                  onClick={() => {
                    setModalName("Business");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>

              {/* Children Education Modal Opt10 button   */}
              <div className="col-md-4 my-2">
                <label className="form-label LabelSize">
                  Pay off Home Loan
                </label>
                <br />

                <button
                  className=" btn
                                btn-outline-success "
                  onClick={() => {
                    setModalName("HomeLoan");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>
            </div>
            {/* Modal Button Row 5 */}

            {/* Modal Button Row 6 */}
            <div className="row my-3 ">
              {/* Upgrade FamilyHome Modal Opt14 button   */}
              <div className="col-md-4 my-2 ">
                <label className="form-label LabelSize">
                  Upgrade Family Home
                </label>
                <br />

                <button
                  className=" btn
                                btn-outline-success "
                  onClick={() => {
                    setModalName("Upgrade Family Home");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>

              {/* Downsize FamilyHome Modal Opt15 Btn   */}
              <div className="col-md-4 my-2">
                <label className="form-label LabelSize">
                  Down Size Family Home
                </label>
                <br />

                <button
                  className=" btn
                                btn-outline-success "
                  onClick={() => {
                    setModalName("Down Size Family Home");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>

              {/* Investment Property Modal Opt10 button   */}
              <div className="col-md-4 my-2">
                <label className="form-label LabelSize">
                  Buy an Investment Property
                </label>
                <br />

                <button
                  className=" btn
                                btn-outline-success "
                  onClick={() => {
                    setModalName("Investment Property");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>
            </div>
            {/* Modal Button Row 6 */}

            {/* Modal Button Row 7 */}
            <div className="row my-3 ">
              {/* Renovate FamilyHome Modal Opt17 button   */}
              <div className="col-md-4 my-2 ">
                <label className="form-label LabelSize">
                  Renovate Family Home
                </label>
                <br />

                <button
                  className=" btn
                                  btn-outline-success "
                  onClick={() => {
                    setModalName("Renovate Family Home");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>

              {/* Investment Portfolio Modal Opt18 Btn   */}
              <div className="col-md-4 my-2">
                <label className="form-label LabelSize">
                  Investment Portfolio
                </label>
                <br />

                <button
                  className=" btn
                                  btn-outline-success "
                  onClick={() => {
                    setModalName("Investment Portfolio");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>

              {/* Start a Family Modal Opt19 button   */}
              <div className="col-md-4 my-2">
                <label className="form-label LabelSize">Start a Family</label>
                <br />

                <button
                  className=" btn
                                  btn-outline-success "
                  onClick={() => {
                    setModalName("Start a Family");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>
            </div>
            {/* Modal Button Row 7 */}

            {/* Modal Button Row 8 */}
            <div className="row my-3 ">
              {/* Inheritance Modal Opt20 button   */}
              <div className="col-md-4 my-2 ">
                <label className="form-label LabelSize">
                  Leave an Inheritance
                </label>
                <br />

                <button
                  className=" btn
                                btn-outline-success "
                  onClick={() => {
                    setModalName("Leave an Inheritance");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>

              {/* Care Modal Opt21 Btn   */}
              <div className="col-md-4 my-2">
                <label className="form-label LabelSize">
                  Care Aging Family Member
                </label>
                <br />

                <button
                  className=" btn
                                btn-outline-success "
                  onClick={() => {
                    setModalName("Care Aging");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>

              {/* Centre Link Eligibillity Modal Opt22 button   */}
              <div className="col-md-4 my-2">
                <label className="form-label LabelSize">
                  Centre Link Eligibillity
                </label>
                <br />

                <button
                  className=" btn
                                btn-outline-success "
                  onClick={() => {
                    setModalName("CentreLink");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>
            </div>
            {/* Modal Button Row 8 */}

            {/* Modal Button Row 9 */}
            <div className="row my-3 ">
              {/* Family Trust Modal Opt23 button   */}
              <div className="col-md-4 my-2 ">
                <label className="form-label LabelSize">Family Trust</label>
                <br />

                <button
                  className=" btn
                                btn-outline-success "
                  onClick={() => {
                    setModalName("FamilyTrust");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>

              {/* SMSF Modal Opt24 Btn   */}
              <div className="col-md-4 my-2">
                <label className="form-label LabelSize">Set up SMSF</label>
                <br />

                <button
                  className=" btn
                                btn-outline-success "
                  onClick={() => {
                    setModalName("SMSF");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>

              {/* Wedding Modal Opt25 button   */}
              <div className="col-md-4 my-2">
                <label className="form-label LabelSize">Save for Wedding</label>
                <br />

                <button
                  className=" btn
                                btn-outline-success "
                  onClick={() => {
                    setModalName("Wedding");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>
            </div>
            {/* Modal Button Row 9 */}

            {/* Modal Button Row 10 */}
            <div className="row my-3 ">
              {/* Estate Planning Modal Opt26 button   */}
              <div className="col-md-4 my-2 ">
                <label className="form-label LabelSize">Estate Planning</label>
                <br />

                <button
                  className=" btn
                                btn-outline-success "
                  onClick={() => {
                    setModalName("EstatePlanning");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>

              {/* Super Annuation Investment Modal Opt27 Btn   */}
              <div className="col-md-4 my-2">
                <label className="form-label LabelSize">
                  Increase Superannuation Investment
                </label>
                <br />

                <button
                  className=" btn
                                btn-outline-success "
                  onClick={() => {
                    setModalName("Superannuation");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>

              {/* Pay Less Tax Modal Opt28 button   */}
              <div className="col-md-4 my-2">
                <label className="form-label LabelSize">Pay Less Tax</label>
                <br />

                <button
                  className=" btn
                                btn-outline-success "
                  onClick={() => {
                    setModalName("PayLessTax");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>
            </div>
            {/* Modal Button Row 10 */}

            {/* Modal Button Row 11 */}
            <div className="row my-3 ">
              {/* Income Stream Modal Opt29 button   */}
              <div className="col-md-4 my-2 ">
                <label className="form-label LabelSize">
                  Commence Income Stream
                </label>
                <br />

                <button
                  className=" btn
                                btn-outline-success "
                  onClick={() => {
                    setModalName("CommenceIncome");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>

              {/* Superannuation Accounts Modal Opt30 Btn   */}
              <div className="col-md-4 my-2">
                <label className="form-label LabelSize">
                  Combine Superannuation Accounts
                </label>
                <br />

                <button
                  className=" btn
                                btn-outline-success "
                  onClick={() => {
                    setModalName("CombineSuperannuation");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>

              {/* Contribute Superannuation Modal Opt31 button   */}
              <div className="col-md-4 my-2">
                <label className="form-label LabelSize">
                  Contribute Money to Superannuation
                </label>
                <br />

                <button
                  className=" btn
                                btn-outline-success "
                  onClick={() => {
                    setModalName("ContributeMoney");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>
            </div>
            {/* Modal Button Row 11 */}

            {/* Modal Button Row 12 */}
            <div className="row my-3 ">
              {/* Investment Portfolio Modal Opt32 button   */}
              <div className="col-md-4 my-2 ">
                <label className="form-label LabelSize">
                  Review Investment Portfolio
                </label>
                <br />

                <button
                  className=" btn
                                btn-outline-success "
                  onClick={() => {
                    setModalName("InvestmentPortfolio");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>

              {/* Financial Advice Modal Opt33 Btn   */}
              <div className="col-md-4 my-2">
                <label className="form-label LabelSize">
                  Ongoing Financial Advice
                </label>
                <br />

                <button
                  className=" btn
                                btn-outline-success "
                  onClick={() => {
                    setModalName("Financial Advice");
                    setTimeout(() => {
                      handleShow1();
                    }, 1000);
                  }}
                >
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={plus} alt="" />
                  </div>
                  Enter Details
                </button>
              </div>
            </div>
            {/* Modal Button Row 12 */}

            {/* ------------------------------------------------------------------------------------------------------------------------- */}
            {/* ------------------------------------------------------------------------------------------------------------------------- */}
            {/* ------------------------------------------------------------------------------------------------------------------------- */}
            {/* ------------------------------------------------------------------------------------------------------------------------- */}
            {/* ------------------------------------------------------------------------------------------------------------------------- */}

            {/* Set up a Budget */}
            <Modal
              show={show1}
              onHide={handleClose1}
              backdrop="static"
              className="modal-lg"
              keyboard={false}
            >
              <Modal.Header className="text-light modalBG " closeButton>
                <Modal.Title className="fontStyle">
                  Set up a {ModalName}
                </Modal.Title>
              </Modal.Header>
              <Formik
                initialValues={Initial_Value[0]}
                validationSchema={setup_validationSchema}
                onSubmit={setup_onSubmit}
                enableReinitialize
              >
                <Form>
                  <Modal.Body>
                    <div className=" ">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="AreaOfAdvice"
                              className="form-label"
                            >
                              Area Of Advice
                            </label>
                            <Field
                              id="AreaOfAdvice"
                              name="AreaOfAdvice"
                              className="form-select shadow  inputDesign"
                              as="select"
                            >
                              <option value="">Select</option>
                              <option value="AgedCare">Aged Care</option>
                              <option value="Budgeting">Budgeting</option>
                              <option value="BusinessStructure">
                                Business Structure
                              </option>
                              <option value="Debt">Debt</option>
                              <option value="EstatePlanning">
                                Estate Planning
                              </option>
                              <option value="InsuranceAdvice">
                                Insurance Advice
                              </option>
                              <option value="Investment">Investment</option>
                              <option value="RetirementPlanning">
                                Retirement Planning
                              </option>
                              <option value="Superannuation">
                                Superannuation
                              </option>
                              <option value="Other">Other</option>
                            </Field>
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="AreaOfAdvice"
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="When" className="form-label">
                              When
                            </label>
                            <Field
                              id="When"
                              name="When"
                              className="form-select shadow  inputDesign"
                              as="select"
                            >
                              <option value="">Select</option>
                              <option value="Other">Other</option>
                              <option value="MeetGoalNow&Ongoing">
                                Meet Goal Now & Ongoing
                              </option>
                              <option value="MeetGoalNow">Meet Goal Now</option>
                              <option value="Ongoing">Ongoing</option>
                              <option value="MeetinYear1">
                                Meet in Year 1
                              </option>
                              <option value="MeetinYear2">
                                Meet in Year 2
                              </option>
                              <option value="MeetinYear4">
                                Meet in Year 3
                              </option>
                              <option value="MeetinYear4">
                                Meet in Year 4
                              </option>
                              <option value="MeetinYear5">
                                Meet in Year 5
                              </option>
                            </Field>
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="When"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="EstimatedAmount"
                              className="form-label"
                            >
                              Estimated Amount
                            </label>
                            <Field
                              type="number"
                              className="form-control shadow inputDesign"
                              id="EstimatedAmount"
                              name="EstimatedAmount"
                              placeholder="Estimated Amount"
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="EstimatedAmount"
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="Description" className="form-label">
                              Description
                            </label>
                            <Field
                              as="textarea"
                              className="form-control shadow inputDesign"
                              id="Description"
                              name="Description"
                              placeholder="Description"
                            />

                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="Description"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <div className="col-md-12">
                      <button
                        className="float-end btn   bgColor modalBtn"
                        type="submit"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="float-end btn  btn-outline  backBtn mx-3"
                        onClick={handleClose1}
                      >
                        Cancel
                      </button>
                    </div>
                  </Modal.Footer>
                </Form>
              </Formik>
            </Modal>
            {/* Set up a Budget */}

            {/* Financial Advice */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsObjective;
