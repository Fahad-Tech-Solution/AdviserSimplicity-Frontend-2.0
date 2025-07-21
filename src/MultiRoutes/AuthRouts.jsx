import React, { useEffect, useState } from "react";

import PersonalDetail_Edit from "../Components/PersonalDetails/PersonalDetail_Edit";

import { Route, Routes } from "react-router-dom";

import Options from "../Components/Options";

import AllClients from "../GetComponents/AllClients";
import ViewClient from "../GetComponents/ViewClient";

import Questions from "../Components/Questions/Questoins";

import { useRecoilState, useRecoilValue } from "recoil";

import Dashboard from "../Components/Dashboard/Dashboard";

import { CurrentPage, defaultUrl, Loading, ProspectsCDF } from "../Store/Store";

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
import ImportantQuestion from "../Components/Questions/ImportantQuestion/ImportantQuestion";
import PersonalDetailNew from "../Components/PersonalDetails/PersonalDetailNew";

import PersonalInsuranceLife from "../Components/Questions/PersonalInsurance/LifeInsurance";
import CDFclients from "../Components/CDFclients/CDFclients";
import AdminSideBar from "../Components/SideBar/AdminSideBar";
import ProfileTemp from "../Components/Assets/ProfileSection/ProfileTemp";
import AllAdvisers from "../Components/SuperAdminComponent/AllAdvisers";
import MyTeam from "../Components/SuperAdminComponent/myTeam";

function AuthRouts() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="container-fluid p-0 d-flex flex-row align-items-stretch">
      <div>
        <AdminSideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <div className={`flex-grow-1 w-100 px-3`}>
        <Options collapsed={collapsed} setCollapsed={setCollapsed} />
        <Routes>
          <Route
            path="/Dashboard"
            element={<Dashboard collapsed={collapsed} />}
          />

          <Route path="/All-Clients" element={<AllClients />} />
          <Route path="/View-Client" element={<ViewClient />} />

          <Route path="/PersonalDetail" element={<PersonalDetailNew />} />
          <Route path="/PersonalDetailOld" element={<PersonalDetail_Edit />} />

          <Route path="/ImportantQuestion" element={<ImportantQuestion />} />
          {/* Questions ROUTING */}
          <Route path="/Questions" element={<Questions />} />
          <Route
            path="/PersonalIncome"
            element={
              <QuestionsNew>
                <PersonalIncome />
              </QuestionsNew>
            }
          />
          <Route
            path="/PersonalAssets"
            element={
              <QuestionsNew>
                <AdditionalQueriesPersonalAssets />
              </QuestionsNew>
            }
          />
          <Route
            path="/FinancialInvestments"
            element={
              <QuestionsNew>
                <FinancialInvestments />
              </QuestionsNew>
            }
          />
          <Route
            path="/SuperAndRetirement"
            element={
              <QuestionsNew>
                <AdditionalQueriesSuperAndRetirement />
              </QuestionsNew>
            }
          />
          <Route
            path="/Lifestyle"
            element={
              <QuestionsNew>
                <LifestyleAssetsAndDebt />
              </QuestionsNew>
            }
          />
          <Route
            path="/Investment"
            element={
              <QuestionsNew>
                <AdditionalQueriesInvestment />
              </QuestionsNew>
            }
          />
          <Route
            path="/EstatePlanning"
            element={
              <QuestionsNew>
                <EstatePlanning />
              </QuestionsNew>
            }
          />
          <Route
            path="/ProfessionalAdvisor"
            element={
              <QuestionsNew>
                <AdditionalQueriesProfessionalAdvisor />
              </QuestionsNew>
            }
          />
          {/* APi Integration Left */}
          <Route
            path="/PersonalInsurance"
            element={
              <QuestionsNew>
                <PersonalInsuranceLife />
              </QuestionsNew>
            }
          />
          <Route
            path="/BusinessEntities"
            element={
              <QuestionsNew>
                <BusinessEntities />
              </QuestionsNew>
            }
          />
          <Route
            path="/SMSF"
            element={
              <QuestionsNew>
                <QuestionsSMSF />
              </QuestionsNew>
            }
          />
          <Route
            path="/FamilyTrust"
            element={
              <QuestionsNew>
                <QuestionsFamily />
              </QuestionsNew>
            }
          />
          <Route path="/Goals-And-Objectives" element={<GoalsObjectiveNew />} />
          <Route path="/Risk-Profile/*" element={<RiskProfileNew />} />
          <Route path="/CDF_Prospects" element={<CDFclients />} />
          <Route path="/profile" element={<ProfileTemp />} />
          <Route path="/My-Team" element={<MyTeam />} />
        </Routes>
      </div>
    </div>
  );
}

export default AuthRouts;
