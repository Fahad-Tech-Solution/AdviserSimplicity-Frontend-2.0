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

const AntdTable = DynamicTableForInputsSection("antd");

const EstatePlanningProfessionalAdviser = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  const DefaultUrl = useRecoilValue(defaultUrl);
  const [nameSet] = useState(RenderName(props.modalObject.Input));

  const professionalAdviser =
    Object.keys(questionDetail.professionalAdviser || {}).length > 0
      ? questionDetail.professionalAdviser
      : {
          client: [],
          partner: [],
          joint: [],
        };

  const initialValues = professionalAdviser[props.modalObject.Input]?.length
    ? { NumberOfMap: professionalAdviser[props.modalObject.Input].length }
    : { NumberOfMap: "" };

  const [dynamicFields, setDynamicFields] = useState([]);
  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    if (
      professionalAdviser[props.modalObject.Input] &&
      professionalAdviser[props.modalObject.Input].length
    ) {
      setDynamicFields(
        Array(professionalAdviser[props.modalObject.Input].length).fill("")
      );
    }
  }, [professionalAdviser[props.modalObject.Input]]);

  const fillInitialValues = (setFieldValue) => {
    if (
      professionalAdviser[props.modalObject.Input] &&
      professionalAdviser[props.modalObject.Input].length
    ) {
      professionalAdviser[props.modalObject.Input].forEach((data, i) => {
        if (data) {
          setFieldValue(`professionalAdviser[${i}].POAType`, data.POAType || "");
          setFieldValue(`professionalAdviser[${i}].adviserName`, data.adviserName || "");
          setFieldValue(`professionalAdviser[${i}].company`, data.company || "");
          setFieldValue(`professionalAdviser[${i}].phone`, data.phone || "");
          setFieldValue(`professionalAdviser[${i}].email`, data.email || "");
        }
      });
    }
  };

  const handleInput = (e, setFieldValue) => {
    const value = e.target.value > 10 ? 10 : e.target.value;
    setFieldValue("NumberOfMap", value);
    setDynamicFields(Array(Number(value)).fill(""));
    setFieldValue(
      "professionalAdviser",
      Array(Number(value))
        .fill()
        .map(() => ({
          POAType: "",
          adviserName: "",
          company: "",
          phone: "",
          email: "",
        }))
    );
  };

  const onSubmit = async (values) => {
    const numberOfMaps = parseInt(values.NumberOfMap, 10) || 0;
    const newEntries = [];

    for (let i = 0; i < numberOfMaps; i++) {
      const newEntry = {
        POAType: values.professionalAdviser?.[i]?.POAType || "",
        adviserName: values.professionalAdviser?.[i]?.adviserName || "",
        company: values.professionalAdviser?.[i]?.company || "",
        phone: values.professionalAdviser?.[i]?.phone || "",
        email: values.professionalAdviser?.[i]?.email || "",
      };
      newEntries.push(newEntry);
    }

    const DataOf = props.modalObject.Input;
    const obj = {
      clientFK: localStorage.getItem("UserID"),
      [DataOf]: newEntries,
      [DataOf + "Total"]: newEntries.length,
    };

    setQuestionDetail((prev) => ({
      ...prev,
      professionalAdviser: {
        ...prev.professionalAdviser,
        [DataOf]: newEntries,
      },
    }));

    try {
      let res;
      const bankAccountArray = professionalAdviser.clientFK || "";
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/professionalAdviser/Add`, obj);
      } else {
        obj.collection = props.modalObject.Input;
        res = await PatchAxios(`${DefaultUrl}/api/professionalAdviser/Update`, obj);
      }

      if (res) {
        const updatedData = { ...questionDetail, professionalAdviser: res };
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
        `Data of "${props.modalObject.title}" is not Saved. Please try again!`
      );
    }
  };

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
      type: "select",
      options: [
        { value: "Accountant", label: "Accountant" },
        { value: "Lawyer/Solicitor", label: "Lawyer/Solicitor" },
        { value: "Insurance adviser", label: "Insurance adviser" },
        { value: "Doctor", label: "Doctor" },
        { value: "Other", label: "Other" },
      ],
      placeholder: "Adviser Type",
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
      type: "number",
      placeholder: "Phone",
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

  return (
    <Formik
      initialValues={{
        ...initialValues,
        professionalAdviser: professionalAdviser[props.modalObject.Input] || [],
      }}
      enableReinitialize
      innerRef={props.formRef}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [professionalAdviser[props.modalObject.Input]]);

        const dataRows = useMemo(() => {
          const num = Number(values.NumberOfMap) || 0;
          if (num > 0) {
            return Array.from({ length: num }, (_, i) => ({
              key: `professionalAdviser.${i}`,
              stakeHolder: `professionalAdviser[${i}]`,
              POAType: values.professionalAdviser?.[i]?.POAType || "",
              adviserName: values.professionalAdviser?.[i]?.adviserName || "",
              company: values.professionalAdviser?.[i]?.company || "",
              phone: values.professionalAdviser?.[i]?.phone || "",
              email: values.professionalAdviser?.[i]?.email || "",
            }));
          }
          return [];
        }, [values.NumberOfMap, values.professionalAdviser]);

        return (
          <Form>
            <div className="d-flex justify-content-center align-items-center gap-4">
              <p
                className="text-end mt-1 pt-2"
                onClick={() => {
                  console.log(values);
                }}
              >
                How many {props.modalObject.title} does {nameSet} have :
              </p>
              <div style={{ minWidth: "10%" }}>
                <select
                  id="NumberOfMap"
                  name="NumberOfMap"
                  className="form-select inputDesignDoubleInput"
                  onChange={(e) => handleInput(e, setFieldValue)}
                  value={values.NumberOfMap}
                >
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
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

export default EstatePlanningProfessionalAdviser;