import React, { useEffect, useState } from "react";
import { Field } from "formik";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import {
  generateReportColumns,
  openNotificationSuccess,
} from "../../../Components/Assets/Api/Api";
import AntTableDynamicReportTable from "../../../Components/Assets/Table/AntTableDynamicReportTable";

// Import your SVGs and imageMap here as shown above
// const assetTypeIconsMap = {...}

// Import SVGs
import LifestyleAssetsSVG from "../../CashFlowAssets/Asset_and_Libility/SVG/Lifestyle_Assets.svg";
import FamilyHomeSVG from "../../CashFlowAssets/Asset_and_Libility/SVG/Family_Home.svg";
import DirectSharePortfoliosSVG from "../../CashFlowAssets/Asset_and_Libility/SVG/Direct_Share_Portfolios.svg";
import ManagedFundsSVG from "../../CashFlowAssets/Asset_and_Libility/SVG/Managed_Funds.svg";
import OtherInvestmentsSVG from "../../CashFlowAssets/Asset_and_Libility/SVG/Other_Investments.svg";
import CashSVG from "../../CashFlowAssets/Asset_and_Libility/SVG/Cash.svg";
import TermDepositsSVG from "../../CashFlowAssets/Asset_and_Libility/SVG/Term_Deposits.svg";
import InsuranceBondsSVG from "../../CashFlowAssets/Asset_and_Libility/SVG/Insurance_Bonds.svg";
import InvestmentPropertiesSVG from "../../CashFlowAssets/Asset_and_Libility/SVG/Investment_Properties.svg";
import SuperannuationSVG from "../../CashFlowAssets/Asset_and_Libility/SVG/Superannuation.svg";
import AccountBasedSVG from "../../CashFlowAssets/Asset_and_Libility/SVG/Account Based.svg";
import AnnuityInvestmentsSVG from "../../CashFlowAssets/Asset_and_Libility/SVG/Annuity_Investments.svg";
import TradingCompanySVG from "../../CashFlowAssets/Asset_and_Libility/SVG/Trading_Company.svg";
import BusinessTrustSVG from "../../CashFlowAssets/Asset_and_Libility/SVG/Business_Trust.svg";
import SMSFNetAssetsSVG from "../../CashFlowAssets/Asset_and_Libility/SVG/SMSF_Net_Assets.svg";
import FamilyTrustNetAssetsSVG from "../../CashFlowAssets/Asset_and_Libility/SVG/Family_Trust_Net_Assets.svg";

import HomeLoanSVG from "../../CashFlowAssets/Asset_and_Libility/SVG/Home_Loan.svg";
import PersonalLoansSVG from "../../CashFlowAssets/Asset_and_Libility/SVG/Personal_Loans.svg";
import CreditCardsSVG from "../../CashFlowAssets/Asset_and_Libility/SVG/Credit_Cards.svg";
import InvestmentPropertySVG from "../../CashFlowAssets/Asset_and_Libility/SVG/Investment_Property.svg";
import InvestmentLoansSVG from "../../CashFlowAssets/Asset_and_Libility/SVG/Investment_Loans.svg";
import { Tooltip } from "antd";

const assetTypeIconsMap = {
  LifestyleAssets: LifestyleAssetsSVG,
  FamilyHome: FamilyHomeSVG,
  DirectSharePortfolios: DirectSharePortfoliosSVG,
  ManagedFunds: ManagedFundsSVG,
  OtherInvestments: OtherInvestmentsSVG,
  Cash: CashSVG,
  TermDeposits: TermDepositsSVG,
  InsuranceBonds: InsuranceBondsSVG,
  InvestmentProperties: InvestmentPropertiesSVG,
  Superannuation: SuperannuationSVG,
  // Add other asset types and their corresponding SVGs here
  AccountBased: AccountBasedSVG,
  AnnuityInvestments: AnnuityInvestmentsSVG,
  TradingCompany: TradingCompanySVG,
  BusinessTrustSVG: BusinessTrustSVG,
  SMSFNetAssets: SMSFNetAssetsSVG,
  FamilyTrustNetAssets: FamilyTrustNetAssetsSVG,
  HomeLoan: HomeLoanSVG,
  PersonalLoans: PersonalLoansSVG,
  CreditCards: CreditCardsSVG,
  InvestmentProperty: InvestmentPropertySVG,
  InvestmentLoans: InvestmentLoansSVG,
  // Add other asset types and their corresponding SVGs here
};

