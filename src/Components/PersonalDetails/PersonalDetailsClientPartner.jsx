import React from "react";

import single from "../Svgs/single-2.svg";
import couple from "../Svgs/couple-2.svg";
import { ErrorMessage, Field } from "formik";
import DatePicker from "react-datepicker";
import { differenceInYears } from "date-fns";
import DynamicYesNo from "../Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo";

const PersonalDetailsClientPartner = (props) => {
  let { values, setFieldValue, handleChange, handleBlur } = props;
  let { client, partner } = values;

  return (
    <div className="row mt-4 px-0 px-md-5">
      <div className="col-md-8">
        <div className="row">
          {/*Labels Title */}
          <div className="col-6 mb-4"></div>

          {/*Client Head */}
          <div className="col-6 mb-4 LargeSheet">
            <div className="centerDiv">
              <label
                htmlFor="clientTitle LargeSheet "
                className="form-label clientFS green p-0 CustomFont"
              >
                Client
                <div className="iconContainerLg p-0 ms-3">
                  <img src={single} alt="single svg" className="w-50" />
                </div>
              </label>
            </div>
          </div>

          {/*Labels Title */}
          <div className="col-6 mb-3">
            <label htmlFor="clientTitle" className="form-label d-block mt-2">
              Title
            </label>
          </div>

          {/*Client Input Title */}
          <div className="col-6 mb-4">
            <Field
              id="clientTitle"
              className="form-select inputDesign"
              as="select"
              name="client.clientTitle"
            >
              <option value="">Select</option>
              <option value="Dr">Dr</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
              <option value="MS">MS</option>
              <option value="Prof">Prof</option>
              <option value="Other">Other</option>
            </Field>
            <ErrorMessage
              component="div"
              className="text-danger "
              name="client.clientTitle"
            />
          </div>

          {/*Labels First Name */}
          <div className="col-6 mb-4">
            <label htmlFor="clientGivenName" className="form-label mt-2">
              First Name
            </label>
          </div>

          {/*Client Input Given Name */}
          <div className="col-6 mb-4">
            <Field
              type="text"
              className="form-control inputDesign"
              id="clientGivenName"
              name="client.clientGivenName"
            />
            <ErrorMessage
              component="div"
              className="text-danger "
              name="client.clientGivenName"
            />
          </div>

          {/*Labels Middle Name */}
          <div className="col-6 mb-4">
            <label htmlFor="clientMiddleName" className="form-label mt-2">
              Middle Name
            </label>
          </div>

          {/*Client Input Middle Name */}
          <div className="col-6 mb-4">
            <Field
              type="text"
              className="form-control inputDesign"
              id="clientMiddleName"
              name="client.clientMiddleName"
            />
            <ErrorMessage
              component="div"
              className="text-danger "
              name="client.clientMiddleName"
            />
          </div>

          {/*Labels Last Name */}
          <div className="col-6 mb-4">
            <label htmlFor="clientLastName" className="form-label mt-2">
              Last Name
            </label>
          </div>

          {/*Client Input Last Name */}
          <div className="col-6 mb-4">
            <Field
              type="text"
              className="form-control inputDesign"
              id="clientLastName"
              name="client.clientLastName"
            />
            <ErrorMessage
              component="div"
              className="text-danger "
              name="client.clientLastName"
            />
          </div>

          {/*Labels Preferred Name */}
          <div className="col-6 mb-4">
            <label htmlFor="clientPreferredName" className="form-label mt-2">
              Preferred Name
            </label>
          </div>

          {/*Client Input Preferred Name */}
          <div className="col-6 mb-4">
            <Field
              type="text"
              className="form-control inputDesign "
              id="clientPreferredName"
              name="client.clientPreferredName"
            />
            <ErrorMessage
              component="div"
              className="text-danger "
              name="client.clientPreferredName"
            />
          </div>

          {/*Labels Surname */}
          <div className="col-6 mb-4">
            <label htmlFor="clientSurname" className="form-label mt-2">
              Surname
            </label>
          </div>

          {/*Client Input Surname */}
          <div className="col-6 mb-4">
            <Field
              type="text"
              className="form-control inputDesign"
              id="clientSurname"
              name="client.clientSurname"
            />
            <ErrorMessage
              component="div"
              className="text-danger "
              name="client.clientSurname"
            />
          </div>

          {/*Labels Gender */}
          <div className="col-6 mb-4">
            <label htmlFor="" className="form-label mt-2">
              Gender
            </label>
          </div>

          {/*Client Input Gender */}
          <div className="col-6 mb-4">
            <Field
              id="clientGender"
              className="form-select inputDesign"
              as="select"
              name="client.clientGender"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Field>
            <ErrorMessage
              component="div"
              className="text-danger "
              name="client.clientPreferredName"
            />
          </div>

          {/*Labels DOB */}
          <div className="col-6 mb-4">
            <label htmlFor="clientDOB" className="form-label mt-2">
              Date of Birth
            </label>
          </div>

          {/*Client Input DOB */}
          <div className="col-6 mb-4">
            <div className="DateIconParent">
              <DatePicker
                id="clientDOB"
                className="form-control inputDesign DateInputPadding "
                selected={client.clientDOB}
                onChange={(date) => {
                  setFieldValue("client.clientDOB", date);
                  const age = differenceInYears(new Date(), date) || 0;
                  setFieldValue("client.clientAge", age);
                }}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                scrollableYearDropdown
                onBlur={handleBlur}
                name="client.clientDOB"
                maxDate={new Date()}
                showMonthDropdown
                dropdownMode="select"
                wrapperClassName="w-100"
                showIcon
              />
            </div>
            <ErrorMessage
              component="div"
              className="text-danger"
              name="client.clientDOB"
            />
          </div>

          {/*Labels Age */}
          <div className="col-6 mb-4">
            <label htmlFor="clientAge" className="form-label mt-2">
              Age
            </label>
          </div>

          {/*Client Input Age */}
          <div className="col-6 mb-4">
            <Field
              type="number"
              className="form-control inputDesign "
              id="clientAge"
              name="client.clientAge"
              readOnly
              disabled
            />
            <ErrorMessage
              component="div"
              className="text-danger "
              name="client.clientAge"
            />
          </div>

          {/*Labels  Marital Status */}
          <div className="col-6 mb-4">
            <label htmlFor="clientMaritalStatus" className="form-label mt-2">
              Marital Status
            </label>
          </div>

          {/*Client Input  Marital Status */}
          <div className="col-6 mb-4">
            <Field
              as="select"
              id="client.clientMaritalStatus"
              name="client.clientMaritalStatus"
              className="form-select inputDesign"
            >
              <option value="">Select</option>
              <option value="Married">Married</option>
              <option value="Partnered">Partnered</option>
              <option value="Single">Single</option>
              <option value="DeFacto">De-facto</option>
              <option value="Widowed">Widowed</option>
            </Field>
            <ErrorMessage
              component="div"
              className="text-danger"
              name="client.clientMaritalStatus"
            />
          </div>

          {/*Labels Employment Status */}
          <div className="col-6 mb-4">
            <label htmlFor="clientEmploymentStatus" className="form-label mt-2">
              Employment Status
            </label>
          </div>

          {/*Client Input Employment Status */}
          <div className="col-6 mb-4">
            <Field
              as="select"
              id="clientEmploymentStatus"
              name="client.clientEmploymentStatus"
              className="form-select   inputDesign"
            >
              <option value="">Select</option>
              <option value="Employee">Employee</option>
              <option value="Homemaker">Homemaker</option>
              <option value="Not Working">Not Working</option>

              <option value="Self-funded Retiree">Self-funded Retiree</option>
              <option value="Centrelink Retiree">Centrelink Retiree</option>
              <option value="Centrelink Recipient">Centrelink Recipient</option>

              <option value="Self-employed">Self-employed</option>
              <option value="Student">Student</option>
              <option value="Unemployed">Unemployed</option>
            </Field>
            <ErrorMessage
              component="div"
              className="text-danger "
              name="client.clientEmploymentStatus"
            />
          </div>

          {/*Labels Occupations */}
          <div className="col-6 mb-4">
            <label htmlFor="clientOccupationID" className="form-label mt-2">
              Occupation
            </label>
          </div>

          {/*Client Input Occupation */}
          <div className="col-6 mb-4">
            <Field
              type="text"
              className="form-control inputDesign "
              id="clientOccupationID"
              name="client.clientOccupationID"
            />
            <ErrorMessage
              component="div"
              className="text-danger"
              name="client.clientOccupationID"
            />
          </div>

          {/*Labels Planned Retirement Age */}
          <div className="col-6 mb-4">
            <label
              htmlFor="clientPlannedRetirementAge"
              className="form-label mt-2"
            >
              Planned Retirement Age
            </label>
          </div>

          {/*Client Input Planned Retirement Age */}
          <div className="col-6 mb-4">
            <Field
              type="number"
              className="form-control inputDesign "
              id="clientPlannedRetirementAge"
              onWheel={(event) => event.currentTarget.blur()}
              name="client.clientPlannedRetirementAge"
            />
            <ErrorMessage
              component="div"
              className="text-danger "
              name="client.clientPlannedRetirementAge"
            />
          </div>

          {/*Labels Health*/}
          <div className="col-6 mb-4">
            <label htmlFor="clientHealth" className="form-label mt-2">
              Health
            </label>
          </div>

          {/*Client Input Health */}
          <div className="col-6 mb-4">
            <Field
              as="select"
              id="clientHealth"
              name="client.clientHealth"
              className="form-select inputDesign"
            >
              <option value="">Select</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="average">Average</option>
              <option value="poor">Poor</option>
            </Field>
            <ErrorMessage
              component="div"
              className="text-danger "
              name="client.clientHealth"
            />
          </div>

          {/*Labels  Smoker */}
          <div className="col-6 mb-4">
            <label htmlFor="Smoker" className="form-label mt-2">
              Smoker
            </label>
          </div>

          {/*Client Input Smoker */}
          <div className="col-6 mb-4 ">
            <div className="d-flex justify-content-center">
              <div style={{ width: "50%" }}>
                <DynamicYesNo
                  name={"client.clientSmoker"}
                  values={values}
                  handleChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/*Labels  Tax Resident */}
          <div className="col-6 mb-4">
            <label htmlFor="TaxResident" className="form-label mt-2">
              Tax Resident
            </label>
          </div>

          {/*Client Input  Tax Resident */}
          <div className="col-6 mb-4">
            <div className="d-flex justify-content-center">
              <div style={{ width: "50%" }}>
                <DynamicYesNo
                  name={"client.clientTaxResidentRadio"}
                  values={values}
                  handleChange={handleChange}
                />{" "}
              </div>
            </div>
          </div>

          {/*Labels Private Health Cover */}
          <div className="col-6 mb-4">
            <label htmlFor="PrivateHealthCover" className="form-label mt-2">
              Private Health Cover
            </label>
          </div>

          {/*Client Input Private Health Cover*/}
          <div className="col-6 mb-4">
            <div className="d-flex justify-content-center">
              <div style={{ width: "50%" }}>
                <DynamicYesNo
                  name={"client.clientPrivateHealthCoverRadio"}
                  values={values}
                  handleChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/*Labels  HELPS Debt */}
          <div className="col-6 mb-4">
            <label htmlFor="HELPSDebt" className="form-label mt-2">
              HELPS Debt
            </label>
          </div>

          {/*Client Input  HELPS Debt*/}
          <div className="col-6 mb-4">
            <div className="d-flex justify-content-center">
              <div style={{ width: "50%" }}>
                <DynamicYesNo
                  name={"client.clientHELPSDebtRadio"}
                  values={values}
                  handleChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/*Labels Private Home Address */}
          <div className="col-6 mb-4">
            <label htmlFor="clientHomeAddress" className="form-label mt-2">
              Home Address
            </label>
          </div>

          {/*Client Input Home Address*/}
          <div className="col-6 mb-4">
            <Field
              as="textarea"
              className="form-control inputDesign  inputDesign"
              id="clientHomeAddress"
              name="client.clientHomeAddress"
            />
            <ErrorMessage
              component="div"
              className="text-danger "
              name="client.clientHomeAddress"
            />
          </div>

          {/*Labels Private Postcode/Suburb */}
          <div className="col-6 mb-4">
            <label htmlFor="clientPostcode" className="form-label mt-2">
              Postcode/Suburb
            </label>
          </div>

          {/*Client Postcode/Suburb*/}
          <div className="col-6 mb-4">
            <Field
              type="number"
              className="form-control inputDesign "
              id="clientPostcode"
              name="client.clientPostcode"
            />
            <ErrorMessage
              component="div"
              className="text-danger "
              name="client.clientPostcode"
            />
          </div>

          {/*Labels Private Same As */}
          <div className="col-6 d-none d-md-block mb-4">
            <label className="form-label mt-2"></label>
          </div>

          {/*Client Input Same As*/}
          <div className="col-md-6 mb-4">
            <div className="centerDiv">
              <Field
                className="form-check-input newCheck"
                type="checkbox"
                id="clientSameAsAbove"
                name="client.clientSameAsAbove"
                style={{ accentColor: "green" }}
                checked={client.clientSameAsAbove} // use Formik's `values` to control the checked state
                onChange={(e) => {
                  const isChecked = e.target.checked; // Correct way to get the boolean value

                  setFieldValue("client.clientSameAsAbove", isChecked);

                  if (isChecked) {
                    // if checkbox is checked, copy home address and postcode to postal address and postcode
                    setFieldValue(
                      "client.clientPostalAddress",
                      client.clientHomeAddress
                    );
                    setFieldValue(
                      "client.clientPostalPostCode",
                      client.clientPostcode
                    );

                    if (partner.partnerSameAsClient) {
                      setFieldValue(
                        "partner.partnerPostalAddress",
                        client.clientHomeAddress
                      );
                      setFieldValue(
                        "partner.partnerPostalPostCode",
                        client.clientPostcode
                      );
                    }
                  } else {
                    // if checkbox is unchecked, clear the postal address and postcode
                    setFieldValue("client.clientPostalAddress", "");
                    setFieldValue("client.clientPostalPostCode", "");
                  }
                }}
              />

              <div className="d-inline-block">
                <label
                  className="ms-2"
                  id="labelID"
                  htmlFor="clientSameAsAbove"
                >
                  Same as home address
                </label>
              </div>
            </div>
          </div>

          {/*Labels Private Postal Address */}
          <div className="col-6 mb-4">
            <label htmlFor="clientPostalAddress" className="form-label mt-2">
              {" "}
              Postal Address{" "}
            </label>
          </div>

          {/*Client Input Postal Address*/}
          <div className="col-6 mb-4">
            <Field
              type="text"
              className="form-control inputDesign "
              id="clientPostalAddress"
              name="client.clientPostalAddress"
              disabled={client.clientSameAsAbove}
            />
            <ErrorMessage
              component="div"
              className="text-danger "
              name="client.clientPostalAddress"
            />
          </div>

          {/*Labels Private Postcode/Suburb */}
          <div className="col-6 mb-4">
            <label htmlFor="clientPostcode" className="form-label mt-2">
              Postcode/Suburb
            </label>
          </div>

          {/*Client Input Postcode/Suburb*/}
          <div className="col-6 mb-4">
            <Field
              type="number"
              className="form-control inputDesign"
              id="clientPostalPostCode"
              disabled={client.clientSameAsAbove}
              name="client.clientPostalPostCode"
            />
            <ErrorMessage
              component="div"
              className="text-danger "
              name="client.clientPostalPostCode"
            />
          </div>

          {/*Labels Private Mobile Number */}
          <div className="col-6 mb-4">
            <label htmlFor="clientMobile" className="form-label mt-2">
              Mobile Number
            </label>
          </div>

          {/*Client Input Mobile Number*/}
          <div className="col-6 mb-4">
            <Field
              type="text"
              className="form-control inputDesign"
              id="clientMobile"
              name="client.clientMobile"
            />
            <ErrorMessage
              component="div"
              className="text-danger "
              name="client.clientMobile"
            />
          </div>

          {/*Labels Private Home Phone*/}
          <div className="col-6 mb-4">
            <label htmlFor="clientHomePhone" className="form-label mt-2">
              Home Phone
            </label>
          </div>

          {/*Client Input Home Phone*/}
          <div className="col-6 mb-4">
            <Field
              type="text"
              className="form-control inputDesign "
              id="clientHomePhone"
              name="client.clientHomePhone"
            />
            <ErrorMessage
              component="div"
              className="text-danger "
              name="client.clientHomePhone"
            />
          </div>

          {/*Labels Private Work Phone*/}
          <div className="col-6 mb-4">
            <label htmlFor="clientWorkPhone" className="form-label mt-2">
              Work Phone
            </label>
          </div>

          {/*Client Input Work Phone*/}
          <div className="col-6 mb-4">
            <Field
              type="text"
              className="form-control inputDesign"
              id="clientWorkPhone"
              name="client.clientWorkPhone"
            />
            <ErrorMessage
              component="div"
              className="text-danger"
              name="client.clientWorkPhone"
            />
          </div>

          {/*Labels Private Work Phone*/}
          <div className="col-6 mb-4">
            <label htmlFor="Email" className="form-label mt-2">
              Email
            </label>
          </div>

          {/*Client Input Work Phone*/}
          <div className="col-6 mb-4">
            <Field
              type="email"
              className="form-control inputDesign "
              id="Email"
              name="client.Email"
            />
            <ErrorMessage
              component="div"
              className="text-danger"
              name="client.Email"
            />
          </div>
        </div>
      </div>

      {client.clientMaritalStatus !== "Single" &&
      client.clientMaritalStatus !== "Widowed" ? (
        <div className="col-md-4">
          <div className="row">
            {/*Mobile Labels Title */}
            <div className="col-6 col-md-12 mb-4 d-md-none d-block"></div>

            {/*Partner Head */}
            <div className="col-6 col-md-12 LargeSheet ">
              <div className="centerDiv">
                <label
                  htmlFor="clientTitle"
                  className="form-label clientFS CustomFont green mb-4 p-0 "
                >
                  Partner
                  <div className="iconContainerLg">
                    <img src={couple} alt="single svg" className="w-50" />
                  </div>
                </label>
              </div>
            </div>

            {/*Mobile Labels Title */}
            <div className="col-6 col-md-12 mb-4 d-md-none d-block">
              <label htmlFor="partnerTitle" className="form-label d-block mt-2">
                Title
              </label>
            </div>

            {/*Partner Input Title */}
            <div className="col-6 col-md-12  mb-4">
              <Field
                as="select"
                id="partnerTitle"
                className="form-select inputDesign"
                name="partner.partnerTitle"
              >
                <option value="">Select</option>
                <option value="Dr">Dr</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
                <option value="MS">MS</option>
                <option value="Prof">Prof</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage
                className="text-danger "
                component="div"
                name="partner.partnerTitle"
              />
            </div>

            {/*Mobile Labels Given Name */}
            <div className="col-6 col-md-12 mb-4 d-md-none d-block">
              <label
                htmlFor="partnerGivenName"
                className="form-label d-block mt-2"
              >
                Given Name
              </label>
            </div>

            {/*Partner Input Given Name */}
            <div className="col-6 col-md-12  mb-4">
              <Field
                type="text"
                className="form-control inputDesign "
                id="partnerGivenName"
                name="partner.partnerGivenName"
              />
              <ErrorMessage
                className="text-danger "
                component="div"
                name="partner.partnerGivenName"
              />
            </div>

            {/*Mobile Labels Middle Name */}
            <div className="col-6 col-md-12 mb-4 d-md-none d-block">
              <label
                htmlFor="partnerMiddleName"
                className="form-label d-block mt-2"
              >
                Middle Name
              </label>
            </div>

            {/*Partner Input Middle Name */}
            <div className="col-6 col-md-12  mb-4">
              <Field
                type="text"
                className="form-control inputDesign"
                id="partnerMiddleName"
                name="partner.partnerMiddleName"
              />
              <ErrorMessage
                className="text-danger "
                component="div"
                name="partner.partnerMiddleName"
              />
            </div>

            {/*Mobile Labels Last Name */}
            <div className="col-6 col-md-12 mb-4 d-md-none d-block">
              <label
                htmlFor="partnerLastName"
                className="form-label d-block mt-2"
              >
                Last Name
              </label>
            </div>

            {/*Partner Input Last Name */}
            <div className="col-6 col-md-12  mb-4">
              <Field
                type="text"
                className="form-control inputDesign"
                id="partnerLastName"
                name="partner.partnerLastName"
              />
              <ErrorMessage
                className="text-danger "
                component="div"
                name="partner.partnerLastName"
              />
            </div>

            {/*Mobile Labels Preferred Name */}
            <div className="col-6 col-md-12 mb-4 d-md-none d-block">
              <label
                htmlFor="partnerPreferredName"
                className="form-label d-block mt-2"
              >
                Preferred Name
              </label>
            </div>

            {/*Partner Input Preferred Name */}
            <div className="col-6 col-md-12  mb-4">
              <Field
                type="text"
                className="form-control inputDesign"
                id="partnerPreferredName"
                name="partner.partnerPreferredName"
              />
              <ErrorMessage
                className="text-danger "
                component="div"
                name="partner.partnerPreferredName"
              />
            </div>

            {/*Mobile Labels Surname */}
            <div className="col-6 col-md-12 mb-4 d-md-none d-block">
              <label
                htmlFor="partnerSurname"
                className="form-label d-block mt-2"
              >
                Surname
              </label>
            </div>

            {/*Partner Input Surname */}
            <div className="col-6 col-md-12  mb-4">
              <Field
                type="text"
                className="form-control inputDesign "
                id="partnerSurname"
                name="partner.partnerSurname"
              />
              <ErrorMessage
                className="text-danger "
                component="div"
                name="partner.partnerSurname"
              />
            </div>

            {/*Mobile Labels Gender */}
            <div className="col-6 col-md-12 mb-4 d-md-none d-block">
              <label htmlFor="" className="form-label mt-2">
                Gender
              </label>
            </div>

            {/*Partner Input Gender */}
            <div className="col-6 col-md-12 mb-4">
              <Field
                id="partnerGender"
                className="form-select inputDesign"
                as="select"
                name="partner.partnerGender"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage
                component="div"
                className="text-danger "
                name="partner.partnerPreferredName"
              />
            </div>

            {/*Mobile Labels DOB */}
            <div className="col-6 col-md-12 mb-4 d-md-none d-block">
              <label htmlFor="partnerDOB" className="form-label mt-2">
                Date of Birth
              </label>
            </div>

            {/*Partner Input DOB */}
            <div className="col-6 col-md-12  mb-4">
              <div className="DateIconParent">
                <DatePicker
                  showIcon
                  className="form-control inputDesign DateInputPadding"
                  selected={partner.partnerDOB}
                  onChange={(date) => {
                    setFieldValue("partner.partnerDOB", date);
                    const age = differenceInYears(new Date(), date) || 0;
                    setFieldValue("partner.partnerAge", age);
                    console.log(partner.partnerDOB);
                  }}
                  dateFormat="dd/MM/yyyy"
                  // placeholderText="dd/mm/yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  onBlur={handleBlur}
                  name="partner.partnerDOB"
                  id="partnerDOB"
                  maxDate={new Date()}
                  showMonthDropdown
                  dropdownMode="select"
                  wrapperClassName="w-100"
                />
              </div>
              <ErrorMessage
                component="div"
                className="text-danger "
                name="partner.partnerDOB"
              />
            </div>

            {/*Mobile Labels Age  */}
            <div className="col-6 col-md-12 mb-4 d-md-none d-block">
              <label htmlFor="partnerAge" className="form-label mt-2">
                Age
              </label>
            </div>

            {/*Partner Input Age */}
            <div className="col-6 col-md-12  mb-4">
              <Field
                type="number"
                className="form-control inputDesign "
                id="partnerAge"
                name="partner.partnerAge"
                readOnly
                disabled
              />
              <ErrorMessage
                className="text-danger "
                component="div"
                name="partner.partnerAge"
              />
            </div>

            {/*Mobile Labels Marital Status */}
            <div className="col-6 col-md-12  mb-4 d-md-none d-block">
              <label htmlFor="partnerMaritalStatus" className="form-label mt-2">
                Marital Status
              </label>
            </div>

            {/*Partner Input Marital Status */}
            <div className="col-6 col-md-12  mb-4">
              <Field
                as="select"
                id="partnerMaritalStatus"
                className="form-select inputDesign"
                name="partner.partnerMaritalStatus"
              >
                <option value="">Select</option>
                <option value="Married">Married</option>
                <option value="Partnered">Partnered</option>
                <option value="De-facto">De-facto</option>
              </Field>
              <ErrorMessage
                className="text-danger "
                component="div"
                name="partner.partnerMaritalStatus"
              />
            </div>

            {/*Mobile Labels Employment Status */}
            <div className="col-6 col-md-12  mb-4 d-md-none d-block">
              <label
                htmlFor="partnerEmploymentStatus"
                className="form-label mt-2"
              >
                Employment Status
              </label>
            </div>

            {/*Partner Input Employment Status */}
            <div className="col-6 col-md-12  mb-4">
              <Field
                as="select"
                id="partnerEmploymentStatus"
                className="form-select inputDesign"
                name="partner.partnerEmploymentStatus"
              >
                <option value="">Select</option>
                <option value="Employee">Employee</option>
                <option value="Homemaker">Homemaker</option>
                <option value="Not Working">Not Working</option>

                <option value="Self-funded Retiree">Self-funded Retiree</option>
                <option value="Centrelink Retiree">Centrelink Retiree</option>
                <option value="Centrelink Recipient">
                  Centrelink Recipient
                </option>

                <option value="Self-employed">Self-employed</option>
                <option value="Student">Student</option>
                <option value="Unemployed">Unemployed</option>
              </Field>
              <ErrorMessage
                className="text-danger "
                component="div"
                name="partner.partnerEmploymentStatus"
              />
            </div>

            {/*Mobile Labels Occupation */}
            <div className="col-6 col-md-12  mb-4 d-md-none d-block">
              <label htmlFor="partnerOccupationID" className="form-label mt-2">
                Occupation
              </label>
            </div>

            {/*Partner Input Occupation */}
            <div className="col-6 col-md-12  mb-4">
              <Field
                type="text"
                className="form-control inputDesign "
                id="partnerOccupationID"
                name="partner.partnerOccupationID"
              />
              <ErrorMessage
                className="text-danger "
                component="div"
                name="partner.partnerOccupationID"
              />
            </div>

            {/*Mobile Labels Planned Retirement Age */}
            <div className="col-6 col-md-12  mb-4 d-md-none d-block">
              <label
                htmlFor="partnerPlannedRetirementAge"
                className="form-label mt-2"
              >
                Planned Retirement Age
              </label>
            </div>

            {/*Partner Input Planned Retirement Age */}
            <div className="col-6 col-md-12  mb-4">
              <Field
                type="number"
                className="form-control inputDesign "
                id="partnerPlannedRetirementAge"
                onWheel={(event) => event.currentTarget.blur()}
                name="partner.partnerPlannedRetirementAge"
              />
              <ErrorMessage
                className="text-danger"
                component="div"
                name="partner.partnerPlannedRetirementAge"
              />
            </div>

            {/*Mobile Labels Health */}
            <div className="col-6 col-md-12  mb-4 d-md-none d-block">
              <label htmlFor="partnerHealth" className="form-label mt-2">
                Health
              </label>
            </div>

            {/*Partner Input Health */}
            <div className="col-6 col-md-12  mb-4">
              <Field
                as="select"
                id="partnerHealth"
                className="form-select inputDesign"
                name="partner.partnerHealth"
              >
                <option value="">Select</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="average">Average</option>
                <option value="poor">Poor</option>
              </Field>
              <ErrorMessage
                className="text-danger "
                component="div"
                name="partner.partnerHealth"
              />
            </div>

            {/*Mobile Labels Smoker */}
            <div className="col-6 col-md-12  mb-4 d-md-none d-block">
              <label htmlFor="Smoker" className="form-label mt-2">
                Smoker
              </label>
            </div>

            {/*Partner Input Smoker */}
            <div className="col-6 col-md-12  mb-4">
              <div className="d-flex justify-content-center">
                <div style={{ width: "50%" }}>
                  <DynamicYesNo
                    name={"partner.partnerSmoker"}
                    values={values}
                    handleChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/*Mobile Labels Tax Resident */}
            <div className="col-6 col-md-12  mb-4 d-md-none d-block">
              <label htmlFor="TaxResident" className="form-label mt-2">
                Tax Resident
              </label>
            </div>

            {/*Partner Input Tax Resident */}
            <div className="col-6 col-md-12 mb-4">
              <div className="d-flex justify-content-center">
                <div style={{ width: "50%" }}>
                  <DynamicYesNo
                    name={"partner.partnerTaxResidentRadio"}
                    values={values}
                    handleChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/*Mobile Labels Private Health Cover */}
            <div className="col-6 col-md-12  mb-4 d-md-none d-block">
              <label htmlFor="PrivateHealthCover" className="form-label mt-2">
                Private Health Cover
              </label>
            </div>

            {/*Partner Input Private Health Cover */}
            <div className="col-6 col-md-12  mb-4">
              <div className="d-flex justify-content-center">
                <div style={{ width: "50%" }}>
                  <DynamicYesNo
                    name={"partner.partnerPrivateHealthCoverRadio"}
                    values={values}
                    handleChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/*Mobile Labels HELPS Debt */}
            <div className="col-6 col-md-12  mb-4 d-md-none d-block">
              <label htmlFor="HELPSDebt" className="form-label mt-2">
                HELPS Debt
              </label>
            </div>

            {/*Partner Input HELPS Debt */}
            <div className="col-6 col-md-12 mb-3">
              <div className="d-flex justify-content-center">
                <div style={{ width: "50%" }}>
                  <DynamicYesNo
                    name={"partner.partnerHELPSDebtRadio"}
                    values={values}
                    handleChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/*Mobile Labels Home Address */}
            <div className="col-6 col-md-12  mb-4 d-md-none d-block">
              <label htmlFor="partnerHomeAddress" className="form-label mt-2">
                Home Address
              </label>
            </div>

            {/*Partner Input Home Address*/}
            <div className="col-6 col-md-12  mb-4 mt-2 ">
              <Field
                as="textarea"
                className="form-control inputDesign  inputDesign"
                id="partnerHomeAddress"
                name="partner.partnerHomeAddress"
                disabled={values.partnerSameAsClient}
              />
              <ErrorMessage
                component="div"
                className="text-danger "
                name="partner.partnerHomeAddress"
              />
            </div>

            {/*Mobile Labels Postcode/Suburb */}
            <div className="col-6 col-md-12  mb-4 d-md-none d-block">
              <label htmlFor="partnerPostcode" className="form-label mt-2">
                Postcode/Suburb
              </label>
            </div>

            {/*Partner Input Postcode/Suburb */}
            <div className="col-6 col-md-12  mb-4 ">
              <Field
                type="number"
                className="form-control inputDesign "
                id="partnerPostcode"
                name="partner.partnerPostcode"
                disabled={values.partnerSameAsClient}
              />
              <ErrorMessage
                component="div"
                className="text-danger "
                name="partner.partnerPostcode"
              />
            </div>

            {/*Mobile Labels Same As */}
            <div className="col-6 col-md-12  mb-4 d-none">
              <label className="form-label mt-2"></label>
            </div>

            {/*Partner Input  Same As */}
            <div className="col-md-12  mb-4">
              <div className="centerDiv">
                <Field
                  className="form-check-input"
                  type="checkbox"
                  id="partnerSameAsClient"
                  name="partner.partnerSameAsClient"
                  checked={partner.partnerSameAsClient}
                  onClick={(e) => {
                    // console.log(e.targert);

                    setFieldValue(
                      "partner.partnerSameAsClient",
                      !partner.partnerSameAsClient
                    );
                    console.log(partner.partnerSameAsClient);

                    if (e.target.value) {
                      setFieldValue(
                        "partner.partnerPostalAddress",
                        client.clientHomeAddress
                      );
                      setFieldValue(
                        "partner.partnerPostalPostCode",
                        client.clientPostcode
                      );
                    } else {
                      setFieldValue("partner.partnerPostalAddress", "");
                      setFieldValue("partner.partnerPostalPostCode", "");
                    }
                  }}
                />
                <div className="d-inline-block">
                  <label
                    className=""
                    id="labelID"
                    htmlFor="partnerSameAsClient"
                  >
                    &nbsp;&nbsp;Same as Client address
                  </label>
                </div>
              </div>
            </div>

            {/*Mobile Labels  Postal Address */}
            <div className="col-6 col-md-12  mb-4 d-md-none d-block">
              <label htmlFor="clientPostalAddress" className="form-label mt-2">
                Postal Address
              </label>
            </div>

            {/*Partner Input Postal Address */}
            <div className="col-6 col-md-12  mb-4 ">
              <Field
                type="text"
                className="form-control inputDesign "
                id="partnerPostalAddress"
                name="partner.partnerPostalAddress"
                disabled={partner.partnerSameAsClient === true}
              />
              <ErrorMessage
                component="div"
                className="text-danger "
                name="partner.partnerPostalAddress"
              />
            </div>

            {/*Mobile Labels  Postal Address */}
            <div className="col-6 col-md-12  mb-4 d-md-none d-block">
              <label
                htmlFor="partnerPostalPostCode"
                className="form-label mt-2"
              >
                Postcode/Suburb
              </label>
            </div>

            {/*Partner Input Postal Address */}
            <div className="col-6 col-md-12  mb-4 ">
              <Field
                type="number"
                className="form-control inputDesign "
                id="partnerPostalPostCode"
                disabled={partner.partnerSameAsClient === true}
                name="partner.partnerPostalPostCode"
              />
              <ErrorMessage
                component="div"
                className="text-danger "
                name="partner.partnerPostalPostCode"
              />
            </div>

            {/*Mobile Labels Mobile Number */}
            <div className="col-6 col-md-12  mb-4 d-md-none d-block">
              <label htmlFor="partnerMobile" className="form-label mt-2">
                Mobile Number
              </label>
            </div>

            {/*Partner Input Mobile Number */}
            <div className="col-6 col-md-12  mb-4 ">
              <Field
                type="text"
                className="form-control inputDesign "
                name="partner.partnerMobile"
                id="partnerMobile"
              />
              <ErrorMessage
                component="div"
                className="text-danger "
                name="partner.partnerMobile"
              />
            </div>

            {/*Mobile Labels Home Phone */}
            <div className="col-6 col-md-12  mb-4 d-md-none d-block">
              <label htmlFor="partnerHomePhone" className="form-label mt-2">
                Home Phone
              </label>
            </div>

            {/*Partner Input Home Phone */}
            <div className="col-6 col-md-12  mb-4 ">
              <Field
                type="text"
                className="form-control inputDesign "
                id="partnerHomePhone"
                name="partner.partnerHomePhone"
              />
              <ErrorMessage
                component="div"
                className="text-danger"
                name="partner.partnerHomePhone"
              />
            </div>

            {/*Mobile Labels Work Phone */}
            <div className="col-6 col-md-12  mb-4 d-md-none d-block">
              <label htmlFor="partnerWorkPhone" className="form-label mt-2">
                Work Phone
              </label>
            </div>

            {/*Partner Input Work Phone */}
            <div className="col-6 col-md-12  mb-4 ">
              <Field
                type="text"
                className="form-control inputDesign "
                id="partnerWorkPhone"
                name="partner.partnerWorkPhone"
              />
              <ErrorMessage
                component="div"
                className="text-danger "
                name="partner.partnerWorkPhone"
              />
            </div>

            {/*Mobile Labels Work Phone */}
            <div className="col-6 col-md-12  mb-4 d-md-none d-block">
              <label htmlFor="partnerEmail" className="form-label mt-2">
                Email
              </label>
            </div>

            {/*Partner Input Work Phone */}
            <div className="col-6 col-md-12  mb-4 ">
              <Field
                type="email"
                className="form-control inputDesign "
                name="partner.partnerEmail"
                id="partnerEmail"
              />
              <ErrorMessage
                component="div"
                className="text-danger"
                name="partner.partnerEmail"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="col-md-4"></div>
      )}
    </div>
  );
};

export default PersonalDetailsClientPartner;
