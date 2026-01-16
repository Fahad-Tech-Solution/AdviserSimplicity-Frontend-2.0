import React, { useEffect, useMemo, useState } from "react";
import { Form, Formik } from "formik";
import { Row } from "react-bootstrap";
import { ConfigProvider, Select } from "antd";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const AntDTableHOC = DynamicTableForInputsSection("antd");
const { Option } = Select;

const InnerDirectors = (props) => {
  
  let {
    title,
    question = "Number of Directors :",
    columnHead = "Directors Names",
  } = props.modalObject;

  const initialValues = {
    NumberOfMap: "",
    directors: [],
  };

  /** ---------------------------------------------
   *  LOAD EXISTING SAVED VALUES INTO FORM
   * --------------------------------------------- */
  const fillInitialValues = (setFieldValue) => {
    const { modalObject } = props;
    const key = modalObject?.key;
    const values = modalObject?.values;

    let savedDirectors = [];

    if (props.modalObject.stakeHolder) {
      let index = parseFloat(
        props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
      );
      let BaseKey = props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "");
      console.log(index, BaseKey, "index, BaseKey");
      if (index !== undefined && index !== null) {
        savedDirectors =
          values?.[BaseKey]?.[index]?.directorsOfCorporateTrustee;
      } else {
        savedDirectors = values?.[BaseKey]?.directorsOfCorporateTrustee;
      }
    } else {
      savedDirectors = values?.directorsOfCorporateTrustee;
    }

    if (savedDirectors && Array.isArray(savedDirectors)) {
      setFieldValue("NumberOfMap", savedDirectors.length.toString());

      savedDirectors.forEach((dir, index) => {
        setFieldValue(`directors[${index}].directorName`, dir.directorName);
      });
    } else {
      props.setIsEditing(true);
    }
  };

  /** ---------------------------------------------
   *  SUBMIT HANDLER
   * --------------------------------------------- */
  const onSubmit = async (values) => {
    const count = parseInt(values.NumberOfMap, 10) || 0;

    const newEntries = [];

    for (let i = 0; i < count; i++) {
      newEntries.push({
        directorName: values.directors?.[i]?.directorName || "",
      });
    }
    if (props?.modalObject?.stakeHolder) {
      props.setFieldValue(
        props.modalObject.stakeHolder + "directorsOfCorporateTrustee",
        newEntries
      );
    } else {
      props.setFieldValue("directorsOfCorporateTrustee", newEntries);
    }

    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  /** ---------------------------------------------
   *  ANT DESIGN TABLE COLUMNS
   * --------------------------------------------- */
  const columns = [
    {
      title: "No#",
      dataIndex: "owner",
      key: "owner",
      render: (_, __, idx) => idx + 1,
      width: 60,
    },
    {
      title: columnHead,
      dataIndex: "directorName",
      key: "directorName",
      type: "text",
      placeholder: "Director Name",
      width: 200,
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      innerRef={props.formRef}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, handleBlur, handleChange }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        /** ---------------------------------------------
         *  Build Table Rows Dynamically
         *  --------------------------------------------- */
        const tableData = useMemo(() => {
          const count = Number(values.NumberOfMap) || 0;
          return Array.from({ length: count }, (_, i) => ({
            key: `directors.${i}`,
            stakeHolder: `directors[${i}]`,
            directorName: values.directors?.[i]?.directorName || "",
          }));
        }, [values.NumberOfMap, values.directors]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  {/* LABEL + SELECT */}
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                    <p className="text-end mt-3">{question}</p>

                    <div style={{ minWidth: "10%" }}>
                      <ConfigProvider
                        theme={{
                          components: { Select: { colorBorder: "#36b446" } },
                        }}
                      >
                        <Select
                          id="NumberOfMap"
                          name="NumberOfMap"
                          className="w-100 h-100"
                          placeholder="Select"
                          size="large"
                          disabled={!props?.isEditing}
                          value={values.NumberOfMap || undefined}
                          onChange={(value) => {
                            setFieldValue("NumberOfMap", value);
                          }}
                          onBlur={handleBlur}
                          getPopupContainer={(t) => t.parentNode}
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

                  {/* TABLE */}
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
                        deleteButton={true}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Row>

            {/* Hidden Submit Button */}
            <button type="submit" style={{ display: "none" }} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default InnerDirectors;
