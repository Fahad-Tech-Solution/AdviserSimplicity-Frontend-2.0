// Import necessary libraries and components

import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

// Import SVGs
import LifestyleAssetsSVG from "../CashFlowAssets/Asset_and_Libility/SVG/Lifestyle_Assets.svg";
import FamilyHomeSVG from "../CashFlowAssets/Asset_and_Libility/SVG/Family_Home.svg";
import DirectSharePortfoliosSVG from "../CashFlowAssets/Asset_and_Libility/SVG/Direct_Share_Portfolios.svg";
import ManagedFundsSVG from "../CashFlowAssets/Asset_and_Libility/SVG/Managed_Funds.svg";
import OtherInvestmentsSVG from "../CashFlowAssets/Asset_and_Libility/SVG/Other_Investments.svg";
import CashSVG from "../CashFlowAssets/Asset_and_Libility/SVG/Cash.svg";
import TermDepositsSVG from "../CashFlowAssets/Asset_and_Libility/SVG/Term_Deposits.svg";
import InsuranceBondsSVG from "../CashFlowAssets/Asset_and_Libility/SVG/Insurance_Bonds.svg";
import InvestmentPropertiesSVG from "../CashFlowAssets/Asset_and_Libility/SVG/Investment_Properties.svg";
import SuperannuationSVG from "../CashFlowAssets/Asset_and_Libility/SVG/Superannuation.svg";
import AccountBasedSVG from "../CashFlowAssets/Asset_and_Libility/SVG/Account Based.svg";
import AnnuityInvestmentsSVG from "../CashFlowAssets/Asset_and_Libility/SVG/Annuity_Investments.svg";
import TradingCompanySVG from "../CashFlowAssets/Asset_and_Libility/SVG/Trading_Company.svg";
import BusinessTrustSVG from "../CashFlowAssets/Asset_and_Libility/SVG/Business_Trust.svg";
import SMSFNetAssetsSVG from "../CashFlowAssets/Asset_and_Libility/SVG/SMSF_Net_Assets.svg";
import FamilyTrustNetAssetsSVG from "../CashFlowAssets/Asset_and_Libility/SVG/Family_Trust_Net_Assets.svg";

import HomeLoanSVG from "../CashFlowAssets/Asset_and_Libility/SVG/Home_Loan.svg";
import PersonalLoansSVG from "../CashFlowAssets/Asset_and_Libility/SVG/Personal_Loans.svg";
import CreditCardsSVG from "../CashFlowAssets/Asset_and_Libility/SVG/Credit_Cards.svg";
import InvestmentPropertySVG from "../CashFlowAssets/Asset_and_Libility/SVG/Investment_Property.svg";
import InvestmentLoansSVG from "../CashFlowAssets/Asset_and_Libility/SVG/Investment_Loans.svg";

import { useNavigate } from "react-router-dom";
import { ConfigProvider, Divider } from "antd";

// Data for income cards10
const AssetData = [
  { title: "Lifestyle Assets", amount: "$11,500", icon: LifestyleAssetsSVG },
  { title: "Family Home", amount: "$816,000", icon: FamilyHomeSVG },
  {
    title: "Direct Share Portfolios",
    amount: "$0",
    icon: DirectSharePortfoliosSVG,
  },
  { title: "Managed Funds", amount: "$0", icon: ManagedFundsSVG },
  { title: "Other Investments", amount: "$0", icon: OtherInvestmentsSVG },
  { title: "Cash", amount: "$14,800", icon: CashSVG },
  { title: "Term Deposits", amount: "$78,123", icon: TermDepositsSVG },
  { title: "Insurance Bonds", amount: "$0", icon: InsuranceBondsSVG },
  {
    title: "Investment Properties",
    amount: "$0",
    icon: InvestmentPropertiesSVG,
  },
  { title: "Superannuation", amount: "$0", icon: SuperannuationSVG },
  {
    title: "Account Based Pensions",
    amount: "$175,937",
    icon: AccountBasedSVG,
  },
  { title: "Annuity Investments", amount: "$0", icon: AnnuityInvestmentsSVG },
  { title: "Trading Company", amount: "$0", icon: TradingCompanySVG },
  { title: "Business Trust", amount: "$0", icon: BusinessTrustSVG },
  { title: "SMSF Net Assets", amount: "$0", icon: SMSFNetAssetsSVG },
  {
    title: "Family Trust Net Assets",
    amount: "$0",
    icon: FamilyTrustNetAssetsSVG,
  },
  { layout: "2", title: "Total Assets", amount: "$1,116,693" },
];

const LiabilitiesData = [
  { title: "Home Loan", amount: "$46,002", icon: HomeLoanSVG },
  { title: "Personal Loans", amount: "$0", icon: PersonalLoansSVG },
  { title: "Credit Cards", amount: "$0", icon: CreditCardsSVG },
  { title: "Investment Property", amount: "$0", icon: InvestmentPropertySVG },
  { title: "Investment Loans", amount: "$0", icon: InvestmentLoansSVG },
];

