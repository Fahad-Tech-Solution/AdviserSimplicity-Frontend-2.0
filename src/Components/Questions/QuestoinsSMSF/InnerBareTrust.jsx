import { Field, Form, Formik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
import { Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { BankDetail, defaultUrl } from "../../../Store/Store";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const AntDTableHOC = DynamicTableForInputsSection("antd");

const InnerBareTrust = (props) => {
  const bankDetailObj = useRecoilValue(BankDetail);
  const [dynamicFields, setDynamicFields] = useState([]);
  const [SwitchFlag, setSwitchFlag] = useState(false);
  const DefaultUrl = useRecoilValue(defaultUrl);

  // 🧠 Set name display for header context
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
  });

  // 🧠 Handle select input
  const handleInput = (e, setFieldValue) => {
    let value = 0;
    if (SwitchFlag) value = e.target.value > 10 ? 10 : e.target.value;
    else value = e.target.value > 6 ? 6 : e.target.value;

    setFieldValue(e.target.id, value);
   
  };

  // 🧠 Prefill from props
  const fillInitialValues = (setFieldValue) => {
    const { modalObject } = props;
    const values = modalObject?.values;

    const bareTrustData = values?.directorsOfBareTrust;

    if (bareTrustData) {
      setFieldValue("bareTrusteeName", bareTrustData.bareTrusteeName || "");
      setFieldValue("ACN", bareTrustData.ACN || "");
      setFieldValue(
        "NumberOfMap",
        bareTrustData.NumberOfDirectors?.toString() || "1"
      );

      // Map directors
      if (Array.isArray(bareTrustData.directorNameArray)) {
        bareTrustData.directorNameArray.forEach((name, index) => {
          setFieldValue(`director${index + 1}`, name);
        });
      }
    }
  };

  // 🧠 On Submit
  const onSubmit = async (values) => {
    const numberOfDirectors = parseInt(values.NumberOfMap, 10) || 0;
    const directorNameArray = [];

    for (let i = 0; i < numberOfDirectors; i++) {
      const directorName = values[`director${i + 1}`] || "";
      directorNameArray.push(directorName);
    }

    const finalObj = {
      NumberOfDirectors: numberOfDirectors,
      bareTrusteeName: values.bareTrusteeName || "",
      ACN: values.ACN || "",
      directorNameArray,
    };

    console.log("✅ Final directorsOfBareTrust object:", finalObj);

    props.setFieldValue("directorsOfBareTrust", finalObj);
    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  // 🧩 Formik Wrapper
  return (
    <Formik
      initialValues={{}}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        // 🧱 Build table columns dynamically
        const columns = useMemo(() => {
          const numberOfDirectors = Number(values?.NumberOfMap) || 0;

          const directorColumns = Array.from(
            { length: numberOfDirectors },
            (_, i) => ({
              title: `Director ${i + 1}`,
              dataIndex: `director${i + 1}`,
              key: `director${i + 1}`,
              type: "select",
              placeholder: "Select Director",
              options:
                props.modalObject.values.directorsOfCorporateTrustee?.map(
                  (Item) => ({
                    label: Item.directorName,
                    value: Item.directorName,
                  })
                ) || [],
              width: 180,
            })
          );

          return [
            {
              title: "Bare Trustee Name",
              dataIndex: "bareTrusteeName",
              key: "bareTrusteeName",
              type: "text",
              placeholder: "Bare Trustee Name",
              width: 200,
            },
            {
              title: "ACN",
              dataIndex: "ACN",
              key: "ACN",
              type: "number",
              placeholder: "ACN",
              width: 150,
            },
            ...directorColumns,
          ];
        }, [
          values?.NumberOfMap,
          props.modalObject.values.directorsOfCorporateTrustee,
        ]);

        // 🧱 Single-row data for the table
        const tableData = useMemo(() => {
          const num = Number(values.NumberOfMap) || 0;
          const directorsData = {};

          for (let i = 0; i < num; i++) {
            directorsData[`director${i + 1}`] =
              values[`director${i + 1}`] || "";
          }

          return [
            {
              key: "bareTrust",
              bareTrusteeName: values.bareTrusteeName || "",
              ACN: values.ACN || "",
              ...directorsData,
            },
          ];
        }, [values.NumberOfMap, values]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                    <p className="text-end mt-3">Number of directors :</p>

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

export default InnerBareTrust;
