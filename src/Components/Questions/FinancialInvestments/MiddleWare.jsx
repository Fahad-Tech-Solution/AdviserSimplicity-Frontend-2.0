import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
  toCommaAndDollar,
} from "../../Assets/Api/Api";
import InnerModal from "./QuestionsDetail/InnerModal";
import BankTermForm from "./QuestionsDetail/BankTermForm";
import AustralianShares from "./QuestionsDetail/AustralianShares";
import ManagedFunds from "./QuestionsDetail/ManagedFunds";
import SuperFunds from "./QuestionsDetail/SuperFunds";
import AccountBasedPension from "./QuestionsDetail/AccountBasedPension";
import InvestedAnnuities from "./QuestionsDetail/InvestedAnnuities";
import TradingCompany from "../BusinessEntities/TradingCompany";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const MiddleWare = (props) => {
  // Recoil
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

  // Local state
  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});
  let [ShowError, setShowError] = useState({});

  const AntdTable = DynamicTableForInputsSection("antd");
  const DefaultUrl = useRecoilValue(defaultUrl);

  // Title-based flags as objects
  const switchObject = {
    "Australian Shares/ETFs": true,
    "SMSF Australian Shares/ETFs": true,
    "Family Trust Australian Shares/ETFs": true,
    "Platform Investments": true,
    "Family Trust Platform Investments": true,
    "SMSF Platform Investments": true,
    "Investment Bond": true,
  };

  const clientPartnerObject = {
    "Super Funds": true,
    "Account Based Pension": true,
    "Annuities": true,
    "Business as Company Structure": true,
    "Business as Trusts": true,
  };

  const australianObject = {
    "Australian Shares/ETFs": true,
    "SMSF Australian Shares/ETFs": true,
    "Family Trust Australian Shares/ETFs": true,
  };

  const managedFundObject = {
    "Platform Investments": true,
    "Family Trust Platform Investments": true,
    "SMSF Platform Investments": true,
    "Investment Bond": true,
  };

  let attrebuteSet = props.modalObject.title in switchObject;
  let clientPartnerOnly = props.modalObject.title in clientPartnerObject;

  let BankAccountFinance =
    Object.keys(questionDetail[props.modalObject.key] || {}).length > 0
      ? questionDetail[props.modalObject.key]
      : {
        client: {},
        joint: {},
        partner: {},
      };

  const initialValues = {
    client: {},
    partner: {},
    joint: {},
  };

  // ---------- Helpers ----------
  const sumObjectValues = (obj, key, multiplierKey = null) => {

    console.log(obj)
    return obj[key];
    // return Object.values(obj || {}).reduce((total, entry) => {
    // const value = parseFloat(entry?.replace(/[^0-9.-]+/g, "")) || 0;

    // const multiplier = multiplierKey ? parseFloat(entry[multiplierKey] || 1) : 1;
    // return total + value * multiplier;
    // }, 0);
  };

  const calculateExpectedTotal = (modalTitle, dataObj, currentInput, checkState) => {
    if (!dataObj || Object.keys(dataObj).length === 0) return 0;

    switch (modalTitle) {
      case "Bank Accounts":
      case "Term Deposits":
      case "SMSF Bank Accounts":
      case "SMSF Term Deposits":
      case "Family Trust Bank Accounts":
      case "Family Trust Term Deposits":
      case "Annuities Detail":
        return sumObjectValues(dataObj, "currentBalance");

      case "Australian Shares/ETFs":
      case "SMSF Australian Shares/ETFs":
      case "Family Trust Australian Shares/ETFs":
        return currentInput === `${checkState}CurrentBalance`
          ? sumObjectValues(dataObj, "currentBalance")
          : sumObjectValues(dataObj, "costBase");

      case "Platform Investments":
      case "Investment Bond":
      case "SMSF Platform Investments":
      case "Family Trust Platform Investments":
        return currentInput === `${checkState}CurrentBalance`
          ? sumObjectValues(dataObj, "serviceFee", "serviceFeeType")
          : sumObjectValues(dataObj, "totalPortfolioCost");

      case "Super Funds":
        return sumObjectValues(dataObj, "annualAdvice");

      case "Account Based Pension":
        return sumObjectValues(dataObj, "pensionPayment");

      case "Invested in Annuities":
        return sumObjectValues(dataObj, "originalInvestmentAmount");

      case "Business as Company Structure":
        return sumObjectValues(dataObj, "equityPosition");

      default:
        return 0;
    }
  };

  const checkValues = async (values, setFieldValue, currentInput, stakeHolder) => {
    const client = values.client || {};
    const partner = values.partner || {};
    const joint = values.joint || {};

    let checkState = "";
    let inputSet = "current balance";

    const fromWith =
      parseFloat((currentInput.value || "").replace(/[^0-9.-]+/g, "")) || 0;

    switch (currentInput.name) {
      case "clientCurrentBalance":
      case "partnerCurrentBalance":
      case "jointCurrentBalance":
        checkState = currentInput.name.replace("CurrentBalance", "");
        inputSet = "current balance";
        break;

      case "clientCostBaseTemp":
      case "partnerCostBaseTemp":
      case "jointCostBaseTemp":
        checkState = currentInput.name.replace("CostBaseTemp", "");
        inputSet = "Cost Base";
        break;

      default:
        return;
    }

    const expectedTotal = await calculateExpectedTotal(
      props.modalObject.title,
      values[checkState] || {},
      currentInput.name,
      checkState
    );

    setShowError((prevState) => ({
      ...prevState,
      [`${currentInput.name}Error`]: expectedTotal !== 0 && expectedTotal !== fromWith,
      [`${currentInput.name}Message`]:
        expectedTotal !== fromWith
          ? `Total must be equal to the sum of all ${inputSet} filled in the popup. The sum is ${toCommaAndDollar(
            expectedTotal
          )}`
          : "",
    }));
  };

  // ---------- Robust Modal Opener ----------
  async function OpenInnerModal(title, values, key, stakeHolder) {
    console.log("OpenInnerModal ->", { title, values, key, stakeHolder });

    setModalObject({
      title,
      Input: stakeHolder,
      key: key,
      values: values,
      ShowError,
      setShowError,
    });
    setFlagState(true);
  }

  // ---------- Fill Initial Values ----------
  const fillInitialValues = (setFieldValue) => {
    try {
      if (!BankAccountFinance || Object.keys(BankAccountFinance).length === 0) return;

      if (!BankAccountFinance.clientFK && !BankAccountFinance._id) return;

      setFieldValue("client", BankAccountFinance.client || {});
      setFieldValue("partner", BankAccountFinance.partner || {});
      setFieldValue("joint", BankAccountFinance.joint || {});

      const recalculateSums = (stakeHolder, obj) => {
        const currentBalanceSum = calculateExpectedTotal(
          props.modalObject.title,
          obj,
          `${stakeHolder}CurrentBalance`,
          stakeHolder
        );
        setFieldValue(`${stakeHolder}CurrentBalance`, toCommaAndDollar(currentBalanceSum));
        checkValues(
          { ...BankAccountFinance, [stakeHolder]: obj },
          setFieldValue,
          { name: `${stakeHolder}CurrentBalance`, value: toCommaAndDollar(currentBalanceSum) },
          stakeHolder
        );

        if (attrebuteSet) {
          const costBaseSum = calculateExpectedTotal(
            props.modalObject.title,
            obj,
            `${stakeHolder}CostBaseTemp`,
            stakeHolder
          );
          setFieldValue(`${stakeHolder}CostBaseTemp`, toCommaAndDollar(costBaseSum));
          checkValues(
            { ...BankAccountFinance, [stakeHolder]: obj },
            setFieldValue,
            { name: `${stakeHolder}CostBaseTemp`, value: toCommaAndDollar(costBaseSum) },
            stakeHolder
          );
        }
      };

      recalculateSums("client", BankAccountFinance.client || {});

      if (localStorage.getItem("UserStatus") === "Married") {
        recalculateSums("partner", BankAccountFinance.partner || {});
        if (!clientPartnerOnly) {
          recalculateSums("joint", BankAccountFinance.joint || {});
        }
      }
    } catch (error) {
      console.error("Error in fillInitialValues:", error);
    }
  };

  // ---------- onSubmit with API Calls ----------
  const onSubmit = async (values) => {
    try {
      let obj = { ...values };

      if (!attrebuteSet) {
        obj.clientCostBaseTemp = undefined;
        obj.partnerCostBaseTemp = undefined;
        obj.jointCostBaseTemp = undefined;
      }

      obj.clientFK = localStorage.getItem("UserID");

      if (
        obj.jointCurrentBalance &&
        obj.jointCurrentBalance !== undefined &&
        obj.jointCurrentBalance !== null &&
        parseFloat(obj.jointCurrentBalance.replace(/[^0-9.-]+/g, "")) !== 0
      ) {
        let fiftyPercent = 0;
        try {
          let jointCurrentBalance = parseFloat(obj.jointCurrentBalance.replace(/[^0-9.-]+/g, ""));
          fiftyPercent = isNaN(jointCurrentBalance) || jointCurrentBalance === undefined ? 0 : jointCurrentBalance / 2;
        } catch (err) {
          console.error("Error calculating fiftyPercent:", err);
          fiftyPercent = 0;
        }

        if (fiftyPercent === 0) {
          obj.clientTotal = obj.clientCurrentBalance;
          obj.partnerTotal = obj.partnerCurrentBalance;
        } else {
          obj.clientTotal = toCommaAndDollar((parseFloat(obj.clientCurrentBalance.replace(/[^0-9.-]+/g, "")) || 0) + fiftyPercent);
          obj.partnerTotal = toCommaAndDollar((parseFloat(obj.partnerCurrentBalance.replace(/[^0-9.-]+/g, "")) || 0) + fiftyPercent);
        }
      } else {
        obj.clientTotal = obj.clientCurrentBalance || "";
        obj.partnerTotal = obj.partnerCurrentBalance || "";
      }

      if (clientPartnerOnly) obj.jointCurrentBalance = undefined;

      const bankAccountArray = BankAccountFinance.clientFK || "";

      let res;
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/${props.modalObject.key}/Add`, obj);
      } else {
        res = await PatchAxios(`${DefaultUrl}/api/${props.modalObject.key}/Update`, obj);
      }

      if (res) {
        const updatedData = { ...questionDetail, [props.modalObject.key]: res };
        setQuestionDetail(updatedData);
      }

      if (props.flagState) props.setFlagState(false);

      openNotificationSuccess("success", "topRight", "Success Notification", `Data of "${props.modalObject.title}" is Saved`);
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess("error", "topRight", "Error Notification", `Data of "${props.modalObject.title}" is not Saved Please! try again`);
    }
  };

  // ---------- Columns as Object ----------
  const columns = attrebuteSet
    ? {
      owner: { title: "Owner", dataIndex: "owner", key: "owner" },
      currentBalance: {
        title: "Current Balance",
        dataIndex: "currentBalance",
        key: "currentBalance",
        type: "number-toComma-Modal",
        placeholder: "Current Balance",
        innerModalTitle: "Bank Accounts Detail",
        func: OpenInnerModal,
        width: 200,
      },
      costBaseTemp: {
        title: "Cost Base",
        dataIndex: "costBaseTemp",
        key: "costBaseTemp",
        type: "number-toComma",
        placeholder: "Cost Base",
        callBack: true,
        inputChangeFunc: checkValues,
        handleInnerModal: OpenInnerModal,
        width: 200,
      },
    }
    : {
      owner: { title: "Owner", dataIndex: "owner", key: "owner" },
      currentBalance: {
        title: "Current Balance",
        dataIndex: "currentBalance",
        key: "currentBalance",
        type: "number-toComma-Modal",
        placeholder: "Current Balance",
        innerModalTitle: "Bank Accounts Detail",
        func: OpenInnerModal,
        width: 200,
      },
    };

  const componentMapping = {
    "Bank Accounts Detail": <BankTermForm />,
    "Term Deposits Detail": <BankTermForm />,
    "Australian Shares/ETFs Detail": <AustralianShares />,
    "Platform Investments Detail": <ManagedFunds />,
    "Investment Bond Detail": <ManagedFunds />,
    "Super Funds Detail": <SuperFunds />,
    "Account Based Pension Detail": <AccountBasedPension />,
    "Annuities Detail": <InvestedAnnuities />,
    "Business as Company Structure Detail": <TradingCompany />,
    "SMSF Bank Accounts Detail": <BankTermForm />,
    "SMSF Term Deposits Detail": <BankTermForm />,
    "SMSF Australian Shares/ETFs Detail": <AustralianShares />,
    "SMSF Platform Investments Detail": <ManagedFunds />,
    "SMSF Investment Bond Detail": <ManagedFunds />,
    "Family Trust Bank Accounts Detail": <BankTermForm />,
    "Family Trust Term Deposits Detail": <BankTermForm />,
    "Family Trust Australian Shares/ETFs Detail": <AustralianShares />,
    "Family Trust Platform Investments Detail": <ManagedFunds />,
  };

  const ModalContent = (obj) => {
    if (!obj || !obj.title) return null;
    let title = obj.title;
    if (title && title.includes("_")) title = title.split("_").slice(1).join("_");
    return componentMapping[title] || null;
  };

  // ---------- Render ----------
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, handleChange, setFieldValue, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [props.modalObject.key, questionDetail, modalObject]);
        const dataRows = {
          client: {
            key: "client",
            owner: RenderName("client"),
            stakeHolder: "client",
            currentBalance:
              Object.keys(values.client || {}).length > 0
                ?
                calculateExpectedTotal(
                  props.modalObject.title,
                  values.client,
                  "currentBalance",
                  "client"
                )

                : "--",
            costBaseTemp:
              attrebuteSet && Object.keys(values.client || {}).length > 0
                ? 
                  calculateExpectedTotal(
                    props.modalObject.title,
                    values.client,
                    "clientCostBaseTemp",
                    "client"
                  )
                : "--",
            values: values.client,
            innerModalTitle: `${RenderName("client")}_${props.modalObject.title} Detail`,
          },
          ...(localStorage.getItem("UserStatus") === "Married"
            ? {
              partner: {
                key: "partner",
                owner: RenderName("partner"),
                stakeHolder: "partner",
                currentBalance:
                  Object.keys(values.partner || {}).length > 0
                    ? calculateExpectedTotal(
                        props.modalObject.title,
                        values.partner,
                        "partnerCurrentBalance",
                        "partner"
                      )
                    : "--",
                costBaseTemp:
                  attrebuteSet && Object.keys(values.partner || {}).length > 0
                    ? calculateExpectedTotal(
                        props.modalObject.title,
                        values.partner,
                        "partnerCostBaseTemp",
                        "partner"
                      )
                    : "--",
                values: values.partner,
                innerModalTitle: `${RenderName("partner")}_${props.modalObject.title} Detail`,
              },
              ...(!clientPartnerOnly && {
                joint: {
                  key: "joint",
                  owner: `${RenderName("client")} & ${RenderName("partner")}`,
                  stakeHolder: "joint",
                  currentBalance:
                    Object.keys(values.joint || {}).length > 0
                      ? calculateExpectedTotal(
                          props.modalObject.title,
                          values.joint,
                          "jointCurrentBalance",
                          "joint"
                        )
                      : "--",
                  costBaseTemp:
                    attrebuteSet && Object.keys(values.joint || {}).length > 0
                      ? calculateExpectedTotal(
                          props.modalObject.title,
                          values.joint,
                          "jointCostBaseTemp",
                          "joint"
                        )
                      : "--",
                  values: values.joint,
                  innerModalTitle: `${RenderName("client")} & ${RenderName("partner")}_${props.modalObject.title} Detail`,
                },
              }),
            }
            : {}),
        };

        const handleModalClose = (setFieldValue, values) => {
          if (!modalObject?.Input) return;
          const stakeholder = modalObject.Input;

          const dataObj = values[stakeholder] || {};

          const currentBalanceSum = calculateExpectedTotal(
            props.modalObject.title,
            dataObj,
            `${stakeholder}CurrentBalance`,
            stakeholder
          );
          setFieldValue(`${stakeholder}CurrentBalance`, toCommaAndDollar(currentBalanceSum));

          if (attrebuteSet) {
            const costBaseSum = calculateExpectedTotal(
              props.modalObject.title,
              dataObj,
              `${stakeholder}CostBaseTemp`,
              stakeholder
            );
            setFieldValue(`${stakeholder}CostBaseTemp`, toCommaAndDollar(costBaseSum));
          }

          checkValues(
            { ...values, [stakeholder]: dataObj },
            setFieldValue,
            { name: `${stakeholder}CurrentBalance`, value: toCommaAndDollar(currentBalanceSum) },
            stakeholder
          );
        };

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <InnerModal
                  modalObject={modalObject}
                  setFieldValue={setFieldValue}
                  setFlagState={setFlagState}
                  flagState={flagState}
                  onCancel={() => setFlagState(false)}
                  onClose={() => handleModalClose(setFieldValue, values)}
                >
                  {ModalContent(modalObject)}
                </InnerModal>

                <h2 onClick={() => console.log(values)}>Test Values</h2>

                <div className="mt-4 All_Client reportSection">
                  <AntdTable
                    columns={Object.values(columns)}
                    data={Object.values(dataRows)}
                    values={values}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleInnerModal={OpenInnerModal}
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