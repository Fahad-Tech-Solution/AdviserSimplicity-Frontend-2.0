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
import { InputGroup } from "react-bootstrap";

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
          onChange={(e) => handleChange(e)}
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
          onChange={(e) => handleChange(e)}
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
        <Field
          type="text"
          placeholder={placeholder}
          name={stakeHolder ? stakeHolder + name : name}
          id={name}
          className="form-control inputDesignDoubleInput"
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9.-]+/g, "");
            setFieldValue(stakeHolder ? stakeHolder + name : name, toCommaAndDollar(value));

            if (all.callBack) {
              all.func(values, setFieldValue, e.target, stakeHolder);
            }

          }}
          disabled={all?.disabled ? all.disabled : false}
        />
      );

    case "number-toComma-Modal":
      return (

        <InputGroup>
          <Field
            type="text"
            placeholder={placeholder}
            name={stakeHolder ? stakeHolder + name : name}
            id={name}
            className="form-control inputDesignDoubleInput"
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.-]+/g, "");
              setFieldValue(stakeHolder ? stakeHolder + name : name, toCommaAndDollar(value));

              if (all.callBack) {
                all.func(values, setFieldValue, e.target, stakeHolder);
              }
            }}
            disabled={all?.disabled ? all.disabled : false}
          />

          <Button className='btn bgColor modalBtn border-0' id="button-addon2"
            onClick={() => { all.func(innerModalTitle, values, all.key) }}
          >
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </Button>
        </InputGroup>

      );


    case "date":
      return (
        <DatePicker
          className="form-control inputDesignDoubleInput shadow DateInputPadding"
          selected={values[name]}
          onChange={(date) => setFieldValue(name, date)}
          dateFormat="dd/MM/yyyy"
          placeholderText={placeholder}
          onBlur={handleBlur}
          showIcon
          id={name}
          name={stakeHolder ? stakeHolder + name : name}
          disabled={all?.disabled ? all.disabled : false}
        />
      );

    case "select":
      return (
        <Field as="select" name={stakeHolder ? stakeHolder + name : name} className="form-select inputDesignDoubleInput"
          disabled={all?.disabled ? all.disabled : false}
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
          {values[stakeHolder ? stakeHolder + name : name] === "Yes" && (
            <div className="d-flex justify-content-center align-items-center pt-2">
              <Button
                className="btn bgColor modalBtn border-0"
                id="button-addon2"
                onClick={() => {
                  if (all.callBack) {
                    all.func(innerModalTitle, values, all.key);
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
