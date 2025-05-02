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
    const yearFrom = parseInt(currentInput?.value || values.yearFrom, 10);
    const yearTo = parseInt(values.yearTo || yearFrom + 5, 10);

    if (isNaN(yearFrom) || isNaN(yearTo) || yearFrom > yearTo) {
      return openNotificationSuccess(
        "error",
        "topRight",
        "Error",
        "Invalid year range"
      );
    }

    setColumns(generateReportColumns(yearFrom, yearTo, currentYear));
  };

  useEffect(() => {
    setFieldValue("category", "Cashflow");
  }, []);

  const categoryTables = {
    Cashflow: {
      data: fullTableCashFlow,
      title: "Cash Flow",
      highlight: ["Total Inflows", "Total Outflows", "Surplus/Deficit"],
    },
    "Client Tax": {
      data: clientData,
      title: `${RenderName("client")}'s Tax Position`,
      highlight: [
        "Total Assessable income",
        "Total Allowable Deductions",
        "Total Taxable Income",
        "Total Tax payable",
        "Total Rebates",
      ],
    },
    "Partner Tax": {
      data: partnerData,
      title: `${RenderName("partner")}'s Tax Position`,
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
        data: centrelinkCombined,
        title: "Centrelink Summary",
        highlight: [
          "Total Assets",
          "Total Income",
          "Total Adjusted Family Income",
          "Total FTB- Part A (including Supplement)",
          "Total Income For Primary Income Earner",
          "Total Income For Secondary Income Earner",
          "Total FTB- Part B (including Supplement)",
          "Total Family tax Benefits (Part A & B)",
        ],
      },
    ],
    "Family Tax Benefits": {
      data: familyTaxBenefit,
      title: "Family Tax Benefits",
    },
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-green mt-3 fw-bold">Income and Expance</h2>
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
                  setFieldValue("yearFrom", parseInt(e.target.value));
                  setFieldValue(
                    "yearTo",
                    Math.min(10, parseInt(e.target.value) + 5)
                  );
                  applyFilter(values, e.target);
                }}
              >
                <option value="">Select</option>
                {[...Array(10)].map((_, i) => (
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
                onChange={(e) => {
                  handleChange(e);
                  const newYearTo = parseInt(e.target.value, 10);
                  setFieldValue("yearFrom", Math.max(1, newYearTo - 5));
                  applyFilter(values, e.target);
                }}
              >
                <option value="">Select</option>
                {[...Array(30)].map((_, i) => {
                  const y = i + 1;
                  if (!values.yearFrom || y >= values.yearFrom) {
                    return (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    );
                  }
                  return null;
                })}
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
