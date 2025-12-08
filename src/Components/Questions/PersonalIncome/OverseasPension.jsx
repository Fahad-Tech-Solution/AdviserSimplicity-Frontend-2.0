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
  toCommaAndDollar,
} from "../../Assets/Api/Api";
import { AntdCreatableMultiSelect } from "../FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const OverseasPension = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [, setQuestionDetail] = useRecoilState(QuestionDetail);

  const [UserStatus] = useState(localStorage.getItem("UserStatus"));

  const incomeFromOverseasPension =
    questionDetail?.incomeFromOverseasPension &&
    Object.keys(questionDetail.incomeFromOverseasPension).length > 0
      ? questionDetail.incomeFromOverseasPension
      : {
          client: {},
          partner: {},
        };

  const initialValues = {
    owner: [],
    client: {
      country: "",
      frequency: "",
      regularPayment: "",
      annualPayment: "",
    },
    partner: {
      country: "",
      frequency: "",
      regularPayment: "",
      annualPayment: "",
    },
  };

  const fillInitialValues = (setFieldValue) => {
    const data = incomeFromOverseasPension;
    if (data && data._id) {
      setFieldValue("owner", data.owner || []);

      if (
        Array.isArray(data.owner)
          ? data.owner.includes("client")
          : (data.owner || "").includes("client")
      ) {
        if (data.client && Object.keys(data.client).length) {
          setFieldValue("client.country", data.client.country || "");
          setFieldValue(
            "client.annualPayment",
            data.client.annualPayment || ""
          );
          setFieldValue("client.frequency", data.client.frequency || "");
          setFieldValue(
            "client.regularPayment",
            data.client.regularPayment || ""
          );
        }
      }

      if (
        (Array.isArray(data.owner)
          ? data.owner.includes("partner")
          : (data.owner || "").includes("partner")) &&
        UserStatus === "Married"
      ) {
        if (data.partner && Object.keys(data.partner).length) {
          setFieldValue("partner.country", data.partner.country || "");
          setFieldValue("partner.frequency", data.partner.frequency || "");
          setFieldValue(
            "partner.regularPayment",
            data.partner.regularPayment || ""
          );
          setFieldValue(
            "partner.annualPayment",
            data.partner.annualPayment || ""
          );
        }
      }
    } else {
      props.setIsEditing(!props.isEditing);
    }
  };

  const DefaultUrl = useRecoilValue(defaultUrl);

  const onSubmit = async (values) => {
    const obj = { ...values };
    obj.clientFK = localStorage.getItem("UserID");

    if (values.owner.includes("client")) {
      obj.clientTotal = values.client.annualPayment;
    } else {
      obj.client = {};
      obj.clientTotal = "";
    }

    if (values.owner.includes("partner") && UserStatus === "Married") {
      obj.partnerTotal = values.partner.annualPayment;
    } else {
      obj.partner = {};
      obj.partnerTotal = "";
    }

    const bankAccountArray = incomeFromOverseasPension.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/incomeFromOverseasPension/Add`,
          obj
        );
      } else {
        res = await PatchAxios(
          `${DefaultUrl}/api/incomeFromOverseasPension/Update`,
          obj
        );
      }

      if (res) {
        const updatedData = {
          ...questionDetail,
          incomeFromOverseasPension: res,
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
  let optionsFrequency = [
    { value: 26, label: "Fortnightly" },
    { value: 12, label: "Monthly" },
  ];

  const calculateAnnualRepayments = (
    values,
    setFieldValue,
    thisInput,
    stackHolder
  ) => {
    console.log(
      // values,
      // thisInput.value,
      stackHolder,
      "calculateannualPayment"
    );
    // safely extract numeric values
    const cleanNumber = (val) => {
      if (val === undefined || val === null) return 0;
      if (typeof val === "number") return val;
      const cleaned = String(val).replace(/[^0-9.-]+/g, "");
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : parsed;
    };

    let regularPayment = cleanNumber(
      values?.[stackHolder.replace(".", "")]?.regularPayment
    );
    let frequency = cleanNumber(
      values?.[stackHolder.replace(".", "")]?.frequency
    );

    // Handle real-time updates from current input
    switch (thisInput.name) {
      case stackHolder + "regularPayment":
        regularPayment = cleanNumber(thisInput.value);
        break;
      case stackHolder + "frequency":
        frequency = cleanNumber(thisInput.value);
        break;
      default:
        break;
    }

    console.log(regularPayment, frequency, "regularPayment, frequency");

    const annualPayment = regularPayment * frequency;

    // ✅ Corrected field path
    setFieldValue(
      `${stackHolder}annualPayment`,
      toCommaAndDollar(annualPayment || 0)
    );
  };

  const columns = [
    { title: "Owner", dataIndex: "owner", key: "owner" },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      type: "text",
      placeholder: "Country",
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      type: "select", // simple static text or could be DynamicFormField if editable
      options: optionsFrequency,
      width: 150,
      callBack: true,
      func: calculateAnnualRepayments,
      selectedOptionValue: true,
    },
    {
      title: "Regular Payment",
      dataIndex: "regularPayment",
      key: "regularPayment",
      type: "number-toComma",
      placeholder: "Regular Payment",
      callBack: true,
      func: calculateAnnualRepayments,
    },
    {
      // title: "Regular Income p.a",
      title: "Annual Payment",
      dataIndex: "annualPayment",
      key: "annualPayment",
      type: "number-toComma",
      placeholder: "Annual Payment",
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
                  country: values.client?.country || "",
                  frequency: values.client?.frequency || "",
                  regularPayment: values.client?.regularPayment || "",
                  annualPayment: values.client?.annualPayment || "",
                },
              ]
            : []),
          ...(values.owner.includes("partner") && UserStatus === "Married"
            ? [
                {
                  key: "partner",
                  owner: RenderName("partner"),
                  stakeHolder: "partner",
                  country: values.partner?.country || "",
                  frequency: values.partner?.frequency || "",
                  regularPayment: values.partner?.regularPayment || "",
                  annualPayment: values.partner?.annualPayment || "",
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

export default OverseasPension;
