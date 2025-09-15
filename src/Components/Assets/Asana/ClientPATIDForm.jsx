import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Row, Col, Input, Button, Spin, Alert, List, Select } from "antd";
import * as Yup from "yup";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import axios from "axios";
import { PostAxios, toSentenceCase } from "../Api/Api";
import { defaultUrl } from "../../../Store/Store";
import { useRecoilValue } from "recoil";
import { FaArrowRight } from "react-icons/fa";

const ClientPATIDForm = (props) => {
  const [showPATID, setShowPATID] = useState(false);
  const [storedSuccessFull, setStoredSuccessFull] = useState(false);
  const [step, setStep] = useState(1);
  const [workspaces, setWorkspaces] = useState([]);
  const [projectSpaces, setProjectSpaces] = useState([]);
  const [worSpaceUsers, setWorSpaceUsers] = useState([]);
  const [AsanaProjectDetails, setAsanaProjectDetails] = useState([]); // ✅ initialize as []
  const [loading, setLoading] = useState(false);
  
  const [apiError, setApiError] = useState("");
  let DefaultUrl = useRecoilValue(defaultUrl);

  const initialValues = {
    patID: "",
  };

  const validationSchema = Yup.object().shape({
    patID: Yup.string()
      .required("PATID is required")
      .min(10, "PATID must be at least 10 characters"),
  });

  const handleApiError = (error, defaultMsg) => {
    console.error("API Error:", error);
    return (
      error?.response?.data?.errors?.[0]?.message ||
      error?.message ||
      defaultMsg
    );
  };

  const fetchWorkspaces = async (patID) => {
    setLoading(true);
    setApiError("");
    setWorkspaces([]);
    try {
      const res = await axios.get("https://app.asana.com/api/1.0/workspaces", {
        headers: {
          Authorization: `Bearer ${patID}`,
        },
      });
      console.log(res.data);
      setWorkspaces(res.data.data || []);
    } catch (error) {
      setApiError(
        handleApiError(
          error,
          "Failed to fetch workspaces. Please check your PATID."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async (patID, workspaceId) => {
    setLoading(true);
    setApiError("");
    setProjectSpaces([]);
    try {
      const res = await axios.get(
        "https://app.asana.com/api/1.0/projects?workspace=" + workspaceId,
        {
          headers: {
            Authorization: `Bearer ${patID}`,
          },
        }
      );
      console.log(res.data);
      setProjectSpaces(res.data.data || []);
    } catch (error) {
      setApiError(
        handleApiError(
          error,
          "Failed to fetch Projects. Please check your PATID."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async (patID, workspaceId, projects) => {
    setLoading(true);
    setApiError("");
    setWorSpaceUsers([]);
    try {
      const res = await axios.get(
        "https://app.asana.com/api/1.0/users?workspace=" + workspaceId,
        {
          headers: {
            Authorization: `Bearer ${patID}`,
          },
        }
      );
      console.log(res.data);
      setWorSpaceUsers(res.data.data || []);
    } catch (error) {
      setApiError(
        handleApiError(
          error,
          "Failed to fetch Projects. Please check your PATID."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectDetails = async (patID, workspaceId, projectId) => {
    setLoading(true);
    setApiError("");
    setAsanaProjectDetails([]);
    try {
      const res = await axios.get(
        `https://app.asana.com/api/1.0/projects/${projectId}?`,
        {
          headers: {
            Authorization: `Bearer ${patID}`,
          },
        }
      );
      if (res) {
        console.log("Project Details:", res.data.data.custom_field_settings);
        setAsanaProjectDetails(res.data.data.custom_field_settings || []);
      }
    } catch (error) {
      setApiError(
        handleApiError(
          error,
          "Failed to fetch Project details. Please check your PATID or Project ID."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const StoreAllData = async (values) => {
    setLoading(true);
    setApiError("");
    console.log(values);

    // Build custom_fields object
    const customFields = Object.fromEntries(
      values.fieldsMap.map((gid) => {
        const customFieldObj = AsanaProjectDetails.find(
          (cf) => cf.custom_field.gid === gid
        );
        return [
          values?.[`appFieldMapping-${gid}`], // key
          customFieldObj || {}, // value (full object instead of gid)
        ];
      })
    );

    // Final object to send
    const Obj = {
      custom_fields: customFields,
      patID: values.patID,
      workspace: values.workspace,
      projects: [values.projects],
      assignee: values.assignee,
    };
    console.log(JSON.stringify(Obj));
    // return false;
    try {
      const res = await PostAxios(DefaultUrl + "/api/CDFAsana/Add", Obj);
      console.log(res);
      setStoredSuccessFull(true);
    } catch (error) {
      setApiError(
        handleApiError(error, "Failed to submit data. Please check your input.")
      );
    } finally {
      setLoading(false);
      if (props.flagState) {
        setTimeout(() => {
          props.setFlagState(false);
        }, 3000);
      }
    }
  };

  const LoadingState = ({ tip }) => (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "40vh", width: "100%" }}
    >
      <Spin size="large" tip={tip} />
    </div>
  );

  const ErrorState = ({ error }) =>
    error && (
      <Alert
        type="error"
        message="Error"
        description={error}
        showIcon
        style={{ marginBottom: "1rem" }}
      />
    );

  const SelectField = ({ value, options, placeholder, onChange, mode }) => (
    <Select
      showSearch
      allowClear={mode === "multiple"}
      mode={mode}
      value={value}
      style={{ width: "100%" }}
      placeholder={placeholder}
      optionFilterProp="label"
      filterOption={(input, option) =>
        option?.label?.toLowerCase().includes(input.toLowerCase())
      }
      filterSort={(a, b) =>
        (a?.label ?? "")
          .toLowerCase()
          .localeCompare((b?.label ?? "").toLowerCase())
      }
      onChange={onChange}
      options={options}
      getPopupContainer={(trigger) => trigger.parentNode}
    />
  );

  const SaveButton = ({ disabled }) => (
    <div className="mt-3 w-100">
      <Button
        disabled={disabled}
        type="primary"
        htmlType="submit"
        className="float-end"
      >
        Save
      </Button>
    </div>
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        if (step === 1) {
          setStep(2);
          fetchWorkspaces(values.patID);
        } else if (step === 2) {
          // Final submission logic here
          console.log("Selected Workspace ID:", values.workspace);
          setStep(3);
          fetchProjects(values.patID, values.workspace);
        } else if (step === 3) {
          // Final submission logic here
          console.log("Selected Project Id:", values.projects);
          setStep(4);
          fetchUsers(values.patID, values.workspace, values.projects);
        } else if (step === 4) {
          // Final submission logic here
          console.log("Selected assignee ID :", values.assignee);
          setStep(5);
          fetchProjectDetails(values.patID, values.workspace, values.projects);
        } else if (step === 5) {
          // Final submission logic here
          console.log("Selected assignee ID :", values.assignee);
          setStep(6);
          StoreAllData(values);
        }
      }}
      validationSchema={validationSchema}
    >
      {({ handleChange, setFieldValue, values }) => (
        <Form>
          {/* STEP 1: Ask for PAT ID */}
          {step === 1 && (
            <>
              <div className="mb-3">
                <h5>How to fetch your Asana PATID?</h5>
                <ul>
                  <li>Log in to your Asana account.</li>
                  <li>
                    Go to{" "}
                    <b>My Profile Settings → Apps → Manage Developer Apps</b>.
                  </li>
                  <li>Generate a new Personal Access Token (PAT).</li>
                  <li>Copy the generated PATID and paste it below.</li>
                </ul>
              </div>

              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <label
                    htmlFor="patID"
                    className="fw-bold w-100"
                    style={{ fontSize: "15px" }}
                  >
                    Asana PATID:
                  </label>
                  <div style={{ position: "relative" }}>
                    <Field name="patID">
                      {({ field }) => (
                        <Input
                          {...field}
                          id="patID"
                          type={showPATID ? "text" : "password"}
                          placeholder="Enter your Asana PATID"
                          className="w-100 pe-4"
                          size="large"
                          onChange={handleChange}
                        />
                      )}
                    </Field>
                    <span
                      style={{
                        position: "absolute",
                        right: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowPATID((prev) => !prev)}
                    >
                      {showPATID ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    </span>
                  </div>
                  <ErrorMessage
                    name="patID"
                    component="div"
                    className="text-danger mt-1"
                  />
                </Col>
              </Row>

              <SaveButton />
            </>
          )}

          {/* STEP 2: Show Workspaces */}
          {step === 2 && (
            <>
              {loading && <LoadingState tip="Loading workspaces..." />}
              <ErrorState error={apiError} />

              {!loading &&
                !apiError &&
                (workspaces.length > 0 ? (
                  <>
                    <h5>Find your Asana workspaces</h5>
                    <SelectField
                      value={values.workspace}
                      options={workspaces.map((item) => ({
                        value: item.gid,
                        label: `${toSentenceCase(item.name)} (${item.gid})`,
                      }))}
                      placeholder="Search to Select"
                      onChange={(val) => setFieldValue("workspace", val)}
                    />
                    <SaveButton disabled={!values.workspace} />
                  </>
                ) : (
                  <div>No workspaces found for this PATID.</div>
                ))}
            </>
          )}

          {/* STEP 3: Show Projects */}
          {step === 3 && (
            <>
              {loading && <LoadingState tip="Loading Projects..." />}
              <ErrorState error={apiError} />

              {!loading &&
                !apiError &&
                (projectSpaces.length > 0 ? (
                  <>
                    <h5>Find your Asana projects:</h5>
                    <SelectField
                      value={values.projects}
                      options={projectSpaces.map((item) => ({
                        value: item.gid,
                        label: `${toSentenceCase(item.name)} (${item.gid})`,
                      }))}
                      placeholder="Search to Select"
                      onChange={(val) => setFieldValue("projects", val)}
                    />
                    <SaveButton disabled={!values.projects} />
                  </>
                ) : (
                  <div>No projects found for this PATID.</div>
                ))}
            </>
          )}

          {/* STEP 4: Show Users */}
          {step === 4 && (
            <>
              {loading && <LoadingState tip="Loading Users..." />}
              <ErrorState error={apiError} />

              {!loading &&
                !apiError &&
                (worSpaceUsers.length > 0 ? (
                  <>
                    <h5>Select the Asana users you want to assign tasks to.</h5>
                    <SelectField
                      value={values.assignee}
                      options={worSpaceUsers.map((item) => ({
                        value: item.gid,
                        label: `${toSentenceCase(item.name)} (${item.gid})`,
                      }))}
                      placeholder="Search to Select"
                      onChange={(val) => setFieldValue("assignee", val)}
                    />
                    <SaveButton disabled={!values.assignee} />
                  </>
                ) : (
                  <div>No Users Found in Project WorkSpace.</div>
                ))}
            </>
          )}

          {/* STEP 5: Show Custom Fields */}
          {step === 5 && (
            <>
              {loading && <LoadingState tip="Loading Custom Fields..." />}
              <ErrorState error={apiError} />

              {!loading &&
                !apiError &&
                (AsanaProjectDetails.length > 0 ? (
                  <>
                    <h5>Asana Custom Fields</h5>
                    <SelectField
                      mode="multiple"
                      value={values.fieldsMap}
                      options={AsanaProjectDetails.map((item) => ({
                        value: item.custom_field.gid,
                        label: `${toSentenceCase(item.custom_field.name)} (${
                          item.custom_field.gid
                        })`,
                      }))}
                      placeholder="Search to Select"
                      onChange={(val) => setFieldValue("fieldsMap", val)}
                    />

                    {values.fieldsMap?.map((gid) => {
                      const field = AsanaProjectDetails.find(
                        (f) => f.custom_field.gid === gid
                      );
                      return (
                        <div
                          key={gid}
                          className="row mt-3 justify-content-between align-items-center"
                        >
                          <div className="col-4">
                            <strong>
                              {field?.custom_field.name || "Unknown Field"}
                            </strong>
                          </div>
                          <div className="col-2">
                            <FaArrowRight />
                          </div>
                          <div className="col-4">
                            <Field
                              as="select"
                              name={`appFieldMapping-${gid}`}
                              className="form-select"
                              onChange={(e) =>
                                setFieldValue(
                                  `appFieldMapping-${gid}`,
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select App Field</option>
                              <option value="salutation">Salutation</option>
                              <option value="firstName">First Name</option>
                              <option value="middleName">Middle Name</option>
                              <option value="lastName">Last Name</option>
                              <option value="preferredName">
                                Preferred Name
                              </option>
                              <option value="fullLegalName">
                                Full Legal Name
                              </option>
                              <option value="gender">Gender</option>
                              <option value="dateOfBirth">Date of Birth</option>
                              <option value="age">Age</option>
                              <option value="email">Email</option>
                              <option value="phoneNumber">Phone Number</option>
                              <option value="relationshipStatus">
                                Relationship Status
                              </option>
                              <option value="occupation">Occupation</option>
                              <option value="address">Address</option>
                            </Field>
                          </div>
                        </div>
                      );
                    })}

                    <SaveButton disabled={!values.fieldsMap?.length} />
                  </>
                ) : (
                  <div>No Custom Fields Found in your Asana Project.</div>
                ))}
            </>
          )}

          {/* STEP 6: Stored Successfully */}
          {step === 6 && (
            <>
              <h5>Asana Details Storing</h5>
              {loading && <LoadingState tip="Saving..." />}
              {!loading && storedSuccessFull && (
                <Alert
                  type="success"
                  message="Success"
                  description="Asana details stored successfully!"
                  showIcon
                  style={{ marginBottom: "1rem" }}
                />
              )}
              <ErrorState error={apiError} />
            </>
          )}
          
        </Form>
      )}
    </Formik>
  );
};

export default ClientPATIDForm;
