import React, { useState } from "react";
import { Field } from "formik";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
// import DynamicYesNo from './DynamicYesNo';
import Button from "react-bootstrap/Button";
import {
  toPercentage,
  handleInputChange,
  handleInputFocus,
  handleInputKeyDown,
  handleInputBlur,
  toCommaAndDollar,
} from "../Api/Api";
import DynamicYesNo from "../../Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo";
import { CreatableMultiSelectField } from "../../Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import CreatableSelectField from "./DynamicCreatableSelect/CreatableSelectField";
import { Form, InputGroup } from "react-bootstrap";
import { DatePicker as AntDate, Drawer, Popover } from "antd";
import dayjs from "dayjs";

const ButtonDrawer = ({
  title,
  placement = "top",
  height = 250,
  width = "60%",
  children,
  DrawerContent,
  setOpen,
  open,
  containerSelector = ".modal", // 👈 default parent container
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      {children || "nothing to render"}
      <Drawer
        title={title}
        placement={placement}
        height={height}
        width={width}
        open={open}
        onClose={() => setOpen(false)}
        mask={false} // 👈 no black overlay
        closable={false} // 👈 no close button
        getContainer={() => document.querySelector(containerSelector)}
        style={{
          width: width,
          margin: "10px auto",
          borderRadius: "12px",
          boxShadow: "none",
        }}
        styles={{
          body: { boxShadow: "none", maxHeight: "70vh", overflowY: "auto" },
          content: { boxShadow: "none" },
          wrapper: { boxShadow: "none" },
        }}
      >
        {DrawerContent}
      </Drawer>
    </div>
  );
};

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
  const [open, setOpen] = useState(false);

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
          onBlur={(e) => {
            if (all.BlurHandler) {
              all.BlurHandler(values, setFieldValue, e.target, stakeHolder);
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
      let FormulaSetting = () => {};

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
          onChange={(e) =>
            handleInputChange(
              e,
              setFieldValue,
              FormulaSetting,
              values,
              stakeHolder
            )
          }
          onFocus={(e) => handleInputFocus(e, setFieldValue)}
          onKeyDown={(e) => handleInputKeyDown(e)}
          onBlur={(e) =>
            handleInputBlur(
              e,
              setFieldValue,
              toPercentage,
              FormulaSetting,
              values,
              stakeHolder
            )
          }
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
              setFieldValue(
                stakeHolder ? stakeHolder + name : name,
                toCommaAndDollar(value)
              );

              if (all.callBack) {
                all.func(values, setFieldValue, e.target, stakeHolder);
              }
            }}
            disabled={all?.disabled ? all.disabled : false}
          />
          <div className="invalid-feedback">{all.invalidMessage}</div>
        </React.Fragment>
      );

    case "number-toComma-Modal":
      return (
        <React.Fragment>
          <InputGroup className={`${all.extraClass}`}>
            <Field
              type="text"
              placeholder={placeholder}
              name={stakeHolder ? stakeHolder + name : name}
              id={name}
              className={`form-control inputDesignDoubleInput ${all.extraClass}`}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.-]+/g, "");
                setFieldValue(
                  stakeHolder ? stakeHolder + name : name,
                  toCommaAndDollar(value)
                );

                if (all.callBack) {
                  all.inputChangeFunc(
                    values,
                    setFieldValue,
                    e.target,
                    stakeHolder
                  );
                }
              }}
              disabled={all?.disabled ? all.disabled : false}
            />

            <Button
              className="btn bgColor modalBtn border-0"
              id="button-addon2"
              onClick={() => {
                all.func(innerModalTitle, values, all.key, stakeHolder);
              }}
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </Button>
          </InputGroup>
          <div className="invalid-feedback">{all.invalidMessage}</div>
        </React.Fragment>
      );

    case "date":
      return (
        <DatePicker
          className="form-control inputDesignDoubleInput shadow DateInputPadding"
          // Correctly handle selected date value
          selected={
            stakeHolder
              ? values?.[stakeHolder?.replace(".", "")]?.[name] || ""
              : values?.[name] || ""
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
                value: date, // The selected date value
              },
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
          // ✅ FIX: return the container instead of appending
          popperPlacement="bottom-start"
        />
      );

    case "antdate":
      // utility: join stakeHolder + name safely
      const buildFieldName = (stakeHolder, name) => {
        if (!stakeHolder) return name;
        return stakeHolder.endsWith(".")
          ? `${stakeHolder}${name}`
          : `${stakeHolder}.${name}`;
      };

      return (
        <AntDate
          className="form-control inputDesignDoubleInput"
          value={(() => {
            const fieldName = buildFieldName(stakeHolder, name);

            // safely read nested value
            const rawValue = fieldName
              .split(".")
              .reduce((acc, key) => (acc ? acc[key] : null), values);

            return rawValue ? dayjs(rawValue) : null;
          })()}
          onChange={(date) => {
            const fieldName = buildFieldName(stakeHolder, name);
            const isoValue = date
              ? date.hour(12).minute(0).second(0).millisecond(0).toISOString()
              : null;

            console.log(isoValue);
            // ✅ update Formik correctly
            setFieldValue(fieldName, isoValue);

            if (all.callBack) {
              all.func(
                values,
                setFieldValue,
                { name: fieldName, value: isoValue },
                stakeHolder
              );
            }
          }}
          onBlur={() => {
            const fieldName = buildFieldName(stakeHolder, name);
            handleBlur({ target: { name: fieldName } });
          }}
          id={buildFieldName(stakeHolder, name)}
          name={buildFieldName(stakeHolder, name)}
          disabled={all?.disabled ?? false}
          format="DD/MM/YYYY"
          allowClear
          getPopupContainer={(triggerNode) =>
            triggerNode.closest("table") || triggerNode
          }
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
                setFieldValue(
                  stakeHolder ? stakeHolder + name : name,
                  toCommaAndDollar(value)
                );

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
          <div className="invalid-feedback">{all.invalidMessage}</div>
        </React.Fragment>
      );

    case "select":
      return (
        <Field
          as="select"
          name={stakeHolder ? stakeHolder + name : name}
          className="form-select inputDesignDoubleInput"
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
            <option
              key={option.value}
              value={option.value}
              selected={option?.selected}
            >
              {option.label}
            </option>
          ))}
        </Field>
      );

    case "selectModal":
      return (
        <React.Fragment>
          <InputGroup
            className={
              (stakeHolder
                ? values?.[stakeHolder.slice(0, -1)]?.[name]
                : values?.[name]) === all.ModalOption
                ? "GInputSelect"
                : ""
            }
          >
            <Field
              as="select"
              name={stakeHolder ? stakeHolder + name : name}
              className="form-select inputDesignDoubleInput"
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
                <option
                  key={option.value}
                  value={option.value}
                  selected={option?.selected}
                >
                  {option.label}
                </option>
              ))}
            </Field>

            {(stakeHolder
              ? values?.[stakeHolder.slice(0, -1)]?.[name]
              : values?.[name]) === all.ModalOption && (
              <Button
                className="btn bgColor modalBtn border-0"
                onClick={() =>
                  handleInnerModal(
                    innerModalTitle,
                    values,
                    all.key,
                    stakeHolder
                  )
                }
              >
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </Button>
            )}
          </InputGroup>
        </React.Fragment>
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
            console.log(e);
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
        <DynamicYesNo
          name={stakeHolder ? stakeHolder + name : name}
          values={values}
          handleChange={handleChange}
        />
      );

    case "yesnoModal":
      return (
        <React.Fragment>
          <DynamicYesNo
            name={stakeHolder ? stakeHolder + name : name}
            values={values}
            handleChange={handleChange}
          />
          {(stakeHolder
            ? values?.[stakeHolder.slice(0, -1)]?.[name]
            : values?.[name]) === "Yes" && (
            <div className="d-flex justify-content-center align-items-center pt-2">
              <ButtonDrawer
                title={innerModalTitle}
                buttonIcon={faArrowUpRightFromSquare}
                placement="top"
                height={all?.Drawerheight}
                width={all?.DrawerWidth}
                DrawerContent={all?.PopoverContent?.(
                  innerModalTitle,
                  values,
                  all,
                  stakeHolder
                )}
                setOpen={setOpen}
                open={open}
              >
                <Button
                  className="btn bgColor modalBtn border-0"
                  id="button-addon2"
                  onClick={() => {
                    if (all.callBack) {
                      all.func(innerModalTitle, values, all.key, stakeHolder);
                    }
                  }}
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </Button>
              </ButtonDrawer>
            </div>
          )}
        </React.Fragment>
      );

    case "modal":
      return (
        <div className="d-flex justify-content-center align-items-center ">
          <ButtonDrawer
            title={innerModalTitle}
            buttonIcon={faArrowUpRightFromSquare}
            placement="top"
            height={all?.Drawerheight}
            width={all?.DrawerWidth}
            DrawerContent={all?.PopoverContent?.(
              innerModalTitle,
              values,
              all,
              stakeHolder
            )}
            setOpen={setOpen}
            open={open}
          >
            <Button
              className="btn bgColor modalBtn border-0"
              onClick={() => {
                handleInnerModal(innerModalTitle, values, all.key, stakeHolder);
              }}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />{" "}
            </Button>
          </ButtonDrawer>
        </div>
      );

    default:
      return null;
  }
};

export default DynamicFormField;
