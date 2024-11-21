import React, { useState } from 'react';
import { Route, Routes, } from "react-router-dom";
import SideBar from "../../Components/SideBar/SideBarrr";
import CashFlowOptions from '../CashFlowOptions/CashFlowOptions';
import RecoilStateManage from '../../RecoilStateManage/RecoilStateManage';
import { content } from '../../Content/Content';
import CashFlowSections from '../CashFlowSections/CashFlowSections';
import CashFlowLayout from './CashFlowLayout';
import AllUsers from './AllUsers';

const CashFlow = () => {

  const [switchState, setSwitchState] = useState("true");
  const [sideSwitchMenu, setSideSwitchMenu] = useState(true);

  const [sidePadding, setSidePadding] = useState('100px');

  let sideSwitch = (elem) => {
    setSideSwitchMenu(elem)
    if (elem) {
      setSidePadding('100px');
    }
    else {
      setSidePadding('313px');
    }
  }

  let { cashFlow } = content;


  return (
    <div className="container-fluid p-0 d-flex flex-row">
      <RecoilStateManage />

      <div style={{
        width: sidePadding,
        transition: 'width 0.3s', // Smooth transition for width change
      }}>
        <SideBar onSubmit={setSwitchState} Side={sideSwitch} />
      </div>
      <div className="flex-grow-1 w-100"
        style={{
          paddingLeft: !sideSwitchMenu ? "50px" : "0px",
          transition: 'padding 0.3s', // Smooth transition for width change
        }}
      >


        <div>
          <Routes>
            <Route path={"/AllUsers"} element={<AllUsers switchState={switchState} sideSwitchMenu={sideSwitchMenu} />} />
            <Route path={"/*"} element={<CashFlowLayout />} />
          </Routes>
        </div>


      </div>
    </div>
  );
};

export default CashFlow;