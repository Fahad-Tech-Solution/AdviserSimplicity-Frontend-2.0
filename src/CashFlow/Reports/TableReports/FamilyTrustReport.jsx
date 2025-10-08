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
import ModalComponent from "../../../Components/Questions/FinancialInvestments/ModalComponent";
import FunnalPopups from "./FunnalPopups";

const FamilyTrustReport = ({
  showFilters,
  setShowFilters,
  FullFamilyTrustObj,
  values,
  setFieldValue,
  handleChange,
}) => {
  const [currentYear] = useState(new Date().getFullYear());
  const [ArrayOfPopupIcons] = useState(["Value at Year End "]);
  let PopUpsArray = [
    "Direct Shares",
    "Managed Funds",
    "Other",
    "Cash",
    "Term Deposits",
  ];

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  const PopUpCategoryData = {
    "Direct Shares": {
      data: FullFamilyTrustObj?.["Direct Shares Percent"] || [],
      title: "Direct Shares",
      highlight: ["Value at Year End"],
    },
    "Managed Funds": {
      data: FullFamilyTrustObj?.["Managed Funds Percent"] || [],
      title: "Managed Funds",
      highlight: ["Value at Year End"],
    },
    Other: {
      data: FullFamilyTrustObj?.["Other Percent"] || [],
      title: "Other",
      highlight: ["Value at Year End"],
    },
    Cash: {
      data: FullFamilyTrustObj?.["Cash Percent"] || [],
      title: "Cash",
      highlight: ["Value at Year End"],
    },
    "Term Deposits": {
      data: FullFamilyTrustObj?.["Term Deposits Percent"] || [],
      title: "Term Deposits",
      highlight: ["Value at Year End"],
    },
  };

  const [columns, setColumns] = useState(
    generateReportColumns({
      startYear: values.yearFrom || 1,
      endYear: values.yearTo || 6,
    })
  );

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

        if (PopUpsArray.includes(key)) {
          setColumns(
            generateReportColumns({
              startYear: 1,
              endYear: 6,
              showInfoIcon: true,
              onInfoClick: (row, title) => {
                openModal(
                  PopUpCategoryData[key],
                  title,
                  key,
                  values.reportOwner
                );
              },
              onInfoIconsArray: ArrayOfPopupIcons,
            })
          );
        } else if (key === "Balance Sheets") {
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

        setFieldValue("yearFrom", 1);
        setFieldValue("yearTo", 6);
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
    "Direct Shares": {
      data: FullFamilyTrustObj?.["Direct Shares"] || [],
      title: "Direct Shares",
      highlight: ["Value at Year End"],
    },
    "Managed Funds": {
      data: FullFamilyTrustObj?.["Managed Funds"] || [],
      title: "Managed Funds",
      highlight: ["Value at Year End"],
    },
    Other: {
      data: FullFamilyTrustObj?.["Other"] || [],
      title: "Other",
      highlight: ["Value at Year End"],
    },
    Cash: {
      data: FullFamilyTrustObj?.["Cash"] || [],
      title: "Cash",
      highlight: ["Value at Year End"],
    },
    "Term Deposits": {
      data: FullFamilyTrustObj?.["Term Deposits"] || [],
      title: "Term Deposits",
      highlight: ["Value at Year End"],
    },
    "Investment Loans": {
      data: FullFamilyTrustObj?.["Investment Loans"] || [],
      title: "Investment Loans",
      highlight: ["Year End Loan Balance"],
    },
    ...Array.from({ length: 10 }).reduce((acc, _, i) => {
      const label = `Trust Property ${i + 1}`;
      acc[label] = {
        data: FullFamilyTrustObj?.[label] || [],
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
        if (PopUpsArray.includes(values.category)) {
          setColumns(
            generateReportColumns({
              startYear: yearFrom,
              endYear: yearTo,
              showInfoIcon: true,
              onInfoClick: (row, title) => {
                openModal(
                  PopUpCategoryData[values.category],
                  title,
                  values.category,
                  values.reportOwner
                );
              },
              onInfoIconsArray: ArrayOfPopupIcons,
            })
          );
        } else if (values.category == "Balance Sheets") {
          setColumns(
            generateReportColumns({
              startYear: yearFrom,
              endYear: yearTo,
              currentYear,
              withExisting: true,
            })
          );
        } else {
          setColumns(
            generateReportColumns({
              startYear: yearFrom,
              endYear: yearTo,
            })
          );
        }
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

  const openModal = (item, type, key, reportOwner) => {
 

    let matchedItem = { children: item.data } || {
      children: [],
    };

    // console.log(item, type, key, matchedItem, "reportOwner = " + reportOwner);

    setModalObject({
      title: key,
      small: true,
      item: {
        popupArray: matchedItem?.children || [],
      },
      Style2: true,
    });

    setFlagState(true);
  };

  return (
    <>
      <ModalComponent
        modalObject={modalObject}
        setFlagState={setFlagState}
        flagState={flagState}
      >
        <FunnalPopups />
      </ModalComponent>

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
