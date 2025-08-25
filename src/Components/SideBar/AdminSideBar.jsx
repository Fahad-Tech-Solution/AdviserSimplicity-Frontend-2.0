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
import {
  FaBalanceScale,
  FaRegCreditCard,
  FaTachometerAlt,
  FaUserTie,
} from "react-icons/fa";
import { openNotificationSuccess } from "../Assets/Api/Api";
import { AiOutlineBank } from "react-icons/ai";
import { FiLogOut, FiUser } from "react-icons/fi";

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

  let employee = loggedUser?.roleID?.permissions.includes("employee") || false;

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
    nav("/user/personal-detail");
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
        key={superAdmin ? "/super/admin/dashboard" : "/user/dashboard"}
        icon={<FaTachometerAlt />}
        onClick={() =>
          nav(superAdmin ? "/super/admin/dashboard" : "/user/dashboard")
        }
      >
        Dashboard
      </Menu.Item>

      {isMobile && (
        <>
          <Menu.Item
            key={superAdmin ? "/super/admin/profile" : "/user/profile"}
            onClick={() => {
              nav(superAdmin ? "/super/admin/profile" : "/user/profile");
            }}
            icon={<FiUser />}
          >
            Profile
          </Menu.Item>
        </>
      )}

      {!superAdmin && (
        <>
          {loggedUser?.roleID?.permissions.includes("prospects") && (
            <Menu.Item
              key="/user/CDF-prospects"
              icon={<FaPeopleGroup />}
              onClick={() => nav("/user/CDF-prospects")}
            >
              CDF Prospects
            </Menu.Item>
          )}
          {loggedUser?.roleID?.permissions.includes("adviser") && (
            <Menu.Item
              key="/user/my-team"
              onClick={() => nav("/user/my-team")}
              icon={<FaUserTie />}
            >
              My Team
            </Menu.Item>
          )}
        </>
      )}

      {superAdmin && (
        <Menu.Item
          key="/super/admin/financial-institutions"
          onClick={() => nav("/super/admin/financial-institutions")}
          icon={<AiOutlineBank />}
        >
          Financial Entities & Offerings
        </Menu.Item>
      )}

      {!superAdmin && (
        <>
          <SubMenu key="sub1" icon={<RiAppsLine />} title="Discovery">
            <Menu.Item
              key="/user/all-client"
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
                  nav("/user/personal-detail#" + selectedClientDetails._id);
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
              key="/user/goals-and-objectives"
              onClick={() => nav("/user/goals-and-objectives")}
            >
              Goals and Objectives
            </Menu.Item>
            <Menu.Item
              key="/user/personal-detail"
              onClick={handleAddClientClick}
            >
              Add Client
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<FaBalanceScale />} title="Risk Profile">
            {selectedClientDetails?.client && (
              <Menu.Item
                key="/user/risk-profile"
                onClick={() => nav("/user/risk-profile")}
              >
                View Risk Profile
              </Menu.Item>
            )}
            <Menu.Item
              key="/user/all-risk-profile"
              onClick={() => nav("/user/all-risk-profile")}
            >
              All Risk Profile
            </Menu.Item>
          </SubMenu>
          {loggedUser?.roleID?.permissions.includes("cashflow") && (
            <SubMenu key="sub2" icon={<RiExchange2Line />} title="Cash Flow">
              <Menu.Item
                key="/user/cashflow/allusers"
                onClick={() => nav("/user/cashflow/allusers")}
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
                    key="/user/cashflow/one-client"
                    onClick={() => nav("/user/cashflow/one-client")}
                  >
                    Scenarios
                  </Menu.Item>
                  <Menu.Item
                    key="/user/cashflow/reports/"
                    disabled={
                      Object.keys(selectedSenario).length > 0 ? false : true
                    }
                    onClick={() => nav("/user/cashflow/reports/")}
                  >
                    Reports
                  </Menu.Item>
                </SubMenu>
              )}
            </SubMenu>
          )}
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
