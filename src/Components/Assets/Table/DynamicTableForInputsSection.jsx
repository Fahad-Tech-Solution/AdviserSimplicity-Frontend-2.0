import React, { useState } from "react";
import { Table as BootstrapTable, Button } from "react-bootstrap";
import { Table as AntTable, Typography } from "antd";
import DynamicFormField from "../Dynamic/DynamicFormField";
import { ConvertDate } from "../Api/Api";

const DynamicTableForInputsSection = (type = "bootstrap") => {
  return function TableHOC({
    columns,
    data,
    values,
    setFieldValue,
    handleChange,
    handleBlur,
  }) {
    const [editingRow, setEditingRow] = useState(null);
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
            innerModalTitle={col?.innerModalTitle || ""}
            all={col || {}}
            {...(record?.stakeHolder
              ? { stakeHolder: record.stakeHolder + "." }
              : {})} // 🔥 row decides (client/partner)
          />
        );
      }

      // ✅ When not editing → format based on type
      if (col?.type === "antdate") {
        return value ? ConvertDate(value) : "--";
      }

      if (col?.type === "checkbox") {
        return value ? "Checked" : "Un-Checked";
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
              return {
                ...col,
                width: editingRow ? col.width || 150 : undefined, // ✅ fallback width if not set
              };
            }
            return {
              ...col,
              width: editingRow ? col.width || 150 : undefined, // ✅ fallback width if not set
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
