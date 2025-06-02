import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import DynamicTableRow from "../Assets/Dynamic/DynamicTableRow";
import AntTableDynamicReportTable from "../Assets/Table/AntTableDynamicReportTable";
import { FaGear } from "react-icons/fa6";
import DropDownOptions from "../Assets/DropDownOptions/DropDownOptions";
import { FaEdit } from "react-icons/fa";

const CDFclients = () => {
  const menuItems = [
    {
      action: "edit",
      label: "Edit",
      icon: <FaEdit />,
      onClick: (heading, row) => CallBack(heading, row, "Edit"),
    },
    {
      action: "markDone",
      label: "Mark Done",
      icon: <FaCircleCheck />,
      onClick: (heading, row) => CallBack(heading, row, "MarkDone"),
    },
  ];

  let columns = [
    {
      title: <div className="w-100">Name</div>,
      key: "preferredName",
      render: (text, row) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontFamily: '"Inter", sans-serif',
          }}
        >
          {row?.client?.preferredName || "--"}
          {row?.client?.relationshipStatus !== "Single" &&
            ` && ${row?.partner?.preferredName || "--"}`}
        </div>
      ),
    },
    {
      title: "Date of Birth",
      key: "DOB",
      render: (text, row) => row?.client?.dateOfBirth || "--",
    },
    {
      title: "Relationship Status",
      key: "relationshipStatus",
      render: (text, row) => row?.client?.relationshipStatus || "--",
    },
    {
      title: "Email",
      key: "email",
      render: (text, row) => row?.client?.email || "--",
    },
    {
      title: "Operation",
      key: "operation",
      render: (text, row, index) => (
        <DropDownOptions
          menuItems={menuItems}
          CallBack={(heading, row, status) => {}}
          heading={row}
          row={row} // ✅ Proper row data
        />
      ),
    },
  ];

  let data = [
    {
      client: {
        preferredName: "Usama", // From: preferredName
        dateOfBirth: "02/20/2022", // From: DOB
        email: "usamafaheemahmed80@gmail.com", // From: email
        relationshipStatus: "male", // From: relationShipStatus
      },
      partner: {
        preferredName: "Anam", // From: preferredName
      },
    },
  ];

  return (
    <Container fluid>
      <Row>
        <Col md={12} style={{ minHeight: "20vh" }}></Col>
        <Col md={12} style={{ minHeight: "80vh" }}>
          <Row className="justify-content-amount align-items-center reportSection">
            <Col md={12}>
              <AntTableDynamicReportTable
                title={"CDF Clients"}
                dataSource={data}
                columns={columns}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CDFclients;
