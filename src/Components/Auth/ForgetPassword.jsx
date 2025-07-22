import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InternetSVG from "../Questions/svgs/Enter OTP-pana.svg";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Card, Spin, Input as AntInput, Button, Input } from "antd";

import { Image } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { defaultUrl } from "../../Store/Store";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
} from "../Assets/Api/Api";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const defaultApi = useRecoilValue(defaultUrl);

  const [Loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [expiryTime, setExpiryTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setStep(1);
  }, []);

  useEffect(() => {
    if (!expiryTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const remaining = expiryTime - now;

      if (remaining <= 0) {
        clearInterval(interval);
        setTimeLeft("00:00");
        setIsExpired(true);
      } else {
        const minutes = String(Math.floor(remaining / 60000)).padStart(2, "0");
        const seconds = String(Math.floor((remaining % 60000) / 1000)).padStart(
          2,
          "0"
        );
        setTimeLeft(`${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTime]);

  const initialValues = {
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  };

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      if (step === 1) {
        const res = await PatchAxios(`${defaultApi}/api/auth/forgot-password`, {
          email: values.email,
        });

        if (res) {
          openNotificationSuccess(
            "success",
            "topRight",
            "OTP Sent",
            "An OTP has been sent to your email."
          );
          setStep(2);
          setIsExpired(false);
          setExpiryTime(new Date(Date.now() + 10 * 60000)); // 10 min
        }
      } else if (step === 2) {
        const res = await PostAxios(`${defaultApi}/api/auth/verify-otp`, {
          email: values.email,
          otp: values.otp,
        });

        if (res) {
          openNotificationSuccess(
            "success",
            "topRight",
            "OTP Verification",
            "OTP is varified"
          );
          setStep(3);
        }
      } else {
        const res = await PatchAxios(`${defaultApi}/api/auth/reset-password`, {
          email: values.email,
          otp: values.otp,
          newPassword: values.newPassword,
        });

        if (res) {
          openNotificationSuccess(
            "success",
            "topRight",
            "Password updated",
            "Password is update successfully"
          );
          navigate("user/login");
        }
      }
    } catch (error) {
      openNotificationSuccess(
        "error",
        "topRight",
        "Failed",
        error?.response?.data?.error || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    otp: Yup.string().when("step", {
      is: 2,
      then: Yup.string().required("OTP is required"),
    }),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain uppercase, lowercase, number, and special character"
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Passwords must match"
    ),
  });

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
              {({ setFieldValue }) => (
                <Form className="w-100">
                  {!Loading && (
                    <>
                      {step === 1 && (
                        <div className="row align-items-stretch">
                          <div className="col-md-6">
                            <Image src={InternetSVG} alt="Loginimg" fluid />
                          </div>
                          <div className="col-md-6">
                            <div className="d-flex justify-content-end align-item-end">
                              <Button onClick={() => navigate("/user/login")}>
                                {" "}
                                <FaArrowLeft />{" "}
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
                                    <ErrorMessage
                                      name="email"
                                      className="text-danger"
                                      component="div"
                                    />
                                  </div>
                                </div>
                                <div className="row justify-content-center">
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

                      {step === 2 && (
                        <div className="row align-items-stretch">
                          <div className="col-md-6">
                            <div className="d-flex justify-content-end align-item-end">
                              <Button onClick={() => navigate("/")}>
                                {" "}
                                <FaArrowLeft />{" "}
                              </Button>
                            </div>
                            <div className="d-flex w-100 h-100 justify-content-center align-items-center">
                              <div className="w-100">
                                <div className="row mt-1">
                                  <div className="col-md-12 text-center">
                                    <h3>
                                      <b>OTP Pin</b>
                                    </h3>
                                  </div>
                                </div>

                                <div className="text-center mt-2">
                                  {isExpired ? (
                                    <span className="text-danger">
                                      OTP expired. Please request again.
                                    </span>
                                  ) : (
                                    <span className="text-muted">
                                      Time left: {timeLeft}
                                    </span>
                                  )}
                                </div>

                                <div className="row my-3 justify-content-center">
                                  <div className="col-md-10">
                                    <Field name="otp">
                                      {({ field, form }) => (
                                        <Input.OTP
                                          {...field}
                                          id="otp"
                                          length={6}
                                          autoFocus
                                          className="w-100"
                                          formatter={(str) => str.toUpperCase()}
                                          value={field.value}
                                          onChange={(value) =>
                                            form.setFieldValue("otp", value)
                                          }
                                          onBlur={() =>
                                            form.setFieldTouched("otp", true)
                                          }
                                        />
                                      )}
                                    </Field>
                                    <ErrorMessage
                                      name="otp"
                                      className="text-danger"
                                      component="div"
                                    />
                                  </div>
                                </div>

                                <div className="row justify-content-center">
                                  <div className="col-md-10">
                                    <button
                                      type="submit"
                                      className="primary btn w-100"
                                      disabled={isExpired}
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </div>

                                {isExpired && (
                                  <div className="row justify-content-center mt-2">
                                    <div className="col-md-10">
                                      <Button
                                        type="button"
                                        onClick={() => {
                                          setStep(1);
                                        }}
                                        className="w-100"
                                      >
                                        Resend OTP
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <Image src={InternetSVG} alt="Loginimg" fluid />
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="row align-items-stretch">
                          <div className="col-md-6">
                            <Image src={InternetSVG} alt="Loginimg" fluid />
                          </div>
                          <div className="col-md-6">
                            <div className="d-flex justify-content-end align-item-end">
                              <Button onClick={() => setStep(1)}>
                                {" "}
                                <FaArrowLeft />{" "}
                              </Button>
                            </div>
                            <div className="d-flex w-100 h-100 justify-content-center align-items-center">
                              <div className="w-100">
                                <div className="row mt-1">
                                  <div className="col-md-12 text-center">
                                    <h3>
                                      <b>New Password</b>
                                    </h3>
                                  </div>
                                </div>

                                <div className="row my-3 justify-content-center">
                                  {/* New Password */}
                                  <div className="col-md-10">
                                    <label htmlFor="newPassword">
                                      New Password
                                    </label>
                                    <div className="position-relative">
                                      <Field name="newPassword">
                                        {({ field }) => (
                                          <input
                                            {...field}
                                            type={showNew ? "text" : "password"}
                                            id="newPassword"
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
                                      name="newPassword"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>

                                  {/* Confirm Password */}
                                  <div className="col-md-10">
                                    <label htmlFor="confirmPassword">
                                      Confirm Password
                                    </label>
                                    <div className="position-relative">
                                      <Field name="confirmPassword">
                                        {({ field }) => (
                                          <input
                                            {...field}
                                            type={
                                              showConfirm ? "text" : "password"
                                            }
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
                                        onClick={() =>
                                          setShowConfirm(!showConfirm)
                                        }
                                      >
                                        {showConfirm ? (
                                          <FaEyeSlash />
                                        ) : (
                                          <FaEye />
                                        )}
                                      </span>
                                    </div>
                                    <ErrorMessage
                                      name="confirmPassword"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </div>

                                <div className="row justify-content-center">
                                  <div className="col-md-10">
                                    <button
                                      type="submit"
                                      className="primary btn w-100"
                                      disabled={isExpired}
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </div>

                                {isExpired && (
                                  <div className="row justify-content-center mt-2">
                                    <div className="col-md-10">
                                      <Button
                                        type="button"
                                        onClick={() => {
                                          setStep(1);
                                        }}
                                        className="w-100"
                                      >
                                        Resend OTP
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {Loading && (
                    <div className="row">
                      <div className="col-md-12 mt-md-4">
                        <div
                          className="row justify-content-center align-items-center"
                          style={{ height: "15rem" }}
                        >
                          <Spin
                            tip={
                              step === 1
                                ? "Checking and Sending OTP, Please wait..."
                                : step === 2
                                ? "Checking OTP, Please wait..."
                                : "Updating Password, Please wait..."
                            }
                            size="large"
                          >
                            &nbsp;
                          </Spin>
                        </div>
                      </div>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
