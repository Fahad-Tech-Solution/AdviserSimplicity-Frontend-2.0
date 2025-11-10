// import React, { useState } from "react";
// import { Table as BootstrapTable, Button } from "react-bootstrap";
// import { Table as AntTable, Typography } from "antd";
// import DynamicFormField from "../Dynamic/DynamicFormField";
// import { ConvertDate } from "../Api/Api";

// const DynamicTableForInputsSection = (type = "bootstrap") => {
//   return function TableHOC({
//     columns,
//     data,
//     values,
//     setFieldValue,
//     handleChange,
//     handleBlur,
//     pagination = false,
//     handleSubmit = () => {},
//     isEditing = false,
//     setIsEditing = () => {},
//   }) {
//     // 🔥 global edit mode instead of per-row editing
//     // const {isEditing, setIsEditing} = useState(false);

//     const renderCell = (record, col) => {
//       const value = record[col.dataIndex];

//       // ✅ When global edit mode is ON
//       if (isEditing) {
//         return (
//           <DynamicFormField
//             fieldType={col?.type || "text"}
//             name={col?.dataIndex || ""}
//             placeholder={col?.placeholder || ""}
//             options={col?.options || []}
//             values={values}
//             setFieldValue={setFieldValue}
//             handleChange={handleChange}
//             handleBlur={handleBlur}
//             handleInnerModal={
//               col?.handleInnerModal ||
//               (() => {
//                 console.log("No function defined");
//               })
//             }
//             innerModalTitle={
//               record?.innerModalTitle || col?.innerModalTitle || ""
//             }
//             all={col || {}}
//             {...(record?.stakeHolder
//               ? { stakeHolder: record.stakeHolder + "." }
//               : {})}
//           />
//         );
//       }

//       // ✅ When not editing → format value for display
//       if (col?.type === "antdate") return value ? ConvertDate(value) : "--";
//       if (col?.type === "checkbox") return value ? "Checked" : "Un-Checked";
//       if (col?.type === "select-multi-antd")
//         return Array.isArray(value) ? value.join(", ") : value || "";
//       if (
//         (col?.type === "yesnoModal" && value === "Yes") ||
//         col?.type === "modal"
//       ) {
//         return (
//           <div className="d-flex align-items-center justify-content-left gap-3">
//             {value}
//             <DynamicFormField
//               fieldType="modal"
//               name={col?.dataIndex || ""}
//               placeholder={col?.placeholder || ""}
//               options={col?.options || []}
//               values={values}
//               setFieldValue={setFieldValue}
//               handleChange={handleChange}
//               handleBlur={handleBlur}
//               handleInnerModal={
//                 col?.func ||
//                 col?.handleInnerModal ||
//                 (() => {
//                   console.log("No function defined");
//                 })
//               }
//               innerModalTitle={
//                 record?.innerModalTitle || col?.innerModalTitle || ""
//               }
//               all={col || {}}
//               {...(record?.stakeHolder
//                 ? { stakeHolder: record.stakeHolder + "." }
//                 : {})}
//             />
//           </div>
//         );
//       }
//       if (col?.selectedOptionValue) {
//         const selectedOption = col?.options?.find(
//           (item) => item.value == value
//         );
//         return selectedOption ? selectedOption.label : value || "--";
//       }

//       return value || "--";
//     };

//     // ✅ Global action column (only one cell)
//     const actionColumn = {
//       title: "Action",
//       key: "action",
//       width: 120,
//       fixed: "right",
//       align: "center",
//       render: (_, record, index) =>
//         index === 0 ? (
//           <Typography.Link
//             onClick={() => {
//               isEditing && handleSubmit();
//               setIsEditing((prev) => !prev);
//             }}
//             style={{
//               display: "block",
//               height: "100%",
//             }}
//           >
//             {isEditing ? "Save All" : "Edit All"}
//           </Typography.Link>
//         ) : (
//           // ⬇️ Empty cell for other rows
//           { children: null, props: { colSpan: 0 } }
//         ),
//     };

//     // const allColumns = [...columns, actionColumn];
//     const allColumns = [...columns];

//     // ✅ ANT DESIGN TABLE
//     if (type === "antd") {
//       return (
//         <AntTable
//           columns={allColumns.map((col) => {
//             if (col.key === "action") {
//               return {
//                 ...col,
//                 //  if (col.key === "action" || col.key === "owner") {

