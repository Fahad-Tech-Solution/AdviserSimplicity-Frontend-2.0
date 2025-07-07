import React from "react";
import AllSubscriptions from "../Components/SuperAdminComponent/AllSubscriptions";
import AllAdvisers from "../Components/SuperAdminComponent/AllAdvisers";
import AllRoles from "../Components/SuperAdminComponent/AllRoles";

const CompRoutes = {
  SuperAdminPages: [
    {
      Title: "All_Subscriptions",
      route: "/All_Subscriptions",
      element: <AllSubscriptions />,
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
    // {
    //   Title: "404",
    //   route: "*",
    //   element: <NotFound />, // <-- Catch-all route
    // },
  ],
};

export default CompRoutes;
