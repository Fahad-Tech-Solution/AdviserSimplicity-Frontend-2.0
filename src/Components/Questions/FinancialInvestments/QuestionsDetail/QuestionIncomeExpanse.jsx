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

  let initialValues = props.modalObject.editArray.length ? { NumberOfMap: props.modalObject.editArray.length } : { NumberOfMap: "" };

  const [dynamicFields, setDynamicFields] = useState([]);


  const fillInitialValues = (setFieldValue) => {
    let arr = []
    if (props.modalObject.editArray.length) {
      for (let i = 0; i < props.modalObject.editArray.length; i++) {
        arr.push("");
      }

      setDynamicFields(arr);

      props.modalObject.editArray.map((data, index) => {
        setFieldValue(`councilRates${index}`, data.councilRates)
        setFieldValue(`waterRates${index}`, data.waterRates)
        setFieldValue(`landTax${index}`, data.landTax)
        setFieldValue(`insuranceCorporate${index}`, data.insuranceCorporate)
        setFieldValue(`repairsMaintenance${index}`, data.repairsMaintenance)
        setFieldValue(`allOther${index}`, data.allOther)
      })



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
    }

    // Log the new entries to verify
    console.log(newEntries);

    let total = newEntries.reduce((total, entry) => total + (parseFloat(entry.allOther.replace(/[^0-9.-]+/g, "")) || 0), 0);


    props.setFieldValue(`${props.modalObject.key}${props.modalObject.index}`, newEntries)
    // props.setFieldValue(`${props.modalObject.key3}${props.modalObject.index}`, total)
    props.setFieldValue(`${props.modalObject.mainKey}${props.modalObject.index}`, toCommaAndDollar(total))



    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };


  let FormulaSetting = (values, setFieldValue, currentInput, index) => {

    let councilRates = parseFloat((values[`councilRates${index}`] || 0).replace(/[^0-9.-]+/g, "")) || 0;
    let waterRates = parseFloat((values[`waterRates${index}`] || 0).replace(/[^0-9.-]+/g, "")) || 0;
    let landTax = parseFloat((values[`landTax${index}`] || 0).replace(/[^0-9.-]+/g, "")) || 0;
    let insuranceCorporate = parseFloat((values[`insuranceCorporate${index}`] || 0).replace(/[^0-9.-]+/g, "")) || 0;
    let repairsMaintenance = parseFloat((values[`repairsMaintenance${index}`] || 0).replace(/[^0-9.-]+/g, "")) || 0;
    let allOther = parseFloat((values[`allOther${index}`] || 0).replace(/[^0-9.-]+/g, "")) || 0;;
    let totalExpance = 0;

    switch (currentInput.name) {
      case `councilRates${index}`:
        councilRates = parseFloat((currentInput.value || 0).replace(/[^0-9.-]+/g, "")) || 0
        break;
      case `waterRates${index}`:
        waterRates = parseFloat((currentInput.value || 0).replace(/[^0-9.-]+/g, "")) || 0
        break;
      case `landTax${index}`:
        landTax = parseFloat((currentInput.value || 0).replace(/[^0-9.-]+/g, "")) || 0
        break;
      case `insuranceCorporate${index}`:
        insuranceCorporate = parseFloat((currentInput.value || 0).replace(/[^0-9.-]+/g, "")) || 0
        break;
      case `repairsMaintenance${index}`:
        repairsMaintenance = parseFloat((currentInput.value || 0).replace(/[^0-9.-]+/g, "")) || 0
        break;
      case `allOther${index}`:
        allOther = parseFloat((currentInput.value || 0).replace(/[^0-9.-]+/g, "")) || 0
        break;
      default:
        console.log("no input")
        break;
    }

    totalExpance = councilRates + waterRates + landTax + insuranceCorporate + repairsMaintenance + allOther;

    setFieldValue(`totalExpance${index}`, toCommaAndDollar(totalExpance || 0));
  }


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
                  <div className='col-md-5'>
                    <p className='text-end mt-1'>
                      How many {props.modalObject.title} does {nameSet} have:
                    </p>
                  </div>
                  <div className='col-md-2'>
                    <Field
                      type="text"
                      id="NumberOfMap"
                      name="NumberOfMap"
                      className="form-control inputDesignDoubleInput"
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
                            <th>Land tax </th>
                            <th>Insurance/Body Corporate</th>
                            <th>Repairs and Maintenance</th>
                            <th>All Other</th>
                            <th>Total Expenses</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dynamicFields.map((elem, i) => {
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
