import React, { useEffect } from 'react';
import LoginForm from '../Components/Auth/LoginForm';
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminLayouts from './AdminLayouts';

const SuperAdminRoutes = () => {
  let nav = useNavigate();

  // useEffect(() => {
  //   let accessTokenJWT = localStorage.getItem("SAdminToken");
  //   // If there is no token, navigate to the login page
  //   if (!accessTokenJWT) {
  //     nav("/SuperAdmin/Login");
  //   }
  // }, [nav]);  // Added nav to the dependency array

  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/*" element={<AdminLayouts />} />
      </Routes>
    </div>
  );
}

export default SuperAdminRoutes;
