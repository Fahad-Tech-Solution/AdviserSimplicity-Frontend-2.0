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

import Beneficiaries from "../FinancialInvestments/QuestionsDetail/Beneficiaries";
import AccumulationBenefits from "./AccumulationBenefits";
import Contributions from "../FinancialInvestments/QuestionsDetail/Contributions";
import { CreatableMultiSelectField } from "../FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";

const SmsfAccumulationDetails = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  let [ShowError, setShowError] = useState({});

  let [UserStatus] = useState(localStorage.getItem('UserStatus'));

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

  let SMSFAccumulationDetails = Object.keys(questionDetail.SMSFAccumulationDetails).length > 0 ? questionDetail.SMSFAccumulationDetails : {
    client: [],
    partner: [],
    joint: [],

  }; // Use an empty object as default if SMSFAccumulationDetails is undefined

  let initialValues = { member: [] };

  const fillInitialValues = (setFieldValue) => {
    try {
      console.log(SMSFAccumulationDetails, "ma hun")

      if (SMSFAccumulationDetails.member) {

        setFieldValue("member", SMSFAccumulationDetails.member);

        const clientIndex = SMSFAccumulationDetails.member.includes("client") ? SMSFAccumulationDetails.member.indexOf("client") : -1;
        const partnerIndex = SMSFAccumulationDetails.member.includes("partner") ? SMSFAccumulationDetails.member.indexOf("partner") : -1;
        const jointIndex = SMSFAccumulationDetails.member.includes("joint") ? SMSFAccumulationDetails.member.indexOf("joint") : -1;


        Array.from({ length: SMSFAccumulationDetails.member.length }).map((_, i) => {
          if (clientIndex === i) {
            SMSFAccumulationDetails.client.forEach(element => {
              setFieldValue("accumulationBenefits" + i, element.accumulationBenefits);
              setFieldValue("accumulationBenefitsarray" + i, element.accumulationBenefitsarray);
              setFieldValue("contributions" + i, element.contributions);
              setFieldValue("contributionsArray" + i, element.contributionsArray);
              setFieldValue("nominatedBeneficiaries" + i, element.nominatedBeneficiaries);
              setFieldValue("beneficiariesArray" + i, element.beneficiariesArray);
            });
          }
          else if (partnerIndex === i) {
            SMSFAccumulationDetails.partner.forEach(element => {
              setFieldValue("accumulationBenefits" + i, element.accumulationBenefits);
              setFieldValue("accumulationBenefitsarray" + i, element.accumulationBenefitsarray);
              setFieldValue("contributions" + i, element.contributions);
              setFieldValue("contributionsArray" + i, element.contributionsArray);
              setFieldValue("nominatedBeneficiaries" + i, element.nominatedBeneficiaries);
              setFieldValue("beneficiariesArray" + i, element.beneficiariesArray);
            });
          }
          else if (jointIndex === i) {
            SMSFAccumulationDetails.joint.forEach(element => {
              setFieldValue("accumulationBenefits" + i, element.accumulationBenefits);
              setFieldValue("accumulationBenefitsarray" + i, element.accumulationBenefitsarray);
              setFieldValue("contributions" + i, element.contributions);
              setFieldValue("contributionsArray" + i, element.contributionsArray);
              setFieldValue("nominatedBeneficiaries" + i, element.nominatedBeneficiaries);
              setFieldValue("beneficiariesArray" + i, element.beneficiariesArray);
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
    question,
    key,
    mainKey,
    key3,
    editArray,
    index,
    values
  ) => {
    console.log(values);
    setModalObject({
      title,
      question,
      key,
      mainKey,
      key3,
      editArray: editArray || [],
      index,
      values,
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
        accumulationBenefits: values[`accumulationBenefits${i}`] || "",
        accumulationBenefitsarray: values[`accumulationBenefitsarray${i}`] || "",
        contributions: values[`contributions${i}`] || "",
        contributionsArray: values[`contributionsArray${i}`] || "",
        nominatedBeneficiaries: values[`nominatedBeneficiaries${i}`] || "",
        beneficiariesArray: values[`beneficiariesArray${i}`] || "",
      };
      newEntries.push(newEntry);
    }

    // Log the new entries to verify
    // console.log(newEntries);

    let DataOf = props.modalObject.Input;

    // Create an object with additional fields
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
        (total, entry) => total + parseFloat(entry.accumulationBenefits.replace(/[^0-9.-]+/g, "")),
        0
      ));

    } else {
      console.log("Client not found in newEntries array.");
    }

    if (partnerIndex !== -1) {
      obj.partner = [newEntries[partnerIndex]]; // Assign as an array with the partner entry


      obj.partnerTotal = toCommaAndDollar(obj.partner.reduce(
        (total, entry) => total + parseFloat(entry.accumulationBenefits.replace(/[^0-9.-]+/g, "")),
        0
      ));
    } else {
      console.log("partner not found in newEntries array.");
    }

    if (jointIndex !== -1) {
      obj.joint = [newEntries[jointIndex]]; // Assign as an array with the joint entry

      obj.jointTotal = toCommaAndDollar(obj.joint.reduce(
        (total, entry) => total + parseFloat(entry.accumulationBenefits.replace(/[^0-9.-]+/g, "")),
        0
      ));

    } else {
      console.log("joint not found in newEntries array.");
    }



    console.log(JSON.stringify(obj), "Final Obj");
    // return false

    // const bankAccountArray = SMSFAccumulationDetails[props.modalObject.Input] || [];
    const bankAccountArray = SMSFAccumulationDetails.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/SMSFAccumulationDetails/Add`, obj);
      } else {
        res = await PatchAxios(
          `${DefaultUrl}/api/SMSFAccumulationDetails/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, SMSFAccumulationDetails: res };
        setQuestionDetail(updatedData);
      }

      openNotificationSuccess("success", "topRight", "Success Notification", "Data of \"" + props.modalObject.title + "\" is Saved"); openNotificationSuccess("success", "topRight", "Success Notification", "Data of \"" + props.modalObject.title + "\" is Saved");
      // Reset the flag state if necessary
      if (props.flagState) {
        props.setFlagState(false);
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess("error", "topRight", "Error Notification", "Data of \"" + props.modalObject.title + "\" is not Saved Please! try again"); openNotificationSuccess("error", "topRight", "Error Notification", "Data of \"" + props.modalObject.title + "\" is not Saved Please! try again");
    }
  };


  let CheckInputValue = (values, setFieldValue, currentInput, index) => {
    // console.log(values, setFieldValue, currentInput);
    let accumulationBenefitsarray = values[`accumulationBenefitsarray${index}`];

    let ExpectedSum = parseFloat(accumulationBenefitsarray.taxFreeComponent.replace(/[^0-9.-]+/g, ""), 0);
    let data = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, ""));

    console.log(ExpectedSum, data, currentInput.name, ShowError)

    if (ExpectedSum !== data) {
      setShowError(prevState => ({
        ...prevState,
        [`${currentInput.name}Error`]: true,
        [`${currentInput.name}Message`]: "Total must be equal to the sum of all Investment value filled in the popup. The sum is " + toCommaAndDollar(ExpectedSum),
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


  let option = (UserStatus !== "Single") ? [
    { value: "client", label: RenderName("client") },
    { value: "partner", label: RenderName("partner") },
    { value: "joint", label: RenderName("joint") }] :
    [{ value: "client", label: RenderName("client") },];



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
                {modalObject.key === "accumulationBenefitsarray" ?
                  <AccumulationBenefits />
                  :
                  modalObject.key === "contributionsArray" ?
                    <Contributions />
                    :
                    modalObject.key === "beneficiariesArray" ?
                      <Beneficiaries />
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
                            <th>Accumulation Benefits</th>
                            <th>Contributions</th>
                            <th>Nominated Beneficiaries</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: values.member.length }).map((_, i) => {
                            return (
                              <tr key={i}>
                                <td>
                                  {RenderName(values.member[i])}
                                </td>
                                <td style={{ width: "11rem" }}>
                                  <InputGroup className={`mb-3 ${ShowError[`accumulationBenefits${i}Error`] === true ? "is-invalid" : ""}`}>
                                    <Field
                                      type="text"
                                      placeholder="Accumulation Benefits"
                                      id={`accumulationBenefits${i}`}
                                      name={`accumulationBenefits${i}`}
                                      className={`form-control inputDesignDoubleInput ${ShowError[`accumulationBenefits${i}Error`] === true ? "is-invalid" : ""}`}
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
                                          "Accumulations Benefits", //title 
                                          `How many Accumulations Benefits do ${nameSet} have :`, //Question
                                          "accumulationBenefitsarray", //key
                                          "accumulationBenefits", //mainKey
                                          "totalPortfolioCost", // key3
                                          values[`accumulationBenefitsarray${i}`], //editarray
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
                                    {ShowError[`accumulationBenefits${i}Message`]}
                                  </div>
                                </td>


                                <td>
                                  <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                                    <DynamicYesNo
                                      name={`contributions${i}`}
                                      values={values}
                                      handleChange={handleChange}
                                    />
                                    {values[`contributions${i}`] ===
                                      "Yes" && (
                                        <Button
                                          className="btn bgColor modalBtn border-0"
                                          id="button-addon2"
                                          onClick={() => {
                                            handleInnerModal(
                                              "Contributions",
                                              `How many financial years to ${nameSet} want to display?`,
                                              "contributionsArray",
                                              "",
                                              "",
                                              values[`contributionsArray${i}`],
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

export default SmsfAccumulationDetails;
