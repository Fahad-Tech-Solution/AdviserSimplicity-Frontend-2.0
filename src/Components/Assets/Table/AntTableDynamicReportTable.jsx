import { Table } from "antd";
import React from "react";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";

const AntTableDynamicReportTable = ({
  title,
  dataSource,
  columns,
  showFilters,
  setShowFilters,
  highlightTypes = [],
  pagination,
  customPagination = {},
}) => (
  <div className="mt-4 porsition-relative">
    <Table
      dataSource={dataSource}
      columns={columns}
      scroll={{ x: "max-content" }}
      pagination={
        pagination === false
          ? false
          : Object.keys(customPagination).length > 0
          ? customPagination
          : {
              pageSize: 50,
              position: ["bottomRight"],
              className: "custom-pagination",
            }
      }
      rowClassName={(record) =>
        highlightTypes.includes(record.type) ? "highlight-green-row" : ""
      }
      title={() =>
        title && (
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
              <h4 className="ms-2 mt-3 fw-bold">{title}</h4>
              <span
                role="button"
                className="me-3"
                onClick={() => setShowFilters(!showFilters)}
              >
                {!showFilters ? <FaMagnifyingGlass /> : <FaXmark />}
              </span>
            </div>
          </div>
        )
      }
    />
  </div>
);

export default AntTableDynamicReportTable;
