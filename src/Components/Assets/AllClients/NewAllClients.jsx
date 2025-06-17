import React, { Children, useEffect, useState } from "react";
import {
  AllUsers,
  defaultUrl,
  Loading,
  QuestionDetail,
  SelectedClientDetails,
  StepsStatus,
} from "../../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  deepCloneWithKeys,
  GetAxios,
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

const NewAllClients = (props) => {
  let DefaultUrl = useRecoilValue(defaultUrl);
  const [loading, setLoading] = useRecoilState(Loading);
  const [showFilters, setShowFilters] = useState(false);
  let [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);
  let [stepsStatus, setStepsStatus] = useRecoilState(StepsStatus);
  let [selectedClientDetails, setSelectedClientDetails] = useRecoilState(
    SelectedClientDetails
  );

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

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
      title: "Operations",
      key: "operations",
      render: (text, row, index) => (
        <DropDownOptions
          menuItems={menuItems}
          CallBack={OpenModel}
          heading={row}
          row={row} // ✅ Proper row data
        />
      ),
    },
  ];

  const [PerosnalDetail2, setPersonalDetail] = useRecoilState(AllUsers);
  const PerosnalDetail = useRecoilValue(AllUsers);

  useEffect(() => {
    fetchPersonalDetials();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let fetchPersonalDetials = async () => {
    try {
      setLoading(true);
      let res = await GetAxios(`${DefaultUrl}/api/personalDetails`);
      if (res) {
        let adjustment = deepCloneWithKeys(
          res.map((item, index) => {
            return {
              ...item,
              children: null,
            };
          }),
          "userData"
        );

        setPersonalDetail(adjustment);
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
        Navigate("/PersonalDetail#" + row._id);
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
        <ViewClient />
      </ModalComponent>

      <AntTableDynamicReportTable
        rowSelection={Object.assign({ type: "radio" }, rowSelection)} //This feture is comming up in Next Miled Stone
        dataSource={PerosnalDetail}
        columns={columns}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        pagination={true}
      />
    </div>
  );
};

export default NewAllClients;