//                 width: isEditing ? col.width || 150 : undefined, // ✅ fallback width if not set
//                 onCell: (_, index) =>
//                   index === 0
//                     ? { rowSpan: data.length } // 🔥 span one cell across all rows
//                     : { rowSpan: 0 },
//               };
//             } else if (col.key === "owner" || col?.justText) {
//               // keep custom render
//               return {
//                 ...col,
//                 width: isEditing ? col.width || 150 : undefined, // ✅ fallback width if not set
//               };
//             }
//             return {
//               ...col,
//               width: isEditing ? col.width || 150 : undefined, // ✅ fallback width if not set
//               render: (text, record) => renderCell(record, col),
//             };
//           })}
//           dataSource={data}
//           pagination={pagination}
//           customPagination={{
//             pageSize: 10,
//             position: ["bottomRight"],
//             className: "custom-pagination",
//           }}
//           rowKey="key"
//           scroll={{ x: "max-content" }}
//         />
//       );
//     }

//     // ✅ BOOTSTRAP TABLE (similar approach)
//     if (type === "bootstrap") {
//       return (
//         <BootstrapTable striped bordered hover responsive>
//           <thead>
//             <tr>
//               {allColumns.map((col) => (
//                 <th key={col.key}>{col.title}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((record, rowIndex) => (
//               <tr key={record.key}>
//                 {columns.map((col) => (
//                   <td key={col.key}>{renderCell(record, col)}</td>
//                 ))}
//                 {rowIndex === 0 ? (
//                   <td
//                     rowSpan={data.length}
//                     className="text-center align-middle"
//                   >
//                     <Button
//                       variant={isEditing ? "success" : "primary"}
//                       onClick={() => setIsEditing((prev) => !prev)}
//                     >
//                       {isEditing ? "Save All" : "Edit All"}
//                     </Button>
//                   </td>
//                 ) : null}
//               </tr>
//             ))}
//           </tbody>
//         </BootstrapTable>
//       );
//     }

//     return null;
//   };
// };

