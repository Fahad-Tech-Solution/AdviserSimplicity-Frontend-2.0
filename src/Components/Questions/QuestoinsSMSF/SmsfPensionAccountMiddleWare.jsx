import { Field, Form, Formik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
import { Button, Row } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { 
  openNotificationSuccess, 
  PatchAxios, 
  PostAxios, 
  RenderName, 
  toCommaAndDollar 
} from "../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import DynamicYesNo from "../FinancialInvestments/QuestionsDetail/DynamicYesNo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import PensionBenefits from "./PensionBenefits";
import Beneficiaries from "../FinancialInvestments/QuestionsDetail/Beneficiaries";
import { ConfigProvider, Select, Tag } from "antd";
import SmsfPensionAccount from "./SmsfPensionAccount";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const SmsfPensionAccountMiddleWare = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  let [UserStatus] = useState(localStorage.getItem('UserStatus'));
  let [ShowError, setShowError] = useState({});
  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let SMSFPensionPhase = Object.keys(questionDetail.SMSFPensionPhase).length > 0 
    ? questionDetail.SMSFPensionPhase 
    : { client: [], partner: [], joint: [] };

  const existingMembers = SMSFPensionPhase.member || [];

  const initialValues = {
    selectedMembers: existingMembers,
    pensionData: existingMembers.length ? existingMembers.map((member, index) => {
      let memberData = {};
      
      if (member === "client" && SMSFPensionPhase.client.length > 0) {
        memberData = SMSFPensionPhase.client[0];
      } else if (member === "partner" && SMSFPensionPhase.partner.length > 0) {
        memberData = SMSFPensionPhase.partner[0];
      } else if (member === "joint" && SMSFPensionPhase.joint.length > 0) {
        memberData = SMSFPensionPhase.joint[0];
      }
      
      return {
        member,
        pensionBenefitsTotal: memberData.pensionBenefitsTotal || "",
        pensionBenefitsTotalArray: memberData.pensionBenefitsTotalArray || "",
      };
    }) : [],
  };

  const fillInitialValues = (setFieldValue) => {
    try {
      if (existingMembers.length) {
        setFieldValue("selectedMembers", existingMembers);
        setFieldValue("pensionData", initialValues.pensionData);
      }
    } catch (error) {
      console.error("An error occurred while initializing values in fillInitialValues:", error);
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
      title: `${RenderName(values.selectedMembers[index])}${innerModalTitle}`,
      question,
      key,
      stakeHolder,
      editArray: values?.pensionData?.[index]?.[key] || [],
      values,
      ParentModalObject: props.modalObject,
      Input: values.selectedMembers[index]
    });
    setFlagState(true);
  };

  const CheckInputValue = (values, setFieldValue, currentInput, stakeHolder) => {
    const index = parseFloat(stakeHolder.replace(/[^0-9-]+/g, ""));
    const pensionBenefitsTotalArray = values?.pensionData?.[index]?.pensionBenefitsTotalArray;

    if (!pensionBenefitsTotalArray) return;

    const ExpectedSum = parseFloat(pensionBenefitsTotalArray.reduce(
      (total, entry) => total + parseFloat((entry.pensionBenefits || "0").replace(/[^0-9.-]+/g, "")), 
      0
    ));
    const data = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "") || 0);

    console.log(ExpectedSum, data, currentInput.name, ShowError);

    if (ExpectedSum !== data) {
      setShowError(prevState => ({
        ...prevState,
        [`pensionBenefitsTotal${index}Error`]: true,
        [`pensionBenefitsTotal${index}Message`]: "Total must be equal to the sum of all Pension Benefits filled in the popup. The sum is " + toCommaAndDollar(ExpectedSum),
      }));
    } else {
      setShowError(prevState => ({
        ...prevState,
        [`pensionBenefitsTotal${index}Error`]: false,
        [`pensionBenefitsTotal${index}Message`]: "",
      }));
    }
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    console.log(JSON.stringify(values));
    
    const pensionData = values.pensionData || [];

    let obj = {
      clientFK: localStorage.getItem("UserID"),
      member: values.selectedMembers || []
    };

    // Map data to client, partner, joint based on member type
    pensionData.forEach((item, index) => {
      const newEntry = {
        pensionBenefitsTotal: item.pensionBenefitsTotal || "",
        pensionBenefitsTotalArray: item.pensionBenefitsTotalArray || "",
      };

      if (item.member === "client") {
        obj.client = [newEntry];
        obj.clientTotal = toCommaAndDollar(obj.client.reduce(
          (total, entry) => total + parseFloat(entry.pensionBenefitsTotal.replace(/[^0-9.-]+/g, "") || 0),
          0
        ));
      } else if (item.member === "partner") {
        obj.partner = [newEntry];
        obj.partnerTotal = toCommaAndDollar(obj.partner.reduce(
          (total, entry) => total + parseFloat(entry.pensionBenefitsTotal.replace(/[^0-9.-]+/g, "") || 0),
          0
        ));
      } else if (item.member === "joint") {
        obj.joint = [newEntry];
        obj.jointTotal = toCommaAndDollar(obj.joint.reduce(
          (total, entry) => total + parseFloat(entry.pensionBenefitsTotal.replace(/[^0-9.-]+/g, "") || 0),
          0
        ));
      }
    });

    console.log(JSON.stringify(obj), "Final Obj");

    const bankAccountArray = SMSFPensionPhase.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/SMSFPensionPhase/Add`, obj);
      } else {
        res = await PatchAxios(
          `${DefaultUrl}/api/SMSFPensionPhase/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, SMSFPensionPhase: res };
        setQuestionDetail(updatedData);
      }

      openNotificationSuccess("success", "topRight", "Success Notification", 
        `Data of "${props.modalObject.title}" is Saved`);
      
      if (props.flagState) {
        props.setFlagState(false);
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess("error", "topRight", "Error Notification", 
        `Data of "${props.modalObject.title}" is not Saved Please! try again`);
    }
  };

  const memberOptions = (UserStatus !== "Single") 
    ? [
        { value: "client", label: RenderName("client") },
        { value: "partner", label: RenderName("partner") },
        { value: "joint", label: RenderName("joint") }
      ]
    : [{ value: "client", label: RenderName("client") }];

  const columns = [
    {
      title: "Member",
      dataIndex: "member",
      key: "member",
      width: 100,
      justText: true,
    },
    {
      title: "Pension Benefits",
      dataIndex: "pensionBenefitsTotal",
      key: "pensionBenefitsTotal",
      type: "number-toComma-Modal",
      innerModalTitle: "_Pension Benefits Details",
      placeholder: "Pension Benefits",
      validate: true,
      errorState: ShowError,
      func: (innerModalTitle, values, key, stakeHolder) =>
        handleInnerModal(
          innerModalTitle,
          key,
          stakeHolder,
          values,
          "Pension Benefits",
          `How many Pension Benefits does this member have?`
        ),
      checkInput: CheckInputValue,
    },
  ];

  const ModalContent = (obj) => {
    if (obj.key === "pensionBenefitsTotal") {
      return <SmsfPensionAccount />;
    }
    return null;
  };

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
        }, [existingMembers]);

        // Update table data when selected members change
        useEffect(() => {
          if (values.selectedMembers && values.selectedMembers.length > 0) {
            const newPensionData = values.selectedMembers.map((member, index) => {
              // Find existing data for this member or create new
              const existingData = values.pensionData?.find(item => item.member === member) || {};
              return {
                member,
                pensionBenefitsTotal: existingData.pensionBenefitsTotal || "",
                pensionBenefitsTotalArray: existingData.pensionBenefitsTotalArray || "",
              };
            });
            setFieldValue("pensionData", newPensionData);
          } else {
            setFieldValue("pensionData", []);
          }
        }, [values.selectedMembers]);

        const dataRows = useMemo(() => {
          if (values.pensionData && values.pensionData.length > 0) {
            return values.pensionData.map((item, index) => ({
              key: `pensionData.${index}`,
              stakeHolder: `pensionData[${index}]`,
              member: RenderName(values.selectedMembers[index]) || "",
              pensionBenefitsTotal: item.pensionBenefitsTotal || "",
            }));
          }
          return [];
        }, [values.pensionData]);

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
              <p className="text-end mt-1 pt-2" onClick={()=>{console.log(values)}}>
                Members of SMSF {questionDetail.SMSFDetails?.SMSFOwner?.fundName}
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
                    {memberOptions.map(option => (
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

export default SmsfPensionAccountMiddleWare;