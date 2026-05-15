import React, { useEffect } from 'react';
import LoginForm from '../Components/Auth/LoginForm';
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminLayouts from './AdminLayouts';

const SuperAdminRoutes = () => {
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
