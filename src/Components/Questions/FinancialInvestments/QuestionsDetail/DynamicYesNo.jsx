import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import "./DynamicYesNo.css";

// --- FIXED: supports both dot and bracket notation ---
const getNestedValue = (obj, path) => {
  if (!obj || !path) return undefined;

  // Convert "array[index]" into ".index"
  const normalizedPath = path.replace(/\[(\d+)\]/g, '.$1');
  return normalizedPath.split('.').reduce((acc, key) => {
    return acc && Object.prototype.hasOwnProperty.call(acc, key)
      ? acc[key]
      : undefined;
  }, obj);
};

// --- FIXED: also sanitize square brackets for HTML IDs ---
const sanitizeId = (name) => name.replace(/[.\[\]]/g, "_");

const DynamicYesNo = ({ name, id }) => {
  const { values, setFieldValue } = useFormikContext();

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
