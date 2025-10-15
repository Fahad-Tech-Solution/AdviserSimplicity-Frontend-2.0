import { Field, Form, Formik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../../Store/Store";
import {
  PatchAxios,
  PostAxios,
  toCommaAndDollar,
} from "../../../Assets/Api/Api";
import axios from "axios";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";

const QuestionIncomeExpanse = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

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

  let initialValues = { NumberOfMap: "1" };

  const [dynamicFields, setDynamicFields] = useState([]);

  const fillInitialValues = (setFieldValue) => {
    console.log("props.modalObject 12", props.modalObject);
    console.log(
      "props.modalObject",
      props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
    );
    let index = props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "");

    let expanseData =
      props.modalObject.values?.[
        props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "")
      ]?.[index]?.[props.modalObject.key + "Array"];

    console.log("expanseData", expanseData);

    if (expanseData && expanseData.length) {
      expanseData.map((data, index) => {
        setFieldValue(`councilRates`, data.councilRates);
        setFieldValue(`waterRates`, data.waterRates);
        setFieldValue(`landTax`, data.landTax);
        setFieldValue(`insuranceCorporate`, data.insuranceCorporate);
        setFieldValue(`repairsMaintenance`, data.repairsMaintenance);
        setFieldValue(`allOther`, data.allOther);
        setFieldValue(`totalExpance`, data.totalExpance);
      });
    }
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    // Extract the number of maps from the values
    const numberOfMaps = parseInt(values.NumberOfMap, 10);
    const newEntries = [];

    // Iterate through each map entry and create a new object
    for (let i = 0; i < numberOfMaps; i++) {
      const newEntry = {
        councilRates: values[`councilRates`] || "",
        waterRates: values[`waterRates`] || "",
        landTax: values[`landTax`] || "",
        insuranceCorporate: values[`insuranceCorporate`] || "",
        repairsMaintenance: values[`repairsMaintenance`] || "",
        allOther: values[`allOther`] || "",
        totalExpance: values[`totalExpance`] || "",
      };
      newEntries.push(newEntry);
    }

    // Log the new entries to verify
    console.log("newEntries", newEntries);

    let total = newEntries.reduce(
      (total, entry) =>
        total + (parseFloat(entry.totalExpance.replace(/[^0-9.-]+/g, "")) || 0),
      0
    );
    console.log(
      "Calculated total:",
      props.modalObject,
      `${props.modalObject.stakeHolder}${props.modalObject.key}`
    );
    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}Array`,
      newEntries
    );
    // props.setFieldValue(`${props.modalObject.key3}${props.modalObject.index}`, total)
    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}`,
      toCommaAndDollar(total)
    );

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };
  let FormulaSetting = (values, setFieldValue, currentInput, index) => {
    const cleanNumber = (input) => {
      // Ensure the input is a string, then apply replace and parseFloat
      return parseFloat(String(input || "").replace(/[^0-9.-]+/g, "")) || 0;
    };

    // Initialize variables using the cleanNumber function
    let councilRates = cleanNumber(values[`councilRates${index}`]);
    let waterRates = cleanNumber(values[`waterRates${index}`]);
    let landTax = cleanNumber(values[`landTax${index}`]);
    let insuranceCorporate = cleanNumber(values[`insuranceCorporate${index}`]);
    let repairsMaintenance = cleanNumber(values[`repairsMaintenance${index}`]);
    let allOther = cleanNumber(values[`allOther${index}`]);

    // Switch to handle the specific current input
    switch (currentInput.name) {
      case `councilRates${index}`:
        councilRates = cleanNumber(currentInput.value);
        break;
      case `waterRates${index}`:
        waterRates = cleanNumber(currentInput.value);
        break;
      case `landTax${index}`:
        landTax = cleanNumber(currentInput.value);
        break;
      case `insuranceCorporate${index}`:
        insuranceCorporate = cleanNumber(currentInput.value);
        break;
      case `repairsMaintenance${index}`:
        repairsMaintenance = cleanNumber(currentInput.value);
        break;
      case `allOther${index}`:
        allOther = cleanNumber(currentInput.value);
        break;
      default:
        console.log("No matching input field");
        break;
    }

    // Calculate the total expense
    let totalExpance =
      councilRates +
      waterRates +
      landTax +
      insuranceCorporate +
      repairsMaintenance +
      allOther;

    // Set the totalExpance field, ensuring that it's formatted properly
    setFieldValue(`totalExpance${index}`, toCommaAndDollar(totalExpance || 0));
  };
  const calculateTotalExpenses = (values, setFieldValue, thisInput, index) => {
    console.log("Calculating total expenses:", { values, thisInput, index });

    // Helper to clean currency / number input
    const cleanNumber = (val) => {
      if (val === undefined || val === null) return 0;
      if (typeof val === "number") return val;
      const cleaned = String(val).replace(/[^0-9.-]+/g, "");
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : parsed;
    };

    // 🔹 Detect prefix (handle both indexed and non-indexed cases)
    const suffix = index !== undefined && index !== null ? index : "";
    console.log("Using suffix:", suffix);
    // Extract values
    let councilRates = cleanNumber(
      values[`councilRates${suffix}`] ?? values.councilRates
    );
    console.log("councilRates:", councilRates);
    let waterRates = cleanNumber(
      values[`waterRates${suffix}`] ?? values.waterRates
    );
    let landTax = cleanNumber(values[`landTax${suffix}`] ?? values.landTax);
    let insuranceCorporate = cleanNumber(
      values[`insuranceCorporate${suffix}`] ?? values.insuranceCorporate
    );
    let repairsMaintenance = cleanNumber(
      values[`repairsMaintenance${suffix}`] ?? values.repairsMaintenance
    );
    let allOther = cleanNumber(values[`allOther${suffix}`] ?? values.allOther);

    // Update whichever field changed
    switch (thisInput.name) {
      case `councilRates${suffix}`:
      case "councilRates":
        councilRates = cleanNumber(thisInput.value);
        console.log("Updated councilRates:", councilRates);
        break;
      case `waterRates${suffix}`:
      case "waterRates":
        waterRates = cleanNumber(thisInput.value);
        break;
      case `landTax${suffix}`:
      case "landTax":
        landTax = cleanNumber(thisInput.value);
        break;
      case `insuranceCorporate${suffix}`:
      case "insuranceCorporate":
        insuranceCorporate = cleanNumber(thisInput.value);
        break;
      case `repairsMaintenance${suffix}`:
      case "repairsMaintenance":
        repairsMaintenance = cleanNumber(thisInput.value);
        break;
      case `allOther${suffix}`:
      case "allOther":
        allOther = cleanNumber(thisInput.value);
        break;
      default:
        break;
    }

    // ✅ Calculate total
    const total =
      councilRates +
      waterRates +
      landTax +
      insuranceCorporate +
      repairsMaintenance +
      allOther;

    // ✅ Set Total field (handle indexed or non-indexed key)
    const totalKey =
      values.hasOwnProperty(`totalExpance${suffix}`) && suffix !== ""
        ? `totalExpance${suffix}`
        : "totalExpance";
    console.log("Setting total at key:", totalKey, "with value:", total);
    setFieldValue(totalKey, toCommaAndDollar(total || 0));
  };

  const AntDTableHOC = DynamicTableForInputsSection("antd");

  const columns = [
    {
      title: "Council Rates",
      dataIndex: "councilRates",
      key: "councilRates",
      type: "number-toComma",
      placeholder: "Council Rates",
      width: 200,
      callBack: true,
      func: calculateTotalExpenses,
    },
    {
      title: "Water Rates",
      dataIndex: "waterRates",
      key: "waterRates",
      type: "number-toComma",
      placeholder: "Water Rates",
      width: 200,
      callBack: true,
      func: calculateTotalExpenses,
    },
    {
      title: "Land tax",
      dataIndex: "landTax",
      key: "landTax",
      type: "number-toComma",
      placeholder: "Land tax",
      width: 200,
      callBack: true,
      func: calculateTotalExpenses,
    },
    {
      title: "Insurance/Body Corporate",
      dataIndex: "insuranceCorporate",
      key: "insuranceCorporate",
      type: "number-toComma",
      placeholder: "Insurance/Body Corporate",
      width: 200,
      callBack: true,
      func: calculateTotalExpenses,
    },
    {
      title: "Repairs and Maintenance",
      dataIndex: "repairsMaintenance",
      key: "repairsMaintenance",
      type: "number-toComma",
      placeholder: "Repairs and Maintenance",
      width: 200,
      callBack: true,
      func: calculateTotalExpenses,
    },
    {
      title: "All Other",
      dataIndex: "allOther",
      key: "allOther",
      type: "number-toComma",
      placeholder: "All Other",
      width: 200,
      callBack: true,
      func: calculateTotalExpenses,
    },
    {
      title: "Total Expenses",
      dataIndex: "totalExpance",
      key: "totalExpance",
      type: "number-toComma",
      placeholder: "Total Expenses",
      width: 200,
      disabled: true,
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
        const tableData = useMemo(() => {
          console.log("values:", values);
          const rows = [
            {
              key: 0,
              owner: nameSet,
              // LenderCurrent: values?.LenderCurrent || "",
              councilRates: values?.councilRates || "",
              waterRates: values?.waterRates || "",
              landTax: values?.landTax || "",
              insuranceCorporate: values?.insuranceCorporate || "",
              repairsMaintenance: values?.repairsMaintenance || "",
              allOther: values?.allOther || "",
              totalExpance: values?.totalExpance || "",
            },
          ];

          return rows;
        }, [values]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2 d-none">
                    <label htmlFor="" className="">
                      How many {props.modalObject.title} does {nameSet} have :
                    </label>

                    <div style={{ width: "10%" }}>
                      <Field
                        type="text"
                        id="NumberOfMap"
                        name="NumberOfMap"
                        className="form-control inputDesignDoubleInput"
                        onChange={(e) => handleInput(e, setFieldValue)}
                      />
                    </div>
                  </div>

                  {values.NumberOfMap && (
                    <div className="mt-4 All_Client reportSection">
                      {/* <Table striped bordered responsive hover>
                        <thead>
                          <tr>
                            <th>No#</th>
                            <th>Council Rates</th>
                            <th>Water Rates</th>
                            <th>Land tax </th>
                            <th>Insurance/Body Corporate</th>
                            <th>Repairs and Maintenance</th>
                            <th>All Other</th>
                            <th>Total Expenses</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: values.NumberOfMap }).map((_, i) => {
                            return (
                              <tr key={i}>
                                <td>{1 + i}</td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Council Rates"
                                    id={`councilRates${i}`}
                                    name={`councilRates${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(e.target.name,
                                        toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                      FormulaSetting(values, setFieldValue, e.target, i)
                                    }}
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Water Rates"
                                    id={`waterRates${i}`}
                                    name={`waterRates${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(e.target.name,
                                        toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                      FormulaSetting(values, setFieldValue, e.target, i)

                                    }}
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Land tax"
                                    id={`landTax${i}`}
                                    name={`landTax${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(e.target.name,
                                        toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                      FormulaSetting(values, setFieldValue, e.target, i)

                                    }}
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Insurance/Body Corporate"
                                    id={`insuranceCorporate${i}`}
                                    name={`insuranceCorporate${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(e.target.name,
                                        toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                      FormulaSetting(values, setFieldValue, e.target, i)

                                    }}
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Repairs and Maintenance"
                                    id={`repairsMaintenance${i}`}
                                    name={`repairsMaintenance${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(e.target.name,
                                        toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                      FormulaSetting(values, setFieldValue, e.target, i)

                                    }}
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    // disabled
                                    placeholder="All Other"
                                    id={`allOther${i}`}
                                    name={`allOther${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(e.target.name,
                                        toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                      FormulaSetting(values, setFieldValue, e.target, i)
                                    }}
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    disabled
                                    placeholder="Total Expance"
                                    id={`totalExpance${i}`}
                                    name={`totalExpance${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(e.target.name,
                                        toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                    }}
                                  />
                                </td>
                              </tr>)
                          })}
                        </tbody>
                      </Table> */}
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

export default QuestionIncomeExpanse;
