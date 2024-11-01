import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, InputGroup, Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { openNotificationSuccess, PatchAxios, PostAxios, RenderName, toCommaAndDollar } from "../../Assets/Api/Api";
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import DynamicYesNo from "../FinancialInvestments/QuestionsDetail/DynamicYesNo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import PensionBenefits from "./PensionBenefits";
import Beneficiaries from "../FinancialInvestments/QuestionsDetail/Beneficiaries";
import { CreatableMultiSelectField } from "../FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";


const SmsfPensionAccount = (props) => {

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

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let initialValues = { NumberOfMap: "" };

  const fillInitialValues = (setFieldValue) => {
    console.log(props.modalObject.editArray)

    if (props.modalObject.editArray) {
      setFieldValue(`NumberOfMap`, props.modalObject.editArray.length || "");
      props.modalObject.editArray.forEach((data, i) => {
        if (data) {
          setFieldValue(`pensionBenefits${i}`, data.pensionBenefits || "");
          setFieldValue(`pensionBenefitsarray${i}`, data.pensionBenefitsarray || "");
          setFieldValue(`pensionPayment${i}`, data.pensionPayment || "");
          setFieldValue(`pensionType${i}`, data.pensionType || "");
          setFieldValue(`nominatedBeneficiaries${i}`, data.nominatedBeneficiaries || "");
          setFieldValue(`beneficiariesArray${i}`, data.beneficiariesArray || "");
        }
      });
    }

  };

  let handleInnerModal = (
    title,
    question,
    key,
    mainKey,
    key3,
    editArray,
    index,
    values
  ) => {
    console.log(values);
    let ParentModal = props.modalObject.title
    setModalObject({
      title,
      question,
      key,
      mainKey,
      key3,
      editArray: editArray || [],
      index,
      values,
      ParentModal
    });
    setFlagState(true);
  };

  let onSubmit = async (values) => {
    console.log(JSON.stringify(values));
    // return (false);
    // Extract the number of maps from the values
    const numberOfMaps = parseInt(values.NumberOfMap, 10);
    const newEntries = [];

    // Iterate through each map entry and create a new object
    for (let i = 0; i < numberOfMaps; i++) {
      const newEntry = {
        pensionBenefits: values[`pensionBenefits${i}`] || "",
        pensionBenefitsarray: values[`pensionBenefitsarray${i}`] || "",
        pensionPayment: values[`pensionPayment${i}`] || "",
        pensionType: values[`pensionType${i}`] || "",
        nominatedBeneficiaries: values[`nominatedBeneficiaries${i}`] || "",
        beneficiariesArray: values[`beneficiariesArray${i}`] || "",
      };
      newEntries.push(newEntry);
    }

    // Log the new entries to verify
    console.log(`${props.modalObject.mainKey}${props.modalObject.index}`, newEntries);

    let Total = newEntries.reduce(
      (total, entry) => total + parseFloat(entry.pensionBenefits.replace(/[^0-9.-]+/g, "")),
      0
    );

    props.setFieldValue(`${props.modalObject.mainKey}${props.modalObject.index}`, toCommaAndDollar(Total));

    props.setFieldValue(`${props.modalObject.key}${props.modalObject.index}`, newEntries);
    // return false

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }

  };

  const options = ["Account Based Pension ", "TTR"];

  let [ShowError, setShowError] = useState({});

  let CheckInputValue = (values, setFieldValue, currentInput, index) => {
    let pensionBenefitsarray = values[`pensionBenefitsarray${index}`];
    // console.log(values, setFieldValue, currentInput, pensionBenefitsarray);

    let ExpectedSum = pensionBenefitsarray.reduce((total, entry) => total + parseFloat((entry.taxableComponent).replace(/[^0-9.-]+/g, "")), 0);
    let data = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, ""));

    console.log(ExpectedSum, data, currentInput.name, ShowError)

    if (ExpectedSum !== data) {
      setShowError(prevState => ({
        ...prevState,
        [`${currentInput.name}Error`]: true,
        [`${currentInput.name}Message`]: "Total must be equal to the sum of all Pension Benefits filled in the popup. The sum is " + toCommaAndDollar(ExpectedSum),
      }));
    }
    else {
      setShowError(prevState => ({
        ...prevState,
        [`${currentInput.name}Error`]: false,
        [`${currentInput.name}Message`]: "",
      }));
    }
  }

  let handleInput = (e, setFieldValue) => {

    const value = e.target.value > 5 ? 5 : e.target.value;
    setFieldValue(e.target.id, value);
  };


  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange }) => {
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
                {modalObject.key === "pensionBenefitsarray" ?
                  <PensionBenefits />
                  :
                  modalObject.key === "beneficiariesArray" ?
                    <Beneficiaries />
                    :
                    ""
                }
              </InnerModal>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="col-md-5">
                    <p className="text-end mt-1">
                      How many {props.modalObject.title} does{" "}
                      {nameSet} have :
                    </p>
                  </div>
                  <div className="col-md-2">
                    <Field
                      type="number"
                      id="NumberOfMap"
                      name="NumberOfMap"
                      className="form-control inputDesignDoubleInput"
                      onChange={(e) => handleInput(e, setFieldValue)}
                    />
                  </div>
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
                            <th>Pension Benefits </th>
                            <th>Pension Payment </th>
                            <th>Pension Type </th>
                            <th>Nominated Beneficiaries</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: parseFloat(values.NumberOfMap) }).map((_, i) => {
                            return (
                              <tr key={i}>
                                <td>{1 + i}</td>
                                <td>
                                  <InputGroup className={`mb-3 ${ShowError[`pensionBenefits${i}Error`] === true ? "is-invalid" : ""}`}>
                                    <Field
                                      type="text"
                                      placeholder="Pension Benefits"
                                      id={`pensionBenefits${i}`}
                                      name={`pensionBenefits${i}`}
                                      className={`form-control inputDesignDoubleInput ${ShowError[`pensionBenefits${i}Error`] === true ? "is-invalid" : ""}`}
                                      onChange={(e) => {
                                        setFieldValue(e.target.name,
                                          toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                        CheckInputValue(values, setFieldValue, e.target, i)
                                      }}
                                    />
                                    <Button
                                      className="btn bgColor modalBtn border-0"
                                      id="button-addon2"
                                      onClick={() => {
                                        handleInnerModal(
                                          "Pension Benefits", //title 
                                          `How many Pension Benefits do ${nameSet} have ?`, //Question
                                          "pensionBenefitsarray", //key
                                          "pensionBenefits", //mainKey
                                          "totalPortfolioCost", // key3
                                          values[`pensionBenefitsarray${i}`], //editarray
                                          i, //index
                                          values // all form Values
                                        );
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faArrowUpRightFromSquare}
                                      />
                                    </Button>
                                  </InputGroup>
                                  <div class="invalid-feedback">
                                    {ShowError[`pensionBenefits${i}Message`]}
                                  </div>
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Pension Payment"
                                    id={`pensionPayment${i}`}
                                    name={`pensionPayment${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td>
                                  {/* <InputGroup className="mb-3"> */}
                                  <Field
                                    as="select"
                                    placeholder="Pension Type"
                                    id={`pensionType${i}`}
                                    name={`pensionType${i}`}
                                    className="form-select inputDesignDoubleInput"
                                  >
                                    <option value={""}>Please Select</option>
                                    {options.map((elem, index) => {
                                      return (
                                        <option key={index} value={elem}>
                                          {elem}
                                        </option>
                                      );
                                    })}
                                  </Field>
                                </td>
                                <td>
                                  <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                                    <DynamicYesNo
                                      name={`nominatedBeneficiaries${i}`}
                                      values={values}
                                      handleChange={handleChange}
                                    />
                                    {values[`nominatedBeneficiaries${i}`] ===
                                      "Yes" && (
                                        <Button
                                          className="btn bgColor modalBtn border-0"
                                          id="button-addon2"
                                          onClick={() => {
                                            let nameSet = RenderName(props.modalObject.Input);
                                            handleInnerModal(
                                              "Beneficiaries",
                                              `How many beneficiaries do ${nameSet} have :`,
                                              "beneficiariesArray",
                                              "",
                                              "",
                                              values[`beneficiariesArray${i}`],
                                              i
                                            );
                                          }}
                                        >
                                          <FontAwesomeIcon
                                            icon={faArrowUpRightFromSquare}
                                          />
                                        </Button>
                                      )}
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
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};



const SmsfPensionAccountMiddleWare = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

  let [UserStatus] = useState(localStorage.getItem('UserStatus'));

  let [ShowError, setShowError] = useState({});

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let SMSFPensionPhase = Object.keys(questionDetail.SMSFPensionPhase).length > 0 ? questionDetail.SMSFPensionPhase : {
    client: [],
    partner: [],
    joint: [],

  }; // Use an empty object as default if SMSFPensionPhase is undefined

  let initialValues = { member: [] };


  const fillInitialValues = (setFieldValue) => {
    try {
      console.log(SMSFPensionPhase)

      if (SMSFPensionPhase.member) {
        setFieldValue("member", SMSFPensionPhase.member);

        const clientIndex = SMSFPensionPhase.member.includes("client") ? SMSFPensionPhase.member.indexOf("client") : -1;
        const partnerIndex = SMSFPensionPhase.member.includes("partner") ? SMSFPensionPhase.member.indexOf("partner") : -1;
        const jointIndex = SMSFPensionPhase.member.includes("joint") ? SMSFPensionPhase.member.indexOf("joint") : -1;


        Array.from({ length: SMSFPensionPhase.member.length }).map((_, i) => {
          if (clientIndex === i) {
            SMSFPensionPhase.client.forEach(element => {
              setFieldValue("pensionBenefitsTotal" + i, element.pensionBenefitsTotal);
              setFieldValue("pensionBenefitsTotalArray" + i, element.pensionBenefitsTotalArray);

            });
          }
          else if (partnerIndex === i) {
            SMSFPensionPhase.partner.forEach(element => {
              setFieldValue("pensionBenefitsTotal" + i, element.pensionBenefitsTotal);
              setFieldValue("pensionBenefitsTotalArray" + i, element.pensionBenefitsTotalArray);

            });
          }
          else if (jointIndex === i) {
            SMSFPensionPhase.joint.forEach(element => {
              setFieldValue("pensionBenefitsTotal" + i, element.pensionBenefitsTotal);
              setFieldValue("pensionBenefitsTotalArray" + i, element.pensionBenefitsTotalArray);

            });
          }
        })
      }

    } catch (error) {
      console.error("An error occurred while initializing values in fillInitialValues:", error);
    }
  };




  let handleInnerModal = (
    title,
    key,
    mainKey,
    key3,
    editArray,
    index,
    values,
    Input
  ) => {
    console.log(values);
    setModalObject({
      title,
      key,
      mainKey,
      key3,
      editArray: editArray || [],
      index,
      values,
      Input
    });
    setFlagState(true);
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    console.log(JSON.stringify(values));
    // return (false);
    // Extract the number of maps from the values
    const numberOfMaps = parseInt(values.member.length, 10);
    const newEntries = [];

    // Iterate through each map entry and create a new object
    for (let i = 0; i < numberOfMaps; i++) {
      const newEntry = {
        pensionBenefitsTotal: values[`pensionBenefitsTotal${i}`] || "",
        pensionBenefitsTotalArray: values[`pensionBenefitsTotalArray${i}`] || "",
      };
      newEntries.push(newEntry);
    }

    // Log the new entries to verify
    console.log(values.member, newEntries);


    let obj = {
      clientFK: localStorage.getItem("UserID"),
      member: values.member
    };

    const clientIndex = obj.member.includes("client") ? obj.member.indexOf("client") : -1;
    const partnerIndex = obj.member.includes("partner") ? obj.member.indexOf("partner") : -1;
    const jointIndex = obj.member.includes("joint") ? obj.member.indexOf("joint") : -1;

    if (clientIndex !== -1) {
      obj.client = [newEntries[clientIndex]]; // Assign as an array with the client entry
      // Calculate total currentBalance
      obj.clientTotal = toCommaAndDollar(obj.client.reduce(
        (total, entry) => total + parseFloat(entry.pensionBenefitsTotal.replace(/[^0-9.-]+/g, "")),
        0
      ));
    } else {
      console.log("Client not found in newEntries array.");
    }

    if (partnerIndex !== -1) {
      obj.partner = [newEntries[partnerIndex]]; // Assign as an array with the partner entry
      obj.partnerTotal = toCommaAndDollar(obj.partner.reduce(
        (total, entry) => total + parseFloat(entry.pensionBenefitsTotal.replace(/[^0-9.-]+/g, "")),
        0
      ));

    } else {
      console.log("partner not found in newEntries array.");
    }

    if (jointIndex !== -1) {
      obj.joint = [newEntries[jointIndex]]; // Assign as an array with the joint entry

      obj.jointTotal = toCommaAndDollar(obj.joint.reduce(
        (total, entry) => total + parseFloat(entry.pensionBenefitsTotal.replace(/[^0-9.-]+/g, "")),
        0
      ));
    } else {
      console.log("joint not found in newEntries array.");
    }



    console.log(JSON.stringify(obj), "Final Obj");
    // return false

    const bankAccountArray = SMSFPensionPhase.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/SMSFPensionPhase/Add`, obj);
      } else {
        res = await PatchAxios(
          `${DefaultUrl}/api/SMSFPensionPhase/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, SMSFPensionPhase: res };
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



  let option = (UserStatus !== "Single") ? [
    { value: "client", label: RenderName("client") },
    { value: "partner", label: RenderName("partner") },
    { value: "joint", label: RenderName("joint") }] :
    [{ value: "client", label: RenderName("client") },];


  let CheckInputValue = (values, setFieldValue, currentInput, index) => {
    let pensionBenefitsTotalArray = values[`pensionBenefitsTotalArray${index}`];
    // console.log(values, setFieldValue, currentInput, pensionBenefitsTotalArray);

    let ExpectedSum = pensionBenefitsTotalArray.reduce((total, entry) => total + parseFloat((entry.pensionBenefits).replace(/[^0-9.-]+/g, "")), 0);
    let data = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, ""));

    console.log(ExpectedSum, data, currentInput.name, ShowError)

    if (ExpectedSum !== data) {
      setShowError(prevState => ({
        ...prevState,
        [`${currentInput.name}Error`]: true,
        [`${currentInput.name}Message`]: "Total must be equal to the sum of all Pension Benefits filled in the popup. The sum is " + toCommaAndDollar(ExpectedSum),
      }));
    }
    else {
      setShowError(prevState => ({
        ...prevState,
        [`${currentInput.name}Error`]: false,
        [`${currentInput.name}Message`]: "",
      }));
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange }) => {
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
                {
                  modalObject.key === "pensionBenefitsTotalArray" ?
                    <SmsfPensionAccount />
                    :
                    ""
                }
              </InnerModal>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                    <label htmlFor='' className='text-end '>
                      Member's of SMSF {questionDetail.SMSFDetails.SMSFOwner.fundName}
                    </label>

                    <div style={{ minWidth: "25%" }}>
                      <Field
                        name={`member`}
                        component={CreatableMultiSelectField}
                        label="Multi Select Field"
                        options={option}
                      />
                    </div>
                  </div>
                  {values.member.length > 0 && (
                    <div className="mt-4">
                      <Table striped bordered responsive hover>
                        <thead>
                          <tr>
                            <th
                              onClick={() => {
                                console.log(values);
                              }}
                            >
                              Member
                            </th>
                            <th>Pension Benefits </th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: values.member.length }).map((_, i) => {
                            return (
                              <tr key={i}>
                                <td>{RenderName(values.member[i])}</td>
                                <td>
                                  <InputGroup className={`mb-3 ${ShowError[`pensionBenefitsTotal${i}Error`] === true ? "is-invalid" : ""}`}>
                                    <Field
                                      type="text"
                                      placeholder="Pension Benefits"
                                      id={`pensionBenefitsTotal${i}`}
                                      name={`pensionBenefitsTotal${i}`}
                                      className={`form-control inputDesignDoubleInput ${ShowError[`pensionBenefitsTotal${i}Error`] === true ? "is-invalid" : ""}`}
                                      onChange={(e) => {
                                        setFieldValue(e.target.name,
                                          toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                        CheckInputValue(values, setFieldValue, e.target, i)
                                      }}
                                    />
                                    <Button
                                      className="btn bgColor modalBtn border-0"
                                      id="button-addon2"
                                      onClick={() => {
                                        let DataOf = values.member[i]
                                        handleInnerModal(
                                          "Pension Benefits Details", //title 
                                          "pensionBenefitsTotalArray", //key
                                          "pensionBenefitsTotal", //mainKey
                                          "totalPortfolioCost", // key3
                                          values[`pensionBenefitsTotalArray${i}`], //editarray
                                          i, //index
                                          values, // all form Values
                                          DataOf
                                        );
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faArrowUpRightFromSquare}
                                      />
                                    </Button>
                                  </InputGroup>
                                  <div class="invalid-feedback">
                                    {ShowError[`pensionBenefitsTotal${i}Message`]}
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
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};





export default SmsfPensionAccountMiddleWare;
