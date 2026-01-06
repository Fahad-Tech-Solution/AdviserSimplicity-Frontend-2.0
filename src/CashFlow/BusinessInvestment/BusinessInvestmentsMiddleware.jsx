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
} from "../../Components/Assets/Api/Api";
import { AntdCreatableMultiSelect } from "../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";
import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import DividendIncome from "./DividendIncome";
import AssetValueOfCompany from "./AssetValueOfCompany";

const AntdTable = DynamicTableForInputsSection("antd");

const BusinessInvestmentsMiddleware = (props) => {
  /*
       This component is a dynamic and reusable modal component designed to handle the following modal types:
       1. "Dividend Income"
       2. "Business as Trusts"
       3. "Bucket Company"
   
       TODO-IMPORTANT:
       - Ensure any changes to this component are planned carefully to avoid unintended effects on all supported modals.
       - If specific modifications are required for one modal type, consider implementing targeted logic or extensions 
         to maintain the integrity of the shared functionality.
   */

  const questionDetail = useRecoilValue(QuestionDetail);
  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);
  const DefaultUrl = useRecoilValue(defaultUrl);

  const [UserStatus] = useState(localStorage.getItem("UserStatus"));
  const [objKey, setObjKey] = useState(props.modalObject.key || "");

  /* ---------------- Modal State ---------------- */
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  /* ---------------- Layout Configuration ---------------- */
  const layoutSwitchFlag = props.modalObject.title;

  /* ---------------- Initial Values ---------------- */
  const initialValues = {
    owner: [],
    client: {},
    partner: {},
  };

  /* ---------------- Bank Account Finance Data ---------------- */
  const BankAccountFinance = useMemo(() => {
    return Object.keys(questionDetail.BusinessAsCompanyStructure || {}).length > 0
      ? questionDetail.BusinessAsCompanyStructure
      : { client: [], partner: [], joint: [] };
  }, [questionDetail.BusinessAsCompanyStructure]);

  /* ---------------- Fill Initial Values ---------------- */
  const fillInitialValues = (setFieldValue) => {
    try {
      setObjKey(props.modalObject.key);

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      // Helper function to update field values
      const updateFields = (data, prefix) => {
        if (!data || !Object.keys(data).length) return;

        let fields = {};

        if (layoutSwitchFlag === "Dividend Income") {
          fields = {
            dividendIncome: data.dividendIncome || "$0",
            dividendIncomeObj: data.dividendIncomeObj || {},
            assetValueOfCompany: data.assetValueOfCompany || "$0",
            assetValueOfCompanyObj: data.assetValueOfCompanyObj || {},
          };
        }

        if (layoutSwitchFlag === "Business as Trusts") {
          fields = {
            netTrustDistribution: data.netTrustDistribution || "$0",
             netTrustDistributionObj: data.netTrustDistributionObj || {},
            assetValueOfBusinessTrust: data.assetValueOfBusinessTrust || "$0",
            assetValueOfBusinessTrustObj: data.assetValueOfBusinessTrustObj || {},

          };
        }

        if (layoutSwitchFlag === "Bucket Company") {
          fields = {
            netTrustDistribution: data.netTrustDistribution || "$0",
            netTrustDistributionObj: data.netTrustDistributionObj || {},
            dividendIncome: data.dividendIncome || "$0",
            dividendIncomeObj: data.dividendIncomeObj || {},
          };
        }

        Object.entries(fields).forEach(([key, value]) => {
          setFieldValue(`${prefix}.${key}`, value);
        });
      };

      // Check for discovery form data
      if (scenarioObj?.selectedSource === "discoveryForm" && BankAccountFinance && BankAccountFinance._id && !cashFlowData?.[objKey]?._id) {
        if (BankAccountFinance?.client?.length > 0) {
          const Obj = {
            dividendIncome: BankAccountFinance.client[0].dividendReceived,
            assetValueOfCompany: BankAccountFinance.client[0].equityPosition,
            netTrustDistribution: toCommaAndDollar(
              BankAccountFinance.client[0].equityPositionArray?.[0]?.distributionReceived || 0
            ),
            assetValueOfBusinessTrust:
              BankAccountFinance.client[0].equityPositionArray?.[0]?.businessValuation || "$0",
          };
          updateFields(Obj, "client");
          setFieldValue("owner", ["client"]);
        }

        if (UserStatus === "Married" && BankAccountFinance?.partner?.length > 0) {
          const partnerData = BankAccountFinance.partner[0];
          const partnerEquityPosition = partnerData.equityPositionArray?.[0] || {};

          const Obj = {
            dividendIncome: partnerData.dividendReceived || "$0",
            assetValueOfCompany: partnerData.equityPosition || "$0",
            netTrustDistribution: toCommaAndDollar(
              partnerEquityPosition.distributionReceived || 0
            ),
            assetValueOfBusinessTrust: partnerEquityPosition.businessValuation || "$0",
          };
          updateFields(Obj, "partner");
          setFieldValue("owner", ["client", "partner"]);
        }
      } else {
        // Handle cash flow scenario data
        const cashFlowDetails = CashFlowScenarioDataObj?.[objKey];
        if (cashFlowDetails) {
          setFieldValue("owner", cashFlowDetails.owner || []);
          if (cashFlowDetails.owner?.includes("client") && cashFlowDetails.client) {
            updateFields(cashFlowDetails.client, "client");
          }
          if (UserStatus === "Married" && cashFlowDetails.owner?.includes("partner") && cashFlowDetails.partner) {
            updateFields(cashFlowDetails.partner, "partner");
          }
        }

        // Handle cash flow data
        if (cashFlowData?.[objKey]?._id) {
          const cashFlowDataDetails = cashFlowData[objKey];
          setFieldValue("owner", cashFlowDataDetails.owner || []);

          if (cashFlowDataDetails.owner?.includes("client") && cashFlowDataDetails.client) {
            updateFields(cashFlowDataDetails.client, "client");
          }

          if (UserStatus === "Married" && cashFlowDataDetails.owner?.includes("partner") && cashFlowDataDetails.partner) {
            updateFields(cashFlowDataDetails.partner, "partner");
          }
        }
      }
    } catch (error) {
      console.error("Error in fillInitialValues:", error);
    }
  };

  /* ---------------- Submit ---------------- */
  const onSubmit = async (values) => {
    const obj = {
      ...values,
      scenarioFK: JSON.parse(localStorage.getItem("ScenarioObj"))._id,
    };

    // Calculate totals
    if (values.owner.includes("client") && values.client) {
      const clientValue = Object.values(values.client)[0] || "$0";
      obj.clientTotal = typeof clientValue === 'string' ? clientValue : toCommaAndDollar(clientValue);
    } else {
      obj.clientTotal = "";
    }

    if (values.owner.includes("partner") && values.partner) {
      const partnerValue = Object.values(values.partner)[0] || "$0";
      obj.partnerTotal = typeof partnerValue === 'string' ? partnerValue : toCommaAndDollar(partnerValue);
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
      sourceObj: props.modalObject
    });
    setFlagState(true);
  };

  const componentMapping = {
    "Dividend Income": <DividendIncome />,
    "Asset Value of Company": <AssetValueOfCompany />,
    "Net Trust Distribution": <AssetValueOfCompany />,
    "Asset Value of Business Trust": <AssetValueOfCompany />,
  };

  /* ---------------- Table Columns ---------------- */
  const getColumns = () => {
    const baseColumns = [
      { title: "Owner", dataIndex: "owner", type: "label", justText: true },
    ];

    if (layoutSwitchFlag === "Dividend Income") {
      baseColumns.push(
        {
          title: "Dividend Income",
          dataIndex: "dividendIncome",
          type: "number-toComma-Modal",
          innerModalTitle: "Dividend Income",
          key: "dividendIncome",
          func: handleInnerModal,
        },
        {
          title: "Asset Value of Company",
          dataIndex: "assetValueOfCompany",
          type: "number-toComma-Modal",
          innerModalTitle: "Asset Value of Company",
          key: "assetValueOfCompany",
          func: handleInnerModal,
        }
      );
    }

    if (layoutSwitchFlag === "Business as Trusts") {
      baseColumns.push(
        {
          title: "Net Trust Distribution",
          dataIndex: "netTrustDistribution",
          type: "number-toComma-Modal",
          innerModalTitle: "Net Trust Distribution",
          key: "netTrustDistribution",
          func: handleInnerModal,
        },
        {
          title: "Asset Value of Business Trust",
          dataIndex: "assetValueOfBusinessTrust",
          type: "number-toComma-Modal",
          innerModalTitle: "Asset Value of Business Trust",
          key: "assetValueOfBusinessTrust",
          func: handleInnerModal,
        }
      );
    }

    if (layoutSwitchFlag === "Bucket Company") {
      baseColumns.push(
        {
          title: "Net Trust Distribution",
          dataIndex: "netTrustDistribution",
          type: "number-toComma-Modal",
          innerModalTitle: "Net Trust Distribution",
          key: "netTrustDistribution",
          func: handleInnerModal,
        },
        {
          title: "Dividend Income",
          dataIndex: "dividendIncome",
          type: "number-toComma-Modal",
          innerModalTitle: "Dividend Income",
          key: "dividendIncome",
          func: handleInnerModal,
        }
      );
    }

    return baseColumns;
  };

  const columns = getColumns();

  /* ---------------- Owner Options ---------------- */
  const options = useMemo(() => {
    if (UserStatus !== "Single") {
      return [
        { value: "client", label: RenderName("client") },
        { value: "partner", label: RenderName("partner") },
      ];
    }
    return [{ value: "client", label: RenderName("client") }];
  }, [UserStatus]);

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

          if (values.owner?.includes("client") && values.client) {
            rowsArray.push({
              key: "client",
              owner: RenderName("client"),
              stakeHolder: "client",
              ...values.client,
            });
          }

          if (values.owner?.includes("partner") && UserStatus === "Married" && values.partner) {
            rowsArray.push({
              key: "partner",
              owner: RenderName("partner"),
              stakeHolder: "partner",
              ...values.partner,
            });
          }

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
                  <label className="mb-0" onClick={() => console.log(values)}>Owner</label>
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

export default BusinessInvestmentsMiddleware;