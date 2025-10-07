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
  // recoil
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

  // local state
  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});
  let [ShowError, setShowError] = useState({});

  const AntdTable = DynamicTableForInputsSection("antd");
  const DefaultUrl = useRecoilValue(defaultUrl);

  // title-based flags
  let switchArray = [
    "Australian Shares/ETFs",
    "SMSF Australian Shares/ETFs",
    "Family Trust Australian Shares/ETFs",
    "Platform Investments",
    "Family Trust Platform Investments",
    "SMSF Platform Investments",
    "Investment Bond",
  ];
  let attrebuteSet = switchArray.includes(props.modalObject.title) ? true : false;

  let clientPartnerArray = [
    "Super Funds",
    "Account Based Pension",
    "Annuities",
    "Business as Company Structure",
    "Business as Trusts",
  ];
  let clientPartnerOnly = clientPartnerArray.includes(props.modalObject.title)
    ? true
    : false;

  let BankAccountFinance =
    Object.keys(questionDetail[props.modalObject.key] || {}).length > 0
      ? questionDetail[props.modalObject.key]
      : {
          client: [],
          joint: [],
          partner: [],
        };

  const initialValues = {
    clientCurrentBalance: "",
    partnerCurrentBalance: "",
    jointCurrentBalance: "",
    clientCostBaseTemp: "",
    partnerCostBaseTemp: "",
    jointCostBaseTemp: "",
    client: [],
    partner: [],
    joint: [],
  };

  const AustralianArray = [
    "Australian Shares/ETFs",
    "SMSF Australian Shares/ETFs",
    "Family Trust Australian Shares/ETFs",
  ];
  const ManagedFundArray = [
    "Platform Investments",
    "Family Trust Platform Investments",
    "SMSF Platform Investments",
    "Investment Bond",
  ];

  // ---------- helpers ----------
  const sumArrayValues = (array, key, multiplierKey = null) => {
    return array.reduce((total, entry) => {
      const value = parseFloat(entry[key]?.replace(/[^0-9.-]+/g, "")) || 0;
      const multiplier = multiplierKey ? parseFloat(entry[multiplierKey] || 1) : 1;
      return total + value * multiplier;
    }, 0);
  };

  const calculateExpectedTotal = (modalTitle, dataArray, currentInput, checkState) => {
    if (!dataArray || dataArray.length === 0) return 0;

    switch (modalTitle) {
      case "Bank Accounts":
      case "Term Deposits":
      case "SMSF Bank Accounts":
      case "SMSF Term Deposits":
      case "Family Trust Bank Accounts":
      case "Family Trust Term Deposits":
        return sumArrayValues(dataArray, "currentBalance");

      case "Australian Shares/ETFs":
      case "SMSF Australian Shares/ETFs":
      case "Family Trust Australian Shares/ETFs":
        return currentInput === `${checkState}CurrentBalance`
          ? sumArrayValues(dataArray, "currentBalance")
          : sumArrayValues(dataArray, "costBase");

      case "Platform Investments":
      case "Investment Bond":
      case "SMSF Platform Investments":
      case "Family Trust Platform Investments":
        return currentInput === `${checkState}CurrentBalance`
          ? sumArrayValues(dataArray, "serviceFee", "serviceFeeType")
          : sumArrayValues(dataArray, "totalPortfolioCost");

      case "Super Funds":
        return sumArrayValues(dataArray, "annualAdvice");

      case "Account Based Pension":
        return sumArrayValues(dataArray, "pensionPayment");

      case "Invested in Annuities":
        return sumArrayValues(dataArray, "originalInvestmentAmount");

      case "Business as Company Structure":
        return sumArrayValues(dataArray, "equityPosition");

      default:
        return 0;
    }
  };

  const checkValues = async (values, setFieldValue, currentInput, stakeHolder) => {
    const client = values.client || [];
    const partner = values.partner || [];
    const joint = values.joint || [];

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
      values[checkState] || [],
      currentInput.name,
      checkState
    );

    setShowError((prevState) => ({
      ...prevState,
      [`${currentInput.name}Error`]:
        expectedTotal !== 0 && expectedTotal !== fromWith,
      [`${currentInput.name}Message`]:
        expectedTotal !== fromWith
          ? `Total must be equal to the sum of all ${inputSet} filled in the popup. The sum is ${toCommaAndDollar(
              expectedTotal
            )}`
          : "",
    }));
  };

  // ---------- robust modal opener (accepts various call shapes) ----------
  async function OpenInnerModal(...args) {
    let title = null;
    let valuesForModal = null;
    let inputKey = null;

    if (typeof args[0] === "string" && args.length >= 3) {
      title = args[0];
      valuesForModal = args[1];
      inputKey = args[2];
    } else if (args[0] && typeof args[0] === "object" && args[0].stakeHolder) {
      const row = args[0];
      inputKey = row.stakeHolder;
      valuesForModal = row.values || row.data || [];
      title = row.innerModalTitle || `${RenderName(row.stakeHolder)}_${props.modalObject.title} Detail`;
    } else {
      inputKey = args[0];
      valuesForModal = args[1] || [];
      title = `${RenderName(inputKey || "client")}_${props.modalObject.title} Detail`;
    }

    if (!title.includes(props.modalObject.title)) {
      const left = (title && title.split("_")[0]) || RenderName(inputKey || "client");
      title = `${left}_${props.modalObject.title} Detail`;
    }
    if (!title.includes("Detail")) title = `${title} Detail`;

    console.log("OpenInnerModal ->", { title, inputKey, valuesForModal });

    setModalObject({
      title,
      Input: inputKey,
      key: props.modalObject.key,
      values: valuesForModal,
      ShowError,
      setShowError,
    });
    setFlagState(true);
  }

  // ---------- fill initial values ----------
  const fillInitialValues = (setFieldValue) => {
    try {
      if (!BankAccountFinance || Object.keys(BankAccountFinance).length === 0) return;

      if (!BankAccountFinance.clientFK && !BankAccountFinance._id) return;

      setFieldValue("client", BankAccountFinance.client || []);
      setFieldValue("partner", BankAccountFinance.partner || []);
      setFieldValue("joint", BankAccountFinance.joint || []);

      const recalculateSums = (stakeHolder, array) => {
        const currentBalanceSum = sumArrayValues(array, "currentBalance");
        setFieldValue(`${stakeHolder}CurrentBalance`, toCommaAndDollar(currentBalanceSum));
        checkValues(
          { ...BankAccountFinance, [stakeHolder]: array },
          setFieldValue,
          { name: `${stakeHolder}CurrentBalance`, value: toCommaAndDollar(currentBalanceSum) },
          stakeHolder
        );

        if (attrebuteSet) {
          const isAustralian = AustralianArray.includes(props.modalObject.title);
          const isManagedFund = ManagedFundArray.includes(props.modalObject.title);
          const costBaseField = isAustralian ? "costBase" : isManagedFund ? "totalPortfolioCost" : "costBase";
          const costBaseSum = sumArrayValues(array, costBaseField);
          setFieldValue(`${stakeHolder}CostBaseTemp`, toCommaAndDollar(costBaseSum));
          checkValues(
            { ...BankAccountFinance, [stakeHolder]: array },
            setFieldValue,
            { name: `${stakeHolder}CostBaseTemp`, value: toCommaAndDollar(costBaseSum) },
            stakeHolder
          );
        }
      };

      recalculateSums("client", BankAccountFinance.client || []);

      if (localStorage.getItem("UserStatus") === "Married") {
        recalculateSums("partner", BankAccountFinance.partner || []);
        if (!clientPartnerOnly) {
          recalculateSums("joint", BankAccountFinance.joint || []);
        }
      }
    } catch (error) {
      console.error("Error in fillInitialValues:", error);
    }
  };

  // ---------- onSubmit with API calls ----------
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
        obj.clientTotal = obj.clientCurrentBalance || "$0";
        obj.partnerTotal = obj.partnerCurrentBalance || "$0";
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

  // ---------- AntD columns ----------
  const columns = attrebuteSet
    ? [
        { title: "Owner", dataIndex: "owner", key: "owner" },
        {
          title: "Current Balance",
          dataIndex: "currentBalance",
          key: "currentBalance",
          type: "number-toComma-Modal",
          placeholder: "Current Balance",
          callBack: true,
          inputChangeFunc: checkValues,
          callBackModal: true,
          func: OpenInnerModal,
          handleInnerModal: OpenInnerModal,
          width: 200,
        },
        {
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
      ]
    : [
        { title: "Owner", dataIndex: "owner", key: "owner" },
        {
          title: "Current Balance",
          dataIndex: "currentBalance",
          key: "currentBalance",
          type: "number-toComma-Modal",
          placeholder: "Current Balance",
          callBack: true,
          inputChangeFunc: checkValues,
          callBackModal: true,
          func: OpenInnerModal,
          handleInnerModal: OpenInnerModal,
          width: 200,
        },
      ];

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

  // ---------- render ----------
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize innerRef={props.formRef}>
      {({ values, handleChange, setFieldValue, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [props.modalObject.key, questionDetail, modalObject]);

        const dataRows = [
          {
            key: "client",
            owner: RenderName("client"),
            stakeHolder: "client",
            currentBalance: values.clientCurrentBalance,
            costBaseTemp: values.clientCostBaseTemp,
            values: values.client || [],
            innerModalTitle: RenderName("client") + "_" + props.modalObject.title + " Detail",
          },
          ...(localStorage.getItem("UserStatus") === "Married"
            ? [
                {
                  key: "partner",
                  owner: RenderName("partner"),
                  stakeHolder: "partner",
                  currentBalance: values.partnerCurrentBalance,
                  costBaseTemp: values.partnerCostBaseTemp,
                  values: values.partner || [],
                  innerModalTitle: RenderName("partner") + "_" + props.modalObject.title + " Detail",
                },
                !clientPartnerOnly && {
                  key: "joint",
                  owner: `${RenderName("client")} & ${RenderName("partner")}`,
                  stakeHolder: "joint",
                  currentBalance: values.jointCurrentBalance,
                  costBaseTemp: values.jointCostBaseTemp,
                  values: values.joint || [],
                  innerModalTitle:
                    RenderName("client") +
                    " & " +
                    RenderName("partner") +
                    "_" +
                    props.modalObject.title +
                    " Detail",
                },
              ].filter(Boolean)
            : []),
        ];

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <InnerModal 
                  modalObject={modalObject} 
                  setFieldValue={setFieldValue} 
                  setFlagState={setFlagState}
                  flagState={flagState}
                >
                  {ModalContent(modalObject)}
                </InnerModal>

                <div className="mt-4 All_Client reportSection">
                  <AntdTable
                    columns={columns}
                    data={dataRows}
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