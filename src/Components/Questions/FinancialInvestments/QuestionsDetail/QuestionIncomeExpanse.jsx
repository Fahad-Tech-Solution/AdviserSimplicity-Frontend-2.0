import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../../Store/Store';
import { PatchAxios, PostAxios, toCommaAndDollar } from '../../../Assets/Api/Api';
import axios from 'axios';

const QuestionIncomeExpanse = (props) => {
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

  let initialValues = { NumberOfMap: "1" };

  const [dynamicFields, setDynamicFields] = useState([]);


  const fillInitialValues = (setFieldValue) => {
    if (props.modalObject.editArray.length) {

      props.modalObject.editArray.map((data, index) => {
        setFieldValue(`councilRates${index}`, data.councilRates)
        setFieldValue(`waterRates${index}`, data.waterRates)
        setFieldValue(`landTax${index}`, data.landTax)
        setFieldValue(`insuranceCorporate${index}`, data.insuranceCorporate)
        setFieldValue(`repairsMaintenance${index}`, data.repairsMaintenance)
        setFieldValue(`allOther${index}`, data.allOther)
        setFieldValue(`totalExpance${index}`, data.totalExpance)
      })
    }
  };


  let DefaultUrl = useRecoilValue(defaultUrl)


  let onSubmit = async (values) => {
    // Extract the number of maps from the values
    const numberOfMaps = parseInt(values.NumberOfMap, 10);
    const newEntries = [];


    // Iterate through each map entry and create a new object
    for (let i = 0; i < numberOfMaps; i++) {
      const newEntry = {
        councilRates: values[`councilRates${i}`] || "",
        waterRates: values[`waterRates${i}`] || "",
        landTax: values[`landTax${i}`] || "",
        insuranceCorporate: values[`insuranceCorporate${i}`] || "",
        repairsMaintenance: values[`repairsMaintenance${i}`] || "",
        allOther: values[`allOther${i}`] || "",
        totalExpance: values[`totalExpance${i}`] || "",
      };
      newEntries.push(newEntry);
    }

    // Log the new entries to verify
    console.log(newEntries);

    let total = newEntries.reduce((total, entry) => total + (parseFloat(entry.totalExpance.replace(/[^0-9.-]+/g, "")) || 0), 0);


    props.setFieldValue(`${props.modalObject.key}${props.modalObject.index}`, newEntries)
    // props.setFieldValue(`${props.modalObject.key3}${props.modalObject.index}`, total)
    props.setFieldValue(`${props.modalObject.mainKey}${props.modalObject.index}`, toCommaAndDollar(total))



    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };
  let FormulaSetting = (values, setFieldValue, currentInput, index) => {
    const cleanNumber = (input) => {
      // Ensure the input is a string, then apply replace and parseFloat
      return parseFloat(String(input || "").replace(/[^0-9.-]+/g, "")) || 0;
    };

    // Initialize variables using the cleanNumber function
    let councilRates = cleanNumber(values[`councilRates${index}`]);
    let waterRates = cleanNumber(values[`waterRates${index}`]);
    let landTax = cleanNumber(values[`landTax${index}`]);
    let insuranceCorporate = cleanNumber(values[`insuranceCorporate${index}`]);
    let repairsMaintenance = cleanNumber(values[`repairsMaintenance${index}`]);
    let allOther = cleanNumber(values[`allOther${index}`]);

    // Switch to handle the specific current input
    switch (currentInput.name) {
      case `councilRates${index}`:
        councilRates = cleanNumber(currentInput.value);
        break;
      case `waterRates${index}`:
        waterRates = cleanNumber(currentInput.value);
        break;
      case `landTax${index}`:
        landTax = cleanNumber(currentInput.value);
        break;
      case `insuranceCorporate${index}`:
        insuranceCorporate = cleanNumber(currentInput.value);
        break;
      case `repairsMaintenance${index}`:
        repairsMaintenance = cleanNumber(currentInput.value);
        break;
      case `allOther${index}`:
        allOther = cleanNumber(currentInput.value);
        break;
      default:
        console.log("No matching input field");
        break;
    }

    // Calculate the total expense
    let totalExpance = councilRates + waterRates + landTax + insuranceCorporate + repairsMaintenance + allOther;

    // Set the totalExpance field, ensuring that it's formatted properly
    setFieldValue(`totalExpance${index}`, toCommaAndDollar(totalExpance || 0));
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
        }, []);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className='row justify-content-center'>
                  <div className='d-flex flex-row justify-content-center align-items-center gap-2 d-none'>
                    <label htmlFor='' className=''>
                      How many {props.modalObject.title} does {nameSet} have :
                    </label>

                    <div style={{ width: "10%" }} >
                      <Field
                        type="text"
                        id="NumberOfMap"
                        name="NumberOfMap"
                        className="form-control inputDesignDoubleInput"
                        onChange={(e) => handleInput(e, setFieldValue)}
                      />
                    </div>
                  </div>

                  {values.NumberOfMap && (
                    <div className='mt-4'>
                      <Table striped bordered responsive hover>
                        <thead>
                          <tr>
                            <th>No#</th>
                            <th>Council Rates</th>
                            <th>Water Rates</th>
                            <th>Land tax </th>
                            <th>Insurance/Body Corporate</th>
                            <th>Repairs and Maintenance</th>
                            <th>All Other</th>
                            <th>Total Expenses</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: values.NumberOfMap }).map((_, i) => {
                            return (
                              <tr key={i}>
                                <td>{1 + i}</td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Council Rates"
                                    id={`councilRates${i}`}
                                    name={`councilRates${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(e.target.name,
                                        toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                      FormulaSetting(values, setFieldValue, e.target, i)
                                    }}
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Water Rates"
                                    id={`waterRates${i}`}
                                    name={`waterRates${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(e.target.name,
                                        toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                      FormulaSetting(values, setFieldValue, e.target, i)

                                    }}
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Land tax"
                                    id={`landTax${i}`}
                                    name={`landTax${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(e.target.name,
                                        toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                      FormulaSetting(values, setFieldValue, e.target, i)

                                    }}
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Insurance/Body Corporate"
                                    id={`insuranceCorporate${i}`}
                                    name={`insuranceCorporate${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(e.target.name,
                                        toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                      FormulaSetting(values, setFieldValue, e.target, i)

                                    }}
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Repairs and Maintenance"
                                    id={`repairsMaintenance${i}`}
                                    name={`repairsMaintenance${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(e.target.name,
                                        toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                      FormulaSetting(values, setFieldValue, e.target, i)

                                    }}
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    // disabled
                                    placeholder="All Other"
                                    id={`allOther${i}`}
                                    name={`allOther${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(e.target.name,
                                        toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                      FormulaSetting(values, setFieldValue, e.target, i)
                                    }}
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    disabled
                                    placeholder="Total Expance"
                                    id={`totalExpance${i}`}
                                    name={`totalExpance${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(e.target.name,
                                        toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                    }}
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

export default QuestionIncomeExpanse;
