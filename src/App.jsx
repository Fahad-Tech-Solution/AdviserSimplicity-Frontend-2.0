import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Loading, LoggedInUserData, LoggedInUserTokenJwt } from "./Store/Store";
import Aos from "aos";
import "aos/dist/aos.css";
import { Spin } from "antd";

import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

/* 🔥 Lazy-loaded pages */
const LoginForm = lazy(() => import("./Components/Auth/LoginForm"));
const Register = lazy(() => import("./Components/Auth/Register"));
const ForgetPassword = lazy(() => import("./Components/Auth/ForgetPassword"));
const VerifyEmail = lazy(() => import("./Components/Auth/VerifyEmail"));
const PasswordChange = lazy(() => import("./Components/Auth/PasswordChange"));

const PricingTable = lazy(() =>
  import("./Components/SuperAdminComponent/PricingTable")
);
const StripeRedirect = lazy(() =>
  import("./Components/SuperAdminComponent/StripeRedirect")
);

const AuthRouts = lazy(() => import("./MultiRoutes/AuthRouts"));
const SuperAdminRouts = lazy(() => import("./MultiRoutes/SuperAdminRouts"));
const CashFlow = lazy(() => import("./CashFlow/CashFlowComponent/CashFlow"));

const Unauthorized = lazy(() => import("./Components/Auth/Unauthorized"));
const Warning = lazy(() => import("./Components/SuperAdminComponent/Warning"));
const BuyAdviserlink = lazy(() =>
  import("./Components/SuperAdminComponent/BuyAdviserlink")
);

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

      {/* 🔥 Suspense fallback for lazy components */}
      <Suspense
        fallback={
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin size="large" />
          </div>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/user/login" element={<LoginForm />} />
          <Route path="/user/warning" element={<Warning />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/verify-email" element={<VerifyEmail />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/change-password" element={<PasswordChange />} />
          <Route path="/pricing-table" element={<PricingTable />} />
          <Route path="/buy-adviser-link" element={<BuyAdviserlink />} />
          <Route path="/admin/login" element={<LoginForm />} />
          <Route path="/stripe-redirect" element={<StripeRedirect />} />

          {/* Protected Routes */}
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

          {/* Catch All */}
          <Route path="*" element={<Navigate to="/user/login" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
