import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { defaultUrl } from "../../../Store/Store";
import { handleInputBlur, handleInputChange, handleInputFocus, handleInputKeyDown, toCommaAndDollar, toPercentage } from "../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import { ConfigProvider, Input } from "antd";

const AntdTable = DynamicTableForInputsSection("antd");

const PensionBenefits = (props) => {
  const [dynamicFields, setDynamicFields] = useState([]);

  // Safely access modalObject from props with fallbacks
  const modalObject = props.modalObject || {};
  const index = parseFloat(
    props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
  );
  const BaseKey = props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "");

  // Ensure existingData is always an array
  const existingData =
    props.modalObject.values?.[BaseKey]?.[index]?.[props.modalObject.key + "Array"] || [];


  const initialValues = {

  };

  const fillInitialValues = (setFieldValue) => {
    if (existingData.length > 0) {
      setFieldValue("NumberOfMap", existingData.length);
      setFieldValue("pensionBenefits", existingData);
    }
  };

  const onSubmit = async (values) => {
    console.log("PensionBenefits onSubmit values:", values);

    const numberOfMaps = parseInt(values.NumberOfMap, 10);
    const newEntries = [];

    for (let i = 0; i < numberOfMaps; i++) {
      const newEntry = {
        commencementDate: values.pensionBenefits?.[i]?.commencementDate || "",
        originalPurchaseDate: values.pensionBenefits?.[i]?.originalPurchaseDate || "",
        eligibleServiceDate: values.pensionBenefits?.[i]?.eligibleServiceDate || "",
        taxFree: values.pensionBenefits?.[i]?.taxFree || "",
        currentBalance: values.pensionBenefits?.[i]?.currentBalance || "",
        taxFreeComponent: values.pensionBenefits?.[i]?.taxFreeComponent || "",
        taxableComponent: values.pensionBenefits?.[i]?.taxableComponent || "",
        deductibleAmount: values.pensionBenefits?.[i]?.deductibleAmount || "",
        LumpsumWithdrawalTaken: values.pensionBenefits?.[i]?.LumpsumWithdrawalTaken || "",
      };
      newEntries.push(newEntry);
    }

    console.log("PensionBenefits newEntries:", newEntries);

    const total = newEntries.reduce(
      (total, entry) => total + parseFloat((entry.taxableComponent || "0").replace(/[^0-9.-]+/g, "") || 0),
      0
    );

    console.log("PensionBenefits modalObject:", `${modalObject.stakeHolder}${modalObject.key}`,total);

    if (props.setFieldValue && modalObject.stakeHolder && modalObject.key) {
      props.setFieldValue(
        `${modalObject.stakeHolder}${modalObject.key}Array`,
        newEntries
      );
      props.setFieldValue(
        `${modalObject.stakeHolder}${modalObject.key}`,
        toCommaAndDollar(total)
      );
      
    }



    // Close modal - check for both flagState variations used in parent
    if (props.flagState !== undefined) {
      props.setFlagState(false);
    }

    // Alternative flag state from parent's InnerModal
    if (props.setFlagState && props.flagState !== undefined) {
      props.setFlagState(false);
    }
  };

  const FormulaSetting = (values, setFieldValue, currentInput, stakeHolder) => {
    try {
    
      const index = parseFloat(stakeHolder.replace(/[^0-9-]+/g, ""));

      // Safely parse numeric values from the array structure
      let taxFree = parseFloat(values.pensionBenefits?.[index]?.taxFree?.replace(/[^0-9.-]+/g, "") || 0) || 0;
      let currentBalance = parseFloat(values.pensionBenefits?.[index]?.currentBalance?.replace(/[^0-9.-]+/g, "") || 0) || 0;

      // Update values based on current input
      const fieldName = currentInput.name;
      if (fieldName.includes('taxFree')) {
        taxFree = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
      } else if (fieldName.includes('currentBalance')) {
        currentBalance = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
      }

      // Calculate components
      const taxFreeComponent = (taxFree / 100) * currentBalance;
      const taxableComponent = currentBalance - taxFreeComponent;

      // Set field values, formatting as needed
      setFieldValue(stakeHolder+`taxFreeComponent`, toCommaAndDollar(taxFreeComponent));
      setFieldValue(stakeHolder+`taxableComponent`, toCommaAndDollar(taxableComponent));

    } catch (error) {
      console.error("An error occurred in FormulaSetting:", error);
    }
  };

  const handleInput = (e, setFieldValue, values) => {
    const value = e.target.value > 5 ? 5 : e.target.value;
    setFieldValue(e.target.id, value);

    // Update pensionBenefits array based on new count
    const newCount = parseInt(value, 10) || 0;
    const currentBenefits = values.pensionBenefits || [];

    if (newCount > currentBenefits.length) {
      // Add new empty benefits
      const newBenefits = [...currentBenefits];
      for (let i = currentBenefits.length; i < newCount; i++) {
        newBenefits.push({
          commencementDate: "",
          originalPurchaseDate: "",
          eligibleServiceDate: "",
          taxFree: "",
          currentBalance: "",
          taxFreeComponent: "",
          taxableComponent: "",
          deductibleAmount: "",
          LumpsumWithdrawalTaken: "",
        });
      }
      setFieldValue("pensionBenefits", newBenefits);
    } else if (newCount < currentBenefits.length) {
      // Remove extra benefits
      setFieldValue("pensionBenefits", currentBenefits.slice(0, newCount));
    }
  };

  // Define columns for Antd Table
  const columns = [
    {
      title: "No#",
      dataIndex: "owner",
      key: "owner",
      width: 50,
    },
    {
      title: "Commencement Date",
      dataIndex: "commencementDate",
      key: "commencementDate",
      type: "antdate",
      placeholder: "Commencement Date",
      width: 150,
    },
    {
      title: "Original Purchase Price",
      dataIndex: "originalPurchaseDate",
      key: "originalPurchaseDate",
      type: "number-toComma",
      placeholder: "Original Purchase Price",
      width: 150,
    },
    {
      title: "Eligible Service Date",
      dataIndex: "eligibleServiceDate",
      key: "eligibleServiceDate",
      type: "antdate",
      placeholder: "Eligible Service Date",
      width: 150,
    },
    {
      title: "Tax Free",
      dataIndex: "taxFree",
      key: "taxFree",
      type: "number-toPercent",
      placeholder: "Tax Free",
      width: 100,
      callBack:true,
      func: FormulaSetting,
    },
    {
      title: "Current Balance",
      dataIndex: "currentBalance",
      key: "currentBalance",
      type: "number-toComma",
      placeholder: "Current Balance",
      width: 120,
      callBack:true,
      func: FormulaSetting,
    },
    {
      title: "Tax Free Component",
      dataIndex: "taxFreeComponent",
      key: "taxFreeComponent",
      type: "number-toComma",
      placeholder: "Tax Free Component",
      width: 140,
      disabled: true,
    },
    {
      title: "Taxable Component",
      dataIndex: "taxableComponent",
      key: "taxableComponent",
      type: "number-toComma",
     
      placeholder: "Taxable Component",
      width: 140,
      disabled: true,
    },
    {
      title: "Deductible Amount",
      dataIndex: "deductibleAmount",
      key: "deductibleAmount",
      type: "number-toComma",
      placeholder: "Deductible Amount",
      width: 140,
    },
    {
      title: "Lumpsum Withdrawal Taken",
      dataIndex: "LumpsumWithdrawalTaken",
      key: "LumpsumWithdrawalTaken",
      type: "number-toComma",
      placeholder: "Lumpsum Withdrawal Taken",
      width: 160,
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

        // Prepare data for Antd Table
        const dataRows = Array.isArray(values.pensionBenefits)
          ? values.pensionBenefits.map((item, index) => ({
            key: `pensionBenefits.${index}`,
            owner: index + 1,
            stakeHolder: `pensionBenefits[${index}]`,
            commencementDate: item?.commencementDate || "",
            originalPurchaseDate: item?.originalPurchaseDate || "",
            eligibleServiceDate: item?.eligibleServiceDate || "",
            taxFree: item?.taxFree || "",
            currentBalance: item?.currentBalance || "",
            taxFreeComponent: item?.taxFreeComponent || "",
            taxableComponent: item?.taxableComponent || "",
            deductibleAmount: item?.deductibleAmount || "",
            LumpsumWithdrawalTaken: item?.LumpsumWithdrawalTaken || "",
          }))
          : [];

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="col-md-5">
                    <p className="text-end mt-1">
                      {modalObject.question || "How many Pension Benefits do you have?"}
                    </p>
                  </div>
                  <div className="col-md-2">
                    <select
                      id="NumberOfMap"
                      name="NumberOfMap"
                      className="form-select inputDesignDoubleInput w-100"
                      onChange={(e) => handleInput(e, setFieldValue, values)}
                      onBlur={handleBlur}
                      value={values.NumberOfMap || ""}
                    >
                      <option value="">Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>

                  {values.NumberOfMap && values.NumberOfMap > 0 && (
                    <div className="mt-4 All_Client reportSection">
                      <AntdTable
                        columns={columns}
                        data={dataRows}
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        isEditing={props?.isEditing}
                        setIsEditing={props?.setIsEditing}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PensionBenefits;