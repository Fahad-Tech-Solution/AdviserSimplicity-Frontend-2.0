import React from "react";

import ActiveIncomeSVG from "../CashFlowAssets/Cast_Flow/SVG/Active_Income.svg";
import PassiveIncomeSVG from "../CashFlowAssets/Cast_Flow/SVG/Passive_Income.svg";
import RetirementIncomeSVG from "../CashFlowAssets/Cast_Flow/SVG/Retirement_Income.svg";
import CentrelinkSVG from "../CashFlowAssets/Cast_Flow/SVG/Centrelink.svg";
import OthersSVG from "../CashFlowAssets/Cast_Flow/SVG/Others.svg";

import LivingExpensesSVG from "../CashFlowAssets/Cast_Flow/SVG/Living_Expenses.svg";
import OtherExpensesSVG from "../CashFlowAssets/Cast_Flow/SVG/Other_Expenses.svg";
// Fliter
import FliterSVG from "../CashFlowAssets/Cast_Flow/SVG/Fliter.svg";
import Super_ContributionsSVG from "../CashFlowAssets/Cast_Flow/SVG/Super_Contributions.svg";
import Loan_RepaymentsSVG from "../CashFlowAssets/Cast_Flow/SVG/Loan_Repayments.svg";
import ArrowSVG from "../CashFlowAssets/Cast_Flow/SVG/Arrow.svg";

const FunnalComp = () => {
  return (
    <div className="container-fluid p-0 px-3 d-flex flex-column">
      <div className="row mt-2">
        <div className="col-md-12">
          <div className="d-flex flex-row gap-4 justify-content-center align-items-stretch flex-wrap">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="py-3 bg-white borderColor_Green borderOverAll text-center d-flex flex-column justify-content-between"
                style={{
                  width: "16%", // Slightly reduced to fit 5 in a row
                  minHeight: "80px", // Ensures all cards have equal height
                  borderRadius: "10px",
                }}
              >
                <h6 className="fw-bold">
                  {
                    [
                      "Active Income",
                      "Passive Income",
                      "Retirement Income Streams",
                      "Centrelink",
                      "Others",
                    ][index]
                  }
                </h6>

                <div className="d-flex flex-column flex-grow-1 justify-content-end">
                  <img
                    src={
                      [
                        ActiveIncomeSVG,
                        PassiveIncomeSVG,
                        RetirementIncomeSVG,
                        CentrelinkSVG,
                        OthersSVG,
                      ][index]
                    }
                    alt="Income"
                    className="img-fluid mb-2"
                    style={{
                      width: "65%",
                      height: "100px",
                      objectFit: "contain",
                      alignSelf: "center",
                    }}
                  />
                  <h3 className="fw-bold GreenColor">
                    {["$1,000", "$312,141", "$454", "$0", "$2,655"][index]}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div style={{ width: "5rem" }}></div>
        <div style={{ width: "18rem", marginTop: "8rem" }}>
          <div
            className="d-flex flex-row gap-2 justify-content-center align-items-center borderColor_Green borderOverAll text-center py-3 px-0"
            style={{ borderRadius: "12px" }}
          >
            <img
              src={LivingExpensesSVG}
              alt="Income"
              className="img-fluid me-2"
              style={{ width: "25%", height: "25%", objectFit: "contain" }}
            />
            <div className="d-flex flex-column ">
              <h6 className="fw-bold">Living Expanses</h6>
              <h3 className="fw-bold GreenColor">$ 5,000</h3>
            </div>
          </div>
          <div
            className="mt-4 d-flex flex-row gap-3 justify-content-center align-items-center borderColor_Green borderOverAll text-center py-3 px-0"
            style={{ borderRadius: "12px" }}
          >
            <img
              src={OtherExpensesSVG}
              alt="Income"
              className="img-fluid me-2"
              style={{ width: "25%", height: "25%", objectFit: "contain" }}
            />
            <div className="d-flex flex-column ">
              <h6 className="fw-bold">Other Expanses</h6>
              <h3 className="fw-bold GreenColor">$ 5,000</h3>
            </div>
          </div>
        </div>
        <div style={{ width: "25rem", marginLeft: "4rem" }}>
          <img
            src={FliterSVG}
            alt="Income"
            className="img-fluid me-2"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div
          style={{
            width: "13rem",
            marginLeft: "4rem",
            zIndex: 1,
            position: "absolute",
          }}
        >
          <img
            src={ArrowSVG}
            alt="Income"
            className="img-fluid me-2"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div style={{ width: "18rem", marginTop: "12rem" }}>
          <div
            className="d-flex flex-row gap-2 justify-content-center align-items-center borderColor_Green borderOverAll text-center py-3 px-0"
            style={{ borderRadius: "12px" }}
          >
            <img
              src={Super_ContributionsSVG}
              alt="Income"
              className="img-fluid me-2"
              style={{ width: "25%", height: "25%", objectFit: "contain" }}
            />
            <div className="d-flex flex-column ">
              <h6 className="fw-bold">Super Contrebutions</h6>
              <h3 className="fw-bold GreenColor">$0</h3>
            </div>
          </div>
          <div
            className="mt-4 d-flex flex-row gap-3 justify-content-center align-items-center borderColor_Green borderOverAll text-center py-3 px-0"
            style={{ borderRadius: "12px" }}
          >
            <img
              src={Loan_RepaymentsSVG}
              alt="Income"
              className="img-fluid me-2"
              style={{ width: "25%", height: "25%", objectFit: "contain" }}
            />
            <div className="d-flex flex-column ">
              <h6 className="fw-bold">Loan Repayment</h6>
              <h3 className="fw-bold GreenColor">$ 5,000</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        <div
          className=" w-25 modalBG d-flex flex-column justify-content-center align-items-center text-center"
          style={{ height: "8rem", borderRadius: "12px" }}
        >
          <h1 className="fw-bold">$0</h1>
          <h3 className="fw-bold">Surplus/Defict</h3>
        </div>
      </div>

      <div className="row my-5">
        <div className="col-md-12 d-flex flex-row justify-content-center align-items-center gap-4">
          <button className="btn w-25 btn-outline backBtn">Back</button>
          <button className="btn w-25 bgColor modalBtn">Next</button>
        </div>
      </div>
    </div>
  );
};

export default FunnalComp;
