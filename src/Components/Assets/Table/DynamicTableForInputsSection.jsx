import React, { useState } from "react";
import { Table as BootstrapTable, Button } from "react-bootstrap";
import { Table as AntTable, Typography } from "antd";
import DynamicFormField from "../Dynamic/DynamicFormField";

const DynamicTableForInputsSection = (type = "bootstrap") => {
  

const [editingRow, setEditingRow] = useState(null);

  return function TableHOC({
    columns,
    data,
    values,
    setFieldValue,
    handleChange,
    handleBlur,
  }) {
    
    const renderCell = (record, col) => {
      const value = record[col.dataIndex];

      if (editingRow === record.key) {
        return (
          <DynamicFormField
            fieldType={col?.type || "text"}
            name={col?.dataIndex || ""}
            placeholder={col?.placeholder || ""}
            options={col?.options || []}
            values={values}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleInnerModal={col?.handleInnerModal || (() => {})}
            stakeHolder={record.stakeHolder + "."} // 🔥 row decides (client/partner)
            innerModalTitle={col?.innerModalTitle || ""}
            all={col || {}}
          />
        );
      }

      return value || "--";
    };

    const actionColumn = {
      title: "Action",
      key: "action",
      width: 100,
      fixed: "right",
      align: "center",
      render: (_, record) =>
        editingRow === record.key ? (
          <Typography.Link onClick={() => setEditingRow(null)}>
            Save
          </Typography.Link>
        ) : (
          <Typography.Link onClick={() => setEditingRow(record.key)}>
            Edit
          </Typography.Link>
        ),
    };

    const allColumns = [...columns, actionColumn];

    // ✅ AntD Table
    if (type === "antd") {
      return (
        <AntTable
          columns={allColumns.map((col) => {
            if (col.key === "action" || col.key === "owner") {
              // keep custom render
              return col;
            }
            return {
              ...col,
              width: col.width || 150, // ✅ fallback width if not set
              render: (text, record) => renderCell(record, col),
            };
          })}
          dataSource={data}
          pagination={false}
          rowKey="key"
          scroll={{ x: "max-content" }} // optional: keeps right fixed working well
        />
      );
    }

    // ✅ Bootstrap Table
    if (type === "bootstrap") {
      return (
        <BootstrapTable striped bordered hover responsive>
          <thead>
            <tr>
              {allColumns.map((col) => (
                <th key={col.key}>{col.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((record) => (
              <tr key={record.key}>
                {allColumns.map((col) => (
                  <td key={col.key}>{renderCell(record, col)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </BootstrapTable>
      );
    }

    return null;
  };
};

export default DynamicTableForInputsSection;
