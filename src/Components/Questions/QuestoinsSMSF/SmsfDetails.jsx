import { Field, Form, Formik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
import { Button, InputGroup, Modal, Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
  validateName,
} from "../../Assets/Api/Api";
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import DynamicYesNo from "../FinancialInvestments/QuestionsDetail/DynamicYesNo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import InnerDirectors from "./InnerDirectors";
import InnerBareTrust from "./InnerBareTrust";
import { Grid } from "antd";
const { useBreakpoint } = Grid;

const AntDTableHOC = DynamicTableForInputsSection("antd");
const SmsfDetails = (props) => {
  const screens = useBreakpoint();

  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

  let [flagState, setFlagState] = useState(false);

  let [flagState1, setFlagState1] = useState(false);
  let [flagState2, setFlagState2] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let SMSFDetails =
    Object.keys(questionDetail.SMSFDetails).length > 0
      ? questionDetail.SMSFDetails
      : {
          client: [],
          partner: [],
          joint: [],
        }; // Use an empty object as default if SMSFDetails is undefined

  let initialValues = {};

  const fillInitialValues = (setFieldValue) => {
    let data = SMSFDetails.SMSFOwner || {};
    console.log(SMSFDetails, "data of SMSFDetails");

    Object.keys(data).forEach((key) => {
      setFieldValue(key, data[key] || ""); // Set each field value or an empty string if the value is null/undefined
    });
  };

  let handleInnerModal = (innerModalTitle, values, key, stakeHolder) => {
    console.log(
      "handleInnerModal: ",
      innerModalTitle,
      values,
      key,
      stakeHolder
    );
    let ParentModal = props.modalObject.title;
    setModalObject({
      title: innerModalTitle,
      innerModalTitle,
      values,
      key,
      stakeHolder,
      ParentModal,
      directorLimit: 6,
    });
    setFlagState(true);
  };

  const columns = [
    {
      title: "No#",
      dataIndex: "owner",
      key: "owner",
      render: (_, __, i) => i + 1,
      width: 60,
    },
    {
      title: "Fund Name",
      dataIndex: "fundName",
      key: "fundName",
      type: "text",
      placeholder: "Fund Name",
      width: 200,
    },
    {
      title: "ABN",
      dataIndex: "ABN",
      key: "ABN",
      type: "number",
      placeholder: "ABN",
      width: 150,
    },
    {
      title: "Registered Office",
      dataIndex: "registeredOffice",
      key: "registeredOffice",
      type: "text",
      placeholder: "Registered Office",
      width: 250,
    },
    {
      title: "Place Of Business",
      dataIndex: "placeOfBusiness",
      key: "placeOfBusiness",
      type: "text",
      placeholder: "Place Of Business",
      width: 220,
    },
    {
      title: "Establishment Date",
      dataIndex: "establishmentDate",
      key: "establishmentDate",
      type: "antdate",
      placeholder: "dd/mm/yyyy",
      width: 170,
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
      width: 220,
    },
    {
      title: "ACN",
      dataIndex: "ACN",
      key: "ACN",
      type: "number",
      placeholder: "ACN",
      width: 150,
    },
    {
      title: "Bare Trust",
      dataIndex: "bareTrust",
      key: "bareTrust",
      type: "yesnoModal", // yes/no with modal
      width: 160,
      callBack: true,
      func: handleInnerModal,
      handleInnerModal: handleInnerModal,
      innerModalTitle: "Directors Of Bare Trust",

      // we'll use the AntDHOC to render a Yes/No control or call back to render custom
      // The AntD HOC in your sample already knows how to render various `type` values.
    },
    {
      title: "Name of Accountant",
      dataIndex: "nameOfAccountant",
      key: "nameOfAccountant",
      type: "text",
      placeholder: "Name of Accountant",
      width: 220,
    },
  ];

  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    // console.log(JSON.stringify(values));
    // return (false);

    // Create an object with additional fields
    let obj = {
      clientFK: localStorage.getItem("UserID"),
    };

    obj.SMSFOwner = values;

    console.log(JSON.stringify(obj), "final obj");

    // Check if SMSFDetails and the array at props.modalObject.Input exist
    // const bankAccountArray = SMSFDetails[props.modalObject.Input] || [];
    const bankAccountArray = SMSFDetails.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/SMSFDetails/Add`, obj);
      } else {
        obj._id = SMSFDetails._id;
        res = await PatchAxios(`${DefaultUrl}/api/SMSFDetails/Update`, obj);
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, SMSFDetails: res };
        setQuestionDetail(updatedData);
      }
      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        'Data of "' + props.modalObject.title + '" is Saved'
      );

      // Reset the flag state if necessary
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
        'Data of "' +
          props.modalObject.title +
          '" is not Saved Please! try again'
      );
    }
  };

  const options = ["Corporate", "Individual"];

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
        }, [values.NumberOfMap]);
        // 🟢 Dynamically filter columns based on selected Trustee Type
        const filteredColumns = useMemo(() => {
          if (values.trusteeType === "Corporate") {
            return columns; // show all columns
          } else {
            // hide "Trustee Name" when not Corporate
            return columns.filter((col) => col.key !== "trusteeName");
          }
        }, [values.trusteeType]);

        const tableData = useMemo(() => {
          const rows = [];
          console.log(values, "values of SMSFDetails");

          rows.push({
            key: "client",
            owner: RenderName("client"),
            ...values,
          });

          return rows;
        }, [values]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <InnerModal
                    modalObject={modalObject}
                    setFieldValue={setFieldValue}
                    setFlagState={setFlagState}
                    flagState={flagState}
                    setIsEditing={props.setIsEditing}
                  >
                    {modalObject.key === "trusteeType" ? (
                      <InnerDirectors />
                    ) : modalObject.key === "bareTrust" ? (
                      <InnerBareTrust />
                    ) : (
                      ""
                    )}
                  </InnerModal>

                  {/* <p onClick={() => console.log(values)}>Test Text</p> */}

                  <div className="mt-4 All_Client reportSection">
                    <AntDTableHOC
                      columns={filteredColumns}
                      data={tableData}
                      values={values}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      isEditing={props?.isEditing}
                      setIsEditing={props?.setIsEditing}
                    />
                  </div>
                </div>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SmsfDetails;
