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
import { Tooltip } from "antd";

const BusinessReport = ({
  showFilters,
  setShowFilters,
  FullBusinessObject,
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

  const categoryTables = {
    "Trading Company": {
      data: FullBusinessObject?.["Trading Company"] || [],
      title: "Trading Company",
      highlight: ["Value at Year End"],
    },
    "Business Trust": {
      data: FullBusinessObject?.["Business Trust"] || [],
      title: "Business Trust",
      highlight: ["Value at Year End"],
    },
    "Bucket Company": {
      data: FullBusinessObject?.["Bucket Company"] || [],
      title: "Bucket Company",
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
            width: 253,
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
          ...dynamicYearColumns,
        ];

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
    setFieldValue("category", "Trading Company");
  }, [setFieldValue]);

  const renderReportTable = (tables, isPercent = false) => {
    const tableInfo = tables[values.category];
    if (!values.category || !tableInfo) return null;

    const data = tableInfo.data || [];
    const highlight = tableInfo.highlight || [];
    const title = `${tableInfo.title}`;

    return (
      <AntTableDynamicReportTable
        title={title}
        dataSource={data}
        columns={columns}
        highlightTypes={highlight}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-green mt-3 fw-bold">Business Entities</h2>
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
                <option value={`Trading Company`}>Trading Company</option>
                <option value={`Business Trust`}>Business Trust</option>
                <option value={`Bucket Company`}>Bucket Company</option>
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

      <div>{renderReportTable(categoryTables)}</div>
    </>
  );
};

export default BusinessReport;
