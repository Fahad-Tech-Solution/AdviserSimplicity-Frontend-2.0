<<<<<<< HEAD
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  toCommaAndDollar,
  toNumericValue,
} from "../../Assets/Api/Api";

import moneyBag from "../svgs/moneyBag.svg";
import down from "../svgs/down.svg";

import Collapse from "react-bootstrap/Collapse";
import { Table } from "react-bootstrap";

const RegularLivingExpenses = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

  const apiKey =
    props.modalObject.title2 === "General Living"
      ? "generalLivingExpenses"
      : "retirementLivingExpenses";

  const [totalExpense, setTotalExpense] = useState(0);
  const [totalHouseHold, setTotalHouseHold] = useState(0);
  const [totalPersonal, setTotalpersonal] = useState(0);
  const [totalTransport, setTotaltransport] = useState(0);
  const [totalInsurance, setTotalinsurance] = useState(0);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  let regularLivingExpenses =
    Object.keys(questionDetail[apiKey] || {}).length > 0
      ? questionDetail[apiKey]
      : {};

  let initialValues = {};

  const [dynamicFields, setDynamicFields] = useState([]);

  const fillInitialValues = (setFieldValue) => {
    if (regularLivingExpenses?.clientFK) {
      let data = regularLivingExpenses;
      setFieldValue(`businessName`, data.businessName || "");
      setFieldValue(`businessName`, data.businessName || "");
      setFieldValue(`houseHoldFood`, data.houseHoldFood || "");
      setFieldValue(`houseHoldRent`, data.houseHoldRent || "");
      setFieldValue(`houseHoldElectricity`, data.houseHoldElectricity || "");
      setFieldValue(`houseHoldWaterRates`, data.houseHoldWaterRates || "");
      setFieldValue(`houseHoldGas`, data.houseHoldGas || "");
      setFieldValue(`houseHoldPhone`, data.houseHoldPhone || "");
      setFieldValue(`houseHoldCouncilRates`, data.houseHoldCouncilRates || "");
      setFieldValue(`houseHoldInternet`, data.houseHoldInternet || "");
      setFieldValue(`houseHoldOthers`, data.houseHoldOthers || "");
      // setFieldValue(`personalFood`, data.personalFood || "");
      setFieldValue(`personalClothing`, data.personalClothing || "");
      setFieldValue(`personalCigarettes`, data.personalCigarettes || "");
      setFieldValue(`personalAlcohol`, data.personalAlcohol || "");
      setFieldValue(
        `personalSubscriptionFees`,
        data.personalSubscriptionFees || ""
      );
      setFieldValue(
        `personalClubMemberships`,
        data.personalClubMemberships || ""
      );
      setFieldValue(`personalOthers`, data.personalOthers || "");
      setFieldValue(`personalHolidays`, data.personalHolidays || "");
      setFieldValue(`personalDiningOut`, data.personalDiningOut || "");
      setFieldValue(`personalMobilePhone`, data.personalMobilePhone || "");
      setFieldValue(
        `personalMedicalExpenses`,
        data.personalMedicalExpenses || ""
      );
      setFieldValue(`transportPetrol`, data.transportPetrol || "");
      setFieldValue(`transportCarRepair`, data.transportCarRepair || "");
      setFieldValue(
        `transportCarRegistration`,
        data.transportCarRegistration || ""
      );
      setFieldValue(`publicTransport`, data.publicTransport || "");
      setFieldValue(`transportOthers`, data.transportOthers || "");
      setFieldValue(
        `insurancePrivateHealth`,
        data.insurancePrivateHealth || ""
      );
      setFieldValue(`insuranceLife`, data.insuranceLife || "");
      setFieldValue(
        `insuranceIncomeProtection`,
        data.insuranceIncomeProtection || ""
      );
      setFieldValue(`insuranceCar`, data.insuranceCar || "");
      setFieldValue(`insuranceHomeContents`, data.insuranceHomeContents || "");
      setFieldValue(`insuranceOthers`, data.insuranceOthers || "");
      setFieldValue(`houseHoldRentType`, data.houseHoldRentType || "");
      setFieldValue(
        `houseHoldElectricityType`,
        data.houseHoldElectricityType || ""
      );
      setFieldValue(
        `houseHoldWaterRatesType`,
        data.houseHoldWaterRatesType || ""
      );
      setFieldValue(`houseHoldGasType`, data.houseHoldGasType || "");
      setFieldValue(`houseHoldFoodType`, data.houseHoldFoodType || "");
      setFieldValue(`houseHoldPhoneType`, data.houseHoldPhoneType || "");
      setFieldValue(
        `houseHoldCouncilRatesType`,
        data.houseHoldCouncilRatesType || ""
      );
      setFieldValue(`houseHoldInternetType`, data.houseHoldInternetType || "");
      setFieldValue(`houseHoldOthersType`, data.houseHoldOthersType || "");
      // setFieldValue(`personalFoodType`, data.personalFoodType || "");
      setFieldValue(`personalClothingType`, data.personalClothingType || "");
      setFieldValue(
        `personalCigarettesType`,
        data.personalCigarettesType || ""
      );
      setFieldValue(`personalAlcoholType`, data.personalAlcoholType || "");
      setFieldValue(
        `personalSubscriptionFeesType`,
        data.personalSubscriptionFeesType || ""
      );
      setFieldValue(
        `personalClubMembershipsType`,
        data.personalClubMembershipsType || ""
      );
      setFieldValue(`personalOthersType`, data.personalOthersType || "");
      setFieldValue(`personalHolidaysType`, data.personalHolidaysType || "");
      setFieldValue(`personalDiningOutType`, data.personalDiningOutType || "");
      setFieldValue(
        `personalMobilePhoneType`,
        data.personalMobilePhoneType || ""
      );
      setFieldValue(
        `personalMedicalExpensesType`,
        data.personalMedicalExpensesType || ""
      );
      setFieldValue(`transportPetrolType`, data.transportPetrolType || "");
      setFieldValue(
        `transportCarRepairType`,
        data.transportCarRepairType || ""
      );
      setFieldValue(
        `transportCarRegistrationType`,
        data.transportCarRegistrationType || ""
      );
      setFieldValue(`publicTransportType`, data.publicTransportType || "");
      setFieldValue(`transportOthersType`, data.transportOthersType || "");
      setFieldValue(
        `insurancePrivateHealthType`,
        data.insurancePrivateHealthType || ""
      );
      setFieldValue(`insuranceLifeType`, data.insuranceLifeType || "");
      setFieldValue(
        `insuranceIncomeProtectionType`,
        data.insuranceIncomeProtectionType || ""
      );
      setFieldValue(`insuranceCarType`, data.insuranceCarType || "");
      setFieldValue(
        `insuranceHomeContentsType`,
        data.insuranceHomeContentsType || ""
      );
      setFieldValue(`insuranceOthersType`, data.insuranceOthersType || "");
    }
  };

  let handleInput = (e, setFieldValue) => {
    const value = e.target.value > 10 ? 10 : e.target.value;
    setFieldValue(e.target.id, value);

    let arr = [];

    for (let i = 0; i < value; i++) {
      arr.push("");
    }

    setDynamicFields(arr);
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    console.log(JSON.stringify(values));
    // return (false);

    let DataOf = props.modalObject.Input;

    // Create an object with additional fields
    let obj = values;

    obj.clientFK = localStorage.getItem("UserID");

    // Calculate total currentBalance
    obj[apiKey + "Total"] = toCommaAndDollar(totalExpense.toFixed(2));

    console.log(obj, "final obj");

    const bankAccountArray = regularLivingExpenses.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/${apiKey}/Add`, obj);
      } else {
        obj.collection = props.modalObject.Input;
        res = await PatchAxios(`${DefaultUrl}/api/${apiKey}/Update`, obj);
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, [apiKey]: res };
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
=======
import React, { useEffect, useMemo, useState } from "react";
import { Collapse, Typography, Divider } from "antd";
import { Formik, Form } from "formik";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  defaultUrl,
  QuestionDetail,
  PersonalDetailsData,
} from "../../../Store/Store";
import {
  PostAxios,
  PatchAxios,
  openNotificationSuccess,
  toCommaAndDollar,
} from "../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const { Title } = Typography;
const AntDTableHOC = DynamicTableForInputsSection("antd");

const RegularLivingExpenses = (props) => {
  const DefaultUrl = useRecoilValue(defaultUrl);
  const [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);
  const personalDetailObj = useRecoilValue(PersonalDetailsData);

  let regularLivingExpenses =
    Object.keys(questionDetail["generalLivingExpenses"] || {}).length > 0
      ? questionDetail["generalLivingExpenses"]
      : {};
>>>>>>> origin/master
  const expenseTypes = [
    { name: "Rent", id: "houseHoldRent" },
    { name: "Gas", id: "houseHoldGas" },
    { name: "Electricity", id: "houseHoldElectricity" },
    { name: "Water Rates", id: "houseHoldWaterRates" },
    { name: "Council Rates", id: "houseHoldCouncilRates" },
    { name: "Phone", id: "houseHoldPhone" },
    { name: "Food", id: "houseHoldFood" },
    { name: "Internet", id: "houseHoldInternet" },
    { name: "Other", id: "houseHoldOthers" },
  ];
  const personalExpenses = [
    { name: "Clothing", id: "personalClothing" },
    { name: "Cigarettes", id: "personalCigarettes" },
    { name: "Alcohol", id: "personalAlcohol" },
    { name: "Subscription Fees", id: "personalSubscriptionFees" },
    { name: "Memberships & Clubs", id: "personalClubMemberships" },
    { name: "Holidays", id: "personalHolidays" },
    { name: "Dining Out", id: "personalDiningOut" },
    { name: "Mobile Phone", id: "personalMobilePhone" },
    { name: "Medical Expenses", id: "personalMedicalExpenses" },
    { name: "Other", id: "personalOthers" },
  ];
  const transportExpenses = [
    { name: "Petrol", id: "transportPetrol" },
    { name: "Car Maintenance", id: "transportCarRepair" },
    { name: "Car Registration", id: "transportCarRegistration" },
    { name: "Public Transport", id: "publicTransport" },
    { name: "Other", id: "transportOthers" },
  ];
  const insuranceExpenses = [
    { name: "Home And Contents", id: "insuranceHomeContents" },
    { name: "Car", id: "insuranceCar" },
    { name: "Private Health", id: "insurancePrivateHealth" },
    { name: "Life/TPD/Trauma", id: "insuranceLife" },
    { name: "Income Protection", id: "insuranceIncomeProtection" },
    { name: "Other", id: "insuranceOthers" },
  ];

<<<<<<< HEAD
  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema2}
      onSubmit={onSubmit}
      innerRef={props.formRef}
      enableReinitialize
    >
      {({ values, setFieldValue, setValues, handleChange }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [values.NumberOfMap]);

        return (
          <Form>
            <div className="row text-light fw-bold bgColorIncome py-2 my-1">
              <div className="col-md-6">
                <label className=" mb-0">Total Expense</label>
              </div>
              <div className="col-md-6">
                <label id="HouseholdTotalValue" className="float-end mb-0">
                  {toCommaAndDollar(totalExpense)}
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={moneyBag} alt="" />
                  </div>
                </label>
              </div>
            </div>

            {/* houseHold */}
            <div className="row ">
              <div
                onClick={() => {
                  setOpen(!open);
                  setOpen2(false);
                  setOpen3(false);
                  setOpen4(false);
                }}
                aria-controls=""
                aria-expanded={open}
                className="bgColorIncome   py-2 text-light fw-bold"
              >
                <div className="row">
                  <div className="col-md-6">
                    <label className=" mb-0 fw-bold">Household</label>
                  </div>
                  <div className="col-md-6">
                    <label id="HouseholdTotalValue" className="float-end mb-0">
                      {toCommaAndDollar(totalHouseHold)}
                      <div className="iconContainer mx-1">
                        <img className="img-fluid" src={down} alt="" />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div></div>
              <Collapse in={open}>
                <div className="row m-0 p-0">
                  {/* Total Expense Formula1 */}
                  {setTotalExpense(
                    totalHouseHold +
                      totalPersonal +
                      totalTransport +
                      totalInsurance
                  )}
                  {/* Sum of HouseHold Formula2 */}
                  {setTotalHouseHold(
                    parseFloat(
                      (
                        (toNumericValue(values.houseHoldRent) || 0) *
                        (values.houseHoldRentType || 0)
                      ).toFixed(2)
                    ) +
                      parseFloat(
                        (
                          (toNumericValue(values.houseHoldElectricity) || 0) *
                          (values.houseHoldElectricityType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.houseHoldWaterRates) || 0) *
                          (values.houseHoldWaterRatesType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.houseHoldGas) || 0) *
                          (values.houseHoldGasType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.houseHoldPhone) || 0) *
                          (values.houseHoldPhoneType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.houseHoldCouncilRates) || 0) *
                          (values.houseHoldCouncilRatesType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.houseHoldInternet) || 0) *
                          (values.houseHoldInternetType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.houseHoldOthers) || 0) *
                          (values.houseHoldOthersType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.houseHoldFood) || 0) *
                          (values.houseHoldFoodType || 0)
                        ).toFixed(2)
                      )
                  )}
                  {/* Sum of HouseHold Formula2 */}

                  {/* Sum of personal Formula3 */}
                  {setTotalpersonal(
                    parseFloat(
                      (
                        (toNumericValue(values.personalClothing) || 0) *
                        (values.personalClothingType || 0)
                      ).toFixed(2)
                    ) +
                      parseFloat(
                        (
                          (toNumericValue(values.personalCigarettes) || 0) *
                          (values.personalCigarettesType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.personalAlcohol) || 0) *
                          (values.personalAlcoholType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.personalSubscriptionFees) ||
                            0) * (values.personalSubscriptionFeesType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.personalClubMemberships) ||
                            0) * (values.personalClubMembershipsType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.personalOthers) || 0) *
                          (values.personalOthersType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.personalHolidays) || 0) *
                          (values.personalHolidaysType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.personalDiningOut) || 0) *
                          (values.personalDiningOutType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.personalMobilePhone) || 0) *
                          (values.personalMobilePhoneType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.personalMedicalExpenses) ||
                            0) * (values.personalMedicalExpensesType || 0)
                        ).toFixed(2)
                      )
                  )}

                  {/* Sum of transportFormula4 */}

                  {setTotaltransport(
                    parseFloat(
                      (
                        (toNumericValue(values.transportPetrol) || 0) *
                        (values.transportPetrolType || 0)
                      ).toFixed(2)
                    ) +
                      parseFloat(
                        (
                          (toNumericValue(values.transportCarRepair) || 0) *
                          (values.transportCarRepairType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.transportCarRegistration) ||
                            0) * (values.transportCarRegistrationType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.publicTransport) || 0) *
                          (values.publicTransportType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.transportOthers) || 0) *
                          (values.transportOthersType || 0)
                        ).toFixed(2)
                      )
                  )}

                  {/* Sum of insurance Formula5 */}

                  {setTotalinsurance(
                    parseFloat(
                      (
                        (toNumericValue(values.insurancePrivateHealth) || 0) *
                        (values.insurancePrivateHealthType || 0)
                      ).toFixed(2)
                    ) +
                      parseFloat(
                        (
                          (toNumericValue(values.insuranceLife) || 0) *
                          (values.insuranceLifeType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.insuranceIncomeProtection) ||
                            0) * (values.insuranceIncomeProtectionType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.insuranceCar) || 0) *
                          (values.insuranceCarType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.insuranceHomeContents) || 0) *
                          (values.insuranceHomeContentsType || 0)
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          (toNumericValue(values.insuranceOthers) || 0) *
                          (values.insuranceOthersType || 0)
                        ).toFixed(2)
                      )
                  )}

                  <div className="my-3 mx-0">
                    <div className="m-0 p-0">
                      <Table striped bordered responsive hover>
                        <thead className="bgColorIncome text-light">
                          <tr>
                            <th>Expense Type</th>
                            <th>Amount</th>
                            <th>Frequency</th>
                            <th>Amount P.A</th>
                          </tr>
                        </thead>
                        <tbody>
                          {expenseTypes.map((expense) => {
                            const totalValue = toCommaAndDollar(
                              (toNumericValue(values[expense.id]) || 0) *
                                (parseFloat(values[`${expense.id}Type`]) || 0)
                            );
                            return (
                              <tr key={expense.id}>
                                <td>
                                  <label
                                    htmlFor={expense.id}
                                    className="form-label"
                                  >
                                    {expense.name}
                                  </label>
                                </td>
                                <td className="w-25">
                                  <Field
                                    type="text"
                                    className="form-control inputDesignDoubleInput shadow"
                                    id={expense.id}
                                    placeholder={expense.name}
                                    name={expense.id}
                                    onChange={(e) => {
                                      handleChange(e);
                                      let rawValue = e.target.value.replace(
                                        /[^0-9.-]+/g,
                                        ""
                                      );
                                      let formattedValue =
                                        toCommaAndDollar(rawValue);
                                      // console.log(formattedValue);
                                      setFieldValue(expense.id, formattedValue);
                                    }}
                                  />
                                  <ErrorMessage
                                    name={expense.id}
                                    component="div"
                                    className="text-danger fw-bold"
                                  />
                                </td>
                                <td>
                                  <Field
                                    as="select"
                                    id={`${expense.id}Type`}
                                    className="form-select shadow inputDesignDoubleInput"
                                    name={`${expense.id}Type`}
                                  >
                                    <option value="">Select</option>
                                    <option value={52}>Weekly</option>
                                    <option value={26}>Fortnightly</option>
                                    <option value={12}>Monthly</option>
                                    <option value={4}>Quarterly</option>
                                    <option value={2}>Six-Monthly</option>
                                    <option value={1}>Annually</option>
                                  </Field>
                                  <ErrorMessage
                                    name={`${expense.id}Type`}
                                    component="div"
                                    className="text-danger fw-bold"
                                  />
                                </td>
                                <td>
                                  <Field
                                    className="form-control shadow inputDesignDoubleInput"
                                    value={totalValue}
                                    disabled
                                  />
                                  {/* <label
                                  htmlFor=""
                                  className="form-label float-end"
                                >
                                  $
                                  {(
                                    (values[expense.id] || 0) *
                                    (values[`${expense.id}Type`] || 0)
                                  ).toFixed(2)}
                                </label> */}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
            {/* houseHold*/}

            {/* personal   */}
            <div className="row my-1">
              <div
                onClick={() => {
                  setOpen(false);
                  setOpen2(!open2);
                  setOpen3(false);
                  setOpen4(false);
                }}
                aria-controls=""
                aria-expanded={open2}
                className="bgColorIncome py-2 text-light fw-bold"
              >
                <div className="row ">
                  <div className="col-md-6">
                    <label className=" mb-0">Personal</label>
                  </div>
                  <div className="col-md-6">
                    <label className="float-end mb-0">
                      {toCommaAndDollar(totalPersonal)}
                      <div className="iconContainer mx-1">
                        <img className="img-fluid" src={down} alt="" />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div></div>
              <Collapse in={open2}>
                {/* personal    row 1 */}
                <div className="my-3 mx-0">
                  <div className="m-0 p-0">
                    <Table striped bordered responsive hover>
                      <thead
                        className="bgColorIncome text-light"
                        style={{ padding: "10px" }}
                      >
                        <tr>
                          <th>Expense Type</th>
                          <th>Amount</th>
                          <th>Frequency</th>
                          <th>Amount P.A</th>
                        </tr>
                      </thead>
                      <tbody>
                        {personalExpenses.map((expense) => {
                          const totalValue = toCommaAndDollar(
                            (toNumericValue(values[expense.id]) || 0) *
                              (parseFloat(values[`${expense.id}Type`]) || 0)
                          );
                          return (
                            <tr key={expense.id}>
                              <td>
                                <label
                                  htmlFor={expense.id}
                                  className="form-label"
                                >
                                  {expense.name}
                                </label>
                              </td>
                              <td>
                                <Field
                                  type="text"
                                  className="form-control inputDesignDoubleInput shadow"
                                  id={expense.id}
                                  placeholder={expense.name}
                                  name={expense.id}
                                  onChange={(e) => {
                                    handleChange(e);
                                    let rawValue = e.target.value.replace(
                                      /[^0-9.-]+/g,
                                      ""
                                    );
                                    let formattedValue =
                                      toCommaAndDollar(rawValue);
                                    // console.log(formattedValue);
                                    setFieldValue(expense.id, formattedValue);
                                  }}
                                />
                                <ErrorMessage
                                  name={expense.id}
                                  component="div"
                                  className="text-danger fw-bold"
                                />
                              </td>
                              <td>
                                <Field
                                  as="select"
                                  id={`${expense.id}Type`}
                                  name={`${expense.id}Type`}
                                  className="form-select shadow inputDesignDoubleInput"
                                >
                                  <option value="">Select</option>
                                  <option value={52}>Weekly</option>
                                  <option value={26}>Fortnightly</option>
                                  <option value={12}>Monthly</option>
                                  <option value={4}>Quarterly</option>
                                  <option value={2}>Six-Monthly</option>
                                  <option value={1}>Annually</option>
                                </Field>
                                <ErrorMessage
                                  name={`${expense.id}Type`}
                                  component="div"
                                  className="text-danger fw-bold"
                                />
                              </td>
                              <td>
                                <Field
                                  className="form-control shadow inputDesignDoubleInput"
                                  value={totalValue}
                                  disabled
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Collapse>
            </div>
            {/* personal*/}

            {/* transport */}
            <div className="row my-1 justify-content-center">
              <div
                onClick={() => {
                  setOpen(false);
                  setOpen2(false);
                  setOpen3(!open3);
                  setOpen4(false);
                }}
                aria-controls=""
                aria-expanded={open3}
                className="bgColorIncome fw-bold py-2 text-light"
              >
                <div className="row">
                  <div className="col-md-6">
                    <label className=" mb-0">Transport</label>
                  </div>
                  <div className="col-md-6">
                    <label id="transportTotalValue" className="float-end mb-0">
                      {toCommaAndDollar(totalTransport)}
                      <div className="iconContainer mx-1">
                        <img className="img-fluid" src={down} alt="" />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div></div>
              <Collapse in={open3}>
                <div className="row my-3 justify-content-center">
                  <div className="table-responsive m-0 p-0">
                    <Table striped bordered responsive hover>
                      <thead className="bgColorIncome text-light">
                        <tr>
                          <th>Expense Type</th>
                          <th>Amount</th>
                          <th>Frequency</th>
                          <th>Amount P.A</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transportExpenses.map((expense) => {
                          const totalValue = toCommaAndDollar(
                            (toNumericValue(values[expense.id]) || 0) *
                              (parseFloat(values[`${expense.id}Type`]) || 0)
                          );
                          return (
                            <tr key={expense.id}>
                              <td>
                                <label
                                  htmlFor={expense.id}
                                  className="form-label"
                                >
                                  {expense.name}
                                </label>
                              </td>
                              <td>
                                <Field
                                  type="text"
                                  className="form-control inputDesignDoubleInput shadow"
                                  id={expense.id}
                                  placeholder={expense.name}
                                  name={expense.id}
                                  onChange={(e) => {
                                    handleChange(e);
                                    let rawValue = e.target.value.replace(
                                      /[^0-9.-]+/g,
                                      ""
                                    );
                                    let formattedValue =
                                      toCommaAndDollar(rawValue);
                                    // console.log(formattedValue);
                                    setFieldValue(expense.id, formattedValue);
                                  }}
                                />
                                <ErrorMessage
                                  name={expense.id}
                                  component="div"
                                  className="text-danger fw-bold"
                                />
                              </td>
                              <td>
                                <Field
                                  as="select"
                                  id={`${expense.id}Type`}
                                  name={`${expense.id}Type`}
                                  className="form-select shadow inputDesignDoubleInput"
                                >
                                  <option value="">Select</option>
                                  <option value={52}>Weekly</option>
                                  <option value={26}>Fortnightly</option>
                                  <option value={12}>Monthly</option>
                                  <option value={4}>Quarterly</option>
                                  <option value={2}>Six-Monthly</option>
                                  <option value={1}>Annually</option>
                                </Field>
                                <ErrorMessage
                                  name={`${expense.id}Type`}
                                  component="div"
                                  className="text-danger fw-bold"
                                />
                              </td>
                              <td>
                                <Field
                                  className="form-control shadow inputDesignDoubleInput"
                                  value={totalValue}
                                  disabled
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Collapse>
            </div>
            {/* transport */}

            {/* insurance */}
            <div className="row justify-content-center my-1">
              <div
                onClick={() => {
                  setOpen(false);
                  setOpen2(false);
                  setOpen3(false);
                  setOpen4(!open4);
                }}
                aria-controls=""
                aria-expanded={open4}
                className="bgColorIncome fw-bold py-2 text-light"
              >
                <div className="row">
                  <div className="col-md-6">
                    <label className=" mb-0">Insurance</label>
                  </div>
                  <div className="col-md-6">
                    <label id="insuranceTotalValue" className="float-end mb-0">
                      {toCommaAndDollar(totalInsurance)}
                      <div className="iconContainer mx-1">
                        <img className="img-fluid" src={down} alt="" />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div></div>
              <Collapse in={open4}>
                <div className="row justify-content-center my-3">
                  <div className=" m-0 p-0">
                    <Table striped bordered responsive hover>
                      <thead
                        className="bgColorIncome text-light"
                        style={{ padding: "10px" }}
                      >
                        <tr>
                          <th>Expense Type</th>
                          <th>Amount</th>
                          <th>Frequency</th>
                          <th>Amount P.A</th>
                        </tr>
                      </thead>
                      <tbody>
                        {insuranceExpenses.map((expense) => {
                          const totalValue = toCommaAndDollar(
                            (toNumericValue(values[expense.id]) || 0) *
                              (parseFloat(values[`${expense.id}Type`]) || 0)
                          );
                          return (
                            <tr key={expense.id}>
                              <td>
                                <label
                                  htmlFor={expense.id}
                                  className="form-label"
                                >
                                  {expense.name}
                                </label>
                              </td>
                              <td>
                                <Field
                                  type="text"
                                  className="form-control inputDesignDoubleInput shadow"
                                  id={expense.id}
                                  name={expense.id}
                                  placeholder={expense.name}
                                  onChange={(e) => {
                                    handleChange(e);
                                    let rawValue = e.target.value.replace(
                                      /[^0-9.-]+/g,
                                      ""
                                    );
                                    let formattedValue =
                                      toCommaAndDollar(rawValue);
                                    // console.log(formattedValue);
                                    setFieldValue(expense.id, formattedValue);
                                  }}
                                />
                                <ErrorMessage
                                  name={expense.id}
                                  component="div"
                                  className="text-danger fw-bold"
                                />
                              </td>
                              <td>
                                <Field
                                  as="select"
                                  id={`${expense.id}Type`}
                                  name={`${expense.id}Type`}
                                  className="form-select shadow inputDesignDoubleInput"
                                >
                                  <option value="">Select</option>
                                  <option value={52}>Weekly</option>
                                  <option value={26}>Fortnightly</option>
                                  <option value={12}>Monthly</option>
                                  <option value={4}>Quarterly</option>
                                  <option value={2}>Six-Monthly</option>
                                  <option value={1}>Annually</option>
                                </Field>
                                <ErrorMessage
                                  name={`${expense.id}Type`}
                                  component="div"
                                  className="text-danger fw-bold"
                                />
                              </td>
                              <td>
                                <Field
                                  className="form-control shadow inputDesignDoubleInput"
                                  type="text"
                                  value={totalValue}
                                  disabled
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Collapse>
            </div>
            {/* insurance    */}
=======
  const initialValues = {
    household: [
      ...expenseTypes.map((Item, index) => {
        return {
          key: Item.name + "_" + index,
          dbKey: Item.id,
          name: Item.name,
          amount: "",
          frequency: "",
        };
      }),
    ],
    personal: [
      ...personalExpenses.map((Item, index) => {
        return {
          key: Item.name + "_" + index,
          name: Item.name,
          amount: "",
          dbKey: Item.id,
          frequency: "",
        };
      }),
    ],
    transport: [
      ...transportExpenses.map((Item, index) => {
        return {
          key: Item.name + "_" + index,
          name: Item.name,
          amount: "",
          dbKey: Item.id,
          frequency: "",
        };
      }),
    ],
    insurance: [
      ...insuranceExpenses.map((Item, index) => {
        return {
          key: Item.name + "_" + index,
          name: Item.name,
          amount: "",
          dbKey: Item.id,
          frequency: "",
        };
      }),
    ],
  };

  const [totals, setTotals] = useState({
    household: 0,
    personal: 0,
    transport: 0,
    insurance: 0,
  });

  const fillInitialValues = (setFieldValue, questionDetail) => {
    const data = regularLivingExpenses;
    // console.log(regularLivingExpenses);
    if (!data || !data._id) return false;

    // console.log("🧩 Populating initial values from DB:", data);

    // Helper to generate section data based on your predefined arrays
    const mapSection = (expenseArray) => {
      return expenseArray.map((item, index) => {
        const amount = data[item.id] || "";
        const frequency = data[`${item.id}Type`] || "";

        const amountNum = parseFloat(
          String(amount || "0").replace(/[^0-9.-]+/g, "")
        );
        const freqNum = parseFloat(frequency || "0");

        return {
          key: `${item.name}_${index}`,
          dbKey: item.id,
          name: item.name,
          amount,
          frequency,
          total:
            amount && frequency ? toCommaAndDollar(amountNum * freqNum) : "",
        };
      });
    };

    // console.log(mapSection(expenseTypes));

    // Apply to all sections using your predefined mappings
    setFieldValue("household", mapSection(expenseTypes));
    setFieldValue("personal", mapSection(personalExpenses));
    setFieldValue("transport", mapSection(transportExpenses));
    setFieldValue("insurance", mapSection(insuranceExpenses));

    // optional: if you also have an "other" section
    if (typeof otherExpenses !== "undefined") {
      setFieldValue("other", mapSection(otherExpenses));
    }

    return true;
  };

  const calculateTotals = (values) => {
    const sectionTotals = {};
    // console.log(values);

    Object.keys(values).forEach((section) => {
      sectionTotals[section] = values[section].reduce(
        (acc, curr) =>
          acc +
          (parseFloat(curr.amount.replace(/[^0-9.-]+/g, "")) || 0) *
            parseFloat(curr.frequency || 0),
        0
      );
    });

    setTotals(sectionTotals);
    // console.log("🧮 Totals calculated:", sectionTotals);
  };

  const convertValuesForBackend = (values) => {
    const result = {};

    Object.entries(values).forEach(([section, items]) => {
      items.forEach((item) => {
        if (!item.dbKey) return;

        // make first letter lowercase after prefix (ex: houseHoldWaterRates)
        const finalKey = item.dbKey;

        // assign values
        result[finalKey] = item.amount || "$0";
        result[`${finalKey}Type`] = item.frequency || "0";
      });
    });

    result["generalLivingExpensesTotal"] = toCommaAndDollar(
      Object.values(totals).reduce(
        (sum, val) => sum + (parseFloat(val) || 0),
        0
      )
    );
    return result;
  };

  const onSubmit = async (values) => {
    // console.log(
    //   "🚀 Submitting Regular Living Expenses:",
    //   values,
    //   convertValuesForBackend(values)
    // );

    const obj = {
      ...convertValuesForBackend(values),
      clientFK: localStorage.getItem("UserID"),
    };

    try {
      let res;
      if (!questionDetail.generalLivingExpenses?._id) {
        console.log("📤 Sending POST request...");
        res = await PostAxios(
          `${DefaultUrl}/api/generalLivingExpenses/Add`,
          obj
        );
      } else {
        console.log("📤 Sending PATCH request...");
        res = await PatchAxios(
          `${DefaultUrl}/api/generalLivingExpenses/Update`,
          obj
        );
      }

      if (res) {
        console.log("✅ API Response:", res);
        const updatedData = { ...questionDetail, generalLivingExpenses: res };
        setQuestionDetail(updatedData);

        openNotificationSuccess(
          "success",
          "topRight",
          "Success Notification",
          'Data of "Regular Living Expenses" saved successfully.'
        );

        if (props.flagState) {
          props.setFlagState(false);
        }
      }
    } catch (error) {
      console.error("🔥 Error during save:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        "Failed to save Regular Living Expenses. Please try again."
      );
    }
  };

  const getNestedValue = (obj, path) => {
    try {
      return path
        .replace(/\[(\d+)\]/g, ".$1") // convert [0] → .0
        .split(".")
        .filter(Boolean)
        .reduce(
          (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
          obj
        );
    } catch {
      return undefined;
    }
  };

  const calculateTotal = (values, setFieldValue, thisInput, stakeHolder) => {
    const cleanPath = stakeHolder.replace(/\.$/, ""); // remove trailing dot if exists
    const baseObj = getNestedValue(values, cleanPath);

    let amount = parseFloat(baseObj?.amount?.replace(/[^0-9.-]+/g, "") || 0);
    let frequency = parseFloat(baseObj?.frequency || 0);

    switch (thisInput.name) {
      case stakeHolder + "amount":
        amount = parseFloat(thisInput.value.replace(/[^0-9.-]+/g, "") || 0);
        break;
      case stakeHolder + "frequency":
        frequency = parseFloat(thisInput.value || 0);
        break;
    }

    setFieldValue(stakeHolder + "total", toCommaAndDollar(amount * frequency));
  };

  const columns = [
    {
      title: "Expense Type",
      dataIndex: "name",
      key: "owner",
    },
    {
      title: "Amount ($)",
      dataIndex: "amount",
      key: "amount",
      type: "number-toComma",
      placeholder: "Enter Amount",
      callBack: true,
      func: calculateTotal,
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      type: "select",
      selectedOptionValue: true,
      options: [
        { value: 52, label: "Weekly" },
        { value: 26, label: "Fortnightly" },
        { value: 12, label: "Monthly" },
        { value: 4, label: "Quarterly" },
        { value: 2, label: "Six-Monthly" },
        { value: 1, label: "Annually" },
      ],
      callBack: true,
      func: calculateTotal,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      type: "number-toComma",
      disabled: true,
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        useEffect(() => {
          calculateTotals(values);
        }, [values]);

        const totalOverall = useMemo(
          () =>
            Object.values(totals).reduce(
              (sum, val) => sum + (parseFloat(val) || 0),
              0
            ),
          [totals]
        );

        const tableData = useMemo(() => {
          const buildTableData = (sectionName) =>
            (values[sectionName] || []).map((item, index) => ({
              ...item,
              key: `${sectionName}_${index}`,
              stakeHolder: `${sectionName}[${index}]`,
              name: item.name || "",
              amount: item.amount || "",
              frequency: item.frequency || "",
              total: item.total,
            }));

          return {
            household: buildTableData("household"),
            personal: buildTableData("personal"),
            transport: buildTableData("transport"),
            insurance: buildTableData("insurance"),
            // other: buildTableData("other"),
          };
        }, [values]);

        const collapseItems = [
          {
            key: "1",
            label: (
              <div className="d-flex justify-content-between align-items-center w-100">
                <span>🏠 Household Expenses</span>
                <strong>${totals.household?.toLocaleString() || 0}</strong>
              </div>
            ),
            children: (
              <div className="All_Client reportSection">
                <AntDTableHOC
                  columns={columns}
                  data={tableData.household}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  sectionKey="household"
                  handleSubmit={props?.handleOk}
                />
              </div>
            ),
          },
          {
            key: "2",
            label: (
              <div className="d-flex justify-content-between align-items-center w-100">
                <span>🧍 Personal Expenses</span>
                <strong>${totals.personal?.toLocaleString() || 0}</strong>
              </div>
            ),
            children: (
              <div className="All_Client reportSection">
                <AntDTableHOC
                  columns={columns}
                  data={tableData.personal}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  sectionKey="personal"
                  handleSubmit={props?.handleOk}
                />
              </div>
            ),
          },
          {
            key: "3",
            label: (
              <div className="d-flex justify-content-between align-items-center w-100">
                <span>🚗 Transport Expenses</span>
                <strong>${totals.transport?.toLocaleString() || 0}</strong>
              </div>
            ),
            children: (
              <div className="All_Client reportSection">
                <AntDTableHOC
                  columns={columns}
                  data={tableData.transport}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  sectionKey="transport"
                  handleSubmit={props?.handleOk}
                />
              </div>
            ),
          },
          {
            key: "4",
            label: (
              <div className="d-flex justify-content-between align-items-center w-100">
                <span>🩺 Insurance Expenses</span>
                <strong>${totals.insurance?.toLocaleString() || 0}</strong>
              </div>
            ),
            children: (
              <div className="All_Client reportSection">
                <AntDTableHOC
                  columns={columns}
                  data={tableData.insurance}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  sectionKey="insurance"
                  handleSubmit={props?.handleOk}
                />
              </div>
            ),
          },
        ];

        return (
          <Form>
            <div>
              <Title
                level={4}
                style={{
                  background: "linear-gradient(90deg, #36b446, #2b6e2f)",
                  color: "#fff",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  marginBottom: 20,
                }}
              >
                <h4
                  style={{ color: "inherit" }}
                  onClick={() => {
                    console.log(values);
                  }}
                >
                  <strong>Total Monthly Expenses:</strong>{" "}
                  <span className="float-end">
                    ${totalOverall.toLocaleString()}
                  </span>
                </h4>
              </Title>

              <Collapse
                accordion
                items={collapseItems}
                bordered={false}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                }}
              />
            </div>
>>>>>>> origin/master
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegularLivingExpenses;
