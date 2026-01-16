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
  let PageLimit =
    props.modalObject.title === "SMSF_Investment Properties" ? 5 : 10;

  const [title] = useState(() => {
    let currentTitle = props.modalObject.title;
    if (currentTitle.includes("_")) {
      currentTitle = currentTitle.split("_").slice(1).join("_");
    }
    return currentTitle;
  });

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let [client, setClient] = useState(() => {
    switch (props.modalObject.key) {
      case "investmentPropertyDetails":
        return "client";
        break;

      case "SMSFInvestmentProperties":
        return "SMSF";
        break;

      case "familyInvestmentProperties":
        return "trust";
        break;
    }
  });

  let FormulaSetting = (values, setFieldValue, currentInput, stakeHolder) => {
    let index = parseFloat(stakeHolder.replace(/[^0-9-]+/g, ""));
    let BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");

    // Safely parse and set default to 0 if values are undefined or invalid
    let ClientOwnership = values?.[BaseKey]?.[index]?.clientOwnership
      ? parseFloat(
          values?.[BaseKey]?.[index]?.clientOwnership.replace(/[^0-9.-]+/g, "")
        )
      : 0;

    let PartnerOwnership = values?.[BaseKey]?.[index]?.partnerOwnership
      ? parseFloat(
          values?.[BaseKey]?.[index]?.partnerOwnership.replace(/[^0-9.-]+/g, "")
        )
      : 0;

    // Update values based on the current input name
    switch (currentInput.name) {
      case `${stakeHolder}clientOwnership`:
        ClientOwnership =
          parseFloat((currentInput.value || 0).replace(/[^0-9.-]+/g, "")) || 0; // Default to 0 if invalid

        PartnerOwnership =
          100 - (ClientOwnership > 100 ? 100 : ClientOwnership);

        setFieldValue(
          `${stakeHolder}partnerOwnership`,
          toPercentage(isNaN(PartnerOwnership) ? 0 : PartnerOwnership)
        );

        break;
      case `${stakeHolder}partnerOwnership`:
        PartnerOwnership =
          parseFloat((currentInput.value || 0).replace(/[^0-9.-]+/g, "")) || 0; // Default to 0 if invalid

        ClientOwnership =
          100 - (PartnerOwnership > 100 ? 100 : PartnerOwnership);

        setFieldValue(
          `${stakeHolder}clientOwnership`,
          toPercentage(isNaN(ClientOwnership) ? 0 : ClientOwnership)
        );
        break;
      default:
        console.log("No matching input found for the case");
        break;
    }
  };

  let [SwitchFlag, setSwitchFlag] = useState(false);

  let [investmentPropertyDetails, setinvestmentPropertyDetails] = useState({
    client: [],
    partner: [],
    joint: [],
  });

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
    const dataSet = investmentPropertyDetails?.[client];

    const hasData = Array.isArray(dataSet) && dataSet.length > 0;

    // 🔹 Control editing mode explicitly
    props.setIsEditing(!hasData);

    if (!hasData) {
      // No DB data → enable editing
      setFieldValue("NumberOfMap", "");
      return;
    }

    // DB data exists → disable editing
    setFieldValue("NumberOfMap", dataSet.length.toString());

    dataSet.forEach((data, i) => {
      setFieldValue(
        `investmentProperties[${i}].PropertyAddress`,
        data.PropertyAddress || ""
      );
      setFieldValue(
        `investmentProperties[${i}].postcodeSuburb`,
        data.postcodeSuburb || ""
      );
      setFieldValue(
        `investmentProperties[${i}].CurrentValue`,
        data.CurrentValue || ""
      );
      setFieldValue(`investmentProperties[${i}].CostBase`, data.CostBase || "");
      if (props.modalObject.key == "investmentPropertyDetails") {
        setFieldValue(
          `investmentProperties[${i}].clientOwnership`,
          data.clientOwnership || ""
        );
        setFieldValue(
          `investmentProperties[${i}].partnerOwnership`,
          data.partnerOwnership || ""
        );
      }

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
        data.propertyLoanDetails || "$0"
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
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  const onSubmit = async (values) => {
    try {
      console.log(values, "values on submit");

      // Extract investment properties from form
      const investmentProperties = (values.investmentProperties || []).slice(
        0,
        values.NumberOfMap
      );
      const numberOfMaps =
        parseInt(values.NumberOfMap, 10) || investmentProperties.length || 0;

      // Create new array for backend
      const newEntries = investmentProperties
        .slice(0, numberOfMaps)
        .map((item) => ({
          PropertyAddress: item.PropertyAddress || "",
          postcodeSuburb: item.postcodeSuburb || "",
          CurrentValue: item.CurrentValue || "",
          CostBase: item.CostBase || "",
          clientOwnership: SwitchFlag ? item.clientOwnership || "" : "",
          partnerOwnership: SwitchFlag ? item.partnerOwnership || "" : "",
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
            (parseFloat(entry.propertyLoanDetails?.replace(/[^0-9.-]+/g, "")) ||
              0),
          0
        )
      );

      const payload = {
        clientFK: localStorage.getItem("UserID"),
        [client]: newEntries,
        propertyPortfolio: TotalMarketValue,
        totalDebt: TotalLoan,
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
    {
      title: "Property Address",
      dataIndex: "PropertyAddress",
      key: "PropertyAddress",
      type: "textarea",
      placeholder: "PropertyAddress",
      width: 200,
    },
    {
      title: "Postcode/Suburb",
      dataIndex: "postcodeSuburb",
      type: "postcode-antd",
      key: "postcodeSuburb",
      width: 230,
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

    // ✅ CONDITIONAL COLUMNS (FIXED)
    ...(client === "client"
      ? [
          {
            title: "Client Ownership",
            placeholder: "Client Ownership",
            dataIndex: "clientOwnership",
            key: "clientOwnership",
            type: "number-toPercent",
            width: 200,
            callBack: true,
            func: FormulaSetting,
          },
          {
            title: "Partner Ownership",
            placeholder: "Partner Ownership",
            dataIndex: "partnerOwnership",
            key: "partnerOwnership",
            type: "number-toPercent",
            width: 200,
            callBack: true,
            func: FormulaSetting,
          },
        ]
      : []),

    {
      title: "Loan Balance",
      dataIndex: "propertyLoanDetails",
      key: "propertyLoanDetails",
      disabled: true,
      type: "number-toComma-Modal",
      placeholder: "Loan Balance",
      width: 200,
      func: handleInnerModal,
      innerModalTitle:
        props.modalObject.title == "SMSF_Investment Properties"
          ? "SMSF_Property Loan Details"
          : "Property Loan Details",
    },
    {
      title: "Rent per Week",
      dataIndex: "weeklyRentalIncome",
      key: "weeklyRentalIncome",
      type: "number-toComma",
      placeholder: "Rent per Week",
      width: 200,
    },
    {
      title: "Expenses",
      dataIndex: "incomeExpenses",
      key: "incomeExpenses",
      type: "number-toComma-Modal",
      disabled: true,
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
            Array.from({ length: num }, (_, i) => {
              setFieldValue(
                `investmentProperties[${i}].` + "propertyLoanDetails",
                values.investmentProperties?.[i]?.propertyLoanDetails || "$0"
              );
            });
            return Array.from({ length: num }, (_, i) => ({
              key: `investmentProperties.${i}`,
              stakeHolder: `investmentProperties[${i}]`,
              PropertyAddress:
                values.investmentProperties?.[i]?.PropertyAddress || "",
              postcodeSuburb:
                values.investmentProperties?.[i]?.postcodeSuburb || "",
              CurrentValue:
                values.investmentProperties?.[i]?.CurrentValue || "",
              CostBase: values.investmentProperties?.[i]?.CostBase || "",
              clientOwnership:
                values.investmentProperties?.[i]?.clientOwnership || "",
              partnerOwnership:
                values.investmentProperties?.[i]?.partnerOwnership || "",
              propertyLoanDetails:
                values.investmentProperties?.[i]?.propertyLoanDetails || "$0",
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
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                    <p
                      className="text-end mt-3"
                      onClick={() => {
                        console.log(values);
                      }}
                    >
                      Number of {title} :
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
                          disabled={!props?.isEditing}
                          value={values.NumberOfMap || undefined}
                          onChange={(value) => {
                            setFieldValue("NumberOfMap", value);
                          }}
                          onBlur={handleBlur}
                          getPopupContainer={(triggerNode) =>
                            triggerNode.parentNode
                          }
                        >
                          {Array.from({ length: PageLimit || 10 }, (_, i) => (
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
                        deleteButton={true}
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
