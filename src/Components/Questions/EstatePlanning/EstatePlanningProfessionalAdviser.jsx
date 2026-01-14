import { Form, Formik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
} from "../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import { ConfigProvider, Select } from "antd";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const EstatePlanningProfessionalAdviser = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  const DefaultUrl = useRecoilValue(defaultUrl);
  const [nameSet] = useState(RenderName(props.modalObject.Input));

  const existingData =
    questionDetail?.professionalAdviser?.[props.modalObject.Input] || [];

  const initialValues = {
    professionalAdvisersTypes: existingData.map((d) => d.POAType) || [],
    professionalAdviser: existingData || [],
  };

  // -----------------------------
  // Fill form with existing data
  // -----------------------------
  const fillInitialValues = (setFieldValue) => {
    if (existingData.length) {
      setFieldValue("professionalAdviser", existingData);
      setFieldValue(
        "professionalAdvisersTypes",
        existingData.map((item) => item.POAType)
      );
      setFieldValue("NumberOfMap", existingData.length);
    } else {
      props.setIsEditing(true);
    }
  };

  // -----------------------------
  // Submit Handler
  // -----------------------------
  const onSubmit = async (values) => {
    const advisers = values.professionalAdviser || [];
    const DataOf = props.modalObject.Input;

    const obj = {
      clientFK: localStorage.getItem("UserID"),
      [DataOf]: advisers,
      [DataOf + "Total"]: advisers.length > 0 ? "Yes" : "No",
    };

    // setQuestionDetail((prev) => ({
    //   ...prev,
    //   professionalAdviser: {
    //     ...prev.professionalAdviser,
    //     [DataOf]: advisers,
    //   },
    // }));

    try {
      const hasExisting =
        questionDetail?.professionalAdviser?.clientFK ||
        questionDetail?.professionalAdviser?._id;

      const res = hasExisting
        ? await PatchAxios(`${DefaultUrl}/api/professionalAdviser/Update`, {
            ...obj,
            collection: DataOf,
          })
        : await PostAxios(`${DefaultUrl}/api/professionalAdviser/Add`, obj);

      if (res) {
        const updatedData = { ...questionDetail, professionalAdviser: res };
        setQuestionDetail(updatedData);
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        `Data of "${props.modalObject.title}" is saved successfully`
      );

      if (props.flagState) {
        props.setFlagState(false);
        props.setIsEditing(!props.isEditing);
      }
    } catch (error) {
      console.error("Error occurred while saving:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Failed to save "${props.modalObject.title}". Please try again.`
      );
    }
  };

  // -----------------------------
  // Table Columns
  // -----------------------------
  const columns = [
    {
      title: "No#",
      dataIndex: "index",
      key: "owner",
      render: (_, __, i) => i + 1,
      width: 60,
    },
    {
      title: "Adviser Type",
      dataIndex: "POAType",
      key: "POAType",
      type: "text",
      justText: true,
      disabled: true,
      width: 200,
    },
    {
      title: "Adviser Name",
      dataIndex: "adviserName",
      key: "adviserName",
      type: "text",
      placeholder: "Adviser Name",
      width: 200,
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      type: "text",
      placeholder: "Company",
      width: 200,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      type: "text",
      placeholder: "Phone",
      callBack: true,
      func: (values, setFieldValue, thisInput, stakeHolder) => {
        const raw = thisInput.value || "";
        // Allow only digits and + sign
        const filtered = raw.replace(/[^0-9+]+/g, "");

        setFieldValue(thisInput.name, filtered);
      },
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      type: "text",
      placeholder: "Email",
      width: 250,
    },
  ];

  // -----------------------------
  // Main Render
  // -----------------------------
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      innerRef={props.formRef}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [existingData]);

        // Build dynamic data rows based on selected adviser types
        const dataRows = useMemo(() => {
          const selectedTypes = values.professionalAdvisersTypes || [];
          return selectedTypes.map((type, i) => ({
            key: `professionalAdviser.${i}`,
            stakeHolder: `professionalAdviser[${i}]`,
            POAType: type,
            adviserName: values.professionalAdviser?.[i]?.adviserName || "",
            company: values.professionalAdviser?.[i]?.company || "",
            phone: values.professionalAdviser?.[i]?.phone || "",
            email: values.professionalAdviser?.[i]?.email || "",
          }));
        }, [values.professionalAdvisersTypes, values.professionalAdviser]);

        return (
          <Form>
            {/* Heading + Multiselect */}
            <div className="d-flex justify-content-center align-items-center gap-4">
              <p
                className="text-end mt-1 pt-2"
                onClick={() => {
                  console.log(values);
                }}
              >
                {/* Select {props.modalObject.title} types for {nameSet}:  */}
                Adviser Type
              </p>
              <div style={{ minWidth: "35%" }}>
                <ConfigProvider
                  theme={{
                    components: { Select: { colorBorder: "#36b446" } },
                  }}
                >
                  <Select
                    id="professionalAdvisersTypes"
                    name="professionalAdvisersTypes"
                    mode="multiple"
                    allowClear
                    disabled={!props?.isEditing}
                    className="w-100"
                    placeholder="Select Adviser Types"
                    size="large"
                    value={values.professionalAdvisersTypes || []}
                    onChange={(selectedValues) => {
                      const advisersArray = (selectedValues || []).map(
                        (type) => {
                          // preserve existing values if type already exists
                          const existing = values.professionalAdviser?.find(
                            (adv) => adv.POAType === type
                          );
                          return (
                            existing || {
                              POAType: type,
                              adviserName: "",
                              company: "",
                              phone: "",
                              email: "",
                            }
                          );
                        }
                      );
                      setFieldValue(
                        "professionalAdvisersTypes",
                        selectedValues
                      );
                      setFieldValue("NumberOfMap", advisersArray.length);
                      setFieldValue("professionalAdviser", advisersArray);
                    }}
                    getPopupContainer={(node) => node.parentNode}
                  >
                    {[
                      "Accountant",
                      "Insurance Adviser",
                      "Doctor",
                      "Lawyer/Solicitor",
                      "Other",
                    ].map((type) => (
                      <Option key={type} value={type}>
                        {type}
                      </Option>
                    ))}
                  </Select>
                </ConfigProvider>
              </div>
            </div>

            {/* Table */}
            {values.professionalAdvisersTypes?.length > 0 && (
              <div className="mt-4 All_Client reportSection">
                <AntdTable
                  columns={columns}
                  data={dataRows}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isEditing={props?.isEditing}
                  setIsEditing={props?.setIsEditing}
                />
              </div>
            )}

            {/* Hidden Submit Button */}
            <button type="submit" style={{ display: "none" }}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EstatePlanningProfessionalAdviser;
