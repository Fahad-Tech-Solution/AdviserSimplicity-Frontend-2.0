import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
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
import {
  UserName,
  CurrentPage,
  OptionRender,
  CRState,
  StepsStatus,
} from "../Store/Store";

import "./options.css";

const iconMap = {
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
  FaHome,
  FaQuestionCircle,
  MdFamilyRestroom,
  MdWaterDrop,
  MdOutlineBalance,
  MdOutlineTimeline,
  RiCoinsFill,
  RiDiscountPercentFill,
};

function Options(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [userName] = useRecoilState(UserName);
  const [CurrentP] = useRecoilState(CurrentPage);
  const [optRender, setOptRender] = useRecoilState(OptionRender);
  const CRObject = useRecoilValue(CRState);
  const stepsStatus = useRecoilValue(StepsStatus);

  const [leftPadding, setLeftPadding] = useState("18rem");
  const [currentTabName, setCurrentTabName] = useState("Home");
  const [stepCompleted, setStepCompleted] = useState(8);
  const [currentPCLassSwitch, setCurrentPCLassSwitch] =
    useState("PersonalDetail");
  const [items, setItems] = useState([]);

  useEffect(() => {
    setLeftPadding(props.SidebarSwitch ? "5rem" : "18rem");
  }, [props.SidebarSwitch]);

  useEffect(() => {
    const cLocation = location.pathname.replace("/", "");
    let Opt = "Opt1";
    let stepComplete = 0;
    let Risk = false;

    setCurrentPCLassSwitch(cLocation);

    setCurrentTabName(
      cLocation?.split("/").filter(Boolean).join(" ").replace(/[_-]/g, " ") ||
        "Dashboard"
    );

    const stepMap = {
      PersonalDetail: 0,
      ImportantQuestion: 8,
      PersonalIncome: 16,
      PersonalAssets: 24,
      FinancialInvestments: 32,
      EstatePlanning: 40,
      PersonalInsurance: 48,
      BusinessEntities: 56,
      SMSF: 64,
      FamilyTrust: 72,
      "Goals-And-Objectives": 80,
      "Risk-Profile/Q1": 12,
      "Risk-Profile/Q2": 24,
      "Risk-Profile/Q3": 36,
      "Risk-Profile/Q4": 48,
      "Risk-Profile/Q5": 62,
      "Risk-Profile/Q6": 74,
      "Risk-Profile/Q7": 86,
      "Risk-Profile/Q8": 98,
    };

    stepComplete = stepMap[cLocation] || 0;
    Risk = cLocation.startsWith("Risk-Profile");

    if (
      [
        "BusinessEntities",
        "SMSF",
        "FamilyTrust",
        "Goals-And-Objectives",
      ].includes(cLocation)
    )
      Opt = "Opt2";
    if (Risk) Opt = "Opt3";

    setOptRender(Opt);
    setStepCompleted(stepComplete);

    const { itemsOpt, itemsQuestion } = content;
    const itemsToRender =
      Opt === "Opt3"
        ? itemsQuestion
        : Opt === "Opt1"
        ? itemsOpt.slice(0, 7)
        : itemsOpt.slice(7, 14);

    const conditionCheck = Opt === "Opt3" ? true : CRObject;

    const updatedItems = itemsToRender
      .filter((item) => item.condition(conditionCheck))
      .map((item) => {
        const IconComponent = iconMap[item.icon] || FaUser;
        const isPersonalDetails = item.subTitle === "Personal Details";
        const currentEmail = localStorage.getItem("UserID");
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
        const status =
          stepComplete < item.statusStep
            ? "wait"
            : stepComplete > item.statusStep
            ? "finish"
            : "process";

        return {
          ...item,
          icon: (
            <span
              className={`rounded-circle text-light ${
                isCurrentStep ? "bgColorIncomeBlack" : "bgColorIncome2"
              }`}
              role="button"
              onClick={() => {
                const path = Risk
                  ? `/Risk-Profile${item.route}`
                  : isPersonalDetails
                  ? `/PersonalDetail#${currentEmail}`
                  : item.route;
                if (!stepsStatus) navigate(path);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                width: "2rem",
                height: "2rem",
              }}
            >
              <IconComponent />
            </span>
          ),
          status,
          subTitle: (
            <span
              style={{
                color: isCurrentStep ? "#000" : "#808080",
                fontSize: "11px",
                fontWeight: isCurrentStep ? "600" : "500",
              }}
            >
              {item.subTitle}
            </span>
          ),
        };
      });

    setItems(updatedItems);
  }, [location, CRObject]);

  const topMenuArray = [
    "/",
    "/All-Clients",
    "/Cash-Flow/AllUsers",
    "/Cash-Flow/oneClient",
    "/CDF_Prospects",
  ];
  const noTopBarArray = [
    "/Goals-And-Objectives",
    "/Risk-Profile",
    "/Risk-Profile/",
    "/Risk-Profile-Cards",
    "/Risk-Profile/Cards",
  ];

  if (topMenuArray.includes(location.pathname)) {
    return (
      <div className="container-fluid" style={{ position: "relative" }}>
        <div className="container-fluid">
          <div className="row pe-4">
            <div className="col-md-12 p-0">
              <div
                className={props.collapsed ? "" : "sidebar-collapsed"}
                id="OptionsBar"
              >
                <div className="Top_Nav">
                  <div className="d-flex justify-content-between align-items-center">
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
                        onClick={() => props.setCollapsed(!props.collapsed)}
                      />
                      {/* <FontAwesomeIcon icon={faMoon} className="moon" /> */}
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
  }

  if (noTopBarArray.includes(location.pathname)) return <div></div>;

  return (
    <div className="container-fluid">
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
                  style={{ padding: "10px 20px 0px 20px" }}
                >
                  <ConfigProvider
                    theme={{
                      components: { Steps: { customIconFontSize: 30 } },
                      token: {
                        colorPrimary: "#36b446",
                        fontSize: 12,
                        lineWidth: 4,
                      },
                    }}
                  >
                    <Steps
                      items={items}
                      labelPlacement="vertical"
                      initial={0}
                      responsive={false}
                      status="process"
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

export default Options;
