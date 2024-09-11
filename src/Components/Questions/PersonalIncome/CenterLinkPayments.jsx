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

  let [UserStatus] = useState(localStorage.getItem('UserStatus'));



  let incomeFromCentrelink = Object.keys(questionDetail.incomeFromCentrelink).length > 0 ? questionDetail.incomeFromCentrelink : {
    client: [],
    partner: [],
    joint: [],

  }; // Use an empty object as default if incomeFromCentrelink is undefined

  let initialValues = {
    owner: ""
  };

  const fillInitialValues = (setFieldValue) => {
    if (
      incomeFromCentrelink &&
      incomeFromCentrelink._id
    ) {


      let data = incomeFromCentrelink

      if (data) {

        setFieldValue("owner", data.owner);
        if (incomeFromCentrelink.owner === "client" || incomeFromCentrelink.owner === "client+partner") {

          setFieldValue(`client.paymentType`, data.client.paymentType || "");
          setFieldValue(`client.paymentType`, data.client.paymentType || "");
          setFieldValue(`client.CRN`, data.client.CRN || "");
          setFieldValue(`client.fortnightlyPayment`, data.client.fortnightlyPayment || "");
          setFieldValue(`client.annualPaymentAmount`, data.client.annualPaymentAmount || "");
          setFieldValue(`client.centrelinkCardsHeld`, data.client.centrelinkCardsHeld || "");
        }
        if ((incomeFromCentrelink.owner === "partner" || incomeFromCentrelink.owner === "client+partner") && (UserStatus === "Married")) {

          setFieldValue(`partner.paymentType`, data.partner.paymentType || "");
          setFieldValue(`partner.paymentType`, data.partner.paymentType || "");
          setFieldValue(`partner.CRN`, data.partner.CRN || "");
          setFieldValue(`partner.fortnightlyPayment`, data.partner.fortnightlyPayment || "");
          setFieldValue(`partner.annualPaymentAmount`, data.partner.annualPaymentAmount || "");
          setFieldValue(`partner.centrelinkCardsHeld`, data.partner.centrelinkCardsHeld || "");
        }
      }
    }
  };


  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    console.log(JSON.stringify(values));
    // return (false);

    let obj = values;

    obj.clientFK = localStorage.getItem("UserID");

    if (obj.owner === "client" || obj.owner === "client+partner") {
      obj.clientTotal = obj.client.annualPaymentAmount;
    }

    if (obj.owner === "partner" || obj.owner === "client+partner") {
      obj.partnerTotal = obj.partner.annualPaymentAmount;
    }

    if (UserStatus !== "Married") {
      obj.partnerTotal = "";
      obj.partner = {};
    }

    const GotData = incomeFromCentrelink.clientFK || "";

    try {
      let res;
      if (!GotData) {
        res = await PostAxios(
          `${DefaultUrl}/api/incomeFromCentrelink/Add`,
          obj
        );
      } else {
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
    { name: 'CRN', type: 'text', placeholder: 'CRN' },
    { name: 'paymentType', type: 'select-creatableMulti', placeholder: 'Multi Select Field', options: options, styleSet: { width: "150px" }, },
    { name: 'fortnightlyPayment', type: 'number-toComma', placeholder: 'Fortnightly Payment', styleSet: { width: "150px" }, },
    { name: 'annualPaymentAmount', type: 'number-toComma', placeholder: 'Annual Payment Amount', styleSet: { width: "150px" }, },
    { name: 'centrelinkCardsHeld', type: 'select-creatableMulti', placeholder: 'Multi Select Field', options: options2 },
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
              {values.owner !== "" &&

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
                          {((values.owner === "partner" || values.owner === "client+partner") && (UserStatus === "Married")) &&
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
              }

            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CenterLinkPayments;
