import React from "react";
import SP_LumpsumSuperContributions from "./SuperandRetirement_LumpsumSuperContributions/SP_LumpsumSuperContributions";
import SP_LumpsumSuperWithdrawals from "./SuperandRetirement_LumpsumSuperWithdrawals/SP_LumpsumSuperWithdrawals";
import SP_LumpsumPensionWithdrawals from "./SuperandRetirement_LumpsumPensionWithdrawals/SP_LumpsumPensionWithdrawals";
import SP_RegularSuperContribution from "./SP_RegularSuperContribution/SP_RegularSuperContribution";
import SP_LifeTimePension_CashFlow from "./SP_LifeTimePension_CashFlow/SP_LifeTimePension_CashFlow";
import SuperDetails from "./SuperandRetirement_SuperDetails/SuperDetails";
import AccountBasedPensions from "./SuperandRetirement_AccountBasedPensions/AccountBasedPensions";
import Annuities from "./SuperandRetirement_Annuities/Annuities";

import { useRecoilState } from "recoil";
import { OptionRender } from "../../Store/Store";
import { useNavigate } from "react-router-dom";

const SuperAndRetirementCashFlow = () => {
  let [optRender, setOptRender] = useRecoilState(OptionRender);// eslint-disable-line no-unused-vars
  let Navigate = useNavigate();

  let NextPage = () => {
    Navigate("/Investment-Trust-CashFlow");
  }
  let BackPage = () => {
    setOptRender('Opt3')

    Navigate("/Direct-Property");
  }


  return (
    <div>
      <div className="container-fluid">
        <div className="row px-0 m-0">
          <div className="col-md-12">
            <div className="shadow py-4 px-4 shadow">
              <h3 className="text-center">Super & Retirement</h3>
              {/*guid*/}

              <div className="row mt-2">
                {/*SP Super Details Missing */}
                <div className="col-md-3">
                  <SuperDetails/>
                </div>
                <div className="col-md-3">
                  <SP_LumpsumSuperContributions />
                </div>
                <div className="col-md-3">
                  <SP_LumpsumSuperWithdrawals />
                </div>
                <div className="col-md-3">
                  <AccountBasedPensions/>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-3">
                <SP_LumpsumPensionWithdrawals />
                </div>
                <div className="col-md-3">
                  <SP_RegularSuperContribution />
                </div>
                <div className="col-md-3">
                  <SP_LifeTimePension_CashFlow />
                </div>
                <div className="col-md-3">
                  <Annuities />
                </div>


                {/*Annuities :Missing */}
              </div>

              <div className="row mb-4 mt-2">
                <div className="col-md-12">
                  <button  type='submit' className="float-end btn w-25  bgColor modalBtn" onClick={NextPage}>Next</button>
                  <button className="float-end btn w-25  btn-outline  backBtn mx-3" onClick={BackPage} >Back</button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAndRetirementCashFlow;
