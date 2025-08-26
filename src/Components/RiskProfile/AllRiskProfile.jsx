import { useEffect, useState } from "react";
import ModalComponent from "../Questions/FinancialInvestments/ModalComponent";
import { Card, Col, Row } from "react-bootstrap";
import { FaCircleCheck, FaCircleXmark, FaGear } from "react-icons/fa6";
import AntTableDynamicReportTable from "../Assets/Table/AntTableDynamicReportTable";
import DropDownOptions from "../Assets/DropDownOptions/DropDownOptions";

import { FaClock, FaEdit, FaInfoCircle, FaRegFileAlt } from "react-icons/fa";
import { Button, Segmented, Tag } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";

import { Field, Form, Formik } from "formik";
import { SimpleSelectField } from "../Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import { MdOutlineWarningAmber } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";
import {
  defaultUrl,
  Loading,
  QuestionDetail,
  StepsStatus,
} from "../../Store/Store";
import {
  ConvertDate,
  GetAxios,
  PatchAxios,
  toSentenceCase,
} from "../Assets/Api/Api";
import RiskProfileViewForm from "./RiskProfileViewForm";

const AllRiskProfile = () => {
  const DefaultUrl = useRecoilValue(defaultUrl);
  const [loading, setLoading] = useRecoilState(Loading);
  const [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);
  const [stepsStatus, setStepsStatus] = useRecoilState(StepsStatus);

  const [RiskProfileData, setRiskProfileData] = useState([]);
  const [RiskProfileData2, setRiskProfileData2] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState("New Risk Profiles");
  const [showFilters, setShowFilters] = useState(false);

  let nav = useNavigate();

  const getFilteredData = (value) => {
    setSelectedSegment(value);
    switch (value) {
      case "New Risk Profiles":
        setRiskProfileData(
          RiskProfileData2.filter(
            (item) => item.status?.toLowerCase() === "pending"
          )
        );
        break;
      case "Successful":
        setRiskProfileData(
          RiskProfileData2.filter(
            (item) => item.status?.toLowerCase() === "successful"
          )
        );
        break;
      case "Unsuccessful":
        setRiskProfileData(
          RiskProfileData2.filter(
            (item) => item.status?.toLowerCase() === "unsuccessful"
          )
        );
        break;
      default:
        setRiskProfileData(RiskProfileData2);
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
          {row?.clientFK?.client?.clientGivenName || "--"}
        </div>
      ),
    },
    {
      title: "Joined Profile",
      key: "relationshipStatus",
      render: (text, row) => row?.joinedProfile || "--",
    },
    {
      title: "Email",
      key: "email",
      render: (text, row) => row?.clientFK?.client?.Email || "--",
    },
    {
      title: "Last updated at",
      key: "updatedAt",
      render: (text, row) =>
        row?.updatedAt ? ConvertDate(row?.updatedAt) : "--",
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
          row={row}
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
        setModalObject({ title: "Risk Profile View Details", row });
        setFlagState(true);
      },
      Successful: () => {
        if (isPending) statusChange("successful", row);
      },
      Unsuccessful: () => {
        if (isPending) statusChange("unsuccessful", row);
      },
      Edit: () => {
        if (row.status === "successful") {
          localStorage.setItem("UserID", row.client_FK);
          localStorage.setItem("selected client", JSON.stringify([row.key]));
          localStorage.setItem("Email", row.client.Email);
          setQuestionDetail({});
          setStepsStatus(false);
          nav("/PersonalDetail#" + row.client_FK);
        }
      },
      default: () => {
        // setModalObject({ title: "Risk Profile Details", row });
        // setFlagState(true);
      },
    };

    const executeAction = actionsMap[action] || actionsMap.default;
    executeAction();
  };

  let [apiFetch, setApiFetch] = useState(true);

  useEffect(() => {
    if (apiFetch) {
      console.log("Fetching Risk Profile Data");
      fetchRiskProfileData();
    }
  }, [apiFetch]);

  const fetchRiskProfileData = async () => {
    try {
      setLoading(true);
      let res = await GetAxios(`${DefaultUrl}/api/riskProfile/getAll`);
      console.log(res, "Risk Profile Data");
      if (res && res.length > 0) {
        setRiskProfileData(
          res
            .reverse()
            .filter((item) => item.status?.toLowerCase() === "pending")
        );
        setRiskProfileData2(res);
        setSelectedSegment("New Risk Profiles");
        setApiFetch(!apiFetch); // Toggle apiFetch to prevent infinite loop
      }
    } catch (error) {
      console.log("Error message:", error);
    } finally {
      setLoading(false);
    }
  };

  let statusChange = async (status, row) => {
    try {
      setLoading(true);

      let data = {
        ...row,
        status,
      };

      let responce = await PatchAxios(
        `${DefaultUrl}/api/riskProfile/updateStatus`,
        data
      );
      console.log(responce);
      if (responce) {
        setRiskProfileData((prev) =>
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
        {modalObject.title === "Risk Profile View Details" ? (
          <RiskProfileViewForm />
        ) : (
          ""
        )}
      </ModalComponent>
      <div className="d-flex justify-content-center">
        <div className="col-md-11 mt-3">
          <Card className="custom_Shadow p-3 mt-3">
            <Row className="justify-content-between align-items-center reportSection ">
              <Col md={6}>
                <Segmented
                  options={[
                    "New Risk Profiles",
                    "Successful",
                    "Unsuccessful",
                    "All",
                  ]}
                  value={selectedSegment}
                  onChange={getFilteredData}
                />
              </Col>

              <Col md={3} className="">
                <div className="d-flex justify-content-end gap-3 align-items-center">
                  <Button
                    onClick={() => {
                      setApiFetch(!apiFetch); // Toggle apiFetch to trigger useEffect
                    }}
                    className="m-0"
                  >
                    <AiOutlineReload />
                  </Button>
                  {showFilters && (
                    <div className="w-75">
                      <Formik
                        initialValues={{}}
                        onSubmit={() => {}}
                        enableReinitialize
                      >
                        {({
                          values,
                          setFieldValue,
                          handleChange,
                          handleBlur,
                        }) => (
                          <Form className="w-100">
                            <Field
                              name={`Name`}
                              component={SimpleSelectField}
                              label="Multi Select Field"
                              options={[
                                ...RiskProfileData2.map((item, index) => {
                                  return {
                                    value:
                                      item.clientFK?.client?.clientGivenName,
                                    label:
                                      item.clientFK?.client?.clientGivenName,
                                  };
                                }),
                              ]}
                              onChange={(selected) => {
                                if (selected?.value) {
                                  const filtered = RiskProfileData2.filter(
                                    (item) =>
                                      item.client.preferredName ===
                                      selected.value
                                  );
                                  setRiskProfileData(filtered);
                                } else {
                                  setRiskProfileData(RiskProfileData2);
                                }
                              }}
                            />
                          </Form>
                        )}
                      </Formik>
                    </div>
                  )}
                </div>
              </Col>
              <Col md={12}>
                <div>
                  <AntTableDynamicReportTable
                    title={`Risk Profiles - ${selectedSegment}`}
                    dataSource={RiskProfileData}
                    // dataSource={DummyData}
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

export default AllRiskProfile;
