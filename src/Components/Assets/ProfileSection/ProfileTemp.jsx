import React from "react";
import banner from "../Adviser-Simplicity-Profile-Green-Banner.png";
import { Image } from "react-bootstrap";
import { Image as AntdImage } from "antd";
import { Button, ConfigProvider, Descriptions } from "antd";
import { FaEdit, FaPowerOff } from "react-icons/fa";
import Dynamiclist from "./Dynamiclist";
import { FiLogOut } from "react-icons/fi";
import { MdEdit } from "react-icons/md";

const ProfileTemp = () => {
  const sharedItemStyle = {
    style: { textAlign: "left" }, // style for the content cell (children)
  };

  const userItems = [
    {
      label: "First Name",
      children: "John",
      ...sharedItemStyle,
    },
    {
      label: "Last Name",
      children: "Doe",
      ...sharedItemStyle,
    },
    {
      label: "Email",
      children: "example@gmail.com",
      ...sharedItemStyle,
    },
    {
      label: "Phone Number",
      children: "+92 312 4514576",
      ...sharedItemStyle,
    },
    {
      label: "Role ID",
      children: "Adviser",
      ...sharedItemStyle,
    },
    {
      label: "Email Verified",
      children: "Pending",
      ...sharedItemStyle,
    },
    {
      label: "Last Login",
      children: "02/10/2023 12:00 PM",
      ...sharedItemStyle,
    },
    {
      label: "Subscription Name",
      children: "Full Access",
      ...sharedItemStyle,
    },
    {
      label: "Subscription Status",
      children: "Active",
      ...sharedItemStyle,
    },
    {
      label: "Subscription Ending Date",
      children: "02/10/2025",
      ...sharedItemStyle,
    },
  ];

  return (
    <div className="container-fluid profile-temp-container">
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
                  src="https://demos.creative-tim.com/muse-ant-design-dashboard/static/media/face-1.d85d07a1.jpg"
                  alt="Profile"
                  className="rounded-3 me-3"
                  width={50}
                  height={50}
                  style={{ objectFit: "cover" }}
                  preview={{ mask: null }}
                />
                <div>
                  <h5 className="mb-0">John Doe</h5>
                  <p className="mb-0 text-muted">example@gmail.com</p>
                </div>
              </div>
              <div className="d-flex gap-2">
                <Button>
                  <MdEdit /> Edit
                </Button>
                <Button type="primary" danger>
                  <FiLogOut /> Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-8">
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
        <div className="col-md-4">
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
      </div>
    </div>
  );
};

export default ProfileTemp;
