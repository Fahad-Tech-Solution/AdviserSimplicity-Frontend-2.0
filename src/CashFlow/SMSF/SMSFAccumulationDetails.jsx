import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { Row } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  CashFlowData,
  CashFlowScenarioData,
  defaultUrl,
  QuestionDetail,
} from "../../Store/Store";

import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
  toCommaAndDollar,
  toPercentage,
} from "../../Components/Assets/Api/Api";

import { AntdCreatableMultiSelect } from "../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";
import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";

import ConcessionalContributions from "../Financial Investments/ConcessionalContributions";
import NonConcessionalContributions from "../Financial Investments/NonConcessionalContributions";
import Withdrawals from "../Financial Investments/Withdrawals";
import CFSMSFAccumulationDetails from "./CFSMSFAccumulationDetails";
import CFSMSFInsurancePremiums from "./CFSMSFInsurancePremiums";

const AntdTable = DynamicTableForInputsSection("antd");

const SMSFAccumulationDetails = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);
  const DefaultUrl = useRecoilValue(defaultUrl);

  const [UserStatus] = useState(localStorage.getItem("UserStatus"));
  const objKey = props.modalObject.key;

  /* ---------------- Modal State ---------------- */
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  /* ---------------- Initial Values ---------------- */
  const initialValues = {
    owner: [],
  };

  /* ---------------- Helper Functions ---------------- */
  const GetValue = (valueOf) => {
    try {
      const SMSFAccumulationDetailsClientTotal = questionDetail
        ?.SMSFAccumulationDetails?.clientTotal
        ? parseFloat(
            questionDetail.SMSFAccumulationDetails.clientTotal.replace(
              /[^0-9.-]+/g,
              ""
            )
          )
        : 0;

      const SMSFAccumulationDetailsPartnerTotal = questionDetail
        ?.SMSFAccumulationDetails?.partnerTotal
        ? parseFloat(
            questionDetail.SMSFAccumulationDetails.partnerTotal.replace(
              /[^0-9.-]+/g,
              ""
            )
          )
        : 0;

      const SMSFAccumulationDetailsJointTotal = questionDetail
        ?.SMSFAccumulationDetails?.jointTotal
        ? parseFloat(
            questionDetail.SMSFAccumulationDetails.jointTotal.replace(
              /[^0-9.-]+/g,
              ""
            )
          )
        : 0;

      const SMSFPensionPhaseClientTotal = questionDetail?.SMSFPensionPhase
        ?.clientTotal
        ? parseFloat(
            questionDetail.SMSFPensionPhase.clientTotal.replace(
              /[^0-9.-]+/g,
              ""
            )
          )
        : 0;

      const SMSFPensionPhasePartnerTotal = questionDetail?.SMSFPensionPhase
        ?.partnerTotal
        ? parseFloat(
            questionDetail.SMSFPensionPhase.partnerTotal.replace(
              /[^0-9.-]+/g,
              ""
            )
          )
        : 0;

      const SMSFPensionPhaseJointTotal = questionDetail?.SMSFPensionPhase
        ?.jointTotal
        ? parseFloat(
            questionDetail.SMSFPensionPhase.jointTotal.replace(/[^0-9.-]+/g, "")
          )
        : 0;

      if (valueOf === "client") {
        const total =
          (SMSFAccumulationDetailsClientTotal + SMSFPensionPhaseClientTotal) /
          (SMSFAccumulationDetailsClientTotal +
            SMSFAccumulationDetailsPartnerTotal +
            SMSFAccumulationDetailsJointTotal +
            SMSFPensionPhaseClientTotal +
            SMSFPensionPhasePartnerTotal +
            SMSFPensionPhaseJointTotal);

        return toPercentage(isNaN(total) ? 0 : total);
      } else if (valueOf === "partner") {
        const total =
          (SMSFAccumulationDetailsPartnerTotal + SMSFPensionPhasePartnerTotal) /
          (SMSFAccumulationDetailsClientTotal +
            SMSFAccumulationDetailsPartnerTotal +
            SMSFAccumulationDetailsJointTotal +
            SMSFPensionPhaseClientTotal +
            SMSFPensionPhasePartnerTotal +
            SMSFPensionPhaseJointTotal);

        return toPercentage(isNaN(total) ? 0 : total);
      } else if (valueOf === "joint") {
        const total =
          (SMSFAccumulationDetailsJointTotal + SMSFPensionPhaseJointTotal) /
          (SMSFAccumulationDetailsClientTotal +
            SMSFAccumulationDetailsPartnerTotal +
            SMSFAccumulationDetailsJointTotal +
            SMSFPensionPhaseClientTotal +
            SMSFPensionPhasePartnerTotal +
            SMSFPensionPhaseJointTotal);

        return toPercentage(isNaN(total) ? 0 : total);
      }
    } catch (error) {
      console.error("Error calculating SMSF totals:", error);
      return "$0";
    }
  };

  /* ---------------- Fill Initial Values ---------------- */
  const fillInitialValues = (setFieldValue) => {
    const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));
    const SMSFAccumulationDetails =
      Object.keys(questionDetail.SMSFAccumulationDetails || {}).length > 0
        ? questionDetail.SMSFAccumulationDetails
        : { client: [], partner: [], joint: [] };

    const data = CashFlowScenarioDataObj?.[objKey] || cashFlowData?.[objKey];

    if (scenarioObj?.selectedSource === "discoveryForm") {
      setFieldValue("owner", SMSFAccumulationDetails.member || []);

      const updateFieldsFromDiscovery = (stake, totalField) => {
        if (SMSFAccumulationDetails?.[stake]?.length > 0) {
          setFieldValue(
            `${stake}.accumulationDetailsObj.percentageOfFundForMember`,
            GetValue(stake) || ""
          );
          setFieldValue(
            `${stake}.accumulationDetailsObj.taxFreeComponent`,
            SMSFAccumulationDetails[totalField] || ""
          );
          setFieldValue(`${stake}.accumulationDetails`, "No");
          setFieldValue(`${stake}.insurancePremiums`, "No");
          setFieldValue(`${stake}.concessionalContributions`, "No");
          setFieldValue(`${stake}.nonConcessionalContributions`, "No");
          setFieldValue(`${stake}.withdrawals`, "No");
        }
      };

      updateFieldsFromDiscovery("client", "clientTotal");

      if (UserStatus === "Married") {
        updateFieldsFromDiscovery("partner", "partnerTotal");
      }
    } else if (data && Object.keys(data).length > 0) {
      setFieldValue("owner", data.owner || []);

      const updateFieldsFromCashFlow = (stake) => {
        if (data.owner?.includes(stake) && data[stake]) {
          const fields = [
            "accumulationDetails",
            "accumulationDetailsObj",
            "insurancePremiums",
            "insurancePremiumsObj",
            "concessionalContributions",
            "concessionalContributionsObj",
            "nonConcessionalContributions",
            "nonConcessionalContributionsObj",
            "withdrawals",
            "withdrawalsObj",
          ];

          fields.forEach((field) => {
            if (data[stake][field] !== undefined) {
              setFieldValue(`${stake}.${field}`, data[stake][field]);
            }
          });
        }
      };

      updateFieldsFromCashFlow("client");
      if (UserStatus === "Married") {
        updateFieldsFromCashFlow("partner");
      }
    }
  };

  /* ---------------- Submit ---------------- */
  const onSubmit = async (values) => {
    const obj = {
      ...values,
      scenarioFK: JSON.parse(localStorage.getItem("ScenarioObj"))._id,
    };

    if (values.owner.includes("client")) {
      obj.clientTotal =
        values.client?.accumulationDetailsObj?.taxFreeComponent || "";
    } else {
      obj.clientTotal = "";
    }

    if (values.owner.includes("partner")) {
      obj.partnerTotal =
        values.partner?.accumulationDetailsObj?.taxFreeComponent || "";
    } else {
      obj.partnerTotal = "";
    }

    try {
      const exists = cashFlowData?.[objKey]?._id;
      const res = exists
        ? await PatchAxios(`${DefaultUrl}/api/CF/${objKey}/Update`, obj)
        : await PostAxios(`${DefaultUrl}/api/CF/${objKey}/Add`, obj);

      if (res) {
        setCashFlowData({
          ...cashFlowData,
          [objKey]: res,
        });
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success",
        `Data of "${props.modalObject.title}" is saved`
      );

      props.setFlagState?.(false);
      props?.setIsEditing?.(false);
    } catch (err) {
      console.error(err);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error",
        `Data of "${props.modalObject.title}" not saved`
      );
    }
  };

  /* ---------------- Inner Modal ---------------- */
  const handleInnerModal = (title, values, key, stakeHolder) => {
    setModalObject({
      title,
      values,
      key,
      stakeHolder,
      sourceObj: props.modalObject,
      cal: title === "Accumulation Details",
    });
    setFlagState(true);
  };

  /* ---------------- Component Mapping ---------------- */
  const componentMapping = {
    "Accumulation Details": <CFSMSFAccumulationDetails />,
    "Insurance Premiums": <CFSMSFInsurancePremiums />,
    "Concessional Contributions": <ConcessionalContributions />,
    "Non Concessional Contributions": <NonConcessionalContributions />,
    Withdrawals: <Withdrawals />,
  };

  /* ---------------- Table Columns ---------------- */
  const columns = [
    { title: "Owner", dataIndex: "owner", type: "label", justText: true },
    {
      title: "Accumulation Details and Components",
      dataIndex: "accumulationDetails",
      type: "yesnoModal",
      innerModalTitle: "Accumulation Details",
      key: "accumulationDetails",
      callBack: true,
      func: handleInnerModal,
    },
    {
      title: "Insurance Premiums",
      dataIndex: "insurancePremiums",
      type: "yesnoModal",
      innerModalTitle: "Insurance Premiums",
      key: "insurancePremiums",
      callBack: true,
      func: handleInnerModal,
    },
    {
      title: "Concessional Contributions",
      dataIndex: "concessionalContributions",
      type: "yesnoModal",
      innerModalTitle: "Concessional Contributions",
      key: "concessionalContributions",
      callBack: true,
      func: handleInnerModal,
    },
    {
      title: "Non Concessional Contributions",
      dataIndex: "nonConcessionalContributions",
      type: "yesnoModal",
      innerModalTitle: "Non Concessional Contributions",
      key: "nonConcessionalContributions",
      callBack: true,
      func: handleInnerModal,
    },
    {
      title: "Withdrawals",
      dataIndex: "withdrawals",
      type: "yesnoModal",
      innerModalTitle: "Withdrawals",
      key: "withdrawals",
      callBack: true,
      func: handleInnerModal,
    },
  ];

  /* ---------------- Owner Options ---------------- */
  const options =
    UserStatus !== "Single"
      ? [
          { value: "client", label: RenderName("client") },
          { value: "partner", label: RenderName("partner") },
        ]
      : [{ value: "client", label: RenderName("client") }];

  /* ---------------- Render ---------------- */
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

        const rows = useMemo(() => {
          const rowsArray = [];

          if (values.owner?.includes("client") && values.client)
            rowsArray.push({
              key: "client",
              owner: RenderName("client"),
              stakeHolder: "client",
              ...values.client,
            });

          if (
            values.owner?.includes("partner") &&
            UserStatus === "Married" &&
            values.partner
          )
            rowsArray.push({
              key: "partner",
              owner: RenderName("partner"),
              stakeHolder: "partner",
              ...values.partner,
            });

          return rowsArray;
        }, [values, UserStatus]);

        return (
          <Form>
            <Row>
              <InnerModal
                modalObject={modalObject}
                setFieldValue={setFieldValue}
                setFlagState={setFlagState}
                flagState={flagState}
              >
                {componentMapping[modalObject.title]}
              </InnerModal>

              <div className="col-md-12">
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <label
                    className="mb-0"
                    onClick={() => {
                      console.log(values);
                    }}
                  >
                    Owner
                  </label>
                  <div style={{ minWidth: 220 }}>
                    <Field
                      name="owner"
                      component={AntdCreatableMultiSelect}
                      options={options}
                    />
                  </div>
                </div>
              </div>

              {values?.owner?.length > 0 && (
                <div className="mt-4 All_Client reportSection">
                  <AntdTable
                    columns={columns}
                    data={rows}
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
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SMSFAccumulationDetails;
