import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, InputGroup, Modal, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  validateName,
} from "../../Assets/Api/Api";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import InnerDirectors from "../QuestoinsSMSF/InnerDirectors";
import InnerBareTrust from "../QuestoinsSMSF/InnerBareTrust";

const AntDTableHOC = DynamicTableForInputsSection("antd");

const FamilyDetails = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let familyDetails =
    Object.keys(questionDetail.familyDetails || {}).length > 0
      ? questionDetail.familyDetails
      : {
          familyTrustOwner: [],
          partner: [],
          joint: [],
        };

  let initialValues = {
    trustName: "",
    trustType: "",
    ABN: "",
    registeredOffice: "",
    placeOfBusiness: "",
    establishmentDate: "",
    trusteeType: "",
    trusteeName: "",
    ACN: "",
    nameOfAccountant: "",
    directorsOfCorporateTrustee: [],
  };

  const fillInitialValues = (setFieldValue) => {
    let data = familyDetails.familyTrustOwner || {};
    console.log(data);
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((key) => {
        setFieldValue(key, data[key] || "");
      });
    } else {
      props.setIsEditing(true);
    }
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    let obj = {
      clientFK: localStorage.getItem("UserID"),
      familyTrustOwner: values,
    };

    console.log(JSON.stringify(obj), "final obj");

    const bankAccountArray = familyDetails.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/familyDetails/Add`, obj);
      } else {
        res = await PatchAxios(`${DefaultUrl}/api/familyDetails/Update`, obj);
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, familyDetails: res };
        setQuestionDetail(updatedData);
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        'Data of "' + props.modalObject.title + '" is Saved'
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
        'Data of "' +
          props.modalObject.title +
          '" is not Saved Please! try again'
      );
    }
  };

  const trustTypeOptions = ["Discretionary", "Other"];

  let handleInnerModal = (title, values, key, stackHolder) => {
    setModalObject({
      title,
      key,
      stackHolder,
      values,
      directorLimit: 4,
    });
    setFlagState(true);
  };

  // Define columns for Ant Design table
  const columns = [
    {
      title: "No#",
      dataIndex: "No",
      key: "No",

      width: 60,
      justText: true,
    },
    {
      title: "Trust Name",
      dataIndex: "trustName",
      key: "trustName",
      type: "text",
      placeholder: "Trust Name",
      width: 150,
    },
    {
      title: "Trust Type",
      dataIndex: "trustType",
      key: "trustType",
      type: "selectModal",
      placeholder: "Select Trust Type",
      options: trustTypeOptions.map((option) => ({
        label: option,
        value: option,
      })),
      width: 150,
    },
    {
      title: "ABN",
      dataIndex: "ABN",
      key: "ABN",
      type: "number",
      placeholder: "ABN",
      width: 120,
    },
    {
      title: "Registered Office",
      dataIndex: "registeredOffice",
      key: "registeredOffice",
      type: "text",
      placeholder: "Registered Office",
      width: 180,
    },
    {
      title: "Place Of Business",
      dataIndex: "placeOfBusiness",
      key: "placeOfBusiness",
      type: "text",
      placeholder: "Place Of Business",
      width: 180,
    },
    {
      title: "Establishment Date",
      dataIndex: "establishmentDate",
      key: "establishmentDate",
      type: "antdate",
      placeholder: "dd/mm/yyyy",
      width: 150,
    },
    {
      title: "Trustee Type",
      dataIndex: "trusteeType",
      key: "trusteeType",
      type: "selectModal",
      options: ["Corporate", "Individual"].map((v) => ({ label: v, value: v })),
      placeholder: "Trustee Type",
      width: 180,
      ModalOption: ["Corporate", "Individual"], // 👈 add this — triggers modal icon when selected
      func: handleInnerModal,
      innerModalTitle: "Trustee Name", // optional but recommended
    },
    {
      title: "Trustee Name",
      dataIndex: "trusteeName",
      key: "trusteeName",
      type: "text",
      placeholder: "Trustee Name",
      width: 150,
    },
    {
      title: "ACN",
      dataIndex: "ACN",
      key: "ACN",
      type: "number",
      placeholder: "ACN",
      width: 120,
    },
    {
      title: "Name of Accountant",
      dataIndex: "nameOfAccountant",
      key: "nameOfAccountant",
      type: "text",
      placeholder: "Name of Accountant",
      width: 180,
    },
    // {
    //   title: "Directors",
    //   dataIndex: "directors",
    //   key: "directorsOfCorporateTrustee",
    //   type: "modal",
    //   width: 100,
    //   handleInnerModal: handleInnerModal,
    //   innerModalTitle: "Directors",
    //   condition: (values) => values.trusteeType === "Corporate",
    // },
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
            key: "familyTrust",
            No: "1",
            trustName: values?.trustName || "",
            trustType: values?.trustType || "",
            ABN: values?.ABN || "",
            registeredOffice: values?.registeredOffice || "",
            placeOfBusiness: values?.placeOfBusiness || "",
            establishmentDate: values?.establishmentDate || "",
            trusteeType: values?.trusteeType || "",
            trusteeName: values?.trusteeName || "",
            ACN: values?.ACN || "",
            nameOfAccountant: values?.nameOfAccountant || "",
            directors: values?.directorsOfCorporateTrustee || [],
          },
        ];

        return (
          <Form>
            <div className="row">
              <InnerModal
                modalObject={modalObject}
                setFieldValue={setFieldValue}
                setFlagState={setFlagState}
                flagState={flagState}
              >
                <InnerDirectors />
              </InnerModal>

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

export default FamilyDetails;
