import React, { useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
import Collapse from "react-bootstrap/Collapse";
import plus from "../images/plus.svg";
import down from "../images/down.svg";
import noteBook from "../images/notebook.svg";
import moneyBag from "../images/moneyBag.svg";

const UseBudget = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [modalData, setModalData] = useState([]);

    const [totalExpense, setTotalExpense] = useState(0);
    const [totalHouseHold, setTotalHouseHold] = useState(0);
    const [totalPersonal, setTotalPersonal] = useState(0);
    const [totalTransport, setTotalTransport] = useState(0);
    const [totalInsurance, setTotalInsurance] = useState(0);

    
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);

  
  

  const initialValues2 = {
    // house Hold
    houseHoldrent: modalData.Household_Rent,
    houseHoldrentType: modalData.Household_RentType,
    houseHoldElectricity: modalData.Household_Electricity,
    houseHoldElectricityType: modalData.Household_ElectricityType,
    houseHoldWaterRates: modalData.Household_WaterRates,
    houseHoldWaterRateType: modalData.Household_WaterRatesType,
    houseHoldGas: modalData.Household_Gas,
    houseHoldGasType: modalData.Household_GasType,
    houseHoldPhone: modalData.Household_Phone,
    houseHoldPhoneType: modalData.Household_PhoneType,
    houseHoldCouncilRates: modalData.Household_CouncilRate,
    houseHoldCouncilRatesType: modalData.Household_CouncilRateType,
    houseHoldInternet: modalData.Household_Internet,
    houseHoldInternetType: modalData.Household_InternetType,
    houseHoldOther: modalData.Household_Others,
    houseHoldOtherType: modalData.Household_OthersType,

    //********************** Personal Expense **********************
    PersonalFood: modalData.Personal_Food,
    PersonalFoodType: modalData.Personal_FoodType,
    PersonalClothing: modalData.Personal_Clothing,
    PersonalClothingValueType: modalData.Personal_ClothingType,
    PersonalCigarettes: modalData.Personal_Cigarattes,
    PersonalCigarettesType: modalData.Personal_CigarattesType,
    PersonalAlcohol: modalData.Personal_Alcohol,
    PersonalAlcoholType: modalData.Personal_AlcoholType,
    PersonalSubscriptionFees: modalData.Personal_SubscriptionFees,
    PersonalSubscriptionFeesType: modalData.Personal_SubscriptionFeesType,
    PersonalMembershipsClubs: modalData.Personal_ClubMemberships,
    PersonalMembershipsClubsType: modalData.Personal_ClubMembershipsType,
    PersonalOther: modalData.Personal_Others,
    PersonalOtherType: modalData.Personal_OthersType,
    PersonalHolidays: modalData.Personal_Holidays,
    PersonalHolidaysType: modalData.Personal_HolidaysType,
    PersonalDiningOut: modalData.Personal_DiningOut,
    PersonalDiningOutType: modalData.Personal_DiningOutType,
    PersonalMobilePhone: modalData.Personal_MobilePhone,
    PersonalMobilePhoneType: modalData.Personal_MobilePhoneType,
    PersonalMedicalExpenses: modalData.Personal_MedicalExpenses,
    PersonalMedicalExpensesType: modalData.Personal_MedicalExpensesType,
    //********************** End of Personal Expense **********************

    //********************** Transport Expense **********************
    TransportPetrol: modalData.Transport_Petrol,
    TransportPetrolType: modalData.Transport_PetrolType,
    TransportCarRepairs: modalData.Transport_CarRepair,
    TransportCarRepairsType: modalData.Transport_CarRepairType,
    TransportCarRegistration: modalData.Transport_CarRegistration,
    TransportCarRegistrationType: modalData.Transport_CarRegistrationType,
    PublicTransport: modalData.Transport_PublicTransport,
    PublicTransportType: modalData.Transport_PublicTransportType,
    TransportOther: modalData.Transport_Others,
    TransportOtherType: modalData.Transport_OthersType,
    //********************** End of Transport Expense **********************

    //********************** Insurance Expense **********************
    PrivateHealth: modalData.Insurance_PrivateHealth,
    PrivateHealthType: modalData.Insurance_PrivateHealthType,
    LifeTPDTrauma: modalData.Insurance_Life,
    LifeTPDTraumaType: modalData.Insurance_LifeType,
    InsuranceIncomeProtection: modalData.Insurance_IncomeProtection,
    InsuranceIncomeProtectionType: modalData.Insurance_IncomeProtectionType,
    InsuranceCar: modalData.Insurance_Car,
    InsuranceCarType: modalData.Insurance_CarType,
    InsuranceHomeContents: modalData.Insurance_HomeContents,
    InsuranceHomeContentsType: modalData.Insurance_HomeContentsType,
    InsuranceOther: modalData.Insurance_Others,
    TransInsuranceType: modalData.Insurance_OthersType,
    //********************** End of Insurance Expense **********************
  };

  const onSubmit2 = (values) => {
    let ExpensesModal = {
      Email: localStorage.getItem("ClientEmail"),
      //********************** Household Expense **********************
      Household_Rent: values.houseHoldrent,
      Household_RentType: values.houseHoldrentType,
      Household_Electricity: values.houseHoldElectricity,
      Household_ElectricityType: values.houseHoldElectricityType,
      Household_WaterRates: values.houseHoldWaterRates,
      Household_WaterRatesType: values.houseHoldWaterRateType,
      Household_Gas: values.houseHoldGas,
      Household_GasType: values.houseHoldGasType,
      Household_Phone: values.houseHoldPhone,
      Household_PhoneType: values.houseHoldPhoneType,
      Household_CouncilRate: values.houseHoldCouncilRates,
      Household_CouncilRateType: values.houseHoldCouncilRatesType,
      Household_Internet: values.houseHoldInternet,
      Household_InternetType: values.houseHoldInternetType,
      Household_Others: values.houseHoldOther,
      Household_OthersType: values.houseHoldOtherType,
      //********************** End of Household Expense **********************

      //********************** Personal Expense **********************
      Personal_Food: values.PersonalFood,
      Personal_FoodType: values.PersonalFoodType,
      Personal_Clothing: values.PersonalClothing,
      Personal_ClothingType: values.PersonalClothingValueType,
      Personal_Cigarattes: values.PersonalCigarettes,
      Personal_CigarattesType: values.PersonalCigarettesType,
      Personal_Alcohol: values.PersonalAlcohol,
      Personal_AlcoholType: values.PersonalAlcoholType,
      Personal_SubscriptionFees: values.PersonalSubscriptionFees,
      Personal_SubscriptionFeesType: values.PersonalSubscriptionFeesType,
      Personal_ClubMemberships: values.PersonalMembershipsClubs,
      Personal_ClubMembershipsType: values.PersonalMembershipsClubsType,
      Personal_Others: values.PersonalOther,
      Personal_OthersType: values.PersonalOtherType,
      Personal_Holidays: values.PersonalHolidays,
      Personal_HolidaysType: values.PersonalHolidaysType,
      Personal_DiningOut: values.PersonalDiningOut,
      Personal_DiningOutType: values.PersonalDiningOutType,
      Personal_MobilePhone: values.PersonalMobilePhone,
      Personal_MobilePhoneType: values.PersonalMobilePhoneType,
      Personal_MedicalExpenses: values.PersonalMedicalExpenses,
      Personal_MedicalExpensesType: values.PersonalMedicalExpensesType,
      //********************** End of Personal Expense **********************

      //********************** Transport Expense **********************
      Transport_Petrol: values.TransportPetrol,
      Transport_PetrolType: values.TransportPetrolType,
      Transport_CarRepair: values.TransportCarRepairs,
      Transport_CarRepairType: values.TransportCarRepairsType,
      Transport_CarRegistration: values.TransportCarRegistration,
      Transport_CarRegistrationType: values.TransportCarRegistrationType,
      Transport_PublicTransport: values.PublicTransport,
      Transport_PublicTransportType: values.PublicTransportType,
      Transport_Others: values.TransportOther,
      Transport_OthersType: values.TransportOtherType,
      //********************** End of Transport Expense **********************

      //********************** Insurance Expense **********************
      Insurance_PrivateHealth: values.PrivateHealth,
      Insurance_PrivateHealthType: values.PrivateHealthType,
      Insurance_Life: values.LifeTPDTrauma,
      Insurance_LifeType: values.LifeTPDTraumaType,
      Insurance_IncomeProtection: values.InsuranceIncomeProtection,
      Insurance_IncomeProtectionType: values.InsuranceIncomeProtectionType,
      Insurance_Car: values.InsuranceCar,
      Insurance_CarType: values.InsuranceCarType,
      Insurance_HomeContents: values.InsuranceHomeContents,
      Insurance_HomeContentsType: values.InsuranceHomeContentsType,
      Insurance_Others: values.InsuranceOther,
      Insurance_OthersType: values.TransInsuranceType,
      //********************** End of Insurance Expense **********************
      };
    //   alert(totalExpense.toFixed(2));

      props.store(totalExpense.toFixed(2));

    let email = localStorage.getItem("ClientEmail");

    axios
      .patch(
        `/api/Client-ExpensesModal/Update-Client-ExpensesModal/${email}`,
        ExpensesModal
      )
      .then((res) => console.log("Expenses Modal Updated Succesfully!"));

    setTimeout(() => {
      // modal
      axios.get(`/api/Client-ExpensesModal`).then((res) => {
        let modalObj = res.data;
        let objectFilterObj = modalObj.filter((item) => item.Email == email);
        setModalData(objectFilterObj[0]);
      });
    }, 500);

    handleClose();
  };

  const validationSchema2 = Yup.object({
    houseHoldrent: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    houseHoldElectricity: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    houseHoldrentType: Yup.string().required("Required"),
    houseHoldElectricityType: Yup.string().required("Required"),
    houseHoldWaterRateType: Yup.string().required("Required"),
    houseHoldWaterRates: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    houseHoldGas: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    houseHoldGasType: Yup.string().required("Required"),
    houseHoldPhone: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    houseHoldPhoneType: Yup.string().required("Required"),
    houseHoldCouncilRates: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    houseHoldCouncilRatesType: Yup.string().required("Required"),

    houseHoldInternet: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    houseHoldInternetType: Yup.string().required("Required"),
    houseHoldOther: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    houseHoldOtherType: Yup.string().required("Required"),

    PersonalFood: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    PersonalFoodType: Yup.string().required("Required"),
    PersonalClothing: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    PersonalClothingValueType: Yup.string().required("Required"),

    PersonalCigarettes: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    PersonalCigarettesType: Yup.string().required("Required"),
    PersonalAlcohol: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    PersonalAlcoholType: Yup.string().required("Required"),

    PersonalSubscriptionFees: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    PersonalSubscriptionFeesType: Yup.string().required("Required"),
    PersonalMembershipsClubs: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    PersonalMembershipsClubsType: Yup.string().required("Required"),

    PersonalOther: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    PersonalOtherType: Yup.string().required("Required"),
    PersonalHolidays: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    PersonalHolidaysType: Yup.string().required("Required"),

    PersonalDiningOut: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    PersonalDiningOutType: Yup.string().required("Required"),
    PersonalMobilePhone: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    PersonalMobilePhoneType: Yup.string().required("Required"),
    PersonalMedicalExpenses: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    PersonalMedicalExpensesType: Yup.string().required("Required"),

    TransportPetrol: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    TransportPetrolType: Yup.string().required("Required"),
    TransportCarRepairs: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    TransportCarRepairsType: Yup.string().required("Required"),

    TransportCarRegistration: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    TransportCarRegistrationType: Yup.string().required("Required"),
    PublicTransport: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    PublicTransportType: Yup.string().required("Required"),
    TransportOther: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    TransportOtherType: Yup.string().required("Required"),

    PrivateHealth: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    PrivateHealthType: Yup.string().required("Required"),
    LifeTPDTrauma: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    LifeTPDTraumaType: Yup.string().required("Required"),

    InsuranceIncomeProtection: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    InsuranceIncomeProtectionType: Yup.string().required("Required"),
    InsuranceCar: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    InsuranceCarType: Yup.string().required("Required"),
    InsuranceHomeContents: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    InsuranceHomeContentsType: Yup.string().required("Required"),
    InsuranceOther: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    TransInsuranceType: Yup.string().required("Required"),
  });
    
  return (
    <div className="mb-3">
      <div>
        <button
          className="btn w-100 h-100 btn-outline-success "
                  onClick={handleShow}
                  type="button"
        > 
          <div className="iconContainer mx-1">
            <img className="img-fluid" src={plus} alt="" />
          </div>
          Use Budget Planner
        </button>
      </div>

      {/* --------------------------------------------------------------- */}
      <div>
        {/* Business Expense Schedule */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          className="modal-lg"
          keyboard={false}
        >
          <Modal.Header className="text-light modalBG " closeButton>
            <Modal.Title className="fontStyle">
              Budget Planner
              <div className="iconContainerLg">
                <img className="img-fluid" src={noteBook} alt="" />
              </div>
            </Modal.Title>
          </Modal.Header>
          <Formik
            initialValues={initialValues2}
            validationSchema={validationSchema2}
            onSubmit={onSubmit2}
          >
            {({ values, setFieldValue, setValues }) => (
              <Form>
                <Modal.Body>
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
                                values.houseHoldrent * values.houseHoldrentType
                              ).toFixed(2)
                            ) +
                              parseFloat(
                                (
                                  values.houseHoldElectricity *
                                  values.houseHoldElectricityType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.houseHoldWaterRates *
                                  values.houseHoldWaterRateType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.houseHoldGas * values.houseHoldGasType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.houseHoldPhone *
                                  values.houseHoldPhoneType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.houseHoldCouncilRates *
                                  values.houseHoldCouncilRatesType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.houseHoldInternet *
                                  values.houseHoldInternetType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.houseHoldOther *
                                  values.houseHoldOtherType
                                ).toFixed(2)
                              )
                          )}
                          {/* Sum of HouseHold Formula2 */}

                          {/* Sum of Personal Formula3 */}
                          {setTotalPersonal(
                            parseFloat(
                              (
                                values.PersonalFood * values.PersonalFoodType
                              ).toFixed(2)
                            ) +
                              parseFloat(
                                (
                                  values.PersonalClothing *
                                  values.PersonalClothingValueType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.PersonalCigarettes *
                                  values.PersonalCigarettesType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.PersonalAlcohol *
                                  values.PersonalAlcoholType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.PersonalSubscriptionFees *
                                  values.PersonalSubscriptionFeesType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.PersonalMembershipsClubs *
                                  values.PersonalMembershipsClubsType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.PersonalOther *
                                  values.PersonalOtherType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.PersonalHolidays *
                                  values.PersonalHolidaysType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.PersonalDiningOut *
                                  values.PersonalDiningOutType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.PersonalMobilePhone *
                                  values.PersonalMobilePhoneType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.PersonalMedicalExpenses *
                                  values.PersonalMedicalExpensesType
                                ).toFixed(2)
                              )
                          )}

                          {/* Sum of TransportFormula4 */}

                          {setTotalTransport(
                            parseFloat(
                              (
                                values.TransportPetrol *
                                values.TransportPetrolType
                              ).toFixed(2)
                            ) +
                              parseFloat(
                                (
                                  values.TransportCarRepairs *
                                  values.TransportCarRepairsType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.TransportCarRegistration *
                                  values.TransportCarRegistrationType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.PublicTransport *
                                  values.PublicTransportType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.TransportOther *
                                  values.TransportOtherType
                                ).toFixed(2)
                              )
                          )}

                          {/* Sum of Insurance Formula5 */}

                          {setTotalInsurance(
                            parseFloat(
                              (
                                values.PrivateHealth * values.PrivateHealthType
                              ).toFixed(2)
                            ) +
                              parseFloat(
                                (
                                  values.LifeTPDTrauma *
                                  values.LifeTPDTraumaType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.InsuranceIncomeProtection *
                                  values.InsuranceIncomeProtectionType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.InsuranceCar * values.InsuranceCarType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.InsuranceHomeContents *
                                  values.InsuranceHomeContentsType
                                ).toFixed(2)
                              ) +
                              parseFloat(
                                (
                                  values.InsuranceOther *
                                  values.TransInsuranceType
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
                                      values.houseHoldrent *
                                      values.houseHoldrentType
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
                                      values.houseHoldElectricity *
                                      values.houseHoldElectricityType
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
                                      values.houseHoldWaterRates *
                                      values.houseHoldWaterRateType
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
                                      values.houseHoldGas *
                                      values.houseHoldGasType
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
                                      values.houseHoldPhone *
                                      values.houseHoldPhoneType
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
                                      values.houseHoldCouncilRates *
                                      values.houseHoldCouncilRatesType
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
                                      values.houseHoldInternet *
                                      values.houseHoldInternetType
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
                                      values.houseHoldOther *
                                      values.houseHoldOtherType
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
                                      values.PersonalFood *
                                      values.PersonalFoodType
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
                                      values.PersonalClothing *
                                      values.PersonalClothingValueType
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
                                      values.PersonalCigarettes *
                                      values.PersonalCigarettesType
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
                                      values.PersonalAlcohol *
                                      values.PersonalAlcoholType
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
                                      values.PersonalSubscriptionFees *
                                      values.PersonalSubscriptionFeesType
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
                                      values.PersonalMembershipsClubs *
                                      values.PersonalMembershipsClubsType
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
                                      values.PersonalOther *
                                      values.PersonalOtherType
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
                                      values.PersonalHolidays *
                                      values.PersonalHolidaysType
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
                                      values.PersonalDiningOut *
                                      values.PersonalDiningOutType
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
                                      values.PersonalMobilePhone *
                                      values.PersonalMobilePhoneType
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
                                      values.PersonalMedicalExpenses *
                                      values.PersonalMedicalExpensesType
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
                                      values.TransportPetrol *
                                      values.TransportPetrolType
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
                                      values.TransportCarRepairs *
                                      values.TransportCarRepairsType
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
                                      values.TransportCarRegistration *
                                      values.TransportCarRegistrationType
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
                                      values.PublicTransport *
                                      values.PublicTransportType
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
                                      values.TransportOther *
                                      values.TransportOtherType
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
                                      values.PrivateHealth *
                                      values.PrivateHealthType
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
                                      values.LifeTPDTrauma *
                                      values.LifeTPDTraumaType
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
                                      values.InsuranceIncomeProtection *
                                      values.InsuranceIncomeProtectionType
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
                                      values.InsuranceCar *
                                      values.InsuranceCarType
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
                                      values.InsuranceHomeContents *
                                      values.InsuranceHomeContentsType
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
                                      values.InsuranceOther *
                                      values.TransInsuranceType
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
                </Modal.Body>
                <Modal.Footer>
                  <div className="col-md-12">
                    <button
                      type="submit"
                      className="float-end btn w-25  bgColor modalBtn"
                      // onClick={handleClose}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="float-end btn w-25  btn-outline  backBtn mx-3"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </div>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal>
        {/* Business Expense Schedule */}
      </div>

      {/* --------------------------------------------------------------- */}
    </div>
  );
};

export default UseBudget;
