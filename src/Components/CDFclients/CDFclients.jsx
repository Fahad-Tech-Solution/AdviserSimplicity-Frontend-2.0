import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DynamicTableRow from "../Assets/Dynamic/DynamicTableRow";
import AntTableDynamicReportTable from "../Assets/Table/AntTableDynamicReportTable";
import { FaCircleCheck, FaCircleXmark, FaGear } from "react-icons/fa6";
import DropDownOptions from "../Assets/DropDownOptions/DropDownOptions";
import { FaClock, FaEdit, FaInfoCircle, FaRegFileAlt } from "react-icons/fa";
import ModalComponent from "../Questions/FinancialInvestments/ModalComponent";
import CDFForm from "./CDFForm";
import { Segmented, Tag } from "antd";
import { icon } from "@fortawesome/fontawesome-svg-core";
import CDFViewForm from "./CDFViewForm";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, Loading } from "../../Store/Store";
import {
  ConvertDate,
  GetAxios,
  openNotificationSuccess,
  toSentenceCase,
} from "../Assets/Api/Api";
import { Field, Form, Formik } from "formik";
import {
  CreatableSelectField,
  SimpleSelectField,
} from "../Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";

const CDFclients = () => {
  const DefaultUrl = useRecoilValue(defaultUrl);
  const [loading, setLoading] = useRecoilState(Loading);
  const [CDFData, setCDFData] = useState([]);
  const [CDFData2, setCDFData2] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const getFilteredData = (value) => {
    setSelectedSegment(value);
    switch (value) {
      case "New Clients":
        setCDFData(
          CDFData2.filter((item) => item.status?.toLowerCase() === "pending")
        );
        break;
      case "Approved":
        setCDFData(
          CDFData2.filter((item) => item.status?.toLowerCase() === "complete")
        );
        break;
      case "Canceled":
        setCDFData(
          CDFData2.filter((item) => item.status?.toLowerCase() === "canceled")
        );
        break;
      default:
        setCDFData(CDFData2);
    }
  };

  const menuItems = [
    {
      action: "View",
      category: "",
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginLeft: 13,
          }}
          className="fw-bold"
        >
          <FaRegFileAlt /> View
        </div>
      ),
      onClick: (heading, row) => CallBack(heading, row, "View"),
    },
    {
      action: "Approved",
      category: "success",
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginLeft: 13,
          }}
          className="fw-bold"
        >
          <FaCircleCheck /> Approved
        </div>
      ),
      onClick: (heading, row) => CallBack(heading, row, "Approved"),
    },
    {
      action: "Rejected",
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginLeft: 13,
          }}
          className="fw-bold"
        >
          <FaCircleXmark /> Rejected
        </div>
      ),
      category: "danger",
      onClick: (heading, row) => CallBack(heading, row, "Rejected"),
    },
  ];

  let columns = [
    {
      title: <div className="w-100">Name</div>,
      key: "preferredName",
      fixed: "left",
      render: (text, row, index) => (
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
          {row?.client?.relationshipStatus.toLowerCase() !== "single" &&
            ` & ${row?.partner?.preferredName || "--"}`}{" "}
          <FaInfoCircle
            onClick={() => {
              OpenModel(text, row, index);
            }}
          />
        </div>
      ),
    },
    {
      title: "Date of Birth",
      key: "DOB",
      render: (text, row) => ConvertDate(row?.client?.dateOfBirth) || "--",
    },
    {
      title: "Phone Number",
      key: "phoneNumber",
      render: (text, row) => row?.client?.phoneNumber || "--",
    },
    {
      title: "Relationship Status",
      key: "relationshipStatus",
      render: (text, row) =>
        toSentenceCase(row?.client?.relationshipStatus) || "--",
    },
    {
      title: "Email",
      key: "email",
      render: (text, row) => row?.client?.email || "--",
    },
    {
      title: "Status",
      attribute: "status",
      render: (row) => {
        const status = row.status?.toLowerCase() || "pending";

        const statusMap = {
          pending: {
            color: "orange",
            text: "Pending",
            icon: <FaClock />,
          },
          complete: {
            color: "green",
            text: "Approved",
            icon: <FaCircleCheck />,
          },
          canceled: {
            color: "red",
            text: "Canceled",
            icon: <FaCircleXmark />,
          },
        };

        const tag = statusMap[status] || statusMap["pending"];

        return (
          <Tag
            color={tag.color}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {tag.icon} {tag.text}
          </Tag>
        );
      },
    },
    {
      title: "Operation",
      key: "operation",
      render: (text, row, index) => (
        <DropDownOptions
          menuItems={menuItems}
          CallBack={OpenModel}
          heading={row}
          row={row} // ✅ Proper row data
        />
      ),
    },
  ];

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  var OpenModel = (text, row, index) => {
    if (index === "View") {
      setModalObject({
        title: "CDF View Details",
        row,
      });
    } else {
      setModalObject({
        title: "CDF Details",
        row,
      });
    }

    setFlagState(true);
  };

  let apiFetch = true;

  useEffect(() => {
    if (apiFetch) {
      fetchData();
      apiFetch = false;
      // setApiFetch(false);
    }
  }, [apiFetch]);

  let fetchData = async () => {
    try {
      setLoading(true);
      console.log(`${DefaultUrl}/api/CDF/`);
      let responce = await GetAxios(`${DefaultUrl}/api/CDF/`);
      console.log(responce);
      if (responce && responce.length > 0) {
        setCDFData(responce);
        setCDFData2(responce);
        openNotificationSuccess(
          "success",
          "topRight",
          "Data Refreshed",
          "The data has been updated and you're now viewing the latest information."
        );
      }
    } catch (err) {
      console.error("Report Error", err);
      openNotificationSuccess(
        "error",
        "topRight",
        "Report Failed",
        "Something went wrong. Please try later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <ModalComponent
        modalObject={modalObject}
        setFlagState={setFlagState}
        flagState={flagState}
      >
        {modalObject.title === "CDF Details" ? (
          <CDFForm />
        ) : modalObject.title === "CDF View Details" ? (
          <CDFViewForm />
        ) : (
          ""
        )}
      </ModalComponent>
      <Row>
        <Col md={12} style={{ minHeight: "20vh" }}></Col>
        <Col md={12} style={{ minHeight: "80vh" }}>
          <Row className="justify-content-amount align-items-center reportSection">
            <Col md={6}>
              {/* <h6 className="fw-bold mb-2">Filter by Status</h6> */}
              <Segmented
                options={["All", "New Clients", "Approved", "Canceled"]}
                value={selectedSegment}
                onChange={getFilteredData}
              />
            </Col>
            <Col md={3}></Col>
            <Col md={3}>
              {showFilters && (
                <Formik
                  initialValues={{}}
                  onSubmit={() => {}}
                  enableReinitialize
                >
                  {({ values, setFieldValue, handleChange, handleBlur }) => (
                    <Form>
                      <Field
                        name={`Name`}
                        component={SimpleSelectField}
                        label="Multi Select Field"
                        options={[
                          ...CDFData2.map((item, index) => {
                            return {
                              value: item.client.preferredName,
                              label: item.client.preferredName,
                            };
                          }),
                        ]}
                        onChange={(selected) => {
                          // console.log("Selected:", selected);

                          if (selected?.value) {
                            const filtered = CDFData2.filter(
                              (item) =>
                                item.client.preferredName === selected.value
                            );
                            setCDFData(filtered);
                          } else {
                            setCDFData(CDFData2);
                          }
                        }}
                      />
                    </Form>
                  )}
                </Formik>
              )}
            </Col>
            <Col md={12}>
              <AntTableDynamicReportTable
                title={`CDF Clients - ${selectedSegment}`}
                dataSource={CDFData}
                columns={columns}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                pagination={true}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CDFclients;
