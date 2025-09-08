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
        error?.response?.data?.errors?.[0]?.message ||
          "Failed to fetch workspaces. Please check your PATID."
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
        error?.response?.data?.errors?.[0]?.message ||
          "Failed to fetch Projects. Please check your PATID."
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
        error?.response?.data?.errors?.[0]?.message ||
          "Failed to fetch Projects. Please check your PATID."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectDetails = async (patID, workspaceId, projectId) => {
    setLoading(true);
    setApiError("");
    setAsanaProjectDetails(null);
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
        setAsanaProjectDetails(res.data.data.custom_field_settings || null);
      }
    } catch (error) {
      setApiError(
        error?.response?.data?.errors?.[0]?.message ||
          "Failed to fetch Project details. Please check your PATID or Project ID."
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
        error?.response?.data?.errors?.[0]?.message ||
          "Failed to submit data. Please check your input."
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

              <div className="mt-3 w-100">
                <Button type="primary" htmlType="submit" className="float-end">
                  Save
                </Button>
              </div>
            </>
          )}

          {/* STEP 2: Show Workspaces */}
          {step === 2 && (
            <div>
              {loading && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "40vh", // ensures vertical centering
                    width: "100%",
                  }}
                >
                  <Spin size="large" tip="Loading workspaces..." />
                </div>
              )}

              {apiError && (
                <Alert
                  type="error"
                  message="Error"
                  description={apiError}
                  showIcon
                  style={{ marginBottom: "1rem" }}
                />
              )}

              {!loading && !apiError && workspaces.length > 0 && (
                <>
                  <h5>Find your Asana workspaces</h5>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="w-100">
                      <Select
                        showSearch
                        value={values.workspace}
                        style={{ width: "100%" }}
                        placeholder="Search to Select"
                        optionFilterProp="label"
                        filterOption={(input, option) =>
                          option?.label
                            ?.toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        onChange={(val) => {
                          setFieldValue("workspace", val);
                        }}
                        options={workspaces.map((item) => ({
                          value: item.gid,
                          label: `${toSentenceCase(item.name)} (${item.gid})`,
                        }))}
                        // 👇 this makes dropdown render inside the modal
                        getPopupContainer={(trigger) => trigger.parentNode}
                      />
                    </div>
                  </div>

                  <div className="mt-3 w-100">
                    <Button
                      disabled={!values.workspace}
                      type="primary"
                      htmlType="submit"
                      className="float-end"
                    >
                      Save
                    </Button>
                  </div>
                </>
              )}

              {!loading && !apiError && workspaces.length === 0 && (
                <div>No workspaces found for this PATID.</div>
              )}
            </div>
          )}

          {/* STEP 3: Show Projects */}
          {step === 3 && (
            <div>
              {loading && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "40vh", // ensures vertical centering
                    width: "100%",
                  }}
                >
                  <Spin size="large" tip="Loading Projects..." />
                </div>
              )}

              {apiError && (
                <Alert
                  type="error"
                  message="Error"
                  description={apiError}
                  showIcon
                  style={{ marginBottom: "1rem" }}
                />
              )}

              {!loading && !apiError && projectSpaces.length > 0 && (
                <>
                  <h5>Find your Asana projects:</h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="w-100">
                      <Select
                        showSearch
                        value={values.projects}
                        style={{ width: "100%" }}
                        placeholder="Search to Select"
                        optionFilterProp="label"
                        filterOption={(input, option) =>
                          option?.label
                            ?.toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        onChange={(val) => {
                          setFieldValue("projects", val);
                        }}
                        options={projectSpaces.map((item) => ({
                          value: item.gid,
                          label: `${toSentenceCase(item.name)} (${item.gid})`,
                        }))}
                        // 👇 this makes dropdown render inside the modalprojects
                        getPopupContainer={(trigger) => trigger.parentNode}
                      />
                    </div>
                  </div>

                  <div className="mt-3 w-100">
                    <Button
                      disabled={!values.projects}
                      type="primary"
                      htmlType="submit"
                      className="float-end"
                    >
                      Save
                    </Button>
                  </div>
                </>
              )}

              {!loading && !apiError && workspaces.length === 0 && (
                <div>No workspaces found for this PATID.</div>
              )}
            </div>
          )}

          {/* STEP 4: Show Users */}
          {step === 4 && (
            <div>
              {loading && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "40vh", // ensures vertical centering
                    width: "100%",
                  }}
                >
                  <Spin size="large" tip="Loading Projects..." />
                </div>
              )}

              {apiError && (
                <Alert
                  type="error"
                  message="Error"
                  description={apiError}
                  showIcon
                  style={{ marginBottom: "1rem" }}
                />
              )}

              {!loading && !apiError && worSpaceUsers.length > 0 && (
                <>
                  <h5>Select the Asana users you want to assign tasks to.</h5>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="w-100">
                      <Select
                        showSearch
                        value={values.assignee}
                        style={{ width: "100%" }}
                        placeholder="Search to Select"
                        optionFilterProp="label"
                        filterOption={(input, option) =>
                          option?.label
                            ?.toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        onChange={(val) => {
                          setFieldValue("assignee", val);
                        }}
                        options={worSpaceUsers.map((item) => ({
                          value: item.gid,
                          label: `${toSentenceCase(item.name)} (${item.gid})`,
                        }))}
                        // 👇 this makes dropdown render inside the modalprojectsassignee
                        getPopupContainer={(trigger) => trigger.parentNode}
                      />
                    </div>
                  </div>
                  <div className="mt-3 w-100">
                    <Button
                      disabled={!values.assignee}
                      type="primary"
                      htmlType="submit"
                      className="float-end"
                    >
                      Save
                    </Button>
                  </div>
                </>
              )}

              {!loading && !apiError && workspaces.length === 0 && (
                <div>No workspaces found for this PATID.</div>
              )}
            </div>
          )}

          {/* STEP 5: Show Custom Fields */}
          {step === 5 && (
            <div>
              {loading && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "40vh", // ensures vertical centering
                    width: "100%",
                  }}
                >
                  <Spin siz e="large" tip="Loading Projects..." />
                </div>
              )}

              {apiError && (
                <Alert
                  type="error"
                  message="Error"
                  description={apiError}
                  showIcon
                  style={{ marginBottom: "1rem" }}
                />
              )}

              {!loading && !apiError && AsanaProjectDetails.length > 0 && (
                <>
                  <h5>Asana Custome Fields</h5>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="w-100">
                      <Select
                        showSearch
                        allowClear
                        style={{ width: "100%" }}
                        value={values.fieldsMap}
                        placeholder="Search to Select"
                        optionFilterProp="label"
                        mode="multiple"
                        filterOption={(input, option) =>
                          option?.label
                            ?.toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        onChange={(val) => {
                          setFieldValue("fieldsMap", val);
                        }}
                        options={
                          Array.isArray(AsanaProjectDetails) &&
                          AsanaProjectDetails.length > 0
                            ? AsanaProjectDetails.map((item) => ({
                                value: item.custom_field.gid,
                                label: `${toSentenceCase(
                                  item.custom_field.name
                                )} (${item.custom_field.gid})`,
                              }))
                            : []
                        }
                        // 👇 this makes dropdown render inside the modalprojectsassignee
                        getPopupContainer={(trigger) => trigger.parentNode}
                      />
                    </div>
                  </div>

                  {Array.isArray(values?.fieldsMap) &&
                    values.fieldsMap.length > 0 &&
                    values.fieldsMap.map((gid, index) => {
                      // find the matching Asana field by gid
                      const field = AsanaProjectDetails.find(
                        (f) => f.custom_field.gid === gid
                      );

                      return (
                        <div
                          className="row mt-3 justify-content-between align-items-center "
                          key={gid}
                        >
                          {/* Left col: Asana custom field name */}
                          <div className="col-4 d-flex align-items-center">
                            <strong>
                              {field
                                ? field.custom_field.name
                                : "Unknown Field"}
                            </strong>
                          </div>

                          <div className="col-2">
                            <FaArrowRight />
                          </div>

                          {/* Right col: App fields */}
                          <div className="col-4">
                            <Field
                              as="select"
                              name={`appFieldMapping-${gid}`} // ✅ unique mapping per Asana field
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
                              <option value="fullLegalName">Full Legal Name</option>
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

                  <div className="mt-3 w-100">
                    <Button
                      disabled={!values.assignee}
                      type="primary"
                      htmlType="submit"
                      className="float-end"
                    >
                      Save
                    </Button>
                  </div>
                </>
              )}

              {!loading && !apiError && workspaces.length === 0 && (
                <div>No workspaces found for this PATID.</div>
              )}
            </div>
          )}

          {/* STEP 6: Stored Successfully */}
          {step === 6 && (
            <div>
              <h5>Asana Details Storing</h5>

              {loading && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "40vh", // ensures vertical centering
                    width: "100%",
                  }}
                >
                  <Spin size="large" tip="Loading Projects..." />
                </div>
              )}

              {!loading && !apiError && storedSuccessFull && (
                <Alert
                  type="success"
                  message="Success"
                  description="Asana details stored successfully!"
                  showIcon
                  style={{ marginBottom: "1rem" }}
                />
              )}

              {apiError && (
                <Alert
                  type="error"
                  message="Error"
                  description={apiError}
                  showIcon
                  style={{ marginBottom: "1rem" }}
                />
              )}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ClientPATIDForm;
