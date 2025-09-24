import React from "react";
import Select from "react-select/creatable";
import { Select as AntDSelect, ConfigProvider } from "antd";

const CreatableMultiSelectField = ({
  options,
  field,
  form,
  disabled,
  onChange,
}) => {
  const handleChange = (selectedOptions) => {
    form.setFieldValue(
      field.name,
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );

    if (onChange) {
      let obj = {
        target: {
          name: field.name,
          value: selectedOptions,
        },
      };
      onChange(obj);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "1px solid #36b446" : "1px solid #36b446",
      boxShadow: state.isFocused ? "0 0 0 0px #36b446" : "none",
      "&:hover": {
        border: state.isFocused ? "1px solid #4CAF50" : "1px solid #36b446",
      },
      backgroundColor: disabled ? "#f0f0f0" : "white", // Change background when disabled
      pointerEvents: disabled ? "none" : "auto", // Disable interaction
      minHeight: "42px", // Set the minimum height
      height: field.value && field.value.length > 0 ? "auto" : "42px", // Set the height
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: field.value && field.value.length > 0 ? "auto" : "42px", // Ensure value container matches the control height
      // padding: '0 8px' // Adjust padding as needed
    }),
    input: (provided) => ({
      ...provided,
      margin: "0", // Ensure input has no margin
      padding: "0", // Ensure input has no padding
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "44px", // Ensure indicators container matches the control height
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Ensure the menu is on top of other elements
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999, // Ensure the menu portal is on top of other elements
    }),
  };

  return (
    <Select
      isMulti
      name={field.name}
      className=""
      value={
        options
          ? options.filter((option) =>
              Array.isArray(field.value)
                ? field.value.includes(option.value)
                : false
            )
          : []
      }
      onChange={handleChange}
      options={options}
      styles={customStyles}
      menuPortalTarget={document.body}
      isDisabled={disabled}
    />
  );
};

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
});

const defaultOptions = [
  { value: "ESS Super ", label: "ESS Super " },
  { value: "PSS ", label: "PSS " },
  { value: "CSC", label: "CSC" },
  { value: "Uni Super ", label: "Uni Super " },
  { value: "Telstra ", label: "Telstra " },
  { value: "Other", label: "Other" },
];

const CreatableSelectField = ({ field, form, disabled }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState(null);

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => [...prev, newOption]);
      setValue(newOption);
      form.setFieldValue(field.name, newOption.value);
    }, 1000);
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "2px solid #36b446" : "1px solid #36b446",
      boxShadow: state.isFocused ? "0 0 0 0px #4CAF50" : "none",
      "&:hover": {
        border: state.isFocused ? "2px solid #36b446" : "1px solid #36b446",
      },
      backgroundColor: disabled ? "#f0f0f0" : "white", // Change background when disabled
      pointerEvents: disabled ? "none" : "auto", // Disable interaction
      minHeight: "42px", // Set the minimum height
      height: "42px", // Allow height to adjust based on content
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: field.value && field.value.length > 0 ? "auto" : "44px", // Adjust height based on selection
      padding: "0 8px", // Adjust padding as needed
    }),
    input: (provided) => ({
      ...provided,
      margin: "0", // Ensure input has no margin
      padding: "0", // Ensure input has no padding
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "42px", // Ensure indicators container matches the control height
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Ensure the menu is on top of other elements
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999, // Ensure the menu portal is on top of other elements
    }),
  };
  return (
    <Select
      isClearable
      isDisabled={isLoading ? isLoading : disabled}
      isLoading={isLoading}
      onChange={(newValue) => {
        setValue(newValue);
        form.setFieldValue(field.name, newValue ? newValue.value : null);
        console.log(newValue ? newValue.value : null);
      }}
      onCreateOption={handleCreate}
      options={options}
      value={
        options ? options.find((option) => option.value === field.value) : null
      }
      styles={customStyles}
      menuPortalTarget={document.body}
    />
  );
};

const SimpleSelectField = ({ options, field, form, onChange }) => {
  const handleChange = (selectedOption) => {
    // Update form value
    form.setFieldValue(field.name, selectedOption ? selectedOption.value : "");

    // Run custom onChange if provided
    if (onChange) {
      onChange(selectedOption);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "1px solid #36b446" : "1px solid #36b446",
      boxShadow: state.isFocused ? "0 0 0 0px #36b446" : "none",
      "&:hover": {
        border: state.isFocused ? "1px solid #4CAF50" : "1px solid #36b446",
      },
      minHeight: "42px",
      height: "42px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "42px",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0",
      padding: "0",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "44px",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  return (
    <Select
      name={field.name}
      value={
        options
          ? options.find((option) => option.value === field.value) || null
          : null
      }
      onChange={handleChange}
      options={options}
      styles={customStyles}
      menuPortalTarget={document.body}
      isClearable
    />
  );
};

const AntdCreatableMultiSelect = ({
  field, // { name, value, onChange, onBlur }
  form, // formik bag
  label,
  options = [],
  onChangefun, // Custom onChange function
  ...props
}) => {
  const handleChange = (value) => {
    form.setFieldValue(field.name, value);
    if (onChangefun) {
      let obj = {
        target: {
          name: field.name,
          value: value,
        },
      };
      onChangefun(obj);
    }
  };

  return (
    <div className="w-100">
      {label && <label style={{ marginBottom: 4 }}>{label}</label>}
      <ConfigProvider
        theme={{
          components: {
            Select: {
              colorBorder: "#36b446",
            },
          },
        }}
      >
        <AntDSelect
          mode="tags" // or "multiple" if you don't want creatable
          allowClear
          styles={{
            root: {
              minHeight: "42px",
              placeholderpadding: "10px ",
              fontSize: "14px",
            },
          }}
          style={{ width: "100%" }}
          placeholder="Select or add options"
          value={field.value || []}
          onChange={handleChange}
          size="large"
          options={options}
          getPopupContainer={(triggerNode) => triggerNode.parentNode} // 👈 Fix
          {...props}
        />
      </ConfigProvider>
    </div>
  );
};

export {
  CreatableMultiSelectField,
  CreatableSelectField,
  SimpleSelectField,
  AntdCreatableMultiSelect,
};
