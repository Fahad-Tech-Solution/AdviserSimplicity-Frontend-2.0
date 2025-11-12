import React, { Children, useEffect, useState } from "react";
import {
  AllUsers,
  CRState,
  defaultUrl,
  Loading,
  LoggedInUserData,
  OptionRender,
  PersonalDetailsData,
  ProspectsCDF,
  QuestionDetail,
  SelectedClientDetails,
  StepsStatus,
} from "../../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ConvertDate,
  deepCloneWithKeys,
  GetAxios,
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
} from "../Api/Api";
import {
  FaRegEdit,
  FaRegFileAlt,
  FaTrashAlt,
  FaUserCheck,
} from "react-icons/fa";
import AntTableDynamicReportTable from "../Table/AntTableDynamicReportTable";
import DropDownOptions from "../DropDownOptions/DropDownOptions";
import ModalComponent from "../../Questions/FinancialInvestments/ModalComponent";
import ViewClient from "../../../GetComponents/ViewClient";
import { useNavigate } from "react-router-dom";
import {
  RiMailSendLine,
  RiUploadCloudLine,
  RiUserSearchLine,
} from "react-icons/ri";
import AssignUser from "../../../GetComponents/AssignUser";
import { Modal, notification, Spin, ConfigProvider, Tooltip } from "antd";
import PushtoAdviserlink from "../../PushtoAdviserlink/PushtoAdviserlink";
import { FaArrowRotateRight } from "react-icons/fa6";
import ReusableHeader from "../Dynamic/ReusableHeader";

