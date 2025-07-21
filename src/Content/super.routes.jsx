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
      Title: "Dashboard",
      route: "/Dashboard",
      element: <SuperAdminDashboard />,
    },
    {
      Title: "All_Subscriptions",
      route: "/All_Subscriptions",
      element: <StripsOwnPricingTable />,
    },
    {
      Title: "All_Advisers",
      route: "/All_Advisers",
      element: <AllAdvisers />,
    },
    {
      Title: "All_Roles",
      route: "/All_Roles",
      element: <AllRoles />,
    },
    {
      Title: "Adviser_Simplilcity_Packages",
      route: "/Adviser_Simplilcity_Packages",
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
