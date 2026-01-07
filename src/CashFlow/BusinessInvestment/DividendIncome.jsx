import React, { useEffect, useMemo } from "react";
import { Form, Formik } from "formik";
import { Placeholder, Row } from "react-bootstrap";
import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const DividendIncome = (props) => {
  const initialValues = {
    dividendIncome: "",
    franking: "",
    includeFromYear: "1",
    upUntilYear: "30",
    takeAsCashFromUntilYear: "1",
    indexation: "2.50%",
    // clientOfDividend: "",
    // partnerOfDividend: "",
  };

  const fillInitialValues = (setFieldValue) => {
    if (props.modalObject?.values?.[props.modalObject.stakeHolder.replace(".", "")]) {
      let SubObj = props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")];
      if (SubObj[props.modalObject.key + "Obj"]) {
        let Data = SubObj[props.modalObject.key + "Obj"];

        setFieldValue("dividendIncome", Data.dividendIncome || "");
        setFieldValue("franking", Data.franking || "");
        setFieldValue("includeFromYear", Data.includeFromYear || "1");
        setFieldValue("upUntilYear", Data.upUntilYear || "30");

        if (props.modalObject.sourceObj?.title !== "Bucket Company") {
          setFieldValue("takeAsCashFromUntilYear", Data.takeAsCashFromUntilYear || "1");
        }

        setFieldValue("indexation", Data.indexation || "2.50%");

        if (props.modalObject.sourceObj?.title === "Bucket Company") {
          setFieldValue("clientOfDividend", Data.clientOfDividend || "");
          setFieldValue("partnerOfDividend", Data.partnerOfDividend || "");
        }
      }
    }
  };

  const onSubmit = (values) => {
    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}`,
      values.dividendIncome
    );

    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}Obj`,
      values
    );

    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  // Options for dropdowns
  const yearsArray = Array.from({ length: 31 }, (_, i) => ({
    value: i.toString(),
    label: `Year ${i}`,
  }));

  const indexationOptions = Array.from({ length: 21 }, (_, i) => ({
    value: `${(i * 0.5).toFixed(2)}%`,
    label: `${(i * 0.5).toFixed(2)}%`,
  }));

  // Create columns configuration for Antd Table
  const columns = useMemo(() => {
    const baseColumns = [
      {
        title: "Dividend Income",
        dataIndex: "dividendIncome",
        type: "number-toComma",
        key: "dividendIncome",
        placeholder:"Dividend Income",
      },
      {
        title: "Franking",
        dataIndex: "franking",
        type: "number-toPercent",
        key: "franking",
        placeholder:"Franking",
      },
      {
        title: "Include From Year",
        dataIndex: "includeFromYear",
        type: "select",
        key: "includeFromYear",
        selectedOptionValue: true,
        options: yearsArray,
      },
      {
        title: "Up Until Year",
        dataIndex: "upUntilYear",
        type: "select",
        key: "upUntilYear",
        options: yearsArray,
      },
    ];

    // Add "Take As Cash" column only if not Bucket Company
    if (props.modalObject?.sourceObj?.title !== "Bucket Company") {
      baseColumns.push({
        title: "Take As Cash From Until Year",
        dataIndex: "takeAsCashFromUntilYear",
        type: "select",
        key: "takeAsCashFromUntilYear",
        options: yearsArray,
      });
    }

    // Add remaining common columns
    baseColumns.push({
      title: "Indexation",
      dataIndex: "indexation",
      type: "select",
      key: "indexation",
      options: indexationOptions,
    });

    // Add Bucket Company specific columns
    if (props.modalObject?.sourceObj?.title === "Bucket Company") {
      baseColumns.push(
        {
          title: "Client % of Dividend",
          dataIndex: "clientOfDividend",
          type: "number-toPercent",
          key: "clientOfDividend",
          placeholder:"Client % of Dividend",
        },
        {
          title: "Partner % of Dividend",
          dataIndex: "partnerOfDividend",
          type: "number-toPercent",
          key: "partnerOfDividend",
          placeholder:"Partner % of Dividend",
        }
      );
    }

    return baseColumns;
  }, [props.modalObject]);

  // Prepare data for the table
  const tableData = useMemo(() => {
    // Create a single row with all the values
    return [
      {
        key: "dividendIncomeRow",
        ...initialValues,
      },
    ];
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, handleChange, setFieldValue, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        // Update table data with current values
        const updatedData = [
          {
            key: "dividendIncomeRow",
            dividendIncome: values.dividendIncome,
            franking: values.franking,
            includeFromYear: values.includeFromYear,
            upUntilYear: values.upUntilYear,
            takeAsCashFromUntilYear: props.modalObject?.sourceObj?.title !== "Bucket Company"
              ? values.takeAsCashFromUntilYear
              : undefined,
            indexation: values.indexation,
            clientOfDividend: props.modalObject?.sourceObj?.title === "Bucket Company"
              ? values.clientOfDividend
              : undefined,
            partnerOfDividend: props.modalObject?.sourceObj?.title === "Bucket Company"
              ? values.partnerOfDividend
              : undefined,
          },
        ];

        return (
          <Form>
            <Row>
              <div className="mt-4 All_Client reportSection">
                <AntdTable
                  columns={columns}
                  data={updatedData}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  handleSubmit={() => onSubmit(values)}
                  isEditing={props?.isEditing}
                  setIsEditing={props?.setIsEditing}
                  showHeader={true}
                  onFormSubmit={() => onSubmit(values)}
                />
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default DividendIncome;