import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";

// Images
import single from "../../../Components/Svgs/single-2.svg";
import couple from "../../../Components/Svgs/single-2.svg";
import DatePicker from "react-datepicker";
import { differenceInYears } from "date-fns";
import { PersonalDetailsData, QuestionShift } from "../../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import DynamicYesNo from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo";
import { validateName } from "../../../Components/Assets/Api/Api";
import { useLocation, useNavigate } from "react-router-dom";

const PersonalDetails_cashFlow = (Props) => {

  let [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);

  let location = useLocation();

  let PersonalDetailObj = useRecoilValue(PersonalDetailsData);

  const initialValues = {
    client: {
      Names: "",
      DOB: "",
      Age: "",
      MaritalStatus: "",
      Gender: "",
      PrivateHealthCover: "",
      RetirementYear: "",
      PlannedRetirementAge: "",
      PreservationAge: "",
    },
    partner: {
      Names: "",
      DOB: "",
      Age: "",
      MaritalStatus: "",
      Gender: "",
      PrivateHealthCover: "",
      RetirementYear: "",
      PlannedRetirementAge: "",
      PreservationAge: "",
    },
  };

  const validationSchema = Yup.object().shape({
    client: Yup.object({
      MaritalStatus: Yup.string().required("Marital Status is required"),
      PlannedRetirementAge: Yup.number()
        .min(0, "Planned Retirement Age cannot be negative.")
        .required("Planned Retirement Age is required"),
      // Add other client validations as needed
    }),
    // partner: Yup.object({
    //   PlannedRetirementAge: Yup.number()
    //     .min(0, "Planned Retirement Age cannot be negative.")
    //     .required("Planned Retirement Age is required")
    //     .test("is-valid", "Planned Retirement Age is required for partnered clients if not single or widowed", function (value) {
    //       const { client } = this.parent; // Access parent object (the whole object being validated)
    //       const maritalStatus = client.MaritalStatus; // Get the marital status
    //       // Only validate if the marital status is not "Single" or "Widowed"
    //       if (maritalStatus !== "Single" && maritalStatus !== "Widowed") {
    //         return value != null; // Validate if the value exists
    //       }
    //       return true; // If marital status is "Single" or "Widowed", skip validation
    //     }),
    //   // Add other partner validations as needed
    // }),
  });

  let Nev = useNavigate();

  const onSubmit = (values) => {
    console.log(values);
    setQuestionChange("Income-And-Expenses")
    Nev(`/Cash-Flow/Income-And-Expenses`)
  };


  const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
    value: (i + 1).toString(),
    label: ("Year " + (i + 1)).toString(),
  }));

  const maritalStatusOptions = [
    { value: "Married", label: "Married" },
    { value: "Partnered", label: "Partnered" },
    { value: "Single", label: "Single" },
    { value: "DeFacto", label: "De-Facto" },
    { value: "Widowed", label: "Widowed" },
  ]

  const GenderStatusOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ]

  const InputsArray = [
    { name: "Names", label: "Names", type: "text", id: "name" },
    { name: "DOB", label: "Date of Birth", type: "date", id: "dob" },
    { name: "Age", label: "Age", type: "number", id: "age", disabled: true },
    { name: "MaritalStatus", label: "MaritalStatus", type: "select", id: "maritalStatus", options: maritalStatusOptions, },
    { name: "Gender", label: "Sex", type: "select", id: "sender", options: GenderStatusOptions },
    { name: "PrivateHealthCover", label: "Private Health Cover", type: "Radio", id: "privateHealthCover" },
    { name: "RetirementYear", label: "Retirement Year", type: "select", options: loanTermOptions, id: "retirementYear" },
    { name: "PlannedRetirementAge", label: "Planned Retirement Age", type: "number", id: "plannedRetirementAge", disabled: true },
    { name: "PreservationAge", label: "Preservation Age", type: "number", id: "preservationAge", disabled: true },
  ];

  const renderFields = (sectionName, values, setFieldValue, handleBlur, handleChange,) => {

    let LabelClassNames = sectionName === "partner" ? "col-6 col-md-12 d-md-none d-block" : "col-6";
    let InputClassNames = sectionName === "partner" ? "col-6 col-md-12 " : "col-6 ";

    return (InputsArray.map((input) => (
      <React.Fragment key={`${sectionName}.${input.name}`}>
        <div className={LabelClassNames + " mb-3"}>
          <label htmlFor={`${sectionName}.${input.name}`} className="form-label d-block mt-2">
            {input.label}
          </label>
        </div>

        <div className={InputClassNames + " mb-4"}>
          {input.type === "select" ? (
            <Field
              disabled={input.disabled ? true : false}
              as="select" id={`${sectionName}.${input.id}`}
              name={`${sectionName}.${input.name}`}
              onChange={(e) => { handleNameChange(values, setFieldValue, e.target, input, sectionName,) }}
              className="form-select inputDesign">
              <option value="">Select</option>
              {input.options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field>
          ) :
            input.type === "date" ?
              <div className="DateIconParent">
                <DatePicker
                  showIcon
                  className="form-control inputDesign DateInputPadding"
                  selected={values[sectionName]?.[input.name] || null} // Fetch date value from `values`
                  onChange={(date) => {
                    setFieldValue(`${sectionName}.${input.name}`, date); // Set date in form
                    const age = differenceInYears(new Date(), date) || 0; // Calculate age
                    setFieldValue(`${sectionName}.Age`, age); // Assuming you want to store the age separately
                  }}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/mm/yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  onBlur={handleBlur}
                  name={`${sectionName}.${input.name}`}
                  id={`${sectionName}.${input.id}`}
                  maxDate={new Date()}
                  showMonthDropdown
                  dropdownMode="select"
                  wrapperClassName="w-100"
                />
              </div>

              :
              input.type === "Radio" ?
                <div className="PersonalDetailsForm  m-0 p-0 ">
                  <div className="inputDesign">
                    <DynamicYesNo
                      name={`${sectionName}.${input.name}`}
                      values={values}
                      handleChange={handleChange}
                    />
                  </div>
                </div>
                :
                (
                  <Field
                    disabled={input.disabled ? true : false}
                    type={input.type} id={`${sectionName}.${input.id}`}
                    name={`${sectionName}.${input.name}`}
                    onChange={(e) => { handleNameChange(values, setFieldValue, e.target, input, sectionName,) }}
                    placeholder={input.label}
                    className="form-control inputDesign" />
                )}
          <ErrorMessage component="div" className="text-danger" name={`${sectionName}.${input.name}`} />
        </div>
      </React.Fragment>
    )))
  }


  function handleNameChange(values, setFieldValue, currentInput, CalBacks, sectionName,) {


    // Check if `currentInput` contains `name` and `value`
    if (!currentInput || !currentInput.name || typeof currentInput.value === 'undefined') {
      console.error("Invalid input provided:", currentInput);
      return;
    }

    switch (currentInput.name) {
      case `${sectionName}.Names`:
        setFieldValue(currentInput.name, validateName(currentInput.value));
        break;

      case `${sectionName}.RetirementYear`:
        setFieldValue(currentInput.name, currentInput.value);

        // Ensure that `Age` and `currentInput.value` are numbers before performing calculation
        const age = parseInt(values[`${sectionName}`][`Age`], 10) || 0;
        const retirementYear = parseInt(currentInput.value, 10) || 0;



        // Calculate `PlannedRetirementAge` based on the `Age` and `RetirementYear`
        const plannedRetirementAge = age > 0 ? retirementYear - age + 1 : 0;

        console.log(age, retirementYear, plannedRetirementAge, currentInput.value)

        setFieldValue(`${sectionName}.PlannedRetirementAge`, plannedRetirementAge > 30 ? 30 : plannedRetirementAge);

        break;

      default:
        setFieldValue(currentInput.name, currentInput.value);
        break;
    }
  }


  const fillInitialValues = (setFieldValue) => {
    if (PersonalDetailObj._id) {
      console.log(PersonalDetailObj);
      if (PersonalDetailObj.client) {
        let ClientData = PersonalDetailObj.client;
        setFieldValue(`client.Names`, ClientData.clientGivenName)
        setFieldValue(`client.DOB`, ClientData.clientDOB)
        setFieldValue(`client.Age`, ClientData.clientAge)
        setFieldValue(`client.Gender`, ClientData.clientGender)
        setFieldValue(`client.PrivateHealthCover`, ClientData.clientPrivateHealthCoverRadio)
      }
      if (PersonalDetailObj.partner) {
        let partnerData = PersonalDetailObj.partner;
        setFieldValue(`partner.Names`, partnerData.partnerGivenName)
        setFieldValue(`partner.DOB`, partnerData.partnerDOB)
        setFieldValue(`partner.Age`, partnerData.partnerAge)
        setFieldValue(`partner.Gender`, partnerData.partnerGender)
        setFieldValue(`partner.PrivateHealthCover`, partnerData.partnerPrivateHealthCoverRadio)
      }

    }
  };

  return (
    <Formik initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({ values, setFieldValue, handleBlur, handleChange, }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue)
        }, [])

        return (
          <Form className="container-fluid PersonalDetailsForm  mt-2 mt-md-0 p-0 px-md-5">
            <div className="row">
              {/* Client Section */}
              <div className="col-md-8">
                <div className="row ">
                  <div className="col-6 mb-4"></div>
                  <div className="col-6 mb-4 LargeSheet">
                    <div className="centerDiv">
                      <label className="form-label clientFS green p-0 CustomFont">
                        Client
                        <div className="iconContainerLg p-0 ms-3">
                          <img src={single} alt="single icon" className="w-50" />
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Client Fields */}
                  {renderFields("client", values, setFieldValue, handleBlur, handleChange,)}
                </div>
              </div>

              {/* Partner Section */}
              {((values.client.MaritalStatus !== "Single") &&
                (values.client.MaritalStatus !== "Widowed")) &&

                <div className="col-md-4">
                  <div className="row">
                    <div className="col-6 col-md-12 mb-4 d-md-none d-block"></div>
                    <div className="col-6 col-md-12 LargeSheet">
                      <div className="centerDiv">
                        <label className="form-label clientFS CustomFont green mb-4 p-0">
                          Partner
                          <div className="iconContainerLg">
                            <img src={couple} alt="couple icon" className="w-50" />
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Partner Fields */}
                    {renderFields("partner", values, setFieldValue, handleBlur, handleChange,)}
                  </div>
                </div>
              }
            </div>

            <div className="row justify-content-center gap-2 mb-4">
              <div className={`col-md-4 cashFlowNextBtn`}>
                <button
                  type="submit"
                  className=" btn w-100  bgColor modalBtn"
                >
                  Next
                </button>
              </div>
            </div>



          </Form>
        )
      }}
    </Formik>
  );
};

export default PersonalDetails_cashFlow;
