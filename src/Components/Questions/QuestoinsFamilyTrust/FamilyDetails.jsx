import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { PatchAxios, PostAxios } from "../../Assets/Api/Api";
import DatePicker from "react-datepicker";;

const FamilyDetails = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let familyDetails = questionDetail.familyDetails || {
    client: [],
    partner: [],
    joint: [],
  }; // Use an empty object as default if familyDetails is undefined

  let initialValues = familyDetails[props.modalObject.Input].length
    ? { NumberOfMap: familyDetails[props.modalObject.Input].length }
    : { NumberOfMap: "" };

  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    if (
      familyDetails[props.modalObject.Input] &&
      familyDetails[props.modalObject.Input].length
    ) {
      let arr = [];

      for (
        let i = 0;
        i < familyDetails[props.modalObject.Input].length;
        i++
      ) {
        arr.push("");
      }

      setDynamicFields(arr);
    }
  }, []);

  const fillInitialValues = (setFieldValue) => {
    if (
      familyDetails[props.modalObject.Input] &&
      familyDetails[props.modalObject.Input].length
    ) {
      familyDetails[props.modalObject.Input].forEach((data, i) => {
        if (data) {
          setFieldValue(`trustName${i}`, data.trustName || "");
          setFieldValue(`trustType${i}`, data.trustType || "");
          setFieldValue(`ABN${i}`, data.ABN || "");
          setFieldValue(`Address${i}`, data.Address || "");
          setFieldValue(`establishmentDate${i}`, data.establishmentDate || "");
          setFieldValue(`trusteeType${i}`, data.trusteeType || "");
          setFieldValue(`trusteeName${i}`, data.trusteeName || "");
          setFieldValue(`noOfAccountant${i}`, data.noOfAccountant || "");
          setFieldValue(`accountantsFee${i}`, data.accountantsFee || "");
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
        trustName: values[`trustName${i}`] || "",
        trustType: values[`trustType${i}`] || "",
        ABN: values[`ABN${i}`] || "",
        Address: values[`Address${i}`] || "",
        establishmentDate: values[`establishmentDate${i}`] || "",
        trusteeType: values[`trusteeType${i}`] || "",
        trusteeName: values[`trusteeName${i}`] || "",
        noOfAccountant: values[`noOfAccountant${i}`] || "",
        accountantsFee: values[`accountantsFee${i}`] || "",
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
      (total, entry) => total + entry.accountantsFee,
      0
    );

    console.log(obj, "final obj");

    // Check if familyDetails and the array at props.modalObject.Input exist
    // const bankAccountArray = familyDetails[props.modalObject.Input] || [];
    const bankAccountArray = familyDetails.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/familyDetails/Add`,
          obj
        );
      } else {
        obj.collection = props.modalObject.Input;
        res = await PatchAxios(
          `${DefaultUrl}/api/familyDetails/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, familyDetails: res };
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

  const options = ["Account Based Pension ", "TTR"];
  const options2 = [
    "Pensioner Card ",
    "Low Income Card ",
    "Commonwealth Seniors Card",
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
      {({ values, setFieldValue, handleChange, handleBlur }) => {
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
                      How many {props.modalObject.title} does{" "}
                      {props.modalObject.Input} have:
                    </p>
                  </div>
                  <div className="col-md-2">
                    <Field
                      type="number"
                      id="NumberOfMap"
                      name="NumberOfMap"
                      className="form-control inputDesign"
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
                            <th>Trust Name</th>
                            <th>Trust Type</th>
                            <th>ABN	Fund</th>
                            <th>Address</th>
                            <th>Establishment Date</th>
                            <th>Trustee Type</th>
                            <th>Trustee Name</th>
                            <th>Name of Accountant</th>
                            <th>Accountant Fees </th>

                          </tr>
                        </thead>
                        <tbody>
                          {dynamicFields.map((elem, i) => {
                            return (
                              <tr key={i}>
                                <td>{1 + i}</td>
                                <td>
                                  {/* <InputGroup className="mb-3">  */}
                                  <Field
                                    type="text"
                                    placeholder="Trust Name"
                                    id={`trustName${i}`}
                                    name={`trustName${i}`}
                                    className="form-control inputDesign"
                                  />


                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Trust Type"
                                    id={`trustType${i}`}
                                    name={`trustType${i}`}
                                    className="form-control inputDesign"
                                  />

                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="ABN"
                                    id={`ABN${i}`}
                                    name={`ABN${i}`}
                                    className="form-control inputDesign"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Address"
                                    id={`Address${i}`}
                                    name={`Address${i}`}
                                    className="form-control inputDesign"
                                  />
                                </td>
                                <td>
                                  <DatePicker
                                    className="form-control inputDesign shadow"
                                    showIcon
                                    id={`establishmentDate${i}`}
                                    name={`establishmentDate${i}`}
                                    selected={values[`establishmentDate${i}`]}
                                    onChange={(date) =>
                                      setFieldValue(
                                        `establishmentDate${i}`,
                                        date
                                      )
                                    }
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="dd/mm/yyyy"
                                    maxDate={new Date()}
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    onBlur={handleBlur}
                                    wrapperClassName="w-100"
                                  />
                                </td>
                                <td>
                                  <Field
                                    as="select"
                                    placeholder="Trustee Type"
                                    id={`trusteeType${i}`}
                                    name={`trusteeType${i}`}
                                    className="form-select inputDesign"
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
                                  <Field
                                    type="text"
                                    placeholder="Trustee Name  "
                                    id={`trusteeName${i}`}
                                    name={`trusteeName${i}`}
                                    className="form-control inputDesign"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Number of Accountants Name  "
                                    id={`noOfAccountant${i}`}
                                    name={`noOfAccountant${i}`}
                                    className="form-control inputDesign"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Accountants Fees"
                                    id={`accountantsFee${i}`}
                                    name={`accountantsFee${i}`}
                                    className="form-control inputDesign"
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

export default FamilyDetails;
