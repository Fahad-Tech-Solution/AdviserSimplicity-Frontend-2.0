import React, { useEffect, useState } from "react";
import { Button, Drawer, Menu } from "antd";

import { RiAppsLine, RiExchange2Line, RiMenuFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import AdviserS1 from "../Assets/Adviser-Simpilicity1.png";
import AdviserSmini from "../Assets/Adviser-Simpilicity-mini.png";
import {
  CRState,
  LoggedInUserData,
  LoggedInUserTokenJwt,
  OptionRender,
  PersonalDetailsData,
  QuestionDetail,
  SelectedClientDetails,
  SelectedSenario,
  StepsStatus,
} from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import { FaGear, FaPeopleGroup, FaUserTag } from "react-icons/fa6";
import { FaRegCreditCard, FaTachometerAlt, FaUserTie } from "react-icons/fa";
import { openNotificationSuccess } from "../Assets/Api/Api";
import { AiOutlineBank } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

const { SubMenu } = Menu;

const AdminSideBar = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [CRStateObj, setCRState] = useRecoilState(CRState);
  const [stepsStatus, setStepsStatus] = useRecoilState(StepsStatus);
  const [optRender, setOptRender] = useRecoilState(OptionRender);
  const [PersonalDetailObj, setPersonalDetailObj] =
    useRecoilState(PersonalDetailsData);
  const [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);
  const selectedClientDetails = useRecoilValue(SelectedClientDetails);
  const selectedSenario = useRecoilValue(SelectedSenario);
  const [loggedUser, setLoggedInUserData] = useRecoilState(LoggedInUserData);
  const [loginTokenJwt, setLoginTokenJwt] =
    useRecoilState(LoggedInUserTokenJwt);

  let superAdmin =
    loggedUser?.roleID?.permissions.includes("superAdmin") || false;

  const nav = useNavigate();
  const location = useLocation();

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddClientClick = () => {
    localStorage.removeItem("Email");
    localStorage.removeItem("PartnerName");
    localStorage.removeItem("UserID");
    localStorage.removeItem("UserName");
    localStorage.removeItem("UserStatus");
    setCRState();
    setStepsStatus(true);
    setOptRender("Opt1");
    localStorage.setItem("OptionRender", "Opt1");

    setPersonalDetailObj({
      client: {
        clientTitle: "Mr.",
        clientGivenName: "John",
        clientSurname: "Doe",
        clientPreferredName: "Johnny",
        clientGender: "Male",
        clientDOB: "1990-01-01",
        clientAge: 34,
        clientMaritalStatus: "Single",
        clientEmploymentStatus: "Employed",
        clientHealth: "Good",
        clientSmoker: "No",
        clientPlannedRetirementAge: 65,
        clientHomeAddress: "123 Main St",
        clientPostcode: 12345,
        clientHomePhone: "555-555-5555",
        clientWorkPhone: "555-555-5556",
        clientMobile: "555-555-5557",
        Email: "john.doe@example.com",
        clientPostalAddress: "123 Main St",
        clientPostalPostCode: 12345,
        clientMiddleName: "Michael",
        clientOccupationID: "OCC123",
        clientTaxResidentRadio: "Yes",
        clientPrivateHealthCoverRadio: "Yes",
        clientHELPSDebtRadio: "No",
        clientSameAsAbove: true,
        clientRetirement: "Comfortable",
      },
      partner: {},
      children: {
        numberOfChildren: 0,
      },
      haveAnyChildren: "No",
    });

    setQuestionDetail({});
    nav("/PersonalDetail");
    if (isMobile) setDrawerVisible(false);
  };

  const menuItems = (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={() => isMobile && setDrawerVisible(false)}
    >
      {!isMobile && (
        <Menu.Item
          disabled
          className="customeSideHead"
          key="1"
          style={{ height: "5rem" }}
          title={props.collapsed ? "Logo" : null}
        >
          <div
            role="button"
            className="mt-3"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              props.setCollapsed(!props.collapsed);
            }}
          >
            <img
              src={props.collapsed ? AdviserSmini : AdviserS1}
              alt="Logo"
              width={props.collapsed ? "50px" : "170px"}
            />
          </div>
        </Menu.Item>
      )}

      <Menu.Item
        key={superAdmin ? "/super/admin/dashboard" : "/Dashboard"}
        icon={<FaTachometerAlt />}
        onClick={() =>
          nav(superAdmin ? "/super/admin/dashboard" : "/Dashboard")
        }
      >
        Dashboard
      </Menu.Item>

      {!superAdmin && (
        <>
          <Menu.Item
            key="/CDF_Prospects"
            icon={<FaPeopleGroup />}
            onClick={() => nav("/CDF_Prospects")}
          >
            CDF Prospects
          </Menu.Item>

          <Menu.Item
            key="/My-Team"
            onClick={() => nav("/My-Team")}
            icon={<FaUserTie />}
          >
            My Team
          </Menu.Item>
        </>
      )}

      <Menu.Item
        key="/super/admin/financial-institutions"
        onClick={() => nav("/super/admin/financial-institutions")}
        icon={<AiOutlineBank />}
      >
        Financial Entities & Offerings
      </Menu.Item>

      {!superAdmin && (
        <>
          <SubMenu key="sub1" icon={<RiAppsLine />} title="Discovery">
            <Menu.Item
              key="/All-Clients"
              onClick={() => {
                if (selectedClientDetails?._id) {
                  localStorage.setItem("UserID", selectedClientDetails._id);
                  localStorage.setItem(
                    "selected client",
                    JSON.stringify([selectedClientDetails.key])
                  );
                  localStorage.setItem(
                    "Email",
                    selectedClientDetails.client.Email
                  );
                  setQuestionDetail({});
                  setStepsStatus(false);
                  nav("/PersonalDetail#" + selectedClientDetails._id);
                } else {
                  openNotificationSuccess(
                    "warning",
                    "topRight",
                    "No Client Selected",
                    "Please select a client before proceeding."
                  );
                }
              }}
            >
              Financial Details
            </Menu.Item>
            <Menu.Item
              key="/Goals-And-Objectives"
              onClick={() => nav("/Goals-And-Objectives")}
            >
              Goals and Objectives
            </Menu.Item>
            <Menu.Item key="/Risk-Profile" onClick={() => nav("/Risk-Profile")}>
              Risk Profile
            </Menu.Item>
            <Menu.Item key="/PersonalDetail" onClick={handleAddClientClick}>
              Add Client
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub2" icon={<RiExchange2Line />} title="Cash Flow">
            <Menu.Item
              key="/Cash-Flow/AllUsers"
              onClick={() => nav("/Cash-Flow/AllUsers")}
            >
              All Cash Flow Scenarios
            </Menu.Item>

            {selectedClientDetails?.client && (
              <SubMenu
                className="subSubMenu"
                key="sub3"
                title={`${selectedClientDetails.client.clientGivenName} - Scenario`}
              >
                <Menu.Item
                  key="/Cash-Flow/oneClient"
                  onClick={() => nav("/Cash-Flow/oneClient")}
                >
                  Scenarios
                </Menu.Item>
                <Menu.Item
                  key="/Cash-Flow/Reports/"
                  disabled={
                    Object.keys(selectedSenario).length > 0 ? false : true
                  }
                  onClick={() => nav("/Cash-Flow/Reports/")}
                >
                  Reports
                </Menu.Item>
              </SubMenu>
            )}
          </SubMenu>
        </>
      )}

      {superAdmin && (
        <>
          <Menu.Item
            key="/super/admin/adviser-simplicity-packages"
            onClick={() => nav("/super/admin/adviser-simplicity-packages")}
            icon={<FaRegCreditCard />}
          >
            All Subscriptions
          </Menu.Item>
          <Menu.Item
            key="/super/admin/all-advisers"
            onClick={() => nav("/super/admin/all-advisers")}
            icon={<FaUserTie />}
          >
            All Advisers
          </Menu.Item>
          <Menu.Item
            key="/super/admin/all-roles"
            onClick={() => nav("/super/admin/all-roles")}
            icon={<FaUserTag />}
          >
            All Roles
          </Menu.Item>
        </>
      )}

      {isMobile && (
        <>
          <Menu.Item
            key="/"
            onClick={() => {
              setLoggedInUserData({});
              setLoginTokenJwt({});
              nav("/");
            }}
            icon={<FiLogOut />}
          >
           Logout
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      {isMobile && (
        <Button
          type="primary"
          icon={<RiMenuFill />}
          onClick={() => setDrawerVisible(!drawerVisible)}
          style={{ position: "fixed", top: 23, left: 10, zIndex: 2000 }}
        />
      )}

      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          title={
            <img
              src={AdviserS1}
              alt="Logo"
              style={{ width: 150, objectFit: "contain" }}
            />
          }
          placement="left"
          open={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          bodyStyle={{ padding: 0 }}
          width={250}
        >
          {menuItems}
        </Drawer>
      ) : (
        // Desktop Sidebar
        <div className={`AdminSideBar ${props.collapsed ? "collapsed" : ""}`}>
          <Menu
            mode="inline"
            inlineCollapsed={props.collapsed}
            selectedKeys={[location.pathname]}
            style={{
              position: "sticky",
              minHeight: "100vh",
            }}
          >
            {menuItems.props.children}
          </Menu>
        </div>
      )}
    </>
  );
};

export default AdminSideBar;
