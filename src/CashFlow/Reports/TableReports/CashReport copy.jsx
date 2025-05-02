import { Table, Tooltip } from "antd";
import { Field } from "formik";
import React, { useEffect, useState } from "react";
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
      title: (
        <>
          <div className="w-100 ">Financial Year Ending 30 June </div>
          <div className="w-100 ">Year</div>
        </>
      ),
      dataIndex: "type",
      key: "type",
      width: 253, // 👈 Set fixed width
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
          title: (
            <>
              <div className="w-100 text-center ">{currentYear + i}</div>
              <div className="w-100 text-center ">{year}</div>
            </>
          ),
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
        title: (
          <>
            <div className="w-100 text-center ">{currentYear + i}</div>
            <div className="w-100 text-center ">{year}</div>
          </>
        ),
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
              title: (
                <>
                  <div className="w-100 text-center ">{currentYear + year}</div>
                  <div className="w-100 text-center ">{year}</div>
                </>
              ),
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
              title: (
                <>
                  <div className="w-100 text-center ">{currentYear + year}</div>
                  <div className="w-100 text-center ">{year}</div>
                </>
              ),
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
            title: (
              <>
                <div className="w-100 ">Financial Year Ending 30 June </div>
                <div className="w-100 ">Year</div>
              </>
            ),
            dataIndex: "type",
            key: "type",
            width: 253, // 👈 Set fixed width
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
      <div className="d-flex flex-row justify-content-between align-items-center d-none">
        <h2 className="text-green mt-3 fw-bold">
          Cash Flow&nbsp;{" "}
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
        <Card className="my-4 shadow-sm p-3 rounded ">
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
              // size="small"

              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
              rowClassName={(record, index) => {
                let arrayOfGreenRows = [
                  "Total Inflows",
                  "Total Outflows",
                  "Surplus/Deficit",
                ];
                // Change this condition to your requirement
                if (arrayOfGreenRows.includes(record.type)) {
                  return "highlight-green-row";
                }
                return "";
              }}
              title={() => (
                <>
                  <div
                    style={{
                      background: "#36b446",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                      padding: "10px",
                      borderBottom: "1px solid white",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <h4 className=" ms-2 mt-3 fw-bold">Cash Flow</h4>
                      <span
                        role="button"
                        className="me-3"
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        {!showFilters ? <FaMagnifyingGlass /> : <FaXmark />}
                      </span>
                    </div>
                  </div>
                </>
              )}
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
              rowClassName={(record, index) => {
                let arrayOfGreenRows = [
                  "Total Assessable income",
                  "Total Allowable Deductions",
                  "Total Taxable Income",
                  "Total Tax payable",
                  "Total Rebates",
                  "Total Tax payable",
                ];
                // Change this condition to your requirement
                if (arrayOfGreenRows.includes(record.type)) {
                  return "highlight-green-row";
                }
                return "";
              }}
              title={() => (
                <>
                  <div
                    style={{
                      background: "#36b446",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                      padding: "10px",
                      borderBottom: "1px solid white",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <h4 className=" ms-2 mt-3 fw-bold">
                        {RenderName(
                          values.category === "Partner Tax"
                            ? "partner"
                            : "client"
                        )}
                        's Tax Position
                      </h4>
                      <span
                        role="button"
                        className="me-3"
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        {!showFilters ? <FaMagnifyingGlass /> : <FaXmark />}
                      </span>
                    </div>
                  </div>
                </>
              )}
            />
          </div>
        </>
      )}

      {values.category === "Centrelink" && (
        <>
          <div className="mt-4 porsition-relative">
            <Table
              dataSource={assetsTestPensionAllowance} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
              rowClassName={(record, index) => {
                let arrayOfGreenRows = ["Total Assets","Total Income","Total Income"];
                // Change this condition to your requirement
                if (arrayOfGreenRows.includes(record.type)) {
                  return "highlight-green-row";
                }
                return "";
              }}
              title={() => (
                <>
                  <div
                    style={{
                      background: "#36b446",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                      padding: "10px",
                      borderBottom: "1px solid white",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <h4 className=" ms-2 mt-3 fw-bold">
                        Centrelink Summary
                        <span className=" fw-bold fs-5">
                          (Assets Test-Pension/Allowance)
                        </span>
                      </h4>
                      <span
                        role="button"
                        className="me-3"
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        {!showFilters ? <FaMagnifyingGlass /> : <FaXmark />}
                      </span>
                    </div>
                  </div>
                </>
              )}
            />
          </div>
          <div className="mt-4 porsition-relative">
            <Table
              dataSource={incomeTestPensionsAllowances} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
              title={() => (
                <>
                  <div
                    style={{
                      background: "#36b446",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                      padding: "10px",
                      borderBottom: "1px solid white",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <h4 className=" ms-2 mt-3 fw-bold">
                        Centrelink Summary
                        <span className=" fw-bold fs-5">
                          (Income Test- Pensions/Allowances)
                        </span>
                      </h4>
                      <span
                        role="button"
                        className="me-3"
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        {!showFilters ? <FaMagnifyingGlass /> : <FaXmark />}
                      </span>
                    </div>
                  </div>
                </>
              )}
            />
          </div>
          <div className="mt-4 porsition-relative">
            <Table
              dataSource={allowance} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
              title={() => (
                <>
                  <div
                    style={{
                      background: "#36b446",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                      padding: "10px",
                      borderBottom: "1px solid white",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <h4 className=" ms-2 mt-3 fw-bold">
                        Centrelink Summary
                        <span className=" fw-bold fs-5">(Allowance)</span>
                      </h4>
                      <span
                        role="button"
                        className="me-3"
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        {!showFilters ? <FaMagnifyingGlass /> : <FaXmark />}
                      </span>
                    </div>
                  </div>
                </>
              )}
            />
          </div>
          <div className="mt-4 porsition-relative">
            <Table
              dataSource={clientIncome} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
              title={() => (
                <>
                  <div
                    style={{
                      background: "#36b446",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                      padding: "10px",
                      borderBottom: "1px solid white",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <h4 className=" ms-2 mt-3 fw-bold">
                        Centrelink Summary
                        <span className=" fw-bold fs-5">
                          ({RenderName("client")} Income)
                        </span>
                      </h4>
                      <span
                        role="button"
                        className="me-3"
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        {!showFilters ? <FaMagnifyingGlass /> : <FaXmark />}
                      </span>
                    </div>
                  </div>
                </>
              )}
            />
          </div>
          <div className="mt-4 porsition-relative">
            <Table
              dataSource={partnerIncome} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
              title={() => (
                <>
                  <div
                    style={{
                      background: "#36b446",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                      padding: "10px",
                      borderBottom: "1px solid white",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <h4 className=" ms-2 mt-3 fw-bold">
                        Centrelink Summary
                        <span className=" fw-bold fs-5">
                          ({RenderName("partner")} Income)
                        </span>
                      </h4>
                      <span
                        role="button"
                        className="me-3"
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        {!showFilters ? <FaMagnifyingGlass /> : <FaXmark />}
                      </span>
                    </div>
                  </div>
                </>
              )}
            />
          </div>
          <div className="mt-4 porsition-relative">
            <Table
              dataSource={clientPayment} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
              title={() => (
                <>
                  <div
                    style={{
                      background: "#36b446",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                      padding: "10px",
                      borderBottom: "1px solid white",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <h4 className=" ms-2 mt-3 fw-bold">
                        Centrelink Summary
                        <span className=" fw-bold fs-5">
                          ({RenderName("client")} Payment)
                        </span>
                      </h4>
                      <span
                        role="button"
                        className="me-3"
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        {!showFilters ? <FaMagnifyingGlass /> : <FaXmark />}
                      </span>
                    </div>
                  </div>
                </>
              )}
            />
          </div>
          <div className="mt-4 porsition-relative">
            <Table
              dataSource={partnerPayment} // 👈 Removes the last row from the table
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 50,
                position: ["bottomRight"],
                className: "custom-pagination",
              }}
              title={() => (
                <>
                  <div
                    style={{
                      background: "#36b446",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                      padding: "10px",
                      borderBottom: "1px solid white",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <h4 className=" ms-2 mt-3 fw-bold">
                        Centrelink Summary
                        <span className=" fw-bold fs-5">
                          ({RenderName("partner")} Payment)
                        </span>
                      </h4>
                      <span
                        role="button"
                        className="me-3"
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        {!showFilters ? <FaMagnifyingGlass /> : <FaXmark />}
                      </span>
                    </div>
                  </div>
                </>
              )}
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
              title={() => (
                <>
                  <div
                    style={{
                      background: "#36b446",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                      padding: "10px",
                      borderBottom: "1px solid white",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <h4 className=" ms-2 mt-3 fw-bold">
                        Family Tax Benefits
                      </h4>
                      <span
                        role="button"
                        className="me-3"
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        {!showFilters ? <FaMagnifyingGlass /> : <FaXmark />}
                      </span>
                    </div>
                  </div>
                </>
              )}
            />
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default CashReport;
