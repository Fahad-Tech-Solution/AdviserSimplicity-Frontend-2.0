import React, { useMemo } from "react";
import { Card } from "react-bootstrap";
import NewAllClients from "../Assets/AllClients/NewAllClients";
import CustomApexChart from "../Assets/ApexChart/CustomApexChart";
import {
  CRState,
  LoggedInUserData,
  OptionRender,
  PersonalDetailsData,
  ProspectsCDF,
  QuestionDetail,
  StepsStatus,
} from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import { toTitleCase } from "../Assets/Api/Api";
import { Button } from "antd";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = (props) => {
  let prospectsCDF = useRecoilValue(ProspectsCDF);
  let loggedInUserData = useRecoilValue(LoggedInUserData);
  let nev = useNavigate();

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

  const [CRStateObj, setCRState] = useRecoilState(CRState);
  const [stepsStatus, setStepsStatus] = useRecoilState(StepsStatus);
  const [optRender, setOptRender] = useRecoilState(OptionRender);
  const [PersonalDetailObj, setPersonalDetailObj] =
    useRecoilState(PersonalDetailsData);
  const [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);

  const handleAddClientClick = () => {
    localStorage.removeItem("Email");
    localStorage.removeItem("PartnerName");
    localStorage.removeItem("UserID");
    localStorage.removeItem("UserName");
    localStorage.removeItem("UserStatus");
    setCRState();
    setStepsStatus(true);
    setOptRender("Opt1");
    localStorage.setItem("OptionRender", "Opt1");

    setPersonalDetailObj({
      client: {
        clientTitle: "Mr.",
        clientGivenName: "John",
        clientSurname: "Doe",
        clientPreferredName: "Johnny",
        clientGender: "Male",
        clientDOB: "1990-01-01",
        clientAge: 34,
        clientMaritalStatus: "Single",
        clientEmploymentStatus: "Employed",
        clientHealth: "Good",
        clientSmoker: "No",
        clientPlannedRetirementAge: 65,
        clientHomeAddress: "123 Main St",
        clientPostcode: 12345,
        clientHomePhone: "555-555-5555",
        clientWorkPhone: "555-555-5556",
        clientMobile: "555-555-5557",
        Email: "john.doe@example.com",
        clientPostalAddress: "123 Main St",
        clientPostalPostCode: 12345,
        clientMiddleName: "Michael",
        clientOccupationID: "OCC123",
        clientTaxResidentRadio: "Yes",
        clientPrivateHealthCoverRadio: "Yes",
        clientHELPSDebtRadio: "No",
        clientSameAsAbove: true,
        clientRetirement: "Comfortable",
      },
      partner: {},
      children: {
        numberOfChildren: 0,
      },
      haveAnyChildren: "No",
    });

    setQuestionDetail({});
    nev("/user/personal-detail");
  };

  return (
    <div className="DashBoard">
      <h5 className="Greetings PoppinsFamily">
        👋 Welcome,{" "}
        {loggedInUserData &&
        typeof loggedInUserData === "object" &&
        Object.keys(loggedInUserData).length > 0
          ? toTitleCase(
              `${loggedInUserData.firstName || ""} ${
                loggedInUserData.lastName || ""
              }`.trim()
            )
          : "Guest"}
      </h5>
      <div className="row justify-content-stretch d-none">
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
              <h5 className=" navy_Text fw-bold w-100 text-start ps-3 m-0">
                My Clients{" "}
                <Button
                  type="primary"
                  className="float-end me-3"
                  onClick={handleAddClientClick}
                >
                  <FaPlus /> Add Client
                </Button>
              </h5>

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
