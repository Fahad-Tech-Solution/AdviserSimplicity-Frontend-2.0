import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

import LoginForm from "./Components/Auth/LoginForm";
import Register from "./Components/Auth/Register";
import ForgetPassword from "./Components/Auth/ForgetPassword";
import VerifyEmail from "./Components/Auth/VerifyEmail";
import PasswordChange from "./Components/Auth/PasswordChange";
import PricingTable from "./Components/SuperAdminComponent/PricingTable";
import StripeRedirect from "./Components/SuperAdminComponent/StripeRedirect";

import AuthRouts from "./MultiRoutes/AuthRouts";
import SuperAdminRouts from "./MultiRoutes/SuperAdminRouts";
import CashFlow from "./CashFlow/CashFlowComponent/CashFlow";

import { useRecoilValue } from "recoil";
import { Loading, LoggedInUserData, LoggedInUserTokenJwt } from "./Store/Store";

import Aos from "aos";
import "aos/dist/aos.css";
import { Spin } from "antd";

import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Unauthorized from "./Components/Auth/Unauthorized";
import Warning from "./Components/SuperAdminComponent/Warning";

function ProtectedRoute({ element: Element, requiredPermissions = [] }) {
  const user = useRecoilValue(LoggedInUserData);
  const token = useRecoilValue(LoggedInUserTokenJwt);

  if (!token || !user) {
    return <Navigate to="/user/login" replace />;
  }

  const userPermissions = user?.roleID?.permissions || [];

  // If specific permissions are required and none match, block access
  const hasPermission =
    requiredPermissions.length === 0 ||
    requiredPermissions.some((permission) =>
      userPermissions.includes(permission)
    );

  if (!hasPermission) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Element />;
}

function App() {
  const loadingState = useRecoilValue(Loading);

  useEffect(() => {
    Aos.init({ duration: 1800, offset: 100, disable: "mobile" });
  }, []);

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
          <Spin size="large" />
        </div>
      )}

      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/user/login" element={<LoginForm />} />
        <Route path="/user/warning" element={<Warning />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/verify-email" element={<VerifyEmail />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/change-password" element={<PasswordChange />} />
        <Route path="/pricing-table" element={<PricingTable />} />
        <Route path="/admin/login" element={<LoginForm />} />
        <Route path="/stripe-redirect" element={<StripeRedirect />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/super/admin/*"
          element={
            <ProtectedRoute
              element={SuperAdminRouts}
              requiredPermissions={["superAdmin"]}
            />
          }
        />
        <Route
          path="/user/cashflow/*"
          element={
            <ProtectedRoute
              element={CashFlow}
              requiredPermissions={["cashflow"]}
            />
          }
        />
        <Route
          path="/user/*"
          element={
            <ProtectedRoute
              element={AuthRouts}
              requiredPermissions={["fact find", "prospects"]}
            />
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* 🔁 Catch-All Route (optional) */}
        <Route path="*" element={<Navigate to="/user/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
