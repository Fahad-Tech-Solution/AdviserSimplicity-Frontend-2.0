import React from 'react'
import FamilyHome from './FamilyHome/FamilyHome'

import Homeloan_Cashflow from './Homeloan_cashflow/Homeloan_Cashflow'
import PersonalAssets_CashFlow from './PersonalAssets_CashFlow/PersonalAssets_CashFlow'
import PersonalLoan from './PersonalLoans/PersonalLoans'
import LumpsumPersonalLoans_CashFlow from './LumpsumPersonalLoans_CashFlow/LumpsumPersonalLoans_CashFlow'

import { useRecoilState } from "recoil";
import { StepState } from "../../Store/Store";
import { useNavigate } from "react-router-dom";

const PersonalAssets = () => {

  let [Steps, setSteps] = useRecoilState(StepState); //Recoil Step State For First Route When User Login
  let Navigate = useNavigate();

  let BackPage = () => {
    setSteps(25);
    localStorage.setItem("Steps", 25);
    Navigate("/Income-And-Expenses-CashFlow");
  }
  let NextPage = () => {
    setSteps(27);
    localStorage.setItem("Steps", 27);
    Navigate("/Investments-CashFlow");
  }
  return (
    <div>
      <div className='container-fluid'>
      <div className='row px-0 m-0'>

        <div className='col-md-12'>
          <div className='shadow py-4 px-4 shadow'>
          <h3 className='text-center'>Personal Assets & Liabilities</h3>


            <div className='row'>
            <div className='col-md-4 '><FamilyHome/></div>
            <div className='col-md-4 '><Homeloan_Cashflow/></div>
            <div className='col-md-4 '><PersonalAssets_CashFlow/></div>
            <div className='col-md-4 '><PersonalLoan/></div>
            <div className='col-md-4 '><LumpsumPersonalLoans_CashFlow/></div>
            </div>
            

            <div className="row mb-4 mt-2">
            <div className="col-md-12">
              <button  type='submit' className="float-end btn w-25  bgColor modalBtn" onClick={NextPage}>Next</button>
              <button className="float-end btn w-25  btn-outline  backBtn mx-3"  onClick={BackPage}>Back</button>
            </div>
            </div>
        
        </div>

        </div>
      
        
        

      </div>
      
    </div>
      
    </div>
  )
}

export default PersonalAssets
