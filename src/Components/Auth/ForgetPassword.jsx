import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import InternetSVG from "../Assets/Svgs/"

import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Card, Spin, Input as AntInput } from 'antd';



import { Image, InputGroup, Form } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultApiUrl, LoggedInUserData, LoggedInUserTokenJwt } from '../../Atom';
import LoginSVG from './LoginSVG';
import { openNotificationSuccess } from '../../assets/Alert/Alert';
import { FiEye, FiEyeOff } from "react-icons/fi";

const ForgetPassword = () => {
    var navigate = useNavigate();
    let defaultApi = useRecoilValue(defaultApiUrl);
    let [loggedUser, setLoggedUser] = useRecoilState(LoggedInUserData);
    let [loggedUserToken, setLoggedUserToken] = useRecoilState(LoggedInUserTokenJwt)

    let [VerifyCodeSheet, setVerifyCodeSheet] = useState(0);
    let [Loading, setLoading] = useState(false);
    let [VerifyCodeData, setVerifyCodeData] = useState({});

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    function generate() {

        let charUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let charLowercase = "abcdefghijklmnopqrstuvwxyz";
        let charNumber = "0123456789";
        let charSpecial = "~!@#$%^&*_+:?";

        let result = "";
        let characterLength = 5;

        let includeUppercase = true;
        let includeLowercase = true;
        let includeNumber = true;
        let includeSpecial = true;


        for (let i = 0; i <= characterLength; i++) {
            if (includeUppercase) {

                result += charUppercase.charAt(Math.floor(Math.random() * charUppercase.length));
            }

            if (includeLowercase) {
                result += charLowercase.charAt(Math.floor(Math.random() * charLowercase.length));
            }

            if (includeNumber) {
                result += charNumber.charAt(Math.floor(Math.random() * charNumber.length));
            }

            if (includeSpecial) {
                result += charSpecial.charAt(Math.floor(Math.random() * charSpecial.length));
            }
        }


        return result.slice(0, characterLength);

    }


    const formik = useFormik({

        initialValues: {
            email: "",
        },

        onSubmit: (values, action) => {

            if (VerifyCodeSheet == 0) {
                setLoading(true);

                let myData = {
                    email: values.email,
                    OTP: generate()
                }
                console.log("myData:", myData)

                setVerifyCodeData(myData);

                axios
                    .post(defaultApi + "/api/OTPMailer/ForgetPassword", myData)
                    .then((res) => {
                        setVerifyCodeSheet(1);
                        console.log(res.data);
                        let type = "success";
                        let placement = "topRight"
                        let message = "OTP is Send"
                        let description = "Please! Check you Mail and Enter Correct Mail"
                        openNotificationSuccess(type, placement, message, description)
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error(error);
                        if (error.response.status === 404) {
                            if (error.response.data === "User Nod Found") {
                                console.log("User Nod Found")
                                let type = "error";
                                let placement = "topRight"
                                let message = error.response.data
                                let description = "Please! Enter email you entered before"
                                openNotificationSuccess(type, placement, message, description)
                            }
                            else {
                                console.log(error.response.data);
                            }
                            setLoad(false);
                        }
                    });
            }
            else if (VerifyCodeSheet === 1) {
                setLoading(true);
                if (VerifyCodeData.OTP === values.otp) {
                    setLoading(false);
                    setVerifyCodeSheet(2);
                }
            }
            else if (VerifyCodeSheet === 2) {
                setLoading(true);

                let myData = {
                    email: VerifyCodeData.email,
                    password: values.password,
                }
                console.log("myData:", myData)

                axios
                    .patch(defaultApi + "/api/Register/UpdatePassword", myData)
                    .then((res) => {
                        setVerifyCodeSheet(1);
                        console.log(res.data);
                        let type = "success";
                        let placement = "topRight"
                        let message = "Password Updated"
                        let description = "Please! Login again"
                        openNotificationSuccess(type, placement, message, description)
                        setLoading(false);
                        navigate("/auth/Login")
                    })
                    .catch((error) => {
                        console.error(error);
                        if (error.response.status === 404) {
                            if (error.response.data === "User Nod Found") {
                                console.log("User Nod Found")
                                let type = "error";
                                let placement = "topRight"
                                let message = error.response.data
                                let description = "Please! Enter email you entered before"
                                openNotificationSuccess(type, placement, message, description)
                            }
                            else {
                                console.log(error.response.data);
                            }
                            setLoad(false);
                        }
                    });
            }
            setLoading(false);

        },

        validationSchema: VerifyCodeSheet == 0 ?

            Yup.object({
                email: Yup.string()
                    .email('Invalid email format')
                    .required('Required'),
            })
            :
            VerifyCodeSheet == 2 ?

                Yup.object({

                    password: Yup.string()
                        .min(6, 'Password must be at least 6 characters long')
                        .required('Password is required'),

                    CPassword: Yup.string()
                        .trim()
                        .oneOf([Yup.ref('password')], 'Passwords must match') // Ensure confirm password matches password
                        .required('Confirm password is required'),
                })
                : Yup.object({})
    })


    let [passwordSwitch, setPasswordSwitch] = useState(false)
    let [confirmPasswordSwitch, setConfirmPasswordSwitch] = useState(false)

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center align-items-center vh-100'>
                <div className='col-md-8'>
                    <Card className='shadow' data-aos="flip-left" data-aos-duration="800">
                        {!Loading &&

                            <div className="row align-items-stretch">
                                <div className="col-md-6">
                                    <Image src={InternetSVG} alt='Loginimg' fluid />
                                </div>
                                <div className="col-md-6">
                                    <div className='d-flex w-100 h-100 justify-content-center align-items-center'>
                                        <form className='w-100' onSubmit={formik.handleSubmit}>
                                            <div className='row mt-4'>
                                                <div className='col-md-12 text-center'>
                                                    <h3><b>Forget Password</b></h3>
                                                </div>
                                            </div>
                                            {VerifyCodeSheet === 0 &&
                                                <React.Fragment>
                                                    <div className='row my-3 justify-content-center'>
                                                        <div className='col-md-10'>
                                                            <label htmlFor='email'>Email</label>
                                                            <input autoComplete='off' className='form-control' type="email" id='email' placeholder="someone@example.com" name="email"
                                                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                                                            {formik.touched.email && formik.errors.email ? <div className='text-danger'>{formik.errors.email}</div> : null}
                                                        </div>
                                                    </div>


                                                    <div className='row justify-content-center '>
                                                        <div className='col-md-10'>
                                                            <button type='submit' className='primary btn w-100'>Account</button>
                                                        </div>
                                                    </div>

                                                </React.Fragment>}

                                            {VerifyCodeSheet === 1 &&
                                                <React.Fragment>
                                                    <div className='row my-3 justify-content-center'>
                                                        <div className='col-md-10'>
                                                            <label htmlFor="otp">Enter OTP</label>
                                                            <AntInput
                                                                id="otp"
                                                                name="otp"
                                                                type="text"
                                                                placeholder="Enter the OTP"
                                                                value={formik.values.otp}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                className={formik.touched.otp && formik.errors.otp ? 'is-invalid' : ''}
                                                            />
                                                            {formik.touched.otp && formik.errors.otp ? (
                                                                <div className="text-danger">{formik.errors.otp}</div>
                                                            ) : null}
                                                            <p className='p-0 mt-2'>An OTP is Send on: <br /> {VerifyCodeData.email}</p>
                                                        </div>
                                                    </div>


                                                    <div className='row justify-content-center '>
                                                        <div className='col-md-10'>
                                                            <button type='submit' className='primary btn w-100'>Check</button>
                                                        </div>
                                                    </div>

                                                </React.Fragment>}

                                            {VerifyCodeSheet === 2 &&
                                                <React.Fragment>
                                                    <div className='row mt-2'>
                                                        <div className='col-md-1'></div>
                                                        <div className='col-md-10'>
                                                            <label htmlFor='password'>Password</label>
                                                            <InputGroup>
                                                                <Form.Control className='form-control box-shadow-0 border-end-0' type={passwordSwitch ? "text" : "password"} id='password' placeholder="Password" name='password'
                                                                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                                                                <InputGroup.Text className='bg-white border-start-0 curserPointer' onClick={() => setPasswordSwitch(!passwordSwitch)} > {passwordSwitch ? <FiEye /> : <FiEyeOff />}</InputGroup.Text>
                                                            </InputGroup>

                                                            {formik.touched.password && formik.errors.password ? <div className='text-danger'>{formik.errors.password}</div> : null}
                                                        </div>
                                                        <div className='col-md-1'></div>
                                                    </div>

                                                    <div className='row mt-2'>
                                                        <div className='col-md-1'></div>
                                                        <div className='col-md-10'>
                                                            <label htmlFor='CPassword'>Confirm Password</label>
                                                            <InputGroup>
                                                                <Form.Control className='form-control box-shadow-0 border-end-0' type={confirmPasswordSwitch ? "text" : "password"} id='CPassword' placeholder="Confirm Password" name='CPassword'
                                                                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.CPassword} />
                                                                <InputGroup.Text className='bg-white border-start-0 curserPointer' onClick={() => setConfirmPasswordSwitch(!confirmPasswordSwitch)} > {confirmPasswordSwitch ? <FiEye /> : <FiEyeOff />}</InputGroup.Text>
                                                            </InputGroup>

                                                            {formik.touched.CPassword && formik.errors.CPassword ? <div className='text-danger'>{formik.errors.CPassword}</div> : null}
                                                        </div>
                                                        <div className='col-md-1'></div>
                                                    </div>


                                                    <div className='row justify-content-center mt-3'>
                                                        <div className='col-md-10'>
                                                            <button type='submit' className='primary btn w-100'>Update Password</button>
                                                        </div>
                                                    </div>

                                                </React.Fragment>}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        }

                        {Loading &&
                            <div className='row'>
                                <div className='col-md-12 mt-md-4'>
                                    <div className='row justify-content-center align-items-center' style={{ height: "20rem" }}>

                                        <Spin tip="Checking and Sending OTP, please wait..." size="large">
                                            &nbsp;
                                        </Spin>

                                    </div>
                                </div>
                            </div>
                        }


                    </Card>
                </div>
            </div>
        </div>
    )


}

export default ForgetPassword