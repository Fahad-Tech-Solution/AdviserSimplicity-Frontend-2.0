import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";

// Images
import single from "../../../Components/Svgs/single-2.svg";
import couple from "../../../Components/Svgs/single-2.svg";
import DatePicker from "react-datepicker";
import { differenceInYears } from "date-fns";
import { CashFlowData, CashFlowScenarioData, defaultUrl, PersonalDetailsData, QuestionShift } from "../../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import DynamicYesNo from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo";
import { openNotificationSuccess, PatchAxios, PostAxios, validateName } from "../../../Components/Assets/Api/Api";
import { useNavigate } from "react-router-dom";

const PersonalDetails_cashFlow = (Props) => {

  let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  let [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);

  let DefaultUrl = useRecoilValue(defaultUrl);


  let PersonalDetailObj = useRecoilValue(PersonalDetailsData);
  let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

  const initialValues = {
    client: {
      name: "",
      DOB: "",
      age: "",
      maritalStatus: "",
      gender: "",
      privateHealthCover: "",
      retirementYear: "",
      plannedRetirementAge: "",
      // preservationAge: 0,
    },
    partner: {
      name: "",
      DOB: "",
      age: "",
      maritalStatus: "",
      gender: "",
      privateHealthCover: "",
      retirementYear: "",
      plannedRetirementAge: "",
      // preservationAge: 0,
    },
  };

  const validationSchema = Yup.object().shape({
    client: Yup.object({
      maritalStatus: Yup.string().required("Marital Status is required"),
      plannedRetirementAge: Yup.number()
        .min(0, "Planned Retirement age cannot be negative.")
        .required("Planned Retirement age is required"),
      // Add other client validations as needed
    }),
  });

  let Nev = useNavigate();

  const onSubmit = async (values) => {
    console.log(JSON.stringify(values));

    let obj = values

    obj.scenarioFK = (JSON.parse(localStorage.getItem("ScenarioObj")))._id;


    (obj.client.maritalStatus === "Single" || obj.client.maritalStatus === "Widowed") ? obj.partner = {} : obj.partner = obj.partner;


    const bankAccountArray = cashFlowData?.cf_personalDetails?._id || "";
    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/CF/cf_personalDetails/Add`, obj);
      } else {
        obj._id = cashFlowData.cf_personalDetails._id;
        res = await PatchAxios(`${DefaultUrl}/api/CF/cf_personalDetails/Update`, obj);
      }

      if (res) {
        // console.log(res);
        const updatedData = { ...cashFlowData, cf_personalDetails: res };
        setCashFlowData(updatedData);

        localStorage.setItem('UserStatus', res.client.maritalStatus);
        localStorage.setItem('UserName', res.client.name);

        if (res.client.maritalStatus !== "Single" && res.client.maritalStatus !== "Widowed") {
          localStorage.setItem('PartnerName', res.partner.name)
        }


        openNotificationSuccess("success", "topRight", "Success Notification", `Data of CashFlow Personal Detail is Saved`);

        setQuestionChange("Income-And-Expenses")
        Nev(`/Cash-Flow/Income-And-Expenses`)
      }


    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess("error", "topRight", "Error Notification", `Data of CashFlow Personal Detail is not Saved. Please try again.`);
    }
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
    { name: "name", label: "Name", type: "text", id: "name" },
    { name: "DOB", label: "Date of Birth", type: "date", id: "dob" },
    { name: "age", label: "Age", type: "number", id: "age", disabled: true },
    { name: "maritalStatus", label: "Marital Status", type: "select", id: "maritalStatus", options: maritalStatusOptions, },
    { name: "gender", label: "Sex", type: "select", id: "sender", options: GenderStatusOptions },
    { name: "privateHealthCover", label: "Private Health Cover", type: "Radio", id: "privateHealthCover" },
    { name: "retirementYear", label: "Retirement Year", type: "select", options: loanTermOptions, id: "retirementYear" },
    { name: "plannedRetirementAge", label: "Planned Retirement age", type: "number", id: "plannedRetirementAge", disabled: true },
    { name: "preservationAge", label: "Preservation age", type: "number", id: "preservationAge", disabled: true },
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
                    setFieldValue(`${sectionName}.age`, age); // Assuming you want to store the age separately
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
                <div className="PersonalDetailsForm d-flex justify-content-center  m-0 p-0 ">
                  <div style={{ width: "15rem" }}>
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
      case `${sectionName}.name`:
        setFieldValue(currentInput.name, validateName(currentInput.value));
        break;

      case `${sectionName}.retirementYear`:
        setFieldValue(currentInput.name, currentInput.value);

        // Ensure that `age` and `currentInput.value` are numbers before performing calculation
        const age = parseInt(values[`${sectionName}`][`age`], 10) || 0;
        const retirementYear = parseInt(currentInput.value, 10) || 0;



        // Calculate `plannedRetirementAge` based on the `age` and `retirementYear`
        const plannedRetirementAge = age > 0 ? retirementYear - age + 1 : 0;

        // console.log(age, retirementYear, plannedRetirementAge, currentInput.value)

        setFieldValue(`${sectionName}.plannedRetirementAge`, plannedRetirementAge > 30 ? 30 : plannedRetirementAge);

        break;

      default:
        setFieldValue(currentInput.name, currentInput.value);
        break;
    }
  }

  const fillInitialValues = (setFieldValue) => {
    try {
      // Retrieve the ScenarioObj from localStorage
      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      // Helper function to update field values
      const updateFields = (data, prefix) => {
        if (!data) return;

        const fields = prefix === "client" ? {
          name: data.name || data.clientGivenName || "",
          DOB: data.DOB || data.clientDOB || "",
          age: data.age || data.clientAge || "",
          gender: data.gender || data.clientGender || "",
          privateHealthCover: data.privateHealthCover || data.clientPrivateHealthCoverRadio || "",
          maritalStatus: data.maritalStatus || data.clientMaritalStatus || "",
          retirementYear: data.retirementYear || "",
          plannedRetirementAge: data.plannedRetirementAge || "",
        } : {
          name: data.name || data.partnerGivenName || "",
          DOB: data.DOB || data.partnerDOB || "",
          age: data.age || data.partnerAge || "",
          gender: data.gender || data.partnerGender || "",
          privateHealthCover: data.privateHealthCover || data.partnerPrivateHealthCoverRadio || "",
          maritalStatus: data.maritalStatus || data.partnerMaritalStatus || "",
          retirementYear: data.retirementYear || "",
          plannedRetirementAge: data.plannedRetirementAge || "",
        };

        Object.entries(fields).forEach(([key, value]) => {
          setFieldValue(`${prefix}.${key}`, value);
          if (prefix === "client") {
            if (key === "name") {
              localStorage.setItem('UserName', value);
            }
            if (key === "maritalStatus") {
              localStorage.setItem('UserStatus', value);
            }
          }
          if (prefix === "partner") {
            if (key === "name") {
              localStorage.setItem('PartnerName', value);
            }
          }
        });
      };

      // Handle the discoveryForm scenario
      if (scenarioObj?.selectedSource === "discoveryForm" && PersonalDetailObj?._id) {
        // Update client details
        updateFields(PersonalDetailObj.client, "client");
        // Update partner details
        updateFields(PersonalDetailObj.partner, "partner");
      } else {    // Handle cashFlowData scenario
        const cashFlowDetails = CashFlowScenarioDataObj?.cf_personalDetails;
        if (cashFlowDetails) {
          // Update client details
          updateFields(cashFlowDetails.client, "client");
          // Update partner details
          updateFields(cashFlowDetails.partner, "partner");
        }
      }

      // Additional data from cashFlowData
      if (cashFlowData?.cf_personalDetails?._id) {
        const cashFlowDataDetails = cashFlowData.cf_personalDetails;
        // Update client details
        updateFields(cashFlowDataDetails.client, "client");
        // Update partner details
        updateFields(cashFlowDataDetails.partner, "partner");
      }
    } catch (error) {
      console.error("Error in fillInitialValues:", error);
    }
  };


  return (
    <Formik initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({ values, setFieldValue, handleBlur, handleChange, }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue)
        }, [PersonalDetailObj, cashFlowData])

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
              {((values.client.maritalStatus !== "Single") &&
                (values.client.maritalStatus !== "Widowed") &&
                (values.client.maritalStatus !== "")
              ) &&

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
