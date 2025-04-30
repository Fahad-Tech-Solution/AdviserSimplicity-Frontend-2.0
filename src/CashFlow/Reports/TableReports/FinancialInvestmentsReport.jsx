import { Table, Tooltip } from "antd";
import { Field } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import {
  openNotificationSuccess,
  RenderName,
} from "../../../Components/Assets/Api/Api";

const FinancialInvestmentsReport = (props) => {
  let {
    showFilters,
    setShowFilters,
    fullTableCashFlow,
    clientData,
    partnerData,
    assetsTestPensionAllowance,
    incomeTestPensionsAllowances,
    allowance,
    clientIncome,
    partnerIncome,
    clientPayment,
    partnerPayment,
    familyTaxBenefit,
    values,
    setFieldValue,
    handleChange,
  } = props;

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [columns, setColumn] = useState([
    {
      title: "Year",
      dataIndex: "type",
      key: "type",
      width: 250, // 👈 Set fixed width
      fixed: "left", // 👈 Fix column to the left
      render: (text, record) => {
        const isParentRow = record.children && Array.isArray(record.children);
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
    ...[1, 2, 3, 4, 5, 6].map((year, i) => {
      if (year === 6) {
        return {
          title: String(year) + " (" + (currentYear + i) + ")",
          dataIndex: `year${year}`,
          key: String(year),
          align: "left",
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
                }}
              >
                {text}
              </div>
            );
          },
        };
      }
      return {
        title: String(year) + " (" + (currentYear + i) + ")",
        dataIndex: `year${year}`,
        key: String(year),
        render: (text, record) => {
          const isParentRow = record.children && Array.isArray(record.children);

          return (
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
          );
        },
      };
    }),
  ]);

  const applyFilter = (values, currentInput) => {
    if (values.yearFrom !== "" && values.yearTo !== "") {
      const yearFrom =
        currentInput.name === "yearFrom"
          ? parseInt(currentInput.value, 10)
          : currentInput.name === "yearTo"
          ? parseInt(currentInput.value, 10) - 5 < 1
            ? 1
            : parseInt(currentInput.value, 10) - 5
          : parseInt(values.yearFrom, 10);

      const yearTo =
        currentInput.name === "yearFrom"
          ? parseInt(currentInput.value, 10) + 5 > 10 && currentInput.value < 10
            ? 10
            : parseInt(currentInput.value, 10) + 5
          : currentInput.name === "yearTo"
          ? parseInt(currentInput.value, 10)
          : parseInt(values.yearTo, 10);
      // let currentYearWithFilter = currentYear + yearFrom;

      if (!isNaN(yearFrom) && !isNaN(yearTo) && yearFrom <= yearTo) {
        const dynamicYearColumns = [];

        for (let year = yearFrom; year <= yearTo; year++) {
          if (year === yearTo) {
            dynamicYearColumns.push({
              title: year.toString() + " (" + (currentYear + year) + ")",
              dataIndex: `year${year}`, // You may need to match this with your data source
              key: year.toString(),
              align: "left",
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
                    }}
                  >
                    {text}
                  </div>
                );
              },
            });
          } else {
            dynamicYearColumns.push({
              title: year.toString() + " (" + (currentYear + year) + ")",
              dataIndex: `year${year}`, // You may need to match this with your data source
              key: year.toString(),
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
                    }}
                  >
                    {text}
                  </div>
                );
              },
            });
          }
        }

        // Combine the fixed left column with the dynamic years
        const updatedColumns = [
          {
            title: "Year",
            dataIndex: "type",
            key: "type",
            width: 250, // 👈 Set fixed width
            fixed: "left", // 👈 Fix column to the left
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

  useEffect(() => {
    setFieldValue("category", "Cashflow"); // Set default value for category
  }, []);

  return (
    <React.Fragment>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <h2 className="text-green mt-3 fw-bold">
          Financial Investments &nbsp;{" "}
          {(values.category === "Client Tax" ||
            values.category === "Partner Tax") && (
            <span className="text-green fw-bold fs-5">
              (
              {RenderName(
                values.category === "Client Tax" ? "client" : "partner"
              )}
              's Tax Position)
            </span>
          )}
          {values.category === "Centrelink" && (
            <span className="text-green fw-bold fs-5">
              (Centrelink Summary)
            </span>
          )}
          {values.category === "Family Tax Benefits" && (
            <span className="text-green fw-bold fs-5">
              (Family Tax Benefits)
            </span>
          )}
        </h2>
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
          <Row
            gutter={16}
            className="justify-content-around align-items-center"
          >
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
                  const newYearFrom = parseInt(e.target.value);
                  setFieldValue("yearFrom", newYearFrom); // update yearFrom
                  setFieldValue(
                    "yearTo",
                    parseInt(newYearFrom, 10) + 5 > 10 && newYearFrom < 10
                      ? 10
                      : parseInt(newYearFrom, 10) + 5
                  ); // update yearFrom

                  applyFilter(values, e.target); // apply filter with new yearFrom
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
                  setFieldValue(
                    "yearFrom",
                    parseInt(newYearTo, 10) - 5 < 1
                      ? 1
                      : parseInt(newYearTo, 10) - 5
                  ); // update yearFrom

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
            <Col md={3} className="d-none">
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

      {(values.category === "" || values.category === "Cashflow") && (
        <>
          <div className="mt-4 porsition-relative">
            {/* <h4 className="text-green fw-bold">Cashflow</h4> */}

            <Table
              dataSource={fullTableCashFlow} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
            />
          </div>
        </>
      )}

      {(values.category === "Client Tax" ||
        values.category === "Partner Tax") && (
        <>
          <div className="mt-4 porsition-relative">
            <Table
              dataSource={
                values.category === "Partner Tax" ? partnerData : clientData
              } // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
            />
          </div>
        </>
      )}

      {values.category === "Centrelink" && (
        <>
          <div className="mt-4 porsition-relative">
            <h4 className="text-green fw-bold">
              Assets Test-Pension/Allowance{" "}
            </h4>
            <Table
              dataSource={assetsTestPensionAllowance} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
            />
          </div>
          <div className="mt-4 porsition-relative">
            <h4 className="text-green fw-bold">
              Income Test- Pensions/Allowances{" "}
            </h4>

            <Table
              dataSource={incomeTestPensionsAllowances} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
            />
          </div>
          <div className="mt-4 porsition-relative">
            <h4 className="text-green fw-bold">Allowance </h4>

            <Table
              dataSource={allowance} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
            />
          </div>
          <div className="mt-4 porsition-relative">
            <h4 className="text-green fw-bold">Client Income </h4>

            <Table
              dataSource={clientIncome} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
            />
          </div>
          <div className="mt-4 porsition-relative">
            <h4 className="text-green fw-bold">Partner Income </h4>
            <Table
              dataSource={partnerIncome} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
            />
          </div>
          <div className="mt-4 porsition-relative">
            <h4 className="text-green fw-bold">Client Payment</h4>

            <Table
              dataSource={clientPayment} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
            />
          </div>
          <div className="mt-4 porsition-relative">
            <h4 className="text-green fw-bold">Partner Payment</h4>

            <Table
              dataSource={partnerPayment} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
            />
          </div>
        </>
      )}

      {values.category === "Family Tax Benefits" && (
        <>
          <div className="mt-4 porsition-relative">
            <Table
              dataSource={familyTaxBenefit} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
            />
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default FinancialInvestmentsReport;
