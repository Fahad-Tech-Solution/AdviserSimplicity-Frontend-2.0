import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InternetSVG from "../Questions/svgs/Enter OTP-pana.svg";

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Card, Spin, Input as AntInput, Button } from "antd";

import { Image } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { defaultUrl } from "../../Store/Store";
import { FaArrowLeft } from "react-icons/fa";

const ForgetPassword = () => {
  var navigate = useNavigate();
  let defaultApi = useRecoilValue(defaultUrl);

  let [Loading, setLoading] = useState(false);

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  let initialValues = {
    email: "",
  };

  let onSubmit = (values) => {};

  let validationSchema = {
    email: Yup.string().email("Invalid email format").required("Required"),
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-8">
          <Card className="shadow" data-aos="flip-left" data-aos-duration="800">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({ values, setFieldValue }) => {
                return (
                  <Form className="w-100">
                    {!Loading && (
                      <div className="row align-items-stretch">
                        <div className="col-md-6">
                          <Image src={InternetSVG} alt="Loginimg" fluid />
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex justify-content-end align-item-end ">
                            <Button
                              onClick={() => {
                                navigate("/");
                              }}
                            >
                              <FaArrowLeft />
                            </Button>
                          </div>
                          <div className="d-flex w-100 h-100 justify-content-center align-items-center">
                            <div className="w-100">
                              <div className="row mt-1">
                                <div className="col-md-12 text-center">
                                  <h3>
                                    <b>Forget Password</b>
                                  </h3>
                                </div>
                              </div>
                              <div className="row my-3 justify-content-center">
                                <div className="col-md-10">
                                  <label htmlFor="email">Email</label>
                                  <Field
                                    autoComplete="off"
                                    className="form-control"
                                    type="email"
                                    id="email"
                                    placeholder="someone@example.com"
                                    name="email"
                                  />
                                </div>
                              </div>

                              <div className="row justify-content-center ">
                                <div className="col-md-10">
                                  <button
                                    type="submit"
                                    className="primary btn w-100"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {Loading && (
                      <div className="row">
                        <div className="col-md-12 mt-md-4">
                          <div
                            className="row justify-content-center align-items-center"
                            style={{ height: "20rem" }}
                          >
                            <Spin
                              tip="Checking and Sending OTP, please wait..."
                              size="large"
                            >
                              &nbsp;
                            </Spin>
                          </div>
                        </div>
                      </div>
                    )}
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

export default ForgetPassword;
