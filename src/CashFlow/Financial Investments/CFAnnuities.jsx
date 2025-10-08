import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CreatableMultiSelectField } from "../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
  toCommaAndDollar,
} from "../../Components/Assets/Api/Api";
import { Row, Table } from "react-bootstrap";
import {
  CashFlowData,
  CashFlowScenarioData,
  defaultUrl,
  QuestionDetail,
} from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import InputOverride from "./InputOverride";
import RegularContributions from "./RegularContributions";
import RCV from "./RCV";
import DeductibleAmount from "./DeductibleAmount";

const CFAnnuities = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

  let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));
  let DefaultUrl = useRecoilValue(defaultUrl);

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let annuitiesIssues =
    Object.keys(questionDetail.annuitiesIssues || {}).length > 0
      ? questionDetail.annuitiesIssues
      : {
          client: [],
          partner: [],
          joint: [],
        }; // Use an empty object as default if incomeFromOverseasPension is undefined

  let initialValues = {};

  const fillInitialValues = (setFieldValue) => {
    try {
      // Set the object and API key
      setObjAndAPIKey(props.modalObject.key);

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      // Helper function to update field values
      const updateFields = (data, prefix) => {
        if (!data || Object.keys(data).length === 0) return;

        const fields = {
          [`originalInvestmentAmount_${prefix}`]:
            data.originalInvestmentAmount || "",
          [`sourceOfFunds_${prefix}`]:
            data.sourceOfFunds || data.sourceFunds || "",
          [`annuityType_${prefix}`]: data.annuityType || "",
          [`IsThisReversionaryAnnuity_${prefix}`]:
            data.IsThisReversionaryAnnuity || "No",
          [`RCV_${prefix}`]: data.RCV || "No",
          [`RCVObj_${prefix}`]: data.RCVObj || {},
          [`includeFromYear_${prefix}`]: data.includeFromYear || "1",
          [`term_${prefix}`]: data.term || 30,
          [`yearsUntilMaturity_${prefix}`]: data.yearsUntilMaturity || "30",
          [`annualInflationRate_${prefix}`]: data.annualInflationRate || "",
          [`annualPayment_${prefix}`]: data.annualPayment || "",
          [`deductibleAmount_${prefix}`]: data.deductibleAmount || "No",
          [`deductibleAmountObj_${prefix}`]: data.deductibleAmountObj || {},
        };

        Object.entries(fields).forEach(([key, value]) => {
          setFieldValue(key, value);
        });
      };

      // Handle discoveryForm scenario
      if (
        scenarioObj?.selectedSource === "discoveryForm" &&
        annuitiesIssues &&
        annuitiesIssues._id
      ) {
        if (annuitiesIssues.client.length > 0) {
          annuitiesIssues.client.forEach((clientData, index) => {
            updateFields(clientData, index);
          });
        }

        if (UserStatus === "Married" && annuitiesIssues?.partner?.length > 0) {
          annuitiesIssues.partner.forEach((partnerData, index) => {
            updateFields(partnerData, index);
          });
        }
      } else {
        // Handle cashFlowData scenario
        const cashFlowDetails = CashFlowScenarioDataObj?.[objAndAPIKey];

        if (cashFlowDetails) {
          setFieldValue(
            "numberOfProperties",
            cashFlowDetails[props.modalObject.Input].length || ""
          );

          if (
            props.modalObject.Input == "client" &&
            cashFlowDetails.client.length > 0
          ) {
            cashFlowDetails.client.forEach((clientData, index) => {
              updateFields(clientData, index);
            });
          }

          if (
            UserStatus === "Married" &&
            props.modalObject.Input == "partner" &&
            cashFlowDetails?.partner?.length > 0
          ) {
            cashFlowDetails.partner.forEach((partnerData, index) => {
              updateFields(partnerData, index);
            });
          }
        }
      }

      // Additional data from cashFlowData
      if (cashFlowData?.[objAndAPIKey]?._id) {
        const cashFlowDataDetails = cashFlowData[objAndAPIKey];

        setFieldValue(
          "numberOfProperties",
          cashFlowDataDetails[props.modalObject.Input].length || ""
        );

        if (
          props.modalObject.Input == "client" &&
          cashFlowDataDetails.client.length > 0
        ) {
          cashFlowDataDetails.client.forEach((clientData, index) => {
            updateFields(clientData, index);
          });
        }

        if (
          UserStatus === "Married" &&
          props.modalObject.Input == "partner" &&
          cashFlowDataDetails?.partner?.length > 0
        ) {
          cashFlowDataDetails.partner.forEach((partnerData, index) => {
            updateFields(partnerData, index);
          });
        }
      }
    } catch (error) {
      console.error("Error in fillInitialValues:", error);
    }
  };

  let onSubmit = async (values) => {
    const numberOfEntries = parseInt(values.numberOfProperties, 10);
    const newEntries = [];

    for (let i = 0; i < numberOfEntries; i++) {
      const newEntry = {};

      rowConfig.forEach((config) => {
        if (config.name) {
          newEntry[config.name] = values[`${config.name}_${i}`] || "";
        }
        if (config?.key) {
          newEntry[config.key] = values[`${config.key}_${i}`] || "";
        }
      });

      newEntries.push(newEntry);
    }

    let obj = {
      [props.modalObject.Input]: newEntries, // Correct way to dynamically set key
      scenarioFK: JSON.parse(localStorage.getItem("ScenarioObj"))._id,
      numberOfProperties: numberOfEntries,
    };

    // Calculate clientTotal based on `annualPayment`
    obj[props.modalObject.Input + "Total"] = toCommaAndDollar(
      newEntries.reduce(
        (total, entry) =>
          total + parseFloat(entry.annualPayment?.replace(/[^0-9.-]+/g, "")) ||
          0,
        0
      )
    );

    if (cashFlowData?.[objAndAPIKey]?._id) {
      const cashFlowDataDetails = cashFlowData[objAndAPIKey];

      console.log(
        cashFlowDataDetails,
        cashFlowDataDetails[props.modalObject.Input],
        props.modalObject.Input
      );

      // Determine the input type and set values accordingly
      if (props.modalObject.Input === "partner") {
        obj.client = cashFlowDataDetails?.client || []; // Ensure client is empty
        obj.clientTotal = cashFlowDataDetails?.clientTotal || "0$"; // Ensure clientTotal is empty
      } else {
        obj.partner = cashFlowDataDetails?.partner || []; // Ensure partner is empty
        obj.partnerTotal = cashFlowDataDetails?.partnerTotal || "0$"; // Ensure partnerTotal is empty
      }
    }

    console.log("Final Object:", JSON.stringify(obj));

    // return false;

    const bankAccountArray = cashFlowData?.[objAndAPIKey]?._id || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/CF/${objAndAPIKey}/Add`, obj);
      } else {
        res = await PatchAxios(
          `${DefaultUrl}/api/CF/${objAndAPIKey}/Update`,
          obj
        );
      }

      if (res) {
        console.log("API Returns Data", res);

        const updatedData = {
          ...cashFlowData,
          [objAndAPIKey]: res,
        };

        setCashFlowData(updatedData);
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        `Data of "${props.modalObject.title}" is Saved`
      );

      if (props.flagState) {
        props.setFlagState(false);
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Data of "${props.modalObject.title}" is not Saved. Please try again.`
      );
    }
  };

  let handleInnerModal = (title, values, key) => {
    // console.log(title, values, key);
    setModalObject({
      title,
      values,
      key,
      stakeHolder: props.modalObject.Input,
      sourceObj: props.modalObject,
      cal: true,
    });
    setFlagState(true);
  };

  let sourceOfFundsOptions = [
    { value: "Ordinary", label: "Ordinary" },
    { value: "Super", label: "Super" },
  ];
  let annuityTypeOptions = [
    { value: "Short-Term", label: "Short-Term" },
    { value: "Long-Term", label: "Long-Term" },
    { value: "Life-Time", label: "Life-Time" },
  ];

  const indexation = Array.from({ length: 21 }, (_, i) => ({
    value: (i * 0.5).toFixed(2) + "%",
    label: (i * 0.5).toFixed(2) + "%",
  }));

  const yearsIncludedArray = Array.from({ length: 31 }, (_, i) => {
    return {
      value: i.toString(),
      label: ("Year " + i).toString(),
    };
  });

  const yearsIncludedArrayWithExisting = Array.from({ length: 32 }, (_, i) => {
    if (i === 0) {
      return {
        value: "Existing",
        label: "Existing",
      };
    }
    return {
      value: (i - 1).toString(),
      label: ("Year " + (i - 1)).toString(),
    };
  });

  const [rowConfig, setRowConfig] = useState(() => {
    let OriginalArray = [
      {
        value: "1",
        type: "plainText2.0",
      },
      {
        name: "originalInvestmentAmount",
        type: "number-toComma",
        placeholder: "Original Investment Amount",
      },
      {
        name: "sourceOfFunds",
        type: "select",
        options: sourceOfFundsOptions,
      },
      {
        name: "annuityType",
        type: "select",
        options: annuityTypeOptions,
      },
      {
        name: "IsThisReversionaryAnnuity",
        type: "yesno",
        placeholder: "Is this a Reversionary Annuity",
      },
      {
        name: "RCV",
        type: "yesnoModal",
        placeholder: "RCV",
        callBack: true,
        key: "RCVObj",
        innerModalTitle: "RCV",
        func: handleInnerModal,
      },
      {
        name: "includeFromYear",
        type: "select",
        options: yearsIncludedArrayWithExisting,
        placeholder: "Include From Year",
      },
      {
        name: "term",
        type: "select",
        options: yearsIncludedArray,
        placeholder: "Term",
      },
      {
        name: "yearsUntilMaturity",
        type: "select",
        options: yearsIncludedArray,
        placeholder: "Years Until Maturity",
      },
      {
        name: "annualInflationRate",
        type: "select",
        options: indexation,
        placeholder: "Annual Inflation Rate",
      },
      {
        name: "annualPayment",
        type: "number-toComma",
        placeholder: "Annual Payment",
      },
      {
        name: "deductibleAmount",
        type: "yesnoModal",
        placeholder: "Deductible Amount",
        callBack: true,
        key: "deductibleAmountObj",
        innerModalTitle: "Deductible Amount",
        func: handleInnerModal,
      },
    ];

    return OriginalArray;
  });

  const componentMapping = {
    "Input Override": <InputOverride />,
    "Regular Contributions": <RegularContributions />,
    RCV: <RCV />,
    "Deductible Amount": <DeductibleAmount />,
  };

  const ModalContent = (obj) => {
    return componentMapping[obj.title] || null;
  };

  let handleInput = (e, setFieldValue) => {
    let value = e.target.value > 3 ? 3 : e.target.value;
    setFieldValue(e.target.id, value);
  };

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

        return (
          <Form>
            <Row>
              <InnerModal
                modalObject={modalObject}
                setFieldValue={setFieldValue}
                setFlagState={setFlagState}
                flagState={flagState}
              >
                {ModalContent(modalObject)}
              </InnerModal>

              <div className="col-md-12">
                <div className="d-flex justify-content-center align-items-center gap-4">
                  <label htmlFor="" className="text-end ">
                    Number of Annuities does{" "}
                    {RenderName(props.modalObject.Input)} have :
                  </label>

                  <div style={{ minWidth: "5%", maxWidth: "10%" }}>
                    <Field
                      type="number"
                      id="numberOfProperties"
                      name="numberOfProperties"
                      className="form-control inputDesignDoubleInput"
                      onChange={(e) => handleInput(e, setFieldValue)}
                    />
                  </div>
                </div>
              </div>

              {values.numberOfProperties > 0 && (
                <div className="mt-4">
                  <Table striped bordered responsive hover>
                    <thead>
                      <tr>
                        <th
                          onClick={() => {
                            console.log(values);
                          }}
                        >
                          No#
                        </th>
                        <th>Original Investment Amount</th>
                        <th>Source of Funds</th>
                        <th>Annuity Type</th>
                        <th>Is this a Reversionary Annuity</th>
                        <th>RCV</th>
                        <th>Include From Year</th>
                        <th>Term</th>
                        <th>Years Until Maturity</th>
                        <th>Annual Inflation Rate</th>
                        <th>Annual Payment</th>
                        <th>Deductible Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({
                        length: values.numberOfProperties,
                      }).map((_, index) => {
                        // Ensure each rowConfig object has a name before concatenating the index
                        const updatedRowConfig = rowConfig.map((row) => ({
                          ...row,
                          name: row.name ? `${row.name}_${index}` : row.name,
                          key: row.key ? `${row.key}_${index}` : row.key,
                          value: row.value ? index + 1 : row.value,
                        }));

                        return (
                          <DynamicTableRow
                            rowConfig={updatedRowConfig}
                            values={values}
                            setFieldValue={setFieldValue}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            handleInnerModal={handleInnerModal}
                          />
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              )}
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CFAnnuities;
