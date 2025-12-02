import React, { useEffect, useState, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout, Spin } from "antd";

import AdminSideBar from "../Components/SideBar/AdminSideBar";
import Options from "../Components/Options";
import { Header } from "antd/es/layout/layout";

import { BankDetail, defaultUrl, Employees, Roles } from "../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import { GetAxios } from "../Components/Assets/Api/Api";

// 🔥 Lazy Load All Heavy Pages
const AllClients = lazy(() => import("../GetComponents/AllClients"));
const ViewClient = lazy(() => import("../GetComponents/ViewClient"));
const Dashboard = lazy(() => import("../Components/Dashboard/Dashboard"));
const PersonalDetailNew = lazy(() =>
  import("../Components/PersonalDetails/PersonalDetailNew")
);

const QuestionsNew = lazy(() =>
  import("../Components/Questions_New/QuestionsNew")
);
const FinancialInvestments = lazy(() =>
  import("../Components/Questions/FinancialInvestments/FinancialInvestments")
);
const AdditionalQueriesPersonalAssets = lazy(() =>
  import(
    "../Components/Questions/AdditionalQueriesPersonalAssets/AdditionalQueriesPersonalAssets"
  )
);
const LifestyleAssetsAndDebt = lazy(() =>
  import(
    "../Components/Questions/LifestyleAssetsAndDebt/LifestyleAssetsAndDebt"
  )
);
const AdditionalQueriesInvestment = lazy(() =>
  import(
    "../Components/Questions/AdditionalQueriesInvestment/AdditionalQueriesInvestment"
  )
);
const AdditionalQueriesProfessionalAdvisor = lazy(() =>
  import(
    "../Components/Questions/AdditionalQueriesProfessionalAdvisor/AdditionalQueriesProfessionalAdvisor"
  )
);
const QuestionsSMSF = lazy(() =>
  import("../Components/Questions/QuestoinsSMSF/QuestoinsSMSF")
);
const EstatePlanning = lazy(() =>
  import("../Components/Questions/EstatePlanning/EstatePlanning")
);
const AdditionalQueriesSuperAndRetirement = lazy(() =>
  import(
    "../Components/Questions/AdditionalQueriesSuperAndRetirement/AdditionalQueriesSuperAndRetirement"
  )
);
const PersonalIncome = lazy(() =>
  import("../Components/Questions/PersonalIncome/PersonalIncome")
);
const BusinessEntities = lazy(() =>
  import("../Components/Questions/BusinessEntities/BusinessEntities")
);
const QuestionsFamily = lazy(() =>
  import("../Components/Questions/QuestoinsFamilyTrust/QuestoinsFamily")
);

const GoalsObjectiveNew = lazy(() =>
  import("../Components/Goals&Objectives/GoalsObjectiveNew")
);
const RiskProfileNew = lazy(() =>
  import("../Components/RiskProfile/RiskProfileNew")
);
const PersonalInsuranceLife = lazy(() =>
  import("../Components/Questions/PersonalInsurance/LifeInsurance")
);
const CDFclients = lazy(() => import("../Components/CDFclients/CDFclients"));
const ProfileTemp = lazy(() =>
  import("../Components/Assets/ProfileSection/ProfileTemp")
);
const MyTeam = lazy(() => import("../Components/SuperAdminComponent/MyTeam"));

const { Sider, Content } = Layout;

function AuthRouts() {
  const [collapsed, setCollapsed] = useState(true);
  let [employee, setEmployee] = useRecoilState(Employees);
  let [bankDetailObj, setBankDetailObj] = useRecoilState(BankDetail);

  const routeConfigs = [
    {
      path: "/my-clients",
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
      const [rolesRes, Employees, Investment] = await Promise.all([
        GetAxios(`${DefaultUrl}/api/role`),
        GetAxios(`${DefaultUrl}/api/user/Employees`),
        GetAxios(`${DefaultUrl}/api/investmentoffer/`),
      ]);

      // Update state only if responses exist
      if (rolesRes) setRoles(rolesRes);
      if (Employees) setEmployee(Employees);
      if (Investment) setBankDetailObj(Investment);

      // console.log(Investment);
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
        // trigger={null}
        // breakpoint="md"
        // collapsedWidth="0"
        style={{
          background: "#fff",

          borderRight: "1px solid #f0f0f0",
        }}
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
          <Suspense
            fallback={
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "50vh" }}
              >
                <Spin size="large" />
              </div>
            }
          >
            <Routes>
              {routeConfigs.map(({ path, element }, idx) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    path === "/dashboard" ? element(collapsed) : element()
                  }
                />
              ))}
            </Routes>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AuthRouts;
