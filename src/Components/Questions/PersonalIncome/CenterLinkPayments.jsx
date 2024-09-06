import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, InputGroup, Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { PatchAxios, PostAxios, RenderName } from "../../Assets/Api/Api";
import { CreatableMultiSelectField } from "../FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableRow from "../../Assets/Dynamic/DynamicTableRow";

const CenterLinkPayments = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);



  let incomeFromCentrelink = Object.keys(questionDetail.incomeFromCentrelink).length > 0 ? questionDetail.incomeFromCentrelink : {
    client: [],
    partner: [],
    joint: [],

  }; // Use an empty object as default if incomeFromCentrelink is undefined

  let initialValues = {
    owner: "client"
  };

  const [dynamicFields, setDynamicFields] = useState([""]);

  const fillInitialValues = (setFieldValue) => {
    if (
      incomeFromCentrelink[props.modalObject.Input] &&
      incomeFromCentrelink[props.modalObject.Input].length
    ) {
      incomeFromCentrelink[props.modalObject.Input].forEach((data, i) => {
        if (data) {
          setFieldValue(`paymentType${i}`, data.paymentType || "");
          setFieldValue(`cRN${i}`, data.cRN || "");
          setFieldValue(
            `fortnightlyPayment${i}`,
            data.fortnightlyPayment || ""
          );
          setFieldValue(
            `annualPaymentAmount${i}`,
            data.annualPaymentAmount || ""
          );
          setFieldValue(`centrelinkcards${i}`, data.centrelinkcards || "");
        }
      });
    }
  };


  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    console.log(JSON.stringify(values));
    return (false);


    // Extract the number of maps from the values
    const numberOfMaps = parseInt(values.NumberOfMap, 10);
    const newEntries = [];

    // Iterate through each map entry and create a new object
    for (let i = 0; i < numberOfMaps; i++) {
      const newEntry = {
        cRN: values[`cRN${i}`] || "",
        paymentType: values[`paymentType${i}`] || "",
        fortnightlyPayment: values[`fortnightlyPayment${i}`] || "",
        annualPaymentAmount: values[`annualPaymentAmount${i}`] || "",
        centrelinkcards: values[`centrelinkcards${i}`] || "",
        // centrelinkcards: values[`centrelinkcards${i}`] || "",
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

    obj[DataOf] = newEntries;

    // Calculate total currentBalance
    obj[DataOf + "Total"] = newEntries.reduce(
      (total, entry) => total + entry.annualPaymentAmount,
      0
    );

    console.log(obj, "final obj");

    // Check if incomeFromCentrelink and the array at props.modalObject.Input exist
    // const bankAccountArray = incomeFromCentrelink[props.modalObject.Input] || [];
    const bankAccountArray = incomeFromCentrelink.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/incomeFromCentrelink/Add`,
          obj
        );
      } else {
        obj.collection = props.modalObject.Input;
        res = await PatchAxios(
          `${DefaultUrl}/api/incomeFromCentrelink/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, incomeFromCentrelink: res };
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

  const options = [
    { value: "Age Pension", label: "Age Pension" },
    { value: "Disability Pension", label: "Disability Pension" },
    { value: "Carer Payment", label: "Carer Payment" },
    { value: "Carer Allowance", label: "Carer Allowance" },
    { value: "Jobseeker", label: "Jobseeker" },
    { value: "Family Tax Benefit A", label: "Family Tax Benefit A" },
    { value: "Family Tax Benefit B", label: "Family Tax Benefit B" },
    { value: "Rent Assistance", label: "Rent Assistance" },
  ];

  const options2 = [
    { value: "Pensioner Card", label: "Pensioner Card " },
    { value: "Low Income Card", label: "Low Income Card " },
    { value: "Commonwealth Seniors Card", label: "Commonwealth Seniors Card" },
  ];

  const rowConfig = [
    { name: 'cRN', type: 'number', placeholder: 'CRN' },
    { name: 'paymentType', type: 'select-creatableMulti', placeholder: 'Multi Select Field', options: options, styleSet: { width: "150px" }, },
    { name: 'fortnightlyPayment', type: 'number-toComma', placeholder: 'Fortnightly Payment', styleSet: { width: "150px" }, },
    { name: 'annualPaymentAmount', type: 'number-toComma', placeholder: 'Annual Payment Amount', styleSet: { width: "150px" }, },
    { name: 'centrelinkcards', type: 'select-creatableMulti', placeholder: 'Multi Select Field', options: options2 },
  ];


  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [values.NumberOfMap]);

        return (
          <Form>
            <Row>

              <div className='col-md-12'>
                <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                  <label htmlFor='' className='text-end '>
                    Owner
                  </label>

                  <div className='w-25'>
                    <Field
                      as="select"
                      placeholder="Name of owner"
                      id={`owner`}
                      name={`owner`}
                      className="form-select inputDesignDoubleInput"


                    >
                      <option value={""}>Select</option>
                      <option value={"client"}>{RenderName("client")}</option>
                      {localStorage.getItem("UserStatus") !== "Single" &&
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
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="mt-4">
                    <Table striped bordered responsive hover>
                      <thead>
                        <tr>
                          <th
                            onClick={() => {
                              console.log(values);
                            }}
                          >
                            Owner
                          </th>
                          <th>CRN</th>
                          <th>Payment Type</th>
                          <th>Fortnightly Payment</th>
                          <th>Annual Payment Amount</th>
                          <th>Centrelink Cards Held</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(values.owner === "client" || values.owner === "client+partner") &&
                          <DynamicTableRow
                            rowConfig={rowConfig}
                            values={values}
                            setFieldValue={setFieldValue}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            stakeHolder={"client."}
                          />
                        }
                        {(values.owner === "partner" || values.owner === "client+partner") &&
                          <DynamicTableRow
                            rowConfig={rowConfig}
                            values={values}
                            setFieldValue={setFieldValue}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            stakeHolder={"partner."}
                          />
                        }



                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CenterLinkPayments;
