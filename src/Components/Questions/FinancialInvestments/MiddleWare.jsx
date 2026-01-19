// MiddleWare.jsx
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Form, Formik } from "formik";
import { Row } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { CRState, defaultUrl, QuestionDetail } from "../../../Store/Store";
import {
  calculateExpectedTotal,
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
  toCommaAndDollar,
} from "../../Assets/Api/Api";
import InnerModal from "./QuestionsDetail/InnerModal";
import AustralianShares from "./QuestionsDetail/AustralianShares";
import ManagedFunds from "./QuestionsDetail/ManagedFunds";
import SuperFunds from "./QuestionsDetail/SuperFunds";
import AccountBasedPension from "./QuestionsDetail/AccountBasedPension";
import InvestedAnnuities from "./QuestionsDetail/InvestedAnnuities";
import TradingCompany from "../BusinessEntities/TradingCompany";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import BankTermForm from "./QuestionsDetail/BankTermForm";
import TradingTrust from "../BusinessEntities/TradingTrust";

const AntdTable = DynamicTableForInputsSection("antd");

// Constants for better maintainability
const SWITCH_ARRAY = [
  "Australian Shares/ETFs",
  "SMSF Australian Shares/ETFs",
  "Family Trust Australian Shares/ETFs",
  "Platform Investments",
  "Family Trust Platform Investments",
  "SMSF Platform Investments",
  "Investment Bond",
];

const CLIENT_PARTNER_ARRAY = [
  "Super Funds",
  "Account Based Pension",
  "Annuities",
  "Trading Company",
  "Business Trust",
];

const LABEL_PORTFOLIO_VALUES = [
  "Platform Investments",
  "Family Trust Platform Investments",
  "SMSF Platform Investments",
  "Investment Bond",
];

const SMSF_KEYS = [
  "SMSFBank",
  "SMSFTermDeposits",
  "SMSFAustralianShares",
  "SMSFManagedFunds",
  "SMSFInvestmentLoan",
];

const FAMILY_TRUST_KEYS = [
  "familyBank",
  "familyTermDeposit",
  "familyAustralianShare",
  "familyMangedFunds",
];

const COMPONENT_MAPPING = {
  "Bank Accounts": BankTermForm,
  "Term Deposits": BankTermForm,
  "Australian Shares/ETFs": AustralianShares,
  "Platform Investments": ManagedFunds,
  "Investment Bond": ManagedFunds,
  "Super Funds": SuperFunds,
  "Account Based Pension": AccountBasedPension,
  Annuities: InvestedAnnuities,
  "Trading Company": TradingCompany,
  "Business Trust": TradingTrust,
  "SMSF Bank Accounts": BankTermForm,
  "SMSF Term Deposits": BankTermForm,
  "SMSF Australian Shares/ETFs": AustralianShares,
  "Platform Investment": ManagedFunds,
  "SMSF Investment Bond": ManagedFunds,
  "Family Trust Bank Accounts": BankTermForm,
  "Family Trust Term Deposits": BankTermForm,
  "Family Trust Australian Shares/ETFs": AustralianShares,
  // "Platform Investments": ManagedFunds,
};

const PAGE_LIMITS = {
  bankAccountFinance: 10,
  SMSFBank: 3,
  familyBank: 3,
  termDepositsFinance: 10,
  SMSFTermDeposits: 5,
  familyTermDeposit: 5,
  australianShareMarket: 50,
};

