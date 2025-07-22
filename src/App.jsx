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
import { Loading, LoggedInUserData, LoggedInUserTokenJwt } from "./Store/Store";
import { Spin } from "antd";
import ProfileTemp from "./Components/Assets/ProfileSection/ProfileTemp";
import StripeRedirect from "./Components/SuperAdminComponent/StripeRedirect";
import PasswordChange from "./Components/Auth/PasswordChange";
import PricingTable from "./Components/SuperAdminComponent/PricingTable";

function App() {
  let [loadingState, setLoading] = useRecoilState(Loading);
  let loggedUser = useRecoilValue(LoggedInUserData);
  let loggedUserJWT = useRecoilValue(LoggedInUserTokenJwt);
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

  // useEffect(() => {
  //   const allowedPaths = [
  //     "/user/login",
  //     "/user/register",
  //     "/user/verify-email",
  //     "/forget-password",
  //     "/change-password",
  //     "/pricing-table",
  //     "/admin/login",
  //     "/stripe-redirect",
  //     "/stripe-redirect",
  //   ];

  //   const isLoggedIn = loggedUser && loggedUser.roleID && loggedUserJWT;

  //   if (!allowedPaths.includes(location.pathname)) {
  //     if (!isLoggedIn) {
  //       Nav("/user/login");
  //     } else {
  //       // here i want to add route ristrictions according to user roles
  //       // if (){}
  //     }
  //     setAuthLoading(false);
  //   }
  // }, [location, loggedUser]);

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
        <Route path="/user/login" element={<LoginForm />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/verify_email" element={<VerifyEmail />} />
        <Route path="/forget_password" element={<ForgetPassword />} />
        <Route path="/change_password" element={<PasswordChange />} />
        <Route path="/pricing_table" element={<PricingTable />} />
        <Route path="/admin/login" element={<LoginForm />} />
        <Route path="/stripe_redirect" element={<StripeRedirect />} />
        <Route path="/stripe_redirect" element={<StripeRedirect />} />
      </Routes>
      {!authLoading && (
        <Routes>
          <Route path="/super/admin/*" element={<SuperAdminRouts />} />
          <Route path="/user/cashflow/*" element={<CashFlow />} />
          <Route path="/user/*" element={<AuthRouts />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
