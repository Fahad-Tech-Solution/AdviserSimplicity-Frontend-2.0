import React, { useState } from "react";
import banner from "../Adviser-Simplicity-Profile-Green-Banner.png";
import { Image } from "react-bootstrap";
import { Image as AntdImage, Input, message, Tooltip } from "antd";
import { Button, ConfigProvider, Descriptions } from "antd";
import { FaCopy, FaEdit, FaPowerOff, FaRegCopy } from "react-icons/fa";
import Dynamiclist from "./Dynamiclist";
import { FiLogOut } from "react-icons/fi";
import { MdEdit, MdOutlineInfo } from "react-icons/md";
import { useRecoilState } from "recoil";
import { LoggedInUserData, LoggedInUserTokenJwt } from "../../../Store/Store";
import { useNavigate } from "react-router-dom";
import { toSentenceCase } from "../Api/Api";
import ModalComponent from "../../Questions/FinancialInvestments/ModalComponent";
import AdviserFrom from "../../SuperAdminComponent/AdviserFrom";
import { IoSearchOutline } from "react-icons/io5";
import asanaLogo from "../../Questions/svgs/brand-asana-svgrepo-com.svg";
import ClientPATIDForm from "../Asana/ClientPATIDForm";

const ProfileTemp = () => {
  const sharedItemStyle = {
    style: { textAlign: "left" }, // style for the content cell (children)
  };
  let Nev = useNavigate();
  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let [loggedInUserData, setLoggedInUserData] =
    useRecoilState(LoggedInUserData);

  let [loggedInUserTokken, setLoggedInUserTokken] =
    useRecoilState(LoggedInUserTokenJwt);

  let superAdminRole =
    loggedInUserData?.roleID?.permissions.includes("superAdmin") || false;

  const userItems = [
    {
      label: "First Name",
      children: toSentenceCase(loggedInUserData?.firstName) || "Guest",
      ...sharedItemStyle,
    },
    {
      label: "Last Name",
      children: toSentenceCase(loggedInUserData?.lastName) || " ",
      ...sharedItemStyle,
    },
    {
      label: "Email",
      children: loggedInUserData?.email || "guest@gmail.com",
      ...sharedItemStyle,
    },
    {
      label: "Phone Number",
      children: loggedInUserData?.phoneNumber || "xxx-xxx-xxxx",
      ...sharedItemStyle,
    },
    {
      label: "Company Name",
      children: loggedInUserData?.companyName || "--",
      ...sharedItemStyle,
    },
    {
      label: "Licensee Name",
      children: loggedInUserData?.LicenseeName || "--",
      ...sharedItemStyle,
    },
    {
      label: "Company Address",
      children: loggedInUserData?.companyAddress || "--",
      ...sharedItemStyle,
    },
    {
      label: "AFS Name",
      children: loggedInUserData?.AFSName || "--",
      ...sharedItemStyle,
    },
    {
      label: "Role ID",
      children: loggedInUserData?.roleID?.name || "Adviser",
      ...sharedItemStyle,
    },
    {
      label: "Subscription Name",
      children: "Full Access",
      ...sharedItemStyle,
    },
    {
      label: "Subscription Days Left",
      children: loggedInUserData?.subscription?.daysLeft || "--",
      ...sharedItemStyle,
    },
  ];

  let logoutFun = () => {
    setLoggedInUserTokken("");
    setLoggedInUserData({});
    Nev("/");
  };

  let UpdateUser = () => {
    let userData = JSON.parse(JSON.stringify(loggedInUserData));
    console.log(userData);
    setFlagState(true);
    setModalObject({
      title: "Edit User",
      type: "newAdviser",
      Action: "edit",
      row: userData,
    });
  };

  let OpenModal = () => {
    setFlagState(true);
    setModalObject({
      title: "Connect your Asana",
      type: "asana",
      Action: "view",
      row: {},
      noFooter: true,
    });
  };

  return (
    <div className="container-fluid profile-temp-container mt-3">
      <ModalComponent
        modalObject={modalObject}
        setFlagState={setFlagState}
        flagState={flagState}
      >
        {modalObject.type === "newAdviser" ? (
          <AdviserFrom />
        ) : (
          <ClientPATIDForm />
        )}
      </ModalComponent>

      <div className="row justify-content-center ">
        <div className="col-md-12">
          <div
            className="shadow mt-3 mt-md-0"
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              height: "200px",
            }}
          >
            <Image src={banner} fluid width={"100%"} />
          </div>
        </div>
        <div className="col-md-11">
          <div className="shadow d-flex flex-wrap-reverse align-items-center justify-content-center profile-card">
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between w-100 gap-2 px-3 ">
              <div className="d-flex align-items-center gap-3">
                <AntdImage
                  src="https://i.pinimg.com/736x/c7/9a/37/c79a37e13ef14be556b51143bcbb1b01.jpg"
                  alt="Profile"
                  className="rounded-3 me-3"
                  width={50}
                  height={50}
                  style={{ objectFit: "cover" }}
                  preview={{ mask: null }}
                />
                <div>
                  <h5 className="mb-0">
                    {loggedInUserData &&
                    typeof loggedInUserData === "object" &&
                    Object.keys(loggedInUserData).length > 0
                      ? `${toSentenceCase(
                          loggedInUserData.firstName || ""
                        )} ${toSentenceCase(
                          loggedInUserData.lastName || ""
                        )}`.trim()
                      : "Guest"}
                  </h5>
                  <p className="mb-0 text-muted">
                    {loggedInUserData &&
                    typeof loggedInUserData === "object" &&
                    Object.keys(loggedInUserData).length > 0
                      ? `${loggedInUserData.email || ""}`.trim()
                      : "email@gamil.com"}
                  </p>
                  <p className="mb-0 text-muted">
                    <Tooltip title="Copy link">
                      <Button
                        color="default"
                        className="p-0 CustomLink "
                        variant="link"
                        onClick={() => {
                          // window.navigator.clipboard.writeText(`https://cdf.denarowealth.com.au/?referralId=${loggedInUserData?.referralID || "--"}`);
                          window.navigator.clipboard.writeText(
                            `https://cdf.denarowealth.com.au/?referralId=${
                              loggedInUserData?.referralID || "--"
                            }`
                          );
                          message.success("Link copied!");
                        }}
                      >
                        https://cdf.denarowealth.com.au/?referralId=
                        {loggedInUserData &&
                        typeof loggedInUserData === "object" &&
                        Object.keys(loggedInUserData).length > 0
                          ? `${loggedInUserData?.referralID || "--"}`.trim()
                          : "--"}
                      </Button>
                    </Tooltip>
                  </p>
                </div>
              </div>
              <div className="d-flex gap-2">
                <Button disabled={superAdminRole || false} onClick={UpdateUser}>
                  <MdEdit /> Edit
                </Button>
                <Button type="primary" danger onClick={logoutFun}>
                  <FiLogOut /> Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className={!superAdminRole ? "col-md-8" : "col-md-12"}>
          <div className="shadow p-3 rounded-3 mb-5">
            <ConfigProvider
              theme={{
                components: {
                  Descriptions: {
                    labelBg: "#36b446", // Background color for labels
                  },
                },
              }}
            >
              <Descriptions
                title="User Info"
                layout="vertical"
                bordered
                items={userItems}
                styles={{
                  label: {
                    color: "#ffff",
                    // fontWeight: "bold",
                  },
                  content: {
                    // color: "#333",
                    // fontWeight: "bold",
                  },
                }}
              />
            </ConfigProvider>
          </div>
        </div>
        {!superAdminRole && (
          <div className="col-md-4">
            <div className="shadow p-3 rounded-3 mb-5">
              <h6 className="mb-3">
                <span>
                  <AntdImage
                    src={asanaLogo}
                    alt="Asana logo"
                    className="rounded-3 me-3"
                    width={15}
                    height={15}
                    style={{ objectFit: "cover" }}
                    preview={{ mask: null }}
                  />{" "}
                </span>{" "}
                Connect your Asana.{" "}
                <span>
                  <Tooltip title="Your Asana token is securely encrypted. If you wish to update it, click the magnifying glass icon.">
                    <MdOutlineInfo />
                  </Tooltip>
                </span>{" "}
              </h6>

              {/* This div wraps your list and becomes the scrollable container */}
              <Input.Group compact className="d-flex flex-row ">
                <Input placeholder="Asana increpted PAT..." disabled />
                <Button icon={<IoSearchOutline />} onClick={OpenModal}></Button>
              </Input.Group>
            </div>
            <div
              className="shadow p-3 rounded-3 mb-5"
              style={{ height: "430px" }}
            >
              <h5 className="mb-3">Your Connections</h5>

              {/* This div wraps your list and becomes the scrollable container */}
              <div
                id="connectionsScrollContainer"
                style={{
                  height: "calc(100% - 40px)", // subtract header height
                  overflow: "auto",
                  borderRadius: "8px",
                }}
              >
                <Dynamiclist scrollTarget="connectionsScrollContainer" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileTemp;
