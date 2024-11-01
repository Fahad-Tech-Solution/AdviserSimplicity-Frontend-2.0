import React from "react";
import { Field } from "formik";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
// import DynamicYesNo from './DynamicYesNo';
import Button from "react-bootstrap/Button";
import { toPercentage, handleInputChange, handleInputFocus, handleInputKeyDown, handleInputBlur, toCommaAndDollar, } from "../Api/Api";
import DynamicYesNo from "../../Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo";
import { CreatableMultiSelectField } from "../../Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import CreatableSelectField from "./DynamicCreatableSelect/CreatableSelectField";
import { Form, InputGroup } from "react-bootstrap";

const DynamicFormField = ({
  fieldType,
  name,
  disabled,
  placeholder,
  options,
  values,
  setFieldValue,
  handleChange,
  handleBlur,
  handleInnerModal,
  stakeHolder,
  innerModalTitle,
  all,
}) => {

  switch (fieldType) {
    case "number":
      return (
        <Field
          type="number"
          placeholder={placeholder}
          name={stakeHolder ? stakeHolder + name : name}
          id={name}
          className="form-control inputDesignDoubleInput"
          onChange={(e) => {
            handleChange(e);
            // console.log(all.callBack, all.func)
            if (all.callBack) {
              all.func(values, setFieldValue, e.target, stakeHolder);
            }
          }}
          disabled={all?.disabled ? all.disabled : false}
        />
      );

    case "text":
      return (
        <Field
          type="text"
          placeholder={placeholder}
          name={stakeHolder ? stakeHolder + name : name}
          id={name}
          className="form-control inputDesignDoubleInput"
          onChange={(e) => {
            handleChange(e);
            if (all.callBack) {
              all.func(values, setFieldValue, e.target, stakeHolder);
            }
          }}
          disabled={all?.disabled ? all.disabled : false}
        />
      );

    case "number-toPercent":

      let FormulaSetting = () => { };

      if (all.callBack) {
        // alert(all.callBack);
        FormulaSetting = all.func;
      }


      return (
        <Field
          type="text"
          placeholder={placeholder}
          name={stakeHolder ? stakeHolder + name : name}
          id={name}
          className="form-control inputDesignDoubleInput"
          onChange={(e) => handleInputChange(e, setFieldValue, FormulaSetting, values, stakeHolder)}
          onFocus={(e) => handleInputFocus(e, setFieldValue)}
          onKeyDown={(e) => handleInputKeyDown(e)}
          onBlur={(e) => handleInputBlur(e, setFieldValue, toPercentage, FormulaSetting, values, stakeHolder)}
          disabled={all?.disabled ? all.disabled : false}
        />
      );

    case "number-toComma":
      return (
        <React.Fragment>
          <Field
            type="text"
            placeholder={placeholder}
            name={stakeHolder ? stakeHolder + name : name}
            id={name}
            className={`form-control inputDesignDoubleInput ${all.extraClass}`}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.-]+/g, "");
              setFieldValue(stakeHolder ? stakeHolder + name : name, toCommaAndDollar(value));

              if (all.callBack) {
                all.func(values, setFieldValue, e.target, stakeHolder);
              }

            }}
            disabled={all?.disabled ? all.disabled : false}
          />
          <div class="invalid-feedback">
            {all.invalidMessage}
          </div>
        </React.Fragment>
      );

    case "number-toComma-Modal":
      return (
        <React.Fragment>
          <InputGroup className={` ${all.extraClass}`}>
            <Field
              type="text"
              placeholder={placeholder}
              name={stakeHolder ? stakeHolder + name : name}
              id={name}
              className={`form-control inputDesignDoubleInput ${all.extraClass}`}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.-]+/g, "");
                setFieldValue(stakeHolder ? stakeHolder + name : name, toCommaAndDollar(value));

                if (all.callBack) {
                  all.inputChangeFunc(values, setFieldValue, e.target, stakeHolder);
                }
              }}
              disabled={all?.disabled ? all.disabled : false}
            />

            <Button className='btn bgColor modalBtn border-0' id="button-addon2"
              onClick={() => {
                all.func(innerModalTitle, values, all.key)
              }}
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </Button>
          </InputGroup>
          <div class="invalid-feedback">
            {all.invalidMessage}
          </div>
        </React.Fragment>
      );

    case "date":
      return (
        <DatePicker
          className="form-control inputDesignDoubleInput shadow DateInputPadding"
          // Correctly handle selected date value
          selected={
            stakeHolder
              ? (values?.[stakeHolder?.replace(".", "")]?.[name] || "")
              : (values?.[name] || "")
          }


          onChange={(date) => {
            const fieldName = stakeHolder ? stakeHolder + name : name; // Determine correct field name

            // console.log(fieldName);
            // Set the selected date in form
            setFieldValue(fieldName, date);

            // If you need to simulate an event and pass it to a callback
            let e = {
              target: {
                name: fieldName, // Use correct field name
                value: date // The selected date value
              }
            };

            // Call the callback if provided
            if (all.callBack) {
              all.func(values, setFieldValue, e.target, stakeHolder); // Pass the event-like object
            }
          }}
          dateFormat="dd/MM/yyyy"
          placeholderText={placeholder}
          onBlur={handleBlur} // Handle blur as needed
          showIcon
          id={name}
          name={stakeHolder ? stakeHolder + name : name}
          disabled={all?.disabled ? all.disabled : false} // Disable input based on props
        />

      );

    case "number-toComma-and-MultiSelect":
      return (

        <React.Fragment>
          <InputGroup className="mb-3 flex-nowrap">
            <Field
              type="text"
              placeholder={placeholder}
              name={stakeHolder ? stakeHolder + name : name}
              id={name}
              className={`form-control inputDesignDoubleInput ${all.extraClass}`}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.-]+/g, "");
                setFieldValue(stakeHolder ? stakeHolder + name : name, toCommaAndDollar(value));

                if (all.callBack) {
                  all.func(values, setFieldValue, e.target, stakeHolder);
                }
              }}
              disabled={all?.disabled ? all.disabled : false}
            />

            <Field
              as="select"
              placeholder={all.placeholder2}
              id={all.name2}
              name={stakeHolder ? stakeHolder + all.name2 : all.name2}
              className="form-select inputDesignDoubleInput customInputGroupSelect"
            >
              <option value={""}>Select</option>
              <option value={52}>Weekly</option>
              <option value={12}>Monthly</option>
              <option value={1}>Year</option>
            </Field>

          </InputGroup>
          <div class="invalid-feedback">
            {all.invalidMessage}
          </div>
        </React.Fragment>
      );

    case "select":
      return (
        <Field as="select" name={stakeHolder ? stakeHolder + name : name} className="form-select inputDesignDoubleInput"
          disabled={all?.disabled ? all.disabled : false}
          onChange={(e) => {
            handleChange(e);
            if (all.callBack) {
              all.func(values, setFieldValue, e.target, stakeHolder);
            }
          }}
        >
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      );

    case "select-creatableMulti":
      return (
        <Field
          name={stakeHolder ? stakeHolder + name : name}
          component={CreatableMultiSelectField}
          label="Multi Select Field"
          options={options}
          disabled={all?.disabled ? all.disabled : false}
          onChange={(e) => {
            console.log(e)
            if (all.callBack) {
              all.func(values, setFieldValue, e.target, stakeHolder);
            }
          }}
        />
      );

    case "select-multi":
      return (
        <Field
          name={stakeHolder ? stakeHolder + name : name}
          component={CreatableMultiSelectField}
          label="Multi Select Field"
          options={options}
          disabled={all?.disabled ? all.disabled : false}
        />
      );

    case "select-creatable":
      return (
        <Field
          name={stakeHolder ? stakeHolder + name : name}
          component={CreatableSelectField}
          defaultOptions={options}
          placeholder="Select or create ..."
          form={{ setFieldValue }}
          disabled={all?.disabled ? all.disabled : false}
        />
      );

    case "yesno":
      return (
        <DynamicYesNo name={stakeHolder ? stakeHolder + name : name} values={values} handleChange={handleChange} />
      );

    case "yesnoModal":
      return (
        <React.Fragment>
          <DynamicYesNo
            name={stakeHolder ? stakeHolder + name : name}
            values={values}
            handleChange={handleChange}
          />
          {(stakeHolder ? values?.[stakeHolder.slice(0, -1)]?.[name] : values?.[name]) === "Yes" && (
            <div className="d-flex justify-content-center align-items-center pt-2">
              <Button
                className="btn bgColor modalBtn border-0"
                id="button-addon2"
                onClick={() => {
                  if (all.callBack) {
                    all.func(innerModalTitle, values, all.key, stakeHolder);
                  }
                }}
              >
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </Button>
            </div>
          )}
        </React.Fragment>
      );

    case "modal":
      return (
        <div className="d-flex justify-content-center align-items-center ">
          <Button
            className="btn bgColor modalBtn border-0"
            onClick={() => handleInnerModal(innerModalTitle, values, all.key, stakeHolder)}
          >
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </Button>
        </div>
      );

    default:
      return null;
  }
};

export default DynamicFormField;
