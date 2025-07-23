import React, { useMemo } from "react";
import { Card } from "react-bootstrap";
import NewAllClients from "../Assets/AllClients/NewAllClients";
import CustomApexChart from "../Assets/ApexChart/CustomApexChart";
import { LoggedInUserData, ProspectsCDF } from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import AllAdvisers from "../SuperAdminComponent/AllAdvisers";

const SuperAdminDashboard = (props) => {
  let prospectsCDF = useRecoilValue(ProspectsCDF);
  let loggedInUserData = useRecoilValue(LoggedInUserData);

  const dataSeries = [
    { name: "Orders", data: [31, 40, 28, 51, 42, 109, 100] },
    { name: "Revenue", data: [11, 32, 45, 32, 34, 52, 41] },
  ];

  const xLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const statusPercentages = useMemo(() => {
    const counts = {
      successful: 0,
      pending: 0,
      unsuccessful: 0,
    };

    if (prospectsCDF.length > 0) {
      // Count statuses
      prospectsCDF.forEach((item) => {
        const status = item.status?.toLowerCase();
        if (status === "successful" || status === "approved")
          counts.successful++;
        else if (status === "pending") counts.pending++;
        else if (status === "unsuccessful" || status === "rejected")
          counts.unsuccessful++;
      });

      const total =
        counts.successful + counts.pending + counts.unsuccessful || 1; // Avoid division by 0

      // Convert counts to percentages
      return [
        ((counts.successful / total) * 100).toFixed(1),
        ((counts.pending / total) * 100).toFixed(1),
        ((counts.unsuccessful / total) * 100).toFixed(1),
      ];
    }
  }, [prospectsCDF]);

  return (
    <div className="DashBoard">
      <h5 className="Greetings PoppinsFamily">
        👋 Welcome ,{" "}
        {loggedInUserData &&
        typeof loggedInUserData === "object" &&
        Object.keys(loggedInUserData).length > 0
          ? `${loggedInUserData.firstName || ""} ${
              loggedInUserData.lastName || ""
            }`.trim()
          : "Guest"}
      </h5>
      <div className="row justify-content-stretch">
        <AllAdvisers />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