const MiddleWare = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  const DefaultUrl = useRecoilValue(defaultUrl);
  const [CRObject, setCRObject] = useRecoilState(CRState);

  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});
  const [showError, setShowError] = useState({});

  // Derived values
  const { modalObject: propModalObj } = props;
  const hasAttributes = SWITCH_ARRAY.includes(propModalObj.title);
  const clientPartnerOnly = CLIENT_PARTNER_ARRAY.includes(propModalObj.title);
  const hasPortfolioLabel = LABEL_PORTFOLIO_VALUES.includes(propModalObj.title);
  const isSMSF = SMSF_KEYS.includes(propModalObj.key);
  const isFamilyTrust = FAMILY_TRUST_KEYS.includes(propModalObj.key);
  const isRegularEntity = !isSMSF && !isFamilyTrust;

  // Backend data
  const backendData = questionDetail[propModalObj.key];
  const bankAccountFinance =
    backendData && Object.keys(backendData).length > 0
      ? backendData
      : { client: [], joint: [], partner: [] };

  // Helper functions
  const getModalTitle = useCallback((title) => {
    return title.includes("_") ? title.split("_").slice(1).join("_") : title;
  }, []);

  const ModalContent = useCallback(
    (obj) => {
      if (!obj?.title) return null;
      const Component = COMPONENT_MAPPING[getModalTitle(obj.title)];
      return Component ? <Component /> : null;
    },
    [getModalTitle]
  );

  const fillInitialValues = useCallback(
    (setFieldValue) => {
      if (!bankAccountFinance?.clientFK) return;

      try {
        if (isSMSF) {
          setFieldValue("SMSF", {
            currentBalanceArray: bankAccountFinance.SMSF || [],
            currentBalance: bankAccountFinance.SMSFCurrentBalance || "",
            costBase: bankAccountFinance.SMSFCostBaseTemp || "",
          });
        } else if (isFamilyTrust) {
          console.log("trust Chala");
          // Family trust initialization can be added here if needed
          setFieldValue("trust", {
            currentBalanceArray: bankAccountFinance.trust || [],
            currentBalance: bankAccountFinance.trustCurrentBalance || "",
            costBase: bankAccountFinance.trustCostBaseTemp || "",
          });
        } else if (isRegularEntity) {
          // Client section
          setFieldValue("client", {
            currentBalanceArray: bankAccountFinance.client || [],
            currentBalance: bankAccountFinance.clientCurrentBalance || "",
            costBase: bankAccountFinance.clientCostBaseTemp || "",
          });

          setFieldValue(
            "clientCostBase",
            bankAccountFinance.clientCostBaseTemp ||
              bankAccountFinance.clientCostBase ||
              ""
          );

          // Partner & Joint (only when Married)
          if (localStorage.getItem("UserStatus") === "Married") {
            setFieldValue("partner", {
              currentBalanceArray: bankAccountFinance.partner || [],
              currentBalance: bankAccountFinance.partnerCurrentBalance || "",
              costBase: bankAccountFinance.partnerCostBaseTemp || "",
            });

            setFieldValue(
              "partnerCostBase",
              bankAccountFinance.partnerCostBaseTemp ||
                bankAccountFinance.partnerCostBase ||
                ""
            );

            if (!clientPartnerOnly) {
              setFieldValue("joint", {
                currentBalanceArray: bankAccountFinance.joint || [],
                currentBalance: bankAccountFinance.jointCurrentBalance || "",
                costBase: bankAccountFinance.jointCostBaseTemp || "",
              });

              setFieldValue(
                "jointCostBase",
                bankAccountFinance.jointCostBaseTemp ||
                  bankAccountFinance.jointCostBase ||
                  ""
              );
            }
          }
        }
      } catch (err) {
        console.error("fillInitialValues error:", err);
      }
    },
    [
      bankAccountFinance,
      isSMSF,
      isFamilyTrust,
      isRegularEntity,
      clientPartnerOnly,
    ]
  );

  const checkValuesLocal = useCallback(
    (valuesObj, setFieldValue, currentInput, stakeHolder) => {
      const checkState = currentInput.name.replace(
        /CurrentBalance|CostBaseTemp$/,
        ""
      );
      const inputValue =
        parseFloat(
          String(currentInput.value || "0").replace(/[^0-9.-]+/g, "")
        ) || 0;

      const expectedTotal = calculateExpectedTotal(
        propModalObj.title,
        valuesObj[checkState] || [],
        currentInput.name,
        checkState
      );

      const hasError = expectedTotal !== 0 && expectedTotal !== inputValue;
      const errorMessage = hasError
        ? `Total must be equal to the sum of all ${
            currentInput.name.includes("CostBase")
              ? "Cost Base"
              : "current balance"
          } filled in the popup. The sum is ${toCommaAndDollar(expectedTotal)}`
        : "";

      setShowError((prev) => ({
        ...prev,
        [`${currentInput.name}Error`]: hasError,
        [`${currentInput.name}Message`]: errorMessage,
      }));
    },
    [propModalObj.title]
  );

  const onSubmit = useCallback(
    async (values) => {
      try {
        const toNumber = (value) =>
          parseFloat(String(value || "0").replace(/[^0-9.-]+/g, "")) || 0;
        const formatMoney = (value) => toCommaAndDollar(toNumber(value));
        const clientFK = localStorage.getItem("UserID");
        const alreadySaved = bankAccountFinance?.clientFK;

        let submissionData = { clientFK };

        if (isSMSF) {
          submissionData = {
            ...submissionData,
            SMSF: values?.SMSF?.currentBalanceArray || [],
            SMSFCurrentBalance: values?.SMSF?.currentBalance || "$0",
            SMSFTotal: values?.SMSF?.currentBalance || "$0",
            ...(hasAttributes && {
              SMSFCostBaseTemp: values?.SMSF?.costBase || "",
            }),
          };
        } else if (isFamilyTrust) {
          submissionData = {
            ...submissionData,
            trust: values?.trust?.currentBalanceArray || [],
            trustCurrentBalance: values?.trust?.currentBalance || "$0",
            trustTotal: values?.trust?.currentBalance || "$0",
            ...(hasAttributes && {
              trustCostBaseTemp: values?.trust?.costBase || "",
            }),
          };
        } else if (isRegularEntity) {
          const { client = {}, partner = {}, joint = {} } = values;

          submissionData = {
            ...submissionData,
            client: client.currentBalanceArray || [],
            partner: partner.currentBalanceArray || [],
            joint: joint.currentBalanceArray || [],
            clientCurrentBalance: client.currentBalance || "$0",
            partnerCurrentBalance: partner.currentBalance || "$0",
            jointCurrentBalance: joint.currentBalance || "$0",
            ...(hasAttributes && {
              clientCostBaseTemp: client.costBase || "",
              partnerCostBaseTemp: partner.costBase || "",
              jointCostBaseTemp: joint.costBase || "",
            }),
          };

          // Calculate totals with joint split
          const jointValue = toNumber(submissionData.jointCurrentBalance);
          const clientBase = toNumber(submissionData.clientCurrentBalance);
          const partnerBase = toNumber(submissionData.partnerCurrentBalance);

          if (jointValue > 0) {
            const halfJoint = jointValue / 2;
            submissionData.clientTotal = formatMoney(clientBase + halfJoint);
            submissionData.partnerTotal = formatMoney(partnerBase + halfJoint);
          } else {
            submissionData.clientTotal = submissionData.clientCurrentBalance;
            submissionData.partnerTotal = submissionData.partnerCurrentBalance;
          }

          if (clientPartnerOnly) {
            delete submissionData.jointCurrentBalance;
            delete submissionData.joint;
          }
        }

        console.log("onSubmit submissionData:", submissionData);

        const url = `${DefaultUrl}/api/${propModalObj.key}`;
        const apiCall = alreadySaved
          ? PatchAxios(`${url}/Update`, submissionData)
          : PostAxios(`${url}/Add`, submissionData);

        const response = await apiCall;

        if (response) {
          if (propModalObj.key == "superAnnuationIssues") {
            console.log(response);
            setQuestionDetail((prev) => ({
              ...prev,
              [propModalObj.key]: response.superFund,
              personalInsurance: response.personalInsurance,
            }));

            setCRObject(response.questionDetails);
          } else {
            setQuestionDetail((prev) => ({
              ...prev,
              [propModalObj.key]: response,
            }));
          }

          openNotificationSuccess(
            "success",
            "topRight",
            "Success Notification",
            `Data of "${propModalObj.title}" is Saved`
          );

          if (props.flagState) {
            props.setFlagState(false);
            props.setIsEditing((prev) => !prev);
          }
        }
      } catch (error) {
        console.error("onSubmit error:", error);
        openNotificationSuccess(
          "error",
          "topRight",
          "Error Notification",
          `Data of "${propModalObj.title}" is not saved. Please try again!`
        );
      }
    },
    [
      DefaultUrl,
      propModalObj.key,
      propModalObj.title,
      bankAccountFinance,
      hasAttributes,
      isSMSF,
      isFamilyTrust,
      isRegularEntity,
      clientPartnerOnly,
      props.flagState,
      props.setFlagState,
      props.setIsEditing,
      setQuestionDetail,
    ]
  );

  const openInnerModal = useCallback(
    (title, values, key, stakeHolder) => {
      setModalObject({
        title,
        Input: key,
        key: propModalObj.key,
        values,
        pageLimit: PAGE_LIMITS[propModalObj.key],
        stakeHolder,
        ShowError: showError,
        setShowError,
      });
      setFlagState(true);
    },
    [propModalObj.key, showError]
  );

  const tableColumns = useMemo(() => {
    const ownerColumn = {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      type: "plainText",
    };

    const currentBalanceColumn = {
      title: hasPortfolioLabel
        ? "Portfolio Value"
        : propModalObj.key === "BusinessAsCompanyStructure"
        ? "Equity Value"
        : propModalObj.key === "BusinessAsTrusts"
        ? "Business Value"
        : "Current Balance",
      dataIndex: "currentBalance",
      key: "currentBalance",
      type: "number-toComma-Modal",
      placeholder: hasPortfolioLabel ? "Portfolio Value" : "Current Balance",
      callBackModal: true,
      callBack: true,
      disabled: true,
      func: openInnerModal,
      inputChangeFunc: checkValuesLocal,
    };

    const costBaseColumn = {
      title: "Cost Base",
      dataIndex: "costBase",
      key: "costBase",
      type: "number-toComma",
      placeholder: "Cost Base",
      callBack: true,
      func: checkValuesLocal,
    };

    return hasAttributes
      ? [ownerColumn, currentBalanceColumn, costBaseColumn]
      : [ownerColumn, currentBalanceColumn];
  }, [
    hasAttributes,
    hasPortfolioLabel,
    propModalObj.key,
    openInnerModal,
    checkValuesLocal,
  ]);

  const generateTableRows = useCallback(
    (values) => {
      const rows = [];

      if (isSMSF) {
        rows.push({
          key: "SMSF",
          stakeHolder: "SMSF",
          owner: "SMSF",
          innerModalTitle: `SMSF_${propModalObj.title}`,
          currentBalance: values?.SMSF?.currentBalance || "",
          costBase: values?.SMSF?.costBase || "",
        });
      } else if (isFamilyTrust) {
        rows.push({
          key: "Trust",
          stakeHolder: "trust",
          owner: "Trust",
          innerModalTitle: `Trust_${propModalObj.title}`,
          currentBalance: values?.trust?.currentBalance || "",
          costBase: values?.trust?.costBase || "",
        });
      } else if (isRegularEntity) {
        const userStatus = localStorage.getItem("UserStatus");

        rows.push({
          key: "client",
          stakeHolder: "client",
          owner: RenderName("client"),
          innerModalTitle: `${RenderName("client")}_${propModalObj.title}`,
          currentBalance: values?.client?.currentBalance || "",
          costBase: values?.client?.costBase || "",
        });

        if (userStatus === "Married") {
          rows.push({
            key: "partner",
            stakeHolder: "partner",
            owner: RenderName("partner"),
            innerModalTitle: `${RenderName("partner")}_${propModalObj.title}`,
            currentBalance: values?.partner?.currentBalance || "",
            costBase: values?.partner?.costBase || "",
          });

          if (!clientPartnerOnly) {
            rows.push({
              key: "joint",
              stakeHolder: "joint",
              owner: RenderName("joint"),
              innerModalTitle: `${RenderName("joint")}_${propModalObj.title}`,
              currentBalance: values?.joint?.currentBalance || "",
              costBase: values?.joint?.costBase || "",
            });
          }
        }
      }

      return rows;
    },
    [
      isSMSF,
      isFamilyTrust,
      isRegularEntity,
      propModalObj.title,
      clientPartnerOnly,
    ]
  );

  return (
    <Formik
      initialValues={{}}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, handleChange, setFieldValue, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [fillInitialValues]);

        const tableRows = generateTableRows(values);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <InnerModal
                  modalObject={modalObject}
                  setFieldValue={setFieldValue}
                  setFlagState={setFlagState}
                  flagState={flagState}
                  setIsEditing={props.setIsEditing}
                >
                  {ModalContent(modalObject)}
                </InnerModal>

                <div className="mt-4 All_Client reportSection">
                  <AntdTable
                    columns={tableColumns}
                    data={tableRows}
                    values={values}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleSubmit={props?.handleOk}
                    isEditing={props?.isEditing}
                    setIsEditing={props?.setIsEditing}
                  />
                </div>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default MiddleWare;