const AssetLiabilitiesReport = ({
  showFilters,
  setShowFilters,
  asset,
  asstesAndLiabilities,
  handleChange,
  values,
  setFieldValue,
}) => {
  const [currentYear] = useState(new Date().getFullYear());
  const [columns, setColumns] = useState(
    generateReportColumns({
      startYear: 1,
      endYear: 6,
      currentYear,
      withExisting: true,
      imageMap: assetTypeIconsMap,
    })
  );

  const applyFilter = (values, currentInput) => {
    if (values.yearFrom !== "" && values.yearTo !== "") {
      const currentValue = parseInt(currentInput.value, 10);

      let yearFrom = parseInt(values.yearFrom, 10);
      let yearTo = parseInt(values.yearTo, 10);

      if (currentInput.name === "yearFrom") {
        yearFrom = currentValue;
        yearTo = Math.min(currentValue + 5, 30);
      } else if (currentInput.name === "yearTo") {
        yearTo = currentValue;
        yearFrom = Math.max(currentValue - 5, 1);
      }

      if (!isNaN(yearFrom) && !isNaN(yearTo)) {
        const dynamicYearColumns = [];

        for (let year = yearFrom; year <= yearTo; year++) {
          dynamicYearColumns.push({
            title: (
              <>
                <div className="w-100 text-center">{currentYear + year}</div>
                <div className="w-100 text-center">{year}</div>
              </>
            ),
            dataIndex: `year${year}`,
            key: year.toString(),
            align: "center",
            render: (text, record) => {
              const isParentRow =
                record.children && Array.isArray(record.children);
              return (
                <div
                  style={{
                    fontWeight: isParentRow ? "bold" : "normal",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontFamily: '"Inter", sans-serif',
                    textAlign: "center",
                  }}
                >
                  {text}
                </div>
              );
            },
          });
        }

        const updatedColumns = [
          {
            title: (
              <>
                <div className="w-100">Financial Year Ending 30 June</div>
                <div className="w-100">Year</div>
              </>
            ),
            dataIndex: "type",
            key: "type",
            width: 253,
            fixed: "left",
            render: (text, record) => {
              const isParentRow =
                record.children && Array.isArray(record.children);
              return (
                <Tooltip title={text}>
                  <div
                    style={{
                      fontWeight: isParentRow ? "bold" : "normal",
                      overflow: "hidden",
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {text}
                  </div>
                </Tooltip>
              );
            },
          },
          {
            title: (
              <>
                <div className="w-100">Existing</div>
              </>
            ),
            dataIndex: "existing",
            key: "existing",
            width: 253,
            fixed: "left",
            render: (text, record) => {
              const isParentRow =
                record.children && Array.isArray(record.children);
              return (
                <Tooltip title={text}>
                  <div
                    style={{
                      fontWeight: isParentRow ? "bold" : "normal",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {text}
                  </div>
                </Tooltip>
              );
            },
          },
          ...dynamicYearColumns,
        ];

        if (values.category === "Persona Assets & Liabilities") {
          updatedColumns.filter((_, index) => index !== 1);
        }

        setColumns(updatedColumns);
      } else {
        openNotificationSuccess(
          "error",
          "topRight",
          "Error Notification",
          "Please! Enter valid year range"
        );
      }
    } else {
      console.warn("Invalid year range");
    }
  };

  useEffect(() => {
    setFieldValue("category", "Net Worth");
    setFieldValue("yearFrom", 1);
    setFieldValue("yearTo", 6);
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-green mt-3 fw-bold">Asset & Liabilities</h2>
        <span
          role="button"
          className="text-green"
          onClick={() => setShowFilters(!showFilters)}
        >
          {!showFilters ? <FaMagnifyingGlass /> : <FaXmark />}
        </span>
      </div>

      {showFilters && (
        <Card className="my-4 shadow-sm p-3 rounded">
          <Row className="justify-content-around align-items-center">
            <Col md={6}>
              <label htmlFor="category">Report Type:</label>
              <Field
                as="select"
                name="category"
                className="form-select inputDesignDoubleInput"
              >
                <option value="">Select</option>
                <option value="Net Worth">Net Worth</option>
                <option value="Persona Assets & Liabilities">
                  Persona Assets & Liabilities
                </option>
              </Field>
            </Col>

            <Col md={3}>
              <label htmlFor="yearFrom">Year From:</label>
              <Field
                as="select"
                name="yearFrom"
                className="form-select inputDesignDoubleInput"
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setFieldValue("yearFrom", value);

                  const calculatedTo = value + 5;

                  if (calculatedTo > 10 && calculatedTo < 15) {
                    setFieldValue("yearTo", 15);
                  } else {
                    setFieldValue("yearTo", Math.min(30, calculatedTo));
                  }
                  applyFilter(values, e.target);
                }}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Field>
            </Col>

            <Col md={3}>
              <label htmlFor="yearTo">Year To:</label>
              <Field
                as="select"
                name="yearTo"
                className="form-select inputDesignDoubleInput"
                onChange={(e) => {
                  handleChange(e);
                  const newYearTo = parseInt(e.target.value, 10);
                  setFieldValue("yearFrom", Math.max(newYearTo - 5, 1));
                  applyFilter(values, e.target);
                }}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30].map(
                  (value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  )
                )}
              </Field>
            </Col>
          </Row>
        </Card>
      )}

      {values.category === "Net Worth" && (
        <AntTableDynamicReportTable
          title="Net Worth"
          dataSource={asset || []}
          columns={columns}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          highlightTypes={[
            "Total Assets",
            "Total Liabilities",
            "Total Net Worth",
            "Total Net Worth (PV)",
          ]}
        />
      )}

      {values.category === "Persona Assets & Liabilities" && (
        <AntTableDynamicReportTable
          title="Personal Assets & Liabilities"
          dataSource={asstesAndLiabilities || []}
          columns={columns.filter((_, index) => index !== 1)}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          highlightTypes={[
            "Closing Value",
            "Year End Loan Balance",
            "Total Personal Assets",
            "Year End Loan Balance",
          ]}
        />
      )}
    </>
  );
};

export default AssetLiabilitiesReport;
