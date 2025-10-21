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
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import DynamicYesNo from "../FinancialInvestments/QuestionsDetail/DynamicYesNo";
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import Beneficiaries from "../FinancialInvestments/QuestionsDetail/Beneficiaries";
import NewLoadingExclusion from "./NewLoadingExclusion";
import PremiumsDetails from "./PremiumsDetails";

const AntdTable = DynamicTableForInputsSection("antd");

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
        client: [],
        partner: [],
        joint: [],
        PersonalInsurance: [],
        numberOfPersonalInsurance: 0,
      };

  const initialValues = {
    NumberOfMap: "",
    PersonalInsurance: [],
  };

  const fillInitialValues = (setFieldValue) => {
    const userStatus = localStorage.getItem("UserStatus");

    if (personalInsurance && personalInsurance.PersonalInsurance?.length) {
      setFieldValue(
        "NumberOfMap",
        personalInsurance.numberOfPersonalInsurance || 0
      );

      personalInsurance.PersonalInsurance.forEach((entry, index) => {
        setFieldValue(`PersonalInsurance[${index}].lifeInsured`, entry.lifeInsured || "");
        setFieldValue(`PersonalInsurance[${index}].provider`, entry.provider || "");
        setFieldValue(`PersonalInsurance[${index}].policyNo`, entry.policyNo || "");
        setFieldValue(`PersonalInsurance[${index}].Owner`, entry.Owner || "");
        setFieldValue(`PersonalInsurance[${index}].startDate`, entry.startDate || "");
        setFieldValue(`PersonalInsurance[${index}].sumInsured`, entry.sumInsured || []);
        setFieldValue(`PersonalInsurance[${index}].sumInsuredDetails`, entry.sumInsuredSum || "");
        setFieldValue(`PersonalInsurance[${index}].premiums`, entry.premiums || "");
        setFieldValue(`PersonalInsurance[${index}].premiumsDetails`, entry.premiumsDetails || []);
        setFieldValue(`PersonalInsurance[${index}].loadingExclusion`, entry.loadingExclusion || "No");
        setFieldValue(`PersonalInsurance[${index}].loadingExclusion_input`, entry.loadingExclusionValue || "");
        setFieldValue(`PersonalInsurance[${index}].beneficiary`, entry.beneficiary || "");
        setFieldValue(`PersonalInsurance[${index}].beneficiaryDetails`, entry.beneficiaryDetails || []);
      });
    } else {
      setFieldValue("NumberOfMap", "");
      setFieldValue("PersonalInsurance", []);
    }
  };



  let handleInnerModal = (innerModalTitle, values, key, stakeHolder) => {

    let index = stakeHolder.replace(/[^0-9]+/g, "");
    let BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");

    let title = RenderName(values?.[BaseKey]?.[index].lifeInsured) + innerModalTitle;

    console.log(innerModalTitle, key, values, stakeHolder, title, index, BaseKey, values?.[BaseKey]?.[index].lifeInsured)
    setModalObject({
      title,
      key,
      parentValues: values,
      stakeHolder,
    });
    setFlagState(true);
  };

