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
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import { AntdCreatableMultiSelect } from "../FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";

const AntdTable = DynamicTableForInputsSection("antd");

const SoleTrader = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [, setQuestionDetail] = useRecoilState(QuestionDetail);

  const [UserStatus] = useState(localStorage.getItem("UserStatus"));

  const incomeFromSoleTrader =
    questionDetail?.incomeFromSoleTrader &&
    Object.keys(questionDetail.incomeFromSoleTrader).length > 0
      ? questionDetail.incomeFromSoleTrader
      : {
          client: {},
          partner: {},
          joint: {},
        };

  const initialValues = {
    owner: [],
    client: {
      businessName: "",
      ABN: "",
      businessAddress: "",
      netBusinessIncome: "",
      goodWill: "",
    },
    partner: {
      businessName: "",
      ABN: "",
      businessAddress: "",
      netBusinessIncome: "",
      goodWill: "",
    },
  };

  const fillInitialValues = (setFieldValue) => {
    const data = incomeFromSoleTrader;
    if (data && data._id) {
      setFieldValue("owner", data.owner || []);

      if (
        Array.isArray(data.owner)
          ? data.owner.includes("client")
          : (data.owner || "").includes("client")
      ) {
        if (data.client && Object.keys(data.client).length) {
          setFieldValue("client.businessName", data.client.businessName || "");
          setFieldValue("client.ABN", data.client.ABN || "");
          setFieldValue(
            "client.businessAddress",
            data.client.businessAddress || ""
          );
          setFieldValue(
            "client.netBusinessIncome",
            data.client.netBusinessIncome || ""
          );
          setFieldValue("client.goodWill", data.client.goodWill || "");
        }
      }

      if (
        (Array.isArray(data.owner)
          ? data.owner.includes("partner")
          : (data.owner || "").includes("partner")) &&
        UserStatus === "Married"
      ) {
        if (data.partner && Object.keys(data.partner).length) {
          setFieldValue(
            "partner.businessName",
            data.partner.businessName || ""
          );
          setFieldValue("partner.ABN", data.partner.ABN || "");
          setFieldValue(
            "partner.businessAddress",
            data.partner.businessAddress || ""
          );
          setFieldValue(
            "partner.netBusinessIncome",
            data.partner.netBusinessIncome || ""
          );
          setFieldValue("partner.goodWill", data.partner.goodWill || "");
        }
      }
    }
  };

  const DefaultUrl = useRecoilValue(defaultUrl);

  const onSubmit = async (values) => {
    const obj = { ...values };
    obj.clientFK = localStorage.getItem("UserID");

    if (values.owner.includes("client")) {
      obj.clientTotal = values.client.netBusinessIncome;
    } else {
      obj.client = {};
      obj.clientTotal = "";
    }

    if (values.owner.includes("partner") && UserStatus === "Married") {
      obj.partnerTotal = values.partner.netBusinessIncome;
    } else {
      obj.partner = {};
      obj.partnerTotal = "";
    }

    const bankAccountArray = incomeFromSoleTrader.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/incomeFromSoleTrader/Add`,
          obj
        );
      } else {
        res = await PatchAxios(
          `${DefaultUrl}/api/incomeFromSoleTrader/Update`,
          obj
        );
      }

      if (res) {
        const updatedData = { ...questionDetail, incomeFromSoleTrader: res };
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

  const handleInnerModal = (name, values) => {
    console.log("Opening modal for:", name, values);
  };

  const columns = [
    { title: "Owner", dataIndex: "owner", key: "owner" },
    {
      title: "Business Name",
      dataIndex: "businessName",
      key: "businessName",
      type: "text",
      placeholder: "Business Name",
      width: 200,
    },
    {
      title: "ABN",
      dataIndex: "ABN",
      key: "ABN",
      type: "number",
      placeholder: "ABN",
    },
    {
      title: "Business Address",
      dataIndex: "businessAddress",
      key: "businessAddress",
      type: "text",
      placeholder: "Business Address",
    },
    {
      title: "Net Business Income",
      dataIndex: "netBusinessIncome",
      key: "netBusinessIncome",
      type: "number-toComma",
      placeholder: "Net Business Income",
    },
    {
      title: "Goodwill/Business Valuation",
      dataIndex: "goodWill",
      key: "goodWill",
      type: "number-toComma",
      placeholder: "GoodWill Business Valuation",
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

        const dataRows = [
          ...(values.owner.includes("client")
            ? [
                {
                  key: "client",
                  owner: RenderName("client"),
                  stakeHolder: "client",
                  businessName: values.client?.businessName || "",
                  ABN: values.client?.ABN || "",
                  businessAddress: values.client?.businessAddress || "",
                  netBusinessIncome: values.client?.netBusinessIncome || "",
                  goodWill: values.client?.goodWill || "",
                },
              ]
            : []),
          ...(values.owner.includes("partner") && UserStatus === "Married"
            ? [
                {
                  key: "partner",
                  owner: RenderName("partner"),
                  stakeHolder: "partner",
                  businessName: values.partner?.businessName || "",
                  ABN: values.partner?.ABN || "",
                  businessAddress: values.partner?.businessAddress || "",
                  netBusinessIncome: values.partner?.netBusinessIncome || "",
                  goodWill: values.partner?.goodWill || "",
                },
              ]
            : []),
        ];

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <div className="d-flex justify-content-center align-items-center gap-4">
                      <label htmlFor="" className="text-end ">
                        Owner
                      </label>

                      <div style={{ minWidth: "200px" }}>
                        <Field
                          name={`owner`}
                          component={AntdCreatableMultiSelect}
                          options={optionsForOwner()}
                        />
                      </div>
                    </div>
                  </div>

                  {values.owner.length > 0 && (
                    <div className="mt-4 All_Client reportSection">
                      <AntdTable
                        columns={columns}
                        data={dataRows}
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        handleInnerModal={handleInnerModal}
                        handleSubmit={props?.handleOk}
                        isEditing={props?.isEditing}
                        setIsEditing={props?.setIsEditing}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

function optionsForOwner() {
  const UserStatus = localStorage.getItem("UserStatus");
  const opts = [{ value: "client", label: RenderName("client") }];
  if (UserStatus !== "Single")
    opts.push({ value: "partner", label: RenderName("partner") });
  return opts;
}

export default SoleTrader;
