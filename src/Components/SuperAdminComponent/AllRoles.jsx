import React, { useState } from "react";
import AntTableDynamicReportTable from "../Assets/Table/AntTableDynamicReportTable";
import DropDownOptions from "../Assets/DropDownOptions/DropDownOptions";
import { FaRegEdit, FaRegFileAlt, FaTrashAlt } from "react-icons/fa";
import { Button, Modal, Tag } from "antd";
import ModalComponent from "../Questions/FinancialInvestments/ModalComponent";
import SubscriptionForms from "./SubscriptionForms";
import {
  openNotificationSuccess,
  PatchAxios,
  toSentenceCase,
} from "../Assets/Api/Api";
import AdviserFrom from "./AdviserFrom";
import {
  Advisers,
  defaultUrl,
  Loading,
  Roles,
  Subscriptions,
} from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import RoleForm from "./RoleForm";

const AllRoles = () => {
  const { confirm } = Modal;

  let DefaultUrl = useRecoilValue(defaultUrl);
  let [loading, setLoading] = useRecoilState(Loading);
  let [roles, setRoles] = useRecoilState(Roles);

  const columns = [
    {
      title: "#",
      key: "index",
      fixed: "left",
      render: (text, _, index) => index + 1 || "--",
    },
    {
      title: "Role Name",
      key: "roleName",
      render: (text, row) => {
        return <span>{row.roleName}</span>;
      },
    },
    {
      title: "Description",
      key: "description",
      render: (text, row) => {
        return <span>{row.description}</span>;
      },
    },
    {
      title: "Permissions",
      key: "permissions",
      render: (text, row) => {
        const permissionsText = Array.isArray(row.permissions)
          ? row.permissions.length > 0
            ? row.permissions.map((item) => toSentenceCase(item)).join(", ")
            : "No Permissions given"
          : toSentenceCase(row.permissions);
        return (
          <span
            className={
              permissionsText == "No Permissions given" && " text-danger"
            }
          >
            {permissionsText}
          </span>
        );
      },
    },

    {
      title: "Updated at",
      key: "updatedAt",
      render: (text, row) => {
        const date = new Date(row.updatedAt);
        return date.toLocaleDateString("en-Au", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
    {
      title: "Operations",
      key: "operations",
      fixed: "right",
      render: (text, row, index) => (
        <DropDownOptions
          menuItems={getDowpdownOptions(row)}
          CallBack={CallBack}
          heading={row}
          row={row} // ✅ Proper row data
        />
      ),
    },
  ];

  const getDowpdownOptions = (row) => {
    const menuItems = [
      {
        action: "view",
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
        onClick: (heading, row) => CallBack(heading, row, "view"),
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

    return menuItems;
  };

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let CallBack = (heading, row, Action) => {
    console.log("Action:", Action);

    switch (Action) {
      case "newRole":
        setFlagState(true);
        setModalObject({
          title: "Add New Role",
          Action,
          row,
        });
        break;
      case "view":
        setFlagState(true);
        setModalObject({
          title: "View Role",
          Action,
          row,
        });
        break;
      case "edit":
        setFlagState(true);
        setModalObject({
          title: "Edit Role",
          Action,
          row,
        });
        break;
      case "delete":
        deleteFunction(row);
        break;
      default:
        break;
    }
  };

  const deleteFunction = (row) => {
    confirm({
      title: "Are you sure you want to delete this Role?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      onOk: async () => {
        try {
          setLoading(true);
          console.log(row);
          let res = await PatchAxios(DefaultUrl + "/api/role/SoftDelete", row);
          if (res) {
            setRoles((prev) => prev.filter((item) => item._id !== row._id));
            openNotificationSuccess(
              "success",
              "topRight",
              "Plan Deleted",
              "User role is deleted successfully"
            );
          }
        } catch (error) {
          console.log("Something went wrong:", error);
          openNotificationSuccess(
            "error",
            "topRight",
            "Delete Failed",
            "An error occurred while deleting the user role."
          );
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <div className="container-fluid All_Client reportSection">
      <ModalComponent
        modalObject={modalObject}
        setFlagState={setFlagState}
        flagState={flagState}
      >
        <RoleForm />
      </ModalComponent>

      <div className="row justify-content-center">
        <div className="col-md-10 py-3" style={{ minHeight: "76vh" }}>
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="PoppinsFamily green_Text fw-bold fs-4">
                  All Role
                </h5>
                <div className="d-flex align-items-center">
                  <Button
                    className="me-2"
                    onClick={() => CallBack("", "", "newRole")}
                  >
                    Add Role
                  </Button>
                </div>
              </div>

              <AntTableDynamicReportTable
                dataSource={roles}
                columns={columns}
                pagination={true}
                customPagination={{
                  pageSize: 10,
                  position: ["bottomRight"],
                  className: "custom-pagination",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRoles;
