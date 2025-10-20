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

<<<<<<< HEAD
=======
const AntdTable = DynamicTableForInputsSection("antd");

>>>>>>> origin/master
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
      regularIncomePA: "",
    },
    partner: {
      country: "",
      regularIncomePA: "",
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
            "client.regularIncomePA",
            data.client.regularIncomePA || ""
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
          setFieldValue(
            "partner.regularIncomePA",
            data.partner.regularIncomePA || ""
          );
        }
      }
    }
  };

<<<<<<< HEAD
  const AntdTable = DynamicTableForInputsSection("antd");

=======
>>>>>>> origin/master
  const DefaultUrl = useRecoilValue(defaultUrl);

  const onSubmit = async (values) => {
    const obj = { ...values };
    obj.clientFK = localStorage.getItem("UserID");

    if (values.owner.includes("client")) {
      obj.clientTotal = values.client.regularIncomePA;
    } else {
      obj.client = {};
      obj.clientTotal = "";
    }

    if (values.owner.includes("partner") && UserStatus === "Married") {
      obj.partnerTotal = values.partner.regularIncomePA;
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
      title: "Regular Income p.a",
      dataIndex: "regularIncomePA",
      key: "regularIncomePA",
      type: "number-toComma",
      placeholder: "Regular Income p.a",
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
                  regularIncomePA: values.client?.regularIncomePA || "",
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
                  regularIncomePA: values.partner?.regularIncomePA || "",
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
  if (UserStatus !== "Single")
    opts.push({ value: "partner", label: RenderName("partner") });
  return opts;
}

export default OverseasPension;
