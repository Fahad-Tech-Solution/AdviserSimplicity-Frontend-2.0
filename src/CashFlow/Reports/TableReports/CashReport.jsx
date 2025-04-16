import { Table } from "antd";
import { Field } from "formik";
import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";

const CashReport = (props) => {
  let {
    showFilters,
    setShowFilters,
    columns,
    inflow,
    outFlow,
    surplus,
    applyFilter,
    values,
    setFieldValue,
  } = props;
  return (
    <React.Fragment>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <h2 className="text-green mt-3 fw-bold">
          Cash Flow
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
      <div className="mt-4 porsition-relative">
        <h4 className="text-green fw-bold">Inflows</h4>

        <Table
          dataSource={inflow}
          columns={columns}
          scroll={{ x: "max-content" }}
          pagination={{
            pageSize: 50,
            position: ["bottomRight"],
            className: "custom-pagination",
          }}
        />
      </div>
      <div className="mt-2 porsition-relative table-responcive">
        <h4 className="text-green fw-bold">Outflows</h4>
        <Table
          dataSource={outFlow}
          columns={columns}
          scroll={{ x: "max-content" }}
          pagination={{
            pageSize: 50,
            position: ["bottomRight"],
            className: "custom-pagination",
          }}
        />
      </div>
      <div className="mt-2 porsition-relative table-responcive">
        <h4 className="text-green fw-bold">Surplus/Deficit </h4>
        <Table
          dataSource={surplus}
          bordered={false}
          columns={columns}
          scroll={{ x: "max-content" }}
          pagination={{
            pageSize: 50,
            position: ["bottomRight"],
            className: "custom-pagination",
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default CashReport;
