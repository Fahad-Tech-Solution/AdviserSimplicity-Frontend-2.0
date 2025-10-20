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

<<<<<<< HEAD
=======
const AntdTable = DynamicTableForInputsSection("antd");
>>>>>>> origin/master
const CenterLinkPayments = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [, setQuestionDetail] = useRecoilState(QuestionDetail);
  const [UserStatus] = useState(localStorage.getItem("UserStatus"));

  const incomeFromCentrelink =
    questionDetail?.incomeFromCentrelink &&
    Object.keys(questionDetail.incomeFromCentrelink).length > 0
      ? questionDetail.incomeFromCentrelink
      : {
          client: {},
          partner: {},
          joint: {},
        };

  const initialValues = {
    owner: [],
    client: {
      CRN: "",
      paymentType: [],
      fortnightlyPayment: "",
      annualPaymentAmount: "",
      centrelinkCardsHeld: [],
    },
    partner: {
      CRN: "",
      paymentType: [],
      fortnightlyPayment: "",
      annualPaymentAmount: "",
      centrelinkCardsHeld: [],
    },
  };

  const fillInitialValues = (setFieldValue) => {
    const data = incomeFromCentrelink;
    if (data && data._id) {
      setFieldValue("owner", data.owner || []);

      if (data.owner?.includes("client") && data.client) {
        setFieldValue("client.CRN", data.client.CRN || "");
        setFieldValue("client.paymentType", data.client.paymentType || []);
        setFieldValue(
          "client.fortnightlyPayment",
          data.client.fortnightlyPayment || ""
        );
        setFieldValue(
          "client.annualPaymentAmount",
          data.client.annualPaymentAmount || ""
        );
        setFieldValue(
          "client.centrelinkCardsHeld",
          data.client.centrelinkCardsHeld || []
        );
      }

      if (
        data.owner?.includes("partner") &&
        UserStatus === "Married" &&
        data.partner
      ) {
        setFieldValue("partner.CRN", data.partner.CRN || "");
        setFieldValue("partner.paymentType", data.partner.paymentType || []);
        setFieldValue(
          "partner.fortnightlyPayment",
          data.partner.fortnightlyPayment || ""
        );
        setFieldValue(
          "partner.annualPaymentAmount",
          data.partner.annualPaymentAmount || ""
        );
        setFieldValue(
          "partner.centrelinkCardsHeld",
          data.partner.centrelinkCardsHeld || []
        );
      }
    }
  };

<<<<<<< HEAD
  const AntdTable = DynamicTableForInputsSection("antd");
=======
>>>>>>> origin/master
  const DefaultUrl = useRecoilValue(defaultUrl);

  const onSubmit = async (values) => {
    let obj = { ...values };
    obj.clientFK = localStorage.getItem("UserID");

    if (obj.owner.includes("client")) {
      obj.clientTotal = obj.client.annualPaymentAmount;
    } else {
      obj.client = {};
      obj.clientTotal = "";
    }

    if (obj.owner.includes("partner") && UserStatus === "Married") {
      obj.partnerTotal = obj.partner.annualPaymentAmount;
    } else {
      obj.partner = {};
      obj.partnerTotal = "";
    }

    const GotData = incomeFromCentrelink.clientFK || "";

    try {
      let res;
      if (!GotData) {
        res = await PostAxios(
          `${DefaultUrl}/api/incomeFromCentrelink/Add`,
          obj
        );
      } else {
        res = await PatchAxios(
          `${DefaultUrl}/api/incomeFromCentrelink/Update`,
          obj
        );
      }

      if (res) {
        const updatedData = { ...questionDetail, incomeFromCentrelink: res };
        setQuestionDetail(updatedData);
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        `Data of "${props.modalObject.title}" is Saved`
      );

      if (props.flagState) props.setFlagState(false);
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

  const columns = [
    { title: "Owner", dataIndex: "owner", key: "owner" },
    {
      title: "CRN",
      dataIndex: "CRN",
      key: "CRN",
      type: "number",
      placeholder: "CRN",
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
      type: "select-multi-antd",
      width: 250,
      trrigger: () => document.querySelector("table"),
      options: [
        { value: "Age Pension", label: "Age Pension" },
        { value: "Disability Pension", label: "Disability Pension" },
        { value: "Carer Payment", label: "Carer Payment" },
        { value: "Carer Allowance", label: "Carer Allowance" },
        { value: "Jobseeker", label: "Jobseeker" },
        { value: "Family Tax Benefit A", label: "Family Tax Benefit A" },
        { value: "Family Tax Benefit B", label: "Family Tax Benefit B" },
        { value: "Rent Assistance", label: "Rent Assistance" },
      ],
    },
    {
      title: "Fortnightly Payment",
      dataIndex: "fortnightlyPayment",
      key: "fortnightlyPayment",
      type: "number-toComma",
      placeholder: "Fortnightly Payment",
      width: 200,
      callBack: true,
      func: (values, setFieldValue, thisInput, stakeHolder) => {
        console.log("center-Link Payment");
        setFieldValue(
          stakeHolder + "annualPaymentAmount",
          toCommaAndDollar(
            parseFloat(thisInput.value.replace(/[^0-9.-]+/g, "") || 0) * 26
          )
        );
      },
    },
    {
      title: "Annual Payment Amount",
      dataIndex: "annualPaymentAmount",
      key: "annualPaymentAmount",
      type: "number-toComma",
      placeholder: "Annual Payment Amount",
      width: 250,
      disabled: true,
    },
    {
      title: "Centrelink Cards Held",
      dataIndex: "centrelinkCardsHeld",
      key: "centrelinkCardsHeld",
      type: "select-multi-antd",
      width: 270,
      options: [
        { value: "Pensioner Card", label: "Pensioner Card" },
        { value: "Low Income Card", label: "Low Income Card" },
        {
          value: "Commonwealth Seniors Card",
          label: "Commonwealth Seniors Card",
        },
      ],
    },
  ];

  function ownerOptions() {
    const opts = [{ value: "client", label: RenderName("client") }];
    if (UserStatus !== "Single") {
      opts.push({ value: "partner", label: RenderName("partner") });
    }
    return opts;
  }

  const handleInnerModal = (name, values) => {
    console.log("Modal trigger:", name, values);
  };

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
                  CRN: values.client?.CRN || "",
                  paymentType: values.client?.paymentType || [],
                  fortnightlyPayment: values.client?.fortnightlyPayment || "",
                  annualPaymentAmount: values.client?.annualPaymentAmount || "",
                  centrelinkCardsHeld: values.client?.centrelinkCardsHeld || [],
                },
              ]
            : []),
          ...(values.owner.includes("partner") && UserStatus === "Married"
            ? [
                {
                  key: "partner",
                  owner: RenderName("partner"),
                  stakeHolder: "partner",
                  CRN: values.partner?.CRN || "",
                  paymentType: values.partner?.paymentType || [],
                  fortnightlyPayment: values.partner?.fortnightlyPayment || "",
                  annualPaymentAmount:
                    values.partner?.annualPaymentAmount || "",
                  centrelinkCardsHeld:
                    values.partner?.centrelinkCardsHeld || [],
                },
              ]
            : []),
        ];

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="d-flex justify-content-center align-items-center gap-4">
                  <label className="text-end">Owner</label>
                  <div style={{ minWidth: "200px" }}>
                    <Field
                      name="owner"
                      component={AntdCreatableMultiSelect}
                      options={ownerOptions()}
                    />
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
<<<<<<< HEAD
=======
                      handleSubmit={props?.handleOk}
>>>>>>> origin/master
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

export default CenterLinkPayments;
