import {
  faBars,
  faCircleUser,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ConfigProvider, Dropdown, Menu, Steps } from "antd";
import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { content } from "../../Content/Content";

import {
  FaCertificate,
  FaMoneyBillWave,
  FaUser,
  FaUserShield,
} from "react-icons/fa6";
import { RiCoinsFill, RiDiscountPercentFill } from "react-icons/ri";
import {
  MdFamilyRestroom,
  MdWaterDrop,
  MdOutlineBalance,
  MdOutlineTimeline,
} from "react-icons/md";
import { BiDollarCircle } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { useRecoilState } from "recoil";
import { LoggedInUserData } from "../../Store/Store";

const AdminTopMenu = (props) => {
  // let [currentPCLassSwitch, setCurrentPCLassSwitch] = useState("Admin Panel");

  let [loggedInUserData, setLoggedInUserData] =
    useRecoilState(LoggedInUserData);

  let [items, setItems] = useState([]);
  let { superAdmin } = content;

  let location = useLocation();

  useEffect(() => {
    let cLocation =
      location.pathname === "/SuperAdmin" ||
      location.pathname === "/SuperAdmin/"
        ? ""
        : location.pathname.replace("/SuperAdmin/", "");
    console.log(location.pathname, cLocation);

    let stepComplete = 0;

    switch (cLocation) {
      case "InvestmentPlatforms":
        stepComplete = 10;
        break;
      case "InvestmentBonds":
        stepComplete = 20;
        break;
      case "SuperannuationFunds":
        stepComplete = 30;
        break;
      case "AccountBasedPensions":
        stepComplete = 40;
        break;
      case "Annuities":
        stepComplete = 50;
        break;
      case "PersonalInsurances":
        stepComplete = 60;
        break;
      default:
        stepComplete = 0;
        break;
    }

    const itemsToRender = superAdmin;

    let conditionCheck = true;

    const updatedItems = itemsToRender
      .filter((item) => item.condition(conditionCheck))
      .map((item) => {
        const iconMap = {
          FaUser,
          RiCoinsFill,
          MdFamilyRestroom,
          FaCertificate,
          FaMoneyBillWave,
          FaUserShield,
          BiDollarCircle,
          RiDiscountPercentFill,
        };

        const IconComponent = iconMap[item.icon] || FaUser; // Default to FaUser if not found
        let isCurrentStep = cLocation === item.route.replace("/", "");

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
                handleStepClick(`/SuperAdmin${item.route}`);
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
          status: Status,
          subTitle: (
            <span
              style={{
                color: isCurrentStep ? "#000" : "#808080",
                fontSize: "12px",
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
  }, [location]);

  let Nev = useNavigate();
  let handleStepClick = (props) => {
    Nev(props);
  };

  let topMenuArray = [
    "/SuperAdmin/Adviser_Simplicity_Packages",
    "/SuperAdmin/All_Advisers",
    "/SuperAdmin/All_Roles",
    "/SuperAdmin/Dashboard",
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
            Nev("/profile");
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
            Nev("/");
          }}
        >
          Logout <FiLogOut />
        </Menu.Item>
      </React.Fragment>
    </Menu>
  );

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
                          {location.pathname.replace("/", "")}
                        </Breadcrumb.Item>
                      </Breadcrumb>
                      <h5 className="Page LeagueSpartanFamily">
                        {location.pathname
                          .replace("/SuperAdmin", "")
                          ?.split("/")
                          .filter(Boolean)
                          .join(" ")
                          .replace(/[_-]/g, " ") || "Dashboard"}
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
                      <div className="d-flex justify-content-center align-items-center">
                        <Dropdown overlay={getMenu()}>
                          <img
                            src="https://demos.creative-tim.com/muse-ant-design-dashboard/static/media/face-1.d85d07a1.jpg"
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

  return (
    <div className="container-fluid overflow-hidden">
      <div className="row">
        <div className="col-md-12" style={{ padding: "20px 0px 0px 0px" }}>
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
  );
};

export default AdminTopMenu;
