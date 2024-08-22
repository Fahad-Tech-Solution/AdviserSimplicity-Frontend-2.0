import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Select from 'react-select';


// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Card, ConfigProvider, Input as AntInput, Spin, Steps } from 'antd';

import sampleImage from "../../assets/Svgs/Connected world-pana.svg";
import sampleImage2 from "../../assets/Svgs/profile-user-svgrepo-com.svg";

import FarmSVG from "../../assets/Svgs/Remote team-pana.svg"
import { Form, Image, InputGroup } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';

import { FiEye, FiEyeOff } from "react-icons/fi";
import { defaultApiUrl, LoggedInUserData, LoggedInUserTokenJwt, PreferenceState } from '../../Atom';
import { openNotificationSuccess } from '../../assets/Alert/Alert';

const Register = () => {
    var navigate = useNavigate();

    let [loggedUser, setLoggedUser] = useRecoilState(LoggedInUserData)
    let [loggedUserToken, setLoggedUserToken] = useRecoilState(LoggedInUserTokenJwt)
    let [preferenceObj, setPreferenceObj] = useRecoilState(PreferenceState);

    let defaultApi = useRecoilValue(defaultApiUrl);

    let [proceed, setProceed] = useState(false)
    let [passwordSwitch, setPasswordSwitch] = useState(false)
    let [confirmPasswordSwitch, setConfirmPasswordSwitch] = useState(false)
    let [load, setLoad] = useState(false)
    let [RandomCode, setRandomCode] = useState("")
    let [emailVerifyFlag, setEmailVerifyFlag] = useState(false)
    let [userCreatedFlag, setUserCreatedFlag] = useState(true)
    const [previewImage, setImageSrc] = useState(null); // State for preview image


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
            "userName": "",
            "password": "",
            "CPassword": "",
            "email": "",
            "phoneNumber": "",
            "address": "",
            "accountType": "Owner",
            "imageUrl": "",
            "gender": "",
            "area": "",
        },



        onSubmit: (values, action) => {

            let mydata = {
                userName: values.userName,
                password: values.password,
                email: values.email,
                phoneNumber: values.phoneNumber,
                address: values.address,
                accountType: values.accountType,
                imageUrl: values.imageUrl,
                gender: values.gender,
                area: values.area,
            }
            setLoggedUser(mydata);

            // console.log(values);
            if (current == 0) {
                setLoad(true);

                let Obj = {
                    email: values.email,
                    OTP: generate()
                }

                console.log(Obj);

                setRandomCode(Obj.OTP);

                setCurrent(current + 1);
                setLoad(false);
                axios.post(defaultApi + '/api/OTPMailer/', Obj).then((req) => {
                    setCurrent(current + 1);
                    console.log(req.data);
                    let type = "success";
                    let placement = "topRight"
                    let message = "OTP is Send"
                    let description = "Please! Check you Mail and Enter Correct Mail"
                    openNotificationSuccess(type, placement, message, description)
                    setLoad(false);
                }).catch((error) => {
                    console.error(error.response);
                    if (error.response.status === 404) {
                        if (error.response.data === "User Already Exists") {
                            console.log("User Already Exists")
                            let type = "error";
                            let placement = "topRight"
                            let message = error.response.data
                            let description = "Please! Login is you already have an account"
                            openNotificationSuccess(type, placement, message, description)
                        }
                        else {
                            console.log(error.response.data);
                        }
                        setLoad(false);
                    }
                })

            }
            else {
                if (RandomCode === values.otp) {
                    setCurrent(current + 1);
                    setEmailVerifyFlag(true);
                    setProceed(true);
                }
                else {
                    let type = "error";
                    let placement = "topRight"
                    let message = "Invalid Code"
                    let description = "Please! Check Again"
                    openNotificationSuccess(type, placement, message, description)
                }
            }

        },


        validationSchema: Yup.object({

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

        })
    })

    const formik2 = useFormik({
        initialValues: {
            // "userName": "",
            // "password": "",
            // "email": "",
            "phoneNumber": "",
            "address": "",
            "accountType": "",
            "imageUrl": "",
            "gender": "Male",
            "area": "",
        },

        onSubmit: async (values, action) => {
            alert("Jinga");

            if (userCreatedFlag) {
                setLoad(true);

                let myData = {
                    email: values.email,
                    address: values.address,
                    accountType: values.accountType,
                    imageUrl: values.imageUrl,
                    gender: values.gender,
                    area: values.area,

                    // previous Object
                    userName: loggedUser.userName,
                    password: loggedUser.password,
                    phoneNumber: loggedUser.phoneNumber,
                }

                console.log(JSON.stringify(myData));


                const formData = new FormData();

                // Add each key-value pair from myData to the FormData
                formData.append('phoneNumber', values.phoneNumber);
                formData.append('address', values.address);
                formData.append('accountType', values.accountType);
                formData.append('gender', values.gender);
                formData.append('area', values.area);

                // Handle imageUrl separately (assuming it's a file object)

                // Get the image file
                const imageFile = values.imageUrl;

                if (imageFile) {
                    // Add the image file to FormData
                    formData.append('imageUrl', imageFile);
                } else {
                    alert("please Enter Image");
                    console.error('Image file is null');
                    setLoad(false);

                    return false;
                }

                // Add remaining properties (optional, adjust as needed)
                formData.append('userName', loggedUser.userName);
                formData.append('email', loggedUser.email);
                formData.append('password', loggedUser.password);



                axios.post(defaultApi + '/api/Register/add', formData).then((req) => {
                    console.log(req.data);
                    setLoad(false);
                    setCurrent(current + 1);
                    setUserCreatedFlag(false);
                    setLoggedUserToken(req.data);

                    localStorage.setItem("LoginToken", JSON.stringify(res.data))

                    // sessionStorage.setItem('UserToken', JSON.stringify(req.data))
                    // sessionStorage.setItem("loggedIn", true);
                    // sessionStorage.setItem("UserName", loggedUser.userName);

                }).catch((error) => {
                    console.error(error.response);
                    if (error.response.status === 409) {
                        if (error.response.data === "User already exists.") {
                            console.log("User Already Exists")
                        }
                        else {
                            console.log(error.response.data);
                        }
                        setLoad(false);
                    }
                })
            }
            else {
                setCurrent(current + 1);
                setLoad(false);
            }

        },

        validationSchema: Yup.object({
            address: Yup.string()
                .required('Required'),
            accountType: Yup.string()
                .required('Required'),
            gender: Yup.string()
                .required('Required'),
            area: Yup.string()
                .required('Required'),
            phoneNumber: Yup.string()
                .trim()
                .matches(/^\+44\d{2}\d{4}\d{4}$/, 'Enter 13 digit phone Number eg: +44XXXXXXXXXX ') // Validate phone number format (adjust as needed)
                .required('Phone number is required'),
        })
    })

    const formik3 = useFormik({
        initialValues: {
            Gender_Preferences: "Other", //select
            Religion_Preferences: "", //text
            // Country_Preferences: "", //text
            Vegan_NonVegan_Preference: true, //radio
            // GrocerySharing_Preferences: "", //bool
            WorkStatus_Preferences: "Other", //select
            Alcohol_Preferences: "No Preference", //Select
            Smoking_Preferences: false, //bool
            Noise_Preferences: "Moderate", //select
            // Pet_Preferences: "", //text
            Age_Preferences: {
                min: 18,
                max: 99
            }, //number
        },



        onSubmit: (values, action) => {
            console.log(values)
            let myData = {
                Gender_Preferences: values.Gender_Preferences,
                Religion_Preferences: values.Religion_Preferences,
                Vegan_NonVegan_Preference: values.Vegan_NonVegan_Preference,
                WorkStatus_Preferences: values.WorkStatus_Preferences,
                Alcohol_Preferences: values.Alcohol_Preferences,
                Smoking_Preferences: values.Smoking_Preferences,
                Noise_Preferences: values.Noise_Preferences,
                Age_Preferences: values.Age_Preferences,
            }

            console.log(JSON.stringify(myData));

            /* here we have to store User Data in Session and in recoilStates 
             to use them later also we need to run api for poultry Farm to created one instantly*/

            /* issue needed to handle in Backend api is just filtering on base on branch not Corresponding branch of user which
            will create issues later */
            axios.post(defaultApi + '/api/Preferences/Add', myData, {
                headers: {
                    'Authorization': `Bearer ${loggedUserToken.accessToken}`,
                    'Content-Type': 'application/json' // Optional, specify if you are sending JSON data
                }
            })
                .then((res) => {
                    console.log(res.data);
                    setPreferenceObj(res.data);
                    navigate("/Search");
                })
                .catch((err) => {
                    console.log(err);
                    console.error(err.response);
                    if (err.response.status === 400) {
                        // Handle 400 error here
                    }
                });


            // navigate("/")


        },

        validationSchema: Yup.object().shape({
            Gender_Preferences: Yup.string()
                .oneOf(['Male', 'Female', 'Other'], 'Invalid gender preference')
                .default('Other'),
            Religion_Preferences: Yup.string()
                .default(''),
            // Country_Preferences: Yup.array()
            //     .of(Yup.string())
            //     .default([]),
            // Vegan_NonVegan_Preference: Yup.string()
            //     .oneOf(['Vegan', 'Non-Vegan'], 'Invalid vegan preference')
            //     .default('Non-Vegan'),
            Vegan_NonVegan_Preference: Yup.boolean()
                .default(false),
            WorkStatus_Preferences: Yup.array()
                .of(Yup.string().oneOf(['Student', 'Employed fullTime', 'Employed PartTime', 'Unemployed', 'Other'], 'Invalid work status'))
                .default(['Other']),
            Alcohol_Preferences: Yup.string()
                .oneOf(['No Preference', 'Social Drinker', 'Non-Drinker', 'Occasional'], 'Invalid alcohol preference')
                .default('No Preference'),
            Smoking_Preferences: Yup.boolean()
                .default(false),
            Noise_Preferences: Yup.string()
                .oneOf(['Quiet', 'Moderate', 'Loud'], 'Invalid noise preference')
                .default('Moderate'),
            Age_Preferences: Yup.object().shape({
                min: Yup.number()
                    .min(0, 'Minimum age must be at least 0')
                    .max(150, 'Minimum age cannot be more than 150')
                    .default(18),
                max: Yup.number()
                    .min(Yup.ref('min'), 'Maximum age must be greater than or equal to minimum age')
                    .max(150, 'Maximum age cannot be more than 150')
                    .default(99)
            })
        })
    })

    const [current, setCurrent] = useState(0);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const maxMemorySize = 900 * 1024; // 900 KB in bytes

            const reader = new FileReader();

            reader.onload = async (e) => {
                try {
                    // Check image memory size
                    const imageData = e.target.result.split(',')[1]; // Get data URL content
                    const imageBytes = atob(imageData).length; // Decode and get byte length

                    if (imageBytes > maxMemorySize) {
                        alert("Image size exceeds 900 KB. Please choose a smaller image.");
                        return;
                    }

                    setImageSrc(e.target.result);
                } catch (error) {
                    console.error("Error loading image:", error);
                }
            };

            reader.readAsDataURL(file);
        }
    };


    const options = [
        { value: 'Student', label: 'Student' },
        { value: 'Employed fullTime', label: 'Employed fullTime' },
        { value: 'Employed PartTime', label: 'Employed PartTime' },
        { value: 'Unemployed', label: 'Unemployed' },
        { value: 'Other', label: 'Other' }
    ];

    let GOBack = () => {
        if (current === 2) {
            setCurrent(0);
            setProceed(false);
        }
        else if (current === 3) {
            setCurrent(current - 1);
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center align-items-center vh-100'>
                <div className='col-md-8'>
                    <Card className='shadow' data-aos="flip-left" data-aos-duration="800">
                        {!proceed &&
                            <div className="row align-items-stretch ">
                                <div className="col-md-6 order-md-2 order-1 d-flex justify-content-center align-items-center">
                                    <Image src={FarmSVG} alt='Farm SVG' fluid className='w-100' />
                                </div>
                                <div className="col-md-6 order-2 order-md-1">
                                    <div className='d-flex w-100 h-100 justify-content-center align-items-center'>
                                        <form className='w-100' onSubmit={formik.handleSubmit}>
                                            <div className='row mt-2'>
                                                <div className='col-md-12 text-center'>
                                                    <h3><b>REGISTER</b></h3>
                                                </div>
                                            </div>
                                            {current == 0 &&
                                                <React.Fragment>
                                                    <div className='row mt-2 justify-content-center'>
                                                        <div className='col-md-10'>
                                                            <label htmlFor='userName'>Name</label>
                                                            <input autoComplete='off' className='form-control' type="string" id='userName' placeholder="Enter your name" name="userName"
                                                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userName} />
                                                            {formik.touched.userName && formik.errors.userName ? <div className='text-danger'>{formik.errors.userName}</div> : null}
                                                        </div>
                                                    </div>

                                                    <div className='row mt-2 justify-content-center'>
                                                        <div className='col-md-10'>
                                                            <label htmlFor='email'>Email</label>
                                                            <input autoComplete='off' className='form-control' type="string" id='email' placeholder="example@gmail.com" name="email"
                                                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                                                            {formik.touched.email && formik.errors.email ? <div className='text-danger'>{formik.errors.email}</div> : null}

                                                        </div>
                                                    </div>

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

                                                    <div className='row mt-3 mb-2 justify-content-center '>
                                                        <div className='col-md-10'>
                                                            <p className='p-0 m-0'>I already have an Account <Link to='/auth/login' className='C-color'>Login</Link></p>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            }
                                            {current == 1 &&
                                                <React.Fragment>
                                                    <div className='row mt-2 justify-content-center mb-3'>
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
                                                            <p className='p-0 mt-2'>An OTP is Send on: <br /> {loggedUser.email}</p>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            }

                                            <div className='row justify-content-center '>
                                                <div className='col-md-10'>
                                                    <button type='submit' className='primary btn w-100 '>
                                                        {current == 0 ? "Sign Up" : "Check"}
                                                    </button>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>}

                        {proceed && <div className="row justify-content-center ">

                            <div className='col-md-10'>
                                <div className='row mt-2 mb-md-4'>
                                    <div className='col-md-12 text-center'>
                                        {current === 2 &&
                                            <h3><b>Your Address</b></h3>
                                        }
                                        {current === 3 &&
                                            <h3><b>Add Preferences</b></h3>
                                        }

                                    </div>
                                </div>
                                <div className=' d-none d-md-block'>
                                    <Steps
                                        responsive={true}
                                        current={current - 1}
                                        // onChange={onChange}
                                        items={[
                                            {
                                                title: 'Step 1',
                                                description: "Login",
                                            },
                                            {
                                                title: 'Step 2',
                                                description: "Your Address",
                                            },
                                            {
                                                title: 'Step 3',
                                                description: "Add Preferences",
                                            },
                                        ]}
                                    />
                                </div>
                            </div>

                            {!load &&
                                <div className='col-md-10 mt-md-4'>

                                    {current === 2 &&
                                        <div className='row mt-2 justify-content-center align-items-start RegisterAddressBlock'>
                                            <div className='col-md-2  mb-3 '>
                                                <div className='row justify-content-center'>
                                                    <label for="imageUrl" className='curserPointer text-center px-5 mt-2 px-md-0'  >
                                                        {previewImage ? (
                                                            <Image fluid src={previewImage} roundedCircle className='ProfileImgSize' />
                                                        ) : (
                                                            <Image fluid src={sampleImage2} roundedCircle className='ProfileImgSize' /> // Fallback image
                                                        )}
                                                    </label>
                                                    <div className='col-md-12 px-5 px-md-0'>
                                                        <label for="imageUrl" className="text-center h5 w-100 fw-bold curserPointer  mt-3">Profile Pic</label>
                                                        <input
                                                            autoComplete='off'
                                                            className='form-control d-none'
                                                            type="file"
                                                            id='imageUrl'
                                                            placeholder="file"
                                                            name="imageUrl"
                                                            onChange={(event) => {
                                                                formik2.setFieldValue("imageUrl", event.currentTarget.files[0]);
                                                                handleImageChange(event);
                                                            }}
                                                            onBlur={formik2.handleBlur} // Optional
                                                        />
                                                    </div>
                                                </div>
                                            </div>


                                            <div className='col-md-5'>

                                                <label htmlFor='phoneNumber'>Phone</label>

                                                <input autoComplete='off' className='form-control' type="string" id='phoneNumber' placeholder="+44XXXXXXXXXX" name="phoneNumber"
                                                    onChange={formik2.handleChange} onBlur={formik2.handleBlur} value={formik2.values.phoneNumber} />
                                                {formik2.touched.phoneNumber && formik2.errors.phoneNumber ? <div className='text-danger'>{formik2.errors.phoneNumber}</div> : null}

                                                <label htmlFor='accountType' className='mt-3'>looking for Room or Roommates?</label>
                                                <select autoComplete='off'
                                                    className='form-select'
                                                    type="string" id='accountType' name="accountType"
                                                    onChange={formik2.handleChange} onBlur={formik2.handleBlur} value={formik2.values.accountType} >
                                                    <option value="seeking">Room</option>
                                                    <option value="providing">Roommates</option>
                                                </select>
                                                {formik2.touched.accountType && formik2.errors.accountType ? <div className='text-danger'>{formik2.errors.accountType}</div> : null}
                                            </div>

                                            <div className='col-md-5 mt-2 mt-md-0'>
                                                <label htmlFor='gender'>Gender</label>
                                                <select autoComplete='off'
                                                    className='form-select'
                                                    type="string" id='gender' name="gender"
                                                    onChange={formik2.handleChange} onBlur={formik2.handleBlur} value={formik2.values.gender} >
                                                    <option value={"Male"}>Male</option>
                                                    <option value={"Female"}>Female</option>
                                                </select>
                                                {formik2.touched.gender && formik2.errors.gender ? <div className='text-danger'>{formik2.errors.gender}</div> : null}
                                                <label htmlFor='area' className='mt-3'>Area</label>
                                                <input autoComplete='off' className='form-control' type="text" id='area' placeholder="Enter your area name" name="area"
                                                    onChange={formik2.handleChange} onBlur={formik2.handleBlur} value={formik2.values.area} />
                                                {formik2.touched.area && formik2.errors.area ? <div className='text-danger'>{formik2.errors.area}</div> : null}
                                            </div>


                                            <div className='col-md-12 '>
                                                <label htmlFor='address'>Address</label>
                                                <textarea rows="2" cols="3" autoComplete='off' className='form-control' type="string" id='address' placeholder="address" name="address"
                                                    onChange={formik2.handleChange} onBlur={formik2.handleBlur} value={formik2.values.address} />
                                                {formik2.touched.address && formik2.errors.address ? <div className='text-danger'>{formik2.errors.address}</div> : null}
                                            </div>
                                        </div>}

                                    {current === 3 &&
                                        <div className='row mb-4 justify-content-center'>
                                            <div className='col-md-6 mt-2'>
                                                <label htmlFor='Gender_Preferences'>Gender Preferences</label>
                                                <select autoComplete='off'
                                                    className='form-select' type="text"
                                                    id='Gender_Preferences' name="Gender_Preferences"
                                                    onChange={formik3.handleChange} onBlur={formik3.handleBlur} value={formik3.values.Gender_Preferences} >
                                                    <option value={"Male"}>Male</option>
                                                    <option value={"Female"}>Female</option>
                                                    <option value={"Other"}>Other</option>
                                                </select>
                                                {formik3.touched.Gender_Preferences && formik3.errors.Gender_Preferences ? <div className='text-danger'>{formik3.errors.Gender_Preferences}</div> : null}
                                            </div>


                                            <div className='col-md-6 mt-2'>
                                                <label htmlFor='Religion_Preferences'>Religion Preferences</label>
                                                <input autoComplete='off' className='form-control' type="text" id='Religion_Preferences' placeholder="Enter Religion Preferences" name="Religion_Preferences"
                                                    onChange={formik3.handleChange} onBlur={formik3.handleBlur} value={formik3.values.Religion_Preferences} />
                                                {formik3.touched.Religion_Preferences && formik3.errors.Religion_Preferences ? <div className='text-danger'>{formik3.errors.Religion_Preferences}</div> : null}
                                            </div>

                                            <div className={`col-md-6 mt-2`}>
                                                <label htmlFor='Vegan_NonVegan_Preference'>Food Preference</label>

                                                <div className="preference-container">
                                                    <div
                                                        className={`preference-box ${formik3.values.Vegan_NonVegan_Preference === true ? "selected" : ""}`}
                                                        onClick={() => formik3.setFieldValue('Vegan_NonVegan_Preference', true)}
                                                    >
                                                        Vegans
                                                    </div>
                                                    <div
                                                        className={`preference-box ${formik3.values.Vegan_NonVegan_Preference === false ? "selected" : ""}`}
                                                        onClick={() => formik3.setFieldValue('Vegan_NonVegan_Preference', false)}
                                                    >
                                                        Non-Vegan
                                                    </div>
                                                </div>

                                                {formik3.touched.Vegan_NonVegan_Preference && formik3.errors.Vegan_NonVegan_Preference ?
                                                    <div className='text-danger'>{formik3.errors.Vegan_NonVegan_Preference}</div>
                                                    : null
                                                }
                                            </div>

                                            <div className='col-md-6 mt-2'>
                                                <label htmlFor='WorkStatus_Preferences'>Work Status Preferences</label>
                                                <Select
                                                    isMulti
                                                    name="WorkStatus_Preferences"
                                                    options={options}
                                                    className='basic-multi-select'
                                                    classNamePrefix='select'
                                                    onChange={(selectedOptions) => {
                                                        formik3.setFieldValue('WorkStatus_Preferences', selectedOptions.map(option => option.value));
                                                    }}
                                                    onBlur={formik3.handleBlur}
                                                    value={options.filter(option => formik3.values.WorkStatus_Preferences.includes(option.value))}
                                                />
                                                {formik3.touched.WorkStatus_Preferences && formik3.errors.WorkStatus_Preferences ? (
                                                    <div className='text-danger'>{formik3.errors.WorkStatus_Preferences}</div>
                                                ) : null}
                                            </div>

                                            <div className='col-md-6 mt-2'>
                                                <label htmlFor='Alcohol_Preferences'>Alcohol Preferences</label>
                                                <select autoComplete='off'
                                                    className='form-select' type="text"
                                                    id='Alcohol_Preferences' name="Alcohol_Preferences"
                                                    onChange={formik3.handleChange} onBlur={formik3.handleBlur} value={formik3.values.Alcohol_Preferences} >
                                                    <option value={"No Preference"}>No Preference</option>
                                                    <option value={"Social Drinker"}>Social Drinker</option>
                                                    <option value={"Non-Drinker"}>Non-Drinker</option>
                                                    <option value={"Occasional"}>Occasional</option>
                                                </select>
                                                {formik3.touched.Alcohol_Preferences && formik3.errors.Alcohol_Preferences ? <div className='text-danger'>{formik3.errors.Alcohol_Preferences}</div> : null}
                                            </div>

                                            <div className='col-md-6 mt-2'>
                                                <label htmlFor='Noise_Preferences'>Noise Preferences</label>
                                                <select autoComplete='off'
                                                    className='form-select' type="text"
                                                    id='Noise_Preferences' name="Noise_Preferences"
                                                    onChange={formik3.handleChange} onBlur={formik3.handleBlur} value={formik3.values.Noise_Preferences} >
                                                    <option value={"Quiet"}>Quiet</option>
                                                    <option value={"Moderate"}>Moderate</option>
                                                    <option value={"Loud"}>Loud</option>
                                                </select>
                                                {formik3.touched.Noise_Preferences && formik3.errors.Noise_Preferences ? <div className='text-danger'>{formik3.errors.Noise_Preferences}</div> : null}
                                            </div>

                                            <div className={`col-md-6 mt-2`}>
                                                <label htmlFor='Smoking_Preferences'>Smoking Preferences</label>

                                                <div className="preference-container">
                                                    <div
                                                        className={`preference-box ${formik3.values.Smoking_Preferences === true ? "selected" : ""}`}
                                                        onClick={() => formik3.setFieldValue('Smoking_Preferences', true)}
                                                    >
                                                        Smoker
                                                    </div>
                                                    <div
                                                        className={`preference-box ${formik3.values.Smoking_Preferences === false ? "selected" : ""}`}
                                                        onClick={() => formik3.setFieldValue('Smoking_Preferences', false)}
                                                    >
                                                        Non-Smoker
                                                    </div>
                                                </div>

                                                {formik3.touched.Smoking_Preferences && formik3.errors.Smoking_Preferences ?
                                                    <div className='text-danger'>{formik3.errors.Smoking_Preferences}</div>
                                                    : null
                                                }
                                            </div>

                                            <div className='col-md-6 mt-2'>
                                                <label htmlFor='Age_Preferences'>Age Preferences</label>

                                                <InputGroup>
                                                    <input
                                                        autoComplete='off'
                                                        className='form-control'
                                                        type='number'
                                                        id='Age_Preferences_min'
                                                        placeholder='Enter minimum age'
                                                        name='Age_Preferences.min'
                                                        onChange={formik3.handleChange}
                                                        onBlur={formik3.handleBlur}
                                                        value={formik3.values.Age_Preferences.min}
                                                    />
                                                    <input
                                                        autoComplete='off'
                                                        className='form-control'
                                                        type='number'
                                                        id='Age_Preferences_max'
                                                        placeholder='Enter maximum age'
                                                        name='Age_Preferences.max'
                                                        onChange={formik3.handleChange}
                                                        onBlur={formik3.handleBlur}
                                                        value={formik3.values.Age_Preferences.max}
                                                    />
                                                </InputGroup>


                                                {/* Display errors for min and max separately */}
                                                {(formik3.touched.Age_Preferences?.min && formik3.errors.Age_Preferences?.min) ||
                                                    (formik3.touched.Age_Preferences?.max && formik3.errors.Age_Preferences?.max) ? (
                                                    <div className='text-danger'>
                                                        {formik3.touched.Age_Preferences?.min && formik3.errors.Age_Preferences?.min ? (
                                                            <div>{formik3.errors.Age_Preferences.min}</div>
                                                        ) : null}
                                                        {formik3.touched.Age_Preferences?.max && formik3.errors.Age_Preferences?.max ? (
                                                            <div>{formik3.errors.Age_Preferences.max}</div>
                                                        ) : null}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    }

                                    <div className='row justify-content-between'>
                                        <div className='col-md-2 mt-2'>
                                            <button type='submit' onClick={GOBack} className='primary btn w-100'>Back</button>
                                        </div>

                                        <div className='col-md-2 mt-2'>
                                            {/**<button type='submit' onClick={() => { if (current === 1) { alert("Befor junga"); formik2.handleSubmit() } else { formik3.handleSubmit() } }} className='primary btnReverse w-100'>Next</button> */}
                                            <button
                                                type='submit'
                                                onClick={() => (current === 2 ? formik2.handleSubmit() : formik3.handleSubmit())}
                                                className='primary btn w-100'
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>

                                </div>}

                            {load && <div className='col-md-10 mt-md-4'>
                                <div className='row justify-content-center align-items-center' style={{ height: "20rem" }}>

                                    <Spin tip="Registering user, please wait..." size="large">
                                        &nbsp;
                                    </Spin>

                                </div>
                            </div>}

                        </div>}
                    </Card>
                </div>
            </div>
        </div>
    )


}

export default Register