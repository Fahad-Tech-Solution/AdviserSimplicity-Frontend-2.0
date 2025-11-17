import { Field, Form, Formik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
import { Row,} from "react-bootstrap";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import { ConfigProvider, Select } from "antd";
const AntDTableHOC = DynamicTableForInputsSection("antd");

const InnerDirectors = (props) => {

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
    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
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
                          size="large"
                          value={values.NumberOfMap || undefined}
                          onChange={(value) => {
                            setFieldValue("NumberOfMap", value);
                          }}
                          onBlur={handleBlur}
                          getPopupContainer={(triggerNode) =>
                            triggerNode.parentNode
                          }
                        >
                          {Array.from(
                            { length: props.modalObject.directorLimit || 0 },
                            (_, i) => (
                              <Option key={i} value={i + 1}>
                                {i + 1}
                              </Option>
                            )
                          )}
                        </Select>
                      </ConfigProvider>
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

export default InnerDirectors;
