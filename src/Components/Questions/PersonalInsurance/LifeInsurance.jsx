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
import PremiumsDetails from "./PremiumsDetails";
import Beneficiaries from "../FinancialInvestments/QuestionsDetail/Beneficiaries";
import NewLoadingExclusion from "./NewLoadingExclusion";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const PersonalInsuranceLife = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  const DefaultUrl = useRecoilValue(defaultUrl);
  const bankDetailObj = useRecoilValue(BankDetail);
  const [CRObject, setCRObject] = useRecoilState(CRState);
  const [UserStatus] = useState(localStorage.getItem("UserStatus"));
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({
    title: "",
    question: "",
    key: "",
    values: {},
    editArray: [],
    index: null,
    parentModal: "",
  });

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
      // Set total number of records
      setFieldValue(
        "NumberOfMap",
        personalInsurance.numberOfPersonalInsurance || 0
      );

      // Loop through existing entries
      personalInsurance.PersonalInsurance.forEach((entry, index) => {
        setFieldValue(`PersonalInsurance[${index}].lifeInsured`, entry.lifeInsured || "");
        setFieldValue(`PersonalInsurance[${index}].provider`, entry.provider || "");
        setFieldValue(`PersonalInsurance[${index}].policyNo`, entry.policyNo || "");
        setFieldValue(`PersonalInsurance[${index}].owner`, entry.owner || "");
        setFieldValue(`PersonalInsurance[${index}].startDate`, entry.startDate || "");
        setFieldValue(`PersonalInsurance[${index}].sumInsured`, entry.sumInsured || []);
        setFieldValue(`PersonalInsurance[${index}].sumInsuredSum`, entry.sumInsuredSum || "");
        setFieldValue(`PersonalInsurance[${index}].premiums`, entry.premiums || "");
        setFieldValue(`PersonalInsurance[${index}].premiumsDetails`, entry.premiumsDetails || []);
        setFieldValue(`PersonalInsurance[${index}].loadingExclusion`, entry.loadingExclusion || "");
        setFieldValue(`PersonalInsurance[${index}].loadingExclusionValue`, entry.loadingExclusionValue || "");
        setFieldValue(`PersonalInsurance[${index}].beneficiary`, entry.beneficiary || "");
        setFieldValue(`PersonalInsurance[${index}].beneficiariesArray`, entry.beneficiariesArray || []);
      });
    } else {
      // If no data found, clear form fields
      setFieldValue("NumberOfMap", "");
      setFieldValue("PersonalInsurance", []);
    }
  };


  const handleInput = (e, setFieldValue) => {
    const value = e.target.value > 10 ? 10 : e.target.value;
    setFieldValue("NumberOfMap", value);
    setFieldValue(
      "PersonalInsurance",
      Array(Number(value))
        .fill()
        .map(() => ({
          lifeInsured: "",
          provider: "",
          policyNo: "",
          owner: "",
          startDate: "",
          sumInsured: [],
          sumInsuredSum: "",
          premiums: "",
          premiumsDetails: [],
          loadingExclusion: "",
          loadingExclusionValue: "",
          beneficiary: "",
          beneficiariesArray: [],
        }))
    );
  };

  const handleInnerModal = (title, question, key, values, editArray, index, parentModal) => {
    setModalObject({
      title,
      question,
      key,
      values,
      editArray: editArray || [],
      index,
      parentModal: parentModal || "",
    });
    setFlagState(true);
  };

  const onSubmit = async (values) => {
    const newEntries = [];
    const loopLength = parseFloat(values.NumberOfMap) || 0;

    for (let i = 0; i < loopLength; i++) {
      const newEntry = {
        lifeInsured: values.PersonalInsurance[i]?.lifeInsured || "",
        provider: values.PersonalInsurance[i]?.provider || "",
        policyNo: values.PersonalInsurance[i]?.policyNo || "",
        owner: values.PersonalInsurance[i]?.owner || "",
        startDate: values.PersonalInsurance[i]?.startDate || "",
        sumInsured: values.PersonalInsurance[i]?.sumInsured || [],
        sumInsuredSum: values.PersonalInsurance[i]?.sumInsuredSum || "",
        premiums: values.PersonalInsurance[i]?.premiums || "",
        premiumsDetails: values.PersonalInsurance[i]?.premiumsDetails || [],
        loadingExclusion: values.PersonalInsurance[i]?.loadingExclusion || "",
        loadingExclusionValue: values.PersonalInsurance[i]?.loadingExclusionValue || "",
        beneficiary: values.PersonalInsurance[i]?.beneficiary || "",
        beneficiariesArray: values.PersonalInsurance[i]?.beneficiariesArray || [],
      };
      newEntries.push(newEntry);
    }

    const Obj = {
      PersonalInsurance: newEntries,
      numberOfPersonalInsurance: newEntries.length,
      clientFK: localStorage.getItem("UserID"),
    };

    const bankAccountArray = personalInsurance.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/personalInsurance/Add`, Obj);
      } else {
        res = await PatchAxios(`${DefaultUrl}/api/personalInsurance/Update`, Obj);
      }

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
      dataIndex: "index",
      key: "owner",
      render: (_, __, i) => i + 1,
      width: 60,
    },
    {
      title: "Life Insured",
      dataIndex: "lifeInsured",
      key: "lifeInsured",
      type: "select",
      placeholder: "Select Life Insured",
      options: [
        { value: RenderName("client"), label: RenderName("client") },
        ...(UserStatus !== "Single"
          ? [
            { value:  RenderName("partner"), label: RenderName("partner") },
            { value:`${RenderName("client")} & ${RenderName("partner")}`, label: `${RenderName("client")} & ${RenderName("partner")}` },
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
  dataIndex: "sumInsuredSum",
  key: "sumInsured",
  type: "number-toComma-Modal",
  placeholder: "Sum Insured",
  width: 200,
  callBack: true,
  func: (values, stakeHolder) => {
    const stake =
      typeof stakeHolder === "string"
        ? stakeHolder
        : stakeHolder?.stakeHolder || "";

    const index = stake.split("[")[1]?.split("]")[0] || 0;

    const lifeInsuredValue = values.PersonalInsurance[index]?.lifeInsured;
    const name =
      lifeInsuredValue === "client+partner"
        ? `${RenderName("client")} & ${RenderName("partner")}`
        : RenderName(lifeInsuredValue || "client");

    handleInnerModal(
      `${name}_Sum Insured`,
      `How many Policies do ${name} have :`,
      "sumInsured",
      values,
      values.PersonalInsurance[index]?.sumInsured || [],
      index
    );
  },
  Drawerheight: 220,
  DrawerWidth: "80%",
  PopoverContent: (
    innerModalTitle,
    values,
    all,
    stakeHolder,
    setFieldValue
  ) => {
    const stake =
      typeof stakeHolder === "string"
        ? stakeHolder
        : stakeHolder?.stakeHolder || "";

    const index = stake.split("[")[1]?.split("]")[0] || 0;

    const modalObject = {
      title: innerModalTitle,
      key: all.key,
      parentValues: values,
      parentKey: stake,
      index,
    };
    return (
      <div
        style={{
          height: "120px",
          margin: "-10px 0px 0px 0px",
        }}
      >
        <NewLoadingExclusion
          modalObject={modalObject}
          setFieldValue={setFieldValue}
          setFlagState={setFlagState}
          flagState={flagState}
        />
      </div>
    );
  },
},



    {
      title: "Premiums p.a",
      dataIndex: "premiums",
      key: "premiums",
      type: "number-toComma-Modal",
      placeholder: "Premiums p.a",
      width: 200,
      callBack: true,
      func: (values, stakeHolder) => {
        const index = stakeHolder.split("[")[1].split("]")[0];
        const name =
          values.PersonalInsurance[index]?.lifeInsured === "client+partner"
            ? `${RenderName("client")} & ${RenderName("partner")}`
            : RenderName(values.PersonalInsurance[index]?.lifeInsured || "client");
        handleInnerModal(
          `${name}_Premiums p.a`,
          "",
          "premiumsDetails",
          values,
          values.PersonalInsurance[index]?.premiumsDetails || [],
          index
        );
      },
    },
    {
      title: "Loading/Exclusion",
      dataIndex: "loadingExclusion",
      key: "loadingExclusion",
      type: "yesno",
      width: 170,
      // callBack: true,
      // func: (values, stakeHolder, setFieldValue) => {
      //   const index = stakeHolder.split("[")[1].split("]")[0];
      //   setFieldValue(`PersonalInsurance[${index}].loadingExclusionValue`, "");
      // },
    },
    {
      title: "Beneficiary",
      dataIndex: "beneficiary",
      key: "beneficiary",
      type: "yesnoModal",
      width: 200,
      callBack: true,
      func: (values, stakeHolder) => {
        const index = stakeHolder.split("[")[1].split("]")[0];
        const name =
          values.PersonalInsurance[index]?.lifeInsured === "client+partner"
            ? `${RenderName("client")} & ${RenderName("partner")}`
            : RenderName(values.PersonalInsurance[index]?.lifeInsured || "client");
        handleInnerModal(
          `${name}_Beneficiaries`,
          `How many beneficiaries do ${name} have :`,
          "beneficiariesArray",
          values,
          values.PersonalInsurance[index]?.beneficiariesArray || [],
          index,
          "ParentModal"
        );
      },
    },
  ];

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
              <InnerModal modalObject={modalObject} setFieldValue={setFieldValue} setFlagState={setFlagState} flagState={flagState}>
                {modalObject.key === "sumInsured" && (
                  <NewLoadingExclusion modalObject={modalObject} setFieldValue={setFieldValue} setFlagState={setFlagState} flagState={flagState} />
                )}
                {modalObject.key === "premiumsDetails" && (
                  <PremiumsDetails modalObject={modalObject} setFieldValue={setFieldValue} setFlagState={setFlagState} flagState={flagState} />
                )}
                {modalObject.key === "beneficiariesArray" && (
                  <Beneficiaries modalObject={modalObject} setFieldValue={setFieldValue} setFlagState={setFlagState} flagState={flagState} />
                )}
              </InnerModal>

              <div className="d-flex flex-row justify-content-center align-items-center gap-4">
                <p className="text-end mt-1 pt-2">
                  How many {props.modalObject.title} does {RenderName("client")}{" "}
                  {UserStatus === "Married" && `and ${RenderName("partner")}`} have :
                </p>
                <div style={{ minWidth: "10%" }}>
                  <select
                    id="NumberOfMap"
                    name="NumberOfMap"
                    className="form-select inputDesignDoubleInput"
                    onChange={(e) => handleInput(e, setFieldValue)}
                    value={values.NumberOfMap}
                  >
                    <option value="">Select</option>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
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
