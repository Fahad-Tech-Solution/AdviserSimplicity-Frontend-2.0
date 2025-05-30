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

const SMSFReport = ({
  showFilters,
  setShowFilters,
  FullSMSFObj,
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

  const menu = (
    <Menu
      items={[
        {
          key: "Cashflow",
          label: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginLeft: 13,
              }}
            >
              Cashflow
            </div>
          ),
        },
        {
          key: "Tax",
          label: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginLeft: 13,
              }}
            >
              Tax
            </div>
          ),
        },
        {
          key: "Balance Sheets",
          label: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginLeft: 13,
              }}
            >
              Balance Sheets
            </div>
          ),
        },
        {
          key: "Accumilation Account",
          label: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginLeft: 13,
              }}
            >
              Accumilation Account
            </div>
          ),
        },
        {
          key: "Pension Account",
          label: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginLeft: 13,
              }}
            >
              Pension Account
            </div>
          ),
        },
        {
          key: "4",
          label: "Investment",
          popupOffset: [10, 0],
          children: [
            { key: "Direct Shares", label: "Direct Shares" },
            { key: "Managed Funds", label: "Managed Funds" },
            { key: "Other", label: "Other" },
            { key: "Cash", label: "Cash" },
            { key: "Term Deposits", label: "Term Deposits" },
            { key: "Investment Loans", label: "Investment Loans" },
          ],
        },
        {
          key: "5",
          label: "SMSF Property",
          popupOffset: [10, 0], // 👈 horizontal space between parent and submenu
          children: Array.from({ length: 5 }, (_, i) => ({
            key: `SMSF Property ${i + 1}`,
            label: `SMSF Property ${i + 1}`,
          })),
        },
      ]}
      onClick={({ key }) => {
        // console.log("Selected key:", key);
        setFieldValue("category", key);
        if (key === "Balance Sheets") {
          setColumns(
            generateReportColumns({
              startYear: 1,
              endYear: 6,
              currentYear,
              withExisting: true,
            })
          );
        } else {
          setColumns(
            generateReportColumns({
              startYear: 1,
              endYear: 6,
            })
          );
        }

        if (
          [
            "Direct Shares",
            "Managed Funds",
            "Other",
            "Cash",
            "Term Deposits",
          ].includes(key)
        ) {
          setPercentTable(true);
        } else {
          setPercentTable(false);
        }

        setFieldValue("yearFrom", 1);
        setFieldValue("yearTo", 6);
      }}
    />
  );

  const categoryTables = {
    Cashflow: {
      data: FullSMSFObj?.["Cashflow"] || [],
      title: "Cashflow",
      highlight: ["Total Inflows", "Total Outflows", "Surplus/deficit"],
    },
    Tax: {
      data: FullSMSFObj?.["Tax"] || [],
      title: "Tax",
      highlight: [
        "Investment Income Received",
        "Total Assessable Fund Income",
        "Total Deductions",
        "Total Taxable income",
      ],
    },
    "Balance Sheets": {
      data: FullSMSFObj?.["Balance Sheets"] || [],
      title: "Balance Sheets",
      highlight: [
        "Total Assets",
        "Total Liabilities",
        "Total Net Asset",
        "Total Member Balance",
        "Difference",
      ],
    },
    "Accumilation Account": {
      data: FullSMSFObj?.["Accumilation Account"] || [],
      title: "Accumilation Account",
      highlight: ["Closing Member Balance"],
    },
    "Pension Account": {
      data: FullSMSFObj?.["Pension Account"] || [],
      title: "Pension Account",
      highlight: ["Closing Member Balance"],
    },
    "Direct Shares": {
      data: FullSMSFObj?.["Direct Shares"] || [],
      title: "Direct Shares",
      highlight: ["Value at Year End"],
    },
    "Managed Funds": {
      data: FullSMSFObj?.["Managed Funds"] || [],
      title: "Managed Funds",
      highlight: ["Value at Year End"],
    },
    Other: {
      data: FullSMSFObj?.["Other"] || [],
      title: "Other",
      highlight: ["Value at Year End"],
    },
    Cash: {
      data: FullSMSFObj?.["Cash"] || [],
      title: "Cash",
      highlight: ["Value at Year End"],
    },
    "Term Deposits": {
      data: FullSMSFObj?.["Term Deposits"] || [],
      title: "Term Deposits",
      highlight: ["Value at Year End"],
    },
    "Investment Loans": {
      data: FullSMSFObj?.["Investment Loans"] || [],
      title: "Investment Loans",
      highlight: ["Year End Loan Balance"],
    },
    ...Array.from({ length: 5 }).reduce((acc, _, i) => {
      const label = `SMSF Property ${i + 1}`;
      acc[label] = {
        data: FullSMSFObj?.[label] || [],
        title: label,
        highlight: [
          "Total Expenses",
          "Net Rental Income/Loss",
          "Closing Value",
          "Year End Loan Balance",
        ],
      };
      return acc;
    }, {}),
  };

  const categoryPercentTables = {
    "Direct Shares": {
      data: FullSMSFObj?.["Direct Shares Percent"] || [],
      title: "Direct Shares",
      highlight: ["Value at Year End"],
    },
    "Managed Funds": {
      data: FullSMSFObj?.["Managed Funds Percent"] || [],
      title: "Managed Funds",
      highlight: ["Value at Year End"],
    },
    Other: {
      data: FullSMSFObj?.["Other Percent"] || [],
      title: "Other",
      highlight: ["Value at Year End"],
    },
    Cash: {
      data: FullSMSFObj?.["Cash Percent"] || [],
      title: "Cash",
      highlight: ["Value at Year End"],
    },
    "Term Deposits": {
      data: FullSMSFObj?.["Term Deposits Percent"] || [],
      title: "Term Deposits",
      highlight: ["Value at Year End"],
    },
  };

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
        <h2 className="text-green mt-3 fw-bold">SMSF</h2>
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
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                dropdownRender={(menu) => (
                  <div className="custom-dropdown-scope">{menu}</div>
                )}
              >
                <Button className="inputlikeButton">
                  <Space style={{ width: "100%" }} justify="space-between">
                    {values.category || "Select Report Type"}
                    <FaAngleDown />
                  </Space>
                </Button>
              </Dropdown>
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

export default SMSFReport;
