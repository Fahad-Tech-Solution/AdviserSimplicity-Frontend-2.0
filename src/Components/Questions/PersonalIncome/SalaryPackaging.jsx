import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo } from "react";
import { ConfigProvider } from "antd";
import { useRecoilValue } from "recoil";
import { defaultUrl } from "../../../Store/Store";
import { toCommaAndDollar } from "../../Assets/Api/Api";
import DynamicYesNo from "../FinancialInvestments/QuestionsDetail/DynamicYesNo";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const SalaryPackaging = (props) => {
  const { key, parentValues, parentKey } = props.modalObject;

  const fillInitialValues = (setFieldValue) => {
    // if (parentValues._id && parentValues?.key) {
    // console.log(JSON.stringify(parentValues));
    if (
      parentValues?.[`${parentKey.replace(".", "")}`]?.[`${key}Modal`] &&
      Object.keys(
        parentValues?.[`${parentKey.replace(".", "")}`]?.[`${key}Modal`]
      ).length > 0
    ) {
      let Data = parentValues[`${parentKey.replace(".", "")}`][`${key}Modal`];
      console.log("incondition", JSON.stringify(Data));

      setFieldValue("employerFBTStatus", Data.employerFBTStatus);
      setFieldValue(
        "creditCardMortgageRepayments",
        Data.creditCardMortgageRepayments
      );
      setFieldValue("costBaseOfCar", Data.costBaseOfCar);
      setFieldValue("FBTPaidByEmployer", Data.FBTPaidByEmployer);
      setFieldValue("runningCostsOfCar", Data.runningCostsOfCar);
    }
  };

  const DefaultUrl = useRecoilValue(defaultUrl);

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
    },
    {
      key: "creditCardMortgageRepayments",
      dataIndex: "creditCardMortgageRepayments",
      type: "text",
      title: "Credit Card/Mortgage Repayments",
      placeholder: "Enter amount",
      width: 100,
      formatter: (val) =>
        val ? toCommaAndDollar(val.replace(/[^0-9.-]+/g, "")) : "",
    },
    {
      key: "costBaseOfCar",
      dataIndex: "costBaseOfCar",
      type: "text",
      title: "Cost Base of Car",
      placeholder: "Enter cost",
      formatter: (val) =>
        val ? toCommaAndDollar(val.replace(/[^0-9.-]+/g, "")) : "",
    },
    {
      key: "FBTPaidByEmployer",
      dataIndex: "FBTPaidByEmployer",
      type: "yesno",
      title: "FBT Paid By Employer",
      width: 100,
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
      type: "text",
      title: "Running Costs of Car",
      placeholder: "Enter costs",
      formatter: (val) =>
        val ? toCommaAndDollar(val.replace(/[^0-9.-]+/g, "")) : "",
    },
  ];

  // ✅ Initialize AntD DynamicTable
  const AntDynamicTable = DynamicTableForInputsSection("antd");

  return (
    <Formik
      initialValues={{}} // ✅ derived from parent
      onSubmit={onSubmit}
      enableReinitialize // ✅ important: updates form values on edit
      innerRef={props.formRef}
    >
      {({ values, handleChange, setFieldValue, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [values.NumberOfMap]);

        const tableData = useMemo(() => {
          const rows = [];

          rows.push({
            key: "client",
            employerFBTStatus: values?.employerFBTStatus || "--",
            creditCardMortgageRepayments:
              values?.creditCardMortgageRepayments || "",
            costBaseOfCar: values?.costBaseOfCar || "",
            FBTPaidByEmployer: values?.FBTPaidByEmployer || "",
            runningCostsOfCar: values?.runningCostsOfCar || "",
          });

          return rows;
        }, [values]);

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
              />
            </ConfigProvider>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SalaryPackaging;
