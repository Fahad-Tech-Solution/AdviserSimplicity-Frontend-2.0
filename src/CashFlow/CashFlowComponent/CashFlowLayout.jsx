import React from "react";
import CashFlowOptions from "../CashFlowOptions/CashFlowOptions";
import { Route, Routes } from "react-router-dom";
import CashFlowSections from "../CashFlowSections/CashFlowSections";
import { content } from "../../Content/Content";

const CashFlowLayout = () => {
  let { cashFlow } = content;

  return (
    <div>
      <CashFlowOptions />
      <Routes>
        {cashFlow.map((elem, index) => {
          return (
            <Route
              path={elem.route.replace("/user/cashflow/", "/")}
              element={<CashFlowSections Data={elem} />}
            />
          );
        })}
      </Routes>
    </div>
  );
};

export default CashFlowLayout;
