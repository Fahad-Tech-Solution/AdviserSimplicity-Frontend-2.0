import { Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CashFlowData,
  CashFlowScenarioData,
  defaultUrl,
  PersonalDetailsData,
} from "../../../Store/Store";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  toCommaAndDollar,
} from "../../../Components/Assets/Api/Api";
import DynamicTableForInputsSection from "../../../Components/Assets/Table/DynamicTableForInputsSection";
import { differenceInYears } from "date-fns";
import DatePicker from "react-datepicker";
import { ConfigProvider, Select } from "antd";
const { Option } = Select;
const AntdTable = DynamicTableForInputsSection("antd");

const CashFlowEducationExpenses = (props) => {
  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const scenarioData = useRecoilValue(CashFlowScenarioData);
  const personalDetails = useRecoilValue(PersonalDetailsData);
  const DefaultUrl = useRecoilValue(defaultUrl);

  const [objKey] = useState(props.modalObject.key);

  const existingData = cashFlowData?.[objKey];

  const initialValues = {
    numberOfChildren: existingData?.numberOfChildren || 0,
    children: existingData?.arrayOfChildren || [],
  };

  // ------------------------------------
  // Fill Initial Values
  // ------------------------------------
  const fillInitialValues = (setFieldValue) => {
    const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

    if (
      scenarioObj?.selectedSource === "discoveryForm" &&
      personalDetails?.children?.arrayOfChildren &&
      !existingData?._id
    ) {
      setFieldValue(
        "child",
        personalDetails.children.arrayOfChildren.map((child) => ({
          ...child,
          Name: child.firstName + " " + child.lastName,
          age: child.age,
          DOB: child.dob,
          indexation: child.indexation || "2.50%",
        }))
      );
      setFieldValue(
        "numberOfChildren",
        personalDetails.children.arrayOfChildren.length || 0
      );
    } else if (scenarioData?.[objKey]) {
      setFieldValue("child", scenarioData?.[objKey]?.arrayOfChildren);
      setFieldValue(
        "numberOfChildren",
        scenarioData?.[objKey]?.numberOfChildren || 0
      );
    } else if (existingData) {

      setFieldValue("child", existingData.arrayOfChildren);
      setFieldValue("numberOfChildren", existingData.numberOfChildren || 0);
    }
  };

  // ------------------------------------
  // Submit Handler
  // ------------------------------------
  const onSubmit = async (values) => {
    const childrenArray = values.child || [];

    const obj = {
      numberOfChildren: childrenArray.length,
      arrayOfChildren: childrenArray,
      clientTotal:
        toCommaAndDollar(
          childrenArray.reduce(
            (t, c) =>
              t +
              parseFloat(
                c.childSupportReceived?.replace(/[^0-9.-]+/g, "") || 0
              ),
            0
          )
        ) || "$0",
      scenarioFK: JSON.parse(localStorage.getItem("ScenarioObj"))._id,
    };

    try {
      const hasExisting = cashFlowData?.[objKey]?._id;

      const res = hasExisting
        ? await PatchAxios(`${DefaultUrl}/api/CF/${objKey}/Update`, obj)
        : await PostAxios(`${DefaultUrl}/api/CF/${objKey}/Add`, obj);

      if (res) {
        setCashFlowData((prev) => ({
          ...prev,
          [objKey]: res,
        }));
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success",
        `Data of "${props.modalObject.title}" saved`
      );

      props.flagState && props.setFlagState(false);
    } catch (err) {
      openNotificationSuccess(
        "error",
        "topRight",
        "Error",
        `Failed to save "${props.modalObject.title}"`
      );
    }
  };

  // ------------------------------------
  // Table Columns
  // ------------------------------------
  const indexationOptions = Array.from({ length: 21 }, (_, i) => ({
    label: `${(i * 0.5).toFixed(2)}%`,
    value: `${(i * 0.5).toFixed(2)}%`,
  }));

  const columns = [
    {
      title: "No#",
      render: (_, __, i) => i + 1,
      width: 60,
      justText: true,
    },
    { title: "Name", dataIndex: "Name", type: "text" },
    {
      title: "DOB",
      dataIndex: "DOB",
      key: "DOB",
      type: "antdate",
      callBack: true,
      func: (values, setFieldValue, thisInput, stakeHolder) => {
        const age =
          differenceInYears(new Date(), new Date(thisInput.value)) || 0;
        setFieldValue(stakeHolder + "age", age);
      },
    },
    { title: "Age", dataIndex: "age", type: "number", disabled: true },
    {
      title: "Child Support",
      dataIndex: "childSupportReceived",
      type: "number-toComma",
    },
    {
      title: "Paid / Received",
      dataIndex: "paidOrReceived",
      type: "select",
      options: [
        { label: "Paid", value: "Paid" },
        { label: "Received", value: "Received" },
        { label: "No", value: "No" },
      ],
    },
    { title: "Primary", dataIndex: "primary", type: "number-toComma" },
    { title: "Secondary", dataIndex: "secondary", type: "number-toComma" },
    {
      title: "Education Until",
      dataIndex: "educationUntil",
      type: "select",
      options: [
        { label: "16", value: "16" },
        { label: "17", value: "17" },
        { label: "18", value: "18" },
      ],
    },
    { title: "Uni", dataIndex: "uni", type: "number-toComma" },
    {
      title: "Course Years",
      dataIndex: "courseYears",
      type: "select",
      options: Array.from({ length: 10 }, (_, i) => ({
        label: `${i + 1}`,
        value: `${i + 1}`,
      })),
    },
    {
      title: "Indexation",
      dataIndex: "indexation",
      type: "select",
      options: indexationOptions,
    },
  ];

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
        }, []);

        const dataRows = useMemo(() => {
          const num = Number(values.numberOfChildren) || 0;
          if (num > 0) {
            return Array.from({ length: num }, (_, i) => ({
              key: `child.${i}`,
              owner: i + 1,
              stakeHolder: `child[${i}]`,

              Name: values.child?.[i]?.Name || "",
              DOB: values.child?.[i]?.DOB || "",
              age: values.child?.[i]?.age || "",
              childSupportReceived:
                values.child?.[i]?.childSupportReceived || "",
              paidOrReceived: values.child?.[i]?.paidOrReceived || "",
              primary: values.child?.[i]?.primary || "",
              secondary: values.child?.[i]?.secondary || "",
              educationUntil: values.child?.[i]?.educationUntil || "",
              uni: values.child?.[i]?.uni || "",
              courseYears: values.child?.[i]?.courseYears || "",
              indexation: values.child?.[i]?.indexation || "2.50%",
            }));
          }
          return [];
        }, [values.numberOfChildren, values.child]);

        return (
          <Form>
            <div className="d-flex justify-content-center align-items-center gap-3">
              <p
                className="text-end mt-1 pt-2"
                onClick={() => {
                  console.log(values);
                }}
              >
                Number of Children :
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
                    id="numberOfChildren"
                    name="numberOfChildren"
                    className="w-100 h-100"
                    placeholder="Select"
                    size="large"
                    value={values.numberOfChildren || undefined}
                    onChange={(value) => {
                      setFieldValue("numberOfChildren", value);
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

            {values.numberOfChildren > 0 && (
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

            <button type="submit" hidden />
          </Form>
        );
      }}
    </Formik>
  );
};

export default CashFlowEducationExpenses;
