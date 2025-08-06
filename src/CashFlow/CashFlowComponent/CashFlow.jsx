import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import { content } from "../../Content/Content";
import CashFlowLayout from "./CashFlowLayout";
import CashFlowAllUsers from "./CashFlowAllUsers";
import FunnalComp from "../Reports/FunnalComp";
import Reports from "../Reports/Reports";
import AdminSideBar from "../../Components/SideBar/AdminSideBar";
import CashFlowOneClient from "./CashFlowOneClient";

const { Sider, Content } = Layout;

const CashFlow = () => {
  const [collapsed, setCollapsed] = useState(true);
  let { cashFlow } = content;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={220}
        style={{ background: "#fff", borderRight: "1px solid #f0f0f0" }}
      >
        <AdminSideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      </Sider>
      <Layout
        style={{
          background: "#fff",
          overflowX: "hidden",
        }}
      >
        <Routes>
          <Route
            path="/allusers"
            element={<CashFlowAllUsers collapsed={collapsed} />}
          />
          <Route
            path="/one-client"
            element={<CashFlowOneClient collapsed={collapsed} />}
          />
          <Route path="/reports/*" element={<Reports />} />
          <Route path="/*" element={<CashFlowLayout />} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default CashFlow;
