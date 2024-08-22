import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";



// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import InternetSVG from "../../assets/Svgs/Connected world-pana.svg"

import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Card } from 'antd';



import { Image } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultApiUrl, LoggedInUserData, LoggedInUserTokenJwt } from '../../Atom';
import LoginSVG from './LoginSVG';
import { openNotificationSuccess } from '../../assets/Alert/Alert';

const LoginForm = () => {
  var navigate = useNavigate();
  let defaultApi = useRecoilValue(defaultApiUrl);
  let [loggedUser, setLoggedUser] = useRecoilState(LoggedInUserData);
  let [loggedUserToken, setLoggedUserToken] = useRecoilState(LoggedInUserTokenJwt)

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const formik = useFormik({

    initialValues: {

      email: "",
      password: "",

    },

    onSubmit: (values, action) => {

      let mydata = {
        email: values.email,
        password: values.password,
      }
      console.log("mydata:", mydata)

      axios
        .post(defaultApi + "/api/Login", mydata)
        .then((res) => {


          console.log(res);
          if (res.status === 201) {
            console.log(res.data);

            setLoggedUserToken(res.data);
            localStorage.setItem("LoginToken", JSON.stringify(res.data))

            action.resetForm();
            navigate("/Search");
          }
        }
        )
        .catch((error) => {
          if (error.response.status === 400) {
            console.log("error log", error.response);
            let type = "error";
            let placement = "topRight"
            let message = "Email or Password is Wrong"
            let description = "Please! Something Went Wrong"
            openNotificationSuccess(type, placement, message, description)
          }
        });
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Required'),
      password: Yup.string().min(6).required('Please enter your password')
    })
  })

  return (
    <div className='container-fluid'>
      <div className='row justify-content-center align-items-center vh-100'>
        <div className='col-md-8'>
          <Card className='shadow' data-aos="flip-left" data-aos-duration="800">
            <div className="row align-items-stretch">
              <div className="col-md-6">
                <Image src={InternetSVG} alt='Loginimg' fluid />
              </div>
              <div className="col-md-6">
                <div className='d-flex w-100 h-100 justify-content-center align-items-center'>
                  <form className='w-100' onSubmit={formik.handleSubmit}>
                    <div className='row mt-4'>
                      <div className='col-md-12 text-center'>
                        <h3><b>LOGIN</b></h3>
                      </div>
                    </div>

                    <div className='row mt-3'>
                      <div className='col-md-1'></div>
                      <div className='col-md-10'>
                        <label htmlFor='email'>Email</label>
                        <input autoComplete='off' className='form-control' type="email" id='email' placeholder="someone@example.com" name="email"
                          onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                        {formik.touched.email && formik.errors.email ? <div className='text-danger'>{formik.errors.email}</div> : null}
                      </div>
                      <div className='col-md-1'></div>
                    </div>

                    <div className='row mt-3'>
                      <div className='col-md-1'></div>
                      <div className='col-md-10'>
                        <label htmlFor='password'>Password</label>
                        <input className='form-control' type="password" id='password' placeholder="Password" name='password'
                          onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                        {formik.touched.password && formik.errors.password ? <div className='text-danger'>{formik.errors.password}</div> : null}
                      </div>
                      <div className='col-md-1'></div>
                    </div>

                    <div className='row my-2 justify-content-center '>
                      <div className='col-md-10'>
                        <p><Link to='/auth/ForgetPassword' className='C-color'>Forgot Password</Link></p>
                      </div>
                    </div>

                    <div className='row justify-content-center '>
                      <div className='col-md-10'>
                        <button type='submit' className='primary btn w-100 '>Login</button>
                      </div>
                    </div>

                    <div className='row my-2 justify-content-center '>
                      <div className='col-md-10'>
                        <p>I don't have Account <Link to='/auth/Register' className='C-color'>Register</Link></p>
                      </div>
                    </div>


                  </form>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )


}

export default LoginForm