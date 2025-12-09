import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import AntTableDynamicReportTable from "../Assets/Table/AntTableDynamicReportTable";
import { FaCircleCheck, FaCircleXmark, FaGear } from "react-icons/fa6";
import DropDownOptions from "../Assets/DropDownOptions/DropDownOptions";
import { FaClock, FaEdit, FaInfoCircle, FaRegFileAlt } from "react-icons/fa";
import ModalComponent from "../Questions/FinancialInvestments/ModalComponent";
import CDFForm from "./CDFForm";
import { Button, Segmented, Tag } from "antd";
import CDFViewForm from "./CDFViewForm";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  defaultUrl,
  Loading,
  ProspectsCDF,
  QuestionDetail,
  StepsStatus,
} from "../../Store/Store";
import {
  ConvertDate,
  GetAxios,
  openNotificationSuccess,
  PatchAxios,
  toSentenceCase,
} from "../Assets/Api/Api";
import { Field, Form, Formik } from "formik";
import { SimpleSelectField } from "../Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import { MdAddCircleOutline, MdOutlineWarningAmber } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";
import EditableTable from "../Assets/Table/EditableTable";
import ReusableHeader from "../Assets/Dynamic/ReusableHeader";

const CDFclients = () => {
  const DefaultUrl = useRecoilValue(defaultUrl);
  const [loading, setLoading] = useRecoilState(Loading);
  // const [prospectsCDF, setProspectsCDF] = useRecoilState(ProspectsCDF);
  const [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);
  const [stepsStatus, setStepsStatus] = useRecoilState(StepsStatus);

  const [CDFData, setCDFData] = useState([]);
  const [CDFData2, setCDFData2] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState("New Prospects");
  const [showFilters, setShowFilters] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  let nav = useNavigate();

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

    if (status === "successful") {
      menuItems.splice(1, 0, {
        action: "Edit",
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
            <FaEdit /> Edit
          </div>
        ),
        onClick: (heading, row) => CallBack(heading, row, "Edit"),
      });
    }

    return menuItems;
  };

  let columns = [
    {
      title: "#",
      key: "index",
      render: (text, row, index) => index + 1 || "--",
    },
    {
      title: <div className="w-100">HouseHold</div>,
      key: "lastName",
      fixed: "left",
      width: 150,
      render: (text, row, index) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {row?.client?.lastName || "--"}
          <FaInfoCircle
            onClick={() => {
              OpenModel(text, row, index);
            }}
          />
        </div>
      ),

      sorter: (a, b) => {
        const nameA = a?.client?.lastName?.toLowerCase() || "";
        const nameB = b?.client?.lastName?.toLowerCase() || "";
        console.log(nameA.localeCompare(nameB));
        return nameA.localeCompare(nameB);
      },
    },
    {
      title: <div className="w-100">Clients</div>,
      key: "preferredName",
      render: (text, row, index) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {row?.client?.preferredName || "--"} (Primary)
          <br />
          {row?.client?.relationshipStatus.toLowerCase() == "couple" &&
            row?.partner?.preferredName !== "" &&
            `${row?.partner?.preferredName || "--"} (Partner)`}{" "}
        </div>
      ),
      sorter: (a, b) => {
        const nameA = a?.client?.preferredName?.toLowerCase() || "";
        const nameB = b?.client?.preferredName?.toLowerCase() || "";
        return nameA.localeCompare(nameB);
      },
    },
    {
      title: "Age",
      key: "age",
      width: 100,
      render: (text, row) => {
        let client = row?.client?.age || "--";
        let partner = row?.partner?.age || "";
        return (
          <>
            {client}
            <br />
            {partner}
          </>
        );
      },
    },
    {
      title: "Contact",
      key: "phoneNumber",
      render: (text, row) => {
        let client = row?.client?.phoneNumber || "--";
        let partner = row?.partner?.phoneNumber || "";
        return (
          <>
            {client}
            <br />
            {partner}
          </>
        );
      },
    },
    {
      title: "Email",
      key: "email",
      render: (text, row) => {
        let client = row?.client?.email || "--";
        let partner = row?.partner?.email || "";
        return (
          <>
            {client}
            <br />
            {partner}
          </>
        );
      },
    },
    {
      title: "Address",
      key: "address",
      render: (text, row) => {
        let client = row?.client?.address || "--";
        let partner = row?.partner?.address || "";
        return (
          <>
            {client}
            <br />
            {partner}
          </>
        );
      },
    },
    {
      title: "Last updated at",
      key: "updatedAt",
      render: (text, row) =>
        row?.updatedAt ? ConvertDate(row?.updatedAt) : "--",

      sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt), // ✅ ascending/descending sort
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
      fixed: "right",
      width: 90,
      render: (text, row, index) => (
        <div className="w-100 d-flex justify-content-center align-items-center">
          <DropDownOptions
            menuItems={getMenuItems(row)}
            CallBack={OpenModel}
            heading={row}
            row={row} // ✅ Proper row data
          />
        </div>
      ),
    },
  ];

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  const OpenModel = (text, row, action) => {
    const isPending = row.status === "pending";

    const actionsMap = {
      View: () => {
        setModalObject({ title: "CDF View Details", row, noFooter: true });
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
        setModalObject({ title: "CDF Details", row, noFooter: true });
        setFlagState(true);
      },
    };

    const executeAction = actionsMap[action] || actionsMap.default;
    executeAction();
  };

  let [apiFetch, setApiFetch] = useState(true);

  useEffect(() => {
    if (apiFetch) {
      console.log("Fetching CDF Data");
      fetchCDFData();
    }
  }, [apiFetch]);

  const fetchCDFData = async () => {
    try {
      setLoading(true);
      let res = await GetAxios(`${DefaultUrl}/api/CDF/`);
      // console.log(res,"cdf");
      if (res && res.length > 0) {
        // setProspectsCDF(res.reverse());
        setCDFData(
          res.filter((item) => item.status?.toLowerCase() === "pending")
        );
        setCDFData2(res);
        setSelectedSegment("New Prospects");
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

      let responce = await PatchAxios(`${DefaultUrl}/api/CDF/Update`, data);
      console.log(responce);
      if (responce) {
        data.client_FK = responce.client_FK;

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
            <Row className="justify-content-between align-items-center All_Client reportSection ">
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
              <Col className="p-0">
                <ReusableHeader
                  title=""
                  expanded={expanded}
                  selectedValue={selectedValue}
                  options={CDFData.map((item) => ({
                    value: item.client.email, // or client ID if available
                    label:
                      item.client.lastName + " " + item.client.preferredName,
                    email: item.client.email,
                    phone: item.client.phoneNumber,
                  }))}
                  onSearchClick={() => setExpanded(true)}
                  onCloseClick={() => {
                    setExpanded(false);
                    setSelectedValue(null);
                  }}
                  filterOption={(input, option) => {
                    const searchText = input.toLowerCase();
                    return (
                      option?.label?.toLowerCase().includes(searchText) ||
                      option?.email?.toLowerCase().includes(searchText) ||
                      option?.phone?.toLowerCase().includes(searchText)
                    );
                  }}
                  onChange={(val) => {
                    console.log(val);
                    setSelectedValue(val);
                  }}
                  noAddButton={true}
                />
              </Col>

              <div className="ps-0 ms-0" style={{ width: "70px" }}>
                <div className="d-flex justify-content-end gap-3 align-items-center">
                  <Button
                    onClick={() => {
                      setApiFetch(!apiFetch); // Toggle apiFetch to trigger useEffect
                    }}
                    className="m-0"
                  >
                    <AiOutlineReload />
                  </Button>
                </div>
              </div>

              <Col md={12}>
                <div>
                  <AntTableDynamicReportTable
                    // title={`CDF Prospects - ${selectedSegment}`}
                    dataSource={
                      selectedValue
                        ? CDFData.filter(
                            (item) => item.client.email === selectedValue
                          )
                        : CDFData
                    }
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
