import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Row, Col, Input, Button, Spin, Alert, List } from "antd";
import * as Yup from "yup";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import axios from "axios";
import { PostAxios } from "../Api/Api";
import { defaultUrl } from "../../../Store/Store";
import { useRecoilValue } from "recoil";

const ClientPATIDForm = (props) => {
  const [showPATID, setShowPATID] = useState(false);
  const [storedSuccessFull, setStoredSuccessFull] = useState(false);
  const [step, setStep] = useState(1);
  const [workspaces, setWorkspaces] = useState([]);
  const [projectSpaces, setProjectSpaces] = useState([]);
  const [worSpaceUsers, setWorSpaceUsers] = useState([]);
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

  const StoreAllData = async (values) => {
    setLoading(true);
    setApiError("");
    values.projects=[values.projects];
    try {
      const res = await PostAxios(DefaultUrl + "/api/CDFAsana/Add", values);
      console.log(res);
      setStoredSuccessFull(true);
    } catch (error) {
      setApiError(
        error?.response?.data?.errors?.[0]?.message ||
          "Failed to fetch Projects. Please check your PATID."
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
              <h5>Asana Workspaces</h5>

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
                  <List
                    bordered
                    dataSource={workspaces}
                    renderItem={(item) => (
                      <List.Item
                        onClick={() => setFieldValue("workspace", item.gid)}
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            values.workspace === item.gid ? "#e6f7ff" : "white",
                          borderLeft:
                            values.workspace === item.gid
                              ? "4px solid #36b446"
                              : "4px solid transparent",
                        }}
                      >
                        <strong>{item.name}</strong>{" "}
                        <span style={{ color: "#888" }}>({item.gid})</span>
                      </List.Item>
                    )}
                    style={{ marginTop: "1rem" }}
                  />

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
              <h5>Asana Projects</h5>

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
                  <List
                    bordered
                    dataSource={projectSpaces}
                    renderItem={(item) => (
                      <List.Item
                        onClick={() => setFieldValue("projects", item.gid)}
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            values.projects === item.gid ? "#e6f7ff" : "white",
                          borderLeft:
                            values.projects === item.gid
                              ? "4px solid #36b446"
                              : "4px solid transparent",
                        }}
                      >
                        <strong>{item.name}</strong>{" "}
                        <span style={{ color: "#888" }}>({item.gid})</span>
                      </List.Item>
                    )}
                    style={{ marginTop: "1rem" }}
                  />

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
              <h5>Asana Users</h5>

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
                  <List
                    bordered
                    dataSource={worSpaceUsers}
                    renderItem={(item) => (
                      <List.Item
                        onClick={() => setFieldValue("assignee", item.gid)}
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            values.assignee === item.gid ? "#e6f7ff" : "white",
                          borderLeft:
                            values.assignee === item.gid
                              ? "4px solid #36b446"
                              : "4px solid transparent",
                        }}
                      >
                        <strong>{item.name}</strong>{" "}
                        <span style={{ color: "#888" }}>({item.gid})</span>
                      </List.Item>
                    )}
                    style={{ marginTop: "1rem" }}
                  />

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

          {/* STEP 5: Stored Successfully */}
          {step === 5 && (
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
