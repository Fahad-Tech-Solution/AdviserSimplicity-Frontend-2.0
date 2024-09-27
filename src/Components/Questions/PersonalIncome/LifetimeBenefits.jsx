import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, InputGroup, Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
  toCommaAndDollar,
  toNumericValue,
} from "../../Assets/Api/Api";

import DynamicTableRow from "../../Assets/Dynamic/DynamicTableRow";

const LifeTimeBeneFits = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);


  let [UserStatus] = useState(localStorage.getItem('UserStatus'));

  let incomeFromSuperPayment =
    Object.keys(questionDetail.incomeFromSuperPayment).length > 0
      ? questionDetail.incomeFromSuperPayment
      : {
        client: [],
        partner: [],
        joint: [],
      }; // Use an empty object as default if incomeFromSuperPayment is undefined

  let initialValues = {};


  const fillInitialValues = (setFieldValue) => {
    console.log(incomeFromSuperPayment, "data");
    let data = incomeFromSuperPayment;
    if (incomeFromSuperPayment && incomeFromSuperPayment._id) {
      if (data) {

        setFieldValue(`owner`, data.owner || "");

        if (data.owner === "client" || data.owner === "client+partner") {
          if (data?.client && Object.keys(data?.client).length) {

            setFieldValue(`client.fundName`, data.client.fundName || "");
            setFieldValue(`client.regularIncomePerFortnight`, data.client.regularIncomePerFortnight || "");
            setFieldValue(`client.isPension`, data.client.isPension || "");
            setFieldValue(`client.regularIncomePA`, data.client.regularIncomePA || "");
            setFieldValue(`client.centrelinkDeductibleAmount`, data.client.centrelinkDeductibleAmount || "");

          }
        }

        if (UserStatus === "Married") {

          if (data.owner === "partner" || data.owner === "client+partner") {
            if (data?.partner && Object.keys(data?.partner).length) {

              setFieldValue(`partner.regularIncomePA`, data.partner.regularIncomePA || "");
              setFieldValue(`partner.regularIncomePerFortnight`, data.partner.regularIncomePerFortnight || "");
              setFieldValue(`partner.centrelinkDeductibleAmount`, data.partner.centrelinkDeductibleAmount || "");
              setFieldValue(`partner.fundName`, data.partner.fundName || "");
              setFieldValue(`partner.isPension`, data.partner.isPension || "");

            }
          }
        }

      }
    }
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    // console.log(JSON.stringify(values));
    // return (false);

    console.log(values);

    let obj = values;
    obj.clientFK = localStorage.getItem("UserID");

    console.log(obj, "Objext");

    if (values.owner === "client" || values.owner === "client+partner") {
      obj.clientTotal = values.client.regularIncomePA;
      console.log("Client total set");
    } else {
      obj.client = {};
      obj.clientTotal = "";
      console.log("Client data cleared");
    }

    // Handle partner-related conditions
    if ((values.owner === "partner" || values.owner === "client+partner") && (UserStatus === "Married")) {
      obj.partnerTotal = values.partner.regularIncomePA;
      console.log("Partner total set");
    } else {
      obj.partner = {};
      obj.partnerTotal = "";
      console.log("Partner data cleared");
    }

    console.log(obj, "final obj");

    const bankAccountArray = incomeFromSuperPayment.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/incomeFromSuperPayment/Add`,
          obj
        );
      } else {
        // obj.collection = props.modalObject.Input;
        res = await PatchAxios(
          `${DefaultUrl}/api/incomeFromSuperPayment/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, incomeFromSuperPayment: res };
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

  const options = [
    { value: "ESS Super", label: "ESS Super" },
    { value: "PSS", label: "PSS" },
    { value: "CSC", label: "CSC" },
    { value: "Uni Super", label: "Uni Super" },
    { value: "Telstra", label: "Telstra" },
    { value: "Other", label: "Other" },
  ];
  const Formula = (values, setFieldValue, currentInput, stakeHolder) => {
    // alert(values);
    // console.log(values);
    try {
      let stakeHolderKey = stakeHolder.replace(".", "");
      let IncomePF =
        toNumericValue(values[stakeHolderKey]?.regularIncomePerFortnight) || 0;
      switch (currentInput.name) {
        case `${stakeHolder}regularIncomePerFortnight`:
          IncomePF = toNumericValue(currentInput.value) || 0;
          break;
        default:
          console.warn("Unexpected input field");
          break;
      }

      let amount = IncomePF * 26;
      setFieldValue(`${stakeHolder}regularIncomePA`, toCommaAndDollar(amount));
    } catch (error) {
      console.error("Error in Formula function: ", error);
    }
  };
  const rowConfig = [
    {
      name: "fundName",
      type: "select-creatable",
      options: options,
      styleSet: { width: "220px" },
    },
    {
      name: "regularIncomePerFortnight",
      type: "number-toComma",
      placeholder: "Regular Income  per fortnight",
      callBack: true,
      func: Formula,
    },
    {
      name: "regularIncomePA",
      type: "number-toComma",
      placeholder: "Income P.A",
      disabled: true,
    },
    {
      name: "centrelinkDeductibleAmount",
      type: "number-toComma",
      placeholder: "CentreLink Deductible Amount",
    },
    {
      name: "isPension",
      type: "yesno",
      placeholder: "CentreLink Deductible Amount",
    },
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
        }, []);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <div className="d-flex justify-content-center align-items-center gap-4">
                      <label htmlFor="" className="text-end ">
                        Owner
                      </label>

                      <div className="w-25 ">
                        <Field
                          as="select"
                          placeholder="Name of owner"
                          id={`owner`}
                          name={`owner`}
                          className="form-select inputDesignDoubleInput"
                        >
                          <option value={""}>Select</option>
                          <option value={"client"}>
                            {"Only " + RenderName("client")}
                          </option>
                          {localStorage.getItem("UserStatus") !== "Single" && (
                            <React.Fragment>
                              <option value={"partner"}>
                                {"Only " + RenderName("partner")}
                              </option>
                              <option value={"client+partner"}>
                                {"Both (" +
                                  RenderName("client") +
                                  " , " +
                                  RenderName("partner") +
                                  ")"}
                              </option>
                              {/* <option value={"joint"}>
                                {"Joint (" + RenderName("joint") + ")"}
                              </option> */}
                            </React.Fragment>
                          )}
                        </Field>
                      </div>
                    </div>
                  </div>
                  {values.owner && (
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
                            <th>Fund Name</th>
                            <th>Regular Income per Fortnight</th>
                            <th>Regular Income p.a </th>
                            <th>Centrelink Deductible Amount</th>
                            <th>Is Pension Tax Fee</th>
                          </tr>
                        </thead>
                        <tbody>
                          {values.owner == "client" ? (
                            <>
                              <DynamicTableRow
                                rowConfig={rowConfig}
                                values={values}
                                setFieldValue={setFieldValue}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                // handleInnerModal={handleInnerModal}
                                stakeHolder="client."
                              />
                            </>
                          ) : (
                            ""
                          )}
                          {values.owner == "partner" ? (
                            <>
                              <DynamicTableRow
                                rowConfig={rowConfig}
                                values={values}
                                setFieldValue={setFieldValue}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                // handleInnerModal={handleInnerModal}
                                stakeHolder="partner."
                              />
                            </>
                          ) : (
                            ""
                          )}
                          {values.owner == "client+partner" ? (
                            <>
                              <DynamicTableRow
                                rowConfig={rowConfig}
                                values={values}
                                setFieldValue={setFieldValue}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                // handleInnerModal={handleInnerModal}
                                stakeHolder="client."
                              />
                              {UserStatus === "Married" &&
                                <DynamicTableRow
                                  rowConfig={rowConfig}
                                  values={values}
                                  setFieldValue={setFieldValue}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  // handleInnerModal={handleInnerModal}
                                  stakeHolder="partner."
                                />
                              }
                            </>
                          ) : (
                            ""
                          )}
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

export default LifeTimeBeneFits;
