// MiddleWare.jsx
import React, { useEffect, useState, useMemo } from "react";
import { Form, Formik } from "formik";
import { Placeholder, Row } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
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

const AntdTable = DynamicTableForInputsSection("antd");

const MiddleWare = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});
  const [showError, setShowError] = useState({});

  // modal title arrays (preserve original logic)
  const switchArray = [
    "Australian Shares/ETFs",
    "SMSF Australian Shares/ETFs",
    "Family Trust Australian Shares/ETFs",
    "Platform Investments",
    "Family Trust Platform Investments",
    "SMSF Platform Investments",
    "Investment Bond",
  ];
  const attrebuteSet = switchArray.includes(props.modalObject.title);

  const clientPartnerArray = [
    "Super Funds",
    "Account Based Pension",
    "Annuities",
    "Business as Company Structure",
    "Business as Trusts",
  ];
  const clientPartnerOnly = clientPartnerArray.includes(
    props.modalObject.title
  );

  const LabelPortfolioValue = [
    "Platform Investments",
    "Family Trust Platform Investments",
    "SMSF Platform Investments",
    "Investment Bond",
  ];
  const LabelPortfolio = LabelPortfolioValue.includes(props.modalObject.title);

  // read backend block for this modal key
  const BankAccountFinance =
    questionDetail[props.modalObject.key] &&
    Object.keys(questionDetail[props.modalObject.key]).length > 0
      ? questionDetail[props.modalObject.key]
      : { client: [], joint: [], partner: [] };

  const initialValues = {
    // clientCurrentBalance: "",
    // partnerCurrentBalance: "",
    // jointCurrentBalance: "",
    // clientCostBaseTemp: "",
    // partnerCostBaseTemp: "",
    // jointCostBaseTemp: "",
    // client: [],
    // partner: [],
    // joint: [],
  };

  // Modal component mapping
  const componentMapping = {
    "Bank Accounts Detail": <BankTermForm />, // example mapping - original mapping is used below in ModalContent
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
    if (!obj || typeof obj.title !== "string") return null;
    let title = obj.title;
    if (title.includes("_")) {
      title = title.split("_").slice(1).join("_");
    }
    return componentMapping[title] || null;
  };

  // Fill initial values from backend data into Formik structure
  // const fillInitialValues = (setFieldValue) => {
  //   try {
  //     // If no data available, return
  //     if (!BankAccountFinance || !BankAccountFinance.clientFK) return;

  //     // client
  //     setFieldValue("client", BankAccountFinance.client || []);
  //     setFieldValue(
  //       "clientCurrentBalance",
  //       BankAccountFinance.clientCurrentBalance || ""
  //     );
  //     // cost base temp for attribute sets
  //     setFieldValue(
  //       "clientCostBaseTemp",
  //       BankAccountFinance.clientCostBaseTemp ||
  //         BankAccountFinance.clientCostBase ||
  //         ""
  //     );

  //     // partner & joint only when Married
  //     if (localStorage.getItem("UserStatus") === "Married") {
  //       setFieldValue("partner", BankAccountFinance.partner || []);
  //       setFieldValue(
  //         "partnerCurrentBalance",
  //         BankAccountFinance.partnerCurrentBalance || ""
  //       );
  //       setFieldValue(
  //         "partnerCostBaseTemp",
  //         BankAccountFinance.partnerCostBaseTemp ||
  //           BankAccountFinance.partnerCostBase ||
  //           ""
  //       );

  //       if (!clientPartnerOnly) {
  //         setFieldValue("joint", BankAccountFinance.joint || []);
  //         setFieldValue(
  //           "jointCurrentBalance",
  //           BankAccountFinance.jointCurrentBalance || ""
  //         );
  //         setFieldValue(
  //           "jointCostBaseTemp",
  //           BankAccountFinance.jointCostBaseTemp ||
  //             BankAccountFinance.jointCostBase ||
  //             ""
  //         );
  //       }
  //     }
  //   } catch (err) {
  //     console.error("fillInitialValues error:", err);
  //   }
  // };
  const fillInitialValues = (setFieldValue) => {
    try {
      // 🧩 If no data available, return
      if (!BankAccountFinance || !BankAccountFinance.clientFK) return;

      // ✅ Client section
      setFieldValue("client", {
        currentBalanceArray: BankAccountFinance.client || [],
        currentBalance: BankAccountFinance.clientCurrentBalance || "",
        costBase: BankAccountFinance.clientCostBaseTemp || "",
      });

      // Add cost base temp if needed
      setFieldValue(
        "clientCostBase",
        BankAccountFinance.clientCostBaseTemp ||
          BankAccountFinance.clientCostBase ||
          ""
      );

      // ✅ Partner & Joint (only when Married)
      if (localStorage.getItem("UserStatus") === "Married") {
        setFieldValue("partner", {
          currentBalanceArray: BankAccountFinance.partner || [],
          currentBalance: BankAccountFinance.partnerCurrentBalance || "",
          costBase: BankAccountFinance.partnerCostBaseTemp || "",
        });

        setFieldValue(
          "partnerCostBase",
          BankAccountFinance.partnerCostBaseTemp ||
            BankAccountFinance.partnerCostBase ||
            ""
        );

        if (!clientPartnerOnly) {
          setFieldValue("joint", {
            currentBalanceArray: BankAccountFinance.joint || [],
            currentBalance: BankAccountFinance.jointCurrentBalance || "",
            costBase: BankAccountFinance.jointCostBaseTemp || "",
          });

          setFieldValue(
            "jointCostBase",
            BankAccountFinance.jointCostBaseTemp ||
              BankAccountFinance.jointCostBase ||
              ""
          );
        }
      }
    } catch (err) {
      console.error("fillInitialValues error:", err);
    }
  };

  // local value checker used by inputs and modal callbacks
  const checkValuesLocal = (
    valuesObj,
    setFieldValue,
    currentInput,
    stakeHolder
  ) => {
    // currentInput: { name, value }
    const checkState = currentInput.name.replace(
      /CurrentBalance|CostBaseTemp$/,
      ""
    );
    const fromWith =
      parseFloat(String(currentInput.value || "0").replace(/[^0-9.-]+/g, "")) ||
      0;

    const expectedTotal = calculateExpectedTotal(
      props.modalObject.title,
      valuesObj[checkState] || [],
      currentInput.name,
      checkState
    );

    setShowError((prev) => ({
      ...prev,
      [`${currentInput.name}Error`]:
        expectedTotal !== 0 && expectedTotal !== fromWith,
      [`${currentInput.name}Message`]:
        expectedTotal !== fromWith
          ? `Total must be equal to the sum of all ${
              currentInput.name.includes("CostBase")
                ? "Cost Base"
                : "current balance"
            } filled in the popup. The sum is ${toCommaAndDollar(
              expectedTotal
            )}`
          : "",
    }));
  };

  const DefaultUrl = useRecoilValue(defaultUrl);

  // Submit behaviour preserved from original
  // const onSubmit = async (values) => {
  //   try {
  //     const obj = { ...values };

  //     // remove temp cost base fields if not attribute set
  //     if (!attrebuteSet) {
  //       delete obj.clientCostBaseTemp;
  //       delete obj.partnerCostBaseTemp;
  //       delete obj.jointCostBaseTemp;
  //     }

  //     obj.clientFK = localStorage.getItem("UserID");

  //     // Compute clientTotal / partnerTotal using joint (50/50) if joint exists
  //     if (
  //       obj.jointCurrentBalance &&
  //       parseFloat(
  //         String(obj.jointCurrentBalance).replace(/[^0-9.-]+/g, "")
  //       ) !== 0
  //     ) {
  //       let fiftyPercent = 0;
  //       try {
  //         const jointValue =
  //           parseFloat(
  //             String(obj.jointCurrentBalance).replace(/[^0-9.-]+/g, "")
  //           ) || 0;
  //         fiftyPercent = jointValue / 2;
  //       } catch (err) {
  //         console.error("Error parsing jointCurrentBalance:", err);
  //         fiftyPercent = 0;
  //       }

  //       if (fiftyPercent === 0) {
  //         obj.clientTotal = obj.clientCurrentBalance || "$0";
  //         obj.partnerTotal = obj.partnerCurrentBalance || "$0";
  //       } else {
  //         obj.clientTotal = toCommaAndDollar(
  //           (parseFloat(
  //             String(obj.clientCurrentBalance || "0").replace(/[^0-9.-]+/g, "")
  //           ) || 0) + fiftyPercent
  //         );
  //         obj.partnerTotal = toCommaAndDollar(
  //           (parseFloat(
  //             String(obj.partnerCurrentBalance || "0").replace(/[^0-9.-]+/g, "")
  //           ) || 0) + fiftyPercent
  //         );
  //       }
  //     } else {
  //       obj.clientTotal = obj.clientCurrentBalance || "$0";
  //       obj.partnerTotal = obj.partnerCurrentBalance || "$0";
  //     }

  //     if (clientPartnerOnly) {
  //       obj.jointCurrentBalance = undefined;
  //     }

  //     const bankAccountArray = BankAccountFinance.clientFK || "";

  //     let res;
  //     if (!bankAccountArray) {
  //       res = await PostAxios(
  //         `${DefaultUrl}/api/${props.modalObject.key}/Add`,
  //         obj
  //       );
  //     } else {
  //       res = await PatchAxios(
  //         `${DefaultUrl}/api/${props.modalObject.key}/Update`,
  //         obj
  //       );
  //     }

  //     if (res) {
  //       const updatedData = {
  //         ...questionDetailObj,
  //         [props.modalObject.key]: res,
  //       };
  //       setQuestionDetail(updatedData);
  //       openNotificationSuccess(
  //         "success",
  //         "topRight",
  //         "Success Notification",
  //         `Data of "${props.modalObject.title}" is Saved`
  //       );
  //       if (props.flagState) props.setFlagState(false);
  //     }
  //   } catch (error) {
  //     console.error("onSubmit error:", error);
  //     openNotificationSuccess(
  //       "error",
  //       "topRight",
  //       "Error Notification",
  //       `Data of "${props.modalObject.title}" is not Saved Please! try again`
  //     );
  //   }
  // };

  const onSubmit = async (values) => {
    try {
      // 1️⃣ Start shaping object for backend
      const obj = {
        client: values?.client?.currentBalanceArray || [],
        partner: values?.partner?.currentBalanceArray || [],
        joint: values?.joint?.currentBalanceArray || [],
        clientCurrentBalance: values?.client?.currentBalance || "$0",
        partnerCurrentBalance: values?.partner?.currentBalance || "$0",
        jointCurrentBalance: values?.joint?.currentBalance || "$0",
        clientCostBaseTemp: values?.client?.costBase || "",
        partnerCostBaseTemp: values?.partner?.costBase || "",
        jointCostBaseTemp: values?.joint?.costBase || "",
      };

      // remove temp cost base fields if not attribute set
      if (!attrebuteSet) {
        delete obj.clientCostBaseTemp;
        delete obj.partnerCostBaseTemp;
        delete obj.jointCostBaseTemp;
      }

      // 2️⃣ Add client foreign key
      obj.clientFK = localStorage.getItem("UserID");

      // 3️⃣ Compute totals with 50/50 joint split logic
      if (
        obj.jointCurrentBalance &&
        parseFloat(
          String(obj.jointCurrentBalance).replace(/[^0-9.-]+/g, "")
        ) !== 0
      ) {
        let fiftyPercent = 0;
        try {
          const jointValue =
            parseFloat(
              String(obj.jointCurrentBalance).replace(/[^0-9.-]+/g, "")
            ) || 0;
          fiftyPercent = jointValue / 2;
        } catch (err) {
          console.error("Error parsing jointCurrentBalance:", err);
          fiftyPercent = 0;
        }

        if (fiftyPercent === 0) {
          obj.clientTotal = obj.clientCurrentBalance || "$0";
          obj.partnerTotal = obj.partnerCurrentBalance || "$0";
        } else {
          obj.clientTotal = toCommaAndDollar(
            (parseFloat(
              String(obj.clientCurrentBalance || "0").replace(/[^0-9.-]+/g, "")
            ) || 0) + fiftyPercent
          );
          obj.partnerTotal = toCommaAndDollar(
            (parseFloat(
              String(obj.partnerCurrentBalance || "0").replace(/[^0-9.-]+/g, "")
            ) || 0) + fiftyPercent
          );
        }
      } else {
        obj.clientTotal = obj.clientCurrentBalance || "$0";
        obj.partnerTotal = obj.partnerCurrentBalance || "$0";
      }

      // 4️⃣ Optional: handle client-partner-only case
      if (clientPartnerOnly) {
        obj.jointCurrentBalance = undefined;
        obj.joint = [];
      }

      // 5️⃣ Perform API call
      const bankAccountArray = BankAccountFinance.clientFK || "";

      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/${props.modalObject.key}/Add`,
          obj
        );
      } else {
        res = await PatchAxios(
          `${DefaultUrl}/api/${props.modalObject.key}/Update`,
          obj
        );
      }

      // 6️⃣ Update state and notify success
      if (res) {
        const updatedData = {
          ...questionDetailObj,
          [props.modalObject.key]: res,
        };
        setQuestionDetail(updatedData);

        openNotificationSuccess(
          "success",
          "topRight",
          "Success Notification",
          `Data of "${props.modalObject.title}" is Saved`
        );

        if (props.flagState) props.setFlagState(false);
      }
    } catch (error) {
      console.error("onSubmit error:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Data of "${props.modalObject.title}" is not Saved Please! try again`
      );
    }
  };

  let PageLimit = {
    bankAccountFinance: 10,
    termDepositsFinance: 10,
    australianShareMarket: 50,
  };

  // open inner modal
  async function OpenInnerModal(title, values, key, stakeHolder) {
    setModalObject({
      title,
      Input: key,
      key: props.modalObject.key,
      values,
      pageLimit: PageLimit[props.modalObject.key],
      stakeHolder,
      ShowError: showError,
      setShowError,
    });
    setFlagState(true);
  }

  // Table columns (AntD-style) — 3 rows: client / partner / joint
  const columns = useMemo(() => {
    const ownerCol = {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      type: "plainText",
    };

    const currentBalanceCol = {
      title: LabelPortfolio ? "Portfolio Value" : "Current Balance",
      dataIndex: "currentBalance",
      key: "currentBalance",
      type: "number-toComma-Modal",
      placeholder: "Current Balance",
      callBackModal: true,
      callBack: true,
      func: OpenInnerModal,
      inputChangeFunc: checkValuesLocal,
    };

    const costBaseCol = {
      title: "Cost Base",
      dataIndex: "costBase",
      key: "costBase",
      type: "number-toComma",
      placeholder: "Cost Base",
      callBack: true,
      func: checkValuesLocal,
    };

    // include cost base only when attribute set
    return attrebuteSet
      ? [ownerCol, currentBalanceCol, costBaseCol]
      : [ownerCol, currentBalanceCol];
  }, [attrebuteSet]);

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
        }, []);

        // Build three rows (client, partner, joint). Keep joint only when not clientPartnerOnly and when Married
        const rows = [
          {
            key: "client",
            stakeHolder: "client",
            owner: RenderName("client"),
            innerModalTitle:
              RenderName("client") + "_" + props.modalObject.title + " Detail",
            currentBalance: values?.client?.currentBalance || "",
            costBase: values?.client?.costBase || "",
          },
        ];

        if (localStorage.getItem("UserStatus") === "Married") {
          rows.push({
            key: "partner",
            stakeHolder: "partner",
            owner: RenderName("partner"),
            innerModalTitle:
              RenderName("partner") + "_" + props.modalObject.title + " Detail",
            currentBalance: values?.partner?.currentBalance || "",
            costBase: values?.partner?.costBase || "",
          });

          if (!clientPartnerOnly) {
            rows.push({
              key: "joint",
              stakeHolder: "joint",
              owner: RenderName("joint"),
              innerModalTitle:
                RenderName("joint") + "_" + props.modalObject.title + " Detail",
              currentBalance: values?.joint?.currentBalance || "",
              costBase: values?.joint?.costBase || "",
            });
          }
        }

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

                <p
                  className="text-end mt-1 pt-2 d-none"
                  onClick={() => {
                    console.log(values);
                  }}
                >
                  Test Text
                </p>

                <div className="mt-4 All_Client reportSection">
                  <AntdTable
                    columns={columns}
                    data={rows}
                    values={values}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleSubmit={props?.handleOk}
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
