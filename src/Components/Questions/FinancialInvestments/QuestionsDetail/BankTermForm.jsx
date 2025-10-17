import { Field, Form, Formik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
import { useRecoilValue } from "recoil";
import {
  BankDetail,
  defaultUrl,
  QuestionDetail,
} from "../../../../Store/Store";
import {
  PostAxios,
  PatchAxios,
  toCommaAndDollar,
  openNotificationSuccess,
} from "../../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";
import { ConfigProvider, Select } from "antd";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const BankTermForm = (props) => {
  const bankDetailObj = useRecoilValue(BankDetail);

  const [nameSet] = useState(() => {
    if (props.modalObject.Input === "client") {
      return localStorage.getItem("UserName");
    } else if (props.modalObject.Input === "partner") {
      return localStorage.getItem("PartnerName");
    } else if (props.modalObject.Input === "joint") {
      return (
        localStorage.getItem("UserName") +
        " & " +
        localStorage.getItem("PartnerName")
      );
    }
    return "";
  });

  // Title cleanup
  const [title] = useState(() => {
    let currentTitle = props.modalObject.title;
    if (currentTitle.includes("_")) {
      currentTitle = currentTitle.split("_").slice(1).join("_");
    }
    return currentTitle;
  });

  // Extract previous data (if any)
  const existingData =
    props.modalObject.values?.[
      props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "")
    ]?.[props.modalObject.Input + "Array"] || [];

  // Initial Formik values
  const initialValues = {
    NumberOfMap: existingData.length || "",
    bankAccounts: existingData.length ? existingData : [],
  };

  // Generate Financial Institution options
  const [institutionOptions, setInstitutionOptions] = useState(() => {
    if (!bankDetailObj?.FinancialInstitutions) return [];
    return bankDetailObj.FinancialInstitutions.map((elem) => ({
      value: elem._id,
      label: elem.platformName,
    }));
  });

  const fillInitialValues = (setFieldValue) => {
    if (existingData.length) {
      setFieldValue("NumberOfMap", existingData.length);
      setFieldValue("bankAccounts", existingData);
    }
  };

  const onSubmit = async (values) => {
    const bankData = values.bankAccounts;
    const DataOf = props.modalObject.Input;

    // Compute total balance
    const totalBalance = bankData.reduce(
      (total, entry) =>
        total +
        parseFloat(
          (entry?.currentBalance || "$0")?.replace(/[^0-9.-]+/g, "") || 0
        ),
      0
    );

    // Update parent form values
    props.setFieldValue(
      props.modalObject.stakeHolder + DataOf + "Array",
      bankData
    );

    props.setFieldValue(
      props.modalObject.stakeHolder + "currentBalance",
      toCommaAndDollar(totalBalance)
    );

    // Reset errors
    props.modalObject.setShowError?.((prev) => ({
      ...prev,
      [`${DataOf + "currentBalance"}Error`]: false,
      [`${DataOf + "currentBalance"}Message`]: "",
    }));

    if (props.flagState) props.setFlagState(false);
  };

  // Define table columns
  const columns = [
    {
      title: "No#",
      dataIndex: "owner",
      key: "owner",
      width: 60,
    },
    {
      title: "Name of Institution",
      dataIndex: "Institution",
      key: "Institution",
      type: "select",
      options: institutionOptions,
      placeholder: "Select Institution",
      selectedOptionValue: true,
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
      type: "text",
      placeholder: "Account Number",
    },
    {
      title: "Current Balance",
      dataIndex: "currentBalance",
      key: "currentBalance",
      type: "number-toComma",
      placeholder: "Current Balance",
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      innerRef={props.formRef}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [existingData]);

        const dataRows = useMemo(() => {
          const num = Number(values.NumberOfMap) || 0;
          if (num > 0) {
            return Array.from({ length: num }, (_, i) => ({
              key: `bankAccount.${i}`,
              owner: i + 1,
              stakeHolder: `bankAccounts[${i}]`,
              Institution: values.bankAccounts?.[i]?.Institution || "",
              accountNumber: values.bankAccounts?.[i]?.accountNumber || "",
              currentBalance: values.bankAccounts?.[i]?.currentBalance || "",
            }));
          }
          return [];
        }, [values.NumberOfMap, values.bankAccounts]);

        return (
          <Form>
            <div className="d-flex justify-content-center align-items-center gap-4">
              <p
                className="text-end mt-1 pt-2"
                onClick={() => {
                  console.log(props.modalObject.values);
                }}
              >
                How many {title} does {nameSet} have :
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
                  <Field name="NumberOfMap">
                    {({ field, form }) => (
                      <Select
                        id="NumberOfMap"
                        className="w-100 h-100"
                        placeholder="Select"
                        size="large"
                        value={field.value || undefined}
                        onChange={(value) =>
                          form.setFieldValue(field.name, value)
                        }
                        onBlur={() => form.setFieldTouched(field.name, true)}
                        getPopupContainer={(triggerNode) =>
                          triggerNode.parentNode
                        }
                      >
                        {Array.from(
                          { length: props?.modalObject?.pageLimit || 10 },
                          (_, i) => (
                            <Option key={i} value={i + 1}>
                              {i + 1}
                            </Option>
                          )
                        )}
                      </Select>
                    )}
                  </Field>
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
                  handleSubmit={props?.handleOk}
                />
              </div>
            )}

            <button type="submit" style={{ display: "none" }}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default BankTermForm;
