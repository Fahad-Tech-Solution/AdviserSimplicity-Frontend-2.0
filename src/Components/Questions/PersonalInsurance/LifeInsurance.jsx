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
import GroupCoverDetails from "./GroupCoverDetails";
import BeneficiariesPersonalInsurance from "./BeneficiariesPersonalInsurance";

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
          client: { PersonalInsurance: [], groupCoverDetails: [] },
          partner: { PersonalInsurance: [], groupCoverDetails: [] },
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
      groupCoverDetails: [],
    },
    partner: {
      numberOfPolicies: "",
      PersonalInsurance: [],
      groupCoverDetails: [],
    },
    selectedStakeholders: [],
  };

  const fillInitialValues = (setFieldValue) => {
    try {
      // --- Set selected stakeholders ---
      if (personalInsurance?.selectedStakeholders?.length) {
        setFieldValue(
          "selectedStakeholders",
          personalInsurance.selectedStakeholders
        );
      } else {
        setFieldValue("selectedStakeholders", []);
      }

      // --- Fill Client Personal Insurance ---
      if (personalInsurance?.client?.PersonalInsurance?.length) {
        setFieldValue(
          "client.numberOfPolicies",
          personalInsurance.client.PersonalInsurance.length || 0
        );

        personalInsurance.client.PersonalInsurance.forEach((entry, index) => {
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
              `client.PersonalInsurance[${index}].${field}`,
              entry?.[field] || (Array.isArray(entry?.[field]) ? [] : "")
            )
          );
        });
      } else {
        setFieldValue("client.numberOfPolicies", "");
        setFieldValue("client.PersonalInsurance", []);
      }

      // --- Fill Client Group Cover Details ---
      if (personalInsurance?.client?.groupCoverDetails?.length) {
        personalInsurance.client.groupCoverDetails.forEach((entry, index) => {
          const fields = [
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
          fields.forEach((field) =>
            setFieldValue(
              `client.groupCoverDetails[${index}].${field}`,
              entry?.[field] || ""
            )
          );
        });
      } else if (groupInsuranceDetailsAll?.client?.length > 0) {
        try {
          groupInsuranceDetailsAll.client.forEach((entry, index) => {
            setFieldValue(
              `client.groupCoverDetails[${index}].lifeInsured`,
              RenderName("client") || ""
            );

            const fundName =
              bankDetailObj?.SuperannuationFunds?.map((elem) => ({
                value: elem._id,
                label: elem.platformName,
              })).find((fund) => fund.value === entry?.platformName)?.label ||
              "";

            setFieldValue(
              `client.groupCoverDetails[${index}].provider`,
              fundName || ""
            );
            setFieldValue(
              `client.groupCoverDetails[${index}].policyNo`,
              entry?.memberNumber || ""
            );
            setFieldValue(
              `client.groupCoverDetails[${index}].groupOwner`,
              entry?.balanceBenefitDetails?.fundType || ""
            );
            setFieldValue(
              `client.groupCoverDetails[${index}].startDate`,
              entry?.balanceBenefitDetails?.commencementDate || ""
            );
            setFieldValue(`client.groupCoverDetails[${index}].smoker`, "No");
            setFieldValue(
              `client.groupCoverDetails[${index}].life`,
              entry?.groupInsuranceDetails?.lifeCover || 0
            );
            setFieldValue(
              `client.groupCoverDetails[${index}].tpd`,
              entry?.groupInsuranceDetails?.TPDCover || 0
            );
            setFieldValue(`client.groupCoverDetails[${index}].trauma`, "$0");
            setFieldValue(
              `client.groupCoverDetails[${index}].ip`,
              entry?.groupInsuranceDetails?.monthlyIncome || 0
            );

            const premiumPA =
              (Number(
                entry?.groupInsuranceDetails?.lifeCover?.replace(
                  /[^0-9.-]+/g,
                  ""
                )
              ) || 0) +
              (Number(
                entry?.groupInsuranceDetails?.TPDCover?.replace(
                  /[^0-9.-]+/g,
                  ""
                )
              ) || 0) +
              (Number(
                entry?.groupInsuranceDetails?.monthlyIncome?.replace(
                  /[^0-9.-]+/g,
                  ""
                )
              ) || 0);

            setFieldValue(
              `client.groupCoverDetails[${index}].premiumPA`,
              premiumPA
            );
            setFieldValue(
              `client.groupCoverDetails[${index}].loadingExclusion`,
              "No"
            );
            setFieldValue(
              `client.groupCoverDetails[${index}].beneficiary`,
              entry?.nominatedBeneficiaries || "No"
            );
          });
        } catch (error) {
          console.error("Error filling client group cover details:", error);
          setFieldValue("client.groupCoverDetails", []);
        }
      } else {
        setFieldValue("client.groupCoverDetails", []);
      }

      // --- Fill Partner Personal Insurance ---
      if (personalInsurance?.partner?.PersonalInsurance?.length) {
        setFieldValue(
          "partner.numberOfPolicies",
          personalInsurance.partner.PersonalInsurance.length || 0
        );

        personalInsurance.partner.PersonalInsurance.forEach((entry, index) => {
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
              `partner.PersonalInsurance[${index}].${field}`,
              entry?.[field] || (Array.isArray(entry?.[field]) ? [] : "")
            )
          );
        });
      } else {
        setFieldValue("partner.numberOfPolicies", "");
        setFieldValue("partner.PersonalInsurance", []);
      }

      // --- Fill Partner Group Cover Details ---
      if (personalInsurance?.partner?.groupCoverDetails?.length) {
        personalInsurance.partner.groupCoverDetails.forEach((entry, index) => {
          const fields = [
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
          fields.forEach((field) =>
            setFieldValue(
              `partner.groupCoverDetails[${index}].${field}`,
              entry?.[field] || ""
            )
          );
        });
      } else if (groupInsuranceDetailsAll?.partner?.length > 0) {
        try {
          groupInsuranceDetailsAll.partner.forEach((entry, index) => {
            setFieldValue(
              `partner.groupCoverDetails[${index}].lifeInsured`,
              RenderName("partner") || ""
            );

            const fundName =
              bankDetailObj?.SuperannuationFunds?.map((elem) => ({
                value: elem._id,
                label: elem.platformName,
              })).find((fund) => fund.value === entry?.platformName)?.label ||
              "";

            setFieldValue(
              `partner.groupCoverDetails[${index}].provider`,
              fundName || ""
            );
            setFieldValue(
              `partner.groupCoverDetails[${index}].policyNo`,
              entry?.memberNumber || ""
            );
            setFieldValue(
              `partner.groupCoverDetails[${index}].groupOwner`,
              entry?.balanceBenefitDetails?.fundType || ""
            );
            setFieldValue(
              `partner.groupCoverDetails[${index}].startDate`,
              entry?.balanceBenefitDetails?.commencementDate || ""
            );
            setFieldValue(`partner.groupCoverDetails[${index}].smoker`, "No");
            setFieldValue(
              `partner.groupCoverDetails[${index}].life`,
              entry?.groupInsuranceDetails?.lifeCover || 0
            );
            setFieldValue(
              `partner.groupCoverDetails[${index}].tpd`,
              entry?.groupInsuranceDetails?.TPDCover || 0
            );
            setFieldValue(`partner.groupCoverDetails[${index}].trauma`, "$0");
            setFieldValue(
              `partner.groupCoverDetails[${index}].ip`,
              entry?.groupInsuranceDetails?.monthlyIncome || 0
            );

            const premiumPA =
              (Number(
                entry?.groupInsuranceDetails?.lifeCover?.replace(
                  /[^0-9.-]+/g,
                  ""
                )
              ) || 0) +
              (Number(
                entry?.groupInsuranceDetails?.TPDCover?.replace(
                  /[^0-9.-]+/g,
                  ""
                )
              ) || 0) +
              (Number(
                entry?.groupInsuranceDetails?.monthlyIncome?.replace(
                  /[^0-9.-]+/g,
                  ""
                )
              ) || 0);

            setFieldValue(
              `partner.groupCoverDetails[${index}].premiumPA`,
              premiumPA
            );
            setFieldValue(
              `partner.groupCoverDetails[${index}].loadingExclusion`,
              "No"
            );
            setFieldValue(
              `partner.groupCoverDetails[${index}].beneficiary`,
              entry?.nominatedBeneficiaries || "No"
            );
          });
        } catch (error) {
          console.error("Error filling partner group cover details:", error);
          setFieldValue("partner.groupCoverDetails", []);
        }
      } else {
        setFieldValue("partner.groupCoverDetails", []);
      }
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
      "TPD",
      "trauma",
      "IP",
      "premiums",
      "loadingExclusion",
      "loadingExclusionValue",
      "beneficiary",
      "beneficiariesArray",
    ];

    // Fields for Group Cover Details (Client + Partner)
    const groupFields = [
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

    // Generate arrays safely even if undefined
    const clientEntries = mapEntries(
      values?.client?.PersonalInsurance,
      personalFields
    );
    const partnerEntries = mapEntries(
      values?.partner?.PersonalInsurance,
      personalFields
    );

    const clientGroupCoverEntries = mapEntries(
      values?.client?.groupCoverDetails,
      groupFields
    );
    const partnerGroupCoverEntries = mapEntries(
      values?.partner?.groupCoverDetails,
      groupFields
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
    const clientLifeInsuranceTotal = calcTotal(
      [clientEntries, clientGroupCoverEntries],
      ["life"]
    );
    const partnerLifeInsuranceTotal = calcTotal(
      [partnerEntries, partnerGroupCoverEntries],
      ["life"]
    );

    const clientTPDTotal = calcTotal(
      [clientEntries, clientGroupCoverEntries],
      ["TPD", "tpd"]
    );
    const partnerTPDTotal = calcTotal(
      [partnerEntries, partnerGroupCoverEntries],
      ["TPD", "tpd"]
    );

    const clientTraumaTotal = calcTotal(
      [clientEntries, clientGroupCoverEntries],
      ["trauma"]
    );
    const partnerTraumaTotal = calcTotal(
      [partnerEntries, partnerGroupCoverEntries],
      ["trauma"]
    );

    const clientIncomeProtectionTotal = calcTotal(
      [clientEntries, clientGroupCoverEntries],
      ["IP", "ip"]
    );
    const partnerIncomeProtectionTotal = calcTotal(
      [partnerEntries, partnerGroupCoverEntries],
      ["IP", "ip"]
    );

    // Build the final payload
    const Obj = {
      client: {
        PersonalInsurance: clientEntries,
        groupCoverDetails: clientGroupCoverEntries,
      },
      partner: {
        PersonalInsurance: partnerEntries,
        groupCoverDetails: partnerGroupCoverEntries,
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
      type: "yesno", width: 100,
      
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
    beneficiary: <BeneficiariesPersonalInsurance />,
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
          }, [personalInsurance.client, personalInsurance.partner]);

          const clientDataRows = useMemo(() => {
            const num = Number(values.client.numberOfPolicies) || 0;
            return num > 0
              ? Array.from({ length: num }, (_, i) => ({
                  key: `client.PersonalInsurance[${i}]`,
                  owner: i + 1,
                  stakeHolder: `client.PersonalInsurance[${i}]`,
                  ...values.client.PersonalInsurance[i],
                }))
              : [];
          }, [values.client.numberOfPolicies, values.client.PersonalInsurance]);

          const clientGroupDataRows = useMemo(() => {
            const num = Number(values.client.numberOfPolicies) || 0;
            return num > 0
              ? Array.from({ length: num }, (_, i) => ({
                  key: `client.groupCoverDetails[${i}]`,
                  owner: i + 1,
                  stakeHolder: `client.groupCoverDetails[${i}]`,
                  ...values.client.groupCoverDetails[i],
                }))
              : [];
          }, [values.client.numberOfPolicies, values.client.groupCoverDetails]);

          const partnerDataRows = useMemo(() => {
            const num = Number(values.partner.numberOfPolicies) || 0;
            return num > 0
              ? Array.from({ length: num }, (_, i) => ({
                  key: `partner.PersonalInsurance[${i}]`,
                  owner: i + 1,
                  stakeHolder: `partner.PersonalInsurance[${i}]`,
                  ...values.partner.PersonalInsurance[i],
                }))
              : [];
          }, [
            values.partner.numberOfPolicies,
            values.partner.PersonalInsurance,
          ]);

          const partnerGroupDataRows = useMemo(() => {
            const num = Number(values.partner.numberOfPolicies) || 0;
            return num > 0
              ? Array.from({ length: num }, (_, i) => ({
                  key: `partner.groupCoverDetails[${i}]`,
                  owner: i + 1,
                  stakeHolder: `partner.groupCoverDetails[${i}]`,
                  ...values.partner.groupCoverDetails[i],
                }))
              : [];
          }, [
            values.partner.numberOfPolicies,
            values.partner.groupCoverDetails,
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
              >
                {ModalContent(modalObject)}
              </InnerModal>

              <div className="d-flex flex-row justify-content-center align-items-center gap-4 mb-4">
                <p
                  className="text-end mt-1 pt-2 mb-0"
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
                <div className="d-flex flex-row justify-content-center align-items-center gap-4 mb-4">
                  <p
                    className="text-end mt-1 pt-2 mb-0"
                    onClick={() => {
                      console.log(personalInsurance);
                    }}
                  >
                    How many {props.modalObject.title} does{" "}
                    {RenderName("client")} have:
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

              {shouldShowPartner && (
                <div className="d-flex flex-row justify-content-center align-items-center gap-4 mb-4">
                  <p className="text-end mt-1 pt-2 mb-0">
                    How many {props.modalObject.title} does{" "}
                    {RenderName("partner")} have:
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

              {shouldShowClient && values.client.numberOfPolicies && (
                <>
                  <h4 className="mt-4 pt-2">
                    {RenderName("client")} - Personal Insurance
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
                  {groupInsuranceDetailsAll?.client?.length > 0 && (
                    <div className="mt-4 All_Client reportSection">
                      <GroupCoverDetails
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        isEditing={props?.isEditing}
                        setIsEditing={props?.setIsEditing}
                        groupDataRows={clientGroupDataRows}
                        stakeholder="client"
                        title={`${RenderName("client")} - Group Cover Details`}
                      />
                    </div>
                  )}
                </>
              )}

              {shouldShowPartner && values.partner.numberOfPolicies && (
                <>
                  <h4 className="mt-4 pt-2">
                    {RenderName("partner")} - Personal Insurance
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
                  {groupInsuranceDetailsAll?.partner?.length > 0 && (
                    <div className="mt-4 All_Client reportSection">
                      <GroupCoverDetails
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        isEditing={props?.isEditing}
                        setIsEditing={props?.setIsEditing}
                        groupDataRows={partnerGroupDataRows}
                        stakeholder="partner"
                        title={`${RenderName("partner")} - Group Cover Details`}
                      />
                    </div>
                  )}
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
