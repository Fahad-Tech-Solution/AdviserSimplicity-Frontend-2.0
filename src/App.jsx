import "./App.css";
import React, { useEffect, useState } from "react";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Dashboard from "./Components/Dashboard/Dashboard";

import { Route, Routes } from "react-router-dom";
import LoginForm from "./Components/Auth/LoginForm";
import Register from "./Components/Auth/Register";
import ForgetPassword from "./Components/Auth/ForgetPassword";
import VerifyEmail from "./Components/Auth/VerifyEmail";
import AuthRouts from "./MultiRoutes/AuthRouts";
import SuperAdminRouts from "./MultiRoutes/SuperAdminRouts";

import Aos from "aos";
import "aos/dist/aos.css";

function App() {

  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 100,
      disable: "mobile",
    });
  }, []);


  return (
    <div>
      <Routes>
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/VerifyEmail" element={<VerifyEmail />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/SuperAdmin/*" element={<SuperAdminRouts />} />
        <Route path="/*" element={<AuthRouts />} />
      </Routes>
    </div>
  )
}

export default App
