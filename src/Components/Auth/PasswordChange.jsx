import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import InternetSVG from "../Questions/svgs/Reset password-pana.svg";

import axios from "axios";
import * as Yup from "yup";
import { Card } from "antd";

import { Image } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  defaultUrl,
  LoggedInUserData,
  LoggedInUserTokenJwt,
} from "../../Store/Store";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordChange = () => {
  var navigate = useNavigate();
  let defaultApi = useRecoilValue(defaultUrl);
  let [loggedUser, setLoggedUser] = useRecoilState(LoggedInUserData);
  let [loggedUserToken, setLoggedUserToken] =
    useRecoilState(LoggedInUserTokenJwt);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  let [SuperAdminFlag, seSuperAdminFlag] = useState(false);

  let initialValues = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  let location = useLocation();
  useEffect(() => {
    if (location.pathname === "/SuperAdmin/Login") {
      seSuperAdminFlag(true);
    }
  }, [location]);

  let onSubmit = (values) => {
    console.log(values);
    try {
      navigate("/PricingTable");
    } catch (error) {
    } finally {
    }
  };

  let validationSchema = Yup.object({
    oldpassword: Yup.string().required("Please enter your old password"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain uppercase, lowercase, number, and special character"
      )
      .required("Please enter your password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
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
                        <div className="d-flex flex-column w-100 h-100 justify-content-center align-items-center">
                          <div className="mt-4">
                            <div className="col-md-12 text-center">
                              <h3>
                                <b>Reset Password</b>
                              </h3>
                            </div>
                          </div>

                          <div className="col-md-12 my-2">
                            <label htmlFor="oldpassword">Old Password</label>
                            <div className="position-relative">
                              <Field name="oldpassword">
                                {({ field }) => (
                                  <input
                                    {...field}
                                    type={showOld ? "text" : "password"}
                                    id="oldpassword"
                                    placeholder="Old Password"
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
                                onClick={() => setShowOld(!showOld)}
                              >
                                {showOld ? <FaEyeSlash /> : <FaEye />}
                              </span>
                            </div>
                            <ErrorMessage
                              name="oldpassword"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          {/* New Password */}
                          <div className="col-md-12">
                            <label htmlFor="password">New Password</label>
                            <div className="position-relative">
                              <Field name="password">
                                {({ field }) => (
                                  <input
                                    {...field}
                                    type={showNew ? "text" : "password"}
                                    id="password"
                                    placeholder="New Password"
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
                              name="password"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          {/* Confirm Password */}
                          <div className="col-md-12">
                            <label htmlFor="confirmPassword">
                              Confirm Password
                            </label>
                            <div className="position-relative">
                              <Field name="confirmPassword">
                                {({ field }) => (
                                  <input
                                    {...field}
                                    type={showConfirm ? "text" : "password"}
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
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
                                onClick={() => setShowConfirm(!showConfirm)}
                              >
                                {showConfirm ? <FaEyeSlash /> : <FaEye />}
                              </span>
                            </div>
                            <ErrorMessage
                              name="confirmPassword"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          <div className="col-md-12 mt-3">
                            <button
                              type="submit"
                              className="primary btn w-100 "
                            >
                              Login
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <Image src={InternetSVG} alt="Loginimg" fluid />
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

export default PasswordChange;
