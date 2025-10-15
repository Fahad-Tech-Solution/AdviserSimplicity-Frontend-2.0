import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  defaultUrl,
  PersonalDetailsData,
  QuestionDetail,
} from "../../../Store/Store";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
} from "../../Assets/Api/Api";

import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import HomeLoan from "./HomeLoan";
import { FaRegBuilding } from "react-icons/fa6";

import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const OwnFamilyHome = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const PersonalData = useRecoilValue(PersonalDetailsData);

  const [, setQuestionDetail] = useRecoilState(QuestionDetail);

  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  const familyHome =
    questionDetail?.familyHome &&
    Object.keys(questionDetail.familyHome).length > 0
      ? questionDetail.familyHome
      : {};

  const initialValues = {};

  const fillInitialValues = (setFieldValue) => {
    setFieldValue("address", PersonalData?.client?.clientHomeAddress || "");
    if (familyHome && familyHome._id) {
      setFieldValue("currentValue", familyHome.currentValue || "");
      setFieldValue("costBase", familyHome.costBase || "");
      setFieldValue("clientOwnership", familyHome.clientOwnership || "");
      setFieldValue("partnerOwnership", familyHome.partnerOwnership || "");
      setFieldValue("loanAttached", familyHome.loanAttached || "");
      setFieldValue("HomeLoanModal", familyHome.HomeLoanModal || {});
      setFieldValue("loanAmount", familyHome?.HomeLoanModal?.loanBalance || "");
      setFieldValue(
        "annualRepayments",
        familyHome?.HomeLoanModal?.annualRepayments || ""
      );
    }
  };

  const DefaultUrl = useRecoilValue(defaultUrl);

  const onSubmit = async (values) => {
    let obj = {
      currentValue: values.currentValue,
      costBase: values.costBase,
      clientOwnership: values.clientOwnership,
      partnerOwnership: values.partnerOwnership,
      loanAttached: values.loanAttached,
      HomeLoanModal:
        values.loanAttached === "Yes"
          ? Object.keys(values.HomeLoanModal || {}).length > 0
            ? values.HomeLoanModal
            : undefined
          : undefined,
    };

    obj.clientFK = localStorage.getItem("UserID");
    obj["clientTotal"] = obj.currentValue;

    const bankAccountArray = familyHome.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/familyHome/Add`, obj);
      } else {
        res = await PatchAxios(`${DefaultUrl}/api/familyHome/Update`, obj);
      }

      if (res) {
        const updatedData = { ...questionDetail, familyHome: res };
        setQuestionDetail(updatedData);
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        `Data of "${props.modalObject?.title || "Family Home"}" is Saved`
      );

      if (props.flagState) props.setFlagState(false);
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Data of "${
          props.modalObject?.title || "Family Home"
        }" is not Saved. Please try again.`
      );
    }
  };

  const handleInnerModal = (title, values, key) => {
    setModalObject({ title, values, key });
    setFlagState(true);
  };

  // ✅ AntD table column configuration
  const columns = [
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      type: "text",
      placeholder: "Address",
      disabled: true,
    },
    {
      title: (
        <>
          Current Value{" "}
          <a
            href="https://www.property.com.au/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "white" }}
          >
            <FaRegBuilding />
          </a>
        </>
      ),
      dataIndex: "currentValue",
      key: "currentValue",
      type: "number-toComma",
      placeholder: "Current Value",
    },
    {
      title: "Cost base",
      dataIndex: "costBase",
      key: "costBase",
      type: "number-toComma",
      placeholder: "Cost base",
    },
    {
      title: "Client Ownership",
      dataIndex: "clientOwnership",
      key: "clientOwnership",
      type: "number-toPercent",
      placeholder: "Client Ownership",
    },
    {
      title: "Partner Ownership",
      dataIndex: "partnerOwnership",
      key: "partnerOwnership",
      type: "number-toPercent",
      placeholder: "Partner Ownership",
    },
    {
      title: "Loan Attached",
      dataIndex: "loanAttached",
      key: "familyHomeLoan",
      type: "yesnoModal",
      innerModalTitle: "Home Loan",
      callBack: true,
      func: handleInnerModal,
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
          {
            key: "familyHome",
            address: values.address,
            currentValue: values.currentValue,
            costBase: values.costBase,
            clientOwnership: values.clientOwnership,
            partnerOwnership: values.partnerOwnership,
            loanAttached: values.loanAttached,
            loanAmount: values.loanAmount,
            annualRepayments: values.annualRepayments,
          },
        ];

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                {/* Loan Attached Modal */}
                <InnerModal
                  modalObject={modalObject}
                  setFieldValue={setFieldValue}
                  setFlagState={setFlagState}
                  flagState={flagState}
                >
                  {modalObject.key === "familyHomeLoan" ? (
                    <HomeLoan
                      values={values}
                      setFieldValue={setFieldValue}
                      onSave={(loanValues) => {
                        setFieldValue(
                          "loanAmount",
                          loanValues.loanBalance || ""
                        );
                        setFieldValue(
                          "annualRepayments",
                          loanValues.annualRepayments || ""
                        );
                        setFieldValue("HomeLoanModal", loanValues);
                      }}
                    />
                  ) : null}
                </InnerModal>

                {dataRows.length > 0 && (
                  <div className="mt-4 All_Client reportSection">
                    <AntdTable
                      columns={columns}
                      data={dataRows}
                      values={values}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
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

export default OwnFamilyHome;
