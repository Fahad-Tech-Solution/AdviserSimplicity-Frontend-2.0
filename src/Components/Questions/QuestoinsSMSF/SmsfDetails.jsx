// SmsfDetails.jsx
// Single-file refactor of original SmsfDetails using the AntD table/modal pattern
// - Uses DynamicTableForInputsSection("antd") HOC for consistent AntD UI (reused from sample).
// - All inner modals (Directors + Directors of Bare Trust) are implemented inline and rendered via InnerModal.
// - Formik + Recoil + Post/Patch logic preserved.
// - Comments added across major sections for maintainability.

import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { Button, InputGroup, Row } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import DatePicker from "react-datepicker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  validateName,
} from "../../Assets/Api/Api";

import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import DynamicYesNo from "../FinancialInvestments/QuestionsDetail/DynamicYesNo";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection"; // adjust path if needed

// Reuse AntD HOC (same pattern as sample)
const AntDTableHOC = DynamicTableForInputsSection("antd");

/* =============================================================================
   SECTION: SmsfDetails Component
   - main component exported as default
   - uses Formik for form handling
   - uses Recoil to read/update QuestionDetail
   ============================================================================= */
const SmsfDetails = (props) => {
  // -----------------------------
  // RECOIL / LOCAL STATE
  // -----------------------------
  const questionDetail = useRecoilValue(QuestionDetail);
  const [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

  // Flags for opening inner modals
  const [flagStateDirectors, setFlagStateDirectors] = useState(false);
  const [flagStateBareTrust, setFlagStateBareTrust] = useState(false);

  // The modalObject describes which inner modal to open and context needed
  const [modalObject, setModalObject] = useState({});

  // Default SMSFDetails structure (fallback to empty arrays/objects like original)
  const SMSFDetails =
    questionDetail?.SMSFDetails &&
    Object.keys(questionDetail.SMSFDetails).length > 0
      ? questionDetail.SMSFDetails
      : {
          client: [],
          partner: [],
          joint: [],
        };

  // Default URL from recoil (for API)
  const DefaultUrl = useRecoilValue(defaultUrl);

  // -----------------------------
  // FORM: initialValues (match original field names)
  // -----------------------------
  const initialValues = {
    fundName: "",
    ABN: "",
    registeredOffice: "",
    placeOfBusiness: "",
    establishmentDate: "",
    trusteeType: "",
    directorsOfCorporateTrustee: [], // array of { directorName }
    trusteeName: "",
    nameOfAccountant: "",
    ACN: "",
    bareTrust: "No",
    directorsOfBareTrust: {},
  };

  /* =============================================================================
     SECTION: fillInitialValues
     - populate form fields from SMSFDetails if available
     - called on mount and when relevant data changes
     ============================================================================= */
  const fillInitialValues = (setFieldValue) => {
    // SMSFOwner contains the form-like values in original file
    const data = SMSFDetails?.SMSFOwner || {};

    // Set known keys from data into Formik fields
    // Use defensive fallback to '' when value missing
    Object.keys(initialValues).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        setFieldValue(key, data[key] ?? initialValues[key]);
      } else {
        // If some nested objects exist, set accordingly
        if (
          key === "directorsOfCorporateTrustee" &&
          Array.isArray(data.directorsOfCorporateTrustee)
        ) {
          setFieldValue(
            "directorsOfCorporateTrustee",
            data.directorsOfCorporateTrustee
          );
        }
        if (key === "directorsOfBareTrust" && data.directorsOfBareTrust) {
          setFieldValue("directorsOfBareTrust", data.directorsOfBareTrust);
        }
      }
    });
  };

  /* =============================================================================
     SECTION: handleInnerModal
     - open the relevant inner modal and set modalObject
     ============================================================================= */
  const handleInnerModal = (title, key, mainKey, values) => {
    setModalObject({
      title,
      key,
      mainKey,
      values, // parent form values snapshot
    });

    // open the correct flag based on key
    if (key === "directorsOfCorporateTrustee") {
      setFlagStateDirectors(true);
    } else if (key === "directorsOfBareTrust") {
      setFlagStateBareTrust(true);
    }
  };

  /* =============================================================================
     SECTION: onSubmit
     - preserves original Post/Patch behavior and payload structure
     - constructs obj.SMSFOwner = values and sends to backend
     ============================================================================= */
  const onSubmit = async (values) => {
    // Build object same as original
    let obj = {
      clientFK: localStorage.getItem("UserID"),
      SMSFOwner: values,
    };

    try {
      // Determine if previously saved by inspecting SMSFDetails.clientFK (as original)
      const existing = SMSFDetails?.clientFK || "";

      let res;
      if (!existing) {
        res = await PostAxios(`${DefaultUrl}/api/SMSFDetails/Add`, obj);
      } else {
        obj._id = SMSFDetails._id;
        res = await PatchAxios(`${DefaultUrl}/api/SMSFDetails/Update`, obj);
      }

      if (res) {
        // Update Recoil state similarly to original
        const updatedData = { ...questionDetail, SMSFDetails: res };
        setQuestionDetail(updatedData);
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        `Data of "${props.modalObject?.title || "SMSF Details"}" is Saved`
      );

      // Reset parent modal flag if passed
      if (props.flagState) {
        props.setFlagState(false);
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Data of "${
          props.modalObject?.title || "SMSF Details"
        }" is not Saved Please! try again`
      );
    }
  };

  /* =============================================================================
     SECTION: AntD Table Columns
     - configure columns for AntD table HOC (single-row style table)
     - includes inputs (Field / DatePicker / select) and buttons to open inner modals
     ============================================================================= */
  const columns = [
    {
      title: "No#",
      dataIndex: "owner",
      key: "owner",
      render: (_, __, i) => i + 1,
      width: 60,
    },
    {
      title: "Fund Name",
      dataIndex: "fundName",
      key: "fundName",
      type: "text",
      placeholder: "Fund Name",
      width: 200,
    },
    {
      title: "ABN",
      dataIndex: "ABN",
      key: "ABN",
      type: "number",
      placeholder: "ABN",
      width: 150,
    },
    {
      title: "Registered Office",
      dataIndex: "registeredOffice",
      key: "registeredOffice",
      type: "text",
      placeholder: "Registered Office",
      width: 250,
    },
    {
      title: "Place Of Business",
      dataIndex: "placeOfBusiness",
      key: "placeOfBusiness",
      type: "text",
      placeholder: "Place Of Business",
      width: 220,
    },
    {
      title: "Establishment Date",
      dataIndex: "establishmentDate",
      key: "establishmentDate",
      type: "antdate",
      placeholder: "dd/mm/yyyy",
      width: 170,
    },
    {
      title: "Trustee Type",
      dataIndex: "trusteeType",
      key: "trusteeType",
      type: "selectModal",
      options: ["Corporate", "Individual"].map((v) => ({ label: v, value: v })),
      placeholder: "Trustee Type",
      width: 180,
      ModalOption: ["Corporate", "Individual"], // 👈 add this — triggers modal icon when selected
      innerModalTitle: "Corporate Trustee Details", // optional but recommended
    },
    {
      title: "Trustee Name",
      dataIndex: "trusteeName",
      key: "trusteeName",
      type: "text",
      placeholder: "Trustee Name",
      width: 220,
    },
    {
      title: "ACN",
      dataIndex: "ACN",
      key: "ACN",
      type: "number",
      placeholder: "ACN",
      width: 150,
    },
    {
      title: "Bare Trust",
      dataIndex: "bareTrust",
      key: "bareTrust",
      type: "yesno",
      placeholder: "Bare Trust",
      width: 120,
      // we'll use the AntDHOC to render a Yes/No control or call back to render custom
      // The AntD HOC in your sample already knows how to render various `type` values.
    },
    {
      title: "Name of Accountant",
      dataIndex: "nameOfAccountant",
      key: "nameOfAccountant",
      type: "text",
      placeholder: "Name of Accountant",
      width: 220,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 120,
      // We'll use this column to hold modal-opening buttons (Directors, Bare Trust)
      // The AntD HOC expects config and passes setFieldValue & values so we can act
      render: (text, record, index, allProps) => {
        // This function will be handled by AntD HOC; we keep a placeholder in config.
        return null;
      },
    },
  ];

  /* =============================================================================
     SECTION: Render
     - Formik wraps the form
     - AntD table HOC is used to render the row of inputs consistent with sample file
     - InnerModal is used to show inner forms when needed
     ============================================================================= */
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        // Populate form initial values when component mounts or SMSFDetails changes
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [/* run when SMSFDetails changes */ questionDetail?.SMSFDetails]);

        // Prepare table data — single-row table to match original layout
        const tableData = useMemo(() => {
          // We'll produce a single row reflecting form values
          return [
            {
              key: "smsf-0",
              owner: 1,
              fundName: values.fundName,
              ABN: values.ABN,
              registeredOffice: values.registeredOffice,
              placeOfBusiness: values.placeOfBusiness,
              establishmentDate: values.establishmentDate,
              trusteeType: values.trusteeType,
              trusteeName: values.trusteeName,
              ACN: values.ACN,
              bareTrust: values.bareTrust,
              nameOfAccountant: values.nameOfAccountant,
            },
          ];
        }, [
          values.fundName,
          values.ABN,
          values.registeredOffice,
          values.placeOfBusiness,
          values.establishmentDate,
          values.trusteeType,
          values.trusteeName,
          values.ACN,
          values.bareTrust,
          values.nameOfAccountant,
        ]);

        /* =============================================================================
           SECTION: Inner modal children components
           - DirectorsInner: form to edit directorsOfCorporateTrustee
           - BareTrustInner: form to edit directorsOfBareTrust / bare trustee info
           - Both components are rendered within InnerModal and receive setFieldValue etc.
           ============================================================================= */

        // DirectorsInner: replaces previous InnerDirectors
        const DirectorsInner = ({ setFieldValue, closeModal }) => {
          // initial form values derived from current modalObject.values or from values
          const innerInitial = {
            NumberOfDirectors:
              (values.directorsOfCorporateTrustee || []).length > 0
                ? (values.directorsOfCorporateTrustee || []).length
                : "",
          };

          const innerHandleSubmit = (innerValues) => {
            // Build array of director objects from inner form fields
            const count = parseInt(innerValues.NumberOfDirectors || 0, 10) || 0;
            const newEntries = [];
            for (let i = 0; i < count; i++) {
              newEntries.push({
                directorName: innerValues[`directorName${i}`] || "",
              });
            }

            // Set parent form field
            setFieldValue("directorsOfCorporateTrustee", newEntries);

            // close modal
            closeModal();
          };

          return (
            <Formik
              initialValues={innerInitial}
              onSubmit={innerHandleSubmit}
              enableReinitialize
            >
              {({ values: iv, setFieldValue: setInnerFieldValue }) => {
                useEffect(() => {
                  // fill initial director names if present
                  const arr = values.directorsOfCorporateTrustee || [];
                  setInnerFieldValue(
                    "NumberOfDirectors",
                    arr.length > 0 ? arr.length : ""
                  );
                  arr.forEach((d, idx) => {
                    setInnerFieldValue(
                      `directorName${idx}`,
                      d?.directorName || ""
                    );
                  });
                }, []);

                return (
                  <Form>
                    <div className="px-3">
                      <div className="d-flex gap-2 align-items-center">
                        <label>
                          How many directors does the Corporate Trustee have :
                        </label>
                        <div style={{ width: "40%" }}>
                          <Field
                            type="number"
                            id={`NumberOfDirectors`}
                            name={`NumberOfDirectors`}
                            className="form-control inputDesignDoubleInput"
                            onChange={(e) => {
                              const value =
                                e.target.value > 6 ? 6 : e.target.value;
                              setInnerFieldValue("NumberOfDirectors", value);
                            }}
                          />
                        </div>
                      </div>

                      {iv.NumberOfDirectors && (
                        <div className="mt-3">
                          <table className="table table-striped table-bordered">
                            <thead>
                              <tr>
                                <th>No#</th>
                                <th>Director Name</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Array.from({ length: iv.NumberOfDirectors }).map(
                                (_, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                      <Field
                                        type="text"
                                        placeholder="Director Name"
                                        id={`directorName${index}`}
                                        name={`directorName${index}`}
                                        className="form-control inputDesignDoubleInput"
                                        onChange={(e) => {
                                          const v = validateName(
                                            e.target.value
                                          );
                                          setInnerFieldValue(
                                            `directorName${index}`,
                                            v
                                          );
                                        }}
                                      />
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}

                      <div className="d-flex justify-content-end gap-2 mt-3">
                        <Button variant="secondary" onClick={closeModal}>
                          Close
                        </Button>
                        <Button type="submit" className="btn bgColor modalBtn">
                          Submit
                        </Button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          );
        };

        // BareTrustInner: replaces previous InnerDirectorsOfBareTrust
        const BareTrustInner = ({ setFieldValue, closeModal }) => {
          const innerInitial = {
            NumberOfDirectors: "",
            bareTrusteeName: "",
            ACN: "",
          };

          const innerHandleSubmit = (innerValues) => {
            const count = parseInt(innerValues.NumberOfDirectors || 0, 10) || 0;
            const newEntries = [];
            for (let i = 0; i < count; i++) {
              newEntries.push({
                directorName: innerValues[`directorName${i}`] || "",
              });
            }

            const Obj = {
              NumberOfDirectors: newEntries.length,
              bareTrusteeName: innerValues.bareTrusteeName || "",
              ACN: innerValues.ACN || "",
              directorNameArray: newEntries,
            };

            // Set in parent form
            setFieldValue("directorsOfBareTrust", Obj);

            // close modal
            closeModal();
          };

          return (
            <Formik
              initialValues={innerInitial}
              onSubmit={innerHandleSubmit}
              enableReinitialize
            >
              {({ values: iv, setFieldValue: setInnerFieldValue }) => {
                useEffect(() => {
                  // initialize from parent values if present
                  const data = values.directorsOfBareTrust || {};
                  if (Object.keys(data).length > 0) {
                    setInnerFieldValue(
                      "bareTrusteeName",
                      data.bareTrusteeName || ""
                    );
                    setInnerFieldValue("ACN", data.ACN || "");
                    if (Array.isArray(data.directorNameArray)) {
                      setInnerFieldValue(
                        "NumberOfDirectors",
                        data.directorNameArray.length || ""
                      );
                      data.directorNameArray.forEach((elem, idx) => {
                        setInnerFieldValue(
                          `directorName${idx}`,
                          elem.directorName || ""
                        );
                      });
                    }
                  } else {
                    // If no data, but directorsOfCorporateTrustee exists, we can default select options mapping later if needed
                  }
                }, []);

                return (
                  <Form>
                    <div className="px-3">
                      <div className="d-flex gap-2 align-items-center">
                        <label>
                          How many directors does the bare trust have ?
                        </label>
                        <div style={{ width: "10%" }}>
                          <Field
                            type="number"
                            id={`NumberOfDirectors`}
                            name={`NumberOfDirectors`}
                            className="form-control inputDesignDoubleInput"
                            onChange={(e) => {
                              const value =
                                e.target.value > 6 ? 6 : e.target.value;
                              setInnerFieldValue("NumberOfDirectors", value);
                            }}
                          />
                        </div>
                      </div>

                      {iv.NumberOfDirectors && (
                        <div className="mt-3">
                          <table className="table table-striped table-bordered">
                            <thead>
                              <tr>
                                <th>No#</th>
                                <th>Bare Trustee Name</th>
                                <th>ACN</th>
                                {Array.from({
                                  length: iv.NumberOfDirectors,
                                }).map((_, index) => (
                                  <th key={index}>Director {index + 1} Name</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Bare Trustee Name"
                                    id={`bareTrusteeName`}
                                    name={`bareTrusteeName`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setInnerFieldValue(
                                        "bareTrusteeName",
                                        validateName(e.target.value)
                                      );
                                    }}
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="ACN"
                                    id={`ACN`}
                                    name={`ACN`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) =>
                                      setInnerFieldValue("ACN", e.target.value)
                                    }
                                  />
                                </td>

                                {Array.from({
                                  length: iv.NumberOfDirectors,
                                }).map((_, index) => (
                                  <td key={index}>
                                    {/* If you want to map corporate trustee directors as select options (like original), you could add a select here */}
                                    <Field
                                      as="select"
                                      id={`directorName${index}`}
                                      name={`directorName${index}`}
                                      className="form-select inputDesignDoubleInput"
                                      onChange={(e) =>
                                        setInnerFieldValue(
                                          `directorName${index}`,
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option value="">Select</option>
                                      {(
                                        values.directorsOfCorporateTrustee || []
                                      ).map((elem, i) => (
                                        <option
                                          key={i}
                                          value={elem.directorName}
                                        >
                                          {elem.directorName}
                                        </option>
                                      ))}
                                    </Field>
                                  </td>
                                ))}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}

                      <div className="d-flex justify-content-end gap-2 mt-3">
                        <Button variant="secondary" onClick={closeModal}>
                          Close
                        </Button>
                        <Button type="submit" className="btn bgColor modalBtn">
                          Submit
                        </Button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          );
        };

        /* =============================================================================
           SECTION: Rendered JSX
           - uses AntD HOC to present a consistent Ant Design style for the inputs table
           - renders InnerModal instances for the two inner forms (Directors & BareTrust)
           ============================================================================= */
        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="mt-4 All_Client reportSection">
                    {/* Use the AntD Table HOC to render the single-row form table */}
                    <AntDTableHOC
                      columns={columns}
                      data={tableData}
                      values={values}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      // Provide a custom render for the Actions column via props the HOC expects.
                      // Many HOCs allow passing renderers or they will call 'func' defined in column config.
                      // We'll use column-specific func via a standard prop name 'columnCallbacks' if supported.
                      // If your HOC expects another shape, adapt the call accordingly.
                      columnCallbacks={{
                        // A callback used by the HOC to render custom content for a column row
                        actions: (record) => {
                          return (
                            <div className="d-flex gap-1 justify-content-center">
                              <Button
                                className="btn bgColor modalBtn border-0"
                                onClick={() =>
                                  handleInnerModal(
                                    "Business as Trusts",
                                    "directorsOfCorporateTrustee",
                                    "directorsOfCorporateTrustee",
                                    values
                                  )
                                }
                                title="Directors"
                              >
                                <FontAwesomeIcon
                                  icon={faArrowUpRightFromSquare}
                                />
                              </Button>

                              {/* Bare Trust button — only show if trusteeType is Corporate */}
                              {values.trusteeType === "Corporate" && (
                                <Button
                                  className="btn bgColor modalBtn border-0"
                                  onClick={() =>
                                    // only allow opening if corporate directors exist (mimic original behavior)
                                    (values.directorsOfCorporateTrustee || [])
                                      .length > 0
                                      ? handleInnerModal(
                                          "Directors of Bare Trust",
                                          "directorsOfBareTrust",
                                          "directorsOfBareTrust",
                                          values
                                        )
                                      : openNotificationSuccess(
                                          "error",
                                          "topRight",
                                          "Error Notification",
                                          "Please! fill Corporate Directer Names First"
                                        )
                                  }
                                  title="Directors of Bare Trust"
                                >
                                  <FontAwesomeIcon
                                    icon={faArrowUpRightFromSquare}
                                  />
                                </Button>
                              )}
                            </div>
                          );
                        },
                      }}
                      isEditing={props?.isEditing}
                      setIsEditing={props?.setIsEditing}
                    />
                  </div>
                </div>
              </div>

              {/* Inner modals rendered using the InnerModal wrapper to match sample pattern */}
              <InnerModal
                modalObject={modalObject}
                setFieldValue={setFieldValue}
                setFlagState={setFlagStateDirectors}
                flagState={flagStateDirectors}
              >
                {/* Choose child content based on modalObject.key */}
                {modalObject.key === "directorsOfCorporateTrustee" ? (
                  // Pass setFieldValue & method to close modal so child can update parent
                  <DirectorsInner
                    setFieldValue={setFieldValue}
                    closeModal={() => setFlagStateDirectors(false)}
                  />
                ) : null}
              </InnerModal>

              <InnerModal
                modalObject={modalObject}
                setFieldValue={setFieldValue}
                setFlagState={setFlagStateBareTrust}
                flagState={flagStateBareTrust}
              >
                {modalObject.key === "directorsOfBareTrust" ? (
                  <BareTrustInner
                    setFieldValue={setFieldValue}
                    closeModal={() => setFlagStateBareTrust(false)}
                  />
                ) : null}
              </InnerModal>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SmsfDetails;
