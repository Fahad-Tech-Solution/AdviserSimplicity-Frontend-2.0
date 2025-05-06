import React, { useEffect, useState } from "react";
import { Field } from "formik";
import { Card, Col, Row } from "react-bootstrap";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import {
  generateReportColumns,
  openNotificationSuccess,
  RenderName,
} from "../../../Components/Assets/Api/Api";
import AntTableDynamicReportTable from "../../../Components/Assets/Table/AntTableDynamicReportTable";
import { Tooltip } from "antd";

const FinancialInvestmentsReport = ({
  showFilters,
  setShowFilters,
  FullFinansialInvestmentObject,
  values,
  setFieldValue,
  handleChange,
}) => {
  const [currentYear] = useState(new Date().getFullYear());
  const [columns, setColumns] = useState(
    generateReportColumns({
      startYear: values.yearFrom || 1,
      endYear: values.yearTo || 6,
    })
  );
  const [columnsPercent, setColumnsPercent] = useState([
    {
      title: "Investment Metric",
      dataIndex: "investment",
      key: "investment",
      width: 253,
      fixed: "left",
      render: (text) => (
        <div style={{ fontFamily: "Inter, sans-serif" }}>{text}</div>
      ),
    },
    {
      title: "Details / Allocation",
      dataIndex: "details",
      key: "details",
      width: 253,
      fixed: "left",
      align: "left",
      render: (text) => (
        <div style={{ fontFamily: "Inter, sans-serif" }}>{text}</div>
      ),
    },
  ]);

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
    setFieldValue("reportOwner", "client");
    setFieldValue("category", "Direct Shares");
  }, []);

  const categoryTables = {
    "Direct Shares": {
      data: FullFinansialInvestmentObject.DirectShares,
      title: "Direct Shares",
      highlight: ["Value at Year End"],
    },
    "Managed Funds": {
      data: FullFinansialInvestmentObject.ManagedFunds,
      title: "Managed Funds",
      highlight: ["Value at Year End"],
    },
    "Investment Bonds": {
      data: FullFinansialInvestmentObject.InvestmentBonds,
      title: "Investment Bonds",
      highlight: ["Value at Year End"],
    },
    Other: {
      data: FullFinansialInvestmentObject.Other,
      title: "Other",
      highlight: ["Value at Year End"],
    },
    "Cash": {
      data: FullFinansialInvestmentObject.Cash,
      title: "Cash",
      highlight: ["Value at Year End"],
    },
  };

  const categoryPercentTables = {
    "Direct Shares": {
      data: FullFinansialInvestmentObject.DirectSharesPercent,
      title: "Direct Shares",
      highlight: ["Value at Year End"],
    },
    "Managed Funds": {
      data: FullFinansialInvestmentObject.ManagedFundsPercent,
      title: "Managed Funds",
      highlight: ["Value at Year End"],
    },
    "Investment Bonds": {
      data: FullFinansialInvestmentObject.InvestmentBondsPercent,
      title: "Investment Bonds",
      highlight: ["Value at Year End"],
    },
    Other: {
      data: FullFinansialInvestmentObject.OtherPercent,
      title: "Other",
      highlight: ["Value at Year End"],
    },
    "Cash": {
      data: FullFinansialInvestmentObject.CashPercent,
      title: "Cash",
      highlight: ["Value at Year End"],
    },
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-green mt-3 fw-bold">Financial Investments</h2>
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
            <Col md={3}>
              <label htmlFor="reportOwner">Report Owner:</label>
              <Field
                as="select"
                name="reportOwner"
                className="form-select inputDesignDoubleInput"
              >
                <option value="">Select</option>
                <option value="client">
                  {RenderName("client")}'s Investment
                </option>
                {localStorage.getItem("UserStatus") === "Married" && (
                  <>
                    <option value="partner">
                      {RenderName("partner")}'s Investment
                    </option>
                    <option value="joint">
                      {RenderName("joint")}'s Investment
                    </option>
                  </>
                )}
              </Field>
            </Col>
            <Col md={3}>
              <label htmlFor="category">Report Type:</label>
              <Field
                as="select"
                name="category"
                className="form-select inputDesignDoubleInput"
              >
                <option value="">Select</option>
                <option value="Direct Shares">Direct Shares</option>
                <option value="Managed Funds">Managed Funds</option>
                <option value="Investment Bonds">Investment Bonds</option>
                <option value="Other">Other</option>
                <option value="Cash">Cash</option>
                <option value="Term Deposits">Term Deposits</option>
                <option value="Investment Loans">Investment Loans</option>
                <option value="Margin Loans">Margin Loans</option>
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
                  setFieldValue("yearFrom", Math.max(1, newYearTo - 5));
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
          </Row>
        </Card>
      )}

      <div className="mb-5">
        {/* Render the correct table(s) */}
        {Array.isArray(categoryPercentTables[values.category])
          ? categoryPercentTables[values.category].map((table, idx) => (
              <AntTableDynamicReportTable
                key={idx}
                dataSource={table.data[values.reportOwner]}
                columns={columnsPercent}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                highlightTypes={table.highlight || []}
                pagination={false}
              />
            ))
          : values.category &&
            categoryPercentTables[values.category] && (
              <AntTableDynamicReportTable
                dataSource={
                  categoryPercentTables[values.category].data[
                    values.reportOwner
                  ]
                }
                columns={columnsPercent}
                highlightTypes={
                  categoryPercentTables[values.category].highlight || []
                }
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                pagination={false}
              />
            )}
      </div>

      {/* Render the correct table(s) */}
      {Array.isArray(categoryTables[values.category])
        ? categoryTables[values.category].map((table, idx) => (
            <AntTableDynamicReportTable
              key={idx}
              title={RenderName(values.reportOwner) + "'s " + table.title}
              dataSource={table.data[values.reportOwner]}
              columns={columns}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              highlightTypes={table.highlight || []}
            />
          ))
        : values.category &&
          categoryTables[values.category] && (
            <AntTableDynamicReportTable
              title={
                RenderName(values.reportOwner) +
                "'s " +
                categoryTables[values.category].title
              }
              dataSource={
                categoryTables[values.category].data[values.reportOwner]
              }
              columns={columns}
              highlightTypes={categoryTables[values.category].highlight || []}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />
          )}
    </>
  );
};

export default FinancialInvestmentsReport;
