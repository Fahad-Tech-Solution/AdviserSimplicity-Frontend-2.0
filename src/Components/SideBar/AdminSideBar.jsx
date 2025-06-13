import React, { useState } from "react";
import { Button, Menu } from "antd";
import {
  MdMailOutline,
  MdOutlineControlCamera,
  MdOutlineDesktopWindows,
  MdPieChartOutlined,
} from "react-icons/md";
import {
  RiAppsLine,
  RiMenu2Fill,
  RiMenuFill,
  RiExchange2Line,
} from "react-icons/ri";
import AdviserS1 from "../Assets/Adviser-Simpilicity1.png";
import AdviserSmini from "../Assets/Adviser-Simpilicity-mini.png";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUserAlt } from "react-icons/fa";
import { FaCircleUser, FaPeopleGroup } from "react-icons/fa6";
import { CRState, OptionRender, StepsStatus } from "../../Store/Store";
import { useRecoilState } from "recoil";

const { SubMenu } = Menu;

const AdminSideBar = (props) => {
  let [CRStateObj, setCRState] = useRecoilState(CRState); // eslint-disable-line no-unused-vars
  let [stepsStatus, setStepsStatus] = useRecoilState(StepsStatus); // eslint-disable-line no-unused-vars
  let [optRender, setOptRender] = useRecoilState(OptionRender); // eslint-disable-line no-unused-vars

  const sidebarWidth = props.collapsed ? "80px" : "250px"; // Change these values as needed

  let nav = useNavigate();
  let location = useLocation();

  return (
    <div
      className="AdminSideBar"
      style={{
        width: sidebarWidth, // Apply dynamic width based on collapsed state
        height: "100%",
        transition: "width 0.3s", // Smooth transition for width change
      }}
    >
      <Menu
        mode="inline"
        inlineCollapsed={props.collapsed}
        selectedKeys={[location.pathname]}
      >
        {/* Custom Option 1 */}
        <Menu.Item
          disabled
          className="customeSideHead"
          key="1"
          style={{ height: "5rem" }}
          title={props.collapsed ? "Logo" : null} // Disable tooltip when not collapsed
        >
          {props.collapsed ? (
            <div
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
              <h5 role="button" className="">
                <img src={AdviserSmini} alt="Logo" width={"50px"} />
              </h5>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onClick={() => {
                props.setCollapsed(!props.collapsed);
              }}
            >
              <h5 role="button">
                <img src={AdviserS1} alt="Logo" width={"170px"} />
              </h5>
            </div>
          )}
        </Menu.Item>

        <Menu.Item
          key="/"
          icon={<FaTachometerAlt />}
          onClick={() => {
            nav("/");
          }}
        >
          Dashboard
        </Menu.Item>

        <Menu.Item
          key="/CDF_Clients"
          icon={<FaPeopleGroup />}
          onClick={() => {
            nav("/CDF_Clients");
          }}
        >
          CDF Clients
        </Menu.Item>

        <SubMenu key="sub1" icon={<RiAppsLine />} title="Discovery">
          <Menu.Item
            key="/All-Clients"
            onClick={() => {
              nav("/All-Clients");
            }}
          >
            Financial Details
          </Menu.Item>
          <Menu.Item
            key="/Goals-And-Objectives"
            onClick={() => {
              nav("/Goals-And-Objectives");
            }}
          >
            Goals and Objectives
          </Menu.Item>
          <Menu.Item
            key="/Risk-Profile"
            onClick={() => {
              nav("/Risk-Profile");
            }}
          >
            Risk Profile
          </Menu.Item>
          <Menu.Item
            key="/PersonalDetail"
            onClick={() => {
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
            }}
          >
            Add Client
          </Menu.Item>
        </SubMenu>

        <SubMenu key="sub2" icon={<RiExchange2Line />} title="Navigation Two">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <SubMenu className="subSubMenu" key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default AdminSideBar;
