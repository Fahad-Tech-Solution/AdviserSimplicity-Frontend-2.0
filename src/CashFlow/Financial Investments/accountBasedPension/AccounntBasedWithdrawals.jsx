import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import DynamicTableForInputsSection from "../../../Components/Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const AccounntBasedWithdrawals = (props) => {
  const initialValues = {
    contributionsToFund: "",
    year: "",
    amount: "",
  };

  let BaseKey = props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "");
  let index = parseFloat(
    props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
  );

  const fillInitialValues = (setFieldValue) => {
    if (
      props.modalObject.values?.[BaseKey]?.[index]?.[
        props.modalObject.key + "Obj"
      ]
    ) {
      const data =
        props.modalObject.values?.[BaseKey]?.[index]?.[
          props.modalObject.key + "Obj"
        ];
      setFieldValue("contributionsToFund", data.contributionsToFund || "");
      setFieldValue("year", data.year || "");
      setFieldValue("amount", data.amount || "");
    }
  };

  const onSubmit = (values) => {
    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key + "Obj",
      values
    );

    if (props.flagState) {
      props.setFlagState(false);
      props?.setIsEditing?.(false);
    }
  };

  const yearsIncludedArray = Array.from({ length: 30 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `Year ${i + 1}`,
  }));

  const contributionsFundOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "SMSF", label: "SMSF" },
  ];

  // Create a single row for the table
  const columns = [
    {
      title: "No#",
      dataIndex: "index",
      key: "index",
      width: 60,
      justText: true,
    },
    {
      title: "Contributions To Fund",
      dataIndex: "contributionsToFund",
      placeholder: "Contributions To Fund",
      type: "select",
      options: contributionsFundOptions,
      selectedOptionValue: true,
    },
    {
      title: "Year",
      dataIndex: "year",
      placeholder: "Year",
      type: "select",
      selectedOptionValue: true,
      options: yearsIncludedArray,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      placeholder: "Amount",
      type: "number-toComma",
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

        // Create a single row for the table
        const rows = [
          {
            key: "singleRow",
            index: 1,
            contributionsToFund: values.contributionsToFund,
            year: values.year,
            amount: values.amount,
          },
        ];

        return (
          <Form>
            <div className="mt-4 All_Client reportSection">
              <AntdTable
                columns={columns}
                data={rows}
                values={values}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSubmit={props.handleOk}
                isEditing={props.isEditing}
                setIsEditing={props.setIsEditing}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AccounntBasedWithdrawals;
