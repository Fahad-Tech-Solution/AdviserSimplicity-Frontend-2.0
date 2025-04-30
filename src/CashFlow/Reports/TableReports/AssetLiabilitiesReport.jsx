import { Table } from "antd";
import { Field } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";

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
import {
  openNotificationSuccess,
  RenderName,
} from "../../../Components/Assets/Api/Api";

const AssetLiabilitiesReport = (props) => {
  let {
    showFilters,
    setShowFilters,
    asset,
    asstesAndLiabilities,
    handleChange,
    values,
    setFieldValue,
  } = props;

  let ImageArray = [
    LifestyleAssetsSVG,
    FamilyHomeSVG,
    DirectSharePortfoliosSVG,
    ManagedFundsSVG,
    OtherInvestmentsSVG,
    CashSVG,
    TermDepositsSVG,
    InsuranceBondsSVG,
    InvestmentPropertiesSVG,
    SuperannuationSVG,
    AccountBasedSVG,
    AnnuityInvestmentsSVG,
    TradingCompanySVG,
    BusinessTrustSVG,
    SMSFNetAssetsSVG,
    FamilyTrustNetAssetsSVG,
    HomeLoanSVG,
    PersonalLoansSVG,
    CreditCardsSVG,
    InvestmentPropertySVG,
    InvestmentLoansSVG,
  ];

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [columns, setColumn] = useState([
    {
      title: "Year",
      dataIndex: "type",
      key: "type",
      width: 250, // 👈 Set fixed width
      fixed: "left", // 👈 Fix column to the left
      render: (text, row, index) => {
        if (row.isHeader) {
          return { props: { colSpan: 0 } };
        }
        const isParentRow = row?.children && Array.isArray(row.children);

        return (
          <div
            style={{
              fontWeight: isParentRow ? "bold" : "normal",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {!isParentRow && (
              <div style={{ width: "25px" }}>
                <Image src={ImageArray[index]} fluid />
              </div>
            )}
            {text}
          </div>
        );
      },
    },
    {
      title: "Existing",
      dataIndex: "existing",
      key: "existing",
      fixed: "left", // 👈 Fix column to the left
      render: (text, record) => {
        const isParentRow = record.children && Array.isArray(record.children);

        return (
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
        );
      },
    },
    ...[1, 2, 3, 4, 5, 6].map((year, i) => {
      if (year === 6) {
        return {
          title: String(year) + " (" + (currentYear + i) + ")",
          dataIndex: `year${year}`,
          key: String(year),
          align: "left",
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
                }}
              >
                {text}
              </div>
            );
          },
        };
      }
      return {
        title: String(year) + " (" + (currentYear + i) + ")",
        dataIndex: `year${year}`,
        key: String(year),
        render: (text, record) => {
          const isParentRow = record.children && Array.isArray(record.children);

          return (
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
          );
        },
      };
    }),
  ]);

  const [columns2, setColumn2] = useState([
    {
      title: "Year",
      dataIndex: "type",
      key: "type",
      width: 250, // 👈 Set fixed width
      fixed: "left", // 👈 Fix column to the left
      render: (text, row, index) => {
        if (row.isHeader) {
          return { props: { colSpan: 0 } };
        }
        const isParentRow = row?.children && Array.isArray(row.children);

        return (
          <div
            style={{
              fontWeight: isParentRow ? "bold" : "normal",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {!isParentRow && (
              <div style={{ width: "25px" }}>
                <Image src={ImageArray[index]} fluid />
              </div>
            )}
            {text}
          </div>
        );
      },
    },
    ...[1, 2, 3, 4, 5, 6].map((year, i) => {
      if (year === 6) {
        return {
          title: String(year) + " (" + (currentYear + i) + ")",
          dataIndex: `year${year}`,
          key: String(year),
          align: "left",
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
                }}
              >
                {text}
              </div>
            );
          },
        };
      }
      return {
        title: String(year) + " (" + (currentYear + i) + ")",
        dataIndex: `year${year}`,
        key: String(year),
        render: (text, record) => {
          const isParentRow = record.children && Array.isArray(record.children);

          return (
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
          );
        },
      };
    }),
  ]);

  const applyFilter = (values, currentInput) => {
    if (values.yearFrom === "" || values.yearTo === "") {
      console.warn("Invalid year range");
      return;
    }

    const { yearFrom, yearTo } = getYearRange(values, currentInput);
    if (isNaN(yearFrom) || isNaN(yearTo) || yearFrom > yearTo) {
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        "Please! Enter valid year range"
      );
      return;
    }

    const dynamicYearColumns = generateDynamicYearColumns(yearFrom, yearTo);
    const baseColumns = getBaseColumns(values.category === "Net Worth");

    const updatedColumns = [...baseColumns, ...dynamicYearColumns];

    if (values.category === "Net Worth") {
      setColumn(updatedColumns);
    } else {
      setColumn2(updatedColumns);
    }
  };

  // Helpers

  const getYearRange = (values, currentInput) => {
    const value = parseInt(currentInput.value, 10);
    const name = currentInput.name;

    let yearFrom = parseInt(values.yearFrom, 10);
    let yearTo = parseInt(values.yearTo, 10);

    if (name === "yearFrom") {
      yearFrom = value;
      yearTo = Math.min(value + 5, 10);
    } else if (name === "yearTo") {
      yearTo = value;
      yearFrom = Math.max(value - 5, 1);
    }

    return { yearFrom, yearTo };
  };

  const generateDynamicYearColumns = (from, to) => {
    const columns = [];

    for (let year = from; year <= to; year++) {
      columns.push({
        title: `${year} (${currentYear + year})`,
        dataIndex: `year${year}`,
        key: year.toString(),
        align: year === to ? "left" : undefined,
        render: (text, record) => {
          const isParentRow = record.children && Array.isArray(record.children);
          return (
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
          );
        },
      });
    }

    return columns;
  };

  const getBaseColumns = (isNetWorth) => {
    const columns = [
      {
        title: "Year",
        dataIndex: "type",
        key: "type",
        width: 250,
        fixed: "left",
        render: (text, row, index) => {
          if (row.isHeader) return { props: { colSpan: 0 } };
          const isParentRow = row?.children && Array.isArray(row.children);

          return (
            <div
              style={{
                fontWeight: isParentRow ? "bold" : "normal",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {!isParentRow && (
                <div style={{ width: "25px" }}>
                  <Image src={ImageArray[index]} fluid />
                </div>
              )}
              {text}
            </div>
          );
        },
      },
    ];

    if (isNetWorth) {
      columns.push({
        title: "Existing",
        dataIndex: "existing",
        key: "existing",
        fixed: "left",
        render: (text, record) => {
          const isParentRow = record.children && Array.isArray(record.children);
          return (
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
          );
        },
      });
    }

    return columns;
  };

  useEffect(() => {
    setFieldValue("category", "Net Worth"); // Set default value for category
    setFieldValue("yearFrom", 1); // Set default value for yearFrom
    setFieldValue("yearTo", 6); // Set default value for yearTo
  }, []);

  return (
    <React.Fragment>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <h2 className="text-green mt-3 fw-bold">Asset & Liabilities </h2>
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
          <Row
            gutter={16}
            className="justify-content-around align-items-center"
          >
            <Col md={6}>
              <label htmlFor="category">Report Type:</label>
              <Field
                as="select"
                name="category"
                className="form-select inputDesignDoubleInput"
              >
                <option value="">Select</option>
                <option selected value="Net Worth">
                  Net Worth
                </option>
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
                  const newYearFrom = parseInt(e.target.value);
                  setFieldValue("yearFrom", newYearFrom); // update yearFrom
                  setFieldValue(
                    "yearTo",
                    parseInt(newYearFrom, 10) + 5 > 10 && newYearFrom < 10
                      ? 10
                      : parseInt(newYearFrom, 10) + 5
                  ); // update yearFrom

                  applyFilter(values, e.target); // apply filter with new yearFrom
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
            <Col md={3}>
              <label htmlFor="yearTo">Year To:</label>
              <Field
                as="select"
                name="yearTo"
                className="form-select inputDesignDoubleInput"
                onChange={(e) => {
                  handleChange(e);
                  const newYearTo = parseInt(e.target.value, 10);
                  setFieldValue(
                    "yearFrom",
                    parseInt(newYearTo, 10) - 5 < 1
                      ? 1
                      : parseInt(newYearTo, 10) - 5
                  ); // update yearFrom

                  applyFilter(values, e.target);
                }}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30]
                  .filter((year) => {
                    const fromYear = parseInt(values.yearFrom || "1");
                    return year >= fromYear && year <= fromYear + 30;
                  })
                  .map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
              </Field>
            </Col>
            <Col md={3} className="d-none">
              <Button
                className="modalBtn mt-4 w-100"
                onClick={() => {
                  applyFilter(values);
                }}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Card>
      )}
      {values.category === "Net Worth" && (
        <div className="mt-4 porsition-relative">
          <Table
            // bordered
            dataSource={asset}
            columns={columns}
            scroll={{ x: "max-content" }}
            pagination={{
              pageSize: 50,
              position: ["bottomRight"],
              className: "custom-pagination",
            }}
          />
        </div>
      )}
      {values.category === "Persona Assets & Liabilities" && (
        <div className="mt-4 porsition-relative">
          <Table
            // bordered
            dataSource={asstesAndLiabilities}
            columns={columns2}
            scroll={{ x: "max-content" }}
            pagination={{
              pageSize: 50,
              position: ["bottomRight"],
              className: "custom-pagination",
            }}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default AssetLiabilitiesReport;
