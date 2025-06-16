import React from "react";
import { Card } from "react-bootstrap";
import PaiChart from "./PaiChart";
import NewAllClients from "../Assets/AllClients/NewAllClients";

const Dashboard = () => {
  return (
    <div className="DashBoard">
      <h5 className="Greetings PoppinsFamily">👋 Welcome, Usama Faheem</h5>
      <div className="row">
        <div className="col-md-8 mt-3 mt-md-0">
          <Card className="custom_Shadow">
            <PaiChart
              chartType={"Line"}
              chartTitle={"Number Users"}
              data={[30, 20, 20, 15, 15, 10]}
            />
          </Card>
        </div>
        <div className="col-md-4 mt-3 mt-md-0">
          <Card className="custom_Shadow pb-3">
            <PaiChart
              chartType={"Pie"}
              chartTitle={"All Investments"}
              data={[30, 20, 20, 15, 15, 10]}
            />
          </Card>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <Card className="custom_Shadow mb-5">
            <div className="d-flex flex-column justify-content-center align-items-center py-3">
              <h5 className="PoppinsFamily navy_Text fw-bold w-100 text-start ps-3 m-0">All Clients</h5>
              <div style={{width:"98%"}}>
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
