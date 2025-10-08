// import React, { useEffect } from "react";
// import "./DynamicYesNo.css";

// // Helper function to get nested value using dot notation
// const getNestedValue = (obj, path) => {
//   return path.split(".").reduce((o, p) => (o ? o[p] : undefined), obj);
// };

// // Helper function to set nested value using dot notation
// const setNestedValue = (obj, path, value) => {
//   const keys = path.split(".");
//   const lastKey = keys.pop();
//   const deepObj = keys.reduce((o, p) => (o[p] = o[p] || {}), obj);
//   deepObj[lastKey] = value;
// };

// const DynamicYesNo = (props) => {
//   useEffect(() => {
//     // Set default value to "No" if not already set
//     if (!getNestedValue(props.values, props.name)) {
//       props.handleChange({ target: { name: props.name, value: "No" } });
//       if (props?.setFieldValue) {
//         props.setFieldValue(name, value);
//       }
//     }
//   }, [props.name, props.values, props.handleChange]);

//   // Function to sanitize the id by replacing dots with underscores (or another character)
//   const sanitizeId = (name) => name.replace(/\./g, "_");

//   // Custom handleChange to support nested object updates
//   const handleNestedChange = (e) => {
//     const { name, value } = e.target;
//     const updatedValues = { ...props.values };
//     setNestedValue(updatedValues, name, value); // Update nested properties
//     props.handleChange({ target: { name, value } });
//     if (props?.setFieldValue) {
//       props.setFieldValue(name, value);
//     }
//   };

//   return (
//     <div className="form-check form-switch position-relative m-0 p-0 col-md-12 QuestionYesNoCenter">
//       <div className="radioButton2 border">
//         <input
//           type="radio"
//           name={props.name}
//           id={`${sanitizeId(props.id ? props.id : props.name)}1`}
//           value="No"
//           onChange={handleNestedChange}
//           checked={getNestedValue(props.values, props.name) === "No"}
//           className="NoInput"
//         />
//         <label
//           htmlFor={`${sanitizeId(props.id ? props.id : props.name)}1`}
//           className="tableNoLabel"
//           role="button"
//         >
//           <span>No</span>
//         </label>
//         <input
//           type="radio"
//           name={props.name}
//           id={`${sanitizeId(props.id ? props.id : props.name)}2`}
//           value="Yes"
//           onChange={handleNestedChange}
//           checked={getNestedValue(props.values, props.name) === "Yes"}
//           className="YesInput"
//         />
//         <label
//           htmlFor={`${sanitizeId(props.id ? props.id : props.name)}2`}
//           className="tableYesLabel"
//           role="button"
//         >
//           <span>Yes</span>
//         </label>
//       </div>
//     </div>
//   );
// };

// export default DynamicYesNo;

import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import "./DynamicYesNo.css";

// Helper to get nested value using dot notation
const getNestedValue = (obj, path) =>
  path?.split?.(".")?.reduce((o, p) => (o ? o[p] : undefined), obj);

const sanitizeId = (name) => name.replace(/\./g, "_");

const DynamicYesNo = ({ name, id }) => {
  const { values, setFieldValue } = useFormikContext();

  // default to "No" if not set
  useEffect(() => {
    const current = getNestedValue(values, name);
    if (current === undefined || current === null || current === "") {
      setFieldValue(name, "No");
    }
  }, [name, values, setFieldValue]);

  const value = getNestedValue(values, name);

  const handleChange = (val) => {
    setFieldValue(name, val);
  };

  return (
    <div className="form-check form-switch position-relative m-0 p-0 col-md-12 QuestionYesNoCenter">
      <div className="radioButton2 border">
        <input
          type="radio"
          name={name}
          id={`${sanitizeId(id ? id : name)}1`}
          value="No"
          onChange={() => handleChange("No")}
          checked={value === "No"}
          className="NoInput"
        />
        <label
          htmlFor={`${sanitizeId(id ? id : name)}1`}
          className="tableNoLabel"
          role="button"
        >
          <span>No</span>
        </label>

        <input
          type="radio"
          name={name}
          id={`${sanitizeId(id ? id : name)}2`}
          value="Yes"
          onChange={() => handleChange("Yes")}
          checked={value === "Yes"}
          className="YesInput"
        />
        <label
          htmlFor={`${sanitizeId(id ? id : name)}2`}
          className="tableYesLabel"
          role="button"
        >
          <span>Yes</span>
        </label>
      </div>
    </div>
  );
};

export default DynamicYesNo;
