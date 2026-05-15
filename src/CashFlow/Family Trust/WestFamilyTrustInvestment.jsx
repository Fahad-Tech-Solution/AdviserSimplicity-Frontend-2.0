import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { Row } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  CashFlowData,
  CashFlowDownloading,
  CashFlowReCalculateLoading,
  CashFlowScenarioData,
  defaultUrl,
  QuestionDetail,
} from "../../Store/Store";

import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  PostAxiosBlob,
  RenderName,
  toCommaAndDollar,
  toPercentage,
} from "../../Components/Assets/Api/Api";

import { AntdCreatableMultiSelect } from "../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const WestFamilyTrustInvestment = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);
  const DefaultUrl = useRecoilValue(defaultUrl);

  const [, setCashFlowReCalculateLoading] = useRecoilState(
    CashFlowReCalculateLoading
  );
  const [, setCashFlowDownloading] = useRecoilState(CashFlowDownloading);

  const [UserStatus] = useState(localStorage.getItem("UserStatus"));
  const objKey = props.modalObject.key;

  /* ---------------- Initial Values ---------------- */
  const initialValues = {
    owner: [],
    client: {
      percentOfBeneficiaryAccounts: "",
      totalOfBeneficiaryAccounts: "$0",
      distributionOfIncomeCGT: "",
      distributionTakenAsCash: "No",
      distributionTakenAsCashFromYear: "No",
    },
    partner: {
      percentOfBeneficiaryAccounts: "",
      totalOfBeneficiaryAccounts: "$0",
      distributionOfIncomeCGT: "",
      distributionTakenAsCash: "No",
      distributionTakenAsCashFromYear: "No",
    },
  };

  /* ---------------- Fill Initial Values ---------------- */
  const fillInitialValues = (setFieldValue) => {
    const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));
    const data = CashFlowScenarioDataObj?.[objKey] || cashFlowData?.[objKey];

    const updateFields = (dataObj, stake) => {
      if (!dataObj || Object.keys(dataObj).length === 0) return;

      const fields = {
        percentOfBeneficiaryAccounts:
          dataObj.percentOfBeneficiaryAccounts || "",
        totalOfBeneficiaryAccounts: dataObj.totalOfBeneficiaryAccounts || "",
        distributionOfIncomeCGT: dataObj.distributionOfIncomeCGT || "",
        distributionTakenAsCash: dataObj.distributionTakenAsCash || "No",
        distributionTakenAsCashFromYear:
          dataObj.distributionTakenAsCashFromYear || "No",
      };

      Object.entries(fields).forEach(([key, value]) => {
        setFieldValue(`${stake}.${key}`, value);
      });
    };

    if (
      scenarioObj?.selectedSource === "discoveryForm" &&
      questionDetail?._id
    ) {
      if (questionDetail?.client?.length > 0) {
        const clientObj = {
          totalOfBeneficiaryAccounts:
            questionDetail.clienttotalOfBeneficiaryAccounts || "",
        };
        updateFields(clientObj, "client");
      }

      if (UserStatus === "Married" && questionDetail?.partner?.length > 0) {
        const partnerObj = {
          totalOfBeneficiaryAccounts:
            questionDetail.partnertotalOfBeneficiaryAccounts || "",
        };
        updateFields(partnerObj, "partner");
      }

      // Set owner based on data availability
      const owners = [];
      if (questionDetail?.client?.length > 0) owners.push("client");
      if (UserStatus === "Married" && questionDetail?.partner?.length > 0)
        owners.push("partner");
      setFieldValue("owner", owners);
    } else if (data && Object.keys(data).length > 0) {
      setFieldValue("owner", data.owner || []);

      if (data.owner?.includes("client") && data.client) {
        updateFields(data.client, "client");
      }

      if (
        UserStatus === "Married" &&
        data.owner?.includes("partner") &&
        data.partner
      ) {
        updateFields(data.partner, "partner");
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
      obj.clientTotal = values.client.percentOfBeneficiaryAccounts || "";
    } else {
      obj.clientTotal = "";
    }

    if (values.owner.includes("partner")) {
      obj.partnerTotal = values.partner.percentOfBeneficiaryAccounts || "";
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

  /* ---------------- Helper Functions ---------------- */
  const handleChildButtonClick = async (values, setFieldValue) => {
    try {
      setCashFlowReCalculateLoading(true);
      const obj = JSON.parse(JSON.stringify(cashFlowData));
      obj[objKey] = values;

      const res = await PostAxios(
        `${DefaultUrl}/api/cal/investmentsTrust/INPUTS_TRUST_Investments`,
        obj
      );

      if (res) {
        const Data = res.data[objKey];

        if (values.owner.includes("client")) {
          setFieldValue(
            "client.totalOfBeneficiaryAccounts",
            Data.totalOfBeneficiaryAccounts || ""
          );
        }

        if (values.owner.includes("partner")) {
          setFieldValue(
            "partner.totalOfBeneficiaryAccounts",
            Data.totalOfBeneficiaryAccountsPartner || ""
          );
        }

        if (values.client?.percentOfBeneficiaryAccounts) {
          const clientPercent = parseFloat(
            values.client.percentOfBeneficiaryAccounts.replace(
              /[^0-9.-]+/g,
              ""
            ) || 0
          );
          const partnerPercent = 100 - clientPercent;

          setFieldValue(
            "partner.percentOfBeneficiaryAccounts",
            toPercentage(partnerPercent)
          );
        }

        if (values.client?.distributionOfIncomeCGT) {
          const clientDistribution = parseFloat(
            values.client.distributionOfIncomeCGT.replace(/[^0-9.-]+/g, "") || 0
          );
          const partnerDistribution = 100 - clientDistribution;

          setFieldValue(
            "partner.distributionOfIncomeCGT",
            toPercentage(partnerDistribution)
          );
        }

        openNotificationSuccess(
          "success",
          "topRight",
          "Success",
          `Data of "${props.modalObject.title}" is calculated`
        );
      }
    } catch (error) {
      console.error("Error in calculation:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error",
        `Failed to calculate "${props.modalObject.title}"`
      );
    } finally {
      setCashFlowReCalculateLoading(false);
    }
  };

  const handleChildButtonDownloadClick = async (values) => {
    try {
      setCashFlowDownloading(true);
      const obj = JSON.parse(JSON.stringify(cashFlowData));
      obj[objKey] = values;

      const response = await PostAxiosBlob(
        `${DefaultUrl}/api/cal/workBookDownload`,
        obj
      );

      const fileName = `UpdatedWorkbook_of_${RenderName("client")}.xlsx`;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      openNotificationSuccess(
        "success",
        "topRight",
        "Success",
        `Excel file "${fileName}" downloaded successfully`
      );
    } catch (error) {
      console.error("Download error:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Download Failed",
        "Failed to download Excel file"
      );
    } finally {
      setCashFlowDownloading(false);
    }
  };

  /* ---------------- Options ---------------- */
  const loanTermOptions = Array.from({ length: 31 }, (_, i) => ({
    value: i.toString(),
    label: ("Year " + i).toString(),
  }));

  const ownerOptions =
    UserStatus !== "Single"
      ? [
          { value: "client", label: RenderName("client") },
          { value: "partner", label: RenderName("partner") },
        ]
      : [{ value: "client", label: RenderName("client") }];

  /* ---------------- Table Columns ---------------- */
  const columns = [
    { title: "Owner", dataIndex: "owner", type: "label", justText: true },
    {
      title: "% of Beneficiary Accounts",
      placeholder: "% of Beneficiary Accounts",
      dataIndex: "percentOfBeneficiaryAccounts",
      type: "number-toPercent",
    },
    {
      title: "Total of Beneficiary Accounts",
      placeholder: "Total of Beneficiary Accounts",
      dataIndex: "totalOfBeneficiaryAccounts",
      type: "number-toComma",
      disabled: true,
    },
    {
      title: "Distribution of Income/CGT",
      placeholder: "Distribution of Income/CGT",
      dataIndex: "distributionOfIncomeCGT",
      type: "number-toPercent",
    },
    {
      title: "Distribution Taken as Cash",
      placeholder: "Distribution Taken as Cash",
      dataIndex: "distributionTakenAsCash",
      type: "yesno",
      width: 100,
    },
    {
      title: "Distribution Taken as Cash From Year",
      placeholder: "Distribution Taken as Cash From Year",
      dataIndex: "distributionTakenAsCashFromYear",
      type: "select",
      selectedOptionValue: true,
      options: loanTermOptions,
    },
  ];

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

          if (
            values.owner?.includes("partner") &&
            UserStatus === "Married" &&
            values.partner
          ) {
            // For partner row, some fields should be disabled
            const partnerData = { ...values.partner };

            rowsArray.push({
              key: "partner",
              owner: RenderName("partner"),
              stakeHolder: "partner",
              ...partnerData,
              _disabledFields: [
                "percentOfBeneficiaryAccounts",
                "distributionOfIncomeCGT",
              ],
            });
          }

          return rowsArray;
        }, [values, UserStatus]);

        // Set up hidden buttons
        useEffect(() => {
          if (props.childButtonRef?.current) {
            props.childButtonRef.current.onclick = () =>
              handleChildButtonClick(values, setFieldValue);
          }

          if (props.childButtonDownloadRef?.current) {
            props.childButtonDownloadRef.current.onclick = () =>
              handleChildButtonDownloadClick(values);
          }
        }, [values, setFieldValue]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <label className="mb-0">Owner</label>
                  <div style={{ minWidth: 220 }}>
                    <Field
                      name="owner"
                      component={AntdCreatableMultiSelect}
                      options={ownerOptions}
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
                    customDisabledFields={(row) => row._disabledFields || []}
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

export default WestFamilyTrustInvestment;
