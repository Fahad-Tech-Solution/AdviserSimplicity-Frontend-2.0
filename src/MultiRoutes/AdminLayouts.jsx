import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import AdminSideBar from "../Components/SideBar/AdminSideBar";
import AdminTopMenu from "../Components/SideBar/AdminTopMenu";
import InstituteAndOffer from "../Components/SuperAdminComponent/InstituteAndOffer";
import { content } from "../Content/Content";
import CompRoutes from "../Content/super.routes";
import {
  GetAxios,
  openNotificationSuccess,
} from "../Components/Assets/Api/Api";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Advisers,
  defaultUrl,
  Loading,
  Roles,
  Subscriptions,
} from "../Store/Store";

const { Sider, Header, Content } = Layout;

const AdminLayouts = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [reload, setReload] = useState(true);
  const { superAdmin } = content;
  const { SuperAdminPages } = CompRoutes;
  const DefaultUrl = useRecoilValue(defaultUrl);
  const [loading, setLoading] = useRecoilState(Loading);
  const [subscriptions, setSubscriptions] = useRecoilState(Subscriptions);
  const [advisers, setAdvisers] = useRecoilState(Advisers);
  const [role, setRoles] = useRecoilState(Roles);

  useEffect(() => {
    if (reload) {
      FetchData();
    }
  }, [reload]);

  const FetchData = async () => {
    setLoading(true);
    try {
      let res = await GetAxios(DefaultUrl + "/api/subscriptionPlan");
      if (res) {
        setSubscriptions(res);
      }

      res = await GetAxios(DefaultUrl + "/api/user");
      if (res) {
        setAdvisers(
          res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      }

      res = await GetAxios(DefaultUrl + "/api/role");
      if (res) {
        setRoles(res);
      }
    } catch (error) {
      console.log("Something went wrong:" + error.message);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        "Something went wrong"
      );
    } finally {
      setReload(false);
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsed={collapsed}
        onCollapse={(val) => setCollapsed(val)}
        width={250}
        style={{
          background: "#fff",
          transition: "width 0.2s ease",
          boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
        }}
      >
        <AdminSideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      </Sider>

      <Layout
        style={{
          background: "#fff",
        }}
      >
        <Header
          style={{
            background: "#fff",
            padding: 0,
          }}
        >
          <AdminTopMenu collapsed={collapsed} setCollapsed={setCollapsed} />
        </Header>

        <Content
          style={{
            margin: "16px",
            background: "#fff",
            height: "100%", // allow scrolling inside
            padding: "1rem 0rem",
          }}
        >
          <Routes>
            {superAdmin.map((elem, index) => (
              <Route
                key={index}
                path={elem.route}
                element={<InstituteAndOffer Data={elem} />}
              />
            ))}
            {SuperAdminPages.map((elem, index) => (
              <Route key={index} path={elem.route} element={elem.element} />
            ))}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayouts;
