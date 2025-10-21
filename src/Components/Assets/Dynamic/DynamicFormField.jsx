import React, { useState } from "react";
import { ErrorMessage, Field } from "formik";
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
import {
  AntdCreatableMultiSelect,
  CreatableMultiSelectField,
} from "../../Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import CreatableSelectField from "./DynamicCreatableSelect/CreatableSelectField";
import { Form, InputGroup } from "react-bootstrap";
import {
  DatePicker as AntDate,
  Checkbox,
  ConfigProvider,
  Drawer,
  Popover,
  Radio,
  Select,
  Spin,
} from "antd";
import dayjs from "dayjs";
import ButtonDrawer from "./ButtonDrawer";
import axios from "axios";

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
        <>
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
            disabled={
              typeof all?.disabled === "function"
                ? all.disabled(values, stakeHolder) // pass form values to compute disabled
                : all?.disabled || false
            }
          />
          {all?.CheckError && (
            <ErrorMessage
              name={stakeHolder ? stakeHolder + name : name}
              component="div"
              className="text-danger small mt-1"
            />
          )}
        </>
      );

    case "text":
      return (
        <>
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
            disabled={
              typeof all?.disabled === "function"
                ? all.disabled(values, stakeHolder) // pass form values to compute disabled
                : all?.disabled || false
            }
          />
          {all?.CheckError && (
            <ErrorMessage
              name={stakeHolder ? stakeHolder + name : name}
              component="div"
              className="text-danger small mt-1"
            />
          )}
        </>
      );

    case "checkbox":
      return (
        <>
          <Field name={stakeHolder ? stakeHolder + name : name}>
            {({ field, form }) => (
              <Checkbox
                id={name}
                checked={field.value || false}
                onChange={(e) => {
                  form.setFieldValue(field.name, e.target.checked);
                  if (all.callBack) {
                    all.func(values, setFieldValue, e.target, stakeHolder);
                  }
                }}
                disabled={
                  typeof all?.disabled === "function"
                    ? all.disabled(values, stakeHolder) // pass form values to compute disabled
                    : all?.disabled || false
                }
              >
                {placeholder || name}
              </Checkbox>
            )}
          </Field>{" "}
          {all?.CheckError && (
            <ErrorMessage
              name={stakeHolder ? stakeHolder + name : name}
              component="div"
              className="text-danger small mt-1"
            />
          )}
        </>
      );

    case "radio":
      return (
        <>
          <ConfigProvider
            theme={{
              components: {
                Radio: {
                  colorPrimary: "#36b446", // ✅ your green theme
                  colorPrimaryHover: "#2fa23b",
                  colorPrimaryActive: "#2fa23b",
                },
              },
            }}
          >
            <Field name={stakeHolder ? stakeHolder + name : name}>
              {({ field, form }) => (
                <Radio.Group
                  id={name}
                  className="d-flex gap-3 flex-wrap align-items-center flex-row"
                  value={field.value}
                  onChange={(e) => {
                    form.setFieldValue(field.name, e.target.value);
                    handleChange(e);
                    if (all.callBack) {
                      all.func(values, setFieldValue, e.target, stakeHolder);
                    }
                  }}
                  disabled={
                    typeof all?.disabled === "function"
                      ? all.disabled(values, stakeHolder)
                      : all?.disabled || false
                  }
                >
                  {Array.isArray(all?.options) &&
                    all.options.map((opt, idx) => (
                      <Radio
                        key={idx}
                        value={opt.value}
                        className="radio-custom-style"
                      >
                        {opt.label || opt.lable || opt.value}
                      </Radio>
                    ))}
                </Radio.Group>
              )}
            </Field>
          </ConfigProvider>

          {all?.CheckError && (
            <ErrorMessage
              name={stakeHolder ? stakeHolder + name : name}
              component="div"
              className="text-danger small mt-1"
            />
          )}
        </>
      );

    case "postal-with-checkbox":
      return (
        <>
          {/* Postal Address Input */}
          <Field
            type="text"
            placeholder={placeholder || "Postal Address"}
            name={stakeHolder ? stakeHolder + name : name}
            id={name}
            className="form-control inputDesignDoubleInput"
            disabled={
              typeof all?.disabled === "function"
                ? all.disabled(values, stakeHolder)
                : getNestedValue(values, `${stakeHolder}SameAsAbove`) === true
            }
            onChange={(e) => {
              handleChange(e);
              if (all.callBack) {
                all.func(values, setFieldValue, e.target, stakeHolder);
              }
            }}
          />
          {all?.CheckError && (
            <ErrorMessage
              name={stakeHolder ? stakeHolder + name : name}
              component="div"
              className="text-danger small mt-1"
            />
          )}

          {/* Same As Home Address Checkbox */}
          <div className="mt-2">
            <Field name={`${stakeHolder}SameAsAbove`}>
              {({ field, form }) => (
                <Checkbox
                  checked={field.value || false}
                  onChange={(e) => {
                    form.setFieldValue(field.name, e.target.checked);
                    if (all.checkCallBack) {
                      all.checkfunc(
                        values,
                        setFieldValue,
                        e.target,
                        stakeHolder
                      );
                    }
                  }}
                >
                  Same as Home Address
                </Checkbox>
              )}
            </Field>
          </div>
        </>
      );

    case "number-toPercent":
      let FormulaSetting = () => {};

      if (all.callBack) {
        // alert(all.callBack);
        FormulaSetting = all.func;
      }

      return (
        <>
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
            disabled={
              typeof all?.disabled === "function"
                ? all.disabled(values, stakeHolder) // pass form values to compute disabled
                : all?.disabled || false
            }
          />
          {all?.CheckError && (
            <ErrorMessage
              name={stakeHolder ? stakeHolder + name : name}
              component="div"
              className="text-danger small mt-1"
            />
          )}
        </>
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
            disabled={
              typeof all?.disabled === "function"
                ? all.disabled(values, stakeHolder) // pass form values to compute disabled
                : all?.disabled || false
            }
          />
          <div className="invalid-feedback">{all.invalidMessage}</div>
          {all?.CheckError && (
            <ErrorMessage
              name={stakeHolder ? stakeHolder + name : name}
              component="div"
              className="text-danger small mt-1"
            />
          )}
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
              disabled={
                typeof all?.disabled === "function"
                  ? all.disabled(values, stakeHolder) // pass form values to compute disabled
                  : all?.disabled || false
              }
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
          {all?.CheckError && (
            <ErrorMessage
              name={stakeHolder ? stakeHolder + name : name}
              component="div"
              className="text-danger small mt-1"
            />
          )}
        </React.Fragment>
      );

    case "date":
      return (
        <>
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
            disabled={
              typeof all?.disabled === "function"
                ? all.disabled(values, stakeHolder) // pass form values to compute disabled
                : all?.disabled || false
            } // Disable input based on props
            // ✅ FIX: return the container instead of appending
            popperPlacement="bottom-start"
          />
          {all?.CheckError && (
            <ErrorMessage
              name={stakeHolder ? stakeHolder + name : name}
              component="div"
              className="text-danger small mt-1"
            />
          )}
        </>
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
        <>
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

              // console.log(isoValue);
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
            disabled={
              typeof all?.disabled === "function"
                ? all.disabled(values, stakeHolder) // pass form values to compute disabled
                : all?.disabled || false
            }
            format="DD/MM/YYYY"
            allowClear
            getPopupContainer={(triggerNode) =>
              triggerNode.closest("table") || triggerNode
            }
          />
          {all?.CheckError && (
            <ErrorMessage
              name={stakeHolder ? stakeHolder + name : name}
              component="div"
              className="text-danger small mt-1"
            />
          )}
        </>
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
              disabled={
                typeof all?.disabled === "function"
                  ? all.disabled(values, stakeHolder) // pass form values to compute disabled
                  : all?.disabled || false
              }
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
          {all?.CheckError && (
            <ErrorMessage
              name={stakeHolder ? stakeHolder + name : name}
              component="div"
              className="text-danger small mt-1"
            />
          )}
        </React.Fragment>
      );

    case "select":
      return (
        <>
          <Field
            as="select"
            name={stakeHolder ? stakeHolder + name : name}
            className="form-select inputDesignDoubleInput"
            disabled={
              typeof all?.disabled === "function"
                ? all.disabled(values, stakeHolder) // pass form values to compute disabled
                : all?.disabled || false
            }
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
          {all?.CheckError && (
            <ErrorMessage
              name={stakeHolder ? stakeHolder + name : name}
              component="div"
              className="text-danger small mt-1"
            />
          )}
        </>
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
              disabled={
                typeof all?.disabled === "function"
                  ? all.disabled(values, stakeHolder) // pass form values to compute disabled
                  : all?.disabled || false
              }
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

            {/* {(stakeHolder
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
            )} */}
            {(() => {
  // Get the current value safely
  const currentValue = stakeHolder
    ? values?.[stakeHolder.slice(0, -1)]?.[name]
    : values?.[name];

  // If ModalOption is an array, check if currentValue exists inside it
  const shouldShowModal = Array.isArray(all.ModalOption)
    ? all.ModalOption.includes(currentValue)
    : currentValue === all.ModalOption;

  // Render modal button only when condition matches
  return (
    shouldShowModal && (
      <Button
        className="btn bgColor modalBtn border-0"
        onClick={() =>
          handleInnerModal(innerModalTitle, values, all.key, stakeHolder)
        }
      >
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </Button>
    )
  );
})()}

          </InputGroup>
          {all?.CheckError && (
            <ErrorMessage
              name={stakeHolder ? stakeHolder + name : name}
              component="div"
              className="text-danger small mt-1"
            />
          )}
        </React.Fragment>
      );

    case "select-creatableMulti":
      return (
        <>
          <Field
            name={stakeHolder ? stakeHolder + name : name}
            component={CreatableMultiSelectField}
            label="Multi Select Field"
            options={options}
            disabled={
              typeof all?.disabled === "function"
                ? all.disabled(values, stakeHolder) // pass form values to compute disabled
                : all?.disabled || false
            }
            onChange={(e) => {
              // console.log(e);
              if (all.callBack) {
                all.func(values, setFieldValue, e.target, stakeHolder);
              }
            }}
          />
          {all?.CheckError && (
            <ErrorMessage
              name={stakeHolder ? stakeHolder + name : name}
              component="div"
              className="text-danger small mt-1"
            />
          )}
        </>
      );

    case "select-multi":
      return (
        <>
          <Field
            name={stakeHolder ? stakeHolder + name : name}
            component={CreatableMultiSelectField}
            label="Multi Select Field"
            options={options}
            disabled={
              typeof all?.disabled === "function"
                ? all.disabled(values, stakeHolder) // pass form values to compute disabled
                : all?.disabled || false
            }
          />
          {all?.CheckError && (
            <ErrorMessage
              name={stakeHolder ? stakeHolder + name : name}
              component="div"
              className="text-danger small mt-1"
            />
          )}
        </>
      );

    case "select-multi-antd":
      return (
        <>
          <Field
            name={stakeHolder ? stakeHolder + name : name}
            component={AntdCreatableMultiSelect}
            getPopupContainer={all?.trrigger}
            options={options}
            disabled={
              typeof all?.disabled === "function"
                ? all.disabled(values, stakeHolder)
                : all?.disabled || false
            }
          />{" "}
          {all?.CheckError && (
            <ErrorMessage
              name={stakeHolder ? stakeHolder + name : name}
              component="div"
              className="text-danger small mt-1"
            />
          )}
        </>
      );

    case "select-antd":
      return (
        <>
          <Field name={stakeHolder ? stakeHolder + name : name}>
            {({ field, form }) => (
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      colorBorder: "#36b446",
                    },
                  },
                }}
              >
                <Select
                  {...field}
                  showSearch
                  allowClear
                  placeholder="Select an option"
                  options={options}
                  disabled={
                    typeof all?.disabled === "function"
                      ? all.disabled(values, stakeHolder)
                      : all?.disabled || false
                  }
                  // 🔍 Custom filter logic for search
                  filterOption={(input, option) =>
                    option?.label?.toLowerCase().includes(input.toLowerCase())
                  }
                  onChange={(value) => {
                    form.setFieldValue(field.name, value);
                    if (all.func) {
                      all.func(
                        values,
                        setFieldValue,
                        { name: field.name, value },
                        stakeHolder
                      );
                    }
                  }}
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  style={{ width: "100%" }}
                  size="large"
                />
              </ConfigProvider>
            )}
          </Field>

          {all?.CheckError && (
            <ErrorMessage
              name={stakeHolder ? stakeHolder + name : name}
              component="div"
              className="text-danger small mt-1"
            />
          )}
        </>
      );

    case "postcode-antd":
      return (
        <>
          <Field name={stakeHolder ? stakeHolder + name : name}>
            {({ field, form }) => {
              const [optionsData, setOptionsData] = useState([]);
              const [loading, setLoading] = useState(false);
              const USERNAME = "usamasaeed3k";
              const handleSearch = async (query) => {
                if (!query) {
                  setOptionsData([]);
                  return;
                }
                setLoading(true);
                try {
                  const res = await axios.get(
                    `https://secure.geonames.org/postalCodeSearchJSON?placename=${encodeURIComponent(
                      query
                    )}&country=AU&maxRows=10&username=${USERNAME}`
                  );

                  const mapped = (res.data.postalCodes || []).map((place) => ({
                    value: `${place.placeName} (${place.postalCode})`,
                    label: `${place.placeName} (${place.postalCode})`,
                  }));
                  setOptionsData(mapped);
                } catch (err) {
                  console.error("Error fetching postcodes:", err);
                }
                setLoading(false);
              };

              return (
                <>
                  <Select
                    showSearch
                    allowClear
                    value={field.value || undefined}
                    placeholder="Type suburb or postcode..."
                    onSearch={handleSearch}
                    onChange={(val) => form.setFieldValue(field.name, val)}
                    filterOption={false} // 👈 important, we use server filtering
                    notFoundContent={loading ? <Spin size="small" /> : null}
                    options={optionsData}
                    style={{ width: "100%", height: "7vh" }}
                    disabled={
                      typeof all?.disabled === "function"
                        ? all.disabled(values, stakeHolder) // pass form values to compute disabled
                        : all?.disabled || false
                    }
                  />
                </>
              );
            }}
          </Field>
          {all?.CheckError && (
            <ErrorMessage
              name={stakeHolder ? stakeHolder + name : name}
              component="div"
              className="text-danger small mt-1"
            />
          )}
        </>
      );

    case "select-creatable":
      return (
        <>
          <Field
            name={stakeHolder ? stakeHolder + name : name}
            component={CreatableSelectField}
            defaultOptions={options}
            placeholder="Select or create ..."
            form={{ setFieldValue }}
            disabled={
              typeof all?.disabled === "function"
                ? all.disabled(values, stakeHolder) // pass form values to compute disabled
                : all?.disabled || false
            }
          />
          {all?.CheckError && (
            <ErrorMessage
              name={stakeHolder ? stakeHolder + name : name}
              component="div"
              className="text-danger small mt-1"
            />
          )}
        </>
      );

    case "yesno":
      return (
        <DynamicYesNo
          name={stakeHolder ? stakeHolder + name : name}
          values={values}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
        />
      );

    case "yesnoModal":
      return (
        <React.Fragment>
          <DynamicYesNo
            name={stakeHolder ? stakeHolder + name : name}
            values={values}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
          />
          {(stakeHolder
            ? values?.[stakeHolder.slice(0, -1)]?.[name]
            : values?.[name]) === "Yes" && (
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
            onClick={() => {
              handleInnerModal(innerModalTitle, values, all.key, stakeHolder);
            }}
          >
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />{" "}
          </Button>
        </div>
      );

    default:
      return null;
  }
};

export default DynamicFormField;
