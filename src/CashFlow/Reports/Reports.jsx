import React from "react";
import FunnalComp from "./FunnalComp";
import { Route, Routes } from "react-router-dom";

const Reports = () => {
  return (
    <div className="container-fluid p-0 reports d-flex flex-column">
      {/* <h1>Reports</h1> */}
      <Routes>
        <Route path={"/"} element={<FunnalComp />} />
      </Routes>
    </div>
  );
};

export default Reports;
