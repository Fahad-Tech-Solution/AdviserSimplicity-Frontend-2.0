import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SideBar from "../../Components/SideBar/SideBarrr";
import RecoilStateManage from "../../RecoilStateManage/RecoilStateManage";
import { content } from "../../Content/Content";
import CashFlowLayout from "./CashFlowLayout";
import CashFlowAllUsers from "./CashFlowAllUsers";
import FunnalComp from "../Reports/FunnalComp";
import Reports from "../Reports/Reports";

const CashFlow = () => {
  const [switchState, setSwitchState] = useState("true");
  const [sideSwitchMenu, setSideSwitchMenu] = useState(true);

  const [sidePadding, setSidePadding] = useState("100px");

  let sideSwitch = (elem) => {
    setSideSwitchMenu(elem);
    if (elem) {
      setSidePadding("100px");
    } else {
      setSidePadding("313px");
    }
  };

  let { cashFlow } = content;

  return (
    <div className="container-fluid p-0 d-flex flex-row">
      <RecoilStateManage />

      <div
        className="d-none d-md-block"
        style={{
          width: sidePadding,
          transition: "width 0.3s", // Smooth transition for width change
        }}
      >
        <SideBar onSubmit={setSwitchState} Side={sideSwitch} />
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
              element={
                <CashFlowAllUsers
                  switchState={switchState}
                  sideSwitchMenu={sideSwitchMenu}
                />
              }
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
