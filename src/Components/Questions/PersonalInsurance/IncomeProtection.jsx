import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { PatchAxios, PostAxios } from "../../Assets/Api/Api";
import DatePicker from "react-datepicker";

import single from "../../Svgs/single-2.svg";
import couple from "../../Svgs/couple-2.svg";
import DynamicYesNo from "../FinancialInvestments/QuestionsDetail/DynamicYesNo";
import { Button, Modal } from "react-bootstrap";

const IncomeProtection = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  let DefaultUrl = useRecoilValue(defaultUrl);

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});
  let [modalObject1, setModalObject1] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (values) => {
    setModalObject(values);
    setShow(true);
  };

  let incomeProtection = questionDetail.incomeProtection || {
    client: {},
    partner: {},
  }; // Use an empty object as default if incomeProtection is undefined

  let initialValues1 = {
    exclusionsLoadings: modalObject.exclusionsLoadings,
    accidentOption: modalObject.accidentOption,
    agreedIndemnity: modalObject.agreedIndemnity,
    annualCostOfPremiums: modalObject.annualCostOfPremiums,
    benefitPeriod: modalObject.benefitPeriod,
    commissionRate: modalObject.commissionRate,
    costOfPremiumInner: "",
    dateCommenced: modalObject.dateCommenced,
    increasingClaimsOption: modalObject.increasingClaimsOption,
    insuranceCompany: modalObject.insuranceCompany,
    isTheBenefitIndexed: modalObject.isTheBenefitIndexed,
    lifeInsured: modalObject.lifeInsured,
    monthlyBenefit: modalObject.monthlyBenefit,
    occupationBenefitPeriod: modalObject.occupationBenefitPeriod,
    ownerInner: "",
    paymentFrequencyInner: "",
    policyNumberInner: "",
    premiumType: modalObject.premiumType,
    productName: modalObject.productName,
    renewalMonthly: modalObject.renewalMonthly,
    retainThisPolicy: modalObject.retainThisPolicy,
    smoker: modalObject.smoker,
    superContinuance: modalObject.superContinuance,
    superLinkedInner: "",
    waitingPeriod: modalObject.waitingPeriod,
    whoPaysThePremiumsInner: "",
  };
  let initialValues = {
    exclusionsLoadings: "",
    accidentOption: "",
    agreedIndemnity: "",
    annualCostOfPremiums: "",
    benefitPeriod: "",
    commissionRate: "",
    costOfPremium: "",
    dateCommenced: "",
    increasingClaimsOption: "",
    insuranceCompany: "",
    isTheBenefitIndexed: "",
    lifeInsured: "",
    monthlyBenefit: "",
    occupationBenefitPeriod: "",
    owner: "",
    paymentFrequency: "",
    policyNumber: "",
    premiumType: "",
    productName: "",
    renewalMonthly: "",
    retainThisPolicy: "",
    smoker: "",
    superContinuance: "",
    superLinked: "",
    waitingPeriod: "",
    whoPaysThePremiums: "",
  };
  // let initialValues = {};

  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    // if (incomeProtection[props.modalObject.Input] && incomeProtection[props.modalObject.Input].length) {
    //     let arr = []
    //     for (let i = 0; i < incomeProtection[props.modalObject.Input].length; i++) {
    //         arr.push("");
    //     }
    //     setDynamicFields(arr);
    // }
  }, []);

  const fillInitialValues = (setFieldValue) => {
    if (
      incomeProtection[props.modalObject.Input] &&
      incomeProtection[props.modalObject.Input].owner
    ) {
      let data = incomeProtection[props.modalObject.Input];
      setModalObject1(data.SuperLinkedPolicy);
      setFieldValue(`exclusionsLoadings`, data.exclusionsLoadings || "");
      setFieldValue(`accidentOption`, data.accidentOption || "");
      setFieldValue(`agreedIndemnity`, data.agreedIndemnity || "");
      // setFieldValue(`annualCostOfPremiums`, data.annualCostOfPremiums || "");
      setFieldValue(`benefitPeriod`, data.benefitPeriod || "");
      setFieldValue(`commissionRate`, data.commissionRate || "");
      setFieldValue(`costOfPremium`, data.costOfPremium || "");
      let num = data.paymentFrequency == "Monthly" ? 12 : 1;
      setFieldValue(`annualCostOfPremium`, data.costOfPremium * num || "");
      setFieldValue(`dateCommenced`, data.dateCommenced || "");
      setFieldValue(
        `increasingClaimsOption`,
        data.increasingClaimsOption || ""
      );
      setFieldValue(`insuranceCompany`, data.insuranceCompany || "");
      setFieldValue(`isTheBenefitIndexed`, data.isTheBenefitIndexed || "");
      setFieldValue(`lifeInsured`, data.lifeInsured || "");
      setFieldValue(`monthlyBenefit`, data.monthlyBenefit || "");
      setFieldValue(
        `occupationBenefitPeriod`,
        data.occupationBenefitPeriod || ""
      );
      setFieldValue(`owner`, data.owner || "");
      setFieldValue(`paymentFrequency`, data.paymentFrequency || "");
      setFieldValue(`policyNumber`, data.policyNumber || "");
      setFieldValue(`premiumType`, data.premiumType || "");
      setFieldValue(`productName`, data.productName || "");
      setFieldValue(`renewalMonthly`, data.renewalMonthly || "");
      setFieldValue(`retainThisPolicy`, data.retainThisPolicy || "");
      setFieldValue(`smoker`, data.smoker || "");
      setFieldValue(`superContinuance`, data.superContinuance || "");
      setFieldValue(`superLinked`, data.superLinked || "");
      setFieldValue(`waitingPeriod`, data.waitingPeriod || "");
      setFieldValue(`whoPaysThePremiums`, data.whoPaysThePremiums || "");
      setFieldValue(`SuperLinkedPolicy`, data.SuperLinkedPolicy || "");
    }
  };
  const fillInitialValues2 = (setFieldValue) => {
    // console.log(modalObject.SuperLinkedPolicy, modalObject1," this is it")
    if (modalObject1.ownerInner) {
      let SuperLinkedPolicy = modalObject.SuperLinkedPolicy || modalObject1;
      setFieldValue(
        `costOfPremiumInner`,
        SuperLinkedPolicy.costOfPremiumInner || ""
      );
      setFieldValue(`ownerInner`, SuperLinkedPolicy.ownerInner || "");
      setFieldValue(
        `paymentFrequencyInner`,
        SuperLinkedPolicy.paymentFrequencyInner || ""
      );
      setFieldValue(
        `policyNumberInner`,
        SuperLinkedPolicy.policyNumberInner || ""
      );
      setFieldValue(
        `superLinkedInner`,
        SuperLinkedPolicy.superLinkedInner || ""
      );
      setFieldValue(
        `whoPaysThePremiumsInner`,
        SuperLinkedPolicy.whoPaysThePremiumsInner || ""
      );
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

  // let DefaultUrl = useRecoilValue(defaultUrl)
  // const handleChange1 = (selected) => {
  //   setSelectedOptions(selected);
  // };

  let onSubmit1 = async (values) => {
    // alert("inner modal");
    console.log(values);
    let Object = {
      ownerInner: values.ownerInner,
      policyNumberInner: values.policyNumberInner,
      paymentFrequencyInner: values.paymentFrequencyInner,
      costOfPremiumInner: values.costOfPremiumInner,
      whoPaysThePremiumsInner: values.whoPaysThePremiumsInner,
      superLinkedInner: values.superLinkedInner,
    };
    setModalObject1(Object);
    handleClose();
  };

  let onSubmit = async (values) => {
    // console.log(JSON.stringify(values));

    // Create an object with additional fields
    // let obj = {
    //   clientFK: localStorage.getItem("UserID"),
    // };

    let DataOf = props.modalObject.Input;

    let obj = {
      exclusionsLoadings: values.exclusionsLoadings,
      accidentOption: values.accidentOption,
      agreedIndemnity: values.agreedIndemnity,
      // annualCostOfPremiums: values.annualCostOfPremiums,
      benefitPeriod: values.benefitPeriod,
      commissionRate: values.commissionRate,
      costOfPremium: values.costOfPremium,
      dateCommenced: values.dateCommenced,
      increasingClaimsOption: values.increasingClaimsOption,
      insuranceCompany: values.insuranceCompany,
      isTheBenefitIndexed: values.isTheBenefitIndexed,
      lifeInsured: values.lifeInsured,
      monthlyBenefit: values.monthlyBenefit,
      occupationBenefitPeriod: values.occupationBenefitPeriod,
      owner: values.owner,
      paymentFrequency: values.paymentFrequency,
      policyNumber: values.policyNumber,
      premiumType: values.premiumType,
      productName: values.productName,
      renewalMonthly: values.renewalMonthly,
      retainThisPolicy: values.retainThisPolicy,
      smoker: values.smoker,
      superContinuance: values.superContinuance,
      superLinked: values.superLinked,
      waitingPeriod: values.waitingPeriod,
      whoPaysThePremiums: values.whoPaysThePremiums,
      SuperLinkedPolicy: modalObject1,
    };

    let Obj = {
      clientFK: localStorage.getItem("UserID"),
    };
    let num = obj.paymentFrequency == "Monthly" ? 12 : 1;
    Obj[DataOf + "Total"] = obj.costOfPremium * num;
    // Obj[DataOf + "Total"] = obj.costOfPremium;
    Obj[DataOf] = obj;
    console.log(Obj);

    try {
      let res;
      if (
        !questionDetail.incomeProtection ||
        !questionDetail.incomeProtection.clientFK
      ) {
        res = await PostAxios(`${DefaultUrl}/api/incomeProtection/Add`, Obj);
      } else {
        Obj.collection = props.modalObject.Input;
        res = await PatchAxios(
          `${DefaultUrl}/api/incomeProtection/Update`,
          Obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, incomeProtection: res };
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
  let [nameSet] = useState(() => {
    if (props.modalObject.Input === "client") {
      return (localStorage.getItem("UserName"))
    }
    else if (props.modalObject.Input === "partner") {
      return (localStorage.getItem("PartnerName"))
    }
    else if (props.modalObject.Input === "joint") {
      return (localStorage.getItem("UserName") + " & " + localStorage.getItem("PartnerName"))
    }
  })
  return (
    <div>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Income (Super Linked Policy)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues1}
            //  validationSchema={isPartnered ? validationSchema : singleValidationSchema}
            onSubmit={onSubmit1}
          // validationSchema=  {validationSchema}
          >
            {({
              isSubmitting,
              values,
              setFieldValue,
              setValues,
              handleChange,
              handleBlur,
            }) => {
              useEffect(() => {
                // alert("when i am Running");
                fillInitialValues2(setFieldValue);
              }, []);

              return (
                <Form>
                  <div className="row">
                    <div className="col-md-12">
                      {/* 1 row */}

                      <div className="row">
                        <div className="col-6"></div>

                        <div className="col-6">
                          <label htmlFor="" className="form-label text-center">
                            {nameSet}
                            <div className="iconContainerLg">
                              <img
                                src={single}
                                alt="single svg"
                                className="w-50"
                              />
                            </div>
                          </label>
                        </div>

                        {values.EMPOwner === "Partner" && (
                          <div className="col-6">
                            <label
                              htmlFor=""
                              className="form-label text-center"
                            >
                              {nameSet}
                              <div className="iconContainerLg">
                                <img
                                  src={couple}
                                  alt="single svg"
                                  className="w-50"
                                />
                              </div>
                            </label>
                          </div>
                        )}
                      </div>

                      <div className="row">
                        <div className="col-6">
                          <label htmlFor="ownerInner" className="form-label">
                            Owner
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3">
                            <Field
                              as="select"
                              className="form-select shadow inputDesign"
                              id="ownerInner"
                              name="ownerInner"
                              placeholder="Primary Occupation"
                            >
                              <option value="">Please Select</option>
                              <option value="Client">Client </option>
                              <option value="Partner">Partner</option>
                              <option value="SMSF">SMSF </option>
                              <option value="Super Trustees">
                                Super Trustees{" "}
                              </option>
                              <option value="Company (Pty Ltd)">
                                Company (Pty Ltd)
                              </option>
                              <option value="Family Trust">
                                Family Trust{" "}
                              </option>
                            </Field>
                            <ErrorMessage
                              name="ownerInner"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-6">
                          <label htmlFor="lifeInsured" className="form-label">
                            Life insured
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3">
                            <Field
                              type="text"
                              id="lifeInsured"
                              placeholder="Life Insured"
                              className="form-control shadow  inputDesign"
                              name="lifeInsured"
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="lifeInsured"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-6">
                          <label
                            htmlFor="insuranceCompany"
                            className="form-label"
                          >
                            Insurance company
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3">
                            <Field
                              as="select"
                              className="form-select inputDesign shadow"
                              name="insuranceCompany"
                              id="insuranceCompany"
                              placeholder="Name of Company"
                            >
                              <option value="">Please Select</option>
                              <option value="List in super Admin Area">
                                List in super Admin Area{""}
                              </option>
                              <option value="AIA">AIA </option>
                              <option value="Clearview">Clearview</option>
                              <option value="Encompass">Encompass</option>
                              <option value="MLC">MLC</option>
                              <option value="Metlife">Metlife</option>
                              <option value="NEOS">NEOS</option>
                              <option value="One Path">One Path</option>
                              <option value="PPS Mutual">PPS Mutual </option>
                              <option value="TAL">TAL</option>
                              <option value="Zurich">Zurich</option>
                            </Field>
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="insuranceCompany"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label htmlFor="productName" className="form-label">
                            Product Name
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3">
                            <Field
                              type="text"
                              id="productName"
                              placeholder="Product Name"
                              className="form-control shadow  inputDesign"
                              name="productName"
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="productName"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label htmlFor="dateCommenced" className="form-label">
                            Smoker
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3 w-50">
                            <DynamicYesNo
                              name={`smoker`}
                              values={values}
                              handleChange={handleChange}
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="smoker"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label
                            htmlFor="policyNumberInner"
                            className="form-label"
                          >
                            Policy Number
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3">
                            <Field
                              type="number"
                              id="policyNumberInner"
                              placeholder="Policy Number"
                              className="form-control shadow  inputDesign"
                              name="policyNumberInner"
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="policyNumberInner"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label htmlFor="dateCommenced" className="form-label">
                            Date Commenced
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3">
                            <div>
                              <DatePicker
                                className="form-control inputDesign shadow"
                                showIcon
                                id="dateCommenced"
                                name="dateCommenced"
                                selected={values.dateCommenced}
                                onChange={(date) =>
                                  setFieldValue("dateCommenced", date)
                                }
                                dateFormat="dd/MM/yyyy"
                                placeholderText="dd/mm/yyyy"
                                maxDate={new Date()}
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                onBlur={handleBlur}
                                wrapperClassName="w-100"
                              />
                            </div>
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="dateCommenced"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-6">
                          <label
                            htmlFor="renewalMonthly"
                            className="form-label"
                          >
                            Renewal Month
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3">
                            <Field
                              as="select"
                              className="form-select inputDesign shadow"
                              id="renewalMonthly"
                              name="renewalMonthly"
                              placeholder="Number of hours per week"
                            >
                              <option value="">Please Select</option>
                              <option value="January">January</option>
                              <option value="February">February </option>
                              <option value="March">March </option>
                              <option value="April">April</option>
                              <option value="May">May</option>
                              <option value="June">June </option>
                              <option value="July">July </option>
                              <option value="August">August</option>
                              <option value="September">September </option>
                              <option value="October">October </option>
                              <option value="November">November </option>
                              <option value="December">December </option>
                            </Field>
                            <ErrorMessage
                              name="renewalMonthly"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label
                            htmlFor="monthlyBenefit"
                            className="form-label"
                          >
                            Monthly Benefit
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3">
                            <Field
                              type="number"
                              id="monthlyBenefit"
                              placeholder="Monthly Benefit"
                              className="form-control shadow  inputDesign"
                              name="monthlyBenefit"
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="monthlyBenefit"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-6">
                          <label htmlFor="waitingPeriod" className="form-label">
                            Waiting Period
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3">
                            <Field
                              as="select"
                              className="form-select inputDesign shadow"
                              id="waitingPeriod"
                              name="waitingPeriod"
                              placeholder="Number of hours per week"
                            >
                              <option value="">Please Select</option>|{" "}
                              <option value={30}>30 Days</option>
                              <option value={60}>60 Days</option>
                              <option value={90}>90 Days</option>
                              <option value={120}>120 Days</option>
                              <option value={180}>180 Days</option>
                              <option value={2}>2 Years </option>
                            </Field>
                            <ErrorMessage
                              name="waitingPeriod"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label htmlFor="benefitPeriod" className="form-label">
                            Benefit Period
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3">
                            <Field
                              as="select"
                              className="form-select inputDesign shadow"
                              id="benefitPeriod"
                              name="benefitPeriod"
                              placeholder="Number of hours per week"
                            >
                              <option value="">Please Select</option>|{" "}
                              <option value={2}>2 Years</option>|{" "}
                              <option value={5}>5 Years</option>|{" "}
                              <option value={60}>To Age 60</option>|{" "}
                              <option value={65}>To Age 65</option>|{" "}
                              <option value={70}>To Age 70</option>
                            </Field>
                            <ErrorMessage
                              name="benefitPeriod"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-6">
                          <label
                            htmlFor="occupationBenefitPeriod"
                            className="form-label"
                          >
                            Own Occupation for Entire Benefit Period
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3 w-50">
                            <DynamicYesNo
                              name={`occupationBenefitPeriod`}
                              values={values}
                              handleChange={handleChange}
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="occupationBenefitPeriod"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label
                            htmlFor="superContinuance"
                            className="form-label"
                          >
                            Super continuance?
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3 w-50">
                            <DynamicYesNo
                              name={`superContinuance`}
                              values={values}
                              handleChange={handleChange}
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="superContinuance"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label className="form-label">
                            Agreed or indemnity?
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3">
                            <Field
                              as="select"
                              name="agreedIndemnity"
                              className="form-select inputDesign"
                              id="agreedIndemnity"
                            >
                              <option value="">Please Select</option>
                              <option value="Agreed">Agreed</option>
                              <option value="Indemnity ">Indemnity</option>
                            </Field>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label className="form-label">Premium type</label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3">
                            <Field
                              as="select"
                              name="premiumType"
                              className="form-select inputDesign"
                              id="premiumType"
                            >
                              <option value="">Please Select</option>
                              <option value="Stepped">Stepped</option>
                              <option value="Level">Level </option>
                            </Field>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label
                            htmlFor="paymentFrequencyInner"
                            className="form-label"
                          >
                            Payment Frequency
                          </label>
                        </div>
                        <div className="col-6">
                          <div className="mb-3">
                            <Field
                              as="select"
                              className="form-select inputDesign shadow"
                              id="paymentFrequencyInner"
                              name="paymentFrequencyInner"
                              placeholder="Number of hours per week"
                              onChange={(e) => {
                                const num =
                                  e.target.value === "Monthly" ? 12 : 1;
                                setFieldValue(
                                  "paymentFrequencyInner",
                                  num === 12 ? "Monthly" : "Yearly"
                                );
                                setFieldValue(
                                  "annualCostOfPremiums",
                                  num * (Number(values.costOfPremium) || 0)
                                );
                              }}
                            >
                              <option value="">Please Select</option>
                              <option value="Monthly">Monthly</option>
                              <option value="Yearly">Yearly</option>
                            </Field>
                            <ErrorMessage
                              name="paymentFrequencyInner"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label
                            htmlFor="costOfPremiumInner"
                            className="form-label"
                          >
                            Cost of Premium
                          </label>
                        </div>
                        <div className="col-6">
                          <div className="mb-3">
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="costOfPremiumInner"
                              placeholder="Cost of Premium"
                              name="costOfPremiumInner"
                              onChange={(e) => {
                                const num =
                                  values.paymentFrequencyInner === "Monthly"
                                    ? 12
                                    : 1;
                                const cost = Number(e.target.value) || 0;
                                setFieldValue("costOfPremiumInner", cost);
                                setFieldValue(
                                  "annualCostOfPremiums",
                                  num * cost
                                );
                              }}
                            />
                            <ErrorMessage
                              name="costOfPremium"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label
                            htmlFor="annualCostOfPremiums"
                            className="form-label"
                          >
                            Annual Cost of Premiums
                          </label>
                        </div>
                        <div className="col-6">
                          <div className="mb-3">
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="annualCostOfPremiums"
                              placeholder="Annual Cost of Premium"
                              name="annualCostOfPremiums"
                            />
                            <ErrorMessage
                              name="annualCostOfPremiums"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-6">
                          <label
                            htmlFor="whoPaysThePremiumsInner"
                            className="form-label"
                          >
                            Who pays the Premiums ?
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3">
                            <Field
                              as="select"
                              name="whoPaysThePremiumsInner"
                              className="form-select inputDesign"
                              id="whoPaysThePremiumsInner"
                            >
                              <option value="">Please Select</option>
                              <option value="Client">Client</option>
                              <option value="Partner">Partner </option>
                              <option value="Super Rollover">
                                Super Rollover{" "}
                              </option>
                              <option value="SMSF">SMSF </option>
                              <option value="Business">Business </option>
                              <option value="Company (Pty Ltd)">
                                Company (Pty Ltd)
                              </option>
                              <option value="Family Trust">
                                Family Trust{" "}
                              </option>
                              <option value="Other">Other</option>
                            </Field>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label
                            htmlFor="traumaCoverSumInsured"
                            className="form-label"
                          >
                            Commission Rate
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3">
                            <Field
                              type="number"
                              className="form-control inputDesign shadow"
                              id="commissionRate"
                              placeholder="Commission Rate"
                              name="commissionRate"
                            />
                            <ErrorMessage
                              name="commissionRate"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-6">
                          <label
                            htmlFor="accidentOption"
                            className="form-label"
                          >
                            Accident option?
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3 w-50">
                            <DynamicYesNo
                              name={`accidentOption`}
                              values={values}
                              handleChange={handleChange}
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="accidentOption"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label
                            htmlFor="increasingClaimsOption"
                            className="form-label"
                          >
                            Increasing claims option?
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3 w-50">
                            <DynamicYesNo
                              name={`increasingClaimsOption`}
                              values={values}
                              handleChange={handleChange}
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="increasingClaimsOption"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label
                            htmlFor="superLinkedInner"
                            className="form-label"
                          >
                            Super Linked
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3 w-50">
                            <DynamicYesNo
                              name={`superLinkedInner`}
                              values={values}
                              handleChange={handleChange}
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="superLinkedInner"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-6">
                          <label
                            htmlFor="isTheBenefitIndexed"
                            className="form-label"
                          >
                            Is the benefit indexed?
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3 w-50">
                            <DynamicYesNo
                              name={`isTheBenefitIndexed`}
                              values={values}
                              handleChange={handleChange}
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="isTheBenefitIndexed"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label
                            htmlFor="retainThisPolicy"
                            className="form-label"
                          >
                            Do you want to retain this policy?
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3 w-50">
                            <DynamicYesNo
                              name={`retainThisPolicy`}
                              values={values}
                              handleChange={handleChange}
                            />
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="retainThisPolicy"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-6">
                          <label
                            htmlFor="exclusionsLoadings"
                            className="form-label"
                          >
                            Exclusions / Loadings?
                          </label>
                        </div>

                        <div className="col-6">
                          <div className="mb-3">
                            <Field
                              type="text"
                              className="form-control inputDesign shadow"
                              id="exclusionsLoadings"
                              placeholder="Exclusions Loadings"
                              name="exclusionsLoadings"
                            />
                            <ErrorMessage
                              name="exclusionsLoadings"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row mt-5 d-none">
                        <div className="col-md-12">
                          <button
                            type="submit"
                            className="float-end btn w-25  bgColor modalBtn"
                          // onClick={nextbuttonHandler}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      type="submit"
                      className="btn btn-primary bgColor modalBtn"
                    >
                      Submit
                    </Button>
                  </Modal.Footer>
                </Form>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
      <Formik
        initialValues={initialValues}
        //  validationSchema={isPartnered ? validationSchema : singleValidationSchema}
        onSubmit={onSubmit}
        enableReinitialize
        innerRef={props.formRef}
      >
        {({ values, setFieldValue, setValues, handleChange, handleBlur }) => {
          useEffect(() => {
            fillInitialValues(setFieldValue);
          }, []);
          return (
            <Form>
              <div className="row">
                <div className="col-md-12">
                  {/* 1 row */}

                  <div className="row">
                    <div className="col-6"></div>

                    <div className="col-6">
                      <label
                        htmlFor=""
                        className="form-label text-center"
                        onClick={() => {
                          console.log(incomeProtection);
                        }}
                      >
                        {nameSet}
                        <div className="iconContainerLg">
                          <img src={single} alt="single svg" className="w-50" />
                        </div>
                      </label>
                    </div>

                    {values.EMPOwner === "Partner" && (
                      <div className="col-6">
                        <label htmlFor="" className="form-label text-center">
                          {nameSet}
                          <div className="iconContainerLg">
                            <img
                              src={couple}
                              alt="single svg"
                              className="w-50"
                            />
                          </div>
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="owner" className="form-label">
                        Owner
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          as="select"
                          className="form-select shadow inputDesign"
                          id="owner"
                          name="owner"
                          placeholder="Primary Occupation"
                        >
                          <option value="">Please Select</option>
                          <option value="Client">Client </option>
                          <option value="Partner">Partner</option>
                          <option value="SMSF">SMSF </option>
                          <option value="Super Trustees">
                            Super Trustees{" "}
                          </option>
                          <option value="Company (Pty Ltd)">
                            Company (Pty Ltd)
                          </option>
                          <option value="Family Trust">Family Trust </option>
                        </Field>
                        <ErrorMessage
                          name="owner"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="lifeInsured" className="form-label">
                        Life insured
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          type="text"
                          id="lifeInsured"
                          placeholder="Life Insured"
                          className="form-control shadow  inputDesign"
                          name="lifeInsured"
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="lifeInsured"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="insuranceCompany" className="form-label">
                        Insurance company
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          as="select"
                          className="form-select inputDesign shadow"
                          name="insuranceCompany"
                          id="insuranceCompany"
                          placeholder="Name of Company"
                        >
                          <option value="">Please Select</option>
                          <option value="List in super Admin Area">
                            List in super Admin Area{""}
                          </option>
                          <option value="AIA">AIA </option>
                          <option value="Clearview">Clearview</option>
                          <option value="Encompass">Encompass</option>
                          <option value="MLC">MLC</option>
                          <option value="Metlife">Metlife</option>
                          <option value="NEOS">NEOS</option>
                          <option value="One Path">One Path</option>
                          <option value="PPS Mutual">PPS Mutual </option>
                          <option value="TAL">TAL</option>
                          <option value="Zurich">Zurich</option>
                        </Field>
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="insuranceCompany"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="productName" className="form-label">
                        Product Name
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          type="text"
                          id="productName"
                          placeholder="Product Name"
                          className="form-control shadow  inputDesign"
                          name="productName"
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="productName"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="dateCommenced" className="form-label">
                        Smoker
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3 w-50">
                        <DynamicYesNo
                          name={`smoker`}
                          values={values}
                          handleChange={handleChange}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="smoker"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="policyNumber" className="form-label">
                        Policy Number
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          type="number"
                          id="policyNumber"
                          placeholder="Policy Number"
                          className="form-control shadow  inputDesign"
                          name="policyNumber"
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="policyNumber"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="dateCommenced" className="form-label">
                        Date Commenced
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <div>
                          <DatePicker
                            className="form-control inputDesign shadow"
                            showIcon
                            id="dateCommenced"
                            name="dateCommenced"
                            selected={values.dateCommenced}
                            onChange={(date) =>
                              setFieldValue("dateCommenced", date)
                            }
                            dateFormat="dd/MM/yyyy"
                            placeholderText="dd/mm/yyyy"
                            maxDate={new Date()}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            onBlur={handleBlur}
                            wrapperClassName="w-100"
                          />
                        </div>
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="dateCommenced"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="renewalMonthly" className="form-label">
                        Renewal Month
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          as="select"
                          className="form-select inputDesign shadow"
                          id="renewalMonthly"
                          name="renewalMonthly"
                          placeholder="Number of hours per week"
                        >
                          <option value="">Please Select</option>
                          <option value="January">January</option>
                          <option value="February">February </option>
                          <option value="March">March </option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June </option>
                          <option value="July">July </option>
                          <option value="August">August</option>
                          <option value="September">September </option>
                          <option value="October">October </option>
                          <option value="November">November </option>
                          <option value="December">December </option>
                        </Field>
                        <ErrorMessage
                          name="renewalMonthly"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="monthlyBenefit" className="form-label">
                        Monthly Benefit
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          type="number"
                          id="monthlyBenefit"
                          placeholder="Monthly Benefit"
                          className="form-control shadow  inputDesign"
                          name="monthlyBenefit"
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="monthlyBenefit"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="waitingPeriod" className="form-label">
                        Waiting Period
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          as="select"
                          className="form-select inputDesign shadow"
                          id="waitingPeriod"
                          name="waitingPeriod"
                          placeholder="Number of hours per week"
                        >
                          <option value="">Please Select</option>|{" "}
                          <option value={30}>30 Days</option>
                          <option value={60}>60 Days</option>
                          <option value={90}>90 Days</option>
                          <option value={120}>120 Days</option>
                          <option value={180}>180 Days</option>
                          <option value={2}>2 Years</option>
                        </Field>
                        <ErrorMessage
                          name="waitingPeriod"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="benefitPeriod" className="form-label">
                        Benefit Period
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          as="select"
                          className="form-select inputDesign shadow"
                          id="benefitPeriod"
                          name="benefitPeriod"
                          placeholder="Number of hours per week"
                        >
                          <option value="">Please Select</option>|{" "}
                          <option value={2}>2 Years</option>|{" "}
                          <option value={5}>5 Years</option>|{" "}
                          <option value={60}>To Age 60</option>|{" "}
                          <option value={65}>To Age 65</option>|{" "}
                          <option value={70}>To Age 70</option>
                        </Field>
                        <ErrorMessage
                          name="benefitPeriod"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label
                        htmlFor="occupationBenefitPeriod"
                        className="form-label"
                      >
                        Own Occupation for Entire Benefit Period
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3 w-50">
                        <DynamicYesNo
                          name={`occupationBenefitPeriod`}
                          values={values}
                          handleChange={handleChange}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="occupationBenefitPeriod"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="superContinuance" className="form-label">
                        Super continuance?
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3 w-50">
                        <DynamicYesNo
                          name={`superContinuance`}
                          values={values}
                          handleChange={handleChange}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="superContinuance"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Agreed or indemnity?</label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          as="select"
                          name="agreedIndemnity"
                          className="form-select inputDesign"
                          id="agreedIndemnity"
                        >
                          <option value="">Please Select</option>
                          <option value="Agreed">Agreed</option>
                          <option value="Indemnity ">Indemnity</option>
                        </Field>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Premium type</label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          as="select"
                          name="premiumType"
                          className="form-select inputDesign"
                          id="premiumType"
                        >
                          <option value="">Please Select</option>
                          <option value="Stepped">Stepped</option>
                          <option value="Level">Level </option>
                        </Field>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="paymentFrequency" className="form-label">
                        Payment Frequency
                      </label>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          as="select"
                          className="form-select inputDesign shadow"
                          id="paymentFrequency"
                          name="paymentFrequency"
                          placeholder="Number of hours per week"
                          onChange={(e) => {
                            const num = e.target.value === "Monthly" ? 12 : 1;
                            setFieldValue(
                              "paymentFrequency",
                              num === 12 ? "Monthly" : "Yearly"
                            );
                            setFieldValue(
                              "annualCostOfPremiums",
                              num * (Number(values.costOfPremium) || 0)
                            );
                          }}
                        >
                          <option value="">Please Select</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
                        </Field>
                        <ErrorMessage
                          name="paymentFrequency"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="costOfPremium" className="form-label">
                        Cost of Premium
                      </label>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          type="number"
                          className="form-control inputDesign shadow"
                          id="costOfPremium"
                          placeholder="Cost of Premium"
                          name="costOfPremium"
                          onChange={(e) => {
                            const num =
                              values.paymentFrequency === "Monthly" ? 12 : 1;
                            const cost = Number(e.target.value) || 0;
                            setFieldValue("costOfPremium", cost);
                            setFieldValue("annualCostOfPremiums", num * cost);
                          }}
                        />
                        <ErrorMessage
                          name="costOfPremium"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label
                        htmlFor="annualCostOfPremiums"
                        className="form-label"
                      >
                        Annual Cost of Premiums
                      </label>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          type="number"
                          className="form-control inputDesign shadow"
                          id="annualCostOfPremiums"
                          placeholder="Annual Cost of Premium"
                          name="annualCostOfPremiums"
                        />
                        <ErrorMessage
                          name="annualCostOfPremiums"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">
                        Who pays the Premiums ?
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          as="select"
                          name="whoPaysThePremiums"
                          className="form-select inputDesign"
                          id="whoPaysThePremiums"
                        >
                          <option value="">Please Select</option>
                          <option value="Client">Client</option>
                          <option value="Partner">Partner </option>
                          <option value="Super Rollover">
                            Super Rollover{" "}
                          </option>
                          <option value="SMSF">SMSF </option>
                          <option value="Business">Business </option>
                          <option value="Company (Pty Ltd)">
                            Company (Pty Ltd)
                          </option>
                          <option value="Family Trust">Family Trust </option>
                          <option value="Other">Other</option>
                        </Field>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label
                        htmlFor="traumaCoverSumInsured"
                        className="form-label"
                      >
                        Commission Rate
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          type="number"
                          className="form-control inputDesign shadow"
                          id="commissionRate"
                          placeholder="Commission Rate"
                          name="commissionRate"
                        />
                        <ErrorMessage
                          name="costOfPremium"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="accidentOption" className="form-label">
                        Accident option?
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3 w-50">
                        <DynamicYesNo
                          name={`accidentOption`}
                          values={values}
                          handleChange={handleChange}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="accidentOption"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label
                        htmlFor="increasingClaimsOption"
                        className="form-label"
                      >
                        Increasing claims option?
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3 w-50">
                        <DynamicYesNo
                          name={`increasingClaimsOption`}
                          values={values}
                          handleChange={handleChange}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="increasingClaimsOption"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label
                        htmlFor="isTheBenefitIndexed"
                        className="form-label"
                      >
                        Is the benefit indexed?
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3 w-50">
                        <DynamicYesNo
                          name={`isTheBenefitIndexed`}
                          values={values}
                          handleChange={handleChange}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="isTheBenefitIndexed"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="retainThisPolicy" className="form-label">
                        Do you want to retain this policy?
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3 w-50">
                        <DynamicYesNo
                          name={`retainThisPolicy`}
                          values={values}
                          handleChange={handleChange}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="retainThisPolicy"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label
                        htmlFor="exclusionsLoadings"
                        className="form-label"
                      >
                        Exclusions / Loadings?
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          type="text"
                          className="form-control inputDesign shadow"
                          id="exclusionsLoadings"
                          placeholder="Exclusions Loadings"
                          name="exclusionsLoadings"
                        />
                        <ErrorMessage
                          name="exclusionsLoadings"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="superLinked" className="form-label">
                        Super Linked
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3 w-50">
                        <DynamicYesNo
                          name={`superLinked`}
                          values={values}
                          handleChange={handleChange}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="superLinked"
                        />
                      </div>
                    </div>
                  </div>
                  {values.superLinked === "Yes" && (
                    <div className="row mb-3">
                      <div className="col-6">Enter Details</div>
                      <div className="col-6">
                        <Button
                          className=" btn btn-primary bgColor modalBtn"
                          onClick={() => handleShow(values)}
                        >
                          Enter Details
                        </Button>
                      </div>
                    </div>
                  )}


                  <div className="row mt-5 d-none">
                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="float-end btn w-25  bgColor modalBtn"
                      // onClick={nextbuttonHandler}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default IncomeProtection;
