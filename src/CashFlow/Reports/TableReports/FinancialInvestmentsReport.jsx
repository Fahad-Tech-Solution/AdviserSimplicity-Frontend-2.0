import React, { useEffect, useState } from "react";
import { Field } from "formik";
import { Card, Col, Row } from "react-bootstrap";
import {
  FaAngleDown,
  FaAngleUp,
  FaMagnifyingGlass,
  FaXmark,
} from "react-icons/fa6";
import {
  generateReportColumns,
  openNotificationSuccess,
  RenderName,
} from "../../../Components/Assets/Api/Api";
import AntTableDynamicReportTable from "../../../Components/Assets/Table/AntTableDynamicReportTable";
import { Dropdown, Menu, Space, Button, Tooltip } from "antd";
import ModalComponent from "../../../Components/Questions/FinancialInvestments/ModalComponent";
import FunnalPopups from "./FunnalPopups";
import { FaInfoCircle } from "react-icons/fa";

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

  const [directProperty, setDirectProperty] = useState(false);
  const [superPension, setSuperPension] = useState(true);

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  const PopUpCategoryData = {
    Super: {
      data: FullFinansialInvestmentObject?.["SuperPercent1"] || {
        client: [],
        partner: [],
        joint: [],
      },
      title: "Super",
    },
    Pension: {
      data: FullFinansialInvestmentObject?.["PensionPercent1"] || {
        client: [],
        partner: [],
        joint: [],
      },
      title: "Pension",
    },
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: "Investment",
          popupOffset: [10, 0],
          children: [
            { key: "Direct Shares", label: "Direct Shares" },
            { key: "Managed Funds", label: "Managed Funds" },
            { key: "Investment Bonds", label: "Investment Bonds" },
            { key: "Other", label: "Other" },
            { key: "Cash", label: "Cash" },
            { key: "Term Deposits", label: "Term Deposits" },
            { key: "Investment Loans", label: "Investment Loans" },
            { key: "Margin Loans", label: "Margin Loans" },
          ],
        },
        {
          key: "2",
          label: "Direct Property Summary",
          popupOffset: [10, 0], // 👈 horizontal space between parent and submenu
          children: Array.from({ length: 10 }, (_, i) => ({
            key: `Property ${i + 1}`,
            label: `Property ${i + 1}`,
          })),
        },
        {
          key: "3",
          label: "Super Annuation",
          popupOffset: [10, 0],
          children: [
            { key: "Super", label: "Super" },
            { key: "Pension", label: "Pension" },
            { key: "Annuities", label: "Annuities" },
          ],
        },
      ]}
      onClick={({ key }) => {
        let directPropertyOption = Array.from(
          { length: 10 },
          (_, i) => `Property ${i + 1}`
        );
        if (directPropertyOption.includes(key)) {
          setFieldValue("category", key);
          setFieldValue("reportOwner", "client");
          setDirectProperty(true);
        } else if (["Super", "Pension", "Annuities"].includes(key)) {
          setFieldValue("category", key);
          setFieldValue("reportOwner", "client");
          setDirectProperty(false);
          setSuperPension(false);
          // setColumns
        } else {
          setFieldValue("category", key);
          setDirectProperty(false);
          setSuperPension(true);
        }

        if (["Super", "Pension"].includes(key)) {
          setColumns(
            generateReportColumns({
              startYear: 1,
              endYear: 6,
              showInfoIcon: true,
              onInfoClick: (row, index) => {
                openModal(PopUpCategoryData[key], index + 1, key);
              },
              onInfoIconsArray: [
                "Super 1",
                "Super 2",
                "Pension 1",
                "Pension 2",
              ],
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
    "Direct Shares": {
      data: FullFinansialInvestmentObject?.["Direct Shares"] || {
        client: [],
        partner: [],
        joint: [],
      },
      title: "Direct Shares",
      highlight: ["Value at Year End"],
    },
    "Managed Funds": {
      data: FullFinansialInvestmentObject?.["Managed Funds"] || {
        client: [],
        partner: [],
        joint: [],
      },
      title: "Managed Funds",
      highlight: ["Value at Year End"],
    },
    "Investment Bonds": {
      data: FullFinansialInvestmentObject?.["Investment Bonds"] || {
        client: [],
        partner: [],
        joint: [],
      },
      title: "Investment Bonds",
      highlight: ["Value at Year End"],
    },
    Other: {
      data: FullFinansialInvestmentObject?.["Other"] || {
        client: [],
        partner: [],
        joint: [],
      },
      title: "Other",
      highlight: ["Value at Year End"],
    },
    Cash: {
      data: FullFinansialInvestmentObject?.["Cash"] || {
        client: [],
        partner: [],
        joint: [],
      },
      title: "Cash",
      highlight: ["Value at Year End"],
    },
    "Term Deposits": {
      data: FullFinansialInvestmentObject?.["Term Deposits"] || {
        client: [],
        partner: [],
        joint: [],
      },
      title: "Term Deposits",
      highlight: ["Value at Year End"],
    },
    "Investment Loans": {
      data: FullFinansialInvestmentObject?.["Investment Loans"] || {
        client: [],
        partner: [],
        joint: [],
      },
      title: "Investment Loans",
      highlight: ["Value at Year End"],
    },
    "Margin Loans": {
      data: FullFinansialInvestmentObject?.["Margin Loans"] || {
        client: [],
        partner: [],
        joint: [],
      },
      title: "Margin Loans",
      highlight: ["Value at Year End"],
    },
    Super: {
      data: FullFinansialInvestmentObject?.["Super"] || {
        client: [],
        partner: [],
        joint: [],
      },
      title: "Super",
      highlight: ["Opening Balance", "Closing Member Balance"],
    },
    Pension: {
      data: FullFinansialInvestmentObject?.["Pension"] || {
        client: [],
        partner: [],
        joint: [],
      },
      title: "Pension",
      highlight: ["Opening Balance", "Closing Member Balance"],
    },
    Annuities: {
      data: FullFinansialInvestmentObject?.["Annuities"] || {
        client: [],
        partner: [],
        joint: [],
      },
      title: "Annuities",
      highlight: ["Value at Year End"],
    },
    ...Array.from({ length: 10 }).reduce((acc, _, i) => {
      const label = `Property ${i + 1}`;
      acc[label] = {
        data: FullFinansialInvestmentObject?.[label] || { client: [] },
        title: `Net Rental Position (${label})`,
        highlight: ["Total Expenses"],
      };
      return acc;
    }, {}),
  };

  const directPropertyCategoryTable = {
    ...Array.from({ length: 10 }).reduce((acc, _, i) => {
      const label = `Property ${i + 1}`;
      acc[label] = {
        data: FullFinansialInvestmentObject?.["Position" + label] || {
          client: [],
        },
        title: `Equity & Debt Position (Property ${i + 1})`,
        highlight: ["Year End Loan Balance", "Closing Value"],
      };
      return acc;
    }, {}),
  };

  const categoryPercentTables = {
    "Direct Shares": {
      data: FullFinansialInvestmentObject?.["Direct SharesPercent"] || {
        client: [],
        partner: [],
        joint: [],
      },
      title: "Direct Shares",
      highlight: ["Value at Year End"],
    },
    "Managed Funds": {
      data: FullFinansialInvestmentObject?.["Managed FundsPercent"] || {
        client: [],
        partner: [],
        joint: [],
      },
      title: "Managed Funds",
      highlight: ["Value at Year End"],
    },
    "Investment Bonds": {
      data: FullFinansialInvestmentObject?.["Investment BondsPercent"] || {
        client: [],
        partner: [],
        joint: [],
      },
      title: "Investment Bonds",
      highlight: ["Value at Year End"],
    },
    Other: {
      data: FullFinansialInvestmentObject?.["OtherPercent"] || {
        client: [],
        partner: [],
        joint: [],
      },
      title: "Other",
      highlight: ["Value at Year End"],
    },
    Cash: {
      data: FullFinansialInvestmentObject?.["CashPercent"] || {
        client: [],
        partner: [],
        joint: [],
      },
      title: "Cash",
      highlight: ["Value at Year End"],
    },
    "Term Deposits": {
      data: FullFinansialInvestmentObject?.["Term DepositsPercent"] || {
        client: [],
        partner: [],
        joint: [],
      },
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
            render: (text, row, index) => {
              if (row.isHeader) return { props: { colSpan: 0 } };

              const isParentRow = row?.children && Array.isArray(row.children);

              return (
                <Tooltip
                  title={
                    ["Super 1", "Super 2", "Pension 1", "Pension 2"].includes(
                      text
                    )
                      ? "Click on i button to reveal investment details"
                      : text
                  }
                >
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

                    {isParentRow &&
                      ["Super 1", "Super 2", "Pension 1", "Pension 2"].includes(
                        text
                      ) && (
                        <FaInfoCircle
                          className="info-icon"
                          onClick={() =>
                            openModal(PopUpCategoryData[key], index + 1, key)
                          }
                          title="View Details"
                        />
                      )}
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
    setFieldValue("reportOwner", "client");
    setFieldValue("category", "Direct Shares");
  }, [setFieldValue]);

  const renderReportTable = (tables, isPercent = false) => {
    const tableInfo = tables[values.category];
    if (!values.category || !tableInfo) return null;

    const data = tableInfo.data?.[values.reportOwner] || [];
    const highlight = tableInfo.highlight || [];
    const title = !isPercent
      ? `${RenderName(values.reportOwner)}'s ${tableInfo.title}`
      : undefined;

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

  const openModal = (item, index, key) => {
    setModalObject({
      title: key,
      small: true,
      item: {
        popupArray: item.data[values.reportOwner][index - 1].children || [],
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
              <label
                htmlFor="reportOwner"
                onClick={() => {
                  alert(directProperty);
                }}
              >
                Report Owner:
              </label>
              <Field
                as="select"
                name="reportOwner"
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
                <option value="client">{RenderName("client")}'s</option>
                {localStorage.getItem("UserStatus") === "Married" &&
                  directProperty === false && (
                    <>
                      <option value="partner">{RenderName("partner")}'s</option>
                      {superPension && (
                        <option value="joint">{RenderName("joint")}'s</option>
                      )}
                    </>
                  )}
              </Field>
            </Col>
            <Col md={3}>
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

      <div className="mb-5">
        {renderReportTable(categoryPercentTables, true)}
      </div>

      <div>{renderReportTable(categoryTables)}</div>

      {directProperty && (
        <div>{renderReportTable(directPropertyCategoryTable)}</div>
      )}
    </>
  );
};

export default FinancialInvestmentsReport;
