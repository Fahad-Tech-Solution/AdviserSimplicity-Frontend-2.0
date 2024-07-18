import React, { useEffect } from 'react'
import EmploymentIncome from './EmploymentIncome/EmploymentIncome'
import DividendIncome from './DividendIncome/DividendIncome'
import NonTaxableIncome from './NoneTaxableIncome/NoneTaxableIncome'
import CentrelinkIncome from './CentrelinkIncome/CentrelinkIncome'
import PersonalDetails_cashFlow from './PersonalDetails_CashFlow/PersonalDetails_cashFlow'
import TrustDistributions from './TrustDistributions/TrustDistributions'
import OtherDeductibleExpenses from './OtherDeductibleExpenses/OtherDeductibleExpenses'
import LumpsumPurchases_cashFlow from './LumpsumPurchases_cashFlow/LumpsumPurchases_cashFlow'
import EducationCosts_CashFlow from './EducationCosts_CashFlow/EducationCosts_CashFlow'
import OtherExpenses_CashFlow from './OtherExpenses_CashFlow/OtherExpenses_CashFlow'
import OtherTaxableIncome from './OtherTaxableIncome/OtherTaxableIncome'
import SoleTraderIncome from './SoleTraderIncome/SoleTraderIncome'
import GeneralLivingExpenses from './GeneralLivingExpenses/GeneralLivingExpenses'

import { useRecoilState } from "recoil";
import { StepState } from "../../Store/Store";
import { useNavigate } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const IncomeAndExpenses = () => {

  let [Steps, setSteps] = useRecoilState(StepState); //Recoil Step State For First Route When User

  let Navigate = useNavigate();

  let NextPage = () => {
    setSteps(26);
    localStorage.setItem("Steps", 26);
    Navigate("/Personal-Assets-CashFlow");
  }
  let BackPage = () => {

    Navigate("/Personal-Assets-CashFlow");
  }


  


  return (
    <div className='container-fluid mt-4'>
      <div className='row px-0 m-0'>

        <div className='col-md-12'>
          <Card className='shadow py-4 px-4 shadow'>
            <h3 className='text-center'>Income And Expenses</h3>

            <div className='row'>
              <div className='col-md-4 '><PersonalDetails_cashFlow /></div>
              <div className='col-md-4 '><EmploymentIncome /></div>
              <div className='col-md-4 '><OtherTaxableIncome /></div>
              <div className='col-md-4 '><SoleTraderIncome /></div>

              <div className='col-md-4 '><DividendIncome /></div>
              <div className='col-md-4 '><TrustDistributions /></div>

              <div className='col-md-4 '><NonTaxableIncome /></div>
              <div className='col-md-4 '><CentrelinkIncome /></div>
              <div className='col-md-4 '><GeneralLivingExpenses /></div>
              <div className='col-md-4 '><OtherDeductibleExpenses /></div>
              <div className='col-md-4 '><LumpsumPurchases_cashFlow /></div>
              <div className='col-md-4 '><EducationCosts_CashFlow /></div>
              <div className='col-md-4 '><OtherExpenses_CashFlow /></div>
            </div>

            <div className="row mb-4 mt-2">
              <div className="col-md-12">
                <button type='submit' className="float-end btn w-25  bgColor modalBtn" onClick={NextPage}>Next</button>
                <button className="float-end btn w-25  btn-outline  backBtn mx-3" onClick={BackPage} >Back</button>
              </div>
            </div>

          </Card>

        </div>




      </div>

    </div>
  )
}

export default IncomeAndExpenses
