import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './options.css';

import { useRecoilState, useRecoilValue } from "recoil";
import { UserName, CurrentPage, OptionRender, CRState } from "../Store/Store";
import { Breadcrumb, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleUser, faMoon } from "@fortawesome/free-solid-svg-icons";
import { ConfigProvider, Steps } from "antd";
import { FaBriefcase, FaCheck, FaGift, FaKey, FaMoneyCheckDollar, FaUser } from "react-icons/fa6";
import { FaHome, FaQuestionCircle } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { RiCoinsFill } from "react-icons/ri";

function Options(props) {

  let [userName] = useRecoilState(UserName); // eslint-disable-line no-unused-vars
  let [CurrentP] = useRecoilState(CurrentPage);
  let [optRender, setOptRender] = useRecoilState(OptionRender);
  let CRObject = useRecoilValue(CRState);

  let [leftPadding, setLeftPadding] = useState("18rem");

  let [stepCompleted, setStepCompleted] = useState(8);
  useEffect(() => {
    if (props.SidebarSwitch === true) {
      // alert(props.SidebarSwitch );
      setLeftPadding("5rem");
    }
    else {
      // alert(props.SidebarSwitch );
      setLeftPadding("18rem");
    }
  }, [props.SidebarSwitch])

  let location = useLocation();

  useEffect(() => {
    let cLocation = location.pathname.replace("/", "");
    console.log(cLocation);
    switch (cLocation) {
      case "PersonalDetail":
        setStepCompleted(8);
        break;
      case "PersonalIncome":
        setStepCompleted(16);
        setOptRender("Opt1")
        break;
      case "PersonalAssets":
        setOptRender("Opt1")
        setStepCompleted(24);
        break;
      case "FinancialInvestments":
      case "SuperAndRetirement":
        setStepCompleted(32);
        setOptRender("Opt1")
        break;
      case "Lifestyle": //Property
      case "Investment": //Property investment
        setOptRender("Opt1")
        setStepCompleted(40);
        break;
      case "EstatePlanning":
        setOptRender("Opt1")
        setStepCompleted(48);
        break;
      case "PersonalInsurance":
        setOptRender("Opt2")
        setStepCompleted(56);
        break;
      case "BusinessEntities":
        setStepCompleted(64);
        break;
      case "SMSF":
        setStepCompleted(72);
        break;
      case "FamilyTrust":
        setStepCompleted(80);
        break;
      case "Goals-And-Objectives":
        setStepCompleted(88);
        break;

      default:
        setStepCompleted(0);
        break;
    }

  }, [location])

  const itemsOpt1 = [
    {
      subTitle: 'Personal Details',
      status: stepCompleted < 8 ? "wait" : stepCompleted > 8 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light" style={{ height: "2rem", width: "6rem" }}><FaUser height={100} width={100} /></span>,
    },
    {
      subTitle: 'Personal Income and Expenses',
      status: stepCompleted < 16 ? "wait" : stepCompleted > 16 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light" style={{ height: "2rem", width: "6rem" }}><FaMoneyCheckDollar height={100} width={100} /></span>,
    },
    {
      subTitle: 'Personal Assets and Debt',
      status: stepCompleted < 24 ? "wait" : stepCompleted > 24 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light mx-auto" style={{ height: "2rem", width: "6rem" }}><FaHome height={100} width={100} /></span>,
    },
    {
      subTitle: 'Financial Investments',
      status: stepCompleted < 32 ? "wait" : stepCompleted > 32 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light mx-auto" style={{ height: "2rem", width: "6rem" }}> <RiCoinsFill height={100} width={100} /></span>,
    },
    {
      subTitle: 'Property',
      status: stepCompleted < 40 ? "wait" : stepCompleted > 40 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light mx-auto" style={{ height: "2rem", width: "6rem" }}><FaKey height={100} width={100} /></span>,
    },
    {
      subTitle: 'Estate Planning & Professional Advisers',
      status: stepCompleted < 48 ? "wait" : stepCompleted > 48 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light mx-auto" style={{ height: "2rem", width: "6rem" }}> <FaQuestionCircle height={100} width={100} /></span>,
    },
  ];

  const itemsOpt2 = ((CRObject.BusinessAsSMSF === "Yes") && (CRObject.BusinessAsInvestmentTrust === "Yes")) ? [
    {
      subTitle: 'Personal Insurance',
      status: stepCompleted < 56 ? "wait" : stepCompleted > 56 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light " style={{ height: "2rem", width: "6rem" }}><FaMoneyCheckDollar height={100} width={100} /></span>,
    },
    {
      subTitle: 'Business Entities',
      status: stepCompleted < 64 ? "wait" : stepCompleted > 64 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light " style={{ height: "2rem", width: "6rem" }}><FaBriefcase height={100} width={100} /></span>,
    },
    {
      subTitle: 'SMSF',
      status: stepCompleted < 72 ? "wait" : stepCompleted > 72 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light " style={{ height: "2rem", width: "6rem" }}><FaGift height={100} width={100} /></span>,
    },
    {
      subTitle: 'Investment Trust',
      status: stepCompleted < 80 ? "wait" : stepCompleted > 80 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light " style={{ height: "2rem", width: "6rem" }}><MdFamilyRestroom height={100} width={100} /></span>,
    },
    {
      subTitle: 'Goals and objectives section',
      status: stepCompleted < 88 ? "wait" : stepCompleted > 88 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light" style={{ height: "2rem", width: "6rem" }}><FaCheck height={100} width={100} /></span>,
    }
  ] : (CRObject.BusinessAsSMSF === "Yes") ? [
    {
      subTitle: 'Personal Insurance',
      status: stepCompleted < 56 ? "wait" : stepCompleted > 56 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light " style={{ height: "2rem", width: "6rem" }}><FaMoneyCheckDollar height={100} width={100} /></span>,
    },
    {
      subTitle: 'Business Entities',
      status: stepCompleted < 64 ? "wait" : stepCompleted > 64 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light " style={{ height: "2rem", width: "6rem" }}><FaBriefcase height={100} width={100} /></span>,
    },
    {
      subTitle: 'SMSF',
      status: stepCompleted < 72 ? "wait" : stepCompleted > 72 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light " style={{ height: "2rem", width: "6rem" }}><FaGift height={100} width={100} /></span>,
    },
    {
      subTitle: 'Goals and objectives section',
      status: stepCompleted < 80 ? "wait" : stepCompleted > 80 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light" style={{ height: "2rem", width: "6rem" }}><FaCheck height={100} width={100} /></span>,
    }
  ] : (CRObject.BusinessAsInvestmentTrust === "Yes") ? [
    {
      subTitle: 'Personal Insurance',
      status: stepCompleted < 56 ? "wait" : stepCompleted > 56 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light " style={{ height: "2rem", width: "6rem" }}><FaMoneyCheckDollar height={100} width={100} /></span>,
    },
    {
      subTitle: 'Business Entities',
      status: stepCompleted < 64 ? "wait" : stepCompleted > 64 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light " style={{ height: "2rem", width: "6rem" }}><FaBriefcase height={100} width={100} /></span>,
    },
    {
      subTitle: 'Investment Trust',
      status: stepCompleted < 72 ? "wait" : stepCompleted > 72 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light " style={{ height: "2rem", width: "6rem" }}><MdFamilyRestroom height={100} width={100} /></span>,
    },
    {
      subTitle: 'Goals and objectives section',
      status: stepCompleted < 80 ? "wait" : stepCompleted > 80 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light" style={{ height: "2rem", width: "6rem" }}><FaCheck height={100} width={100} /></span>,
    }
  ] : [
    {
      subTitle: 'Personal Insurance',
      status: stepCompleted < 56 ? "wait" : stepCompleted > 56 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light " style={{ height: "2rem", width: "6rem" }}><FaMoneyCheckDollar height={100} width={100} /></span>,
    },
    {
      subTitle: 'Business Entities',
      status: stepCompleted < 64 ? "wait" : stepCompleted > 64 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light " style={{ height: "2rem", width: "6rem" }}><FaBriefcase height={100} width={100} /></span>,
    },
    {
      subTitle: 'Goals and objectives section',
      status: stepCompleted < 72 ? "wait" : stepCompleted > 72 ? "finish" : 'processing',
      icon: <span className="rounded-circle bgColorIncome2 text-light" style={{ height: "2rem", width: "6rem" }}><FaCheck height={100} width={100} /></span>,
    }
  ];


  if (['/', '/Risk-Profile', '/All-Clients'].includes(CurrentP)) {
    return (
      <div className="container-fluid" id="OptionsBar" style={{ paddingLeft: leftPadding }}>


        <div className="container-fluid" style={{ marginLeft: "1.8rem" }}>

          <div className="row pe-4">
            <div className="col-md-12 p-0">
              <div className="Top_Nav">
                <div className="d-flex justify-content-between">
                  <div>
                    <Breadcrumb className="BreadcrumbCustom">
                      <Breadcrumb.Item active linkAs={Link} linkProps={{ to: '/' }} className="p-0 m-0 DMFamily">Pages</Breadcrumb.Item>
                      <Breadcrumb.Item active linkAs={Link} linkProps={{ to: '/' }} className="p-0 m-0 DMFamily">Home</Breadcrumb.Item>
                    </Breadcrumb>
                    <h5 className="Page DMFamily">Home</h5>
                  </div>
                  <div className="rightBlock">
                    <FontAwesomeIcon icon={faMoon} className="moon" />
                    <FontAwesomeIcon icon={faCircleUser} className="user" />
                    <FontAwesomeIcon icon={faBars} className="menu" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="container-fluid ps-5" >

        <div className="row m-0 px-0 pt-0 ">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12" style={{ padding: "10px 0px 0px 1.5px" }}>
                <div className="row">
                  <div className="col-md-12" style={{ padding: "20px 30px 20px 30px" }}>
                    <ConfigProvider
                      theme={{
                        components: {
                          Steps: {
                            // iconSize: 40,
                            // border: "2px"
                            customIconFontSize: 30,
                          },
                        },
                        token: {
                          /* here is your global tokens */
                          colorPrimary: "#36b446",
                          fontSize: 12,
                          lineWidth: 4,
                        },
                      }}
                    >

                      <Steps
                        items={optRender === 'Opt1' ? itemsOpt1 : optRender === 'Opt2' ? itemsOpt2 : optRender === 'Opt3' ? itemsOpt1 : itemsOpt2}
                        labelPlacement={"vertical"}
                        initial={0}
                        responsive={false}
                        status={"process"}

                      />
                    </ConfigProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Options;
