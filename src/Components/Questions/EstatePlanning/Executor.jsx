// Executor.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form } from "formik";
import { useRecoilValue } from "recoil";
import { ConfigProvider, Select } from "antd";
import { QuestionDetail } from "../../../Store/Store";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const Executor = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [flagState, setFlagState] = useState(false);

  // derive stakeholder name for question label
  const [nameSet] = useState(() => {
    if (props.modalObject?.Input === "client")
      return localStorage.getItem("UserName") || "";
    else if (props.modalObject?.Input === "partner")
      return localStorage.getItem("PartnerName") || "";
    else if (props.modalObject?.Input === "joint")
      return (
        (localStorage.getItem("UserName") || "") +
        " & " +
        (localStorage.getItem("PartnerName") || "")
      );
    return "";
  });

  // existing data for this section
  const existingData =
    props.modalObject?.values?.[
      props.modalObject?.stackHolder.replace(".", "")
    ]?.[props.modalObject?.key] || [];

  const initialValues = {
    NumberOfMap: existingData.length || "",
    executors: existingData.length ? existingData : [],
  };

  const fillInitialValues = (setFieldValue) => {
    if (existingData.length) {
      setFieldValue("executors", existingData);
      setFieldValue("NumberOfMap", existingData.length);
    }
  };

  const handleInput = (e, setFieldValue) => {
    const raw = e?.target?.value ?? e;
    const value = raw > 5 ? 5 : raw; // limit to 5
    setFieldValue("NumberOfMap", value);

    const arrLength = Number(value) || 0;
    const newArray = Array(arrLength)
      .fill()
      .map((_, i) => ({
        name: "",
        dob: "",
        relationshipStatus: "",
        ...(initialValues.executors[i] || {}),
      }));
    setFieldValue("executors", newArray);
  };

  const onSubmit = async (values) => {
    const DataOf = props.modalObject?.key;
    const newEntries = values.executors || [];

    // set in parent form
    props.setFieldValue(props.modalObject?.stackHolder + DataOf, newEntries);

    // No total calculations needed, but maintain consistency
    props.modalObject?.setShowError?.((prev) => ({
      ...prev,
      [`${DataOf}Error`]: false,
      [`${DataOf}Message`]: "",
    }));

    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  const columns = [
    {
      title: "No#",
      dataIndex: "owner",
      key: "owner",
      width: 60,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      type: "text",
      placeholder: "Enter Name",
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
      type: "antdate",
      placeholder: "Select DOB",
    },
    {
      title: "Relationship Status",
      dataIndex: "relationshipStatus",
      key: "relationshipStatus",
      type: "select",
      placeholder: "Select Relationship",
      options: [
        { value: "Spouse/Defacto", label: "Spouse/Defacto" },
        { value: "Mother", label: "Mother" },
        { value: "Father", label: "Father" },
        { value: "Child", label: "Child" },
        { value: "Stepchild", label: "Stepchild" },
        { value: "Niece", label: "Niece" },
        { value: "Nephew", label: "Nephew" },
        { value: "Other", label: "Other" },
      ],
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [existingData]);

        const dataRows = useMemo(() => {
          const num = Number(values.NumberOfMap) || 0;
          if (num > 0) {
            return Array.from({ length: num }, (_, i) => ({
              key: `executors.${i}`,
              owner: i + 1,
              stakeHolder: `executors[${i}]`,
              name: values.executors?.[i]?.name || "",
              dob: values.executors?.[i]?.dob || "",
              relationshipStatus:
                values.executors?.[i]?.relationshipStatus || "",
            }));
          }
          return [];
        }, [values.NumberOfMap, values.executors]);

        return (
          <Form>
            <div className="d-flex justify-content-center align-items-center gap-4">
              <p className="text-end mt-1 pt-2">
                {props.modalObject?.question || "no question found"}
              </p>
              <div style={{ minWidth: "10%" }}>
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        colorBorder: "#36b446",
                      },
                    },
                  }}
                >
                  <Select
                    id="NumberOfMap"
                    name="NumberOfMap"
                    className="w-100 h-100"
                    placeholder="Select"
                    size="large"
                    value={values.NumberOfMap || undefined}
                    onChange={(value) => {
                      setFieldValue("NumberOfMap", value);
                    }}
                    onBlur={handleBlur}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  >
                    {Array.from({ length: 5 }, (_, i) => (
                      <Option key={i} value={i + 1}>
                        {i + 1}
                      </Option>
                    ))}
                  </Select>
                </ConfigProvider>
              </div>
            </div>

            {values.NumberOfMap && (
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
          </Form>
        );
      }}
    </Formik>
  );
};

export default Executor;
