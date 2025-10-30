import { Field, Form, Formik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  BankDetail,
  CRState,
  defaultUrl,
  QuestionDetail,
} from "../../../Store/Store";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
} from "../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import NewLoadingExclusion from "./NewLoadingExclusion";
import Beneficiaries from "../FinancialInvestments/QuestionsDetail/Beneficiaries";
import PremiumsDetails from "./PremiumsDetails";
import { ConfigProvider, Select } from "antd";
import PersonalInsurance from "./PersonalInsurance";
import DynamicDescription from "../EstatePlanning/DynamicDescription";
import GroupCoverDetails from "./GroupCoverDetails";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const PersonalInsuranceLife = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  const DefaultUrl = useRecoilValue(defaultUrl);
  const bankDetailObj = useRecoilValue(BankDetail);
  const [CRObject, setCRObject] = useRecoilState(CRState);
  const [UserStatus] = useState(localStorage.getItem("UserStatus"));
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  const personalInsurance =
    Object.keys(questionDetail.personalInsurance || {}).length > 0
      ? questionDetail.personalInsurance
      : {
          client: [],
          partner: [],
          joint: [],
          PersonalInsurance: [],
          numberOfPersonalInsurance: 0,
        };

  const initialValues = {
    NumberOfMap: "",
    PersonalInsurance: [],
  };

  const fillInitialValues = (setFieldValue) => {
    if (personalInsurance && personalInsurance.PersonalInsurance?.length) {
      setFieldValue(
        "NumberOfMap",
        personalInsurance.numberOfPersonalInsurance || 0
      );

      personalInsurance.PersonalInsurance.forEach((entry, index) => {
        const fields = [
          "lifeInsured",
          "provider",
          "policyNo",
          "Owner",
          "startDate",
          "smoker",
          "life",
          "TPD",
          "trauma",
          "IP",
          "premiums",
          "loadingExclusion",
          "loadingExclusionValue",
          "beneficiary",
          "beneficiariesArray",
        ];
        fields.forEach((field) =>
          setFieldValue(
            `PersonalInsurance[${index}].${field}`,
            entry[field] || (Array.isArray(entry[field]) ? [] : "")
          )
        );
      });
    } else {
      setFieldValue("NumberOfMap", "");
      setFieldValue("PersonalInsurance", []);
    }
  };

  const handleInnerModal = (innerModalTitle, values, key, stakeHolder) => {
    const index = stakeHolder.replace(/[^0-9]+/g, "");
    const BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");
    const title =
      RenderName(values?.[BaseKey]?.[index].lifeInsured) + innerModalTitle;
    let finalKey = key;
    if (["life", "TPD", "trauma"].includes(key)) {
      finalKey = "LifeTPDTrauma";
    }
    setModalObject({
      title,
      key: finalKey,
      values,
      stakeHolder,
    });
    setFlagState(true);
  };

  const onSubmit = async (values) => {
    const newEntries = [];
    const loopLength = parseFloat(values.NumberOfMap) || 0;

    for (let i = 0; i < loopLength; i++) {
      newEntries.push({
        lifeInsured: values.PersonalInsurance[i]?.lifeInsured || "",
        provider: values.PersonalInsurance[i]?.provider || "",
        policyNo: values.PersonalInsurance[i]?.policyNo || "",
        Owner: values.PersonalInsurance[i]?.Owner || "",
        startDate: values.PersonalInsurance[i]?.startDate || "",
        smoker: values.PersonalInsurance[i]?.smoker || "",
        life: values.PersonalInsurance[i]?.life || [],
        TPD: values.PersonalInsurance[i]?.TPD || [],
        trauma: values.PersonalInsurance[i]?.trauma || [],
        IP: values.PersonalInsurance[i]?.IP || [],
        premiums: values.PersonalInsurance[i]?.premiums || "",
        loadingExclusion: values.PersonalInsurance[i]?.loadingExclusion || "",
        loadingExclusionValue:
          values.PersonalInsurance[i]?.loadingExclusionValue || "",
        beneficiary: values.PersonalInsurance[i]?.beneficiary || "",
        beneficiariesArray:
          values.PersonalInsurance[i]?.beneficiariesArray || [],
      });
    }

    const Obj = {
      PersonalInsurance: newEntries,
      numberOfPersonalInsurance: newEntries.length,
      clientFK: localStorage.getItem("UserID"),
    };

    try {
      const res = personalInsurance.clientFK
        ? await PatchAxios(`${DefaultUrl}/api/personalInsurance/Update`, Obj)
        : await PostAxios(`${DefaultUrl}/api/personalInsurance/Add`, Obj);

      if (res) {
        const updatedData = { ...questionDetail, personalInsurance: res };
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
        `Data of "${props.modalObject.title}" is not Saved. Please try again!`
      );
    }
  };

  const columns = [
    {
      title: "No#",
      dataIndex: "owner",
      key: "owner",
      render: (_, __, i) => i + 1,
      justText: true,
      width: 60,
    },
    {
      title: "Life Insured",
      dataIndex: "lifeInsured",
      key: "lifeInsured",
      type: "select-antd",
      selectedOptionValue: true,
      placeholder: "Select Life Insured",
      options: [
        { value: "client", label: RenderName("client") },
        ...(UserStatus !== "Single"
          ? [
              { value: "partner", label: RenderName("partner") },
              {
                value: "joint",
                label: `${RenderName("client")} & ${RenderName("partner")}`,
              },
            ]
          : []),
      ],
      width: 180,
    },
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
      type: "select-antd",
      selectedOptionValue: true,
      placeholder: "Select Provider",
      options:
        bankDetailObj?.PersonalInsurances?.length > 0
          ? bankDetailObj.PersonalInsurances.map((elem) => ({
              value: elem._id,
              label: elem.platformName,
            }))
          : [
              {
                value: "",
                label: "No Providers Available",
                disabled: true,
              },
            ],
      width: 180,
    },
    {
      title: "Policy No",
      dataIndex: "policyNo",
      key: "policyNo",
      type: "number",
      placeholder: "Policy No",
      width: 130,
    },
    {
      title: "Owner",
      dataIndex: "Owner",
      key: "Owner",
      type: "select-antd",
      placeholder: "Select Owner",
      options: [
        { value: "SMSF", label: "SMSF" },
        { value: "Super Trustees", label: "Super Trustees" },
        { value: "Company (Pty Ltd)", label: "Company (Pty Ltd)" },
        { value: "Family Trust", label: "Family Trust" },
      ],
      width: 180,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      type: "antdate",
      placeholder: "dd/mm/yyyy",
      width: 150,
    },
    {
      title: "Smoker",
      dataIndex: "smoker",
      key: "smoker",
      type: "yesno",
      width: 120,
    },
    {
      title: "Life",
      dataIndex: "life",
      key: "life",
      type: "number-toComma-Modal",
      placeholder: "Life",
      innerModalTitle: "_Life",
      func: handleInnerModal,
      width: 140,
    },
    {
      title: "TPD",
      dataIndex: "TPD",
      key: "TPD",
      type: "number-toComma-Modal",
      placeholder: "TPD",
      innerModalTitle: "_TPD",
      func: handleInnerModal,
      width: 140,
    },
    {
      title: "Trauma",
      dataIndex: "trauma",
      key: "trauma",
      type: "number-toComma-Modal",
      placeholder: "Trauma",
      innerModalTitle: "_Trauma",
      func: handleInnerModal,
      width: 140,
    },
    {
      title: "IP",
      dataIndex: "IP",
      key: "IP",
      type: "number-toComma-Modal",
      placeholder: "IP",
      innerModalTitle: "_IP",
      func: handleInnerModal,
      width: 140,
    },
    {
      title: "Premiums p.a",
      dataIndex: "premiums",
      key: "premiums",
      type: "number-toComma-Modal",
      placeholder: "Premiums p.a",
      innerModalTitle: "_Premiums p.a",
      func: handleInnerModal,
      width: 160,
    },
    {
      title: "Loading/Exclusion",
      dataIndex: "loadingExclusion",
      key: "loadingExclusion",
      type: "yesnoModal",
      width: 190,
      innerModalTitle: "_Loading/Exclusion",
      callBack: true,
      func: handleInnerModal,
    },
    {
      title: "Beneficiary",
      dataIndex: "beneficiary",
      key: "beneficiary",
      type: "yesnoModal",
      width: 200,
      innerModalTitle: "_Beneficiaries",
      func: handleInnerModal,
      callBack: true,
    },
  ];

  const componentMapping = {
    LifeTPDTrauma: <NewLoadingExclusion />,
    life: <NewLoadingExclusion />,
    TPD: <NewLoadingExclusion />,
    trauma: <NewLoadingExclusion />,
    IP: <PersonalInsurance />,
    premiums: <PremiumsDetails />,
    beneficiary: <Beneficiaries />,
    loadingExclusion: <DynamicDescription />,
  };

  const ModalContent = (obj) => componentMapping[obj.key] || null;

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize
        innerRef={props.formRef}
      >
        {({ values, setFieldValue, handleChange, handleBlur }) => {
          useEffect(() => {
            fillInitialValues(setFieldValue);
          }, [personalInsurance.PersonalInsurance]);

          const dataRows = useMemo(() => {
            const num = Number(values.NumberOfMap) || 0;
            return num > 0
              ? Array.from({ length: num }, (_, i) => ({
                  key: `PersonalInsurance[${i}]`,
                  owner: i + 1,
                  stakeHolder: `PersonalInsurance[${i}]`,
                  ...values.PersonalInsurance[i],
                }))
              : [];
          }, [values.NumberOfMap, values.PersonalInsurance]);

          const groupDataRows = useMemo(() => {
            const num = Number(values.NumberOfMap) || 0;
            return num > 0
              ? Array.from({ length: num }, (_, i) => ({
                  key: `groupCoverDetails[${i}]`,
                  owner: i + 1,
                  stakeHolder: `groupCoverDetails[${i}]`,
                  ...(values?.groupCoverDetails[i] || []),
                }))
              : [];
          }, [values.NumberOfMap, values.groupCoverDetails]);

          return (
            <Form>
              <InnerModal
                modalObject={modalObject}
                setFieldValue={setFieldValue}
                setFlagState={setFlagState}
                flagState={flagState}
              >
                {ModalContent(modalObject)}
              </InnerModal>

              <div className="d-flex flex-row justify-content-center align-items-center gap-4">
                <p
                  className="text-end mt-1 pt-2"
                  onClick={() => {
                    console.log(values);
                  }}
                >
                  How many {props.modalObject.title} does {RenderName("client")}{" "}
                  {UserStatus === "Married" && `and ${RenderName("partner")}`}{" "}
                  have :
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
                      getPopupContainer={(triggerNode) =>
                        triggerNode.parentNode
                      }
                    >
                      {Array.from({ length: 10 }, (_, i) => (
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

              {values.NumberOfMap && (
                <div className="mt-4 All_Client reportSection">
                  <GroupCoverDetails
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    isEditing={props?.isEditing}
                    setIsEditing={props?.setIsEditing}
                    groupDataRows={groupDataRows}
                  />
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PersonalInsuranceLife;
