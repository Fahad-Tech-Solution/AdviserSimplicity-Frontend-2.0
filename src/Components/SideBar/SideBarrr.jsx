import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
// import { useNavigate } from 'react-router-dom';
import AdviserS from "../Assets/Adviser-Simpilicity.png";
import AdviserS1 from "../Assets/Adviser-Simpilicity1.png";
import AdviserSmini from "../Assets/Adviser-Simpilicity-mini.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faReceipt,
  faTasks,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

import { useRecoilState } from "recoil";
import { CRState, CurrentPage, OptionRender, PersonalDetailsData, QuestionDetail, StepsStatus } from "../../Store/Store";

const SideBarrr = (props) => {
  //   let Navigate = useNavigate();
  let [optRender, setOptRender] = useRecoilState(OptionRender);   // eslint-disable-line no-unused-vars
  let [CurrentP, setCurrentP] = useRecoilState(CurrentPage); // eslint-disable-line no-unused-vars
  let [stepsStatus, setStepsStatus] = useRecoilState(StepsStatus); // eslint-disable-line no-unused-vars
  let [CRStateObj, setCRState] = useRecoilState(CRState); // eslint-disable-line no-unused-vars
  let [PersonalDetailObj, setPersonalDetailObj] = useRecoilState(PersonalDetailsData);// eslint-disable-line no-unused-vars
  let [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);// eslint-disable-line no-unused-vars

  let Navigate = useNavigate();

  const [sidebarWidth, setSidebarWidth] = useState("100px"); // Initial width of the sidebar
  const [sidebar, setSidebar] = useState(false); // Initial width of the sidebar

  let close = () => {
    setSidebarWidth("100px");
    setSidebar(false);
    props.Side(true);
  };
  let open = () => {
    setSidebarWidth("313px");
    setSidebar(true);
    props.Side(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 p-0">
          <div className="sideBar2 border" style={{ width: sidebarWidth }}>
            {sidebar ? (
              <div className="text-center mt-3">
                <div className="logoText">
                  <h5 className="px-5" onClick={close} role="button">
                    <img src={AdviserS1} alt="Logo" width={"200px"} />
                  </h5>
                  {/* <h5>
                    ADVISER komail <span>Simplicity</span>
                  </h5> */}

                  <div className="d-none">
                    <FontAwesomeIcon
                      icon={faBars}
                      className=""
                      role="button"
                      tabIndex="0"
                      onClick={close}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <h6
                className="text-center my-3 d-block"
                role="button"
                tabIndex="0"
              >
                <img src={AdviserSmini} alt="Logo" width={"50px"} onClick={open} />

                <FontAwesomeIcon icon={faBars} onClick={open} className="d-none" />
              </h6>
            )}

            <hr />

            <ul
              className={`m-0 p-0 ${sidebar ? "dropdown d-block " : "dropdown d-block text-center"} ${CurrentP === '/' && 'active'} `}
              id="home"
              onClick={() => { setCurrentP('/'); Navigate("/") }}
            >
              <li className=" py-0 pe-0" style={{ paddingLeft: sidebar ? "20px" : "0px" }}>
                <FontAwesomeIcon icon={faHome} /> {sidebar ? <span className="ms-2 d-inline-block LeagueSpartanFamily SideItem_Size "> Dashboard </span> : ""}
              </li>
            </ul>

            <li
              className={
                sidebar ? "mx-0 mb-0 mt-2 p-0" : "text-center"
              }
            >
              <Accordion className={`${sidebar ? "Custom_Accordion" : "removeLeftBar"}`} >
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <FontAwesomeIcon icon={faUser} className={`pr-2`} />
                    &nbsp;&nbsp; {sidebar ? <span className="LeagueSpartanFamily SideItem_Size font-weight-bold p-0 m-0 w-auto">Discovery </span> : ""}
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className={`w-100 px-3 Custom_hover ${CurrentP === '/All-Clients' && 'active'}`}
                      onClick={() => { setOptRender("Opt1"); localStorage.setItem("OptionRender", "Opt1");; Navigate("/All-Clients") }}
                      id="Financial"
                    >
                      <NavLink
                        to="/All-Clients"
                        className="py-1 LeagueSpartanFamily SideItem_Size"
                      >
                        Financial Details
                      </NavLink>
                    </div>

                    <div className={`w-100 px-3 Custom_hover ${CurrentP === '/Goals-And-Objectives' && 'active'}`}
                      onClick={(e) => { Navigate("/Goals-And-Objectives") }}
                      id="Goals"
                    >
                      <NavLink to="/Goals-And-Objectives" className="py-1 LeagueSpartanFamily SideItem_Size">
                        Goals and Objectives
                      </NavLink>
                    </div>

                    <div className={`w-100 px-3 Custom_hover ${CurrentP === '/Risk-Profile' && 'active'}`}
                      onClick={() => { Navigate("/Risk-Profile") }}
                      id="Risk"
                    >
                      <NavLink to="/Risk-Profile" className="py-1 LeagueSpartanFamily SideItem_Size">
                        Risk Profile
                      </NavLink>
                    </div>

                    <div className={`w-100 px-3 Custom_hover ${CurrentP === 'Wizard' && 'active'}`}
                      onClick={() => { setCurrentP('Wizard') }}
                      id="Wizard"
                    >
                      <NavLink to="#Document" className="py-1 LeagueSpartanFamily SideItem_Size">
                        Document Wizard
                      </NavLink>
                    </div>

                    <div className={`w-100 px-3 Custom_hover ${CurrentP === '/PersonalDetail' && 'active'}`}
                      onClick={() => {
                        localStorage.removeItem("Email");
                        localStorage.removeItem("PartnerName");
                        localStorage.removeItem("UserID");
                        localStorage.removeItem("UserName");
                        localStorage.removeItem("UserStatus");
                        setCRState()
                        setStepsStatus(true);
                        setOptRender("Opt1");
                        localStorage.setItem("OptionRender", "Opt1"); setPersonalDetailObj({
                          "client": {
                            "clientTitle": "Mr.",
                            "clientGivenName": "John",
                            "clientSurname": "Doe",
                            "clientPreferredName": "Johnny",
                            "clientGender": "Male",
                            "clientDOB": "1990-01-01",
                            "clientAge": 34,
                            "clientMaritalStatus": "Single",
                            "clientEmploymentStatus": "Employed",
                            "clientHealth": "Good",
                            "clientSmoker": "No",
                            "clientPlannedRetirementAge": 65,
                            "clientHomeAddress": "123 Main St",
                            "clientPostcode": 12345,
                            "clientHomePhone": "555-555-5555",
                            "clientWorkPhone": "555-555-5556",
                            "clientMobile": "555-555-5557",
                            "Email": "john.doe@example.com",
                            "clientPostalAddress": "123 Main St",
                            "clientPostalPostCode": 12345,
                            "clientMiddleName": "Michael",
                            "clientOccupationID": "OCC123",
                            "clientTaxResidentRadio": "Yes",
                            "clientPrivateHealthCoverRadio": "Yes",
                            "clientHELPSDebtRadio": "No",
                            "clientSameAsAbove": true,
                            "clientRetirement": "Comfortable",

                          },
                          "partner": {},
                          "children": {
                            "numberOfChildren": 0,
                          },
                          "haveAnyChildren": "No",
                        })

                        setQuestionDetail({});
                        Navigate("/PersonalDetail")
                      }}
                      id="Client"
                    >
                      <NavLink
                        to="/PersonalDetail"
                        className="py-1 LeagueSpartanFamily SideItem_Size"
                      >
                        Add Client
                      </NavLink>
                    </div>

                    <div className="w-100 px-3 Custom_hover d-none">
                      <NavLink href="/All-Clients" className="py-1 LeagueSpartanFamily SideItem_Size">
                        Select Client
                      </NavLink>
                    </div>


                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </li>

            <li
              className={
                sidebar ? "m-0 p-0" : " text-center"
              }
            >
              <Accordion className={`${sidebar ? "Custom_Accordion" : "removeLeftBar"} `} >
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <FontAwesomeIcon icon={faReceipt} />&nbsp; &nbsp; {sidebar ? <span className="LeagueSpartanFamily SideItem_Size font-weight-bold p-0 m-0 w-auto">Cash Flow</span> : ""}
                  </Accordion.Header>
                  <Accordion.Body>

                    <div className={`w-100 px-3 Custom_hover ${CurrentP === '/Cash-Flow' && 'active'}`}
                      onClick={() => { setOptRender("Opt3"); localStorage.setItem("OptionRender", "Opt3"); Navigate("/Cash-Flow/#" + localStorage.getItem("UserID")); }}
                      id="cashFlow"
                    >
                      <NavLink
                        to="/Cash-Flow"
                        className="py-1 LeagueSpartanFamily SideItem_Size "
                      >
                        Cash Flow
                      </NavLink>
                    </div>


                    <div className={`w-100 px-3 Custom_hover ${CurrentP === 'Scenario' && 'active'}`}
                      onClick={() => { setCurrentP('Scenario') }}
                      id="Scenario"

                    >
                      <NavLink to="#Scenario" className="py-1 LeagueSpartanFamily SideItem_Size">
                        Scenario
                      </NavLink>
                    </div>

                    <div className={`w-100 px-3 Custom_hover ${CurrentP === 'ManageTask' && 'active'}`}
                      onClick={() => { setCurrentP('ManageTask') }}
                      id="ManageTask"
                    >
                      <NavLink to="#ManageTask" className="py-1 LeagueSpartanFamily SideItem_Size">
                        Manage Task
                      </NavLink>
                    </div>

                    <div className={`w-100 px-3 Custom_hover ${CurrentP === 'ManageDocument' && 'active'}`}
                      onClick={() => { setCurrentP('ManageDocument') }}
                      id="ManageDocument"
                    >
                      <NavLink to="#ManageDocument" className="py-1 LeagueSpartanFamily SideItem_Size">
                        Manage Document
                      </NavLink>
                    </div>

                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </li>

            <li
              className={
                sidebar ? "m-0 d-none" : "text-center d-none"
              }
            >
              <Accordion className="Custom_Accordion" >
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <FontAwesomeIcon icon={faTasks} />&nbsp;  {sidebar ? "Task" : ""}
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="w-100 px-3 Custom_hover">
                      <NavLink
                        to="#"
                        className="py-1"
                      >
                        Manage Task
                      </NavLink>
                    </div>
                    <div className="w-100 px-3 Custom_hover">
                      <NavLink
                        to="#"
                        className="py-1  "
                      >
                        Manage Document
                      </NavLink>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </li>

          </div>
        </div>

        <div className="col-md-10 p-0">{/* <TopNavBar/> */}</div>
      </div>
    </div>
  );
};

export default SideBarrr;
