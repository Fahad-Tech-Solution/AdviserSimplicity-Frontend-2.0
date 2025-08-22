import React, { useEffect, useState } from "react";
import { Accordion, Card, Table } from "react-bootstrap";
import { Layout } from "antd";
import AdminSideBar from "../../Components/SideBar/AdminSideBar";
import Options from "../../Components/Options";
import { useRecoilState, useRecoilValue } from "recoil";
import { GetAxios } from "../../Components/Assets/Api/Api";
import {
  AllUsers,
  CashFlowData,
  defaultUrl,
  SelectedClientDetails,
} from "../../Store/Store";
import AccordionItems from "./AccordionItems";
import ModalComponent from "../../Components/Questions/FinancialInvestments/ModalComponent";
import ScenarioForm from "./ScenarioForm";

const { Sider, Content, Header } = Layout;

const CashFlowOneClient = (props) => {
  const [PersonalDetail2, setPersonalDetail] = useRecoilState(AllUsers);
  let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  let DefaultUrl = useRecoilValue(defaultUrl);
  let selectedClientDetails = useRecoilValue(SelectedClientDetails);

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (!PersonalDetail2 || PersonalDetail2.length <= 0) {
        try {
          let res = await GetAxios(`${DefaultUrl}/api/personalDetails`);
          if (res) {
            setPersonalDetail(res);
          }
        } catch (error) {
          console.error("Error fetching personal details:", error);
        }
      }

      if (
        Object.keys(cashFlowData).length < 0 ||
        !cashFlowData?.Scenarios ||
        cashFlowData?.Scenarios.length <= 0
      ) {
        try {
          let res = await GetAxios(`${DefaultUrl}/api/CF/scenario/`);
          if (res) {
            const updatedData = {
              ...cashFlowData,
              Scenarios: res,
            };
            setCashFlowData(updatedData);
          }
        } catch (error) {
          console.error("Error fetching personal details:", error);
        }
      }
    };

    fetchData();
  }, [PersonalDetail2]);

  let OpenModal = (UserData, Scenario, action) => {
    localStorage.getItem("UserID", UserData._id);

    setModalObject({
      title:
        (action === "New"
          ? "Add"
          : action === "duplicate"
          ? "Duplicate"
          : "Update") +
        " Scenario" +
        (action === "duplicate" && " Name"),
      Data: UserData,
      Scenario,
      action,
    });
    setFlagState(true);
  };

  return (
    <>
      <Layout style={{ background: "#fff", overflowX: "hidden" }}>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Options
            collapsed={props.collapsed}
            setCollapsed={props.onCollapse}
          />
        </Header>
        <Content
          style={{
            margin: "16px",
            background: "#fff",
            height: "100%",
            padding: "1rem 0rem",
          }}
        >
          <div className="container-fluid position-relative ">
            <ModalComponent
              modalObject={modalObject}
              setFlagState={setFlagState}
              flagState={flagState}
            >
              <ScenarioForm />
            </ModalComponent>
            <div className="row">
              <div className="col-md-12 px-0 mt-2">
                <Card className="shadow cashFlowAllUsers ">
                  <Card.Body>
                    <h5 className="cashFlowCardHead LeagueSpartanFamily">
                      Users List
                    </h5>
                    <Accordion
                      defaultActiveKey={PersonalDetail2.findIndex(
                        (elem) => elem._id === selectedClientDetails._id
                      )}
                    >
                      {PersonalDetail2.map((elem, index) => {
                        const filteredScenarios = (
                          cashFlowData.Scenarios || []
                        ).filter((scenario) => scenario.clientFK == elem._id);

                        if (elem._id === selectedClientDetails._id) {
                          return (
                            <AccordionItems
                              CallBack={OpenModal}
                              fullData={elem}
                              client={elem.client}
                              partner={elem.partner}
                              tableData={filteredScenarios || []}
                              index={index}
                              key={index}
                              eventKey={`${index}`}
                            />
                          );
                        }
                      })}
                    </Accordion>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default CashFlowOneClient;
