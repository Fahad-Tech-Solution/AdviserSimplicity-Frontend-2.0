import React, { useState } from "react";
import { RenderName } from "../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const GroupCoverDetails = (props) => {
  const [UserStatus] = useState(localStorage.getItem("UserStatus"));

  const columns = [
    {
      title: "No#",
      dataIndex: "index",
      key: "index",
      render: (_, __, i) => i + 1,
      justText: true,
      width: 60,
    },
    {
      title: "Life Insured",
      dataIndex: "lifeInsured",
      key: "lifeInsured",
      selectedOptionValue: true,
      type: "select-antd",
      placeholder: "Select Life Insured",
      options: [
        { value: "Client", label: RenderName("client") },
        ...(UserStatus !== "Single"
          ? [{ value: "Partner", label: RenderName("partner") }]
          : []),
        { value: "Other", label: "Other" },
      ],
      width: 150,
    },
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
      type: "text",
      placeholder: "Provider",
      width: 150,
    },
    {
      title: "Policy no",
      dataIndex: "policyNo",
      key: "policyNo",
      type: "text",
      placeholder: "Policy No",
      width: 150,
    },
    {
      title: "Owner",
      dataIndex: "groupOwner",
      key: "groupOwner",
      type: "select-antd",
      placeholder: "Select Owner",
      options: [
        { value: "Client", label: RenderName("client") },
        ...(UserStatus !== "Single"
          ? [{ value: "Partner", label: RenderName("partner") }]
          : []),
        { value: "SMSF", label: "SMSF" },
        { value: "Super Trustees", label: "Super Trustees" },
        { value: "Company (Pty Ltd)", label: "Company (Pty Ltd)" },
        { value: "Family Trust", label: "Family Trust" },
        { value: "Other", label: "Other" },
      ],
      width: 180,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      type: "antdate",
      placeholder: "dd/mm/yyyy",
      width: 150,
    },
    {
      title: "Smoker",
      dataIndex: "smoker",
      key: "smoker",
      type: "yesno", width: 100,
     
    },
    {
      title: "Life",
      dataIndex: "life",
      key: "life",
      type: "number-toComma",
      placeholder: "Life",
      width: 120,
    },
    {
      title: "TPD",
      dataIndex: "tpd",
      key: "tpd",
      type: "number-toComma",
      placeholder: "TPD",
      width: 120,
    },
    {
      title: "Trauma",
      dataIndex: "trauma",
      key: "trauma",
      type: "number-toComma",
      placeholder: "Trauma",
      disabled:true,
      width: 120,
    },
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
      type: "number-toComma",
      placeholder: "IP",
      width: 120,
    },
    {
      title: "Premium $ p.a",
      dataIndex: "premiumPA",
      key: "premiumPA",
      type: "number-toComma",
      placeholder: "Premium",
      width: 150,
    },
    {
      title: "Loading/Exclusion",
      dataIndex: "loadingExclusion",
      key: "loadingExclusion",
      type: "yesno", width: 100,
      
    },
    {
      title: "Beneficiary",
      dataIndex: "beneficiary",
      key: "beneficiary",
      type: "yesno", width: 100,
      
    },
  ];

  return (
    <>
      <h4 className="mt-1 pt-2" onClick={() => console.log(props?.values)}>
        {props.title || "Group Cover Details"}
      </h4>
      <div className="mt-4 All_Client reportSection">
        <AntdTable
          columns={columns}
          data={props?.groupDataRows}
          values={props?.values}
          setFieldValue={props?.setFieldValue}
          handleChange={props?.handleChange}
          handleBlur={props?.handleBlur}
          isEditing={props?.isEditing}
          setIsEditing={props?.setIsEditing}
        />
      </div>
    </>
  );
};

export default GroupCoverDetails;
