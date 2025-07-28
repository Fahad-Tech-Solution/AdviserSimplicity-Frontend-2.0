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
            path="/dashboard"
            element={<Dashboard collapsed={collapsed} />}
          />

          <Route path="/all-client" element={<AllClients />} />
          <Route path="/view-client" element={<ViewClient />} />

          <Route path="/personal-detail" element={<PersonalDetailNew />} />
          <Route
            path="/personal-detail-old"
            element={<PersonalDetail_Edit />}
          />

          <Route path="/important-question" element={<ImportantQuestion />} />
          {/* Questions ROUTING */}
          <Route path="/questions" element={<Questions />} />
          <Route
            path="/personal-income"
            element={
              <QuestionsNew>
                <PersonalIncome />
              </QuestionsNew>
            }
          />
          <Route
            path="/personal-assets"
            element={
              <QuestionsNew>
                <AdditionalQueriesPersonalAssets />
              </QuestionsNew>
            }
          />
          <Route
            path="/financial-investments"
            element={
              <QuestionsNew>
                <FinancialInvestments />
              </QuestionsNew>
            }
          />
          <Route
            path="/super-and-retirement"
            element={
              <QuestionsNew>
                <AdditionalQueriesSuperAndRetirement />
              </QuestionsNew>
            }
          />
          <Route
            path="/life-Style"
            element={
              <QuestionsNew>
                <LifestyleAssetsAndDebt />
              </QuestionsNew>
            }
          />
          <Route
            path="/investment"
            element={
              <QuestionsNew>
                <AdditionalQueriesInvestment />
              </QuestionsNew>
            }
          />
          <Route
            path="/estate-planning"
            element={
              <QuestionsNew>
                <EstatePlanning />
              </QuestionsNew>
            }
          />
          <Route
            path="/professional-advisor"
            element={
              <QuestionsNew>
                <AdditionalQueriesProfessionalAdvisor />
              </QuestionsNew>
            }
          />
          {/* APi Integration Left */}
          <Route
            path="/personal-insurance"
            element={
              <QuestionsNew>
                <PersonalInsuranceLife />
              </QuestionsNew>
            }
          />
          <Route
            path="/business-entities"
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
            path="/family-trust"
            element={
              <QuestionsNew>
                <QuestionsFamily />
              </QuestionsNew>
            }
          />
          <Route path="/goals-and-objectives" element={<GoalsObjectiveNew />} />
          <Route path="/risk-profile/*" element={<RiskProfileNew />} />
          <Route path="/CDF-prospects" element={<CDFclients />} />
          <Route path="/profile" element={<ProfileTemp />} />
          <Route path="/my-team" element={<MyTeam />} />
        </Routes>
      </div>
    </div>
  );
}

export default AuthRouts;
