import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
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
import { defaultUrl, Loading, ProspectsCDF } from "../../Store/Store";
import {
  ConvertDate,
  GetAxios,
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  toSentenceCase,
} from "../Assets/Api/Api";
import { Field, Form, Formik } from "formik";
import {
  CreatableSelectField,
  SimpleSelectField,
} from "../Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import { MdOutlineWarningAmber } from "react-icons/md";

const CDFclients = () => {
  const DefaultUrl = useRecoilValue(defaultUrl);
  const [loading, setLoading] = useRecoilState(Loading);
  const [prospectsCDF, setProspectsCDF] = useRecoilState(ProspectsCDF);

  const [CDFData, setCDFData] = useState([]);
  const [CDFData2, setCDFData2] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState("New Prospects");
  const [showFilters, setShowFilters] = useState(false);

  const getFilteredData = (value) => {
    setSelectedSegment(value);
    switch (value) {
      case "New Prospects":
        setCDFData(
          CDFData2.filter((item) => item.status?.toLowerCase() === "pending")
        );
        break;
      case "Successful":
        setCDFData(
          CDFData2.filter((item) => item.status?.toLowerCase() === "successful")
        );
        break;
      case "Unsuccessful":
        setCDFData(
          CDFData2.filter(
            (item) => item.status?.toLowerCase() === "unsuccessful"
          )
        );
        break;
      default:
        setCDFData(CDFData2);
    }
  };

  const getMenuItems = (row) => {
    const status = row?.status?.toLowerCase();

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
        action: "Successful",
        category: status !== "pending" ? "" : "success",
        disabled: status !== "pending" && true,
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
            <FaCircleCheck /> Successful
          </div>
        ),
        onClick: (heading, row) => CallBack(heading, row, "successful"),
      },
      {
        action: "Unsuccessful",
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
            <FaCircleXmark /> Unsuccessful
          </div>
        ),
        category: status !== "pending" ? "" : "danger",
        disabled: status !== "pending" && true,
        onClick: (heading, row) => CallBack(heading, row, "unsuccessful"),
      },
    ];

    return menuItems;
  };

  let columns = [
    {
      title: "#",
      key: "index",
      render: (text, row, index) => index + 1 || "--",
    },
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
          {row?.client?.relationshipStatus.toLowerCase() == "couple" &&
            row?.partner?.preferredName !== "" &&
            ` & ${row?.partner?.preferredName || "--"}`}{" "}
          <FaInfoCircle
            onClick={() => {
              OpenModel(text, row, index);
            }}
          />
        </div>
      ),
    },
    // {
    //   title: "Date of Birth",
    //   key: "DOB",
    //   render: (text, row) => ConvertDate(row?.client?.dateOfBirth) || "--",
    // },
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
          successful: {
            color: "green",
            text: "Successful",
            icon: <FaCircleCheck />,
          },
          unsuccessful: {
            color: "red",
            text: "Unsuccessful",
            icon: <FaCircleXmark />,
          },
          default: {
            color: "lightgray",
            text: "unspesified",
            icon: <MdOutlineWarningAmber />,
          },
        };

        const tag = statusMap[status] || statusMap["default"];

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
          menuItems={getMenuItems(row)}
          CallBack={OpenModel}
          heading={row}
          row={row} // ✅ Proper row data
        />
      ),
    },
  ];

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  const OpenModel = (text, row, action) => {
    const isPending = row.status === "pending";

    const actionsMap = {
      View: () => {
        setModalObject({ title: "CDF View Details", row });
        setFlagState(true);
      },
      Successful: () => {
        if (isPending) statusChange("successful", row);
      },
      Unsuccessful: () => {
        if (isPending) statusChange("unsuccessful", row);
      },
      default: () => {
        setModalObject({ title: "CDF Details", row });
        setFlagState(true);
      },
    };

    const executeAction = actionsMap[action] || actionsMap.default;
    executeAction();
  };

  let apiFetch = true;

  useEffect(() => {
    if (apiFetch) {
      if (prospectsCDF.length > 0) {
        setCDFData(
          prospectsCDF.filter(
            (item) => item.status?.toLowerCase() === "pending"
          )
        );
        setCDFData2(prospectsCDF);
        setSelectedSegment("New Prospects");
        apiFetch = false;
        // setApiFetch(false);
      } else {
      }
    }
  }, [apiFetch, prospectsCDF]);

  let statusChange = async (status, row) => {
    try {
      setLoading(true);

      let data = {
        ...row,
        status,
      };

      let responce = await PatchAxios(`${DefaultUrl}/api/CDF/Update`, data);
      // console.log(responce);
      if (responce) {
        setCDFData((prev) =>
          prev.map((item) => (item._id === row._id ? data : item))
        );

        const notifications = {
          successful: {
            head: "Client marked as Successful",
            note: "You can now find this client in Adviser Simplicity's Discovery Form.",
          },
          unsuccessful: {
            head: "Client marked as Unsuccessful",
            note: "The client is now marked as unsuccessful until they submit their data again.",
          },
        };

        const defaultNotification = {
          head: "Client Status Updated",
          note: "The status of the client has been updated successfully.",
        };

        // Ensure a valid notification exists
        const { head, note } = notifications[status] || defaultNotification;

        openNotificationSuccess("success", "topRight", head, note);
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
    <div className="contianer-fluid">
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
      <div className="d-flex justify-content-center">
        <div className="col-md-11 mt-3">
          <Card className="custom_Shadow p-3 mt-3">
            <Row className="justify-content-center align-items-center reportSection ">
              <Col md={6}>
                <Segmented
                  options={[
                    "New Prospects",
                    "Successful",
                    "Unsuccessful",
                    "All",
                  ]}
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
                <div>
                  <AntTableDynamicReportTable
                    title={`CDF Prospects - ${selectedSegment}`}
                    dataSource={CDFData}
                    columns={columns}
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    pagination={true}
                    customPagination={{
                      pageSize: 20,
                      position: ["bottomRight"],
                      className: "custom-pagination",
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CDFclients;
