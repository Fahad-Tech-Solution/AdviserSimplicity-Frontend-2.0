import React from "react";
import { Field } from "formik";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
// import DynamicYesNo from './DynamicYesNo';
import Button from "react-bootstrap/Button";
import { toCommaAndDollar, toPersentage } from "../Api/Api";
import DynamicYesNo from "../../Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo";

const DynamicFormField = ({
  fieldType,
  name,
  placeholder,
  options,
  values,
  setFieldValue,
  handleChange,
  handleBlur,
  handleInnerModal,
}) => {
  switch (fieldType) {
    case "number":
      return (
        <Field
          type="number"
          placeholder={placeholder}
          name={name}
          id={name}
          className="form-control inputDesign"
          onChange={(e) => handleChange(e)}
        />
      );
    case "text":
      return (
        <Field
          type="text"
          placeholder={placeholder}
          name={name}
          id={name}
          className="form-control inputDesign"
          onChange={(e) => handleChange(e)}
        />
      );

    case "number-toPercent":
      return (
        <Field
          type="text"
          placeholder={placeholder}
          name={name}
          id={name}
          className="form-control inputDesign"
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9.-]+/g, "");
            setFieldValue(
              name,
              value > 100 ? toPersentage(100) : toPersentage(value)
            );
          }}
        />
      );

    case "number-toComma":
      return (
        <Field
          type="text"
          placeholder={placeholder}
          name={name}
          id={name}
          className="form-control inputDesign"
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9.-]+/g, "");
            setFieldValue(name, toCommaAndDollar(value));
          }}
        />
      );

    case "date":
      return (
        <DatePicker
          className="form-control inputDesign shadow DateInputPadding"
          selected={values[name]}
          onChange={(date) => setFieldValue(name, date)}
          dateFormat="dd/MM/yyyy"
          placeholderText={placeholder}
          onBlur={handleBlur}
          showIcon
          id={name}
          name={name}
        />
      );

    case "select":
      return (
        <Field as="select" name={name} className="form-select inputDesign">
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      );

    case "yesno":
      return (
        <DynamicYesNo name={name} values={values} handleChange={handleChange} />
      );

    case "modal":
      return (
        <Button
          className="btn bgColor modalBtn border-0"
          onClick={() => handleInnerModal(name, values)}
        >
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </Button>
      );

    default:
      return null;
  }
};

export default DynamicFormField;
