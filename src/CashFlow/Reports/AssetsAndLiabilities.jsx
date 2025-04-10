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

const AssetsAndLiabilities = () => {
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
                <h3 className="fw-bold text-success mb-0">{item.amount}</h3>
              </Card.Body>
            </Card>
          </Col>
        ))}
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

export default AssetsAndLiabilities;
