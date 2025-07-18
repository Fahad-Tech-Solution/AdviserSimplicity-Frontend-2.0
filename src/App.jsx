import "./App.css";
import React, { useEffect, useState } from "react";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./Components/Auth/LoginForm";
import Register from "./Components/Auth/Register";
import ForgetPassword from "./Components/Auth/ForgetPassword";
import VerifyEmail from "./Components/Auth/VerifyEmail";
import AuthRouts from "./MultiRoutes/AuthRouts";
import SuperAdminRouts from "./MultiRoutes/SuperAdminRouts";

import Aos from "aos";
import "aos/dist/aos.css";
import CashFlow from "./CashFlow/CashFlowComponent/CashFlow";
import { useRecoilState, useRecoilValue } from "recoil";
import { Loading, LoggedInUserData } from "./Store/Store";
import { Spin } from "antd";
import ProfileTemp from "./Components/Assets/ProfileSection/ProfileTemp";
import StripeRedirect from "./Components/SuperAdminComponent/StripeRedirect";
import PasswordChange from "./Components/Auth/PasswordChange";
import PricingTable from "./Components/SuperAdminComponent/PricingTable";

function App() {
  let [loadingState, setLoading] = useRecoilState(Loading);
  let loggedUser = useRecoilValue(LoggedInUserData);
  let [authLoading, setAuthLoading] = useState(true);

  let location = useLocation();
  let Nav = useNavigate();

  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 100,
      disable: "mobile",
    });
  }, []);

  useEffect(() => {
    const allowedPaths = [
      "/",
      "/VerifyEmail",
      "/ForgetPassword",
      "/ChangePassword",
      "/PricingTable",
      "/stripe-redirect",
      "/AdminLogin",
    ];

    const isLoggedIn = loggedUser && loggedUser._id;

    if (!allowedPaths.includes(location.pathname)) {
      if (!isLoggedIn) {
        Nav("/");
      }
      setAuthLoading(false);
    }
  }, [location, loggedUser]);

  return (
    <div className="position-relative">
      {loadingState && (
        <div
          className="position-absolute top-0 d-flex justify-content-center align-items-center bg-gray"
          style={{
            width: "100%",
            height: "100%",
            minHeight: "100vh",
            zIndex: "1000",
          }}
        >
          <Spin
            size="large"
            style={{ width: "fit-content", height: "fit-content" }}
          ></Spin>
        </div>
      )}

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/AdminLogin" element={<LoginForm />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/VerifyEmail" element={<VerifyEmail />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/ChangePassword" element={<PasswordChange />} />
        <Route path="/PricingTable" element={<PricingTable />} />
        <Route path="/stripe-redirect" element={<StripeRedirect />} />
        <Route path="/stripe-redirect" element={<StripeRedirect />} />
      </Routes>
      {!authLoading && (
        <Routes>
          <Route path="/SuperAdmin/*" element={<SuperAdminRouts />} />
          <Route path="/Cash-Flow/*" element={<CashFlow />} />
          <Route path="/*" element={<AuthRouts />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
