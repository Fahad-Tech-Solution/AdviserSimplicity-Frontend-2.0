import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./options.css";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  UserName,
  CurrentPage,
  OptionRender,
  CRState,
  StepsStatus,
} from "../Store/Store";
import { Breadcrumb, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleUser,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { ConfigProvider, Steps } from "antd";
import {
  FaBriefcase,
  FaCheck,
  FaGift,
  FaKey,
  FaMoneyCheckDollar,
  FaMoneyBillWave,
  FaPlus,
  FaUser,
  FaChartLine,
  FaTriangleExclamation,
  FaGraduationCap,
  FaChartPie,
} from "react-icons/fa6";
import { FaHome, FaQuestionCircle } from "react-icons/fa";
import {
  MdFamilyRestroom,
  MdWaterDrop,
  MdOutlineBalance,
  MdOutlineTimeline,
} from "react-icons/md";
import { RiCoinsFill, RiDiscountPercentFill } from "react-icons/ri";
import { content } from "../Content/Content";
import { openNotificationSuccess } from "./Assets/Api/Api";

function Options(props) {
  let Nev = useNavigate();

  let [userName] = useRecoilState(UserName); // eslint-disable-line no-unused-vars
  let [CurrentP] = useRecoilState(CurrentPage);
  let [optRender, setOptRender] = useRecoilState(OptionRender);
  let CRObject = useRecoilValue(CRState);

  let [leftPadding, setLeftPadding] = useState("18rem");
  let [currentTabName, setCurrentTabName] = useState("Home");

  let [stepCompleted, setStepCompleted] = useState(8);
  let [currentPCLassSwitch, setCurrentPCLassSwitch] =
    useState("PersonalDetail");

  let [items, setItems] = useState([]);
  let { itemsOpt } = content;
  let { itemsQuestion } = content;

  let stepsStatus = useRecoilValue(StepsStatus); // eslint-disable-line no-unused-vars

  useEffect(() => {
    if (props.SidebarSwitch === true) {
      // alert(props.SidebarSwitch );
      setLeftPadding("5rem");
    } else {
      // alert(props.SidebarSwitch );
      setLeftPadding("18rem");
    }
  }, [props.SidebarSwitch]);

  let location = useLocation();

  useEffect(() => {
    let cLocation = location.pathname.replace("/", "");
    console.log(location.pathname);

    let Opt = "Opt1";
    let stepComplete = 0;
    let Risk = false;
    let cashFlow = false;

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
        Opt = "Opt1";
        break;
      case "PersonalAssets":
        Opt = "Opt1";
        stepComplete = 24;
        break;
      case "FinancialInvestments":
        stepComplete = 32;
        Opt = "Opt1";
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
        Opt = "Opt2";
        stepComplete = 56;
        break;
      case "SMSF":
        Opt = "Opt2";
        stepComplete = 64;
        break;
      case "FamilyTrust":
        Opt = "Opt2";
        stepComplete = 72;
        break;
      case "Goals-And-Objectives":
        Opt = "Opt2";
        stepComplete = 80;
        break;
      case "Risk-Profile/Q1":
        Opt = "Opt3";
        stepComplete = 12;
        Risk = true;
        break;
      case "Risk-Profile/Q2":
        Opt = "Opt3";
        stepComplete = 24;
        Risk = true;
        break;
      case "Risk-Profile/Q3":
        Opt = "Opt3";
        stepComplete = 36;
        Risk = true;
        break;
      case "Risk-Profile/Q4":
        Opt = "Opt3";
        stepComplete = 48;
        Risk = true;
        break;
      case "Risk-Profile/Q5":
        Opt = "Opt3";
        stepComplete = 62;
        Risk = true;
        break;
      case "Risk-Profile/Q6":
        Opt = "Opt3";
        stepComplete = 74;
        Risk = true;
        break;
      case "Risk-Profile/Q7":
        Opt = "Opt3";
        stepComplete = 86;
        Risk = true;
        break;
      case "Risk-Profile/Q8":
        Opt = "Opt3";
        stepComplete = 98;
        Risk = true;
        break;
      default:
        let a = cLocation.split("/")[0];
        setCurrentTabName(a.replaceAll("-", " "));
        break;
    }

    setOptRender(Opt);
    setStepCompleted(stepComplete);

    const itemsToRender =
      Opt === "Opt3"
        ? itemsQuestion
        : Opt === "Opt1"
        ? itemsOpt.slice(0, 7)
        : itemsOpt.slice(7, 14);

    let conditionCheck = Opt === "Opt3" ? true : CRObject;

    const updatedItems = itemsToRender
      .filter((item) => item.condition(conditionCheck))
      .map((item) => {
        const isPersonalDetails = item.subTitle === "Personal Details";
        const currentEmail = localStorage.getItem("UserID");

        const iconMap = {
          FaBriefcase,
          FaCheck,
          FaGift,
          FaKey,
          FaMoneyCheckDollar,
          FaUser,
          FaHome,
          FaQuestionCircle,
          MdFamilyRestroom,
          RiCoinsFill,
          FaPlus,
          FaChartLine,
          MdWaterDrop,
          FaTriangleExclamation,
          RiDiscountPercentFill,
          MdOutlineBalance,
          FaGraduationCap,
          FaChartPie,
          MdOutlineTimeline,
          FaMoneyBillWave,
        };

        const IconComponent = iconMap[item.icon] || FaUser; // Default to FaUser if not found
        let isCurrentStep =
          cLocation ===
          (isPersonalDetails ? "PersonalDetail" : item.route.replace("/", ""));

        if (Opt === "Opt3") {
          isCurrentStep =
            cLocation.replace("Risk-Profile/", "") ===
            (isPersonalDetails
              ? "PersonalDetail"
              : item.route.replace("/", ""));
        }

        let Status =
          stepComplete < item.statusStep
            ? "wait"
            : stepComplete > item.statusStep
            ? "finish"
            : "processing";

        return {
          ...item,
          icon: (
            <span
              className={`rounded-circle text-light ${
                isCurrentStep ? "bgColorIncomeBlack" : "bgColorIncome2"
              }`}
              role="button"
              onClick={() => {
                if (Risk) {
                  handleStepClick(`/Risk-Profile${item.route}`);
                } else {
                  handleStepClick(
                    isPersonalDetails
                      ? `/PersonalDetail#${currentEmail}`
                      : item.route
                  );
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px", // Adjust icon size here
                width: "2rem", // Adjust icon container size here
                height: "2rem", // Adjust icon container height here
              }}
            >
              <IconComponent />
            </span>
          ),
          status: Status,
          subTitle: (
            <span
              style={{
                color: isCurrentStep ? "#000" : "#808080",
                fontSize: "11px",
                width: "100%",
                fontWeight: isCurrentStep ? "600" : "500",
              }}
            >
              {" "}
              {item.subTitle}{" "}
            </span>
          ),
        };
      });

    setItems(updatedItems);
  }, [location, CRObject]);

  let handleStepClick = (props) => {
    if (!stepsStatus) {
      Nev(props);
    }
  };

  let NoTopBarArray = [
    "/Goals-And-Objectives",
    "/Risk-Profile",
    "/Risk-Profile/",
    "/Risk-Profile-Cards",
    "/Risk-Profile/Cards",
  ];

  let topMenuArray = [
    "/",
    "/All-Clients",
    "/Cash-Flow/AllUsers",
    "/CDF_Clients",
  ];

  const sidebarWidth = props.collapsed ? "" : "sidebar-collapsed"; // Change these values as needed

  if (topMenuArray.includes(location.pathname)) {
    return (
      <div
        className="container-fluid "
        // id="OptionsBar"
        style={{ position: "relative" }}
      >
        <div className="container-fluid">
          <div className="row pe-4">
            <div className="col-md-12 p-0">
              <div className={sidebarWidth} id="OptionsBar">
                <div className="Top_Nav">
                  <div className="d-flex justify-content-between">
                    <div>
                      <Breadcrumb className="BreadcrumbCustom">
                        <Breadcrumb.Item
                          active
                          linkAs={Link}
                          linkProps={{ to: "/" }}
                          className="p-0 m-0 LeagueSpartanFamily"
                        >
                          Dashboard
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                          active
                          linkAs={Link}
                          linkProps={{ to: "/" }}
                          className="p-0 m-0 LeagueSpartanFamily"
                        >
                          {currentPCLassSwitch}
                        </Breadcrumb.Item>
                      </Breadcrumb>
                      <h5 className="Page LeagueSpartanFamily">
                        {currentTabName || "Dashboard"}
                      </h5>
                    </div>
                    <div className="rightBlock">
                      <FontAwesomeIcon
                        role="button"
                        icon={faBars}
                        className="menu"
                        onClick={() => {
                          props.setCollapsed(!props.collapsed);
                        }}
                      />
                      <FontAwesomeIcon icon={faMoon} className="moon" />
                      <FontAwesomeIcon icon={faCircleUser} className="user" />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="d-none d-md-block"
                style={{ height: "6.5rem" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (NoTopBarArray.includes(location.pathname)) {
    return <div></div>;
  } else {
    return (
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div
                className="col-md-12"
                style={{ padding: "10px 0px 0px 1.5px" }}
              >
                <div className="row">
                  <div
                    className="col-md-12 overflow-auto customScroll"
                    style={{ padding: "20px 20px 0px 20px" }}
                  >
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
