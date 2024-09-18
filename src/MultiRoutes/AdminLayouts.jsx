import React, { useState } from 'react';
import { Route, Routes, } from "react-router-dom";
import AdminSideBar from '../Components/SideBar/AdminSideBar';
import AdminTopMenu from '../Components/SideBar/AdminTopMenu';
import InstituteAndOffer from '../Components/SuperAdminComponent/InstituteAndOffer';

const AdminLayouts = () => {

    const [collapsed, setCollapsed] = useState(true);

    return (
        <div className="container-fluid p-0 d-flex flex-row">
            <AdminSideBar collapsed={collapsed}
                setCollapsed={setCollapsed} />
            <div className="flex-grow-1">
                <AdminTopMenu collapsed={collapsed}
                    setCollapsed={setCollapsed} />

                <Routes>
                    <Route path="/" element={<InstituteAndOffer />} />
                </Routes>

                <div style={{ backgroundColor: "lightgray" }} className='w-100 py-2 d-flex justify-content-center align-items-center'>
                    @Copy Rights is Owned my Fahad Tech Solution
                </div>

            </div>
        </div>
    );
};

export default AdminLayouts;