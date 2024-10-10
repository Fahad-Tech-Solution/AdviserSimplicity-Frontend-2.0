import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { PatchAxios, PostAxios, RenderName } from "../../Assets/Api/Api";
import { Button, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import DynamicYesNo from "../FinancialInvestments/QuestionsDetail/DynamicYesNo";


const PersonalInsuranceLife = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  let DefaultUrl = useRecoilValue(defaultUrl);

  let [UserStatus] = useState(localStorage.getItem('UserStatus'));


  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});
  let [modalObject1, setModalObject1] = useState({});
  const [show, setShow] = useState(false);

  let life = Object.keys(questionDetail.life).length > 0 ? questionDetail.life : {
    client: [],
    partner: [],
    joint: [],

  }; // Use an empty object as default if life is undefined

  const fillInitialValues = (setFieldValue) => {

  };

  let initialValues = {

  };


  let onSubmit = async (values) => {
    console.log(JSON.stringify(values));
    return false;
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

  let handleInput = (e, setFieldValue) => {
    const value = e.target.value > 10 ? 10 : e.target.value;
    setFieldValue(e.target.id, value);
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
                          <th>Features</th>
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

                              <td></td>
                              <td></td>
                              <td></td>
                              <td>
                                <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                  <DynamicYesNo name={`loadingExclusion${i}`} values={values} handleChange={handleChange} />
                                  {values[`loadingExclusion${i}`] === "Yes" &&
                                    <Button className='btn bgColor modalBtn border-0' id="button-addon2"
                                      onClick={() => {
                                        handleInnerModal(
                                          "Loading / Exclusion",
                                          "loadingExclusionModal",
                                          values, "client")
                                      }}>
                                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                    </Button>
                                  }
                                </div>
                              </td>
                              <td> <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                <DynamicYesNo name={`beneficiary${i}`} values={values} handleChange={handleChange} />
                                {values[`beneficiary${i}`] === "Yes" &&
                                  <Button className='btn bgColor modalBtn border-0' id="button-addon2"
                                    onClick={() => {
                                      handleInnerModal(
                                        "Salary Packaging",
                                        "beneficiaryModal",
                                        values, "client")
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
