import React from 'react'
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminSideBar from '../Components/SideBar/AdminSideBar';

const AdminLayouts = () => {
    return (
        <div className="container-fluid">
            <div className="row">

                <AdminSideBar />

                <div className="container-fluid p-0 m-0">
                    <Routes>
                        { // <Route path="/" element={<AdminLayouts />} />
                        }
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default AdminLayouts