const LiabilitiesTotalData = [
  { layout: "2", title: "Total Liabilities", amount: "$1,116,693" },
  { title: "Net worth", amount: "$46,002" },
];

const AssetsAndLiabilities = () => {
  let Nev = useNavigate();

  return (
    <Container fluid className="p-0 p-md-3 funnel-container">
      {/* Income Cards Section */}
      <Row className=" ms-0 ms-md-2 mb-4 justify-content-center ">
        <Col md={12}>
          <h2 className={"fw-bold text-green text-center"}>
            Assets And Liabilities
          </h2>
          <h3 className={"fw-bold"}>Asset</h3>
        </Col>

        {AssetData.map((item, index) => {
          if (item?.layout == "2") {
            return (
              <Col key={index} xs={12} sm={6} md={4} lg={4} className="mb-3">
                <Card
                  className="h-100 border-0 shadow-sm text-center modalBG"
                  style={{ borderRadius: "15px" }}
                >
                  <Card.Body className=" h-100 d-flex flex-column justify-content-center align-items-center">
                    <Card.Title className="fw-bold fs-3">
                      {item.title} :
                    </Card.Title>
                    <h3 className="fw-bold mb-0">{item.amount}</h3>
                  </Card.Body>
                </Card>
              </Col>
            );
          }

          return (
            <Col
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={2}
              className="mb-3"
              // style={{ minWidth: "160px", maxWidth: "200px" }}
            >
              <Card className="h-100 border-success shadow-sm text-center">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold fs-6">{item.title}</Card.Title>
                  <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center my-2">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="img-fluid mb-2"
                      style={{
                        width: "60%",
                        maxHeight: "80px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <h3 className="fw-bold fs-3 text-green mb-0">
                    {item.amount}
                  </h3>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Row className=" mb-4 justify-content-center ">
        <Col md={12} className="LibilityHead">
          <ConfigProvider
            theme={{
              components: {
                Steps: {
                  customIconFontSize: 30,
                },
              },
              token: {
                /* here is your global tokens */
                colorSplit: "#36b446",
                colorPrimary: "#36b446",
                fontSize: 12,
                lineWidth: 4,
              },
            }}
          >
            <Divider variant="dashed" />
          </ConfigProvider>
          <h3 className={"fw-bold"}>Liabilities</h3>
        </Col>

        <Col md={8}>
          <Row className=" mt-2 ms-0 ms-md-2 mb-4 justify-content-start ">
            {LiabilitiesData.map((item, index) => {
              return (
                <Col
                  key={index}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                  className="mb-3"
                  // style={{ minWidth: "160px", maxWidth: "200px" }}
                >
                  <Card className="h-100 border-success shadow-sm text-center">
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="fw-bold fs-6">
                        {item.title}
                      </Card.Title>
                      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center my-2">
                        <img
                          src={item.icon}
                          alt={item.title}
                          className="img-fluid mb-2"
                          style={{
                            width: "60%",
                            maxHeight: "80px",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                      <h3 className="fw-bold fs-3 text-green mb-0">
                        {item.amount}
                      </h3>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col md={4}>
          <Row>
            {LiabilitiesTotalData.map((item, index) => {
              if (item?.layout == "2") {
                return (
                  <Col key={index} md={12} className="mb-3 pt-2 px-3 px-md-2">
                    <Card
                      className="border-0 shadow-sm text-center modalBG"
                      style={{ height: "30vh", borderRadius: "15px" }}
                    >
                      <Card.Body className=" h-100 d-flex flex-column justify-content-center align-items-center">
                        <Card.Title className="fw-bold fs-3">
                          {item.title} :
                        </Card.Title>
                        <h3 className="fw-bold   mb-0">{item.amount}</h3>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              }

              return (
                <Col key={index} md={12} className="mb-3 px-3 px-md-2">
                  <Card
                    className=" border-success shadow-sm text-center"
                    style={{ height: "30vh", borderRadius: "15px" }}
                  >
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                      <Card.Title className="fw-bold fs-3 text-green">
                        {item.title}
                      </Card.Title>
                      <h3 className="fw-bold  text-green mb-0">
                        {item.amount}
                      </h3>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>

      {/* Navigation Buttons */}
      <div className="row justify-content-around my-5">
        <button
          className="btn w-25 btn-outline backBtn"
          onClick={() => {
            Nev("/Cash-Flow/Reports");
          }}
        >
          Back
        </button>
        <button className="btn w-25 bgColor modalBtn">
          Scenario Comparison
        </button>
        <button
          className="btn w-25 btn-outline backBtn"
          onClick={() => {
            Nev("/Cash-Flow/Reports/CashFlow");
          }}
        >
          Cash Flow
        </button>
      </div>
    </Container>
  );
};

export default AssetsAndLiabilities;
