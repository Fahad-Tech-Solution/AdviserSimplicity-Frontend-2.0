import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './options.css';

import { useRecoilState, useRecoilValue } from "recoil";
import { UserName, CurrentPage, OptionRender, CRState, StepsStatus } from "../Store/Store";
import { Breadcrumb, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleUser, faMoon } from "@fortawesome/free-solid-svg-icons";
import { ConfigProvider, Steps } from "antd";
import { FaBriefcase, FaCheck, FaGift, FaKey, FaMoneyCheckDollar, FaPlus, FaUser } from "react-icons/fa6";
import { FaHome, FaQuestionCircle } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { RiCoinsFill } from "react-icons/ri";
import { content } from "../Content/Content";

function Options(props) {

  let [userName] = useRecoilState(UserName); // eslint-disable-line no-unused-vars
  let [CurrentP] = useRecoilState(CurrentPage);
  let [optRender, setOptRender] = useRecoilState(OptionRender);
  let CRObject = useRecoilValue(CRState);

  let [leftPadding, setLeftPadding] = useState("18rem");
  let [currentTabName, setCurrentTabName] = useState("Home");

  let [stepCompleted, setStepCompleted] = useState(8);
  let [currentPCLassSwitch, setCurrentPCLassSwitch] = useState("PersonalDetail");


  let [items, setItems] = useState([]);
  let { itemsOpt } = content;

  let stepsStatus = useRecoilValue(StepsStatus); // eslint-disable-line no-unused-vars



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
    console.log(location.pathname);

    // alert(CurrentP);

    let Opt = "Opt1"
    let stepComplete = 0;

    setCurrentPCLassSwitch(cLocation.trim());
    switch (cLocation) {
      case "ImportantQuestion":
        stepComplete = 8;
        break;
      case "PersonalDetail":
        stepComplete = 16;
        break;
      case "PersonalIncome":
        stepComplete = 24;
        Opt = "Opt1"
        break;
      case "PersonalAssets":
        Opt = "Opt1"
        stepComplete = 32;
        break;
      case "FinancialInvestments":
        stepComplete = 40;
        Opt = "Opt1"
        break;
      case "SuperAndRetirement":
        stepComplete = 48;
        Opt = "Opt1"
        break;
      case "Lifestyle": //Property
        Opt = "Opt1"
        stepComplete = 56;
        break;
      case "Investment": //Property investment
        Opt = "Opt2"
        stepComplete = 64;
        break;
      case "EstatePlanning":
        Opt = "Opt2"
        stepComplete = 72;
        break;
      case "PersonalInsurance":
        Opt = "Opt2"
        stepComplete = 80;
        break;
      case "BusinessEntities":
        Opt = "Opt2"
        stepComplete = 88;
        break;
      case "SMSF":
        Opt = "Opt2"
        stepComplete = 96;
        break;
      case "FamilyTrust":
        Opt = "Opt2"
        stepComplete = 104;
        break;
      case "Goals-And-Objectives":
        Opt = "Opt2"
        stepComplete = 112;
        break;
      default:
        let a = cLocation.split('/')[0];
        setCurrentTabName(a.replaceAll("-", " "));
        break;
    }

    setOptRender(Opt)
    setStepCompleted(stepComplete);

    const itemsToRender = Opt === "Opt1" ? itemsOpt.slice(0, 7) : itemsOpt.slice(7, 14);

    const updatedItems = itemsToRender.filter(item => item.condition(CRObject)).map(item => {
      const isPersonalDetails = item.subTitle === 'Personal Details';
      const currentEmail = localStorage.getItem("Email");
      const iconMap = {
        FaBriefcase, FaCheck, FaGift, FaKey, FaMoneyCheckDollar, FaUser, FaHome, FaQuestionCircle, MdFamilyRestroom, RiCoinsFill, FaPlus
      };

      const IconComponent = iconMap[item.icon] || FaUser; // Default to FaUser if not found
      const isCurrentStep = cLocation === (isPersonalDetails ? "PersonalDetail" : item.route.replace("/", ""));

      let Status = stepComplete < item.statusStep ? "wait" : stepComplete > item.statusStep ? "finish" : 'processing';

      return {
        ...item,
        icon: (
          <span
            className={`rounded-circle text-light ${isCurrentStep ? "bgColorIncomeBlack" : "bgColorIncome2"}`}
            role="button"
            onClick={() => handleStepClick(isPersonalDetails ? `/PersonalDetail#${currentEmail}` : item.route)}
            style={{ height: "2rem", width: "6rem" }}
          >
            <IconComponent />
          </span>
        ),
        status: Status,
        subTitle: (<span style={{ color: isCurrentStep ? "#000" : "#808080", fontSize: "12px", width: "100%", fontWeight: isCurrentStep ? "600" : "500" }}> {item.subTitle} </span>)
      };
    });

    setItems(updatedItems);

  }, [location, CRObject])

  let Nev = useNavigate();
  let handleStepClick = (props) => {
    if (!stepsStatus) {
      Nev(props)
    }
  }


  let topMenuArray = [
    '/',
    '/Risk-Profile',
    '/All-Clients',
    '/Risk-Profile/',
    "/Risk-Profile/Q2",
    "/Risk-Profile/Q3",
    "/Risk-Profile/Q4",
    "/Risk-Profile/Q5",
    "/Risk-Profile/Q6",
    "/Risk-Profile/Q7",
    "/Risk-Profile/Q8",
    "/Risk-Profile-Cards",
  ]


  if (topMenuArray.includes(CurrentP)) {
    return (
      <div className="container-fluid" id="OptionsBar" style={{ paddingLeft: leftPadding }}>
        <div className="container-fluid" style={{ marginLeft: "1.8rem" }}>

          <div className="row pe-4">
            <div className="col-md-12 p-0">
              <div className="Top_Nav">
                <div className="d-flex justify-content-between">
                  <div>
                    <Breadcrumb className="BreadcrumbCustom">
                      <Breadcrumb.Item active linkAs={Link} linkProps={{ to: '/' }} className="p-0 m-0 LeagueSpartanFamily">Dashboard</Breadcrumb.Item>
                      <Breadcrumb.Item active linkAs={Link} linkProps={{ to: '/' }} className="p-0 m-0 LeagueSpartanFamily">{currentPCLassSwitch}</Breadcrumb.Item>
                    </Breadcrumb>
                    <h5 className="Page LeagueSpartanFamily">{currentTabName || "Dashboard"}</h5>
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
  else if (['/Goals-And-Objectives'].includes(CurrentP)) {
    return (

      <div>

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
                  <div className="col-md-12" style={{ padding: "20px 30px 0px 30px" }}>
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
                        // items={optRender === 'Opt1' ? itemsOpt1 : optRender === 'Opt2' ? itemsOpt2 : optRender === 'Opt3' ? itemsOpt1 : itemsOpt2}
                        items={items}
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
