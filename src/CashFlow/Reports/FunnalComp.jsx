import React from "react";

import ActiveIncomeSVG from "../CashFlowAssets/Cast_Flow/SVG/Active_Income.svg";

const FunnalComp = () => {
  return (
    <div className="container-fluid p-0 px-3 d-flex flex-column">
      <div className="row mt-2">
        <div className="col-md-12">
          <div className="d-flex flex-row gap-4 justify-content-center align-items-stretch">
            <div
              className="py-3 bg-white borderColor_Green borderOverAll text-center d-flex flex-column"
              style={{
                width: "20%",
                borderRadius: "10px",
              }}
            >
              <h6 className="fw-bold">Active Income </h6>
              <div className="">
                <img
                  src={ActiveIncomeSVG}
                  alt="Active Income"
                  className="img-fluid"
                  style={{ width: "50%", height: "50%" }}
                />
                <h3 className="fw-bold GreenColor">$ 1,000 </h3>
              </div>
            </div>
            <div
              className="py-3 bg-white borderColor_Green borderOverAll text-center"
              style={{
                width: "20%",

                borderRadius: "10px",
              }}
            >
              <h6 className="fw-bold">Passive Income</h6>
              <img
                src={ActiveIncomeSVG}
                alt="Active Income"
                className="img-fluid"
                style={{ width: "50%", height: "50%" }}
              />
            </div>
            <div
              className="py-3 bg-white borderColor_Green borderOverAll text-center"
              style={{
                width: "20%",
                borderRadius: "10px",
              }}
            >
              <h6 className="fw-bold">Retirement Income Streams</h6>
              <img
                src={ActiveIncomeSVG}
                alt="Active Income"
                className="img-fluid"
                style={{ width: "50%", height: "50%" }}
              />
            </div>
            <div
              className="py-3 bg-white borderColor_Green borderOverAll   text-center"
              style={{
                width: "20%",

                borderRadius: "10px",
              }}
            >
              <h6 className="fw-bold">Centrelink</h6>
              <img
                src={ActiveIncomeSVG}
                alt="Active Income"
                className="img-fluid"
                style={{ width: "50%", height: "50%" }}
              />
            </div>
            <div
              className="py-3 bg-white borderColor_Green borderOverAll   text-center"
              style={{
                width: "20%",

                borderRadius: "10px",
              }}
            >
              <h6 className="fw-bold">Others</h6>
              <img
                src={ActiveIncomeSVG}
                alt="Active Income"
                className="img-fluid"
                style={{ width: "50%", height: "50%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunnalComp;
