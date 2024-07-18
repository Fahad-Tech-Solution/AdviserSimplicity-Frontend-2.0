import React from "react";
import DirectShares from "./DirectShares/DirectShares";
import TermDeposits from "./TermDeposits/TermDeposits";
import OtherInvestments from "./OtherInvestments/OtherInvestments";
import ManagedFunds from "./Investments_ManagedFunds/ManagedFunds";
import BankAccounts from "./Investments_BankAccounts/BankAccounts";
import InsuranceBonds from "./InsuranceBonds/InsuranceBonds";
import InvestmentRegularWithdrawal from "./InvestmentRegularWithdrawal/InvestmentRegularWithdrawal";
import CashflowSurplusDeficit from "./CashflowSurplusDeficit/CashflowSurplusDeficit";
import LumpsumInvestmentWithdrawalsandAdditions from "./LumpsumInvestmentWithdrawalsandAdditions/LumpsumInvestmentWithdrawalsandAdditions";
import LumpsumInvestmentLoanRepayments from "./LumpsumInvestmentLoanRepayments/LumpsumInvestmentLoanRepayments";
import MarginLoans from "./MarginLoans/MarginLoans";
import InvestmentLoan from "./Investments_InvestmentLoan/InvestmentLoan";

import { useRecoilState } from "recoil";
import { StepState } from "../../Store/Store";
import { useNavigate } from "react-router-dom";
  


const InvestmentsCashFlow = () => {
  
let [Steps, setSteps] = useRecoilState(StepState); //Recoil Step State For First Route When User Login

let Navigate = useNavigate();
 
  let BackPage = () => {
    setSteps(26);
    localStorage.setItem("Steps", 26);
  Navigate("/Personal-Assets-CashFlow");
}
  
let NextPage = () => {
  setSteps(28);
  localStorage.setItem("Steps", 28);
  Navigate("/Direct-Property" );
}
  
  return (
    <div>
      <div className="container-fluid">
        <div className="row px-0 m-0">
          <div className="col-md-12">
            <div className="shadow py-4 px-4 shadow">
              <h3 className="text-center">Investments</h3>
                {/*guid*/}
              <div className="row">
                <div className="col-md-3">
                  <DirectShares />
                </div>
                <div className="col-md-3">
                  <ManagedFunds />
                </div>
                <div className="col-md-3">
                  <OtherInvestments />
                </div>
                <div className="col-md-3">
                <BankAccounts />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-3">
                  <TermDeposits />
                </div>
                <div className="col-md-3">
                  <InsuranceBonds />
                </div>
                <div className="col-md-3">
                <InvestmentRegularWithdrawal/>
                </div>
                <div className="col-md-3">
                <CashflowSurplusDeficit/>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-3">
                <MarginLoans/>
                </div>
                <div className="col-md-3">
                <LumpsumInvestmentWithdrawalsandAdditions/>
                </div>
                <div className="col-md-3">
                <LumpsumInvestmentLoanRepayments/>
                </div>
                <div className="col-md-3">
                <InvestmentLoan/>
                </div>
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
  );
};

export default InvestmentsCashFlow;
