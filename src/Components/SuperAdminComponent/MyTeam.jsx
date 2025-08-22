import React, { useState } from "react";
import AntTableDynamicReportTable from "../Assets/Table/AntTableDynamicReportTable";
import DropDownOptions from "../Assets/DropDownOptions/DropDownOptions";
import { FaRegEdit, FaRegFileAlt, FaTrashAlt } from "react-icons/fa";
import { Button, Input, Modal, Select, Tag } from "antd";
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
  Employees,
  Loading,
  Subscriptions,
} from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import { FaCircleCheck, FaCircleXmark, FaXmark } from "react-icons/fa6";
import { MdMarkAsUnread, MdSearch } from "react-icons/md";
import EmployeeForm from "./EmployeeForm";

const MyTeam = () => {
  const { confirm } = Modal;

  let DefaultUrl = useRecoilValue(defaultUrl);
  let [employee, setEmployee] = useRecoilState(Employees);
  const [selectedValue, setSelectedValue] = useState(null);
  const [expanded, setExpanded] = useState(false);
  let [loading, setLoading] = useRecoilState(Loading);

  const handleSearchClick = () => {
    if (!expanded) {
      setExpanded(true);
    } else {
      handleChange(selectedValue);
    }
  };

  const handleCloseClick = () => {
    setExpanded(false);
    setSelectedValue(null);
  };

  const handleChange = (value) => {
    setSelectedValue(value);
    // You can trigger a search API here
    console.log("Selected:", value);
  };

  const columns = [
    {
      title: "#",
      key: "index",
      fixed: "left",
      render: (text, _, index) => index + 1 || "--",
    },
    {
      title: "Name",
      key: "name",
      fixed: "left",
      render: (text, row) => {
        return (
          <span>
            {row.firstName} {row.lastName}
          </span>
        );
      },
    },
    {
      title: "Email",
      key: "email",
      render: (text, row) => {
        return <span>{row.email}</span>;
      },
    },
    {
      title: "Account Status",
      key: "isActive",
      render: (row) => {
        const status = row.isActive;

        const statusMap = {
          Active: {
            color: "green",
            text: "Active",
            icon: <FaCircleCheck />,
          },
          Disabled: {
            color: "red",
            text: "Disabled",
            icon: <FaCircleXmark />,
          },
        };

        const tag = statusMap[status ? "Active" : "Disabled"];

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
      title: "Created at",
      key: "createdAt",
      render: (text, row) => {
        const date = new Date(row.createdAt);
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
    ];

    let isActive = row.isActive;
    if (isActive) {
      menuItems.push({
        action: "disable",
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
            <MdMarkAsUnread /> Disable
          </div>
        ),
        onClick: (heading, row) => CallBack(heading, row, "disable"),
      });
    } else {
      menuItems.push({
        action: "enable",
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
            <MdMarkAsUnread /> Enable
          </div>
        ),
        onClick: (heading, row) => CallBack(heading, row, "enable"),
      });
    }

    menuItems.push({
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
    });

    return menuItems;
  };

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let CallBack = (heading, row, Action) => {
    console.log("Action:", Action);

    switch (Action) {
      case "newAdviser":
        setFlagState(true);
        setModalObject({
          title: "Add New Adviser",
          Action,
          row,
        });
        break;
      case "view":
        setFlagState(true);
        setModalObject({
          title: "View Adviser",
          type: "newAdviser",
          Action,
          row,
        });
        break;
      case "edit":
        setFlagState(true);
        setModalObject({
          title: "Edit Adviser",
          type: "newAdviser",
          Action,
          row,
        });
        break;
      case "delete":
        deleteFunction(row._id);
        break;
      case "disable":
      case "enable":
        EnableDisable(row._id, Action);
      default:
        break;
    }
  };

  const EnableDisable = (id, action) => {
    const isEnabling = action === "enable";
    confirm({
      title: `Are you sure you want to ${
        isEnabling ? "enable" : "disable"
      } this Employee?`,
      content: `This action will ${
        isEnabling ? "enable" : "disable"
      } the employee.`,
      okText: `Yes, ${isEnabling ? "Enable" : "Disable"}`,
      okType: isEnabling ? "primary" : "danger",
      cancelText: "Cancel",
      centered: true,
      onOk: async () => {
        try {
          setLoading(true);
          let res = await PatchAxios(DefaultUrl + "/api/user/UpdateStatus", {
            _id: id,
          });
          console.log("Enable/Disable Response:", res);
          if (res) {
            setEmployee((prev) =>
              prev.map((item) =>
                item._id === id ? { ...item, isActive: !item.isActive } : item
              )
            );
            openNotificationSuccess(
              "success",
              "topRight",
              `Employee ${isEnabling ? "Enabled" : "Disabled"}`,
              `Employee is ${isEnabling ? "enabled" : "disabled"} successfully`
            );
          }
        } catch (error) {
          openNotificationSuccess(
            "error",
            "topRight",
            `${isEnabling ? "Enable" : "Disable"} Failed`,
            `An error occurred while ${
              isEnabling ? "enabling" : "disabling"
            } the employee.`
          );
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const deleteFunction = (id) => {
    confirm({
      title: "Are you sure you want to delete this Adviser?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      onOk: async () => {
        try {
          setLoading(true);
          let res = await PatchAxios(DefaultUrl + "/api/user/softDelete", {
            _id: id,
          });
          if (res) {
            setEmployee((prev) => prev.filter((item) => item._id !== id));
            openNotificationSuccess(
              "success",
              "topRight",
              "Employee Deleted",
              "Employee is deleted successfully"
            );
          }
        } catch (error) {
          console.error(error);
          openNotificationSuccess(
            "error",
            "topRight",
            "Delete Failed",
            "An error occurred while deleting the employee."
          );
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <div className="container All_Client reportSection">
      <ModalComponent
        modalObject={modalObject}
        setFlagState={setFlagState}
        flagState={flagState}
      >
        <EmployeeForm />
      </ModalComponent>

      <div className="row justify-content-center">
        <div className="col-md-12 py-3" style={{ minHeight: "76vh" }}>
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="PoppinsFamily green_Text fw-bold fs-4">
                  My Team
                </h5>
                <div className="d-flex align-items-center gap-3">
                  <div className="SearchAnimate">
                    <div
                      className={`expandable-search ${
                        expanded ? "expanded" : ""
                      }`}
                    >
                      <Button
                        icon={<MdSearch size={18} />}
                        onClick={handleSearchClick}
                        className="search-icon-btn"
                      />

                      <div className="input-wrapper">
                        <Select
                          showSearch
                          value={selectedValue}
                          style={{ width: 200 }}
                          placeholder="Search to Select"
                          optionFilterProp="label"
                          filterOption={(input, option) =>
                            option?.label
                              ?.toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          onChange={handleChange}
                          options={[
                            ...employee.map((item, index) => {
                              return {
                                value: item.email,
                                label: toSentenceCase(
                                  item.firstName + " " + item.lastName
                                ),
                              };
                            }),
                          ]}
                        />
                        <Button
                          icon={<FaXmark />}
                          onClick={handleCloseClick}
                          type="text"
                          className="close-btn"
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    className="me-2"
                    onClick={() => CallBack("", "", "newAdviser")}
                  >
                    Add Advisers
                  </Button>
                </div>
              </div>

              <AntTableDynamicReportTable
                dataSource={
                  selectedValue
                    ? employee.filter((item) => item.email === selectedValue)
                    : employee
                }
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

export default MyTeam;
