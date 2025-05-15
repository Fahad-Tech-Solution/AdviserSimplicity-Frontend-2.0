// Import necessary libraries and components

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

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
import { ReportsData } from "../../Store/Store";
import { useRecoilValue } from "recoil";
import {
  toCommaAndDollar,
  updateCardByTitle,
} from "../../Components/Assets/Api/Api";

const FunnalComp = () => {
  let Nev = useNavigate();

  let [yearSelected, setYearSelected] = useState("1");

  const reportSections = useRecoilValue(ReportsData);

  // Data for income cards
  const [incomeData, setIncomeData] = useState([
    { title: "Active Income", amount: "$1,000", icon: ActiveIncomeSVG },
    { title: "Passive Income", amount: "$312,141", icon: PassiveIncomeSVG },
    {
      title: "Retirement Income Streams",
      amount: "$454",
      icon: RetirementIncomeSVG,
    },
    { title: "Centrelink", amount: "$0", icon: CentrelinkSVG },
    { title: "Others", amount: "$2,655", icon: OthersSVG },
  ]);

  // Data for expense cards
  const [expenseData, setExpenseData] = useState([
    { title: "Living Expenses", amount: "$ 5,001", icon: LivingExpensesSVG },
    { title: "Other Expenses", amount: "$ 5,000", icon: OtherExpensesSVG },
  ]);

  // Data for allocation cards
  const [allocationData, setAllocationData] = useState([
    {
      title: "Super Contributions",
      amount: "$0",
      icon: Super_ContributionsSVG,
    },
    { title: "Loan Repayment", amount: "$ 5,000", icon: Loan_RepaymentsSVG },
  ]);

  const [superTotalData, setSuperTotalData] = useState([
    {
      title: "Surplus/Deficit",
      amount: "$0",
    },
  ]);

  useEffect(() => {
    if (reportSections && Object.keys(reportSections).length > 0) {
      let ObjArray = [
        {
          selectedYearIndex: yearSelected,
          DataSource: reportSections.fullTableCashFlow[2].children,
          targetTitle: "Active Income",
          updateState: setIncomeData,
          filterTypes: [
            "Salary Income",
            "Other Taxable income",
            "Net Business Income",
            "Net Income From Business (Coy & Trust)",
          ],
        },
        {
          selectedYearIndex: yearSelected,
          DataSource: reportSections.fullTableCashFlow[2].children,
          targetTitle: "Passive Income",
          updateState: setIncomeData,
          filterTypes: [
            "Rental Income",
            "Investment Income",
            "Interest Income",
            "Trust Distributions",
          ],
        },
        {
          selectedYearIndex: yearSelected,
          DataSource: reportSections.fullTableCashFlow[2].children,
          targetTitle: "Retirement Income Streams",
          updateState: setIncomeData,
          filterTypes: [
            "Super Pensions",
            "Annuity Income",
            "Lumpsum Super & Pension W/Drawals",
          ],
        },
        {
          selectedYearIndex: yearSelected,
          DataSource: reportSections.fullTableCashFlow[2].children,
          targetTitle: "Centrelink",
          updateState: setIncomeData,
          filterTypes: ["Family Tax Payments (A & B)", "Centrelink Payments"],
        },
        {
          selectedYearIndex: yearSelected,
          DataSource: reportSections.fullTableCashFlow[2].children,
          targetTitle: "Others",
          updateState: setIncomeData,
          filterTypes: [
            "Other Non-Taxable income",
            "Child Maintenance Received",
            "Investment Redemptions",
            "Loan Additions",
            "Other Lumpsum Additions",
          ],
        },
        {
          selectedYearIndex: yearSelected,
          DataSource: reportSections.fullTableCashFlow[3].children,
          targetTitle: "Living Expenses",
          updateState: setExpenseData,
          filterTypes: [
            "General Living Expenses",
            "Holidays",
            "Other Expenses",
            "Personal Insurances",
            "Education Expenses",
            "Property Expenses",
          ],
        },
        {
          selectedYearIndex: yearSelected,
          DataSource: reportSections.fullTableCashFlow[3].children,
          targetTitle: "Other Expenses",
          updateState: setExpenseData,
          filterTypes: [
            "Child Maintenance Payed",
            "Other Lumpsum Purchases",
            "Additional Purchases of Investments",
            "Tax",
          ],
        },
        {
          selectedYearIndex: yearSelected,
          DataSource: reportSections.fullTableCashFlow[3].children,
          targetTitle: "Super Contributions",
          updateState: setAllocationData,
          filterTypes: [
            "Concessional Super Contributions",
            "Non-Concessional Super Contributions",
          ],
        },
        {
          selectedYearIndex: yearSelected,
          DataSource: reportSections.fullTableCashFlow[3].children,
          targetTitle: "Loan Repayment",
          updateState: setAllocationData,
          filterTypes: [
            "Non-Deductible Loan Repayments",
            "Loan Repayments (Property Loans)",
            "Investment Loan Repayment",
          ],
        },
        {
          selectedYearIndex: yearSelected,
          DataSource: reportSections.fullTableCashFlow[4].children,
          targetTitle: "Surplus/Deficit",
          updateState: setSuperTotalData,
          filterTypes: [
            "Surplus/Deficit",
            "Home Loan End",
            "Cash Savings Year End",
          ],
        },
      ];

      ObjArray.forEach(updateCardByTitle);
    }
  }, [reportSections, yearSelected]);

  return (
    <Container fluid className="p-3 funnel-container">
      {/* Income Cards Section */}
      <Row className="mb-4 justify-content-center gap-lg-4 ">
        <Col md={12}>
          <h2 className={"fw-bold text-green text-center"}>
            Cash Flow Reports
          </h2>
        </Col>
        <Col md={12}>
          <Row className="justify-content-center">
            <Col md={1}>
              <label htmlFor="YearInput" className="fw-bold mt-2">
                {" "}
                Year :
              </label>
            </Col>

            <Col md={1}>
              <select
                className="form-select inputDesign"
                name="YearFrom"
                value={yearSelected}
                onChange={(e) => {
                  setYearSelected(e.target.value);
                }}
              >
                <option value={""}>Select</option>
                {Array.from({ length: 30 }).map((_, index) => {
                  return <option value={index + 1}>{index + 1}</option>;
                })}
              </select>
            </Col>
          </Row>
        </Col>

        {incomeData.map((item, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={2} className="mb-3">
            <Card
              className={`h-100 border-success shadow-sm text-center   ${
                item.amount !== "$0" ? "CardActive" : ""
              }`}
              onClick={() => {
                console.log(item);
              }}
            >
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
              <Card
                key={index}
                className={`border-success shadow-sm text-center   ${
                  item.amount !== "$0" ? "CardActive" : ""
                }`}
                onClick={() => {
                  console.log(item);
                }}
              >
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
              <Card
                key={index}
                className={`border-success shadow-sm  ${
                  item.amount !== "$0" ? "CardActive" : ""
                }`}
                onClick={() => {
                  console.log(item);
                }}
              >
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
          {superTotalData.map((item, index) => {
            return (
              <div
                className="modalBG p-3 text-center rounded shadow"
                onClick={() => {
                  console.log(item);
                }}
              >
                <h2 className="fw-bold mb-1">{item.amount}</h2>
                <h5 className="fw-bold">{item.title}</h5>
              </div>
            );
          })}
        </Col>
      </Row>

      {/* Navigation Buttons */}
      <div className="row justify-content-around gap-2 my-5">
        <button
          className="btn btn-outline w-25 backBtn"
          onClick={() => {
            Nev("/Cash-Flow/InvestmentTrust");
          }}
        >
          Back
        </button>
        <button className="btn bgColor w-25 modalBtn">
          Scenario Comparison
        </button>

        <button
          className="btn btn-outline w-25 backBtn"
          onClick={() => {
            Nev("/Cash-Flow/Reports/AssetsAndLiabilities");
          }}
        >
          Assets and Liabilities
        </button>

        <button
          className="btn btn-outline w-25 backBtn"
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

export default FunnalComp;
