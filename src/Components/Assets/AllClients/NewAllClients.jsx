import React, { Children, useEffect, useState } from "react";
import {
  AllUsers,
  BankDetail,
  defaultUrl,
  Loading,
  LoggedInUserData,
  ProspectsCDF,
  QuestionDetail,
  SelectedClientDetails,
  StepsStatus,
} from "../../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  deepCloneWithKeys,
  GetAxios,
  openNotificationSuccess,
  PatchAxios,
  toSentenceCase,
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
import { RiUserSearchLine } from "react-icons/ri";
import AssignUser from "../../../GetComponents/AssignUser";
import { Modal } from "antd";

const NewAllClients = (props) => {
  const [loggedUser, setLoggedInUserData] = useRecoilState(LoggedInUserData);
  let DefaultUrl = useRecoilValue(defaultUrl);
  const [loading, setLoading] = useRecoilState(Loading);
  const [showFilters, setShowFilters] = useState(false);
  let [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);
  let [prospectsCDF, setProspectsCDF] = useRecoilState(ProspectsCDF);
  let [bankDetailObj, setBankDetailObj] = useRecoilState(BankDetail);

  let [stepsStatus, setStepsStatus] = useRecoilState(StepsStatus);
  let [selectedClientDetails, setSelectedClientDetails] = useRecoilState(
    SelectedClientDetails
  );

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
            <FaRegEdit /> Edit
          </div>
        ),
        onClick: (heading, row) => CallBack(heading, row, "Edit"),
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

    return menuItems;
  };
  let columnsGenerator = () => {
    const columns = [
      {
        title: "#",
        key: "index",
        render: (text, row, index) => index + 1 || "--",
      },
      {
        title: "Name",
        key: "clientGivenName",
        render: (text, row) => {
          const clientName = `${row?.client?.clientTitle || ""}. ${
            row?.client?.clientGivenName || ""
          }`;
          const shouldShowPartner =
            row?.client?.clientMaritalStatus !== "Single" &&
            row?.client?.clientMaritalStatus !== "widowed" &&
            row?.partner?.partnerGivenName;
          const partnerName = shouldShowPartner
            ? ` & ${row.partner.partnerGivenName}`
            : "";

          return clientName.trim() || "--" + partnerName;
        },
      },
      {
        title: "Marital Status",
        key: "clientMaritalStatus",
        render: (text, row) =>
          toSentenceCase(row?.client?.clientMaritalStatus) || "--",
      },
      {
        title: "Mobile No",
        key: "clientWorkPhone",
        render: (text, row) => row?.client?.clientWorkPhone || "--",
      },
      {
        title: "Email",
        key: "clientEmail",
        render: (text, row) => row?.client?.Email || "--",
      },
      {
        title: "Assigned to",
        key: "assigneName",
        render: (text, row) =>
          (row?.assignID?.firstName || "--") +
          " " +
          (row?.assignID?.lastName || "--"),
      },
      {
        title: "Operations",
        key: "operations",
        render: (text, row, index) => {
          let menuItems = menuGenerator(row);
          return (
            <DropDownOptions
              menuItems={menuItems}
              CallBack={OpenModel}
              heading={row}
              row={row} // ✅ Proper row data
            />
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

  const [PerosnalDetail2, setPersonalDetail] = useRecoilState(AllUsers);
  const PerosnalDetail = useRecoilValue(AllUsers);

  useEffect(() => {
    fetchPersonalDetials();
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let fetchPersonalDetials = async () => {
    try {
      setLoading(true);
      let res = await GetAxios(`${DefaultUrl}/api/user/Clients`);
      // console.log(res, "/api/user/Clients");
      if (res) {
        let adjustment = deepCloneWithKeys(
          res.clients.map((item, index) => {
            return {
              ...item,
              children: null,
            };
          }),
          "userData"
        );

        setPersonalDetail(adjustment.reverse());
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

  async function fetchData() {
    try {
      const res = await GetAxios(`${DefaultUrl}/api/investmentoffer/`);
      if (res) {
        // console.log(JSON.stringify(res))
        setBankDetailObj(res || {});
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }

  let Navigate = useNavigate();

  let OpenModel = (text, row, index) => {
    // console.log(text, row, index, "Open Modal log");

    switch (index) {
      case "View":
        setModalObject({
          title: "View Client Details",
          row,
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

  async function DeleteData(text, row, index) {
    try {
      let res = await PatchAxios(
        DefaultUrl + "/api/personalDetails/softDelete/" + row._id
      );
      if (res) {
        console.log(res);
        removeItemById(res._id);
      }
    } catch (error) {
      console.error("we Found an error in SoftDelete:", error);
    }
  }

  const { confirm } = Modal;

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

  return (
    <div className="All_Client reportSection">
      <ModalComponent
        modalObject={modalObject}
        setFlagState={setFlagState}
        flagState={flagState}
      >
        {modalObject.title === "Assign User" ? <AssignUser /> : <ViewClient />}
      </ModalComponent>

      <AntTableDynamicReportTable
        rowSelection={Object.assign({ type: "radio" }, rowSelection)} //This feture is comming up in Next Miled Stone
        dataSource={PerosnalDetail}
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
