import React, { useEffect, useState } from "react";
import { Accordion, Card, Table } from "react-bootstrap";
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
          // console.log(JSON.stringify(res[0]), "Cash Grow Work");
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
          console.log(JSON.stringify(res[0]), "Cash Grow Work");
        } catch (error) {
          console.error("Error fetching personal details:", error);
        }
      }
    };

    fetchData();
  }, [PersonalDetail2]);

  let OpenModal = (UserData, Scenario, action) => {
    // console.log(UserData);
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
    <div className="container-fluid  ps-4 position-relative ">
      <ModalComponent
        modalObject={modalObject}
        setFlagState={setFlagState}
        flagState={flagState}
      >
        <ScenarioForm />
      </ModalComponent>

      <Options collapsed={props.collapsed} />

      <div className="row mt-2">
        <div className="col-md-12 ">
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
                  // Filter scenarios that have the same clientFK as the current client's ID
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
                        key={index} // Unique key per item
                        eventKey={`${index}`} // Ensure eventKey is string, and matches defaultActiveKey
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
  );
};

export default CashFlowOneClient;
