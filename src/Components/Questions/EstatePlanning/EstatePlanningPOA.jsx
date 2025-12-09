import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  defaultUrl,
  QuestionDetail,
  PersonalDetailsData,
} from "../../../Store/Store";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
} from "../../Assets/Api/Api";
import { AntdCreatableMultiSelect } from "../FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import { Tooltip } from "antd";
import { FaCircleQuestion } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import Executor from "./Executor";
const AntDTableHOC = DynamicTableForInputsSection("antd");

const EstatePlanningPOA = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let personalDetailObj = useRecoilValue(PersonalDetailsData);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  let [UserStatus] = useState(localStorage.getItem("UserStatus"));
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  let POA =
    Object.keys(questionDetail.POA || {}).length > 0
      ? questionDetail.POA
      : {
          client: {},
          partner: {},
          joint: {},
          owner: [],
        };

  let initialValues = {
    owner: [],
    client: {
      POAType: "",
      yearSetUp: "",
      POAName: [],
    },
    partner: {
      POAType: "",
      yearSetUp: "",
      POAName: [],
    },
  };

  const fillInitialValues = (setFieldValue) => {
    if (POA && POA.clientFK) {
      setFieldValue("owner", POA.owner || []);

      if (POA.owner?.includes("client") || POA.owner?.includes("together")) {
        setFieldValue("client.POAType", POA.client?.POAType || "");
        setFieldValue("client.yearSetUp", POA.client?.yearSetUp || "");
        setFieldValue("client.POAName", POA.client?.POAName || []);
      }

      if (POA.owner?.includes("partner") && UserStatus === "Married") {
        setFieldValue("partner.POAType", POA.partner?.POAType || "");
        setFieldValue("partner.yearSetUp", POA.partner?.yearSetUp || "");
        setFieldValue("partner.POAName", POA.partner?.POAName || []);
      }
    } else {
      props.setIsEditing(true);
    }
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    let obj = { ...values };
    obj.clientFK = localStorage.getItem("UserID");

    if (values.owner.includes("client") || values.owner.includes("together")) {
      obj.clientTotal = "Yes";
      // Ensure DOB is formatted correctly for API
    } else {
      obj.clientTotal = "No";
      obj.client = {};
    }

    if (values.owner.includes("partner")) {
      obj.partnerTotal = "Yes";

      // Copy client values to partner if "together" is selected
      if (values.owner.includes("together")) {
        obj.partner = { ...obj.client };
      }
    } else {
      obj.partnerTotal = "No";
      obj.partner = {};
    }

    if (UserStatus !== "Married") {
      obj.partnerTotal = "";
      obj.partner = {};
    }

    console.log("Final obj:", obj);

    try {
      let res;
      if (!POA.clientFK) {
        res = await PostAxios(`${DefaultUrl}/api/POA/Add`, obj);
      } else {
        res = await PatchAxios(`${DefaultUrl}/api/POA/Update`, obj);
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, POA: res };
        setQuestionDetail(updatedData);
        openNotificationSuccess(
          "success",
          "topRight",
          "Success Notification",
          `Data of "${props.modalObject?.title || "POA"}" is Saved`
        );
        if (props.flagState) {
          props.setFlagState(false);
          props.setIsEditing(!props.isEditing);
        }
      }
    } catch (error) {
      console.error(
        "API error details:",
        error.response?.data || error.message
      );
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Data of "${props.modalObject?.title || "POA"}" is not Saved: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const options = !["Single", "Widowed"].includes(
    personalDetailObj.client?.MaritalStatus
  )
    ? [
        {
          value: "client",
          label: personalDetailObj.client?.clientPreferredName || "Client",
        },
        {
          value: "partner",
          label: personalDetailObj.partner?.partnerPreferredName || "Partner",
        },
      ]
    : [
        {
          value: "client",
          label: personalDetailObj.client?.clientPreferredName || "Client",
        },
      ];

  const handleInnerModal = (title, values, key, stackHolder) => {
    if (!values) {
      console.error("Values is undefined in handleInnerModal");
      return;
    }
    setModalObject({
      title: title + " for " + RenderName(stackHolder.replace(".", "")),
      key,
      values, // ✅ correct property
      stackHolder, // ✅ correct key name expected by DynamicDescription
      question: `Number of ${key === "POAName" ? "Power of Attorney's " : ""}:`,
    });
    setFlagState(true);
  };

  const columns = [
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      type: "text",
      placeholder: "Enter Owner Name",
      width: 150,
    },
    {
      title: "POA Type",
      dataIndex: "POAType",
      key: "POAType",
      type: "select",
      placeholder: "Select POA Type",
      width: 150,
      options: [
        { value: "Enduring", label: "Enduring" },
        { value: "Financial & Personal", label: "Financial & Personal" },
        { value: "Medical Decision Maker", label: "Medical Decision Maker" },
        { value: "Limited", label: "Limited" },
        { value: "Other", label: "Other" },
      ],
    },
    {
      title: "Year Set Up",
      dataIndex: "yearSetUp",
      key: "yearSetUp",
      type: "number",
      placeholder: "Enter Year Set Up",
      width: 150,
    },
    {
      title: "Name of POA",
      dataIndex: "POAName",
      key: "POAName",
      type: "modal",
      width: 150,
      handleInnerModal,
      innerModalTitle: "Name of POA",
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        const tableData = useMemo(() => {
          const rows = [];

          if (values.owner.includes("client")) {
            rows.push({
              key: "client",
              stakeHolder: "client",
              owner: RenderName("client"),
              POAType: values?.client?.POAType || "",
              yearSetUp: values?.client?.yearSetUp || "",
              POAName: values?.client?.POAName.length || "",
            });
          }

          if (values.owner.includes("partner") && UserStatus === "Married") {
            rows.push({
              key: "partner",
              stakeHolder: "partner",
              owner: RenderName("partner"),
              POAType: values?.partner?.POAType || "",
              yearSetUp: values?.partner?.yearSetUp || "",
              POAName: values?.partner?.POAName.length || "",
            });
          }

          return rows;
        }, [values]);

        return (
          <Form>
            <div className="row">
              <InnerModal
                modalObject={modalObject}
                setFieldValue={setFieldValue}
                setFlagState={setFlagState}
                flagState={flagState}
                setIsEditing={props.setIsEditing}
              >
                {modalObject.key === "POAName" ? <Executor /> : null}
              </InnerModal>

              <div className="col-md-12">
                <div className="d-flex flex-row justify-content-center align-items-center gap-4">
                  <label
                    htmlFor=""
                    className="text-end"
                    onClick={() => {
                      console.log(values);
                    }}
                  >
                    Owner
                  </label>
                  <div style={{ minWidth: "200px" }}>
                    <Field
                      name="owner"
                      component={AntdCreatableMultiSelect}
                      options={options}
                      onChangefun={(selection) => {
                        console.log("Selected owner:", selection);
                        const selectionArray = selection.target.value || [];
                        const hasTogether = selectionArray.some(
                          (item) => item === "together"
                        );
                        if (hasTogether) {
                          setFieldValue("owner", ["together"]);
                        }
                      }}
                    />
                  </div>
                  {values.owner.includes("together") && (
                    <Tooltip
                      placement="top"
                      title={
                        "When yes is selected for Partner for POA, details from Client Answers for POA will be copied to Partner when client and partner have a POA together."
                      }
                    >
                      <FaCircleQuestion
                        style={{ fontSize: "18px", cursor: "pointer" }}
                      />
                    </Tooltip>
                  )}
                </div>
              </div>

              {values.owner.length > 0 && (
                <div className="col-md-12">
                  <div className="mt-4 All_Client reportSection">
                    <AntDTableHOC
                      columns={columns}
                      data={tableData}
                      values={values}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      isEditing={props?.isEditing}
                      setIsEditing={props?.setIsEditing}
                    />
                  </div>
                </div>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EstatePlanningPOA;
