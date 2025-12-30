import React, { useEffect, useState } from "react";
import { Button, ConfigProvider, Drawer, Menu } from "antd";

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
import {
  FaChessKnight,
  FaGear,
  FaPeopleGroup,
  FaUserTag,
} from "react-icons/fa6";
import {
  FaBalanceScale,
  FaRegCreditCard,
  FaTachometerAlt,
  FaUserTie,
} from "react-icons/fa";
import { openNotificationSuccess } from "../Assets/Api/Api";
import { AiOutlineBank } from "react-icons/ai";
import {
  FiActivity,
  FiBarChart2,
  FiDollarSign,
  FiFileText,
  FiLogOut,
  FiShuffle,
  FiUser,
} from "react-icons/fi";
import {
  MdInbox,
  MdInput,
  MdLocationPin,
  MdOutlineAccountBalance,
  MdOutlineSecurity,
  MdOutlineTrackChanges,
} from "react-icons/md";
import ModalComponent from "../Questions/FinancialInvestments/ModalComponent";
import ImportantQuestion from "../Questions/ImportantQuestion/ImportantQuestion";

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

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

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

      <ModalComponent
        modalObject={modalObject}
        setFlagState={setFlagState}
        flagState={flagState}
      >
        <ImportantQuestion />
      </ModalComponent>

      <Menu.Item
        key={superAdmin ? "/super/admin/dashboard" : "/user/my-clients"}
        icon={<FaTachometerAlt />}
        onClick={() =>
          nav(superAdmin ? "/super/admin/dashboard" : "/user/my-clients")
        }
        style={{ fontWeight: "600" }}
      >
        {superAdmin ? "Dashboard" : "My Clients"}
      </Menu.Item>

      {isMobile && (
        <>
          <Menu.Item
            key={superAdmin ? "/super/admin/profile" : "/user/profile"}
            onClick={() => {
              nav(superAdmin ? "/super/admin/profile" : "/user/profile");
            }}
            icon={<FiUser />}
            style={{ fontWeight: "600" }}
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
              style={{ fontWeight: "600" }}
            >
              CDF Prospects
            </Menu.Item>
          )}
          {loggedUser?.roleID?.permissions.includes("adviser") && (
            <Menu.Item
              key="/user/my-team"
              onClick={() => nav("/user/my-team")}
              icon={<FaUserTie />}
              style={{ fontWeight: "600" }}
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
          style={{ fontWeight: "600" }}
        >
          Financial Entities & Offerings
        </Menu.Item>
      )}

      {!superAdmin && (
        <>
          <SubMenu
            style={{ fontWeight: "600" }}
            key="sub1"
            icon={<RiAppsLine />}
            title="Discovery"
          >
            <SubMenu
              key="/user/personal-detail"
              icon={<MdOutlineAccountBalance style={{ color: "#36b446" }} />}
              title={
                <span
                  style={{ fontWeight: "600", color: "#36b446" }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent submenu toggle
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
                </span>
              }
            >
              <Menu.Item
                key="/user/risk-profile"
                onClick={() => {
                  setModalObject({ title: "Add Section" });
                  setFlagState(true);
                }}
                icon={<MdInbox />}
                style={{ fontWeight: "600", color: "#36b446" }}
              >
                Add Section
              </Menu.Item>
            </SubMenu>

            {selectedClientDetails?.client && (
              <>
                <Menu.Item
                  key="/user/goals-and-objectives"
                  onClick={() => nav("/user/goals-and-objectives")}
                  icon={<MdOutlineTrackChanges />}
                  style={{ fontWeight: "600", color: "#36b446" }}
                >
                  Goals and Objectives
                </Menu.Item>
                <Menu.Item
                  key="/user/risk-profile"
                  onClick={() => nav("/user/risk-profile")}
                  icon={<MdOutlineSecurity />}
                  style={{ fontWeight: "600", color: "#36b446" }}
                >
                  View Risk Profile
                </Menu.Item>
              </>
            )}
          </SubMenu>

          {loggedUser?.roleID?.permissions.includes("cashflow") &&
            selectedClientDetails?.client && (
              <SubMenu
                style={{ fontWeight: "600" }}
                key="sub2"
                icon={<FaChessKnight />}
                title="Strategy"
              >
                <Menu.Item
                  key="/user/cashflow/one-client"
                  onClick={() => nav("/user/cashflow/one-client")}
                  style={{ fontWeight: "600" }}
                  icon={<MdLocationPin />}
                >
                  Scenarios
                </Menu.Item>
                <Menu.Item
                  key="Inputs"
                  style={{ fontWeight: "600" }}
                  icon={<MdInput />}
                >
                  Inputs
                </Menu.Item>
                <Menu.Item
                  key="Cashflow"
                  style={{ fontWeight: "600" }}
                  icon={<FiDollarSign />}
                >
                  Cashflow
                </Menu.Item>
                <Menu.Item
                  key="Networth"
                  style={{ fontWeight: "600" }}
                  icon={<FiActivity />}
                >
                  Networth
                </Menu.Item>
                <Menu.Item
                  key="Charts"
                  style={{ fontWeight: "600" }}
                  icon={<FiBarChart2 />}
                >
                  Charts
                </Menu.Item>

                <Menu.Item
                  key="/user/cashflow/reports/"
                  disabled={
                    Object.keys(selectedSenario).length > 0 ? false : true
                  }
                  onClick={() => nav("/user/cashflow/reports/")}
                  style={{ fontWeight: "600" }}
                  icon={<FiFileText />}
                >
                  Reports
                </Menu.Item>
                <Menu.Item
                  key="Compare"
                  style={{ fontWeight: "600" }}
                  icon={<FiShuffle />}
                >
                  Compare
                </Menu.Item>
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
            style={{ fontWeight: "600" }}
          >
            All Subscriptions
          </Menu.Item>
          <Menu.Item
            key="/super/admin/all-advisers"
            onClick={() => nav("/super/admin/all-advisers")}
            icon={<FaUserTie />}
            style={{ fontWeight: "600" }}
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
            style={{ fontWeight: "600" }}
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
          onClick={() => {
            setDrawerVisible(!drawerVisible);
            props.setCollapsed(true);
          }}
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
