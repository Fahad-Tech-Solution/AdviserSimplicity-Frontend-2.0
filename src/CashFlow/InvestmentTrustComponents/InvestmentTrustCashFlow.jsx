import React from "react";
import BeneficiaryDetails from "./IT_BeneficiaryDetails/BeneficiaryDetails";
import TheTrustBankAccount from "./IT_TheTrustsBankAccount/TheTrustsBankAccount";
import TermDeposits from "./IT_TermDeposits/TermDeposits";
import InvestmentsSharesManagedFunds from "./IT_InvestmentsSharesManagedFunds/InvestmentsSharesManagedFunds";
import InvestmentLoan from "./IT_InvestmentLoan/InvestmentLoan";
import LumpsumInvestmentWithdrawalsandAdditions from "./IT_LumpsumInvestmentWithdrawalsandAdditions/LumpsumInvestmentWithdrawalsandAdditions";
import InvestmentProperties from "./IT_InvestmentProperties/InvestmentProperties";
import InvestmentPropertyLoanRepayments from "./InvestmentPropertyLoanRepayments/InvestmentPropertyLoanRepayments";

import { useRecoilState } from "recoil";
import { StepState } from "../../Store/Store";
import { useNavigate } from "react-router-dom";

const InvestmentTrustCashFlow = () => {
  let [Steps, setSteps] = useRecoilState(StepState); //Recoil Step State For First Route When User Login
  let Navigate = useNavigate();

  let NextPage = () => {
    setSteps(31);
    localStorage.setItem("Steps", 31);
    Navigate("/SMSF-CashFlow");
  }

  let BackPage = () => {
    setSteps(29);
    localStorage.setItem("Steps", 29);
    Navigate("/Super-And-Retirement-CashFlow");
  }

  return (
    <div>
      <div className="container-fluid">
        <div className="row px-0 m-0">
          <div className="col-md-12">
            <div className="shadow py-4 px-4 shadow">
              <h3 className="text-center">Investment Trust Cash Flow</h3>
              {/*guid*/}
              <div className="row">
                <div className="col-md-3">
                  <BeneficiaryDetails/>
                </div>
                <div className="col-md-3">
                  <TheTrustBankAccount/>
                </div>
                <div className="col-md-3">
                  <InvestmentsSharesManagedFunds/>
                </div>
                <div className="col-md-3">
                  <TermDeposits/>
                </div>               
              </div>

              <div className="row mt-3">
                <div className="col-md-3">
                  <InvestmentLoan/>
                </div> 
                <div className="col-md-3">
                  <LumpsumInvestmentWithdrawalsandAdditions/>
                </div>
                <div className="col-md-3">
                  <InvestmentProperties/>
                </div>
                <div className="col-md-3">
                  <InvestmentPropertyLoanRepayments/>
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
  );
};

export default InvestmentTrustCashFlow;
