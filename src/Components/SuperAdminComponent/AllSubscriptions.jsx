import React, { useState } from "react";
import AntTableDynamicReportTable from "../Assets/Table/AntTableDynamicReportTable";
import DropDownOptions from "../Assets/DropDownOptions/DropDownOptions";
import {
  FaCheckCircle,
  FaRegEdit,
  FaRegFileAlt,
  FaTrashAlt,
} from "react-icons/fa";
import { Button, Modal, Tag } from "antd";
import ModalComponent from "../Questions/FinancialInvestments/ModalComponent";
import SubscriptionForms from "./SubscriptionForms";
import {
  DeleteAxios,
  openNotificationSuccess,
  PatchAxios,
} from "../Assets/Api/Api";
import { defaultUrl, Loading, Subscriptions } from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  FaCircleCheck,
  FaCircleXmark,
  FaRegCircleXmark,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const AllSubscriptions = () => {
  const { confirm } = Modal;

  let DefaultUrl = useRecoilValue(defaultUrl);
  let [loading, setLoading] = useRecoilState(Loading);
  let [subscriptions, setSubscriptions] = useRecoilState(Subscriptions);

  const columns = [
    {
      title: "#",
      key: "index",
      render: (text, _, index) => index + 1 || "--",
    },
    {
      title: "Plan Name",
      key: "planName",
      render: (text, row) => {
        return <span>{row.planName}</span>;
      },
    },
    {
      title: "Price",
      key: "price",
      render: (text, row) => {
        return <span className="fw-bold">{row.price}</span>;
      },
    },
    {
      title: "Created At",
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
      title: "Status",
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
      title: "Operations",
      key: "operations",
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
      ...(row.isActive
        ? [
            {
              action: "Disabled",
              category: "danger",
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
                  <FaRegCircleXmark /> Disable
                </div>
              ),
              onClick: (heading, row) => CallBack(heading, row, "Disabled"),
            },
          ]
        : [
            {
              action: "Active",
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
                  <FaCheckCircle /> Activate
                </div>
              ),
              onClick: (heading, row) => CallBack(heading, row, "Active"),
            },
          ]),
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

    switch (Action.toLowerCase()) {
      case "newsubscription":
        setFlagState(true);
        setModalObject({
          title: "Add New Subscription",
          Action,
          row,
        });
        break;
      case "view":
        setFlagState(true);
        setModalObject({
          title: "View Subscription",
          Action,
          row,
        });
        break;
      case "edit":
        setFlagState(true);
        setModalObject({
          title: "Edit Subscription",
          Action,
          row,
        });
        break;
      case "delete":
        deleteFunction(row);
        break;
      case "active":
      case "disabled":
        changeStatus(row, Action);
        break;

      default:
        break;
    }
  };

  const deleteFunction = (row) => {
    confirm({
      title: "Are you sure you want to delete this Subscription Plan?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      onOk: async () => {
        try {
          setLoading(true);
          console.log(row);
          let res = await PatchAxios(
            DefaultUrl + "/api/subscriptionPlan/SoftDelete",
            row
          );
          if (res) {
            setSubscriptions((prev) =>
              prev.filter((item) => item._id !== row._id)
            );
            openNotificationSuccess(
              "success",
              "topRight",
              "Plan Deleted",
              "Subscription plan is deleted successfully"
            );
          }
        } catch (error) {
          console.log("Something went wrong:", error);
          openNotificationSuccess(
            "error",
            "topRight",
            "Delete Failed",
            "An error occurred while deleting the subscription plan."
          );
        } finally {
          setLoading(false);
        }
      },
    });
  };

  let changeStatus = async (row, status) => {
    try {
      setLoading(true);
      let data = JSON.parse(JSON.stringify(row));
      data.isActive = !data.isActive;
      let res = await PatchAxios(
        DefaultUrl + "/api/subscriptionPlan/Update",
        data
      );
      if (res) {
        setSubscriptions((prev) =>
          prev.map((item) => (item._id === data._id ? res : item))
        );
        openNotificationSuccess(
          "success",
          "topRight",
          "Plan is Updated",
          "Subscription plan is updated"
        );
      }
    } catch (error) {
      console.log("Something went wrong:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        error?.response?.data?.error || "Some thing went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  let Nav = useNavigate();

  return (
    <div className="container-fluid All_Client reportSection">
      <ModalComponent
        modalObject={modalObject}
        setFlagState={setFlagState}
        flagState={flagState}
      >
        <SubscriptionForms />
      </ModalComponent>

      <div className="row justify-content-center">
        <div className="col-md-10 py-3" style={{ minHeight: "76vh" }}>
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="PoppinsFamily green_Text fw-bold fs-4">
                  All Subscriptions
                </h5>
                <div className="d-flex align-items-center">
                  <Button
                    className="me-2"
                    onClick={() => CallBack("", "", "newSubscription")}
                  >
                    Add Subscription
                  </Button>
                </div>
                <div className="d-flex align-items-center">
                  <Button
                    className="me-2"
                    onClick={() => Nav("/SuperAdmin/Stripe_Test")}
                  >
                    Strip Subscriptions
                  </Button>
                </div>
              </div>

              <AntTableDynamicReportTable
                dataSource={subscriptions}
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

export default AllSubscriptions;
