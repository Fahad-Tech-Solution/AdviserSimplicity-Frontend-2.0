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

const PersonalInsuranceLife = (props) => {
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
  }

  let life = Object.keys(questionDetail.life).length > 0 ? questionDetail.life : {
    client: [],
    partner: [],
    joint: [],

  }; // Use an empty object as default if life is undefined

  const fillInitialValues = (setFieldValue) => {
    // console.log("hello");
    if (
      life[props.modalObject.Input] &&
      life[props.modalObject.Input].owner
    ) {
      let data = life[props.modalObject.Input];

      if (data) {
        setFieldValue(`owner`, data.owner || "");
        setFieldValue(`lifeInsured`, data.lifeInsured || "");
        setFieldValue(`insuranceCompany`, data.insuranceCompany || "");
        setFieldValue(`productName`, data.productName || "");
        setFieldValue(`smoker`, data.smoker || "");
        setFieldValue(`policyNumber`, data.policyNumber || "");
        setFieldValue(`dateCommenced`, data.dateCommenced || "");
        setFieldValue(`renewalMonth`, data.renewalMonth || "");
        setFieldValue(`lifeCoverSumInsured`, data.lifeCoverSumInsured || "");
        setFieldValue(`TPDCoverSumInsured`, data.TPDCoverSumInsured || "");
        setFieldValue(`traumaCoverSumInsured`, data.traumaCoverSumInsured || "");
        setFieldValue(`paymentFrequency`, data.paymentFrequency || "");
        setFieldValue(`costOfPremium`, data.costOfPremium || "");
        let num = data.paymentFrequency == "Monthly" ? 12 : 1;
        setFieldValue(`annualCostOfPremium`, data.costOfPremium * num || "");
        setFieldValue(`whoPaysThePremiums`, data.whoPaysThePremiums || "");
        setFieldValue(`commissionRate`, data.commissionRate || "");
        setFieldValue(`retainThisPolicy`, data.retainThisPolicy || "");
        setFieldValue(`TPDDefinition`, data.TPDDefinition || "");
        setFieldValue(`premiumType`, data.premiumType || "");
        setFieldValue(`indexedToCPI`, data.indexedToCPI || "");
        setFieldValue(`continuationOption`, data.continuationOption || "");
        setFieldValue(`nameOfBeneficiaries`, data.nameOfBeneficiaries || "");
        setFieldValue(`exclusionsLoadings`, data.exclusionsLoadings || "");

        setModalObject1(data.SuperLinkedPolicy || "");
      }
      // console.log("hello1");
    }
    // console.log("hello2");
  };
  const fillInitialValues2 = (setFieldValue) => {
    // console.log(modalObject.SuperLinkedPolicy, modalObject1," this is it")
    if (modalObject1.ownerInner) {
      let SuperLinkedPolicy = modalObject.SuperLinkedPolicy || modalObject1;

      setFieldValue(`ownerInner`, SuperLinkedPolicy.ownerInner || "");
      setFieldValue(`policyNumberInner`, SuperLinkedPolicy.policyNumberInner || "");
      setFieldValue(`paymentFrequencyInner`, SuperLinkedPolicy.paymentFrequencyInner || "");
      setFieldValue(`costOfPremiumInner`, SuperLinkedPolicy.costOfPremiumInner || "");
      setFieldValue(`whoPaysThePremiumsInner`, SuperLinkedPolicy.whoPaysThePremiumsInner || "");
      setFieldValue(`TPDDefinitionInner`, SuperLinkedPolicy.TPDDefinitionInner || "");
      setFieldValue(`nameOfBeneficiariesInner`, SuperLinkedPolicy.nameOfBeneficiariesInner || "");

    }
  };
  let initialValues1 = {
    ownerInner: "",
    lifeInsured: modalObject.lifeInsured,
    insuranceCompany: modalObject.insuranceCompany,
    productName: modalObject.productName,
    smoker: modalObject.smoker,
    policyNumberInner: "",
    dateCommenced: modalObject.dateCommenced,
    renewalMonth: modalObject.renewalMonth,
    lifeCoverSumInsured: modalObject.lifeCoverSumInsured,
    TPDCoverSumInsured: modalObject.TPDCoverSumInsured,
    traumaCoverSumInsured: modalObject.traumaCoverSumInsured,
    paymentFrequencyInner: "",
    costOfPremiumInner: "",
    whoPaysThePremiumsInner: "",
    commissionRate: modalObject.commissionRate,
    retainThisPolicy: modalObject.retainThisPolicy,
    TPDDefinitionInner: "",
    premiumType: modalObject.premiumType,
    indexedToCPI: modalObject.indexedToCPI,
    continuationOption: modalObject.continuationOption,
    nameOfBeneficiariesInner: "",
    exclusionsLoadings: modalObject.exclusionsLoadings,

  };
  let initialValues = {
    owner: "",
    lifeInsured: "",
    insuranceCompany: "",
    productName: "",
    smoker: "",
    policyNumber: "",
    dateCommenced: "",
    renewalMonth: "",
    lifeCoverSumInsured: "",
    TPDCoverSumInsured: "",
    traumaCoverSumInsured: "",
    paymentFrequency: "",
    costOfPremium: "",
    whoPaysThePremiums: "",
    commissionRate: "",
    retainThisPolicy: "",
    TPDDefinition: "",
    premiumType: "",
    indexedToCPI: "",
    continuationOption: "",
    nameOfBeneficiaries: "",
    exclusionsLoadings: "",
  };
  const [dynamicFields, setDynamicFields] = useState([]);


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
      TPDDefinitionInner: values.TPDDefinitionInner,
      nameOfBeneficiariesInner: values.nameOfBeneficiariesInner,
    };
    setModalObject1(Object);
    handleClose();
  };

  let onSubmit = async (values) => {
    console.log(JSON.stringify(values));

    // Create an object with additional fields
    let DataOf = props.modalObject.Input;

    let obj = {
      owner: values.owner,
      lifeInsured: values.lifeInsured,
      insuranceCompany: values.insuranceCompany,
      // annualCostOfPremiums: values.annualCostOfPremiums,
      productName: values.productName,
      smoker: values.smoker,
      policyNumber: values.policyNumber,
      dateCommenced: values.dateCommenced,
      renewalMonth: values.renewalMonth,
      lifeCoverSumInsured: values.lifeCoverSumInsured,
      TPDCoverSumInsured: values.TPDCoverSumInsured,
      traumaCoverSumInsured: values.traumaCoverSumInsured,
      paymentFrequency: values.paymentFrequency,
      costOfPremium: values.costOfPremium,
      // annualcostOfPremium: values.CostOfPremium,
      whoPaysThePremiums: values.whoPaysThePremiums,
      commissionRate: values.commissionRate,
      retainThisPolicy: values.retainThisPolicy,
      TPDDefinition: values.TPDDefinition,
      premiumType: values.premiumType,
      indexedToCPI: values.indexedToCPI,
      continuationOption: values.continuationOption,
      nameOfBeneficiaries: values.nameOfBeneficiaries,
      exclusionsLoadings: values.exclusionsLoadings,

      SuperLinkedPolicy: values.TPDDefinition === "Super Linked Policy (Own and Any)" ? modalObject1 : undefined,
    };

    let Obj = {
      clientFK: localStorage.getItem("UserID"),
    };
    let num = obj.paymentFrequency == "Monthly" ? 12 : 1;
    Obj[DataOf + "Total"] = obj.costOfPremium * num;
    Obj[DataOf] = obj;
    console.log(Obj);

    try {
      let res;
      if (
        !questionDetail.life ||
        !questionDetail.life.clientFK
      ) {
        res = await PostAxios(`${DefaultUrl}/api/life/Add`, Obj);
      } else {
        Obj.collection = props.modalObject.Input;
        res = await PatchAxios(
          `${DefaultUrl}/api/life/Update`,
          Obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, life: res };
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
          <Modal.Title>Life (Super Linked Policy)</Modal.Title>
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
                            Super Trustees
                          </option>
                          <option value="Company (Pty Ltd)">
                            Company (Pty Ltd)
                          </option>
                          <option value="Family Trust">Family Trust </option>
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
                      <label htmlFor="smoker" className="form-label">
                        Smoker
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="centerDiv mb-3 w-50">
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
                      <label htmlFor="policyNumberInner" className="form-label">
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
                            className="form-control inputDesign shadow DateInputPadding"
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
                      <label htmlFor="renewalMonth" className="form-label">
                        Renewal Month
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          as="select"
                          className="form-select inputDesign shadow"
                          id="renewalMonth"
                          name="renewalMonth"
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
                          name="renewalMonth"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label
                        htmlFor="lifeCoverSumInsured"
                        className="form-label"
                      >
                        Life Cover Sum insured
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          type="number"
                          name="lifeCoverSumInsured"
                          className="form-control inputDesign shadow"
                          id="lifeCoverSumInsured"
                          placeholder="Salary (Excluding Super)"
                        />
                        <ErrorMessage
                          name="lifeCoverSumInsured"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label
                        htmlFor="TPDCoverSumInsured"
                        className="form-label"
                      >
                        TPD Cover Sum insured
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          type="number"
                          className="form-control inputDesign shadow"
                          id="TPDCoverSumInsured"
                          placeholder="TPD Cover Sum Insured"
                          name="TPDCoverSumInsured"
                        />
                        <ErrorMessage
                          name="TPDCoverSumInsured"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label
                        htmlFor="traumaCoverSumInsured"
                        className="form-label"
                      >
                        Trauma Cover Sum insured
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          type="number"
                          className="form-control inputDesign shadow"
                          id="traumaCoverSumInsured"
                          placeholder="Trauma Cover Sum Insured"
                          name="traumaCoverSumInsured"
                        />
                        <ErrorMessage
                          name="traumaCoverSumInsured"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="paymentFrequencyInner" className="form-label">
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
                          name="costOfPremiumInner"
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
                          placeholder="Annuyal Cost of Premium"
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
                          name="whoPaysThePremiumsInner"
                          className="form-select inputDesign"
                          id="whoPaysThePremiumsInner"
                        >
                          <option value="">Please Select</option>
                          <option value="Client">Client</option>
                          <option value="Partner">Partner </option>
                          <option value="Super Rollover">
                            Super Rollover{""}
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
                        htmlFor="commissionRate"
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
                      <label htmlFor="retainThisPolicy" className="form-label">
                        Do you want to retain this policy?
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="centerDiv mb-3 w-50">
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
                      <label className="form-label">TPD Definition</label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          as="select"
                          name="TPDDefinitionInner"
                          className="form-select inputDesign"
                          id="TPDDefinitionInner"
                        >
                          <option value="">Please Select</option>
                          <option value="Own Occupation">
                            Own Occupation{""}
                          </option>
                          <option value="Any Occupation">
                            Any Occupation{""}
                          </option>
                          <option value="Super Linked Policy (Own and Any)">
                            Super Linked Policy (Own and Any)
                          </option>
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
                      <label htmlFor="indexedToCPI" className="form-label">
                        Indexed to CPI?
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="centerDiv mb-3 w-50">
                        <DynamicYesNo
                          name={`indexedToCPI`}
                          values={values}
                          handleChange={handleChange}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="indexedToCPI"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="continuationOption" className="form-label">
                        Continuation option?
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="centerDiv mb-3 w-50">
                        <DynamicYesNo
                          name={`continuationOption`}
                          values={values}
                          handleChange={handleChange}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="continuationOption"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label
                        htmlFor="nameOfBeneficiariesInner"
                        className="form-label"
                      >
                        Name of Beneficiaries
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          type="text"
                          className="form-control inputDesign shadow"
                          id="nameOfBeneficiariesInner"
                          placeholder="Name Of Beneficiaries"
                          name="nameOfBeneficiariesInner"
                        />
                        <ErrorMessage
                          name="nameOfBeneficiariesInner"
                          component="div"
                          className="text-danger fw-bold"
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
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button type="submit" className="btn btn-primary bgColor modalBtn">Submit</Button>
                  </Modal.Footer>
                </Form>
              );
            }}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="btn btn-primary bgColor modalBtn">Submit</Button>
        </Modal.Footer>
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
            // alert("rasengan")
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
                      <div className="centerDiv mb-3">
                        <label htmlFor="" className="form-label text-center">
                          {nameSet}
                          <div className="iconContainerLg">
                            <img src={single} alt="single svg" className="w-50" />
                          </div>
                        </label>
                      </div>
                    </div>

                    {values.EMPOwner === "Partner" && (
                      <div className="col-6">
                        <div className="centerDiv">
                          <label htmlFor="" className="form-label text-center">
                            {nameSet}
                            <div className="iconContainerLg">
                              <img src={couple} alt="single svg" className="w-50" />
                            </div>
                          </label>
                        </div>
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
                          <option value="Super Trustees">Super Trustees </option>
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
                      <label htmlFor="smoker" className="form-label">
                        Smoker
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="centerDiv mb-3 w-50">
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
                            className="form-control inputDesign shadow DateInputPadding"
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
                      <label htmlFor="renewalMonth" className="form-label">
                        Renewal Month
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          as="select"
                          className="form-select inputDesign shadow"
                          id="renewalMonth"
                          name="renewalMonth"
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
                          name="renewalMonth"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="lifeCoverSumInsured" className="form-label">
                        Life Cover Sum insured
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          type="number"
                          name="lifeCoverSumInsured"
                          className="form-control inputDesign shadow"
                          id="lifeCoverSumInsured"
                          placeholder="Salary (Excluding Super)"
                        />
                        <ErrorMessage
                          name="lifeCoverSumInsured"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="TPDCoverSumInsured" className="form-label">
                        TPD Cover Sum insured
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          type="number"
                          className="form-control inputDesign shadow"
                          id="TPDCoverSumInsured"
                          placeholder="TPD Cover Sum Insured"
                          name="TPDCoverSumInsured"
                        />
                        <ErrorMessage
                          name="TPDCoverSumInsured"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label
                        htmlFor="traumaCoverSumInsured"
                        className="form-label"
                      >
                        Trauma Cover Sum insured
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          type="number"
                          className="form-control inputDesign shadow"
                          id="traumaCoverSumInsured"
                          placeholder="Trauma Cover Sum Insured"
                          name="traumaCoverSumInsured"
                        />
                        <ErrorMessage
                          name="traumaCoverSumInsured"
                          component="div"
                          className="text-danger fw-bold"
                        />
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
                          placeholder="Annuyal Cost of Premium"
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
                          <option value="Super Rollover">Super Rollover </option>
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
                      <label htmlFor="commissionRate" className="form-label">
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
                      <label htmlFor="retainThisPolicy" className="form-label">
                        Do you want to retain this policy?
                      </label>
                    </div>

                    <div className="col-6">
                      <div className=" centerDiv mb-3 w-50">
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
                      <label htmlFor="indexedToCPI" className="form-label">
                        Indexed to CPI?
                      </label>
                    </div>

                    <div className="col-6">
                      <div className=" centerDiv mb-3 w-50">
                        <DynamicYesNo
                          name={`indexedToCPI`}
                          values={values}
                          handleChange={handleChange}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="indexedToCPI"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="continuationOption" className="form-label">
                        Continuation option?
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="centerDiv mb-3 w-50">
                        <DynamicYesNo
                          name={`continuationOption`}
                          values={values}
                          handleChange={handleChange}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="continuationOption"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="nameOfBeneficiaries" className="form-label">
                        Name of Beneficiaries
                      </label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          type="text"
                          className="form-control inputDesign shadow"
                          id="nameOfBeneficiaries"
                          placeholder="Name Of Beneficiaries"
                          name="nameOfBeneficiaries"
                        />
                        <ErrorMessage
                          name="nameOfBeneficiaries"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="exclusionsLoadings" className="form-label">
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
                      <label className="form-label">TPD Definition</label>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Field
                          as="select"
                          name="TPDDefinition"
                          className="form-select inputDesign"
                          id="TPDDefinition"
                        >
                          <option value="">Please Select</option>
                          <option value="Own Occupation">Own Occupation </option>
                          <option value="Any Occupation">Any Occupation </option>
                          <option value="Super Linked Policy (Own and Any)">
                            Super Linked Policy (Own and Any)
                          </option>
                        </Field>
                      </div>
                    </div>
                  </div>
                  {values.TPDDefinition ===
                    "Super Linked Policy (Own and Any)" && (
                      <div className="row mb-3">
                        <div className="col-6 fw-bold">Enter Details</div>
                        <div className="col-6">
                          <div className="centerDiv">
                            <Button
                              className=" btn btn-primary bgColor modalBtn"
                              onClick={() => handleShow(values)}
                            >
                              Enter Details
                            </Button>
                          </div>
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
          )
        }}
      </Formik>
    </div>
  );
};

export default PersonalInsuranceLife;
