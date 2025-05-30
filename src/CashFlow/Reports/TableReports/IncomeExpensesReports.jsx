import React, { useEffect, useState } from "react";
import { Field, isObject } from "formik";
import { Card, Col, Row } from "react-bootstrap";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import {
  generateReportColumns,
  openNotificationSuccess,
  RenderName,
} from "../../../Components/Assets/Api/Api";
import AntTableDynamicReportTable from "../../../Components/Assets/Table/AntTableDynamicReportTable";
import { Button, Dropdown, Menu, Space, Tooltip } from "antd";
import { FaAngleDown } from "react-icons/fa";

const IncomeExpensesReports = ({
  showFilters,
  setShowFilters,
  FullIncomeExpensesObj,
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
  const [percentTable, setPercentTable] = useState(false);

  const columnsPercent = [
    {
      title: "Investment Metric",
      dataIndex: "investment",
      key: "investment",
      width: 253,
      fixed: "left",
      render: (text, record) => {
        const isParentRow = record.children && Array.isArray(record.children);
        return (
          <div
            className={isParentRow && "fw-bold"}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {text}
          </div>
        );
      },
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
  ];

  const categoryTables = {
    Cashflow: {
      data: FullIncomeExpensesObj?.["Cashflow"] || [],
      title: "Cashflow",
      highlight: ["Total Inflows", "Total Outflows", "Surplus/deficit"],
    },
    "Client's Tax": {
      data: FullIncomeExpensesObj?.["Client's Tax"] || [],
      title: `${RenderName("client")}'s Tax`,
      highlight: [
        "Total Assessable income",
        "Total Allowable Deductions",
        "Total Taxable Income",
        "Total Tax payable",
        "Total Rebates",
      ],
    },
    "Partner's Tax": {
      data: FullIncomeExpensesObj?.["Partner's Tax"] || [],
      title: `${RenderName("partner")}'s Tax`,
      highlight: [
        "Total Assessable income",
        "Total Allowable Deductions",
        "Total Taxable Income",
        "Total Tax payable",
        "Total Rebates",
      ],
    },
    Centrelink: {
      data: FullIncomeExpensesObj?.["Centrelink"] || [],
      title: `Centrelink Summary`,
      highlight: [
        "Total Assets",
        "Total Income",
        "Actual Payment",
        "Payment Amount",
        "Under Income Test",
      ],
    },
    "Family Tax Benefits": {
      data: FullIncomeExpensesObj?.["Family Tax Benefits"] || [],
      title: `Family Tax Benefits`,
      highlight: [
        "Total Adjusted Family Income",
        "Total FTB- Part A (including Supplement)",
        "Total Income For Primary Income Earner",
        "Total Income For Secondary Income Earner",
        "Total FTB- Part B (including Supplement)",
        "Total Family tax Benefits (Part A & B)",
      ],
    },
  };

  const categoryPercentTables = {};

  const applyFilter = (values, currentInput) => {
    try {
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
        const dynamicYearColumns = Array.from(
          { length: yearTo - yearFrom + 1 },
          (_, i) => {
            const year = yearFrom + i;
            return {
              title: (
                <>
                  <div className="w-100 text-center">
                    {currentYear + (year - 1)}
                  </div>
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
            };
          }
        );

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
            width: 280,
            fixed: "left",
            render: (text, row) => {
              if (row.isHeader) return { props: { colSpan: 0 } };

              const isParentRow = row?.children && Array.isArray(row.children);

              return (
                <Tooltip title={text}>
                  <div
                    style={{
                      fontWeight: isParentRow ? "bold" : "normal",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
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
          {
            title: <div className="w-100 text-center">Existing</div>,
            dataIndex: "existing",
            key: "existing",
            fixed: "center",
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
          },
          ...dynamicYearColumns,
        ];

        if (values.category !== "Balance Sheets") {
          updatedColumns.splice(1, 1);
        }

        setColumns(updatedColumns);
      } else {
        openNotificationSuccess(
          "error",
          "topRight",
          "Error Notification",
          "Please enter a valid year range."
        );
      }
    } catch (err) {
      console.error("Error in applyFilter:", err);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error",
        "An unexpected error occurred while applying filter."
      );
    }
  };

  useEffect(() => {
    setFieldValue("category", "Cashflow");
    setColumns(
      generateReportColumns({
        startYear: values.yearFrom || 1,
        endYear: values.yearTo || 6,
      })
    );
  }, [setFieldValue]);

  const renderReportTable = (tables, isPercent = false) => {
    const tableInfo = tables[values.category];
    if (!values.category || !tableInfo) return null;

    const data = tableInfo.data || [];
    const highlight = tableInfo.highlight || [];
    const title = !isPercent ? `${tableInfo.title}` : undefined;

    return (
      <AntTableDynamicReportTable
        title={title}
        dataSource={data}
        columns={isPercent ? columnsPercent : columns}
        highlightTypes={highlight}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        pagination={isPercent ? false : undefined}
      />
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-green mt-3 fw-bold">Income & Expance</h2>
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
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("yearFrom", 1);
                  setFieldValue("yearTo", 6);
                  setColumns(
                    generateReportColumns({
                      startYear: 1,
                      endYear: 6,
                    })
                  );
                }}
              >
                <option value="">Select</option>
                <option value="Cashflow">Cashflow</option>
                <option value="Client's Tax">
                  {RenderName("client")}'s Tax
                </option>
                {localStorage.getItem("UserStatus") === "Married" && (
                  <option value="Partner's Tax">
                    {RenderName("partner")}'s Tax
                  </option>
                )}
                <option value="Centrelink">Centrelink</option>
                <option value="Family Tax Benefits">Family Tax Benefits</option>
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
                  setFieldValue(
                    "yearTo",
                    value + 5 > 10 && value + 5 < 15
                      ? 15
                      : Math.min(30, value + 5)
                  );
                  applyFilter(values, e.target);
                }}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25].map((val) => (
                  <option key={val} value={val}>
                    {val}
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
                  const val = parseInt(e.target.value, 10);
                  setFieldValue("yearFrom", Math.max(1, val - 5));
                  applyFilter(values, e.target);
                }}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30]
                  .filter((year) => year >= parseInt(values.yearFrom || 1))
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

      {percentTable && renderReportTable(categoryPercentTables, true)}

      <div>{renderReportTable(categoryTables)}</div>
    </>
  );
};

export default IncomeExpensesReports;
