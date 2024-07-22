import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, InputGroup, Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../Store/Store';
import { PatchAxios, PostAxios } from '../../Assets/Api/Api';




import plus from "../svgs/plus.svg";
import noteBook from "../svgs/notebook.svg"
import moneyBag from "../svgs/moneyBag.svg"
import down from "../svgs/down.svg"

import Collapse from 'react-bootstrap/Collapse';


const RegularLivingExpenses = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);


  const [totalExpense, setTotalExpense] = useState(0)
  const [totalHouseHold, setTotalHouseHold] = useState(0)
  const [totalPersonal, setTotalPersonal] = useState(0)
  const [totalTransport, setTotalTransport] = useState(0)
  const [totalInsurance, setTotalInsurance] = useState(0)

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  let incomeFromSoleTrader = questionDetail.incomeFromSoleTrader || {
    client: [],
    partner: [],
    joint: [],

  }; // Use an empty object as default if incomeFromSoleTrader is undefined


  let initialValues = incomeFromSoleTrader[props.modalObject.Input].length ? { NumberOfMap: incomeFromSoleTrader[props.modalObject.Input].length } : { NumberOfMap: "" };

  const [dynamicFields, setDynamicFields] = useState([]);


  useEffect(() => {
    if (incomeFromSoleTrader[props.modalObject.Input] && incomeFromSoleTrader[props.modalObject.Input].length) {
      let arr = []

      for (let i = 0; i < incomeFromSoleTrader[props.modalObject.Input].length; i++) {
        arr.push("");
      }

      setDynamicFields(arr);

    }
  }, [])

  const fillInitialValues = (setFieldValue) => {

    if (incomeFromSoleTrader[props.modalObject.Input] && incomeFromSoleTrader[props.modalObject.Input].length) {

      incomeFromSoleTrader[props.modalObject.Input].forEach((data, i) => {
        if (data) {
          setFieldValue(`businessName${i}`, data.businessName || '');
          setFieldValue(`ABN${i}`, data.ABN || '');
          setFieldValue(`businessAddress${i}`, data.businessAddress || '');
          setFieldValue(`netSoleTrader${i}`, data.netSoleTrader || '');
          setFieldValue(`goodWillBusinessValuation${i}`, data.goodWillBusinessValuation || '');

        }
      });
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
    return (false);
    // Extract the number of maps from the values
    const numberOfMaps = parseInt(values.NumberOfMap, 10);
    const newEntries = [];

    // Iterate through each map entry and create a new object
    for (let i = 0; i < numberOfMaps; i++) {
      const newEntry = {
        businessName: values[`businessName${i}`] || "",
        ABN: values[`ABN${i}`] || "",
        businessAddress: values[`businessAddress${i}`] || "",
        netSoleTrader: values[`netSoleTrader${i}`] || "",
        goodWillBusinessValuation: values[`goodWillBusinessValuation${i}`] || "",
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

    obj[DataOf] = newEntries

    // Calculate total currentBalance
    obj[DataOf + "Total"] = newEntries.reduce((total, entry) => total + entry.annualAdvice, 0);

    console.log(obj, "final obj")

    // Check if incomeFromSoleTrader and the array at props.modalObject.Input exist
    // const bankAccountArray = incomeFromSoleTrader[props.modalObject.Input] || [];
    const bankAccountArray = incomeFromSoleTrader.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/incomeFromSoleTrader/Add`, obj);
      } else {
        obj.collection = props.modalObject.Input
        res = await PatchAxios(`${DefaultUrl}/api/incomeFromSoleTrader/Update`, obj);
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, incomeFromSoleTrader: res };
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
      {({ values, setFieldValue, setValues }) => (
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
                        values.houseHoldrent || 0 * values.houseHoldrentType || 0
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
                        values.houseHoldWaterRateType || 0
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
                        values.houseHoldOther || 0 *
                        values.houseHoldOtherType || 0
                      ).toFixed(2)
                    )
                  )}
                  {/* Sum of HouseHold Formula2 */}

                  {/* Sum of Personal Formula3 */}
                  {setTotalPersonal(
                    parseFloat(
                      (
                        values.PersonalFood || 0 * values.PersonalFoodType || 0
                      ).toFixed(2)
                    ) +
                    parseFloat(
                      (
                        values.PersonalClothing || 0 *
                        values.PersonalClothingValueType || 0
                      ).toFixed(2)
                    ) +
                    parseFloat(
                      (
                        values.PersonalCigarettes || 0 *
                        values.PersonalCigarettesType || 0
                      ).toFixed(2)
                    ) +
                    parseFloat(
                      (
                        values.PersonalAlcohol || 0 *
                        values.PersonalAlcoholType || 0
                      ).toFixed(2)
                    ) +
                    parseFloat(
                      (
                        values.PersonalSubscriptionFees || 0 *
                        values.PersonalSubscriptionFeesType || 0
                      ).toFixed(2)
                    ) +
                    parseFloat(
                      (
                        values.PersonalMembershipsClubs || 0 *
                        values.PersonalMembershipsClubsType || 0
                      ).toFixed(2)
                    ) +
                    parseFloat(
                      (
                        values.PersonalOther || 0 *
                        values.PersonalOtherType || 0
                      ).toFixed(2)
                    ) +
                    parseFloat(
                      (
                        values.PersonalHolidays || 0 *
                        values.PersonalHolidaysType || 0
                      ).toFixed(2)
                    ) +
                    parseFloat(
                      (
                        values.PersonalDiningOut || 0 *
                        values.PersonalDiningOutType || 0
                      ).toFixed(2)
                    ) +
                    parseFloat(
                      (
                        values.PersonalMobilePhone || 0 *
                        values.PersonalMobilePhoneType || 0
                      ).toFixed(2)
                    ) +
                    parseFloat(
                      (
                        values.PersonalMedicalExpenses || 0 *
                        values.PersonalMedicalExpensesType || 0
                      ).toFixed(2)
                    )
                  )}

                  {/* Sum of TransportFormula4 */}

                  {setTotalTransport(
                    parseFloat(
                      (
                        values.TransportPetrol || 0 *
                        values.TransportPetrolType || 0
                      ).toFixed(2)
                    ) +
                    parseFloat(
                      (
                        values.TransportCarRepairs || 0 *
                        values.TransportCarRepairsType || 0
                      ).toFixed(2)
                    ) +
                    parseFloat(
                      (
                        values.TransportCarRegistration || 0 *
                        values.TransportCarRegistrationType || 0
                      ).toFixed(2)
                    ) +
                    parseFloat(
                      (
                        values.PublicTransport || 0 *
                        values.PublicTransportType || 0
                      ).toFixed(2)
                    ) +
                    parseFloat(
                      (
                        values.TransportOther || 0 *
                        values.TransportOtherType || 0
                      ).toFixed(2)
                    )
                  )}

                  {/* Sum of Insurance Formula5 */}

                  {setTotalInsurance(
                    parseFloat(
                      (
                        values.PrivateHealth || 0 * values.PrivateHealthType || 0
                      ).toFixed(2)
                    ) +
                    parseFloat(
                      (
                        values.LifeTPDTrauma || 0 *
                        values.LifeTPDTraumaType || 0
                      ).toFixed(2)
                    ) +
                    parseFloat(
                      (
                        values.InsuranceIncomeProtection || 0 *
                        values.InsuranceIncomeProtectionType || 0
                      ).toFixed(2)
                    ) +
                    parseFloat(
                      (
                        values.InsuranceCar || 0 * values.InsuranceCarType || 0
                      ).toFixed(2)
                    ) +
                    parseFloat(
                      (
                        values.InsuranceHomeContents || 0 *
                        values.InsuranceHomeContentsTypFe || 0
                      ).toFixed(2)
                    ) +
                    parseFloat(
                      (
                        values.InsuranceOther || 0 *
                        values.TransInsuranceType || 0
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
                            htmlFor="houseHoldrent"
                            className="form-label"
                          >
                            Rent
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            id="houseHoldrent"
                            placeholder="Rent"
                            name="houseHoldrent"
                          />

                          <ErrorMessage
                            name="houseHoldrent"
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
                              values.houseHoldrent || 0 *
                              values.houseHoldrentType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="houseHoldrentType"
                            className="form-select shadow  inputDesign"
                            name="houseHoldrentType"
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
                            name="houseHoldrentType"
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
                              values.houseHoldElectricity || 0 *
                              values.houseHoldElectricityType || 0
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
                              values.houseHoldWaterRates || 0 *
                              values.houseHoldWaterRateType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="houseHoldWaterRateType"
                            className="form-select shadow  inputDesign"
                            name="houseHoldWaterRateType"
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
                            name="houseHoldWaterRateType"
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
                              values.houseHoldGas || 0 *
                              values.houseHoldGasType || 0
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
                              values.houseHoldPhone || 0 *
                              values.houseHoldPhoneType || 0
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
                              values.houseHoldCouncilRates || 0 *
                              values.houseHoldCouncilRatesType || 0
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
                              values.houseHoldInternet || 0 *
                              values.houseHoldInternetType || 0
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
                            htmlFor="houseHoldOther"
                            className="form-label"
                          >
                            Other
                          </label>
                          <Field
                            name="houseHoldOther"
                            type="number"
                            className="form-control inputDesign shadow"
                            id="houseHoldOther"
                            placeholder="Other"
                          />
                          <ErrorMessage
                            name="houseHoldOther"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="houseHoldOtherValue"
                            className="form-label float-end "
                          >
                            $
                            {(
                              values.houseHoldOther || 0 *
                              values.houseHoldOtherType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="houseHoldOtherType"
                            name="houseHoldOtherType"
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
                            name="houseHoldOtherType"
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

          {/* Personal   */}
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
                  {/* Personal    row 1 */}
                  <div className="row  my-3">
                    {/* Food */}
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-7">
                          <label
                            htmlFor="PersonalFood"
                            className="form-label"
                          >
                            Food
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            name="PersonalFood"
                            id="PersonalFood"
                            placeholder="Food"
                          />
                          <ErrorMessage
                            name="PersonalFood"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            htmlFor="PersonalFoodValue"
                            className="form-label float-end"
                          >
                            $
                            {(
                              values.PersonalFood || 0 *
                              values.PersonalFoodType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="PersonalFoodType"
                            name="PersonalFoodType"
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
                            name="PersonalFoodType"
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
                            htmlFor="PersonalClothing"
                            className="form-label"
                          >
                            Clothing
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            id="PersonalClothing"
                            name="PersonalClothing"
                            placeholder="Clothing"
                          />
                          <ErrorMessage
                            name="PersonalClothing"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="PersonalClothingValue"
                            className="form-label float-end"
                          >
                            $
                            {(
                              values.PersonalClothing || 0 *
                              values.PersonalClothingValueType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            name="PersonalClothingValueType"
                            id="PersonalClothingValueType"
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
                            name="PersonalClothingValueType"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Clothing */}
                  </div>
                  {/* Personal    row 1 */}

                  {/* Personal row 2 */}
                  <div className="row  my-3">
                    {/* Cigarettes*/}
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-7">
                          <label
                            htmlFor="PersonalCigarettes"
                            className="form-label"
                          >
                            Cigarettes
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            name="PersonalCigarettes"
                            id="PersonalCigarettes"
                            placeholder="Cigarettes"
                          />
                          <ErrorMessage
                            name="PersonalCigarettes"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="PersonalCigarettesValue"
                            className="form-label float-end"
                          >
                            $
                            {(
                              values.PersonalCigarettes || 0 *
                              values.PersonalCigarettesType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="PersonalCigarettesType"
                            name="PersonalCigarettesType"
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
                            name="PersonalCigarettesType"
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
                            htmlFor="PersonalAlcohol"
                            className="form-label"
                          >
                            Alcohol
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            name="PersonalAlcohol"
                            id="PersonalAlcohol"
                            placeholder="Alcohol"
                          />
                          <ErrorMessage
                            name="PersonalAlcohol"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="PersonalAlcoholValue"
                            className="form-label float-end "
                          >
                            $
                            {(
                              values.PersonalAlcohol || 0 *
                              values.PersonalAlcoholType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="PersonalAlcoholType"
                            name="PersonalAlcoholType"
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
                            name="PersonalAlcoholType"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Alcohol */}
                  </div>
                  {/* Personal row 2 */}

                  {/* Personal row 3 */}
                  <div className="row  my-3">
                    {/* Subscription Fees*/}
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-7">
                          <label
                            htmlFor="PersonalSubscriptionFees"
                            className="form-label"
                          >
                            Subscription Fees
                          </label>
                          <Field
                            name="PersonalSubscriptionFees"
                            type="number"
                            className="form-control inputDesign shadow"
                            id="PersonalSubscriptionFees"
                            placeholder="Subscription Fees"
                          />
                          <ErrorMessage
                            name="PersonalSubscriptionFees"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="PersonalSubscriptionFeesValue"
                            className="form-label float-end"
                          >
                            $
                            {(
                              values.PersonalSubscriptionFees || 0 *
                              values.PersonalSubscriptionFeesType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="PersonalSubscriptionFeesType"
                            name="PersonalSubscriptionFeesType"
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
                            name="PersonalSubscriptionFeesType"
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
                            htmlFor="PersonalMembershipsClubs"
                            className="form-label"
                          >
                            Memberships & Clubs
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            id="PersonalMembershipsClubs"
                            name="PersonalMembershipsClubs"
                            placeholder="Memberships & Clubs"
                          />
                          <ErrorMessage
                            name="PersonalMembershipsClubs"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="PersonalMembershipsClubsValue"
                            className="form-label float-end "
                          >
                            $
                            {(
                              values.PersonalMembershipsClubs || 0 *
                              values.PersonalMembershipsClubsType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="PersonalMembershipsClubsType"
                            name="PersonalMembershipsClubsType"
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
                            name="PersonalMembershipsClubsType"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Memberships & Clubs */}
                  </div>
                  {/* Personal row 3 */}

                  {/* Personal row 4 */}
                  <div className="row  my-3">
                    {/* Other*/}
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-7">
                          <label
                            htmlFor="PersonalOther"
                            className="form-label"
                          >
                            Other
                          </label>
                          <Field
                            name="PersonalOther"
                            type="number"
                            className="form-control inputDesign shadow"
                            id="PersonalOther"
                            placeholder="Other"
                          />
                          <ErrorMessage
                            name="PersonalOther"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="PersonalOtherValue"
                            className="form-label float-end"
                          >
                            $
                            {(
                              values.PersonalOther || 0 *
                              values.PersonalOtherType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="PersonalOtherType"
                            name="PersonalOtherType"
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
                            name="PersonalOtherType"
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
                            htmlFor="PersonalHolidays"
                            className="form-label"
                          >
                            Holidays
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            name="PersonalHolidays"
                            id="PersonalHolidays"
                            placeholder="Holidays"
                          />
                          <ErrorMessage
                            name="PersonalHolidays"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="PersonalHolidaysValue"
                            className="form-label float-end "
                          >
                            $
                            {(
                              values.PersonalHolidays || 0 *
                              values.PersonalHolidaysType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="PersonalHolidaysType"
                            name="PersonalHolidaysType"
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
                            name="PersonalHolidaysType"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Alcohol */}
                  </div>
                  {/* Personal row 4 */}

                  {/* Personal row 5 */}
                  <div className="row  my-3">
                    {/* Dining Out*/}
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-7">
                          <label
                            htmlFor="PersonalDiningOut"
                            className="form-label"
                          >
                            Dining Out
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            id="PersonalDiningOut"
                            name="PersonalDiningOut"
                            placeholder="Dining Out"
                          />
                          <ErrorMessage
                            name="PersonalDiningOut"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="PersonalDiningOutValue"
                            className="form-label float-end"
                          >
                            $
                            {(
                              values.PersonalDiningOut || 0 *
                              values.PersonalDiningOutType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="PersonalDiningOutType"
                            name="PersonalDiningOutType"
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
                            name="PersonalDiningOutType"
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
                            htmlFor="PersonalMobilePhone"
                            className="form-label"
                          >
                            Mobile Phone
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            id="PersonalMobilePhone"
                            name="PersonalMobilePhone"
                            placeholder="Mobile Phone"
                          />
                          <ErrorMessage
                            name="PersonalMobilePhone"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="PersonalMobilePhoneValue"
                            className="form-label float-end "
                          >
                            $
                            {(
                              values.PersonalMobilePhone || 0 *
                              values.PersonalMobilePhoneType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="PersonalMobilePhoneType"
                            name="PersonalMobilePhoneType"
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
                            name="PersonalMobilePhoneType"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Mobile Phone */}
                  </div>
                  {/* Personal row 5 */}

                  {/* Personal row 5 */}
                  <div className="row  my-3">
                    {/* Dining Out*/}
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-7">
                          <label
                            htmlFor="PersonalMedicalExpenses"
                            className="form-label"
                          >
                            Medical Expenses
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            id="PersonalMedicalExpenses"
                            name="PersonalMedicalExpenses"
                            placeholder="Medical Expenses"
                          />
                          <ErrorMessage
                            name="PersonalMedicalExpenses"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="PersonalMedicalExpensesValue"
                            className="form-label float-end"
                          >
                            $
                            {(
                              values.PersonalMedicalExpenses || 0 *
                              values.PersonalMedicalExpensesType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="PersonalMedicalExpensesType"
                            name="PersonalMedicalExpensesType"
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
                            name="PersonalMedicalExpensesType"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Medical Expenses */}
                  </div>
                  {/* Personal row 6 */}
                </div>
              </div>
            </Collapse>
          </div>
          {/* Personal*/}

          {/* Transport */}
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
                    id="TransportTotalValue"
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
                  {/* TransportPetrol   row 1 */}
                  <div className="row  my-3">
                    {/* Petrol */}

                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-7">
                          <label
                            htmlFor="TransportPetrol"
                            className="form-label"
                          >
                            Petrol
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            name="TransportPetrol"
                            id="TransportPetrol"
                            placeholder="Petrol"
                          />
                          <ErrorMessage
                            name="TransportPetrol"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="TransportPetrolValue"
                            className="form-label float-end"
                          >
                            $
                            {(
                              values.TransportPetrol || 0 *
                              values.TransportPetrolType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="TransportPetrolType"
                            name="TransportPetrolType"
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
                            name="TransportPetrolType"
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
                            htmlFor="TransportCarRepairs"
                            className="form-label"
                          >
                            Car Maintenance
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            id="TransportCarRepairs"
                            name="TransportCarRepairs"
                            placeholder="Car Repairs & Maintenance"
                          />
                          <ErrorMessage
                            name="TransportCarRepairs"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="TransportCarRepairsValue"
                            className="form-label float-end"
                          >
                            $
                            {(
                              values.TransportCarRepairs || 0 *
                              values.TransportCarRepairsType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="TransportCarRepairsType"
                            name="TransportCarRepairsType"
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
                            name="TransportCarRepairsType"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Electricity */}
                  </div>
                  {/* Transport   row 1 */}

                  {/* Transport  row 2 */}
                  <div className="row  my-3">
                    {/* Car Registration */}
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-7">
                          <label
                            htmlFor="TransportCarRegistration"
                            className="form-label"
                          >
                            Car Registration
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            id="TransportCarRegistration"
                            name="TransportCarRegistration"
                            placeholder="Car Registration"
                          />
                          <ErrorMessage
                            name="TransportCarRegistration"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="TransportCarRegistrationValue"
                            className="form-label float-end"
                          >
                            $
                            {(
                              values.TransportCarRegistration || 0 *
                              values.TransportCarRegistrationType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="TransportCarRegistrationType"
                            name="TransportCarRegistrationType"
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
                            name="TransportCarRegistrationType"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Car Registration */}

                    {/* Public Transport */}
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-7">
                          <label
                            htmlFor="PublicTransport"
                            className="form-label"
                          >
                            Public Transport
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            id="PublicTransport"
                            name="PublicTransport"
                            placeholder="Public Transport"
                          />
                          <ErrorMessage
                            name="PublicTransport"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="PublicTransportValue"
                            className="form-label float-end"
                          >
                            $
                            {(
                              values.PublicTransport || 0 *
                              values.PublicTransportType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="PublicTransportType"
                            name="PublicTransportType"
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
                            name="PublicTransportType"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Public Transport */}
                  </div>
                  {/* Transport   row 2 */}

                  {/* Transport  row 3 */}
                  <div className="row  my-3">
                    {/* Other*/}
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-7">
                          <label
                            htmlFor="TransportOther"
                            className="form-label"
                          >
                            Other
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            id="TransportOther"
                            name="TransportOther"
                            placeholder="Other"
                          />
                          <ErrorMessage
                            name="TransportOther"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="TransportOtherValue"
                            className="form-label float-end"
                          >
                            $
                            {(
                              values.TransportOther || 0 *
                              values.TransportOtherType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            name="TransportOtherType"
                            id="TransportOtherType"
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
                            name="TransportOtherType"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Car Registration */}
                  </div>
                  {/* Transport   row 3 */}
                </div>
              </div>
            </Collapse>
          </div>
          {/* Transport   */}

          {/* Insurance */}
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
                    id="InsuranceTotalValue"
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
                  {/* Insurance   row 1 */}
                  <div className="row  my-3">
                    {/* Private Health */}

                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-7">
                          <label
                            htmlFor="PrivateHealth"
                            className="form-label"
                          >
                            Private Health
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            id="PrivateHealth"
                            name="PrivateHealth"
                            placeholder="Private Health"
                          />
                          <ErrorMessage
                            name="PrivateHealth"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="PrivateHealthValue"
                            className="form-label float-end"
                          >
                            $
                            {(
                              values.PrivateHealth || 0 *
                              values.PrivateHealthType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="PrivateHealthType"
                            name="PrivateHealthType"
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
                            name="PrivateHealthType"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Private Health */}

                    {/* Life/TPD/Trauma */}
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-7">
                          <label
                            htmlFor="LifeTPDTrauma"
                            className="form-label"
                          >
                            Life/TPD/Trauma
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            id="LifeTPDTrauma"
                            name="LifeTPDTrauma"
                            placeholder="Life/TPD/Trauma"
                          />
                          <ErrorMessage
                            name="LifeTPDTrauma"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="LifeTPDTraumaValue"
                            className="form-label float-end"
                          >
                            $
                            {(
                              values.LifeTPDTrauma || 0 *
                              values.LifeTPDTraumaType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="LifeTPDTraumaType"
                            name="LifeTPDTraumaType"
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
                            name="LifeTPDTraumaType"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Life/TPD/Trauma */}
                  </div>
                  {/* Insurance   row 1 */}

                  {/* Transport  row 2 */}
                  <div className="row  my-3">
                    {/* Income Protection */}
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-7">
                          <label
                            htmlFor="InsuranceIncomeProtection"
                            className="form-label"
                          >
                            Income Protection
                          </label>
                          <Field
                            name="InsuranceIncomeProtection"
                            type="number"
                            className="form-control inputDesign shadow"
                            id="InsuranceIncomeProtection"
                            placeholder="Income Protection"
                          />
                          <ErrorMessage
                            name="InsuranceIncomeProtection"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="InsuranceIncomeProtectionValue"
                            className="form-label float-end"
                          >
                            $
                            {(
                              values.InsuranceIncomeProtection || 0 *
                              values.InsuranceIncomeProtectionType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="InsuranceIncomeProtectionType"
                            name="InsuranceIncomeProtectionType"
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
                            name="InsuranceIncomeProtectionType"
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
                            htmlFor="InsuranceCar"
                            className="form-label"
                          >
                            Car
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            id="InsuranceCar"
                            name="InsuranceCar"
                            placeholder="Car"
                          />
                          <ErrorMessage
                            name="InsuranceCar"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="InsuranceCarValue"
                            className="form-label float-end"
                          >
                            $
                            {(
                              values.InsuranceCar || 0 *
                              values.InsuranceCarType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="InsuranceCarType"
                            name="InsuranceCarType"
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
                            name="InsuranceCarType"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Car */}
                  </div>
                  {/* Insurance row 2 */}

                  {/* Insurance row 3 */}
                  <div className="row  my-3">
                    {/* Other*/}
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-7">
                          <label
                            htmlFor="InsuranceHomeContents"
                            className="form-label"
                          >
                            Home And Contents
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            id="InsuranceHomeContents"
                            name="InsuranceHomeContents"
                            placeholder="Home And Contents"
                          />
                          <ErrorMessage
                            name="InsuranceHomeContents"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="InsuranceHomeContentsValue"
                            className="form-label float-end"
                          >
                            $
                            {(
                              values.InsuranceHomeContents || 0 *
                              values.InsuranceHomeContentsType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="InsuranceHomeContentsType"
                            name="InsuranceHomeContentsType"
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
                            name="InsuranceHomeContentsType"
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
                            htmlFor="InsuranceOther"
                            className="form-label"
                          >
                            Other
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign shadow"
                            id="InsuranceOther"
                            name="InsuranceOther"
                            placeholder="Other"
                          />
                          <ErrorMessage
                            name="InsuranceOther"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                        <div className="col-5">
                          <label
                            id="TransInsuranceValue"
                            className="form-label float-end"
                          >
                            $
                            {(
                              values.InsuranceOther || 0 *
                              values.TransInsuranceType || 0
                            ).toFixed(2)}
                          </label>
                          <Field
                            as="select"
                            id="TransInsuranceType"
                            name="TransInsuranceType"
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
                            name="TransInsuranceType"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Other */}
                  </div>
                  {/* Insurance  row 3 */}
                </div>
              </div>
            </Collapse>
          </div>
          {/* Insurance    */}
        </Form>
      )}
    </Formik>
  );
};

export default RegularLivingExpenses;