// export default DynamicTableForInputsSection;


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
    pagination = false,
    handleSubmit = () => {},
    isEditing = false,
    setIsEditing = () => {},
  }) {
    // Helper function to get nested value from form values
    const getNestedValue = (obj, path) => {
      if (!obj || !path) return undefined;
      const normalizedPath = path.replace(/\[(\d+)\]/g, ".$1");
      return normalizedPath.split(".").reduce((acc, key) => {
        return acc && Object.prototype.hasOwnProperty.call(acc, key)
          ? acc[key]
          : undefined;
      }, obj);
    };

    const renderCell = (record, col) => {
      const value = record[col.dataIndex];

      // ✅ When global edit mode is ON
      if (isEditing) {
        // Check if this is partner's home address field
        if (col.key === "homeAddress" && record.stakeHolder === "partner.contact") {
          return (
            <DynamicFormField
              fieldType="partner-home-address" // Use the new field type
              name={col?.dataIndex || ""}
              placeholder={col?.placeholder || ""}
              options={col?.options || []}
              values={values}
              setFieldValue={setFieldValue}
              handleChange={handleChange}
              handleBlur={handleBlur}
              handleInnerModal={
                col?.handleInnerModal ||
                (() => {
                  console.log("No function defined");
                })
              }
              innerModalTitle={
                record?.innerModalTitle || col?.innerModalTitle || ""
              }
              all={{
                ...col,
                checkCallBack: true,
                checkfunc: (values, setFieldValue, thisInput, stakeHolder) => {
                  const clientHomeAddress = getNestedValue(values, "client.contact.homeAddress");
                  const clientPostcode = getNestedValue(values, "client.contact.postcodeSuburb");
                  
                  if (thisInput.checked) {
                    // Set partner address same as client
                    setFieldValue("partner.contact.homeAddress", clientHomeAddress || "");
                    setFieldValue("partner.contact.postcodeSuburb", clientPostcode || "");
                    
                    // Also trigger postal address if SameAsAbove is checked
                    if (getNestedValue(values, "partner.contact.SameAsAbove")) {
                      setFieldValue("partner.contact.postalAddress", clientHomeAddress || "");
                      setFieldValue("partner.contact.postalPostCode", clientPostcode || "");
                    }
                  }
                }
              }}
              {...(record?.stakeHolder
                ? { stakeHolder: record.stakeHolder + "." }
                : {})}
            />
          );
        }

        // Default rendering for other fields
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
            handleInnerModal={
              col?.handleInnerModal ||
              (() => {
                console.log("No function defined");
              })
            }
            innerModalTitle={
              record?.innerModalTitle || col?.innerModalTitle || ""
            }
            all={col || {}}
            {...(record?.stakeHolder
              ? { stakeHolder: record.stakeHolder + "." }
              : {})}
          />
        );
      }

      // ✅ When not editing → format value for display
      if (col?.type === "antdate") return value ? ConvertDate(value) : "--";
      if (col?.type === "checkbox") return value ? "Checked" : "Un-Checked";
      if (col?.type === "select-multi-antd")
        return Array.isArray(value) ? value.join(", ") : value || "";
      if (
        (col?.type === "yesnoModal" && value === "Yes") ||
        col?.type === "modal"
      ) {
        return (
          <div className="d-flex align-items-center justify-content-left gap-3">
            {value}
            <DynamicFormField
              fieldType="modal"
              name={col?.dataIndex || ""}
              placeholder={col?.placeholder || ""}
              options={col?.options || []}
              values={values}
              setFieldValue={setFieldValue}
              handleChange={handleChange}
              handleBlur={handleBlur}
              handleInnerModal={
                col?.func ||
                col?.handleInnerModal ||
                (() => {
                  console.log("No function defined");
                })
              }
              innerModalTitle={
                record?.innerModalTitle || col?.innerModalTitle || ""
              }
              all={col || {}}
              {...(record?.stakeHolder
                ? { stakeHolder: record.stakeHolder + "." }
                : {})}
            />
          </div>
        );
      }
      if (col?.selectedOptionValue) {
        const selectedOption = col?.options?.find(
          (item) => item.value == value
        );
        return selectedOption ? selectedOption.label : value || "--";
      }

      // Special display for partner home address when same as client
      if (col.key === "homeAddress" && record.stakeHolder === "partner.contact") {
        const clientHomeAddress = getNestedValue(values, "client.contact.homeAddress");
        const isSameAsClient = value === clientHomeAddress;
        
        return (
          <div>
            {value || "--"}
            {isSameAsClient && value && (
              <div className="text-muted small">(Same as Client)</div>
            )}
          </div>
        );
      }

      return value || "--";
    };

    // ✅ Global action column (only one cell)
    const actionColumn = {
      title: "Action",
      key: "action",
      width: 120,
      fixed: "right",
      align: "center",
      render: (_, record, index) =>
        index === 0 ? (
          <Typography.Link
            onClick={() => {
              isEditing && handleSubmit();
              setIsEditing((prev) => !prev);
            }}
            style={{
              display: "block",
              height: "100%",
            }}
          >
            {isEditing ? "Save All" : "Edit All"}
          </Typography.Link>
        ) : (
          // ⬇️ Empty cell for other rows - FIXED: Return proper object
          { children: null, props: { colSpan: 0 } }
        ),
    };

    // const allColumns = [...columns, actionColumn];
    const allColumns = [...columns];

    // ✅ ANT DESIGN TABLE
    if (type === "antd") {
      return (
        <AntTable
          columns={allColumns.map((col) => {
            if (col.key === "action") {
              return {
                ...col,
                width: isEditing ? col.width || 150 : undefined,
                onCell: (_, index) =>
                  index === 0
                    ? { rowSpan: data.length }
                    : { rowSpan: 0 },
              };
            } else if (col.key === "owner" || col?.justText) {
              return {
                ...col,
                width: isEditing ? col.width || 150 : undefined,
              };
            }
            return {
              ...col,
              width: isEditing ? col.width || 150 : undefined,
              render: (text, record) => renderCell(record, col),
            };
          })}
          dataSource={data}
          pagination={pagination}
          customPagination={{
            pageSize: 10,
            position: ["bottomRight"],
            className: "custom-pagination",
          }}
          rowKey="key"
          scroll={{ x: "max-content" }}
        />
      );
    }

    // ✅ BOOTSTRAP TABLE (similar approach)
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
            {data.map((record, rowIndex) => (
              <tr key={record.key}>
                {columns.map((col) => (
                  <td key={col.key}>{renderCell(record, col)}</td>
                ))}
                {rowIndex === 0 ? (
                  <td
                    rowSpan={data.length}
                    className="text-center align-middle"
                  >
                    <Button
                      variant={isEditing ? "success" : "primary"}
                      onClick={() => setIsEditing((prev) => !prev)}
                    >
                      {isEditing ? "Save All" : "Edit All"}
                    </Button>
                  </td>
                ) : null}
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