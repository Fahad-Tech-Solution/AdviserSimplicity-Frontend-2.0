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
import { PostAxios } from "../Assets/Api/Api";

const LoginForm = () => {
  var navigate = useNavigate();
  let defaultApi = useRecoilValue(defaultUrl);
  let [loggedUser, setLoggedUser] = useRecoilState(LoggedInUserData);
  let [loggedUserToken, setLoggedUserToken] =
    useRecoilState(LoggedInUserTokenJwt);
  let [loading, setLoading] = useRecoilState(Loading);
  let [SuperAdminFlag, seSuperAdminFlag] = useState(false);

  let initialValues = {
    email: "",
    password: "",
  };

  let location = useLocation();
  useEffect(() => {
    if (location.pathname === "/SuperAdmin/Login") {
      seSuperAdminFlag(true);
    }
  }, [location]);

  let onSubmit = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      let res = await PostAxios(defaultApi + "/api/auth/login", values);
      console.log(res);
      if (res?.user) {
        localStorage.setItem("loggedInEmail", values.email);
        let userData = res.user;
        // Compare timestamps (convert to string or number if needed)
        if (userData?.passwordUpdatedAt && userData?.createdAt) {
          const createdAt = new Date(userData.createdAt);
          const passwordUpdatedAt = new Date(userData.passwordUpdatedAt);
          const diffMs = Math.abs(passwordUpdatedAt - createdAt);

          if (diffMs < 2 * 60 * 1000) {
            // less than 2 minutes
            console.log("pricingTable");
            localStorage.setItem("dummyPassword", true);
            navigate("/PricingTable");
          } else {
            console.log("Dashboard");
            navigate("/Dashboard");
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
    } finally {
      setLoading(false);
    }
  };

  let validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().min(6).required("Please enter your password"),
  });

  return (
    <div className="container-fluid inputReset">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-8">
          <Card className="shadow" data-aos="flip-left" data-aos-duration="800">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              // validationSchema={validationSchema}
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
                                <b>LOGIN</b>
                              </h3>
                            </div>
                          </div>

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
                            <Field
                              className="form-control"
                              type="password"
                              id="passwordHash"
                              placeholder="Password"
                              name="passwordHash"
                            />
                            <ErrorMessage
                              component={"div"}
                              name="email"
                              className="text-danger"
                            />
                          </div>

                          <div className="col-md-12">
                            <p>
                              <Link to="/ForgetPassword" className="text-green">
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
                              <Link to="/Register" className="text-green">
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
