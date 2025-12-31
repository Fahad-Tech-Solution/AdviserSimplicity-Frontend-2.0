import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  CashFlowData,
  CashFlowScenarioData,
  defaultUrl,
  QuestionDetail,
} from "../../../Store/Store";

import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
} from "../../../Components/Assets/Api/Api";

import { AntdCreatableMultiSelect } from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableForInputsSection from "../../../Components/Assets/Table/DynamicTableForInputsSection";

import InnerModal from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import ReducedSalaryIncome from "./ReducedSalaryIncome";
import SalaryPackagingCar from "./SalaryPackagingCar";
import SalaryPackagingOther from "./SalaryPackagingOther";

const AntDTableHOC = DynamicTableForInputsSection("antd");

const CashFlowEmploymentIncome = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);
  const DefaultUrl = useRecoilValue(defaultUrl);

  const [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");
  const [UserStatus] = useState(localStorage.getItem("UserStatus"));

  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  const incomeFromOwnBusiness = questionDetail?.incomeFromOwnBusiness?._id
    ? questionDetail.incomeFromOwnBusiness
    : {};

  /* -------------------- INITIAL VALUES -------------------- */
  const initialValues = {
    owner: [],
    client: {
      reducedSalaryIncomeModal: {},
      salaryPackingCarModal: {},
      salaryPackingOtherModal: {},
    },
    partner: {
      reducedSalaryIncomeModal: {},
      salaryPackingCarModal: {},
      salaryPackingOtherModal: {},
    },
  };

  /* -------------------- PREFILL -------------------- */
  const fillInitialValues = (setFieldValue) => {
    try {
      const key = props.modalObject.key;
      setObjAndAPIKey(key);

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));
      const retirementData = cashFlowData?.cf_personalDetails;
      const savedData = cashFlowData?.[key];

      const mapFields = (data, prefix) => {
        if (!data) return;

        setFieldValue(
          `${prefix}.salaryIncome`,
          data.salaryIncome || data?.SalaryPackageModal?.grossSalary || "$0"
        );

        setFieldValue(`${prefix}.includeFromYear`, data.includeFromYear || 1);
        setFieldValue(
          `${prefix}.upUntilYear`,
          data.upUntilYear ||
            retirementData?.[prefix]?.plannedRetirementAge ||
            ""
        );
        setFieldValue(`${prefix}.indexation`, data.indexation || "2.50%");

        setFieldValue(
          `${prefix}.reducedSalaryIncomeRadio`,
          data.reducedSalaryIncomeRadio || ""
        );
        setFieldValue(
          `${prefix}.reducedSalaryIncomeModal`,
          data.reducedSalaryIncomeModal || {}
        );

        setFieldValue(
          `${prefix}.salaryPackingCarRadio`,
          data.salaryPackingCarRadio || ""
        );
        setFieldValue(
          `${prefix}.salaryPackingCarModal`,
          data.salaryPackingCarModal ||
            (data?.SalaryPackagingModal
              ? {
                  employerFBTStatus:
                    data?.SalaryPackagingModal?.employerFBTStatus || "",
                  costBaseOfCar:
                    data?.SalaryPackagingModal?.costBaseOfCar || "",
                  FBTPaidByEmployer:
                    data?.SalaryPackagingModal?.FBTPaidByEmployer || "",
                  upUntilYear:
                    retirementData?.[prefix]?.plannedRetirementAge || "",
                }
              : {})
        );

        setFieldValue(
          `${prefix}.salaryPackingOtherRadio`,
          data.salaryPackingOtherRadio || ""
        );
        setFieldValue(
          `${prefix}.salaryPackingOtherModal`,
          data.salaryPackingOtherModal || {
            upUntilYear: retirementData?.[prefix]?.plannedRetirementAge || "",
          }
        );
      };

      /* 1️⃣ Discovery */
      if (
        scenarioObj?.selectedSource === "discoveryForm" &&
        incomeFromOwnBusiness?._id &&
        !savedData?._id
      ) {
        setFieldValue("owner", incomeFromOwnBusiness.owner || []);

        if (incomeFromOwnBusiness.owner.includes("client")) {
          mapFields(incomeFromOwnBusiness.client, "client");
        }

        if (
          incomeFromOwnBusiness.owner.includes("partner") &&
          UserStatus === "Married"
        ) {
          mapFields(incomeFromOwnBusiness.partner, "partner");
        }

        // return;
      }

      /* 2️⃣ Scenario */
      const scenarioData = CashFlowScenarioDataObj?.[key];
      if (scenarioData) {
        setFieldValue("owner", scenarioData.owner || []);

        if (scenarioData.owner.includes("client")) {
          mapFields(scenarioData.client, "client");
        }

        if (
          scenarioData.owner.includes("partner") &&
          UserStatus === "Married"
        ) {
          mapFields(scenarioData.partner, "partner");
        }
      }

      /* 3️⃣ Saved */

      if (savedData?._id) {
        setFieldValue("owner", savedData.owner || []);

        if (savedData.owner.includes("client")) {
          mapFields(savedData.client, "client");
        }

        if (savedData.owner.includes("partner") && UserStatus === "Married") {
          mapFields(savedData.partner, "partner");
        }
      }
    } catch (err) {
      console.error("fillInitialValues error:", err);
    }
  };

  /* -------------------- SUBMIT -------------------- */
  const onSubmit = async (values) => {
    const obj = {
      ...values,
      scenarioFK: JSON.parse(localStorage.getItem("ScenarioObj"))._id,
      clientTotal: values.owner.includes("client")
        ? values.client.salaryIncome || "$0"
        : "",
      partnerTotal: values.owner.includes("partner")
        ? values.partner.salaryIncome || "$0"
        : "",
    };

    try {
      const exists = cashFlowData?.[objAndAPIKey]?._id;
      const res = exists
        ? await PatchAxios(`${DefaultUrl}/api/CF/${objAndAPIKey}/Update`, obj)
        : await PostAxios(`${DefaultUrl}/api/CF/${objAndAPIKey}/Add`, obj);

      if (res) {
        setCashFlowData({ ...cashFlowData, [objAndAPIKey]: res });
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success",
        `"${props.modalObject.title}" saved`
      );

      props.setFlagState?.(false);
      props.setIsEditing?.(false);
    } catch {
      openNotificationSuccess(
        "error",
        "topRight",
        "Error",
        `"${props.modalObject.title}" not saved`
      );
    }
  };

  /* -------------------- MODALS -------------------- */
  const OpenModal = (title, values, key, stakeHolder) => {
    setModalObject({ title, values, key, stakeHolder });
    setFlagState(true);
  };

  const componentMapping = {
    "Reduced Salary Income": <ReducedSalaryIncome />,
    "Salary Packaging Car": <SalaryPackagingCar />,
    "Salary Packaging (Other)": <SalaryPackagingOther />,
  };

  const ModalContent = (obj) => componentMapping[obj?.title] || null;

  /* -------------------- OPTIONS -------------------- */
  const ownerOptions =
    UserStatus !== "Single"
      ? [
          { value: "client", label: RenderName("client") },
          { value: "partner", label: RenderName("partner") },
        ]
      : [{ value: "client", label: RenderName("client") }];

  const yearOptions = Array.from({ length: 31 }, (_, i) => ({
    value: i,
    label: `Year ${i}`,
  }));

  const indexationOptions = Array.from({ length: 21 }, (_, i) => ({
    value: `${(i * 0.5).toFixed(2)}%`,
    label: `${(i * 0.5).toFixed(2)}%`,
  }));

  /* -------------------- COLUMNS -------------------- */
  const columns = [
    { title: "Owner", dataIndex: "owner", width: 150, justText: true },
    {
      title: "Salary Income",
      dataIndex: "salaryIncome",
      type: "number-toComma",
      width: 200,
    },
    {
      title: "Include From Year",
      dataIndex: "includeFromYear",
      type: "select",
      options: yearOptions,
    },
    {
      title: "Up Until Year",
      dataIndex: "upUntilYear",
      type: "select",
      options: yearOptions,
    },
    {
      title: "Indexation",
      dataIndex: "indexation",
      type: "select",
      options: indexationOptions,
    },
    {
      title: "Reduced Salary Income",
      dataIndex: "reducedSalaryIncomeRadio",
      type: "yesnoModal",
      callBack: true,
      func: OpenModal,
      innerModalTitle: "Reduced Salary Income",
      key: "reducedSalaryIncomeModal",
    },
    {
      title: "Salary Packaging Car",
      dataIndex: "salaryPackingCarRadio",
      type: "yesnoModal",
      callBack: true,
      func: OpenModal,
      innerModalTitle: "Salary Packaging Car",
      key: "salaryPackingCarModal",
    },
    {
      title: "Salary Packaging (Other)",
      dataIndex: "salaryPackingOtherRadio",
      type: "yesnoModal",
      callBack: true,
      func: OpenModal,
      innerModalTitle: "Salary Packaging (Other)",
      key: "salaryPackingOtherModal",
    },
  ];

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
        }, []);

        const tableData = useMemo(() => {
          const rows = [];

          if (values.owner.includes("client")) {
            rows.push({
              key: "client",
              stakeHolder: "client",
              owner: RenderName("client"),
              ...values.client,
            });
          }

          if (values.owner.includes("partner") && UserStatus === "Married") {
            rows.push({
              key: "partner",
              stakeHolder: "partner",
              owner: RenderName("partner"),
              ...values.partner,
            });
          }

          return rows;
        }, [values, UserStatus]);

        return (
          <Form>
            <InnerModal
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              flagState={flagState}
              setFlagState={setFlagState}
            >
              {ModalContent(modalObject)}
            </InnerModal>

            <div className="row">
              <div className=" d-flex justify-content-center align-items-center gap-4">
                <label
                  onClick={() => {
                    console.log(values);
                  }}
                >
                  Owner
                </label>
                <div style={{ minWidth: 250 }}>
                  <Field
                    name="owner"
                    component={AntdCreatableMultiSelect}
                    options={ownerOptions}
                  />
                </div>
              </div>

              {values.owner.length > 0 && (
                <div className="col-md-12 mt-4 All_Client reportSection">
                  <AntDTableHOC
                    columns={columns}
                    data={tableData}
                    values={values}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleSubmit={props?.handleOk}
                    isEditing={props?.isEditing}
                    setIsEditing={props?.setIsEditing}
                  />
                </div>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CashFlowEmploymentIncome;
