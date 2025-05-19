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

const FamilyTrustReport = ({
  showFilters,
  setShowFilters,
  FullFamilyTrustObj,
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
          key: "Profit and Loss",
          label: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginLeft: 13,
              }}
            >
              Profit and Loss
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
          label: "Trust Property",
          popupOffset: [10, 0], // 👈 horizontal space between parent and submenu
          children: Array.from({ length: 10 }, (_, i) => ({
            key: `Trust Property ${i + 1}`,
            label: `Trust Property ${i + 1}`,
          })),
        },
      ]}
      onClick={({ key }) => {
        console.log("Selected key:", key);
        setFieldValue("category", key);
        if (key === "Balance Sheets") {
          setColumns(
            generateReportColumns({
              startYear: values.yearFrom || 1,
              endYear: values.yearTo || 6,
              currentYear,
              withExisting: true,
            })
          );
        } else {
          setColumns(
            generateReportColumns({
              startYear: values.yearFrom || 1,
              endYear: values.yearTo || 6,
            })
          );
        }
      }}
    />
  );

  const categoryTables = {
    Cashflow: {
      data: FullFamilyTrustObj?.["Cashflow"] || [],
      title: "Cashflow",
      highlight: ["Total Inflows", "Total Outflows", "Surplus/deficit"],
    },
    "Profit and Loss": {
      data: FullFamilyTrustObj?.["Profit and Loss"] || [],
      title: "Profit and Loss",
      highlight: [
        "Investment Income Received",
        "Total Deductions",
        "Net Income",
        "Total Trust Net Income",
        "Actual Trust Distribution",
      ],
    },
    "Balance Sheets": {
      data: FullFamilyTrustObj?.["Balance Sheets"] || [],
      title: "Balance Sheets",
      highlight: [
        "Total Assets",
        "Total Liabilities",
        "Total Net Trust Assets",
        "Total Beneficay Loans",
        "Difference",
      ],
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
        <h2 className="text-green mt-3 fw-bold">Family Investment Trust</h2>
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

      <div>{renderReportTable(categoryTables)}</div>
    </>
  );
};

export default FamilyTrustReport;
