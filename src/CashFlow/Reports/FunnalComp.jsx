// Import necessary libraries and components

import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

// Import SVGs
import ActiveIncomeSVG from "../CashFlowAssets/Cast_Flow/SVG/Active_Income.svg";
import PassiveIncomeSVG from "../CashFlowAssets/Cast_Flow/SVG/Passive_Income.svg";
import RetirementIncomeSVG from "../CashFlowAssets/Cast_Flow/SVG/Retirement_Income.svg";
import CentrelinkSVG from "../CashFlowAssets/Cast_Flow/SVG/Centrelink.svg";
import OthersSVG from "../CashFlowAssets/Cast_Flow/SVG/Others.svg";
import LivingExpensesSVG from "../CashFlowAssets/Cast_Flow/SVG/Living_Expenses.svg";
import OtherExpensesSVG from "../CashFlowAssets/Cast_Flow/SVG/Other_Expenses.svg";
import FliterSVG from "../CashFlowAssets/Cast_Flow/SVG/Fliter.svg";
import Super_ContributionsSVG from "../CashFlowAssets/Cast_Flow/SVG/Super_Contributions.svg";
import Loan_RepaymentsSVG from "../CashFlowAssets/Cast_Flow/SVG/Loan_Repayments.svg";
import ArrowSVG from "../CashFlowAssets/Cast_Flow/SVG/Arrow.svg";
import { useNavigate } from "react-router-dom";

// Data for income cards
const incomeData = [
  { title: "Active Income", amount: "$1,000", icon: ActiveIncomeSVG },
  { title: "Passive Income", amount: "$312,141", icon: PassiveIncomeSVG },
  {
    title: "Retirement Income Streams",
    amount: "$454",
    icon: RetirementIncomeSVG,
  },
  { title: "Centrelink", amount: "$0", icon: CentrelinkSVG },
  { title: "Others", amount: "$2,655", icon: OthersSVG },
];

// Data for expense cards
const expenseData = [
  { title: "Living Expenses", amount: "$ 5,001", icon: LivingExpensesSVG },
  { title: "Other Expenses", amount: "$ 5,000", icon: OtherExpensesSVG },
];

// Data for allocation cards
const allocationData = [
  { title: "Super Contributions", amount: "$0", icon: Super_ContributionsSVG },
  { title: "Loan Repayment", amount: "$ 5,000", icon: Loan_RepaymentsSVG },
];

const FunnalComp = () => {
  let Nev = useNavigate();
  return (
    <Container fluid className="p-3 funnel-container">
      {/* Income Cards Section */}
      <Row className="mb-4 justify-content-center gap-lg-4 ">
        {incomeData.map((item, index) => (
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
                <h3 className="fw-bold  text-green mb-0">{item.amount}</h3>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Middle Section with Funnel */}
      <Row className="my-4 position-relative ">
        <Col md={1} className="d-none d-lg-block" />
        {/* Left side - Expenses */}
        <Col
          xs={12}
          sm={6}
          md={12}
          lg={3}
          className="mb-4 order-2 order-lg-1 leftside"
        >
          <div className="d-flex flex-column gap-3 w-100 ">
            {expenseData.map((item, index) => (
              <Card key={index} className="border-success shadow-sm">
                <Card.Body className="d-flex align-items-center p-2 p-sm-3">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="me-3"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                    }}
                  />
                  <div>
                    <h6 className="fw-bold mb-0">{item.title}</h6>
                    <h4 className="fw-bold text-green mb-0">{item.amount}</h4>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>

        {/* Middle - Funnel */}
        <Col
          lg={4}
          className="text-center mb-4 d-none d-lg-block order-1 order-lg-2"
        >
          <div className="position-relative">
            <img
              src={FliterSVG}
              alt="Funnel"
              className="img-fluid"
              style={{ maxWidth: "100%" }}
            />
            <div className="position-absolute d-none d-lg-block Aworrow1">
              <img
                src={ArrowSVG}
                alt="Arrow"
                className="img-fluid w-100"
                // style={{ maxWidth: "1" }}
              />
            </div>
            <div className="position-absolute d-none d-lg-block Aworrow2">
              <img
                src={ArrowSVG}
                alt="Arrow"
                className="img-fluid w-100"
                // style={{ maxWidth: "1" }}
              />
            </div>
            <div className="position-absolute d-none d-lg-block Aworrow3">
              <img
                src={ArrowSVG}
                alt="Arrow"
                className="img-fluid w-100"
                // style={{ maxWidth: "1" }}
              />
            </div>
            <div className="position-absolute d-none d-lg-block Aworrow4">
              <img
                src={ArrowSVG}
                alt="Arrow"
                className="img-fluid w-100"
                // style={{ maxWidth: "1" }}
              />
            </div>
          </div>
        </Col>

        {/* Right side - Allocations */}
        <Col
          xs={12}
          sm={6}
          md={12}
          lg={3}
          className="mb-4 order-3 d-flex align-items-end rightside"
        >
          <div className="d-flex flex-column gap-3 w-100">
            {allocationData.map((item, index) => (
              <Card key={index} className="border-success shadow-sm">
                <Card.Body className="d-flex align-items-center p-2 p-sm-3">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="me-3"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                    }}
                  />
                  <div>
                    <h6 className="fw-bold mb-0">{item.title}</h6>
                    <h4 className="fw-bold text-green mb-0">{item.amount}</h4>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>

      {/* Surplus/Deficit Section */}
      <Row className="justify-content-center my-4">
        <Col xs={12} sm={8} md={6} lg={4}>
          <div className="modalBG p-3 text-center rounded shadow">
            <h2 className="fw-bold mb-1">$0</h2>
            <h5 className="fw-bold">Surplus/Deficit</h5>
          </div>
        </Col>
      </Row>

      {/* Navigation Buttons */}
      <div className="row justify-content-around my-5">
        <button className="btn w-25 btn-outline backBtn">Back</button>
        <button className="btn w-25 bgColor modalBtn">
          Scenario Comparison
        </button>
        <button
          className="btn w-25 btn-outline backBtn"
          onClick={() => {
            Nev("/Cash-Flow/Reports/AssetsAndLiabilities");
          }}
        >
          Assets and Liabilities
        </button>
      </div>
    </Container>
  );
};

export default FunnalComp;
