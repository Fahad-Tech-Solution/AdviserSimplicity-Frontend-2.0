import React, { useState } from "react";

import PersonalDetail_Edit from "../Components/PersonalDetails/PersonalDetail_Edit";
import SideBar from "../Components/SideBar/SideBarrr";

import { Route, Routes } from "react-router-dom";

import Options from "../Components/Options";

import AllClients from "../GetComponents/AllClients";
import ViewClient from "../GetComponents/ViewClient";

import Questions from "../Components/Questions/Questoins";

import { useRecoilState } from "recoil";

import Dashboard from "../Components/Dashboard/Dashboard";

import { CurrentPage } from "../Store/Store";

import QuestionsNew from "../Components/Questions_New/QuestionsNew";
import FinancialInvestments from "../Components/Questions/FinancialInvestments/FinancialInvestments";
import AdditionalQueriesPersonalAssets from "../Components/Questions/AdditionalQueriesPersonalAssets/AdditionalQueriesPersonalAssets";
import LifestyleAssetsAndDebt from "../Components/Questions/LifestyleAssetsAndDebt/LifestyleAssetsAndDebt";
import AdditionalQueriesInvestment from "../Components/Questions/AdditionalQueriesInvestment/AdditionalQueriesInvestment";
import AdditionalQueriesProfessionalAdvisor from "../Components/Questions/AdditionalQueriesProfessionalAdvisor/AdditionalQueriesProfessionalAdvisor";
import QuestionsSMSF from "../Components/Questions/QuestoinsSMSF/QuestoinsSMSF";
import EstatePlanning from "../Components/Questions/EstatePlanning/EstatePlanning";
import AdditionalQueriesSuperAndRetirement from "../Components/Questions/AdditionalQueriesSuperAndRetirement/AdditionalQueriesSuperAndRetirement";
import PersonalIncome from "../Components/Questions/PersonalIncome/PersonalIncome";
import BusinessEntities from "../Components/Questions/BusinessEntities/BusinessEntities";
import QuestionsFamily from "../Components/Questions/QuestoinsFamilyTrust/QuestoinsFamily";
import GoalsObjectiveNew from "../Components/Goals&Objectives/GoalsObjectiveNew";
import RiskProfileNew from "../Components/RiskProfile/RiskProfileNew";
import RecoilStateManage from "../RecoilStateManage/RecoilStateManage";
import ImportantQuestion from "../Components/Questions/ImportantQuestion/ImportantQuestion";
import PersonalDetailNew from "../Components/PersonalDetails/PersonalDetailNew";

import Contact from "../Components/ContactTest/Contact";
import PersonalInsuranceLife from "../Components/Questions/PersonalInsurance/LifeInsurance";

function AuthRouts() {

    const [switchState, setSwitchState] = useState("true");
    const [sideSwitchMenu, setSideSwitchMenu] = useState(true);
    // const [side, setSide] = useState(false);
    const [sidePadding, setSidePadding] = useState('4rem');

    let [CurrentP] = useRecoilState(CurrentPage);

    let switchStateHandler = (elem) => {
        setSwitchState(elem)
    }

    let sideSwitch = (elem) => {
        setSideSwitchMenu(elem)
        if (elem) {
            setSidePadding('4rem');
        }
        else {
            setSidePadding('17rem');
        }
    }

    let topMenuArray = ['/', '/Goals-And-Objectives',
        '/All-Clients',
    ]

    return (
        <div className="container-fluid">
            <div className="row" >
                <RecoilStateManage />

                {/*<div className={sideSwitchMenu ? "col-md-1 m-0 p-0" : "col-md-2 m-0 p-0 "}>*/}
                <div className="p-0 m-0">
                    <SideBar onSubmit={switchStateHandler} Side={sideSwitch} />
                </div>

                {/*<div className={sideSwitchMenu ? "col-md-11 m-0 p-0" : "col-md-10 m-0 p-0 "}>*/}
                <div className="container-fluid pr-0 py-0 m-0 topMaiBody" style={{ paddingLeft: sidePadding }}>
                    {/* <Topbar SidebarSwitch={sideSwitchMenu} />*/}
                    <Options opt={switchState} SidebarSwitch={sideSwitchMenu} />

                    <div className={`py-0 mx-0 mb-0 ${topMenuArray.includes(CurrentP) ? 'mainBody2' : 'mainBody'} `}>
                        <Routes>

                            <Route path="/" element={<Dashboard />} />

                            {/* GET ROUTING */}
                            <Route path="/All-Clients" element={<AllClients />} />
                            <Route path="/View-Client" element={<ViewClient />} />


                            {/* POST ROUTING */}
                            <Route path="/PersonalDetail" element={<PersonalDetailNew />} />
                            <Route path="/PersonalDetailOld" element={<PersonalDetail_Edit />} />


                            {/* POST ROUTING
                                <Route path="/NewPersonalDetail" element={<HOCLoader><PersonalDetails /></HOCLoader>} />
                                */}

                            <Route path="/ImportantQuestion" element={<ImportantQuestion />} />

                            {/* Questions ROUTING */}
                            <Route path="/Questions" element={<Questions />} />
                            <Route path="/PersonalIncome" element={<QuestionsNew><PersonalIncome /></QuestionsNew>} />
                            <Route path="/PersonalAssets" element={<QuestionsNew><AdditionalQueriesPersonalAssets /></QuestionsNew>} />
                            <Route path="/FinancialInvestments" element={<QuestionsNew><FinancialInvestments /></QuestionsNew>} />
                            <Route path="/SuperAndRetirement" element={<QuestionsNew><AdditionalQueriesSuperAndRetirement /></QuestionsNew>} />
                            <Route path="/Lifestyle" element={<QuestionsNew><LifestyleAssetsAndDebt /></QuestionsNew>} />
                            <Route path="/Investment" element={<QuestionsNew><AdditionalQueriesInvestment /></QuestionsNew>} />
                            <Route path="/EstatePlanning" element={<QuestionsNew><EstatePlanning /></QuestionsNew>} />
                            <Route path="/ProfessionalAdvisor" element={<QuestionsNew><AdditionalQueriesProfessionalAdvisor /></QuestionsNew>} />

                            {/* APi Integration Left */}
                            <Route path="/PersonalInsurance" element={<QuestionsNew><PersonalInsuranceLife /></QuestionsNew>} />
                            <Route path="/BusinessEntities" element={<QuestionsNew><BusinessEntities /></QuestionsNew>} />
                            <Route path="/SMSF" element={<QuestionsNew><QuestionsSMSF /></QuestionsNew>} />
                            <Route path="/FamilyTrust" element={<QuestionsNew><QuestionsFamily /></QuestionsNew>} />

                            <Route path="/Goals-And-Objectives" element={<GoalsObjectiveNew />} />

                            <Route path="/Risk-Profile/*" element={<RiskProfileNew />} />
                           
                           
                            {/*
                                <Route path="/Risk-Profile-Cards/" element={<RiskProfileCards />} />
                                */}
                            <Route path="/PDF-Test" element={<Contact />} />

                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthRouts
