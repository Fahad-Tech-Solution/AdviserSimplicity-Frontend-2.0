import { Field, Form, Formik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { BankDetail, defaultUrl, QuestionDetail } from "../../../Store/Store";
import {
  handleInputBlur,
  handleInputChange,
  handleInputFocus,
  handleInputKeyDown,
  PatchAxios,
  PostAxios,
  toCommaAndDollar,
  toPercentage,
} from "../../Assets/Api/Api";
import axios from "axios";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
const AntDTableHOC = DynamicTableForInputsSection("antd");

const InnerDirectors = (props) => {
  console.log("props in investment property loan", props);
  let bankDetailObj = useRecoilValue(BankDetail);
  const [dynamicFields, setDynamicFields] = useState([]);

  let handleInput = (e, setFieldValue) => {
    let value = 0;

    if (SwitchFlag) {
      value = e.target.value > 10 ? 10 : e.target.value;
    } else {
      value = e.target.value > 5 ? 5 : e.target.value;
    }

    setFieldValue(e.target.id, value);

    let arr = [];

    for (let i = 0; i < value; i++) {
      arr.push("");
    }

    setDynamicFields(arr);
  };
  let [SwitchFlag, setSwitchFlag] = useState(false);

  let [nameSet] = useState(() => {
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
  });

  let initialValues = {};

  const fillInitialValues = (setFieldValue) => {
    console.log("props.modalObject innerdirectors111", props);

    const { modalObject } = props;
    const key = modalObject?.key; // e.g. "trusteeType"
    const values = modalObject?.values; // the whole object

    // Extract data related to that key (e.g. trusteeType or directors array)
    let propertyLoanData = values?.[key];
    console.log("fillInitialValues -> trustee", propertyLoanData);

    // 🟢 Case 1: If trusteeType or other single field
    if (propertyLoanData && !Array.isArray(propertyLoanData)) {
      setFieldValue(key, propertyLoanData);
    }

    // 🟢 Case 2: If it's a list (like directorsOfCorporateTrustee)
    if (
      values?.directorsOfCorporateTrustee &&
      Array.isArray(values.directorsOfCorporateTrustee)
    ) {
      setFieldValue(
        "NumberOfMap",
        values.directorsOfCorporateTrustee.length.toString()
      );

      values.directorsOfCorporateTrustee.forEach((data, index) => {
        setFieldValue(
          `directors[${index}].directorName`,
          data.directorName || ""
        );
      });
    }
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    console.log("Submitted values in InnerDirectors:", values);

    const numberOfMaps = parseInt(values.NumberOfMap, 10) || 0;
    const newEntries = [];

    // 🟢 Loop through all director entries
    for (let i = 0; i < numberOfMaps; i++) {
      const director = values.directors?.[i] || {};
      newEntries.push({
        directorName: director.directorName || "",
      });
    }

    console.log("newEntries:", newEntries);

    // 🟢 Save into main object under 'directorsOfCorporateTrustee'
    props.setFieldValue("directorsOfCorporateTrustee", newEntries);

    // 🟢 Optional: if you’re computing totals or doing extra logic
    // (you can safely remove this block if not needed)
    const total = newEntries.reduce((sum, entry) => {
      const num =
        parseFloat(entry.directorName?.replace(/[^0-9.-]+/g, "")) || 0;
      return sum + num;
    }, 0);

    console.log("Total (if numeric fields):", total);

    // 🟢 Close modal
    if (props.flagState) props.setFlagState(false);
  };

  const columns = [
    {
      title: "No#",
      dataIndex: "owner",
      key: "owner",
      render: (_, __, i) => i + 1,
      width: 60,
    },
    {
      title: "Trustee Name",
      dataIndex: "directorName",
      key: "directorName",
      type: "text", // simple static text or could be DynamicFormField if editable
      width: 150,
      placeholder: "Trustee Name",

      // selectedOptionValue: true,
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
        // const tableData = useMemo(() => {
        //   // console.log("values:", values);
        //   const rows = [
        //     {
        //       key: 0,
        //       owner: nameSet,
        //       directorName: values?.directorName || "",

        //     },
        //   ];

        //   return rows;
        // }, [values]);
        const tableData = useMemo(() => {
          const num = Number(values.NumberOfMap) || 0;
          if (num > 0) {
            return Array.from({ length: num }, (_, i) => ({
              key: `directors.${i}`,
              stakeHolder: `directors[${i}]`, // important for DynamicTable mapping
              directorName: values.directors?.[i]?.directorName || "",
            }));
          }
          return [];
        }, [values.NumberOfMap, values.directors]);

        // const tableData = useMemo(() => {
        //   const num = Number(values.NumberOfMap) || 0;
        //   console.log("values.NumberOfMap: ", values.NumberOfMap);
        //   if (num > 0) {
        //     return Array.from({ length: num }, (_, i) => ({
        //       key: `directors.${i}`,
        //       // stakeHolder: `directors[${i}]`,
        //       directorName: values.directors?.[i]?.directorName || "",
        //     }));
        //   }

        //   return [];
        // }, [values.NumberOfMap, values.directors]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                    <p
                      className="text-end mt-3"
                      onClick={() => {
                        console.log(values);
                      }}
                    >
                      How many {props.modalObject.title} does {nameSet} have :
                    </p>

                    {/* <div style={{ width: "8%" }}>
                      <Field
                        type="number"
                        id="NumberOfMap"
                        name="NumberOfMap"
                        className="form-control inputDesignDoubleInput"
                        onChange={(e) => handleInput(e, setFieldValue)}
                      />

                    </div> */}

                    <div style={{ minWidth: "10%" }}>
                      <select
                        id="NumberOfMap"
                        name="NumberOfMap"
                        className="form-select inputDesignDoubleInput"
                        onChange={(e) => handleInput(e, setFieldValue)}
                        value={values.NumberOfMap}
                      >
                        <option value="">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </select>
                    </div>
                  </div>

                  {values.NumberOfMap && (
                    <div className="mt-4 All_Client reportSection">
                      <AntDTableHOC
                        columns={columns}
                        data={tableData}
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
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

export default InnerDirectors;
