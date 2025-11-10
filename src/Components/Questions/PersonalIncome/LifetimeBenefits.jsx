import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap"; // you can replace this with AntD Grid later if you want full migration
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

import { AntdCreatableMultiSelect } from "../FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const LifeTimeBeneFits = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [, setQuestionDetail] = useRecoilState(QuestionDetail);

  const [UserStatus] = useState(localStorage.getItem("UserStatus"));

  const incomeFromSuperPayment =
    questionDetail?.incomeFromSuperPayment &&
    Object.keys(questionDetail.incomeFromSuperPayment).length > 0
      ? questionDetail.incomeFromSuperPayment
      : {
          client: {},
          partner: {},
        };

  const initialValues = {
    owner: [],
    client: {},
    partner: {},
  };

  const fillInitialValues = (setFieldValue) => {
    const data = incomeFromSuperPayment;
    if (data && data._id) {
      setFieldValue("owner", data.owner || []);

      if (
        Array.isArray(data.owner)
          ? data.owner.includes("client")
          : (data.owner || "").includes("client")
      ) {
        if (data.client && Object.keys(data.client).length) {
          setFieldValue("client.fundName", data.client.fundName || "");
          setFieldValue(
            "client.regularIncomePerFortnight",
            data.client.regularIncomePerFortnight || ""
          );
          setFieldValue("client.isPension", data.client.isPension || "");
          setFieldValue(
            "client.regularIncomePA",
            data.client.regularIncomePA || ""
          );
          setFieldValue(
            "client.centrelinkDeductibleAmount",
            data.client.centrelinkDeductibleAmount || ""
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
          setFieldValue("partner.fundName", data.partner.fundName || "");
          setFieldValue(
            "partner.regularIncomePerFortnight",
            data.partner.regularIncomePerFortnight || ""
          );
          setFieldValue("partner.isPension", data.partner.isPension || "");
          setFieldValue(
            "partner.regularIncomePA",
            data.partner.regularIncomePA || ""
          );
          setFieldValue(
            "partner.centrelinkDeductibleAmount",
            data.partner.centrelinkDeductibleAmount || ""
          );
        }
      }
    }
  };

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

    const bankAccountArray = incomeFromSuperPayment.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/incomeFromSuperPayment/Add`,
          obj
        );
      } else {
        res = await PatchAxios(
          `${DefaultUrl}/api/incomeFromSuperPayment/Update`,
          obj
        );
      }

      if (res) {
        const updatedData = { ...questionDetail, incomeFromSuperPayment: res };
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

  const fundOptions = [
    { value: "ESS Super", label: "ESS Super" },
    { value: "PSS", label: "PSS" },
    { value: "CSC", label: "CSC" },
    { value: "Uni Super", label: "Uni Super" },
    { value: "Telstra", label: "Telstra" },
    { value: "Other", label: "Other" },
  ];

  const Formula = (values, setFieldValue, currentInput, stakeHolder) => {
    try {
      const stakeHolderKey = stakeHolder.replace(".", "");
      let IncomePF =
        toNumericValue(values[stakeHolderKey]?.regularIncomePerFortnight) || 0;

      if (currentInput.name === `${stakeHolder}regularIncomePerFortnight`) {
        IncomePF = toNumericValue(currentInput.value) || 0;
      }

      const amount = IncomePF * 26;
      setFieldValue(`${stakeHolder}regularIncomePA`, toCommaAndDollar(amount));
    } catch (error) {
      console.error("Error in Formula function: ", error);
    }
  };

  const columns = [
    { title: "Owner", dataIndex: "owner", key: "owner" },
    {
      title: "Fund Name",
      dataIndex: "fundName",
      key: "fundName",
      type: "select",
      options: fundOptions,
      width: 150,
      trrigger: () => document.querySelector("table"),
    },
    {
      title: "Fortnight Payment",
      dataIndex: "regularIncomePerFortnight",
      key: "regularIncomePerFortnight",
      type: "number-toComma",
      callBack: true,
      func: Formula,
    },
    {
      title: "Annual Payment",
      dataIndex: "regularIncomePA",
      key: "regularIncomePA",
      type: "number-toComma",
      disabled: true,
    },
    {
      title: "Centrelink Deductible Amount",
      dataIndex: "centrelinkDeductibleAmount",
      key: "centrelinkDeductibleAmount",
      type: "number-toComma",
    },
    {
      title: "Is Pension Tax Fee",
      dataIndex: "isPension",
      key: "isPension",
      type: "yesno", width: 100,
    },
  ];

  function ownerOptions() {
    const opts = [{ value: "client", label: RenderName("client") }];
    if (UserStatus !== "Single")
      opts.push({ value: "partner", label: RenderName("partner") });
    return opts;
  }

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
                  fundName: values.client?.fundName || "",
                  regularIncomePerFortnight:
                    values.client?.regularIncomePerFortnight || "",
                  regularIncomePA: values.client?.regularIncomePA || "",
                  centrelinkDeductibleAmount:
                    values.client?.centrelinkDeductibleAmount || "",
                  isPension: values.client?.isPension || "",
                },
              ]
            : []),
          ...(values.owner.includes("partner") && UserStatus === "Married"
            ? [
                {
                  key: "partner",
                  owner: RenderName("partner"),
                  stakeHolder: "partner",
                  fundName: values.partner?.fundName || "",
                  regularIncomePerFortnight:
                    values.partner?.regularIncomePerFortnight || "",
                  regularIncomePA: values.partner?.regularIncomePA || "",
                  centrelinkDeductibleAmount:
                    values.partner?.centrelinkDeductibleAmount || "",
                  isPension: values.partner?.isPension || "",
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
                          options={ownerOptions()}
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

export default LifeTimeBeneFits;
