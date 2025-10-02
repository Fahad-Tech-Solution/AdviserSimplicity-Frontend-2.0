import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import AdminSideBar from "../Components/SideBar/AdminSideBar";
import Options from "../Components/Options";
import AllClients from "../GetComponents/AllClients";
import ViewClient from "../GetComponents/ViewClient";
import Dashboard from "../Components/Dashboard/Dashboard";
import PersonalDetailNew from "../Components/PersonalDetails/PersonalDetailNew";
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
import PersonalInsuranceLife from "../Components/Questions/PersonalInsurance/LifeInsurance";
import CDFclients from "../Components/CDFclients/CDFclients";
import ProfileTemp from "../Components/Assets/ProfileSection/ProfileTemp";
import MyTeam from "../Components/SuperAdminComponent/myTeam";
import { Header } from "antd/es/layout/layout";
import { defaultUrl, Employees, Roles } from "../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import { GetAxios } from "../Components/Assets/Api/Api";

const { Sider, Content } = Layout;

function AuthRouts() {
  const [collapsed, setCollapsed] = useState(true);
  let [employee, setEmployee] = useRecoilState(Employees);

  const routeConfigs = [
    {
      path: "/dashboard",
      element: (collapsed) => <Dashboard collapsed={collapsed} />,
    },
    { path: "/all-client", element: () => <AllClients /> },
    { path: "/view-client", element: () => <ViewClient /> },
    { path: "/personal-detail", element: () => <PersonalDetailNew /> },
    {
      path: "/personal-income",
      element: () => (
        <QuestionsNew>
          <PersonalIncome />
        </QuestionsNew>
      ),
    },
    {
      path: "/personal-assets",
      element: () => (
        <QuestionsNew>
          <AdditionalQueriesPersonalAssets />
        </QuestionsNew>
      ),
    },
    {
      path: "/financial-investments",
      element: () => (
        <QuestionsNew>
          <FinancialInvestments />
        </QuestionsNew>
      ),
    },
    {
      path: "/super-and-retirement",
      element: () => (
        <QuestionsNew>
          <AdditionalQueriesSuperAndRetirement />
        </QuestionsNew>
      ),
    },
    {
      path: "/life-Style",
      element: () => (
        <QuestionsNew>
          <LifestyleAssetsAndDebt />
        </QuestionsNew>
      ),
    },
    {
      path: "/investment",
      element: () => (
        <QuestionsNew>
          <AdditionalQueriesInvestment />
        </QuestionsNew>
      ),
    },
    {
      path: "/estate-planning",
      element: () => (
        <QuestionsNew>
          <EstatePlanning />
        </QuestionsNew>
      ),
    },
    {
      path: "/professional-advisor",
      element: () => (
        <QuestionsNew>
          <AdditionalQueriesProfessionalAdvisor />
        </QuestionsNew>
      ),
    },
    {
      path: "/personal-insurance",
      element: () => (
        <QuestionsNew>
          <PersonalInsuranceLife />
        </QuestionsNew>
      ),
    },
    {
      path: "/business-entities",
      element: () => (
        <QuestionsNew>
          <BusinessEntities />
        </QuestionsNew>
      ),
    },
    {
      path: "/SMSF",
      element: () => (
        <QuestionsNew>
          <QuestionsSMSF />
        </QuestionsNew>
      ),
    },
    {
      path: "/family-trust",
      element: () => (
        <QuestionsNew>
          <QuestionsFamily />
        </QuestionsNew>
      ),
    },
    { path: "/goals-and-objectives", element: () => <GoalsObjectiveNew /> },
    { path: "/risk-profile/*", element: () => <RiskProfileNew /> },
    { path: "/CDF-prospects", element: () => <CDFclients /> },
    { path: "/profile", element: () => <ProfileTemp /> },
    { path: "/my-team", element: () => <MyTeam /> },
  ];

  const [role, setRoles] = useRecoilState(Roles);
  let DefaultUrl = useRecoilValue(defaultUrl);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Run multiple GET APIs in parallel
      const [rolesRes, Employees] = await Promise.all([
        GetAxios(`${DefaultUrl}/api/role`),
        GetAxios(`${DefaultUrl}/api/user/Employees`),
      ]);

      // Update state only if responses exist
      if (rolesRes) setRoles(rolesRes);
      if (Employees) setEmployee(Employees);
    } catch (error) {
      console.error("Error fetching data:", error);
      // You could show a toast or alert here instead
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={250}
        style={{ background: "#fff", borderRight: "1px solid #f0f0f0" }}
      >
        <AdminSideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      </Sider>
      <Layout
        style={{
          background: "#fff",
          overflowX: "hidden",
        }}
      >
        <Header
          style={{
            background: "#fff",
            padding: 0,
          }}
        >
          <Options collapsed={collapsed} setCollapsed={setCollapsed} />
        </Header>
        <Content
          style={{
            margin: "16px 10px",
            background: "#fff",
            height: "100%",
            padding: "1rem 0rem",
          }}
        >
          <Routes>
            {routeConfigs.map(({ path, element }, idx) => (
              <Route
                key={path}
                path={path}
                element={path === "/dashboard" ? element(collapsed) : element()}
              />
            ))}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AuthRouts;
