import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./businessTextStructure.css"
import plus from "./images/plus.svg";
import notebook from "./images/notebook.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BeneficiaryDetails = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let initialValues = {
    ClientDistributionCash: "No",

    // ClientInitialValue
    ClientEdit: "No",
    ClientSalaryIncome: "",
    ClientIncludeFromYearSalary: "",
    ClientupUntilYearSalary: "",
    ClientReducedSalaryIncome: "",
    ClientIndexationofSalary: "",
    ClientContributionSplitting: "No",
    ClientSpouseContribution: "No",
    ClientWithdrawsSplitting: "No",
    ClientemployerFBTStatus: "",
    ClientCostBaseofCar: "",
    ClientFBTPaidByEmployer: "No",
    ClientRunningCostsofCar: "",
    ClientIndexation: "",
    ClientIncludeFromYearIndexation: "",
    ClientUpUntilYearIndexation: "",
    ClientOtherSalary: "",
    ClientGSTStatus: "",
    ClientIncludeFromYearGST: "",
    ClientUpUntilYearGST: "",

    // ClientInitialValue
    PartnerEdit: "No",
    PartnerSalaryIncome: "",
    PartnerIncludeFromYearSalary: "",
    PartnerupUntilYearSalary: "",
    PartnerReducedSalaryIncome: "",
    PartnerIndexationofSalary: "",
    PartnerApplySalaryPackaging: "No",
    PartneremployerFBTStatus: "",
    PartnerCostBaseofCar: "",
    PartnerFBTPaidByEmployer: "No",
    PartnerRunningCostsofCar: "",
    PartnerIndexation: "",
    PartnerIncludeFromYearIndexation: "",
    PartnerUpUntilYearIndexation: "",
    PartnerOtherSalary: "",
    PartnerGSTStatus: "",
    PartnerIncludeFromYearGST: "",
    PartnerUpUntilYearGST: "",

    // partnerInitialValue

    // partnerInitialValue
  };

  let validationSchema = Yup.object({
    // clientValidation
    ClientSalaryIncome: Yup.number().when("ClientEdit", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number()
        .min(0, "Must be a positive number")
        .nullable(true),
    }),

    ClientIncludeFromYearSalary: Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ClientupUntilYearSalary: Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ClientReducedSalaryIncome: Yup.number().when("ClientEdit", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number()
        .min(0, "Must be a positive number")
        .nullable(true),
    }),
    ClientIndexationofSalary: Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ClientemployerFBTStatus: Yup.string().when("ClientContributionSplitting", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ClientCostBaseofCar: Yup.number().when("ClientContributionSplitting", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),

    ClientRunningCostsofCar: Yup.number().when("ClientContributionSplitting", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    ClientIndexation: Yup.string().when("ClientContributionSplitting", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ClientIncludeFromYearIndexation: Yup.string().when(
      "ClientContributionSplitting",
      {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    ClientUpUntilYearIndexation: Yup.string().when(
      "ClientContributionSplitting",
      {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    ClientOtherSalary: Yup.number().when("ClientContributionSplitting", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    ClientGSTStatus: Yup.string().when("ClientContributionSplitting", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ClientIncludeFromYearGST: Yup.string().when("ClientContributionSplitting", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ClientUpUntilYearGST: Yup.string().when("ClientContributionSplitting", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    // clientvalidation

    // partnervalidation
    PartnerSalaryIncome: Yup.number().when("PartnerEdit", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number()
        .min(0, "Must be a positive number")
        .nullable(true),
    }),

    PartnerIncludeFromYearSalary: Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    PartnerupUntilYearSalary: Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    PartnerReducedSalaryIncome: Yup.number().when("PartnerEdit", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .min(0, "Must be a positive number"),
      otherwise: Yup.number()
        .min(0, "Must be a positive number")
        .nullable(true),
    }),
    PartnerIndexationofSalary: Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    PartneremployerFBTStatus: Yup.string().when("PartnerApplySalaryPackaging", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    PartnerCostBaseofCar: Yup.number().when("PartnerApplySalaryPackaging", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),

    PartnerRunningCostsofCar: Yup.number().when("PartnerApplySalaryPackaging", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    PartnerIndexation: Yup.string().when("PartnerApplySalaryPackaging", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    PartnerIncludeFromYearIndexation: Yup.string().when(
      "PartnerApplySalaryPackaging",
      {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    PartnerUpUntilYearIndexation: Yup.string().when(
      "PartnerApplySalaryPackaging",
      {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    PartnerOtherSalary: Yup.number().when("PartnerApplySalaryPackaging", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    PartnerGSTStatus: Yup.string().when("PartnerApplySalaryPackaging", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    PartnerIncludeFromYearGST: Yup.string().when(
      "PartnerApplySalaryPackaging",
      {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    PartnerUpUntilYearGST: Yup.string().when("PartnerApplySalaryPackaging", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    // partnervalidation
  });
  let onSubmit = (values) => {
    let clientObj = {
      ClientSalaryIncome: values.ClientSalaryIncome,
      ClientIncludeFromYearSalary: values.ClientIncludeFromYearSalary,
      ClientupUntilYearSalary: values.ClientupUntilYearSalary,
      ClientReducedSalaryIncome: values.ClientReducedSalaryIncome,
      ClientIndexationofSalary: values.ClientIndexationofSalary,
      ClientContributionSplitting: values.ClientContributionSplitting,
      ClientemployerFBTStatus: values.ClientemployerFBTStatus,
      ClientCostBaseofCar: values.ClientCostBaseofCar,
      ClientFBTPaidByEmployer: values.ClientFBTPaidByEmployer,
      ClientRunningCostsofCar: values.ClientRunningCostsofCar,
      ClientIndexation: values.ClientIndexation,
      ClientIncludeFromYearIndexation: values.ClientIncludeFromYearIndexation,
      ClientUpUntilYearIndexation: values.ClientUpUntilYearIndexation,
      ClientOtherSalary: values.ClientOtherSalary,
      ClientGSTStatus: values.ClientGSTStatus,
      ClientIncludeFromYearGST: values.ClientIncludeFromYearGST,
      ClientUpUntilYearGST: values.ClientUpUntilYearGST,
    };

    let partnerObj = {
      PartnerSalaryIncome: values.PartnerSalaryIncome,
      PartnerIncludeFromYearSalary: values.PartnerIncludeFromYearSalary,
      PartnerupUntilYearSalary: values.PartnerupUntilYearSalary,
      PartnerReducedSalaryIncome: values.PartnerReducedSalaryIncome,
      PartnerIndexationofSalary: values.PartnerIndexationofSalary,
      PartnerapplySalaryPackaging: values.PartnerapplySalaryPackaging,
      PartneremployerFBTStatus: values.PartneremployerFBTStatus,
      PartnerCostBaseofCar: values.PartnerCostBaseofCar,
      PartnerFBTPaidByEmployer: values.PartnerFBTPaidByEmployer,
      PartnerRunningCostsofCar: values.PartnerRunningCostsofCar,
      PartnerIndexation: values.PartnerIndexation,
      PartnerIncludeFromYearIndexation: values.PartnerIncludeFromYearIndexation,
      PartnerUpUntilYearIndexation: values.PartnerUpUntilYearIndexation,
      PartnerOtherSalary: values.PartnerOtherSalary,
      PartnerGSTStatus: values.PartnerGSTStatus,
      PartnerIncludeFromYearGST: values.PartnerIncludeFromYearGST,
      PartnerUpUntilYearGST: values.PartnerUpUntilYearGST,
    };

    console.log("client", clientObj);
    console.log("partner", partnerObj);

    handleClose();
  };
  return (
    <>
      <label className="form-label">Beneficiary Details</label>
      <br />

      <button
        type="button"
        className=" btn btn-outline-success "
        onClick={handleShow}
      >
        <div className="iconContainer mx-1">
          <img className="img-fluid" src={plus} alt="" />
        </div>
        Enter Details
      </button>

      {/* --------------------------------------------------------------- */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        className="modal-xl"
        keyboard={false}
      >
        <Modal.Header className="text-light modalBG " closeButton>
          <Modal.Title className="fontStyle">
            Beneficiary Details
            <div className="iconContainerLg">
              <img className="img-fluid" src={notebook} alt="" />
            </div>
          </Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ values, handleChange, setFieldValue, handleBlur }) => (
            <Form>
              <Modal.Body>
                {/* ClientForm */}
                <div>
                  <div classname="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label className="form-label">Client</label>

                        {/* switch button style */}
                        <div className="form-check form-switch m-0 p-0 ">
                          <div className="radiobutton">
                            <input
                              type="radio"
                              name="ClientEdit"
                              id="ClientEditopt1"
                              onChange={handleChange}
                              value="Yes"
                              checked={values.ClientEdit == "Yes"}
                            />
                            <label htmlFor="ClientEditopt1" className="label1">
                              <span>YES</span>
                            </label>
                            <input
                              type="radio"
                              name="ClientEdit"
                              id="ClientEditopt2"
                              onChange={handleChange}
                              value="No"
                              checked={values.ClientEdit == "No"}
                            />
                            <label htmlFor="ClientEditopt2" className="label2">
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                        {/* switch button style */}
                      </div>
                    </div>
                  </div>

                  {/* First Row */}

                  <div className="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientBeneficiaryAccounts"
                          className="form-label"
                        >
                          % of Beneficiary Accounts
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientBeneficiaryAccounts"
                          name="ClientBeneficiaryAccounts"
                          placeholder="% of Beneficiary Accounts"
                          disabled={values.ClientEdit === "Yes" ? false : true}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="ClientBeneficiaryAccounts"
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientTotalBeneficiaryAccounts"
                          className="form-label"
                        >
                          Total of Beneficiary Accounts
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientTotalBeneficiaryAccounts"
                          name="ClientTotalBeneficiaryAccounts"
                          placeholder="Total of Beneficiary Accounts"
                          disabled
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="ClientTotalBeneficiaryAccounts"
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientDistributionIncome"
                          className="form-label"
                        >
                          Distribution of Income/CGT
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="ClientDistributionIncome"
                          name="ClientDistributionIncome"
                          placeholder="Distribution of Income/CGT"
                          disabled={values.ClientEdit === "Yes" ? false : true}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="ClientDistributionIncome"
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label className="form-label">
                          Distribution Taken as Cash
                        </label>

                        {/* switch button style */}
                        <div className="form-check form-switch m-0 p-0 ">
                          <div className="radiobutton">
                            <input
                              type="radio"
                              name="ClientDistributionCash"
                              id="ClientDistributionCash1"
                              disabled={
                                values.ClientEdit === "Yes" ? false : true
                              }
                              onChange={handleChange}
                              value="Yes"
                              checked={values.ClientDistributionCash == "Yes"}
                            />
                            <label
                              htmlFor="ClientDistributionCash1"
                              className="label1"
                            >
                              <span>YES</span>
                            </label>
                            <input
                              type="radio"
                              name="ClientDistributionCash"
                              id="ClientDistributionCash2"
                              disabled={
                                values.ClientEdit === "Yes" ? false : true
                              }
                              onChange={handleChange}
                              value="No"
                              checked={values.ClientDistributionCash == "No"}
                            />
                            <label
                              htmlFor="ClientDistributionCash2"
                              className="label2"
                            >
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                        {/* switch button style */}
                      </div>
                    </div>
                  </div>

                  {/* Second Row */}

                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          htmlFor="ClientDistributionCashYear"
                          className="form-label"
                        >
                          Distribution Taken as Cash from Year
                        </label>
                        <Field
                          id="ClientDistributionCashYear"
                          name="ClientDistributionCashYear"
                          className="form-select shadow  inputDesign"
                          as="select"
                          disabled={values.ClientEdit === "Yes" ? false : true}
                        >
                          <option value="">Select</option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                          <option value="17">17</option>
                          <option value="18">18</option>
                          <option value="19">19</option>
                          <option value="20">20</option>
                          <option value="21">21</option>
                          <option value="22">22</option>
                          <option value="23">23</option>
                          <option value="24">24</option>
                          <option value="25">25</option>
                          <option value="26">26</option>
                          <option value="27">27</option>
                          <option value="28">28</option>
                          <option value="29">29</option>
                          <option value="30">30</option>
                        </Field>
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="ClientDistributionCashYear"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ClientForm */}

                <hr />
                {/* partnerForm */}
                <div>
                  <div classname="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label className="form-label">Partner</label>

                        {/* switch button style */}
                        <div className="form-check form-switch m-0 p-0 ">
                          <div className="radiobutton">
                            <input
                              type="radio"
                              name="PartnerEdit"
                              id="PartnerEditopt1"
                              onChange={handleChange}
                              value="Yes"
                              checked={values.PartnerEdit == "Yes"}
                            />
                            <label htmlFor="PartnerEditopt1" className="label1">
                              <span>YES</span>
                            </label>
                            <input
                              type="radio"
                              name="PartnerEdit"
                              id="PartnerEditopt2"
                              onChange={handleChange}
                              value="No"
                              checked={values.PartnerEdit == "No"}
                            />
                            <label htmlFor="PartnerEditopt2" className="label2">
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                        {/* switch button style */}
                      </div>
                    </div>
                  </div>

                  {/* First Row */}

                  <div className="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerBeneficiaryAccounts"
                          className="form-label"
                        >
                          % of Beneficiary Accounts
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerBeneficiaryAccounts"
                          name="PartnerBeneficiaryAccounts"
                          placeholder="% of Beneficiary Accounts"
                          disabled
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="PartnerBeneficiaryAccounts"
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerTotalBeneficiaryAccounts"
                          className="form-label"
                        >
                          Total of Beneficiary Accounts
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerTotalBeneficiaryAccounts"
                          name="PartnerTotalBeneficiaryAccounts"
                          placeholder="Total of Beneficiary Accounts"
                          disabled
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="PartnerTotalBeneficiaryAccounts"
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="PartnerDistributionIncome"
                          className="form-label"
                        >
                          Distribution of Income/CGT
                        </label>
                        <Field
                          type="number"
                          className="form-control inputDesign  shadow"
                          id="PartnerDistributionIncome"
                          name="PartnerDistributionIncome"
                          placeholder="Distribution of Income/CGT"
                          disabled
                        />
                        <ErrorMessage
                          component="div"
                          className="text-danger fw-bold"
                          name="PartnerDistributionIncome"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* PartnerForm */}
              </Modal.Body>

              <Modal.Footer>
                <div className="col-md-12">
                  <button
                    type="submit"
                    className="float-end btn w-25  bgColor modalBtn"
                    // onClick={handleClose}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="float-end btn w-25  btn-outline  backBtn mx-3"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>

      {/* --------------------------------------------------------------- */}
    </>
  );
};

export default BeneficiaryDetails;
