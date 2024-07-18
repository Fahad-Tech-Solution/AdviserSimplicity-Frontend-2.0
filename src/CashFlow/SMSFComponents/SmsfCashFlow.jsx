import React from 'react'
import AccumulationDetails from './AccumulationDetails/AccumulationDetails'
import LumpsumSuperContributions from './SMSF_LumpsumSuperContributions/LumpsumSuperContributions'
import LumpsumSuperWithdrawals from './SMSF_LumpsumSuperWithdrawals/LumpsumSuperWithdrawals'
import PensionAccounts from './SMSF_PensionAccounts/PensionAccounts'
import LumpsumPensionWithdrawals from './SMSF_LumpsumPensionWithdrawals/LumpsumPensionWithdrawals'
import TheFundsBankAccount from './SMSF_TheFundsBankAccount/TheFundsBankAccount'
import TermDeposit from './SMSF_TermDeposit/TermDeposit'
import InvestmentsSharesManagedFunds from './SMSF_InvestmentsSharesManagedFunds/InvestmentsSharesManagedFunds'
import InvestmentLoan from './SMSF_InvestmentLoan/InvestmentLoan'
import LumpsumInvestmentWithdrawalsandAdditions from './SMSF_LumpsumInvestmentWithdrawalsandAdditions/LumpsumInvestmentWithdrawalsandAdditions'
import InvestmentProperties from './SMSF_InvestmentProperties/InvestmentProperties'
import InvestmentPropertyLoanRepayments from '../InvestmentTrustComponents/InvestmentPropertyLoanRepayments/InvestmentPropertyLoanRepayments'

import { useRecoilState } from "recoil";
import { StepState } from "../../Store/Store";
import { useNavigate } from "react-router-dom";

const SmsfCashFlow = () => {
  let [Steps, setSteps] = useRecoilState(StepState); //Recoil Step State For First Route When User Login
  let Navigate = useNavigate();
  
  let NextPage = () => {
    // setSteps(32);
    console.log("end of Flow For Now");
    // localStorage.setItem("Steps", 32);
  }
  let BackPage = () => {
    setSteps(30);
    localStorage.setItem("Steps", 30);
    Navigate("/Investment-Trust-CashFlow");
  }

  return (
    <div>
    <div className="container-fluid">
      <div className="row px-0 m-0">
        <div className="col-md-12">
          <div className="shadow py-4 px-4 shadow">
            <h3 className="text-center"> SMSF </h3>
            {/*guid*/}
            <div className="row">
              <div className="col-md-3">
                <AccumulationDetails />
              </div>
              <div className="col-md-3">
                <LumpsumSuperContributions />
              </div>
              <div className="col-md-3">
              <LumpsumSuperWithdrawals />
              </div>
              <div className="col-md-3">
              <PensionAccounts />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-3">
                <LumpsumPensionWithdrawals />
              </div>
              <div className="col-md-3">
                <TheFundsBankAccount />
              </div>
              <div className="col-md-3">
              <TermDeposit />
              </div>
              <div className="col-md-3">
              <InvestmentsSharesManagedFunds />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-3">
                <InvestmentLoan />
              </div>
              <div className="col-md-3">
                <LumpsumInvestmentWithdrawalsandAdditions />
              </div>
              <div className="col-md-3">
              <InvestmentProperties />
              </div>
              <div className="col-md-3">
              <InvestmentPropertyLoanRepayments />
              </div>
            </div>
            
            <div className="row mb-4 mt-2">
            <div className="col-md-12">
              <button  type='submit' className="float-end btn w-25  bgColor modalBtn" onClick={NextPage}>Next</button>
              <button className="float-end btn w-25  btn-outline  backBtn mx-3" onClick={BackPage}>Back</button>
            </div>
            </div>
              
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SmsfCashFlow
