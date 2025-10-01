import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Select from 'react-select';

import axios from 'axios';
import * as Yup from 'yup';
import { Card, ConfigProvider, Input as AntInput, Spin, Steps } from 'antd';


import FarmSVG from "../Questions/svgs/Privacy policy-rafiki.svg"
import { Form, Image, InputGroup } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';

import { FiEye, FiEyeOff } from "react-icons/fi";
import { defaultUrl, LoggedInUserData } from '../../Store/Store';
import { openNotificationSuccess } from '../Assets/Api/Api';
import { ErrorMessage, Field, Formik } from 'formik';

const Register = () => {
    var navigate = useNavigate();

    let [loggedUser, setLoggedUser] = useRecoilState(LoggedInUserData)

    let defaultApi = useRecoilValue(defaultUrl);

    let [passwordSwitch, setPasswordSwitch] = useState(false)
    let [confirmPasswordSwitch, setConfirmPasswordSwitch] = useState(false)

    let initialValues = {
        "name": "usama saeed",
        "email": "usamasaeed3k@gmail.com",
        "password": "pakistan1234",
        "address": "123 Main Street, City, Country",
        "designation": "Software Engineer",
        "phoneNumber": "+1234567890"
    }

    let onSubmit = () => {



    }


    let validationSchema = Yup.object({
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters long')
            .required('Password is required'),

        userName: Yup.string()
            .trim() // Remove leading/trailing whitespace
            .required('Username is required'),

        CPassword: Yup.string()
            .trim()
            .oneOf([Yup.ref('password')], 'Passwords must match') // Ensure confirm password matches password
            .required('Confirm password is required'),

        email: Yup.string()
            .email('Invalid email format')
            .required('Required'),

        phoneNumber: Yup.string()
            .matches(/^[1-9][0-9]{9}$/, "invalid phone number")
            .required("Required"),

        address: Yup.string()
            .required('Required'),

        designation: Yup.string()
            .required('Required'),
    })

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center align-items-center vh-100'>
                <div className='col-md-8'>
                    <Card className='shadow' data-aos="flip-left" data-aos-duration="800">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}
                        >
                            {({ values, handleChange, setFieldValue }) => {
                                return (<Form>
                                    <div className="row justify-content-center align-items-stretch ">
                                        <div className="col-md-6 d-none order-md-2 order-1 d-flex justify-content-center align-items-center">
                                            <Image src={FarmSVG} alt='Farm SVG' fluid className='w-100' />
                                        </div>
                                        <div className=' col-md-12 w-100 text-center'>
                                            <h3><b>REGISTER</b></h3>
                                        </div>
                                        <div className="col-md-12 px-5">
                                            <div className='d-flex flex-wrap w-100 h-100 justify-content-center align-items-center'>


                                                <div className='col-md-6 mb-2 px-3 flex-grow-1'>
                                                    <label htmlFor='userName'>Name</label>
                                                    <Field autoComplete='off' className='form-control' type="string"
                                                        id='userName' placeholder="Enter your name" name="userName" />
                                                    <ErrorMessage component={"div"} className='text-danger' name='userName' />
                                                </div>

                                                <div className='col-md-6 mb-2 px-3 flex-grow-1'>
                                                    <label htmlFor='email'>Email</label>
                                                    <Field autoComplete='off' className='form-control' type="string"
                                                        id='email' placeholder="example@gmail.com" name="email" />
                                                    <ErrorMessage component={"div"} className='text-danger' name='email' />
                                                </div>


                                                <div className='col-md-6 mb-2 px-3 flex-grow-1'>
                                                    <label htmlFor='password'>Password</label>
                                                    <InputGroup>
                                                        <Field className='form-control box-shadow-0 border-end-0'
                                                            type={passwordSwitch ? "text" : "password"} id='password'
                                                            placeholder="Password" name='password' />
                                                        <InputGroup.Text className='bg-white border-start-0'
                                                            role="button"
                                                            style={{ minHeight: "38px" }}
                                                            onClick={() => setPasswordSwitch(!passwordSwitch)}
                                                        > {passwordSwitch ? <FiEye /> : <FiEyeOff />}
                                                        </InputGroup.Text>
                                                    </InputGroup>
                                                    <ErrorMessage component={"div"} className='text-danger' name='password' />

                                                </div>

                                                <div className='col-md-6 mb-2 px-3 flex-grow-1'>
                                                    <label htmlFor='CPassword'>Confirm Password</label>
                                                    <InputGroup>
                                                        <Field className='form-control box-shadow-0 border-end-0'
                                                            type={confirmPasswordSwitch ? "text" : "password"}
                                                            id='CPassword' placeholder="Confirm Password" name='CPassword' />
                                                        <InputGroup.Text className='bg-white border-start-0 curserPointer'
                                                            role="button"
                                                            onClick={() => setConfirmPasswordSwitch(!confirmPasswordSwitch)}
                                                            style={{ minHeight: "38px" }}
                                                        >
                                                            {confirmPasswordSwitch ? <FiEye /> : <FiEyeOff />}</InputGroup.Text>
                                                    </InputGroup>
                                                    <ErrorMessage component={"div"} className='text-danger' name='CPassword' />

                                                </div>

                                                <div className='col-md-6 mb-2 px-3 flex-grow-1'>
                                                    <label htmlFor='phoneNumber'>Phone Number</label>
                                                    <Field autoComplete='off' className='form-control' type="string"
                                                        id='phoneNumber' placeholder="" name="phoneNumber" />
                                                    <ErrorMessage component={"div"} className='text-danger' name='phoneNumber' />

                                                </div>



                                                <div className='col-md-6 mb-2 px-3 flex-grow-1'>
                                                    <label htmlFor='designation'>Designation</label>
                                                    <Field autoComplete='off' className='form-control' type="string"
                                                        id='designation' placeholder="Enter you Designation" name="designation" />
                                                    <ErrorMessage component={"div"} className='text-danger' name='designation' />

                                                </div>


                                                <div className='col-md-7 mb-2 px-3 flex-grow-1'>
                                                    <label htmlFor='address'>Address</label>
                                                    <Field as="textarea" autoComplete='off' className='form-control' type="string"
                                                        row="6"
                                                        id='address' placeholder="Enter your Address" name="address" />
                                                    <ErrorMessage component={"div"} className='text-danger' name='address' />

                                                </div>




                                            </div>
                                        </div>
                                        <div className='col-sm-7'>
                                            <p className='p-0 m-0 mb-1'>I already have an Account <Link to='/Login' className='text-green'>Login</Link></p>
                                            <button type='submit' className='modalBtn btn w-100 '>
                                                Sign Up
                                            </button>
                                        </div>
                                    </div>
                                </Form>)
                            }}
                        </Formik>
                    </Card>
                </div>
            </div>
        </div>
    )


}

export default Register