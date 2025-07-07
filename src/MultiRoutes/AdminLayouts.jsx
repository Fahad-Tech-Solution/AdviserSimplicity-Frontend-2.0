import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
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

const AdminLayouts = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [reload, setReload] = useState(true);
  let { superAdmin } = content;
  let { SuperAdminPages } = CompRoutes;
  let DefaultUrl = useRecoilValue(defaultUrl);
  let [loading, setLoading] = useRecoilState(Loading);
  let [subscriptions, setSubscriptions] = useRecoilState(Subscriptions);
  let [advisers, setAdvisers] = useRecoilState(Advisers);
  let [role, setRoles] = useRecoilState(Roles);

  useEffect(() => {
    if (reload) {
      FetchData();
    }
  }, [reload]);

  let FetchData = async () => {
    setLoading(true);
    try {
      let res = await GetAxios(DefaultUrl + "/api/subscriptionPlan");
      if (res) {
        // console.log(res);
        setSubscriptions(res);
      }

      res = await GetAxios(DefaultUrl + "/api/user");
      if (res) {
        console.log(res);
        setAdvisers(res);
      }

      res = await GetAxios(DefaultUrl + "/api/role");
      if (res) {
        // console.log(res);
        setRoles(res);
      }
    } catch (error) {
      console.log("Something went wrong:" + error.message);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        "Some thing went wrrong"
      );
    } finally {
      setReload(false);
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0 d-flex flex-row">
      <AdminSideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`flex-grow-1`}>
        <AdminTopMenu collapsed={collapsed} setCollapsed={setCollapsed} />
        <Routes>
          {superAdmin.map((elem, index) => {
            return (
              <Route
                path={elem.route}
                element={<InstituteAndOffer Data={elem} />}
              />
            );
          })}
          {SuperAdminPages.map((elem, index) => {
            return <Route path={elem.route} element={elem.element} />;
          })}
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayouts;
