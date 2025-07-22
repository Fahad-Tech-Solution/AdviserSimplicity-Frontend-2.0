import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import InternetSVG from "../Questions/svgs/Mobile login-pana.svg";
import InternetSVG2 from "../Questions/svgs/Telecommuting-pana.svg";

import axios from "axios";
import * as Yup from "yup";
import { Card } from "antd";

import { Image } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  defaultUrl,
  Loading,
  LoggedInUserData,
  LoggedInUserTokenJwt,
} from "../../Store/Store";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { openNotificationSuccess, PostAxios } from "../Assets/Api/Api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  var navigate = useNavigate();
  let defaultApi = useRecoilValue(defaultUrl);
  let [loggedUser, setLoggedUser] = useRecoilState(LoggedInUserData);
  let [loggedUserToken, setLoggedUserToken] =
    useRecoilState(LoggedInUserTokenJwt);
  let [loading, setLoading] = useRecoilState(Loading);
  let [SuperAdminFlag, setSuperAdminFlag] = useState(false);
  let [loginError, setLoginError] = useState(false);
  const [showNew, setShowNew] = useState(false);

  let initialValues = {
    email: "",
    password: "",
  };

  let location = useLocation();
  useEffect(() => {
    if (location.pathname === "/AdminLogin") {
      setSuperAdminFlag(true);
    }
  }, [location]);

  let onSubmit = async (values) => {
    console.log(values);
    let payload = {
      email: values.email.toLowerCase(),
      passwordHash: values.passwordHash.trim(),
    };
    try {
      setLoading(true);
      setLoginError(false);
      let res = await PostAxios(defaultApi + "/api/auth/login", payload);
      console.log(res);
      if (res?.user) {
        localStorage.setItem("loggedInEmail", payload.email);
        let userData = res?.user;

        setLoggedUser(userData);
        setLoggedUserToken(res.token);

        if (
          SuperAdminFlag &&
          userData?.roleID?.permissions.includes("SuperAdmin")
        ) {
          navigate("/superadmin/dashboard");
          return false;
        }

        // Compare timestamps (convert to string or number if needed)
        if (userData?.passwordUpdatedAt && userData?.createdAt) {
          const createdAt = new Date(userData.createdAt);
          const passwordUpdatedAt = new Date(userData.passwordUpdatedAt);
          const diffMs = Math.abs(passwordUpdatedAt - createdAt);

          if (diffMs < 2 * 60 * 1000) {
            // less than 2 minutes
            localStorage.setItem("dummyPassword", true);
            navigate("/pricing-table");
          } else {
            navigate("/user/dashboard");
          }
        } else {
          // fallback if timestamps are missing
          // navigate("/Dashboard");
        }
      }

      // sessionStorage.setItem("email", values.email);
      // navigate("/ChangePassword");
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        setLoginError(true);
        openNotificationSuccess(
          "error",
          "topRight",
          "Login failed",
          "Incorrect email or password."
        );
      } else if (error.status === 403) {
        openNotificationSuccess(
          "error",
          "topRight",
          "Login failed",
          error?.response?.data?.message || "Something went wrong."
        );
      } else {
        openNotificationSuccess(
          "error",
          "topRight",
          "Login failed",
          "Something went wrong."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  let validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    passwordHash: Yup.string().min(8).required("Please enter your password"),
  });

  return (
    <div className="container-fluid inputReset">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-8">
          <Card className="shadow" data-aos="flip-left" data-aos-duration="800">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({ values, handleChange, setFieldValue }) => {
                return (
                  <Form>
                    <div className="row align-items-stretch">
                      <div className="col-md-6">
                        <Image
                          src={SuperAdminFlag ? InternetSVG2 : InternetSVG}
                          alt="Loginimg"
                          fluid
                        />
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex flex-column w-100 h-100 justify-content-center align-items-center">
                          <div className="mt-4">
                            <div className="col-md-12 text-center">
                              <h3>
                                <b> {SuperAdminFlag && "Admin"} LOGIN</b>
                              </h3>
                            </div>
                          </div>

                          {loginError && (
                            <div
                              className="ant-alert ant-alert-error w-100"
                              role="alert"
                              style={{
                                color: "#cf1322",
                                background: "#fff1f0",
                                border: "1px solid #ffa39e",
                                padding: "8px 16px",
                                borderRadius: "4px",
                              }}
                            >
                              <strong>Login failed:</strong> Incorrect email or
                              password.
                            </div>
                          )}

                          <div className="col-md-12 my-2">
                            <label htmlFor="email">Email</label>
                            <Field
                              autoComplete="off"
                              className="form-control"
                              placeholder="someone@example.com"
                              type="email"
                              id="email"
                              name="email"
                            />
                            <ErrorMessage
                              component={"div"}
                              name="email"
                              className="text-danger"
                            />
                          </div>

                          <div className="col-md-12 ">
                            <label htmlFor="passwordHash">Password</label>
                            <div className="position-relative">
                              <Field name="passwordHash">
                                {({ field }) => (
                                  <input
                                    {...field}
                                    type={showNew ? "text" : "password"}
                                    id="passwordHash"
                                    placeholder="Password"
                                    className="form-control pe-5"
                                  />
                                )}
                              </Field>
                              <span
                                className="position-absolute"
                                style={{
                                  right: "15px",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  cursor: "pointer",
                                }}
                                onClick={() => setShowNew(!showNew)}
                              >
                                {showNew ? <FaEyeSlash /> : <FaEye />}
                              </span>
                            </div>
                            <ErrorMessage
                              component={"div"}
                              name="passwordHash"
                              className="text-danger"
                            />
                          </div>

                          <div className="col-md-12">
                            <p>
                              <Link
                                to="/forget-password"
                                className="text-green"
                              >
                                Forgot Password
                              </Link>
                            </p>
                          </div>

                          <div className="col-md-12">
                            <button
                              type="submit"
                              className="primary btn w-100 "
                            >
                              Login
                            </button>
                          </div>

                          <div className="col-md-12 mt-2 d-none">
                            <p>
                              I don't have Account{" "}
                              <Link to="/user/register" className="text-green">
                                Register
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
