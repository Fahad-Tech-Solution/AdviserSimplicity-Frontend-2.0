import React, { useEffect, useState } from "react";
import { Button, Drawer, Menu } from "antd";

import { RiAppsLine, RiExchange2Line, RiMenuFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import AdviserS1 from "../Assets/Adviser-Simpilicity1.png";
import AdviserSmini from "../Assets/Adviser-Simpilicity-mini.png";
import {
  CRState,
  OptionRender,
  PersonalDetailsData,
  QuestionDetail,
  SelectedClientDetails,
  SelectedSenario,
  StepsStatus,
} from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaTachometerAlt } from "react-icons/fa";

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
      <Menu.Item key="/" icon={<FaTachometerAlt />} onClick={() => nav("/")}>
        Dashboard
      </Menu.Item>

      <Menu.Item
        key="/CDF_Clients"
        icon={<FaPeopleGroup />}
        onClick={() => nav("/CDF_Clients")}
      >
        CDF Clients
      </Menu.Item>

      <SubMenu key="sub1" icon={<RiAppsLine />} title="Discovery">
        <Menu.Item key="/All-Clients" onClick={() => nav("/All-Clients")}>
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
            <Menu.Item key="/Reports" disabled={Object.keys(selectedSenario).length>0?false:true}
             onClick={() => nav("/Reports")}>
              Reports
            </Menu.Item>
          </SubMenu>
        )}
      </SubMenu>
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
        <div
          className="AdminSideBar"
          style={{
            width: props.collapsed ? "80px" : "250px",
            height: "100%",
            transition: "width 0.3s",
          }}
        >
          <Menu
            mode="inline"
            inlineCollapsed={props.collapsed}
            selectedKeys={[location.pathname]}
            style={{
              position: "fixed",
              width: props.collapsed ? "80px" : "250px",
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
