import { CashFlowUserDetailsCard } from "./CashFlowUserDetailsCard";
import React from "react";
import { Accordion, Button, Table } from "react-bootstrap";
import { MdMale, MdCake, MdAdd, MdEdit } from "react-icons/md";
import {
  FaArrowRotateRight,
  FaClipboardList,
  FaFileLines,
  FaGear,
  FaLock,
  FaRegCopy,
  FaRing,
} from "react-icons/fa6";

import single from "../../Components/Svgs/single-2.svg";
import couple from "../../Components/Svgs/couple-2.svg";
import {
  ConvertDate,
  ConvertDate2,
  DeleteAxios,
  openNotificationSuccess,
  PatchAxios,
} from "../../Components/Assets/Api/Api";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { content } from "../../Content/Content";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CashFlowData,
  CashFlowLastSyncAt,
  CashFlowScenarioData,
  CashFlowScenarioType,
  CFQObject,
  defaultUrl,
  PersonalDetailsData,
  QuestionDetail,
  SelectedSenario,
} from "../../Store/Store";
import AntTableDynamicReportTable from "../../Components/Assets/Table/AntTableDynamicReportTable";

const AccordionItems = ({
  client,
  partner,
  tableData,
  index,
  fullData,
  CallBack,
}) => {
  let [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail); // eslint-disable-line no-unused-vars
  let [PersonalDetailObj, setPersonalDetailObj] =
    useRecoilState(PersonalDetailsData); // eslint-disable-line no-unused-vars
  let [cashFlowScenarioData, setCashFlowScenarioData] =
    useRecoilState(CashFlowScenarioData); // eslint-disable-line no-unused-vars
  let [cashFlowScenarioType, setCashFlowScenarioType] =
    useRecoilState(CashFlowScenarioType); // eslint-disable-line no-unused-vars
  let [selectedSenario, setSelectedSenario] = useRecoilState(SelectedSenario); // eslint-disable-line no-unused-vars
  let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData); // eslint-disable-line no-unused-vars
  let [CFObject, setCFObject] = useRecoilState(CFQObject); // eslint-disable-line no-unused-vars
  const [cashFlowLastSyncAt, setCashFlowLastSyncAt] =
    useRecoilState(CashFlowLastSyncAt);

  let DefaultUrl = useRecoilValue(defaultUrl);

  let Nav = useNavigate();

  let { cashFlow } = content;

  async function menuClicked(fullData, row, operation) {
    localStorage.setItem("ScenarioObj", JSON.stringify(row));

    setQuestionDetail({});
    setPersonalDetailObj({});
    setCashFlowScenarioData({});
    setCashFlowScenarioType("");
    setCFObject({});

    switch (operation) {
      case "Edit":
      case "Update":
        setCashFlowLastSyncAt(row.lastSyncAt);
        if (row?.lastModuleEdited && row.lastModuleEdited !== "") {
          const route = cashFlow.find(
            (module) => module.subTitle === row.lastModuleEdited
          )?.route;

          if (route) {
            Nav("/user/cashflow" + route);
          } else {
            setSelectedSenario(row);
            Nav("/user/cashflow/personal-detail" + "#" + row._id);
          }
        } else {
          setSelectedSenario(row);
          Nav("/user/cashflow/personal-detail" + "#" + fullData._id);
        }
        break;

      case "lock":
        try {
          const lockData = await PatchAxios(
            DefaultUrl + "/api/CF/scenario/lockedScenario/" + row._id
          );

          if (lockData) {
            console.log(lockData);

            setCashFlowData((prevData) => {
              if (prevData && Array.isArray(prevData.Scenarios)) {
                const updatedScenarios = prevData.Scenarios.map((item) =>
                  item._id === row._id ? lockData : item
                );
                return {
                  ...prevData,
                  Scenarios: updatedScenarios,
                };
              }
              console.error(
                "Scenarios is not an array or cashFlowData is invalid. Resetting state."
              );
              return { ...prevData, Scenarios: [] }; // Fallback if something is wrong
            });

            openNotificationSuccess(
              "success",
              "topRight",
              "Success Notification",
              "Scenario successfully locked"
            );
          } else {
            console.log("Failed to lock the scenario. Please try again.");
            openNotificationSuccess(
              "error",
              "topRight",
              "Error Notification",
              "Something went wrong! Please try again later."
            );
          }
        } catch (error) {
          console.log(
            "An error occurred while locking the scenario: " + error.message
          );
          openNotificationSuccess(
            "error",
            "topRight",
            "Error Notification",
            "Something went wrong! Please try again later."
          );
        }

        break;

      case "delete":
        if (row.isLocked) {
          openNotificationSuccess(
            "error",
            "topRight",
            "Error Notification",
            "Please! contact Super-admin to perform this action"
          );
          return false;
        }

        try {
          let deleteData = await DeleteAxios(
            DefaultUrl + "/api/CF/scenario/softDelete/" + row._id
          );

          if (deleteData) {
            console.log(deleteData);

            setCashFlowData((prevData) => {
              if (prevData && Array.isArray(prevData.Scenarios)) {
                const updatedScenarios = prevData.Scenarios.filter(
                  (item) => item._id !== row._id
                );
                return {
                  ...prevData,
                  Scenarios: updatedScenarios,
                };
              }
              console.error(
                "Scenarios is not an array or cashFlowData is invalid. Resetting state."
              );
              return { ...prevData, Scenarios: [] }; // Fallback if something is wrong
            });

            openNotificationSuccess(
              "success",
              "topRight",
              "Success Notification",
              "Scenario successfully deleted"
            );
          } else {
            console.log("Failed to delete the scenario. Please try again.");
            openNotificationSuccess(
              "error",
              "topRight",
              "Error Notification",
              "Something went wrong! Please try again later."
            );
          }
        } catch (error) {
          console.log(
            "An error occurred while deleting the scenario: " + error.message
          );
          openNotificationSuccess(
            "error",
            "topRight",
            "Error Notification",
            "Something went wrong! Please try again later."
          );
        }

        break;

      default:
        break;
    }
  }

  const getMenu = (row) => (
    <Menu
      className={
        row.isLocked ? "ClearDropDownSpanSingle" : "ClearDropDownSpanDouble"
      }
    >
      {!row.isLocked && (
        <React.Fragment>
          <Menu.Item
            key="1"
            icon={<FaEdit />}
            onClick={() => menuClicked(fullData, row, "Edit")}
          >
            {" "}
            Edit{" "}
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<FaEdit />}
            onClick={() => CallBack(fullData, row, "Edit")}
          >
            Edit Name{" "}
          </Menu.Item>
        </React.Fragment>
      )}

      {row.isLocked && (
        <Menu.Item
          key="1"
          icon={<FaFileLines />}
          onClick={() => menuClicked(fullData, row, "Edit")}
        >
          {" "}
          View{" "}
        </Menu.Item>
      )}
      <Menu.Item
        key="5"
        icon={<FaRegCopy />}
        onClick={() => CallBack(fullData, row, "duplicate")}
      >
        Duplicate{" "}
      </Menu.Item>

      {!row.isLocked && (
        <Menu.Item
          key="4"
          icon={<FaLock />}
          onClick={() => menuClicked(fullData, row, "lock")}
        >
          Lock{" "}
        </Menu.Item>
      )}
      <Menu.Item
        key="6"
        icon={<FaTrashAlt />}
        className="custom-danger-option"
        onClick={() => menuClicked(fullData, row, "delete")}
      >
        Delete{" "}
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "No#",
      key: "index",
      render: (text, row, index) => index + 1,
      width: 60,
    },
    {
      title: "Scenario",
      key: "scenarioName",
      dataIndex: "scenarioName",
      render: (text) => text || "--",
    },
    {
      title: "Last Module Edited",
      key: "lastModuleEdited",
      dataIndex: "lastModuleEdited",
      render: (text) => text || "Not Available",
    },

    {
      title: "Date of Creation",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (text) => ConvertDate(text) || "--",
    },
    {
      title: "Last Syncronized At",
      key: "lastSyncAt",
      dataIndex: "lastSyncAt",
      render: (text) => ConvertDate(text) || "--",
    },
    {
      title: "Operation",
      key: "operation",
      render: (text, row) => (
        <div className="w-100 d-flex justify-content-center align-items-center">
          <Dropdown overlay={getMenu(row)} trigger={["click"]}>
            {row.isLocked ? (
              <div style={{ position: "relative", display: "inline-block" }}>
                <FaGear size={20} />
                <FaLock
                  size={10}
                  style={{
                    position: "absolute",
                    top: "75%",
                    left: "95%",
                    transform: "translate(-50%, -50%)",
                    border: "20px solid inherit",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    color: "#ac0202",
                  }}
                />
              </div>
            ) : (
              <FaGear size={20} />
            )}
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <Accordion.Item eventKey={index}>
      <Accordion.Header>
        {client.clientGivenName} Age#{client.clientAge}
      </Accordion.Header>
      <Accordion.Body>
        <div className="w-100">
          <div className="row justify-content-center">
            {/* Client Card */}
            <CashFlowUserDetailsCard
              single={single}
              data={client}
              dataOf={"client"}
              ConvertDate={ConvertDate}
            />

            {/* Partner Card */}
            {client.clientMaritalStatus !== "Single" &&
              client.clientMaritalStatus !== "Widowed" &&
              partner && (
                <CashFlowUserDetailsCard
                  single={single}
                  data={partner}
                  dataOf={"partner"}
                  ConvertDate={ConvertDate}
                />
              )}

            <div className="col-md-12 mt-3">
              <div className="row justify-content-between ">
                <div className="pt-2 " style={{ width: "fit-content" }}>
                  <h5 className="fw-bold">Scenario List :</h5>
                </div>
                <div style={{ width: "fit-content" }}>
                  <button
                    className="btn bgColor modalBtn"
                    onClick={() => {
                      CallBack(fullData, {}, "New");
                    }}
                  >
                    {" "}
                    Add New <MdAdd />{" "}
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            {tableData.length > 0 && (
              <div className="col-md-12">
                <div className="mt-4 All_Client reportSection">
                  <AntTableDynamicReportTable
                    dataSource={tableData.reverse()}
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
            )}
          </div>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default AccordionItems;
