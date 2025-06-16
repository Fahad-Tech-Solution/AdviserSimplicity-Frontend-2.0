import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import RecoilStateManage from "../../RecoilStateManage/RecoilStateManage";
import { content } from "../../Content/Content";
import CashFlowLayout from "./CashFlowLayout";
import CashFlowAllUsers from "./CashFlowAllUsers";
import FunnalComp from "../Reports/FunnalComp";
import Reports from "../Reports/Reports";
import AdminSideBar from "../../Components/SideBar/AdminSideBar";
import CashFlowOneClient from "./CashFlowOneClient";

const CashFlow = () => {
  const [switchState, setSwitchState] = useState("true");
  const [sideSwitchMenu, setSideSwitchMenu] = useState(true);
  const [collapsed, setCollapsed] = useState(true);

  let { cashFlow } = content;

  return (
    <div className="container-fluid p-0 d-flex flex-row align-items-stretch">
      <RecoilStateManage />

      <div>
        {/* <SideBar onSubmit={setSwitchState} Side={sideSwitch} /> */}
        <AdminSideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <div
        className="flex-grow-1 w-100"
        style={{
          paddingLeft: !sideSwitchMenu ? "50px" : "0px",
          transition: "padding 0.3s", // Smooth transition for width change
        }}
      >
        <div>
          <Routes>
            <Route
              path={"/AllUsers"}
              element={<CashFlowAllUsers collapsed={collapsed} />}
            />
            <Route
              path={"/oneClient"}
              element={<CashFlowOneClient collapsed={collapsed} />}
            />
            <Route path={"/Reports/*"} element={<Reports />} />
            <Route path={"/*"} element={<CashFlowLayout />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default CashFlow;
