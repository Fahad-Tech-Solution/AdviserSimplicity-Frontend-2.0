import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, InputGroup, Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { PatchAxios, PostAxios } from "../../Assets/Api/Api";
import CreatableMultiSelectField from "../FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";

const CenterLinkPayments = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

  let [nameSet] = useState(() => {
    if (props.modalObject.Input === "client") {
      return localStorage.getItem("UserName");
    } else if (props.modalObject.Input === "partner") {
      return localStorage.getItem("PartnerName");
    } else if (props.modalObject.Input === "joint") {
      return (
        localStorage.getItem("UserName") +
        " & " +
        localStorage.getItem("PartnerName")
      );
    }
  });

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let incomeFromCentrelink = Object.keys(questionDetail.incomeFromCentrelink).length > 0 ? questionDetail.incomeFromCentrelink : {
    client: [],
    partner: [],
    joint: [],

  }; // Use an empty object as default if incomeFromCentrelink is undefined

  let initialValues = incomeFromCentrelink[props.modalObject.Input].length
    ? { NumberOfMap: incomeFromCentrelink[props.modalObject.Input].length }
    : { NumberOfMap: "" };

  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    if (
      incomeFromCentrelink[props.modalObject.Input] &&
      incomeFromCentrelink[props.modalObject.Input].length
    ) {
      let arr = [];

      for (
        let i = 0;
        i < incomeFromCentrelink[props.modalObject.Input].length;
        i++
      ) {
        arr.push("");
      }

      setDynamicFields(arr);
    }
  }, []);

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

  let handleInput = (e, setFieldValue) => {
    const value = e.target.value > 10 ? 10 : e.target.value;
    setFieldValue(e.target.id, value);

    let arr = [];

    for (let i = 0; i < value; i++) {
      arr.push("");
    }

    setDynamicFields(arr);
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
  const [selectedOptions, setSelectedOptions] = useState([]);

  //   const options2 = [
  //     { value: 'Pensioner Card', label: 'Pensioner Card' },
  //     { value: 'Low Income Card', label: 'Low Income Card' },
  //     { value: 'Commonwealth Seniors Card', label: 'Commonwealth Seniors Card' },
  //     // Add more options as needed
  //   ];
  const handleChange1 = (selected) => {
    setSelectedOptions(selected);
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
        }, [values.NumberOfMap]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="col-md-5">
                    <p className="text-end mt-1">
                      How many {props.modalObject.title} does {nameSet} have:
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
                            <th>CRN</th>
                            <th>Payment Type</th>
                            <th>Fortnightly Payment</th>
                            <th>Annual Payment Amount</th>
                            <th>Centrelink Cards Held</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dynamicFields.map((elem, i) => {
                            return (
                              <tr key={i}>
                                <td>{1 + i}</td>
                                <td>
                                  {" "}
                                  <Field
                                    type="number"
                                    placeholder="CRN"
                                    id={`cRN${i}`}
                                    name={`cRN${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td>
                                  <Field
                                    name={`paymentType${i}`}
                                    component={CreatableMultiSelectField}
                                    label="Multi Select Field"
                                    options={options}
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Fortnightly Payment"
                                    id={`fortnightlyPayment${i}`}
                                    name={`fortnightlyPayment${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(`fortnightlyPayment${i}`, e.target.value);
                                      setFieldValue(`annualPaymentAmount${i}`, e.target.value * 26 || 0)
                                    }}
                                  />

                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Annual Payment Amount"
                                    id={`annualPaymentAmount${i}`}
                                    name={`annualPaymentAmount${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td>
                                  <Field
                                    name={`centrelinkcards${i}`}
                                    component={CreatableMultiSelectField}
                                    label="Multi Select Field"
                                    options={options2}
                                  />
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

export default CenterLinkPayments;
