import React, { useMemo, useState } from "react";
import { Card } from "react-bootstrap";
import NewAllClients from "../Assets/AllClients/NewAllClients";
import CustomApexChart from "../Assets/ApexChart/CustomApexChart";
import { LoggedInUserData, ProspectsCDF } from "../../Store/Store";
import { useRecoilValue } from "recoil";
import { toTitleCase } from "../Assets/Api/Api";

const Dashboard = (props) => {
  let prospectsCDF = useRecoilValue(ProspectsCDF);
  let loggedInUserData = useRecoilValue(LoggedInUserData);

  const dataSeries = [
    { name: "Orders", data: [31, 40, 28, 51, 42, 109, 100] },
    { name: "Revenue", data: [11, 32, 45, 32, 34, 52, 41] },
  ];

  const xLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="DashBoard">
      <div className="row mt-2 ">
        <div className="col-md-12 px-1">
          <Card className="custom_Shadow border-0 mb-5">
            <div className="d-flex flex-column justify-content-center align-items-center py-3">
              <div style={{ width: "98%", marginTop: "-10px" }}>
                <NewAllClients />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
