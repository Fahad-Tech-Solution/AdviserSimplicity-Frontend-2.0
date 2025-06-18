import React, { useMemo } from "react";
import { Card } from "react-bootstrap";
import NewAllClients from "../Assets/AllClients/NewAllClients";
import CustomApexChart from "../Assets/ApexChart/CustomApexChart";
import { ProspectsCDF } from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";

const Dashboard = (props) => {
  let prospectsCDF = useRecoilValue(ProspectsCDF);

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
      <h5 className="Greetings PoppinsFamily">👋 Welcome, Usama Faheem</h5>
      <div className="row justify-content-stretch">
        <div className={"col-md-3 mt-3 mt-md-0"}>
          <Card className=" overflow-hidden custom_Shadow pb-3 h-100 d-flex flex-column justify-content-center align-items-center">
            <div className="mt-4">
              <CustomApexChart
                type="radialBar"
                series={statusPercentages}
                categories={["Successful", "Pending", "Unsuccessful"]}
                height={300}
                colors={["#52c41a", "#faad14", "#ff4d4f"]}
              />
            </div>
            <h4
              className=" text-center mt-auto  p-3 Greetings PoppinsFamily"
              style={{ fontSize: "18px" }}
            >
              {" "}
              Prospects Summary{" "}
            </h4>
          </Card>
        </div>
        <div className={"col-md-9 mt-3 mt-md-0"}>
          <Card className="custom_Shadow h-100 ">
            <h4
              className=" p-3 Greetings PoppinsFamily"
              style={{ fontSize: "18px" }}
            >
              {" "}
              Users Per Day{" "}
            </h4>
            <CustomApexChart
              series={dataSeries}
              categories={xLabels}
              type="area"
              height={350}
              showGrid={false}
              showToolbar={false}
              xAxisType="category"
              showXAxis={true}
              showYAxis={true}
              colors={["#1b254b", "#36b446"]}
            />
          </Card>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <Card className="custom_Shadow mb-5">
            <div className="d-flex flex-column justify-content-center align-items-center py-3">
              <h5 className="PoppinsFamily navy_Text fw-bold w-100 text-start ps-3 m-0">
                All Clients
              </h5>
              <div style={{ width: "98%" }}>
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
