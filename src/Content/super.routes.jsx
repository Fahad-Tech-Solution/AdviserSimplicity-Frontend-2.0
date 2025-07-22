import React from "react";
import AllSubscriptions from "../Components/SuperAdminComponent/AllSubscriptions";
import AllAdvisers from "../Components/SuperAdminComponent/AllAdvisers";
import AllRoles from "../Components/SuperAdminComponent/AllRoles";
import StripsOwnPricingTable from "../Components/SuperAdminComponent/StripsOwnPricingTable";
import PricingTable from "../Components/SuperAdminComponent/PricingTable";
import SuperAdminDashboard from "../Components/Dashboard/SuperAdminDashboard";

const CompRoutes = {
  SuperAdminPages: [
    {
      Title: "dashboard",
      route: "/dashboard",
      element: <SuperAdminDashboard />,
    },
    {
      Title: "all-subscriptions",
      route: "/all-subscriptions",
      element: <StripsOwnPricingTable />,
    },
    {
      Title: "all-advisers",
      route: "/all_advisers",
      element: <AllAdvisers />,
    },
    {
      Title: "all_roles",
      route: "/all_roles",
      element: <AllRoles />,
    },
    {
      Title: "adviser-simplicity-packages",
      route: "/adviser_simplicity-packages",
      element: <PricingTable />,
    },
    // {
    //   Title: "404",
    //   route: "*",
    //   element: <NotFound />, // <-- Catch-all route
    // },
  ],
};

export default CompRoutes;
