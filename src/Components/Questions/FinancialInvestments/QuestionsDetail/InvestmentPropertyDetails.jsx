import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { Button, InputGroup, Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../../Store/Store";
import {
  handleInputBlur,
  handleInputChange,
  handleInputFocus,
  handleInputKeyDown,
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  toCommaAndDollar,
  toPercentage,
} from "../../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import InnerModal from "./InnerModal";
import InvestmentPropertyLoan from "./InvestmentPropertyLoan";
import QuestionIncomeExpanse from "./QuestionIncomeExpanse";
import { FaRegBuilding } from "react-icons/fa6";
import { ConfigProvider, Select } from "antd";

const AntDTableHOC = DynamicTableForInputsSection("antd");
const { Option } = Select;

const InvestmentPropertyDetails = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let [SwitchFlag, setSwitchFlag] = useState(false);

  let [investmentPropertyDetails, setinvestmentPropertyDetails] = useState({
    client: [],
    partner: [],
    joint: [],
  });

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

  // let investmentPropertyDetails = Object.keys(questionDetail[props.modalObject.key]).length > 0 ? questionDetail[props.modalObject.key] : {
  //     client: [],
  //     partner: [],
  //     joint: [],

  // }; // Use an empty object as default if investmentPropertyDetails is undefined

  let initialValues = { NumberOfMap: "" };

  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    console.log(investmentPropertyDetails[props.modalObject.key]);
    if (
      props.modalObject.key === "investmentPropertyDetails" ||
      props.modalObject.key === "familyInvestmentProperties"
    ) {
      setSwitchFlag(true);
    }

    let data =
      Object.keys(questionDetail[props.modalObject.key] || {}).length > 0
        ? questionDetail[props.modalObject.key]
        : {
          client: [],
          partner: [],
          joint: [],
        };

    setinvestmentPropertyDetails(data);

    if (data[props.modalObject.Input] && data[props.modalObject.Input].length) {
      let arr = [];

      for (let i = 0; i < data[props.modalObject.Input].length; i++) {
        arr.push("");
      }

      setDynamicFields(arr);
    }

    // console.log(props.modalObject, data)
  }, [props.modalObject]);

  const fillInitialValues = (setFieldValue) => {
    const dataSet = investmentPropertyDetails?.client;
    console.log(dataSet, "dataSet");

    if (Array.isArray(dataSet) && dataSet.length > 0) {
      // Set number of maps
      console.log(dataSet.length, "dataSet.length");
      setFieldValue("NumberOfMap", dataSet.length.toString());

      // Loop through each entry and set form fields
      dataSet.forEach((data, i) => {
        setFieldValue(
          `investmentProperties[${i}].PropertyAddress`,
          data.PropertyAddress || ""
        );
        setFieldValue(
          `investmentProperties[${i}].CurrentValue`,
          data.CurrentValue || ""
        );
        setFieldValue(
          `investmentProperties[${i}].CostBase`,
          data.CostBase || ""
        );
        setFieldValue(
          `investmentProperties[${i}].ClientOwnership`,
          data.ClientOwnership || ""
        );
        setFieldValue(
          `investmentProperties[${i}].PartnerOwnership`,
          data.PartnerOwnership || ""
        );
        setFieldValue(
          `investmentProperties[${i}].propertyLoanDetails`,
          data.propertyLoanDetails || ""
        );
        setFieldValue(
          `investmentProperties[${i}].propertyLoanDetailsArray`,
          data.propertyLoanDetailsArray || ""
        );
        setFieldValue(
          `investmentProperties[${i}].weeklyRentalIncome`,
          data.weeklyRentalIncome || ""
        );
        setFieldValue(
          `investmentProperties[${i}].incomeExpenses`,
          data.incomeExpenses || ""
        );
        setFieldValue(
          `investmentProperties[${i}].incomeExpensesArray`,
          data.expensesArray || ""
        );
      });
    } else {
      // If no data found, clear NumberOfMap
      setFieldValue("NumberOfMap", "");
    }
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  const onSubmit = async (values) => {
    try {
      console.log(values, "values on submit");

      // Extract investment properties from form
      const investmentProperties = values?.investmentProperties || [];
      const numberOfMaps =
        parseInt(values.NumberOfMap, 10) || investmentProperties.length || 0;

      // Create new array for backend
      const newEntries = investmentProperties
        .slice(0, numberOfMaps)
        .map((item) => ({
          PropertyAddress: item.PropertyAddress || "",
          CurrentValue: item.CurrentValue || "",
          CostBase: item.CostBase || "",
          ClientOwnership: SwitchFlag ? item.ClientOwnership || "" : "",
          PartnerOwnership: SwitchFlag ? item.PartnerOwnership || "" : "",
          propertyLoanDetails: item.propertyLoanDetails || "",
          propertyLoanDetailsArray: item.propertyLoanDetailsArray || "",
          weeklyRentalIncome: item.weeklyRentalIncome || "",
          incomeExpenses: item.incomeExpenses || "",
          expensesArray: item.incomeExpensesArray || "",
        }));

      const TotalMarketValue = toCommaAndDollar(
        newEntries.reduce(
          (total, entry) =>
            total +
            (parseFloat(entry.CurrentValue?.replace(/[^0-9.-]+/g, "")) || 0),
          0
        )
      );
       const TotalLoan = toCommaAndDollar(
        newEntries.reduce(
          (total, entry) =>
            total +
            (parseFloat(entry.propertyLoanDetails?.replace(/[^0-9.-]+/g, "")) || 0),
          0
        )
      );

      let client = "";


      switch (key) {
        case "investmentPropertyDetails":
          client = "client";
          // clientTotalKey = "totalMarketValue";
          break;

        case "SMSFInvestmentProperties":
          client = "smsf";
          // clientTotalKey = "smsfTotal";
          break;

        case "familyInvestmentProperties":
          client = "trust";
          // clientTotalKey = "trustTotal";
          break;
      }

      const payload = {
        clientFK: localStorage.getItem("UserID"),
        [client]:newEntries,
        totalMarketValue: TotalMarketValue, 
        totalLoanAmount: TotalLoan, 
      };

      //!  just need to chnage above code

      console.log(payload, "Final Payload for Backend");

      // Decide POST or PATCH
      const apiUrl = `${DefaultUrl}/api/${props.modalObject.key}`;
      const existingRecord = investmentPropertyDetails?.clientFK;

      const res = existingRecord
        ? await PatchAxios(`${apiUrl}/Update`, payload)
        : await PostAxios(`${apiUrl}/Add`, payload);

      if (res) {
        console.log(res);
        setQuestionDetail({
          ...questionDetail,
          [props.modalObject.key]: res,
        });

        openNotificationSuccess(
          "success",
          "topRight",
          "Success Notification",
          `Data of "${props.modalObject.title}" is saved successfully`
        );
      }

      // reset flag
      if (props.flagState) {
        props.setFlagState(false);
        props.setIsEditing(!props.isEditing);
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Data of "${props.modalObject.title}" could not be saved. Please try again.`
      );
    }
  };

  let FormulaSetting = (values, setFieldValue, currentInput, stakeHolder) => {
    // Extract integer index from the input name
    let index = currentInput.name.match(/\d+/);

    if (index) {
      index = index[0]; // Extract the first match from the array

      // Safely parse and set default to 0 if values are undefined or invalid
      let ClientOwnership = values["ClientOwnership" + index]
        ? parseFloat(
          values["ClientOwnership" + index].replace(/[^0-9.-]+/g, "")
        )
        : 0;
      let PartnerOwnership = values["PartnerOwnership" + index]
        ? parseFloat(
          values["PartnerOwnership" + index].replace(/[^0-9.-]+/g, "")
        )
        : 0;

      // Update values based on the current input name
      switch (currentInput.name) {
        case `ClientOwnership${index}`:
          ClientOwnership =
            parseFloat((currentInput.value || 0).replace(/[^0-9.-]+/g, "")) ||
            0; // Default to 0 if invalid

          PartnerOwnership =
            100 - (ClientOwnership > 100 ? 100 : ClientOwnership);

          setFieldValue(
            `PartnerOwnership${index}`,
            toPercentage(isNaN(PartnerOwnership) ? 0 : PartnerOwnership)
          );

          break;
        case `PartnerOwnership${index}`:
          PartnerOwnership =
            parseFloat((currentInput.value || 0).replace(/[^0-9.-]+/g, "")) ||
            0; // Default to 0 if invalid

          ClientOwnership =
            100 - (PartnerOwnership > 100 ? 100 : PartnerOwnership);

          setFieldValue(
            `ClientOwnership${index}`,
            toPercentage(isNaN(ClientOwnership) ? 0 : ClientOwnership)
          );
          break;
        default:
          console.log("No matching input found for the case");
          break;
      }
    } else {
      console.error("No valid index found in currentInput.name");
    }
  };

  let handleInnerModal = (innerModalTitle, values, key, stakeHolder) => {
    console.log("handleInnerModal: ", innerModalTitle);
    let ParentModal = props.modalObject.title;
    setModalObject({
      title: innerModalTitle,
      innerModalTitle,
      values,
      key,
      stakeHolder,
      ParentModal,
    });
    setFlagState(true);
  };

  const columns = [
    {
      title: "No#",
      dataIndex: "index",
      key: "owner",
      render: (_, __, i) => i + 1,
      width: 60,
    },
    // {
    //   title: "Owner",
    //   dataIndex: "owner",
    //   key: "owner",
    //   type: "text", // simple static text or could be DynamicFormField if editable
    //   placeholder: "Enter Owner Name",
    //   width: 150,
    // },
    {
      title: "Property Address",
      dataIndex: "PropertyAddress",
      key: "PropertyAddress",
      type: "text",
      placeholder: "PropertyAddress",
      width: 200,
    },
    {
      title: "Current Value",
      dataIndex: "CurrentValue",
      key: "CurrentValue",
      type: "number-toComma",
      placeholder: "Current Value",
      width: 200,
    },
    {
      title: "Cost Base",
      dataIndex: "CostBase",
      key: "CostBase",
      type: "number-toComma",
      placeholder: "Cost Base",
      width: 200,
    },
    {
      title: "Loan Balance",
      dataIndex: "propertyLoanDetails",
      key: "propertyLoanDetails",
      type: "number-toComma-Modal",
      placeholder: "Loan Balance",
      width: 200,
      func: handleInnerModal,
      innerModalTitle: "Property Loan Details",
    },
    {
      title: "Weekly Rental Income",
      dataIndex: "weeklyRentalIncome",
      key: "weeklyRentalIncome",
      type: "number-toComma",
      placeholder: "Weekly Rental Income",
      width: 200,
    },
    {
      title: "Expenses",
      dataIndex: "incomeExpenses",
      key: "incomeExpenses",
      type: "number-toComma-Modal",
      placeholder: "Expenses",
      width: 200,
      func: handleInnerModal,
      innerModalTitle: "Expense Details",
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleBlur, handleChange }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [investmentPropertyDetails]);

        const tableData = useMemo(() => {
          const num = Number(values.NumberOfMap) || 0;
          if (num > 0) {
            return Array.from({ length: num }, (_, i) => ({
              key: `investmentProperties.${i}`,
              stakeHolder: `investmentProperties[${i}]`,
              PropertyAddress:
                values.investmentProperties?.[i]?.PropertyAddress || "",
              CurrentValue:
                values.investmentProperties?.[i]?.CurrentValue || "",
              CostBase: values.investmentProperties?.[i]?.CostBase || "",
              propertyLoanDetails:
                values.investmentProperties?.[i]?.propertyLoanDetails || "",
              weeklyRentalIncome:
                values.investmentProperties?.[i]?.weeklyRentalIncome || "",
              incomeExpenses:
                values.investmentProperties?.[i]?.incomeExpenses || "",
            }));
          }
          return [];
        }, [values.NumberOfMap, values.investmentProperties]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                    <p
                      className="text-end mt-3"
                      onClick={() => {
                        console.log(values);
                      }}
                    >
                      Number of {props.modalObject.title} :
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

                  <InnerModal
                    modalObject={modalObject}
                    setFieldValue={setFieldValue}
                    setFlagState={setFlagState}
                    flagState={flagState}
                    setIsEditing={props.setIsEditing}
                  >
                    {modalObject.key === "propertyLoanDetails" ? (
                      <InvestmentPropertyLoan />
                    ) : modalObject.key === "incomeExpenses" ? (
                      <QuestionIncomeExpanse />
                    ) : (
                      ""
                    )}
                  </InnerModal>

                  {values.NumberOfMap > 0 && (
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

export default InvestmentPropertyDetails;
