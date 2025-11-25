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
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import DynamicDescription from "./DynamicDescription";
import { AntdCreatableMultiSelect } from "../FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import { Tooltip } from "antd";
import { FaCircleQuestion } from "react-icons/fa6";
import Executor from "./Executor";

const AntDTableHOC = DynamicTableForInputsSection("antd");

const EstatePlanningWill = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const personalDetailObj = useRecoilValue(PersonalDetailsData);
  const [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  const [UserStatus] = useState(localStorage.getItem("UserStatus"));
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});
  const DefaultUrl = useRecoilValue(defaultUrl);

  const will =
    Object.keys(questionDetail.will || {}).length > 0
      ? questionDetail.will
      : { client: {}, partner: {}, joint: {}, owner: [] };

  const initialValues = { owner: [] };

  const fillInitialValues = (setFieldValue) => {
    if (will && will.clientFK) {
      setFieldValue("owner", will.owner || []);

      if (will.owner?.includes("client") || will.owner?.includes("together")) {
        setFieldValue("client.yearSetUp", will.client?.yearSetUp || "");
        setFieldValue("client.willsCurrent", will.client?.willsCurrent || "");
        setFieldValue("client.executor", will.client?.executor || []);
        setFieldValue(
          "client.enduringGuardianship",
          will.client?.enduringGuardianship || ""
        );
        setFieldValue(
          "client.testamentaryTrust",
          will.client?.testamentaryTrust || ""
        );
        setFieldValue(
          "client.estatePlanningRadio",
          will.client?.estatePlanningRadio || ""
        );
        setFieldValue(
          "client.estatePlanning",
          will.client?.estatePlanning || []
        );
      }

      if (will.owner?.includes("partner")) {
        setFieldValue("partner.yearSetUp", will.partner?.yearSetUp || "");
        setFieldValue("partner.willsCurrent", will.partner?.willsCurrent || "");
        setFieldValue("partner.executor", will.partner?.executor || []);
        setFieldValue(
          "partner.enduringGuardianship",
          will.partner?.enduringGuardianship || ""
        );
        setFieldValue(
          "partner.testamentaryTrust",
          will.partner?.testamentaryTrust || ""
        );
        setFieldValue(
          "partner.estatePlanningRadio",
          will.partner?.estatePlanningRadio || ""
        );
        setFieldValue(
          "partner.estatePlanning",
          will.partner?.estatePlanning || []
        );
      }
    }
  };

  // ✅ Fixed: modalObject now passes correct keys expected by DynamicDescription
  const handleInnerModal = (title, values, key, stackHolder) => {
    if (!values) {
      console.error("Values is undefined in handleInnerModal");
      return;
    }

    let question =
      key === "executor" ? `Number of Executors:` : `Number of Estate Plannes:`;

    setModalObject({
      title,
      key,
      values, // ✅ correct property
      stackHolder, // ✅ correct key name expected by DynamicDescription
      question,
    });
    setFlagState(true);
  };

  const onSubmit = async (values) => {
    console.log("EstatePlanningWill onSubmit values:", values);
    const DataOf = props.modalObject?.key || "will";
    const obj = { ...values, clientFK: localStorage.getItem("UserID") };

    if (values.owner.includes("client") || values.owner.includes("together")) {
      obj.clientTotal = "Yes";
    } else {
      obj.clientTotal = "No";
      obj.client = {};
    }

    if (values.owner.includes("partner") || values.owner.includes("together")) {
      obj.partnerTotal = "Yes";
    } else {
      obj.partnerTotal = "No";
      obj.partner = {};
    }

    if (UserStatus !== "Married") {
      obj.partnerTotal = "";
      obj.partner = {};
    }

    console.log("Final obj:", obj, DataOf);

    try {
      let res;
      if (!will.clientFK) {
        res = await PostAxios(`${DefaultUrl}/api/will/Add`, obj);
      } else {
        res = await PatchAxios(`${DefaultUrl}/api/will/Update`, obj);
      }

      if (res) {
        const updatedData = { ...questionDetail, [DataOf]: res };
        setQuestionDetail(updatedData);
        openNotificationSuccess(
          "success",
          "topRight",
          "Success Notification",
          `Data of "${props.modalObject?.title || "Will"}" is Saved`
        );
        if (props.flagState) {
          props.setFlagState(false);
          props.setIsEditing(!props.isEditing);
        }
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Data of "${
          props.modalObject?.title || "Will"
        }" is not Saved. Please try again.`
      );
    }
  };

  const options =
    UserStatus === "Married"
      ? [
          {
            value: "client",
            label: personalDetailObj.client?.clientPreferredName || "Client",
          },
          {
            value: "partner",
            label: personalDetailObj.partner?.partnerPreferredName || "Partner",
          },
          { value: "together", label: `Together(${RenderName("joint")})` },
        ]
      : [
          {
            value: "client",
            label: personalDetailObj.client?.clientPreferredName || "Client",
          },
        ];

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
      title: "Year Set Up",
      dataIndex: "yearSetUp",
      key: "yearSetUp",
      type: "number",
      placeholder: "Enter Year Set Up",
      width: 150,
      disabled: (values, stakeHolder) =>
        values.owner.includes("together") && stakeHolder === "partner",
    },
    {
      title: "Are Your Wills Current",
      dataIndex: "willsCurrent",
      key: "willsCurrent",
      type: "yesno",
      width: 100,

      disabled: (values, stakeHolder) =>
        values.owner.includes("together") && stakeHolder === "partner",
    },
    {
      title: "Executor",
      dataIndex: "executor",
      key: "executor",
      type: "modal",
      width: 150,
      handleInnerModal,
      innerModalTitle: "Executor",
    },
    {
      title: "Enduring Guardianship",
      dataIndex: "enduringGuardianship",
      key: "enduringGuardianship",
      type: "yesno",
      width: 100,

      disabled: (values, stakeHolder) =>
        values.owner.includes("together") && stakeHolder === "partner",
    },
    {
      title: "Testamentary Trust",
      dataIndex: "testamentaryTrust",
      key: "testamentaryTrust",
      type: "yesno",
      width: 100,

      disabled: (values, stakeHolder) =>
        values.owner.includes("together") && stakeHolder === "partner",
    },
    {
      title: "Estate Planning Requirements",
      dataIndex: "estatePlanningRadio",
      key: "estatePlanning",
      type: "yesnoModal",
      width: 170,
      handleInnerModal,
      callBack: true,
      func: handleInnerModal,
      innerModalTitle: "Estate Planning",
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

          const owners = values.owner || [];
          const ownerConfigs = [
            {
              key: "client",
              label: "client",
              condition: owners.includes("client"),
            },
            {
              key: "partner",
              label: "partner",
              condition: owners.includes("partner") && UserStatus === "Married",
            },
            {
              key: "client",
              label: "joint",
              condition:
                owners.includes("together") && UserStatus === "Married",
            },
          ];

          ownerConfigs.forEach(({ key, label, condition }) => {
            if (!condition) return;

            const target = key === "joint" ? values.client : values[key]; // joint uses client values as before

            rows.push({
              key,
              stakeHolder: key,
              owner: RenderName(label),
              yearSetUp: target?.yearSetUp || "",
              willsCurrent: target?.willsCurrent || "",
              executor: target?.executor?.length || "",
              enduringGuardianship: target?.enduringGuardianship || "",
              testamentaryTrust: target?.testamentaryTrust || "",
              estatePlanningRadio: target?.estatePlanningRadio || "",
            });
          });

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
                {modalObject.key === "executor" ||
                modalObject.key === "estatePlanning" ? (
                  <Executor />
                ) : null}
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
                      title="When yes is selected for Partner for Wills and POA have an option to copy details from Client Answers for Will and POA this will apply for when client and partner have a Will together."
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

export default EstatePlanningWill;
