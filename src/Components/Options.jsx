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
import { ConfigProvider, Dropdown, Menu, Steps } from "antd";
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
  FaRegBuilding,
  FaPiggyBank,
  FaRegHandshake,
} from "react-icons/fa6";
import {
  FaEdit,
  FaHome,
  FaPowerOff,
  FaQuestionCircle,
  FaUserAlt,
} from "react-icons/fa";
import {
  MdFamilyRestroom,
  MdWaterDrop,
  MdOutlineBalance,
  MdOutlineTimeline,
} from "react-icons/md";
import { RiCoinsFill, RiDiscountPercentFill } from "react-icons/ri";

import { content } from "../Content/Content";
import {
  openNotificationSuccess,
  toSentenceCase,
  toTitleCase,
} from "./Assets/Api/Api";
import {
  UserName,
  CurrentPage,
  OptionRender,
  CRState,
  StepsStatus,
  LoggedInUserData,
} from "../Store/Store";

import "./options.css";
import { FiLogOut } from "react-icons/fi";
import {
  IoDocumentTextOutline,
  IoNewspaperOutline,
  IoShieldCheckmark,
} from "react-icons/io5";
import { AiOutlineFileProtect } from "react-icons/ai";
import { HiOutlineViewGridAdd } from "react-icons/hi";

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
  IoNewspaperOutline,
  FaRegBuilding,
  IoDocumentTextOutline,
  AiOutlineFileProtect,
  IoShieldCheckmark,
  FaPiggyBank,
  FaRegHandshake,
  HiOutlineViewGridAdd,
};

function Options(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [optRender, setOptRender] = useRecoilState(OptionRender);
  let [loggedInUserData, setLoggedInUserData] =
    useRecoilState(LoggedInUserData);
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
    const cLocation = location.pathname;
    let Opt = "Opt1";
    let stepComplete = 0;
    let Risk = false;
    // console.log(cLocation)

    setCurrentPCLassSwitch(cLocation);

    let title =
      cLocation?.split("/").filter(Boolean).join(" ").replace(/[_-]/g, " ") ||
      "Dashboard";

    setCurrentTabName(title == "profile" ? "Profile" : title);

    const stepMap = {
      "/user/personal-detail": 0,
      "/user/important-question": 8,
      "/user/personal-income": 16,
      "/user/personal-assets": 24,
      "/user/financial-investments": 32,
      "/user/estate-planning": 40,
      "/user/personal-insurance": 48,
      "/user/business-entities": 56,
      "/user/SMSF": 64,
      "/user/family-trust": 72,
      "Goals-And-Objectives": 80,
      "/user/risk-profile/Q1": 10,
      "/user/risk-profile/Q2": 20,
      "/user/risk-profile/Q3": 30,
      "/user/risk-profile/Q4": 40,
      "/user/risk-profile/Q5": 50,
      "/user/risk-profile/Q6": 60,
      "/user/risk-profile/Q7": 70,
      "/user/risk-profile/Q8": 80,
      "/user/risk-profile/detection-matrix": 90,
    };

    stepComplete = stepMap[cLocation] || 0;

    Risk = cLocation.startsWith("/user/risk-profile");

    if (Risk) Opt = "Opt3";

    setOptRender(Opt);
    setStepCompleted(stepComplete);

    const { itemsOpt, itemsQuestion } = content;
    const itemsToRender =
      Opt === "Opt3" ? itemsQuestion : itemsOpt.slice(0, 14);

    const conditionCheck = Opt === "Opt3" ? true : CRObject;

    const updatedItems = itemsToRender
      .filter((item) => item.condition(conditionCheck))
      .map((item) => {
        const IconComponent = iconMap[item.icon] || FaUser;
        const isPersonalDetails = item.subTitle === "Personal Details";
        const currentEmail = localStorage.getItem("UserID");
        // console.log(item.route,"item.route");
        let isCurrentStep =
          cLocation ===
          (isPersonalDetails ? "/user/personal-detail" : item.route);
        if (Opt === "Opt3") {
          isCurrentStep =
            cLocation.replace("/user/risk-profile/", "") ===
            (isPersonalDetails
              ? "/user/personal-detail"
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
                  ? `/user/risk-profile${item.route}`
                  : isPersonalDetails
                  ? `/user/personal-detail#${currentEmail}`
                  : item.route;
                if (!stepsStatus) navigate(path);
                // console.log(path);
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
                fontSize: "12px",
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
    "/user/my-clients",
    "/user/all-client",
    "/user/cashflow/allusers",
    "/user/cashflow/one-client",
    "/user/CDF-prospects",
    "/user/profile",
    "/user/my-team",
    "/user/all-risk-profile",
  ];

  const noTopBarArray = [
    "/user/goals-and-objectives",
    "/user/risk-profile",
    "/user/risk-profile/",
    "/user/risk-profile/404NotFound",
    "/Risk-Profile-Cards",
    "/user/risk-profile/cards",
    "/PricingTable",
    "/",
  ];

  const getMenu = (row) => (
    <Menu
      style={{
        minWidth: "150px",
        marginTop: "10px",
      }}
    >
      <React.Fragment>
        <Menu.Item
          key="1"
          style={{
            minHeight: "40px",
            fontSize: "14px",
            fontWeight: "600",
          }}
          onClick={() => {
            navigate("/user/profile");
          }}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          key="3"
          style={{
            minHeight: "40px",
            color: "#FF4D4F",
            fontSize: "14px",
            fontWeight: "600",
          }}
          onClick={() => {
            setLoggedInUserData({});
            navigate("/");
          }}
        >
          Logout <FiLogOut />
        </Menu.Item>
      </React.Fragment>
    </Menu>
  );

  if (topMenuArray.includes(location.pathname)) {
    return (
      <div
        style={{
          position: "fixed",
          top: 10,
          zIndex: 100,
          background: "transparent",
          padding: 0,
          height: "fit-content",
          width: props.collapsed ? "calc(100% - 80px)" : "calc(100% - 250px)", // adjust width based on sidebar
        }}
        className="d-md-block d-none"
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
                  Admin
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  active
                  linkAs={Link}
                  linkProps={{ to: "/" }}
                  className="p-0 m-0 LeagueSpartanFamily"
                >
                  {toSentenceCase(
                    location.pathname
                      .split("/")
                      .filter(Boolean)
                      .pop()
                      .replaceAll("-", " ")
                  )}
                </Breadcrumb.Item>
              </Breadcrumb>
              <h5 className="Page LeagueSpartanFamily">
                {toTitleCase(
                  location.pathname
                    .split("/")
                    .filter(Boolean)
                    .pop()
                    .replaceAll("-", " ")
                )}
              </h5>
            </div>
            <div className="rightBlock d-flex justify-content-around align-items-center">
              <FontAwesomeIcon
                role="button"
                icon={faBars}
                className="menu"
                onClick={() => props.setCollapsed(!props.collapsed)}
              />
              {/* <FontAwesomeIcon icon={faMoon} className="moon" /> */}
              <div className="d-flex justify-content-center align-items-center">
                <Dropdown overlay={getMenu()}>
                  <img
                    src="https://i.pinimg.com/736x/c7/9a/37/c79a37e13ef14be556b51143bcbb1b01.jpg"
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: "35px" }}
                  />
                </Dropdown>
              </div>
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
