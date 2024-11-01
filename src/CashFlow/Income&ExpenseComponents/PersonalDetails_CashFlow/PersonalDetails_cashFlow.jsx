import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";

// Images
import single from "../../../Components/Svgs/single-2.svg";
import couple from "../../../Components/Svgs/single-2.svg";

const PersonalDetails_cashFlow = (Props) => {
  const [PersonalDetailModal, setPersonalDetailModal] = useState(false);

  const initialValues = {
    client: {
      Names: "",
      DOB: "",
      Age: "",
      Sex: "",
      PrivateHealthCover: "",
      RetirementYear: "",
      PlannedRetirementAge: "",
      PreservationAge: "",
    },
    partner: {
      Names: "",
      DOB: "",
      Age: "",
      Sex: "",
      PrivateHealthCover: "",
      RetirementYear: "",
      PlannedRetirementAge: "",
      PreservationAge: "",
    },
  };

  const validationSchema = Yup.object().shape({
    client: Yup.object({
      Names: Yup.string().required("Required"),
      DOB: Yup.date().required("Required"),
      Age: Yup.number().required("Required"),
      // Add other validation rules as needed
    }),
    partner: Yup.object({
      Names: Yup.string().required("Required"),
      DOB: Yup.date().required("Required"),
      Age: Yup.number().required("Required"),
      // Add other validation rules as needed
    }),
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  const InputsArray = [
    { name: "Names", label: "Names", type: "text", id: "name" },
    { name: "DOB", label: "Date of Birth", type: "date", id: "dob" },
    { name: "Age", label: "Age", type: "number", id: "age" },
    { name: "Sex", label: "Sex", type: "select", id: "sex", options: ["Male", "Female", "Other"] },
    { name: "PrivateHealthCover", label: "Private Health Cover", type: "text", id: "privateHealthCover" },
    { name: "RetirementYear", label: "Retirement Year", type: "number", id: "retirementYear" },
    { name: "PlannedRetirementAge", label: "Planned Retirement Age", type: "number", id: "plannedRetirementAge" },
    { name: "PreservationAge", label: "Preservation Age", type: "number", id: "preservationAge" },
  ];

  const renderFields = (sectionName) => {

    let classNames = sectionName === "partner" ? "col-6 col-md-12" : "col-6";

    return (InputsArray.map((input) => (
      <React.Fragment key={`${sectionName}.${input.name}`}>
        <div className={classNames + "mb-3"}>
          <label htmlFor={`${sectionName}.${input.name}`} className="form-label d-block mt-2">
            {input.label}
          </label>
        </div>

        <div className={classNames + "mb-4"}>
          {input.type === "select" ? (
            <Field as="select" id={`${sectionName}.${input.id}`} name={`${sectionName}.${input.name}`} className="form-select inputDesign">
              <option value="">Select</option>
              {input.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Field>
          ) : (
            <Field type={input.type} id={`${sectionName}.${input.id}`} name={`${sectionName}.${input.name}`} className="form-control inputDesign" />
          )}
          <ErrorMessage component="div" className="text-danger" name={`${sectionName}.${input.name}`} />
        </div>
      </React.Fragment>
    )))
  }
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ values }) => (
        <Form className="container-fluid mt-2 mt-md-0 p-0 px-md-5">
          <div className="row">
            {/* Client Section */}
            <div className="col-md-8">
              <div className="row">
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
                {renderFields("client")}
              </div>
            </div>

            {/* Partner Section */}
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
                {renderFields("partner")}
              </div>
            </div>
          </div>

          <div className="row justify-content-center gap-2 mb-4">
            <div className="col-md-4">
              <button className="float-end btn w-100 bgColor modalBtn" type="submit">
                Next
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PersonalDetails_cashFlow;
