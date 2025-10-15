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

  // let investmentPropertyDetails = Object.keys(questionDetail[props.modalObject.index]).length > 0 ? questionDetail[props.modalObject.index] : {
  //     client: [],
  //     partner: [],
  //     joint: [],

  // }; // Use an empty object as default if investmentPropertyDetails is undefined

  let initialValues = { NumberOfMap: "" };

  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    console.log(investmentPropertyDetails[props.modalObject.Input]);
    if (
      props.modalObject.index === "investmentPropertyDetails" ||
      props.modalObject.index === "familyInvestmentProperties"
    ) {
      setSwitchFlag(true);
    }

    let data =
      Object.keys(questionDetail[props.modalObject.index] || {}).length > 0
        ? questionDetail[props.modalObject.index]
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
    // console.log(
    //   props.modalObject.title,
    //   " Data of :",
    //   props.modalObject.Input,
    //   ":: whole Data Set ",
    //   JSON.stringify(investmentPropertyDetails)
    // );
    // if (
    //   investmentPropertyDetails[props.modalObject.Input] &&
    //   investmentPropertyDetails[props.modalObject.Input].length
    // ) {
    //   setFieldValue(
    //     `NumberOfMap`,
    //     investmentPropertyDetails[props.modalObject.Input].length || ""
    //   );
    //   investmentPropertyDetails[props.modalObject.Input].forEach((data, i) => {
    //     if (data) {
    //       setFieldValue(`PropertyAddress${i}`, data.PropertyAddress || "");
    //       setFieldValue(`CurrentValue${i}`, data.CurrentValue || "");
    //       setFieldValue(`CostBase${i}`, data.CostBase || "");
    //       // if (SwitchFlag) {
    //       setFieldValue(`ClientOwnership${i}`, data.ClientOwnership || "");
    //       setFieldValue(`PartnerOwnership${i}`, data.PartnerOwnership || "");
    //       // }
    //       setFieldValue(
    //         `propertyLoanBalance${i}`,
    //         data.propertyLoanBalance || ""
    //       );
    //       setFieldValue(
    //         `propertyLoanDetailsArray${i}`,
    //         data.propertyLoanDetailsArray || ""
    //       );
    //       setFieldValue(
    //         `weeklyRentalIncome${i}`,
    //         data.weeklyRentalIncome || ""
    //       );
    //       setFieldValue(`expenses${i}`, data.expenses || "");
    //       setFieldValue(`expensesArray${i}`, data.expensesArray || "");
    //     }
    //   });
    // }
  };

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

  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    // Extract the number of maps from the values
    const numberOfMaps = parseInt(values.NumberOfMap, 10);
    const newEntries = [];

    console.log(values, "values on submit");
    // Iterate through each map entry and create a new object
    for (let i = 0; i < numberOfMaps; i++) {
      const newEntry = {
        PropertyAddress: values[`PropertyAddress${i}`] || "",
        CurrentValue: values[`CurrentValue${i}`] || "",
        CostBase: values[`CostBase${i}`] || "",
        ClientOwnership: SwitchFlag
          ? values[`ClientOwnership${i}`] || ""
          : undefined,
        PartnerOwnership: SwitchFlag
          ? values[`PartnerOwnership${i}`] || ""
          : undefined,
        propertyLoanBalance: values[`propertyLoanBalance${i}`] || "",
        propertyLoanDetailsArray: values[`propertyLoanDetailsArray${i}`] || "",
        weeklyRentalIncome: values[`weeklyRentalIncome${i}`] || "",
        expenses: values[`expenses${i}`] || "",
        expensesArray: values[`expensesArray${i}`] || "",
      };
      newEntries.push(newEntry);
    }

    // Log the new entries to verify
    console.log(newEntries);

    let DataOf = props.modalObject.Input;

    // Create an object with additional fields
    let obj = {
      clientFK: localStorage.getItem("UserID"),
    };

    obj[DataOf] = newEntries;

    // Calculate total currentBalance
    obj["clientTotal"] = toCommaAndDollar(
      newEntries.reduce(
        (total, entry) =>
          total + parseFloat(entry.CurrentValue.replace(/[^0-9.-]+/g, "")) || 0,
        0
      )
    );
    obj["partnerTotal"] = toCommaAndDollar(
      newEntries.reduce(
        (total, entry) =>
          total +
            parseFloat(entry.propertyLoanBalance.replace(/[^0-9.-]+/g, "")) ||
          0,
        0
      )
    );

    console.log(obj, "final obj", props.modalObject.index);

    // Check if investmentPropertyDetails and the array at props.modalObject.Input exist
    // const bankAccountArray = investmentPropertyDetails[props.modalObject.Input] || [];
    const bankAccountArray = investmentPropertyDetails.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/${props.modalObject.index}/Add`,
          obj
        );
      } else {
        // obj.collection = props.modalObject.Input
        res = await PatchAxios(
          `${DefaultUrl}/api/${props.modalObject.index}/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = {
          ...questionDetail,
          [props.modalObject.index]: res,
        };
        setQuestionDetail(updatedData);
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        'Data of "' + props.modalObject.title + '" is Saved'
      );
      // Reset the flag state if necessary
      if (props.flagState) {
        props.setFlagState(false);
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        'Data of "' +
          props.modalObject.title +
          '" is not Saved Please! try again'
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

  const AntDTableHOC = DynamicTableForInputsSection("antd");

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
    // {
    //   title: "Employment Status",
    //   dataIndex: "employmentStatus",
    //   key: "employmentStatus",
    //   type: "select",
    //   placeholder: "Select Employment Status",
    //   options: [
    //     { label: "Full Time", value: "Full Time" },
    //     { label: "Part Time", value: "Part Time" },
    //     { label: "Casual", value: "Casual" },
    //     { label: "Contract", value: "Contract" },
    //     { label: "On Leave", value: "OnLeave" },
    //   ],
    //   width: 200,
    // },
    // {
    //   title: "Name of Company",
    //   dataIndex: "nameOfCompany",
    //   key: "nameOfCompany",
    //   type: "text",
    //   placeholder: "Enter Company Name",
    //   width: 200,
    // },
    // {
    //   title: "Start Date",
    //   dataIndex: "startDate",
    //   key: "startDate",
    //   type: "antdate",
    //   placeholder: "dd/mm/yyyy",
    //   width: 200,
    // },
    // {
    //   title: "Hours Worked",
    //   dataIndex: "hoursWorked",
    //   key: "hoursWorked",
    //   type: "number",
    //   placeholder: "Enter Hours Worked",
    //   width: 200,
    // },
    // {
    //   title: "Salary Detail",
    //   dataIndex: "salaryPackage",
    //   key: "SalaryPackageModal",
    //   type: "modal", // 🔥 handled by DynamicFormField as button modal
    //   width: 150,
    //   handleInnerModal: handleInnerModal,
    //   innerModalTitle: "Salary Detail",
    //   Drawerheight: 220,
    //   DrawerWidth: "80%",
    //   PopoverContent: (
    //     innerModalTitle,
    //     values,
    //     all,
    //     stakeHolder,
    //     setFieldValue
    //   ) => {
    //     let modalObject = {
    //       title: innerModalTitle,
    //       key: all.key,
    //       parentValues: values,
    //       parentKey: stakeHolder,
    //     };
    //     return (
    //       <div
    //         style={{
    //           height: "80px",
    //           margin: "-20px 0px 0px 0px",
    //         }}
    //       >
    //         <SalaryPackage
    //           modalObject={modalObject}
    //           setFieldValue={setFieldValue}
    //           setFlagState={setFlagState}
    //           flagState={flagState}
    //         />
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: "Salary Packaging",
    //   dataIndex: "salaryPackagingRadio",
    //   key: "SalaryPackaging",
    //   type: "yesnoModal", // yes/no with modal
    //   width: 170,
    //   callBack: true,
    //   func: handleInnerModal,
    //   innerModalTitle: "Salary Packaging",
    //   Drawerheight: 220,
    //   DrawerWidth: "80%",
    //   PopoverContent: (
    //     innerModalTitle,
    //     values,
    //     all,
    //     stakeHolder,
    //     setFieldValue
    //   ) => {
    //     let modalObject = {
    //       title: innerModalTitle,
    //       key: all.key,
    //       parentValues: values,
    //       parentKey: stakeHolder,
    //     };

    //     return (
    //       <div
    //         style={{
    //           height: "80px",
    //           margin: "-20px 0px 0px 0px",
    //         }}
    //       >
    //         <SalaryPackaging
    //           modalObject={modalObject}
    //           setFieldValue={setFieldValue}
    //           setFlagState={setFlagState}
    //           flagState={flagState}
    //         />
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: "Leave Entitlements",
    //   dataIndex: "leaveEntitlementsRadio",
    //   key: "LeaveEntitlementsModal",
    //   type: "yesnoModal",
    //   width: 170,
    //   handleInnerModal: handleInnerModal,
    //   callBack: true,
    //   func: handleInnerModal,
    //   innerModalTitle: "Leave entitlements",
    //   Drawerheight: 320,
    //   DrawerWidth: "60%",
    //   PopoverContent: (
    //     innerModalTitle,
    //     values,
    //     all,
    //     stakeHolder,
    //     setFieldValue
    //   ) => {
    //     let modalObject = {
    //       title: innerModalTitle,
    //       key: all.key,
    //       parentValues: values,
    //       parentKey: stakeHolder,
    //     };

    //     // return (
    //     //   <div
    //     //     style={{
    //     //       height: "80px",
    //     //       margin: "-20px 0px 0px 0px",
    //     //     }}
    //     //   >
    //     //     <LeaveEntitlementsModal
    //     //       modalObject={modalObject}
    //     //       setFieldValue={setFieldValue}
    //     //       setFlagState={setFlagState}
    //     //       flagState={flagState}
    //     //     />
    //     //   </div>
    //     // );
    //   },
    // },
    // {
    //   title: "Choice of Fund",
    //   dataIndex: "choiceOfFund",
    //   key: "choiceOfFund",
    //   type: "yesno",
    //   width: 150,
    // },
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
              propertyLoanBalance:
                values.investmentProperties?.[i]?.propertyLoanBalance || "",
              weeklyRentalIncome:
                values.investmentProperties?.[i]?.weeklyRentalIncome || "",
              expenses: values.investmentProperties?.[i]?.expenses || "",
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
                      </select>
                    </div>
                  </div>

                  <InnerModal
                    modalObject={modalObject}
                    setFieldValue={setFieldValue}
                    setFlagState={setFlagState}
                    flagState={flagState}
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
                      {/* <Table striped bordered responsive hover>
                        <thead>
                          <tr>
                            <th>No#</th>
                            <th>Property Address</th>
                            <th>
                              Current Value -{" "}
                              <a
                                href="https://www.property.com.au/"
                                target="_blank"
                                className="text-white"
                              >
                                <FaRegBuilding />
                              </a>
                            </th>
                            <th>Cost base</th>
                            {SwitchFlag && (
                              <React.Fragment>
                                <th>Client Ownership</th>
                                <th>Partner Ownership</th>
                              </React.Fragment>
                            )}
                            <th>Loan Balance</th>
                            <th>Weekly Rental Income</th>
                            <th>Expenses</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dynamicFields.map((elem, i) => {
                            return (
                              <tr key={i}>
                                <td>{1 + i}</td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Property Address & Postcode"
                                    id={`PropertyAddress${i}`}
                                    name={`PropertyAddress${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Current Value – link to URL below "
                                    id={`CurrentValue${i}`}
                                    name={`CurrentValue${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(
                                        e.target.name,
                                        toCommaAndDollar(
                                          e.target.value.replace(
                                            /[^0-9.-]+/g,
                                            ""
                                          )
                                        )
                                      );
                                    }}
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Cost base /(Purchase Price)"
                                    id={`CostBase${i}`}
                                    name={`CostBase${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(
                                        e.target.name,
                                        toCommaAndDollar(
                                          e.target.value.replace(
                                            /[^0-9.-]+/g,
                                            ""
                                          )
                                        )
                                      );
                                    }}
                                  />
                                </td>
                                {SwitchFlag && (
                                  <React.Fragment>
                                    <td>
                                      <Field
                                        type="text"
                                        s
                                        placeholder="Client Ownership"
                                        id={`ClientOwnership${i}`}
                                        name={`ClientOwnership${i}`}
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            setFieldValue,
                                            FormulaSetting,
                                            values
                                          )
                                        }
                                        onFocus={(e) =>
                                          handleInputFocus(e, setFieldValue)
                                        }
                                        onKeyDown={(e) => handleInputKeyDown(e)}
                                        onBlur={(e) =>
                                          handleInputBlur(
                                            e,
                                            setFieldValue,
                                            toPercentage,
                                            FormulaSetting,
                                            values
                                          )
                                        }
                                        className="form-control inputDesignDoubleInput"
                                      />
                                    </td>
                                    <td>
                                      <Field
                                        type="text"
                                        s
                                        placeholder="Partner Ownership"
                                        id={`PartnerOwnership${i}`}
                                        name={`PartnerOwnership${i}`}
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            setFieldValue,
                                            FormulaSetting,
                                            values
                                          )
                                        }
                                        onFocus={(e) =>
                                          handleInputFocus(e, setFieldValue)
                                        }
                                        onKeyDown={(e) => handleInputKeyDown(e)}
                                        onBlur={(e) =>
                                          handleInputBlur(
                                            e,
                                            setFieldValue,
                                            toPercentage,
                                            FormulaSetting,
                                            values
                                          )
                                        }
                                        className="form-control inputDesignDoubleInput"
                                      />
                                    </td>
                                  </React.Fragment>
                                )}
                                <td>
                                  <InputGroup className="mb-3">
                                    <Field
                                      type="text"
                                      placeholder="Loan Balance"
                                      id={`propertyLoanBalance${i}`}
                                      name={`propertyLoanBalance${i}`}
                                      className="form-control inputDesignDoubleInput"
                                      disabled
                                      onChange={(e) => {
                                        setFieldValue(
                                          e.target.name,
                                          toCommaAndDollar(
                                            e.target.value.replace(
                                              /[^0-9.-]+/g,
                                              ""
                                            )
                                          )
                                        );
                                      }}
                                    />
                                    <Button
                                      className="btn bgColor modalBtn border-0"
                                      id="button-addon2"
                                      onClick={() => {
                                        handleInnerModal(
                                          "Property Loan Details",
                                          "",
                                          "propertyLoanDetailsArray",
                                          "propertyLoanBalance",
                                          "",
                                          values[
                                            `propertyLoanDetailsArray${i}`
                                          ],
                                          i,
                                          values
                                        );
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faArrowUpRightFromSquare}
                                      />
                                    </Button>
                                  </InputGroup>
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Weekly Rental Income "
                                    id={`weeklyRentalIncome${i}`}
                                    name={`weeklyRentalIncome${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(
                                        e.target.name,
                                        toCommaAndDollar(
                                          e.target.value.replace(
                                            /[^0-9.-]+/g,
                                            ""
                                          )
                                        )
                                      );
                                    }}
                                  />
                                </td>
                                <td>
                                  <InputGroup className="mb-3">
                                    <Field
                                      type="text"
                                      placeholder="Expenses"
                                      id={`expenses${i}`}
                                      name={`expenses${i}`}
                                      className="form-control inputDesignDoubleInput"
                                      disabled
                                      onChange={(e) => {
                                        setFieldValue(
                                          e.target.name,
                                          toCommaAndDollar(
                                            e.target.value.replace(
                                              /[^0-9.-]+/g,
                                              ""
                                            )
                                          )
                                        );
                                      }}
                                    />
                                    <Button
                                      className="btn bgColor modalBtn border-0"
                                      id="button-addon2"
                                      onClick={() => {
                                        handleInnerModal(
                                          "Expense Details",
                                          "",
                                          "expensesArray",
                                          "expenses",
                                          "",
                                          values[`expensesArray${i}`],
                                          i,
                                          values
                                        );
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faArrowUpRightFromSquare}
                                      />
                                    </Button>
                                  </InputGroup>
                                </td>
                              </tr>
                            );
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

export default InvestmentPropertyDetails;
