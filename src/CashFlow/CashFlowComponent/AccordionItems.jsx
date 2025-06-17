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
  CashFlowScenarioData,
  CashFlowScenarioType,
  CFQObject,
  defaultUrl,
  PersonalDetailsData,
  QuestionDetail,
  SelectedSenario,
} from "../../Store/Store";

const AccordionItems = ({
  client,
  partner,
  tableData,
  index,
  fullData,
  CallBack,
}) => {
  let [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);
  let [PersonalDetailObj, setPersonalDetailObj] =
    useRecoilState(PersonalDetailsData);
  let [cashFlowScenarioData, setCashFlowScenarioData] =
    useRecoilState(CashFlowScenarioData);
  let [cashFlowScenarioType, setCashFlowScenarioType] =
    useRecoilState(CashFlowScenarioType);
  let [selectedSenario, setSelectedSenario] = useRecoilState(SelectedSenario);
  let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  let [CFObject, setCFObject] = useRecoilState(CFQObject);

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
        if (row?.lastModuleEdited && row.lastModuleEdited !== "") {
          const route = cashFlow.find(
            (module) => module.subTitle === row.lastModuleEdited
          )?.route;

          if (route) {
            Nav("/Cash-Flow" + route);
          } else {
            setSelectedSenario(row);
            Nav("/Cash-Flow/PersonalDetail" + "#" + row._id);
          }
        } else {
          setSelectedSenario(row);
          Nav("/Cash-Flow/PersonalDetail" + "#" + fullData._id);
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
        onClick={() => menuClicked(fullData, row, "delete")}
      >
        Delete{" "}
      </Menu.Item>
    </Menu>
  );

  return (
    <Accordion.Item eventKey={index}>
      <Accordion.Header>
        {client.clientGivenName} Age#{client.clientAge}
      </Accordion.Header>
      <Accordion.Body>
        <div className="w-100">
          <div className="row">
            {/* Client Card */}
            <div className="col-md-6">
              <div className="card w-100 rounded shadow-sm bg-Custom-green text-dark p-4">
                <div className="row g-3">
                  {/* Client Column 1 */}
                  <div className="col-12 col-md-8">
                    <div className="row align-items-center">
                      <div className="col-2">
                        <img
                          alt="Single"
                          className="img-fluid"
                          src={single} // Update this to the image source
                          style={{ height: "18px", width: "18px" }}
                        />
                      </div>
                      <div className="col fw-bold">
                        {client.clientGivenName}
                      </div>
                    </div>
                    <div className="row align-items-center mt-2">
                      <div className="col-2">
                        <MdMale size={20} />
                      </div>
                      <div className="col fw-bold">{client.clientGender}</div>
                    </div>
                    <div className="row align-items-center mt-2">
                      <div className="col-2">
                        <MdCake size={20} />
                      </div>
                      <div className="col fw-bold">
                        {ConvertDate(client.clientDOB)}
                      </div>
                    </div>
                  </div>

                  {/* Client Column 2 */}
                  <div className="col-12 col-md-4">
                    <div className="row align-items-center">
                      <div className="col-2">
                        <FaArrowRotateRight size={20} />
                      </div>
                      <div className="col fw-bold">{client.clientAge}</div>
                    </div>
                    <div className="row align-items-center mt-2">
                      <div className="col-2">
                        <FaRing size={20} />
                      </div>
                      <div className="col fw-bold">
                        {client.clientMaritalStatus}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Partner Card */}
            {partner && (
              <div className="col-md-6">
                <div className="card w-100 rounded shadow-sm bg-Custom-green text-dark p-4">
                  <div className="row g-3">
                    {/* Partner Column 1 */}
                    <div className="col-12 col-md-8">
                      <div className="row align-items-center">
                        <div className="col-2">
                          <img
                            alt="Partner"
                            className="img-fluid"
                            src={couple} // Update this to the partner image source
                            style={{ height: "18px", width: "18px" }}
                          />
                        </div>
                        <div className="col fw-bold">
                          {partner.partnerGivenName}
                        </div>
                      </div>
                      <div className="row align-items-center mt-2">
                        <div className="col-2">
                          <MdMale size={20} />
                        </div>
                        <div className="col fw-bold">
                          {partner.partnerGender}
                        </div>
                      </div>
                      <div className="row align-items-center mt-2">
                        <div className="col-2">
                          <MdCake size={20} />
                        </div>
                        <div className="col fw-bold">
                          {ConvertDate(partner.partnerDOB)}
                        </div>
                      </div>
                    </div>

                    {/* Partner Column 2 */}
                    <div className="col-12 col-md-4">
                      <div className="row align-items-center">
                        <div className="col-2">
                          <FaArrowRotateRight size={20} />
                        </div>
                        <div className="col fw-bold">{partner.partnerAge}</div>
                      </div>
                      <div className="row align-items-center mt-2">
                        <div className="col-2">
                          <FaRing size={20} />
                        </div>
                        <div className="col fw-bold">
                          {partner.partnerMaritalStatus}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="col-md-12 mt-3">
              <div className="row justify-content-between ">
                <div className="pt-2" style={{ width: "fit-content" }}>
                  <h5>Scenario List :</h5>
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
                <div className="mt-4">
                  <Table striped bordered responsive hover>
                    <thead>
                      <tr>
                        <th>No#</th>
                        <th>Scenario</th>
                        <th>Last Module Edited</th>
                        <th>Date of Creation</th>
                        <th>Date of Update</th>
                        <th>Operation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, index) => (
                        <tr key={index}>
                          <td>{index + 1} </td>
                          <td>{row.scenarioName}</td>
                          <td>{row.lastModuleEdited || "not Available"}</td>
                          <td>{ConvertDate(row.createdAt)}</td>
                          <td>{ConvertDate(row.updatedAt)}</td>
                          <td>
                            <Dropdown
                              overlay={getMenu(row)}
                              trigger={["click"]}
                            >
                              {row.isLocked ? (
                                <div
                                  style={{
                                    position: "relative",
                                    display: "inline-block",
                                  }}
                                >
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
                                      backgroundColor: "white", // Optional for better visibility
                                      color: "#ac0202",
                                    }}
                                  />
                                </div>
                              ) : (
                                <FaGear size={20} />
                              )}
                            </Dropdown>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
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
