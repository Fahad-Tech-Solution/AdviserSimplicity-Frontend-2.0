import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Row } from "react-bootstrap";
import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const AssetValueOfCompany = (props) => {
  let [layoutSwitchFlag] = useState(props.modalObject.title);

  let initialValues = {
    assetValue: "",
    includeFromYear: "1",
    upUntilYear: "30",
    expectedGrowthRate: "2.50%",
  };

  let fillInitialValues = (setFieldValue) => {
    if (
      props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]
    ) {
      let SubObj =
        props.modalObject.values[
          props.modalObject.stakeHolder.replace(".", "")
        ];
      if (SubObj[props.modalObject.key + "Obj"]) {
        let Data = SubObj[props.modalObject.key + "Obj"];
        setFieldValue("assetValue", Data.assetValue);
        setFieldValue("includeFromYear", Data.includeFromYear);
        setFieldValue("upUntilYear", Data.upUntilYear);

        if (
          props.modalObject.title === "Net Trust Distribution" &&
          props.modalObject.sourceObj.title === "Bucket Company"
        ) {
          setFieldValue("indexation", Data.indexation || "2.50%");
          setFieldValue("openingValue", Data.openingValue || "");
        }
        if (
          props.modalObject.title === "Net Trust Distribution" &&
          props.modalObject.sourceObj.title === "Business as Trusts"
        ) {
          setFieldValue(
            "takeAsCashFromUntilYear",
            Data.takeAsCashFromUntilYear || "1"
          );
          setFieldValue("indexation", Data.indexation || "2.50%");
        } else {
          setFieldValue("expectedGrowthRate", Data.expectedGrowthRate);
        }
      }
    }
  };

  let onSubmit = (values) => {
    console.log(values, props.modalObject.key, "values");

    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key,
      values.assetValue
    );
    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key + "Obj",
      values
    );

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  const yearsIncludedArray = Array.from({ length: 31 }, (_, i) => {
    return {
      value: i.toString(),
      label: ("Year " + i).toString(),
    };
  });

  const indexation = Array.from({ length: 21 }, (_, i) => ({
    value: (i * 0.5).toFixed(2) + "%",
    label: (i * 0.5).toFixed(2) + "%",
  }));

  /* ---------------- Table Columns ---------------- */
  const getColumns = () => {
    const baseColumns = [];
    
    // Add opening value column if needed
    if (
      layoutSwitchFlag === "Net Trust Distribution" &&
      props.modalObject?.sourceObj?.title === "Bucket Company"
    ) {
      baseColumns.push({
        title: "Opening Value",
        dataIndex: "openingValue",
        type: "number-toComma",
      });
    }
    
    // Main asset value column
    baseColumns.push({
      title: props.modalObject.title,
      dataIndex: "assetValue",
      type: "number-toComma",
    });
    
    // Include from year column
    baseColumns.push({
      title: "Include From Year",
      dataIndex: "includeFromYear",
      type: "select",
      options: yearsIncludedArray,
    });
    
    // Up until year column
    baseColumns.push({
      title: "Up Until Year",
      dataIndex: "upUntilYear",
      type: "select",
      options: yearsIncludedArray,
    });
    
    // Additional columns based on conditions
    if (
      layoutSwitchFlag === "Net Trust Distribution" &&
      props.modalObject?.sourceObj?.title === "Bucket Company"
    ) {
      baseColumns.push({
        title: "Indexation",
        dataIndex: "indexation",
        type: "select",
        options: indexation,
      });
    } else if (
      layoutSwitchFlag === "Net Trust Distribution" &&
      props.modalObject?.sourceObj?.title === "Business as Trusts"
    ) {
      baseColumns.push(
        {
          title: "Take As Cash From Until Year",
          dataIndex: "takeAsCashFromUntilYear",
          type: "select",
          options: yearsIncludedArray,
        },
        {
          title: "Indexation",
          dataIndex: "indexation",
          type: "select",
          options: indexation,
        }
      );
    } else {
      baseColumns.push({
        title: "Expected Growth Rate",
        dataIndex: "expectedGrowthRate",
        type: "select",
        options: indexation,
      });
    }
    
    return baseColumns;
  };

  const columns = getColumns();

  /* ---------------- Table Data ---------------- */
  const getTableData = (values) => {
    return [
      {
        key: "assetValueRow",
        ...values,
      },
    ];
  };

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

        const tableData = getTableData(values);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="mt-4 All_Client reportSection">
                    <AntdTable
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
                </div>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AssetValueOfCompany;