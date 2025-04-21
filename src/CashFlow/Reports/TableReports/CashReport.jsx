import { Table, Tooltip } from "antd";
import { Field } from "formik";
import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import {
  openNotificationSuccess,
  RenderName,
} from "../../../Components/Assets/Api/Api";

const CashReport = (props) => {
  let {
    showFilters,
    setShowFilters,
    fullTableCashFlow,
    clientData,
    assetsTestPensionAllowance,
    incomeTestPensionsAllowances,
    allowance,
    clientIncome,
    // partnerIncome,
    clientPayment,
    // partnerPayment,
    familyTaxBenefitPartA,
    values,
    setFieldValue,
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
          sorter: (a, b) =>
            a[`year${year}`]?.replace(/[^0-9.-]+/g, "") -
            b[`year${year}`]?.replace(/[^0-9.-]+/g, ""),
          render: (_, row) => (row.isHeader ? { props: { colSpan: 0 } } : _),
        };
      }

      return {
        title: String(year) + " (" + (currentYear + i) + ")",
        dataIndex: `year${year}`,
        key: String(year),
        sorter: (a, b) =>
          a[`year${year}`]?.replace(/[^0-9.-]+/g, "") -
          b[`year${year}`]?.replace(/[^0-9.-]+/g, ""),
        render: (_, row) => (row.isHeader ? { props: { colSpan: 0 } } : _),
      };
    }),
  ]);

  const applyFilter = (values) => {
    if (values.yearFrom !== "" && values.yearTo !== "") {
      const yearFrom = parseInt(values.yearFrom, 10);
      const yearTo = parseInt(values.yearTo, 10);
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
              sorter: (a, b) =>
                (a[`year${year}`]?.replace?.(/[^0-9.-]+/g, "") || 0) -
                (b[`year${year}`]?.replace?.(/[^0-9.-]+/g, "") || 0),
            });
          } else {
            dynamicYearColumns.push({
              title: year.toString() + " (" + (currentYear + year) + ")",
              dataIndex: `year${year}`, // You may need to match this with your data source
              key: year.toString(),
              sorter: (a, b) =>
                (a[`year${year}`]?.replace?.(/[^0-9.-]+/g, "") || 0) -
                (b[`year${year}`]?.replace?.(/[^0-9.-]+/g, "") || 0),
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

  return (
    <React.Fragment>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <h2 className="text-green mt-3 fw-bold">Cash Flow</h2>
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
          <Row gutter={16}>
            <Col md={3}>
              <label htmlFor="category">Category:</label>
              <Field
                as="select"
                name="category"
                className="form-select inputDesignDoubleInput"
              >
                <option value="">Select</option>
                <option value="Cashflow">Cashflow</option>
                <option value="Client Tax">Client Tax</option>
                <option value="Partner Tax">Partner Tax</option>
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
                  setFieldValue("yearTo", newYearFrom + 5); // update yearTo
                }}
              >
                <option value="">Select</option>
                {Array.from({ length: 30 }, (_, i) => (
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
              >
                <option value="">Select</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = parseInt(values.yearFrom || "1") + i;
                  if (year <= 30)
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                })}
              </Field>
            </Col>
            <Col md={3}>
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
            <h4 className="text-green fw-bold">
              {RenderName(
                values.category === "Client Tax" ? "client" : "partner"
              )}
              's Tax Position
            </h4>

            <Table
              dataSource={clientData} // 👈 Removes the last row from the table
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
            <h3 className="text-green fw-bold">Centrelink Summary</h3>
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
              dataSource={clientIncome.slice(0, -1)} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
              summary={() => {
                if (clientIncome.length > 0) {
                  const totalRowClientIncome =
                    clientIncome[clientIncome.length - 1]; // 👈 Get the last row as footer
                  return (
                    <Table.Summary.Row>
                      {columns.map((col, index) => (
                        <Table.Summary.Cell key={index} index={index}>
                          {totalRowClientIncome[col.dataIndex]}
                        </Table.Summary.Cell>
                      ))}
                    </Table.Summary.Row>
                  );
                }
              }}
            />
          </div>
          <div className="mt-4 porsition-relative">
            <h4 className="text-green fw-bold">Partner Income </h4>

            <Table
              dataSource={clientIncome.slice(0, -1)} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
              summary={() => {
                const totalRowClientIncome =
                  clientIncome[clientIncome.length - 1]; // 👈 Get the last row as footer
                return (
                  <Table.Summary.Row>
                    {columns.map((col, index) => (
                      <Table.Summary.Cell key={index} index={index}>
                        {totalRowClientIncome[col.dataIndex]}
                      </Table.Summary.Cell>
                    ))}
                  </Table.Summary.Row>
                );
              }}
            />
          </div>
          <div className="mt-4 porsition-relative">
            <h4 className="text-green fw-bold">Client Payment</h4>

            <Table
              dataSource={clientPayment.slice(0, -1)} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
              summary={() => {
                const totalRowClientPayment =
                  clientPayment[clientPayment.length - 1]; // 👈 Get the last row as footer
                return (
                  <Table.Summary.Row>
                    {columns.map((col, index) => (
                      <Table.Summary.Cell key={index} index={index}>
                        {totalRowClientPayment[col.dataIndex]}
                      </Table.Summary.Cell>
                    ))}
                  </Table.Summary.Row>
                );
              }}
            />
          </div>
          <div className="mt-4 porsition-relative">
            <h4 className="text-green fw-bold">Partner Payment</h4>

            <Table
              dataSource={clientPayment.slice(0, -1)} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
              summary={() => {
                const totalRowClientPayment =
                  clientPayment[clientPayment.length - 1]; // 👈 Get the last row as footer
                return (
                  <Table.Summary.Row>
                    {columns.map((col, index) => (
                      <Table.Summary.Cell key={index} index={index}>
                        {totalRowClientPayment[col.dataIndex]}
                      </Table.Summary.Cell>
                    ))}
                  </Table.Summary.Row>
                );
              }}
            />
          </div>
        </>
      )}

      {values.category === "Family Tax Benefits" && (
        <>
          <div className="mt-4 porsition-relative">
            <h3 className="text-green fw-bold">Family Tax Benefits</h3>
            <h4 className="text-green fw-bold">Family Tax Benefit- Part A </h4>

            <Table
              dataSource={familyTaxBenefitPartA.slice(0, -1)} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
              summary={() => {
                const totalRowFamilyTaxBenefitPartA =
                  familyTaxBenefitPartA[familyTaxBenefitPartA.length - 1]; // 👈 Get the last row as footer
                return (
                  <Table.Summary.Row>
                    {columns.map((col, index) => (
                      <Table.Summary.Cell key={index} index={index}>
                        {totalRowFamilyTaxBenefitPartA[col.dataIndex]}
                      </Table.Summary.Cell>
                    ))}
                  </Table.Summary.Row>
                );
              }}
            />
          </div>
          <div className="mt-3 porsition-relative">
            <h4 className="text-green fw-bold">Family Tax Benefit- Part B </h4>

            <Table
              dataSource={familyTaxBenefitPartA.slice(0, -1)} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              rowClassName={(record) =>
                record.rowGreen === "true" ? "green-summary-row" : ""
              }
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
              summary={() => {
                const totalRowFamilyTaxBenefitPartA =
                  familyTaxBenefitPartA[familyTaxBenefitPartA.length - 1]; // 👈 Get the last row as footer
                return (
                  <Table.Summary.Row>
                    {columns.map((col, index) => (
                      <Table.Summary.Cell key={index} index={index}>
                        {totalRowFamilyTaxBenefitPartA[col.dataIndex]}
                      </Table.Summary.Cell>
                    ))}
                  </Table.Summary.Row>
                );
              }}
            />
            {/* Total Family tax Benefits (Part A & B) we Havent added this row dont forget to add it in final version */}
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default CashReport;
