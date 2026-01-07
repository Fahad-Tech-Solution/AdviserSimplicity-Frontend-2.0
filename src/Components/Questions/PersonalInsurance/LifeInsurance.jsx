import { Field, Form, Formik } from "formik";
import React, { useEffect, useState, useMemo, useRef } from "react";
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
  replacePlaceholderWithLabel,
  toCommaAndDollar,
} from "../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import NewLoadingExclusion from "./NewLoadingExclusion";
import Beneficiaries from "../FinancialInvestments/QuestionsDetail/Beneficiaries";
import PremiumsDetails from "./PremiumsDetails";
import { ConfigProvider, Select } from "antd";
import PersonalInsurance from "./PersonalInsurance";
import DynamicDescription from "../EstatePlanning/DynamicDescription";
import BeneficiariesPersonalInsurance from "./BeneficiariesPersonalInsurance";
import GroupCoverDetails from "./GroupCoverDetails";
import { Grid } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
const { useBreakpoint } = Grid;

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const PersonalInsuranceLife = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  const [CRObject, setCRObject] = useRecoilState(CRState);
  const DefaultUrl = useRecoilValue(defaultUrl);
  const bankDetailObj = useRecoilValue(BankDetail);

  const [UserStatus] = useState(localStorage.getItem("UserStatus"));

  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  const prevClientRowsRef = useRef([]);

  const screens = useBreakpoint();

  const personalInsurance =
    Object.keys(questionDetail.personalInsurance || {}).length > 0
      ? questionDetail.personalInsurance
      : {
          client: { PersonalInsurance: [] },
          partner: { PersonalInsurance: [] },
        };

  const superAnnuationIssues =
    questionDetail?.superAnnuationIssues &&
    Object.keys(questionDetail?.superAnnuationIssues).length > 0
      ? questionDetail.superAnnuationIssues
      : { client: [], joint: [], partner: [] };

  const groupInsuranceDetailsAll = ["client", "partner", "joint"].reduce(
    (acc, key) => {
      acc[key] = (superAnnuationIssues[key] || [])
        .filter((item) => item.groupInsurance === "Yes")
        .map((item) => item || {});
      return acc;
    },
    {}
  );

  const initialValues = {
    numberOfPolicies: "",
    [props.modalObject.Input]: [],
  };

  const fillInitialValues = (setFieldValue) => {
    try {
      if (!personalInsurance?._id && !personalInsurance?.clientFK) {
        props.setIsEditing(true);
        return;
      }

      const fields = [
        "lifeInsured",
        "provider",
        "policyNo",
        "Owner",
        "startDate",
        "smoker",
        "life",
        "LifeTPDTraumaDetails",
        "TPD",
        "trauma",
        "IP",
        "IPDetails",
        "premiums",
        "premiumsDetails",
        "loadingExclusion",
        "loadingExclusionValue",
        "loadingExclusiondescription",
        "beneficiary",
        "beneficiariesArray",
        "beneficiaryDetails",
      ];

      const fillInsurance = (type) => {
        const data = personalInsurance?.[type]?.PersonalInsurance || [];
        console.log(data);

        setFieldValue("numberOfPolicies", data.length || "");

        setFieldValue(
          type,
          data.map((entry) => {
            const obj = {};
            fields.forEach((f) => {
              if (["life", "TPD", "trauma"].includes(f)) {
                obj[f] = entry?.[f] ? entry[f] : "$0";
              } else {
                obj[f] = entry?.[f] || "";
              }
            });
            return obj;
          })
        );
      };

      fillInsurance(props.modalObject.Input); // "client" or "partner"
    } catch (err) {
      console.error("fillInitialValues error:", err);
    }
  };

  const handleInnerModal = (innerModalTitle, values, key, stakeHolder) => {
    console.log(stakeHolder);
    let index = stakeHolder.replace(/[^0-9-]+/g, "");
    let baseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");
    let selectedProviderId = values?.[baseKey]?.[index]?.provider || "";

    if (!selectedProviderId) {
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Please! select provider name first`
      );
      return false;
    }

    // Handle case: client[1]
    const match = stakeHolder.match(/^(\w+)\[(\d+)\]$/);
    if (match) {
      baseKey = match[1]; // "client"
      index = match[2]; // "1"
    }

    let Banks =
      bankDetailObj?.PersonalInsurances?.length > 0
        ? bankDetailObj.PersonalInsurances.map((elem) => ({
            value: elem._id,
            label: elem.platformName,
          }))
        : "";

    const title =
      RenderName(props.modalObject.Input) +
      replacePlaceholderWithLabel(
        Banks,
        values?.[baseKey]?.[index]?.provider,
        innerModalTitle
      );

    let finalKey = key;
    if (["life", "TPD", "trauma"].includes(key)) {
      finalKey = "LifeTPDTrauma";
    }

    setModalObject({
      title,
      key: finalKey,
      values,
      stakeHolder,
      index, // optional: null for "client", number for "client[1]"
    });

    setFlagState(true);
  };

  const onSubmit = async (values) => {
    console.log("values :", values);
    // ✅ Helper to convert currency string to number
    const toNumber = (val) =>
      Number(String(val || "$0").replace(/[^0-9.-]+/g, "")) || 0;

    let DataOf = props.modalObject.Input || "client";

    let Data = values?.[props.modalObject.Input || "client"]?.slice(
      0,
      Number(values.numberOfPolicies)
    );

    console.log("Data :", Data);

    let groupCoverDetails =
      groupInsuranceDetailsAll[DataOf]?.[0]?.groupInsuranceDetails || {};

    const LifeInsuranceTotal =
      (Array.isArray(Data) ? Data : []).reduce(
        (sum, item) => sum + toNumber(item?.life || 0),
        0
      ) + toNumber(groupCoverDetails?.lifeCover || 0);

    const TPDTotal =
      (Array.isArray(Data) ? Data : []).reduce(
        (sum, item) =>
          sum +
          toNumber(
            item?.LifeTPDTraumaDetails?.TPDDefinition !== "Split (Own)"
              ? item?.TPD
              : 0
          ),
        0
      ) + toNumber(groupCoverDetails?.TPDCover || 0);

    const TraumaTotal = (Array.isArray(Data) ? Data : []).reduce(
      (sum, item) => sum + toNumber(item?.trauma || 0),
      0
    );

    const IncomeProtectionTotal =
      (Array.isArray(Data) ? Data : []).reduce(
        (sum, item) =>
          sum + toNumber(item?.IPDetails?.superlinked == "No" ? item?.IP : 0),
        0
      ) + toNumber(groupCoverDetails?.monthlyIncome || 0);

    // Build the final payload
    const Obj = {
      [DataOf]: {
        PersonalInsurance: Data || [],
      },
      [`${DataOf}LifeInsuranceTotal`]: toCommaAndDollar(LifeInsuranceTotal),
      [`${DataOf}TPDTotal`]: toCommaAndDollar(TPDTotal),
      [`${DataOf}TraumaTotal`]: toCommaAndDollar(TraumaTotal),
      [`${DataOf}HasPersonalInsurance`]: Data.length > 0 ? "Yes" : "No",
      [`${DataOf}IncomeProtectionTotal`]: toCommaAndDollar(
        IncomeProtectionTotal
      ),

      selectedStakeholders: values?.selectedStakeholders || [],
      clientFK: localStorage.getItem("UserID"),
    };
    console.log("Payload :", Obj);
    // return false;

    try {
      const apiUrl = `${DefaultUrl}/api/personalInsurance`;
      const res = personalInsurance.clientFK
        ? await PatchAxios(`${apiUrl}/Update`, Obj)
        : await PostAxios(`${apiUrl}/Add`, Obj);

      if (res) {
        console.log(res);
        const updatedData = {
          ...questionDetail,
          personalInsurance: res?.personalInsurance,
        };
        setQuestionDetail(updatedData);

        setCRObject(res?.questionDetails);
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
        {
          value: props.modalObject.Input,
          label: RenderName(props.modalObject.Input),
        },
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
      width: screens.xxl ? 136 : 100,
    },
    {
      title: "Life",
      dataIndex: "life",
      key: "life",
      type: "number-toComma",
      placeholder: "Life",
      innerModalTitle: "_<CFE>_Lumpsum Cover (Life/TPD/Trauma)",
      func: handleInnerModal,
      width: 140,
      disabled: true,
    },
    {
      title: "TPD",
      dataIndex: "TPD",
      key: "TPD",
      type: "number-toComma",
      placeholder: "TPD",
      innerModalTitle: "_<CFE>_Lumpsum Cover (Life/TPD/Trauma)",
      func: handleInnerModal,
      width: 140,
      disabled: true,
    },
    {
      title: "Trauma",
      dataIndex: "trauma",
      key: "trauma",
      type: "number-toComma-Modal-Separated",
      placeholder: "Trauma",
      innerModalTitle: "_<CFE>_Lumpsum Cover (Life/TPD/Trauma)",
      func: handleInnerModal,
      width: screens.xxl ? 180 : 140,
      disabled: true,
    },
    {
      title: "IP",
      dataIndex: "IP",
      key: "IP",
      type: "number-toComma-Modal",
      placeholder: "IP",
      disabled: true,
      innerModalTitle: "_<CFE>_Income Protection",
      func: handleInnerModal,
      width: 140,
    },
    {
      title: "Premiums p.a",
      dataIndex: "premiums",
      key: "premiums",
      type: "number-toComma-Modal",
      placeholder: "Premiums p.a",
      innerModalTitle: "_<CFE>_Premiums p.a",
      func: handleInnerModal,
      width: 160,
      disabled: true,
    },
    {
      title: "Loading/ Exclusion",
      dataIndex: "loadingExclusion",
      key: "loadingExclusion",
      type: "yesnoModal",
      width: screens.xxl ? 136 : 70,
      innerModalTitle: "_<CFE>_Loading/Exclusion",
      callBack: true,
      func: handleInnerModal,
    },
    {
      title: "Beneficiary",
      dataIndex: "beneficiary",
      key: "beneficiary",
      type: "yesnoModal",
      width: screens.xxl ? 136 : 80,
      innerModalTitle: "_<CFE>_Beneficiaries",
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
    groupCover: <GroupCoverDetails />,
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
          }, []);

          const clientDataRows = useMemo(() => {
            if (flagState) return prevClientRowsRef.current;

            const num = Number(values.numberOfPolicies) || 0;

            const rows =
              num > 0
                ? Array.from({ length: num }, (_, i) => {
                    const row =
                      values?.[`${props.modalObject.Input}`]?.[i] || {};

                    setFieldValue(
                      `${props.modalObject.Input}[${i}].life`,
                      row.life || "$0"
                    ); // Ensure Formik state is updated

                    setFieldValue(
                      `${props.modalObject.Input}[${i}].TPD`,
                      row.TPD || "$0"
                    ); // Ensure Formik state is updated

                    setFieldValue(
                      `${props.modalObject.Input}[${i}].trauma`,
                      row.trauma || "$0"
                    ); // Ensure Formik state is updated

                    return {
                      key: `${props.modalObject.Input}[${i}]`,
                      stakeHolder: `${props.modalObject.Input}[${i}]`,
                      ...row,
                      life: row.life || "$0",
                      TPD: row.TPD || "$0",
                      trauma: row.trauma || "$0",
                    };
                  })
                : [];

            prevClientRowsRef.current = rows;
            return rows;
          }, [values.numberOfPolicies]);

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

              <div className="d-flex flex-row justify-content-center align-items-center gap-4 mb-3">
                <p
                  className="text-end  mb-0"
                  onClick={() => {
                    console.log(personalInsurance);
                  }}
                >
                  Number of Policies:
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
                      id="numberOfPolicies"
                      name="numberOfPolicies"
                      className="w-100 h-100"
                      placeholder="Select"
                      size="large"
                      disabled={!props?.isEditing}
                      value={values.numberOfPolicies || undefined}
                      onChange={(value) => {
                        setFieldValue("numberOfPolicies", value);
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

              <div className="d-flex flex-row justify-content-center align-items-center gap-4 mb-3">
                <p
                  className="text-end  mb-0"
                  onClick={() => {
                    console.log(values);
                  }}
                >
                  Insurance Cover (Group) :
                </p>

                <div style={{ minWidth: "10%" }}>
                  <Button
                    className="btn bgColor modalBtn border-0"
                    onClick={() => {
                      console.log(
                        groupInsuranceDetailsAll[props.modalObject.Input]?.[0]
                          ?.groupInsuranceDetails
                      );
                      setModalObject({
                        title: "Group Cover Details",
                        key: "groupCover",
                        values,
                        stakeHolder: props.modalObject.Input + ".",
                        noFooter: true,
                        groupCoverValues:
                          groupInsuranceDetailsAll[
                            props.modalObject.Input
                          ]?.[0] || {},
                      });

                      setFlagState(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />{" "}
                  </Button>
                </div>
              </div>

              <h4 onClick={() => console.log(values)}>
                {RenderName(props.modalObject.Input)}
              </h4>

              <div className="mt-2 All_Client reportSection">
                <AntdTable
                  columns={columns}
                  data={clientDataRows}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isEditing={props?.isEditing}
                  setIsEditing={props?.setIsEditing}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PersonalInsuranceLife;
