// AccountBasedPension.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form } from "formik";
import { useRecoilValue } from "recoil";
import { ConfigProvider, Select } from "antd";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";
import InnerModal from "./InnerModal";
import PortfolioValue from "./PortfolioValue";
import AccountBasedBalance from "../AccountBasedBalance";
import Beneficiaries from "./Beneficiaries";
import AnnualPensionPaymentInnerModal from "./AnnualPensionPaymentInnerModal";

import {
  BankDetail,
  QuestionDetail,
  defaultUrl,
} from "../../../../Store/Store";
import {
  openNotificationSuccess,
  toCommaAndDollar,
  RenderName,
  replacePlaceholderWithLabel,
} from "../../../Assets/Api/Api";
import ServiceFee from "./ServiceFee";
import { Grid } from "antd";
const { useBreakpoint } = Grid;

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const AccountBasedPension = (props) => {
  const bankDetailObj = useRecoilValue(BankDetail);

  const [ShowError, setShowError] = useState({});
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  const screens = useBreakpoint();

  // load existing data for this modal input (client/partner/joint)
  const existingData =
    props.modalObject.values?.[
      props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "")
    ]?.[props.modalObject.Input + "Array"] || [];

  const initialValues = {
    NumberOfMap: existingData.length || "",
    accountBasedPensions: existingData.length ? existingData : [],
  };

  // fill initial values into form fields (when form mounts or existingData changes)
  const fillInitialValues = (setFieldValue) => {
    if (existingData.length) {
      setFieldValue("accountBasedPensions", existingData);
      setFieldValue("NumberOfMap", existingData.length);
    } else {
      props.setIsEditing(true);
    }
  };

  // open inner modal
  const handleInnerModal = (
    innerModalTitle,
    key,
    stakeHolder, // stakeHolder string like "accountBasedPensions[0]"
    values,
    type,
    question,
    Platform,
  ) => {
    const index = parseFloat(stakeHolder.replace(/[^0-9-]+/g, ""));
    const BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");

    const selectedPlatformId =
      values?.[BaseKey]?.[index]?.platformName ||
      values?.[BaseKey]?.[index]?._id ||
      "";

    // for balanceBenefitDetailsArray we don't force selection; original did not require platform select here
    if (!selectedPlatformId) {
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        "Please! Select Platform Name First",
      );
      return false;
    }

    const PlatformObj =
      bankDetailObj?.AccountBasedPensions?.find(
        (elem) => elem._id === selectedPlatformId,
      ) ||
      Platform ||
      {};

    let title = `${RenderName(
      props.modalObject.stakeHolder.replace(".", ""),
    )}${replacePlaceholderWithLabel(
      bankDetailObj?.AccountBasedPensions?.map((elem) => ({
        value: elem._id,
        label: elem.platformName,
      })),
      values?.[BaseKey]?.[index].platformName,
      innerModalTitle,
    )}`;

    setModalObject({
      title,
      question,
      key,
      stakeHolder,
      editArray:
        key === "annualAdvice"
          ? values?.[BaseKey]?.[index]?.[key + "Array"] || []
          : values?.[BaseKey]?.[index]?.[key] || [],
      values,
      Platform: PlatformObj,
      ParentModalObject: props.modalObject,
      index,
    });
    setFlagState(true);
  };

  // validation: ensure portfolioValue equals sum of portfolioArray.investmentValue
  const CheckInputValue = (
    values,
    setFieldValue,
    currentInput,
    stakeHolder,
  ) => {
    const index = parseFloat(stakeHolder.replace(/[^0-9-]+/g, ""));
    const BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");
    const portfolioArray = values?.[BaseKey]?.[index]?.portfolioArray || [];

    const ExpectedSum = portfolioArray.reduce(
      (total, entry) =>
        total +
        parseFloat(
          (entry?.investmentValue || "0").replace(/[^0-9.-]+/g, "") || 0,
        ),
      0,
    );

    const data =
      parseFloat((currentInput.value || "0").replace(/[^0-9.-]+/g, "")) || 0;

    if (ExpectedSum !== data) {
      setShowError((prevState) => ({
        ...prevState,
        [`${currentInput.name}Error`]: true,
        [`${currentInput.name}Message`]:
          "Total must be equal to the sum of all Investment value filled in the popup. The sum is " +
          toCommaAndDollar(ExpectedSum),
      }));
    } else {
      setShowError((prevState) => ({
        ...prevState,
        [`${currentInput.name}Error`]: false,
        [`${currentInput.name}Message`]: "",
      }));
    }
  };

  // onSubmit: collect entries and set parent fields
  const onSubmit = async (values) => {
    const DataOf = props.modalObject.Input;

    const newEntries = (values.accountBasedPensions || []).slice(
      0,
      values.NumberOfMap,
    );

    // compute total pensionPayment
    const total = newEntries.reduce((totalAcc, entry) => {
      const val =
        parseFloat(
          (entry?.balanceBenefit || "0").toString().replace(/[^0-9.-]+/g, ""),
        ) || 0;
      return totalAcc + val;
    }, 0);

    // set parent's field with the array
    props.setFieldValue(
      props.modalObject.stakeHolder + DataOf + "Array",
      newEntries,
    );

    props.setFieldValue(
      props.modalObject.stakeHolder + "currentBalance",
      toCommaAndDollar(total),
    );

    props.modalObject.setShowError?.((prev) => ({
      ...prev,
      [`${DataOf + "currentBalance"}Error`]: false,
      [`${DataOf + "currentBalance"}Message`]: "",
    }));

    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  // columns for the dynamic table
  const columns = [
    {
      title: "No#",
      dataIndex: "owner",
      key: "owner",
      width: screens.xxl ? 30 : 60,
    },
    {
      title: "Fund Name",
      dataIndex: "platformName",
      key: "platformName",
      type: "select",
      width: screens.xxl ? 62 : 200,
      options:
        bankDetailObj?.AccountBasedPensions?.map((elem) => ({
          value: elem._id,
          label: elem.platformName,
        })) || [],
      placeholder: "Select Fund",
      selectedOptionValue: true,
    },
    {
      title: "Member Number",
      dataIndex: "memberNumber",
      key: "memberNumber",
      type: "text",
      placeholder: "Member Number",
      width: screens.xxl ? 62 : 180,
    },
    {
      title: "Balance and Details",
      dataIndex: "balanceBenefit",
      key: "balanceBenefit",
      width: screens.xxl ? 62 : 180,
      disabled: true,
      type: "number-toComma-Modal",
      innerModalTitle: "_<CFE>_Balance & Benefit Details",
      placeholder: "Balance Benefit",
      func: (innerModalTitle, values, key, stakeHolder) =>
        handleInnerModal(
          innerModalTitle,
          key,
          stakeHolder,
          values,
          "Balance Benefit Details",
          `Number of Balance & Benefit Details:`,
        ),
      errorHandler: ShowError,
      // ✅ CONDITIONAL ATTRIBUTE for sorting
      ...(!props?.isEditing && {
        sorter: (a, b) => {
          const parse = (val) =>
            parseFloat(String(val || "0").replace(/[^0-9.-]+/g, "")) || 0;

          return parse(a.balanceBenefit) - parse(b.balanceBenefit);
        },
      }),
    },
    {
      title: "Annual Pension Payment",
      dataIndex: "pensionPayment",
      key: "pensionPayment",
      type: "number-toComma-Modal",
      innerModalTitle: "_<CFE>_Annual Pension Payment",
      placeholder: "Pension Payment",
      width: screens.xxl ? 62 : 200,
      disabled: true,
      func: (innerModalTitle, values, key, stakeHolder) =>
        handleInnerModal(
          innerModalTitle,
          key,
          stakeHolder,
          values,
          "Annual Pension Payment",
          "",
        ),
    },
    {
      title: "Beneficiaries",
      dataIndex: "nominatedBeneficiaries",
      key: "nominatedBeneficiaries",
      type: "yesnoModal",
      width: screens.xxl ? 28.2 : 100,
      innerModalTitle: "_<CFE>_Beneficiaries",
      placeholder: "Beneficiaries",
      callBack: true,
      func: (innerModalTitle, values, key, stakeHolder) =>
        handleInnerModal(
          innerModalTitle,
          key,
          stakeHolder,
          values,
          "Beneficiaries",
          `Number of Beneficiaries:`,
        ),
    },

    {
      title: "Ongoing Advice Fee",
      dataIndex: "annualAdvice",
      key: "annualAdvice",
      type: "number-toComma-Modal",
      placeholder: "Ongoing Advice Fee",
      innerModalTitle: "_<CFE>_Ongoing Annual Fee",
      callBack: true,
      width: screens.xxl ? 62 : 190,
      func: (innerModalTitle, values, key, stakeHolder) =>
        handleInnerModal(
          innerModalTitle,
          key,
          stakeHolder,
          values,
          "Beneficiaries",
          `Number of Beneficiaries:`,
        ),
      errorHandler: ShowError,
      disabled: true,
    },
  ];

  // mapping of modal key to component
  const componentMapping = {
    balanceBenefit: <AccountBasedBalance />,
    nominatedBeneficiaries: <Beneficiaries />,
    pensionPayment: <AnnualPensionPaymentInnerModal />,
    annualAdvice: <ServiceFee />,
  };

  const ModalContent = (obj) => {
    return componentMapping[obj.key] || null;
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [existingData]);

        const dataRows = useMemo(() => {
          const num = Number(values.NumberOfMap) || 0;
          if (num > 0) {
            Array.from({ length: num }, (_, i) => {
              setFieldValue(
                `accountBasedPensions[${i}].` + "annualAdvice",
                values.accountBasedPensions?.[i]?.annualAdvice || "$0",
              );
            });

            return Array.from({ length: num }, (_, i) => ({
              key: `accountBasedPensions.${i}`,
              owner: i + 1,
              stakeHolder: `accountBasedPensions[${i}]`,
              platformName:
                values.accountBasedPensions?.[i]?.platformName || "",
              memberNumber:
                values.accountBasedPensions?.[i]?.memberNumber || "",
              platformDisplay: "", // placeholder column to match header "PlatFrom"
              balanceBenefit:
                values.accountBasedPensions?.[i]?.balanceBenefit || "",
              pensionPayment:
                values.accountBasedPensions?.[i]?.pensionPayment || "",
              nominatedBeneficiaries:
                values.accountBasedPensions?.[i]?.nominatedBeneficiaries || "",
              annualAdvice:
                values.accountBasedPensions?.[i]?.annualAdvice || "$0",
            }));
          }
          return [];
        }, [values.NumberOfMap, values.accountBasedPensions]);

        return (
          <Form>
            <InnerModal
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              setFlagState={setFlagState}
              flagState={flagState}
              setIsEditing={props.setIsEditing}
            >
              {ModalContent(modalObject)}
            </InnerModal>

            <div className="d-flex justify-content-center align-items-center gap-4">
              <p
                className="text-end mt-1 pt-2"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  console.log(values);
                }}
              >
                Number of Account Based Pension
              </p>

              <div style={{ minWidth: "10%" }}>
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        colorBorder: "#36b446",
                      },
                    },
                  }}
                >
                  <Select
                    id="NumberOfMap"
                    name="NumberOfMap"
                    className="w-100 h-100"
                    placeholder="Select"
                    disabled={!props?.isEditing}
                    size="large"
                    value={values.NumberOfMap || undefined}
                    onChange={(value) => {
                      setFieldValue("NumberOfMap", value);
                    }}
                    onBlur={handleBlur}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  >
                    {Array.from({ length: 3 }, (_, i) => (
                      <Option key={i} value={i + 1}>
                        {i + 1}
                      </Option>
                    ))}
                  </Select>
                </ConfigProvider>
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
                  CheckInputValue={CheckInputValue}
                  isEditing={props?.isEditing}
                  setIsEditing={props?.setIsEditing}
                  deleteButton={true}
                />
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default AccountBasedPension;
