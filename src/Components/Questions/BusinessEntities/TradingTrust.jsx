import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { PatchAxios, PostAxios } from "../../Assets/Api/Api";
// import Select from "react-select";


const TradingTrust = (props) => {
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

  let BusinessAsTrusts = Object.keys(questionDetail.BusinessAsTrusts).length > 0 ? questionDetail.BusinessAsTrusts : {
    client: [],
    partner: [],
    joint: [],

  };// Use an empty object as default if BusinessAsTrusts is undefined

  let initialValues = BusinessAsTrusts[props.modalObject.Input].length
    ? { NumberOfMap: BusinessAsTrusts[props.modalObject.Input].length }
    : { NumberOfMap: "" };

  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    if (
      BusinessAsTrusts[props.modalObject.Input] &&
      BusinessAsTrusts[props.modalObject.Input].length
    ) {
      let arr = [];

      for (
        let i = 0;
        i < BusinessAsTrusts[props.modalObject.Input].length;
        i++
      ) {
        arr.push("");
      }

      setDynamicFields(arr);
    }
  }, []);

  const fillInitialValues = (setFieldValue) => {
    if (
      BusinessAsTrusts[props.modalObject.Input] &&
      BusinessAsTrusts[props.modalObject.Input].length
    ) {
      BusinessAsTrusts[props.modalObject.Input].forEach((data, i) => {
        if (data) {
          setFieldValue(`aBN${i}`, data.aBN || "");
          setFieldValue(`businessName${i}`, data.businessName || "");
          setFieldValue(`businessAddress${i}`, data.businessAddress || "");
          setFieldValue(`trusteeType${i}`, data.trusteeType || "");
          setFieldValue(`trusteeName${i}`, data.trusteeName || "");
          setFieldValue(`businessOwnership${i}`, data.businessOwnership || "");
          setFieldValue(`distributionReceived${i}`, data.distributionReceived || "");
          setFieldValue(`businessValuation${i}`, data.businessValuation || "");
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
        businessName: values[`businessName${i}`] || "",
        aBN: values[`aBN${i}`] || "",
        businessAddress: values[`businessAddress${i}`] || "",
        trusteeType: values[`trusteeType${i}`] || "",
        trusteeName: values[`trusteeName${i}`] || "",
        businessOwnership: values[`businessOwnership${i}`] || "",
        distributionReceived: values[`distributionReceived${i}`] || "",
        businessValuation: values[`businessValuation${i}`] || "",
        // businessValuation: values[`businessValuation${i}`] || "",

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
      (total, entry) => total + entry.distributionReceived,
      0
    );

    console.log(obj, "final obj");

    const bankAccountArray = BusinessAsTrusts.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/BusinessAsTrusts/Add`,
          obj
        );
      } else {
        obj.collection = props.modalObject.Input;
        res = await PatchAxios(
          `${DefaultUrl}/api/BusinessAsTrusts/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, BusinessAsTrusts: res };
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


  let handleBlur = (setFieldValue, e) => {
    let value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setFieldValue(e.target.id, value.toFixed(2));
    } else {
      setFieldValue(e.target.id, "");
    }
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
                            <th>Business Name</th>
                            <th>ABN</th>
                            <th>Business Address</th>
                            <th>Trustee Type</th>
                            <th>Trustee Name</th>
                            <th>Business Ownership</th>
                            <th>Distribution Received</th>
                            <th>Business Valuation</th>
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
                                    type="text"
                                    placeholder="Business Name"
                                    id={`businessName${i}`}
                                    name={`businessName${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="ABN"
                                    id={`aBN${i}`}
                                    name={`aBN${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td>

                                  <Field
                                    type="text"
                                    placeholder="Business Address"
                                    id={`businessAddress${i}`}
                                    name={`businessAddress${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td>

                                  <Field
                                    as="select"
                                    placeholder="Trustee Type"
                                    id={`trusteeType${i}`}
                                    name={`trusteeType${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  >
                                    <option value="">Please Select</option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Individual">Individual</option>
                                  </Field>
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Trustee Name "
                                    id={`trusteeName${i}`}
                                    name={`trusteeName${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Business Ownership  "
                                    id={`businessOwnership${i}`}
                                    name={`businessOwnership${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onBlur={(e) => handleBlur(setFieldValue, e)}
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Distribution Received"
                                    id={`distributionReceived${i}`}
                                    name={`distributionReceived${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Business Valuation"
                                    id={`businessValuation${i}`}
                                    name={`businessValuation${i}`}
                                    className="form-control inputDesignDoubleInput"
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

export default TradingTrust;
