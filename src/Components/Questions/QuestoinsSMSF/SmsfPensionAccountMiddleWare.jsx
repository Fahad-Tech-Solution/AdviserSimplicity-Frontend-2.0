import { Field, Form, Formik } from "formik";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Button, Row } from "react-bootstrap";
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
import { ConfigProvider, Select, Tag } from "antd";
import SmsfPensionAccount from "./SmsfPensionAccount";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const SmsfPensionAccountMiddleWare = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  const [userStatus] = useState(localStorage.getItem("UserStatus"));
  const [showError, setShowError] = useState({});
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  const SMSFPensionPhase =
    questionDetail.SMSFPensionPhase &&
    Object.keys(questionDetail.SMSFPensionPhase).length > 0
      ? questionDetail.SMSFPensionPhase
      : { client: [], partner: [], joint: [] };

  const existingMembers = SMSFPensionPhase.member || [];

  // Helper function to get member data
  const getMemberData = useCallback(
    (member) => {
      if (member === "client" && SMSFPensionPhase?.client?.length > 0) {
        return SMSFPensionPhase.client[0];
      } else if (
        member === "partner" &&
        SMSFPensionPhase?.partner?.length > 0
      ) {
        return SMSFPensionPhase.partner[0];
      } else if (member === "joint" && SMSFPensionPhase?.joint?.length > 0) {
        return SMSFPensionPhase.joint[0];
      }
      return {};
    },
    [SMSFPensionPhase]
  );

  // Initialize form values
  const initialValues = useMemo(() => {
    const members = existingMembers.length > 0 ? existingMembers : ["client"];

    const pensionData = members.map((member) => {
      const memberData = getMemberData(member);
      return {
        member,
        pensionBenefitsTotal: memberData.pensionBenefitsTotal || "",
        pensionBenefitsTotalArray: memberData.pensionBenefitsTotalArray || [],
      };
    });

    return {
      selectedMembers: members,
      pensionData,
    };
  }, [existingMembers, getMemberData]);

  // Sync pensionData when selectedMembers changes
  const syncPensionDataWithSelectedMembers = useCallback(
    (selectedMembers, currentPensionData, setFieldValue) => {
      const newPensionData = selectedMembers.map((member) => {
        // Try to find existing data for this member
        const existingData = currentPensionData.find(
          (item) => item.member === member
        );
        if (existingData) {
          return existingData;
        }

        // If no existing data, get from backend or create new
        const memberData = getMemberData(member);
        return {
          member,
          pensionBenefitsTotal: memberData.pensionBenefitsTotal || "",
          pensionBenefitsTotalArray: memberData.pensionBenefitsTotalArray || [],
        };
      });

      setFieldValue("pensionData", newPensionData);
    },
    [getMemberData]
  );

  const fillInitialValues = useCallback(
    (setFieldValue) => {
      try {
        setFieldValue("selectedMembers", initialValues.selectedMembers);
        setFieldValue("pensionData", initialValues.pensionData);
      } catch (error) {
        console.error("Error initializing values:", error);
      }
    },
    [initialValues]
  );

  const handleInnerModal = useCallback(
    (innerModalTitle, key, stakeHolder, values, type, question) => {
      const index = parseFloat(stakeHolder.replace(/[^0-9-]+/g, ""));
      const baseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");

      setModalObject({
        title: `${RenderName(values.selectedMembers[index])}${innerModalTitle}`,
        question,
        key,
        stakeHolder,
        editArray: values?.pensionData?.[index]?.[key] || [],
        values,
        ParentModalObject: props.modalObject,
        Input: values.selectedMembers[index],
      });
      setFlagState(true);
    },
    [props.modalObject]
  );

  const checkInputValue = useCallback(
    (values, setFieldValue, currentInput, stakeHolder) => {
      const index = parseFloat(stakeHolder.replace(/[^0-9-]+/g, ""));
      const pensionBenefitsTotalArray =
        values?.pensionData?.[index]?.pensionBenefitsTotalArray;

      if (
        !pensionBenefitsTotalArray ||
        !Array.isArray(pensionBenefitsTotalArray)
      )
        return;

      const expectedSum = parseFloat(
        pensionBenefitsTotalArray.reduce(
          (total, entry) =>
            total +
            parseFloat(
              (entry.pensionBenefits || "0").replace(/[^0-9.-]+/g, "")
            ),
          0
        )
      );
      const inputValue = parseFloat(
        currentInput.value.replace(/[^0-9.-]+/g, "") || 0
      );

      if (expectedSum !== inputValue) {
        setShowError((prevState) => ({
          ...prevState,
          [`pensionBenefitsTotal${index}Error`]: true,
          [`pensionBenefitsTotal${index}Message`]:
            "Total must be equal to the sum of all Pension Benefits filled in the popup. The sum is " +
            toCommaAndDollar(expectedSum),
        }));
      } else {
        setShowError((prevState) => ({
          ...prevState,
          [`pensionBenefitsTotal${index}Error`]: false,
          [`pensionBenefitsTotal${index}Message`]: "",
        }));
      }
    },
    []
  );

  const DefaultUrl = useRecoilValue(defaultUrl);

  const onSubmit = useCallback(
    async (values) => {
      try {
        const pensionData = values.pensionData || [];
        const submissionData = {
          clientFK: localStorage.getItem("UserID"),
          member: values.selectedMembers || [],
        };

        // Map data to client, partner, joint based on member type
        pensionData.forEach((item) => {
          const newEntry = {
            pensionBenefitsTotal: item.pensionBenefitsTotal || "",
            pensionBenefitsTotalArray: item.pensionBenefitsTotalArray || [],
          };

          if (item.member === "client") {
            submissionData.client = [newEntry];
          } else if (item.member === "partner") {
            submissionData.partner = [newEntry];
          } else if (item.member === "joint") {
            submissionData.joint = [newEntry];
          }
        });

        // Calculate totals
        if (submissionData.client) {
          submissionData.clientTotal = toCommaAndDollar(
            submissionData.client.reduce(
              (total, entry) =>
                total +
                parseFloat(
                  entry.pensionBenefitsTotal.replace(/[^0-9.-]+/g, "") || 0
                ),
              0
            )
          );
        }

        if (submissionData.partner) {
          submissionData.partnerTotal = toCommaAndDollar(
            submissionData.partner.reduce(
              (total, entry) =>
                total +
                parseFloat(
                  entry.pensionBenefitsTotal.replace(/[^0-9.-]+/g, "") || 0
                ),
              0
            )
          );
        }

        if (submissionData.joint) {
          submissionData.jointTotal = toCommaAndDollar(
            submissionData.joint.reduce(
              (total, entry) =>
                total +
                parseFloat(
                  entry.pensionBenefitsTotal.replace(/[^0-9.-]+/g, "") || 0
                ),
              0
            )
          );
        }

        const bankAccountArray = SMSFPensionPhase.clientFK || "";
        const url = `${DefaultUrl}/api/SMSFPensionPhase`;

        let response;
        if (!bankAccountArray) {
          response = await PostAxios(`${url}/Add`, submissionData);
        } else {
          response = await PatchAxios(`${url}/Update`, submissionData);
        }

        if (response) {
          const updatedData = { ...questionDetail, SMSFPensionPhase: response };
          setQuestionDetail(updatedData);

          openNotificationSuccess(
            "success",
            "topRight",
            "Success Notification",
            `Data of "${props.modalObject.title}" is Saved`
          );

          if (props.flagState) {
            props.setFlagState(false);
            props.setIsEditing((prev) => !prev);
          }
        }
      } catch (error) {
        console.error("API call error:", error);
        openNotificationSuccess(
          "error",
          "topRight",
          "Error Notification",
          `Data of "${props.modalObject.title}" is not Saved. Please try again!`
        );
      }
    },
    [DefaultUrl, SMSFPensionPhase, questionDetail, setQuestionDetail, props]
  );

  const memberOptions = useMemo(() => {
    const options = [{ value: "client", label: RenderName("client") }];

    if (userStatus !== "Single") {
      options.push({ value: "partner", label: RenderName("partner") });
    }

    return options;
  }, [userStatus]);

  const columns = useMemo(
    () => [
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
        innerModalTitle: "_Pension Benefits",
        placeholder: "Pension Benefits",
        validate: true,
        errorState: showError,
        func: (innerModalTitle, values, key, stakeHolder) =>
          handleInnerModal(
            innerModalTitle,
            key,
            stakeHolder,
            values,
            "Pension Benefits",
            `Number of Pension Benefits`
          ),
        checkInput: checkInputValue,
      },
    ],
    [showError, handleInnerModal, checkInputValue]
  );

  const ModalContent = useCallback((obj) => {
    if (obj.key === "pensionBenefitsTotal") {
      return <SmsfPensionAccount />;
    }
    return null;
  }, []);

  const handleMemberSelectionChange = useCallback(
    (selectedValues, setFieldValue, values) => {
      setFieldValue("selectedMembers", selectedValues);

      // Sync pensionData with selectedMembers - remove data for deselected members
      const currentPensionData = values.pensionData || [];
      const newPensionData = currentPensionData.filter((item) =>
        selectedValues.includes(item.member)
      );

      // Add empty entries for newly selected members
      selectedValues.forEach((member) => {
        if (!newPensionData.some((item) => item.member === member)) {
          const memberData = getMemberData(member);
          newPensionData.push({
            member,
            pensionBenefitsTotal: memberData.pensionBenefitsTotal || "",
            pensionBenefitsTotalArray:
              memberData.pensionBenefitsTotalArray || [],
          });
        }
      });

      setFieldValue("pensionData", newPensionData);

      // Clear errors for removed members
      const newShowError = { ...showError };
      Object.keys(newShowError).forEach((key) => {
        if (key.includes("pensionBenefitsTotal") && key.includes("Error")) {
          const index = key
            .replace("pensionBenefitsTotal", "")
            .replace("Error", "");
          if (!selectedValues[index]) {
            delete newShowError[key];
            delete newShowError[`pensionBenefitsTotal${index}Message`];
          }
        }
      });
      setShowError(newShowError);
    },
    [getMemberData, showError]
  );

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
        }, [fillInitialValues]);

        const dataRows = useMemo(() => {
          if (values.selectedMembers && values.selectedMembers.length > 0) {
            return values.selectedMembers.map((member, index) => {
              const pensionDataItem = values.pensionData?.[index] || {};

              return {
                key: `pensionData.${index}`,
                stakeHolder: `pensionData[${index}]`,
                member: RenderName(member) || "",
                pensionBenefitsTotal:
                  pensionDataItem.pensionBenefitsTotal || "",
                pensionBenefitsTotalArray:
                  pensionDataItem.pensionBenefitsTotalArray || [],
                pensionData: values.pensionData || [],
              };
            });
          }
          return [];
        }, [values.selectedMembers, values.pensionData]);

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

            <div className="d-flex justify-content-start align-items-center gap-4">
              <p className="text-end mt-1 pt-2">Members of SMSF</p>
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
                      handleMemberSelectionChange(
                        selectedValues,
                        setFieldValue,
                        values
                      );
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
                  showError={showError}
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
