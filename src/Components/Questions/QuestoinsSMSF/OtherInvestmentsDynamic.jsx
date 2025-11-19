import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { BankDetail, defaultUrl, QuestionDetail } from "../../../Store/Store";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  toCommaAndDollar,
} from "../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const AntDTableHOC = DynamicTableForInputsSection("antd");

const OtherInvestmentsDynamic = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  let bankDetailObj = useRecoilValue(BankDetail);

  let [lenderOption, setLenderOption] = useState(() => {
    if (!bankDetailObj?.FinancialInstitutions) return [];

    // Create an options array
    const optionsArray = bankDetailObj.FinancialInstitutions.map((elem) => ({
      value: elem._id,
      label: elem.platformName,
    }));

    return optionsArray;
  });

  let managedFundsLOC =
    Object.keys(questionDetail[props.modalObject.key] || {}).length > 0
      ? questionDetail[props.modalObject.key]
      : {
          client: [],
          partner: [],
          joint: [],
        };

  let initialValues = {
    investmentName: "",
    currentValue: "",
    costBase: "",
  };

  const fillInitialValues = (setFieldValue) => {
    console.log(managedFundsLOC);

    if (managedFundsLOC && managedFundsLOC._id) {
      // For client-related fields if "client" is included in the owner array
      if (managedFundsLOC && Object.keys(managedFundsLOC).length) {
        setFieldValue(`investmentName`, managedFundsLOC.investmentName || "");
        setFieldValue(`currentValue`, managedFundsLOC.currentValue || "");
        setFieldValue(`costBase`, managedFundsLOC.costBase || "");
      }
    }
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    let obj = values;
    obj.clientFK = localStorage.getItem("UserID");
    obj.clientTotal = values.currentValue;

    console.log(obj, "final obj");

    // Check if managedFundsLOC and the array at props.modalObject.Input exist
    const bankAccountArray = managedFundsLOC.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        // Make a POST request if no bank account is found
        res = await PostAxios(
          `${DefaultUrl}/api/${props.modalObject.key}/Add`,
          obj
        );
      } else {
        // Make a PATCH request if a bank account is found
        res = await PatchAxios(
          `${DefaultUrl}/api/${props.modalObject.key}/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, [props.modalObject.key]: res };
        setQuestionDetail(updatedData);
      }
      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        `Data of "${props.modalObject.title}" is Saved`
      );

      // Reset flag state if necessary
      if (props.flagState) {
        props.setFlagState(false);
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Data of "${props.modalObject.title}" is not saved. Please try again!`
      );
    }
  };

  // Define columns for Ant Design table
  const columns = [
    {
      title: "Name of Investment",
      dataIndex: "investmentName",
      key: "investmentName",
      type: "text",
      placeholder: "Name of Investment",
      width: 200,
    },
    {
      title: "Current Value",
      dataIndex: "currentValue",
      key: "currentValue",
      type: "number-toComma",
      placeholder: "Current Value",
      width: 150,
    },
    {
      title: "Cost Base",
      dataIndex: "costBase",
      key: "costBase",
      type: "number-toComma",
      placeholder: "Cost Base",
      width: 150,
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

        // Prepare table data INSIDE the Formik render function
        const tableData = [
          {
            key: "investment",
            investmentName: values?.investmentName || "",
            currentValue: values?.currentValue || "",
            costBase: values?.costBase || "",
          },
        ];

        return (
          <Form>
            <div className="row">
              <div className="col-md-12">
                <div className="mt-4 All_Client reportSection">
                  <AntDTableHOC
                    columns={columns}
                    data={tableData}
                    values={values}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleSubmit={props?.handleOk}
                    isEditing={props?.isEditing}
                    setIsEditing={props?.setIsEditing}
                  />
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OtherInvestmentsDynamic;
