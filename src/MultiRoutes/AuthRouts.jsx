import React, { useState } from "react";

import PersonalDetail_Edit from "../Components/PersonalDetails/PersonalDetail_Edit";
import SideBar from "../Components/SideBar/SideBarrr";

import Options from "../Components/Options";

import AllClients from "../GetComponents/AllClients";
import ViewClient from "../GetComponents/ViewClient";
import CashFlow from "../CashFlow/CashFlowComponent/CashFlow";
import IncomeAndExpenses from "../CashFlow/Income&ExpenseComponents/IncomeAndExpenses";
import PersonalAssets from "../CashFlow/PersonalAssetsComponents/PersonalAssets";
import InvestmentsCashFlow from "../CashFlow/InvestmentsComponents/InvestmentsCashFlow";
import DirectProperty from "../CashFlow/DirectPropertyComponents/DirectProperty";
import SuperAndRetirementCashFlow from "../CashFlow/Super&RetirementComponents/SuperAndRetirementCashFlow";
import InvestmentTrustCashFlow from "../CashFlow/InvestmentTrustComponents/InvestmentTrustCashFlow";
import SmsfCashFlow from "../CashFlow/SMSFComponents/SmsfCashFlow";

import Questions from "../Components/Questions/Questoins";

import { useRecoilState } from "recoil";

import Dashboard from "../Components/Dashboard/Dashboard";

import { CurrentPage } from "../Store/Store";
import TestComp from "../Components/Assets/TestComp/TestComp";
import QuestionsNew from "../Components/Questions_New/QuestionsNew";
import FinancialInvestments from "../Components/Questions/FinancialInvestments/FinancialInvestments";
import AdditionalQueriesPersonalAssets from "../Components/Questions/AdditionalQueriesPersonalAssets/AdditionalQueriesPersonalAssets";
import LifestyleAssetsAndDebt from "../Components/Questions/LifestyleAssetsAndDebt/LifestyleAssetsAndDebt";
import AdditionalQueriesInvestment from "../Components/Questions/AdditionalQueriesInvestment/AdditionalQueriesInvestment";
import AdditionalQueriesProfessionalAdvisor from "../Components/Questions/AdditionalQueriesProfessionalAdvisor/AdditionalQueriesProfessionalAdvisor";
import QuestionsSMSF from "../Components/Questions/QuestoinsSMSF/QuestoinsSMSF";
import QuestionsInvestmentTrust from "../Components/Questions/QuestionsInvestmentTrust/QuestionsInvestmentTrust";
import EstatePlanning from "../Components/Questions/EstatePlanning/EstatePlanning";
import AdditionalQueriesSuperAndRetirement from "../Components/Questions/AdditionalQueriesSuperAndRetirement/AdditionalQueriesSuperAndRetirement";
import PersonalIncome from "../Components/Questions/PersonalIncome/PersonalIncome";
import BusinessEntities from "../Components/Questions/BusinessEntities/BusinessEntities";
import QuestionsFamily from "../Components/Questions/QuestoinsFamilyTrust/QuestoinsFamily";
import PersonalInsurance from "../Components/Questions/PersonalInsurance/PersonalInsurance";
import { Route, Routes } from "react-router-dom";
import GoalsObjectiveNew from "../Components/Goals&Objectives/GoalsObjectiveNew";
import Contact from "../Components/ContactTest/Contact";
import RiskProfileNew from "../Components/RiskProfile/RiskProfileNew";
import RiskProfileCards from "../Components/RiskProfile/RiskProfileCards";
import RecoilStateManage from "../RecoilStateManage/RecoilStateManage";
import ImportantQuestion from "../Components/Questions/ImportantQuestion/ImportantQuestion";
import PersonalDetailNew from "../Components/PersonalDetails/PersonalDetailNew";


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

    let topMenuArray = ['/', '/Goals-And-Objectives', '/Risk-Profile', '/All-Clients',
        '/Risk-Profile/',
        "/Risk-Profile/Q2",
        "/Risk-Profile/Q3",
        "/Risk-Profile/Q4",
        "/Risk-Profile/Q5",
        "/Risk-Profile/Q6",
        "/Risk-Profile/Q7",
        "/Risk-Profile/Q8",
        "/Risk-Profile-Cards"
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

                            {/* Test Route For Dynamic Time Estimation */}
                            <Route path="/TestComp" element={<TestComp />} />

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
                            <Route path="/PersonalInsurance" element={<QuestionsNew><PersonalInsurance /></QuestionsNew>} />
                            <Route path="/BusinessEntities" element={<QuestionsNew><BusinessEntities /></QuestionsNew>} />
                            <Route path="/SMSF" element={<QuestionsNew><QuestionsSMSF /></QuestionsNew>} />
                            <Route path="/FamilyTrust" element={<QuestionsNew><QuestionsFamily /></QuestionsNew>} />

                            <Route path="/Goals-And-Objectives" element={<GoalsObjectiveNew />} />

                            <Route path="/Risk-Profile/*" element={<RiskProfileNew />} />
                            <Route path="/Risk-Profile-Cards/" element={<RiskProfileCards />} />

                            <Route path="/PDF-Test" element={<Contact />} />


                            {/* Cash-Flow ROUTING */}
                            <Route path="/Cash-Flow" element={<CashFlow />} />
                            <Route path="/Income-And-Expenses-CashFlow" element={<IncomeAndExpenses />} />
                            <Route path="/Personal-Assets-CashFlow" element={<PersonalAssets />} />
                            <Route path="/Investments-CashFlow" element={<InvestmentsCashFlow />} />
                            <Route path="/Direct-Property" element={<DirectProperty />} />
                            <Route path="/Super-And-Retirement-CashFlow" element={<SuperAndRetirementCashFlow />} />
                            <Route path="/Investment-Trust-CashFlow" element={<InvestmentTrustCashFlow />} />
                            <Route path="/SMSF-CashFlow" element={<SmsfCashFlow />} />

                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthRouts
