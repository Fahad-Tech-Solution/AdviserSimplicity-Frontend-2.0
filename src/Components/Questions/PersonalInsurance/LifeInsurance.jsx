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
          selectedStakeholders: [],
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
    client: {
      numberOfPolicies: "",
      PersonalInsurance: [],
    },
    partner: {
      numberOfPolicies: "",
      PersonalInsurance: [],
    },
    selectedStakeholders: [],
  };

  const fillInitialValues = (setFieldValue) => {
    try {
      if (!personalInsurance?._id && !personalInsurance?.clientFK) {
        props.setIsEditing(true);
        return;
      }
      // ----------------------------------------------------
      // SELECTED STAKEHOLDERS
      // ----------------------------------------------------
      setFieldValue(
        "selectedStakeholders",
        personalInsurance?.selectedStakeholders || []
      );

      // ----------------------------------------------------
      // FIELD DEFINITIONS
      // ----------------------------------------------------
      const regularFields = [
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
        "groupCover",
      ];

      const groupCoverFields = [
        "lifeInsured",
        "provider",
        "policyNo",
        "groupOwner",
        "startDate",
        "smoker",
        "life",
        "tpd",
        "trauma",
        "ip",
        "premiumPA",
        "loadingExclusion",
        "beneficiary",
      ];

      const backendMap = {
        life: "lifeCover",
        tpd: "TPDCover",
        ip: "monthlyIncome",
        trauma: "trauma",
        startDate: "commencementDate",
        groupOwner: "fundType",
        policyNo: "memberNumber",
      };

      // ----------------------------------------------------
      // HELPERS
      // ----------------------------------------------------

      // Get fallback field from groupInsuranceDetailsAll
      const getExternalValue = (type, index, subField) => {
        const external = groupInsuranceDetailsAll?.[type]?.[index];

        if (!external) return "";

        if (["life", "tpd", "ip", "trauma"].includes(subField)) {
          return external.groupInsuranceDetails?.[backendMap[subField]] || "$0";
        }

        if (["groupOwner", "startDate"].includes(subField)) {
          return external.balanceBenefitDetails?.[backendMap[subField]] || "";
        }

        if (subField === "policyNo") {
          return external?.[backendMap.policyNo] || "";
        }

        if (subField === "provider") {
          const fundName =
            bankDetailObj?.SuperannuationFunds?.map((elem) => ({
              value: elem._id,
              label: elem.platformName,
            })).find((fund) => fund.value === external?.platformName)?.label ||
            "";

          return fundName;
        }

        if (subField === "premiumPA") {
          const g = external.groupInsuranceDetails || {};
          const sum =
            (Number((g.lifeCover || "").replace(/[^0-9.-]+/g, "")) || 0) +
            (Number((g.TPDCover || "").replace(/[^0-9.-]+/g, "")) || 0) +
            (Number((g.monthlyIncome || "").replace(/[^0-9.-]+/g, "")) || 0);

          return toCommaAndDollar(sum);
        }

        return "";
      };

      // Fills groupCover with fallback rules
      const fillGroupCover = (type, entry, index) => {
        groupCoverFields.forEach((subField) => {
          const backendVal = entry?.groupCover?.[subField];
          let finalVal = backendVal;

          if (!finalVal) {
            // backend missing? → fallback table
            finalVal = getExternalValue(type, index, subField);
          }

          // default "No" for specific fields
          if (
            !finalVal &&
            ["smoker", "loadingExclusion", "beneficiary"].includes(subField)
          ) {
            finalVal = "No";
          }

          setFieldValue(
            `${type}.PersonalInsurance[${index}].groupCover.${subField}`,
            finalVal || ""
          );
        });
      };

      // ----------------------------------------------------
      // MAIN FILLER FUNCTION
      // ----------------------------------------------------
      const fillInsurance = (type) => {
        const data = personalInsurance?.[type]?.PersonalInsurance;

        if (!Array.isArray(data) || !data.length) {
          setFieldValue(`${type}.numberOfPolicies`, "");
          setFieldValue(`${type}.PersonalInsurance`, []);

          groupInsuranceDetailsAll?.[type].map((item, index) => {
            regularFields.forEach((field) => {
              if (field === "groupCover") {
                fillGroupCover(
                  type,
                  {
                    groupCover: {},
                  },
                  index
                );
              }
            });
          });
          return;
        }

        setFieldValue(`${type}.numberOfPolicies`, data.length);

        console.log(data);

        data.forEach((entry, index) => {
          regularFields.forEach((field) => {
            if (field === "groupCover") {
              fillGroupCover(type, entry, index);
            } else {
              const value = Array.isArray(entry?.[field])
                ? entry[field]
                : entry?.[field] || "";

              setFieldValue(
                `${type}.PersonalInsurance[${index}].${field}`,
                value
              );
            }
          });
        });
      };

      // ----------------------------------------------------
      // APPLY FOR BOTH
      // ----------------------------------------------------
      fillInsurance("client");
      fillInsurance("partner");
    } catch (error) {
      console.error("Error filling initial values:", error);
    }
  };

  const handleInnerModal = (innerModalTitle, values, key, stakeHolder) => {
    const [stakeholderType, index] = stakeHolder
      .split("[")[1]
      .replace("]", "")
      .split(".");
    const baseKey = stakeHolder.split("[")[0].split(".");

    console.log(baseKey);

    const title = RenderName(baseKey[0]) + innerModalTitle;
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
    // Helper function to safely extract array entries
    const mapEntries = (array, fields) =>
      (array || []).map((item) => {
        const obj = {};
        fields.forEach((field) => {
          obj[field] = item?.[field] || "";
        });
        return obj;
      });

    // Fields for Personal Insurance (Client + Partner)
    const personalFields = [
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
      "groupCover",
    ];

    // Generate arrays safely even if undefined
    const clientEntries = mapEntries(
      values?.client?.PersonalInsurance,
      personalFields
    );
    const partnerEntries = mapEntries(
      values?.partner?.PersonalInsurance,
      personalFields
    );

    // ✅ Helper to convert currency string to number
    const toNumber = (val) =>
      Number(String(val || "0").replace(/[^0-9.-]+/g, "")) || 0;

    // ✅ Helper to calculate total of a specific field across multiple arrays
    const calcTotal = (arrays, fieldNames) =>
      arrays.reduce((sum, arr) => {
        (arr || []).forEach((item) => {
          fieldNames.forEach((field) => {
            sum += toNumber(item?.[field]);
          });
        });
        return sum;
      }, 0);

    // ✅ Calculate all required totals
    const clientLifeInsuranceTotal = calcTotal([clientEntries], ["life"]);
    const partnerLifeInsuranceTotal = calcTotal([partnerEntries], ["life"]);

    const clientTPDTotal = calcTotal([clientEntries], ["TPD"]);
    const partnerTPDTotal = calcTotal([partnerEntries], ["TPD"]);

    const clientTraumaTotal = calcTotal([clientEntries], ["trauma"]);
    const partnerTraumaTotal = calcTotal([partnerEntries], ["trauma"]);

    const clientIncomeProtectionTotal = calcTotal([clientEntries], ["IP"]);
    const partnerIncomeProtectionTotal = calcTotal([partnerEntries], ["IP"]);

    // Build the final payload
    const Obj = {
      client: {
        PersonalInsurance: clientEntries,
      },
      partner: {
        PersonalInsurance: partnerEntries,
      },
      clientLifeInsuranceTotal: toCommaAndDollar(clientLifeInsuranceTotal),
      partnerLifeInsuranceTotal: toCommaAndDollar(partnerLifeInsuranceTotal),
      clientTPDTotal: toCommaAndDollar(clientTPDTotal),
      partnerTPDTotal: toCommaAndDollar(partnerTPDTotal),
      clientTraumaTotal: toCommaAndDollar(clientTraumaTotal),
      partnerTraumaTotal: toCommaAndDollar(partnerTraumaTotal),
      clientIncomeProtectionTotal: toCommaAndDollar(
        clientIncomeProtectionTotal
      ),
      partnerIncomeProtectionTotal: toCommaAndDollar(
        partnerIncomeProtectionTotal
      ),
      selectedStakeholders: values?.selectedStakeholders || [],
      clientFK: localStorage.getItem("UserID"),
    };

    console.log(Obj);

    try {
      const apiUrl = `${DefaultUrl}/api/personalInsurance`;
      const res = personalInsurance.clientFK
        ? await PatchAxios(`${apiUrl}/Update`, Obj)
        : await PostAxios(`${apiUrl}/Add`, Obj);

      if (res) {
        const updatedData = { ...questionDetail, personalInsurance: res };
        setQuestionDetail(updatedData);

        let hasStakeholders = res.selectedStakeholders.length > 0;

        setCRObject({
          ...CRObject,
          life: hasStakeholders ? "Yes" : "No",
          TPD: hasStakeholders ? "Yes" : "No",
          trauma: hasStakeholders ? "Yes" : "No",
          incomeProtection: hasStakeholders ? "Yes" : "No",
        }); // data
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
      title: (
        <span className="w-100" style={{ color: "black" }}>
          Group Cover
        </span>
      ),
      dataIndex: "groupCover",
      key: "groupCover",
      type: "modal",
      width: 125,
      innerModalTitle: "_Group Cover",
      handleInnerModal: handleInnerModal,
      callBack: true,
    },
    {
      title: "Life Insured",
      dataIndex: "lifeInsured",
      key: "lifeInsured",
      type: "select-antd",
      justText: true,
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
      width: screens.xxl ? 136 : 100,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
    },
    {
      title: "IP",
      dataIndex: "IP",
      key: "IP",
      type: "number-toComma-Modal",
      placeholder: "IP",
      disabled: true,
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
      disabled: true,
    },
    {
      title: "Loading/ Exclusion",
      dataIndex: "loadingExclusion",
      key: "loadingExclusion",
      type: "yesnoModal",
      width: screens.xxl ? 136 : 70,
      innerModalTitle: "_Loading/Exclusion",
      callBack: true,
      func: handleInnerModal,
    },
    {
      title: "Beneficiary",
      dataIndex: "beneficiary",
      key: "beneficiary",
      type: "yesnoModal",
      width: screens.xxl ? 136 : 80,
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
    beneficiary: <BeneficiariesPersonalInsurance />,
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

            const num = Number(values.client.numberOfPolicies) || 0;
            const rows =
              num > 0
                ? Array.from({ length: num }, (_, i) => ({
                    key: `client.PersonalInsurance[${i}]`,
                    stakeHolder: `client.PersonalInsurance[${i}]`,
                    ...values.client.PersonalInsurance[i],
                    lifeInsured: RenderName(`client`),
                    groupCover: "",
                    // groupCover: values.client.PersonalInsurance[i]?.groupCover.life || {},
                  }))
                : [];

            prevClientRowsRef.current = rows;

            return rows;
          }, [
            values.client.numberOfPolicies,
            values.client.PersonalInsurance,
            flagState,
          ]);

          const partnerDataRows = useMemo(() => {
            const num = Number(values.partner.numberOfPolicies) || 0;
            return num > 0
              ? Array.from({ length: num }, (_, i) => ({
                  key: `partner.PersonalInsurance[${i}]`,
                  owner: i + 1,
                  stakeHolder: `partner.PersonalInsurance[${i}]`,
                  ...values.partner.PersonalInsurance[i],
                  lifeInsured: RenderName(`partner`),
                  // groupCover: values.client.PersonalInsurance[i]?.groupCover.life || {},
                  groupCover: "",
                }))
              : [];
          }, [
            values.partner.numberOfPolicies,
            values.partner.PersonalInsurance,
          ]);

          // Determine which stakeholders to display
          const selectedStakeholders = values.selectedStakeholders || [];
          const shouldShowClient = selectedStakeholders.includes("client");
          const shouldShowPartner = selectedStakeholders.includes("partner");

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
                  className="text-end mb-0"
                  onClick={() => {
                    console.log(values);
                  }}
                >
                  Owner:
                </p>

                <div style={{ minWidth: "20%" }}>
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
                      id="selectedStakeholders"
                      name="selectedStakeholders"
                      mode="multiple"
                      className="w-100 h-100"
                      placeholder="Select Client/Partner"
                      size="large"
                      value={values.selectedStakeholders}
                      disabled={!props?.isEditing}
                      onChange={(value) => {
                        setFieldValue("selectedStakeholders", value);
                      }}
                      onBlur={handleBlur}
                      getPopupContainer={(triggerNode) =>
                        triggerNode.parentNode
                      }
                    >
                      <Option value="client">{RenderName("client")}</Option>
                      {UserStatus !== "Single" && (
                        <Option value="partner">{RenderName("partner")}</Option>
                      )}
                    </Select>
                  </ConfigProvider>
                </div>
              </div>

              {shouldShowClient && (
                <div className="d-flex flex-row justify-content-center align-items-center gap-4 mb-3">
                  <p
                    className="text-end  mb-0"
                    onClick={() => {
                      console.log(personalInsurance);
                    }}
                  >
                    Number of Policies Client:
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
                        id="client.numberOfPolicies"
                        name="client.numberOfPolicies"
                        className="w-100 h-100"
                        placeholder="Select"
                        size="large"
                        disabled={!props?.isEditing}
                        value={values.client.numberOfPolicies || undefined}
                        onChange={(value) => {
                          setFieldValue("client.numberOfPolicies", value);
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
              )}

              {shouldShowClient && values.client.numberOfPolicies && (
                <>
                  <h4
                    className="mt-4 pt-2"
                    onClick={() => {
                      console.log(values.client.PersonalInsurance);
                    }}
                  >
                    {RenderName("client")}
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
                </>
              )}

              {shouldShowPartner && (
                <div className="d-flex flex-row justify-content-center align-items-center gap-4 my-4">
                  <p className="text-end mt-1 pt-2 mb-0">
                    Number of Policies Partner:
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
                        id="partner.numberOfPolicies"
                        name="partner.numberOfPolicies"
                        className="w-100 h-100"
                        placeholder="Select"
                        size="large"
                        disabled={!props?.isEditing}
                        value={values.partner.numberOfPolicies || undefined}
                        onChange={(value) => {
                          setFieldValue("partner.numberOfPolicies", value);
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
              )}

              {shouldShowPartner && values.partner.numberOfPolicies && (
                <>
                  <h4
                    className="mt-4 pt-2"
                    onClick={() => {
                      console.log(values.partner.PersonalInsurance);
                    }}
                  >
                    {RenderName("partner")}
                  </h4>
                  <div className="mt-2 All_Client reportSection">
                    <AntdTable
                      columns={columns}
                      data={partnerDataRows}
                      values={values}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      isEditing={props?.isEditing}
                      setIsEditing={props?.setIsEditing}
                    />
                  </div>
                </>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PersonalInsuranceLife;
