import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo } from "react";
import { ConfigProvider, Alert } from "antd";
import { useRecoilValue } from "recoil";
import * as Yup from "yup"; // ✅ Yup for validation
import { defaultUrl } from "../../../Store/Store";
import DynamicYesNo from "../FinancialInvestments/QuestionsDetail/DynamicYesNo";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import { Grid } from "antd";
const { useBreakpoint } = Grid;
// ✅ Validation schema
const validationSchema = Yup.object({
  employerFBTStatus: Yup.string().required("Employer FBT Status is required"),
});

const SalaryPackaging = (props) => {
  const { key, parentValues, parentKey } = props.modalObject;
  const DefaultUrl = useRecoilValue(defaultUrl);

  const screens = useBreakpoint();

  // ✅ Fill initial values dynamically
  const fillInitialValues = (setFieldValue) => {
    const data =
      parentValues?.[`${parentKey.replace(".", "")}`]?.[`${key}Modal`] || {};
    if (Object.keys(data).length > 0) {
      setFieldValue("employerFBTStatus", data.employerFBTStatus || "");
      setFieldValue(
        "creditCardMortgageRepayments",
        data.creditCardMortgageRepayments || ""
      );
      setFieldValue("costBaseOfCar", data.costBaseOfCar || "");
      setFieldValue("FBTPaidByEmployer", data.FBTPaidByEmployer || "");
      setFieldValue("runningCostsOfCar", data.runningCostsOfCar || "");
    } else {
      props.setIsEditing(!props.isEditing);
    }
  };

  // ✅ Submit handler
  const onSubmit = async (values) => {
    console.log(values);

    const Obj = {
      employerFBTStatus: values.employerFBTStatus || "",
      creditCardMortgageRepayments: values.creditCardMortgageRepayments || "",
      costBaseOfCar: values.costBaseOfCar || "",
      FBTPaidByEmployer: values.FBTPaidByEmployer || "",
      runningCostsOfCar: values.runningCostsOfCar || "",
    };

    props.setFieldValue(`${parentKey}${key}Modal`, Obj);

    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  // ✅ Table field configs
  const tableFields = [
    {
      key: "employerFBTStatus",
      dataIndex: "employerFBTStatus",
      type: "select",
      title: "Employer FBT Status",
      placeholder: "Select Employer FBT Status",
      width: 170,
      options: [
        { value: "Full FBT", label: "Full FBT" },
        { value: "Exempt (17K Cap)", label: "Exempt (17K Cap)" },
        { value: "Exempt (30K Cap)", label: "Exempt (30K Cap)" },
        { value: "Rebatable", label: "Rebatable" },
      ],
      CheckError: true, // ✅ include to show validation
    },
    {
      key: "creditCardMortgageRepayments",
      dataIndex: "creditCardMortgageRepayments",
      type: "number-toComma",
      title: "Credit Card/Mortgage Repayments",
      placeholder: "Enter amount",
      width: 100,
      CheckError: true,
    },
    {
      key: "costBaseOfCar",
      dataIndex: "costBaseOfCar",
      type: "number-toComma",
      title: "Cost Base of Car",
      placeholder: "Enter cost",
      CheckError: true,
    },
    {
      key: "FBTPaidByEmployer",
      dataIndex: "FBTPaidByEmployer",
      type: "yesno",
      title: "FBT Paid By Employer",
      width: screens.xxl ? 84 : 100,
      CheckError: true,
      render: (_, record) => (
        <DynamicYesNo
          name="FBTPaidByEmployer"
          values={{
            ...record,
            FBTPaidByEmployer: record.FBTPaidByEmployer || "",
          }}
          handleChange={() => {}}
        />
      ),
    },
    {
      key: "runningCostsOfCar",
      dataIndex: "runningCostsOfCar",
      type: "number-toComma",
      title: "Running Costs of Car",
      placeholder: "Enter costs",
      CheckError: true,
    },
  ];

  const AntDynamicTable = DynamicTableForInputsSection("antd");

  return (
    <Formik
      initialValues={{
        employerFBTStatus: "",
        creditCardMortgageRepayments: "",
        costBaseOfCar: "",
        FBTPaidByEmployer: "",
        runningCostsOfCar: "",
      }}
      validationSchema={validationSchema} // ✅ Yup validation
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
      validateOnMount={false}
    >
      {({
        values,
        handleChange,
        setFieldValue,
        handleBlur,
        errors,
        touched,
      }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [parentValues]);

        return (
          <Form>
            <ConfigProvider
              theme={{
                components: {
                  Table: {
                    headerBg: "#36B446",
                    headerColor: "#fff",
                    fontWeight: "bold",
                  },
                },
              }}
            >
              {/* ✅ Validation Alert */}
              {Object.keys(errors).length > 0 &&
                Object.keys(touched).length > 0 && (
                  <Alert
                    type="error"
                    message="Validation Errors"
                    description={
                      <ul className="mb-0">
                        {Object.entries(errors).map(([field, msg]) => (
                          <li key={field}>{msg}</li>
                        ))}
                      </ul>
                    }
                    className="mb-4"
                    showIcon
                  />
                )}

              <AntDynamicTable
                columns={tableFields}
                data={[
                  {
                    key: "row1",
                    employerFBTStatus: values.employerFBTStatus || "",
                    creditCardMortgageRepayments:
                      values.creditCardMortgageRepayments || "",
                    costBaseOfCar: values.costBaseOfCar || "",
                    FBTPaidByEmployer: values.FBTPaidByEmployer || "",
                    runningCostsOfCar: values.runningCostsOfCar || "",
                  },
                ]}
                values={values}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSubmit={props?.handleOk}
                isEditing={props?.isEditing}
                setIsEditing={props?.setIsEditing}
                errors={errors}
                touched={touched}
              />
            </ConfigProvider>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SalaryPackaging;