const onSubmit = async (values, { setFieldValue }) => {
  try {
    const loopLength = parseFloat(values.NumberOfMap) || 0;
    const newEntries = [];

    // 🟢 FIX: Use the nested structure from your form
    for (let i = 0; i < loopLength; i++) {
      const entry = values.PersonalInsurance?.[i] || {};
      
      const newEntry = {
        lifeInsured: entry.lifeInsured || "",
        provider: entry.provider || "",
        policyNo: entry.policyNo || "",
        owner: entry.Owner || "", // Note: your form uses 'Owner' with capital O
        startDate: entry.startDate || "",
        sumInsuredSum: entry.sumInsuredDetails || "", // Your form uses sumInsuredDetails
        sumInsured: entry.sumInsured || [],
        premiums: entry.premiums || "",
        premiumsDetails: entry.premiumsDetails || [],
        loadingExclusion: entry.loadingExclusion || "",
        loadingExclusionValue: entry.loadingExclusion_input || "", // Your form uses loadingExclusion_input
        beneficiary: entry.beneficiary || "",
        beneficiariesArray: entry.beneficiaryDetails || [], // Your form uses beneficiaryDetails
      };

      newEntries.push(newEntry);
    }

    // 🧾 Build base API object
    const Obj = {
      PersonalInsurance: newEntries,
      numberOfPersonalInsurance: newEntries.length,
      clientFK: localStorage.getItem("UserID"),
    };

    // -------------------------------------------------------------
    // 🧮 TOTAL PREMIUM CALCULATION (THIS PART NOW GETS CALLED CORRECTLY)
    // -------------------------------------------------------------

    const obj = {
      clientLifeInsuranceTotal: 0,
      clientTPDTotal: 0,
      clientTraumaTotal: 0,
      clientIncomeProtectionTotal: 0,

      partnerLifeInsuranceTotal: 0,
      partnerTPDTotal: 0,
      partnerTraumaTotal: 0,
      partnerIncomeProtectionTotal: 0,
    };

    // Separate by lifeInsured type
    const clientArray = newEntries.filter(
      (e) => e.lifeInsured?.toLowerCase() === "client"
    );
    const partnerArray = newEntries.filter(
      (e) => e.lifeInsured?.toLowerCase() === "partner"
    );
    const bothArray = newEntries.filter(
      (e) => e.lifeInsured?.toLowerCase() === "client+partner"
    );

    // Helper function to parse premium value
    const parsePremium = (premiumStr) => {
      if (!premiumStr) return 0;
      return parseFloat(premiumStr.replace(/[^0-9.-]+/g, "")) || 0;
    };

    // ---- Client entries ----
    clientArray.forEach((entry) => {
      const premiumValue = parsePremium(entry.premiums);
      const sumInsuredArray = Array.isArray(entry.sumInsured) ? entry.sumInsured : [];
      
      sumInsuredArray.forEach((SumData) => {
        if (SumData.coverType === "Life")
          obj.clientLifeInsuranceTotal += premiumValue;
        else if (SumData.coverType === "TPD")
          obj.clientTPDTotal += premiumValue;
        else if (SumData.coverType === "Trauma")
          obj.clientTraumaTotal += premiumValue;
        else if (SumData.coverType === "Income protection")
          obj.clientIncomeProtectionTotal += premiumValue;
      });
    });

    // ---- Partner entries ----
    partnerArray.forEach((entry) => {
      const premiumValue = parsePremium(entry.premiums);
      const sumInsuredArray = Array.isArray(entry.sumInsured) ? entry.sumInsured : [];
      
      sumInsuredArray.forEach((SumData) => {
        if (SumData.coverType === "Life")
          obj.partnerLifeInsuranceTotal += premiumValue;
        else if (SumData.coverType === "TPD")
          obj.partnerTPDTotal += premiumValue;
        else if (SumData.coverType === "Trauma")
          obj.partnerTraumaTotal += premiumValue;
        else if (SumData.coverType === "Income protection")
          obj.partnerIncomeProtectionTotal += premiumValue;
      });
    });

    // ---- Both entries (split half each) ----
    bothArray.forEach((entry) => {
      const premiumValue = parsePremium(entry.premiums) / 2;
      const sumInsuredArray = Array.isArray(entry.sumInsured) ? entry.sumInsured : [];
      
      sumInsuredArray.forEach((SumData) => {
        if (SumData.coverType === "Life") {
          obj.clientLifeInsuranceTotal += premiumValue;
          obj.partnerLifeInsuranceTotal += premiumValue;
        } else if (SumData.coverType === "TPD") {
          obj.clientTPDTotal += premiumValue;
          obj.partnerTPDTotal += premiumValue;
        } else if (SumData.coverType === "Trauma") {
          obj.clientTraumaTotal += premiumValue;
          obj.partnerTraumaTotal += premiumValue;
        } else if (SumData.coverType === "Income protection") {
          obj.clientIncomeProtectionTotal += premiumValue;
          obj.partnerIncomeProtectionTotal += premiumValue;
        }
      });
    });

    // Format totals and attach to Obj
    Obj.clientLifeInsuranceTotal = toCommaAndDollar(obj.clientLifeInsuranceTotal);
    Obj.clientTPDTotal = toCommaAndDollar(obj.clientTPDTotal);
    Obj.clientTraumaTotal = toCommaAndDollar(obj.clientTraumaTotal);
    Obj.clientIncomeProtectionTotal = toCommaAndDollar(obj.clientIncomeProtectionTotal);

    Obj.partnerLifeInsuranceTotal = toCommaAndDollar(obj.partnerLifeInsuranceTotal);
    Obj.partnerTPDTotal = toCommaAndDollar(obj.partnerTPDTotal);
    Obj.partnerTraumaTotal = toCommaAndDollar(obj.partnerTraumaTotal);
    Obj.partnerIncomeProtectionTotal = toCommaAndDollar(obj.partnerIncomeProtectionTotal);

    // -------------------------------------------------------------
    // 🧩 REST OF YOUR API CODE REMAINS THE SAME...
    // -------------------------------------------------------------

    const bankAccountArray = personalInsurance.clientFK || "";
    let res;

    if (!bankAccountArray) {
      res = await PostAxios(`${DefaultUrl}/api/personalInsurance/Add`, Obj);
    } else {
      res = await PatchAxios(`${DefaultUrl}/api/personalInsurance/Update`, Obj);
    }

    if (res) {
      const updatedData = { ...questionDetail, personalInsurance: res };
      setQuestionDetail(updatedData);
      await updateQuestions();
    }

    openNotificationSuccess(
      "success",
      "topRight",
      "Success Notification",
      `Data of "${props.modalObject.title}" is Saved`
    );

    if (props.flagState) props.setFlagState(false);
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

// Don't forget to add back the updateQuestions function if needed
let updateQuestions = async () => {
  let values = { ...CRObject, life: "Yes" };
  try {
    const PatchRes = await PatchAxios(
      `${DefaultUrl}/api/questions/Update/${localStorage.getItem("UserID")}`,
      values
    );
    console.log(PatchRes, "PatchRes");
    setCRObject(PatchRes);
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};


  const columns = [
    {
      title: "No#",
      dataIndex: "index",
      key: "owner",
      render: (_, __, i) => i + 1,
      width: 60,
    },
    {
      title: "Life Insured",
      dataIndex: "lifeInsured",
      key: "lifeInsured",
      selectedOptionValue:true,
      type: "select",
      placeholder: "Select Life Insured",
      options: [
        { value: "client", label: RenderName("client") },
        ...(UserStatus !== "Single"
          ? [
            { value: "partner", label: RenderName("partner") },
            { value: `joint`, label: `${RenderName("client")} & ${RenderName("partner")}` },
          ]
          : []),
      ],

      width: 200,
    },
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
      type: "select",
      
      selectedOptionValue:true,
      placeholder: "Select Provider",
      options:
        bankDetailObj?.PersonalInsurances && bankDetailObj.PersonalInsurances.length > 0
          ? bankDetailObj.PersonalInsurances.map((elem) => ({
            value: elem._id,
            label: elem.platformName,
          }))
          : [{ value: "", label: "No Platforms Added in Personal Insurances", disabled: true }],
      width: 200,
    },
    {
      title: "Policy No",
      dataIndex: "policyNo",
      key: "policyNo",
      type: "number",
      placeholder: "Policy No",
      width: 150,
    },
    {
      title: "Owner",
      dataIndex: "Owner",
      key: "Owner",
      type: "select",
      placeholder: "Select Owner",
      options: [
        { value: "SMSF", label: "SMSF" },
        { value: "Super Trustees", label: "Super Trustees" },
        { value: "Company (Pty Ltd)", label: "Company (Pty Ltd)" },
        { value: "Family Trust", label: "Family Trust" },
      ],
      width: 200,
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
      title: "Sum Insured",
      dataIndex: "sumInsured",
      key: "sumInsured",
      type: "number-toComma-Modal",
      placeholder: "Sum Insured",
      width: 200,
      innerModalTitle: "_Sum Insured",
      func: handleInnerModal,
    },
    {
      title: "Premiums p.a",
      dataIndex: "premiums",
      key: "premiums",
      type: "number-toComma-Modal",
      placeholder: "Premiums p.a",
      innerModalTitle: "_Premiums p.a",
      width: 200,
      func: handleInnerModal,
    },
    {
      title: "Loading/Exclusion",
      dataIndex: "loadingExclusion",
      key: "loadingExclusion",
      placeholder: "Loading/Exclusion",
      type: "yesnoInput",
      width: 190,
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
    sumInsured: <NewLoadingExclusion />,
    premiums: <PremiumsDetails />,
    beneficiary: <Beneficiaries />,
  };

  const ModalContent = (obj) => {
    let maKeaBtao = obj.key;
    return componentMapping[maKeaBtao] || null;
  };


  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize innerRef={props.formRef}>
        {({ values, setFieldValue, handleChange, handleBlur }) => {
          useEffect(() => {
            
            fillInitialValues(setFieldValue);
          }, [personalInsurance.PersonalInsurance]);

          const dataRows = useMemo(() => {
            const num = Number(values.NumberOfMap) || 0;
            if (num > 0) {
              return Array.from({ length: num }, (_, i) => ({
                key: `PersonalInsurance[${i}]`,
                stakeHolder: `PersonalInsurance[${i}]`,
                ...values.PersonalInsurance[i],
              }));
            }
            return [];
          }, [values.NumberOfMap, values.PersonalInsurance]);

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

              <div className="d-flex flex-row justify-content-center align-items-center gap-4">
                <p className="text-end mt-1 pt-2" onClick={()=>console.log(values)}>
                  How many {props.modalObject.title} does {RenderName("client")}{" "}
                  {UserStatus === "Married" && `and ${RenderName("partner")}`} have :
                </p>
                <div style={{ minWidth: "10%" }}>
                  <Field
                    as="select"
                    id="NumberOfMap"
                    name="NumberOfMap"
                    className="form-select inputDesignDoubleInput"
                  >
                    <option value="">Select</option>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>

              {values.NumberOfMap && (
                <div className="mt-4 All_Client reportSection">
                  <AntdTable
                    columns={columns}
                    data={dataRows}
                    values={values}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </div>
              )}
              <button type="submit" style={{ display: "none" }}>Submit</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PersonalInsuranceLife;