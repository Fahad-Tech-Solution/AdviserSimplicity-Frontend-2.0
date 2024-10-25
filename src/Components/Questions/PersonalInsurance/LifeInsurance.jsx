import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { openNotificationSuccess, PatchAxios, PostAxios, RenderName, toCommaAndDollar } from "../../Assets/Api/Api";
import { Button, InputGroup, Modal, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import DynamicYesNo from "../FinancialInvestments/QuestionsDetail/DynamicYesNo";
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import PremiumsDetails from "./PremiumsDetails";
import Beneficiaries from "../FinancialInvestments/QuestionsDetail/Beneficiaries";
import NewLoadingExclusion from "./NewLoadingExclusion";


const PersonalInsuranceLife = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  let DefaultUrl = useRecoilValue(defaultUrl);

  let [UserStatus] = useState(localStorage.getItem('UserStatus'));

  let [flagState, setFlagState] = useState(false);
  let [showModal, setShowModal] = useState(false);

  let [modalObject, setModalObject] = useState({
    title: "",
    key: "",
    values: "",
  });


  let personalInsurance = Object.keys(questionDetail.personalInsurance).length > 0 ? questionDetail.personalInsurance : {
    client: [],
    partner: [],
    joint: [],

  }; // Use an empty object as default if life is undefined

  const fillInitialValues = (setFieldValue) => {
    // console.log(personalInsurance);

    let Data = personalInsurance;

    if (Data?.PersonalInsurance) {

      if (personalInsurance.numberOfPersonalInsurance > 0) {

        setFieldValue("NumberOfMap", personalInsurance.numberOfPersonalInsurance);
      } else {
        setFieldValue("NumberOfMap", "");
      }


      personalInsurance.PersonalInsurance.forEach((entry, index) => {
        // alert(entry.lifeInsured);
        setFieldValue("lifeInsured" + index, entry.lifeInsured);
        setFieldValue("provider" + index, entry.provider);
        setFieldValue("policyNo" + index, entry.policyNo);
        setFieldValue("owner" + index, entry.owner);
        setFieldValue("startDate" + index, entry.startDate);
        setFieldValue("sumInsured" + index, entry.sumInsured);
        setFieldValue("sumInsuredSum" + index, entry.sumInsuredSum);
        setFieldValue("premiums" + index, entry.premiums);
        setFieldValue("premiumsDetails" + index, entry.premiumsDetails);
        setFieldValue("loadingExclusion" + index, entry.loadingExclusion);
        setFieldValue("loadingExclusionValue" + index, entry.loadingExclusionValue);
        setFieldValue("beneficiary" + index, entry.beneficiary);
        setFieldValue("beneficiariesArray" + index, entry.beneficiariesArray);
      })
    }
  };

  let initialValues = {
    NumberOfMap: "",
  };


  let onSubmit = async (values) => {
    // console.log(JSON.stringify(values), "Console Values");

    let newEntries = [];

    let loopLength = parseFloat(values.NumberOfMap)

    // alert(loopLength)

    // Iterate through each map entry and create a new object
    for (let i = 0; i < loopLength; i++) {
      let newEntry = {};

      newEntry = {
        lifeInsured: values[`lifeInsured${i}`] || "",
        provider: values[`provider${i}`] || "",
        policyNo: values[`policyNo${i}`] || "",
        owner: values[`owner${i}`] || "",
        startDate: values[`startDate${i}`] || "",
        sumInsuredSum: values[`sumInsuredSum${i}`] || "",
        sumInsured: values[`sumInsured${i}`] || "",
        premiums: values[`premiums${i}`] || "",
        premiumsDetails: values[`premiumsDetails${i}`] || "",
        loadingExclusion: values[`loadingExclusion${i}`] || "",
        loadingExclusionValue: values[`loadingExclusionValue${i}`] || "",
        beneficiary: values[`beneficiary${i}`] || "",
        beneficiariesArray: values[`beneficiariesArray${i}`] || "",
      };
      // console.log(newEntry, "Console newEntry");
      // console.log(newEntries, "before Push");
      newEntries.push(newEntry);
      // console.log(newEntries, "after Push");

    }

    // console.log(newEntries, "Console newEntries");


    let Obj = {};
    Obj.PersonalInsurance = newEntries;
    Obj.numberOfPersonalInsurance = newEntries.length;
    Obj.clientFK = localStorage.getItem("UserID");


    let clientArray = [];
    let partnerArray = [];
    let bothArray = [];

    newEntries.forEach(entry => {
      if (entry.lifeInsured === "client") {
        clientArray.push(entry);
      }
      if (entry.lifeInsured === "partner") {
        partnerArray.push(entry);
      }
      if (entry.lifeInsured === "client+partner") {
        bothArray.push(entry);
      }
    });

    // console.log("Client Array:", clientArray);
    // console.log("Partner Array:", partnerArray);
    // console.log("both Array:", bothArray);

    let obj = {
      "clientLifeInsuranceTotal": 0,
      "clientTPDTotal": 0,
      "clientTraumaTotal": 0,
      "clientIncomeProtectionTotal": 0,

      "partnerLifeInsuranceTotal": 0,
      "partnerTPDTotal": 0,
      "partnerTraumaTotal": 0,
      "partnerIncomeProtectionTotal": 0
    };

    clientArray.forEach(entry => {
      // console.log(entry.sumInsured.coverType, entry.premiums);

      let premiumValue = parseFloat(entry.premiums.replace(/[^0-9.-]+/g, ""));

      let sumInsuredArray = entry.sumInsured || [];
      sumInsuredArray.forEach(SumData => {

        if (SumData.coverType === "Life") {
          obj.clientLifeInsuranceTotal += premiumValue;
        }
        else if (SumData.coverType === "TPD") {
          obj.clientTPDTotal += premiumValue;
        }
        else if (SumData.coverType === "Trauma") {
          obj.clientTraumaTotal += premiumValue;
        }
        else if (SumData.coverType === "Income protection") {
          obj.clientIncomeProtectionTotal += premiumValue;
        }

      })

    });

    partnerArray.forEach(entry => {
      // console.log(entry.sumInsured.coverType, entry.premiums);

      let premiumValue = parseFloat(entry.premiums.replace(/[^0-9.-]+/g, ""));

      let sumInsuredArray = entry.sumInsured || [];
      sumInsuredArray.forEach(SumData => {

        if (SumData.coverType === "Life") {
          obj.partnerLifeInsuranceTotal += premiumValue;
        }
        else if (SumData.coverType === "TPD") {
          obj.partnerTPDTotal += premiumValue;
        }
        else if (SumData.coverType === "Trauma") {
          obj.partnerTraumaTotal += premiumValue;
        }
        else if (SumData.coverType === "Income protection") {
          obj.partnerIncomeProtectionTotal += premiumValue;
        }

      })

    });

    bothArray.forEach(entry => {
      // console.log(entry.sumInsured.coverType, entry.premiums);

      let premiumValue = (parseFloat(entry.premiums.replace(/[^0-9.-]+/g, "")) / 2);

      let sumInsuredArray = entry.sumInsured || [];
      sumInsuredArray.forEach(SumData => {

        if (SumData.coverType === "Life") {
          obj.clientLifeInsuranceTotal += premiumValue;
          obj.partnerLifeInsuranceTotal += premiumValue;
        }
        else if (SumData.coverType === "TPD") {
          obj.clientTPDTotal += premiumValue;
          obj.partnerTPDTotal += premiumValue;
        }
        else if (SumData.coverType === "Trauma") {
          obj.clientTraumaTotal += premiumValue;
          obj.partnerTraumaTotal += premiumValue;
        }
        else if (SumData.coverType === "Income protection") {
          obj.clientIncomeProtectionTotal += premiumValue;
          obj.partnerIncomeProtectionTotal += premiumValue;
        }
      })
    });

    // console.log(obj, "Submit ka console Form k ");

    Obj.clientLifeInsuranceTotal = toCommaAndDollar(obj.clientLifeInsuranceTotal);
    Obj.clientTPDTotal = toCommaAndDollar(obj.clientTPDTotal);
    Obj.clientTraumaTotal = toCommaAndDollar(obj.clientTraumaTotal);
    Obj.clientIncomeProtectionTotal = toCommaAndDollar(obj.clientIncomeProtectionTotal);

    Obj.partnerLifeInsuranceTotal = toCommaAndDollar(obj.partnerLifeInsuranceTotal);
    Obj.partnerTPDTotal = toCommaAndDollar(obj.partnerTPDTotal);
    Obj.partnerTraumaTotal = toCommaAndDollar(obj.partnerTraumaTotal);
    Obj.partnerIncomeProtectionTotal = toCommaAndDollar(obj.partnerIncomeProtectionTotal);

    const bankAccountArray = personalInsurance.clientFK || "";  // No need to default to empty string
    console.log(JSON.stringify(Obj), bankAccountArray);

    try {
      let res;
      if (bankAccountArray == "") {  // Check if it's truthy and not an empty string
        res = await PostAxios(`${DefaultUrl}/api/personalInsurance/Add`, Obj);
      } else {
        res = await PatchAxios(`${DefaultUrl}/api/personalInsurance/Update`, Obj);
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, personalInsurance: res };
        setQuestionDetail(updatedData);
      }

      openNotificationSuccess("success", "topRight", "Success Notification", "Data of \"" + props.modalObject.title + "\" is Saved");
      // Reset the flag state if necessary
      if (props.flagState) {
        props.setFlagState(false);
      }

    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess("error", "topRight", "Error Notification", "Data of \"" + props.modalObject.title + "\" is not Saved Please! try again");
    }
  };

  let handleInput = (e, setFieldValue) => {
    const value = e.target.value > 10 ? 10 : e.target.value;
    setFieldValue(e.target.id, value);
  };


  let handleInnerModal = (title, question, key, values, editArray, index) => {
    // alert("asdasd");
    setModalObject({
      title,
      question,
      key,
      values,
      editArray: editArray || [],
      index
    });
    setFlagState(true);
  }

  const componentMapping = {

    "sumInsured": <NewLoadingExclusion />,
    "premiumsDetails": <PremiumsDetails />,
    "beneficiariesArray": <Beneficiaries />

  };


  const ModalContent = (obj) => {
    let maKeaBtao = obj.key;
    return componentMapping[maKeaBtao] || null;
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
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

              <InnerModal modalObject={modalObject} setFieldValue={setFieldValue} setFlagState={setFlagState} flagState={flagState} >
                {ModalContent(modalObject)}
              </InnerModal>


              <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                <label htmlFor='' className=''>
                  How many {props.modalObject.title} does {RenderName("client")} {UserStatus === "Married" && `and ${RenderName("partner")}`}  have:
                </label>

                <div style={{ width: "10%" }} >
                  <Field
                    type="number"
                    id="NumberOfMap"
                    name="NumberOfMap"
                    className="form-control inputDesignDoubleInput"
                    onChange={(e) => handleInput(e, setFieldValue)}
                  />
                </div>
              </div>

              <div className="row justify-content-center">
                {values.NumberOfMap && (
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
                          <th>Life insured</th>
                          <th>Provider</th>
                          <th>Policy no</th>
                          <th>Owner</th>
                          <th>Start Date</th>
                          <th>Sum Insured</th>
                          <th>Premiums p.a</th>
                          <th>Loading/Exclusion</th>
                          <th>Beneficiary</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: values.NumberOfMap }).map((_, i) => {
                          return (
                            <tr key={i}>
                              <td>{1 + i}</td>
                              <td>
                                <Field
                                  as="select"
                                  placeholder="Life insured"
                                  id={`lifeInsured${i}`}
                                  name={`lifeInsured${i}`}
                                  className="form-select inputDesignDoubleInput"
                                  onChange={(e) => {
                                    setFieldValue(e.target.name, e.target.value);
                                    // alert(e.target.value)
                                  }}
                                >
                                  <option value={""}>Select</option>
                                  <option value={"client"}>{RenderName("client")}</option>
                                  {UserStatus !== "Single" &&
                                    <React.Fragment>
                                      <option value={"partner"}>{RenderName("partner")}</option>
                                      {/*
                                          <option value={"joint"}> {"Joint (" + RenderName("joint") + ")"} </option>
                                          <option value={"client+partner+joint"}>{RenderName("client") + " , " + RenderName("partner") + " and Joint"} </option>
                                          */}
                                      <option value={"client+partner"}>{"Both (" + RenderName("client") + " , " + RenderName("partner") + ")"} </option>
                                    </React.Fragment>
                                  }
                                </Field>
                              </td>
                              <td>
                                <Field
                                  as="select"
                                  placeholder="Life insured"
                                  id={`provider${i}`}
                                  name={`provider${i}`}
                                  className="form-select inputDesignDoubleInput"
                                >
                                  <option value={""}>Select</option>
                                  <option value={"AIA"}>AIA</option>
                                  <option value={"Clearview"}>Clearview</option>
                                  <option value={"Encompass"}>Encompass</option>
                                  <option value={"MLC"}>MLC</option>
                                  <option value={"Metlife"}>Metlife</option>
                                  <option value={"NEOS"}>NEOS</option>
                                  <option value={"One Path"}>One Path</option>
                                  <option value={"PPS Mutual"}>PPS Mutual</option>
                                  <option value={"TAL"}>TAL</option>
                                  <option value={"Zurich"}>Zurich</option>
                                </Field>
                              </td>
                              <td>
                                <Field
                                  type="number"
                                  placeholder="Policy No"
                                  id={`policyNo${i}`}
                                  name={`policyNo${i}`}
                                  className="form-control inputDesignDoubleInput"
                                />
                              </td>
                              <td>
                                <Field
                                  as="select"
                                  id={`owner${i}`}
                                  name={`owner${i}`}
                                  className="form-select inputDesignDoubleInput"
                                >
                                  <option value={""}>Select</option>
                                  <option value={"client"}>{RenderName("client")}</option>
                                  {UserStatus !== "Single" &&
                                    <React.Fragment>
                                      <option value={"partner"}>{RenderName("partner")}</option>
                                    </React.Fragment>
                                  }
                                  <option value={"SMSF"}>SMSF</option>
                                  <option value={"Super Trustees"}>Super Trustees </option>
                                  <option value={"Company (Pty Ltd)"}>Company (Pty Ltd)</option>
                                  <option value={"Family Trust"}>Family Trust</option>
                                </Field>
                              </td>
                              <td>
                                <div style={{ minWidth: "100px" }}>
                                  <DatePicker
                                    className="form-control inputDesignDoubleInput shadow DateInputPadding"
                                    showIcon
                                    id={`startDate${i}`}
                                    name={`startDate${i}`}
                                    selected={values[`startDate${i}`]}
                                    onChange={(date) => setFieldValue(`startDate${i}`, date)}
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
                              </td>

                              <td>
                                <div className='d-flex flex-column justify-content-center align-items-center gap-2'>

                                  <InputGroup>
                                    <Field
                                      type="text"
                                      placeholder="Sum Insured "
                                      id={`sumInsuredSum${i}`}
                                      name={`sumInsuredSum${i}`}
                                      className="form-control inputDesignDoubleInput"
                                      onChange={(e) => {
                                        setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")))
                                      }}
                                    />
                                    <Button className='btn bgColor modalBtn border-0' id="button-addon2"
                                      onClick={() => {
                                        let name = ((values[`lifeInsured${i}`] === undefined) || (values[`lifeInsured${i}`] === null) || (values[`lifeInsured${i}`] === null)) ? RenderName("client")
                                          : values[`lifeInsured${i}`] === "client+partner" ? RenderName("client") + " & " + RenderName("partner") : RenderName(values[`lifeInsured${i}`])

                                        handleInnerModal(name + "_Sum Insured", `How many Policies do ${name} have?`, `sumInsured`, values, values[`sumInsured${i}`], i)
                                      }}>
                                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                    </Button>
                                  </InputGroup>
                                </div>
                              </td>
                              <td>
                                <InputGroup>
                                  <Field
                                    type="text"
                                    placeholder="Premiums p.a"
                                    id={`premiums${i}`}
                                    name={`premiums${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")))
                                    }}
                                  />
                                  <Button className='btn bgColor modalBtn border-0' id="button-addon2"
                                    onClick={() => {
                                      let name = ((values[`lifeInsured${i}`] === undefined) || (values[`lifeInsured${i}`] === null) || (values[`lifeInsured${i}`] === null)) ? RenderName("client")
                                        : values[`lifeInsured${i}`] === "client+partner" ? RenderName("client") + " & " + RenderName("partner") : RenderName(values[`lifeInsured${i}`])

                                      handleInnerModal(name + "_Premiums p.a", ``, `premiumsDetails`, values, values[`premiumsDetails${i}`], i)
                                    }}>
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                  </Button>
                                </InputGroup>
                              </td>
                              <td>
                                <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                  <DynamicYesNo name={`loadingExclusion${i}`} values={values} handleChange={handleChange} />
                                  {values[`loadingExclusion${i}`] === "Yes" &&
                                    <div className="w-100 ">
                                      <Field
                                        type="text"
                                        placeholder="Loading / Exclusion"
                                        id={`loadingExclusionValue${i}`}
                                        name={`loadingExclusionValue${i}`}
                                        className="form-control inputDesignDoubleInput"
                                      />
                                    </div>
                                  }
                                </div>
                              </td>
                              <td> <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                <DynamicYesNo name={`beneficiary${i}`} values={values} handleChange={handleChange} />
                                {values[`beneficiary${i}`] === "Yes" &&
                                  <Button className='btn bgColor modalBtn border-0' id="button-addon2"
                                    onClick={() => {
                                      let name = ((values[`lifeInsured${i}`] === undefined) || (values[`lifeInsured${i}`] === null) || (values[`lifeInsured${i}`] === null)) ? RenderName("client")
                                        : values[`lifeInsured${i}`] === "client+partner" ? RenderName("client") + " & " + RenderName("partner") : RenderName(values[`lifeInsured${i}`]);

                                      handleInnerModal(name + "_Beneficiaries", `How many beneficiaries do ${name} have?`, `beneficiariesArray`, values, values[`beneficiariesArray${i}`], i, "ParentModal")

                                    }}>
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                  </Button>
                                }
                              </div>
                              </td>

                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                )}
              </div>

            </Form>
          )
        }}
      </Formik>
    </div>
  );
};

export default PersonalInsuranceLife;
