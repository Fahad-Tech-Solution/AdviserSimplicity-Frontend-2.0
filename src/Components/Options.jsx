import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './options.css';

import { useRecoilState, useRecoilValue } from "recoil";
import { UserName, CurrentPage, OptionRender, CRState, StepsStatus } from "../Store/Store";
import { Breadcrumb, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleUser, faMoon } from "@fortawesome/free-solid-svg-icons";
import { ConfigProvider, Steps } from "antd";
import { FaBriefcase, FaCheck, FaGift, FaKey, FaMoneyCheckDollar, FaMoneyBillWave, FaPlus, FaUser, FaChartLine, FaTriangleExclamation, FaGraduationCap, FaChartPie } from "react-icons/fa6";
import { FaHome, FaQuestionCircle } from "react-icons/fa";
import { MdFamilyRestroom, MdWaterDrop, MdOutlineBalance, MdOutlineTimeline } from "react-icons/md";
import { RiCoinsFill, RiDiscountPercentFill } from "react-icons/ri";
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
  let { itemsQuestion } = content;

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
    let Risk = false;

    setCurrentPCLassSwitch(cLocation.trim());

    switch (cLocation) {
      case "PersonalDetail":
        stepComplete = 0;
        break;
      case "ImportantQuestion":
        stepComplete = 8;
        break;
      case "PersonalIncome":
        stepComplete = 16;
        Opt = "Opt1"
        break;
      case "PersonalAssets":
        Opt = "Opt1"
        stepComplete = 24;
        break;
      case "FinancialInvestments":
        stepComplete = 32;
        Opt = "Opt1"
        break;
      // case "SuperAndRetirement":
      //   stepComplete = 40;
      //   Opt = "Opt1"
      //   break;
      // case "Lifestyle": //Property
      //   Opt = "Opt1"
      //   stepComplete = 48;
      //   break;
      // case "Investment": //Property investment
      //   Opt = "Opt2"
      //   stepComplete = 56;
      //   break;
      case "EstatePlanning":
        // Opt = "Opt2"
        stepComplete = 40;
        break;
      case "PersonalInsurance":
        // Opt = "Opt2"
        stepComplete = 48;
        break;
      case "BusinessEntities":
        Opt = "Opt2"
        stepComplete = 56;
        break;
      case "SMSF":
        Opt = "Opt2"
        stepComplete = 64;
        break;
      case "FamilyTrust":
        Opt = "Opt2"
        stepComplete = 72;
        break;
      case "Goals-And-Objectives":
        Opt = "Opt2"
        stepComplete = 80;
        break;
      case 'Risk-Profile/Q1':
        Opt = "Opt3"
        stepComplete = 12;
        Risk = true;
        break
      case "Risk-Profile/Q2":
        Opt = "Opt3"
        stepComplete = 24;
        Risk = true;
        break
      case "Risk-Profile/Q3":
        Opt = "Opt3"
        stepComplete = 36;
        Risk = true;
        break
      case "Risk-Profile/Q4":
        Opt = "Opt3"
        stepComplete = 48;
        Risk = true;
        break
      case "Risk-Profile/Q5":
        Opt = "Opt3"
        stepComplete = 62;
        Risk = true;
        break
      case "Risk-Profile/Q6":
        Opt = "Opt3"
        stepComplete = 74;
        Risk = true;
        break
      case "Risk-Profile/Q7":
        Opt = "Opt3"
        stepComplete = 86;
        Risk = true;
        break
      case "Risk-Profile/Q8":
        Opt = "Opt3"
        stepComplete = 98;
        Risk = true;
        break
      default:
        let a = cLocation.split('/')[0];
        setCurrentTabName(a.replaceAll("-", " "));
        break;
    }

    setOptRender(Opt)
    setStepCompleted(stepComplete);


    const itemsToRender = Opt === "Opt3" ? itemsQuestion : Opt === "Opt1" ? itemsOpt.slice(0, 7) : itemsOpt.slice(7, 14);

    let conditionCheck = Opt === "Opt3" ? true : CRObject

    const updatedItems = itemsToRender.filter(item => item.condition(conditionCheck)).map(item => {

      const isPersonalDetails = item.subTitle === 'Personal Details';
      const currentEmail = localStorage.getItem("UserID");
      const iconMap = {
        FaBriefcase, FaCheck, FaGift, FaKey, FaMoneyCheckDollar, FaUser, FaHome, FaQuestionCircle, MdFamilyRestroom, RiCoinsFill, FaPlus, FaChartLine,
        MdWaterDrop, FaTriangleExclamation, RiDiscountPercentFill, MdOutlineBalance, FaGraduationCap, FaChartPie, MdOutlineTimeline, FaMoneyBillWave
      };

      const IconComponent = iconMap[item.icon] || FaUser; // Default to FaUser if not found
      let isCurrentStep = cLocation === (isPersonalDetails ? "PersonalDetail" : item.route.replace("/", ""));

      if (Opt === "Opt3") {
        isCurrentStep = cLocation.replace("Risk-Profile/", "") === (isPersonalDetails ? "PersonalDetail" : item.route.replace("/", ""));
      }

      let Status = stepComplete < item.statusStep ? "wait" : stepComplete > item.statusStep ? "finish" : 'processing';

      return {
        ...item,
        icon: (
          <span
            className={`rounded-circle text-light ${isCurrentStep ? "bgColorIncomeBlack" : "bgColorIncome2"}`}
            role="button"
            onClick={() => {
              if (Risk) {
                handleStepClick(`/Risk-Profile${item.route}`)
              }
              else {
                handleStepClick(isPersonalDetails ? `/PersonalDetail#${currentEmail}` : item.route)
              }
            }}
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

  let NoTopBarArray = [
    '/Goals-And-Objectives',
    '/Risk-Profile',
    '/Risk-Profile/',
    "/Risk-Profile-Cards",
    "/Risk-Profile/Cards"

  ]

  let topMenuArray = [
    '/',
    '/All-Clients',
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
  else if (NoTopBarArray.includes(CurrentP)) {
    return (
      <div>
      </div>
    )
  }
  else {
    return (
      <div className="container-fluid ps-md-5 ps-0" >

        <div className="row m-0 px-0 pt-0 ">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12" style={{ padding: "10px 0px 0px 1.5px" }}>
                <div className="row">
                  <div className="col-md-12 overflow-auto customScroll" style={{ padding: "20px 30px 0px 30px" }}>
                    <ConfigProvider
                      theme={{
                        components: {
                          Steps: {
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
