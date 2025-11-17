import React, { useEffect, useMemo, useRef, useState } from "react";
import { Form, Formik } from "formik";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, GoalsDetail } from "../../Store/Store";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  toCommaAndDollar,
} from "../Assets/Api/Api";
import parse from "html-react-parser";

import DynamicTableForInputsSection from "../Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const GoalsForm = (props) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [content, setContent] = useState("");
  const formattedContentRef = useRef(null);

  const goalsDetail = useRecoilValue(GoalsDetail);
  const [goalsDetailState, setGoalsDetail] = useRecoilState(GoalsDetail);
  const DefaultUrl = useRecoilValue(defaultUrl);

  const CurrentGoalData = goalsDetail[props.modalObject.key] || {
    scopeOfAdvice: "",
    when: "",
    estimatedValue: "",
    description: "",
  };

  const whenOptions = [
    { value: "Now", label: "Now" },
    { value: "Ongoing", label: "Ongoing" },
    ...Array.from({ length: 10 }, (_, i) => ({
      value: `Year ${i + 1}`,
      label: `Year ${i + 1}`,
    })),
  ];

  const RemoveSpan = (text) => {
    let cleanedText = text.replace(/<span[^>]*>|<\/span>/g, "");
    cleanedText = cleanedText.replace(/<strong[^>]*>|<\/strong>/g, "");
    return cleanedText;
  };

  const autoDescription = (e, setFieldValue, handleChange) => {
    if (e.value !== "") {
      if (props.modalObject.whenScopeIs.trim() === e.value.trim()) {
        const arrayData = props.modalObject.descriptionArray;
        const combinedText = arrayData
          .map((item) => item.text || "")
          .join("<br/>");
        setFieldValue("description", combinedText);
        setContent(combinedText);
        setShowDropDown(false);

        // StoreText(arrayData.join(""), setFieldValue);
      } else {
        setFieldValue("description", "");
      }
    }
    setFieldValue("scopeOfAdvice", e.value);
  };

  const onSubmit = async (values) => {
    try {
      let obj = { ...values };
      if (!CurrentGoalData.clientFK) {
        obj.clientFK = localStorage.getItem("UserID");
      } else {
        obj.clientFK = CurrentGoalData.clientFK;
      }

      if (obj.description === "") {
        if (content) {
          obj.description = content;
        } else if (formattedContentRef.current) {
          obj.description = formattedContentRef.current.textContent;
        }
      }

      obj.description = RemoveSpan(obj.description);

      let res;
      if (!CurrentGoalData.clientFK) {
        res = await PostAxios(
          `${DefaultUrl}/api/${props.modalObject.key}/Add`,
          obj
        );
      } else {
        obj._id = CurrentGoalData._id;
        res = await PatchAxios(
          `${DefaultUrl}/api/${props.modalObject.key}/Update`,
          obj
        );
      }

      if (res) {
        const updatedData = { ...goalsDetail, [props.modalObject.key]: res };
        setGoalsDetail(updatedData);
        openNotificationSuccess(
          "success",
          "topRight",
          "Success",
          `Data of "${props.modalObject.title}" is Saved`
        );
      }

      if (props.flagState) {
        props.setFlagState(false);
        props.setIsEditing(!props.isEditing);
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error",
        `Data of "${props.modalObject.title}" could not be saved. Please try again.`
      );
    }
  };

  const initialValues = {
    scopeOfAdvice: props.modalObject.scopeOfAdvice.trim() || "",
    when: "",
    estimatedValue: "",
    description: "",
  };

  const fillInitialValues = (setFieldValue) => {
    if (CurrentGoalData && CurrentGoalData.clientFK) {
      setFieldValue(
        "scopeOfAdvice",
        CurrentGoalData.scopeOfAdvice ||
          props.modalObject.scopeOfAdvice.trim() ||
          ""
      );
      setFieldValue("when", CurrentGoalData.when || "");
      setFieldValue("estimatedValue", CurrentGoalData.estimatedValue || "");
      setFieldValue("description", CurrentGoalData.description || "");
      setContent(CurrentGoalData.description);
    } else {
      console.log("ma aya");
      autoDescription(
        {
          value:
            CurrentGoalData.scopeOfAdvice ||
            props.modalObject.scopeOfAdvice.trim() ||
            "",
        },
        setFieldValue,
        () => {}
      );
    }
  };

  useEffect(() => {
    if (formattedContentRef.current) {
      formattedContentRef.current.innerHTML = content;
    }
  }, [content]);

  const columns = [
    {
      title: "Scope of Advice",
      dataIndex: "scopeOfAdvice",
      key: "scopeOfAdvice",
      justText: true,
      type: "select",
      options: [
        "Age Care",
        "Cashflow",
        "Centrelink",
        "Debt Management",
        "Estate Planning",
        "Investments",
        "Other",
        "Personal Insurance",
        "Retirement Planning",
        "Superannuation",
      ].map((opt) => ({ label: opt, value: opt })),
      placeholder: "Select Scope",
      callBack: true,
      func: (values, setFieldValue, currentInput) =>
        autoDescription(currentInput, setFieldValue, () => {}),
    },
    {
      title: "When",
      dataIndex: "when",
      key: "when",
      type: "select-creatable",
      options: whenOptions,
      placeholder: "Select When",
    },
    {
      title: "Estimated Value",
      dataIndex: "estimatedValue",
      key: "estimatedValue",
      type: "number-toComma",
      placeholder: "Estimated Value",
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, handleChange, setFieldValue }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        const dataRows = useMemo(() => {
          return [
            {
              key: "goalRow",
              scopeOfAdvice: values.scopeOfAdvice || "",
              when: values.when || "",
              estimatedValue: values.estimatedValue || "",
            },
          ];
        }, [values]);

        return (
          <Form>
            <div className="mt-4 All_Client reportSection">
              <AntdTable
                columns={columns}
                data={dataRows}
                values={values}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                isEditing={props?.isEditing}
                setIsEditing={props?.setIsEditing}
              />
            </div>

            {!showDropDown && (
              <div className="col-md-12 pe-3 mt-3">
                <label htmlFor="description" className="fw-bold">
                  Description:
                </label>

                <div
                  className="formatted-content form-control inputDesignDoubleInput goalsPara"
                  style={{ minHeight: "10vh" }}
                  ref={formattedContentRef}
                  contentEditable={props?.isEditing}
                  onInput={(e) => {
                    setFieldValue(
                      "description",
                      RemoveSpan(e.target.innerHTML)
                    );
                  }}
                />
              </div>
            )}

            <button type="submit" style={{ display: "none" }}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default GoalsForm;
