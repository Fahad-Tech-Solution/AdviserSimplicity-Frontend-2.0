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
  toNumericValue,
} from "../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import { AntdCreatableMultiSelect } from "../FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";

<<<<<<< HEAD
=======
  const AntdTable = DynamicTableForInputsSection("antd");

>>>>>>> origin/master
const Partnership = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [, setQuestionDetail] = useRecoilState(QuestionDetail);
  const [UserStatus] = useState(localStorage.getItem("UserStatus"));

  const incomeFromPartnership =
    questionDetail?.incomeFromPartnership &&
<<<<<<< HEAD
      Object.keys(questionDetail.incomeFromPartnership).length > 0
      ? questionDetail.incomeFromPartnership
      : {
        client: {},
        partner: {},
        joint: {},
      };
=======
    Object.keys(questionDetail.incomeFromPartnership).length > 0
      ? questionDetail.incomeFromPartnership
      : {
          client: {},
          partner: {},
          joint: {},
        };
>>>>>>> origin/master

  const initialValues = {
    owner: [],
    client: {
      businessName: "",
      ABN: "",
      businessAddress: "",
      totalNetPartnershipIncome: "",
      shareOfPartnership: "",
      share: "",
      goodWill: "",
    },
    partner: {
      businessName: "",
      ABN: "",
      businessAddress: "",
      totalNetPartnershipIncome: "",
      shareOfPartnership: "",
      share: "",
      goodWill: "",
    },
  };

  const fillInitialValues = (setFieldValue) => {
    const data = incomeFromPartnership;
    if (data && data._id) {
      setFieldValue("owner", Array.isArray(data.owner) ? data.owner : []);

      if (data.owner?.includes("client") && data.client) {
        setFieldValue("client.businessName", data.client.businessName || "");
        setFieldValue("client.ABN", data.client.ABN || "");
<<<<<<< HEAD
        setFieldValue("client.businessAddress", data.client.businessAddress || "");
        setFieldValue(
          "client.totalNetPartnershipIncome",
          data.client.totalNetPartnershipIncome
            ? toCommaAndDollar(data.client.totalNetPartnershipIncome)
            : ""
=======
        setFieldValue(
          "client.businessAddress",
          data.client.businessAddress || ""
        );
        setFieldValue(
          "client.totalNetPartnershipIncome",
          data.client.totalNetPartnershipIncome
>>>>>>> origin/master
        );
        setFieldValue(
          "client.shareOfPartnership",
          data.client.shareOfPartnership || ""
        );
        setFieldValue("client.share", data.client.share || "");
<<<<<<< HEAD
        setFieldValue(
          "client.goodWill",
          data.client.goodWill ? toCommaAndDollar(data.client.goodWill) : ""
        );
      }

      if (data.owner?.includes("partner") && UserStatus === "Married" && data.partner) {
        setFieldValue("partner.businessName", data.partner.businessName || "");
        setFieldValue("partner.ABN", data.partner.ABN || "");
        setFieldValue("partner.businessAddress", data.partner.businessAddress || "");
        setFieldValue(
          "partner.totalNetPartnershipIncome",
          data.partner.totalNetPartnershipIncome
            ? toCommaAndDollar(data.partner.totalNetPartnershipIncome)
            : ""
=======
        setFieldValue("client.goodWill", data.client.goodWill);
      }

      if (
        data.owner?.includes("partner") &&
        UserStatus === "Married" &&
        data.partner
      ) {
        setFieldValue("partner.businessName", data.partner.businessName || "");
        setFieldValue("partner.ABN", data.partner.ABN || "");
        setFieldValue(
          "partner.businessAddress",
          data.partner.businessAddress || ""
        );
        setFieldValue(
          "partner.totalNetPartnershipIncome",
          data.partner.totalNetPartnershipIncome
>>>>>>> origin/master
        );
        setFieldValue(
          "partner.shareOfPartnership",
          data.partner.shareOfPartnership || ""
        );
        setFieldValue("partner.share", data.partner.share || "");
<<<<<<< HEAD
        setFieldValue(
          "partner.goodWill",
          data.partner.goodWill ? toCommaAndDollar(data.partner.goodWill) : ""
        );
=======
        setFieldValue("partner.goodWill", data.partner.goodWill);
>>>>>>> origin/master
      }
    }
  };

<<<<<<< HEAD

=======
>>>>>>> origin/master
  let Formula = (values, setFieldValue, currentInput, stakeHolder) => {
    try {
      // Removing periods in stakeholder name and logging current values
      let stakeHolderKey = stakeHolder.replace(".", "");
      let totalNetPartnershipIncome =
        toNumericValue(values[stakeHolderKey]?.totalNetPartnershipIncome) || 0;

      let shareOfPartnership =
        parseFloat(values[stakeHolderKey]?.shareOfPartnership) || 0;

      // Check the input name and assign the correct value
      switch (currentInput.name) {
        case `${stakeHolder}totalNetPartnershipIncome`:
          totalNetPartnershipIncome = toNumericValue(currentInput.value) || 0;
          break;
        case `${stakeHolder}shareOfPartnership`:
          // Cap the share percentage at 100
          let percentageValue = parseFloat(
            currentInput.value.replace(/[^0-9.-]+/g, "")
          );
          shareOfPartnership = Math.min(percentageValue, 100) || 0;
          break;
        default:
          console.warn("Unexpected input field");
          break;
      }

      // Calculate the amount based on the formula
      let amount = (totalNetPartnershipIncome * shareOfPartnership) / 100;

      // Format the amount and update the field value
      setFieldValue(`${stakeHolder}share`, toCommaAndDollar(amount.toFixed(2))); // Ensure it rounds to two decimal places
    } catch (error) {
      console.error("Error in Formula function: ", error);
    }
  };

<<<<<<< HEAD


  const AntdTable = DynamicTableForInputsSection("antd");
=======
>>>>>>> origin/master
  const DefaultUrl = useRecoilValue(defaultUrl);

  const onSubmit = async (values) => {
    const obj = {
      ...values,
      client: {
        ...values.client,
<<<<<<< HEAD
        totalNetPartnershipIncome: toNumericValue(values.client.totalNetPartnershipIncome),
        share: toNumericValue(values.client.share),
        goodWill: toNumericValue(values.client.goodWill),
      },
      partner: {
        ...values.partner,
        totalNetPartnershipIncome: toNumericValue(values.partner.totalNetPartnershipIncome),
        share: toNumericValue(values.partner.share),
        goodWill: toNumericValue(values.partner.goodWill),
      },
    };
=======
      },
      partner: {
        ...values.partner,
      },
    };

>>>>>>> origin/master
    obj.clientFK = localStorage.getItem("UserID") || "";

    if (!values.owner.includes("client")) {
      obj.client = {};
      obj.clientTotal = "";
    } else {
<<<<<<< HEAD
      obj.clientTotal = toNumericValue(values.client.share);
=======
      obj.clientTotal = values.client.share;
>>>>>>> origin/master
    }

    if (!values.owner.includes("partner") || UserStatus !== "Married") {
      obj.partner = {};
      obj.partnerTotal = "";
    } else {
<<<<<<< HEAD
      obj.partnerTotal = toNumericValue(values.partner.share);
=======
      obj.partnerTotal = values.partner.share;
>>>>>>> origin/master
    }

    try {
      let res;
      if (incomeFromPartnership._id) {
<<<<<<< HEAD
        res = await PatchAxios(`${DefaultUrl}/api/incomeFromPartnership/Update`, {
          ...obj,
          _id: incomeFromPartnership._id,
        });
      } else {
        res = await PostAxios(`${DefaultUrl}/api/incomeFromPartnership/Add`, obj);
=======
        res = await PatchAxios(
          `${DefaultUrl}/api/incomeFromPartnership/Update`,
          {
            ...obj,
            _id: incomeFromPartnership._id,
          }
        );
      } else {
        res = await PostAxios(
          `${DefaultUrl}/api/incomeFromPartnership/Add`,
          obj
        );
>>>>>>> origin/master
      }

      if (res) {
        const updatedData = { ...questionDetail, incomeFromPartnership: res };
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
    {
      title: "Owner",
      dataIndex: "owner",
<<<<<<< HEAD
      key: "owner"
=======
      key: "owner",
>>>>>>> origin/master
    },
    {
      title: "Business Name",
      dataIndex: "businessName",
      key: "businessName",
      type: "text",
<<<<<<< HEAD
      placeholder: "Business Name"
    },
    {
      title: "ABN",
       dataIndex: "ABN", 
       key: "ABN", 
       type: "text",
        placeholder: "ABN"
    },
    {
       title: "Business Address",
        dataIndex: "businessAddress", key: "businessAddress", type: "text", placeholder: "Business Address" },
    { title: "Total Net Partnership Income", dataIndex: "totalNetPartnershipIncome", key: "totalNetPartnershipIncome", type: "number-toComma", placeholder: "Total Net Partnership Income",callBack: true,func: Formula },
    { title: "Share Of Partnership (%)", dataIndex: "shareOfPartnership", key: "shareOfPartnership", type: "number-toPercent", placeholder: "Share Of Partnership" ,callBack: true, func: Formula},
    { title: "Share Amount", dataIndex: "share", key: "share", type: "number-toComma", placeholder: "Share", disabled: true },
    { title: "Goodwill/Business Valuation", dataIndex: "goodWill", key: "goodWill", type: "number-toComma", placeholder: "GoodWill Business Valuation" },
  ];

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize innerRef={props.formRef}>
=======
      placeholder: "Business Name",
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
      title: "Total Net Partnership Income",
      dataIndex: "totalNetPartnershipIncome",
      key: "totalNetPartnershipIncome",
      type: "number-toComma",
      placeholder: "Total Net Partnership Income",
      callBack: true,
      func: Formula,
    },
    {
      title: "Share Of Partnership (%)",
      dataIndex: "shareOfPartnership",
      key: "shareOfPartnership",
      type: "number-toPercent",
      placeholder: "Share Of Partnership",
      callBack: true,
      func: Formula,
    },
    {
      title: "Share Amount",
      dataIndex: "share",
      key: "share",
      type: "number-toComma",
      placeholder: "Share",
      disabled: true,
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
>>>>>>> origin/master
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        const dataRows = [
          ...(values.owner.includes("client")
            ? [
<<<<<<< HEAD
              {
                key: "client",
                owner: RenderName("client"),
                stakeHolder: "client",
                businessName: values.client?.businessName || "",
                ABN: values.client?.ABN || "",
                businessAddress: values.client?.businessAddress || "",
                totalNetPartnershipIncome: values.client?.totalNetPartnershipIncome || "",
                shareOfPartnership: values.client?.shareOfPartnership || "",
                share: values.client?.share || "",
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
                totalNetPartnershipIncome: values.partner?.totalNetPartnershipIncome || "",
                shareOfPartnership: values.partner?.shareOfPartnership || "",
                share: values.partner?.share || "",
                goodWill: values.partner?.goodWill || "",
              },
            ]
=======
                {
                  key: "client",
                  owner: RenderName("client"),
                  stakeHolder: "client",
                  businessName: values.client?.businessName || "",
                  ABN: values.client?.ABN || "",
                  businessAddress: values.client?.businessAddress || "",
                  totalNetPartnershipIncome:
                    values.client?.totalNetPartnershipIncome || "",
                  shareOfPartnership: values.client?.shareOfPartnership || "",
                  share: values.client?.share || "",
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
                  totalNetPartnershipIncome:
                    values.partner?.totalNetPartnershipIncome || "",
                  shareOfPartnership: values.partner?.shareOfPartnership || "",
                  share: values.partner?.share || "",
                  goodWill: values.partner?.goodWill || "",
                },
              ]
>>>>>>> origin/master
            : []),
        ];

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <div className="d-flex justify-content-center align-items-center gap-4">
<<<<<<< HEAD
                      <label htmlFor="" className="text-end">Owner</label>
                      <div style={{ minWidth: "200px" }}>
                        <Field name="owner" component={AntdCreatableMultiSelect} options={optionsForOwner()} />
=======
                      <label htmlFor="" className="text-end">
                        Owner
                      </label>
                      <div style={{ minWidth: "200px" }}>
                        <Field
                          name="owner"
                          component={AntdCreatableMultiSelect}
                          options={optionsForOwner()}
                        />
>>>>>>> origin/master
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
<<<<<<< HEAD
=======
                        handleSubmit={props?.handleOk}
>>>>>>> origin/master
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
<<<<<<< HEAD
  if (UserStatus !== "Single") opts.push({ value: "partner", label: RenderName("partner") });
=======
  if (UserStatus !== "Single")
    opts.push({ value: "partner", label: RenderName("partner") });
>>>>>>> origin/master
  return opts;
}

export default Partnership;
