import React, { useState } from "react";
import AntTableDynamicReportTable from "../Assets/Table/AntTableDynamicReportTable";
import DropDownOptions from "../Assets/DropDownOptions/DropDownOptions";
import { FaRegEdit, FaRegFileAlt, FaTrashAlt } from "react-icons/fa";
import { Button, Input, Modal, Select, Tag } from "antd";
import ModalComponent from "../Questions/FinancialInvestments/ModalComponent";
import SubscriptionForms from "./SubscriptionForms";
import { openNotificationSuccess, toSentenceCase } from "../Assets/Api/Api";
import AdviserFrom from "./AdviserFrom";
import {
  Advisers,
  defaultUrl,
  Loading,
  Subscriptions,
} from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import { FaCircleCheck, FaCircleXmark, FaXmark } from "react-icons/fa6";
import { MdMarkAsUnread, MdSearch } from "react-icons/md";

const AllAdvisers = () => {
  const { confirm } = Modal;

  let DefaultUrl = useRecoilValue(defaultUrl);
  let subscriptions = useRecoilValue(Subscriptions);
  let [loading, setLoading] = useRecoilState(Loading);
  let [advisers, setAdvisers] = useRecoilState(Advisers);
  const [selectedValue, setSelectedValue] = useState(null);
  const [expanded, setExpanded] = useState(false);

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
      // fixed: "left",
      render: (text, _, index) => index + 1 || "--",
    },
    {
      title: "Name",
      key: "name",
      // fixed: "left",
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
      title: "Subscription Name",
      key: "planID",
      render: (text, row) => {
        const subscription = subscriptions.find(
          (sub) => sub._id === row.planID
        );
        return (
          <span>
            {subscription
              ? `${subscription.planName} (${subscription.planCode})`
              : "N/A"}
          </span>
        );
      },
    },
    {
      title: "Operations",
      key: "operations",
      // fixed: "right",
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
      default:
        break;
    }
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
        openNotificationSuccess(
          "error",
          "topRight",
          "Delete Failed",
          "An error occurred while deleting the order."
        );
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
        <AdviserFrom />
      </ModalComponent>

      <div className="row justify-content-center">
        <div className="col-md-10 py-3" style={{ minHeight: "76vh" }}>
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="PoppinsFamily green_Text fw-bold fs-4">
                  All Advisers
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
                            ...(Array.isArray(advisers) ? advisers : []).map(
                              (item) => ({
                                value: item.email,
                                label: toSentenceCase(
                                  item.firstName + " " + item.lastName
                                ),
                              })
                            ),
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
                  Array.isArray(advisers)
                    ? selectedValue
                      ? advisers.filter((item) => item.email === selectedValue)
                      : advisers
                    : []
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

export default AllAdvisers;