const NewAllClients = (props) => {
  const [loggedUser, setLoggedInUserData] = useRecoilState(LoggedInUserData);
  let DefaultUrl = useRecoilValue(defaultUrl);
  const [loading, setLoading] = useRecoilState(Loading);
  const [showFilters, setShowFilters] = useState(false);
  let [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);
  let [prospectsCDF, setProspectsCDF] = useRecoilState(ProspectsCDF);

  let [stepsStatus, setStepsStatus] = useRecoilState(StepsStatus);
  let [selectedClientDetails, setSelectedClientDetails] = useRecoilState(
    SelectedClientDetails
  );
  const [expanded, setExpanded] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [CRStateObj, setCRState] = useRecoilState(CRState);
  const [optRender, setOptRender] = useRecoilState(OptionRender);
  const [PersonalDetailObj, setPersonalDetailObj] =
    useRecoilState(PersonalDetailsData);
  const [PerosnalDetail2, setPersonalDetail] = useRecoilState(AllUsers);
  const PerosnalDetail = useRecoilValue(AllUsers);

  const handleAddClientClick = () => {
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
    Navigate("/user/personal-detail");
  };

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let menuGenerator = (row) => {
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
        action: "edit",
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
            <FaRegEdit /> Discovery Module
          </div>
        ),
        onClick: (heading, row) => CallBack(heading, row, "Edit"),
      },
      {
        action: "Push-to-Adviser-link",
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
            <RiUploadCloudLine /> Push to Adviser-link
          </div>
        ),
        onClick: (heading, row) =>
          CallBack(heading, row, "Push-to-Adviser-link"),
      },
      {
        action: "assign",
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
            <RiUserSearchLine /> Assign
          </div>
        ),
        onClick: (heading, row) => CallBack(heading, row, "Assign"),
      },
      {
        action: "select",
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
            <FaUserCheck /> Select
          </div>
        ),
        onClick: (heading, row) => CallBack(heading, row, "select"),
      },
      {
        action: "delete",
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
            <FaTrashAlt /> Delete
          </div>
        ),
        category: "danger",
        onClick: (heading, row) => CallBack(heading, row, "Delete"),
      },
    ];

    if (
      loggedUser?.roleID?.permissions.includes("adviser") &&
      row?.assignID?.email !== loggedUser?.email
    ) {
      // Find the "assign" menu item
      const assignIndex = menuItems.findIndex(
        (item) => item.action === "assign"
      );

      if (assignIndex !== -1) {
        menuItems[assignIndex] = {
          ...menuItems[assignIndex], // keep other properties
          action: "unAssign", // change the action
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
              <RiUserSearchLine /> Unassign
            </div>
          ),
          onClick: (heading, row) => CallBack(heading, row, "Unassign"),
        };
      }
    }

    if (
      loggedUser?.roleID?.permissions.includes("prospects") &&
      loggedUser?.roleID?.permissions.includes("fact find")
    ) {
      const assignIndex = menuItems.findIndex(
        (item) => item.action === "assign" || item.action === "unAssign"
      );
      if (assignIndex !== -1) {
        // console.log(row.isRiskProfileCompleted, "row.isRiskProfileCompleted");
        // Insert the "sendRisk
        if (!row.isRiskProfileCompleted) {
          menuItems.splice(assignIndex + 1, 0, {
            action: "sendRiskProfile",
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
                <RiMailSendLine /> Send Risk Profile
              </div>
            ),
            onClick: (heading, row) =>
              CallBack(heading, row, "sendRiskProfile"),
          });
        } else {
          menuItems.splice(assignIndex + 1, 0, {
            action: "viewRiskProfile",
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
                <FaRegFileAlt /> View Risk Profile
              </div>
            ),
            onClick: (heading, row) =>
              CallBack(heading, row, "viewRiskProfile"),
          });
        }
      }
    }

    return menuItems;
  };

  const shouldShowPartner = (row) => {
    return (
      row?.client?.clientMaritalStatus !== "Single" &&
      row?.client?.clientMaritalStatus !== "widowed" &&
      row?.partner?.partnerGivenName
    );
  };

  let columnsGenerator = () => {
    const columns = [
      // {
      //   title: "#",
      //   key: "index",
      //   render: (text, row, index) => index + 1 || "--",
      // },
      {
        title: "Household",
        key: "clientLastName",
        fixed: "left",
        width: 100,
        render: (text, row) => {
          const clientName = `${row?.client?.clientLastName || "--"}`;

          return <p className="m-0">{clientName}</p>;
        },
        sorter: (a, b) => {
          const nameA = a?.client?.clientLastName?.toLowerCase() || "";
          const nameB = b?.client?.clientLastName?.toLowerCase() || "";
          return nameA.localeCompare(nameB);
        },
      },
      {
        title: "Name",
        key: "clientGivenName",
        render: (text, row) => {
          const clientName = `${row?.client?.clientGivenName || ""}`;

          const showPartner = shouldShowPartner(row);

          const partnerName = showPartner
            ? ` ${row.partner.partnerGivenName} (Partner)`
            : "";

          return (
            <p className="m-0">
              {clientName} (Primary)
              <br />
              {partnerName}
            </p>
          );
        },
      },
      {
        title: "Age",
        key: "age",
        render: (text, row) => {
          const client = <> {row?.client?.clientAge}</>;
          const partner = row?.partner?.partnerAge ? (
            <> {row?.partner?.partnerAge}</>
          ) : (
            ""
          );

          return (
            <p className="m-0">
              {client}
              <br />
              {partner}
            </p>
          );
        },
      },
      {
        title: "Contact",
        key: "clientWorkPhone",
        render: (text, row) => {
          let client = row?.client?.clientWorkPhone;
          let partner = row?.partner?.partnerWorkPhone;
          return (
            <p className="m-0">
              {client}
              <br />
              {partner}
            </p>
          );
        },
      },
      {
        title: "Email",
        key: "clientEmail",
        render: (text, row) => {
          const client = `${row?.client?.Email || ""}`;
          const partner = `${row?.partner?.partnerEmail || ""}`;

          return (
            <p className="m-0">
              {client}
              <br />
              {partner}
            </p>
          );
        },
      },
      {
        title: "Address",
        key: "address",
        dataIndex: "address", // optional, for consistency
        width: 150, // increase a bit if needed
        ellipsis: true, // ✅ AntD built-in ellipsis support
        render: (text, row) => {
          const client = row?.client?.clientHomeAddress || "";
          const partner = row?.partner?.partnerHomeAddress || "";

          return (
            <Tooltip
              title={`${client}  ${partner && "&& " + partner}`} // ✅ tooltip on hover
              color={"#fff"}
              key={"#fff"}
              styles={{
                body: { color: "black" },
              }}
            >
              <div
                style={{
                  width: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {client}
                <br />
                {partner && `${partner}`}
              </div>
            </Tooltip>
          );
        },
      },
      {
        title: "Last Updated At",
        key: "clientEmail",
        render: (text, row) => {
          const client = `${ConvertDate(row?.updatedAt) || ""}`;
          return client;
        },
        sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt), // ✅ ascending/descending sort
      },
      {
        title: "Operations",
        key: "operations",
        fixed: "right",
        width: 130,
        render: (text, row, index) => {
          let menuItems = menuGenerator(row);
          return (
            <div className="w-100 d-flex justify-content-center align-items-center">
              <DropDownOptions
                menuItems={menuItems}
                CallBack={OpenModel}
                heading={row}
                row={row} // ✅ Proper row data
              />
            </div>
          );
        },
      },
    ];

    if (!loggedUser?.roleID?.permissions.includes("adviser")) {
      const index = columns.findIndex((col) => col.key === "assigneName");
      if (index !== -1) {
        columns.splice(index, 1);
      }
    }

    return columns;
  };

  useEffect(() => {
    fetchPersonalDetials();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let fetchPersonalDetials = async () => {
    try {
      setLoading(true);
      let res = await GetAxios(`${DefaultUrl}/api/user/Clients`);
      // console.log(res, "/api/user/Clients");
      if (res) {
        console.log(res, "DashBoard Table");
        let adjustment = deepCloneWithKeys(res.clients, "userData");

        setPersonalDetail(adjustment);
      }

      res = await GetAxios(`${DefaultUrl}/api/CDF/`);
      // console.log(res,"cdf");
      if (res && res.length > 0) {
        setProspectsCDF(res.reverse());
      }
    } catch (error) {
      console.log("Error message:", error);
    } finally {
      setLoading(false);
    }
  };

  let Navigate = useNavigate();

  let OpenModel = (text, row, index) => {
    // console.log(text, row, index, "Open Modal log");

    switch (index) {
      case "View":
        setModalObject({
          title: "View Client Details",
          row,
          noFooter: true,
        });
        setFlagState(true);

        break;
      case "edit":
      case "Edit":
        localStorage.setItem("UserID", row._id);
        localStorage.setItem("selected client", JSON.stringify([row.key]));
        localStorage.setItem("Email", row.Email);
        setQuestionDetail({});
        setStepsStatus(false);
        setSelectedClientDetails(row);
        Navigate("/user/personal-detail#" + row._id);

        break;
      case "Push-to-Adviser-link":
      case "Push to Adviser-link":
        setModalObject({
          title: "Push Client On Adviser link",
          row,
          noFooter: true,
        });
        setFlagState(true);

        break;
      case "assign":
      case "Assign":
        setModalObject({
          title: "Assign User",
          row,
        });
        setFlagState(true);

        break;
      case "unassign":
      case "unAssign":
        unassignFunction(row);

        break;
      case "sendRiskProfile":
        sendRiskProfile(row);

        break;
      case "viewRiskProfile":
        setSelectedClientDetails(row);
        localStorage.setItem("UserID", row._id);
        Navigate("/user/risk-profile#" + row._id);

        break;
      case "select":
        localStorage.setItem("UserID", row._id);
        localStorage.setItem("selected client", JSON.stringify([row.key]));
        localStorage.setItem("Email", row.client.Email);
        setSelectedClientDetails(row);

        break;
      case "delete":
        DeleteData(text, row, index);
        break;

      default:
        break;
    }
  };

  const { confirm } = Modal; // ✅ make sure you imported from "antd"

  async function DeleteData(text, row, index) {
    confirm({
      title: "Are you sure you want to delete this record?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      onOk: async () => {
        try {
          setLoading(true); // ✅ if you have a loading state
          let res = await PatchAxios(
            DefaultUrl + "/api/personalDetails/softDelete/" + row._id
          );

          if (res) {
            console.log(res);
            removeItemById(row._id); // ✅ remove from UI
            openNotificationSuccess(
              "success",
              "topRight",
              "Deleted Successfully",
              "Record deleted successfully"
            );
          }
        } catch (error) {
          console.error("We found an error in SoftDelete:", error);
          openNotificationSuccess(
            "error",
            "topRight",
            "Delete Failed",
            "An error occurred while deleting the record."
          );
        } finally {
          setLoading(false);
        }
      },
    });
  }

  const unassignFunction = (row) => {
    confirm({
      title: "Are you sure you want to unassign this client?",
      content: "This action will remove the client assignment.",
      okText: "Yes, Unassign",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      onOk: async () => {
        try {
          setLoading(true);
          let res = await PatchAxios(DefaultUrl + "/api/user/AssignClient", {
            clientID: row._id,
          });

          if (res) {
            res.clients.children = null;
            setPersonalDetail((prev) =>
              prev.map((user) => (user._id === row._id ? res.clients : user))
            );
            openNotificationSuccess(
              "success",
              "topRight",
              "Client Unassigned",
              "Client has been unassigned successfully"
            );
          }
        } catch (error) {
          console.log(error);
          openNotificationSuccess(
            "error",
            "topRight",
            "Unassign Failed",
            "An error occurred while unassigning the client."
          );
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const removeItemById = (idToRemove) => {
    setPersonalDetail((prevData) =>
      prevData.filter((item) => item._id !== idToRemove)
    );
  };

  const sendRiskProfile = async (row) => {
    let Obj = {
      name: row.client.clientGivenName,
      email: row.client.Email,
      clientFK: row._id,
    };

    // Unique key to update the same notification
    const key = "sendingEmail";

    // Show loading notification
    notification.open({
      key,
      message: "Sending Email",
      description: "Please wait while we send the Risk Profile...",
      duration: 0, // stays open until updated/closed
      icon: (
        <ConfigProvider
          theme={{
            token: {
              /* here is your global tokens */
              colorPrimary: "#36b446",
            },
          }}
        >
          <Spin size="small" />
        </ConfigProvider>
      ),
    });

    try {
      let res = await PostAxios(`${DefaultUrl}/api/riskprofile/email`, Obj);

      if (res) {
        // Update notification to success
        notification.success({
          key,
          message: "Risk Profile Sent",
          description: "Risk Profile has been sent successfully.",
          duration: 3,
        });
      }
    } catch (error) {
      // Update notification to error
      notification.error({
        key,
        message: "Failed to Send",
        description: "An error occurred while sending the Risk Profile.",
        duration: 3,
      });
      console.log("Error in sendRiskProfile function:", error);
    }
  };
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    selectedRowKeys: [selectedClientDetails.key],
    onChange: (selectedRowKeys, selectedRows) => {
      localStorage.setItem("selected client", JSON.stringify(selectedRowKeys));
      // setSelectedRow(selectedRowKeys);
      localStorage.setItem("UserID", selectedRows[0]?._id || "");
      localStorage.setItem("Email", selectedRows[0]?.client?.Email || "");

      setSelectedClientDetails(selectedRows[0]);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const componentMapping = {
    "Assign User": <AssignUser />,
    "Push Client On Adviser link": <PushtoAdviserlink />,
    "View Client Details": <ViewClient />,
  };

  const ModalContent = (obj) => {
    return componentMapping[obj.title] || null;
  };

  return (
    <div className="All_Client reportSection mt-2">
      <ModalComponent
        modalObject={modalObject}
        setFlagState={setFlagState}
        flagState={flagState}
      >
        {ModalContent(modalObject)}
      </ModalComponent>

      <ReusableHeader
        title=""
        expanded={expanded}
        selectedValue={selectedValue}
        options={PerosnalDetail.map((item) => ({
          value: item.client.Email,
          label: `${item.client.clientGivenName || ""} ${
            item.client.clientLastName || ""
          }`,
        }))}
        onSearchClick={() => setExpanded(true)}
        onCloseClick={() => {
          setExpanded(false);
          setSelectedValue(null);
        }}
        onChange={(val) => {
          console.log(val);
          setSelectedValue(val);
        }}
        onAddClick={handleAddClientClick}
        addButtonLabel="Add Client"
      />

      <AntTableDynamicReportTable
        rowSelection={Object.assign({ type: "radio" }, rowSelection)} //This feture is comming up in Next Miled Stone
        dataSource={
          selectedValue
            ? PerosnalDetail.filter(
                (item) => item.client.Email === selectedValue
              )
            : PerosnalDetail
        }
        columns={columnsGenerator()} // ✅ now it's an array
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        pagination={true}
        customPagination={{
          pageSize: 10,
          position: ["bottomRight"],
          className: "custom-pagination",
        }}
      />
    </div>
  );
};

export default NewAllClients;
