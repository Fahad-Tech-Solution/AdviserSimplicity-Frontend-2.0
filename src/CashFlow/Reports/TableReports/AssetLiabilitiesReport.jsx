import { Table } from "antd";
import { Field } from "formik";
import React, { useState } from "react";
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

const AssetLiabilitiesReport = (props) => {
  let {
    showFilters,
    setShowFilters,
    asset,
    liabilities,
    surplus,
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

        return (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: "25px" }}>
              <Image src={ImageArray[index]} fluid />
            </div>
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
    },
    {
      title: "1",
      dataIndex: "year1",
      key: "1",
      sorter: (a, b) =>
        a.year1.replace(/[^0-9.-]+/g, "") - b.year1.replace(/[^0-9.-]+/g, ""),
    },
    {
      title: "2",
      dataIndex: "year2",
      key: "2",
      sorter: (a, b) =>
        a.year2.replace(/[^0-9.-]+/g, "") - b.year2.replace(/[^0-9.-]+/g, ""),
    },
    {
      title: "3",
      dataIndex: "year3",
      key: "3",
      sorter: (a, b) =>
        a.year3.replace(/[^0-9.-]+/g, "") - b.year3.replace(/[^0-9.-]+/g, ""),
    },
    {
      title: "4",
      dataIndex: "year4",
      key: "4",
      sorter: (a, b) =>
        a.year4.replace(/[^0-9.-]+/g, "") - b.year4.replace(/[^0-9.-]+/g, ""),
    },
    {
      title: "5",
      dataIndex: "year5",
      key: "5",
      sorter: (a, b) =>
        a.year5.replace(/[^0-9.-]+/g, "") - b.year5.replace(/[^0-9.-]+/g, ""),
    },
    {
      title: "6",
      dataIndex: "year6",
      key: "6",
      align: "left",
      sorter: (a, b) =>
        a.year6.replace(/[^0-9.-]+/g, "") - b.year6.replace(/[^0-9.-]+/g, ""),
    },
  ]);

  const applyFilter = (values) => {
    if (values.yearFrom !== "" && values.yearTo !== "") {
      const yearFrom = parseInt(values.yearFrom, 10);
      const yearTo = parseInt(values.yearTo, 10);

      if (!isNaN(yearFrom) && !isNaN(yearTo) && yearFrom <= yearTo) {
        const dynamicYearColumns = [];

        for (let year = yearFrom; year <= yearTo; year++) {
          dynamicYearColumns.push({
            title: year.toString(),
            dataIndex: `year${year}`, // You may need to match this with your data source
            key: year.toString(),
            sorter: (a, b) =>
              (a[`year${year}`]?.replace?.(/[^0-9.-]+/g, "") || 0) -
              (b[`year${year}`]?.replace?.(/[^0-9.-]+/g, "") || 0),
          });
        }

        // Combine the fixed left column with the dynamic years
        const updatedColumns = [
          {
            title: "Year",
            dataIndex: "type",
            key: "type",
            width: 250,
            fixed: "left",
          },
          {
            title: "Existing",
            dataIndex: "existing",
            key: "existing",
            fixed: "left", // 👈 Fix column to the left
          },
          ...dynamicYearColumns,
        ];

        setColumn(updatedColumns);
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
          <Row gutter={16}>
            <Col md={3}>
              <label htmlFor="category">Category:</label>
              <Field
                as="select"
                name="category"
                className="form-select inputDesignDoubleInput"
              >
                <option value="">Select</option>
                <option value="Cashflow">Net Worth</option>
                <option value="Client Tax">
                  Personal Assets and liability
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
                  setFieldValue("yearTo", newYearFrom + 5); // update yearTo
                }}
              >
                <option value="">Select</option>
                {Array.from({ length: 30 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
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
              >
                <option value="">Select</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = parseInt(values.yearFrom || "1") + i;
                  if (year <= 30)
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                })}
              </Field>
            </Col>
            <Col md={3}>
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
      <div className="mt-4 porsition-relative">
        <h4 className="text-green fw-bold">Assets</h4>

        <Table
          // bordered
          dataSource={asset.slice(0, -1)}
          columns={columns}
          scroll={{ x: "max-content" }}
          pagination={{
            pageSize: 50,
            position: ["bottomRight"],
            className: "custom-pagination",
          }}
          summary={() => {
            const totalRowAsset = asset[asset.length - 1]; // 👈 Get the last row as footer
            return (
              <Table.Summary.Row>
                {columns.map((col, index) => (
                  <Table.Summary.Cell key={index} index={index}>
                    {totalRowAsset[col.dataIndex]}
                  </Table.Summary.Cell>
                ))}
              </Table.Summary.Row>
            );
          }}
        />
      </div>
      <div className="mt-2 porsition-relative table-responcive">
        <h4 className="text-green fw-bold">Liabilities</h4>
        <Table
          dataSource={liabilities.slice(0, -1)}
          columns={columns}
          scroll={{ x: "max-content" }}
          pagination={{
            pageSize: 50,
            position: ["bottomRight"],
            className: "custom-pagination",
          }}
          summary={() => {
            const totalRowLiabilities = liabilities[liabilities.length - 1]; // 👈 Get the last row as footer
            return (
              <Table.Summary.Row>
                {columns.map((col, index) => (
                  <Table.Summary.Cell key={index} index={index}>
                    {totalRowLiabilities[col.dataIndex]}
                  </Table.Summary.Cell>
                ))}
              </Table.Summary.Row>
            );
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default AssetLiabilitiesReport;
