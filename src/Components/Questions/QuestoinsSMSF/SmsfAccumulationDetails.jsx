import { Formik, Form } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
  toCommaAndDollar,
} from "../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import DynamicYesNo from "../FinancialInvestments/QuestionsDetail/DynamicYesNo";
import Beneficiaries from "../FinancialInvestments/QuestionsDetail/Beneficiaries";
import AccumulationBenefits from "./AccumulationBenefits";
import Contributions from "../FinancialInvestments/QuestionsDetail/Contributions";
import { ConfigProvider, Select, Tag } from "antd";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const SmsfAccumulationDetails = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  const [ShowError, setShowError] = useState({});
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  const UserStatus = localStorage.getItem("UserStatus");

  // Determine name based on stakeholder
  const [nameSet] = useState(() => {
    if (props.modalObject.Input === "client") {
      return localStorage.getItem("UserName");
    } else if (props.modalObject.Input === "partner") {
      return localStorage.getItem("PartnerName");
    } else if (props.modalObject.Input === "joint") {
      return (
        localStorage.getItem("UserName") +
        " & " +
        localStorage.getItem("PartnerName")
      );
    }
    return "";
  });

  // Load existing data if available
  const SMSFAccumulationDetails =
    Object.keys(questionDetail.SMSFAccumulationDetails).length > 0
      ? questionDetail.SMSFAccumulationDetails
      : { client: [], partner: [], joint: [] };

  const existingMembers = SMSFAccumulationDetails.member || [];

  const initialValues = {};

  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    if (existingMembers.length) {
      setDynamicFields(Array(existingMembers.length).fill(""));
    }
  }, [existingMembers]);

  const fillInitialValues = (setFieldValue) => {
    if (existingMembers.length) {
      let smsfAccumulation = existingMembers.map((member, index) => {
        return {
          member,
          accumulationBenefits:
            SMSFAccumulationDetails?.[member]?.[0]?.accumulationBenefits || "",
          accumulationBenefitsArray:
            SMSFAccumulationDetails?.[member]?.[0]?.accumulationBenefitsArray ||
            [],
          contributions:
            SMSFAccumulationDetails?.[member]?.[0]?.contributions || "",
          contributionsArray:
            SMSFAccumulationDetails?.[member]?.[0]?.contributionsArray || [],
          nominatedBeneficiaries:
            SMSFAccumulationDetails?.[member]?.[0]?.nominatedBeneficiaries ||
            "",
          nominatedBeneficiariesDetails:
            SMSFAccumulationDetails?.[member]?.[0]
              ?.nominatedBeneficiariesDetails || {},
        };
      });

      setFieldValue("smsfAccumulation", smsfAccumulation);
      setFieldValue("selectedMembers", existingMembers);
    }
  };

  const handleInnerModal = (
    innerModalTitle,
    key,
    stakeHolder,
    values,
    type,
    question
  ) => {
    const index = parseFloat(stakeHolder.replace(/[^0-9-]+/g, ""));
    const BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");

    setModalObject({
      title: `${nameSet}${innerModalTitle}`,
      question,
      key,
      stakeHolder,
      editArray: values?.[BaseKey]?.[index]?.[key] || [],
      values,
      ParentModalObject: props.modalObject,
    });
    setFlagState(true);
  };

  const CheckInputValue = (
    values,
    setFieldValue,
    currentInput,
    stakeHolder
  ) => {
    const index = parseFloat(stakeHolder.replace(/[^0-9-]+/g, ""));
    const accumulationBenefitsarray =
      values?.smsfAccumulation?.[index]?.accumulationBenefitsarray;

    if (!accumulationBenefitsarray) return;

    const ExpectedSum = parseFloat(
      accumulationBenefitsarray.taxFreeComponent?.replace(/[^0-9.-]+/g, "") || 0
    );
    const data = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, ""));

    if (ExpectedSum !== data) {
      setShowError((prevState) => ({
        ...prevState,
        [`accumulationBenefits${index}Error`]: true,
        [`accumulationBenefits${index}Message`]:
          "Total must be equal to the sum of all Investment value filled in the popup. The sum is " +
          toCommaAndDollar(ExpectedSum),
      }));
    } else {
      setShowError((prevState) => ({
        ...prevState,
        [`accumulationBenefits${index}Error`]: false,
        [`accumulationBenefits${index}Message`]: "",
      }));
    }
  };

  const DefaultUrl = useRecoilValue(defaultUrl);

  const onSubmit = async (values) => {
    // console.log(values);

    const fundData = values.selectedMembers || [];

    // Prepare the object for API call
    const obj = {
      clientFK: localStorage.getItem("UserID"),
      member: values.selectedMembers || [],
    };

    // Map data to client, partner, joint based on member type
    fundData.forEach((item, index) => {
      const newEntry = {
        accumulationBenefits:
          values.smsfAccumulation?.[index]?.accumulationBenefits || "",
        accumulationBenefitsArray:
          values.smsfAccumulation?.[index]?.accumulationBenefitsArray || "",
        contributions: values.smsfAccumulation?.[index]?.contributions || "",
        contributionsArray:
          values.smsfAccumulation?.[index]?.contributionsArray || "",
        nominatedBeneficiaries:
          values.smsfAccumulation?.[index]?.nominatedBeneficiaries || "",
        nominatedBeneficiariesDetails:
          values.smsfAccumulation?.[index]?.nominatedBeneficiariesDetails || "",
      };

      obj[item] = [newEntry];
      obj[item + "Total"] =
        values.smsfAccumulation?.[index]?.accumulationBenefits;
    });

    const bankAccountArray = SMSFAccumulationDetails.clientFK || "";

    console.log("Payload is :", obj);

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/SMSFAccumulationDetails/Add`,
          obj
        );
      } else {
        res = await PatchAxios(
          `${DefaultUrl}/api/SMSFAccumulationDetails/Update`,
          obj
        );
      }

      if (res) {
        const updatedData = { ...questionDetail, SMSFAccumulationDetails: res };
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
        `Data of "${props.modalObject.title}" is not Saved Please! try again`
      );
    }
  };

  const memberOptions =
    UserStatus !== "Single"
      ? [
          { value: "client", label: RenderName("client") },
          { value: "partner", label: RenderName("partner") },
        ]
      : [{ value: "client", label: RenderName("client") }];

  const columns = [
    {
      title: "No#",
      dataIndex: "owner",
      key: "owner",
      width: 50,
    },
    {
      title: "Member",
      dataIndex: "member",
      key: "member",
      width: 100,
      justText: true,
    },
    {
      title: "Accumulation Benefits",
      dataIndex: "accumulationBenefits",
      key: "accumulationBenefits",
      type: "number-toComma-Modal",
      innerModalTitle: "_Accumulation Benefits",
      placeholder: "Accumulation Benefits",
      validate: true,
      errorState: ShowError,
      func: (innerModalTitle, values, key, stakeHolder) =>
        handleInnerModal(
          innerModalTitle,
          key,
          stakeHolder,
          values,
          "Accumulation Benefits",
          `How many Accumulation Benefits do ${nameSet} have?`
        ),
      checkInput: CheckInputValue,
    },
    {
      title: "Contributions",
      dataIndex: "contributions",
      key: "contributions",
      type: "yesnoModal",
      innerModalTitle: "_Contributions",
      placeholder: "Contributions",
      callBack: true,
      func: (innerModalTitle, values, key, stakeHolder) =>
        handleInnerModal(
          innerModalTitle,
          key,
          stakeHolder,
          values,
          "Contributions",
          `Number of contributions `
        ),
      customComponent: DynamicYesNo,
    },
    {
      title: "Nominated Beneficiaries",
      dataIndex: "nominatedBeneficiaries",
      key: "nominatedBeneficiaries",
      type: "yesnoModal",
      innerModalTitle: "_Beneficiaries",
      placeholder: "Beneficiaries",
      callBack: true,
      func: (innerModalTitle, values, key, stakeHolder) =>
        handleInnerModal(
          innerModalTitle,
          key,
          stakeHolder,
          values,
          "Beneficiaries",
          `Number of beneficiaries`
        ),
      customComponent: DynamicYesNo,
    },
  ];

  const componentMapping = {
    accumulationBenefits: <AccumulationBenefits />,
    contributions: <Contributions />,
    nominatedBeneficiaries: <Beneficiaries />,
  };

  const ModalContent = (obj) => {
    return componentMapping[obj.key] || null;
  };

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
        }, [existingMembers]);

        // Update table data when selected members change

        const dataRows = useMemo(() => {
          if (values.selectedMembers && values.selectedMembers.length > 0) {
            return values.selectedMembers.map((item, index) => ({
              key: `smsfAccumulation.${index}`,
              owner: index + 1,
              stakeHolder: `smsfAccumulation[${index}]`,
              member: RenderName(item) || "",
              accumulationBenefits:
                values.smsfAccumulation?.[index]?.accumulationBenefits || "",
              contributions:
                values.smsfAccumulation?.[index]?.contributions || "",
              nominatedBeneficiaries:
                values.smsfAccumulation?.[index]?.nominatedBeneficiaries || "",
            }));
          }
          return [];
        }, [values]);

        return (
          <Form>
            <InnerModal
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              setFlagState={setFlagState}
              flagState={flagState}
              setIsEditing={props.setIsEditing}
            >
              {ModalContent(modalObject)}
            </InnerModal>

            <div className="d-flex justify-content-center align-items-center gap-4">
              <p
                className="text-end mt-1 pt-2"
                onClick={() => {
                  console.log(values);
                }}
              >
                Members of SMSF
              </p>
              <div style={{ minWidth: "25%" }}>
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
                    id="selectedMembers"
                    name="selectedMembers"
                    className="w-100 h-100"
                    placeholder="Select Members"
                    size="large"
                    mode="multiple"
                    value={values.selectedMembers || []}
                    onChange={(selectedValues) => {
                      setFieldValue("selectedMembers", selectedValues);
                    }}
                    onBlur={handleBlur}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  >
                    {memberOptions.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </ConfigProvider>
              </div>
            </div>

            {values.selectedMembers && values.selectedMembers.length > 0 && (
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
                  showError={ShowError}
                  setShowError={setShowError}
                />
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default SmsfAccumulationDetails;
