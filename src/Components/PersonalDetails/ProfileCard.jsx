import React, { useState } from "react";
import { Card, Image, ListGroup } from "react-bootstrap";
import {
  AiOutlineCalendar,
  AiOutlinePhone,
  AiOutlineMail,
} from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import dayjs from "dayjs";

import defaultAvatar from "../Questions/svgs/avatar-boy-(1).png";
import { FaCamera } from "react-icons/fa";
import { List } from "antd";
import ModalComponent from "../Questions/FinancialInvestments/ModalComponent";
import ProfileEdit from "./ProfileEdit";
import { RenderName } from "../Assets/Api/Api";
import { PersonalDetailsData } from "../../Store/Store";
import { useRecoilState } from "recoil";

const ProfileCard = ({ owner = "client", Data }) => {
  if (!Data) return null;

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});
  const [personalDetailObj, setPersonalDetailObj] =
    useRecoilState(PersonalDetailsData);
  // destructure Formik values
  const {
    title,
    firstName,
    middleName,
    lastName,
    preferred,
    dob,
    age,
    image,
    contact,
  } = Data;

  // Build full name
  const fullName = [title, firstName, middleName, lastName]
    .filter(Boolean)
    .join(" ");

  // DOB formatting
  const dobFormatted = dob
    ? dayjs(dob, ["DD/MM/YYYY", "YYYY-MM-DD"]).format("DD/MM/YYYY")
    : "N/A";

  // Avatar (later you can decide separate default boy/girl avatar based on gender)
  const avatarSrc = personalDetailObj[owner]?.image?.url || defaultAvatar;

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
      <ModalComponent
        modalObject={modalObject}
        setFlagState={setFlagState}
        flagState={flagState}
      >
        <ProfileEdit />
      </ModalComponent>
      <Card.Body>
        <div
          className="d-flex justify-content-center mb-3"
          style={{ position: "relative" }}
        >
          <Image
            src={avatarSrc}
            alt={`${owner} profile`}
            roundedCircle
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />

          {/* Camera icon overlay */}
          <div className="ProfilePicButton" role="button" onClick={OpenModal}>
            <FaCamera color="#36b446" />
          </div>
        </div>

        <Card.Title className="text-center mb-1">{fullName}</Card.Title>
        <Card.Subtitle
          className="text-center text-muted mb-3"
          style={{ fontSize: "0.9rem" }}
        >
          ({preferred || "No Nickname"})
        </Card.Subtitle>

        <List
          itemLayout="horizontal"
          dataSource={[
            {
              icon: <AiOutlineCalendar color="#36b446" size={20} />,
              text: `${dobFormatted} (${age || "N/A"})`,
            },
            {
              icon: <AiOutlinePhone color="#36b446" size={20} />,
              text: contact?.mobile || "N/A",
            },
            {
              icon: <AiOutlineMail color="#36b446" size={20} />,
              text: contact?.email || "N/A",
            },
            {
              icon: <FiMapPin color="#36b446" size={20} />,
              text: `${contact?.homeAddress || "N/A"} ${
                contact?.postcodeSuburb ? `(${contact.postcodeSuburb})` : ""
              }`,
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

export default ProfileCard;
