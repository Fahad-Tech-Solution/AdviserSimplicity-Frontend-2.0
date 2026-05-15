import React, { useState } from "react";
import { Card, Image, ListGroup } from "react-bootstrap";
import {
  AiOutlineCalendar,
  AiOutlinePhone,
  AiOutlineMail,
} from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import dayjs from "dayjs";

import defaultAvatar from "../../../Components/Questions/svgs/avatar-boy-(1).png";
import { List } from "antd";
import { useRecoilState } from "recoil";
import { RenderName } from "../../../Components/Assets/Api/Api";
import { PersonalDetailsData } from "../../../Store/Store";

import { IoFemale, IoMale } from "react-icons/io5";

const ProfileCard_cashFlow = ({ owner = "client", Data }) => {
  if (!Data) return null;

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});
  const [personalDetailObj, setPersonalDetailObj] =
    useRecoilState(PersonalDetailsData);
  // destructure Formik values
  const { name, DOB, age, image, email, gender, maritalStatus } = Data;

  // DOB formatting
  const dobFormatted = DOB
    ? dayjs(DOB, ["DD/MM/YYYY", "YYYY-MM-DD"]).format("DD/MM/YYYY")
    : "N/A";

  // Avatar (later you can decide separate default boy/girl avatar based on gender)

  let OpenModal = () => {
    setModalObject({
      title: "Profile Pic " + RenderName(owner),
      Data,
      key: "profile Pic",
      owner,
    });
    setFlagState(true);
  };

  return (
    <Card
      className="shadow-sm h-100"
      style={{ borderRadius: "12px", fontFamily: "Inter, sans-serif" }}
    >
      <Card.Body>
        <div
          className="d-flex justify-content-center mb-3"
          style={{ position: "relative" }}
        >
          <Image
            src={image || defaultAvatar}
            alt={`${owner} profile`}
            roundedCircle
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
        </div>

        <Card.Title className="text-center mb-1">{name}</Card.Title>
        <Card.Subtitle
          className="text-center text-muted mb-3 mt-1"
          style={{ fontSize: "0.9rem" }}
        >
          ({maritalStatus || "No Nickname"})
        </Card.Subtitle>

        <List
          itemLayout="horizontal"
          dataSource={[
            {
              icon: <AiOutlineCalendar color="#36b446" size={20} />,
              text: `${dobFormatted} (${age || "N/A"})`,
            },
            {
              icon: <AiOutlineMail color="#36b446" size={20} />,
              text: email || "N/A",
            },
            {
              icon:
                gender == "Female" ? (
                  <IoFemale color="#36b446" size={20} />
                ) : (
                  <IoMale color="#36b446" size={20} />
                ),
              text: gender || "N/A",
            },
          ]}
          renderItem={(item) => (
            <List.Item style={{ border: "none", padding: "8px 0" }}>
              <div className="d-flex align-items-center">
                <span className="me-2">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            </List.Item>
          )}
        />
      </Card.Body>
    </Card>
  );
};

export default ProfileCard_cashFlow;
