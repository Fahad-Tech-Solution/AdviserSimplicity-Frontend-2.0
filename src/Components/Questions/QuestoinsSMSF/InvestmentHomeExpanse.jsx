import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../Store/Store';
import { PatchAxios, PostAxios } from '../../Assets/Api/Api';
import axios from 'axios';

const InvestmentHomeExpanse = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

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

  let SMSFInvestmentExpenses = questionDetail.SMSFInvestmentExpenses[props.modalObject.index] || {
    client: [],
    partner: [],
    joint: [],

  }; // Use an empty object as default if SMSFInvestmentExpenses is undefined


  let initialValues = SMSFInvestmentExpenses[props.modalObject.Input].length ? { NumberOfMap: SMSFInvestmentExpenses[props.modalObject.Input].length } : { NumberOfMap: "" };

  const [dynamicFields, setDynamicFields] = useState([]);


  useEffect(() => {

    if (SMSFInvestmentExpenses[props.modalObject.Input] && SMSFInvestmentExpenses[props.modalObject.Input].length) {

      let arr = []

      for (let i = 0; i < SMSFInvestmentExpenses[props.modalObject.Input].length; i++) {
        arr.push("");
      }

      setDynamicFields(arr);

    }
  }, [])

  const fillInitialValues = (setFieldValue) => {

    if (SMSFInvestmentExpenses[props.modalObject.Input] && SMSFInvestmentExpenses[props.modalObject.Input].length) {

      SMSFInvestmentExpenses[props.modalObject.Input].forEach((data, i) => {
        if (data) {
          setFieldValue(`councilRates${i}`, data.councilRates || '');
          setFieldValue(`waterRates${i}`, data.waterRates || '');
          setFieldValue(`landTax${i}`, data.landTax || '');
          setFieldValue(`insuranceCorporate${i}`, data.insuranceCorporate || '');
          setFieldValue(`repairsMaintenance${i}`, data.repairsMaintenance || '');
          setFieldValue(`allOther${i}`, data.allOther || '');
        }
      });
    }
  };

  let handleInput = (e, setFieldValue) => {
    const value = e.target.value > 2 ? 2 : e.target.value;
    setFieldValue(e.target.id, value);

    let arr = []

    for (let i = 0; i < value; i++) {
      arr.push("");
    }

    setDynamicFields(arr);

  };

  let DefaultUrl = useRecoilValue(defaultUrl)


  let onSubmit = async (values) => {
    // Extract the number of maps from the values
    const numberOfMaps = parseInt(values.NumberOfMap, 10);
    const newEntries = [];
    let sumOfAll = [];


    // Iterate through each map entry and create a new object
    for (let i = 0; i < numberOfMaps; i++) {
      const newEntry = {
        councilRates: values[`councilRates${i}`] || "",
        waterRates: values[`waterRates${i}`] || "",
        landTax: values[`landTax${i}`] || "",
        insuranceCorporate: values[`insuranceCorporate${i}`] || "",
        repairsMaintenance: values[`repairsMaintenance${i}`] || "",
        allOther: values[`allOther${i}`] || "",
      };
      newEntries.push(newEntry);
      // Calculate the sum of all attributes for the current entry
      const sum =
        parseFloat(newEntry.councilRates) +
        parseFloat(newEntry.waterRates) +
        parseFloat(newEntry.landTax) +
        parseFloat(newEntry.insuranceCorporate) +
        parseFloat(newEntry.repairsMaintenance) +
        parseFloat(newEntry.allOther);

      // Push the sum into the sumOfAll array
      sumOfAll.push(sum);
    }

    // Log the new entries to verify
    console.log(newEntries);

    let DataOf = props.modalObject.Input;

    // Create an object with additional fields
    let obj = {
      clientFK: localStorage.getItem("UserID"),
    };

    obj[DataOf] = newEntries


    // Use reduce to sum all values in sumOfAll and save it in variable a
    obj[DataOf + "Total"] = sumOfAll.reduce((acc, curr) => acc + curr, 0);

    // Calculate total currentBalance
    // obj[DataOf + "Total"] = newEntries.reduce((total, entry) => total + entry.AnnualRepayments, 0);

    console.log(obj, "final obj")

    // Check if SMSFInvestmentExpenses and the array at props.modalObject.Input exist
    // const bankAccountArray = SMSFInvestmentExpenses[props.modalObject.Input] || [];
    const bankAccountArray = SMSFInvestmentExpenses.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/SMSFInvestmentExpenses/Add`, obj);
      } else {
        obj.collection = props.modalObject.Input
        obj._id = SMSFInvestmentExpenses._id;
        res = await PatchAxios(`${DefaultUrl}/api/SMSFInvestmentExpenses/Update`, obj);
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, SMSFInvestmentExpenses: res };
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


  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [values.NumberOfMap]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className='row justify-content-center'>
                  <div className='col-md-5'>
                    <p className='text-end mt-1'>
                      How many {props.modalObject.title} does {nameSet} have:
                    </p>
                  </div>
                  <div className='col-md-2'>
                    <Field
                      type="number"
                      id="NumberOfMap"
                      name="NumberOfMap"
                      className="form-control inputDesign"
                      onChange={(e) => handleInput(e, setFieldValue)}
                    />
                  </div>
                  {values.NumberOfMap && (
                    <div className='mt-4'>
                      <Table striped bordered responsive hover>
                        <thead>
                          <tr>
                            <th>No#</th>
                            <th>Council Rates</th>
                            <th>Water Rates</th>
                            <th>Land tax</th>
                            <th>Insurance/Body Corporate</th>
                            <th>Repairs and Maintenance</th>
                            <th>All Other</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dynamicFields.map((elem, i) => {
                            return (
                              <tr key={i}>
                                <td>{1 + i}</td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Council Rates"
                                    id={`councilRates${i}`}
                                    name={`councilRates${i}`}
                                    className="form-control inputDesign"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Water Rates"
                                    id={`waterRates${i}`}
                                    name={`waterRates${i}`}
                                    className="form-control inputDesign"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Land tax"
                                    id={`landTax${i}`}
                                    name={`landTax${i}`}
                                    className="form-control inputDesign"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Insurance/Body Corporate"
                                    id={`insuranceCorporate${i}`}
                                    name={`insuranceCorporate${i}`}
                                    className="form-control inputDesign"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Repairs and Maintenance"
                                    id={`repairsMaintenance${i}`}
                                    name={`repairsMaintenance${i}`}
                                    className="form-control inputDesign"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="All Other"
                                    id={`allOther${i}`}
                                    name={`allOther${i}`}
                                    className="form-control inputDesign"
                                  />
                                </td>
                              </tr>)
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

export default InvestmentHomeExpanse;
