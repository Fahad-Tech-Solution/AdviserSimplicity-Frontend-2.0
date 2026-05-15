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
  const navigate = useNavigate();
  const defaultApi = useRecoilValue(defaultUrl);

  const [loggedUser, setLoggedUser] = useRecoilState(LoggedInUserData);
  const [loggedUserToken, setLoggedUserToken] =
    useRecoilState(LoggedInUserTokenJwt);

  const [loading, setLoading] = useRecoilState(Loading);
  const [SuperAdminFlag, setSuperAdminFlag] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/admin/login") {
      setSuperAdminFlag(true);
    }
  }, [location]);

  const initialValues = {
    email: "",
    passwordHash: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    passwordHash: Yup.string().min(8).required("Please enter your password"),
  });

  const onSubmit = async (values) => {
    const payload = {
      email: values.email.toLowerCase(),
      passwordHash: values.passwordHash.trim(),
    };

    try {
      setLoading(true);
      setLoginError(false);

      const res = await PostAxios(`${defaultApi}/api/auth/login`, payload);

      const userData = res?.user;
      const token = res?.token;

      if (!userData || !token) {
        throw {
          status: 401,
          response: { data: { message: "Invalid login response" } },
        };
      }

      userData.subscription = res?.subscription || null;

      localStorage.setItem("loggedInEmail", payload.email);
      setLoggedUser(userData);
      setLoggedUserToken(token);

      const isSuperAdmin = userData?.roleID?.permissions.includes("superAdmin");

      if (SuperAdminFlag && isSuperAdmin)
        return navigate("/super/admin/dashboard");

      if (SuperAdminFlag && !isSuperAdmin)
        throw { status: 401, response: { data: { message: "Access denied" } } };

      if (!SuperAdminFlag && isSuperAdmin)
        throw { status: 401, response: { data: { message: "Access denied" } } };

      const createdAt = new Date(userData.createdAt);
      const passwordUpdatedAt = new Date(userData.passwordUpdatedAt || 0);
      const passwordUpdated = passwordUpdatedAt - createdAt > 2 * 60 * 1000;

      if (!userData?.subscription?.valid) return navigate("/pricing-table");
      if (!passwordUpdated) return navigate("/change-password");
      if (!userData.isActive)
        return navigate(`/user/warning?message=${res.action}`);

      navigate("/user/my-clients");
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong.";
      setLoginError(true);

      openNotificationSuccess("error", "topRight", "Login failed", message);

      setLoggedUser({});
      setLoggedUserToken("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid inputReset">
      <div className="row justify-content-center align-items-center vh-100 py-4">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <Card
            className="shadow login-card"
            data-aos="flip-left"
            data-aos-duration="800"
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {() => (
                <Form>
                  <div className="row g-0">
                    {/* LEFT IMAGE (HIDDEN ON MOBILE) */}
                    <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center p-3">
                      <Image
                        src={SuperAdminFlag ? InternetSVG2 : InternetSVG}
                        alt="Login Illustration"
                        fluid
                        style={{ maxHeight: "320px", objectFit: "contain" }}
                      />
                    </div>

                    {/* RIGHT FORM SECTION */}
                    <div className="col-md-6 col-sm-12 p-4">
                      <h3 className="text-center mb-4">
                        <b>{SuperAdminFlag ? "Admin" : ""} Login</b>
                      </h3>

                      {/* ERROR MESSAGE */}
                      {loginError && (
                        <div className="alert alert-danger py-2 text-center">
                          Incorrect email or password.
                        </div>
                      )}

                      {/* EMAIL */}
                      <div className="mb-3">
                        <label>Email</label>
                        <Field
                          name="email"
                          type="email"
                          className="form-control"
                          placeholder="someone@example.com"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger small"
                        />
                      </div>

                      {/* PASSWORD */}
                      <div className="mb-3">
                        <label>Password</label>
                        <div className="position-relative">
                          <Field name="passwordHash">
                            {({ field }) => (
                              <input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                className="form-control pe-5"
                                placeholder="Password"
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
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        </div>

                        <ErrorMessage
                          name="passwordHash"
                          component="div"
                          className="text-danger small"
                        />
                      </div>

                      {/* FORGOT PASSWORD */}
                      <div className="text-end mb-3">
                        <Link to="/forget-password" className="optionActive">
                          Forgot Password?
                        </Link>
                      </div>

                      {/* LOGIN BUTTON */}
                      <button type="submit" className="modalBtn btn w-100">
                        Login
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
