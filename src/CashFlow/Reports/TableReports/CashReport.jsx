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

const CashReport = ({
  showFilters,
  setShowFilters,
  fullTableCashFlow,
  clientData,
  partnerData,
  centrelinkCombined,
  familyTaxBenefit,
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
            width: 255,
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
    setFieldValue("category", "Cashflow");
  }, []);

  const categoryTables = {
    Cashflow: {
      data: fullTableCashFlow || [],
      title: "Cash Flow",
      highlight: ["Total Inflows", "Total Outflows", "Surplus/Deficit"],
    },
    "Client Tax": {
      data: clientData || [],
      title: `${RenderName?.("client") || "Client"}'s Tax Position`,
      highlight: [
        "Total Assessable income",
        "Total Allowable Deductions",
        "Total Taxable Income",
        "Total Tax payable",
        "Total Rebates",
      ],
    },
    "Partner Tax": {
      data: partnerData || [],
      title: `${RenderName?.("partner") || "Partner"}'s Tax Position`,
      highlight: [
        "Total Assessable income",
        "Total Allowable Deductions",
        "Total Taxable Income",
        "Total Tax payable",
        "Total Rebates",
      ],
    },
    Centrelink: [
      {
        data: centrelinkCombined || [],
        title: "Centrelink Summary",
        highlight: [
          "Total Assets",
          "Total Income",
          "Actual Payment",
          "Payment Amount",
          "Under Income Test",
        ],
      },
    ],
    "Family Tax Benefits": {
      data: familyTaxBenefit || [],
      title: "Family Tax Benefits",
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

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-green mt-3 fw-bold">Income and Expenses</h2>
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
                <option value="Cashflow">Cashflow</option>
                <option value="Client Tax">{RenderName("client")}'s Tax</option>
                {localStorage.getItem("UserStatus") === "Married" && (
                  <option value="Partner Tax">
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

      {/* Render the correct table(s) */}
      {Array.isArray(categoryTables[values.category])
        ? categoryTables[values.category].map((table, idx) => (
            <AntTableDynamicReportTable
              key={idx}
              title={table.title}
              dataSource={table.data}
              columns={columns}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              highlightTypes={table.highlight || []}
            />
          ))
        : values.category &&
          categoryTables[values.category] && (
            <AntTableDynamicReportTable
              title={categoryTables[values.category].title}
              dataSource={categoryTables[values.category].data}
              columns={columns}
              highlightTypes={categoryTables[values.category].highlight || []}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />
          )}
    </>
  );
};

export default CashReport;
