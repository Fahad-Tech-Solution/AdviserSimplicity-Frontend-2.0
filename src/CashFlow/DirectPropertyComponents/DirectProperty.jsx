import React from "react";
import Direct_InvestmentProperties from "./DirectProperty_InvestmentProperties/Direct_InvestmentProperties";
import DirectProperty_InvestmentPropertyLoanRepayments from "./DP_InvestmentPropertyLoanRepayments/DirectProperty_InvestmentPropertyLoanRepayments";

import { useRecoilState } from "recoil";
import { OptionRender, StepState } from "../../Store/Store";
import { useNavigate } from "react-router-dom";

const DirectProperty = () => {
  let Navigate = useNavigate();


  let [optRender, setOptRender] = useRecoilState(OptionRender);// eslint-disable-line no-unused-vars

  let BackPage = () => {
    Navigate("/Investments-CashFlow");
  }

  let NextPage = () => {

    setOptRender("Opt4");
    Navigate("/Super-And-Retirement-CashFlow");
  }

  return (
    <div>
      <div className="container-fluid">
        <div className="row px-0 m-0">
          <div className="col-md-12">
            <div className="shadow py-4 px-4 shadow">
              <h3 className="text-center">DirectProperty</h3>
              {/*guid*/}
              <div className="row">
                <div className="col-md-6">
                  <Direct_InvestmentProperties />
                </div>
                <div className="col-md-6">
                  <DirectProperty_InvestmentPropertyLoanRepayments />
                </div>
              </div>

              <div className="row mb-4 mt-2">
                <div className="col-md-12">
                  <button type='submit' className="float-end btn w-25  bgColor modalBtn" onClick={NextPage}>Next</button>
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

export default DirectProperty;
