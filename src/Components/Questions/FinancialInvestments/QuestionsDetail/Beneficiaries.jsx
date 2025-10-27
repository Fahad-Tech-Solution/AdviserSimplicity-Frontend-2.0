import { Field, Form, Formik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
import { Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { defaultUrl } from "../../../../Store/Store";
import {
  handleInputBlur,
  handleInputChange,
  handleInputFocus,
  handleInputKeyDown,
  toPercentage,
} from "../../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";
import { ConfigProvider, Select } from "antd";
import { number } from "yup";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const Beneficiaries = (props) => {
  const [title, setTitle] = useState(() => {
    let currentTitle = props.modalObject.ParentModal || "";
    if (currentTitle.includes("_")) {
      currentTitle = currentTitle.split("_")[1];
    }
    return currentTitle;
  });

  const [autoClearValue, setAutoClearValue] = useState(false);
  const [RelationshipOptions, setRelationshipOptions] = useState([]);
  const DefaultUrl = useRecoilValue(defaultUrl);

  const initialValues = {
    BeneficiariesDetails: [],
    NumberOfMap: 1,
  };

  const fillInitialValues = (setFieldValue) => {
    try {
      const index = parseFloat(
        props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
      );
      const BaseKey = props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "");
    
      let data =
        props.modalObject.values?.[BaseKey]?.[index]?.[
          props.modalObject.key + "Details"
        ] || [];

      setFieldValue("NumberOfMap", data?.[`${props.modalObject.key}Array`].length || 1);

      setFieldValue(
        "BeneficiariesDetails",
        data?.[`${props.modalObject.key}Array`] || []
      );
      setFieldValue("nominationType", data.nominationType || "");
    } catch (err) {
      console.error("Error in fillInitialValues:", err);
      setFieldValue("NumberOfMap", 1);
    }
  };

  const getRelationshipOptions = (nominationType) => {
    if (nominationType === "Reversionary Beneficiary") {
      return [{ value: "N/A", label: "N/A" }];
    }
    return [
      {
        value: "Legal Personal Representive (Your Estate)",
        label: "Legal Personal Representive (Your Estate)",
      },
      { value: "Spouse/De-facto", label: "Spouse/De-facto" },
      { value: "Child", label: "Child" },
      { value: "Financial Dependant", label: "Financial Dependant" },
      { value: "Interdependant", label: "Interdependant" },
    ];
  };

  const onSubmit = async (values) => {
    try {
      console.log(values);
      const payload = {
        [`${props.modalObject.key}Array`]: values.BeneficiariesDetails || [],

        nominationType: values.nominationType || "",
        NumberOfMap: values.NumberOfMap || "",
      };

      console.log(payload);

      // Update parent form
      props.setFieldValue(
        `${props.modalObject.stakeHolder}${props.modalObject.key}Details`,
        payload
      );

      // Close modal
      if (props.flagState) {
        props.setFlagState(false);
        props.setIsEditing(!props.isEditing);
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
  };

  const extraValue = [
    "Account Based Pension Detail",
    "Annuities Detail",
    "Pension Benefits Details",
  ];

  const columns = [
    {
      title: "No#",
      dataIndex: "index",
      key: "owner",
      render: (_, __, i) => i + 1,
      width: 60,
    },
    // {
    //   title: "Nomination Type",
    //   dataIndex: "nominationType",
    //   key: "nominationType",
    //   type: "select",
    //   width: 250,
    //   options: [
    //     ...(extraValue.includes(title)
    //       ? [
    //           {
    //             value: "Reversionary Beneficiary",
    //             label: "Reversionary Beneficiary",
    //           },
    //         ]
    //       : []),
    //     { value: "Binding (Non-Lapsing)", label: "Binding (Non-Lapsing)" },
    //     { value: "Binding (Lapsing)", label: "Binding (Lapsing)" },
    //     { value: "Non-Binding", label: "Non-Binding" },
    //     {
    //       value: "Legal Personal Representative (Your Estate)",
    //       label: "Legal Personal Representative (Your Estate)",
    //     },
    //   ],
    //   callBack: true,
    //   func: (values, setFieldValue, currentInput, stakeHolder, index) => {
    //     handleNominationTypeChange(
    //       currentInput.value,
    //       index,
    //       setFieldValue,
    //       values
    //     );
    //   },
    // },

    {
      title: "Relationship Status",
      dataIndex: "relationshipStatus",
      key: "relationshipStatus",
      type: "select",
      options: RelationshipOptions,
      width: 200,
      callBack: true,
      func: (values, setFieldvalue, currentInput, stakeHolder) => {
        const index = parseFloat(stakeHolder.replace(/[^0-9-]+/g, ""));
        const BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");

        if (
          currentInput.value === "Legal Personal Representive (Your Estate)"
        ) {
          setFieldvalue(`${BaseKey}[${index}].beneficiaryName`, "Your Estate");
        }
      },
    },
    {
      title: "Beneficiary Name",
      dataIndex: "beneficiaryName",
      key: "beneficiaryName",
      type: "text",
      width: 200,
    },
    {
      title: "DOB",
      dataIndex: "DOB",
      key: "DOB",
      type: "antdate",
      width: 150,
      disabled: (values, stakeHolder) => {
        const index = parseFloat(stakeHolder.replace(/[^0-9-]+/g, ""));
        const BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");

        return (
          values?.[BaseKey]?.[index]?.relationshipStatus ===
          "Legal Personal Representive (Your Estate)"
        );
      },
    },

    {
      title: "Share of Benefit",
      dataIndex: "shareBenefit",
      key: "shareBenefit",
      type: "number-toPercent",
      width: 150,
      callBack: true,
      func: (values, setFieldValue, currentInput, stakeHolder) => {
        // stakeHolder expected like "BeneficiariesDetails[2]"
        const idxMatch = (stakeHolder || "").match(/\[(\d+)\]/);
        const index = idxMatch ? parseInt(idxMatch[1], 10) : 0;

        // parse numeric value from input (handles "50%", "50.00%" or "50")
        const rawEntered = (currentInput.value || "")
          .toString()
          .replace(/[^0-9.-]+/g, "");
        const entered = Math.max(0, parseFloat(rawEntered) || 0);

        const arr = values.BeneficiariesDetails || [];

        // sum all other rows
        let otherSum = 0;
        arr.forEach((row, i) => {
          if (i === index) return;
          const r = (row?.shareBenefit || "")
            .toString()
            .replace(/[^0-9.-]+/g, "");
          otherSum += parseFloat(r) || 0;
        });

        // allowed remaining percent for this row
        const allowed = Math.max(0, 100 - otherSum);

        // final value should not exceed allowed
        const finalValue = Math.min(entered, allowed);

        // set formatted value (e.g. "50.00%")
        setFieldValue(
          `BeneficiariesDetails[${index}].shareBenefit`,
          `${finalValue.toFixed(2)}%`
        );
      },
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange, handleBlur, handleInput }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        const dataRows = useMemo(() => {
          setRelationshipOptions(
            getRelationshipOptions(values?.nominationType)
          );
          const num = Number(values.NumberOfMap) || 0;
          return Array.from({ length: num }, (_, i) => ({
            key: `BeneficiariesDetails.${i}`,
            stakeHolder: `BeneficiariesDetails[${i}]`,
            owner: i + 1,
            relationshipStatus:
              values.BeneficiariesDetails?.[i]?.relationshipStatus || "",
            beneficiaryName:
              values.BeneficiariesDetails?.[i]?.beneficiaryName || "",
            DOB: values.BeneficiariesDetails?.[i]?.DOB || "",
            shareBenefit: values.BeneficiariesDetails?.[i]?.shareBenefit || "",
          }));
        }, [values.NumberOfMap, values.BeneficiariesDetails]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2  mb-2">
                    <p className="text-end mb-0">Nomination Type</p>
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
                          id="nominationType"
                          name="nominationType"
                          className="w-100 h-100"
                          placeholder="Select"
                          size="large"
                          value={values.nominationType || undefined}
                          onChange={(value) => {
                            setFieldValue("nominationType", value);
                          }}
                          onBlur={handleBlur}
                          getPopupContainer={(triggerNode) =>
                            triggerNode.parentNode
                          }
                        >
                          <Option key={""} value={""}>
                            Select
                          </Option>
                          <Option
                            key={"Binding (Non-Lapsing)"}
                            value={"Binding (Non-Lapsing)"}
                          >
                            Binding (Non-Lapsing)
                          </Option>
                          <Option
                            key={"Binding (Lapsing)"}
                            value={"Binding (Lapsing)"}
                          >
                            Binding (Lapsing)
                          </Option>
                          <Option key={"Non Binding "} value={"Non Binding "}>
                            Non Binding{" "}
                          </Option>
                        </Select>
                      </ConfigProvider>
                    </div>

                    <p className="text-end mb-0">
                      {props.modalObject.question || "How many beneficiaries?"}
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
                          {Array.from({ length: 10 }, (_, i) => (
                            <Option key={i} value={i + 1}>
                              {i + 1}
                            </Option>
                          ))}
                        </Select>
                      </ConfigProvider>
                    </div>
                  </div>

                  {values.NumberOfMap && (
                    <div className="mt-2 All_Client reportSection">
                      <AntdTable
                        columns={columns}
                        data={dataRows}
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        pagination={true} // 🚫 pagination removed
                        isEditing={props?.isEditing}
                        setIsEditing={props?.setIsEditing}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Row>
            <button type="submit" style={{ display: "none" }}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Beneficiaries;
