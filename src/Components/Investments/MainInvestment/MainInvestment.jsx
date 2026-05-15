import React, { useEffect, useState } from "react";
import Collapse from "react-bootstrap/Collapse";
// import plus from "../images/plus.svg";
// import bg_in_male from "../images/bg_in_male.svg";
import down from "../images/down_new.svg";
import Up from "../images/up_new.svg";
import ClientInvestment from "../ClientInvestment/Investments";
import { useNavigate } from "react-router-dom";
import JointInvestment from "../JointInvestment/JointInvestment";
import PartnerInvestment from "../PartnerInvestment/PartnerInvestment";


import { useRecoilState, useRecoilValue } from "recoil";
import { OptionRender, defaultUrl } from "../../../Store/Store";
import { Card } from "react-bootstrap";

const MainInvestment = () => {
  
  let DefaultUrl = useRecoilValue(defaultUrl)

  const [open, setOpen] = useState(true);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [ClientDrill, setClientDrill] = useState(false);
  let [optRender, setOptRender] = useRecoilState(OptionRender);// eslint-disable-line no-unused-vars

  let Navigate = useNavigate();
  function BackFunction() {


    Navigate("/Assets-And-Liabilities");
  }

  function NextFunction() {
    setClientDrill(true);

    setOptRender("Opt2");

    Navigate('/Estate-Planning');
    setTimeout(() => {
      setClientDrill(false);
    }, 500);
  }

  return (
    <div className="container-fluid">
      <Card className="shadow px-4 pb-2 " id="MainInvestment">
        <div className="row my-2">
          <div className="col-md-12 text-center">
            <h3 className="mt-3">Investments</h3>
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-12 p-0 mb-2"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            <h3 className="p-2 m-0 InvestmentCollapse">
              Client
              <div className="iconContainer mx-1 float-end">
                <img
                  className="img-fluid"
                  src={open === true ? Up : down}
                  alt=""
                />
              </div>
            </h3>
          </div>
          <Collapse in={open}>
            <div id="example-collapse-text">
              <ClientInvestment ClientDrill={ClientDrill} />
            </div>
          </Collapse>

          <hr />
          <div
            className="col-md-12 p-0 mb-2"
            onClick={() => setOpen2(!open2)}
            aria-controls="example-collapse-text"
            aria-expanded={open2}
          >
            <h3 className="p-2 m-0 InvestmentCollapse">
              Partner
              <div className="iconContainer mx-1 float-end">
                <img
                  className="img-fluid"
                  src={open2 === true ? Up : down}
                  alt=""
                />
              </div>
            </h3>
          </div>
          <Collapse in={open2}>
            <div id="example-collapse-text">
              <PartnerInvestment ClientDrill={ClientDrill} />
            </div>
          </Collapse>

          <hr />
          <div
            className="col-md-12 p-0 "
            onClick={() => setOpen3(!open3)}
            aria-controls="example-collapse-text"
            aria-expanded={open3}
          >
            <h3 className="p-2 m-0 InvestmentCollapse">
              Joint
              <div className="iconContainer mx-1 float-end">
                <img
                  className="img-fluid"
                  src={open3 === true ? Up : down}
                  alt=""
                />
              </div>
            </h3>
          </div>
          <Collapse in={open3}>
            <div id="example-collapse-text">
              <JointInvestment ClientDrill={ClientDrill} />
            </div>
          </Collapse>
        </div>
        <div className="row mt-3 my-3 ">
          <div className="col-md-12 p-0">
            <button type="submit" className="float-end btn w-25  bgColor modalBtn" onClick={NextFunction} >
              Next
            </button>
            <button className="float-end btn w-25  btn-outline  backBtn mx-3" onClick={BackFunction} >
              Back
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MainInvestment;
