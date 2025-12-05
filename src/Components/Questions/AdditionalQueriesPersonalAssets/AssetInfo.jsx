import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
} from "../../Assets/Api/Api";
import { AntdCreatableMultiSelect } from "../FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const AssetInfo = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

  const [UserStatus] = useState(localStorage.getItem("UserStatus"));

  const initialValues = {
    // owner: []
    owner: props.modalObject?.key === "car" ? [] : ["joint"],
  };

  const fillInitialValues = (setFieldValue) => {
    if (
      questionDetail[props.modalObject.key] &&
      Object.keys(questionDetail[props.modalObject.key] || {}).length >= 0
    ) {
      const data = questionDetail[props.modalObject.key] || {};

      if (Object.keys(data).length > 0) {
        setFieldValue("owner", data.owner || []);

        if (
          data.owner?.includes("client") ||
          data.owner?.includes("client+partner")
        ) {
          if (data?.client && Object.keys(data?.client).length) {
            setFieldValue(
              "client.currentValue",
              data.client.currentValue || ""
            );
            if (props.modalObject.key === "car") {
              setFieldValue("client.modelOfCar", data.client.modelOfCar || "");
            } else if (props.modalObject.key === "otherAssets") {
              setFieldValue(
                "client.description",
                data.client.description || ""
              );
            }
          }
        }

        if (
          data.owner?.includes("partner") ||
          data.owner?.includes("client+partner")
        ) {
          if (data?.partner && Object.keys(data?.partner).length) {
            setFieldValue(
              "partner.currentValue",
              data.partner.currentValue || ""
            );
            if (props.modalObject.key === "car") {
              setFieldValue(
                "partner.modelOfCar",
                data.partner.modelOfCar || ""
              );
            } else if (props.modalObject.key === "otherAssets") {
              setFieldValue(
                "partner.description",
                data.partner.description || ""
              );
            }
          }
        }

        if (data.owner?.includes("joint")) {
          if (data?.joint && Object.keys(data?.joint).length) {
            setFieldValue("joint.currentValue", data.joint.currentValue || "");
            if (props.modalObject.key === "car") {
              setFieldValue("joint.modelOfCar", data.joint.modelOfCar || "");
            } else if (props.modalObject.key === "otherAssets") {
              setFieldValue("joint.description", data.joint.description || "");
            }
          }
        }
      }
    }
  };

  const DefaultUrl = useRecoilValue(defaultUrl);

  const onSubmit = async (values) => {
    const obj = { ...values, clientFK: localStorage.getItem("UserID") };

    if (props.modalObject.title === "Car") {
      if (
        values.owner.includes("client") ||
        values.owner.includes("client+partner")
      ) {
        obj.clientTotal = obj.client?.currentValue;
      } else {
        obj.clientTotal = "";
        obj.client = {};
      }

      if (
        values.owner.includes("partner") ||
        values.owner.includes("client+partner")
      ) {
        obj.partnerTotal = obj.partner?.currentValue;
      } else {
        obj.partnerTotal = "";
        obj.partner = {};
      }
    } else {
      if (values.owner.includes("joint")) {
        obj.jointTotal = obj.joint?.currentValue;
      } else {
        obj.jointTotal = "";
        obj.joint = {};
      }
    }

    if (UserStatus !== "Married") {
      obj.partnerTotal = undefined;
      obj.partner = undefined;
    }

    const bankAccountArray = questionDetail[props.modalObject.key]?._id || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/${props.modalObject.key}/Add`,
          obj
        );
      } else {
        res = await PatchAxios(
          `${DefaultUrl}/api/${props.modalObject.key}/Update`,
          obj
        );
      }

      if (res) {
        const updatedData = {
          ...questionDetail,
          [props.modalObject.key]: res,
        };
        setQuestionDetail(updatedData);
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        `Data of "${props.modalObject.title}" is Saved`
      );

      if (props.flagState) {
        props.setFlagState(false);
        props.setIsEditing(!props.isEditing);
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Data of "${props.modalObject.title}" is not Saved. Please try again.`
      );
    }
  };

  const baseColumns = [];

  if (props.modalObject.title === "Car") {
    baseColumns.push({
      title: "Model of Car",
      dataIndex: "modelOfCar",
      key: "modelOfCar",
      type: "text",
      placeholder: "Model of Car",
    });
  } else if (props.modalObject.title === "Other Assets") {
    baseColumns.push({
      title: "Description",
      dataIndex: "description",
      key: "description",
      type: "text",
      placeholder: "Description",
    });
  }

  baseColumns.push({
    title: "Current Value",
    dataIndex: "currentValue",
    key: "currentValue",
    type: "number-toComma",
    placeholder: "Current Value",
  });

  const columns = [
    { title: "Owner", dataIndex: "owner", key: "owner", type: "label" },
    ...baseColumns,
  ];

  const onlyJoint = ["Boat", "Caravan", "Contents", "Other Assets"];
  // const onlyClient = ["Other Assets"];
  const onlyClient = [];

  const options = onlyJoint.includes(props.modalObject.title)
    ? [{ value: "joint", label: RenderName("joint") }]
    : onlyClient.includes(props.modalObject.title)
    ? [{ value: "client", label: RenderName("client") }]
    : UserStatus !== "Single"
    ? [
        { value: "client", label: RenderName("client") },
        { value: "partner", label: RenderName("partner") },
      ]
    : [{ value: "client", label: RenderName("client") }];

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

        const dataRows = [];

        if (values.owner.includes("client")) {
          dataRows.push({
            key: "client",
            owner: RenderName("client"),
            stakeHolder: "client",
            ...values.client,
          });
        }

        if (values.owner.includes("partner") && UserStatus === "Married") {
          dataRows.push({
            key: "partner",
            owner: RenderName("partner"),
            stakeHolder: "partner",
            ...values.partner,
          });
        }

        if (values.owner.includes("joint")) {
          dataRows.push({
            key: "joint",
            owner: RenderName("joint"),
            stakeHolder: "joint",
            ...values.joint,
          });
        }

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                {/* Owner Selector */}
                {props.modalObject?.key === "car" && (
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                    <label className="text-end mb-0">Owner</label>
                    <div style={{ minWidth: "200px" }}>
                      <Field
                        name="owner"
                        component={AntdCreatableMultiSelect}
                        options={options}
                      />
                    </div>
                  </div>
                )}

                {values.owner.length > 0 && (
                  <div className="mt-4 All_Client reportSection">
                    <AntdTable
                      columns={columns}
                      data={dataRows}
                      values={values}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      handleSubmit={props?.handleOk}
                      isEditing={props?.isEditing}
                      setIsEditing={props?.setIsEditing}
                    />
                  </div>
                )}
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AssetInfo;
