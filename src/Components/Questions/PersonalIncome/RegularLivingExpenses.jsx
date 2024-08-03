import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../Store/Store';
import { PatchAxios, PostAxios } from '../../Assets/Api/Api';

import moneyBag from "../svgs/moneyBag.svg"
import down from "../svgs/down.svg"

import Collapse from 'react-bootstrap/Collapse';


const RegularLivingExpenses = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

  const apiKey = props.modalObject.title2 === "General Living" ? "generalLivingExpenses" : "retirementLivingExpenses";

  const [totalExpense, setTotalExpense] = useState(0)
  const [totalHouseHold, setTotalHouseHold] = useState(0)
  const [totalPersonal, setTotalpersonal] = useState(0)
  const [totalTransport, setTotaltransport] = useState(0)
  const [totalInsurance, setTotalinsurance] = useState(0)

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  let regularLivingExpenses = questionDetail[apiKey] || {} // Use an empty object as default if regularLivingExpenses is undefined


  let initialValues = {};

  const [dynamicFields, setDynamicFields] = useState([]);



  const fillInitialValues = (setFieldValue) => {

    if (regularLivingExpenses?.clientFK) {
      let data = regularLivingExpenses;
      setFieldValue(`businessName`, data.businessName || '');
      setFieldValue(`businessName`, data.businessName || "");
      setFieldValue(`houseHoldRent`, data.houseHoldRent || "");
      setFieldValue(`houseHoldElectricity`, data.houseHoldElectricity || "");
      setFieldValue(`houseHoldWaterRates`, data.houseHoldWaterRates || "");
      setFieldValue(`houseHoldGas`, data.houseHoldGas || "");
      setFieldValue(`houseHoldPhone`, data.houseHoldPhone || "");
      setFieldValue(`houseHoldCouncilRates`, data.houseHoldCouncilRates || "");
      setFieldValue(`houseHoldInternet`, data.houseHoldInternet || "");
      setFieldValue(`houseHoldOthers`, data.houseHoldOthers || "");
      setFieldValue(`personalFood`, data.personalFood || "");
      setFieldValue(`personalClothing`, data.personalClothing || "");
      setFieldValue(`personalCigarettes`, data.personalCigarettes || "");
      setFieldValue(`personalAlcohol`, data.personalAlcohol || "");
      setFieldValue(`personalSubscriptionFees`, data.personalSubscriptionFees || "");
      setFieldValue(`personalClubMemberships`, data.personalClubMemberships || "");
      setFieldValue(`personalOthers`, data.personalOthers || "");
      setFieldValue(`personalHolidays`, data.personalHolidays || "");
      setFieldValue(`personalDiningOut`, data.personalDiningOut || "");
      setFieldValue(`personalMobilePhone`, data.personalMobilePhone || "");
      setFieldValue(`personalMedicalExpenses`, data.personalMedicalExpenses || "");
      setFieldValue(`transportPetrol`, data.transportPetrol || "");
      setFieldValue(`transportCarRepair`, data.transportCarRepair || "");
      setFieldValue(`transportCarRegistration`, data.transportCarRegistration || "");
      setFieldValue(`publicTransport`, data.publicTransport || "");
      setFieldValue(`transportOthers`, data.transportOthers || "");
      setFieldValue(`insurancePrivateHealth`, data.insurancePrivateHealth || "");
      setFieldValue(`insuranceLife`, data.insuranceLife || "");
      setFieldValue(`insuranceIncomeProtection`, data.insuranceIncomeProtection || "");
      setFieldValue(`insuranceCar`, data.insuranceCar || "");
      setFieldValue(`insuranceHomeContents`, data.insuranceHomeContents || "");
      setFieldValue(`insuranceOthers`, data.insuranceOthers || "");
      setFieldValue(`houseHoldRentType`, data.houseHoldRentType || "");
      setFieldValue(`houseHoldElectricityType`, data.houseHoldElectricityType || "");
      setFieldValue(`houseHoldWaterRatesType`, data.houseHoldWaterRatesType || "");
      setFieldValue(`houseHoldGasType`, data.houseHoldGasType || "");
      setFieldValue(`houseHoldPhoneType`, data.houseHoldPhoneType || "");
      setFieldValue(`houseHoldCouncilRatesType`, data.houseHoldCouncilRatesType || "");
      setFieldValue(`houseHoldInternetType`, data.houseHoldInternetType || "");
      setFieldValue(`houseHoldOthersType`, data.houseHoldOthersType || "");
      setFieldValue(`personalFoodType`, data.personalFoodType || "");
      setFieldValue(`personalClothingType`, data.personalClothingType || "");
      setFieldValue(`personalCigarettesType`, data.personalCigarettesType || "");
      setFieldValue(`personalAlcoholType`, data.personalAlcoholType || "");
      setFieldValue(`personalSubscriptionFeesType`, data.personalSubscriptionFeesType || "");
      setFieldValue(`personalClubMembershipsType`, data.personalClubMembershipsType || "");
      setFieldValue(`personalOthersType`, data.personalOthersType || "");
      setFieldValue(`personalHolidaysType`, data.personalHolidaysType || "");
      setFieldValue(`personalDiningOutType`, data.personalDiningOutType || "");
      setFieldValue(`personalMobilePhoneType`, data.personalMobilePhoneType || "");
      setFieldValue(`personalMedicalExpensesType`, data.personalMedicalExpensesType || "");
      setFieldValue(`transportPetrolType`, data.transportPetrolType || "");
      setFieldValue(`transportCarRepairType`, data.transportCarRepairType || "");
      setFieldValue(`transportCarRegistrationType`, data.transportCarRegistrationType || "");
      setFieldValue(`publicTransportType`, data.publicTransportType || "");
      setFieldValue(`transportOthersType`, data.transportOthersType || "");
      setFieldValue(`insurancePrivateHealthType`, data.insurancePrivateHealthType || "");
      setFieldValue(`insuranceLifeType`, data.insuranceLifeType || "");
      setFieldValue(`insuranceIncomeProtectionType`, data.insuranceIncomeProtectionType || "");
      setFieldValue(`insuranceCarType`, data.insuranceCarType || "");
      setFieldValue(`insuranceHomeContentsType`, data.insuranceHomeContentsType || "");
      setFieldValue(`insuranceOthersType`, data.insuranceOthersType || "");
    }
  };

  let handleInput = (e, setFieldValue) => {
    const value = e.target.value > 10 ? 10 : e.target.value;
    setFieldValue(e.target.id, value);

    let arr = []

    for (let i = 0; i < value; i++) {
      arr.push("");
    }

    setDynamicFields(arr);

  };


  let DefaultUrl = useRecoilValue(defaultUrl)


  let onSubmit = async (values) => {
    console.log(JSON.stringify(values));
    // return (false);

    let DataOf = props.modalObject.Input;

    // Create an object with additional fields
    let obj = values;

    obj.clientFK = localStorage.getItem("UserID")

    // Calculate total currentBalance
    obj[apiKey + "Total"] = totalExpense.toFixed(2);

    console.log(obj, "final obj")

    const bankAccountArray = regularLivingExpenses.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/${apiKey}/Add`, obj);
      } else {
        obj.collection = props.modalObject.Input
        res = await PatchAxios(`${DefaultUrl}/api/${apiKey}/Update`, obj);
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, [apiKey]: res };
        setQuestionDetail(updatedData);
      }

      // Reset the flag state if necessary
      if (props.flagState) {
        props.setFlagState(false);
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
    }
  };


  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema2}
      onSubmit={onSubmit}
      innerRef={props.formRef}
      enableReinitialize
    >
      {({ values, setFieldValue, setValues }) => {

        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [values.NumberOfMap]);

        return (
          <Form>

            <div className="row text-light bgColorIncome py-2 my-1">
              <div className="col-md-6">
                <label className="form-label mb-0">Total Expense</label>
              </div>
              <div className="col-md-6">
                <label
                  id="HouseholdTotalValue"
                  className="float-end form-label mb-0"
                >
                  ${totalExpense.toFixed(2)}
                  <div className="iconContainer mx-1">
                    <img className="img-fluid" src={moneyBag} alt="" />
                  </div>
                </label>
              </div>
            </div>

            {/* houseHold */}
            <div className="row ">
              <div
                onClick={() => setOpen(!open)}
                aria-controls=""
                aria-expanded={open}
                className="bgColorIncome   py-2 text-light"
              >
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label mb-0">Household</label>
                  </div>
                  <div className="col-md-6">
                    <label
                      id="HouseholdTotalValue"
                      className="float-end form-label mb-0"
                    >
                      ${totalHouseHold.toFixed(2)}
                      <div className="iconContainer mx-1">
                        <img className="img-fluid" src={down} alt="" />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div></div>
              <Collapse in={open}>
                <div className="row">
                  <div className="col-md-12">
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
                          values.houseHoldRent || 0 * values.houseHoldRentType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.houseHoldElectricity || 0 *
                          values.houseHoldElectricityType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.houseHoldWaterRates || 0 *
                          values.houseHoldWaterRatesType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.houseHoldGas || 0 * values.houseHoldGasType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.houseHoldPhone || 0 *
                          values.houseHoldPhoneType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.houseHoldCouncilRates || 0 *
                          values.houseHoldCouncilRatesType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.houseHoldInternet || 0 *
                          values.houseHoldInternetType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.houseHoldOthers || 0 *
                          values.houseHoldOthersType || 0
                        ).toFixed(2)
                      )
                    )}
                    {/* Sum of HouseHold Formula2 */}

                    {/* Sum of personal Formula3 */}
                    {setTotalpersonal(
                      parseFloat(
                        (
                          values.personalFood || 0 * values.personalFoodType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.personalClothing || 0 *
                          values.personalClothingType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.personalCigarettes || 0 *
                          values.personalCigarettesType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.personalAlcohol || 0 *
                          values.personalAlcoholType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.personalSubscriptionFees || 0 *
                          values.personalSubscriptionFeesType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.personalClubMemberships || 0 *
                          values.personalClubMembershipsType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.personalOthers || 0 *
                          values.personalOthersType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.personalHolidays || 0 *
                          values.personalHolidaysType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.personalDiningOut || 0 *
                          values.personalDiningOutType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.personalMobilePhone || 0 *
                          values.personalMobilePhoneType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.personalMedicalExpenses || 0 *
                          values.personalMedicalExpensesType || 0
                        ).toFixed(2)
                      )
                    )}

                    {/* Sum of transportFormula4 */}

                    {setTotaltransport(
                      parseFloat(
                        (
                          values.transportPetrol || 0 *
                          values.transportPetrolType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.transportCarRepair || 0 *
                          values.transportCarRepairType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.transportCarRegistration || 0 *
                          values.transportCarRegistrationType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.publicTransport || 0 *
                          values.publicTransportType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.transportOthers || 0 *
                          values.transportOthersType || 0
                        ).toFixed(2)
                      )
                    )}

                    {/* Sum of insurance Formula5 */}

                    {setTotalinsurance(
                      parseFloat(
                        (
                          values.insurancePrivateHealth || 0 * values.insurancePrivateHealthType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.insuranceLife || 0 *
                          values.insuranceLifeType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.insuranceIncomeProtection || 0 *
                          values.insuranceIncomeProtectionType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.insuranceCar || 0 * values.insuranceCarType || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.insuranceHomeContents || 0 *
                          values.insuranceHomeContentsTypFe || 0
                        ).toFixed(2)
                      ) +
                      parseFloat(
                        (
                          values.insuranceOthers || 0 *
                          values.insuranceOthersType || 0
                        ).toFixed(2)
                      )
                    )}

                    {/* houseHold row 1 */}
                    <div className="row  my-3">
                      {/* Rent */}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="houseHoldRent"
                              className="form-label"
                            >
                              Rent
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="houseHoldRent"
                              placeholder="Rent"
                              name="houseHoldRent"
                            />

                            <ErrorMessage
                              name="houseHoldRent"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              htmlFor=""
                              className="form-label float-end"
                            >
                              ${((values.houseHoldRent || 0) * (values.houseHoldRentType || 0)).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="houseHoldRentType"
                              className="form-select shadow  inputDesign"
                              name="houseHoldRentType"
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
                              name="houseHoldRentType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Rent */}

                      {/* Electricity */}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="houseHoldElectricity"
                              className="form-label"
                            >
                              Electricity
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="houseHoldElectricity"
                              placeholder="Electricity"
                              name="houseHoldElectricity"
                            />
                            <ErrorMessage
                              name="houseHoldElectricity"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              htmlFor=""
                              className="form-label float-end"
                            >
                              $
                              {(
                                (values.houseHoldElectricity || 0) *
                                (values.houseHoldElectricityType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="houseHoldElectricityType"
                              className="form-select shadow  inputDesign"
                              name="houseHoldElectricityType"
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
                              name="houseHoldElectricityType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Electricity */}
                    </div>
                    {/* houseHold row 1 */}

                    {/* houseHold row 2 */}
                    <div className="row  my-3">
                      {/* Water Rates*/}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="houseHoldWaterRates"
                              className="form-label"
                            >
                              Water Rates
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="houseHoldWaterRates"
                              placeholder="Water Rates"
                              name="houseHoldWaterRates"
                            />
                            <ErrorMessage
                              name="houseHoldWaterRates"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="houseHoldWaterRateValue"
                              className="form-label float-end"
                            >
                              $
                              {(
                                (values.houseHoldWaterRates || 0) *
                                (values.houseHoldWaterRatesType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="houseHoldWaterRatesType"
                              className="form-select shadow  inputDesign"
                              name="houseHoldWaterRatesType"
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
                              name="houseHoldWaterRatesType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Water Rates */}

                      {/* Gas */}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="houseHoldGas"
                              className="form-label"
                            >
                              Gas
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="houseHoldGas"
                              name="houseHoldGas"
                              placeholder="Gas"
                            />
                            <ErrorMessage
                              name="houseHoldGas"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="houseHoldGasValue"
                              className="form-label float-end "
                            >
                              $
                              {(
                                (values.houseHoldGas || 0) *
                                (values.houseHoldGasType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="houseHoldGasType"
                              className="form-select shadow  inputDesign"
                              name="houseHoldGasType"
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
                              name="houseHoldGasType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Gas */}
                    </div>
                    {/* houseHold row 2 */}

                    {/* houseHold row 3 */}
                    <div className="row  my-3">
                      {/* Phone*/}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="houseHoldPhone"
                              className="form-label"
                            >
                              Phone
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="houseHoldPhone"
                              placeholder="Phone"
                              name="houseHoldPhone"
                            />
                            <ErrorMessage
                              name="houseHoldPhone"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="houseHoldPhoneValue"
                              className="form-label float-end"
                            >
                              $
                              {(
                                (values.houseHoldPhone || 0) *
                                (values.houseHoldPhoneType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="houseHoldPhoneType"
                              name="houseHoldPhoneType"
                              className="form-select shadow  inputDesign"
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
                              name="houseHoldPhoneType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Phone */}

                      {/* Council Rates */}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="houseHoldCouncilRates"
                              className="form-label"
                            >
                              Council Rates
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="houseHoldCouncilRates"
                              name="houseHoldCouncilRates"
                              placeholder="Council Rates"
                            />
                            <ErrorMessage
                              name="houseHoldCouncilRates"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="houseHoldCouncilRatesValue"
                              className="form-label float-end "
                            >
                              $
                              {(
                                (values.houseHoldCouncilRates || 0) *
                                (values.houseHoldCouncilRatesType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="houseHoldCouncilRatesType"
                              className="form-select shadow  inputDesign"
                              name="houseHoldCouncilRatesType"
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
                              name="houseHoldCouncilRatesType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Council Rates */}
                    </div>
                    {/* houseHold row 3 */}

                    {/* houseHold row 4 */}
                    <div className="row  my-3">
                      {/* Internet */}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="houseHoldInternet"
                              className="form-label"
                            >
                              Internet
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="houseHoldInternet"
                              name="houseHoldInternet"
                              placeholder="Internet"
                            />

                            <ErrorMessage
                              name="houseHoldInternet"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="houseHoldInternetValue"
                              className="form-label float-end "
                            >
                              $
                              {(
                                (values.houseHoldInternet || 0) *
                                (values.houseHoldInternetType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="houseHoldInternetType"
                              name="houseHoldInternetType"
                              className="form-select shadow  inputDesign"
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
                              name="houseHoldInternetType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Internet*/}
                      {/* Other */}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="houseHoldOthers"
                              className="form-label"
                            >
                              Other
                            </label>
                            <Field
                              name="houseHoldOthers"
                              type="number"
                              className="form-control inputDesign shadow"
                              id="houseHoldOthers"
                              placeholder="Other"
                            />
                            <ErrorMessage
                              name="houseHoldOthers"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="houseHoldOthersValue"
                              className="form-label float-end "
                            >
                              $
                              {(
                                (values.houseHoldOthers || 0) *
                                (values.houseHoldOthersType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="houseHoldOthersType"
                              name="houseHoldOthersType"
                              className="form-select shadow  inputDesign"
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
                              name="houseHoldOthersType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Internet*/}
                    </div>
                    {/* houseHold row 4 */}
                  </div>
                </div>
              </Collapse>
            </div>
            {/* houseHold*/}

            {/* personal   */}
            <div className="row my-1">
              <div
                onClick={() => setOpen2(!open2)}
                aria-controls=""
                aria-expanded={open2}
                className="bgColorIncome   py-2 text-light"
              >
                <div className="row ">
                  <div className="col-md-6">
                    <label className="form-label mb-0">Personal</label>
                  </div>
                  <div className="col-md-6">
                    <label className="float-end mb-0">
                      ${totalPersonal.toFixed(2)}
                      <div className="iconContainer mx-1">
                        <img className="img-fluid" src={down} alt="" />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div></div>
              <Collapse in={open2}>
                <div className="row">
                  <div className="col-md-12">
                    {/* personal    row 1 */}
                    <div className="row  my-3">
                      {/* Food */}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="personalFood"
                              className="form-label"
                            >
                              Food
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              name="personalFood"
                              id="personalFood"
                              placeholder="Food"
                            />
                            <ErrorMessage
                              name="personalFood"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              htmlFor="personalFoodValue"
                              className="form-label float-end"
                            >
                              $
                              {(
                                (values.personalFood || 0) *
                                (values.personalFoodType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="personalFoodType"
                              name="personalFoodType"
                              className="form-select shadow  inputDesign"
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
                              name="personalFoodType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Food */}

                      {/* Clothing */}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="personalClothing"
                              className="form-label"
                            >
                              Clothing
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="personalClothing"
                              name="personalClothing"
                              placeholder="Clothing"
                            />
                            <ErrorMessage
                              name="personalClothing"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="personalClothingValue"
                              className="form-label float-end"
                            >
                              $
                              {(
                                (values.personalClothing || 0) *
                                (values.personalClothingType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              name="personalClothingType"
                              id="personalClothingType"
                              className="form-select shadow  inputDesign"
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
                              name="personalClothingType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Clothing */}
                    </div>
                    {/* personal    row 1 */}

                    {/* personal row 2 */}
                    <div className="row  my-3">
                      {/* Cigarettes*/}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="personalCigarettes"
                              className="form-label"
                            >
                              Cigarettes
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              name="personalCigarettes"
                              id="personalCigarettes"
                              placeholder="Cigarettes"
                            />
                            <ErrorMessage
                              name="personalCigarettes"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="personalCigarettesValue"
                              className="form-label float-end"
                            >
                              $
                              {(
                                (values.personalCigarettes || 0) *
                                (values.personalCigarettesType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="personalCigarettesType"
                              name="personalCigarettesType"
                              className="form-select shadow  inputDesign"
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
                              name="personalCigarettesType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Cigarettes */}

                      {/* Alcohol */}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="personalAlcohol"
                              className="form-label"
                            >
                              Alcohol
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              name="personalAlcohol"
                              id="personalAlcohol"
                              placeholder="Alcohol"
                            />
                            <ErrorMessage
                              name="personalAlcohol"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="personalAlcoholValue"
                              className="form-label float-end "
                            >
                              $
                              {(
                                (values.personalAlcohol || 0) *
                                (values.personalAlcoholType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="personalAlcoholType"
                              name="personalAlcoholType"
                              className="form-select shadow  inputDesign"
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
                              name="personalAlcoholType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Alcohol */}
                    </div>
                    {/* personal row 2 */}

                    {/* personal row 3 */}
                    <div className="row  my-3">
                      {/* Subscription Fees*/}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="personalSubscriptionFees"
                              className="form-label"
                            >
                              Subscription Fees
                            </label>
                            <Field
                              name="personalSubscriptionFees"
                              type="number"
                              className="form-control inputDesign shadow"
                              id="personalSubscriptionFees"
                              placeholder="Subscription Fees"
                            />
                            <ErrorMessage
                              name="personalSubscriptionFees"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="personalSubscriptionFeesValue"
                              className="form-label float-end"
                            >
                              $
                              {(
                                (values.personalSubscriptionFees || 0) *
                                (values.personalSubscriptionFeesType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="personalSubscriptionFeesType"
                              name="personalSubscriptionFeesType"
                              className="form-select shadow  inputDesign"
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
                              name="personalSubscriptionFeesType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Subscription Fees */}

                      {/* Memberships & Clubs */}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="personalClubMemberships"
                              className="form-label"
                            >
                              Memberships & Clubs
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="personalClubMemberships"
                              name="personalClubMemberships"
                              placeholder="Memberships & Clubs"
                            />
                            <ErrorMessage
                              name="personalClubMemberships"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="personalClubMembershipsValue"
                              className="form-label float-end "
                            >
                              $
                              {(
                                (values.personalClubMemberships || 0) *
                                (values.personalClubMembershipsType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="personalClubMembershipsType"
                              name="personalClubMembershipsType"
                              className="form-select shadow  inputDesign"
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
                              name="personalClubMembershipsType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Memberships & Clubs */}
                    </div>
                    {/* personal row 3 */}

                    {/* personal row 4 */}
                    <div className="row  my-3">
                      {/* Other*/}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="personalOthers"
                              className="form-label"
                            >
                              Other
                            </label>
                            <Field
                              name="personalOthers"
                              type="number"
                              className="form-control inputDesign shadow"
                              id="personalOthers"
                              placeholder="Other"
                            />
                            <ErrorMessage
                              name="personalOthers"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="personalOthersValue"
                              className="form-label float-end"
                            >
                              $
                              {(
                                (values.personalOthers || 0) *
                                (values.personalOthersType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="personalOthersType"
                              name="personalOthersType"
                              className="form-select shadow  inputDesign"
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
                              name="personalOthersType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Other */}

                      {/* Holidays */}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="personalHolidays"
                              className="form-label"
                            >
                              Holidays
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              name="personalHolidays"
                              id="personalHolidays"
                              placeholder="Holidays"
                            />
                            <ErrorMessage
                              name="personalHolidays"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="personalHolidaysValue"
                              className="form-label float-end "
                            >
                              $
                              {(
                                (values.personalHolidays || 0) *
                                (values.personalHolidaysType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="personalHolidaysType"
                              name="personalHolidaysType"
                              className="form-select shadow  inputDesign"
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
                              name="personalHolidaysType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Alcohol */}
                    </div>
                    {/* personal row 4 */}

                    {/* personal row 5 */}
                    <div className="row  my-3">
                      {/* Dining Out*/}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="personalDiningOut"
                              className="form-label"
                            >
                              Dining Out
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="personalDiningOut"
                              name="personalDiningOut"
                              placeholder="Dining Out"
                            />
                            <ErrorMessage
                              name="personalDiningOut"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="personalDiningOutValue"
                              className="form-label float-end"
                            >
                              $
                              {(
                                (values.personalDiningOut || 0) *
                                (values.personalDiningOutType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="personalDiningOutType"
                              name="personalDiningOutType"
                              className="form-select shadow  inputDesign"
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
                              name="personalDiningOutType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Dining Out */}

                      {/* Mobile Phone */}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="personalMobilePhone"
                              className="form-label"
                            >
                              Mobile Phone
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="personalMobilePhone"
                              name="personalMobilePhone"
                              placeholder="Mobile Phone"
                            />
                            <ErrorMessage
                              name="personalMobilePhone"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="personalMobilePhoneValue"
                              className="form-label float-end "
                            >
                              $
                              {(
                                (values.personalMobilePhone || 0) *
                                (values.personalMobilePhoneType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="personalMobilePhoneType"
                              name="personalMobilePhoneType"
                              className="form-select shadow  inputDesign"
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
                              name="personalMobilePhoneType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Mobile Phone */}
                    </div>
                    {/* personal row 5 */}

                    {/* personal row 5 */}
                    <div className="row  my-3">
                      {/* Dining Out*/}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="personalMedicalExpenses"
                              className="form-label"
                            >
                              Medical Expenses
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="personalMedicalExpenses"
                              name="personalMedicalExpenses"
                              placeholder="Medical Expenses"
                            />
                            <ErrorMessage
                              name="personalMedicalExpenses"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="personalMedicalExpensesValue"
                              className="form-label float-end"
                            >
                              $
                              {(
                                (values.personalMedicalExpenses || 0) *
                                (values.personalMedicalExpensesType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="personalMedicalExpensesType"
                              name="personalMedicalExpensesType"
                              className="form-select shadow  inputDesign"
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
                              name="personalMedicalExpensesType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Medical Expenses */}
                    </div>
                    {/* personal row 6 */}
                  </div>
                </div>
              </Collapse>
            </div>
            {/* personal*/}

            {/* transport */}
            <div className="row my-1 ">
              <div
                onClick={() => setOpen3(!open3)}
                aria-controls=""
                aria-expanded={open3}
                className="bgColorIncome   py-2 text-light"
              >
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label mb-0">Transport</label>
                  </div>
                  <div className="col-md-6">
                    <label
                      id="transportTotalValue"
                      className="float-end form-label mb-0"
                    >
                      ${totalTransport.toFixed(2)}
                      <div className="iconContainer mx-1">
                        <img className="img-fluid" src={down} alt="" />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div></div>
              <Collapse in={open3}>
                <div className="row">
                  <div className="col-md-12">
                    {/* transportPetrol   row 1 */}
                    <div className="row  my-3">
                      {/* Petrol */}

                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="transportPetrol"
                              className="form-label"
                            >
                              Petrol
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              name="transportPetrol"
                              id="transportPetrol"
                              placeholder="Petrol"
                            />
                            <ErrorMessage
                              name="transportPetrol"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="transportPetrolValue"
                              className="form-label float-end"
                            >
                              $
                              {(
                                (values.transportPetrol || 0) *
                                (values.transportPetrolType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="transportPetrolType"
                              name="transportPetrolType"
                              className="form-select shadow  inputDesign"
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
                              name="transportPetrolType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Petrol */}

                      {/* Car Repairs & Maintenance */}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="transportCarRepair"
                              className="form-label"
                            >
                              Car Maintenance
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="transportCarRepair"
                              name="transportCarRepair"
                              placeholder="Car Repairs & Maintenance"
                            />
                            <ErrorMessage
                              name="transportCarRepair"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="transportCarRepairValue"
                              className="form-label float-end"
                            >
                              $
                              {(
                                (values.transportCarRepair || 0) *
                                (values.transportCarRepairType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="transportCarRepairType"
                              name="transportCarRepairType"
                              className="form-select shadow  inputDesign"
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
                              name="transportCarRepairType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Electricity */}
                    </div>
                    {/* transport   row 1 */}

                    {/* transport  row 2 */}
                    <div className="row  my-3">
                      {/* Car Registration */}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="transportCarRegistration"
                              className="form-label"
                            >
                              Car Registration
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="transportCarRegistration"
                              name="transportCarRegistration"
                              placeholder="Car Registration"
                            />
                            <ErrorMessage
                              name="transportCarRegistration"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="transportCarRegistrationValue"
                              className="form-label float-end"
                            >
                              $
                              {(
                                (values.transportCarRegistration || 0) *
                                (values.transportCarRegistrationType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="transportCarRegistrationType"
                              name="transportCarRegistrationType"
                              className="form-select shadow  inputDesign"
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
                              name="transportCarRegistrationType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Car Registration */}

                      {/* public transport */}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="publicTransport"
                              className="form-label"
                            >
                              Public transport
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="publicTransport"
                              name="publicTransport"
                              placeholder="public transport"
                            />
                            <ErrorMessage
                              name="publicTransport"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="publicTransportValue"
                              className="form-label float-end"
                            >
                              $
                              {(
                                (values.publicTransport || 0) *
                                (values.publicTransportType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="publicTransportType"
                              name="publicTransportType"
                              className="form-select shadow  inputDesign"
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
                              name="publicTransportType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* public transport */}
                    </div>
                    {/* transport   row 2 */}

                    {/* transport  row 3 */}
                    <div className="row  my-3">
                      {/* Other*/}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="transportOthers"
                              className="form-label"
                            >
                              Other
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="transportOthers"
                              name="transportOthers"
                              placeholder="Other"
                            />
                            <ErrorMessage
                              name="transportOthers"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="transportOthersValue"
                              className="form-label float-end"
                            >
                              $
                              {(
                                (values.transportOthers || 0) *
                                (values.transportOthersType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              name="transportOthersType"
                              id="transportOthersType"
                              className="form-select shadow  inputDesign"
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
                              name="transportOthersType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Car Registration */}
                    </div>
                    {/* transport   row 3 */}
                  </div>
                </div>
              </Collapse>
            </div>
            {/* transport   */}

            {/* insurance */}
            <div className="row my-1">
              <div
                onClick={() => setOpen4(!open4)}
                aria-controls=""
                aria-expanded={open4}
                className="bgColorIncome   py-2 text-light"
              >
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label mb-0">Insurance</label>
                  </div>
                  <div className="col-md-6">
                    <label
                      id="insuranceTotalValue"
                      className="float-end form-label mb-0"
                    >
                      ${totalInsurance.toFixed(2)}
                      <div className="iconContainer mx-1">
                        <img className="img-fluid" src={down} alt="" />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div></div>
              <Collapse in={open4}>
                <div className="row">
                  <div className="col-md-12">
                    {/* insurance   row 1 */}
                    <div className="row  my-3">
                      {/* private Health */}

                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="insurancePrivateHealth"
                              className="form-label"
                            >
                              Private Health
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="insurancePrivateHealth"
                              name="insurancePrivateHealth"
                              placeholder="private Health"
                            />
                            <ErrorMessage
                              name="insurancePrivateHealth"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="insurancePrivateHealthValue"
                              className="form-label float-end"
                            >
                              $
                              {(
                                (values.insurancePrivateHealth || 0) *
                                (values.insurancePrivateHealthType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="insurancePrivateHealthType"
                              name="insurancePrivateHealthType"
                              className="form-select shadow  inputDesign"
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
                              name="insurancePrivateHealthType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* private Health */}

                      {/* life/TPD/Trauma */}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="insuranceLife"
                              className="form-label"
                            >
                              Life/TPD/Trauma
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="insuranceLife"
                              name="insuranceLife"
                              placeholder="life/TPD/Trauma"
                            />
                            <ErrorMessage
                              name="insuranceLife"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="insuranceLifeValue"
                              className="form-label float-end"
                            >
                              $
                              {(
                                (values.insuranceLife || 0) *
                                (values.insuranceLifeType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="insuranceLifeType"
                              name="insuranceLifeType"
                              className="form-select shadow  inputDesign"
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
                              name="insuranceLifeType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* life/TPD/Trauma */}
                    </div>
                    {/* insurance   row 1 */}

                    {/* transport  row 2 */}
                    <div className="row  my-3">
                      {/* Income Protection */}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="insuranceIncomeProtection"
                              className="form-label"
                            >
                              Income Protection
                            </label>
                            <Field
                              name="insuranceIncomeProtection"
                              type="number"
                              className="form-control inputDesign shadow"
                              id="insuranceIncomeProtection"
                              placeholder="Income Protection"
                            />
                            <ErrorMessage
                              name="insuranceIncomeProtection"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="insuranceIncomeProtectionValue"
                              className="form-label float-end"
                            >
                              $
                              {(
                                (values.insuranceIncomeProtection || 0) *
                                (values.insuranceIncomeProtectionType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="insuranceIncomeProtectionType"
                              name="insuranceIncomeProtectionType"
                              className="form-select shadow  inputDesign"
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
                              name="insuranceIncomeProtectionType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Income Protection */}

                      {/* Car*/}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="insuranceCar"
                              className="form-label"
                            >
                              Car
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="insuranceCar"
                              name="insuranceCar"
                              placeholder="Car"
                            />
                            <ErrorMessage
                              name="insuranceCar"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="insuranceCarValue"
                              className="form-label float-end"
                            >
                              $
                              {(
                                (values.insuranceCar || 0) *
                                (values.insuranceCarType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="insuranceCarType"
                              name="insuranceCarType"
                              className="form-select shadow  inputDesign"
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
                              name="insuranceCarType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Car */}
                    </div>
                    {/* insurance row 2 */}

                    {/* insurance row 3 */}
                    <div className="row  my-3">
                      {/* Other*/}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="insuranceHomeContents"
                              className="form-label"
                            >
                              Home And Contents
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="insuranceHomeContents"
                              name="insuranceHomeContents"
                              placeholder="Home And Contents"
                            />
                            <ErrorMessage
                              name="insuranceHomeContents"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="insuranceHomeContentsValue"
                              className="form-label float-end"
                            >
                              $
                              {(
                                (values.insuranceHomeContents || 0) *
                                (values.insuranceHomeContentsType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="insuranceHomeContentsType"
                              name="insuranceHomeContentsType"
                              className="form-select shadow  inputDesign"
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
                              name="insuranceHomeContentsType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Home And Contents */}
                      {/* Other*/}
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-7">
                            <label
                              htmlFor="insuranceOthers"
                              className="form-label"
                            >
                              Other
                            </label>
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="insuranceOthers"
                              name="insuranceOthers"
                              placeholder="Other"
                            />
                            <ErrorMessage
                              name="insuranceOthers"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                          <div className="col-5">
                            <label
                              id="TransinsuranceValue"
                              className="form-label float-end"
                            >
                              $
                              {(
                                (values.insuranceOthers || 0) *
                                (values.insuranceOthersType || 0)
                              ).toFixed(2)}
                            </label>
                            <Field
                              as="select"
                              id="insuranceOthersType"
                              name="insuranceOthersType"
                              className="form-select shadow  inputDesign"
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
                              name="insuranceOthersType"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Other */}
                    </div>
                    {/* insurance  row 3 */}
                  </div>
                </div>
              </Collapse>
            </div>
            {/* insurance    */}
          </Form>
        )
      }
      }
    </Formik>
  );
};

export default RegularLivingExpenses;
